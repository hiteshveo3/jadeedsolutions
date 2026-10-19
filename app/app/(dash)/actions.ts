"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { FACTS } from "@/lib/ai/facts";
import { gemini, geminiModel, recordUsage } from "@/lib/ai/gemini";
import { searchKnowledge } from "@/lib/ai/knowledge";
import { BOOKING, formatSlot } from "@/lib/booking";
import { BookingChangeError, cancelBooking, logLeadActivity, markCallOutcome } from "@/lib/bookings";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { loadChat } from "@/lib/jadeed-ai/store";
import { summarizeChat } from "@/lib/jadeed-ai/summary";
import { clearTaughtCache } from "@/lib/jadeed-ai/taught";
import { leadFacts } from "@/lib/leads/ai";
import { getSessionUser, isStaff, type SessionUser } from "@/lib/system/session";
import { LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/system/types";
import { pkMonth } from "@/lib/utils";

/* Dashboard mutations (from Jadeed Marketing's app/(dash)/actions.ts). Server Actions are
   reachable by direct POST, so every one checks the session itself before touching data.
   Each returns { ok } or { error } for the UI. */

export type ActionResult<T = object> = ({ ok: true } & T) | { ok: false; error: string };

/** Re-render every dashboard screen with the change (Next 15's stand-in for Next 16's refresh()). */
const refresh = () => revalidatePath("/app", "layout");

async function staff(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user || !isStaff(user.role)) throw new Error("Not allowed");
  return user;
}

async function admin(): Promise<SessionUser> {
  const user = await staff();
  if (user.role !== "admin") throw new Error("Not allowed");
  return user;
}

const fail = (error: unknown, fallback: string): { ok: false; error: string } => {
  if (error instanceof BookingChangeError) return { ok: false, error: error.message };
  console.error("[dashboard]", fallback, error instanceof Error ? error.message : error);
  return { ok: false, error: error instanceof Error && error.message === "Not allowed" ? "You're not allowed to do that." : fallback };
};

const id = z.string().regex(/^[A-Za-z0-9_-]{6,64}$/);
const STATUSES = Object.keys(LEAD_STATUS_LABEL) as [LeadStatus, ...LeadStatus[]];

/* ------------------------------ leads ------------------------------ */

export async function setLeadStatus(leadId: string, status: LeadStatus): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ leadId: id, status: z.enum(STATUSES) }).parse({ leadId, status });
    const ref = adminDb().collection("leads").doc(parsed.leadId);
    const before = (await ref.get()).get("status") as LeadStatus | undefined;
    if (before === parsed.status) return { ok: true };
    await ref.update({ status: parsed.status, updatedAt: FieldValue.serverTimestamp() });
    await logLeadActivity(parsed.leadId, {
      type: "status",
      text: `Moved from ${before ? LEAD_STATUS_LABEL[before] : "—"} to ${LEAD_STATUS_LABEL[parsed.status]}.`,
      by: user.email,
      byName: user.name,
    });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't change the status.");
  }
}

export async function assignLead(leadId: string, email: string): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ leadId: id, email: z.union([z.literal(""), z.string().email()]) }).parse({ leadId, email });
    await adminDb()
      .collection("leads")
      .doc(parsed.leadId)
      .update({ assignedTo: parsed.email || FieldValue.delete(), updatedAt: FieldValue.serverTimestamp() });
    await logLeadActivity(parsed.leadId, { type: "assign", text: parsed.email ? `Assigned to ${parsed.email}.` : "Unassigned.", by: user.email, byName: user.name });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't assign the lead.");
  }
}

export async function addLeadNote(leadId: string, text: string): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ leadId: id, text: z.string().trim().min(1).max(4000) }).parse({ leadId, text });
    await logLeadActivity(parsed.leadId, { type: "note", text: parsed.text, by: user.email, byName: user.name });
    await adminDb().collection("leads").doc(parsed.leadId).update({ updatedAt: FieldValue.serverTimestamp() });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't save the note.");
  }
}

const draftSchema = z.object({ subject: z.string().min(3).max(150), body: z.string().min(20).max(2500) });

