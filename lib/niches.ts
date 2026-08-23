import { defaultAuthorSlug } from "./authors";
import { cities, type City } from "./cities";

/**
 * Industry landing pages under /industries/[slug] (+ /[city]).
 * Copy speaks to business owners buying SEO / web / apps — not trade how-tos.
 */

export type NicheCityView = City & {
  angle: string;
  exampleQueries: string[];
  marketNote: string;
};

export type Niche = {
  slug: string;
  navLabel: string;
  tradeLabel: string;
  tradePlural: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  experience: string[];
  expertise: { title: string; text: string }[];
  trustSignals: string[];
  methodology: { title: string; text: string }[];
  whoFor: string[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  relatedService: string;
  relatedCaseStudy?: string;
  authorSlug: string;
  reviewedAt: string;
  ctaNote: string;
  /** Query phrases for “{phrase} {city}” examples */
  searchPhrases: string[];
};

function cityAngle(niche: Niche, city: City): string {
  const place =
    city.country === "USA"
      ? `${city.name}${city.region ? `, ${city.region}` : ""}`
      : city.name;
  return `If you run a ${niche.tradeLabel} business in ${place}, customers already search online before they call. We help you show up — with SEO, a site that converts, and optional apps — so more of those searches become booked jobs.`;
}

function cityQueries(niche: Niche, city: City): string[] {
  const name = city.name.toLowerCase();
  return niche.searchPhrases.slice(0, 4).map((p) => `${p} ${name}`);
}

function cityMarketNote(niche: Niche, city: City): string {
  return `We focus on the work you want more of and the areas you actually cover in ${city.name} — then build Google visibility and a mobile-first website around that. Solo operators through larger firms: same goal, more bookings.`;
}

export function nicheCities(niche: Niche): NicheCityView[] {
  return cities.map((city) => ({
    ...city,
    angle: cityAngle(niche, city),
    exampleQueries: cityQueries(niche, city),
    marketNote: cityMarketNote(niche, city),
  }));
}

export const niches: Niche[] = [
  {
    slug: "seo-for-plumbers",
    navLabel: "Plumbers",
    tradeLabel: "plumbing",
    tradePlural: "plumbers",
    eyebrow: "Local service businesses",
    h1: "Get more plumbing jobs from Google",
    seoTitle: "SEO, Websites & Growth for Plumbing Businesses (UK & USA)",
    seoDescription:
      "SEO, websites and apps for plumbing companies in the UK & USA. Show up when locals search, turn clicks into calls. From £100/mo or 10% of bookings. 6-month minimum.",
    intro:
      "People look for a plumber online first. We help plumbing businesses across the UK and USA get found — with SEO, conversion-focused websites and apps when you need them — so more searches turn into booked work.",
    experience: [
      "We grow local service businesses that live on calls and bookings — not vanity traffic reports.",
      "Our Alpha Movers case study shows how the 10% after-booking model works for local services — plumbing firms can use the same option.",
      "You work with Sameer Ahmad Basra, founder of Jadeed Solutions — whether you’re a solo plumber or a multi-crew company.",
    ],
    expertise: [
      {
        title: "SEO that brings calls",
        text: "We get your business visible on Google for the searches that lead to jobs in your cities — then track what actually turns into enquiries.",
      },
      {
        title: "Websites built to convert",
        text: "Mobile-first pages with clear calls-to-action, trust and speed — so visitors call or book instead of bouncing.",
      },
      {
        title: "Apps when you’re ready",
        text: "Need booking or job-management on the phone? We build apps as a separate package — only if it fits your business.",
      },
      {
        title: "Ads only if you ask",
        text: "Most of our clients grow organically. If you want paid ads, you fund the spend — we can set up and manage campaigns without a separate management fee.",
      },
    ],
    trustSignals: [
      "5.0 on Google from 35 reviews",
      "Around 10 active clients — small team, hands-on work",
      "Clear packages: SEO, website or app — or full growth on 10% of bookings",
      "No setup fee · 6-month minimum on SEO plans",
      "Real case study with Google Search Console numbers on site",
    ],
    methodology: [
      {
        title: "1. We learn your business",
        text: "Where you work, what jobs you want more of, and how customers find you today.",
      },
      {
        title: "2. We fix the foundations",
        text: "Google presence, website speed and the pages that should be bringing calls.",
      },
      {
        title: "3. We grow visibility city by city",
        text: "Content and SEO for the markets you serve — UK and USA — built for customers and for Google search.",
      },
      {
        title: "4. You see results clearly",
        text: "Reporting on search, enquiries and — on the 10% model — bookings tied to our work.",
      },
    ],
    whoFor: [
      "Solo plumbers who want more phone calls",
      "Small and mid-size firms covering one city or many",
      "Larger plumbing companies expanding into new areas",
      "Owners who prefer 10% after bookings instead of a heavy retainer",
    ],
    outcomes: [
      "More visibility when people search for a plumber",
      "A site (and optional app) built for mobile and conversions",
      "Honest reporting you can understand",
      "Optional: pay 10% of bookings only",
    ],
    faqs: [
      {
        question: "Can I buy only SEO, or only a website / app?",
        answer:
          "Yes. We have separate packages for SEO, web development and app development. You don’t have to take everything.",
      },
      {
        question: "What’s the minimum commitment?",
        answer:
          "SEO plans have a 6-month minimum. There’s no setup fee and no big down payment — we need enough time for search results to compound.",
      },
      {
        question: "Do I have to run Google Ads?",
        answer:
          "No. Most of our work is organic. If you want ads later, you pay the ad spend; we can manage the campaigns.",
      },
      {
        question: "Do you work in the USA as well as the UK?",
        answer:
          "Yes. We target cities across both markets. Pick your city below or tell us where you operate.",
      },
    ],
    relatedService: "seo",
    relatedCaseStudy: "alpha-movers",
    authorSlug: defaultAuthorSlug,
    reviewedAt: "2026-07-24",
    ctaNote:
      "WhatsApp or call us with your city — we’ll outline a free plan.",
    searchPhrases: [
      "plumber",
      "emergency plumber",
      "plumbing company",
      "local plumber",
    ],
  },
  {
    slug: "seo-for-cleaners",
    navLabel: "Cleaners",
    tradeLabel: "cleaning",
    tradePlural: "cleaners",
    eyebrow: "Local service businesses",
    h1: "Get more cleaning bookings from Google",
    seoTitle: "SEO, Websites & Growth for Cleaning Businesses (UK & USA)",
    seoDescription:
      "SEO, websites and apps for cleaning companies in the UK & USA. Win end-of-tenancy, deep clean and office jobs online. From £100/mo SEO or 10% of bookings.",
    intro:
      "People search for cleaners before they book. We help cleaning businesses across the UK and USA get found — with SEO, conversion-focused websites and apps when you need them — so more searches turn into booked cleans.",
    experience: [
      "We grow local service businesses that live on bookings — not vanity traffic.",
      "Same removals case study proves the 10% model for local services — available to cleaning firms too.",
      "You work with Sameer Ahmad Basra and a small hands-on team — solo cleaners through multi-crew companies.",
    ],
    expertise: [
      {
        title: "SEO that brings bookings",
        text: "Visibility for the cleans people search — end of tenancy, deep clean, office, Airbnb — in the cities you cover.",
      },
      {
        title: "Websites built to convert",
        text: "Mobile-first pages with clear packages, trust and call-to-action — so visitors enquire instead of bouncing.",
      },
      {
        title: "Apps when you’re ready",
        text: "Need booking or scheduling on the phone? We build apps as a separate package when it fits.",
      },
      {
        title: "Ads only if you ask",
        text: "Most clients grow organically. If you want ads, you fund the spend — we can manage without a separate management fee.",
      },
    ],
    trustSignals: [
      "5.0 on Google from 35 reviews",
      "Around 10 active clients — small team, hands-on work",
      "SEO, website or app packages — or full growth on 10% of bookings",
      "No setup fee · 6-month minimum on SEO plans",
      "Real case study with Google Search Console numbers on site",
    ],
    methodology: [
      {
        title: "1. We learn your services & areas",
        text: "Residential, commercial, specialty cleans — and where you actually operate.",
      },
      {
        title: "2. We fix the foundations",
        text: "Google presence, website speed and the pages that should bring enquiries.",
      },
      {
        title: "3. We grow city by city",
        text: "Content and SEO for your markets — built for customers and for Google search.",
      },
      {
        title: "4. You see results clearly",
        text: "Reporting on search, enquiries and — on the 10% model — bookings tied to our work.",
      },
    ],
    whoFor: [
      "Solo cleaners who want more phone bookings",
      "Teams covering one city or many",
      "Commercial and residential cleaning companies",
      "Owners who prefer 10% after bookings instead of a heavy retainer",
    ],
    outcomes: [
      "More visibility when people search for a cleaner",
      "A site (and optional app) built for mobile and conversions",
      "Honest reporting you can understand",
      "Optional: pay 10% of bookings only",
    ],
    faqs: [
      {
        question: "Can I buy only SEO, or only a website / app?",
        answer:
          "Yes. Separate packages for SEO, web and app development. You don’t have to take everything.",
      },
      {
        question: "What’s the minimum commitment?",
        answer:
          "SEO plans have a 6-month minimum. No setup fee — we need time for search results to compound.",
      },
      {
        question: "Do you work in the UK and USA?",
        answer:
          "Yes. Pick your city on this niche or tell us where you operate.",
      },
    ],
    relatedService: "seo",
    relatedCaseStudy: "alpha-movers",
    authorSlug: defaultAuthorSlug,
    reviewedAt: "2026-07-24",
    ctaNote: "WhatsApp or call with your city — we’ll outline a free plan.",
    searchPhrases: [
      "cleaning services",
      "end of tenancy cleaning",
      "deep cleaning",
      "house cleaner",
    ],
  },
];

export function getNiche(slug: string) {
  return niches.find((n) => n.slug === slug);
}

export function getNicheCity(nicheSlug: string, citySlug: string) {
  const niche = getNiche(nicheSlug);
  if (!niche) return undefined;
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  const view = nicheCities(niche).find((c) => c.slug === citySlug);
  if (!view) return undefined;
  return { niche, city: view };
}

export function allNicheCityParams() {
  return niches.flatMap((n) =>
    cities.map((c) => ({ slug: n.slug, city: c.slug })),
  );
}
