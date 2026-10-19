"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { gemini, geminiModel, recordUsage } from "@/lib/ai/gemini";
import { logLeadActivity } from "@/lib/bookings";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { money, toCents } from "@/lib/money";
import { AccessError, viewer, type Viewer } from "@/lib/portal/access";
import { draftInvoiceFor } from "@/lib/portal/invoices";
import { cancelThreadEmail, clientRecipients, queueThreadEmail, sendPortalEmail, teamInbox } from "@/lib/portal/notify";
import { getSessionUser, isStaff } from "@/lib/system/session";
import { CURRENCIES, RESULT_STATUS_LABEL, type ResultStatus } from "@/lib/system/types";
import { pkToday } from "@/lib/utils";

/* Client portal mutations (from Jadeed Marketing's portal-actions.ts), for the team's client
   workspace and the clients themselves. Every action works out access with viewer() first:
   staff reach any client, a client only their own, and client staff nothing to do with money. */

export type PortalResult<T = object> = ({ ok: true } & T) | { ok: false; error: string };

const refresh = () => revalidatePath("/app", "layout");

class PortalError extends Error {}

const fail = (error: unknown, fallback: string): { ok: false; error: string } => {
  if (error instanceof AccessError || (error instanceof Error && error.message === "Not allowed")) return { ok: false, error: "You're not allowed to do that." };
  if (error instanceof z.ZodError) {
    const message = error.issues[0]?.message;
    return { ok: false, error: message && message !== "Invalid" && !message.startsWith("Expected") ? message : "Please check the details and try again." };
  }
  if (error instanceof PortalError) return { ok: false, error: error.message };
  console.error("[portal]", fallback, error instanceof Error ? error.message : error);
  return { ok: false, error: fallback };
};

const db = () => adminDb();
const id = z.string().regex(/^[A-Za-z0-9_-]{6,64}$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date like 2026-10-05.");
const fileRefs = z.array(z.object({ id: z.string().max(40), name: z.string().max(140), type: z.string().max(120), size: z.number().int().min(0) })).max(10).default([]);
const now = () => FieldValue.serverTimestamp();

async function requireStaff() {
  const user = await getSessionUser();
  if (!user || !isStaff(user.role)) throw new AccessError();
  return user;
}

async function requireAdmin() {
  const user = await requireStaff();
  if (user.role !== "admin") throw new AccessError();
  return user;
}

/** Files must belong to this client (uploaded through /api/files for it). */
async function checkFiles(clientId: string, files: { id: string }[]) {
  if (!files.length) return;
  const docs = await Promise.all(files.map((file) => db().collection("files").doc(file.id).get()));
  if (docs.some((doc) => !doc.exists || doc.get("clientId") !== clientId)) throw new PortalError("One of the files couldn't be attached. Please upload it again.");
}

/* ------------------------------ clients ------------------------------ */

const clientInput = z.object({
  businessName: z.string().trim().min(2, "Add the business name.").max(120),
  contactName: z.string().trim().min(2, "Add the owner's name.").max(80),
  ownerEmail: z.string().trim().toLowerCase().email("Add the owner's email."),
  phone: z.string().trim().max(30).default(""),
  trade: z.string().trim().max(80).default(""),
  city: z.string().trim().max(80).default(""),
  state: z.string().trim().max(80).default(""),
  country: z.string().trim().max(60).default("United Kingdom"),
  website: z.string().trim().max(200).default(""),
  territory: z.string().trim().max(120).default(""),
  feePercent: z.coerce.number().min(0).max(100).default(10),
  currency: z.enum(CURRENCIES).default("GBP"),
  leadId: z.union([z.literal(""), id]).default(""),
});

/** Turns a won lead (or anyone) into a client, and invites the owner to the portal. */
export async function createClient(input: z.input<typeof clientInput>): Promise<PortalResult<{ clientId: string }>> {
  try {
    const user = await requireStaff();
    const data = clientInput.parse(input);
    if (data.feePercent !== 10 && user.role !== "admin") return { ok: false, error: "Only Sameer can set a fee other than 10%." };
    const ref = db().collection("clients").doc();
    await ref.set({
      businessName: data.businessName,
      contactName: data.contactName,
      ownerEmail: data.ownerEmail,
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.trade ? { trade: data.trade } : {}),
      ...(data.city ? { city: data.city } : {}),
      ...(data.state ? { state: data.state } : {}),
      country: data.country,
      ...(data.website ? { website: data.website } : {}),
      ...(data.territory ? { territory: data.territory } : {}),
      status: "onboarding",
      feePercent: data.feePercent,
      currency: data.currency,
      ...(data.leadId ? { leadId: data.leadId } : {}),
      startedAt: pkToday(),
      createdBy: user.email,
      createdAt: now(),
      updatedAt: now(),
    });
    await inviteToClient(ref.id, data.ownerEmail, "client", user.email);
    await sendPortalEmail([data.ownerEmail], {
      subject: "Your Jadeed portal is ready",
      heading: `Welcome to Jadeed, ${data.contactName.split(/\s+/)[0]}`,
      paragraphs: [
        `${data.businessName} now has its own portal: the customers we bring in, the work we do, messages, proposals and invoices in one place.`,
        "Sign in with this email address — Google, or email and a password.",
      ],
      button: { label: "Open your portal", path: "/login" },
    });
    if (data.leadId) {
      await db().collection("leads").doc(data.leadId).update({ status: "won", clientId: ref.id, updatedAt: now() }).catch(() => null);
      await logLeadActivity(data.leadId, { type: "status", text: `Became a client: ${data.businessName}.`, by: user.email, byName: user.name });
    }
    refresh();
    return { ok: true, clientId: ref.id };
  } catch (error) {
    return fail(error, "Couldn't add the client.");
  }
}

