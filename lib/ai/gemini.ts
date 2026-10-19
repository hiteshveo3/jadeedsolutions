import { GoogleGenAI, type GenerateContentResponseUsageMetadata } from "@google/genai";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";
import { sendMail, teamInbox, textEmail } from "@/lib/mail";

/* Gemini for every dashboard Jadeed AI feature (server only), plus the monthly budget —
   copied from Jadeed Marketing (src/lib/ai/gemini.ts).

   Cost control ("lowest running cost"): every call's tokens are added to usage/{yyyy-mm}.
   The owner gets one email at 50%, 80% and 100% of AI_MONTHLY_BUDGET_USD; at 100% the site
   chat stops calling Gemini and answers from the site's own pages. Prices are the paid-tier
   list prices for gemini-3.5-flash-lite (as on Jadeed Marketing, checked 4 Oct 2026). */

export const geminiModel = () => process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite";

export function gemini(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  return apiKey ? new GoogleGenAI({ apiKey }) : null;
}

const num = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const PRICE_INPUT_PER_M = () => num(process.env.GEMINI_PRICE_INPUT_PER_M, 0.3);
const PRICE_OUTPUT_PER_M = () => num(process.env.GEMINI_PRICE_OUTPUT_PER_M, 2.5);
/** Input tokens served from Gemini's automatic prompt cache. */
const PRICE_CACHED_PER_M = () => num(process.env.GEMINI_PRICE_CACHED_PER_M, 0.03);
export const monthlyBudgetUsd = () => num(process.env.AI_MONTHLY_BUDGET_USD, 10);

const ALERT_LEVELS = [0.5, 0.8, 1] as const;

export type AiFeature = "chat" | "chat_summary" | "lead" | "portal";

/** "2026-10" in Pakistan time, so the month turns over when the owner's does. */
const monthKey = (at = new Date()) => new Date(at.getTime() + 5 * 3600_000).toISOString().slice(0, 7);

/** Estimated cost of one call in micro-dollars. Cached input bills at the cached rate; thinking bills as output. */
export function costMicros(usage: GenerateContentResponseUsageMetadata | undefined) {
  if (!usage) return 0;
  const cached = usage.cachedContentTokenCount ?? 0;
  const input = Math.max(0, (usage.promptTokenCount ?? 0) - cached);
  const output = (usage.candidatesTokenCount ?? 0) + (usage.thoughtsTokenCount ?? 0);
  return Math.round(input * PRICE_INPUT_PER_M() + cached * PRICE_CACHED_PER_M() + output * PRICE_OUTPUT_PER_M());
}

/* The spend so far this month, cached briefly so a chat turn doesn't cost a read. */
type SpendCache = { month: string; micros: number; readAt: number };
const cache = globalThis as typeof globalThis & { __jadeedAiSpend?: SpendCache };

async function monthSpendMicros(): Promise<number> {
  const month = monthKey();
  const hit = cache.__jadeedAiSpend;
  if (hit && hit.month === month && Date.now() - hit.readAt < 60_000) return hit.micros;
  if (!firestoreReady()) return 0;
  try {
    const snap = await withTimeout(adminDb().collection("usage").doc(month).get(), 3000, "Reading AI usage");
    const micros = Number(snap.get("costMicros") ?? 0);
    cache.__jadeedAiSpend = { month, micros, readAt: Date.now() };
    return micros;
  } catch (error) {
    console.error("[ai] Could not read usage", error instanceof Error ? error.message : error);
    return hit?.micros ?? 0;
  }
}

/** true once this month's estimated spend has reached the budget. */
export async function overBudget() {
  return (await monthSpendMicros()) >= monthlyBudgetUsd() * 1_000_000;
}

