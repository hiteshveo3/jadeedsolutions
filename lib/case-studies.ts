export type CaseStudyMetric = { value: string; label: string };
export type CaseStudyImage = {
  src: string;
  alt: string;
  caption: string;
  /** true = temporary placeholder waiting for real asset */
  placeholder?: boolean;
};

export type CaseStudy = {
  id: string;
  client: string;
  website: string;
  industry: string;
  location: string;
  engagementModel: string;
  siteAge?: string;
  launched?: string;
  logo?: string;
  contactName?: string;
  services: string[];
  summary: string;
  story?: string[];
  testimonial?: { quote: string; name: string; role: string };
  metrics: CaseStudyMetric[];
  highlights: string[];
  topQueries: { query: string; note: string }[];
  images: CaseStudyImage[];
  /** Hidden from public lists until ready */
  draft?: boolean;
};

/**
 * Real client case studies. Numbers stay honest (GSC + client-confirmed).
 * Search Console measures search activity; booking counts are tracked separately.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "alpha-movers",
    client: "Alpha Movers",
    website: "https://alphamovers.co.uk",
    industry: "Removals & relocation (local service)",
    location: "London & Croydon, UK",
    engagementModel: "10% commission on generated bookings / sales",
    launched: "18 December 2025",
    siteAge: "Launched 18 Dec 2025 · ~9 months old (October 2026)",
    contactName: "Abdullah Bin Mustafa",
    services: [
      "seo",
      "web-development",
      "app-development",
      "digital-advertising",
    ],
    summary:
      "We built and support Alpha Movers across website, app, SEO, social and paid acquisition. In the latest three months (July–October 2026) the website produced 90+ booked jobs and 150+ enquiries. The latest Search Console screenshot, captured 19 October 2026, separately records 885 organic clicks and 273K impressions over three months.",
    story: [
      "Abdullah Bin Mustafa wanted growth but a classic monthly SEO retainer was tough on cash flow. We’d offered a monthly plan — he suggested something better: pay 10% after each booking our work generates. That model unlocked a full partnership instead of a slow drip of retainers.",
      "We didn’t only “do SEO”. We built the website, proposed and shipped a mobile app, ran social and ads, and pushed into services Alpha hadn’t focused on before — including sofa / furniture hoisting — so the site could rank for (and win) higher-value specialist jobs.",
      "Results compound: in the latest three months (July–October 2026) the website brought in 150+ enquiries and 90+ booked jobs. The 19 October Search Console capture records 885 clicks and 273K impressions over its latest three-month window.",
    ],
    testimonial: {
      quote:
        "Monthly SEO fees were hard for us. Paying 10% after bookings was the model that made sense — and Jadeed delivered the full stack: website, app, SEO and ads.",
      name: "Abdullah Bin Mustafa",
      role: "Alpha Movers · London",
    },
    metrics: [
      { value: "90+", label: "Booked jobs from the website (Jul–Oct 2026)" },
      { value: "150+", label: "Website enquiries (Jul–Oct 2026)" },
      { value: "273K", label: "Impressions (last 3 months)" },
      { value: "885", label: "Clicks (last 3 months)" },
      { value: "930", label: "Clicks (last 6 months · 4 Oct capture)" },
      { value: "285K", label: "Impressions (last 6 months · 4 Oct capture)" },
      { value: "273", label: "Clicks (last 28 days · 4 Oct capture)" },
      { value: "83.2K", label: "Impressions (last 28 days · 4 Oct capture)" },
      { value: "+312%", label: "Historical clicks: first vs final 28 days · Feb–Aug" },
    ],
    highlights: [
      "Client-led 10% after-booking model — better fit than a monthly SEO retainer.",
      "Full stack from Jadeed: website, mobile app, SEO, social and paid ads.",
      "Expanded into sofa / furniture hoisting SEO even though it wasn’t an early focus for the client.",
      "Latest 3 months (Jul–Oct 2026): 90+ booked jobs and 150+ enquiries from the website.",
      "Search Console, last 3 months: 885 clicks · 273K impressions · average position 17.9.",
    ],
    topQueries: [
      { query: "alpha movers", note: "Brand: 36 clicks, the top query" },
      { query: "furniture hoist / furniture hoist london", note: "Specialist service we pushed: 11 clicks, 635 impressions" },
      { query: "crate hire london / moving crates london", note: "Crate hire pages: 9.7K+ impressions" },
      { query: "man and van ilford / removals ilford", note: "High-intent local: 8 clicks" },
      { query: "removals croydon / stratford / enfield", note: "Geo pages: 1.4K+ impressions each" },
    ],
    images: [
      {
        src: "/case-studies/alpha-movers/homepage-oct-2026.webp",
        alt: "Alpha Movers website homepage",
        caption: "alphamovers.co.uk — homepage",
      },
      {
        src: "/case-studies/alpha-movers/gsc-3-months-19-oct-2026.webp",
        alt: "Google Search Console — Alpha Movers last 3 months, captured 19 October 2026",
        caption: "GSC — last 3 months, captured 19 Oct 2026 (885 clicks · 273K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-6-months-oct-2026.webp",
        alt: "Google Search Console — Alpha Movers last 6 months",
        caption: "GSC — last 6 months, captured 4 Oct 2026 (930 clicks · 285K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-3-months.png",
        alt: "Google Search Console — Alpha Movers last 3 months",
        caption: "Earlier GSC capture — 3-month window (216 clicks · 44.3K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-28-days-oct-2026.webp",
        alt: "Google Search Console — Alpha Movers last 28 days",
        caption: "GSC — last 28 days, captured 4 Oct 2026 (273 clicks · 83.2K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-7-days.png",
        alt: "Google Search Console — Alpha Movers last 7 days",
        caption: "Earlier GSC capture — 7-day window (36 clicks · 7.68K impressions)",
      },
    ],
  },
  {
    id: "just-shine",
    logo: "/clients/just-shine.png",
    client: "Just Shine Cleaning Services",
    website: "https://justshinecleaningservices.com",
    industry: "Cleaning (local service)",
    location: "Abu Dhabi, UAE",
    engagementModel: "10% commission on generated bookings",
    services: ["seo", "web-development", "digital-advertising"],
    summary:
      "Full growth stack for a competitive Abu Dhabi cleaning brand — website, social media and SEO on the 10% model. Search Console captured on 4 October 2026 shows 370 clicks and 22.3K impressions over three months, with 239 clicks and 12.8K impressions in the last 28 days. The website supports English and Arabic.",
    metrics: [
      { value: "370", label: "Organic clicks · last 3 months" },
      { value: "22.3K", label: "Impressions · last 3 months" },
      { value: "239", label: "Organic clicks · last 28 days" },
      { value: "12.8K", label: "Impressions · last 28 days" },
      { value: "476", label: "Organic clicks · last 6 months" },
      { value: "25.6K", label: "Impressions · last 6 months" },
    ],
    highlights: [
      "Ranked on competitive Abu Dhabi cleaning keywords (villa, deep clean, house cleaning and more).",
      "Website + social + SEO delivered as one package.",
      "Client publicly recommended the work on Trustpilot.",
    ],
    topQueries: [
      { query: "cleaning services abu dhabi", note: "Competitive — first page" },
      { query: "villa cleaning abu dhabi", note: "High-intent local" },
      { query: "deep cleaning services", note: "Service cluster" },
      { query: "house cleaning abu dhabi", note: "Residential intent" },
    ],
    images: [
      {
            "src": "/case-studies/just-shine/gsc-3-months-oct-2026.webp",
            "alt": "Just Shine Search Console — last 3 months, captured 4 October 2026",
            "caption": "370 clicks · 22.3K impressions · 1.7% CTR · position 24.6 · captured 4 Oct 2026"
      },
      {
            "src": "/case-studies/just-shine/gsc-6-months-oct-2026.webp",
            "alt": "Just Shine Search Console — last 6 months, captured 4 October 2026",
            "caption": "476 clicks · 25.6K impressions · 1.9% CTR · position 23.4 · captured 4 Oct 2026"
      },
      {
            "src": "/case-studies/just-shine/gsc-28-days-oct-2026.webp",
            "alt": "Just Shine Search Console — last 28 days, captured 4 October 2026",
            "caption": "239 clicks · 12.8K impressions · 1.9% CTR · position 16.9 · captured 4 Oct 2026"
      },
      {
            "src": "/case-studies/just-shine/homepage-oct-2026.webp",
            "alt": "Just Shine English website",
            "caption": "Just Shine website · English"
      },
      {
            "src": "/case-studies/just-shine/homepage-arabic-oct-2026.webp",
            "alt": "Just Shine Arabic website",
            "caption": "Just Shine website · Arabic"
      }
],
  },
  {
    id: "ihr-dream-cleaning",
    draft: true,
    client: "IHR Dream Cleaning",
    website: "#",
    industry: "Cleaning (local service)",
    location: "Local service market",
    engagementModel: "10% commission on generated bookings",
    services: ["seo", "web-development", "digital-advertising"],
    summary:
      "Same performance playbook as Just Shine — website and SEO for a local cleaning business on the 10% bookings model, targeting competitive cleaning service keywords.",
    metrics: [
      { value: "10%", label: "Commission model" },
      { value: "Local SEO", label: "Cleaning keywords" },
      { value: "Web + SEO", label: "Delivery" },
      { value: "TBD", label: "GSC numbers — coming" },
    ],
    highlights: [
      "Built for local cleaning search demand on a performance fee.",
      "Same keyword strategy family as other cleaning clients (services, villa, deep clean, house cleaning).",
    ],
    topQueries: [
      { query: "cleaning services", note: "Core service intent" },
      { query: "deep cleaning", note: "High-ticket service" },
      { query: "house cleaning", note: "Residential" },
    ],
    images: [
      {
        src: "/placeholders/add-image.svg",
        alt: "IHR Dream Cleaning — placeholder",
        caption: "Proof visuals — add kro bhai",
        placeholder: true,
      },
    ],
  },
  {
    id: "beta-relocations",
    draft: true,
    client: "Beta Relocations",
    website: "#",
    industry: "Removals & relocation (local service)",
    location: "Local service market",
    engagementModel: "10% commission on generated bookings",
    services: ["seo", "web-development", "digital-advertising"],
    summary:
      "Local relocations brand on the same 10% growth model — site, SEO and marketing built to win booking-intent search in a competitive moving market.",
    metrics: [
      { value: "10%", label: "Commission model" },
      { value: "Local SEO", label: "Moving keywords" },
      { value: "Web + SEO", label: "Delivery" },
      { value: "TBD", label: "GSC numbers — coming" },
    ],
    highlights: [
      "Performance-aligned: we earn when Beta Relocations books jobs.",
      "Same local-service SEO approach used for Alpha Movers.",
    ],
    topQueries: [
      { query: "removals / movers", note: "Core booking intent" },
      { query: "relocation services", note: "Service cluster" },
    ],
    images: [
      {
        src: "/placeholders/add-image.svg",
        alt: "Beta Relocations — placeholder",
        caption: "Proof visuals — add kro bhai",
        placeholder: true,
      },
    ],
  },
];

export function publishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => !c.draft);
}

export function getCaseStudy(id: string): CaseStudy | undefined {
  const study = caseStudies.find((c) => c.id === id);
  if (!study || study.draft) return undefined;
  return study;
}

export function getCaseStudiesForService(slug: string): CaseStudy[] {
  return publishedCaseStudies().filter((c) => c.services.includes(slug));
}
