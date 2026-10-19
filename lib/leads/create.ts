import { FLAG_LABEL, type LeadSource, type PreferredCall } from "@/lib/system/types";
import { noticeEmail, sendMail, teamInbox, textEmail, mailConfigured } from "@/lib/mail";
import { appUrl, siteUrl } from "@/lib/system/urls";
import { analyzeLead, type LeadAnalysis } from "./ai";
import { canBook, scoreLead, type ScoreResult } from "./score";
import { saveLead } from "./store";

/**
 * One lead pipeline, as on Jadeed Marketing (lib/leads/create.ts): score with the rules, ask
 * Jadeed AI for the reason and summaries, save to Firestore, then email the team (score in
 * the subject) and the owner (with their private audit page). Callers validate the input.
 */

export type CreateLeadInput = {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  /** Typical value of one job, in pounds. */
  jobValue?: number;
  message: string;
  preferredCall?: PreferredCall;
  pageUrl?: string;
  referrer?: string;
  utm?: string;
  chatId?: string;
};

export type CreateLeadResult = {
  score: ScoreResult;
  analysis: LeadAnalysis;
  bookable: boolean;
  saved: { id: string; token: string } | null;
  auditUrl?: string;
  /** false only when the lead was neither saved nor emailed, so it would be lost. */
  delivered: boolean;
};

const REPLY_HOURS = 24;

const callText = (call?: PreferredCall) => (call ? `${call.method}, ${call.day} around ${call.time}${call.timeZone ? ` (${call.timeZone})` : " (their time)"}` : undefined);

export async function createLead(input: CreateLeadInput): Promise<CreateLeadResult> {
  const score = scoreLead(input);
  const wantsBooking = canBook(score.score);

  const analysis = await analyzeLead({
    name: input.name,
    company: input.company,
    service: input.service,
    budget: input.budget,
    jobValue: input.jobValue,
    message: input.message,
    preferredCall: callText(input.preferredCall),
    result: score,
    bookable: wantsBooking,
    replyHours: REPLY_HOURS,
  });

  const saved = await saveLead({
    source: input.source,
    status: "new",
    score: score.score,
    scoreReason: analysis.scoreReason,
    nextStep: analysis.nextStep,
    aiSummary: analysis.teamSummary,
    visitorSummary: analysis.visitorSummary,
    flags: score.flags,
    contact: { name: input.name, email: input.email || undefined, phone: input.phone || undefined },
    business: {
      name: input.company || undefined,
      service: input.service || undefined,
      trade: analysis.trade,
      city: analysis.city,
      country: analysis.country,
      jobValue: input.jobValue,
      currency: "GBP",
      budget: input.budget || undefined,
    },
    goal: { notes: input.message || undefined, preferredCall: input.preferredCall },
    bookable: wantsBooking,
    chatId: input.chatId,
    context: {
      pageUrl: input.pageUrl ?? "",
      referrer: input.referrer ?? "",
      utm: input.utm ?? "",
      scoredBy: analysis.by,
      points: String(score.points),
    },
  });

  const auditUrl = saved ? siteUrl(`/audit/${saved.token}`) : undefined;
  const result = { score, analysis, bookable: wantsBooking && Boolean(saved), saved, auditUrl };

  if (!mailConfigured()) {
    console.info("[lead] Email not configured — lead logged", { name: input.name, email: input.email, score: score.score, savedId: saved?.id });
    return { ...result, delivered: Boolean(saved) || process.env.NODE_ENV !== "production" };
  }

  const rows: [string, string | undefined][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Business", input.company],
    ["Service", input.service],
    ["Budget", input.budget],
    ["Typical job", input.jobValue ? `£${input.jobValue.toLocaleString("en-GB")}` : undefined],
    ["Preferred call", callText(input.preferredCall)],
    ["Flags", score.flags.map((flag) => FLAG_LABEL[flag]).join(", ") || undefined],
    ["Page", input.pageUrl],
  ];
  const team = await sendMail(
    teamInbox(),
    textEmail(
      `[${score.score} lead] ${input.company || input.name}${input.service ? ` — ${input.service}` : ""}`,
      [
        `Jadeed AI: ${analysis.scoreReason}`,
        `Next step: ${analysis.nextStep}`,
        "",
        ...rows.filter((row): row is [string, string] => Boolean(row[1])).map(([label, value]) => `${label}: ${value}`),
        "",
        "Message:",
        input.message,
        "",
        saved ? `Open in the dashboard: ${appUrl(`/leads/${saved.id}`)}` : "Not saved to the dashboard (database unavailable).",
      ].join("\n")
    ),
    { replyTo: input.email }
  );
  // A failed alert only loses the lead if it also wasn't saved to the dashboard.
  if (!team.sent && !saved) return { ...result, delivered: false };

  if (input.email) {
    const first = input.name.split(/\s+/)[0] || "there";
    await sendMail(
      input.email,
      noticeEmail({
        subject: "We've got your request — Jadeed Solutions",
        badge: "Free audit",
        preheader: `Sameer replies within ${REPLY_HOURS} hours.`,
        heading: `Thanks, ${first}. We're on it.`,
        paragraphs: [
          analysis.visitorSummary,
          `Within ${REPLY_HOURS} hours: Sameer reviews your website, Google visibility and competitors.`,
          wantsBooking && saved ? "You can pick a time for a free 30-minute call on your private audit page." : "Your plain-English plan comes by email.",
        ],
        button: auditUrl ? { label: "Open your audit page", href: auditUrl } : undefined,
        footer: "£0 upfront on the Growth Partnership: Jadeed's fee is due only after your customer pays.",
      }),
      { replyTo: teamInbox()[0] }
    );
  }
  return { ...result, delivered: true };
}
