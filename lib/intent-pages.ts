/**

 * Intent / niche landing pages — buyer-language URLs under /industries/[slug].

 * Keep claims honest; link to real case studies where we have proof.

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

    navLabel: "SEO for local services",

    eyebrow: "Local SEO",

    h1: "SEO for local service businesses (UK & USA)",

    seoTitle: "SEO for Local Service Businesses (UK & USA)",

    seoDescription:

      "Local SEO for UK & USA service businesses — show up on Google Maps and in search, get more calls and bookings. From £100/mo or 10% of bookings.",

    intro:

      "If you run a removals firm, cleaning company, trade or clinic, your next customer is already searching. We help you show up on Google — your listing, local map results, and pages that turn searches into booked jobs.",

    whoFor: [

      "Movers, cleaners, plumbers, electricians and trades",

      "Multi-van or multi-crew local service companies",

      "UK & USA businesses that need more phone calls and quote requests",

      "Owners tired of paying for every lead with no organic growth",

    ],

    outcomes: [

      "Stronger Google listing and local map visibility",

      "Rankings for service + city keywords",

      "More organic clicks that convert to bookings",

      "Clear monthly reporting — impressions, clicks, calls",

    ],

    howWeHelp: [

      {

        title: "Keywords your customers actually type",

        text: "We target real searches — “sofa hoist London”, “end of tenancy clean Manchester”, “plumber near me” — not vanity terms nobody books from.",

      },

      {

        title: "Google listing + website pages",

        text: "We optimise your Google Business Profile, build service and area pages, and write content aimed at people ready to book.",

      },

      {

        title: "Directories and trust online",

        text: "Consistent listings across directories so Google trusts who you are, where you work, and what you do.",

      },

    ],

    faqs: [

      {

        question: "How long until SEO starts booking jobs?",

        answer:

          "Most local service sites see meaningful movement in 3–6 months if the basics are solid. Speed depends on competition, site age, and how quickly we can improve your site and Google listing.",

      },

      {

        question: "Can I pay 10% of bookings instead of a monthly fee?",

        answer:

          "Yes. Our Growth Partnership is 10% of the bookings we generate — no setup fee and no monthly retainer. Fixed SEO from £100/mo is also available.",

      },

    ],

    relatedService: "seo",

    relatedCaseStudy: "alpha-movers",

    ctaNote: "Tell us your city and service — we’ll outline a free SEO plan.",

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

  {

    slug: "seo-for-cleaning-companies",

    navLabel: "SEO for cleaners",

    eyebrow: "Cleaning SEO",

    h1: "SEO for cleaning companies (UK & USA)",

    seoTitle: "SEO for Cleaning Companies (UK & USA)",

    seoDescription:

      "Local SEO for domestic, commercial and end-of-tenancy cleaners — more Google visibility and booked cleans in the UK & USA.",

    intro:

      "Cleaning searches are high-intent and local. We help cleaning companies rank for the services and areas that fill the calendar — domestic, commercial, end of tenancy, Airbnb and more.",

    whoFor: [

      "Domestic and commercial cleaning companies",

      "End-of-tenancy and deep-clean specialists",

      "Multi-crew cleaners expanding into new postcodes / ZIP codes",

      "UK & USA brands that need organic leads alongside ads",

    ],

    outcomes: [

      "Show up on Google Maps and in search for service + area terms",

      "Landing pages that push quote requests and bookings",

      "Stronger Google reviews and a well-maintained listing",

      "Reporting tied to enquiries, not vanity traffic",

    ],

    howWeHelp: [

      {

        title: "Service + area pages",

        text: "Pages for each high-value clean type and location so you capture “end of tenancy clean [city]” style searches.",

      },

      {

        title: "Google listing and reviews",

        text: "Profile optimisation and a steady review flow — both matter for local cleaners ranking on Google.",

      },

      {

        title: "Site speed and easy quoting",

        text: "Mobile-first pages with clear pricing cues and quote buttons so search traffic converts.",

      },

    ],

    faqs: [

      {

        question: "Do you build the website as well as SEO?",

        answer:

          "Yes. Many cleaners need both — a fast site plus local SEO. We can deliver either alone or as one package.",

      },

      {

        question: "USA and UK — same approach?",

        answer:

          "Same approach in each market: the right keywords, local listings, and pages that match how people search.",

      },

    ],

    relatedService: "seo",

    ctaNote: "Tell us your cities and service types — free SEO outline.",

  },

  {

    slug: "google-ads-for-local-services",

    navLabel: "Google Ads for local services",

    eyebrow: "Paid search",

    h1: "Google Ads for local service businesses",

    seoTitle: "Google Ads for Local Service Businesses",

    seoDescription:

      "Google Ads that book jobs for movers, cleaners and trades — tracked to calls and conversions. Or pay 10% of bookings we generate.",

    intro:

      "When someone searches “movers near me” or “emergency plumber”, they’re ready to book. We build Google Ads around cost-per-booking — tight geo targeting, call tracking and landing pages that convert.",

    whoFor: [

      "Local services that need leads this month",

      "Businesses with seasonal demand (moves, spring cleans)",

      "Firms wasting spend on broad match and poor landing pages",

      "Owners who want clear cost-per-booking reporting",

    ],

    outcomes: [

      "Campaigns structured by service and location",

      "Call and form conversion tracking",

      "Landing pages aligned to ad intent",

      "Weekly optimisation toward booked jobs",

    ],

    howWeHelp: [

      {

        title: "Account rebuild or launch",

        text: "Clean campaign structure, negatives, and location bids matched to where you actually work.",

      },

      {

        title: "Tracking that matters",

        text: "Calls, forms and (where possible) booked jobs — so you see ROI, not just clicks.",

      },

      {

        title: "Ads + SEO together",

        text: "Use ads for speed while SEO builds — or run both under our 10% Growth Partnership.",

      },

    ],

    faqs: [

      {

        question: "What’s the minimum ad budget?",

        answer:

          "It depends on your city and competition. We’ll recommend a realistic daily budget in the proposal — no inflated spend for the sake of it.",

      },

      {

        question: "Can ads be part of the 10% model?",

        answer:

          "Yes. On the Growth Partnership we manage ads as part of the work — you fund the ad spend; management is included in the 10% model.",

      },

    ],

    relatedService: "digital-advertising",

    ctaNote: "Share your service area — we’ll sketch a campaign plan free.",

  },

  {

    slug: "websites-for-local-service-businesses",

    navLabel: "Websites for local services",

    eyebrow: "Websites",

    h1: "Websites for local service businesses",

    seoTitle: "Websites for Local Service Businesses",

    seoDescription:

      "Fast, conversion-focused websites for UK & USA movers, cleaners and trades — built for quotes, calls and SEO. From £199.",

    intro:

      "Your website should get the phone ringing — not just look nice. We build fast, mobile-first sites for local service companies with clear services, trust signals and quote buttons.",

    whoFor: [

      "Local services launching or replacing an outdated site",

      "Businesses running ads onto a weak landing page",

      "Owners who need SEO-ready structure from day one",

      "Companies that want a site plus optional app or ads",

    ],

    outcomes: [

      "Mobile-first design that loads fast",

      "Service and area pages ready for SEO",

      "Quote / call buttons above the fold",

      "Easy path to expand with blog, booking or app",

    ],

    howWeHelp: [

      {

        title: "Built to convert",

        text: "Hero, proof, services and contact — structured so visitors know what you do and how to book in seconds.",

      },

      {

        title: "SEO-ready from launch",

        text: "Clean URLs, metadata, sitemap and a fast build so search isn’t an afterthought.",

      },

      {

        title: "Honest pricing",

        text: "Business websites from £199 — or included in the Growth Partnership when we grow you end-to-end.",

      },

    ],

    faqs: [

      {

        question: "How long does a site take?",

        answer:

          "Typical local-service marketing sites launch in a few weeks once content and branding are ready. We’ll give a clear timeline in the proposal.",

      },

      {

        question: "Can you migrate my old site without killing SEO?",

        answer:

          "Yes — we plan redirects and preserve ranking URLs wherever possible.",

      },

    ],

    relatedService: "web-development",

    relatedCaseStudy: "alpha-movers",

    ctaNote: "Send your current site (if any) — free conversion notes.",

  },

];



export function getIntentPage(slug: string) {

  return intentPages.find((p) => p.slug === slug);

}