const clientUpdate = z.object({
  status: z.enum(["onboarding", "active", "paused", "ended"]).optional(),
  feePercent: z.coerce.number().min(0).max(100).optional(),
  notes: z.string().trim().max(4000).optional(),
  contactName: z.string().trim().min(2).max(80).optional(),
  phone: z.string().trim().max(30).optional(),
  website: z.string().trim().max(200).optional(),
  territory: z.string().trim().max(120).optional(),
});

export async function updateClient(clientId: string, change: z.input<typeof clientUpdate>): Promise<PortalResult> {
  try {
    const user = await requireStaff();
    const data = clientUpdate.parse(change);
    if ((data.feePercent !== undefined || data.status === "ended") && user.role !== "admin") return { ok: false, error: "Only Sameer can change the fee or end a partnership." };
    await db().collection("clients").doc(id.parse(clientId)).update({ ...data, updatedAt: now() });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't save the client.");
  }
}

/** invites/{email} plus, for someone who has signed in before, the role straight away. */
async function inviteToClient(clientId: string, email: string, role: "client" | "client_staff", invitedBy: string) {
  await db().collection("invites").doc(email).set({ email, role, clientId, invitedBy, createdAt: now() });
  const existing = await adminAuth().getUserByEmail(email).catch(() => null);
  if (existing) {
    const current = existing.customClaims?.role;
    if (current === "admin" || current === "team") return; // never downgrade Jadeed staff
    await adminAuth().setCustomUserClaims(existing.uid, { role, clientId });
    await adminAuth().revokeRefreshTokens(existing.uid);
    await db().collection("users").doc(existing.uid).set({ role, clientId }, { merge: true });
  }
}

/** The client owner (or the team) invites someone from the client's business, with limited rights. */
export async function inviteClientStaff(clientId: string | undefined, email: string): Promise<PortalResult> {
  try {
    const access = await viewer(clientId);
    if (access.side === "client" && access.user.role !== "client") throw new AccessError();
    const address = z.string().trim().toLowerCase().email("Add a valid email.").parse(email);
    await inviteToClient(access.clientId, address, "client_staff", access.user.email);
    await sendPortalEmail([address], {
      subject: "You've been added to the Jadeed portal",
      heading: "Welcome to the Jadeed portal",
      paragraphs: [
        `${access.user.name || access.user.email} added you to your business's Jadeed portal.`,
        "Sign in with this email address (Google, or email and password) to see results, updates and messages.",
      ],
      button: { label: "Open the portal", path: "/login" },
    });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't invite them.");
  }
}

