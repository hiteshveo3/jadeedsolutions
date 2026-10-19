import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { getSessionUser, isStaff, type SessionUser } from "@/lib/system/session";

export const runtime = "nodejs";

/* The bell in the dashboard top bar (from Jadeed Marketing). Built from the records
   themselves, so there is no separate notifications collection to keep in sync. "Unread"
   means newer than users/{uid}.notificationsSeenAt.
   - Team: new leads, booked calls, client messages, questions for Sameer, questions Jadeed
     AI couldn't answer, and my tasks that are due.
   - Clients: team messages, work updates, proposals waiting, invoices due (owner only). */

type Notification = { id: string; kind: "lead" | "call" | "ticket" | "question" | "task" | "message" | "update" | "proposal" | "invoice"; title: string; detail?: string; href: string; at: string };

const iso = (value: unknown) => (value instanceof Timestamp ? value.toDate().toISOString() : typeof value === "string" ? value : new Date(0).toISOString());
const pkDay = () => new Date(Date.now() + 5 * 3600_000).toISOString().slice(0, 10);

async function teamItems(user: SessionUser): Promise<Notification[]> {
  const db = adminDb();
  const weekAgo = Timestamp.fromMillis(Date.now() - 7 * 86_400_000);
  const today = pkDay();
  const [leads, bookings, tickets, questions, tasks, clients] = await Promise.all([
    db.collection("leads").where("createdAt", ">=", weekAgo).orderBy("createdAt", "desc").limit(10).get(),
    db.collection("bookings").where("createdAt", ">=", weekAgo).orderBy("createdAt", "desc").limit(10).get(),
    db.collection("tickets").orderBy("createdAt", "desc").limit(10).get(),
    db.collection("knowledge").where("status", "==", "pending").limit(30).get(),
    db.collection("tasks").where("assignee", "==", user.email).limit(50).get(),
    db.collection("clients").orderBy("lastMessageAt", "desc").limit(10).get(),
  ]);
  return [
    ...leads.docs.map((d) => ({
      id: `lead-${d.id}`,
      kind: "lead" as const,
      title: `New ${d.get("score") ?? ""} lead: ${d.get("business.name") || d.get("contact.name") || "unnamed"}`,
      detail: [d.get("business.service"), d.get("business.city")].filter(Boolean).join(" · ") || undefined,
      href: `/leads/${d.id}`,
      at: iso(d.get("createdAt")),
    })),
    ...bookings.docs
      .filter((d) => d.get("status") === "confirmed")
      .map((d) => ({
        id: `call-${d.id}`,
        kind: "call" as const,
        title: `Call booked: ${d.get("businessName") || d.get("contact.name") || "lead"}`,
        detail:
          new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Karachi" }).format(d.get("startsAt").toDate()) + " PKT",
        href: `/leads/${d.get("leadId")}`,
        at: iso(d.get("createdAt")),
      })),
    ...clients.docs
      .filter((d) => d.get("lastMessageFrom") === "client")
      .map((d) => ({
        id: `message-${d.id}-${iso(d.get("lastMessageAt"))}`,
        kind: "message" as const,
        title: `Message from ${d.get("businessName")}`,
        href: `/clients/${d.id}?tab=messages`,
        at: iso(d.get("lastMessageAt")),
      })),
    ...tickets.docs
      .filter((d) => d.get("status") === "open")
      .map((d) => ({
        id: `ticket-${d.id}`,
        kind: "ticket" as const,
        title: `Reply needed: ${d.get("name") || d.get("email") || d.get("phone")}`,
        detail: String(d.get("question") ?? "").slice(0, 90) || undefined,
        href: "/teach",
        at: iso(d.get("createdAt")),
      })),
    ...questions.docs
      .filter((d) => !String(d.get("answer") ?? "").trim())
      .map((d) => ({
        id: `question-${d.id}`,
        kind: "question" as const,
        title: "Jadeed AI couldn't answer",
        detail: String(d.get("question") ?? "").slice(0, 90),
        href: "/teach",
        at: iso(d.get("lastAskedAt") ?? d.get("createdAt")),
      })),
    ...tasks.docs
      .filter((d) => d.get("status") !== "done" && d.get("due") && d.get("due") <= today)
      .map((d) => ({
        id: `task-${d.id}`,
        kind: "task" as const,
        title: d.get("due") < today ? `Overdue: ${d.get("title")}` : `Due today: ${d.get("title")}`,
        href: "/tasks",
        at: `${d.get("due")}T00:00:00+05:00`,
      })),
  ];
}

async function clientItems(user: SessionUser): Promise<Notification[]> {
  if (!user.clientId) return [];
  const db = adminDb();
  const ref = db.collection("clients").doc(user.clientId);
  const [messages, updates, proposals, invoices] = await Promise.all([
    ref.collection("messages").orderBy("createdAt", "desc").limit(10).get(),
    ref.collection("updates").orderBy("createdAt", "desc").limit(5).get(),
    ref.collection("proposals").where("status", "==", "sent").limit(5).get(),
    user.role === "client" ? db.collection("invoices").where("clientId", "==", user.clientId).get() : Promise.resolve(null),
  ]);
  return [
    ...messages.docs
      .filter((d) => d.get("from") === "team")
      .map((d) => ({ id: `message-${d.id}`, kind: "message" as const, title: `Message from ${d.get("byName") || "Jadeed"}`, detail: String(d.get("body") ?? "").slice(0, 90) || undefined, href: "/messages", at: iso(d.get("createdAt")) })),
    ...updates.docs.map((d) => ({ id: `update-${d.id}`, kind: "update" as const, title: `New ${d.get("kind") === "report" ? "report" : "update"}: ${d.get("title")}`, href: "/work", at: iso(d.get("createdAt")) })),
    ...proposals.docs.map((d) => ({ id: `proposal-${d.id}`, kind: "proposal" as const, title: `Proposal waiting: ${d.get("title")}`, href: `/proposals/${d.id}`, at: iso(d.get("sentAt") ?? d.get("createdAt")) })),
    ...(invoices?.docs ?? [])
      .filter((d) => d.get("status") === "sent")
      .map((d) => ({ id: `invoice-${d.id}`, kind: "invoice" as const, title: `Invoice ${d.get("number")} is due`, detail: d.get("dueOn") ? `Due ${d.get("dueOn")}` : undefined, href: "/invoices", at: `${d.get("issuedOn") ?? pkDay()}T00:00:00+05:00` })),
  ];
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Not allowed." }, { status: 403 });
  const portal = user.role === "client" || user.role === "client_staff";
  if (!isStaff(user.role) && !portal) return Response.json({ items: [], unread: 0 });
  const [me, items] = await Promise.all([adminDb().collection("users").doc(user.uid).get(), portal ? clientItems(user) : teamItems(user)]);
  const sorted = items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 20);
  const seen = iso(me.get("notificationsSeenAt"));
  return Response.json({ items: sorted, unread: sorted.filter((item) => item.at > seen).length }, { headers: { "Cache-Control": "no-store" } });
}

/** Marks everything up to now as seen. */
export async function POST() {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: "Not allowed." }, { status: 403 });
  await adminDb().collection("users").doc(user.uid).set({ notificationsSeenAt: FieldValue.serverTimestamp() }, { merge: true });
  return Response.json({ ok: true });
}
