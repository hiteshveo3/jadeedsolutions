import type { Post } from "@/lib/blog";

export const whyNextjsForMarketingSites: Post = {
  slug: "why-nextjs-for-marketing-sites",
  title: "Why We Build Marketing Sites with Next.js",
  excerpt:
    "Speed, crawlable HTML, built-in SEO tools and room to grow — plus the honest trade-offs against WordPress and site builders, and when Next.js is the wrong choice for a local service business.",
  date: "2026-05-02",
  updated: "2026-09-29",
  readingTime: "14 min read",
  category: "Web Development",
  authorSlug: "sameer-ahmad-basra",
  cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  content: [
    {
      type: "paragraph",
      text: "The framework behind a marketing site decides how fast it loads on a customer’s phone, how easily search engines read it, how much maintenance it needs, and how quickly you can change it when your business changes. For most of the local service businesses we work with, we build on [Next.js](https://nextjs.org/). This article explains why — and, just as importantly, when we would recommend something else.",
    },
    {
      type: "callout",
      title: "The short version",
      items: [
        "Pages arrive as complete HTML, so search engines and slow phones see the content immediately.",
        "Images, fonts and third-party scripts are optimised by the framework rather than by a stack of plugins.",
        "Titles, canonical URLs, sitemaps, robots rules and structured data are part of the code, not add-ons.",
        "There is no plugin ecosystem to keep patched, which removes a whole category of security and breakage risk.",
        "The trade-off: day-to-day edits usually need a developer or a headless CMS, so it is not the right fit for everyone.",
      ],
    },

    { type: "heading", text: "What a local service website actually has to do" },
    {
      type: "paragraph",
      text: "Before choosing any technology, it helps to be clear about the job. A website for a mover, cleaner, plumber or contractor has a narrow, commercial purpose:",
    },
    {
      type: "numbered",
      items: [
        "Load quickly on a mid-range phone on mobile data, because that is how most local customers arrive.",
        "Be easy for search engines to crawl and understand, service by service and area by area.",
        "Make calling, messaging or requesting a quote effortless from the first screen.",
        "Build trust with real photos, reviews, prices and proof.",
        "Record every enquiry and where it came from, so you know what is working.",
        "Stay fast, secure and working for years without constant attention.",
      ],
    },
    {
      type: "paragraph",
      text: "Everything below is about how well a framework helps with those six things.",
    },

    { type: "heading", text: "How Next.js delivers pages" },
    {
      type: "paragraph",
      text: "Next.js is a framework built on React. The part that matters most for a marketing site is how it produces pages:",
    },
    {
      type: "table",
      headers: ["Approach", "What happens", "Where we use it"],
      rows: [
        ["Static generation", "Pages are built into HTML once, when the site is deployed, and served instantly from a CDN.", "Home, service, industry and blog pages — anything that changes when you publish, not every second."],
        ["Incremental regeneration", "Static pages are rebuilt in the background on a schedule or when content changes.", "Pages pulling from a CMS or a reviews feed."],
        ["Server rendering", "The page is rendered on each request.", "Anything personalised or genuinely live."],
      ],
    },
    {
      type: "paragraph",
      text: "Because the HTML arrives complete, a search engine does not need to run JavaScript to see your services, prices and contact details, and a visitor on a slow connection sees content straight away. With the App Router and React Server Components, much of the page never ships JavaScript to the browser at all, which keeps phones responsive.",
    },

    { type: "heading", text: "Performance features that matter in practice" },
    {
      type: "list",
      items: [
        "**Images.** The built-in image component serves each image at the size it is displayed, in modern formats, lazy-loaded below the fold, with dimensions reserved so the layout does not jump.",
        "**Fonts.** Web fonts are self-hosted at build time and loaded without blocking text or shifting the layout, so there is no flash of invisible headings.",
        "**Third-party scripts.** Chat widgets, analytics and review badges can be loaded after the page is interactive, or only when idle, instead of competing with your content.",
        "**Code splitting.** Each page loads only the code it needs, and links to other pages are prefetched so navigation feels instant.",
        "**Caching at the edge.** Static pages are served from locations close to the visitor, which helps when your customers are in London but the server is not.",
      ],
    },

    { type: "heading", text: "Core Web Vitals, honestly" },
    {
      type: "paragraph",
      text: "Google’s [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) measure loading, responsiveness and visual stability for real visitors. They form part of Google’s page experience signals — useful, but not a shortcut past relevance and quality.",
    },
    {
      type: "table",
      headers: ["Metric", "Good", "Needs improvement", "Poor"],
      rows: [
        ["Largest Contentful Paint", "2.5 s or less", "2.5–4 s", "Over 4 s"],
        ["Interaction to Next Paint", "200 ms or less", "200–500 ms", "Over 500 ms"],
        ["Cumulative Layout Shift", "0.1 or less", "0.1–0.25", "Over 0.25"],
      ],
    },
    {
      type: "paragraph",
      text: "Next.js makes good scores the default, but it does not guarantee them. A full-screen video hero, an uncompressed photo gallery or four chat and tracking widgets will slow a Next.js site just as surely as any other. We treat performance as a budget that every new feature has to fit inside, and we check it again before launch with [PageSpeed Insights](https://pagespeed.web.dev/).",
    },

    { type: "heading", text: "SEO building blocks are part of the code" },
    {
      type: "paragraph",
      text: "On many platforms, SEO basics come from plugins that can conflict, break on update or be switched off by accident. In Next.js they are part of the site itself:",
    },
    {
      type: "list",
      items: [
        "The [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) sets unique titles, descriptions, canonical URLs and social sharing images for every page, with sensible defaults inherited from the layout.",
        "`sitemap.xml` and `robots.txt` are generated from the same data that builds the pages, so a new service page appears in the sitemap automatically.",
        "Structured data (JSON-LD) for your business, services, articles and breadcrumbs is written alongside the page it describes, so the two cannot drift apart.",
        "Redirects live in configuration under version control — essential when a new site replaces an old one and every old URL must land somewhere sensible.",
        "Clean, readable URLs and proper 404 pages come as standard.",
      ],
    },
    {
      type: "paragraph",
      text: "This site is built the same way: its sitemap, robots rules, page metadata and structured data are all generated in code. For how those pieces fit a local SEO strategy, see our [local service SEO guide](/blog/seo-for-local-service-business-step-by-step).",
    },

    { type: "heading", text: "Built to turn visits into enquiries" },
    {
      type: "list",
      items: [
        "Tap-to-call and WhatsApp buttons that stay reachable on mobile without covering content.",
        "Short enquiry forms validated in the browser and on the server, so junk submissions are filtered and genuine ones are never silently lost.",
        "Every call click, form submission and WhatsApp tap tracked as a conversion from day one.",
        "Service pages with price guidance, process, reviews and FAQs in a consistent layout, so adding the tenth service is as easy as the first.",
        "Landing pages for ad campaigns that share the same components, so paid traffic lands on something fast and consistent.",
      ],
    },

    { type: "heading", text: "Security and maintenance" },
    {
      type: "paragraph",
      text: "A large share of small-business website problems come from outdated plugins and themes: a contact form plugin with a vulnerability, a page builder update that breaks the layout, a caching plugin that conflicts with another. A Next.js marketing site has a small, known set of dependencies, no admin login exposed on the public site, and static pages that have very little to attack. Updates are applied deliberately, tested, and deployed — not triggered by whoever last logged in.",
    },

    { type: "heading", text: "Next.js vs WordPress vs site builders" },
    {
      type: "paragraph",
      text: "Each option is the right answer for someone. This is how they compare for a local service business:",
    },
    {
      type: "table",
      headers: ["", "Next.js", "WordPress", "Site builders (Wix, Squarespace and similar)"],
      rows: [
        ["Speed potential", "Excellent, by default", "Good with careful setup; often slowed by themes and plugins", "Adequate; limited control"],
        ["SEO control", "Complete, in code", "Strong, mostly through plugins", "Basic to moderate"],
        ["Editing by the owner", "Needs a developer or a headless CMS", "Easy, very familiar", "Very easy"],
        ["Maintenance", "Low; few dependencies", "Ongoing plugin, theme and core updates", "Handled by the platform"],
        ["Flexibility", "Anything you can build", "Very high through plugins", "Limited to the platform’s features"],
        ["Typical best fit", "Growth-focused businesses that want speed, custom features and tight tracking", "Content-heavy sites edited daily by a team", "Very small budgets and simple brochure sites"],
      ],
    },
    {
      type: "paragraph",
      text: "We still build and maintain WordPress sites when that is the better fit — often for businesses that publish several times a week and want to do it themselves.",
    },

    { type: "heading", text: "When Next.js is the wrong choice" },
    {
      type: "list",
      items: [
        "You want to rebuild page layouts yourself every week without involving anyone else, and a headless CMS is more than you need.",
        "Your whole online presence is a single page and a phone number, and the budget is very small.",
        "You are primarily an online shop with standard needs — a hosted e-commerce platform will usually be quicker and cheaper.",
        "Nobody will be responsible for the site after launch. Every website needs an owner; Next.js just needs a different kind of owner.",
      ],
    },

    { type: "heading", text: "How we build and hand over" },
    {
      type: "numbered",
      items: [
        "**Structure first.** We map services, areas and the questions buyers ask before any design work.",
        "**Content and proof.** Real photos, reviews, prices and case studies — gathered early, because they shape the design.",
        "**Design and build.** Mobile first, with a performance budget and accessibility checks built in.",
        "**Tracking.** Calls, forms and WhatsApp clicks recorded as conversions before launch.",
        "**Launch.** Redirects from the old site, sitemap submitted, Search Console monitored for the first weeks.",
        "**Ownership.** The domain, hosting account and code repository are in your business’s name, with us added as users — the same principle we set out in our [Profit-Share Handbook](/profit-share-handbook).",
      ],
    },
    {
      type: "paragraph",
      text: "You can see the result on live client work in our [Alpha Movers case study](/case-studies/alpha-movers), or compare the options on our [web development](/services/web-development) page and [pricing](/pricing).",
    },
    {
      type: "cta",
      title: "Need a fast site that brings in enquiries?",
      text: "Tell us what you do and where you work — we will recommend the right platform, even if it is not Next.js.",
      label: "Talk about your site",
      href: "/contact",
    },
  ],
  faqs: [
    {
      q: "Is Next.js better for SEO than WordPress?",
      a: "Neither ranks a site by itself. Next.js makes speed, clean HTML and technical SEO easier to get right and keep right; WordPress can do the same with careful setup. Content, relevance and trust still decide rankings.",
    },
    {
      q: "Can I edit a Next.js site myself?",
      a: "Yes, if it is connected to a headless CMS, which gives you an editor for text, images and new pages. Without one, content changes go through a developer.",
    },
    {
      q: "Will moving from WordPress to Next.js lose my rankings?",
      a: "Not if the migration is planned: every old URL redirected, content carried over, metadata preserved and Search Console monitored after launch. Most ranking losses after a redesign come from missing redirects.",
    },
    {
      q: "Where is a Next.js site hosted?",
      a: "On any host that supports Node.js or static files — Vercel, Netlify, a cloud provider or a traditional server. We set it up under your own account so you control it.",
    },
    {
      q: "Is a Next.js site more expensive?",
      a: "The build can cost more than a template site, but ongoing maintenance is usually lower because there are no plugins to keep patched. See [pricing](/pricing) for current packages.",
    },
  ],
};