export async function removeClientUser(clientId: string | undefined, uid: string): Promise<PortalResult> {
  try {
    const access = await viewer(clientId);
    if (access.side === "client" && access.user.role !== "client") throw new AccessError();
    const target = await db().collection("users").doc(z.string().min(6).max(128).parse(uid)).get();
    if (!target.exists || target.get("clientId") !== access.clientId) throw new AccessError();
    if (target.id === access.user.uid) return { ok: false, error: "You can't remove yourself." };
    if (target.get("role") === "client" && access.side === "client") return { ok: false, error: "The owner can't be removed here. Ask Jadeed." };
    await adminAuth().setCustomUserClaims(target.id, { role: "visitor" });
    await adminAuth().revokeRefreshTokens(target.id);
    await target.ref.set({ role: "visitor", clientId: FieldValue.delete() }, { merge: true });
    await db().collection("invites").doc(String(target.get("email"))).delete().catch(() => null);
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't remove them.");
  }
}

/* ------------------------------ results (the shared record) ------------------------------ */

const STATUSES = Object.keys(RESULT_STATUS_LABEL) as [ResultStatus, ...ResultStatus[]];

const resultInput = z.object({
  id: z.union([z.literal(""), id]).default(""),
  customer: z.string().trim().min(1, "Add the customer's name or your reference.").max(120),
  service: z.string().trim().max(120).default(""),
  channel: z.string().trim().max(60).default(""),
  firstContact: date,
  status: z.enum(STATUSES),
  jobValue: z.union([z.string(), z.number()]).optional(),
  paid: z.union([z.string(), z.number()]).optional(),
  paidOn: z.union([z.literal(""), date]).default(""),
  notes: z.string().trim().max(1000).default(""),
});

/**
 * Adds or updates a customer in the shared record. A paid customer needs the paid amount and
 * date; the fee is the client's percentage of what was paid. Once a fee is on an invoice,
 * only Sameer can change that row.
 */
export async function saveResult(clientId: string | undefined, input: z.input<typeof resultInput>): Promise<PortalResult> {
  try {
    const access = await viewer(clientId);
    const data = resultInput.parse(input);
    const clientRef = db().collection("clients").doc(access.clientId);
    const client = await clientRef.get();
    if (!client.exists) throw new PortalError("That client doesn't exist.");
    const paidCents = toCents(data.paid);
    const jobValueCents = toCents(data.jobValue);
    if (data.status === "paid" && (!paidCents || !data.paidOn)) return { ok: false, error: "For a paid job, add the amount paid and the date." };

    const ref = data.id ? clientRef.collection("results").doc(data.id) : clientRef.collection("results").doc();
    const existing = data.id ? await ref.get() : null;
    if (data.id && !existing?.exists) throw new PortalError("That entry doesn't exist.");
    if (existing?.get("invoiceId") && !access.isAdmin) return { ok: false, error: "This fee is already on an invoice. Ask Jadeed to change it." };
    const feePercent = Number(existing?.get("feePercent") ?? client.get("feePercent") ?? 10);
    const feeCents = data.status === "paid" && paidCents ? Math.round((paidCents * feePercent) / 100) : FieldValue.delete();

    await ref.set(
      {
        clientId: access.clientId,
        customer: data.customer,
        service: data.service || FieldValue.delete(),
        channel: data.channel || FieldValue.delete(),
        firstContact: data.firstContact,
        status: data.status,
        jobValueCents: jobValueCents ?? FieldValue.delete(),
        paidCents: data.status === "paid" ? paidCents : FieldValue.delete(),
        paidOn: data.status === "paid" ? data.paidOn : FieldValue.delete(),
        feePercent,
        feeCents,
        notes: data.notes || FieldValue.delete(),
        ...(existing ? {} : { createdBy: access.user.email, createdByRole: access.side, createdAt: now() }),
        updatedBy: access.user.email,
        updatedAt: now(),
      },
      { merge: true }
    );
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't save the entry.");
  }
}

export async function deleteResult(clientId: string, resultId: string): Promise<PortalResult> {
  try {
    await requireAdmin();
    const ref = db().collection("clients").doc(id.parse(clientId)).collection("results").doc(id.parse(resultId));
    if ((await ref.get()).get("invoiceId")) return { ok: false, error: "It's on an invoice. Void the invoice first." };
    await ref.delete();
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't delete the entry.");
  }
}

/* ------------------------------ work updates ------------------------------ */

const updateInput = z.object({
  title: z.string().trim().min(3, "Add a short title.").max(140),
  body: z.string().trim().min(10, "Write what was done.").max(8000),
  why: z.string().trim().max(2000).default(""),
  next: z.string().trim().max(2000).default(""),
  area: z.string().trim().max(40).default(""),
  kind: z.enum(["update", "report"]).default("update"),
  attachments: fileRefs,
});

