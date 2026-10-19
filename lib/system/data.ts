import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import type { Booking, ChatSession, Invite, KnowledgeEntry, Lead, LeadActivity, Task, Ticket, UserProfile } from "./types";

/* Server-side reads for dashboard screens (from Jadeed Marketing). Firestore Timestamps
   become ISO strings before they reach a component. Count queries keep reads cheap. Lists
   read the newest documents once and filter in memory, which keeps the number of composite
   indexes small at this volume. */

function iso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (typeof value === "string") return value;
  return new Date(0).toISOString();
}

/** Every Timestamp in a document, at any depth, as an ISO string. */
export function plain<T>(value: unknown): T {
  if (value instanceof Timestamp) return value.toDate().toISOString() as T;
  if (Array.isArray(value)) return value.map((item) => plain(item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, plain(v)])) as T;
  }
  return value as T;
}

export function toLead(id: string, data: FirebaseFirestore.DocumentData): Lead {
  return {
    id,
    source: data.source ?? "form",
    status: data.status ?? "new",
    score: data.score ?? "C",
    scoreReason: data.scoreReason ?? "",
    nextStep: data.nextStep,
    aiSummary: data.aiSummary,
    visitorSummary: data.visitorSummary,
    flags: data.flags ?? [],
    contact: data.contact ?? { name: "" },
    business: data.business ?? {},
    goal: data.goal ?? {},
    bookable: data.bookable,
    token: data.token,
    assignedTo: data.assignedTo,
    chatId: data.chatId,
    bookingId: data.bookingId,
    clientId: data.clientId,
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
  };
}

/* ------------------------------ home ------------------------------ */

export async function latestLeads(limit = 8): Promise<Lead[]> {
  const snap = await adminDb().collection("leads").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => toLead(d.id, d.data()));
}

export async function homeStats() {
  const db = adminDb();
  const weekAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const now = Timestamp.now();
  const [newLeads, goodLeads, upcomingCalls, openTasks] = await Promise.all([
    db.collection("leads").where("createdAt", ">=", weekAgo).count().get(),
    db.collection("leads").where("createdAt", ">=", weekAgo).where("score", "in", ["A", "B"]).count().get(),
    db.collection("bookings").where("startsAt", ">=", now).where("status", "==", "confirmed").count().get(),
    db.collection("tasks").where("done", "==", false).count().get(),
  ]);
  return {
    newLeads: newLeads.data().count,
    goodLeads: goodLeads.data().count,
    upcomingCalls: upcomingCalls.data().count,
    openTasks: openTasks.data().count,
  };
}

/* ------------------------------ leads ------------------------------ */

export async function listLeads(limit = 200): Promise<Lead[]> {
  const snap = await adminDb().collection("leads").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => toLead(d.id, d.data()));
}

export type LeadDetail = {
  lead: Lead;
  /** Context the form sent (page, referrer, budget…). */
  context: Record<string, string>;
  activity: LeadActivity[];
  booking: Booking | null;
  chat: ChatSession | null;
};

export async function getLead(id: string): Promise<LeadDetail | null> {
  const db = adminDb();
  const doc = await db.collection("leads").doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  const lead = toLead(doc.id, data);
  const [activity, booking, chat] = await Promise.all([
    db.collection("leads").doc(id).collection("activity").orderBy("at", "desc").limit(100).get(),
    lead.bookingId ? db.collection("bookings").doc(lead.bookingId).get() : Promise.resolve(null),
    lead.chatId ? db.collection("chats").doc(lead.chatId).get() : Promise.resolve(null),
  ]);
  return {
    lead,
    context: (data.context as Record<string, string>) ?? {},
    activity: activity.docs.map((d) => ({ ...plain<LeadActivity>(d.data()), id: d.id })),
    booking: booking?.exists ? { ...plain<Booking>(booking.data()), id: booking.id } : null,
    chat: chat?.exists ? { ...plain<ChatSession>(chat.data()), id: chat.id } : null,
  };
}

/** All calls ever booked for a lead (the current one is also on the lead). */
export async function bookingsForLead(leadId: string): Promise<Booking[]> {
  const snap = await adminDb().collection("bookings").where("leadId", "==", leadId).get();
  return snap.docs.map((d) => ({ ...plain<Booking>(d.data()), id: d.id })).sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

/* ------------------------------ chats ------------------------------ */

export async function listChats(limit = 150): Promise<ChatSession[]> {
  const snap = await adminDb().collection("chats").orderBy("updatedAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<ChatSession>(d.data()), id: d.id }));
}

export async function getChat(id: string): Promise<ChatSession | null> {
  const doc = await adminDb().collection("chats").doc(id).get();
  return doc.exists ? { ...plain<ChatSession>(doc.data()), id: doc.id } : null;
}

/* ------------------------------ bookings ------------------------------ */

export async function listBookings(limit = 150): Promise<Booking[]> {
  const snap = await adminDb().collection("bookings").orderBy("startsAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<Booking>(d.data()), id: d.id }));
}

/* ------------------------------ tasks ------------------------------ */

export async function listTasks(limit = 300): Promise<Task[]> {
  const snap = await adminDb().collection("tasks").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<Task>(d.data()), id: d.id }));
}

export async function tasksForLead(leadId: string): Promise<Task[]> {
  const snap = await adminDb().collection("tasks").where("leadId", "==", leadId).get();
  return snap.docs.map((d) => ({ ...plain<Task>(d.data()), id: d.id })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/* ------------------------------ Teach Jadeed AI ------------------------------ */

export async function listKnowledge(limit = 300): Promise<KnowledgeEntry[]> {
  const snap = await adminDb().collection("knowledge").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<KnowledgeEntry>(d.data()), id: d.id }));
}

export async function listTickets(limit = 100): Promise<Ticket[]> {
  const snap = await adminDb().collection("tickets").orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => ({ ...plain<Ticket>(d.data()), id: d.id }));
}

/* ------------------------------ people ------------------------------ */

export async function listUsers(): Promise<UserProfile[]> {
  const snap = await adminDb().collection("users").limit(200).get();
  return snap.docs.map((d) => ({ ...plain<UserProfile>(d.data()), uid: d.id }));
}

/** Admins and team members, for "assign to" menus. */
export async function listStaff(): Promise<{ email: string; name: string }[]> {
  const users = await listUsers();
  return users
    .filter((user) => user.role === "admin" || user.role === "team")
    .map((user) => ({ email: user.email, name: user.name || user.email }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function listInvites(): Promise<Invite[]> {
  const snap = await adminDb().collection("invites").limit(200).get();
  return snap.docs.map((d) => ({ ...plain<Invite>(d.data()), email: d.id }));
}

/* ------------------------------ AI usage and reports ------------------------------ */

export async function aiUsage(month: string) {
  const doc = await adminDb().collection("usage").doc(month).get();
  const data = doc.data() ?? {};
  return {
    costMicros: Number(data.costMicros ?? 0),
    calls: Number(data.calls ?? 0),
    byFeature: (data.byFeature ?? {}) as Record<string, { calls?: number; costMicros?: number }>,
  };
}

export async function getAiReport(key: string): Promise<{ report: string; chats: number; createdAt: string } | undefined> {
  const doc = await adminDb().collection("aiReports").doc(key).get();
  if (!doc.exists) return undefined;
  const data = doc.data()!;
  return { report: String(data.report ?? ""), chats: Number(data.chats ?? 0), createdAt: iso(data.createdAt) };
}
