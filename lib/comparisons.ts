export type Comparison = {
  slug: string;
  navLabel: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  competitor: string;
  intro: string;
  youGet: string[];
  theyMiss: string[];
  whyJadeed: string[];
  faqs: { question: string; answer: string }[];
};

export const comparisons: Comparison[] = [
  {
    slug: "jadeed-vs-fiverr",
    navLabel: "vs Fiverr",
    competitor: "Fiverr freelancers",
    h1: "Jadeed Solutions vs Fiverr for local service growth",
    seoTitle: "Jadeed Solutions vs Fiverr — SEO, Websites & Apps for Local Services",
    seoDescription:
      "Why local service businesses choose Jadeed over Fiverr gigs: accountable growth, websites, SEO, apps and a 10% bookings model — remote from Pakistan, UK & USA focus.",
    intro:
      "Fiverr is fine for a one-off logo. Growing a plumbing, cleaning or removals company needs someone who owns outcomes — calls and bookings — not a gig that disappears after delivery.",
    youGet: [
      "One team for website, SEO, apps and optional ads",
      "10% Growth Partnership so incentives stay aligned",
      "Built for local bookings, not generic “SEO packages”",
      "WhatsApp-first support with a real founder-led team",
    ],
    theyMiss: [
      "Random freelancers with no long-term ownership",
      "Hard to tie work to actual booked jobs",
      "You become the project manager across 5 gigs",
      "Little accountability after the order is “completed”",
    ],
    whyJadeed: [
      "Clear packages: SEO from £100/mo, websites from £199, or full 10% partnership",
      "Most clients grow on Google first — ads only when you ask",
      "6-month minimum so results can compound — no cancel-anytime gimmicks",
      "Remote team in Lahore keeps delivery fair-priced for UK & USA clients",
    ],
    faqs: [
      {
        question: "Is Jadeed cheaper than hiring on Fiverr?",
        answer:
          "Often yes for real growth work — and you get one accountable partner instead of stitching gigs together. We keep costs competitive because we’re based in Lahore and deliver remotely.",
      },
      {
        question: "Can I buy only a website or only SEO?",
        answer:
          "Yes. Fixed packages exist. The 10% partnership is optional when you want the full stack.",
      },
    ],
  },
  {
    slug: "jadeed-vs-upwork",
    navLabel: "vs Upwork",
    competitor: "Upwork contractors",
    h1: "Jadeed Solutions vs Upwork for service businesses",
    seoTitle: "Jadeed Solutions vs Upwork — Growth Partner for Local Services",
    seoDescription:
      "Compare Jadeed Solutions to Upwork: dedicated growth for UK & USA local services — SEO, websites, apps, 10% bookings model — without managing freelancers.",
    intro:
      "Upwork can source talent. It rarely replaces a growth partner who already knows how movers, cleaners and trades win jobs from Google.",
    youGet: [
      "Built for local bookings, not generic marketing",
      "Optional 10% after-booking model",
      "Website + SEO + app under one roof",
      "Small team (~10 clients) — senior attention",
    ],
    theyMiss: [
      "You interview, brief and QA every contractor",
      "Hourly burn without a booking-linked model",
      "Inconsistent quality across freelancers",
      "No shared niche library of city / service pages",
    ],
    whyJadeed: [
      "One partner instead of hiring and managing contractors yourself",
      "SEO from £100/mo, websites from £199, or 10% of bookings we generate",
      "Honest proof: Alpha Movers Search Console numbers on site",
      "WhatsApp and phone — fast decisions, no ticket queues",
    ],
    faqs: [
      {
        question: "Do you replace my Upwork developer?",
        answer:
          "We can take over website, SEO and growth as one engagement — so you’re not juggling multiple contracts.",
      },
    ],
  },
  {
    slug: "jadeed-vs-hostinger",
    navLabel: "vs Hostinger / DIY",
    competitor: "Hostinger & DIY builders",
    h1: "Jadeed Solutions vs Hostinger (and DIY website builders)",
    seoTitle: "Jadeed vs Hostinger / DIY Sites — Conversion & Google Growth",
    seoDescription:
      "A template site on Hostinger isn’t a growth system. Jadeed builds conversion-focused websites, SEO and apps for UK & USA local service businesses.",
    intro:
      "DIY builders get you “online”. They don’t get you ranked, converting, or booking jobs on autopilot. Templates don’t replace strategy.",
    youGet: [
      "Site structure built for calls and quotes",
      "SEO and city/service pages that compound",
      "Optional app when operations need it",
      "Ongoing partner — not a one-click theme",
    ],
    theyMiss: [
      "Hosting ≠ marketing",
      "No local SEO system out of the box",
      "Weak conversion UX for emergency / booking intent",
      "You’re still the marketer every week",
    ],
    whyJadeed: [
      "We sell bookings and visibility — not just hosting",
      "From £199 starter websites or 10% full partnership",
      "Pages built for Google search and real customer enquiries",
      "Ongoing SEO and reporting — not a one-time template",
    ],
    faqs: [
      {
        question: "Can you rebuild my Hostinger site?",
        answer:
          "Yes. We migrate or rebuild into a fast, mobile-first site designed to convert — then grow it with SEO.",
      },
    ],
  },
  {
    slug: "jadeed-vs-marketing-agency",
    navLabel: "vs big agencies",
    competitor: "Traditional marketing agencies",
    h1: "Jadeed Solutions vs traditional marketing agencies",
    seoTitle: "Jadeed vs Marketing Agencies — 10% Model for Local Services",
    seoDescription:
      "Tired of retainers? Jadeed offers SEO, websites and apps for local services with an optional 10% of bookings model — remote pricing from Pakistan.",
    intro:
      "Big agencies sell retainers and decks. Local service owners need booked jobs. Our model can align fees to bookings — and our overhead stays lean.",
    youGet: [
      "10% of bookings we generate (Growth Partnership)",
      "Or fixed SEO / website / app packages",
      "No setup fee · 6-month minimum",
      "Organic-first; ads only if you ask",
    ],
    theyMiss: [
      "High retainers even in quiet months",
      "Junior account juggling 40 clients",
      "Vanity metrics instead of bookings",
      "Push to spend more on ads by default",
    ],
    whyJadeed: [
      "10% of bookings we generate — or fixed SEO / website packages",
      "~10 active clients — hands-on, not a junior account farm",
      "Calculator on pricing so you can see what 10% looks like",
      "Lean remote team — fair pricing without big-agency overhead",
    ],
    faqs: [
      {
        question: "Is the 10% on all my revenue?",
        answer:
          "No — on bookings generated by our work, as defined in your agreement.",
      },
    ],
  },
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
