import type { LeadFlag, LeadScore } from "@/lib/system/types";

/**
 * The A/B/C lead score, on Jadeed Marketing's model (lib/lead-flow.ts there): rule points
 * decide the grade, Jadeed AI only rewrites the reason. This site's form asks different
 * questions (service, monthly budget, typical job value, message), so the points come from
 * those. The server always scores; the browser never sends a score.
 *
 *   job value: ≥ £1,000 → 3, ≥ £400 → 2, ≥ £150 → 1
 *   budget £5k+ a month → 2, £1k–£5k or a one-time project → 1
 *   Growth Partnership → 1 · named the business → 1 · a clear message (80+ characters) → 1
 *   regulated profession → −1
 * A ≥ 5 points, B ≥ 3, otherwise C. Just researching or a very low job value → at most B.
 */

export type ScoreInput = {
  service?: string;
  budget?: string;
  /** Typical value of one job, in pounds. */
  jobValue?: number;
  company?: string;
  message?: string;
};

export type ScoreResult = { score: LeadScore; points: number; flags: LeadFlag[]; reason: string };

const REGULATED = /\b(solicitor|lawyer|law firm|legal services|barrister|clinic|dental|dentist|doctor|medical|healthcare|mortgage|financial advi[sc]er|conveyanc|pharmac|optician|physio|chiropract)/i;

const pounds = (value: number) => `£${Math.round(value).toLocaleString("en-GB")}`;
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function scoreLead(input: ScoreInput): ScoreResult {
  const flags: LeadFlag[] = [];
  const good: string[] = [];
  const weak: string[] = [];
  let points = 0;

  if (input.jobValue && input.jobValue > 0) {
    if (input.jobValue >= 1000) points += 3;
    else if (input.jobValue >= 400) points += 2;
    else if (input.jobValue >= 150) points += 1;
    (input.jobValue >= 400 ? good : weak).push(`a typical job is worth about ${pounds(input.jobValue)}`);
    if (input.jobValue < 100) flags.push("low_value");
  } else {
    weak.push("no job value given");
  }

  const budget = input.budget ?? "";
  if (/£5k|£10k/.test(budget)) {
    points += 2;
    good.push(`a budget of ${budget.toLowerCase()}`);
  } else if (/£1k–£5k|one-time/i.test(budget)) {
    points += 1;
  }

  if (/partnership/i.test(input.service ?? "")) {
    points += 1;
    good.push("wants the Growth Partnership");
  }
  if (input.company?.trim()) {
    points += 1;
    good.push("named their business");
  }
  const message = (input.message ?? "").trim();
  if (message.length >= 80) {
    points += 1;
    good.push("explained what they need");
  } else if (message.length < 25) {
    weak.push("a very short message");
  }

  if (/not sure/i.test(input.service ?? "") && /not sure/i.test(budget)) {
    flags.push("researching");
    weak.push("not sure yet what they need");
  }
  if (REGULATED.test(`${input.service ?? ""} ${input.company ?? ""} ${message}`)) {
    points -= 1;
    flags.push("regulated");
  }

  let score: LeadScore = points >= 5 ? "A" : points >= 3 ? "B" : "C";
  if ((flags.includes("researching") || flags.includes("low_value")) && score === "A") score = "B";

  const parts = [good.join(", "), weak.join(", ")].filter(Boolean);
  const reason = parts.length ? `${capitalise(parts.join("; but "))}.` : "Not enough answers to judge yet.";
  return { score, points, flags, reason };
}

/** A and B leads can book a call; C leads get the audit by email. */
export const canBook = (score: LeadScore) => score === "A" || score === "B";