/** The team posts what was done (never AI-written); the client gets an email. */
export async function postUpdate(clientId: string, input: z.input<typeof updateInput>): Promise<PortalResult> {
  try {
    const user = await requireStaff();
    const cid = id.parse(clientId);
    const data = updateInput.parse(input);
    await checkFiles(cid, data.attachments);
    await db()
      .collection("clients")
      .doc(cid)
      .collection("updates")
      .add({
        title: data.title,
        body: data.body,
        ...(data.why ? { why: data.why } : {}),
        ...(data.next ? { next: data.next } : {}),
        ...(data.area ? { area: data.area } : {}),
        kind: data.kind,
        attachments: data.attachments,
        clientId: cid,
        createdBy: user.email,
        createdByName: user.name,
        createdAt: now(),
      });
    await sendPortalEmail(await clientRecipients(cid), {
      subject: `${data.kind === "report" ? "New report" : "Work update"}: ${data.title}`,
      heading: data.title,
      paragraphs: [
        `${user.name || "The Jadeed team"} posted a ${data.kind === "report" ? "report" : "work update"} in your portal.`,
        `What we did: ${data.body.slice(0, 240)}${data.body.length > 240 ? "…" : ""}`,
        data.next ? `What's next: ${data.next.slice(0, 200)}` : "",
      ],
      button: { label: "Read it in the portal", path: "/work" },
    });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't post the update.");
  }
}

/* ------------------------------ messages ------------------------------ */

const messageInput = z.object({ body: z.string().trim().max(5000).default(""), attachments: fileRefs });

export async function sendMessage(clientId: string | undefined, input: z.input<typeof messageInput>): Promise<PortalResult> {
  try {
    const access = await viewer(clientId);
    const data = messageInput.parse(input);
    if (!data.body && !data.attachments.length) return { ok: false, error: "Write a message or attach a file." };
    await checkFiles(access.clientId, data.attachments);
    await postMessage(access, data.body, data.attachments);
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't send the message.");
  }
}

async function postMessage(access: Viewer, body: string, attachments: z.infer<typeof fileRefs>, viaAi = false) {
  const clientRef = db().collection("clients").doc(access.clientId);
  await clientRef.collection("messages").add({
    clientId: access.clientId,
    body,
    from: access.side,
    by: access.user.email,
    byName: access.user.name,
    ...(viaAi ? { viaAi: true } : {}),
    attachments,
    createdAt: now(),
  });
  await clientRef.update({ lastMessageAt: now(), lastMessageFrom: access.side });
  await markRead(access);
  await queueThreadEmail(access.clientId, access.side === "team" ? "client" : "team");
}

async function markRead(access: Viewer) {
  await db().collection("users").doc(access.user.uid).set({ threadReads: { [access.clientId]: now() } }, { merge: true });
}

/** Opening the thread: remember it was read and drop the waiting email for this side. */
export async function markThreadRead(clientId: string | undefined): Promise<PortalResult> {
  try {
    const access = await viewer(clientId);
    await markRead(access);
    await cancelThreadEmail(access.clientId, access.side);
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the thread.");
  }
}

/* ------------------------------ proposals ------------------------------ */

const proposalInput = z.object({
  id: z.union([z.literal(""), id]).default(""),
  title: z.string().trim().min(3, "Add a title.").max(140),
  summary: z.string().trim().min(10, "Add a short summary.").max(1500),
  sections: z.array(z.object({ heading: z.string().trim().min(1).max(120), body: z.string().trim().min(1).max(6000) })).max(20).default([]),
  keyTerms: z.array(z.object({ label: z.string().trim().min(1).max(40), value: z.string().trim().min(1).max(120) })).max(8).default([]),
  price: z.string().trim().max(300).default(""),
  terms: z.string().trim().max(4000).default(""),
});

