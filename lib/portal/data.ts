import { adminDb } from "@/lib/firebase/admin";
import { plain } from "@/lib/system/data";
import type { BillingSettings, Client, ClientMessage, Invoice, Proposal, ResultEntry, WorkUpdate } from "@/lib/system/types";

/* Reads for the client portal and the team's client workspace (server only, from Jadeed
   Marketing). Callers check access with viewer() first; these trust the clientId given. */

const db = () => adminDb();
const client = (id: string) => db().collection("clients").doc(id);

export async function listClients(): Promise<Client[]> {
  const snap = await db().collection("clients").orderBy("createdAt", "desc").limit(300).get();
  return snap.docs.map((d) => ({ ...plain<Client>(d.data()), id: d.id }));
}

export async function getClient(id: string): Promise<Client | null> {
  const doc = await client(id).get();
  return doc.exists ? { ...plain<Client>(doc.data()), id: doc.id } : null;
}

export async function listResults(clientId: string, limit = 500): Promise<ResultEntry[]> {
  const snap = await client(clientId).collection("results").orderBy("firstContact", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<ResultEntry>(d.data()), id: d.id, clientId }));
}

export async function listUpdates(clientId: string, limit = 100): Promise<WorkUpdate[]> {
  const snap = await client(clientId).collection("updates").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<WorkUpdate>(d.data()), id: d.id, clientId }));
}

export async function listMessages(clientId: string, limit = 200): Promise<ClientMessage[]> {
  const snap = await client(clientId).collection("messages").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<ClientMessage>(d.data()), id: d.id, clientId })).reverse();
}

export async function listProposals(clientId: string): Promise<Proposal[]> {
  const snap = await client(clientId).collection("proposals").orderBy("createdAt", "desc").limit(50).get();
  return snap.docs.map((d) => ({ ...plain<Proposal>(d.data()), id: d.id, clientId }));
}

export async function getProposal(clientId: string, id: string): Promise<Proposal | null> {
  const doc = await client(clientId).collection("proposals").doc(id).get();
  return doc.exists ? { ...plain<Proposal>(doc.data()), id: doc.id, clientId } : null;
}

export async function listInvoices(clientId?: string): Promise<Invoice[]> {
  const base = db().collection("invoices");
  const snap = clientId ? await base.where("clientId", "==", clientId).get() : await base.orderBy("createdAt", "desc").limit(300).get();
  return snap.docs.map((d) => ({ ...plain<Invoice>(d.data()), id: d.id })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const doc = await db().collection("invoices").doc(id).get();
  return doc.exists ? { ...plain<Invoice>(doc.data()), id: doc.id } : null;
}

export async function billingSettings(): Promise<BillingSettings | null> {
  const doc = await db().collection("settings").doc("billing").get();
  return doc.exists ? (plain<BillingSettings>(doc.data()) as BillingSettings) : null;
}

/** Headline numbers for a client: what came in, what got paid, and fees earned or owed. */
export function clientTotals(results: ResultEntry[], invoices: Invoice[], month: string) {
  const inMonth = (date?: string) => Boolean(date && date.slice(0, 7) === month);
  const paid = results.filter((r) => r.status === "paid");
  return {
    leadsThisMonth: results.filter((r) => inMonth(r.firstContact)).length,
    leadsAll: results.length,
    paidJobs: paid.length,
    paidThisMonthCents: paid.filter((r) => inMonth(r.paidOn)).reduce((sum, r) => sum + (r.paidCents ?? 0), 0),
    feesThisMonthCents: paid.filter((r) => inMonth(r.paidOn)).reduce((sum, r) => sum + (r.feeCents ?? 0), 0),
    revenueCents: paid.reduce((sum, r) => sum + (r.paidCents ?? 0), 0),
    feesEarnedCents: paid.reduce((sum, r) => sum + (r.feeCents ?? 0), 0),
    feesUninvoicedCents: paid.filter((r) => !r.invoiceId).reduce((sum, r) => sum + (r.feeCents ?? 0), 0),
    dueCents: invoices.filter((i) => i.status === "sent").reduce((sum, i) => sum + i.totalCents, 0),
  };
}

/** People with a login for this client, and invites not used yet. */
export async function listClientPeople(clientId: string) {
  const [users, invites] = await Promise.all([
    db().collection("users").where("clientId", "==", clientId).get(),
    db().collection("invites").where("clientId", "==", clientId).get(),
  ]);
  const people = users.docs
    .map((d) => ({ uid: d.id, name: String(d.get("name") ?? ""), email: String(d.get("email") ?? ""), role: d.get("role") }))
    .filter((p) => p.role === "client" || p.role === "client_staff");
  const signedIn = new Set(people.map((p) => p.email.toLowerCase()));
  const pending = invites.docs.filter((d) => !d.get("acceptedAt") && !signedIn.has(d.id)).map((d) => d.id);
  return { people, invites: pending };
}

/** Whether the viewer has unread messages in this thread (newest message from the other side, after their last read). */
export async function hasUnread(clientId: string, uid: string, side: "team" | "client") {
  const [clientDoc, user] = await Promise.all([db().collection("clients").doc(clientId).get(), db().collection("users").doc(uid).get()]);
  const last = plain<string | undefined>(clientDoc.get("lastMessageAt"));
  if (!last || clientDoc.get("lastMessageFrom") === side) return false;
  const read = plain<string | undefined>(user.get(`threadReads.${clientId}`));
  return !read || read < last;
}
