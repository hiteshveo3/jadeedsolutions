export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title?: string; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "cta"; title: string; text?: string; label: string; href: string };

export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  authorSlug: string;
  cover: string;
  featured?: boolean;
  content: ContentBlock[];
  faqs?: Faq[];
};

export const posts: Post[] = [
  {
    slug: "seo-checklist-2026",
    title: "The 2026 SEO Checklist: Rank Higher This Year",
    excerpt:
      "A practical, no-fluff checklist covering technical SEO, content, and authority building to grow your organic traffic in 2026.",
    date: "2026-06-18",
    readingTime: "7 min read",
    category: "SEO",
    authorSlug: "sameer-ahmad-basra",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Search is still the highest-intent channel on the internet. If you want compounding, cost-effective growth, SEO belongs at the center of your strategy. This guide walks you through the exact checklist we use with every client — from technical foundations to content and authority.",
      },
      {
        type: "callout",
        title: "Key takeaways",
        items: [
          "Fix Core Web Vitals and crawl errors before anything else.",
          "Match every page to a clear search intent.",
          "Earn links from relevant, reputable sites over time.",
          "Measure rankings, traffic and conversions — not vanity metrics.",
        ],
      },
      { type: "heading", text: "Get the technical foundation right" },
      {
        type: "paragraph",
        text: "Technical SEO is the groundwork everything else sits on. If search engines struggle to crawl or render your site, even the best content won't rank. Start here:",
      },
      {
        type: "list",
        items: [
          "Ensure fast Core Web Vitals (LCP, INP, CLS)",
          "Fix crawl errors and broken links",
          "Implement a clean, logical URL structure",
          "Add structured data (schema.org) for rich results",
          "Generate and submit an XML sitemap",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
        alt: "Analytics dashboard showing organic traffic growth",
        caption: "Track Core Web Vitals and organic traffic monthly to spot trends early.",
      },
      { type: "heading", text: "Match content to search intent" },
      {
        type: "paragraph",
        text: "Every page should target a keyword with clear intent. Map informational, commercial, and transactional queries to the right page types, and answer the question better than anyone else on page one.",
      },
      {
        type: "table",
        headers: ["Intent", "Page type", "Example"],
        rows: [
          ["Informational", "Blog / guide", "\u201chow to improve local SEO\u201d"],
          ["Commercial", "Comparison / service", "\u201cbest SEO agency\u201d"],
          ["Transactional", "Landing / contact", "\u201cSEO services near me\u201d"],
        ],
      },
      { type: "heading", text: "Build authority" },
      {
        type: "paragraph",
        text: "Earn links from relevant, reputable sites through digital PR, guest content, and genuinely useful resources. Authority compounds — the sooner you start, the sooner you win.",
      },
      {
        type: "quote",
        text: "SEO is not a one-time project. It's a growth engine you build once and improve forever.",
      },
      { type: "heading", text: "Your monthly routine" },
      {
        type: "paragraph",
        text: "Consistency beats intensity. Keep SEO moving with a simple monthly rhythm:",
      },
      {
        type: "numbered",
        items: [
          "Review Search Console for new queries and errors.",
          "Publish or refresh one high-intent page.",
          "Earn one or two quality backlinks.",
          "Audit Core Web Vitals and fix regressions.",
          "Report on rankings, traffic and conversions.",
        ],
      },
      {
        type: "cta",
        title: "Want us to run this for you?",
        text: "Get a free SEO audit and a clear plan to rank higher this year.",
        label: "Get a free audit",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "Most local businesses start seeing meaningful movement within 3–4 months, with compounding gains after that. Technical fixes can help faster, while authority building takes longer to pay off.",
      },
      {
        q: "Do I need to blog every week to rank?",
        a: "No. Consistency beats volume. One well-researched, high-intent page per month that genuinely answers a query will usually outperform a pile of thin weekly posts.",
      },
      {
        q: "Is SEO better than running Google Ads?",
        a: "They solve different problems. Ads buy instant, controllable traffic; SEO builds compounding, lower-cost traffic over time. For most local businesses, the winning move is to run both together.",
      },
    ],
  },
  {
    slug: "why-nextjs-for-marketing-sites",
    title: "Why We Build Marketing Sites with Next.js",
    excerpt:
      "Performance, SEO, and developer velocity — here's why Next.js is our framework of choice for high-converting marketing websites.",
    date: "2026-05-02",
    readingTime: "5 min read",
    category: "Web Development",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "The framework you choose for a marketing site directly affects how fast it loads, how well it ranks, and how quickly you can ship changes. For us, Next.js checks every box.",
      },
      { type: "heading", text: "Built-in performance" },
      {
        type: "paragraph",
        text: "Server-side rendering and static generation mean pages load instantly and score well on Core Web Vitals — a direct ranking factor.",
      },
      { type: "heading", text: "SEO-friendly by default" },
      {
        type: "list",
        items: [
          "Server-rendered HTML that search engines love",
          "First-class metadata and Open Graph support",
          "Automatic sitemap and robots handling",
        ],
      },
      { type: "heading", text: "Developer velocity" },
      {
        type: "paragraph",
        text: "A great developer experience means we ship faster and iterate more, which translates directly into better results for your business.",
      },
    ],
  },
  {
    slug: "google-ads-roi-fundamentals",
    title: "Google Ads ROI: The Fundamentals That Actually Matter",
    excerpt:
      "Stop chasing vanity metrics. Here are the levers that determine whether your paid campaigns make money.",
    date: "2026-03-21",
    readingTime: "6 min read",
    category: "Digital Advertising",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Profitable paid advertising comes down to a handful of fundamentals done consistently well. Master these before you worry about anything else.",
      },
      { type: "heading", text: "Track conversions accurately" },
      {
        type: "paragraph",
        text: "If your tracking is wrong, every optimization decision is wrong. Nail conversion tracking and attribution before scaling spend.",
      },
      { type: "heading", text: "Optimize the whole funnel" },
      {
        type: "list",
        items: [
          "Tight keyword-to-ad-to-landing-page relevance",
          "Fast, focused landing pages built to convert",
          "Continuous creative and copy testing",
        ],
      },
      {
        type: "quote",
        text: "The best-performing account isn't the one with the cleverest bids — it's the one with the tightest funnel.",
      },
    ],
  },
];

export const categories: string[] = [
  "All",
  ...Array.from(new Set(posts.map((p) => p.category))),
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return posts.filter((p) => p.authorSlug === authorSlug);
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter(
    (p) => p.slug !== slug && p.category === current.category,
  );
  const others = posts.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function categoryCounts(): { category: string; count: number }[] {
  return categories
    .filter((c) => c !== "All")
    .map((category) => ({
      category,
      count: posts.filter((p) => p.category === category).length,
    }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type TocItem = { id: string; label: string };

export function getToc(post: Post): TocItem[] {
  return post.content
    .filter((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: slugify(b.text), label: b.text }));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