export async function saveProposal(clientId: string, input: z.input<typeof proposalInput>): Promise<PortalResult<{ proposalId: string }>> {
  try {
    const user = await requireStaff();
    const cid = id.parse(clientId);
    const data = proposalInput.parse(input);
    const col = db().collection("clients").doc(cid).collection("proposals");
    const ref = data.id ? col.doc(data.id) : col.doc();
    const existing = data.id ? await ref.get() : null;
    if (existing?.exists && ["approved", "declined"].includes(existing.get("status"))) return { ok: false, error: "A decided proposal can't be edited. Make a new one." };
    await ref.set(
      {
        clientId: cid,
        title: data.title,
        summary: data.summary,
        sections: data.sections,
        keyTerms: data.keyTerms,
        price: data.price,
        terms: data.terms,
        ...(existing?.exists ? {} : { status: "draft", createdBy: user.email, createdAt: now() }),
        updatedAt: now(),
      },
      { merge: true }
    );
    refresh();
    return { ok: true, proposalId: ref.id };
  } catch (error) {
    return fail(error, "Couldn't save the proposal.");
  }
}

export async function sendProposal(clientId: string, proposalId: string): Promise<PortalResult> {
  try {
    await requireStaff();
    const cid = id.parse(clientId);
    const ref = db().collection("clients").doc(cid).collection("proposals").doc(id.parse(proposalId));
    const proposal = await ref.get();
    if (!proposal.exists) throw new PortalError("That proposal doesn't exist.");
    if (proposal.get("status") !== "draft") return { ok: false, error: "It has already been sent." };
    await ref.update({ status: "sent", sentAt: now(), updatedAt: now() });
    await sendPortalEmail(await clientRecipients(cid), {
      subject: `Proposal: ${proposal.get("title")}`,
      heading: "A proposal is ready for you",
      paragraphs: [String(proposal.get("summary")).slice(0, 300), "Read it in your portal, and approve it there when you're happy."],
      button: { label: "Read the proposal", path: `/proposals/${ref.id}` },
    });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't send the proposal.");
  }
}

/** The client owner approves or declines. Approval records the typed name and the time. */
export async function decideProposal(proposalId: string, decision: "approved" | "declined", name: string, reason = ""): Promise<PortalResult> {
  try {
    const access = await viewer();
    if (access.user.role !== "client") return { ok: false, error: "Only the business owner can approve or decline." };
    const parsed = z
      .object({ proposalId: id, decision: z.enum(["approved", "declined"]), name: z.string().trim().min(2, "Type your full name.").max(80), reason: z.string().trim().max(1000) })
      .parse({ proposalId, decision, name, reason });
    const ref = db().collection("clients").doc(access.clientId).collection("proposals").doc(parsed.proposalId);
    const proposal = await ref.get();
    if (!proposal.exists) throw new PortalError("That proposal doesn't exist.");
    if (proposal.get("status") !== "sent") return { ok: false, error: "This proposal isn't waiting for a decision." };
    await ref.update({
      status: parsed.decision,
      decidedAt: now(),
      decidedBy: { name: parsed.name, email: access.user.email },
      ...(parsed.reason ? { declineReason: parsed.reason } : {}),
      updatedAt: now(),
    });
    const client = await db().collection("clients").doc(access.clientId).get();
    await sendPortalEmail(teamInbox(), {
      subject: `Proposal ${parsed.decision}: ${proposal.get("title")} (${client.get("businessName")})`,
      heading: `${client.get("businessName")} ${parsed.decision} the proposal`,
      paragraphs: [`${parsed.name} (${access.user.email}) ${parsed.decision} “${proposal.get("title")}”.`, parsed.reason ? `Reason: ${parsed.reason}` : ""].filter(Boolean),
      button: { label: "Open the client", path: `/clients/${access.clientId}?tab=proposals` },
    });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't record your decision.");
  }
}

/* ------------------------------ invoices ------------------------------ */

export async function draftInvoice(clientId: string): Promise<PortalResult<{ invoiceId: string }>> {
  try {
    const user = await requireAdmin();
    const invoiceId = await draftInvoiceFor(id.parse(clientId), user.email);
    if (!invoiceId) return { ok: false, error: "There are no paid jobs waiting to be invoiced." };
    refresh();
    return { ok: true, invoiceId };
  } catch (error) {
    return fail(error, "Couldn't draft the invoice.");
  }
}