/** Jadeed AI drafts a follow-up email for the team to edit and send themselves. Nothing is sent. */
export async function draftFollowUp(leadId: string, purpose: string): Promise<ActionResult<{ subject: string; body: string }>> {
  try {
    const user = await staff();
    const parsed = z.object({ leadId: id, purpose: z.string().trim().max(300) }).parse({ leadId, purpose });
    const ai = gemini();
    if (!ai) return { ok: false, error: "Jadeed AI isn't connected (no Gemini key)." };
    const db = adminDb();
    const doc = await db.collection("leads").doc(parsed.leadId).get();
    if (!doc.exists) return { ok: false, error: "That lead doesn't exist." };
    const lead = doc.data()!;
    const [notes, booking] = await Promise.all([
      db.collection("leads").doc(parsed.leadId).collection("activity").orderBy("at", "desc").limit(8).get(),
      lead.bookingId ? db.collection("bookings").doc(lead.bookingId).get() : Promise.resolve(null),
    ]);
    const call = booking?.exists && booking.get("status") === "confirmed" ? booking.data()! : null;
    const callLine = call
      ? `A call is already booked: ${formatSlot(call.startsAt.toDate().toISOString(), call.timeZone ?? BOOKING.fallbackZone)} their time, ${call.minutes} minutes by ${call.method === "meet" ? "Google Meet (the link is in their calendar invite)" : "WhatsApp"}. Don't ask to book another.`
      : "No call is booked.";
    const firstName = String(lead.contact?.name ?? "").split(/\s+/)[0] || "there";
    const preferred = lead.goal?.preferredCall;
    const facts = leadFacts({
      name: lead.contact?.name ?? "",
      company: lead.business?.name,
      service: lead.business?.service,
      budget: lead.business?.budget,
      jobValue: lead.business?.jobValue,
      message: lead.goal?.notes ?? "",
      preferredCall: preferred ? `${preferred.method}, ${preferred.day} around ${preferred.time}` : undefined,
      flags: lead.flags,
    });
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: `Write a short follow-up email from ${user.name || "Sameer"} at Jadeed Solutions (local SEO, websites, apps and Google Ads
for local service businesses, plus the Growth Partnership: £0 upfront, 10% of a paid customer invoice only after the customer
pays; the small team works remotely from Narowal, Pakistan) to this lead. Plain, warm, professional British English.
80–150 words. No hype, no emojis, never promise rankings, leads or results, never invent facts. End with one clear next step.
Sign off with ${user.name || "Sameer"}. Greet them as "Hi ${firstName},". Short paragraphs separated by blank lines.
Purpose from the team: ${parsed.purpose || "a friendly follow-up suited to where this lead is"}.
${callLine}
Lead status: ${LEAD_STATUS_LABEL[(lead.status as LeadStatus) ?? "new"]}. Score reason: ${lead.scoreReason ?? ""}.
AI summary: ${lead.aiSummary ?? ""}
Recent team notes:
${notes.docs.map((d) => `- ${d.get("text")}`).join("\n") || "- none"}

Lead facts:
${facts}`,
      config: {
        temperature: 0.4,
        maxOutputTokens: 700,
        responseMimeType: "application/json",
        responseJsonSchema: { type: "object", properties: { subject: { type: "string" }, body: { type: "string" } }, required: ["subject", "body"] },
        abortSignal: AbortSignal.timeout(15_000),
      },
    });
    await recordUsage("lead", response.usageMetadata);
    const draft = draftSchema.safeParse(JSON.parse(response.text ?? "{}"));
    if (!draft.success) return { ok: false, error: "Jadeed AI couldn't write a draft. Please try again." };
    await logLeadActivity(parsed.leadId, { type: "email_draft", text: `Drafted a follow-up: "${draft.data.subject}"`, by: user.email, byName: user.name });
    return { ok: true, ...draft.data };
  } catch (error) {
    return fail(error, "Couldn't draft the email.");
  }
}

/* ------------------------------ calls ------------------------------ */

export async function cancelCall(bookingId: string, reason: string): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ bookingId: id, reason: z.string().trim().max(300) }).parse({ bookingId, reason });
    await cancelBooking(parsed.bookingId, { email: user.email, name: user.name }, parsed.reason);
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't cancel the call.");
  }
}

