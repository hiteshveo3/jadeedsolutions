import {
  SearchIcon,
  CodeIcon,
  SmartphoneIcon,
  MegaphoneIcon,
  TagIcon,
  ClockIcon,
  GlobeIcon,
  TrendingUpIcon,
  RocketIcon,
  CheckCircleIcon,
  HandshakeIcon,
  TargetIcon,
  type IconSvgElement,
} from "@/components/icons";

export type PriceRow = { label: string; value: string };
export type Step = { title: string; description: string };
export type Review = { quote: string; name: string; location: string; avatar: string };
export type WhyCard = { title: string; description: string };
export type ContentSection = { id: string; heading: string; paragraphs: string[] };
export type Highlight = { icon: IconSvgElement; label: string };

export type Service = {
  slug: string;
  icon: IconSvgElement;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  category: string;
  heroImage: string;
  priceLabel: string;
  highlights: Highlight[];
  rating: { score: string; count: string };
  trustBadges: string[];
  overview: { heading: string; paragraphs: string[] };
  stats: { value: string; label: string }[];
  included: string[];
  idealFor: string[];
  steps: Step[];
  cost: { paragraphs: string[]; rows: PriceRow[]; note: string };
  priceFactors: string[];
  keyTakeaways: string[];
  sections: ContentSection[];
  whyChoose: WhyCard[];
  reviews: Review[];
  atAGlance: PriceRow[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "seo",
    icon: SearchIcon,
    title: "Search Engine Optimization",
    tagline: "Rank higher. Get found. Grow organically.",
    summary:
      "Data-driven SEO that turns search intent into qualified traffic and revenue.",
    description:
      "Get found by customers who are already searching for what you offer. Our SEO turns your website into a steady, compounding source of qualified leads.",
    category: "Organic growth & local SEO",
    heroImage: "/placeholders/add-image.svg",
    priceLabel: "From £100/month · or 10% on bookings",
    highlights: [
      { icon: TagIcon, label: "From £100/month" },
      { icon: HandshakeIcon, label: "Or 10% on bookings" },
      { icon: ClockIcon, label: "6-month minimum" },
    ],
    rating: { score: "5.0", count: "from 35 Google reviews" },
    trustBadges: ["5.0 on Google", "White-hat only", "10% performance model"],
    overview: {
      heading: "SEO that turns search into customers",
      paragraphs: [
        "Most people looking for a local service start with a search. If you're not showing up on the first page, those customers are calling your competitors instead. Our SEO service fixes that — we get your business ranking for the terms your ideal customers actually type in, so you win the click before anyone else does.",
        "We specialise in local, service-based businesses (movers, cleaners, trades, clinics and more) in markets like the UK and USA. That means a fast website, a strong Google Business Profile, intent-led content, and the local authority signals that push you into the map pack and organic results.",
        "We also offer a performance option: a 10% commission on the bookings and sales our SEO generates — so our incentives stay aligned with yours. Either way, you get clear reporting on impressions, clicks, rankings and real enquiries — not vanity charts.",
      ],
    },
    stats: [
      { value: "5.0", label: "Google (35 reviews)" },
      { value: "43.1K", label: "Impressions · Alpha (3 mo)" },
      { value: "~21", label: "Bookings est. (10% clicks)" },
      { value: "10%", label: "Performance model" },
    ],
    included: [
      "Full technical SEO audit and prioritised roadmap",
      "Keyword and competitor research tied to buying intent",
      "On-page optimisation of your key pages",
      "Google Business Profile setup and optimisation",
      "Local citations and directory consistency",
      "High-quality, search-optimised content",
      "Authority link building (white-hat only)",
      "Transparent monthly reporting and a call",
    ],
    idealFor: [
      "Local service businesses wanting more calls and bookings",
      "Tradespeople, clinics, salons and restaurants",
      "Multi-location businesses competing across areas",
      "Anyone tired of paying for every single click",
    ],
    steps: [
      {
        title: "Audit & discovery",
        description:
          "We analyse your site health, current rankings, competitors and Google Business Profile to find the biggest, fastest opportunities.",
      },
      {
        title: "Strategy & keywords",
        description:
          "We map a prioritised roadmap around the keywords your customers actually search — the ones with real buying intent.",
      },
      {
        title: "On-page & technical",
        description:
          "We fix technical issues, improve site speed, and optimise your most important pages so search engines and customers both love them.",
      },
      {
        title: "Content & authority",
        description:
          "We publish helpful content and build genuine local authority through citations and quality links that move rankings.",
      },
      {
        title: "Measure & scale",
        description:
          "We track calls, leads and rankings every month, double down on what's working, and compound your growth over time.",
      },
    ],
    cost: {
      paragraphs: [
        "SEO is usually a monthly service because ranking is an ongoing process — not a one-time switch. We keep pricing simple: fixed monthly plans, or a performance model where we take 10% of the bookings and sales our work generates (ideal for local service businesses).",
        "As a guide, here's how our core SEO options break down. Monthly plans include technical work, on-page optimisation, local SEO and reporting. Higher tiers move faster with more content and authority building.",
      ],
      rows: [
        { label: "SEO Starter", value: "From £100/month" },
        { label: "SEO Growth", value: "From £250/month" },
        { label: "SEO Premium", value: "From £500/month" },
        { label: "Performance SEO", value: "10% of generated bookings" },
        { label: "One-off SEO audit", value: "From £150" },
        { label: "Local SEO add-on", value: "From £75/month" },
      ],
      note: "Monthly plans have a 6-month minimum so the work has time to compound. The 10% model is available for qualifying local service businesses.",
    },
    priceFactors: [
      "How competitive your industry and area are",
      "The current health and age of your website",
      "How many keywords and locations you target",
      "The amount of new content required each month",
      "The pace of authority and link building",
      "Whether you need local, national or both",
    ],
    keyTakeaways: [
      "SEO from £100/month, or 10% of the bookings we generate — for every local service business.",
      "UK & USA first, then worldwide. Based in Lahore, Pakistan.",
      "Alpha Movers: 213 organic clicks in 3 months ≈ ~21 bookings at a 10% click-to-book rate.",
      "Real proof from cleaning and removals brands ranking on competitive local keywords.",
    ],
    sections: [
      {
        id: "local-seo",
        heading: "Local SEO & Google Business Profile",
        paragraphs: [
          "For a local service business, the Google Map Pack is prime real estate. We fully optimise your Google Business Profile, keep your business information consistent across the web, and build the local signals that help you appear when nearby customers search — often the difference between a busy diary and a quiet one.",
        ],
      },
      {
        id: "content",
        heading: "Content that ranks and converts",
        paragraphs: [
          "Ranking is only half the job — the page also has to turn visitors into enquiries. We create clear, genuinely useful content that answers your customers' questions, targets the right keywords, and guides people toward calling or booking, so your traffic actually pays off.",
        ],
      },
      {
        id: "technical",
        heading: "Technical SEO & site speed",
        paragraphs: [
          "A slow or broken site quietly kills rankings and conversions. We fix crawl issues, improve Core Web Vitals, tidy up your site structure and make sure everything works beautifully on mobile, giving your content the strongest possible foundation to rank.",
        ],
      },
      {
        id: "reporting",
        heading: "Transparent, jargon-free reporting",
        paragraphs: [
          "Every month you get a clear report and a call that shows exactly what we did, how your rankings and traffic moved, and — most importantly — how many calls and leads it drove. No smoke, no mirrors, no confusing dashboards.",
        ],
      },
    ],
    whyChoose: [
      {
        title: "Local specialists",
        description:
          "We focus on local, service-based businesses, so we know exactly what ranks in your world.",
      },
      {
        title: "White-hat only",
        description:
          "No risky shortcuts — just sustainable tactics that keep you safe from Google penalties.",
      },
      {
        title: "Revenue-focused",
        description:
          "We optimise for calls, bookings and revenue, not rankings that don't pay the bills.",
      },
      {
        title: "Clear reporting",
        description:
          "Honest monthly reports and a real conversation about what's working and what's next.",
      },
      {
        title: "Fast foundations",
        description:
          "Technical fixes and quick wins early so you feel momentum in the first few months.",
      },
      {
        title: "No lock-in games",
        description:
          "A fair 6-month minimum to let SEO work — then stay because of results, not contracts.",
      },
    ],
    reviews: [],
    atAGlance: [
      { label: "Pricing", value: "From £100/mo" },
      { label: "Or performance", value: "10% of bookings" },
      { label: "Minimum term", value: "6 months" },
      { label: "Google rating", value: "5.0 · 35 reviews" },
      { label: "Focus", value: "Local service SEO" },
    ],
    faqs: [
      {
        question: "How long until I see SEO results?",
        answer:
          "Most clients see meaningful movement within 3–4 months, with compounding gains from month six onward. Technical fixes can help faster, while authority building takes longer to pay off. That's why we ask for a 6-month minimum.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No reputable agency can guarantee exact positions — anyone who does is a red flag. We guarantee a proven, white-hat process, full transparency, and measurable improvements in traffic, calls and conversions.",
      },
      {
        question: "What's included in the £100/month plan?",
        answer:
          "Even our starter plan includes technical SEO, on-page optimisation of your key pages, Google Business Profile optimisation and monthly reporting. Higher tiers simply move faster with more content and link building.",
      },
    ],
  },
  {
    slug: "web-development",
    icon: CodeIcon,
    title: "Web Development",
    tagline: "Fast, beautiful, conversion-focused websites.",
    summary:
      "High-performance business websites built to be found and built to convert.",
    description:
      "A fast, modern website that looks the part and turns visitors into enquiries — built for local businesses and ready to grow with you.",
    category: "Business websites & web apps",
    heroImage: "/placeholders/add-image.svg",
    priceLabel: "From £100 one-time",
    highlights: [
      { icon: TagIcon, label: "From £100 one-time" },
      { icon: RocketIcon, label: "SEO-ready" },
      { icon: CheckCircleIcon, label: "Fully managed build" },
    ],
    rating: { score: "5.0", count: "from 35 Google reviews" },
    trustBadges: ["5.0 on Google", "Mobile-first", "Fast by default"],
    overview: {
      heading: "Websites that win you customers",
      paragraphs: [
        "Your website is often the first impression a customer gets — and a slow, dated or confusing site sends them straight to a competitor. We design and build fast, modern, mobile-first websites that build trust in seconds and make it effortless for visitors to call, message or book.",
        "Every site we build is created with the essentials baked in from day one: clean design, SEO-ready structure, a services section, blog, and clear calls to action. So whether you need a simple brochure site or a full multi-page business site, it's ready to be found and ready to sell.",
        "Starting from just £100, we handle the whole build for you — design, development, content structure and launch — so you get a professional online presence without the agency price tag or the tech headaches.",
      ],
    },
    stats: [
      { value: "£100", label: "Starting price" },
      { value: "5.0", label: "Google reviews" },
      { value: "1–3 wks", label: "Typical timeline" },
      { value: "100%", label: "Mobile-friendly" },
    ],
    included: [
      "Custom, on-brand design (no cookie-cutter templates)",
      "Fast, modern build with Next.js / React",
      "Fully responsive across mobile, tablet and desktop",
      "SEO-ready structure, metadata and sitemap",
      "Services listing and single service pages",
      "Blog and single blog article pages",
      "Contact form and click-to-call / WhatsApp",
      "Analytics and tracking setup",
    ],
    idealFor: [
      "New businesses needing a professional first website",
      "Established businesses with an outdated, slow site",
      "Local service providers wanting more enquiries",
      "Anyone who wants a site that's easy to update",
    ],
    steps: [
      {
        title: "Discovery & plan",
        description:
          "We learn about your business, your customers and your goals, then map out the pages and structure your site needs.",
      },
      {
        title: "Design",
        description:
          "We create a clean, on-brand design focused on trust and conversions, and refine it with you until it's spot on.",
      },
      {
        title: "Build",
        description:
          "We develop your site with performance, SEO and accessibility baked in — fast-loading and rock solid on every device.",
      },
      {
        title: "Launch & handover",
        description:
          "We deploy your site, connect your domain and analytics, and show you how everything works so you're never stuck.",
      },
    ],
    cost: {
      paragraphs: [
        "We keep website pricing refreshingly simple. Business websites start from a one-time fee of £100, which includes everything you need to get online with a professional, conversion-ready site.",
        "Larger sites with more pages, custom features, e-commerce or integrations are quoted individually — but you'll always get a clear, fixed price before we start, with no surprises later.",
      ],
      rows: [
        { label: "Starter business website", value: "From £100 (one-time)" },
        { label: "Multi-page business site", value: "Custom quote" },
        { label: "E-commerce / online store", value: "Custom quote" },
        { label: "Web app / custom features", value: "Custom quote" },
        { label: "Care & maintenance plan", value: "Optional monthly" },
      ],
      note: "The £100 build is a one-time fee — no hidden monthly charges to simply have your site online.",
    },
    priceFactors: [
      "The number of pages and their complexity",
      "Whether you need e-commerce or bookings",
      "Custom features and third-party integrations",
      "Whether content and images are provided or created",
      "Ongoing maintenance and support needs",
      "Copywriting and photography requirements",
    ],
    keyTakeaways: [
      "Business websites start from a one-time fee of £100.",
      "Every build is fast, mobile-first and SEO-ready.",
      "Services, blog and contact features are included as standard.",
      "Bigger or custom builds get a clear, fixed quote up front.",
    ],
    sections: [
      {
        id: "performance",
        heading: "Built for speed and Core Web Vitals",
        paragraphs: [
          "A slow website loses customers and rankings. We build on modern frameworks and optimise every image, script and page so your site loads in a blink — keeping visitors engaged and search engines happy from the very first visit.",
        ],
      },
      {
        id: "conversion",
        heading: "Designed to convert, not just look pretty",
        paragraphs: [
          "A beautiful site that doesn't generate enquiries is just an expensive brochure. We design around clear calls to action, trust signals and easy contact options, so more of your visitors actually pick up the phone or fill in the form.",
        ],
      },
      {
        id: "seo-ready",
        heading: "SEO-ready from day one",
        paragraphs: [
          "Every site we build ships with clean structure, proper metadata, fast load times and a mobile-first layout — the exact foundations SEO needs. Add our SEO service and you've got a website that's genuinely built to be found.",
        ],
      },
      {
        id: "easy-updates",
        heading: "Easy to update and grow",
        paragraphs: [
          "Your business will change, and your website should keep up. We structure sites so content is easy to update, and we're always here to add pages, features or a full online store as you grow.",
        ],
      },
    ],
    whyChoose: [
      {
        title: "Honest pricing",
        description:
          "Professional websites from a one-time £100 — no inflated agency fees or hidden costs.",
      },
      {
        title: "Fast & modern",
        description:
          "Built on modern tech for speed, security and top PageSpeed scores out of the box.",
      },
      {
        title: "Conversion-first",
        description:
          "Every page is designed to turn visitors into calls, messages and bookings.",
      },
      {
        title: "SEO-ready",
        description:
          "Clean, search-friendly foundations so you're ready to rank from launch day.",
      },
      {
        title: "Fully managed",
        description:
          "We handle design, build, content structure and launch — you just approve it.",
      },
      {
        title: "Room to grow",
        description:
          "Start simple and add features, pages or e-commerce whenever you're ready.",
      },
    ],
    reviews: [],
    atAGlance: [
      { label: "Pricing", value: "From £100 (one-time)" },
      { label: "Timeline", value: "1–3 weeks" },
      { label: "Includes", value: "Services + blog + contact" },
      { label: "Google rating", value: "5.0 · 35 reviews" },
      { label: "Support", value: "Optional plans" },
    ],
    faqs: [
      {
        question: "Is £100 really the full price?",
        answer:
          "Yes — a starter business website is a one-time fee of £100 with no hidden monthly charges just to keep it online. Larger or custom sites are quoted individually, but you'll always get a fixed price before we begin.",
      },
      {
        question: "Can you redesign my existing website?",
        answer:
          "Absolutely. We can rebuild your site for speed and conversions, refresh your branding, and migrate your content without losing your existing SEO value.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer:
          "We structure sites to be easy to update and we'll walk you through how everything works. If you'd rather not touch it, our optional maintenance plans mean we handle changes for you.",
      },
    ],
  },
  {
    slug: "app-development",
    icon: SmartphoneIcon,
    title: "App Development",
    tagline: "Mobile apps users love, built to scale.",
    summary:
      "Native-quality iOS & Android apps designed, built and launched for you.",
    description:
      "From idea to App Store — we design and build fast, reliable mobile apps that customers love and that grow with your business.",
    category: "iOS & Android apps",
    heroImage: "/placeholders/add-image.svg",
    priceLabel: "Custom quote",
    highlights: [
      { icon: SmartphoneIcon, label: "iOS & Android" },
      { icon: RocketIcon, label: "Store launch included" },
      { icon: TagIcon, label: "Custom quote" },
    ],
    rating: { score: "5.0", count: "from 35 Google reviews" },
    trustBadges: ["5.0 on Google", "Native quality", "Scalable backend"],
    overview: {
      heading: "Mobile apps that grow your business",
      paragraphs: [
        "A great app puts your business right in your customers' pockets — driving repeat bookings, loyalty and a direct line of communication no website can match. Whether you're launching a brand-new idea or adding an app to an established business, we design and build mobile experiences people genuinely enjoy using.",
        "We handle the entire journey: product strategy, UI/UX design, development for both iOS and Android, backend and API work, and submission to the App Store and Google Play. You get a polished, store-ready app without having to manage a technical team.",
        "Because every app is different, app projects are quoted individually. We'll sit down with you, understand your goals, define the right first version, and give you a clear, fixed proposal before any work begins.",
      ],
    },
    stats: [
      { value: "Custom", label: "Quoted per app" },
      { value: "iOS+Android", label: "Both platforms" },
      { value: "5.0", label: "Google reviews" },
      { value: "MVP-first", label: "Launch lean" },
    ],
    included: [
      "Product strategy and MVP scoping",
      "UI/UX design and interactive prototypes",
      "iOS development (iPhone & iPad)",
      "Android development",
      "Cross-platform builds where it makes sense",
      "Backend, APIs and secure data storage",
      "App Store & Google Play submission",
      "Analytics, crash reporting and growth tooling",
    ],
    idealFor: [
      "Businesses wanting repeat bookings and loyalty",
      "Startups launching a new product or idea",
      "Service businesses adding a customer app",
      "Companies replacing clunky manual processes",
    ],
    steps: [
      {
        title: "Product strategy",
        description:
          "We define the core problem, the essential first version (MVP), key user flows and the metrics that mean success.",
      },
      {
        title: "Design & prototype",
        description:
          "We create an intuitive interface and an interactive prototype so you can feel the app before we build a line of code.",
      },
      {
        title: "Develop & test",
        description:
          "We build in agile sprints with continuous testing and regular demos, so you see progress and steer the direction throughout.",
      },
      {
        title: "Launch & iterate",
        description:
          "We submit to the App Store and Google Play, support the launch, then use real data to improve and add features.",
      },
    ],
    cost: {
      paragraphs: [
        "App projects vary enormously in scope, so we quote each one individually rather than pretending one price fits all. After a short discovery conversation, you'll get a clear, fixed proposal with no surprises.",
        "As a rough guide, here's how app engagements are typically structured. We can start lean with a focused MVP and expand from there once it's proving its value.",
      ],
      rows: [
        { label: "Discovery & product strategy", value: "Custom quote" },
        { label: "MVP (single platform)", value: "Custom quote" },
        { label: "Full iOS + Android app", value: "Custom quote" },
        { label: "Backend & API development", value: "Custom quote" },
        { label: "Ongoing support & features", value: "Optional retainer" },
      ],
      note: "Every app is quoted individually with a clear, fixed proposal before any work starts.",
    },
    priceFactors: [
      "The number and complexity of features",
      "Whether you need iOS, Android or both",
      "Backend, integrations and third-party services",
      "The depth of custom design and animation",
      "Ongoing maintenance and feature roadmap",
      "Timeline and launch requirements",
    ],
    keyTakeaways: [
      "We handle strategy, design, build and store launch end to end.",
      "Apps are built for both iOS and Android to native quality.",
      "Every project is quoted individually with a fixed proposal.",
      "Start lean with an MVP, then grow with real user data.",
    ],
    sections: [
      {
        id: "design",
        heading: "Design people actually enjoy using",
        paragraphs: [
          "An app lives or dies by its experience. We obsess over intuitive navigation, fast interactions and clean, on-brand design, so your users get value in seconds and keep coming back — which is exactly what drives ratings, retention and word of mouth.",
        ],
      },
      {
        id: "platforms",
        heading: "iOS, Android or both",
        paragraphs: [
          "We'll recommend the right approach for your goals and budget. Cross-platform builds are perfect for speed and value, while fully native development shines for performance-critical apps — either way you reach your customers wherever they are.",
        ],
      },
      {
        id: "backend",
        heading: "Solid, scalable foundations",
        paragraphs: [
          "Behind every great app is a reliable backend. We build secure APIs and data storage that handle growth gracefully, integrate with the tools you already use, and keep your users' information safe.",
        ],
      },
      {
        id: "post-launch",
        heading: "Support beyond launch",
        paragraphs: [
          "Launching is the start, not the finish. We monitor performance, fix issues fast, and use real usage data to prioritise the features that will grow your business — with flexible retainers to keep your app improving.",
        ],
      },
    ],
    whyChoose: [
      {
        title: "End-to-end team",
        description:
          "Strategy, design, development and launch handled under one roof — no juggling vendors.",
      },
      {
        title: "Native quality",
        description:
          "Fast, polished apps that feel right at home on both iOS and Android.",
      },
      {
        title: "Start lean",
        description:
          "We help you launch a focused MVP first, then grow based on real user data.",
      },
      {
        title: "Scalable build",
        description:
          "Clean architecture and solid backends that grow with your user base.",
      },
      {
        title: "Clear proposals",
        description:
          "A fixed, transparent quote before we begin — you're always in control.",
      },
      {
        title: "Long-term partner",
        description:
          "Ongoing support and iteration to keep your app relevant and improving.",
      },
    ],
    reviews: [],
    atAGlance: [
      { label: "Pricing", value: "Custom quote" },
      { label: "Platforms", value: "iOS & Android" },
      { label: "Timeline", value: "From 6–12 weeks" },
      { label: "Google rating", value: "5.0 · 35 reviews" },
      { label: "Support", value: "Optional retainer" },
    ],
    faqs: [
      {
        question: "Native or cross-platform — which is right for me?",
        answer:
          "It depends on your goals. Cross-platform (React Native) is great for speed and budget while still feeling native; fully native is ideal for performance-critical apps. We'll advise honestly based on your needs during discovery.",
      },
      {
        question: "How much does an app cost?",
        answer:
          "Because scope varies so much, every app is quoted individually. After a short discovery conversation we give you a clear, fixed proposal — and you can start lean with an MVP to keep costs down.",
      },
      {
        question: "Do you help after launch?",
        answer:
          "Yes. We offer maintenance, feature development and growth retainers to keep your app stable, up to date and improving over time.",
      },
    ],
  },
  {
    slug: "digital-advertising",
    icon: MegaphoneIcon,
    title: "Digital Advertising",
    tagline: "Profitable paid campaigns across every channel.",
    summary:
      "Google Ads and paid social campaigns engineered for real return on spend.",
    description:
      "Get in front of ready-to-buy customers today. We build and manage paid campaigns that turn ad spend into measurable calls, leads and sales.",
    category: "Google Ads & paid social",
    heroImage: "/placeholders/add-image.svg",
    priceLabel: "Custom quote",
    highlights: [
      { icon: TargetIcon, label: "ROI-focused" },
      { icon: TrendingUpIcon, label: "Google & Meta" },
      { icon: TagIcon, label: "Custom quote" },
    ],
    rating: { score: "5.0", count: "from 35 Google reviews" },
    trustBadges: ["5.0 on Google", "Google Ads", "Meta Ads"],
    overview: {
      heading: "Paid ads that pay for themselves",
      paragraphs: [
        "When you need customers now, paid advertising is the fastest lever you can pull. The problem is that most businesses quietly waste money on poorly targeted campaigns. We fix that — building tightly focused Google and Meta campaigns that put your business in front of people actively looking to buy, at the exact moment they're ready.",
        "From Google Search and Maps to Meta and Instagram, we handle everything: strategy, targeting, ad creative and copy, landing pages, conversion tracking and daily optimisation. Every pound is accounted for and pointed at one goal — profitable growth.",
        "We obsess over the numbers that matter: cost per lead, cost per acquisition and return on ad spend. You'll get clear reporting that ties your spend directly to enquiries and revenue, so you always know your ads are working.",
      ],
    },
    stats: [
      { value: "200%+", label: "ROI lift (client review)" },
      { value: "5.0", label: "Google reviews" },
      { value: "24–48h", label: "To go live" },
      { value: "Daily", label: "Optimisation" },
    ],
    included: [
      "Account audit and opportunity review",
      "Google Ads (Search, Maps, Performance Max)",
      "Meta & Instagram advertising",
      "Precise audience and location targeting",
      "Ad creative and conversion-focused copy",
      "Landing page and conversion rate advice",
      "Full conversion tracking and attribution",
      "Ongoing optimisation and clear reporting",
    ],
    idealFor: [
      "Businesses that need leads and calls quickly",
      "Local services with a defined area to target",
      "Companies wasting money on unmanaged ads",
      "Anyone launching a new offer or location",
    ],
    steps: [
      {
        title: "Audit & goals",
        description:
          "We review your goals, tracking and any existing ad spend to spot quick wins and set clear, measurable targets.",
      },
      {
        title: "Strategy & setup",
        description:
          "We choose the right channels, build tightly targeted campaigns and set up airtight conversion tracking.",
      },
      {
        title: "Launch & optimise",
        description:
          "We go live and optimise daily — refining targeting, bids, creative and copy toward your target cost per lead.",
      },
      {
        title: "Scale & report",
        description:
          "Winning campaigns get more budget while we test new angles, backed by clear reporting on leads and ROAS.",
      },
    ],
    cost: {
      paragraphs: [
        "Advertising has two parts: your ad budget (paid to Google or Meta) and our management fee. We quote management individually based on your channels, budget and complexity, and we're completely transparent about both.",
        "As a guide, here's how paid advertising engagements are typically structured. We'll recommend a sensible starting ad budget for your market so campaigns have enough data to perform.",
      ],
      rows: [
        { label: "Account audit", value: "Custom quote" },
        { label: "Google Ads management", value: "Custom quote" },
        { label: "Meta / Instagram management", value: "Custom quote" },
        { label: "Landing page build", value: "From £100" },
        { label: "Ad budget (to platforms)", value: "You set, we advise" },
      ],
      note: "Your ad spend goes straight to Google or Meta — our fee only covers strategy, management and optimisation.",
    },
    priceFactors: [
      "The channels you advertise on",
      "Your monthly ad budget and target volume",
      "How competitive your industry is",
      "The number of campaigns and locations",
      "Creative and landing page requirements",
      "How aggressively you want to scale",
    ],
    keyTakeaways: [
      "We run profitable Google and Meta campaigns focused on ROI.",
      "Management is quoted individually and fully transparently.",
      "Your ad budget goes straight to the platforms, not to us.",
      "You get clear reporting on leads, cost per lead and ROAS.",
    ],
    sections: [
      {
        id: "targeting",
        heading: "Reach ready-to-buy customers",
        paragraphs: [
          "The magic of paid search is intent — people are literally telling Google they want what you offer. We build tightly targeted campaigns around those high-intent searches and your service area, so your budget is spent on people who are genuinely likely to become customers.",
        ],
      },
      {
        id: "creative",
        heading: "Creative and copy that convert",
        paragraphs: [
          "A click is worthless if the ad and landing page don't convert. We write compelling ad copy, design scroll-stopping social creative, and make sure the page they land on is built to turn that click into a call or enquiry.",
        ],
      },
      {
        id: "tracking",
        heading: "Watertight conversion tracking",
        paragraphs: [
          "You can't improve what you can't measure. We set up proper conversion tracking so every call, form and message is attributed correctly, letting us optimise toward real results rather than guesswork.",
        ],
      },
      {
        id: "optimisation",
        heading: "Daily optimisation, honest reporting",
        paragraphs: [
          "Ad accounts need constant attention. We refine targeting, bids, budgets and creative continuously, cutting waste and doubling down on winners — then report clearly on the leads and return your spend is generating.",
        ],
      },
    ],
    whyChoose: [
      {
        title: "ROI-obsessed",
        description:
          "We optimise for cost per lead and return on ad spend, never vanity clicks.",
      },
      {
        title: "Transparent spend",
        description:
          "Your budget goes straight to the platforms — no markup, no hidden fees.",
      },
      {
        title: "Fast to launch",
        description:
          "We can have well-structured campaigns live within 24–48 hours.",
      },
      {
        title: "Full funnel",
        description:
          "From the ad to the landing page, we optimise the whole journey to convert.",
      },
      {
        title: "Proper tracking",
        description:
          "Airtight conversion tracking so every lead is measured and attributed.",
      },
      {
        title: "Clear reporting",
        description:
          "Straightforward reports tying your spend to real enquiries and revenue.",
      },
    ],
    reviews: [],
    atAGlance: [
      { label: "Management", value: "Custom quote" },
      { label: "Channels", value: "Google & Meta" },
      { label: "Go live", value: "24–48 hours" },
      { label: "Google rating", value: "5.0 · 35 reviews" },
      { label: "Focus", value: "Cost per lead & ROAS" },
    ],
    faqs: [
      {
        question: "What ad budget do I need?",
        answer:
          "It varies by industry and area, but we'll recommend a sensible starting budget that gives campaigns enough data to perform. You keep full control of your spend, which goes directly to Google or Meta.",
      },
      {
        question: "How do you measure success?",
        answer:
          "We focus on the metrics tied to revenue — cost per lead, cost per acquisition and return on ad spend — not vanity metrics like impressions or clicks alone.",
      },
      {
        question: "How quickly can campaigns go live?",
        answer:
          "Once we have access and tracking in place, we can typically have well-structured campaigns live within 24–48 hours, then optimise from there.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