export async function setInvoiceStatus(invoiceId: string, status: "sent" | "paid" | "void"): Promise<PortalResult> {
  try {
    const user = await requireAdmin();
    const ref = db().collection("invoices").doc(id.parse(invoiceId));
    const invoice = await ref.get();
    if (!invoice.exists) throw new PortalError("That invoice doesn't exist.");
    const current = invoice.get("status");
    const clientId = String(invoice.get("clientId"));
    if (status === "sent") {
      if (current !== "draft") return { ok: false, error: "Only a draft can be sent." };
      const billing = await db().collection("settings").doc("billing").get();
      if (!billing.exists || !billing.get("iban")) return { ok: false, error: "Add the bank details in Settings first, so the invoice shows where to pay." };
      const terms = Number(billing.get("paymentTermsDays") ?? 14);
      const due = new Date(Date.now() + 5 * 3600_000 + terms * 86_400_000).toISOString().slice(0, 10);
      await ref.update({ status: "sent", issuedOn: pkToday(), dueOn: due, updatedAt: now() });
      await sendPortalEmail(await clientRecipients(clientId), {
        subject: `Invoice ${invoice.get("number")}: ${money(invoice.get("totalCents"), invoice.get("currency"))}`,
        heading: `Invoice ${invoice.get("number")}`,
        paragraphs: [
          `Fees for paid jobs, ${money(invoice.get("totalCents"), invoice.get("currency"))}, due by ${due}.`,
          "The PDF with bank details is in your portal. After paying, upload the payment screenshot there.",
        ],
        button: { label: "View the invoice", path: "/invoices" },
      });
    } else if (status === "paid") {
      if (current !== "sent") return { ok: false, error: "Only a sent invoice can be marked paid." };
      await ref.update({ status: "paid", paidOn: pkToday(), markedPaidBy: user.email, updatedAt: now() });
      await sendPortalEmail(await clientRecipients(clientId), {
        subject: `Payment received: invoice ${invoice.get("number")}`,
        heading: "Thank you, payment received",
        paragraphs: [`We've marked invoice ${invoice.get("number")} (${money(invoice.get("totalCents"), invoice.get("currency"))}) as paid.`],
        button: { label: "Your invoices", path: "/invoices" },
      });
    } else {
      if (current === "paid") return { ok: false, error: "A paid invoice can't be voided." };
      const batch = db().batch();
      batch.update(ref, { status: "void", updatedAt: now() });
      for (const line of (invoice.get("lines") ?? []) as { resultId?: string }[]) {
        if (line.resultId) batch.update(db().collection("clients").doc(clientId).collection("results").doc(line.resultId), { invoiceId: FieldValue.delete() });
      }
      await batch.commit();
    }
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the invoice.");
  }
}

/** The client owner (or the team) attaches a payment screenshot to an invoice. */
export async function addPaymentProof(invoiceId: string, file: { id: string; name: string; type: string; size: number }): Promise<PortalResult> {
  try {
    const ref = db().collection("invoices").doc(id.parse(invoiceId));
    const invoice = await ref.get();
    if (!invoice.exists) throw new PortalError("That invoice doesn't exist.");
    const access = await viewer(String(invoice.get("clientId")));
    if (!access.canSeeMoney) throw new AccessError();
    const proof = fileRefs.parse([file])[0];
    await checkFiles(access.clientId, [proof]);
    await ref.update({ proofs: FieldValue.arrayUnion({ ...proof, uploadedBy: access.user.email, at: new Date().toISOString() }), updatedAt: now() });
    if (access.side === "client") {
      await sendPortalEmail(teamInbox(), {
        subject: `Payment proof: invoice ${invoice.get("number")} (${invoice.get("clientName")})`,
        heading: "A client uploaded a payment screenshot",
        paragraphs: [`${invoice.get("clientName")} uploaded proof of payment for invoice ${invoice.get("number")} (${money(invoice.get("totalCents"), invoice.get("currency"))}). Check the bank and mark it paid.`],
        button: { label: "Open invoices", path: "/invoices" },
      });
    }
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't attach the screenshot.");
  }
}

const billingInput = z.object({
  accountTitle: z.string().trim().min(2, "Add the account title.").max(120),
  bankName: z.string().trim().min(2, "Add the bank name.").max(120),
  iban: z.string().trim().min(10, "Add the IBAN.").max(40),
  accountNumber: z.string().trim().max(40).default(""),
  swift: z.string().trim().max(20).default(""),
  branch: z.string().trim().max(160).default(""),
  notes: z.string().trim().max(600).default(""),
  registration: z.string().trim().max(120).default(""),
  paymentTermsDays: z.coerce.number().int().min(1).max(90).default(14),
});

export async function saveBilling(input: z.input<typeof billingInput>): Promise<PortalResult> {
  try {
    const user = await requireAdmin();
    await db().collection("settings").doc("billing").set({ ...billingInput.parse(input), updatedBy: user.email, updatedAt: now() });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't save the bank details.");
  }
}

