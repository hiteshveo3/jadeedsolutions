import { z } from "zod";
import { askJson } from "@/lib/ai/gemini";
import { adminDb } from "@/lib/firebase/admin";
import { CHAT_TAGS, type ChatOutcome, type ChatSession, type ChatTag } from "@/lib/system/types";
import { logUnanswered, updateChat } from "./store";

/* After a chat goes quiet: an AI summary, tags and outcome for the dashboard (from Jadeed
   Marketing, lib/jadeed-ai/summary.ts). Runs from /api/chat/end (the widget's "chat closed"
   beacon), from the daily job for chats whose beacon never arrived, and from "Summarise
   again" in the dashboard. */

const summarySchema = z.object({
  summary: z.string().min(5).max(600),
  tags: z.array(z.enum(CHAT_TAGS)).max(4),
  outcome: z.enum(["answered", "not_fit", "left"]),
  language: z.string().min(2).max(8),
  unanswered: z.array(z.string().min(3).max(300)).max(5).optional(),
});

function transcript(chat: ChatSession) {
  return chat.messages
    .slice(-40)
    .map((m) => `${m.role === "user" ? "Visitor" : "Jadeed AI"}: ${m.text.slice(0, 1200)}${m.cards?.length ? `\n[${m.cards.join("; ")}]` : ""}`)
    .join("\n\n");
}

/** The outcome the data already proves; the model only judges the rest. */
async function knownOutcome(chat: ChatSession): Promise<ChatOutcome | null> {
  if (chat.leadId) {
    const lead = await adminDb().collection("leads").doc(chat.leadId).get().catch(() => null);
    return lead?.get("bookingId") ? "booked" : "lead";
  }
  if (chat.ticketId) return "handoff";
  return null;
}

export async function summarizeChat(chat: ChatSession) {
  if (!chat.userMessageCount || chat.messageCount <= (chat.summarizedCount ?? 0)) return;
  const result = await askJson(
    "chat_summary",
    `Summarise this website chat between a visitor and Jadeed AI (the assistant of Jadeed Solutions: local SEO,
websites, apps, Google Ads and the Growth Partnership for local service businesses) for the team's dashboard.
- summary: two or three plain English sentences: who the visitor is (if known), what they wanted, what happened.
- tags: up to four from the allowed list.
- outcome: "answered" if their questions were answered, "not_fit" if they turned out not to fit, "left" if they left mid-way.
- language: ISO 639-1 code of the visitor's language.
- unanswered: the visitor's questions that Jadeed AI could not answer from what it knew (said it wasn't sure, or
  suggested asking Sameer), rewritten as short standalone English questions. Empty if all were answered.

Chat:
${transcript(chat)}`,
    {
      type: "object",
      properties: {
        summary: { type: "string" },
        tags: { type: "array", items: { type: "string", enum: [...CHAT_TAGS] } },
        outcome: { type: "string", enum: ["answered", "not_fit", "left"] },
        language: { type: "string" },
        unanswered: { type: "array", items: { type: "string" } },
      },
      required: ["summary", "tags", "outcome", "language", "unanswered"],
    },
    (value) => {
      const parsed = summarySchema.safeParse(value);
      return parsed.success ? parsed.data : null;
    },
    { timeoutMs: 10_000, maxOutputTokens: 400 }
  );

  const firstQuestion = chat.messages.find((m) => m.role === "user")?.text ?? "";
  const fallbackTags: ChatTag[] = [];
  if (/fee|cost|price|percent|pay|£/i.test(firstQuestion)) fallbackTags.push("pricing");
  if (/partner|10%/i.test(firstQuestion)) fallbackTags.push("partnership");

  // Backstop for "Teach Jadeed AI": questions not logged during the chat itself.
  if (!chat.loggedQuestions) for (const question of result?.unanswered ?? []) await logUnanswered(question, chat.id);

  await updateChat(chat.id, {
    aiSummary: result?.summary ?? `Asked: "${firstQuestion.slice(0, 160)}"`,
    tags: result?.tags.length ? result.tags : fallbackTags.length ? fallbackTags : ["other"],
    outcome: (await knownOutcome(chat)) ?? result?.outcome ?? "answered",
    ...(result?.language ? { language: result.language.toLowerCase() } : {}),
    summarizedCount: chat.messageCount,
  });
}
