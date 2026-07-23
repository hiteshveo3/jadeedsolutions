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
  services: string[];
  summary: string;
  metrics: CaseStudyMetric[];
  highlights: string[];
  topQueries: { query: string; note: string }[];
  images: CaseStudyImage[];
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
    siteAge: "7 months old (as of July 2026)",
    services: [
      "seo",
      "web-development",
      "app-development",
      "digital-advertising",
    ],
    summary:
      "We built and run Alpha Movers end-to-end — website, app, SEO, social and paid ads — on a 10% performance model. In under 7 months a brand-new London removals site has built serious Google visibility across hundreds of local keywords. Roughly 1 in 10 organic clicks turns into a booking, so growth in clicks means growth in jobs.",
    metrics: [
      { value: "43.1K", label: "Impressions (last 3 months)" },
      { value: "213", label: "Clicks (last 3 months)" },
      { value: "~21", label: "Bookings est. (10% of clicks · 3 mo)" },
      { value: "116", label: "Clicks (last 28 days)" },
      { value: "~12", label: "Bookings est. (10% · 28 days)" },
      { value: "68", label: "Clicks (20 May–20 Jun)" },
    ],
    highlights: [
      "Full stack: website, mobile app, SEO, social media and digital ads — all by Jadeed Solutions.",
      "Brand queries converting: “alpha movers”, “alpha movers reviews”, “ilford movers”, “piano movers croydon”.",
      "Impression share rising on specialist London terms — sofa/furniture hoist, crate hire, East/North London removals, IT relocation.",
      "~10% of organic clicks become bookings — aligned incentives on the performance model.",
    ],
    topQueries: [
      { query: "alpha movers", note: "Brand — ranking & getting clicks" },
      { query: "piano movers croydon", note: "High-intent local — converting" },
      { query: "furniture hoist / sofa hoist", note: "Specialist cluster — strong impressions" },
      { query: "crate hire london", note: "Supporting service pages gaining visibility" },
      { query: "removals east london / croydon / stratford", note: "Geo pages building share" },
    ],
    images: [
      {
        src: "/case-studies/alpha-movers/gsc-3-months.png",
        alt: "Google Search Console — Alpha Movers last 3 months",
        caption: "GSC — last 3 months (213 clicks · 43.1K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-28-days.png",
        alt: "Google Search Console — Alpha Movers last 28 days",
        caption: "GSC — last 28 days (116 clicks · 21K impressions)",
      },
      {
        src: "/case-studies/alpha-movers/gsc-may-jun.png",
        alt: "Google Search Console — Alpha Movers May–June",
        caption: "GSC — 20 May to 20 Jun (68 clicks · 14.9K impressions)",
      },
      {
        src: "/placeholders/add-image.svg",
        alt: "Alpha Movers homepage screenshot — placeholder",
        caption: "Homepage screenshot — add kro bhai",
        placeholder: true,
      },
    ],
  },
  {
    id: "just-shine",
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

export function getCaseStudiesForService(slug: string): CaseStudy[] {
  return caseStudies.filter((c) => c.services.includes(slug));
}
