export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title?: string; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language?: string; code: string }
  | { type: "cta"; title: string; text?: string; label: string; href: string }
  | {
      type: "dialogue";
      title?: string;
      turns: {
        speaker: "client" | "us";
        name: string;
        text: string;
        bullets?: string[];
      }[];
    }
  | { type: "seo-audit" }
  | { type: "interactive-roadmap" }
  | { type: "architecture-visualizer" }
  | { type: "keyword-cluster-explorer" }
  | { type: "core-web-vitals-meter" }
  | { type: "myth-vs-reality" };

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
    slug: "modern-local-seo-roadmap-service-business",
    title: "Modern Local SEO Roadmap for a Service-Based Business",
    excerpt:
      "A complete, actionable local SEO roadmap for service businesses — combining technical SEO, Next.js architecture, local content, Google Business Profile, reviews, citations, schema and conversion tracking with authoritative sources.",
    date: "2026-08-14",
    readingTime: "15 min read",
    category: "SEO",
    authorSlug: "sameer-ahmad-basra",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Local SEO is no longer just about creating a Google Business Profile and building a few directory links. For a modern service-based business, successful local search performance requires an integrated system combining technical SEO, website architecture, local content, Google Business Profile optimization, authentic customer reviews, structured data, and conversion tracking.",
      },
      {
        type: "paragraph",
        text: "For example, imagine we are planning the search strategy for a London-based removals company (Alpha Movers). The goal is not simply to chase short-tail query rankings like \"removals London\". The real objective is to help search engines and users establish clear trust: this is a genuine removals company that operates in London, provides multiple relevant services, serves specific local boroughs, has real customer trust, and is recognized by authoritative local sources.",
      },
      {
        type: "paragraph",
        text: "Before diving into execution, you can review [Google’s SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) for foundational principles on how Google discovers, indexes, and understands web content, or consult [Ahrefs’ Complete Guide to Local SEO](https://ahrefs.com/seo/local-seo) for an end-to-end industry perspective. To see how we structure our client campaigns, visit our [SEO services](/services/seo) and [case studies](/case-studies).",
      },
      {
        type: "seo-audit",
      },
      {
        type: "callout",
        title: "Key pillars of modern local SEO",
        items: [
          "Understand the business model, service boundaries, and commercial goals before touching keywords.",
          "Cluster keywords by user search intent rather than building redundant duplicate pages.",
          "Build a clean website hierarchy connecting Brand → Services → Locations → Supporting Guides.",
          "Use modern web tech (like Next.js) for speed and metadata hygiene, but remember technology alone is not a ranking factor.",
          "Keep location pages helpful and unique to prevent Google doorway page penalties.",
          "Optimize Google Business Profile and follow official local guidelines.",
          "Implement schema.org structured data (LocalBusiness, Service, BreadcrumbList).",
          "Track real commercial conversions (calls, quotes, booked revenue) instead of just ranking positions.",
        ],
      },
      {
        type: "heading",
        text: "1. Understand the business before doing SEO",
      },
      {
        type: "paragraph",
        text: "Before researching keywords or writing meta tags, thoroughly map out the operational and commercial realities of the business. For our London removals company example:",
      },
      {
        type: "list",
        items: [
          "Business: Alpha Movers (London)",
          "Core Services: House Removals, Office Relocation, Man & Van, Packing Services, Storage Solutions, Student Moves",
          "Target Customers: Homeowners, tenants, commercial offices, students, landlords, estate managers",
          "Target Locations: Greater London and key boroughs (Camden, Croydon, Hackney, Islington, Westminster)",
        ],
      },
      {
        type: "heading",
        text: "2. Perform intent-based keyword research",
      },
      {
        type: "paragraph",
        text: "Do not simply export hundreds of keywords from tools like SEMrush or Ahrefs and create a page for each one. Group queries according to search intent to prevent keyword cannibalization.",
      },
      {
        type: "keyword-cluster-explorer",
      },
      {
        type: "paragraph",
        text: "Synonymous phrases like \"removals London\" and \"London removals company\" can be targeted by the same primary page. However, \"house removals London\" deserves its own dedicated service page because customer requirements and logistical considerations are distinct. For more methodology on local search intent, explore [Semrush’s Local SEO Strategy Guide](https://www.semrush.com/blog/what-is-local-seo/).",
      },
      {
        type: "heading",
        text: "3. Build the website architecture before creating pages",
      },
      {
        type: "paragraph",
        text: "A successful Local SEO campaign starts with a logical website structure. Search engines and visitors should be able to navigate seamlessly between entity information, services, locations, and educational guides. For how we build tailored architectures, see our [web development services](/services/web-development).",
      },
      {
        type: "architecture-visualizer",
      },
      {
        type: "heading",
        text: "4. Where does Next.js fit into technical SEO?",
      },
      {
        type: "paragraph",
        text: "When building modern web applications, Next.js provides an outstanding technical foundation through server-side rendering, static generation, automated metadata management, and native asset optimization.",
      },
      {
        type: "list",
        items: [
          "Pre-rendering HTML: Search engine crawlers receive complete, indexable documents instantly (see [Next.js Rendering Overview](https://nextjs.org/docs/app/building-your-application/rendering)).",
          "Programmatic Metadata: Generate distinct title tags, descriptions, Open Graph cards, and canonical links using the [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).",
          "Image Optimization: Serve modern AVIF and WebP formats with fluid responsive sizing using the built-in [next/image component](https://nextjs.org/docs/app/building-your-application/optimizing/images).",
          "Automated Sitemaps & Robots: Generate indexable XML feeds dynamically following [Next.js Sitemaps Configuration](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).",
        ],
      },
      {
        type: "myth-vs-reality",
      },
      {
        type: "heading",
        text: "5. Build a strong technical SEO foundation",
      },
      {
        type: "paragraph",
        text: "Before acquiring external links, ensure search engines can properly crawl, parse, and index your website without hurdles.",
      },
      {
        type: "list",
        items: [
          "Crawlable Links: Ensure internal links use standard HTML <a href=\"...\"> tags. Check [Google's Guide to Making Links Crawlable](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).",
          "Robots.txt: Keep crawl directives clean and avoid blocking CSS, JS, or important landing pages. Review [Google Search Central’s Robots.txt Specifications](https://developers.google.com/search/docs/crawling-indexing/robots/intro).",
          "Indexation Audits: Monitor indexed and non-indexed URLs regularly using the [Google Search Console URL Inspection Tool](https://support.google.com/webmasters/answer/9012289) and [Page Indexing Reports](https://support.google.com/webmasters/answer/7440203).",
          "Clean URL Slugs: Prefer simple, readable paths like /house-removals/ and /areas/camden/ rather than parameter-heavy URLs.",
        ],
      },
      {
        type: "heading",
        text: "6. Focus on website performance and Core Web Vitals",
      },
      {
        type: "paragraph",
        text: "Local searchers frequently look up services on mobile devices with fluctuating network conditions. Your website must load rapidly, respond immediately, and prevent visual jarring. Check the official standards below and test your live URLs with [Google PageSpeed Insights](https://pagespeed.web.dev/).",
      },
      {
        type: "core-web-vitals-meter",
      },
      {
        type: "heading",
        text: "7. Optimize the homepage for local intent",
      },
      {
        type: "paragraph",
        text: "The homepage should quickly tell users and search engines what you do, where you operate, and why customers should trust you.",
      },
      {
        type: "list",
        items: [
          "H1 Heading: Professional House & Office Removals in London",
          "Natural Copy: \"Alpha Movers provides reliable house moving, office relocation, and man & van services across Greater London.\"",
          "Trust Signals: Verified review scores, trade accreditations (e.g. BAR), insurance coverage, and clear pricing transparency.",
          "Clear Next Steps: Prominent phone buttons, quote forms, and consultation links (e.g., [contact page](/contact)).",
        ],
      },
      {
        type: "paragraph",
        text: "Never resort to repetitive keyword stuffing (e.g., repeating \"removals London cheap London removals\"). Write clear, helpful copy for real human clients first.",
      },
      {
        type: "heading",
        text: "8. Create dedicated service pages",
      },
      {
        type: "paragraph",
        text: "Every major commercial service deserves an in-depth, dedicated page rather than bundling everything into one generic overview. For example, on `/house-removals/`, include:",
      },
      {
        type: "list",
        items: [
          "Detailed service breakdown (packing, loading, transport, unloading)",
          "Fleet capabilities and moving crew credentials",
          "Transparent pricing factors (mileage, property size, access stairs, storage duration)",
          "Dedicated customer reviews and moving case studies",
          "Local moving FAQs and an interactive quote calculator",
        ],
      },
      {
        type: "heading",
        text: "9. Build location pages strategically without creating doorway pages",
      },
      {
        type: "paragraph",
        text: "Location pages are powerful for geographic relevance, but duplicate templates with swapped city names violate [Google Search Central’s Guidance on Doorway Pages](https://developers.google.com/search/docs/essentials/spam-policies#doorways).",
      },
      {
        type: "dialogue",
        title: "Strategy Session: Why Alpha Movers Avoided Duplicate Location Pages",
        turns: [
          {
            speaker: "client",
            name: "Alpha Movers (Director)",
            text: "Can't we just generate 40 borough pages automatically by swapping 'Camden' for 'Hackney' and 'Islington' on the same template?",
          },
          {
            speaker: "us",
            name: "Sameer Ahmad Basra",
            text: "No, that triggers Google's doorway penalty and damages domain trust. Instead, we prioritize 5 core boroughs where you actively operate, and give each page real local value:",
            bullets: [
              "Exact borough parking suspension permit guides & fees",
              "Narrow mews and congestion charge access advice",
              "Verified customer reviews from moves in that specific borough",
              "Direct internal links to matching service offerings",
            ],
          },
        ],
      },
      {
        type: "heading",
        text: "10. Combine service and location architecture with internal linking",
      },
      {
        type: "paragraph",
        text: "Connect your pages logically through contextual internal links:",
      },
      {
        type: "list",
        items: [
          "Homepage links to core services (House Removals, Office Moves) and top locations (Camden, Croydon).",
          "House Removals links to local area hubs (Camden, Westminster) and supplementary services (Packing Services).",
          "Camden location page links back to relevant services and direct booking forms.",
          "Blog guides link to commercial service pages where users can take action.",
        ],
      },
      {
        type: "heading",
        text: "11. Implement Schema.org structured data",
      },
      {
        type: "paragraph",
        text: "Structured data clarifies your entity details, service types, and site hierarchy for search engines.",
      },
      {
        type: "list",
        items: [
          "LocalBusiness Schema: Implement [Schema.org LocalBusiness](https://schema.org/LocalBusiness) (or MovingCompany) with legal business name, physical address, phone, opening hours, geo-coordinates, and areaServed.",
          "Service Schema: Use [Schema.org Service](https://schema.org/Service) to define specific moving offerings.",
          "BreadcrumbList: Clarify navigation hierarchy with [Google BreadcrumbList markup](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).",
        ],
      },
      {
        type: "paragraph",
        text: "Always follow [Google's Structured Data General Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) and validate your markup using the [Google Rich Results Test](https://search.google.com/test/rich-results).",
      },
      {
        type: "heading",
        text: "12. Optimize Google Business Profile (GBP)",
      },
      {
        type: "paragraph",
        text: "Your Google Business Profile is critical for Google Maps pack rankings and local search discoverability.",
      },
      {
        type: "list",
        items: [
          "Primary Category: Choose the most accurate category (e.g., Moving company) and add secondary categories where genuine.",
          "NAP Consistency: Keep Name, Address, Phone number identical to your website footer.",
          "Complete Services: Add comprehensive itemized services with descriptions.",
          "Real Photography: Upload authentic photos of branded vehicles, staff, uniforms, equipment, and moving jobs.",
        ],
      },
      {
        type: "paragraph",
        text: "Adhere to the official [Guidelines for Representing Your Business on Google](https://support.google.com/business/answer/3038177) and understand the core ranking criteria in [Google’s Explanation of How Local Ranking Works](https://support.google.com/business/answer/7091) (Relevance, Distance, and Prominence).",
      },
      {
        type: "heading",
        text: "13. Build an ethical review strategy",
      },
      {
        type: "paragraph",
        text: "Reviews generate consumer trust and reinforce local prominence. Encourage genuine clients to leave specific details about their experience (e.g. \"moved a 3-bed house from Islington to Camden\").",
      },
      {
        type: "paragraph",
        text: "Always respond to feedback professionally in accordance with [Google’s Review Management Guidance](https://support.google.com/business/answer/3474050). Never incentivize or fabricate fake reviews.",
      },
      {
        type: "heading",
        text: "14. Build relevant citations & directory listings",
      },
      {
        type: "paragraph",
        text: "Focus on citation quality, domain trust, and data consistency rather than mass submissions to hundreds of low-tier directories.",
      },
      {
        type: "list",
        items: [
          "UK / National Directories: Yell, FreeIndex, Thomson Local, Scoot, Cylex",
          "Customer Review Platforms: Trustpilot, Feefo, Checkatrade",
          "Industry Associations: British Association of Removers (BAR), local Chambers of Commerce",
        ],
      },
      {
        type: "heading",
        text: "15. Earn local and industry backlinks",
      },
      {
        type: "paragraph",
        text: "Acquire authoritative links through genuine business relationships and compelling local content:",
      },
      {
        type: "list",
        items: [
          "Local Partnerships: Partner with local estate agents, interior designers, and storage facilities for cross-referrals.",
          "Digital PR: Publish newsworthy moving data, London property relocation statistics, or student relocation tips for regional news outlets.",
          "Local Sponsorships: Support neighborhood community events, sports clubs, or charity initiatives.",
        ],
      },
      {
        type: "heading",
        text: "16. Build a content strategy around customer search journeys",
      },
      {
        type: "paragraph",
        text: "Create informational content that supports potential customers at every stage of their moving decision:",
      },
      {
        type: "list",
        items: [
          "Commercial: House Removals London — Rates & Availability",
          "Commercial Investigation: How Much Do Removals Cost in London? (Complete 2026 Price Guide)",
          "Logistical Guides: Moving House Checklist: 6 Weeks to Moving Day",
          "Local Knowledge: Moving House in Camden: A Practical Guide to Permits & Parking",
          "Packing Guides: How to Safely Pack Fragile Glassware and Electronics",
        ],
      },
      {
        type: "paragraph",
        text: "Internally link these informative articles back to relevant service pages so readers can easily request a quote.",
      },
      {
        type: "heading",
        text: "17. Use Google Search Console as a continuous feedback loop",
      },
      {
        type: "paragraph",
        text: "SEO is an ongoing process of measurement and refinement. Review your [Google Search Console Performance Report](https://support.google.com/webmasters/answer/7576552) to identify opportunities.",
      },
      {
        type: "list",
        items: [
          "High impressions with low CTR: Refine page title tags and meta descriptions to improve click-through appeal.",
          "Keywords ranking on positions 8–15: Deepen content, add relevant internal links, and answer common searcher questions.",
          "Emerging local search queries: Identify new borough or service questions to incorporate into existing pages.",
        ],
      },
      {
        type: "heading",
        text: "18. Track leads, bookings, and revenue",
      },
      {
        type: "paragraph",
        text: "Ranking #1 for a vanity query is meaningless if it does not generate qualified business enquiries. Measure the metrics that impact the bottom line:",
      },
      {
        type: "quote",
        text: "Organic & Local Traffic → Phone Calls & Quote Inquiries → Custom Estimates → Confirmed Bookings → Revenue",
      },
      {
        type: "paragraph",
        text: "Set up conversion tracking for contact form submissions, phone call clicks, and quote calculators to evaluate true ROI. To audit your current setup, run our free [Growth Check](/tools/growth-check) or read our [SEO checklist for 2026](/blog/seo-checklist-2026).",
      },
      {
        type: "heading",
        text: "19. A practical 4-month local SEO roadmap",
      },
      {
        type: "interactive-roadmap",
      },
      {
        type: "heading",
        text: "20. Authoritative sources and recommended reading",
      },
      {
        type: "list",
        items: [
          "[Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — Foundational crawling, indexing, and content principles.",
          "[Google Local Ranking Guide](https://support.google.com/business/answer/7091) — How Google calculates relevance, distance, and prominence.",
          "[Google Doorway Pages Policy](https://developers.google.com/search/docs/essentials/spam-policies#doorways) — Official rules regarding thin location page spam.",
          "[web.dev Core Web Vitals](https://web.dev/explore/learn-core-web-vitals) — Standards for site speed, interaction, and visual stability.",
          "[Schema.org LocalBusiness Specifications](https://schema.org/LocalBusiness) — Structured data properties for local commercial entities.",
          "[Next.js Metadata & Rendering Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) — Pre-rendering and meta optimization standards.",
          "[Ahrefs Local SEO Guide](https://ahrefs.com/seo/local-seo) & [Semrush Local Strategy](https://www.semrush.com/blog/what-is-local-seo/) — Comprehensive industry workflows.",
        ],
      },
      {
        type: "cta",
        title: "Want a local SEO roadmap tailored for your business?",
        text: "We help UK and USA service businesses dominate local search with modern Next.js sites, technical SEO, and conversion tracking.",
        label: "Book a Free Consultation",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "Is Next.js a direct Google ranking factor for local SEO?",
        a: "No. Google evaluates page relevance, helpfulness, and authority, not the underlying JavaScript framework. However, Next.js provides excellent speed, static pre-rendering, and metadata tooling that make implementing technical SEO much easier.",
      },
      {
        q: "How many location pages should a service business create?",
        a: "Only create location pages for areas where you have genuine customer demand, logistical capability, and unique local information to share. Avoid generating dozens of duplicate, thin doorway pages that swap only the city name.",
      },
      {
        q: "What is the most important factor in Google Business Profile ranking?",
        a: "Google determines local ranking through three primary criteria: Relevance (how well your profile matches the search), Distance (proximity to the user), and Prominence (business reputation, reviews, citations, and authority).",
      },
      {
        q: "How long does it take for a local SEO campaign to show results?",
        a: "Most local service businesses begin seeing improvements in impressions and phone inquiries within 60 to 90 days as technical fixes, GBP optimizations, and strategic location pages are indexed.",
      },
    ],
  },
  {
    slug: "how-to-use-icons-mobile-apps-websites",
    title:
      "How to Use Icons in Mobile Apps and Websites: Complete UI/UX Guide (2026)",
    excerpt:
      "Choose sizes, states, labels, accessibility and performance for interface icons — with practical Iconsax (apps) and Hugeicons (web) systems, Flutter and React patterns, and a full testing checklist.",
    date: "2026-07-26",
    readingTime: "18 min read",
    category: "App Development",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Choosing a good icon library is only the first decision. A product can use beautiful icons and still feel confusing, inconsistent or difficult to operate if the icons are too small, mixed across several styles, poorly labelled or used differently from one screen to another. For library ratings, see our companion post: [10 Best Icon Libraries for Mobile Apps and Websites](/blog/best-icon-libraries-mobile-apps-websites).",
      },
      {
        type: "paragraph",
        text: "Effective icons do three jobs: help people recognize an action or destination quickly, reduce visual noise without hiding meaning, and reinforce a consistent product identity.",
      },
      {
        type: "paragraph",
        text: "This guide explains how to build an icon system for mobile apps and websites — from choosing symbols and defining sizes to creating active states, supporting dark mode, improving accessibility and controlling performance. The practical default used throughout: [Iconsax](https://iconsax.io/) for mobile apps and [Hugeicons](https://hugeicons.com/) for websites — the same approach we use when shipping [apps](/services/app-development) and [marketing sites](/services/web-development).",
      },
      {
        type: "callout",
        title: "Quick answer: the most important icon rules",
        items: [
          "Use one primary icon family across the product.",
          "Choose icons by function before appearance.",
          "Use familiar metaphors for common actions.",
          "Add visible text beside unfamiliar or important icons.",
          "Keep routine interface icons around 16–24 units.",
          "Make the clickable or tappable area larger than the visible icon.",
          "Use a consistent state system (e.g. outline inactive, filled active).",
          "Give icon-only controls accessible names.",
          "Test contrast, focus, dark mode and disabled states.",
          "Import or ship only the assets the interface actually uses.",
        ],
      },
      {
        type: "heading",
        text: "Interface icons, app icons and illustrations are different",
      },
      {
        type: "table",
        headers: ["Asset type", "Purpose", "Examples", "Main requirement"],
        rows: [
          [
            "Interface icon",
            "Action, object, status or destination inside a product",
            "Search, home, profile, download",
            "Immediate recognition",
          ],
          [
            "App icon",
            "Represents the whole app on a device or store",
            "iOS / Android launcher",
            "Distinctive brand recognition",
          ],
          [
            "Illustration / 3D",
            "Explanation, emotion or promotion",
            "Empty state, onboarding",
            "Storytelling",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "This guide focuses on interface icons. Apple makes the same distinction: interface glyphs live inside an experience, while an [app icon](https://developer.apple.com/design/human-interface-guidelines/app-icons) represents the product itself. See also Apple’s [icons HIG](https://developer.apple.com/design/human-interface-guidelines/icons).",
      },
      {
        type: "heading",
        text: "What makes an icon system feel professional?",
      },
      {
        type: "paragraph",
        text: "A professional icon system is not simply a folder of matching SVGs. It answers: which library is default, which styles are allowed, what active looks like, which sizes map to which components, which colors icons inherit, when text is required, how icon-only buttons are labelled, and what happens when a concept is missing.",
      },
      {
        type: "paragraph",
        text: "When those decisions are left to individual screens, inconsistency appears quickly — 20px here, 24px there, 32px in a button with no padding. Same library, unfinished-looking product.",
      },
      {
        type: "heading",
        text: "Recommended icon sizes",
      },
      {
        type: "table",
        headers: ["UI context", "Visible icon", "Control / container", "Notes"],
        rows: [
          ["Inline with small text", "14–16 px", "Line height", "Supportive only"],
          ["Form / compact action", "18–20 px", "36–44 px", "Keep padding"],
          ["Standard web button", "18–20 px", "40–48 px", "Pair with text"],
          ["Mobile top bar", "22–24", "44–48", "Icon ≠ touch target"],
          ["Mobile bottom nav", "22–24", "~48+", "Label where possible"],
          ["Dashboard nav", "20–24 px", "40–48 px row", "Align to baseline"],
          ["Feature card", "28–40 px", "48–64 px", "Tinted background OK"],
          ["Empty / promo", "48+", "Content-dependent", "Treat as illustration"],
        ],
      },
      {
        type: "paragraph",
        text: "These are starting values. A 24px glyph from one library may look smaller than another because of optical size. Always test beside real typography and components.",
      },
      {
        type: "heading",
        text: "Visible icon size is not the touch-target size",
      },
      {
        type: "paragraph",
        text: "A common mistake is making only the visible vector clickable. A 20px icon can look right; a 20px button is hard to tap. Keep the icon balanced, then add padding around a larger interactive container.",
      },
      {
        type: "code",
        language: "text",
        code: "Visible icon: 20–24\nInteractive area: 44–48 or larger",
      },
      {
        type: "paragraph",
        text: "[Apple’s button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons) recommends at least 44×44 points. [Android accessibility guidance](https://developer.android.com/guide/topics/ui/accessibility/apps) recommends at least 48×48 dp. On the web, WCAG 2.2 [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) sets a 24×24 CSS-pixel floor with exceptions; the [enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced) criterion uses 44×44. Treat 24×24 as a floor, not an ideal mobile target.",
      },
      {
        type: "heading",
        text: "1. Choose icons by meaning before style",
      },
      {
        type: "paragraph",
        text: "Define the action in words first — go home, search products, view bookings, add to cart, share, download invoice, track delivery, contact support — then pick the symbol. That stops teams choosing a pretty glyph and inventing meaning later.",
      },
      {
        type: "list",
        items: [
          "Familiar metaphors: magnifying glass, house, gear, trash, bell, heart/bookmark, cart/bag.",
          "Even familiar icons need context — a heart can mean like, favourite, save or health.",
          "Nielsen Norman Group’s [icon usability guidance](https://www.nngroup.com/articles/icon-usability/) stresses that universal symbols are rare and text labels reduce ambiguity.",
        ],
      },
      {
        type: "heading",
        text: "2. Use one primary icon family",
      },
      {
        type: "paragraph",
        text: "Mixing libraries mismatches stroke widths, corner radii, grids, line caps, detail and metaphors. A Lucide settings icon and a Font Awesome user icon can both be good alone and wrong together.",
      },
      {
        type: "paragraph",
        text: "Practical exception: one UI library plus official brand marks for Google, Apple or payments. Example: Iconsax for all mobile UI actions, official payment marks at checkout, custom product logo for branding — not three general UI packs.",
      },
      {
        type: "heading",
        text: "3. Define allowed styles",
      },
      {
        type: "paragraph",
        text: "Large libraries include Line, Solid, Bold, Bulk, Duotone, Broken and more. Access helps only when the team controls where each style appears.",
      },
      {
        type: "table",
        headers: ["UI role", "Iconsax (mobile)", "Hugeicons (web)"],
        rows: [
          ["Default navigation", "Line", "Stroke Rounded"],
          ["Selected navigation", "Bold or Bulk", "Solid Rounded / stronger stroke"],
          ["Standard action", "Line", "Stroke Rounded"],
          ["High-priority status", "Bold", "Solid or stroke in colored container"],
          ["Feature / marketing", "Bulk or Two-tone", "Duotone or Two-tone"],
          ["Dense dashboard", "Line", "Stroke Standard"],
          ["Decorative only", "Broken (sparingly)", "Avoid mixing families"],
        ],
      },
      {
        type: "paragraph",
        text: "Pick one geometric family on the web — rounded, standard or sharp — as the foundation. Do not mix rounded headers, sharp cards and standard dashboards without a deliberate reason. See [Iconsax docs](https://docs.iconsax.io/) and [Hugeicons docs](https://hugeicons.com/docs).",
      },
      {
        type: "heading",
        text: "4. Create clear active and inactive states",
      },
      {
        type: "paragraph",
        text: "Icons often represent state: selected tab, saved product, muted audio, expanded section, visible password, enabled filter. Use two or more cues — outline→filled, neutral→brand, regular→bold, no background→tinted, icon only→icon plus indicator. Do not rely on a small color-only change.",
      },
      {
        type: "table",
        headers: ["State", "Icon", "Color", "Label"],
        rows: [
          ["Inactive nav", "Line", "Neutral grey", "Visible"],
          ["Active nav", "Bold or Bulk", "Brand primary", "Semibold / primary"],
          ["Not saved", "Outline heart", "—", "Add to favourites"],
          ["Saved", "Filled heart", "—", "Remove / aria-pressed"],
        ],
      },
      {
        type: "heading",
        text: "5. Use icons and labels together",
      },
      {
        type: "list",
        items: [
          "Often OK icon-only (still need accessible names): close, search, menu, back, play/pause, volume.",
          "Usually need visible text: industry services, uncommon finance actions, workflow stages, import vs export, archive vs delete, unclear AI actions.",
          "Bottom navigation should generally show short labels; feature cards should pair icon + heading + explanation.",
        ],
      },
      {
        type: "heading",
        text: "6–7. Align optically and space consistently",
      },
      {
        type: "paragraph",
        text: "Identical width/height can still look misaligned — play triangles, narrow info glyphs, circular icons. Check vertical centering beside text, visual weight vs neighbours, icon–label gaps, and balance at 16/20/24. Fix recurring optical issues in a shared component, not with random per-icon margins.",
      },
      {
        type: "table",
        headers: ["Relationship", "Starting gap"],
        rows: [
          ["Small icon + compact text", "4–6 px"],
          ["Button icon + label", "8 px"],
          ["Nav icon + horizontal label", "8–12 px"],
          ["Bottom nav icon above label", "3–6 px"],
          ["Feature icon above heading", "12–16 px"],
          ["Status icon + message", "8–12 px"],
        ],
      },
      {
        type: "paragraph",
        text: "Use your existing spacing scale (4, 8, 12, 16, 24) rather than inventing icon-only values.",
      },
      {
        type: "heading",
        text: "8. Design accessible icon controls",
      },
      {
        type: "paragraph",
        text: "An icon-only button with no programmatic name may announce as “button” with no meaning. Patterns below follow [WAI names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/), [MDN aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) and the [WAI button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) (`aria-pressed` for toggles).",
      },
      {
        type: "code",
        language: "html",
        code: `<!-- Decorative icon beside visible text -->
<button type="button">
  <svg aria-hidden="true" focusable="false">...</svg>
  Download invoice
</button>

<!-- Icon-only button -->
<button type="button" aria-label="Close">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Toggle -->
<button type="button" aria-label="Save item" aria-pressed="true">
  <svg aria-hidden="true" focusable="false">...</svg>
</button>`,
      },
      {
        type: "paragraph",
        text: "Do not use filenames as labels (`heart-filled.svg`, `icon-23`). Use action language users understand — and translate accessible labels when the product is multilingual. Also see [WAI functional images](https://www.w3.org/WAI/tutorials/images/functional/).",
      },
      {
        type: "heading",
        text: "9. Maintain sufficient contrast",
      },
      {
        type: "paragraph",
        text: "Meaningful icons need to stay visible in light/dark mode, hover, focus, active, disabled and high-contrast settings. WCAG [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) requires at least 3:1 for information needed to identify a control or its state. Prefer semantic tokens and `currentColor` so icons inherit theme colors — avoid hard-coded black SVGs.",
      },
      {
        type: "code",
        language: "css",
        code: `:root {
  --icon-primary: #172033;
  --icon-secondary: #5f6b7a;
  --icon-disabled: #9aa4b2;
  --icon-brand: #2563eb;
  --icon-danger: #dc2626;
}

[data-theme="dark"] {
  --icon-primary: #f5f7fa;
  --icon-secondary: #b6c0cc;
  --icon-disabled: #697586;
  --icon-brand: #60a5fa;
  --icon-danger: #f87171;
}

.ui-icon {
  color: var(--icon-secondary);
}`,
      },
      {
        type: "heading",
        text: "10. Preserve clear keyboard focus on websites",
      },
      {
        type: "paragraph",
        text: "Every interactive icon needs keyboard reachability, a visible focus indicator, sufficient focus contrast, logical tab order and expected key activation. Do not remove the browser outline unless you replace it with an equally clear style — focus around the full target, not only the tiny SVG path.",
      },
      {
        type: "code",
        language: "css",
        code: `.icon-button:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}`,
      },
      {
        type: "heading",
        text: "11. Use SVG and selective imports for web performance",
      },
      {
        type: "paragraph",
        text: "SVG scales cleanly, can inherit color and avoids multiple raster resolutions. Google’s [web icon guidance](https://web.dev/learn/design/icons) notes that inline SVG can be styled through CSS and adapt to themes. Import only used icons, prefer tree-shakeable packages, avoid shipping every family/weight, consider an SVG sprite for stable sets on many pages, and audit the production bundle.",
      },
      {
        type: "paragraph",
        text: "Icon fonts can still suit WordPress/CMS/legacy projects, but loading thousands of glyphs for six icons is wasteful. For new React or [Next.js](/blog/why-nextjs-for-marketing-sites) products, individual SVG components are usually easier to control.",
      },
      {
        type: "heading",
        text: "12. Avoid unnecessary icon animation",
      },
      {
        type: "paragraph",
        text: "Useful motion: menu→close morph, download progress, chevron on accordion open, success after completion, loading for an active process. Motion should explain change — not decorate every hover. Keep it short, purposeful, and respect reduced-motion preferences.",
      },
      {
        type: "heading",
        text: "A practical Iconsax system for Flutter mobile apps",
      },
      {
        type: "paragraph",
        text: "Treat Iconsax as a controlled system — not arbitrary properties on every screen. Define semantic sizes, theme colors, style roles, and wrappers for icon, icon button, bottom nav, feature container and status.",
      },
      {
        type: "code",
        language: "dart",
        code: `abstract final class AppIconSize {
  static const double compact = 16;
  static const double control = 20;
  static const double navigation = 24;
  static const double feature = 32;
}`,
      },
      {
        type: "code",
        language: "text",
        code: `Inactive nav:
  Iconsax Line · 24 · secondary color · short label

Active nav:
  Iconsax Bold/Bulk · 24 · brand color · semibold label

Target: at least 44–48 units`,
      },
      {
        type: "paragraph",
        text: "Provide meaningful tooltips on icon-only Flutter IconButtons. Test with Android TalkBack and iOS VoiceOver — do not assume the widget tree announces the intended action.",
      },
      {
        type: "heading",
        text: "A practical Hugeicons system for websites",
      },
      {
        type: "paragraph",
        text: "Hugeicons fits sites that mix marketing pages, service categories and authenticated dashboards. Start with Stroke Rounded for most modern service/SaaS sites (or Stroke Standard for more corporate products). Create one application-level component so feature code never imports random families.",
      },
      {
        type: "code",
        language: "tsx",
        code: `type AppIconProps = {
  name: IconName;
  size?: 16 | 20 | 24 | 32;
  tone?: "primary" | "secondary" | "brand" | "danger";
  decorative?: boolean;
};

export function AppIcon({
  name,
  size = 20,
  tone = "secondary",
  decorative = true,
}: AppIconProps) {
  // Map semantic name → approved Hugeicons asset.
  // Apply currentColor, sizing and a11y rules here.
}`,
      },
      {
        type: "paragraph",
        text: "Separate AppIcon (visual) from IconButton (interactive — target size, hover, focus, disabled, accessible name, loading). For local-service sites, map recurring concepts once — quote, location, availability, verified, payment, support, delivery, reviews — and reuse across home, service and area pages.",
      },
      {
        type: "heading",
        text: "What to do when an icon is missing",
      },
      {
        type: "numbered",
        items: [
          "Search by synonyms and user intent, not only internal jargon.",
          "Check categories and tags.",
          "Choose a familiar broader metaphor if it stays accurate.",
          "Combine with text instead of forcing a hyper-specific symbol.",
          "Request an icon from the library if the workflow supports it.",
          "Create a custom SVG on the same grid, stroke, caps and corners — never drop an emoji or mismatched stock icon into core navigation.",
        ],
      },
      {
        type: "heading",
        text: "Document and test the system",
      },
      {
        type: "list",
        items: [
          "Document library version, allowed families, semantic names, sizes, colors, active-state mapping, a11y rules, code examples, custom and deprecated icons.",
          "Prefer product names like download over vendor filenames like ArrowSquareDown02.",
          "Keep a decision record (heart = favourite, bookmark = save later, bell = notifications).",
          "Test recognition, labels, five-second navigation, small sizes, keyboard/screen reader/zoom/contrast/dark mode/touch/reduced motion, and real devices.",
        ],
      },
      {
        type: "heading",
        text: "Common icon mistakes",
      },
      {
        type: "list",
        items: [
          "Decorating every heading with a different symbol.",
          "Rainbow colors that kill hierarchy.",
          "Random sizes (17, 19, 23, 27…) instead of a small scale.",
          "Mixing outline and solid without state meaning.",
          "Making only the SVG pixels clickable.",
          "Inventing symbols when short text (VAT, PDF, 24/7) is clearer.",
          "Copying platform symbols without checking cross-platform meaning.",
          "Ignoring RTL — directional icons may need to mirror in Arabic/Urdu; search/settings/camera usually do not.",
        ],
      },
      {
        type: "heading",
        text: "Complete implementation workflow",
      },
      {
        type: "numbered",
        items: [
          "List the 20–30 most important actions and destinations.",
          "Choose one primary library.",
          "Test core icons at 16, 20 and 24.",
          "Select one base family; define active/inactive styles.",
          "Create semantic size and color tokens.",
          "Build shared icon and icon-button components.",
          "Add accessible names and visible labels.",
          "Check dark mode, focus, contrast and touch targets.",
          "Import only production assets; document mappings.",
          "Test recognition with real users; re-audit when new product areas ship.",
        ],
      },
      {
        type: "heading",
        text: "Final recommendation",
      },
      {
        type: "list",
        items: [
          "Mobile (Iconsax): Line default, Bold/Bulk active, Two-tone for selected promo/onboarding, 20–24 icons in 44–48 targets, labels for nav and unfamiliar actions.",
          "Web (Hugeicons): Stroke Rounded or Standard default, solid for selected/high emphasis, duotone for limited marketing visuals, SVG/selective imports, one shared component for size/color/a11y.",
        ],
      },
      {
        type: "paragraph",
        text: "The goal is not to display as many icons as possible. The goal is a visual language users understand without stopping to decode it.",
      },
      {
        type: "cta",
        title: "Need an icon system built into your app or site?",
        text: "We apply Iconsax and Hugeicons patterns in [app development](/services/app-development) and [web development](/services/web-development) — see [pricing](/pricing) or [contact us](/contact). Start with the [icon libraries comparison](/blog/best-icon-libraries-mobile-apps-websites) if you have not picked a set yet.",
        label: "Talk to us",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "What is the best icon size for a mobile app?",
        a: "Most routine mobile interface icons work well around 20–24 dp or points. The interactive target should be larger: Apple recommends at least 44×44 points; Android recommends at least 48×48 dp.",
      },
      {
        q: "What is the best icon size for a website?",
        a: "About 16px for compact inline use, 18–20px in buttons and forms, 20–24px in navigation, and 28–40px for feature cards. Always test optical size, not only export dimensions.",
      },
      {
        q: "Should active icons be filled?",
        a: "Filled icons are an effective active-state cue when the library provides a matching pair. Combine fill with color, label treatment or a background — do not rely on one subtle change.",
      },
      {
        q: "Do icon-only buttons need aria-label?",
        a: "Yes — an icon-only web button needs an accessible name. aria-label is one option when no visible text exists. Hide the decorative SVG from assistive technology to avoid duplicate announcements.",
      },
      {
        q: "Should every icon have visible text?",
        a: "No, but important and unfamiliar actions should. Widely recognized controls may work without visible text in clear context if they still have accessible names. Navigation and industry-specific icons usually need labels.",
      },
      {
        q: "Can I mix Iconsax and Hugeicons?",
        a: "Use one as the primary UI family. Mixing them across routine controls creates inconsistent strokes and geometry. A separate brand-icon set or carefully matched custom icon is a better exception.",
      },
      {
        q: "Are icon fonts bad?",
        a: "Not automatically — they can suit CMS and legacy workflows. Modern SVG or component delivery usually offers better control, accessibility and selective loading. Avoid loading a massive font for a handful of icons.",
      },
      {
        q: "Should directional icons mirror in Arabic and Urdu interfaces?",
        a: "Many directional icons should mirror in RTL layouts — back, next and reply arrows. Icons for physical objects or non-directional actions (search, settings, camera) normally should not mirror automatically.",
      },
      {
        q: "How many icon styles should one product use?",
        a: "Most products need one base style and one state variant. A third style can be reserved for marketing or onboarding. Using every style in the library usually weakens consistency.",
      },
      {
        q: "How do I know whether users understand an icon?",
        a: "Test it. Ask representative users what they expect, watch for hesitation and wrong taps. If meaning stays uncertain, add a visible label or choose a more familiar metaphor.",
      },
    ],
  },
  {
    slug: "best-icon-libraries-mobile-apps-websites",
    title: "10 Best Icon Libraries for Mobile Apps and Websites in 2026 (Rated)",
    excerpt:
      "Compare Hugeicons, Iconsax, Lucide, Phosphor, Tabler, Material Symbols and more — rated for apps and websites, with clear picks for Flutter, Next.js, dashboards and design systems.",
    date: "2026-07-26",
    readingTime: "16 min read",
    category: "App Development",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Icons may be small, but their effect on a digital product is not. The right icon system makes navigation faster, strengthens visual hierarchy and helps an app or website feel consistent. The wrong one can make even a technically strong product look unfinished.",
      },
      {
        type: "paragraph",
        text: "The real challenge is not finding icons. Thousands of icon packs are available. The challenge is choosing one library with enough coverage, consistent geometry, suitable styles, practical licensing and reliable developer integrations — and then using it consistently.",
      },
      {
        type: "paragraph",
        text: "For this guide, I evaluated ten of the strongest icon libraries for modern mobile apps, SaaS products, dashboards, e-commerce stores and marketing websites. Each library is rated for both app and website use because the same set does not always perform equally well in both environments. We use Hugeicons on the [Jadeed Solutions](/) site itself, and Iconsax often wins for the [Flutter and React Native apps](/services/app-development) we ship. After you pick a library, read [How to Use Icons in Mobile Apps and Websites](/blog/how-to-use-icons-mobile-apps-websites) for sizes, states, accessibility and implementation.",
      },
      {
        type: "callout",
        title: "The quick verdict",
        items: [
          "Author’s choice for mobile apps: [Iconsax](https://iconsax.io/)",
          "Author’s choice for websites: [Hugeicons](https://hugeicons.com/)",
          "Best free minimalist library: [Lucide](https://lucide.dev/)",
          "Best for Android and Material Design: [Material Symbols](https://developers.google.com/fonts/docs/material_symbols)",
          "Best free library for data-heavy dashboards: [Tabler Icons](https://tabler.io/icons)",
        ],
      },
      {
        type: "paragraph",
        text: "If I were starting a polished Flutter or React Native app today, I would choose Iconsax. Its friendly geometry, multiple visual styles and broad subject coverage work particularly well for navigation, profiles, wallets, bookings, e-commerce and service apps.",
      },
      {
        type: "paragraph",
        text: "For a modern website, SaaS platform or scalable web design system, I would choose Hugeicons. Its enormous collection, consistent families, web-focused tooling and integrations make it easier to maintain one visual language across navigation, feature sections, pricing pages, dashboards and niche landing pages.",
      },
      {
        type: "heading",
        text: "Top 10 icon libraries: ratings and comparison",
      },
      {
        type: "table",
        headers: ["Rank", "Library", "Overall", "Apps", "Web", "Best for"],
        rows: [
          ["1", "Hugeicons", "96", "94", "98", "Websites, SaaS, design systems"],
          ["2", "Iconsax", "95", "98", "93", "Consumer mobile apps"],
          ["3", "Lucide", "92", "91", "95", "Minimal open-source web"],
          ["4", "Phosphor", "91", "94", "90", "Expressive flexible UI"],
          ["5", "Tabler Icons", "90", "88", "94", "Dashboards & admin"],
          ["6", "Material Symbols", "89", "96*", "87", "Android / Material"],
          ["7", "Font Awesome", "87", "85", "92", "Brand icons & mature web"],
          ["8", "Heroicons", "85", "82", "91", "Tailwind MVPs"],
          ["9", "Remix Icon", "84", "87", "86", "Free general-purpose UI"],
          ["10", "Bootstrap Icons", "82", "78", "88", "Bootstrap sites"],
        ],
      },
      {
        type: "paragraph",
        text: "*Material Symbols scores 96/100 for Android-first apps. Its cross-platform app score would be lower when strict iOS visual conventions or a distinctive brand language are required.",
      },
      {
        type: "quote",
        text: "Important note about library sizes: Vendors count icons differently. Some publish unique concepts; others count every weight or variant. Raw totals help estimate coverage — they are not a direct quality comparison.",
      },
      {
        type: "heading",
        text: "How the icon libraries were rated",
      },
      {
        type: "paragraph",
        text: "The ratings are an editorial assessment based on seven practical factors:",
      },
      {
        type: "numbered",
        items: [
          "Visual consistency — 25 points: stroke widths, corner radii, optical sizes and metaphors.",
          "Icon coverage — 20 points: common actions plus niche product needs.",
          "Style flexibility — 15 points: outline, solid, duotone, bulk or multiple weights.",
          "Developer workflow — 15 points: packages, docs, SVG exports and framework integrations.",
          "Platform fit — 10 points: mobile navigation, web layouts, dashboards and controls.",
          "Performance and customization — 10 points: selective imports, size, color, stroke and state.",
          "Licensing and value — 5 points: clear, practical usage for commercial client work.",
        ],
      },
      {
        type: "paragraph",
        text: "No library receives points simply for having the largest number on its homepage. Consistency, recognizability and implementation quality matter more than volume.",
      },
      {
        type: "heading",
        text: "1. Hugeicons — best icon library for websites",
      },
      {
        type: "paragraph",
        text: "Overall 96/100 · Apps 94 · Websites 98 · Author’s choice for websites. [Hugeicons](https://hugeicons.com/) is the strongest overall choice for modern websites, SaaS products and large web design systems. Its free library includes more than 5,900 stroke-rounded icons, while the Pro collection advertises more than 59,000 icons across 10 styles. Integrations and guidance cover React, Vue, Angular, Svelte, React Native, Flutter, Swift, WordPress, Elementor and Webflow in the [official docs](https://hugeicons.com/docs).",
      },
      {
        type: "paragraph",
        text: "Hugeicons solves a common product-design frustration: finding a matching icon for a niche concept. Small libraries cover home, user, search and settings — then fall apart for moving services, medical specialties, logistics, AI, property types or detailed e-commerce categories. Multiple rounded, standard and sharp families keep one design language. Styles ship as separate packages so you install only what you need; see the [free web-font guide](https://hugeicons.com/docs/icons-for-web/quick-start) for SVG and font formats.",
      },
      {
        type: "list",
        items: [
          "Best for: SaaS marketing + dashboards, service-business sites, e-commerce, WordPress/Elementor, enterprise design systems.",
          "Limitation: Pro is paid; 59,000+ variants are overkill for tiny projects unless you lock one family and weight first.",
        ],
      },
      {
        type: "quote",
        text: "Verdict: Hugeicons is the best website icon library in this comparison — depth, consistency and unusually broad web tooling in one system.",
      },
      {
        type: "heading",
        text: "2. Iconsax — best icon library for mobile apps",
      },
      {
        type: "paragraph",
        text: "Overall 95/100 · Apps 98 · Websites 93 · Author’s choice for mobile apps. [Iconsax](https://iconsax.io/) is my first choice for mobile app interfaces. Shapes feel modern and approachable without becoming childish, and the style system works for quiet navigation and stronger active states. It advertises 44,000+ premium variants alongside thousands of free icons. [Official docs](https://docs.iconsax.io/) cover React, Vue, Flutter, Svelte and JavaScript/TypeScript, with Line, Bold, Bulk, Two-tone, Broken and Outline styles.",
      },
      {
        type: "paragraph",
        text: "Mobile UI needs icons that communicate in limited space. Iconsax shines in bottom navigation, tab bars, profiles, booking flows, wallets, order tracking and settings. A practical pattern: linear when inactive, bolder or bulk when selected — stronger state cues without relying on color alone. Especially strong for Flutter and React Native, which matches how we approach [app development](/services/app-development) for restaurants, bookings and local services.",
      },
      {
        type: "list",
        items: [
          "Best for: consumer iOS/Android, Flutter/RN, restaurant & delivery, salon/cleaning/local services, wallets, fitness and marketplaces.",
          "Limitation: headline counts include style variants; pick two styles for default vs selected and stick to them.",
        ],
      },
      {
        type: "quote",
        text: "Verdict: Iconsax is the best mobile app icon library here — clear metaphors, friendly geometry, strong state variants and practical cross-platform support.",
      },
      {
        type: "heading",
        text: "3. Lucide — best free minimalist icon library",
      },
      {
        type: "paragraph",
        text: "Overall 92/100 · Apps 91 · Websites 95. [Lucide](https://lucide.dev/) is one of the best choices for a clean, free, open-source system (~1,756 icons, ISC license). Restraint is the strength: quiet, predictable icons that let typography and content lead. Strong ecosystem for React, [Next.js](/blog/why-nextjs-for-marketing-sites) and component libraries.",
      },
      {
        type: "list",
        items: [
          "Best for: minimal SaaS, Next.js/React apps, docs, developer tools, AI UIs, content dashboards.",
          "Limitation: mainly outline — less ideal if you need rich duotone or heavily branded personality out of the box.",
        ],
      },
      {
        type: "heading",
        text: "4. Phosphor Icons — best for flexible weights and expressive UI",
      },
      {
        type: "paragraph",
        text: "Overall 91/100 · Apps 94 · Websites 90. [Phosphor Icons](https://phosphoricons.com/) ships 9,072 assets across Thin, Light, Regular, Bold, Fill and Duotone (MIT). Use Light for secondary actions, Regular for general UI, Bold/Fill for selected nav, Duotone for feature cards — hierarchy without switching families.",
      },
      {
        type: "list",
        items: [
          "Best for: expressive mobile states, onboarding, creator/social tools, education and fitness, feature-rich web apps.",
          "Limitation: decorative styles can clutter dense tables; use Duotone intentionally.",
        ],
      },
      {
        type: "heading",
        text: "5. Tabler Icons — best free library for dashboards",
      },
      {
        type: "paragraph",
        text: "Overall 90/100 · Apps 88 · Websites 94. [Tabler Icons](https://tabler.io/icons) offers 6,100+ free MIT SVG icons on a 24×24 grid with a 2px stroke, plus React, Vue, SolidJS and Figma packages. Broad, disciplined coverage makes it excellent for admin panels, analytics, CRM/ERP and ops tools.",
      },
      {
        type: "list",
        items: [
          "Best for: dashboards, B2B products, logistics software, infrastructure UIs, permissive open-source needs.",
          "Limitation: can feel neutral/technical — consumer lifestyle apps may prefer Iconsax or Phosphor.",
        ],
      },
      {
        type: "heading",
        text: "6. Material Symbols — best for Android and Material Design",
      },
      {
        type: "paragraph",
        text: "Overall 89/100 · Android apps 96 · Websites 87. [Google Material Symbols](https://developers.google.com/fonts/docs/material_symbols) includes 2,500+ icons in a variable-font system (fill, weight, grade, optical size) under Apache 2.0. Strongest native fit for Android-first and Material 3 products. Google documents requesting only named icons from Fonts — an example payload around 1.7 KB — important because unrestricted variable fonts can bloat pages.",
      },
      {
        type: "list",
        items: [
          "Best for: Android apps, Material 3, Google Workspace-style products, variable fill/weight animation.",
          "Limitation: can feel distinctly Google-like; weaker when you need a unique brand or iOS-native character.",
        ],
      },
      {
        type: "heading",
        text: "7. Font Awesome — best for brand icons and mature web ecosystems",
      },
      {
        type: "paragraph",
        text: "Overall 87/100 · Apps 85 · Websites 92. [Font Awesome](https://fontawesome.com/icons) remains strong for maturity, docs, brand-logo coverage and SVG/JS/font delivery. Brand icons for social, tech and payments are often easier here than in UI-first minimalist sets. Many advanced styles need Pro.",
      },
      {
        type: "list",
        items: [
          "Best for: brand icons, legacy FA projects, CMS themes, social/payment integrations.",
          "Limitation: free/paid structure is complex; ubiquity can feel generic without careful sizing and style control.",
        ],
      },
      {
        type: "heading",
        text: "8. Heroicons — best for Tailwind CSS projects",
      },
      {
        type: "paragraph",
        text: "Overall 85/100 · Apps 82 · Websites 91. [Heroicons](https://heroicons.com/) (from the Tailwind CSS creators) offers 316 hand-crafted icons with React/Vue packages (MIT). Smaller scope speeds MVP decisions — outline and solid cover common nav, forms and marketing cleanly.",
      },
      {
        type: "list",
        items: [
          "Best for: Tailwind sites, Laravel/React fronts, startup MVPs, simple SaaS.",
          "Limitation: niche industries and large apps may outgrow 316 concepts and start mixing mismatched sets.",
        ],
      },
      {
        type: "heading",
        text: "9. Remix Icon — best free outline-and-fill generalist",
      },
      {
        type: "paragraph",
        text: "Overall 84/100 · Apps 87 · Websites 86. [Remix Icon](https://remixicon.com/) provides 3,200+ symbols with outlined and filled pairs on a 24×24 grid — handy for inactive/active states. In January 2026 it introduced its own license version; commercial product use is still allowed, but teams planning redistribution or templates should read the [current license](https://github.com/Remix-Design/remixicon/blob/master/License) rather than older Apache 2.0 articles.",
      },
      {
        type: "heading",
        text: "10. Bootstrap Icons — best for Bootstrap websites",
      },
      {
        type: "paragraph",
        text: "Overall 82/100 · Apps 78 · Websites 88. [Bootstrap Icons](https://icons.getbootstrap.com/) is free and open source (2,000+ icons, MIT) as SVG, sprite or web font — with or without Bootstrap. Practical for conventional business portals and admin themes; less ambitious for premium mobile branding.",
      },
      {
        type: "heading",
        text: "Iconsax vs Hugeicons: which one should you choose?",
      },
      {
        type: "table",
        headers: ["Decision factor", "Iconsax", "Hugeicons"],
        rows: [
          ["Best platform", "Mobile apps", "Websites & web apps"],
          ["Personality", "Friendly, app-focused", "Polished, design-system"],
          ["Mobile navigation", "Winner", "Strong"],
          ["Marketing websites", "Strong", "Winner"],
          ["Large SaaS systems", "Strong", "Winner"],
          ["Flutter fit", "Excellent", "Excellent"],
          ["WordPress/Webflow", "More limited", "Excellent"],
          ["Pick in this guide", "Apps", "Websites"],
        ],
      },
      {
        type: "paragraph",
        text: "Choose Iconsax when the product is mainly touch-first and you want friendly premium navigation. Choose Hugeicons when the project spans a public site, landing pages, feature cards, a dashboard and many niche categories under one system.",
      },
      {
        type: "heading",
        text: "How to choose the right icon library for your project",
      },
      {
        type: "numbered",
        items: [
          "Start with the product, not the icon count — a docs site may only need Lucide; a marketplace may need Hugeicons.",
          "Test the ten icons you use most: home, search, profile, menu, notifications, settings, calendar, location, payment, plus your top industry action.",
          "Check default, selected, hover, focus, disabled, dark mode and small sizes.",
          "Confirm framework packages and per-icon imports — avoid shipping the whole library.",
          "Read the current license for client work, SaaS, templates and redistribution.",
        ],
      },
      {
        type: "heading",
        text: "Seven rules for using icons well",
      },
      {
        type: "list",
        items: [
          "Use one primary icon family — mixing Lucide + Font Awesome + Material usually breaks stroke and optical size.",
          "Keep functionally identical icons consistent (heart vs bookmark for “save”).",
          "Label unfamiliar actions; for icon-only buttons use aria-label and follow [W3C functional image guidance](https://www.w3.org/WAI/tutorials/images/functional/).",
          "Separate icon size from touch target — Apple suggests ~44×44 pt ([HIG buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)); Android often ~48×48 dp ([accessibility apps guide](https://developer.android.com/guide/topics/ui/accessibility/apps)).",
          "Prefer SVGs or selective component imports on the web.",
          "Do not communicate state through color alone — pair fill, weight or text.",
          "Build an icon token system (16 / 20 / 24 / 32 / 40–48 px roles) instead of inventing sizes per screen.",
        ],
      },
      {
        type: "heading",
        text: "Final recommendation",
      },
      {
        type: "list",
        items: [
          "Use Iconsax for mobile apps.",
          "Use Hugeicons for websites.",
          "Use Lucide for a free minimalist default.",
          "Use Tabler for large free dashboard coverage.",
          "Use Material Symbols for Android-first products.",
          "Use Font Awesome when brand icons or a legacy ecosystem matter most.",
        ],
      },
      {
        type: "paragraph",
        text: "The best icon system is not the one with the highest advertised count. It is the one your team can apply consistently across every screen, state and platform without making users stop to interpret the interface.",
      },
      {
        type: "cta",
        title: "Building an app or website and need icon decisions made for you?",
        text: "We ship [apps](/services/app-development) and [marketing sites](/services/web-development) with one consistent icon system — see [pricing](/pricing) or [contact us](/contact).",
        label: "Talk to us",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "What is the best icon library for mobile apps?",
        a: "Iconsax is the author’s top choice for mobile apps because of clear mobile-friendly geometry plus Line, Bold, Bulk and Two-tone styles for navigation states. Material Symbols is the best alternative for Android-first Material Design products.",
      },
      {
        q: "What is the best icon library for websites?",
        a: "Hugeicons is the author’s top website choice — large category coverage, multiple families and integrations for modern frameworks, WordPress, Elementor and Webflow. We use it on jadeedsolutions.com.",
      },
      {
        q: "What is the best free icon library?",
        a: "Lucide is the best minimalist free choice; Tabler Icons offers broader free coverage for dashboards. Phosphor is better when multiple weights and duotone matter.",
      },
      {
        q: "Is Iconsax better than Hugeicons?",
        a: "Iconsax is better for many mobile app interfaces; Hugeicons is better for large websites and web design systems. Hugeicons has broader web tooling; Iconsax has a stronger app-focused personality.",
      },
      {
        q: "Can I use more than one icon library in the same project?",
        a: "Yes, but make it the exception — typically one primary UI library plus a dedicated brand-icon set. Avoid mixing general UI icons from several families unless you normalize stroke, grid and optical size.",
      },
      {
        q: "Are SVG icons better than icon fonts?",
        a: "For many modern websites, SVG or framework components give better per-icon control, scaling, semantics and selective loading. Icon fonts can still suit large CMS or legacy systems if you do not load an entire unused set.",
      },
      {
        q: "Do icons need accessibility labels?",
        a: "Decorative icons should usually be hidden from assistive technology. Icon-only controls need an accessible name for the action (Close, Search, Add to cart). If visible text already labels the control, do not duplicate it for screen readers.",
      },
      {
        q: "How many icon styles should one product use?",
        a: "Most products need one primary style and one state variation — for example outline by default and filled for selected navigation. Too many styles feel inconsistent even inside one library.",
      },
    ],
  },
  {
    slug: "seo-for-local-service-business-step-by-step",
    title:
      "How to Do SEO for a Local Service Business: A Complete Step-by-Step Guide",
    excerpt:
      "A practical local SEO system for movers, cleaners, plumbers and trades — from Google Business Profile and reviews to service pages, pricing, CTAs, Core Web Vitals and a 90-day plan that aims at bookings, not vanity traffic.",
    date: "2026-07-26",
    readingTime: "18 min read",
    category: "SEO",
    authorSlug: "sameer-ahmad-basra",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Getting a local service business to appear on Google is not simply about adding keywords to a website. A successful SEO strategy must help the business generate impressions, attract relevant clicks, build trust and ultimately convert visitors into enquiries and confirmed bookings. If you want a shorter monthly routine after this guide, see our [2026 SEO checklist](/blog/seo-checklist-2026).",
      },
      {
        type: "paragraph",
        text: "This guide explains how to perform modern SEO for a local service business such as a moving company, cleaning company, plumber, electrician, landscaping business or home-maintenance provider. We also publish shorter playbooks under [Guides](/guides) and [industry pages](/industries).",
      },
      {
        type: "paragraph",
        text: "A London removals company will be used as the primary example, but the same process can be adapted to almost any location-based business.",
      },
      {
        type: "callout",
        title: "What you will learn",
        items: [
          "The full funnel: impressions → clicks → enquiries → bookings → reviews",
          "Google Business Profile, reviews and keyword intent",
          "Service pages, location pages, titles, trust and case studies",
          "Pricing clarity, CTAs, mobile speed, schema and AI search",
          "A practical 90-day plan and a final publish checklist",
        ],
      },
      {
        type: "heading",
        text: "1. Understand the complete SEO conversion funnel",
      },
      {
        type: "paragraph",
        text: "Many business owners judge SEO only by rankings. However, ranking for a keyword does not automatically generate revenue.",
      },
      {
        type: "paragraph",
        text: "A complete local SEO funnel looks like this:",
      },
      {
        type: "quote",
        text: "Search impressions → website clicks → enquiries → qualified leads → confirmed bookings → reviews and referrals",
      },
      {
        type: "paragraph",
        text: "Each stage requires a different type of optimisation:",
      },
      {
        type: "list",
        items: [
          "Keyword research generates relevant impressions.",
          "Titles and descriptions encourage clicks.",
          "Helpful landing pages keep visitors engaged.",
          "Reviews and business information build trust.",
          "Strong calls to action generate enquiries.",
          "Good customer service converts enquiries into bookings.",
          "Successful jobs generate reviews, referrals and stronger brand recognition.",
        ],
      },
      {
        type: "paragraph",
        text: "The final objective should not be “get more traffic.” It should be:",
      },
      {
        type: "quote",
        text: "Generate more profitable bookings from relevant local searches.",
      },
      {
        type: "heading",
        text: "2. Set up and optimise Google Business Profile",
      },
      {
        type: "paragraph",
        text: "Google Business Profile is one of the most important assets for any local service company. It can help a business appear in Google Maps, the local pack and location-based search results.",
      },
      {
        type: "paragraph",
        text: "According to [Google’s local-ranking guidance](https://support.google.com/business/answer/7091), local results are primarily influenced by relevance, distance and prominence.",
      },
      {
        type: "paragraph",
        text: "Complete the following elements carefully:",
      },
      {
        type: "list",
        items: [
          "Use the real business name.",
          "Select the most accurate primary category.",
          "Add only genuinely relevant secondary categories.",
          "Enter the real operational telephone number.",
          "Define accurate service areas.",
          "Add regular and special opening hours.",
          "List all genuine services.",
          "Write a clear business description.",
          "Add the correct website landing page.",
          "Upload original business photographs.",
          "Respond to every customer review.",
        ],
      },
      {
        type: "paragraph",
        text: "A moving company should upload photographs of its team, branded vans, protective equipment and completed moves. Generic stock photography provides far less evidence that the company genuinely operates in the claimed area.",
      },
      {
        type: "paragraph",
        text: "Never use a virtual office as a customer-facing location if the business does not actually receive customers there. Service-area businesses must follow Google’s eligibility and address guidelines.",
      },
      {
        type: "heading",
        text: "3. Build a strong review-generation system",
      },
      {
        type: "paragraph",
        text: "Reviews influence customer confidence and contribute to the overall prominence of a local business. A company should not wait passively for reviews — make review collection part of the service process.",
      },
      {
        type: "numbered",
        items: [
          "Complete the job successfully.",
          "Confirm that the customer is satisfied.",
          "Send the direct Google review link.",
          "Politely request honest feedback.",
          "Respond to the published review.",
          "Ask permission before reusing it on the website.",
        ],
      },
      {
        type: "paragraph",
        text: "Encourage customers to describe their actual experience naturally. A detailed review such as the following is more useful than a generic “great service” comment:",
      },
      {
        type: "quote",
        text: "Phi Movers helped us move from a two-bedroom flat in Hackney to our new home in Islington. The movers arrived on time, protected the furniture and handled our narrow staircase carefully.",
      },
      {
        type: "paragraph",
        text: "Never purchase reviews, exchange reviews with other businesses or create fictional customer profiles. Fake reviews can damage both reputation and platform eligibility.",
      },
      {
        type: "paragraph",
        text: "The review count shown on the website, in structured data and on third-party platforms must also remain accurate. Completed jobs must not be presented as customer reviews.",
      },
      {
        type: "heading",
        text: "4. Research keywords according to search intent",
      },
      {
        type: "paragraph",
        text: "Keywords should be grouped according to what the searcher wants to accomplish. For a London moving company, the main groups may include:",
      },
      {
        type: "table",
        headers: ["Intent group", "Example keywords"],
        rows: [
          [
            "Main commercial",
            "House removals London · Removal company London · London movers · Man and van London · Office removals London",
          ],
          [
            "Service-specific",
            "Sofa delivery London · Flat removals London · Furniture delivery · Packing service · Piano movers · Student removals",
          ],
          [
            "Urgent intent",
            "Same-day removals London · Last-minute movers · Same-day man and van · Emergency furniture delivery · Next-day sofa delivery",
          ],
          [
            "Location-based",
            "House removals Camden · Man and van Hackney · Office removals Westminster · Sofa delivery Croydon · Removal company Islington",
          ],
          [
            "Informational",
            "How much do house removals cost in London? · What size van do I need? · How far in advance should I book movers?",
          ],
        ],
      },
      {
        type: "paragraph",
        text: "Analyse search volume and keyword difficulty, but do not select keywords using these metrics alone. Commercial relevance and booking potential are more important than receiving large amounts of unrelated traffic.",
      },
      {
        type: "heading",
        text: "5. Create a logical website structure",
      },
      {
        type: "paragraph",
        text: "Every important service should have a dedicated landing page. A moving-company structure may look like this — the same pattern applies when we build [SEO service pages](/services/seo) and [industry landing pages](/industries) for trades:",
      },
      {
        type: "list",
        items: [
          "Home",
          "House Removals · Office Removals · Man and Van · Flat Removals",
          "Sofa Delivery · Furniture Delivery · Packing Services · Storage Services",
          "Service Areas · Pricing · Reviews · Case Studies · Blog · Contact / Get a Quote",
        ],
      },
      {
        type: "paragraph",
        text: "Each page should target a distinct search purpose. For example, the House Removals page should focus on complete residential moves, while the Man and Van page should explain smaller hourly transport jobs.",
      },
      {
        type: "paragraph",
        text: "Avoid creating multiple pages targeting nearly identical keywords. This can cause keyword cannibalisation, where several pages compete against each other.",
      },
      {
        type: "heading",
        text: "6. Create useful service pages",
      },
      {
        type: "paragraph",
        text: "A high-quality service page should answer the questions a real customer asks before booking. A comprehensive House Removals London page could include:",
      },
      {
        type: "numbered",
        items: [
          "Clear service introduction",
          "What is included",
          "Who the service is suitable for",
          "How the process works",
          "Pricing method",
          "Example price ranges",
          "Van-size guide",
          "Factors affecting price",
          "Insurance information",
          "Packing options",
          "London parking and access guidance",
          "Service areas",
          "Genuine customer reviews",
          "Recent move examples",
          "Frequently asked questions",
          "Quote form and contact options",
        ],
      },
      {
        type: "paragraph",
        text: "Do not add content merely to achieve a particular word count. Google advises businesses to create helpful, reliable and people-first content rather than content written primarily to manipulate rankings. Read [Google’s people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).",
      },
      {
        type: "heading",
        text: "7. Build genuinely valuable location pages",
      },
      {
        type: "paragraph",
        text: "Location pages can attract customers searching for services within a particular borough or neighbourhood. However, producing 100 pages and replacing only the place name is not a sustainable strategy.",
      },
      {
        type: "paragraph",
        text: "A useful location page should contain original information, including:",
      },
      {
        type: "list",
        items: [
          "Services available in the area",
          "Genuine jobs completed there",
          "Local property and access challenges",
          "Relevant parking considerations",
          "Nearby areas covered",
          "Original photographs",
          "Customer reviews from that location",
          "Typical journey or route examples",
          "Clear contact and quotation options",
        ],
      },
      {
        type: "paragraph",
        text: "For example, a Hackney removals page might discuss controlled parking zones, flats with narrow staircases and genuine moves between Hackney, Islington and Tower Hamlets. If unique local value cannot be added, create fewer, stronger pages.",
      },
      {
        type: "heading",
        text: "8. Optimise titles and search descriptions",
      },
      {
        type: "paragraph",
        text: "The title should clearly communicate the service and location.",
      },
      {
        type: "quote",
        text: "House Removals London | Fixed-Price Moves | Phi Movers",
      },
      {
        type: "paragraph",
        text: "A good meta description may be:",
      },
      {
        type: "quote",
        text: "Insured house removals across all 32 London boroughs. Get a clear fixed quote covering your crew, van, loading and transport.",
      },
      {
        type: "paragraph",
        text: "The description should provide a reason to click without making unverified promises. Avoid excessive capitalisation, keyword repetition, fake urgency, misleading prices, unsupported “number one” claims and titles that are too long.",
      },
      {
        type: "paragraph",
        text: "Search click-through rate can be improved by communicating a genuine advantage such as transparent pricing, quick availability, specialist experience or verified reviews.",
      },
      {
        type: "heading",
        text: "9. Demonstrate experience, expertise and trust",
      },
      {
        type: "paragraph",
        text: "Customers allow movers into their homes and trust them with valuable belongings. Therefore, trust is particularly important for a removals website.",
      },
      {
        type: "list",
        items: [
          "Real business registration details",
          "Genuine team photography and branded vehicles",
          "Insurance information and coverage limits",
          "Verified customer reviews",
          "Membership verification links (only if current and checkable)",
          "Real case studies and clear pricing conditions",
          "Terms, complaints procedure and privacy policy",
          "Physical or registered-office clarification",
          "Named content author or reviewer",
        ],
      },
      {
        type: "paragraph",
        text: "Never claim to be a BAR member, Which? Trusted Trader or another accredited provider unless the membership is current and independently verifiable. A false badge can be considerably more damaging than having no badge.",
      },
      {
        type: "heading",
        text: "10. Publish evidence-backed case studies",
      },
      {
        type: "paragraph",
        text: "Case studies are useful for rankings, AI visibility and conversion because they demonstrate real experience. A moving-company case study should explain:",
      },
      {
        type: "list",
        items: [
          "Collection and delivery areas",
          "Type of property and approximate move date",
          "Size of the move, van and crew used",
          "Access difficulties and how problems were solved",
          "Services included and approximate duration",
          "Customer feedback and original photographs",
        ],
      },
      {
        type: "paragraph",
        text: "Example — two-bedroom flat move from Hackney to Islington: The customer was moving from a third-floor flat without a lift. The job required two movers and a Luton van. Parking was arranged in advance, while the sofa and larger furniture were protected and carried through a narrow staircase by hand.",
      },
      {
        type: "paragraph",
        text: "This is more persuasive than claiming that the company is “professional and reliable” without providing evidence.",
      },
      {
        type: "heading",
        text: "11. Explain pricing transparently",
      },
      {
        type: "paragraph",
        text: "Pricing is one of the strongest conversion elements for a service business. Clearly distinguish between:",
      },
      {
        type: "list",
        items: [
          "Fixed-price house removals vs hourly man-and-van bookings",
          "Minimum booking duration and additional helper charges",
          "Mileage charges, packing materials and parking costs",
          "Congestion charges and weekend or urgent-booking premiums",
        ],
      },
      {
        type: "paragraph",
        text: "If the hourly rate is £50 with a two-hour minimum, do not imply that a complete house move costs £50.",
      },
      {
        type: "quote",
        text: "Man-and-van bookings start from £50 per hour with a two-hour minimum. Complete house removals receive a fixed quote based on inventory, access, distance and any optional services.",
      },
      {
        type: "paragraph",
        text: "Clear pricing may reduce low-quality enquiries while increasing confidence among serious customers.",
      },
      {
        type: "heading",
        text: "12. Use strong calls to action",
      },
      {
        type: "paragraph",
        text: "Every important page should guide the visitor towards one clear next step.",
      },
      {
        type: "table",
        headers: ["Weak CTA", "Stronger CTA"],
        rows: [
          ["Contact Us", "Get My Free Fixed Quote"],
          ["Learn more", "WhatsApp My Move"],
          ["Submit", "Check Moving-Date Availability"],
        ],
      },
      {
        type: "paragraph",
        text: "Supporting options can include Call the Moving Team, Book a Free Home Survey, and an online form for customers outside working hours.",
      },
      {
        type: "paragraph",
        text: "A short multi-step form could ask for: moving-from postcode, moving-to postcode, moving date, property size, then name and contact details. Place detailed personal-information fields on the second step so that the initial form feels simple.",
      },
      {
        type: "heading",
        text: "13. Improve mobile speed and usability",
      },
      {
        type: "paragraph",
        text: "Most local-service searches take place on mobile devices, especially urgent enquiries. Important mobile improvements include:",
      },
      {
        type: "list",
        items: [
          "Large, readable text and tap-friendly buttons",
          "Click-to-call and short forms",
          "Sticky mobile quotation button",
          "Compressed images and minimal unnecessary JavaScript",
          "Stable page layout and fast hero-image loading",
        ],
      },
      {
        type: "paragraph",
        text: "Google recommends Core Web Vitals targets of LCP below 2.5 seconds, INP below 200 milliseconds and CLS below 0.1. See [Google’s Core Web Vitals documentation](https://developers.google.com/search/docs/appearance/core-web-vitals) — good scores do not guarantee rankings, but poor performance can damage usability and conversions. Fast [marketing sites built with Next.js](/blog/why-nextjs-for-marketing-sites) help you hit these targets.",
      },
      {
        type: "heading",
        text: "14. Add appropriate structured data",
      },
      {
        type: "paragraph",
        text: "Structured data helps search engines understand the entities and information on a page. A local service website may use LocalBusiness, Service, BreadcrumbList, Organization and FAQPage where appropriate.",
      },
      {
        type: "paragraph",
        text: "All structured data must match the visible page. Never mark completed moves as reviews, invent review counts, add services that are not offered, enter a false address, add expired memberships, display misleading pricing or mark fictional testimonials as genuine ratings.",
      },
      {
        type: "paragraph",
        text: "Validate with [Google’s Rich Results Test](https://search.google.com/test/rich-results). Guidance: [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).",
      },
      {
        type: "heading",
        text: "15. Prepare content for AI search",
      },
      {
        type: "paragraph",
        text: "Modern AI search optimisation does not require abandoning traditional SEO. Google explains that generative search features continue to use core search systems, indexed pages and publicly crawlable information — see [Google’s AI-search optimisation guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).",
      },
      {
        type: "paragraph",
        text: "To increase the likelihood of being understood and cited:",
      },
      {
        type: "list",
        items: [
          "Answer questions directly and keep business facts consistent.",
          "Use clear headings and publish original expertise.",
          "Add evidence, case studies, tables and comparisons.",
          "Use original images and videos; keep content publicly crawlable.",
          "Update outdated information and strengthen presence on trusted sources.",
        ],
      },
      {
        type: "paragraph",
        text: "Avoid supposed AI SEO shortcuts such as mass-producing thin location pages, repeating every keyword variation, creating unsupported mentions, forcing artificial “AI chunks,” or believing special AI schema guarantees citations. AI-generated drafts must be fact-checked and enhanced with original business experience.",
      },
      {
        type: "heading",
        text: "16. Build legitimate local authority",
      },
      {
        type: "paragraph",
        text: "Backlinks still matter, but quality and relevance are more valuable than buying large quantities of unrelated links. Potential sources include:",
      },
      {
        type: "list",
        items: [
          "Trusted local business directories and local newspapers",
          "Borough community websites and estate agents",
          "Storage facilities, property-management companies and student accommodation",
          "Interior designers, furniture retailers and charities",
          "Relevant industry organisations",
        ],
      },
      {
        type: "paragraph",
        text: "A useful partnership could involve an estate agent publishing a moving checklist created with the removal company. Avoid cheap backlink packages, automated directory submissions and unrelated guest-post networks.",
      },
      {
        type: "heading",
        text: "17. Measure enquiries and bookings — not only traffic",
      },
      {
        type: "paragraph",
        text: "Set up accurate tracking through [Google Search Console](https://search.google.com/search-console), analytics and call or enquiry tracking. Monitor:",
      },
      {
        type: "list",
        items: [
          "Organic impressions, average position and search CTR",
          "Website, telephone and WhatsApp clicks from Google Business Profile",
          "Quote-form starts and completions",
          "Qualified leads, confirmed bookings and revenue per landing page",
          "Review-generation rate and branded-search growth",
        ],
      },
      {
        type: "paragraph",
        text: "More time on site is not automatically a positive result. A visitor who finds the correct information and books within one minute may be more valuable than someone who reads for ten minutes without enquiring. The most important SEO metric is the number and value of bookings generated.",
      },
      {
        type: "heading",
        text: "18. Follow a practical 90-day SEO plan",
      },
      {
        type: "callout",
        title: "Days 1–30: Build the foundation",
        items: [
          "Audit Google Business Profile and correct business information.",
          "Fix technical crawling and indexing issues.",
          "Set up Search Console and analytics.",
          "Improve the homepage and the three most important service pages.",
          "Correct inaccurate reviews, numbers and trust claims.",
          "Add a quotation form.",
        ],
      },
      {
        type: "callout",
        title: "Days 31–60: Build relevance and trust",
        items: [
          "Improve the main location pages.",
          "Publish genuine move case studies.",
          "Add original team and vehicle photographs.",
          "Implement review-request automation.",
          "Improve internal linking.",
          "Publish pricing and van-size guidance.",
          "Contact relevant local partners.",
        ],
      },
      {
        type: "callout",
        title: "Days 61–90: Improve performance",
        items: [
          "Analyse search queries and CTR; improve underperforming titles.",
          "Compare leads by landing page and test different CTAs.",
          "Expand successful service topics; remove or merge weak pages.",
          "Improve mobile speed.",
          "Build more local partnerships and citations.",
          "Not sure where you stand? Run a free [Growth Check](/tools/growth-check).",
        ],
      },
      {
        type: "heading",
        text: "Final checklist",
      },
      {
        type: "paragraph",
        text: "Before publishing a local service page, confirm that:",
      },
      {
        type: "list",
        items: [
          "The service and location are clear and the search intent is satisfied.",
          "The content contains original value and prices are explained honestly.",
          "Every trust claim is verifiable and reviews are genuine.",
          "The telephone number and quotation form work.",
          "Mobile buttons are usable and images are original and compressed.",
          "Important pages are internally linked.",
          "Structured data matches visible content.",
          "Analytics track enquiries and bookings.",
          "The page gives customers a convincing reason to choose the business.",
        ],
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Successful local SEO combines visibility, credibility and conversion.",
      },
      {
        type: "paragraph",
        text: "Keywords may help a moving company appear in search results, but customers book only when the website answers their questions, presents convincing evidence, explains pricing clearly and makes requesting a quotation simple.",
      },
      {
        type: "paragraph",
        text: "The strongest strategy is therefore not to create the largest possible number of pages. It is to build the most trustworthy and useful local resource in the market.",
      },
      {
        type: "paragraph",
        text: "Focus on genuine customer experience, accurate business information, useful service content, strong local relevance and a frictionless booking process. When these elements work together, SEO can generate more than rankings — it can produce long-term brand recognition, qualified enquiries and profitable bookings.",
      },
      {
        type: "cta",
        title: "Want this done for your local service business?",
        text: "Jadeed Solutions builds SEO, websites and growth systems aimed at bookings — for movers, cleaners, plumbers and trades in the UK & USA. Start with our [SEO service](/services/seo), [Growth Check](/tools/growth-check) or [pricing](/pricing).",
        label: "Talk to us",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "Is ranking #1 enough for a local service business?",
        a: "No. Rankings only help if they lead to clicks, trust and bookings. Measure enquiries and confirmed jobs, not traffic alone.",
      },
      {
        q: "Should I create hundreds of location pages?",
        a: "Only if each page has original local value. Thin pages that only swap the town name usually waste time and can hurt quality.",
      },
      {
        q: "How long does local SEO take?",
        a: "Foundations can improve quickly, but meaningful organic results often take a few months. A 90-day plan keeps the work focused.",
      },
      {
        q: "Can Jadeed Solutions implement this for my business?",
        a: "Yes. We help UK and USA local service businesses with [SEO](/services/seo), [websites](/services/web-development) and optional [apps](/services/app-development) — see [pricing](/pricing) or [contact us](/contact).",
      },
    ],
  },
  {
    slug: "how-to-talk-to-app-clients-restaurant-example",
    title: "How to Talk to a Client About Building Their App (Restaurant Example)",
    excerpt:
      "A real-style discovery conversation between Sameer and a London restaurant owner — what to ask, how to quote, timelines, payments and next steps without sounding pushy.",
    date: "2026-07-26",
    readingTime: "12 min read",
    category: "App Development",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Most app projects don’t fail in code — they fail in the first few messages. Unclear scope, vague prices and skipped questions create delays later. Below is a complete, professional conversation with a restaurant owner in London. Use it as a template when a client asks: “What apps do you build, and what do you charge?” For what we ship, see [app development](/services/app-development) and [pricing](/pricing).",
      },
      {
        type: "callout",
        title: "What this conversation gets right",
        items: [
          "Ask name, business and location before quoting.",
          "List features in plain language — then clarify what’s standard vs extra.",
          "Separate build time from App Store / Play Store review time.",
          "Collect branding + menu assets before the final quote.",
          "Confirm scope in writing and explain payment milestones clearly.",
        ],
      },
      { type: "heading", text: "The full conversation" },
      {
        type: "paragraph",
        text: "Client: Ahmed — restaurant owner, London. Agency: Sameer (Jadeed Solutions). Goal: Android + iOS restaurant app with menu, ordering, Stripe and table booking.",
      },
      {
        type: "dialogue",
        title: "1. Opening — interest & first questions",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "Hello! I saw your advertisement and I’m interested in getting a mobile app developed for my restaurant. Could you tell me what kind of apps you build and what your charges are?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Hello! Thank you for contacting us. My name is Sameer. May I know your name, restaurant name and location?\n\nWe build customized restaurant apps with features such as:",
            bullets: [
              "Digital menu",
              "Online ordering",
              "Table reservations",
              "Online payments",
              "Order-status tracking",
              "Push notifications",
              "Restaurant order-management dashboard",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Our basic packages start from $150. The final price depends on the required features, platforms and project scope.",
          },
        ],
      },
      {
        type: "callout",
        title: "Lesson",
        items: [
          "Don’t dump a long price list first — greet, ask who they are, then share a starting range.",
          "A starting price sets expectations; always say final cost depends on scope.",
        ],
      },
      {
        type: "dialogue",
        title: "2. Clarify features — tracking & payments",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "My name is Ahmed, and my restaurant is based in London. Does the app include order tracking and online payments?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Nice to meet you, Ahmed.\n\nYes, we can include both. Just to clarify, standard order tracking allows customers to see statuses such as:",
            bullets: [
              "Order received",
              "Preparing",
              "Ready",
              "Out for delivery",
              "Delivered",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "If you require live GPS driver tracking, that would be considered an additional feature.\n\nWe can also integrate Stripe or another suitable payment gateway. Do you already have a Stripe business account?",
          },
        ],
      },
      {
        type: "callout",
        title: "Lesson",
        items: [
          "Split “included” vs “extra” early — GPS tracking is a classic upsell that must not be assumed.",
          "Ask about Stripe (or their gateway) before promising payments.",
        ],
      },
      {
        type: "dialogue",
        title: "3. Timeline & platforms",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "Yes, I already have a Stripe account. How long would it take to develop the app?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Once we receive all the required content and confirm the project scope, the first working version can usually be completed within 7–10 working days.\n\nAfter that, you can review and test it. The final delivery time will depend on your feedback and any approved revisions.\n\nPublishing time on Google Play and the Apple App Store is separate because both platforms conduct their own reviews. We will handle the submission process, but approval times cannot be guaranteed and occasionally additional information or changes may be requested.\n\nWould you like the app for Android only or both Android and iOS?",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "I would like it for both Android and iOS. I don’t currently have Google Play or Apple Developer accounts. Can you create them for me?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Yes, we can guide you through the complete account-creation and verification process.\n\nWe strongly recommend creating both accounts under your restaurant’s legal name. This ensures that you retain full ownership and control of the app in the future.\n\nGoogle and Apple charge their own developer-account fees, which are paid directly to them. Their latest official fees and eligibility requirements will be confirmed when the accounts are created.\n\nIf you require us to handle the technical setup, submission and publishing process, I will include that service separately in the final quotation.",
          },
        ],
      },
      {
        type: "callout",
        title: "Lesson",
        items: [
          "Always separate build days from store review days.",
          "Accounts should stay in the client’s legal name — protect their ownership.",
          "Third-party fees (Apple, Google, Stripe) are never “hidden inside” your quote without saying so.",
        ],
      },
      {
        type: "dialogue",
        title: "4. What you need for a proper quotation",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "That sounds good. What information do you need from me to prepare the final quotation?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "First, I need to understand the project completely. Please provide the following:",
            bullets: [
              "Restaurant name, website and contact information",
              "Logo, brand colours and preferred design style",
              "Complete menu with categories, items and prices",
              "Item options, sizes, extras and add-ons",
              "Restaurant opening hours",
              "Delivery areas, charges and minimum order",
              "Table-booking rules and available time slots",
              "Payment and order-cancellation policies",
              "Required languages",
              "Any reference apps or designs you like",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "I can also collect some public information from your existing website if you share its link.",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "My main requirements are a complete menu, online ordering, Stripe payments and table booking. Could you share your website and app samples?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Certainly. Here are our website and app-demo links:\n\nWebsite: [jadeedsolutions.com](https://www.jadeedsolutions.com)\nApp development: [App development service](/services/app-development)\n\nPlease review them and let me know which design style you prefer. Based on your initial requirements, I will prepare a written proposal containing the complete features, final price, development timeline and deliverables.",
          },
        ],
      },
      {
        type: "dialogue",
        title: "5. Next steps & payment structure",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "I’ve reviewed your samples and I like your work. Your starting price also sounds reasonable. What is the next step?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Thank you, Ahmed. I’m glad you liked our work.\n\nPlease send the menu details and branding assets first. Once I receive them, I will:",
            bullets: [
              "Review your complete requirements",
              "Confirm what is included in the project",
              "Send you the final quotation and agreement",
              "Issue the first milestone invoice",
              "Confirm the official starting and delivery dates",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Our standard payment structure is:",
            bullets: [
              "40% advance to begin the project",
              "30% after approval of the working version",
              "30% before final delivery and store submission",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Any third-party charges, such as developer-account, hosting or payment-service fees, are paid separately.",
          },
        ],
      },
      {
        type: "dialogue",
        title: "6. Assets checklist",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "Understood. Which branding and menu information should I send first?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Please begin with the following.\n\nBranding assets:",
            bullets: [
              "Logo in the highest available quality",
              "Brand colours",
              "Restaurant photographs",
              "Food and product photographs",
              "Fonts or existing brand guidelines",
              "Contact information and social links",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Menu details:",
            bullets: [
              "Menu categories",
              "Product names",
              "Descriptions",
              "Prices",
              "Sizes and variations",
              "Extras and add-ons",
              "Allergens or dietary labels",
              "Availability of each item",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "You can send them in an Excel sheet, PDF, Google Drive folder or another convenient format.",
          },
        ],
      },
      {
        type: "dialogue",
        title: "7. Support, upgrades & closing the loop",
        turns: [
          {
            speaker: "client",
            name: "Ahmed",
            text: "Perfect. Do you also provide maintenance and technical support after the launch?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Yes, we provide post-launch support.\n\nThe app includes a short warranty period after launch for fixing any development-related issues within the agreed scope.\n\nWe also offer an optional annual maintenance plan. It can cover:",
            bullets: [
              "Basic technical support",
              "Minor bug fixes",
              "Compatibility monitoring",
              "Assistance with app-store updates",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "New features, major design changes, third-party subscription fees and large platform updates are quoted separately. I will clearly mention the maintenance price and inclusions in your proposal.",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "If I want to introduce loyalty points, discount coupons or live delivery tracking later, can you add them?",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Absolutely. The app can be expanded in the future.\n\nFeatures such as loyalty points, discount coupons, customer reviews, delivery-driver management, live GPS tracking and advanced analytics can be added through a separate upgrade quotation.\n\nBefore starting the current project, we will structure the app properly so that future expansion is easier.",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "That sounds good. I’m preparing the menu and branding assets now.",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Perfect. Once you send the materials, I will review them and provide the final proposal within one business day.\n\nTo summarize, your current requirements are:",
            bullets: [
              "Android and iOS apps",
              "Complete digital menu",
              "Online ordering",
              "Stripe payment integration",
              "Standard order-status tracking",
              "Table reservations",
              "Restaurant order-management dashboard",
              "App-store submission assistance",
            ],
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Please confirm whether this summary is correct.",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "Yes, that is correct.",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "Excellent. Please send the assets whenever they are ready. After reviewing them, I’ll send the formal scope, quotation, payment milestones and project schedule.\n\nThank you for considering us for your restaurant app, Ahmed. I look forward to working with you.",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "Thank you, Sameer. I’ll send everything shortly.",
          },
          {
            speaker: "us",
            name: "Sameer",
            text: "You’re welcome. I’ll keep an eye out for it. Allah Hafiz!",
          },
          {
            speaker: "client",
            name: "Ahmed",
            text: "Allah Hafiz!",
          },
        ],
      },
      { type: "heading", text: "Quick checklist you can reuse" },
      {
        type: "numbered",
        items: [
          "Greet → ask name, business, city.",
          "List core features in bullets; flag extras (e.g. live GPS).",
          "Give a starting price + “depends on scope”.",
          "Explain build timeline vs store review timeline.",
          "Confirm platforms (Android / iOS) and account ownership.",
          "Request branding + menu assets before the final quote.",
          "Share samples, then propose milestones (e.g. 40 / 30 / 30).",
          "Confirm the written scope summary before kickoff.",
          "Mention warranty + optional maintenance and future upgrades.",
          "Point them to [web development](/services/web-development) if they need a site first.",
        ],
      },
      {
        type: "quote",
        text: "A clear conversation before kickoff saves weeks of rework after kickoff.",
      },
      {
        type: "cta",
        title: "Need an app for your restaurant or local business?",
        text: "See [app development](/services/app-development) or [contact us](/contact) with your city and must-have features — we’ll outline a clear quote.",
        label: "Talk to us",
        href: "/contact",
      },
    ],
    faqs: [
      {
        q: "Is $150 the final price for every restaurant app?",
        a: "No. It is a starting point for a basic package. Final pricing depends on features, Android/iOS, payments, booking rules and store submission work.",
      },
      {
        q: "Who should own the Apple and Google developer accounts?",
        a: "The restaurant (client) should own them under their legal business name. We guide setup and can handle technical submission as a separate line in the quote.",
      },
      {
        q: "What slows a restaurant app project down the most?",
        a: "Missing menu data, incomplete branding assets, unclear delivery rules and delayed feedback on the first working version.",
      },
    ],
  },
  {
    slug: "seo-checklist-2026",
    title: "The 2026 SEO Checklist: Rank Higher This Year",
    excerpt:
      "A practical, no-fluff checklist covering technical SEO, content, and authority building to grow your organic traffic in 2026.",
    date: "2026-06-18",
    readingTime: "7 min read",
    category: "SEO",
    authorSlug: "sameer-ahmad-basra",
    cover:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
    content: [
      {
        type: "paragraph",
        text: "Search is still the highest-intent channel on the internet. If you want compounding, cost-effective growth, SEO belongs at the center of your strategy. This checklist is the monthly rhythm we use with clients — for the full local-service playbook, read [How to Do SEO for a Local Service Business](/blog/seo-for-local-service-business-step-by-step).",
      },
      {
        type: "callout",
        title: "Key takeaways",
        items: [
          "Fix [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) and crawl errors before anything else.",
          "Match every page to a clear search intent.",
          "Earn links from relevant, reputable sites over time.",
          "Measure rankings, traffic and conversions — not vanity metrics.",
        ],
      },
      { type: "heading", text: "Get the technical foundation right" },
      {
        type: "paragraph",
        text: "Technical SEO is the groundwork everything else sits on. If search engines struggle to crawl or render your site, even the best content won't rank. Start with [Google Search Console](https://search.google.com/search-console), then fix the basics:",
      },
      {
        type: "list",
        items: [
          "Ensure fast Core Web Vitals (LCP, INP, CLS) — we often use [Next.js marketing sites](/blog/why-nextjs-for-marketing-sites) for this",
          "Fix crawl errors and broken links",
          "Implement a clean, logical URL structure",
          "Add structured data (schema.org) for rich results — see [Google’s structured data intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)",
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
        text: "Every page should target a keyword with clear intent. Map informational, commercial, and transactional queries to the right page types, and answer the question better than anyone else on page one. Google’s [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) is the standard we follow.",
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
        text: "Earn links from relevant, reputable sites through digital PR, guest content, and genuinely useful resources. Authority compounds — the sooner you start, the sooner you win. Pair this with a clear [SEO service plan](/services/seo) and, when you need paid demand while organic grows, [Google Ads fundamentals](/blog/google-ads-roi-fundamentals).",
      },
      {
        type: "quote",
        text: "SEO is not a one-time project. It's a growth engine you build once and improve forever.",
      },
      { type: "heading", text: "Your monthly routine" },
      {
        type: "paragraph",
        text: "Consistency beats intensity. Keep SEO moving with a simple monthly rhythm — or run a quick [Growth Check](/tools/growth-check) to see what’s missing:",
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
        text: "See [SEO services](/services/seo), [pricing](/pricing), or [compare options](/compare) — then book a free audit.",
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
        a: "They solve different problems. Ads buy instant, controllable traffic; SEO builds compounding, lower-cost traffic over time. For most local businesses, the winning move is to run both together — see our [Google Ads ROI guide](/blog/google-ads-roi-fundamentals).",
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
        text: "The framework you choose for a marketing site directly affects how fast it loads, how well it ranks, and how quickly you can ship changes. For us, [Next.js](https://nextjs.org/) checks every box — and it’s how we deliver [web development](/services/web-development) for local service businesses.",
      },
      { type: "heading", text: "Built-in performance" },
      {
        type: "paragraph",
        text: "Server-side rendering and static generation mean pages load instantly and score well on [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — a direct ranking factor covered in our [2026 SEO checklist](/blog/seo-checklist-2026).",
      },
      { type: "heading", text: "SEO-friendly by default" },
      {
        type: "list",
        items: [
          "Server-rendered HTML that search engines love",
          "First-class metadata and Open Graph support",
          "Automatic sitemap and robots handling",
          "Works well with the local SEO structure in our [local service SEO guide](/blog/seo-for-local-service-business-step-by-step)",
        ],
      },
      { type: "heading", text: "Developer velocity" },
      {
        type: "paragraph",
        text: "A great developer experience means we ship faster and iterate more, which translates directly into better results for your business. Compare agencies and DIY options on our [compare page](/compare), or check [pricing](/pricing).",
      },
      {
        type: "cta",
        title: "Need a fast marketing site?",
        text: "We build conversion-focused sites with Next.js — see [web development](/services/web-development) or [contact us](/contact).",
        label: "Talk about your site",
        href: "/contact",
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
        text: "Profitable paid advertising comes down to a handful of fundamentals done consistently well. Master these before you worry about anything else. For how we run campaigns, see [digital advertising](/services/digital-advertising) — and pair ads with [SEO](/services/seo) so you’re not renting all your demand.",
      },
      { type: "heading", text: "Track conversions accurately" },
      {
        type: "paragraph",
        text: "If your tracking is wrong, every optimization decision is wrong. Nail conversion tracking and attribution before scaling spend. Google’s own [Ads Help](https://support.google.com/google-ads) covers conversion setup; we also recommend checking [Search Console](https://search.google.com/search-console) so organic and paid insights sit side by side.",
      },
      { type: "heading", text: "Optimize the whole funnel" },
      {
        type: "list",
        items: [
          "Tight keyword-to-ad-to-landing-page relevance",
          "Fast, focused landing pages built to convert — see [why we use Next.js](/blog/why-nextjs-for-marketing-sites)",
          "Continuous creative and copy testing",
          "Landing pages that match local intent (same ideas as our [local SEO guide](/blog/seo-for-local-service-business-step-by-step))",
        ],
      },
      {
        type: "quote",
        text: "The best-performing account isn't the one with the cleverest bids — it's the one with the tightest funnel.",
      },
      {
        type: "paragraph",
        text: "Not sure whether ads, SEO or a new site is the bottleneck? Run a free [Growth Check](/tools/growth-check) or [compare options](/compare).",
      },
      {
        type: "cta",
        title: "Want ads that pay for themselves?",
        text: "See [digital advertising](/services/digital-advertising) and [pricing](/pricing), then [contact us](/contact) with your city and offer.",
        label: "Talk about ads",
        href: "/contact",
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

export type ArchiveMonth = {
  year: string;
  month: string;
  /** YYYY-MM */
  key: string;
  label: string;
  shortLabel: string;
  count: number;
  href: string;
  posts: Post[];
};

export type ArchiveYear = {
  year: string;
  count: number;
  href: string;
  months: ArchiveMonth[];
  /** 12 slots Jan–Dec for calendar heatmap (0 if empty) */
  monthCounts: number[];
};

export function formatMonthLabel(year: string, month: string): string {
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function formatMonthShort(month: string): string {
  const d = new Date(2000, Number(month) - 1, 1);
  return d.toLocaleDateString("en-GB", { month: "short" });
}

/** Posts newest first, grouped by year → month for the archive pages */
export function getArchiveByDate(): ArchiveYear[] {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = new Map<string, Map<string, Post[]>>();

  for (const p of sorted) {
    const [year, month] = p.date.split("-");
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(p);
  }

  return Array.from(byYear.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, monthsMap]) => {
      const months: ArchiveMonth[] = Array.from(monthsMap.entries())
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([month, monthPosts]) => ({
          year,
          month,
          key: `${year}-${month}`,
          label: formatMonthLabel(year, month),
          shortLabel: formatMonthShort(month),
          count: monthPosts.length,
          href: `/blog/archive/${year}/${month}`,
          posts: monthPosts,
        }));

      const monthCounts = Array.from({ length: 12 }, (_, i) => {
        const m = String(i + 1).padStart(2, "0");
        return monthsMap.get(m)?.length ?? 0;
      });

      return {
        year,
        count: months.reduce((sum, m) => sum + m.count, 0),
        href: `/blog/archive/${year}`,
        months,
        monthCounts,
      };
    });
}

export function getArchiveStats() {
  const categories = new Set(posts.map((p) => p.category));
  const years = new Set(posts.map((p) => p.date.slice(0, 4)));
  const readingMins = posts.reduce((sum, p) => {
    const n = parseInt(p.readingTime, 10);
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date))[0];
  return {
    totalPosts: posts.length,
    totalYears: years.size,
    totalCategories: categories.size,
    readingMins,
    latest,
    categories: Array.from(categories).sort(),
  };
}

export function getPostsByYear(year: string): Post[] {
  return posts
    .filter((p) => p.date.startsWith(`${year}-`))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsByYearMonth(year: string, month: string): Post[] {
  const prefix = `${year}-${month}`;
  return posts
    .filter((p) => p.date.startsWith(prefix))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function archiveMonthParams() {
  const months = new Set(posts.map((p) => p.date.slice(0, 7)));
  return Array.from(months).map((ym) => {
    const [year, month] = ym.split("-");
    return { year, month };
  });
}

export function archiveYearParams() {
  const years = new Set(posts.map((p) => p.date.slice(0, 4)));
  return Array.from(years).map((year) => ({ year }));
}

export function postArchiveHref(date: string): string {
  const [year, month] = date.split("-");
  return `/blog/archive/${year}/${month}`;
}
