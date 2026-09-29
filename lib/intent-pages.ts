/**
 * Intent / niche landing pages — buyer-language URLs under /industries/[slug].
 * Keep claims honest; link to real case studies where we have proof.
 *
 * Pages that duplicated a service or niche page were merged and now redirect
 * (see next.config.mjs): seo-for-cleaning-companies → seo-for-cleaners,
 * google-ads-for-local-services → /services/digital-advertising,
 * websites-for-local-service-businesses → /services/web-development.
 */
export type IntentPage = {
  slug: string;
  /** Short label for footer / internal links */
  navLabel: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  whoFor: string[];
  outcomes: string[];
  howWeHelp: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedService: string;
  relatedCaseStudy?: string;
  ctaNote: string;
};

export const intentPages: IntentPage[] = [
  {
    slug: "seo-for-local-service-businesses",
    navLabel: "Trades & contractors",
    eyebrow: "Trades & contractors",
    h1: "Get more jobs for trades and contractors",
    seoTitle: "Websites, SEO & Google Ads for Trades and Contractors",
    seoDescription:
      "Websites, local SEO and Google Ads for electricians, roofers, builders, heating engineers, landscapers and other trades in the UK, US, Canada and UAE — with fixed, performance or tiered pricing.",
    intro:
      "Whether your work is emergency call-outs or month-long projects, your next customer is searching right now. We help trades and contractors show up on Google, look trustworthy and turn searches into calls and quote requests.",
    whoFor: [
      "Electricians, heating engineers, roofers, builders and renovators",
      "Landscapers, locksmiths, handymen, pest control and similar trades",
      "Single-van operators through multi-crew contractors",
      "Businesses doing high-ticket projects that suit a tiered fee",
    ],
    outcomes: [
      "More calls and quote requests from Google search and Maps",
      "Service pages and project galleries that build trust",
      "Quote forms that collect what you need to price the job",
      "Monthly reporting on enquiries and booked work",
    ],
    howWeHelp: [
      {
        title: "Emergency and project work, handled differently",
        text: "Fast tap-to-call routes for call-out work; detailed pages, galleries and quote forms for projects.",
      },
      {
        title: "Proof that wins jobs",
        text: "Project photos, reviews by job type, accreditations and guarantees presented clearly.",
      },
      {
        title: "Pricing that fits big jobs",
        text: "Fixed plans, a performance model, or a tiered fee per completed job for high-ticket work.",
      },
    ],
    faqs: [
      {
        question: "Which trades do you work with?",
        answer:
          "Most local trades: electricians, plumbers, heating engineers, roofers, builders, landscapers, locksmiths, handymen and similar businesses. If customers find you on Google, we can help.",
      },
      {
        question: "My jobs are high value — does a 10% fee make sense?",
        answer:
          "Often not. For high-ticket projects we usually recommend a lower percentage or a fixed fee per completed job, agreed before work starts. Fixed monthly plans are always available too.",
      },
      {
        question: "How long until SEO starts bringing jobs?",
        answer:
          "Google Business Profile fixes and new reviews can help within weeks. Organic search usually takes six to twelve months to compound, which is why SEO plans have a six-month minimum.",
      },
      {
        question: "Can you show my accreditations and licences?",
        answer:
          "Yes — registrations, licences, insurance and guarantees are some of the strongest trust signals a trade can show, and we build them into every relevant page.",
      },
    ],
    relatedService: "seo",
    relatedCaseStudy: "alpha-movers",
    ctaNote: "Tell us your trade and area — we will outline a free growth plan.",
  },
  {
    slug: "seo-for-uk-removals",
    navLabel: "SEO for UK removals",
    eyebrow: "Removals SEO",
    h1: "SEO for UK removals & moving companies",
    seoTitle: "SEO for UK Removals & Moving Companies",
    seoDescription:
      "Local SEO for UK movers — area pages and high-intent removals keywords that drive booked jobs. See our Alpha Movers results.",
    intro:
      "UK removals is competitive: every area and specialist job (piano, hoist, office move) has its own search demand. We build the pages and Google presence movers need to capture booking-ready searches.",
    whoFor: [
      "London and UK-wide removals companies",
      "Specialist movers (piano, hoist, office, student)",
      "New brands building organic visibility from scratch",
      "Firms already running ads who want cheaper long-term leads",
    ],
    outcomes: [
      "Visibility on brand + local removals searches",
      "Service and area pages that rank and convert",
      "Steady growth in organic clicks → bookings",
      "Reporting backed by real search data you can trust",
    ],
    howWeHelp: [
      {
        title: "Area and service pages",
        text: "Clear pages for where you work and what you move (e.g. East London removals, furniture hoist) so Google — and customers — understand your coverage.",
      },
      {
        title: "A site built to convert",
        text: "Fast pages, clear calls to action and quote forms so rankings turn into booked moves.",
      },
      {
        title: "Proven on a live UK mover",
        text: "We run end-to-end growth for Alpha Movers (London) — website, app, SEO and ads on a 10% model. See the case study for real numbers.",
      },
    ],
    faqs: [
      {
        question: "Do you only work with London movers?",
        answer:
          "No — London is where we have the deepest proof, but the same approach works for UK cities and regional movers.",
      },
      {
        question: "Will SEO replace Google Ads?",
        answer:
          "They work best together. Ads fill the pipeline now; SEO compounds so you’re less dependent on paid clicks over time.",
      },
    ],
    relatedService: "seo",
    relatedCaseStudy: "alpha-movers",
    ctaNote: "Share your coverage area — we’ll map the first keywords free.",
  },
];

export function getIntentPage(slug: string) {
  return intentPages.find((p) => p.slug === slug);
}
