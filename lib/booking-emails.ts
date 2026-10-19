import { BOOKING, CALL_METHOD_LABEL, formatSlot, safeZone, zoneName, type CallMethod } from "@/lib/booking";
import { noticeEmail, sendMail, teamInbox, textEmail } from "@/lib/mail";

/* Emails for a booked call (server only, from Jadeed Marketing): the visitor's
   confirmation, a reminder one hour before (scheduled in Resend, so nothing has to run at
   that time), and the team alert. Without email keys in development they are logged. */

export type BookedCallEmail = {
  bookingId: string;
  startsAt: string;
  minutes: number;
  method: CallMethod;
  timeZone: string;
  name: string;
  email?: string;
  phone?: string;
  businessName?: string;
  meetUrl?: string;
  auditUrl?: string;
  dashboardUrl?: string;
  /** Set when the Google Calendar event couldn't be created. */
  calendarProblem?: string;
};

const FOOTER = "£0 upfront on the Growth Partnership. Jadeed's fee is due only after your customer pays.";

function visitorTime(call: BookedCallEmail) {
  const zone = safeZone(call.timeZone);
  const local = `${formatSlot(call.startsAt, zone)} ${zoneName(zone, new Date(call.startsAt))}`;
  const pakistan = `${formatSlot(call.startsAt, BOOKING.timeZone)} PKT`;
  return { local, pakistan, same: zone === BOOKING.timeZone };
}

function joinLine(call: BookedCallEmail) {
  if (call.method === "meet") {
    return call.meetUrl ? `Join on Google Meet: ${call.meetUrl}. A Google Calendar invite is on its way as well.` : "Sameer will send the Google Meet link before the call.";
  }
  return call.phone ? `Sameer will call you on WhatsApp at ${call.phone}.` : "Sameer will call you on WhatsApp. Please reply with your WhatsApp number.";
}

export function confirmationEmail(call: BookedCallEmail) {
  const time = visitorTime(call);
  const first = call.name.split(/\s+/)[0] || "there";
  const when = time.same ? time.pakistan : `${time.local} (${time.pakistan} in Pakistan)`;
  return noticeEmail({
    subject: `Your call with Sameer: ${time.same ? time.pakistan : time.local}`,
    badge: "Call booked",
    preheader: `${call.minutes} minutes by ${CALL_METHOD_LABEL[call.method]}.`,
    heading: `You're booked, ${first}`,
    paragraphs: [
      `Your free ${call.minutes}-minute call with Sameer Ahmad Basra of Jadeed Solutions is on ${when}.`,
      joinLine(call),
      `Before the call, Sameer looks at how ${call.businessName || "your business"} shows up on Google Maps, in search and in AI answers, so the time goes on your business, not on slides.`,
      "Need another time? Just reply to this email. You'll get a reminder an hour before.",
    ],
    button: call.method === "meet" && call.meetUrl ? { href: call.meetUrl, label: "Join Google Meet" } : call.auditUrl ? { href: call.auditUrl, label: "Open your audit page" } : undefined,
    footer: FOOTER,
  });
}

export function reminderEmail(call: BookedCallEmail) {
  const time = visitorTime(call);
  return noticeEmail({
    subject: "In one hour: your call with Sameer",
    badge: "Reminder",
    preheader: joinLine(call),
    heading: "Your call starts in an hour",
    paragraphs: [`Your call with Sameer is at ${time.same ? time.pakistan : time.local}.`, joinLine(call), "Can't make it? Reply to this email and we'll find another time."],
    button: call.method === "meet" && call.meetUrl ? { href: call.meetUrl, label: "Join Google Meet" } : undefined,
    footer: FOOTER,
  });
}

function teamText(call: BookedCallEmail) {
  const time = visitorTime(call);
  return [
    `${call.name}${call.businessName ? ` (${call.businessName})` : ""} booked a ${call.minutes}-minute call.`,
    "",
    `When: ${time.pakistan}${time.same ? "" : ` · their time ${time.local}`}`,
    `How: ${CALL_METHOD_LABEL[call.method]}${call.meetUrl ? ` · ${call.meetUrl}` : ""}`,
    `Email: ${call.email || "not given"} · Phone: ${call.phone || "not given"}`,
    call.calendarProblem ? `\nCalendar: ${call.calendarProblem} Add it to the calendar by hand.` : "Calendar: added to jadeedsolutionz@gmail.com.",
    call.dashboardUrl ? `\nLead: ${call.dashboardUrl}` : "",
  ].join("\n");
}

/** Sends the confirmation and the team alert, and schedules the reminder. Returns the reminder's Resend id. */
export async function sendBookingEmails(call: BookedCallEmail): Promise<{ reminderId?: string }> {
  const replyTo = teamInbox()[0];
  await sendMail(teamInbox(), textEmail(`[Call booked] ${call.businessName || call.name}: ${visitorTime(call).pakistan}`, teamText(call)), { replyTo: call.email });
  if (!call.email) return {};
  await sendMail(call.email, confirmationEmail(call), { replyTo });
  const remindAt = new Date(new Date(call.startsAt).getTime() - 60 * 60_000);
  if (remindAt.getTime() <= Date.now()) return {};
  const scheduled = await sendMail(call.email, reminderEmail(call), { replyTo, scheduledAt: remindAt.toISOString() });
  return { reminderId: scheduled.id ?? undefined };
}