export async function markCall(bookingId: string, outcome: "done" | "no_show"): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ bookingId: id, outcome: z.enum(["done", "no_show"]) }).parse({ bookingId, outcome });
    await markCallOutcome(parsed.bookingId, parsed.outcome, { email: user.email, name: user.name });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the call.");
  }
}

/* ------------------------------ chats ------------------------------ */

/** Writes (or rewrites) a chat's AI summary and tags now, instead of waiting for the visitor to leave. */
export async function summarizeChatNow(chatId: string): Promise<ActionResult> {
  try {
    await staff();
    const parsed = id.parse(chatId);
    const chat = await loadChat(parsed);
    if (!chat) return { ok: false, error: "That chat doesn't exist." };
    await summarizeChat({ ...chat, summarizedCount: 0 });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't summarise the chat.");
  }
}

const reportSchema = z.object({ report: z.string().min(20).max(4000) });

/**
 * "What people ask": Jadeed AI reads this month's chat summaries and unanswered questions and
 * writes a short report for the team. Saved in aiReports/chats-{yyyy-mm}.
 */
export async function writeChatReport(): Promise<ActionResult<{ report: string }>> {
  try {
    const user = await staff();
    const ai = gemini();
    if (!ai) return { ok: false, error: "Jadeed AI isn't connected (no Gemini key)." };
    const db = adminDb();
    const month = pkMonth();
    const since = new Date(`${month}-01T00:00:00+05:00`);
    const [chats, questions] = await Promise.all([
      db.collection("chats").where("updatedAt", ">=", since).orderBy("updatedAt", "desc").limit(300).get(),
      db.collection("knowledge").where("status", "==", "pending").limit(100).get(),
    ]);
    const summaries = chats.docs.map((d) => `- [${(d.get("tags") ?? []).join(", ")}] ${d.get("aiSummary") ?? d.get("messages")?.[0]?.text ?? ""}`).filter((line) => line.length > 6);
    if (!summaries.length) return { ok: false, error: "No chats this month yet." };
    const open = questions.docs.map((d) => `- (${d.get("count") ?? 1}×) ${d.get("question")}`);
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: `You help the team of Jadeed Solutions (local SEO, websites, apps, Google Ads and the Growth Partnership for local
service businesses) learn from their website chats. From this month's chat summaries and the questions Jadeed AI couldn't answer,
write a short report in plain English for the owner: 1) what people ask most, 2) objections or worries, 3) which trades and places
show up, 4) what to add to the website or teach Jadeed AI next, as 3–5 concrete actions. Use short headings and bullet points,
under 300 words. Only use what is in the data; no invented numbers.

Chats this month (${summaries.length}):
${summaries.join("\n").slice(0, 20000)}

Unanswered questions:
${open.join("\n") || "- none"}`,
      config: {
        temperature: 0.3,
        maxOutputTokens: 900,
        responseMimeType: "application/json",
        responseJsonSchema: { type: "object", properties: { report: { type: "string" } }, required: ["report"] },
        abortSignal: AbortSignal.timeout(25_000),
      },
    });
    await recordUsage("chat_summary", response.usageMetadata);
    const parsed = reportSchema.safeParse(JSON.parse(response.text ?? "{}"));
    if (!parsed.success) return { ok: false, error: "Jadeed AI couldn't write the report. Please try again." };
    await db.collection("aiReports").doc(`chats-${month}`).set({ month, report: parsed.data.report, chats: summaries.length, by: user.email, createdAt: FieldValue.serverTimestamp() });
    refresh();
    return { ok: true, report: parsed.data.report };
  } catch (error) {
    return fail(error, "Couldn't write the report.");
  }
}

/* ------------------------------ Teach Jadeed AI ------------------------------ */

const qa = z.object({ question: z.string().trim().min(5).max(300), answer: z.string().trim().max(2000) });

