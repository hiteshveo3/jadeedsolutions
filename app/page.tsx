import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  CodeIcon,
  MegaphoneIcon,
  SearchIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  CheckCircleIcon,
  LocationIcon,
  QuoteIcon,
  GlobeIcon,
  LinkedinIcon,
  PlusIcon,
} from "@/components/icons";
import { GoogleLogo, TrustpilotLogo, ClutchLogo, FacebookLogo } from "@/components/BrandLogos";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Local SEO, websites & paid growth for service businesses",
  description:
    "Jadeed Solutions is a Narowal-based digital growth agency helping local service businesses win more booked jobs through local SEO, conversion websites, Google Ads and transparent reporting.",
  keywords: [
    "local SEO agency",
    "digital marketing agency Pakistan",
    "web development Narowal",
    "Google Ads for local businesses",
    "SEO for service businesses",
    "Jadeed Solutions reviews",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    title: "More booked jobs. One growth partner.",
    description: "SEO, websites and paid acquisition built as one measurable system for local service businesses.",
    url: siteConfig.url,
    images: [{ url: "/performance-marketing-local-businesses.webp", width: 1920, height: 840, alt: "Jadeed Solutions growth system for local service businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadeed Solutions | More booked jobs for local service businesses",
    description: "Connected local SEO, conversion websites and paid acquisition with clear reporting.",
    images: ["/performance-marketing-local-businesses.webp"],
  },
};

const services = [
  { icon: SearchIcon, number: "01", title: "Local SEO & Google Maps", copy: "Build local visibility where ready-to-buy customers search, from Google Business Profile to service-area content.", href: "/services/seo", outcome: "More calls from local search" },
  { icon: CodeIcon, number: "02", title: "Conversion-first websites", copy: "Fast, mobile-first websites with clear journeys, strong technical SEO and fewer barriers between a visit and an enquiry.", href: "/services/web-development", outcome: "More enquiries, same traffic" },
  { icon: MegaphoneIcon, number: "03", title: "Paid customer acquisition", copy: "Google and social campaigns shaped around commercial intent, lead quality and the real cost of winning each booked job.", href: "/services/digital-advertising", outcome: "Qualified demand without waste" },
  { icon: TargetIcon, number: "04", title: "Tracking & growth reporting", copy: "Straightforward monthly reporting that connects rankings, campaigns and website activity to leads and booked work.", href: "/how-it-works", outcome: "Decisions backed by evidence" },
] as const;

const proof = [
  { icon: UsersIcon, value: "10+", label: "active client partnerships" },
  { icon: TrendingUpIcon, value: "218K", label: "search impressions in 3 months" },
  { icon: StarIcon, value: "5.0", label: "Google Business rating" },
  { icon: CheckCircleIcon, value: "70+", label: "booked jobs in 3 months" },
] as const;

const caseStudyMetrics = [
  { value: "70+", label: "booked jobs", highlight: true },
  { value: "120+", label: "website enquiries", highlight: true },
  { value: "218K", label: "Google Search impressions", highlight: false },
  { value: "643", label: "organic clicks", highlight: false },
] as const;

const reviewPlatforms = [
  { name: "Google", logo: GoogleLogo, score: "5.0", detail: "Business Profile", href: siteConfig.googleBusinessUrl },
  { name: "Trustpilot", logo: TrustpilotLogo, score: "4.0", detail: "3 public reviews", href: siteConfig.trustpilotUrl },
  { name: "Clutch", logo: ClutchLogo, score: "5.0", detail: "Verified B2B review", href: siteConfig.clutchUrl },
  { name: "Facebook", logo: FacebookLogo, score: "100%", detail: "recommended", href: siteConfig.facebookReviewsUrl },
] as const;

const reviews = [
  { quote: "Their SEO work is excellent and helped bring my business to the first page despite strong competition in Abu Dhabi.", author: "Just Shine Cleaning Services", source: "Trustpilot", logo: "/clients/just-shine.png", initials: "JS" },
  { quote: "They developed my website exactly how I wanted. Their technical skills are strong, and the way they handle UI/UX is outstanding.", author: "Ather Javed", source: "Trustpilot", logo: null, initials: "AJ" },
  { quote: "The team managed the project professionally and efficiently. Their technical expertise, creativity and responsiveness stood out.", author: "CEO, Kamboh Tech Solutions", source: "Clutch", logo: null, initials: "KT" },
] as const;

const founderFacts = [
  ["Dec 2024", "Founded in Narowal"],
  ["UK · US · UAE", "Client markets"],
  ["Pay per booking", "Partnership option"],
] as const;

const faqs = [
  ["What does Jadeed Solutions do?", "Jadeed Solutions combines local SEO, Google Ads, conversion-focused websites, mobile applications and reporting into one customer acquisition system for service businesses."],
  ["Where is Jadeed Solutions located?", "Our registered business location is House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal 51600, Pakistan. We work remotely with clients in Pakistan, the UK, the US, the UAE and other markets."],
  ["Does Jadeed Solutions have independent reviews?", "Yes. Public profiles are available on Google Business, Trustpilot, Clutch and Facebook. Each platform is linked on this page so you can check the source directly."],
  ["Which businesses are the best fit?", "We are best suited to local service businesses such as movers, cleaners, plumbers, contractors and other teams that want measurable enquiries and booked jobs rather than disconnected marketing activity."],
  ["How does pricing work?", "Websites start from £199 and fixed local SEO from £100 a month, with a 6-month minimum. If you would rather pay for results, the Growth Partnership is typically 10% of the bookings our work generates, on a 12–24 month term. Full details are on the pricing page and in our profit-share handbook."],
  ["How do we get started?", "Book a free growth plan. We will review your visibility, website conversion path and acquisition setup, then recommend the clearest next steps."],
] as const;

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#015f45]";

export default function Home() {
  const founder = getAuthor();

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: "Jadeed Solutions — local SEO, websites and paid growth",
        description: "A connected customer acquisition system for local service businesses.",
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

  return (
    <div className="bg-[#015f45] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* Hero artwork */}
      <section className="relative h-[260px] overflow-hidden bg-[#37c4e7] sm:h-[420px] lg:h-[480px]">
        <Image src="/performance-marketing-local-businesses.webp" alt="Illustrated journey from a customer's home to a local service business" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#015f45]/25 to-[#015f45] sm:h-28" />
      </section>

      {/* Hero copy + proof bar */}
      <section className="relative -mt-2 pb-10 md:pb-16">
        <div className="container max-w-[1200px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-9">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#eaf25a]">
                <span className="h-2 w-2 rounded-full bg-[#cbd810]" />
                <span className="sm:hidden">For local service businesses</span>
                <span className="hidden sm:inline">Growth partner for local service businesses</span>
              </div>
              <h1 className="max-w-4xl font-sans text-[38px] font-semibold leading-[.98] tracking-[-.055em] min-[420px]:text-[44px] sm:text-[62px] sm:leading-[.94] lg:text-[68px]">
                <span className="block lg:whitespace-nowrap">More booked jobs.</span><span className="block text-[#eaf25a] lg:whitespace-nowrap">One growth partner.</span>
              </h1>
            </div>
            <div className="lg:justify-self-end lg:pb-2">
              <p className="max-w-md text-[17px] leading-7 text-white/85 sm:text-xl">Local SEO, conversion websites and paid acquisition built as one measurable system for service businesses.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Cta href="/contact">Get a free growth plan</Cta><Cta href="/case-studies/alpha-movers" lime>See client results</Cta></div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 border-y border-white/15 md:overflow-hidden md:rounded-2xl md:border md:border-white/20 md:bg-[#014f39]/65 lg:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="flex items-start gap-4 border-white/15 py-5 pr-4 md:items-center odd:border-r [&:nth-child(-n+2)]:border-b [&:nth-child(even)]:pl-5 md:px-6 md:[&:nth-child(even)]:pl-6 lg:[&:not(:last-child)]:border-r lg:[&:nth-child(-n+2)]:border-b-0">
                <HugeiconsIcon icon={item.icon} size={34} className="hidden shrink-0 text-[#eaf25a] md:block" />
                <div><div className="text-[28px] font-bold leading-none tracking-tight md:text-2xl">{item.value}</div><div className="mt-1.5 text-[13px] leading-5 text-white/75 md:mt-1 md:text-sm">{item.label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f7f5ef] py-14 text-[#0d0d0d] md:py-24" aria-labelledby="services-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:gap-6">
            <div>
              <Eyebrow>One connected system</Eyebrow>
              <h2 id="services-heading" className="mt-3 max-w-3xl font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] [text-wrap:balance] sm:text-5xl sm:leading-[1.02]">Four capabilities. One clear path to more booked work.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-black/65 lg:justify-self-end">Every part shares the same strategy, data and commercial goal, so your marketing works together instead of becoming four disconnected projects.</p>
          </div>

          <div className="mt-8 grid border-t border-black/10 md:mt-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-black/10 lg:border-b">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className={`group flex gap-4 border-b border-black/10 py-7 md:flex-col md:gap-0 md:py-9 lg:border-b-0 lg:px-7 lg:first:pl-0 lg:last:pr-0 ${focusRing}`}>
                <div className="flex shrink-0 items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f1ed] text-[#015f45] transition-colors group-hover:bg-[#015f45] group-hover:text-[#eaf25a]"><HugeiconsIcon icon={service.icon} size={24} /></div>
                  <span className="hidden text-sm font-bold text-black/35 md:block">{service.number}</span>
                </div>
                <div className="flex flex-1 flex-col md:mt-8">
                  <h3 className="text-xl font-bold tracking-[-.03em] transition-colors group-hover:text-[#015f45] md:text-[22px] md:leading-7">{service.title}</h3>
                  <p className="mt-2 leading-6 text-black/65 md:mb-6 md:mt-3">{service.copy}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#015f45] md:mt-auto"><span>{service.outcome}</span><HugeiconsIcon icon={ArrowRightIcon} size={18} className="shrink-0 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex md:justify-end"><Link href="/services" className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 text-sm font-bold text-white transition-colors hover:bg-[#014f39] sm:w-auto ${focusRing}`}>Explore all services <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" /></Link></div>
        </div>
      </section>

      {/* Case study */}
      <section className="md:py-16" aria-labelledby="proof-heading">
        <div className="container max-w-[1200px]">
          <article className="-mx-5 grid overflow-hidden bg-[#014f39] md:mx-0 md:rounded-[30px] md:border md:border-white/20 lg:grid-cols-[1.1fr_.9fr]">
            <div className="px-5 py-14 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Image src="/clients/alpha-movers.jpeg" alt="Alpha Movers logo" width={44} height={44} className="h-11 w-11 rounded-xl" />
                <div className="mr-2"><div className="font-bold leading-5">Alpha Movers</div><div className="text-sm leading-5 text-white/65">Removals · London</div></div>
                <span className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d]">Verified case study</span>
              </div>
              <h2 id="proof-heading" className="mt-7 max-w-3xl font-sans text-[32px] font-semibold leading-[1.06] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">Alpha Movers won 70+ booked jobs from its website in 3 months.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/75">A stronger technical foundation, focused local content and clearer service pages earned 218K Google Search impressions between June and September 2026, and turned that visibility into 120+ website enquiries.</p>
              <div className="mt-8"><Cta href="/case-studies/alpha-movers">View the evidence</Cta></div>
            </div>
            <dl className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:border-l lg:border-t-0">
              {caseStudyMetrics.map((metric) => (
                <div key={metric.label} className="flex flex-col justify-start bg-[#0b5641] px-5 py-8 sm:p-8 lg:justify-center lg:p-10">
                  <dt className="order-2 mt-2 text-sm text-white/75">{metric.label}</dt>
                  <dd className={`order-1 text-[34px] font-bold leading-none tracking-[-.05em] sm:text-5xl ${metric.highlight ? "text-[#eaf25a]" : "text-white"}`}>{metric.value}</dd>
                </div>
              ))}
            </dl>
            <figure className="border-t border-white/10 px-5 py-8 sm:p-10 lg:col-span-2 lg:p-12">
              <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"><span className="font-bold">Google Search Console · Alpha Movers</span><span className="text-white/65">Last 3 months · Jun–Sep 2026 · Web search</span></figcaption>
              <a href="/case-studies/alpha-movers/gsc-3-months-sep-2026.png" target="_blank" rel="noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:rounded-2xl">
                <Image src="/case-studies/alpha-movers/gsc-3-months-sep-2026.png" alt="Google Search Console chart for Alpha Movers: 643 clicks and 218K impressions over the last 3 months, rising steadily from June to September 2026" width={1407} height={741} sizes="(min-width: 1200px) 1100px, 100vw" className="h-auto w-full md:rounded-2xl" />
              </a>
              <p className="mt-3 text-xs text-white/55 md:hidden">Tap the chart to open it full size.</p>
            </figure>
          </article>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#f7f5ef] py-14 text-[#0d0d0d] sm:py-24" aria-labelledby="reviews-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-6">
            <div>
              <Eyebrow>Independent proof</Eyebrow>
              <h2 id="reviews-heading" className="mt-3 font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] [text-wrap:balance] sm:text-5xl sm:leading-[1.02]">Don’t take our word for it.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-black/65 lg:justify-self-end">Check our public profiles directly. Ratings are shown platform by platform so the proof stays transparent and sourceable.</p>
          </div>

          <div className="mt-8 divide-y divide-black/10 border-y border-black/10 md:mt-9 lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0 lg:overflow-hidden lg:rounded-[24px] lg:border lg:bg-white">
            {reviewPlatforms.map((platform) => {
              const Logo = platform.logo;
              return (
                <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" className={`group block transition-colors lg:p-6 lg:hover:bg-[#edf5f1] ${focusRing}`}>
                  <div className="flex items-center justify-between gap-4 py-4 lg:hidden">
                    <div className="flex items-center gap-3"><Logo className="h-7 w-7 shrink-0" /><div><div className="font-bold">{platform.name}</div><div className="mt-0.5 text-xs text-black/60">{platform.detail}</div></div></div>
                    <div className="flex items-center gap-3"><span className="text-xl font-bold text-[#015f45]">{platform.score}</span><HugeiconsIcon icon={ArrowRightIcon} size={16} className="text-[#015f45]" /></div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex items-center justify-between"><span className="flex items-center gap-2.5 font-bold"><Logo className="h-6 w-6 shrink-0" />{platform.name}</span><HugeiconsIcon icon={ArrowRightIcon} size={16} className="text-[#015f45] transition-transform group-hover:translate-x-1" /></div>
                    <div className="mt-6 text-3xl font-bold tracking-tight text-[#015f45]">{platform.score}</div><div className="mt-1 text-xs text-black/60">{platform.detail}</div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 divide-y divide-black/10 md:mt-5 md:space-y-4 md:divide-y-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
            {reviews.map((review) => (
              <figure key={review.author} className="flex flex-col py-8 md:rounded-[24px] md:border md:border-black/10 md:bg-white md:p-7 lg:min-h-[285px]">
                <HugeiconsIcon icon={QuoteIcon} size={28} className="text-[#015f45]" />
                <blockquote className="mb-5 mt-5 text-lg leading-7 tracking-[-.015em] md:mb-6 md:mt-6">“{review.quote}”</blockquote>
                <figcaption className="flex items-center gap-3 md:mt-auto md:border-t md:border-black/10 md:pt-5">
                  {review.logo ? (
                    <Image src={review.logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg" />
                  ) : (
                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e7f1ed] text-sm font-bold text-[#015f45]">{review.initials}</span>
                  )}
                  <div><div className="font-bold">{review.author}</div><div className="mt-0.5 text-xs text-black/60">Public review on {review.source}</div></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-14 md:py-24" aria-labelledby="founder-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-[.85fr_1.15fr] md:items-center lg:gap-16">
            <div className="-mx-5 -mt-14 md:mx-0 md:mt-0">
              <Image src={founder.avatar} alt={`${founder.name}, founder of Jadeed Solutions`} width={1024} height={1024} sizes="(min-width: 768px) 480px, 100vw" className="aspect-square w-full object-cover md:rounded-[28px]" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">Meet the founder</p>
              <h2 id="founder-heading" className="mt-3 font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] [text-wrap:balance] sm:text-5xl sm:leading-[1.02]">A founder who measures success in booked jobs.</h2>
              <p className="mt-6 text-lg font-bold">{founder.name} <span className="font-normal text-white/65">· Founder &amp; CEO</span></p>
              <p className="mt-3 max-w-xl leading-7 text-white/75">{founder.bio}</p>
              <dl className="mt-8 grid divide-y divide-white/15 border-y border-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {founderFacts.map(([value, label]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 py-4 sm:flex-col sm:items-start sm:justify-start sm:gap-0 sm:py-5 sm:pr-3 sm:[&:not(:first-child)]:pl-4">
                    <dt className="order-2 text-sm leading-5 text-white/65 sm:mt-1 sm:text-xs">{label}</dt>
                    <dd className="order-1 text-base font-bold leading-6 sm:text-lg">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta href="/sameer-ahmad-basra">Read Sameer’s story</Cta>
                <a href="https://pk.linkedin.com/in/sameer-ahmad-basra" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><HugeiconsIcon icon={LinkedinIcon} size={18} /> Connect on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#dceee8] text-[#063d30] md:py-24" aria-labelledby="location-heading">
        <div className="container max-w-[1200px]">
          <div className="-mx-5 grid overflow-hidden md:mx-0 md:rounded-[30px] md:bg-white lg:grid-cols-[.9fr_1.1fr]">
            <div className="px-5 py-14 sm:p-10 lg:p-12">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#015f45] md:h-12 md:w-12 md:rounded-2xl md:bg-[#e7f1ed]"><HugeiconsIcon icon={LocationIcon} size={24} /></div>
              <div className="mt-6 md:mt-8"><Eyebrow>Our business location</Eyebrow></div>
              <h2 id="location-heading" className="mt-3 font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] [text-wrap:balance] sm:text-4xl">Based in Narowal. Working worldwide.</h2>
              <address className="mt-5 not-italic leading-7 text-[#063d30]/75">{siteConfig.address}</address>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-bold text-black transition-colors hover:bg-[#b8c50e]">Review us on Google <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" /></a>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#015f45]/25 px-5 text-sm font-bold text-[#015f45] transition-colors hover:bg-[#edf5f1]"><HugeiconsIcon icon={GlobeIcon} size={17} /> Contact Jadeed</Link>
              </div>
            </div>
            <iframe src={siteConfig.googleMapsEmbedUrl} title="Jadeed Solutions office in Pejowali Kalan, Narowal" width="600" height="450" className="h-[320px] w-full border-0 md:h-[380px] lg:h-full lg:min-h-[420px]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f7f5ef] py-14 text-[#0d0d0d] sm:py-24" aria-labelledby="faq-heading">
        <div className="container max-w-[1000px]">
          <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr] lg:gap-8">
            <div className="lg:sticky lg:top-8 lg:self-start"><Eyebrow>Clear answers</Eyebrow><h2 id="faq-heading" className="mt-3 font-sans text-[34px] font-semibold leading-[1.04] tracking-[-.045em] sm:text-4xl">Frequently asked questions</h2></div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group" open={index === 0}>
                  <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold [&::-webkit-details-marker]:hidden"><span>{question}</span><HugeiconsIcon icon={PlusIcon} size={22} strokeWidth={2} className="shrink-0 text-[#015f45] transition-transform duration-300 group-open:rotate-45" /></summary>
                  <p className="max-w-2xl pb-5 leading-7 text-black/65">{answer}</p>
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

function Cta({ href, children, lime = false }: { href: string; children: React.ReactNode; lime?: boolean }) {
  return <Link href={href} className={`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${lime ? "bg-[#cbd810] text-[#111111] hover:bg-[#b8c50e]" : "bg-white text-black hover:bg-gray-100"}`}>{children}<span className="relative -mr-1 flex h-4 w-4 items-center justify-center overflow-hidden"><HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0" /><HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full" /></span></Link>;
}
