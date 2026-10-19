import { adminDb, firestoreReady, withTimeout } from "@/lib/firebase/admin";

/* Answers the team wrote in "Teach Jadeed AI" and Sameer approved (from Jadeed Marketing,
   where approved answers join the site knowledge). The site chat adds the best-matching ones
   to what the model reads, so a taught answer is used from the next question on. Read once
   and cached for five minutes; approving or deleting an answer clears the cache. */

export type TaughtAnswer = { id: string; question: string; answer: string };

const TTL_MS = 5 * 60 * 1000;
const cache = globalThis as typeof globalThis & { __jadeedTaught?: { at: number; items: TaughtAnswer[] } };

export function clearTaughtCache() {
  cache.__jadeedTaught = undefined;
}

async function approvedAnswers(): Promise<TaughtAnswer[]> {
  const hit = cache.__jadeedTaught;
  if (hit && Date.now() - hit.at < TTL_MS) return hit.items;
  if (!firestoreReady()) return [];
  try {
    const snap = await withTimeout(adminDb().collection("knowledge").where("status", "==", "approved").limit(300).get(), 3000, "Reading taught answers");
    const items = snap.docs
      .map((d) => ({ id: d.id, question: String(d.get("question") ?? ""), answer: String(d.get("answer") ?? "") }))
      .filter((item) => item.question && item.answer);
    cache.__jadeedTaught = { at: Date.now(), items };
    return items;
  } catch (error) {
    console.error("[jadeed-ai] Could not read taught answers", error instanceof Error ? error.message : error);
    return hit?.items ?? [];
  }
}

const STOP = new Set(["the", "a", "an", "is", "are", "do", "does", "you", "your", "i", "my", "we", "to", "of", "for", "in", "on", "and", "or", "it", "can", "what", "how", "with", "me"]);
const words = (text: string) => new Set(text.toLowerCase().replace(/[^a-z0-9£%]+/g, " ").split(" ").filter((w) => w.length > 1 && !STOP.has(w)));

/** Up to `limit` approved answers whose questions share the most words with this one. */
export async function taughtFor(question: string, limit = 2): Promise<TaughtAnswer[]> {
  const items = await approvedAnswers();
  if (!items.length) return [];
  const asked = words(question);
  return items
    .map((item) => {
      const known = words(item.question);
      let overlap = 0;
      for (const word of asked) if (known.has(word)) overlap += 1;
      return { item, score: overlap / Math.max(3, known.size) };
    })
    .filter((hit) => hit.score >= 0.34)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((hit) => hit.item);
}