/** Adds one call's tokens to this month's total and sends any budget alert it crosses. Never throws. */
export async function recordUsage(feature: AiFeature, usage: GenerateContentResponseUsageMetadata | undefined) {
  const micros = costMicros(usage);
  if (!micros || !firestoreReady()) return;
  const month = monthKey();
  const ref = adminDb().collection("usage").doc(month);
  try {
    const crossed = await withTimeout(
      adminDb().runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const before = Number(snap.get("costMicros") ?? 0);
        const after = before + micros;
        const budget = monthlyBudgetUsd() * 1_000_000;
        const sent: number[] = snap.get("alertsSent") ?? [];
        const due = ALERT_LEVELS.filter((level) => after >= level * budget && !sent.includes(level));
        tx.set(
          ref,
          {
            month,
            costMicros: FieldValue.increment(micros),
            inputTokens: FieldValue.increment(usage?.promptTokenCount ?? 0),
            cachedTokens: FieldValue.increment(usage?.cachedContentTokenCount ?? 0),
            outputTokens: FieldValue.increment((usage?.candidatesTokenCount ?? 0) + (usage?.thoughtsTokenCount ?? 0)),
            calls: FieldValue.increment(1),
            // set() with merge needs nested objects; dotted keys would become literal field names.
            byFeature: { [feature]: { calls: FieldValue.increment(1), costMicros: FieldValue.increment(micros) } },
            ...(due.length ? { alertsSent: FieldValue.arrayUnion(...due) } : {}),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
        cache.__jadeedAiSpend = { month, micros: after, readAt: Date.now() };
        return due.length ? { level: Math.max(...due), micros: after } : null;
      }),
      4000,
      "Recording AI usage"
    );
    if (crossed) await sendBudgetAlert(month, crossed.level, crossed.micros);
  } catch (error) {
    console.error("[ai] Could not record usage", error instanceof Error ? error.message : error);
  }
}

/** Usage from a raw REST call (the site chat streams over REST), in the SDK's shape. */
export function restUsage(meta: { promptTokenCount?: number; candidatesTokenCount?: number; cachedContentTokenCount?: number; thoughtsTokenCount?: number } | undefined) {
  return meta as GenerateContentResponseUsageMetadata | undefined;
}

async function sendBudgetAlert(month: string, level: number, micros: number) {
  const spent = `$${(micros / 1_000_000).toFixed(2)}`;
  const budget = `$${monthlyBudgetUsd().toFixed(2)}`;
  const text =
    level >= 1
      ? `Jadeed AI has used its ${budget} budget for ${month} (${spent}). The site chat now answers from the site's own pages until next month, or until AI_MONTHLY_BUDGET_USD is raised in Vercel.`
      : `Jadeed AI has used ${Math.round(level * 100)}% of its ${budget} budget for ${month} (${spent} so far). Nothing changes yet; at 100% the site chat stops calling the model until next month.`;
  await sendMail(teamInbox(), textEmail(`Jadeed AI budget: ${Math.round(level * 100)}% used for ${month}`, text));
}

/**
 * One JSON answer from Gemini, checked against a parser. Null on any failure (no key,
 * timeout, bad JSON), so every caller keeps a plain fallback.
 */
export async function askJson<T>(
  feature: AiFeature,
  prompt: string,
  jsonSchema: object,
  parse: (value: unknown) => T | null,
  options: { timeoutMs?: number; maxOutputTokens?: number; temperature?: number } = {}
): Promise<T | null> {
  const ai = gemini();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: geminiModel(),
      contents: prompt,
      config: {
        temperature: options.temperature ?? 0.2,
        maxOutputTokens: options.maxOutputTokens ?? 700,
        responseMimeType: "application/json",
        responseJsonSchema: jsonSchema,
        abortSignal: AbortSignal.timeout(options.timeoutMs ?? 15_000),
      },
    });
    await recordUsage(feature, response.usageMetadata);
    return parse(JSON.parse(response.text ?? "null"));
  } catch (error) {
    console.error(`[ai] ${feature} failed`, error instanceof Error ? error.message : error);
    return null;
  }
}