/* ------------------------------ the client's Jadeed AI ------------------------------ */

const clientAnswer = z.object({ answer: z.string().min(2).max(3000), passToSameer: z.boolean() });

/**
 * A client asks about their own account. Jadeed AI answers only from that client's data;
 * anything it can't answer becomes a message to Sameer in the thread.
 */
export async function askClientAI(question: string): Promise<PortalResult<{ answer: string; passed: boolean }>> {
  try {
    const access = await viewer();
    if (access.side !== "client") throw new AccessError();
    const q = z.string().trim().min(3, "Ask a question.").max(500).parse(question);
    const ai = gemini();
    if (!ai) return { ok: false, error: "Jadeed AI isn't connected right now. Send Sameer a message instead." };
    const ref = db().collection("clients").doc(access.clientId);
    const [client, results, updates, proposals, invoices] = await Promise.all([
      ref.get(),
      ref.collection("results").orderBy("firstContact", "desc").limit(150).get(),
      ref.collection("updates").orderBy("createdAt", "desc").limit(15).get(),
      ref.collection("proposals").orderBy("createdAt", "desc").limit(5).get(),
      access.canSeeMoney ? db().collection("invoices").where("clientId", "==", access.clientId).get() : Promise.resolve(null),
    ]);
    const currency = String(client.get("currency") ?? "GBP");
    const resultLines = results.docs.map(
      (d) =>
        `- ${d.get("customer")} | ${d.get("service") ?? ""} | first contact ${d.get("firstContact")} | ${d.get("status")}${access.canSeeMoney && d.get("paidCents") ? ` | paid ${money(d.get("paidCents"), currency)} on ${d.get("paidOn")} | fee ${money(d.get("feeCents"), currency)}` : ""}`
    );
    const updateLines = updates.docs.map((d) => `- ${d.get("title")}: ${String(d.get("body")).slice(0, 300)}${d.get("next") ? ` Next: ${String(d.get("next")).slice(0, 160)}` : ""}`);
    const proposalLines = proposals.docs.filter((d) => d.get("status") !== "draft").map((d) => `- ${d.get("title")} (${d.get("status")}): ${String(d.get("summary")).slice(0, 200)}`);
    const invoiceLines = invoices?.docs.filter((d) => d.get("status") !== "draft").map((d) => `- ${d.get("number")} | ${money(d.get("totalCents"), currency)} | ${d.get("status")} | due ${d.get("dueOn") ?? "-"}`) ?? [];
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: `You are Jadeed AI in the client portal of ${client.get("businessName")}, a client of Jadeed Solutions (the Growth
Partnership: the client pays ${client.get("feePercent")}% of each paid customer invoice, only after their customer pays).
Answer the client's question in plain, friendly words, only from their data below. Never guess numbers, never promise results,
and don't discuss other clients. If the data can't answer it, or they want something done (a change, a call, a complaint), set
passToSameer to true and say you've passed it to Sameer, who replies in Messages.
${access.canSeeMoney ? "" : "This person can't see invoices or fees; don't mention money."}

Question: ${q}

Customers Jadeed brought in (shared record):
${resultLines.join("\n") || "- none yet"}

Work updates from the team:
${updateLines.join("\n") || "- none yet"}

Proposals:
${proposalLines.join("\n") || "- none"}

Invoices:
${invoiceLines.join("\n") || "- none"}`,
      config: {
        temperature: 0.2,
        maxOutputTokens: 700,
        responseMimeType: "application/json",
        responseJsonSchema: { type: "object", properties: { answer: { type: "string" }, passToSameer: { type: "boolean" } }, required: ["answer", "passToSameer"] },
        abortSignal: AbortSignal.timeout(20_000),
      },
    });
    await recordUsage("portal", response.usageMetadata);
    const parsed = clientAnswer.safeParse(JSON.parse(response.text ?? "{}"));
    if (!parsed.success) return { ok: false, error: "Jadeed AI couldn't answer that. Send Sameer a message instead." };
    if (parsed.data.passToSameer) await postMessage(access, `Question for Sameer (asked Jadeed AI): ${q}`, [], true);
    return { ok: true, answer: parsed.data.answer, passed: parsed.data.passToSameer };
  } catch (error) {
    return fail(error, "Couldn't get an answer.");
  }
}