/** Saves a team answer. The team's answers wait for Sameer's approval; his own go live at once. */
export async function saveAnswer(entryId: string, question: string, answer: string, approve: boolean): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = qa.extend({ entryId: id }).parse({ entryId, question, answer });
    if (approve && user.role !== "admin") return { ok: false, error: "Only Sameer can approve answers." };
    if (approve && parsed.answer.length < 5) return { ok: false, error: "Write the answer before approving it." };
    await adminDb()
      .collection("knowledge")
      .doc(parsed.entryId)
      .update({
        question: parsed.question,
        answer: parsed.answer,
        aiDraft: false,
        answeredBy: user.email,
        updatedAt: FieldValue.serverTimestamp(),
        ...(approve ? { status: "approved", approvedBy: user.email, approvedAt: FieldValue.serverTimestamp() } : {}),
      });
    if (approve) clearTaughtCache();
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't save the answer.");
  }
}

export async function addAnswer(question: string, answer: string): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = qa.parse({ question, answer });
    if (parsed.answer.length < 5) return { ok: false, error: "Write the answer too." };
    const approved = user.role === "admin";
    await adminDb()
      .collection("knowledge")
      .add({
        question: parsed.question,
        answer: parsed.answer,
        status: approved ? "approved" : "pending",
        createdBy: user.email,
        answeredBy: user.email,
        ...(approved ? { approvedBy: user.email, approvedAt: FieldValue.serverTimestamp() } : {}),
        count: 0,
        createdAt: FieldValue.serverTimestamp(),
      });
    if (approved) clearTaughtCache();
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't add the answer.");
  }
}

export async function setAnswerStatus(entryId: string, status: "approved" | "pending" | "deleted"): Promise<ActionResult> {
  try {
    const user = await admin();
    const parsed = z.object({ entryId: id, status: z.enum(["approved", "pending", "deleted"]) }).parse({ entryId, status });
    const ref = adminDb().collection("knowledge").doc(parsed.entryId);
    if (parsed.status === "deleted") await ref.delete();
    else {
      if (parsed.status === "approved" && !String((await ref.get()).get("answer") ?? "").trim()) return { ok: false, error: "Write the answer before approving it." };
      await ref.update({ status: parsed.status, approvedBy: parsed.status === "approved" ? user.email : FieldValue.delete(), updatedAt: FieldValue.serverTimestamp() });
    }
    clearTaughtCache();
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the answer.");
  }
}

/** Jadeed AI drafts an answer from what the site already says; facts it lacks are left as [brackets] for the team. */
export async function draftAnswer(question: string): Promise<ActionResult<{ answer: string }>> {
  try {
    await staff();
    const parsed = z.string().trim().min(5).max(300).parse(question);
    const ai = gemini();
    if (!ai) return { ok: false, error: "Jadeed AI isn't connected (no Gemini key)." };
    const passages = searchKnowledge(parsed, 6);
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: `Draft a short answer (40–120 words, plain friendly British English) that Jadeed AI can give website visitors to this
question. Use only the facts and passages below. Where a fact is missing, write it as [needs a fact from Sameer: …] instead of
guessing. No promises of results, no invented numbers.

Question: ${parsed}

Business facts:
${FACTS}

Passages:
${passages.map((p) => `- ${p.title}: ${p.text}`).join("\n") || "- none"}`,
      config: {
        temperature: 0.2,
        maxOutputTokens: 500,
        responseMimeType: "application/json",
        responseJsonSchema: { type: "object", properties: { answer: { type: "string" } }, required: ["answer"] },
        abortSignal: AbortSignal.timeout(15_000),
      },
    });
    await recordUsage("chat_summary", response.usageMetadata);
    const answer = z.object({ answer: z.string().min(5).max(2000) }).safeParse(JSON.parse(response.text ?? "{}"));
    return answer.success ? { ok: true, answer: answer.data.answer } : { ok: false, error: "Jadeed AI couldn't draft an answer." };
  } catch (error) {
    return fail(error, "Couldn't draft the answer.");
  }
}

export async function markTicket(ticketId: string, status: "open" | "answered"): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = z.object({ ticketId: id, status: z.enum(["open", "answered"]) }).parse({ ticketId, status });
    await adminDb()
      .collection("tickets")
      .doc(parsed.ticketId)
      .update({ status: parsed.status, answeredBy: parsed.status === "answered" ? user.email : FieldValue.delete(), updatedAt: FieldValue.serverTimestamp() });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the question.");
  }
}

