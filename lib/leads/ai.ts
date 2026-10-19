import { z } from "zod";
import { askJson } from "@/lib/ai/gemini";
import { FLAG_LABEL, type LeadFlag } from "@/lib/system/types";
import type { ScoreResult } from "./score";

/* Jadeed AI for the free-audit form (server only), from Jadeed Marketing (lib/leads/ai.ts).
   Every call has a short timeout and a rules fallback, so the form never waits on, or fails
   because of, the model. On this site the form has no trade or city question, so Jadeed AI
   also picks those out of the message for the dashboard. */

export type AnalysisInput = {
  name: string;
  company?: string;
  service?: string;
  budget?: string;
  jobValue?: number;
  message: string;
  preferredCall?: string;
  result: ScoreResult;
  bookable: boolean;
  replyHours: number;
};

export type LeadAnalysis = {
  /** One sentence for the team: why this score. */
  scoreReason: string;
  /** The team's next best step. */
  nextStep: string;
  /** Two or three sentences for the dashboard. */
  teamSummary: string;
  /** What the visitor sees after sending: "Here's what I heard…" (never the score). */
  visitorSummary: string;
  trade?: string;
  city?: string;
  country?: string;
  by: "ai" | "rules";
};

const analysisSchema = z.object({
  scoreReason: z.string().min(5).max(300),
  nextStep: z.string().min(5).max(300),
  teamSummary: z.string().min(10).max(600),
  visitorSummary: z.string().min(10).max(700),
  trade: z.string().max(60),
  city: z.string().max(60),
  country: z.string().max(60),
});

/** Plain facts about the lead, one per line, for the model and for follow-up drafts. */
export function leadFacts(input: Omit<AnalysisInput, "result" | "bookable" | "replyHours"> & { flags?: string[] }) {
  return [
    `Name: ${input.name}`,
    input.company ? `Business: ${input.company}` : "",
    input.service ? `Service they picked: ${input.service}` : "",
    input.budget ? `Monthly budget: ${input.budget}` : "",
    input.jobValue ? `Typical value of one job: £${input.jobValue.toLocaleString("en-GB")}` : "",
    input.preferredCall ? `Preferred call: ${input.preferredCall}` : "",
    input.flags?.length ? `Flags: ${input.flags.map((f) => FLAG_LABEL[f as LeadFlag] ?? f).join(", ")}` : "",
    input.message ? `Message: ${input.message.slice(0, 1200)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function rulesAnalysis(input: AnalysisInput): LeadAnalysis {
  const firstName = input.name.split(/\s+/)[0] || "there";
  const heard = [
    `Thanks, ${firstName}. Here's what I heard: ${input.company || "your business"} is looking at ${input.service && !/not sure/i.test(input.service) ? input.service.toLowerCase() : "how to win more local customers"}.`,
    input.bookable
      ? "Sameer will review how you show up on Google and in AI answers, then talk it through with you on a free 30-minute call. Pick a time on your audit page."
      : `Sameer will review how you show up on Google and in AI answers and email you a plain-English plan within ${input.replyHours} hours.`,
  ];
  const step = input.result.flags.includes("regulated")
    ? "Check the profession's advertising rules before any proposal; send the audit by email."
    : input.bookable
      ? "Prepare the visibility audit before the call and confirm the territory is open."
      : "Send the audit by email within 24 hours and offer a call if they reply.";
  return {
    scoreReason: input.result.reason,
    nextStep: step,
    teamSummary: `${input.company || input.name}${input.service ? `, interested in ${input.service}` : ""}. ${input.result.reason}`,
    visitorSummary: heard.join(" "),
    by: "rules",
  };
}

export async function analyzeLead(input: AnalysisInput): Promise<LeadAnalysis> {
  const fallback = rulesAnalysis(input);
  const ai = await askJson(
    "lead",
    `You are Jadeed AI, the assistant of Jadeed Solutions (local SEO, websites, apps and Google Ads for local service
businesses in the UK, US, Canada and UAE, plus the Growth Partnership: £0 upfront, 10% of each paid customer invoice;
a small team works remotely from Narowal, Pakistan; Sameer takes the calls).
A business owner just sent the free-audit form. The rules gave this lead score ${input.result.score} (A best, C weakest)
for this reason: "${input.result.reason}". Flags: ${input.result.flags.join(", ") || "none"}.

Write, in plain professional British English, no emojis, no hype, never promising rankings, leads or results:
- scoreReason: one sentence for the team explaining the score, using the facts.
- nextStep: one sentence, the team's best next action.
- teamSummary: two or three sentences about the business for the dashboard.
- visitorSummary: 2–4 short sentences to the owner, starting "Thanks, ${input.name.split(/\s+/)[0]}." Repeat back what you
  understood (their trade, place, the main problem) so they can see they were heard. Never mention scores or flags.
  ${input.bookable ? "End by inviting them to pick a time for a free 30-minute call with Sameer on their audit page." : `End by saying Sameer will email a plain-English plan within ${input.replyHours} hours.`}
  If the message is in another language, write visitorSummary in that language.
- trade: their trade in one to three words (e.g. "Removals", "Plumbing"), or "" if the message doesn't say.
- city and country: where they work, or "" if not said.

Facts:
${leadFacts(input)}`,
    {
      type: "object",
      properties: {
        scoreReason: { type: "string" },
        nextStep: { type: "string" },
        teamSummary: { type: "string" },
        visitorSummary: { type: "string" },
        trade: { type: "string" },
        city: { type: "string" },
        country: { type: "string" },
      },
      required: ["scoreReason", "nextStep", "teamSummary", "visitorSummary", "trade", "city", "country"],
    },
    (value) => {
      const parsed = analysisSchema.safeParse(value);
      return parsed.success ? parsed.data : null;
    },
    { timeoutMs: 8000, maxOutputTokens: 700 }
  );
  if (!ai) return fallback;
  return { ...ai, trade: ai.trade || undefined, city: ai.city || undefined, country: ai.country || undefined, by: "ai" };
}
