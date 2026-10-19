import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { after } from "next/server";
import { z } from "zod";
import { BOOKING, CALL_METHOD_LABEL, formatSlot, isBookableStart, pkDate } from "@/lib/booking";
import { sendBookingEmails } from "@/lib/booking-emails";
import { logLeadActivity } from "@/lib/bookings";
import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";
import { busyTimes, createCallEvent } from "@/lib/google/calendar";
import { leadByToken, takenDates } from "@/lib/leads/store";
import { allow, clientIp } from "@/lib/rate-limit";
import { appUrl, siteUrl } from "@/lib/system/urls";

export const runtime = "nodejs";

const schema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{32}$/),
  start: z.string().datetime(),
  method: z.enum(["meet", "whatsapp"]),
  timeZone: z
    .string()
    .max(64)
    .refine((tz) => {
      try {
        new Intl.DateTimeFormat("en-GB", { timeZone: tz });
        return true;
      } catch {
        return false;
      }
    }),
});

class BookingError extends Error {}

/**
 * Book the free call from the private audit page (from Jadeed Marketing's /api/booking). Only
 * A and B leads, one call per lead, one call per Pakistan day (bookingDays/{date} is the lock),
 * never on top of a busy time in the owner's Google Calendar. After booking: the calendar
 * event with a Meet link, the confirmation, the reminder an hour before, and the team alert.
 */
export async function POST(request: Request) {
  if (!allow(`booking:${clientIp(request) ?? "unknown"}`, 10, 10 * 60 * 1000)) return Response.json({ error: "Please wait a minute and try again." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "That time couldn't be read. Please pick it again." }, { status: 400 });
  if (!firestoreReady()) return Response.json({ error: "Booking isn't available right now. We'll email you instead." }, { status: 503 });

  const { token, start, method, timeZone } = parsed.data;
  const view = await leadByToken(token);
  if (!view || !view.lead.bookable) return Response.json({ error: "This link can't book a call." }, { status: 403 });
  if (view.booking && view.booking.status === "confirmed") {
    const { startsAt, minutes, method: booked } = view.booking;
    return Response.json({ error: "You already have a call booked.", booking: { startsAt, minutes, method: booked } }, { status: 409 });
  }

  const now = new Date();
  const startIso = new Date(start).toISOString();
  const busy = await busyTimes(now, new Date(now.getTime() + (BOOKING.daysAhead + 2) * 24 * 3600_000));
  if (!isBookableStart(startIso, now, await takenDates(pkDate(now)), busy)) return Response.json({ error: "That time was just taken. Please pick another." }, { status: 409 });

  const db = adminDb();
  const date = pkDate(new Date(startIso));
  const bookingRef = db.collection("bookings").doc();
  const leadRef = db.collection("leads").doc(view.id);
  const dayRef = db.collection("bookingDays").doc(date);
  const { lead } = view;

  try {
    await withTimeout(
      db.runTransaction(async (tx) => {
        const [day, fresh] = await Promise.all([tx.get(dayRef), tx.get(leadRef)]);
        if (day.exists) throw new BookingError("That day was just booked. Please pick another day.");
        if (fresh.get("bookingId")) throw new BookingError("You already have a call booked.");
        tx.create(dayRef, { date, bookingId: bookingRef.id, createdAt: FieldValue.serverTimestamp() });
        tx.set(bookingRef, {
          leadId: view.id,
          date,
          startsAt: Timestamp.fromDate(new Date(startIso)),
          minutes: BOOKING.leadMinutes,
          method,
          status: "confirmed",
          timeZone,
          contact: lead.contact,
          businessName: lead.business?.name ?? "",
          createdAt: FieldValue.serverTimestamp(),
        });
        tx.update(leadRef, { status: "call_booked", bookingId: bookingRef.id, updatedAt: FieldValue.serverTimestamp() });
      }),
      8000,
      "Booking the call"
    );
  } catch (error) {
    if (error instanceof BookingError) return Response.json({ error: error.message }, { status: 409 });
    console.error("[booking] Failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "We couldn't book that just now. Please try again." }, { status: 500 });
  }

  // The calendar event (and its Meet link) is made now so the visitor sees the link; a
  // calendar problem never undoes the booking, it only tells the team to add it by hand.
  let meetUrl: string | undefined;
  let calendarProblem: string | undefined;
  try {
    const event = await createCallEvent({
      bookingId: bookingRef.id,
      summary: `Jadeed Solutions call: ${lead.business?.name || lead.contact.name}`,
      description: [
        `Free ${BOOKING.leadMinutes}-minute call with ${lead.contact.name}${lead.business?.name ? ` of ${lead.business.name}` : ""}.`,
        method === "whatsapp" ? `WhatsApp call to ${lead.contact.phone ?? "(ask for their number)"}.` : "",
        lead.aiSummary ? `\n${lead.aiSummary}` : "",
        `\nLead: ${appUrl(`/leads/${view.id}`)}`,
      ]
        .filter(Boolean)
        .join("\n"),
      start: startIso,
      minutes: BOOKING.leadMinutes,
      attendee: lead.contact.email ? { email: lead.contact.email, name: lead.contact.name } : undefined,
      meet: method === "meet",
    });
    if (event) {
      meetUrl = event.meetUrl;
      await bookingRef.update({ eventId: event.eventId, ...(meetUrl ? { meetUrl } : {}) });
    } else {
      calendarProblem = "Google Calendar isn't connected (Settings → Google Calendar).";
    }
  } catch (error) {
    calendarProblem = "Creating the calendar event failed.";
    console.error("[booking] Calendar event failed", error instanceof Error ? error.message : error);
  }

  after(async () => {
    await logLeadActivity(view.id, {
      type: "booking",
      text: `Booked a ${BOOKING.leadMinutes}-minute call for ${formatSlot(startIso, BOOKING.timeZone)} PKT by ${CALL_METHOD_LABEL[method]}${calendarProblem ? ` (${calendarProblem})` : ""}.`,
      by: "system",
    });
    const { reminderId } = await sendBookingEmails({
      bookingId: bookingRef.id,
      startsAt: startIso,
      minutes: BOOKING.leadMinutes,
      method,
      timeZone,
      name: lead.contact.name,
      email: lead.contact.email,
      phone: lead.contact.phone,
      businessName: lead.business?.name,
      meetUrl,
      auditUrl: siteUrl(`/audit/${token}`),
      dashboardUrl: appUrl(`/leads/${view.id}`),
      calendarProblem,
    });
    if (reminderId) await bookingRef.update({ reminderEmailId: reminderId }).catch(() => null);
  });

  return Response.json({ ok: true, booking: { id: bookingRef.id, date, startsAt: startIso, minutes: BOOKING.leadMinutes, method, timeZone, meetUrl } }, { headers: { "Cache-Control": "no-store" } });
}
