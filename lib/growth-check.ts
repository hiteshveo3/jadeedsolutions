/** Free Growth Check — scores gaps across website, Google, apps, ads, partnership. */

export type GrowthAnswer = {
  id: string;
  label: string;
  /** Points toward recommended services */
  scores: Partial<Record<GrowthServiceKey, number>>;
};

export type GrowthQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  answers: GrowthAnswer[];
};

export type GrowthServiceKey =
  | "website"
  | "seo"
  | "app"
  | "ads"
  | "partnership";

export const growthServiceMeta: Record<
  GrowthServiceKey,
  { label: string; href: string; blurb: string }
> = {
  website: {
    label: "Business website",
    href: "/services/web-development",
    blurb: "Mobile-first site built to turn visitors into calls and bookings.",
  },
  seo: {
    label: "SEO & Google presence",
    href: "/services/seo",
    blurb: "Show up when locals search — Google Maps, pages and content that book jobs.",
  },
  app: {
    label: "Mobile app",
    href: "/services/app-development",
    blurb: "Booking or job-management on iOS & Android when you’re ready.",
  },
  ads: {
    label: "Google Ads",
    href: "/services/digital-advertising",
    blurb: "Optional paid traffic — you fund spend; we can manage campaigns.",
  },
  partnership: {
    label: "Growth Partnership (10%)",
    href: "/pricing#partnership-calculator",
    blurb: "Website, SEO and optional ads — pay 10% of bookings we generate. No setup fee.",
  },
};

export const growthQuestions: GrowthQuestion[] = [
  {
    id: "website",
    prompt: "Do you have a business website today?",
    hint: "Not a Facebook page — your own site.",
    answers: [
      {
        id: "none",
        label: "No website yet",
        scores: { website: 5, partnership: 3 },
      },
      {
        id: "weak",
        label: "Yes, but it’s old / slow / not mobile-friendly",
        scores: { website: 4, seo: 2, partnership: 2 },
      },
      {
        id: "ok",
        label: "Yes — looks fine, not sure if it converts",
        scores: { website: 2, seo: 3, partnership: 2 },
      },
      {
        id: "strong",
        label: "Yes — already getting enquiries from it",
        scores: { seo: 2, partnership: 1 },
      },
    ],
  },
  {
    id: "google",
    prompt: "How do customers find you on Google?",
    answers: [
      {
        id: "invisible",
        label: "Almost never — we rely on referrals / ads only",
        scores: { seo: 5, partnership: 3 },
      },
      {
        id: "gbp-weak",
        label: "We have a Google profile, but few calls from it",
        scores: { seo: 4, website: 2, partnership: 2 },
      },
      {
        id: "some",
        label: "Some searches, but competitors outrank us",
        scores: { seo: 4, partnership: 2 },
      },
      {
        id: "strong",
        label: "We’re already strong for our main keywords",
        scores: { ads: 1, partnership: 1 },
      },
    ],
  },
  {
    id: "bookings",
    prompt: "What’s your biggest growth goal right now?",
    answers: [
      {
        id: "calls",
        label: "More phone calls & booked jobs",
        scores: { seo: 3, website: 2, partnership: 4 },
      },
      {
        id: "brand",
        label: "Look more professional online",
        scores: { website: 4, seo: 2 },
      },
      {
        id: "scale",
        label: "Scale into new cities without a big retainer",
        scores: { partnership: 5, seo: 3 },
      },
      {
        id: "ops",
        label: "Bookings / jobs managed on mobile",
        scores: { app: 5, website: 2, partnership: 2 },
      },
    ],
  },
  {
    id: "ads",
    prompt: "Are you running Google Ads (or similar) today?",
    answers: [
      {
        id: "no",
        label: "No — and I prefer organic first",
        scores: { seo: 3, partnership: 2 },
      },
      {
        id: "want",
        label: "Not yet, but I’d fund ads if managed well",
        scores: { ads: 4, seo: 2, partnership: 2 },
      },
      {
        id: "waste",
        label: "Yes — spending money with weak results",
        scores: { ads: 5, website: 2, seo: 2 },
      },
      {
        id: "fine",
        label: "Yes — ads are fine; need help with the rest",
        scores: { seo: 2, website: 2, partnership: 2 },
      },
    ],
  },
  {
    id: "model",
    prompt: "How do you prefer to pay for growth?",
    answers: [
      {
        id: "percent",
        label: "10% of bookings you generate sounds fair",
        scores: { partnership: 5 },
      },
      {
        id: "fixed",
        label: "Fixed packages (SEO, website or app)",
        scores: { seo: 2, website: 2, app: 1 },
      },
      {
        id: "unsure",
        label: "Not sure — show me both",
        scores: { partnership: 3, seo: 2, website: 2 },
      },
      {
        id: "mix",
        label: "Start fixed, maybe move to 10% later",
        scores: { seo: 2, website: 2, partnership: 3 },
      },
    ],
  },
];

export function scoreGrowth(
  answers: Record<string, string>,
): { key: GrowthServiceKey; score: number }[] {
  const totals: Record<GrowthServiceKey, number> = {
    website: 0,
    seo: 0,
    app: 0,
    ads: 0,
    partnership: 0,
  };

  for (const q of growthQuestions) {
    const answerId = answers[q.id];
    const answer = q.answers.find((a) => a.id === answerId);
    if (!answer) continue;
    for (const [k, v] of Object.entries(answer.scores)) {
      totals[k as GrowthServiceKey] += v ?? 0;
    }
  }

  return (Object.keys(totals) as GrowthServiceKey[])
    .map((key) => ({ key, score: totals[key] }))
    .sort((a, b) => b.score - a.score);
}
