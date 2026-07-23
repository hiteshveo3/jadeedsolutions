export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Jadeed Solutions managed our social media and built a beautiful website. Their SEO helped us reach the first page for competitive Abu Dhabi cleaning keywords. Highly recommended.",
    name: "Just Shine Cleaning Services",
    role: "Cleaning business · Abu Dhabi · Trustpilot",
    avatar: "/placeholders/add-image.svg",
  },
  {
    quote:
      "They ranked 3 of my pages #1 in Google in just 14 days. Absolutely amazing.",
    name: "ASIF MASIH",
    role: "Google review · 5.0",
    avatar: "/placeholders/add-image.svg",
  },
  {
    quote:
      "Our organic traffic doubled in under three months. Their content and SEO game is strong.",
    name: "Arooj Fatima",
    role: "Google review · 5.0",
    avatar: "/placeholders/add-image.svg",
  },
];

export type WhyUsItem = {
  title: string;
  description: string;
};

export const whyUs: WhyUsItem[] = [
  {
    title: "Results, not reports",
    description:
      "We obsess over the metrics that move your business — revenue, leads, and ROI — not vanity numbers.",
  },
  {
    title: "Full-stack expertise",
    description:
      "SEO, development, apps, and paid media under one roof means a strategy that actually works together.",
  },
  {
    title: "Radical transparency",
    description:
      "Clear reporting, honest advice, and no jargon. You always know what we're doing and why.",
  },
  {
    title: "Senior talent",
    description:
      "Your account is run by experienced specialists, never handed off to juniors.",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  result: string;
  description: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "brightpath-seo",
    title: "BrightPath",
    category: "SEO",
    result: "+212% organic traffic",
    description:
      "A full technical overhaul and content strategy that grew qualified organic traffic by 212% in 11 months.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["SEO", "Content", "Technical"],
  },
  {
    slug: "ledgerloop-web",
    title: "LedgerLoop",
    category: "Web Development",
    result: "+60% demo requests",
    description:
      "A blazing-fast Next.js marketing site with a conversion-first design that lifted demo requests by 60%.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "UX", "CRO"],
  },
  {
    slug: "nimbus-ads",
    title: "Nimbus Retail",
    category: "Digital Advertising",
    result: "3.4x ROAS",
    description:
      "A rebuilt Google Ads and Meta funnel that scaled spend profitably to a 3.4x return on ad spend.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Google Ads", "Meta", "CRO"],
  },
  {
    slug: "fitpulse-app",
    title: "FitPulse",
    category: "App Development",
    result: "50k+ downloads",
    description:
      "A cross-platform fitness app with a delightful UX that hit 50k downloads in its first quarter.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tags: ["React Native", "UI/UX", "Growth"],
  },
  {
    slug: "verde-ecommerce",
    title: "Verde Market",
    category: "Web Development",
    result: "+38% conversion rate",
    description:
      "A headless e-commerce build with lightning-fast pages that boosted conversion rate by 38%.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    tags: ["E-commerce", "Headless", "Performance"],
  },
  {
    slug: "atlas-seo-ads",
    title: "Atlas Logistics",
    category: "SEO",
    result: "#1 for 40+ keywords",
    description:
      "A B2B SEO program that captured page-one rankings for over 40 high-intent commercial keywords.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    tags: ["B2B", "SEO", "Content"],
  },
];

export const homeFaqs: { question: string; answer: string }[] = [
  {
    question: "Who do you work with?",
    answer:
      "Local service businesses — movers, cleaners, trades and similar. We prioritise the UK and USA, then work with clients worldwide from our base in Lahore, Pakistan.",
  },
  {
    question: "How does the 10% pricing model work?",
    answer:
      "For local service businesses we can work on performance: you pay 10% of the bookings or sales our marketing generates. No setup fee, no monthly retainer — we win when you win. Fixed SEO, website and ads packages are also available.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Paid ads can bring enquiries within days. SEO usually shows meaningful movement in a few months and compounds over time. Websites are typically live in 1–3 weeks depending on scope.",
  },
  {
    question: "Do I need all four services?",
    answer:
      "No. Many clients start with a website or SEO alone. We’ll recommend the mix that fits your goals and budget — no upselling for the sake of it.",
  },
  {
    question: "Where are you based?",
    answer:
      "Lahore, Pakistan. We serve local service businesses in the UK and USA first, and clients worldwide.",
  },
];
