import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { cancelScheduled, noticeEmail, sendMail, teamInbox } from "@/lib/mail";
import { appUrl } from "@/lib/system/urls";

/* Emails from the client portal (server only, from Jadeed Marketing). Message emails are
   batched to stay inside Resend's free tier: one per thread and side, sent 30 minutes after
   the first unread message, and cancelled if the thread is read before then. */

const BATCH_MS = 30 * 60 * 1000;
const FOOTER = "Jadeed Solutions · the free audit, the work and the reporting all live in your portal.";

/** Everyone at the client who should hear about portal activity: the owner and their staff logins. */
export async function clientRecipients(clientId: string): Promise<string[]> {
  const db = adminDb();
  const [client, staff] = await Promise.all([db.collection("clients").doc(clientId).get(), db.collection("users").where("clientId", "==", clientId).get()]);
  const emails = new Set<string>();
  const owner = client.get("ownerEmail") as string | undefined;
  if (owner) emails.add(owner.toLowerCase());
  for (const user of staff.docs) {
    const role = user.get("role");
    if ((role === "client" || role === "client_staff") && user.get("email")) emails.add(String(user.get("email")).toLowerCase());
  }
  return [...emails];
}

/** Sends a short branded email now. */
export async function sendPortalEmail(to: string[], input: { subject: string; heading: string; paragraphs: string[]; button?: { label: string; path: string } }) {
  if (!to.length) return null;
  const mail = noticeEmail({
    subject: input.subject,
    badge: "Jadeed portal",
    preheader: input.paragraphs[0] ?? input.heading,
    heading: input.heading,
    paragraphs: input.paragraphs,
    button: input.button ? { label: input.button.label, href: appUrl(input.button.path) } : undefined,
    footer: FOOTER,
  });
  return (await sendMail(to, mail)).id;
}

/** After a new message: one email to the other side in 30 minutes, unless one is already waiting. */
export async function queueThreadEmail(clientId: string, toSide: "client" | "team") {
  const db = adminDb();
  const ref = db.collection("clients").doc(clientId);
  const snap = await ref.get();
  if (!snap.exists) return;
  // One email per thread and side until it's read; a stale one (over a day old) doesn't block a new one.
  const pending = snap.get(`pendingEmail.${toSide}`) as { at: string } | undefined;
  if (pending && new Date(pending.at).getTime() > Date.now() - 24 * 3600_000) return;
  const business = String(snap.get("businessName") ?? "your business");
  const to = toSide === "client" ? await clientRecipients(clientId) : teamInbox();
  if (!to.length) return;
  const mail = noticeEmail({
    subject: toSide === "client" ? "New message from Jadeed" : `New message from ${business}`,
    badge: "New message",
    preheader: "Open the portal to read and reply.",
    heading: toSide === "client" ? "You have a new message" : `${business} sent a message`,
    paragraphs: [
      toSide === "client" ? "The Jadeed team sent you a message in your portal." : `There's a new message from ${business} in the client portal.`,
      "Messages stay in one place, with any files attached.",
    ],
    button: { label: "Read and reply", href: appUrl(toSide === "client" ? "/messages" : `/clients/${clientId}?tab=messages`) },
    footer: FOOTER,
  });
  const sendAt = new Date(Date.now() + BATCH_MS).toISOString();
  const sent = await sendMail(to, mail, { scheduledAt: sendAt });
  await ref.update({ [`pendingEmail.${toSide}`]: { id: sent.id ?? "not-sent", at: sendAt } });
}

/** The thread was read: drop the waiting email for that side, if it hasn't gone yet. */
export async function cancelThreadEmail(clientId: string, side: "client" | "team") {
  const ref = adminDb().collection("clients").doc(clientId);
  const pending = (await ref.get()).get(`pendingEmail.${side}`) as { id: string; at: string } | undefined;
  if (!pending) return;
  if (new Date(pending.at).getTime() > Date.now()) await cancelScheduled(pending.id);
  await ref.update({ [`pendingEmail.${side}`]: FieldValue.delete() });
}

export { teamInbox };
