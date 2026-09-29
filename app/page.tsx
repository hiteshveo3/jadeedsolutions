import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  CodeIcon,
  MegaphoneIcon,
  SearchIcon,
  UsersIcon,
  TargetIcon,
  TrendingUpIcon,
  CheckIcon,
  LocationIcon,
  QuoteIcon,
  HandshakeIcon,
  RocketIcon,
  WhatsappIcon,
  PhoneIcon,
  TagIcon,
  SmartphoneIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { googleAggregate, trustpilotAggregate } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Local SEO, websites & paid growth for service businesses",
  description:
    "Jadeed Solutions helps movers, cleaners, plumbers and trades win more booked jobs with local SEO, conversion websites and Google Ads — with performance, tiered or flat-fee pricing built around your job values.",
  keywords: [
    "local SEO agency",
    "pay per booking marketing",
    "performance-based SEO",
    "SEO for service businesses",
    "Google Ads for local businesses",
    "web development Narowal",
    "Jadeed Solutions reviews",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    title: "More booked jobs. One growth partner.",
    description: "Local SEO, conversion websites and Google Ads built as one system — with pricing that can follow the jobs you book.",
    url: siteConfig.url,
    images: [{ url: "/performance-marketing-local-businesses.webp", width: 1920, height: 840, alt: "Jadeed Solutions growth system for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadeed Solutions | More booked jobs for local service businesses",
    description: "Local SEO, conversion websites and Google Ads built as one system, with pricing that can follow booked jobs.",
    images: ["/performance-marketing-local-businesses.webp"],
  },
};

const proof = [
  { icon: UsersIcon, value: "10+", label: "active client partnerships" },
  { icon: TrendingUpIcon, value: "160K+", label: "search impressions for Alpha Movers in 6 months" },
  { icon: HandshakeIcon, value: "10%", label: "typical fee on revenue our work brings in" },
  { icon: TagIcon, value: "0%", label: "markup on your Google or Meta ad spend" },
] as const;

const industries = [
  { label: "Movers & removals", href: "/industries/seo-for-uk-removals" },
  { label: "Cleaning companies", href: "/industries/seo-for-cleaners" },
  { label: "Plumbing & heating", href: "/industries/seo-for-plumbers" },
  { label: "Trades & contractors", href: "/industries/seo-for-local-service-businesses" },
] as const;

const services = [
  {
    icon: SearchIcon,
    number: "01",
    stage: "Get found",
    title: "Local SEO & Google Maps",
    copy: "Show up in the map pack and organic results when customers in your service area search for exactly what you do.",
    includes: ["Google Business Profile", "Service-area pages", "Review growth"],
    href: "/services/seo",
    outcome: "More calls from local search",
  },
  {
    icon: CodeIcon,
    number: "02",
    stage: "Get chosen",
    title: "Conversion-first websites",
    copy: "Fast, mobile-first sites that answer the questions buyers have and make calling, quoting or booking effortless.",
    includes: ["Mobile-first build", "Core Web Vitals", "Click-to-call & WhatsApp"],
    href: "/services/web-development",
    outcome: "More enquiries from the same traffic",
  },
  {
    icon: MegaphoneIcon,
    number: "03",
    stage: "Capture demand now",
    title: "Google Ads & paid social",
    copy: "Campaigns built around high-intent searches and the real cost of winning a booked job — not clicks for their own sake.",
    includes: ["Search campaigns", "Negative keywords", "Call tracking"],
    href: "/services/digital-advertising",
    outcome: "Qualified leads without wasted spend",
  },
  {
    icon: TargetIcon,
    number: "04",
    stage: "Prove what works",
    title: "Tracking & reporting",
    copy: "Every call, form and booking traced back to its source, so you can see which work is paying for itself.",
    includes: ["Call & form tracking", "Monthly reports", "Booking attribution"],
    href: "/how-it-works",
    outcome: "Decisions backed by evidence",
  },
] as const;

/** Alpha Movers GSC export, 24 Feb – 23 Aug 2026 (see lib/case-studies.ts). Segments are nested-period differences. */
const alphaGrowth = {
  segments: [
    { label: "First 3 months", color: "#6f8f2e" },
    { label: "Next 2 months", color: "#a9c21f" },
    { label: "Final 28 days", color: "#eaf25a" },
  ],
  series: [
    { name: "Impressions", total: 160903, values: [18770, 45832, 96301] },
    { name: "Clicks", total: 630, values: [144, 214, 272] },
  ],
} as const;

const models = [
  {
    name: "Performance",
    value: "10%",
    unit: "of revenue from bookings we generate",
    note: "Illustrative standard-ticket rate · 12–24 month term",
    points: ["Fee only on collected revenue", "Nothing on cancelled or unpaid jobs", "Lower rate for high-ticket work"],
    featured: true,
  },
  {
    name: "Tiered",
    value: "Per job",
    unit: "fixed fee by job type or value",
    note: "Suits variable-ticket trades · 12–24 month term",
    points: ["Protects high-ticket margins", "Simple job-level reconciliation", "No percentage on big projects"],
    featured: false,
  },
  {
    name: "Flat fee",
    value: "Fixed",
    unit: "monthly or milestone-based scope",
    note: "Suits predictable requirements · SEO plans: 6-month minimum",
    points: ["No revenue sharing", "Clear deliverables and timeline", "Easy to budget month to month"],
    featured: false,
  },
] as const;

const steps = [
  {
    icon: HandshakeIcon,
    title: "Free growth plan",
    copy: "Tell us your services, areas and typical job values. We review your Google visibility, website and competitors, then map the clearest route to more bookings.",
  },
  {
    icon: TagIcon,
    title: "Agree the model",
    copy: "Choose performance, tiered or flat-fee pricing. For percentage deals, a short paid audit sets the baseline and we agree how every booking is counted before work starts.",
  },
  {
    icon: RocketIcon,
    title: "Build the foundations",
    copy: "Website, Google Business Profile, service-area pages and tracking — mobile-first and built to turn searches into calls.",
  },
  {
    icon: TrendingUpIcon,
    title: "Grow and report",
    copy: "Ongoing SEO, content and optional ads, with monthly reporting that ties rankings and campaigns to enquiries and booked work.",
  },
] as const;

const reviewPlatforms = [
  { name: "Google", score: googleAggregate.score, detail: `${googleAggregate.count} reviews`, href: siteConfig.googleBusinessUrl },
  { name: "Trustpilot", score: trustpilotAggregate.score, detail: `${trustpilotAggregate.count} reviews`, href: siteConfig.trustpilotUrl },
  { name: "Clutch", score: "5.0", detail: "Verified B2B review", href: siteConfig.clutchUrl },
  { name: "Facebook", score: "100%", detail: "Recommend", href: siteConfig.facebookReviewsUrl },
] as const;

const reviews = [
  { quote: "Their SEO work is excellent and helped bring my business to the first page despite strong competition in Abu Dhabi.", author: "Just Shine Cleaning Services", source: "Trustpilot", topic: "Local SEO" },
  { quote: "They managed our PPC with real precision — clear improvement in return within the first weeks.", author: "Mariam Ammad", source: "Google", topic: "Google Ads" },
  { quote: "The team managed the project professionally and efficiently. Their technical expertise, creativity and responsiveness stood out.", author: "CEO, Kamboh Tech Solutions", source: "Clutch", topic: "Web project" },
] as const;

const faqs = [
  ["Which businesses do you work with?", "Local service businesses that win work from Google — movers and removals companies, cleaners, plumbers, contractors and other trades. We work remotely with clients in the UK, the US, Canada, the UAE, Pakistan and other markets."],
  ["How does the performance model work?", "Before launch we agree how calls, forms and bookings are tracked and attributed. You then pay a percentage of collected revenue from the bookings our work generates — typically around 10% for standard-ticket jobs. Cancelled or unpaid jobs cost nothing, and high-ticket work usually moves to a lower rate or fixed per-job tiers. Percentage deals run for 12–24 months and start with a short paid audit that sets the baseline — our profit-share handbook explains every step."],
  ["Do I have to take a performance deal?", "No. If you prefer predictable costs, choose a tiered or flat-fee model instead. You can also buy SEO, a website or an app as a fixed-scope project."],
  ["How long until I see results?", "Paid campaigns usually take six to twelve weeks to reach a reliable cost per enquiry. Organic and local search take six to twelve months to compound — Alpha Movers earned 60% of six months of search impressions in the final 28 days alone. We set realistic expectations for your market on the first call."],
  ["Do I need to run Google Ads?", "No. Many clients grow through Google Search and Maps first. When ads make sense, you pay Google or Meta directly with no markup on spend, and we build and manage the campaigns."],
  ["Where is Jadeed Solutions based?", `Our registered business location is ${siteConfig.address}. The team works remotely with clients worldwide.`],
  ["How do we get started?", "Request a free growth plan or message us on WhatsApp. We will review your visibility, website conversion path and acquisition setup, then recommend the clearest next steps. The growth plan is free; if a percentage deal fits, a short paid audit comes next."],
] as const;

export default function Home() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: "Jadeed Solutions — local SEO, websites and paid growth",
        description: "A connected customer acquisition system for local service businesses, with performance, tiered or flat-fee pricing.",
        about: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "ItemList",
        name: "Jadeed Solutions services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "Service", name: service.title, description: service.copy, url: `${siteConfig.url}${service.href}`, provider: { "@id": `${siteConfig.url}/#organization` } },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent("Hi Jadeed — I came from the website. I'd like help growing my local service business.")}`;

  return (
    <div className="bg-[#015f45] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden bg-[#37c4e7] bg-[url('/performance-marketing-local-businesses.webp')] bg-cover bg-top sm:h-[420px] lg:h-[460px]" aria-label="Jadeed Solutions growth journey">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#015f45]/25 to-[#015f45]" />
      </section>

      <section className="relative -mt-2 pb-10 sm:pb-14">
        <div className="container max-w-[1200px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#eaf25a]">
                <span className="h-2 w-2 rounded-full bg-[#cbd810]" /> <span className="hidden sm:inline">Growth partner for local service businesses</span><span className="sm:hidden">For local service businesses</span>
              </div>
              <h1 className="max-w-4xl font-sans text-[40px] font-semibold leading-[.95] tracking-[-.055em] sm:text-[62px] lg:text-[68px]">
                <span className="block lg:whitespace-nowrap">More booked jobs.</span>
                <span className="block text-[#eaf25a] lg:whitespace-nowrap">One growth partner.</span>
              </h1>
            </div>
            <div className="pb-1 lg:justify-self-end">
              <p className="max-w-md text-lg leading-7 text-white/85">
                Local SEO, conversion websites and Google Ads for movers, cleaners, plumbers and trades — built as one system, with pricing that can follow the jobs you book.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Cta href="/contact" variant="lime">Get a free growth plan</Cta>
                <Cta href="#results" variant="outline">See client results</Cta>
              </div>
              <a href={googleAggregate.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md text-sm text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cbd810]">
                <Stars />
                <span><strong className="font-semibold text-white">{googleAggregate.score}</strong> {googleAggregate.label}</span>
              </a>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-[#014f39]/65 lg:grid-cols-4">
            {proof.map((item) => (
              <li key={item.label} className="flex flex-col gap-3 border-white/15 p-5 sm:flex-row sm:items-center sm:gap-4 sm:px-6 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:not(:last-child)]:border-r">
                <HugeiconsIcon icon={item.icon} size={30} className="shrink-0 text-[#eaf25a]" aria-hidden="true" />
                <div>
                  <div className="text-2xl font-bold tracking-tight">{item.value}</div>
                  <div className="text-[13px] leading-5 text-white/70">{item.label}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="shrink-0 text-xs font-bold uppercase tracking-[.14em] text-white/60">Built for</span>
            <ul className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li key={industry.href}>
                  <Link href={industry.href} className="inline-flex items-center rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white/85 transition-colors hover:border-[#eaf25a]/60 hover:text-[#eaf25a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cbd810]">
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-10 sm:pb-14" aria-labelledby="services-heading">
        <div className="container max-w-[1200px]">
          <div className="rounded-[32px] bg-[#f7f5ef] px-5 py-8 text-[#0d0d0d] sm:px-9 sm:py-11 lg:px-12 lg:py-14">
            <div className="grid gap-6 border-b border-black/10 pb-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <div>
                <Eyebrow>One connected system</Eyebrow>
                <h2 id="services-heading" className="mt-3 max-w-3xl text-balance font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-5xl">Four capabilities. One clear path to more booked work.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-black/60 lg:justify-self-end">Most local businesses pay for SEO, a website and ads as separate projects that never talk to each other. We run them on one strategy, one set of data and one goal: booked jobs.</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35 hover:shadow-[0_18px_45px_rgba(1,95,69,.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015f45] sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f1ed] text-[#015f45]"><HugeiconsIcon icon={service.icon} size={24} aria-hidden="true" /></div>
                    <span className="text-xs font-bold uppercase tracking-[.12em] text-black/40"><span className="text-[#015f45]">{service.number}</span> · {service.stage}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-bold tracking-[-.03em]">{service.title}</h3>
                  <p className="mt-3 max-w-xl leading-6 text-black/60">{service.copy}</p>
                  <ul className="mb-6 mt-5 flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
                    {service.includes.map((item) => (
                      <li key={item} className="rounded-full bg-[#f3f1ec] px-3 py-1 text-xs font-semibold text-black/70">{item}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-sm font-bold text-[#015f45]">
                    <span>{service.outcome}</span>
                    <HugeiconsIcon icon={ArrowRightIcon} size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/services/app-development" className="group inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-[#015f45]">
                <HugeiconsIcon icon={SmartphoneIcon} size={18} className="text-[#015f45]" aria-hidden="true" />
                Need a booking or dispatch app? We build those too.
                <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/services" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 py-3 text-sm font-bold text-white hover:bg-[#014f39]">Explore all services <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case study */}
      <section id="results" className="scroll-mt-24 pb-16 sm:pb-24" aria-labelledby="proof-heading">
        <div className="container max-w-[1200px]">
          <article className="overflow-hidden rounded-[32px] border border-white/15 bg-[#014f39]">
            <div className="grid lg:grid-cols-[1.05fr_.95fr]">
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d]">Verified case study</span>
                  <span className="text-xs font-semibold text-white/60">Alpha Movers · Removals, London &amp; Croydon</span>
                </div>
                <h2 id="proof-heading" className="mt-5 text-balance max-w-xl font-sans text-[32px] font-semibold leading-[1.08] tracking-[-.04em] sm:text-[42px]">
                  160,903 search impressions in six months — on a pay-per-booking deal.
                </h2>
                <p className="mt-5 max-w-xl leading-7 text-white/70">
                  A monthly SEO retainer didn’t fit Alpha Movers’ cash flow, so we agreed a 10% fee on the bookings our work generates. Then we built the whole engine: website, mobile app, SEO, social and ads — and pushed into higher-value specialist work like sofa and furniture hoisting.
                </p>
                <figure className="mt-7 border-l-2 border-[#cbd810] pl-5">
                  <blockquote className="text-lg leading-7 tracking-[-.01em] text-white">“Paying 10% after bookings was the model that made sense — and Jadeed delivered the full stack: website, app, SEO and ads.”</blockquote>
                  <figcaption className="mt-3 text-sm text-white/60"><span className="font-semibold text-white/85">Abdullah Bin Mustafa</span> · Alpha Movers, London</figcaption>
                </figure>
                <div className="mt-8"><Cta href="/case-studies/alpha-movers" variant="white">Read the full case study</Cta></div>
              </div>

              <div className="relative hidden min-h-[360px] overflow-hidden bg-[#063d30] sm:block lg:min-h-0">
                <div className="absolute inset-x-6 bottom-0 top-10 flex flex-col overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,.35)] lg:left-10 lg:right-0 lg:top-14 lg:rounded-tr-none lg:border-r-0">
                  <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-black/10 bg-[#f3f1ec] px-3" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/15" /><span className="h-2.5 w-2.5 rounded-full bg-black/15" /><span className="h-2.5 w-2.5 rounded-full bg-black/15" />
                    <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-black/50">alphamovers.co.uk</span>
                  </div>
                  <div className="relative flex-1">
                    <Image src="/case-studies/alpha-movers/homepage.jpeg" alt="The Alpha Movers website homepage built by Jadeed Solutions" fill sizes="(min-width: 1024px) 1400px, 100vw" className="object-cover object-left-top" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid border-t border-white/10 lg:grid-cols-[.9fr_1.1fr]">
              <dl className="grid grid-cols-3 border-white/10 lg:border-r">
                <Metric value="630" label="organic clicks" />
                <Metric value="160.9K" label="search impressions" />
                <Metric value="+312%" label="clicks, first vs final 28 days" />
              </dl>
              <GrowthChart />
            </div>
          </article>
        </div>
      </section>

      {/* Pricing models */}
      <section className="bg-[#f7f5ef] py-16 text-[#0d0d0d] sm:py-24" aria-labelledby="pricing-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <Eyebrow>How you pay</Eyebrow>
              <h2 id="pricing-heading" className="mt-3 max-w-2xl text-balance font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-5xl">Pay for booked jobs, not busywork.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-black/60 lg:justify-self-end">Most agencies bill the same retainer whether your phone rings or not. We shape the commercial model around your job values and margins — and agree how every booking is counted before we start.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {models.map((model) => (
              <article key={model.name} className={`relative flex flex-col rounded-[24px] border p-6 sm:p-7 ${model.featured ? "border-[#015f45] bg-[#dceee8]" : "border-black/10 bg-white"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold tracking-[-.02em]">{model.name}</h3>
                  {model.featured && <span className="rounded-full bg-[#cbd810] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#063d30]">Recommended start</span>}
                </div>
                <div className="mt-5 border-y border-black/10 py-5">
                  <div className="text-4xl font-bold tracking-[-.045em]">{model.value}</div>
                  <div className="mt-1 text-sm text-black/60">{model.unit}</div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {model.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-black/75">
                      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#015f45] text-white" aria-hidden="true"><HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.5} /></span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-6 text-xs text-black/50">{model.note}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-px overflow-hidden rounded-[24px] border border-black/10 bg-black/10 sm:grid-cols-3">
            {[
              ["0% ad-spend markup", "You pay Google and Meta directly. Campaign management is part of the plan."],
              ["Attribution agreed first", "We agree how calls, forms and bookings are counted before launch, so there are no disputes later."],
              ["You own every account", "Your domain, Google Business Profile and ad accounts stay in your business’s name. We’re added as users."],
            ].map(([title, copy]) => (
              <div key={title} className="bg-white p-5 sm:p-6">
                <div className="font-bold">{title}</div>
                <p className="mt-1.5 text-sm leading-6 text-black/60">{copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pricing#calculator" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 text-sm font-bold text-white transition-colors hover:bg-[#014f39]">Estimate your fee <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            <Link href="/pricing#models" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#015f45]/25 px-5 text-sm font-bold text-[#015f45] transition-colors hover:bg-[#edf5f1]">Compare pricing models</Link>
            <Link href="/profit-share-handbook" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold text-black/65 transition-colors hover:text-[#015f45]">
              Read the profit-share handbook <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24" aria-labelledby="process-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">How it works</p>
              <h2 id="process-heading" className="mt-3 max-w-2xl text-balance font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-5xl">From first call to booked jobs in four steps.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/70 lg:justify-self-end">No long onboarding decks. A clear plan, an agreed way to measure success, then steady work you can see in your reports.</p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col rounded-[24px] border border-white/15 bg-[#014f39] p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#cbd810] text-[#063d30]"><HugeiconsIcon icon={step.icon} size={22} aria-hidden="true" /></span>
                  <span className="text-sm font-bold text-white/40">Step {index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-[-.02em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{step.copy}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Cta href="/contact" variant="lime">Start with a free growth plan</Cta>
            <Link href="/tools/growth-check" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Or try the 2-minute growth check <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#f7f5ef] py-16 text-[#0d0d0d] sm:py-24" aria-labelledby="reviews-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <Eyebrow>Independent proof</Eyebrow>
              <h2 id="reviews-heading" className="mt-3 text-balance font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-5xl">Don’t take our word for it.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">Every rating links to its public source, platform by platform, so you can check the reviews yourself.</p>
          </div>

          <div className="mt-9 grid grid-cols-2 overflow-hidden rounded-[24px] border border-black/10 bg-white lg:grid-cols-4">
            {reviewPlatforms.map((platform) => (
              <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" className="group border-black/10 p-5 transition hover:bg-[#edf5f1] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#015f45] sm:p-6 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:not(:last-child)]:border-r">
                <div className="flex items-center justify-between"><span className="font-bold">{platform.name}</span><HugeiconsIcon icon={ArrowRightIcon} size={16} className="text-[#015f45] transition-transform group-hover:translate-x-1" aria-hidden="true" /></div>
                <div className="mt-4 text-3xl font-bold tracking-[-.03em] text-[#015f45]">{platform.score}</div>
                <div className="mt-1 text-xs text-black/55">{platform.detail}</div>
              </a>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.author} className="flex flex-col rounded-[24px] border border-black/10 bg-white p-6 sm:p-7 lg:min-h-[270px]">
                <div className="flex items-center justify-between">
                  <HugeiconsIcon icon={QuoteIcon} size={28} className="text-[#015f45]" aria-hidden="true" />
                  <span className="rounded-full bg-[#e7f1ed] px-2.5 py-1 text-[11px] font-bold text-[#015f45]">{review.topic}</span>
                </div>
                <blockquote className="mb-6 mt-5 text-lg leading-7 tracking-[-.015em]">“{review.quote}”</blockquote>
                <figcaption className="mt-auto border-t border-black/10 pt-5"><div className="font-bold">{review.author}</div><div className="mt-1 text-xs text-black/55">Public review on {review.source}</div></figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-sm text-black/55">Also listed on <a href={siteConfig.goodfirmsUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#015f45] underline-offset-4 hover:underline">GoodFirms</a>.</p>
        </div>
      </section>

      {/* Founder + location */}
      <section className="bg-[#dceee8] py-16 text-[#063d30] sm:py-24" aria-labelledby="team-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
            <article className="flex flex-col rounded-[30px] bg-white p-6 sm:p-10">
              <Eyebrow>Who you’ll work with</Eyebrow>
              <div className="mt-6 flex items-center gap-5">
                <Image src="/team/sameer-ahmad-basra.jpg" alt="Sameer Ahmad Basra, founder of Jadeed Solutions" width={96} height={96} className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24" />
                <div>
                  <h2 id="team-heading" className="font-sans text-2xl font-semibold tracking-[-.035em] sm:text-3xl">Sameer Ahmad Basra</h2>
                  <p className="mt-1 text-sm text-[#063d30]/65">Founder · Strategy, technical SEO &amp; engineering</p>
                </div>
              </div>
              <p className="mt-6 leading-7 text-[#063d30]/75">
                Sameer started as a WordPress developer on freelance marketplaces, where platform fees took a heavy cut and a middleman always sat between him and his clients. He founded Jadeed Solutions in December 2024 to work directly with business owners — and to be paid for results rather than activity.
              </p>
              <p className="mt-4 leading-7 text-[#063d30]/75">
                The team stays small, with around ten active clients, so strategy and delivery stay hands-on.
              </p>
              <blockquote className="mt-6 rounded-2xl bg-[#f7f5ef] p-5 text-lg font-semibold leading-7 tracking-[-.015em] text-[#063d30]">
                “We don’t charge for activity. We charge for results.”
              </blockquote>
              <Link href="/sameer-ahmad-basra" className="group mt-7 inline-flex items-center gap-2 self-start text-sm font-bold text-[#015f45] lg:mt-auto lg:pt-7">
                Read Sameer’s story <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </article>

            <article className="flex flex-col overflow-hidden rounded-[30px] bg-white">
              <div className="p-6 sm:p-10 sm:pb-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f1ed] text-[#015f45]"><HugeiconsIcon icon={LocationIcon} size={22} aria-hidden="true" /></span>
                  <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Our business location</p>
                </div>
                <h3 className="mt-5 font-sans text-2xl font-semibold tracking-[-.035em] sm:text-3xl">Based in Narowal. Working worldwide.</h3>
                <address className="mt-3 not-italic leading-7 text-[#063d30]/70">{siteConfig.address}</address>
                <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#015f45]">
                  Leave us a Google review <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
              <iframe src={siteConfig.googleMapsEmbedUrl} title="Map of the Jadeed Solutions office in Pejowali Kalan, Narowal" width="600" height="320" className="min-h-[260px] w-full flex-1 border-0 bg-[#e7f1ed]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f5ef] py-16 text-[#0d0d0d] sm:py-24" aria-labelledby="faq-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Clear answers</Eyebrow>
              <h2 id="faq-heading" className="mt-3 text-balance font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-5xl">Questions owners ask us first.</h2>
              <p className="mt-4 max-w-sm leading-7 text-black/60">Still deciding? Message us — you’ll get a straight answer, not a sales script.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 text-sm font-bold text-white transition-colors hover:bg-[#014f39]">
                  <HugeiconsIcon icon={WhatsappIcon} size={18} aria-hidden="true" /> WhatsApp us
                </a>
                <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#015f45]/25 px-5 text-sm font-bold text-[#015f45] transition-colors hover:bg-[#edf5f1]">
                  <HugeiconsIcon icon={PhoneIcon} size={18} aria-hidden="true" /> {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015f45] [&::-webkit-details-marker]:hidden">
                    <span>{question}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-lg leading-none text-[#015f45] transition-transform group-open:rotate-45 group-open:bg-[#015f45] group-open:text-white" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-2xl pb-6 leading-7 text-black/65 sm:pr-12">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">{children}</p>;
}

const ctaStyles = {
  lime: "bg-[#cbd810] text-[#111111] shadow-sm hover:bg-[#b8c50e]",
  white: "bg-white text-black shadow-sm hover:bg-gray-100",
  outline: "border border-white/35 text-white hover:border-white hover:bg-white/10",
} as const;

function Cta({ href, children, variant }: { href: string; children: React.ReactNode; variant: keyof typeof ctaStyles }) {
  return (
    <Link href={href} className={`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${ctaStyles[variant]}`}>
      {children}
      <span className="relative -mr-1 flex h-4 w-4 items-center justify-center overflow-hidden" aria-hidden="true">
        <HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
        <HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full" />
      </span>
    </Link>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#eaf25a]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" /></svg>
      ))}
    </span>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col-reverse justify-center border-white/10 px-4 py-6 sm:px-8 sm:py-8 [&:not(:last-child)]:border-r">
      <dt className="mt-1 min-h-8 text-xs leading-4 text-white/65 sm:min-h-10 sm:text-sm sm:leading-5">{label}</dt>
      <dd className="text-2xl font-bold tracking-[-.04em] text-[#eaf25a] sm:text-4xl">{value}</dd>
    </div>
  );
}

function GrowthChart() {
  const { segments, series } = alphaGrowth;
  const pct = (part: number, total: number) => Math.round((part / total) * 100);

  return (
    <figure className="border-t border-white/10 p-5 sm:p-8 lg:border-t-0">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-bold">When the results arrived</span>
        <span className="text-xs text-white/55">Google Search Console · 24 Feb – 23 Aug 2026</span>
      </figcaption>

      <div className="mt-5 space-y-4">
        {series.map((row) => (
          <div key={row.name}>
            <div className="mb-1.5 flex justify-between text-xs text-white/65">
              <span>{row.name}</span>
              <span>{row.total.toLocaleString("en-GB")} total</span>
            </div>
            <div className="flex h-7 gap-[2px]" role="img" aria-label={`${row.name}: ${row.values.map((v, i) => `${segments[i].label} ${v.toLocaleString("en-GB")} (${pct(v, row.total)}%)`).join(", ")}`}>
              {row.values.map((value, i) => (
                <div
                  key={segments[i].label}
                  title={`${segments[i].label}: ${value.toLocaleString("en-GB")} ${row.name.toLowerCase()} (${pct(value, row.total)}%)`}
                  className="flex items-center justify-end px-2 text-xs font-bold text-[#063d30] first:rounded-l-[4px] last:rounded-r-[4px]"
                  style={{ width: `${(value / row.total) * 100}%`, backgroundColor: segments[i].color }}
                >
                  {i === row.values.length - 1 && `${pct(value, row.total)}%`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: segment.color }} aria-hidden="true" />
            {segment.label}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-6 text-white/75">
        <strong className="font-semibold text-white">60% of six months of impressions came in the final 28 days.</strong> SEO compounds — the early work is what makes the later jump possible.
      </p>
    </figure>
  );
}
