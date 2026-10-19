import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { BOOKING, formatSlot } from "@/lib/booking";
import { adminDb, withTimeout } from "@/lib/firebase/admin";
import { cancelCallEvent } from "@/lib/google/calendar";
import { cancelScheduled, noticeEmail, sendMail, teamInbox } from "@/lib/mail";
import type { LeadActivity } from "@/lib/system/types";
import { siteUrl } from "@/lib/system/urls";

/* Changes to booked calls made by the team (server only, from Jadeed Marketing). The
   visitor-facing booking itself lives in /api/booking. */

export class BookingChangeError extends Error {}

type Actor = { email: string; name?: string };

/** Adds a line to a lead's timeline. Never throws. */
export async function logLeadActivity(leadId: string, entry: Omit<LeadActivity, "id" | "at">) {
  try {
    await adminDb()
      .collection("leads")
      .doc(leadId)
      .collection("activity")
      .add({ ...entry, at: FieldValue.serverTimestamp() });
  } catch (error) {
    console.error("[lead] Activity log failed", error instanceof Error ? error.message : error);
  }
}

/**
 * Cancels a booked call: frees the day, lets the lead book again, takes the event off the
 * calendar (Google tells an invited visitor), stops the reminder and emails the visitor a
 * link to pick a new time. The slow parts run after the database change, and their failures
 * are logged rather than undoing the cancellation.
 */
export async function cancelBooking(id: string, actor: Actor, reason = "") {
  const db = adminDb();
  const bookingRef = db.collection("bookings").doc(id);
  const booking: DocumentData = await withTimeout(
    db.runTransaction(async (tx) => {
      const snap = await tx.get(bookingRef);
      if (!snap.exists) throw new BookingChangeError("That booking doesn't exist.");
      const data = snap.data()!;
      if (data.status !== "confirmed") throw new BookingChangeError("That call isn't booked any more.");
      const dayRef = db.collection("bookingDays").doc(data.date);
      const day = await tx.get(dayRef);
      tx.update(bookingRef, { status: "cancelled", cancelledAt: FieldValue.serverTimestamp(), cancelledBy: actor.email, cancelReason: reason || null });
      if (day.exists && day.get("bookingId") === id) tx.delete(dayRef);
      tx.update(db.collection("leads").doc(data.leadId), { status: "contacted", bookingId: FieldValue.delete(), updatedAt: FieldValue.serverTimestamp() });
      return data;
    }),
    8000,
    "Cancelling the call"
  );

  const startsAt = booking.startsAt.toDate().toISOString();
  await logLeadActivity(booking.leadId, {
    type: "cancel",
    text: `Call on ${formatSlot(startsAt, BOOKING.timeZone)} PKT cancelled${reason ? `: ${reason}` : "."}`,
    by: actor.email,
    byName: actor.name,
  });

  if (booking.eventId) {
    await cancelCallEvent(booking.eventId).catch((error) => console.error("[booking] Removing the calendar event failed", error instanceof Error ? error.message : error));
  }
  await cancelScheduled(booking.reminderEmailId);

  const email = booking.contact?.email as string | undefined;
  if (!email) return;
  const lead = await db.collection("leads").doc(booking.leadId).get();
  const token = lead.get("token") as string | undefined;
  const message = noticeEmail({
    subject: "Your call with Sameer was cancelled",
    badge: "Call cancelled",
    preheader: "Pick a new time whenever suits you.",
    heading: "Let's find another time",
    paragraphs: [
      `Your call on ${formatSlot(startsAt, booking.timeZone ?? BOOKING.fallbackZone)} has been cancelled${reason ? `: ${reason}` : "."}`,
      "Pick a new time on your audit page whenever suits you, or just reply to this email.",
    ],
    button: token ? { href: siteUrl(`/audit/${token}`), label: "Pick a new time" } : undefined,
  });
  await sendMail(email, message, { replyTo: teamInbox()[0] });
}

/** Marks a past call as held or missed. */
export async function markCallOutcome(id: string, outcome: "done" | "no_show", actor: Actor) {
  const db = adminDb();
  const ref = db.collection("bookings").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new BookingChangeError("That booking doesn't exist.");
  const data = snap.data()!;
  if (data.status === "cancelled") throw new BookingChangeError("That call was cancelled.");
  await ref.update({ status: outcome, outcomeBy: actor.email, outcomeAt: FieldValue.serverTimestamp() });
  await logLeadActivity(data.leadId, {
    type: "booking",
    text: outcome === "done" ? "Call held." : "They didn't join the call.",
    by: actor.email,
    byName: actor.name,
  });
}
