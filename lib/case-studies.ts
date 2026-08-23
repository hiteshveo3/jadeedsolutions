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
 * Booking estimate for Alpha: ~10% of organic clicks convert to bookings.
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
    siteAge: "Launched 18 Dec 2025 · ~7 months old (July 2026)",
    logo: "/case-studies/alpha-movers/logo-alpha.png",
    contactName: "Abdullah Bin Mustafa",
    services: [
      "seo",
      "web-development",
      "app-development",
      "digital-advertising",
    ],
    summary:
      "We built and run Alpha Movers end-to-end — website, app, SEO, social and paid ads — on a 10% performance model that the client proposed. Since launch on 18 Dec 2025, the brand-new London removals site has grown to 55.9K impressions and 339 organic clicks in 6 months, with visibility climbing sharply since June. Roughly 1 in 10 organic clicks becomes a booking.",
    story: [
      "Abdullah Bin Mustafa wanted growth but a classic monthly SEO retainer was tough on cash flow. We’d offered a monthly plan — he suggested something better: pay 10% after each booking our work generates. That model unlocked a full partnership instead of a slow drip of retainers.",
      "We didn’t only “do SEO”. We built the website, proposed and shipped a mobile app, ran social and ads, and pushed into services Alpha hadn’t focused on before — including sofa / furniture hoisting — so the site could rank for (and win) higher-value specialist jobs.",
      "Results compound in Search Console: 216 clicks · 44.3K impressions in the last 3 months; 122 clicks · 22K impressions in the last 28 days alone.",
    ],
    testimonial: {
      quote:
        "Monthly SEO fees were hard for us. Paying 10% after bookings was the model that made sense — and Jadeed delivered the full stack: website, app, SEO and ads.",
      name: "Abdullah Bin Mustafa",
      role: "Alpha Movers · London",
    },
    metrics: [
      { value: "55.9K", label: "Impressions (last 6 months)" },
      { value: "339", label: "Clicks (last 6 months)" },
      { value: "~34", label: "Bookings est. (10% of clicks · 6 mo)" },
      { value: "44.3K", label: "Impressions (last 3 months)" },
      { value: "216", label: "Clicks (last 3 months)" },
      { value: "122", label: "Clicks (last 28 days)" },
    ],
    highlights: [
      "Client-led 10% after-booking model — better fit than a monthly SEO retainer.",
      "Full stack from Jadeed: website, mobile app, SEO, social and paid ads.",
      "Expanded into sofa / furniture hoisting SEO even though it wasn’t an early focus for the client.",
      "6-month GSC: 339 clicks · 55.9K impressions · strong ramp since June 2026.",
      "~10% of organic clicks become bookings — incentives stay aligned.",
    ],
    topQueries: [
      { query: "alpha movers", note: "Brand — ranking & getting clicks" },
      { query: "piano movers croydon", note: "High-intent local — converting" },
      { query: "furniture hoist / sofa hoist", note: "Specialist service we pushed — strong impressions" },
      { query: "crate hire london", note: "Supporting service pages gaining visibility" },
      { query: "removals east london / croydon / stratford", note: "Geo pages building share" },
    ],
    images: [
      {
        src: "/case-studies/alpha-movers/logo-alpha.png",
        alt: "Alpha Movers logo",
        caption: "Alpha Movers logo",
      },
      {
        src: "/case-studies/alpha-movers/homepage.jpeg",
        alt: "Alpha Movers website homepage",
        caption: "alphamovers.co.uk — homepage",
      },
      {
        src: "/case-studies/alpha-movers/gsc-6-months.png",
        alt: "Google Search Console — Alpha Movers last 6 months",
        caption: "GSC — last 6 months (339 clicks · 55.9K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-3-months.png",
        alt: "Google Search Console — Alpha Movers last 3 months",
        caption: "GSC — last 3 months (216 clicks · 44.3K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-28-days.png",
        alt: "Google Search Console — Alpha Movers last 28 days",
        caption: "GSC — last 28 days (122 clicks · 22K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-7-days.png",
        alt: "Google Search Console — Alpha Movers last 7 days",
        caption: "GSC — last 7 days (36 clicks · 7.68K impressions)",
      },
    ],
  },
  {
    id: "just-shine",
    draft: true,
    client: "Just Shine Cleaning Services",
    website: "#",
    industry: "Cleaning (local service)",
    location: "Abu Dhabi, UAE",
    engagementModel: "10% commission on generated bookings",
    services: ["seo", "web-development", "digital-advertising"],
    summary:
      "Full growth stack for a competitive Abu Dhabi cleaning brand — website, social media and SEO on the 10% model. Ranked on tough local terms like cleaning services, villa cleaning, deep cleaning and house cleaning in Abu Dhabi despite strong competition.",
    metrics: [
      { value: "1st page", label: "Competitive cleaning keywords" },
      { value: "10%", label: "Commission model" },
      { value: "5", label: "Trustpilot review" },
      { value: "Full stack", label: "Web · SEO · Social" },
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
        src: "/placeholders/add-image.svg",
        alt: "Just Shine — proof visual",
        caption: "Rankings / website screenshot",
        placeholder: true,
      },
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
