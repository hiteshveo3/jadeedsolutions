/* V Chauffeurs partnership proposal — every price, promise and caveat on the page
   comes from here, copied from the approved proposal text. Change numbers here only
   with the owner's approval. */

export const CLIENT = "V Chauffeurs";
export const TERM_MONTHS = 24;

export type PlanId = "fixed" | "balanced" | "performance";

export const PLANS: {
  id: PlanId;
  name: string;
  base: number;
  bonus: number;
  line: string;
  fit: string;
  recommended?: boolean;
}[] = [
  {
    id: "fixed",
    name: "Fixed Partnership",
    base: 300,
    bonus: 0,
    line: "One predictable monthly payment. No per-booking success fee.",
    fit: "Best if you want to know the partnership fee in advance, whether the system brings five bookings or fifty.",
    recommended: true,
  },
  {
    id: "balanced",
    name: "Balanced Partnership",
    base: 200,
    bonus: 10,
    line: "A lower monthly base with a modest success bonus.",
    fit: "Best if you want lower fixed costs while your digital partner shares in successful customer acquisition.",
  },
  {
    id: "performance",
    name: "Performance Partnership",
    base: 100,
    bonus: 20,
    line: "The lowest starting monthly investment.",
    fit: "Best for a newly launching business that wants the lowest fixed commitment and a partner paid more when customers actually book.",
  },
];

export const PLAN_INCLUDES = [
  "Complete core digital system",
  "Main SEO and AI search optimisation",
  "Ongoing maintenance and marketing",
  "Four promotional videos every month",
  "No setup or development fee",
];

export const fee = (base: number, bonus: number, bookings: number) => base + bonus * bookings;

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export type NodeId = "booking" | "website" | "customer" | "chauffeur" | "admin" | "seo" | "marketing";

export const ECOSYSTEM: {
  id: NodeId;
  name: string;
  short: string;
  purpose: string;
  does: string[];
  benefit: string;
}[] = [
  {
    id: "booking",
    name: "Booking system",
    short: "The centre of everything",
    purpose: "One place where every journey request, quote, confirmation and status lives.",
    does: [
      "Pickup and drop-off, dates, times and passengers",
      "Vehicle selection, single and multi-day requests",
      "Quotation, payment and confirmation workflows",
      "Automated booking emails and notifications",
      "Booking-source tracking for marketing",
    ],
    benefit: "Bookings stop living in scattered messages and spreadsheets. The process follows the way V Chauffeurs actually operates.",
  },
  {
    id: "website",
    name: "Premium website",
    short: "Your digital front door",
    purpose: "A fast, trustworthy website built for a premium UK chauffeur business.",
    does: [
      "Responsive on mobile, tablet and desktop",
      "Built around your services, vehicles and areas",
      "Straightforward booking enquiries",
      "Speed, security, accessibility and search visibility",
    ],
    benefit: "A professional presence customers can trust from the first visit, connected directly to your bookings.",
  },
  {
    id: "customer",
    name: "Customer app",
    short: "Android and iPhone",
    purpose: "A convenient way for customers to book and manage journeys from their phones.",
    does: ["Customer profiles", "New bookings and journey details", "Booking history", "Notifications"],
    benefit: "Repeat customers can book again in moments, without phone calls or long email threads.",
  },
  {
    id: "chauffeur",
    name: "Chauffeur app",
    short: "For your drivers",
    purpose: "A separate app that connects your chauffeurs to the central booking system.",
    does: ["Assigned journeys", "Journey information", "Status updates", "Functions agreed around how you allocate work"],
    benefit: "Drivers see what they need, and the office sees progress, without chasing updates.",
  },
  {
    id: "admin",
    name: "Admin dashboard",
    short: "Your control room",
    purpose: "The central management interface for the whole platform.",
    does: [
      "Booking records and statuses",
      "Customer, vehicle and chauffeur information",
      "Journey management",
      "Booking-source and performance reporting",
    ],
    benefit: "See and run the business from one screen instead of disconnected tools.",
  },
  {
    id: "seo",
    name: "SEO and AI search",
    short: "Getting discovered",
    purpose: "Making V Chauffeurs easy to find on Google and understandable to AI search tools.",
    does: ["Technical, service and local SEO", "Google Business Profile, where eligible", "Structured, consistent business information", "Content that answers real customer questions"],
    benefit: "More chances for people already searching for a chauffeur to find you, built in from day one.",
  },
  {
    id: "marketing",
    name: "Marketing and analytics",
    short: "Brand, video, reporting",
    purpose: "A consistent brand across channels, and clear reporting on what works.",
    does: ["Four ~30-second promotional videos a month", "Social media setup and content planning", "Promotional graphic design", "Monthly reporting on enquiries, bookings and sources"],
    benefit: "You know which channels bring real bookings, not just traffic.",
  },
];

export type BuildState = "live" | "build" | "planned" | "external";

/** The connected system, part by part. ROADMAP.status says where each part stands at the end of a month. */
export const SYSTEM_PARTS = ["Website", "Booking system", "SEO and AI search", "Customer app", "Chauffeur app", "Admin dashboard", "App-store publication"] as const;

