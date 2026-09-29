import { getIntentPage, intentPages } from "@/lib/intent-pages";
import { industryPlaybooks, type PlaybookSection } from "@/lib/industry-playbooks";
import { getNiche, niches, type Niche } from "@/lib/niches";

/** One shape for every /industries/[slug] page, whether it comes from a niche or an intent page. */
export type Industry = {
  slug: string;
  navLabel: string;
  /** Plural audience used in headings, e.g. "cleaning companies". */
  audience: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  capabilities: { title: string; text: string }[];
  whoFor: string[];
  outcomes: string[];
  trustSignals: string[];
  process: { title: string; description: string }[];
  playbook: PlaybookSection[];
  faqs: { question: string; answer: string }[];
  relatedService: string;
  relatedCaseStudy?: string;
  relatedGuide?: string;
  ctaNote: string;
  /** Present for trades with city pages. */
  niche?: Niche;
  updated?: string;
};

const labels: Record<string, { navLabel: string; audience: string }> = {
  "seo-for-plumbers": { navLabel: "Plumbers", audience: "plumbers" },
  "seo-for-cleaners": { navLabel: "Cleaners", audience: "cleaning companies" },
  "seo-for-uk-removals": { navLabel: "Movers & removals", audience: "removals companies" },
  "seo-for-local-service-businesses": { navLabel: "Trades & contractors", audience: "trades and contractors" },
};

const guideFor: Record<string, string> = {
  "seo-for-plumbers": "how-plumbers-get-more-jobs-online",
  "seo-for-cleaners": "how-cleaning-companies-get-more-bookings",
  "seo-for-local-service-businesses": "how-plumbers-get-more-jobs-online",
  "seo-for-uk-removals": "website-seo-app-or-10-percent",
};

const defaultProcess = [
  { title: "Free growth plan", description: "We learn your services, areas and job values, then review your Google visibility, website and competitors." },
  { title: "Fix the foundations", description: "Business Profile, tracking, mobile call routes and the service pages that should be bringing enquiries." },
  { title: "Grow visibility", description: "Content, reviews, genuine local pages and — if you want faster demand — focused ads." },
  { title: "Report and refine", description: "Monthly reporting on enquiries and booked work, and a plan for the next month." },
];

function stripNumber(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

function fromNiche(n: Niche): Industry {
  return {
    slug: n.slug,
    navLabel: labels[n.slug]?.navLabel ?? n.navLabel,
    audience: labels[n.slug]?.audience ?? n.tradePlural,
    eyebrow: n.navLabel,
    h1: n.h1,
    seoTitle: n.seoTitle,
    seoDescription: n.seoDescription,
    intro: n.intro,
    capabilities: n.expertise,
    whoFor: n.whoFor,
    outcomes: n.outcomes,
    trustSignals: n.trustSignals,
    process: n.methodology.map((m) => ({ title: stripNumber(m.title), description: m.text })),
    playbook: industryPlaybooks[n.slug] ?? [],
    faqs: n.faqs,
    relatedService: n.relatedService,
    relatedCaseStudy: n.relatedCaseStudy,
    relatedGuide: guideFor[n.slug],
    ctaNote: n.ctaNote,
    niche: n,
    updated: n.reviewedAt,
  };
}

export const industries: Industry[] = [
  ...niches.map(fromNiche),
  ...intentPages.map((p) => ({
    slug: p.slug,
    navLabel: labels[p.slug]?.navLabel ?? p.navLabel,
    audience: labels[p.slug]?.audience ?? p.navLabel.toLowerCase(),
    eyebrow: p.eyebrow,
    h1: p.h1,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    intro: p.intro,
    capabilities: p.howWeHelp,
    whoFor: p.whoFor,
    outcomes: p.outcomes,
    trustSignals: ["5.0 on Google from 35 reviews", "Around 10 active clients — small, hands-on team", "Every account set up in your business’s name", "0% markup on ad spend"],
    process: defaultProcess,
    playbook: industryPlaybooks[p.slug] ?? [],
    faqs: p.faqs,
    relatedService: p.relatedService,
    relatedCaseStudy: p.relatedCaseStudy,
    relatedGuide: guideFor[p.slug],
    ctaNote: p.ctaNote,
  })),
];

export function getIndustry(slug: string): Industry | undefined {
  const niche = getNiche(slug);
  if (niche) return fromNiche(niche);
  return industries.find((i) => i.slug === slug && getIntentPage(slug));
}
