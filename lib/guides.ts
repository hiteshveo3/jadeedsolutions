export type Guide = {

  slug: string;

  title: string;

  seoTitle: string;

  seoDescription: string;

  eyebrow: string;

  intro: string;

  relatedIndustry?: string;

  sections: { heading: string; body: string[] }[];

  faqs: { question: string; answer: string }[];

};



export const guides: Guide[] = [

  {

    slug: "how-plumbers-get-more-jobs-online",

    title: "How plumbers get more jobs online (without wasting ad spend)",

    seoTitle: "How Plumbers Get More Jobs Online — Website, Google & Apps",

    seoDescription:

      "Practical guide for plumbing businesses: website, Google visibility, optional apps and ads — and when a 10% growth partner makes sense.",

    eyebrow: "Plumbers",

    relatedIndustry: "seo-for-plumbers",

    intro:

      "Customers search before they call. This guide covers website, Google and optional ads — not SEO tips alone — so your plumbing business wins more booked jobs.",

    sections: [

      {

        heading: "1. Be findable when someone needs a plumber",

        body: [

          "Most jobs start on Google — maps, organic results, sometimes ads. If your Google listing and site are weak, referrals won't cover the gap forever.",

          "Fix the basics: accurate name, address and phone, categories, photos, and service pages for the work you actually want (and the cities you cover).",

        ],

      },

      {

        heading: "2. Your website must convert on mobile",

        body: [

          "A pretty site that doesn't show the phone number above the fold loses emergency and 'need someone today' traffic.",

          "Speed, clear CTAs (call / WhatsApp), trust and service pages matter more than stock photos of pipes.",

        ],

      },

      {

        heading: "3. Apps and ads — only when they fit",

        body: [

          "An app helps when you need booking or job flow on the phone — it's not mandatory on day one.",

          "Ads can fill gaps while organic grows. You fund ad spend; a good partner manages without pushing vanity budgets.",

        ],

      },

      {

        heading: "4. Choose a pricing model that matches cash flow",

        body: [

          "Fixed SEO (from £100/mo) or a website package works if you want a clear scope.",

          "A 10% Growth Partnership fits owners who want website, SEO and optional ads tied to bookings generated — with a 6-month minimum so results can compound.",

        ],

      },

    ],

    faqs: [

      {

        question: "Do I need SEO, a website and an app all at once?",

        answer:

          "No. Many plumbers start with website + SEO. Apps and ads come when the business is ready.",

      },

    ],

  },

  {

    slug: "how-cleaning-companies-get-more-bookings",

    title: "How cleaning companies get more bookings online",

    seoTitle: "How Cleaning Companies Get More Bookings — Web, Google & Growth",

    seoDescription:

      "Guide for cleaning businesses: win more jobs with a converting website, Google visibility, optional ads/apps — and Jadeed's 10% model.",

    eyebrow: "Cleaners",

    relatedIndustry: "seo-for-cleaners",

    intro:

      "Cleaning is competitive in every city. The winners aren't always the cheapest — they're the easiest to find and book. Here's what actually moves the needle.",

    sections: [

      {

        heading: "1. Rank for the cleans people actually search",

        body: [

          "End of tenancy, deep clean, office clean, Airbnb turnaround — each intent needs a clear page and Google presence.",

          "City and neighbourhood coverage helps when you serve more than one area.",

        ],

      },

      {

        heading: "2. Website that books, not just informs",

        body: [

          "Show packages, what's included, and a frictionless way to enquire on mobile.",

          "Trust (reviews, photos of real work) beats generic stock imagery.",

        ],

      },

      {

        heading: "3. Grow without a bloated retainer",

        body: [

          "Organic-first keeps customer acquisition cost sane.",

          "When you want aligned incentives, a 10% of bookings model can beat paying a big agency every quiet month.",

        ],

      },

    ],

    faqs: [

      {

        question: "Can Jadeed help cleaning companies in the UK and USA?",

        answer:

          "Yes. We build websites, SEO and optional apps/ads for local cleaners across both markets.",

      },

    ],

  },

  {

    slug: "website-seo-app-or-10-percent",

    title: "Website, SEO, app — or 10% partnership? How to choose",

    seoTitle: "Website vs SEO vs App vs 10% Partnership — What Local Services Need",

    seoDescription:

      "Choose the right Jadeed package: fixed website, SEO from £100/mo, mobile app, Google Ads, or Growth Partnership at 10% of bookings.",

    eyebrow: "All services",

    intro:

      "You don't need everything on day one. Use this decision guide to pick the path that matches your stage — then talk to us on WhatsApp.",

    sections: [

      {

        heading: "Start with a website if…",

        body: [

          "You have no site, or a site that looks unprofessional on mobile.",

          "People can't find your number or services in two taps.",

        ],

      },

      {

        heading: "Add SEO if…",

        body: [

          "You already have a decent site but few organic calls.",

          "Competitors own Google Maps and search results in your cities.",

        ],

      },

      {

        heading: "Consider an app if…",

        body: [

          "Customers or crews need booking / job management on the phone.",

          "You're ready for a separate build package — not required for every trade.",

        ],

      },

      {

        heading: "Choose 10% partnership if…",

        body: [

          "You want website, SEO and optional ads with fees tied to bookings we generate.",

          "You can commit 6 months and prefer no heavy setup fee.",

        ],

      },

    ],

    faqs: [

      {

        question: "Can I switch from fixed SEO to 10% later?",

        answer:

          "Often yes — we'll agree scope in writing when you're ready.",

      },

    ],

  },

];



export function getGuide(slug: string) {

  return guides.find((g) => g.slug === slug);

}