export const ROADMAP: {
  month: number;
  title: string;
  target: string;
  work: string[];
  deliverables: string[];
  milestone: string;
  dependsOn: string;
  status: [BuildState, string][];
}[] = [
  {
    month: 1,
    title: "Business website goes live",
    target: "Launch the website with its essential booking functionality and SEO foundations.",
    work: [
      "Finalise the website's visual direction",
      "Build the primary website pages",
      "Establish the initial booking and enquiry flow",
      "Set up the technical infrastructure",
      "Apply SEO and AI-search-ready structure",
      "Configure analytics and search tools",
    ],
    deliverables: ["Live website", "Booking and enquiry flow", "SEO foundations", "Analytics and Search Console"],
    milestone: "Website live within the first month",
    dependsOn: "Business information, domain access and launch approvals from V Chauffeurs.",
    status: [
      ["live", "Live"],
      ["live", "Enquiries live"],
      ["build", "Foundations"],
      ["planned", "Planned"],
      ["planned", "Planned"],
      ["planned", "Planned"],
      ["planned", "Not started"],
    ],
  },
  {
    month: 2,
    title: "Advanced development and SEO",
    target: "Expand the booking platform and apps, and complete the major technical and content foundations.",
    work: [
      "Develop the customer and chauffeur apps",
      "Build and connect the admin dashboard",
      "Improve booking management workflows",
      "Implement advanced technical SEO",
      "Develop approved service and location content",
      "Test the connected system",
    ],
    deliverables: ["Customer and chauffeur apps in build", "Admin dashboard connected", "Service and location pages", "Advanced technical SEO"],
    milestone: "Apps and dashboard connected to one booking system",
    dependsOn: "Confirmed operating procedures and approval of service and location content.",
    status: [
      ["live", "Live"],
      ["build", "Expanding"],
      ["build", "Advanced SEO"],
      ["build", "In build"],
      ["build", "In build"],
      ["build", "Connected"],
      ["planned", "Not started"],
    ],
  },
  {
    month: 3,
    title: "Complete system and optimisation",
    target: "Complete the core website, mobile app and administration system.",
    work: [
      "Finalise core application features",
      "Integration and system testing",
      "Resolve identified technical issues",
      "Complete the primary SEO implementation",
      "Prepare apps for publication",
      "Set up ongoing monitoring and reporting",
    ],
    deliverables: ["Core connected system complete", "Apps ready for store submission", "Primary SEO complete", "Monitoring and monthly reporting"],
    milestone: "Functional core digital ecosystem within three months",
    dependsOn: "Timely decisions on agreed core features. Store publication then depends on Google and Apple review, and suitable Mac access for iPhone.",
    status: [
      ["live", "Live"],
      ["live", "Core complete"],
      ["live", "Primary SEO done"],
      ["live", "Ready to submit"],
      ["live", "Ready to submit"],
      ["live", "Core complete"],
      ["external", "Google and Apple review"],
    ],
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "When will the website be live?",
    a: "Our target is within the first month, provided the required business information, domain access and launch approvals are available. The core connected system (website, apps and dashboard) is targeted within a maximum of three months.",
  },
  {
    q: "Are the apps guaranteed to be on Google Play and the App Store in 90 days?",
    a: "No. We build and prepare the apps within the development period, but publication depends on account verification, testing and approval by Google and Apple, whose timelines we cannot control. The iPhone build also needs suitable Mac access, so iPhone publication may take additional time.",
  },
  {
    q: "Can you guarantee first position on Google?",
    a: "No responsible provider can. We aim for strong, sustainable visibility by building a useful, technically strong and trustworthy platform, then improving it continuously. AI optimisation likewise improves how well your business is understood, but cannot guarantee inclusion in third-party AI systems.",
  },
  {
    q: "What counts as an eligible booking?",
    a: "A completed, paid booking generated by our agreed digital marketing or customer acquisition channels. Cancelled or unpaid bookings never qualify, and existing customers acquired independently of our channels are not automatically included.",
  },
  {
    q: "Does a seven-day booking count as seven bookings?",
    a: "No. A multi-day booking counts as one booking and carries the same fixed bonus as any other eligible booking. There is no percentage of journey value: a £150 booking and a £2,000 booking carry the same bonus.",
  },
  {
    q: "Which costs are not included in the monthly fee?",
    a: "Project-specific third-party costs: the Claude AI subscription, Google Play and Apple developer registration, your domain, usage-based hosting and services, and any optional advertising. Our existing agency tools for SEO, design and AI video are included at no extra charge.",
  },
  {
    q: "Who owns the domain and customer data?",
    a: "V Chauffeurs. Your business information, customer records, domain and company-owned service accounts remain under your control. If the partnership ends, we coordinate a reasonable handover of the agreed project materials, credentials and data.",
  },
  {
    q: "Will Jadeed Solutions handle customers and journeys?",
    a: "No. We build and support the digital booking infrastructure. V Chauffeurs keeps the fleet, chauffeurs, customer service, journey fulfilment, prices, refunds, licences and insurance.",
  },
  {
    q: "What if our circumstances change during the 24 months?",
    a: "We would discuss it openly, give reasonable advance communication, review any outstanding payments and arrange an orderly transition where needed. We do not want the relationship defined by complicated penalties.",
  },
  {
    q: "What happens after 24 months?",
    a: "Both sides review the results, workload and requirements. The partnership can continue on existing pricing or on updated terms agreed together. Renewal is by mutual agreement.",
  },
];