/* ------------------------------ tasks ------------------------------ */

const taskInput = z.object({
  title: z.string().trim().min(2).max(200),
  assignee: z.union([z.literal(""), z.string().email()]),
  due: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
  leadId: z.union([z.literal(""), id]),
});

export async function createTask(input: { title: string; assignee: string; due: string; leadId?: string }): Promise<ActionResult> {
  try {
    const user = await staff();
    const parsed = taskInput.parse({ ...input, leadId: input.leadId ?? "" });
    const db = adminDb();
    const [assignee, lead] = await Promise.all([
      parsed.assignee ? db.collection("users").where("email", "==", parsed.assignee).limit(1).get() : Promise.resolve(null),
      parsed.leadId ? db.collection("leads").doc(parsed.leadId).get() : Promise.resolve(null),
    ]);
    await db.collection("tasks").add({
      title: parsed.title,
      status: "todo",
      done: false,
      ...(parsed.assignee ? { assignee: parsed.assignee, assigneeName: assignee?.docs[0]?.get("name") ?? parsed.assignee } : {}),
      ...(parsed.due ? { due: parsed.due } : {}),
      ...(lead?.exists ? { leadId: lead.id, leadName: lead.get("business.name") || lead.get("contact.name") || "Lead" } : {}),
      createdBy: user.email,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    if (lead?.exists) await logLeadActivity(lead.id, { type: "note", text: `Task added: ${parsed.title}`, by: user.email, byName: user.name });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't add the task.");
  }
}

export async function updateTask(taskId: string, change: { status?: "todo" | "doing" | "done"; delete?: boolean }): Promise<ActionResult> {
  try {
    await staff();
    const parsed = z.object({ taskId: id, status: z.enum(["todo", "doing", "done"]).optional(), delete: z.boolean().optional() }).parse({ taskId, ...change });
    const ref = adminDb().collection("tasks").doc(parsed.taskId);
    if (parsed.delete) await ref.delete();
    else if (parsed.status) await ref.update({ status: parsed.status, done: parsed.status === "done", updatedAt: FieldValue.serverTimestamp() });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't update the task.");
  }
}

/* ------------------------------ settings: people ------------------------------ */

/** Invite a team member by email. If they've signed in before, their role changes straight away. */
export async function inviteMember(email: string, role: "team" | "admin"): Promise<ActionResult> {
  try {
    const user = await admin();
    const parsed = z.object({ email: z.string().trim().toLowerCase().email(), role: z.enum(["team", "admin"]) }).parse({ email, role });
    const db = adminDb();
    await db.collection("invites").doc(parsed.email).set({ email: parsed.email, role: parsed.role, invitedBy: user.email, createdAt: FieldValue.serverTimestamp() });
    const existing = await adminAuth().getUserByEmail(parsed.email).catch(() => null);
    if (existing) {
      await adminAuth().setCustomUserClaims(existing.uid, { role: parsed.role });
      await adminAuth().revokeRefreshTokens(existing.uid);
      await db.collection("users").doc(existing.uid).set({ role: parsed.role }, { merge: true });
    }
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't send the invite.");
  }
}

export async function revokeInvite(email: string): Promise<ActionResult> {
  try {
    await admin();
    const parsed = z.string().trim().toLowerCase().email().parse(email);
    await adminDb().collection("invites").doc(parsed).delete();
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't remove the invite.");
  }
}

/** Changes someone's role; they are signed out everywhere so the new role applies at once. */
export async function setMemberRole(uid: string, role: "admin" | "team" | "visitor"): Promise<ActionResult> {
  try {
    const user = await admin();
    const parsed = z.object({ uid: z.string().min(6).max(128), role: z.enum(["admin", "team", "visitor"]) }).parse({ uid, role });
    if (parsed.uid === user.uid) return { ok: false, error: "You can't change your own role." };
    await adminAuth().setCustomUserClaims(parsed.uid, { role: parsed.role });
    await adminAuth().revokeRefreshTokens(parsed.uid);
    await adminDb().collection("users").doc(parsed.uid).set({ role: parsed.role }, { merge: true });
    refresh();
    return { ok: true };
  } catch (error) {
    return fail(error, "Couldn't change the role.");
  }
}

/* ------------------------------ Ask Jadeed AI (team) ------------------------------ */

/**
 * The team asks Jadeed AI about their own data ("which A leads haven't been contacted?"). It
 * gets a compact snapshot of recent leads, calls, tasks and chats, never the whole database,
 * and answers only from it.
 */
export async function askTeamAI(question: string): Promise<ActionResult<{ answer: string }>> {
  try {
    const user = await staff();
    const parsed = z.string().trim().min(3).max(500).parse(question);
    const ai = gemini();
    if (!ai) return { ok: false, error: "Jadeed AI isn't connected (no Gemini key)." };
    const db = adminDb();
    const pk = (date: Date) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Karachi" }).format(date);
    const [leads, bookings, tasks, chats, questions, clients] = await Promise.all([
      db.collection("leads").orderBy("createdAt", "desc").limit(60).get(),
      db.collection("bookings").orderBy("startsAt", "desc").limit(30).get(),
      db.collection("tasks").where("done", "==", false).limit(60).get(),
      db.collection("chats").orderBy("updatedAt", "desc").limit(40).get(),
      db.collection("knowledge").where("status", "==", "pending").limit(30).get(),
      db.collection("clients").limit(60).get(),
    ]);
    const leadLines = leads.docs.map((d) => {
      const created = d.get("createdAt")?.toDate?.() as Date | undefined;
      return `- ${d.get("business.name") || d.get("contact.name")} | score ${d.get("score")} | ${d.get("status")} | ${d.get("business.service") ?? "?"} | ${d.get("business.trade") ?? ""} ${[d.get("business.city"), d.get("business.country")].filter(Boolean).join(", ")} | owner ${d.get("assignedTo") ?? "none"} | in ${created ? pk(created) : "?"} | next: ${d.get("nextStep") ?? ""}`;
    });
    const callLines = bookings.docs.map((d) => `- ${d.get("businessName") || d.get("contact.name")} | ${pk(d.get("startsAt").toDate())} PKT | ${d.get("status")} | ${d.get("method")}`);
    const taskLines = tasks.docs.map((d) => `- ${d.get("title")} | for ${d.get("assigneeName") ?? "anyone"} | due ${d.get("due") ?? "none"} | ${d.get("status")}`);
    const chatLines = chats.docs.map((d) => `- ${d.get("contact.name") || "visitor"} | ${(d.get("tags") ?? []).join(",")} | ${d.get("outcome") ?? "?"} | ${String(d.get("aiSummary") ?? "").slice(0, 160)}`);
    const clientLines = clients.docs.map((d) => `- ${d.get("businessName")} | ${d.get("status")} | ${d.get("feePercent")}% | last message from ${d.get("lastMessageFrom") ?? "nobody"}`);
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: `You are Jadeed AI inside the Jadeed Solutions team dashboard. ${user.name || "A team member"} asks a question about
the team's own data. Answer from the snapshot only, in plain short sentences or a short list, naming the leads. If the snapshot
can't answer it, say what's missing. Times are Pakistan time. Now: ${pk(new Date())} PKT.

Question: ${parsed}

Leads (newest 60): name | score | status | service | trade and place | owner | received | AI next step
${leadLines.join("\n") || "- none"}

Calls (latest 30):
${callLines.join("\n") || "- none"}

Open tasks:
${taskLines.join("\n") || "- none"}

Clients:
${clientLines.join("\n") || "- none"}

Recent chats: who | tags | outcome | summary
${chatLines.join("\n") || "- none"}

Questions Jadeed AI couldn't answer: ${questions.size}`,
      config: { temperature: 0.2, maxOutputTokens: 700, abortSignal: AbortSignal.timeout(20_000) },
    });
    await recordUsage("lead", response.usageMetadata);
    const answer = (response.text ?? "").trim();
    return answer ? { ok: true, answer } : { ok: false, error: "Jadeed AI had no answer. Try asking another way." };
  } catch (error) {
    return fail(error, "Couldn't get an answer.");
  }
}
