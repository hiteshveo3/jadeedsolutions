export type ReviewSource = "Google" | "Trustpilot";

export type ClientReview = {
  name: string;
  quote: string;
  rating: 5 | 4;
  source: ReviewSource;
  /** Optional business / role for local-service proof */
  business?: string;
  /** Service relevance tags for filtering on service pages */
  tags: Array<
    | "seo"
    | "web-development"
    | "app-development"
    | "digital-advertising"
    | "general"
    | "local-service"
  >;
};

/** Live aggregates — update when they change */
export const googleAggregate = {
  score: "5.0",
  count: 35,
  label: "from 35 Google reviews",
  url: "https://share.google/sM4TWgJGFe1bkMcjA",
} as const;

export const trustpilotAggregate = {
  score: "4.0",
  count: 3,
  label: "from 3 Trustpilot reviews",
  url: "https://www.trustpilot.com/review/jadeedsolutions.com",
} as const;

/**
 * Curated real reviews. Quotes are briefly edited for length where needed,
 * without inventing claims. Local service businesses are tagged `local-service`
 * and ranked first when selecting for service pages.
 */
export const clientReviews: ClientReview[] = [
  // —— Local service (priority) ——
  // Just Shine / cleaning clients: hold until cleaning niche goes live
  {
    name: "ASIF MASIH",
    quote: "They got several of my pages ranking well on Google quickly. Absolutely amazing.",
    rating: 5,
    source: "Google",
    tags: ["seo", "local-service"],
  },
  {
    name: "Arooj Fatima",
    quote:
      "Our organic traffic grew strongly within a few months. Their content and SEO work is solid.",
    rating: 5,
    source: "Google",
    tags: ["seo", "local-service"],
  },
  {
    name: "Mariam Ammad",
    quote:
      "They managed our PPC with real precision — clear improvement in return within the first weeks.",
    rating: 5,
    source: "Google",
    tags: ["digital-advertising", "local-service"],
  },
  {
    name: "Tuseefbasra Jutt",
    quote:
      "Excellent advertising experience. Professional work — I’ll recommend them for projects.",
    rating: 5,
    source: "Google",
    tags: ["digital-advertising", "local-service"],
  },
  {
    name: "FLY FLEET DISPATCHERS",
    quote:
      "It was our first website and they did a great job — on time, professional and fair price. I had a friend's site built by them too.",
    rating: 5,
    source: "Google",
    tags: ["web-development", "local-service"],
  },
  {
    name: "Aiza Khan",
    quote: "Very professional team. Delivered my e-commerce store before the deadline.",
    rating: 5,
    source: "Google",
    tags: ["web-development"],
  },
  {
    name: "Ather Javed",
    business: "Website & creatives",
    quote:
      "They built my website exactly how I wanted — strong UI/UX and sharp banner creatives. Highly recommended.",
    rating: 5,
    source: "Trustpilot",
    tags: ["web-development", "digital-advertising"],
  },
  {
    name: "Ihsan ul Haq",
    quote:
      "Sameer was professional and attentive. The site is stunning, user-friendly and fully optimised. Highly recommend.",
    rating: 5,
    source: "Google",
    tags: ["web-development"],
  },
  {
    name: "JAMAL SHAIKH",
    quote: "Best WordPress developer — very good experience.",
    rating: 5,
    source: "Google",
    tags: ["web-development"],
  },
  {
    name: "Coco Mo968",
    quote: "Sameer was professional and delivered my webpage in one week.",
    rating: 5,
    source: "Google",
    tags: ["web-development"],
  },
  {
    name: "GROW & GLOW",
    quote:
      "Brilliant experience with Sameer — strong development skills and excellent behaviour.",
    rating: 5,
    source: "Google",
    tags: ["web-development", "app-development"],
  },
  {
    name: "Sajjad Shabir",
    quote: "Loved their creative branding approach — they understand modern design.",
    rating: 5,
    source: "Google",
    tags: ["web-development", "general"],
  },
  {
    name: "customer",
    quote:
      "Honest, no big talks — works professionally and delivers on time. Appreciate and recommend.",
    rating: 5,
    source: "Trustpilot",
    tags: ["general"],
  },
  {
    name: "Shahid Hassan",
    quote:
      "Hardworking, honest and trustworthy. Give him a task and you get more than expected.",
    rating: 5,
    source: "Google",
    tags: ["general"],
  },
  {
    name: "Rabia Amjad",
    quote:
      "Professional work, smooth communication, managed efficiently. Would work together again.",
    rating: 5,
    source: "Google",
    tags: ["general"],
  },
  {
    name: "Furqan Sarwar",
    quote: "Communicates professionally and delivers on time. Highly recommended.",
    rating: 5,
    source: "Google",
    tags: ["general"],
  },
  {
    name: "Muhammad Ahmad",
    quote:
      "Reliable agency that communicates clearly and delivers results. Outstanding from day one.",
    rating: 5,
    source: "Google",
    tags: ["general", "seo"],
  },
  {
    name: "Bushra Aurangzeb",
    quote:
      "Reliable and efficient — professional, responsive and dedicated. Highly recommended.",
    rating: 5,
    source: "Google",
    tags: ["general"],
  },
  {
    name: "Anesu Ngosa",
    quote:
      "Blown away by their professionalism and quality. Highly recommend for reliable digital work.",
    rating: 5,
    source: "Google",
    tags: ["general", "web-development"],
  },
  {
    name: "Shoaib Dev",
    quote:
      "Extremely satisfied with their SEO services — clear, professional and results-focused from the start.",
    rating: 5,
    source: "Google",
    tags: ["seo"],
  },
];

/** @deprecated use clientReviews */
export type GoogleReview = ClientReview;

export function getReviewsForService(slug: string, limit = 4): ClientReview[] {
  const scored = clientReviews
    .map((r) => {
      let score = 0;
      if (r.tags.includes(slug as ClientReview["tags"][number])) score += 3;
      if (r.tags.includes("local-service")) score += 2;
      if (r.source === "Trustpilot" && r.tags.includes("local-service")) score += 1;
      if (r.tags.includes("general")) score += 0.5;
      return { r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked: ClientReview[] = [];
  for (const { r } of scored) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.name === r.name && p.quote === r.quote)) picked.push(r);
  }
  return picked;
}
