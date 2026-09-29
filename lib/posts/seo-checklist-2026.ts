import type { Post } from "@/lib/blog";

export const seoChecklist2026: Post = {
  slug: "seo-checklist-2026",
  title: "The 2026 SEO Checklist: Rank Higher This Year",
  excerpt:
    "A practical, no-fluff SEO checklist for local service businesses: measurement, crawling, Core Web Vitals, site structure, on-page, Google Business Profile, schema, links, AI search and the monthly routine that keeps it all moving.",
  date: "2026-06-18",
  updated: "2026-09-29",
  readingTime: "17 min read",
  category: "SEO",
  authorSlug: "sameer-ahmad-basra",
  cover: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
  content: [
    {
      type: "paragraph",
      text: "Search is still the highest-intent channel a local service business has. Someone typing “emergency plumber near me” or “man and van Croydon” is not browsing — they want to book. SEO decides whether they find you or a competitor.",
    },
    {
      type: "paragraph",
      text: "This checklist is the working version of what we run for clients. It is split into a one-time foundation, which you fix once and then protect, and a recurring routine, which is what actually compounds. If you want the long-form explanation behind each step, read [How to Do SEO for a Local Service Business](/blog/seo-for-local-service-business-step-by-step) alongside it.",
    },
    {
      type: "callout",
      title: "How to use this checklist",
      items: [
        "Work top to bottom the first time. Measurement comes first because every later decision depends on it.",
        "Anything marked as a foundation item should be fixed once and then checked quarterly.",
        "The monthly routine near the end is where rankings are actually won — small, consistent work beats one big push.",
        "Every item links to Google’s own documentation where one exists, so you can check the source rather than take our word for it.",
      ],
    },

    { type: "heading", text: "1. Set up measurement before you change anything" },
    {
      type: "paragraph",
      text: "Most SEO projects fail quietly because nobody can say what changed. Before touching a title tag, make sure you can see where you are starting from.",
    },
    {
      type: "list",
      items: [
        "Verify your domain in [Google Search Console](https://search.google.com/search-console) as a domain property, so every protocol and subdomain is covered.",
        "Install Google Analytics 4 and confirm it records visits from a phone as well as a desktop.",
        "Decide what a conversion is for your business — usually calls, form enquiries, WhatsApp clicks and booking requests — and track each one as an event.",
        "Take a baseline: export the last twelve months of Search Console clicks and impressions, and note your current call and enquiry volume.",
        "Check your Google Business Profile performance report so calls, direction requests and website clicks from Maps are in the baseline too.",
      ],
    },
    {
      type: "paragraph",
      text: "Twelve months matters because nearly every service business is seasonal. Comparing March to February tells you about the calendar, not about your SEO.",
    },

    { type: "heading", text: "2. Make sure Google can crawl and index the site" },
    {
      type: "paragraph",
      text: "If Google cannot reach or understand a page, nothing else on this list matters for that page. Search Console’s Page indexing report shows which URLs are indexed and, more usefully, why the others are not.",
    },
    {
      type: "list",
      items: [
        "Your `robots.txt` does not block pages you want found, and it points to your XML sitemap.",
        "An XML sitemap lists every page you want indexed — and only those — and is submitted in Search Console. Google’s [sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) covers the format.",
        "No important page carries a stray `noindex` tag left over from development.",
        "Every page has one canonical URL. The `http`, `https`, `www` and non-`www` versions all redirect to the same place.",
        "Broken internal links are fixed, and old URLs redirect (301) to their closest replacement rather than returning a 404.",
        "Redirect chains are collapsed so each old URL reaches its destination in a single hop.",
        "No important page is an orphan — every page you care about is linked from at least one other page.",
      ],
    },

    { type: "heading", text: "3. Pass Core Web Vitals on mobile" },
    {
      type: "paragraph",
      text: "Core Web Vitals measure how a page feels to a real visitor: how quickly the main content appears, how quickly the page responds to a tap, and whether things jump around while it loads. Google uses them as part of its page experience signals. Good scores will not rank a weak page on their own, but poor scores make every visit more likely to end in a back-button tap.",
    },
    {
      type: "table",
      headers: ["Metric", "What it measures", "Good", "Poor"],
      rows: [
        ["Largest Contentful Paint (LCP)", "How long the main content takes to appear", "2.5 s or less", "Over 4 s"],
        ["Interaction to Next Paint (INP)", "How quickly the page responds to taps and clicks", "200 ms or less", "Over 500 ms"],
        ["Cumulative Layout Shift (CLS)", "How much the layout jumps while loading", "0.1 or less", "Over 0.25"],
      ],
    },
    {
      type: "paragraph",
      text: "The thresholds are applied to the 75th percentile of real page loads, so a fast office Wi-Fi test is not the number that counts. Check the Core Web Vitals report in Search Console and run key pages through [PageSpeed Insights](https://pagespeed.web.dev/). Google’s [Core Web Vitals guide](https://developers.google.com/search/docs/appearance/core-web-vitals) explains how the data is collected.",
    },
    {
      type: "list",
      items: [
        "Serve images at the size they are displayed, in a modern format such as WebP or AVIF, and lazy-load anything below the fold.",
        "Give every image and embed fixed dimensions so the layout does not shift when it loads.",
        "Audit third-party scripts — chat widgets, heatmaps, review badges and tag managers are the usual cause of slow interaction scores.",
        "Load web fonts without blocking text, and limit the number of font weights you ship.",
        "Test on a mid-range phone on mobile data, because that is how most local customers arrive.",
      ],
    },
    {
      type: "paragraph",
      text: "This is one of the reasons we build client sites on [Next.js](/blog/why-nextjs-for-marketing-sites): image sizing, font loading and script loading are handled by the framework rather than by a stack of plugins.",
    },

    { type: "heading", text: "4. Give the site a clear structure" },
    {
      type: "paragraph",
      text: "A clean structure tells both visitors and search engines what you do and where you do it. For most local service businesses it looks like this:",
    },
    {
      type: "numbered",
      items: [
        "**Home** — who you are, what you do, where you work, and the fastest route to a call.",
        "**One page per core service** — “house removals”, “office removals”, “piano moving”, not one page that lists everything.",
        "**Location pages only where you have something real to say** — local jobs, local reviews, local photos, genuine differences in how you serve that area.",
        "**Supporting guides** that answer the questions buyers ask before they book, each linking to the relevant service.",
        "**Proof pages** — case studies, reviews and an about page with real people.",
      ],
    },
    {
      type: "list",
      items: [
        "Every important page is reachable within three clicks of the home page.",
        "Internal links use descriptive anchor text (“piano moving in Croydon”), not “click here”.",
        "Breadcrumbs appear on inner pages and match the URL structure.",
        "URLs are short, readable and stable — changing them later costs you the history they have earned.",
      ],
    },
    {
      type: "quote",
      text: "A location page that only swaps the town name is a doorway page. Google’s [spam policies](https://developers.google.com/search/docs/essentials/spam-policies#doorways) name that pattern directly — build fewer, better pages instead.",
    },

    { type: "heading", text: "5. Get the on-page essentials right" },
    {
      type: "paragraph",
      text: "On-page SEO is mostly about being specific. A service page should answer the questions a buyer has in the order they have them.",
    },
    {
      type: "table",
      headers: ["Element", "What good looks like"],
      rows: [
        ["Title tag", "Unique per page, leads with the service and area, under roughly 60 characters: “Piano Movers in Croydon | Alpha Movers”."],
        ["Meta description", "A one-sentence reason to click, with a concrete detail such as coverage area, response time or a price guide."],
        ["H1", "One per page, describing the service in plain words."],
        ["Opening paragraph", "What you do, where, and for whom — in the first two sentences."],
        ["Body", "Process, what is included, price guidance, areas covered, proof (photos, reviews, case studies) and FAQs."],
        ["Calls to action", "A tap-to-call button and a short enquiry form visible without scrolling on mobile."],
        ["Images", "Real photos of your team and work, with descriptive alt text."],
        ["Contact details", "Business name, address or service area, and phone number identical to your Google Business Profile."],
      ],
    },

    { type: "heading", text: "6. Write content that matches search intent" },
    {
      type: "paragraph",
      text: "Every page should target one clear intent. Map informational, commercial and transactional searches to the page type that serves them, and answer the question better than anything currently on page one. Google’s [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) is the standard to measure yourself against.",
    },
    {
      type: "table",
      headers: ["Intent", "What the searcher wants", "Best page type", "Example search"],
      rows: [
        ["Transactional", "To book or call now", "Service page with a clear call to action", "“emergency plumber Leeds”"],
        ["Commercial", "To compare options and prices", "Service page with pricing guidance, comparison or case study", "“house removals cost London”"],
        ["Informational", "To understand a problem", "Guide or blog article linking to the service", "“why is my boiler losing pressure”"],
        ["Navigational", "To find you specifically", "Home page and Google Business Profile", "“alpha movers croydon”"],
      ],
    },
    {
      type: "list",
      items: [
        "Show first-hand experience: real job photos, named team members, specific examples from your own work.",
        "Refresh pages that have slipped rather than always writing new ones. An updated page keeps the links and history it has already earned.",
        "Merge or remove thin pages that compete with each other for the same search.",
        "Put a named author and a date on guides, and keep facts current.",
      ],
    },

    { type: "heading", text: "7. Strengthen your Google Business Profile and reviews" },
    {
      type: "paragraph",
      text: "For local searches, the map results often appear above the organic listings. Google says local ranking is driven mainly by relevance, distance and prominence — its [local ranking guidance](https://support.google.com/business/answer/7091) explains each. You cannot change distance, so work on the other two.",
    },
    {
      type: "list",
      items: [
        "Choose the most accurate primary category, and only add secondary categories that genuinely apply.",
        "List every service you offer, and set service areas that match where you actually travel.",
        "Keep opening hours, holiday hours, phone number and website link accurate.",
        "Upload real photos regularly — team, vans, equipment, finished work.",
        "Ask every satisfied customer for a review with a direct link, and reply to every review, good or bad.",
        "Keep your business name, address and phone number identical across your website, Bing Places, Apple Business Connect and the main directories in your country and trade.",
      ],
    },
    {
      type: "callout",
      title: "Never do these",
      items: [
        "Buy reviews, swap reviews with other businesses, or offer incentives for positive ones.",
        "Only ask happy customers for reviews while steering unhappy ones elsewhere (review gating).",
        "Add keywords or locations to your business name that are not part of your real name.",
        "Use a virtual office address to appear in a town where you have no genuine presence.",
      ],
    },

    { type: "heading", text: "8. Add structured data that is true and useful" },
    {
      type: "paragraph",
      text: "Structured data helps search engines understand your business, services and pages. It does not guarantee a rich result, and it must describe what is actually visible on the page. Google’s [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) sets out the rules.",
    },
    {
      type: "list",
      items: [
        "`LocalBusiness` or `Organization` on the home page, with name, address or service area, phone, opening hours and logo.",
        "`Service` markup on service pages describing the service and the area served.",
        "`BreadcrumbList` on inner pages.",
        "`Article` or `BlogPosting` on guides, with the author and publication date.",
        "Test every template with the [Rich Results Test](https://search.google.com/test/rich-results) after changes.",
      ],
    },
    {
      type: "paragraph",
      text: "Two common misunderstandings: FAQ rich results are now shown only for a small set of well-known government and health sites, so FAQ markup is fine for clarity but will not usually produce the expandable result; and star ratings you collect about your own business are not eligible to appear as review snippets for your local business or organisation.",
    },

    { type: "heading", text: "9. Earn links and mentions the honest way" },
    {
      type: "paragraph",
      text: "Links from relevant, reputable sites are still one of the clearest signals that a business is real and trusted. For a local service business, the best ones come from the real world.",
    },
    {
      type: "list",
      items: [
        "Suppliers, manufacturers and trade partners who list approved installers or partners.",
        "Trade associations and accreditation bodies you belong to.",
        "Local sponsorships, charities and community events you genuinely support.",
        "Local news coverage of an interesting job, a milestone or useful seasonal advice.",
        "Genuinely useful resources — a price guide, a checklist, a moving-day planner — that other sites want to reference.",
      ],
    },
    {
      type: "paragraph",
      text: "Avoid paid links, link networks and large-scale link exchanges. They are named in Google’s [spam policies](https://developers.google.com/search/docs/essentials/spam-policies), and cleaning up after them costs far more than they ever earned.",
    },

    { type: "heading", text: "10. Prepare for AI search without chasing gimmicks" },
    {
      type: "paragraph",
      text: "AI Overviews and AI assistants now answer some questions before a searcher clicks. Google’s position is that the same fundamentals apply — its guidance on [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) says there is no special markup or file you need to add.",
    },
    {
      type: "list",
      items: [
        "Answer common questions directly and early on the page, then expand below.",
        "Keep your business facts — name, services, areas, prices, hours — consistent everywhere they appear.",
        "Publish things only you can: your own prices, your own process, your own case studies and photos.",
        "Watch branded search and direct enquiries as well as clicks, because some discovery now happens without a visit.",
      ],
    },

    { type: "heading", text: "11. Track what actually pays" },
    {
      type: "paragraph",
      text: "Rankings and traffic are leading indicators. Booked work is the result. A useful monthly report fits on one page:",
    },
    {
      type: "table",
      headers: ["Measure", "Where it comes from", "Why it matters"],
      rows: [
        ["Impressions and clicks", "Search Console", "Shows whether visibility is growing, and for which searches."],
        ["Map actions", "Google Business Profile", "Calls, direction requests and website clicks from local results."],
        ["Enquiries", "Analytics events and call tracking", "The first point where visibility turns into demand."],
        ["Booked jobs and revenue", "Your CRM or booking system", "The only number that pays the bills."],
        ["Top landing pages", "Search Console and Analytics", "Tells you which pages deserve more investment."],
      ],
    },
    {
      type: "paragraph",
      text: "If you work with an agency on a performance basis, this is also the data your fee is calculated from — our [Profit-Share Handbook](/profit-share-handbook) explains how attribution is agreed before any work starts.",
    },

    { type: "heading", text: "The recurring routine" },
    {
      type: "paragraph",
      text: "Consistency beats intensity. This is the rhythm we keep for clients — or run a quick [Growth Check](/tools/growth-check) to see where to start.",
    },
    {
      type: "table",
      headers: ["When", "What to do"],
      rows: [
        ["Weekly", "Reply to new reviews. Post a photo or update to your Google Business Profile. Check enquiries were answered."],
        ["Monthly", "Review Search Console for new queries, falling pages and errors. Publish or refresh one high-intent page. Earn one or two genuine links or mentions. Report enquiries and booked jobs."],
        ["Quarterly", "Re-run Core Web Vitals and fix regressions. Check indexing, redirects and broken links. Audit Business Profile categories, services and photos. Prune or merge thin pages."],
        ["Yearly", "Revisit your service list, pricing guidance and areas covered. Compare twelve months against the baseline you took at the start."],
      ],
    },

    { type: "heading", text: "Common mistakes we still see" },
    {
      type: "list",
      items: [
        "Launching a new website without redirecting the old URLs, and losing years of rankings overnight.",
        "Hundreds of near-identical location pages instead of a handful of strong service pages.",
        "Measuring success by rankings for vanity keywords nobody searches for.",
        "A contact form that silently stopped sending emails months ago.",
        "Stock photography where real job photos would build far more trust.",
        "Nobody answering the phone during the hours the ads and listings are driving calls.",
      ],
    },
    {
      type: "cta",
      title: "Want us to run this checklist for you?",
      text: "See [SEO services](/services/seo) and [pricing](/pricing) — fixed plans or a share of the bookings we generate.",
      label: "Get a free growth plan",
      href: "/contact",
    },
  ],
  faqs: [
    {
      q: "How long does SEO take to show results?",
      a: "Technical fixes can show up within weeks. For organic and local search as a whole, expect six to twelve months for the work to compound — Alpha Movers earned 60% of six months of search impressions in the final 28 days. See the [case study](/case-studies/alpha-movers).",
    },
    {
      q: "Do I need to blog every week to rank?",
      a: "No. One well-researched page that answers a real buyer question, published or refreshed each month, usually beats a pile of thin weekly posts.",
    },
    {
      q: "Is SEO better than Google Ads?",
      a: "They do different jobs. Ads buy immediate, controllable visibility; SEO builds visibility that keeps working without paying per click. Most local businesses do best running both — see [Google Ads ROI fundamentals](/blog/google-ads-roi-fundamentals).",
    },
    {
      q: "Should I create a page for every town I cover?",
      a: "Only where you can say something genuinely specific about that town — local jobs, reviews, photos or differences in service. Pages that only swap the place name are treated as doorway pages.",
    },
    {
      q: "Does structured data improve rankings?",
      a: "Not directly. It helps search engines understand your pages and can make them eligible for richer results, but it has to match what is visible on the page.",
    },
    {
      q: "What is the single most important item on this list?",
      a: "Measurement. If you cannot see calls, enquiries and booked jobs by source, you cannot tell which of the other items are working.",
    },
  ],
};
