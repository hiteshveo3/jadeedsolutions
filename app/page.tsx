import type { Metadata } from "next";
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
} from "@/components/icons";
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
  { icon: CodeIcon, number: "02", title: "Conversion-first websites", copy: "Fast, mobile-first websites with clear journeys, strong technical SEO and fewer barriers between a visit and an enquiry.", href: "/services/web-development", outcome: "More enquiries from existing traffic" },
  { icon: MegaphoneIcon, number: "03", title: "Paid customer acquisition", copy: "Google and social campaigns shaped around commercial intent, lead quality and the real cost of winning each booked job.", href: "/services/digital-advertising", outcome: "Qualified demand without waste" },
  { icon: TargetIcon, number: "04", title: "Tracking & growth reporting", copy: "Straightforward monthly reporting that connects rankings, campaigns and website activity to leads and booked work.", href: "/how-it-works", outcome: "Decisions backed by evidence" },
] as const;

const proof = [
  { icon: UsersIcon, value: "10+", label: "active client partnerships" },
  { icon: TrendingUpIcon, value: "160K+", label: "case-study impressions" },
  { icon: StarIcon, value: "5.0", label: "Google Business rating" },
  { icon: CheckCircleIcon, value: "Clear", label: "monthly reporting" },
] as const;

const reviewPlatforms = [
  { name: "Google", score: "5.0", detail: "Business Profile", href: siteConfig.googleBusinessUrl },
  { name: "Trustpilot", score: "4.0", detail: "3 public reviews", href: siteConfig.trustpilotUrl },
  { name: "Clutch", score: "5.0", detail: "Verified B2B review", href: siteConfig.clutchUrl },
  { name: "Facebook", score: "100%", detail: "recommended", href: siteConfig.facebookReviewsUrl },
  { name: "GoodFirms", score: "Claimed", detail: "company profile", href: siteConfig.goodfirmsUrl },
] as const;

const reviews = [
  { quote: "Their SEO work is excellent and helped bring my business to the first page despite strong competition in Abu Dhabi.", author: "Just Shine Cleaning Services", source: "Trustpilot" },
  { quote: "They developed my website exactly how I wanted. Their technical skills are strong, and the way they handle UI/UX is outstanding.", author: "Ather Javed", source: "Trustpilot" },
  { quote: "The team managed the project professionally and efficiently. Their technical expertise, creativity and responsiveness stood out.", author: "CEO, Kamboh Tech Solutions", source: "Clutch" },
] as const;

const faqs = [
  ["What does Jadeed Solutions do?", "Jadeed Solutions combines local SEO, Google Ads, conversion-focused websites, mobile applications and reporting into one customer acquisition system for service businesses."],
  ["Where is Jadeed Solutions located?", "Our registered business location is House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal 51600, Pakistan. We work remotely with clients in Pakistan, the UK, the US, the UAE and other markets."],
  ["Does Jadeed Solutions have independent reviews?", "Yes. Public profiles are available on Google Business, Trustpilot, Clutch, Facebook and GoodFirms. Each platform is linked on this page so you can check the source directly."],
  ["Which businesses are the best fit?", "We are best suited to local service businesses such as movers, cleaners, plumbers, contractors and other teams that want measurable enquiries and booked jobs rather than disconnected marketing activity."],
  ["How do we get started?", "Book a free growth plan. We will review your visibility, website conversion path and acquisition setup, then recommend the clearest next steps."],
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

      <section className="relative h-[320px] overflow-hidden bg-[#37c4e7] bg-[url('/performance-marketing-local-businesses.webp')] bg-cover bg-top sm:h-[420px] lg:h-[480px]" aria-label="Jadeed Solutions growth journey">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#015f45]/25 to-[#015f45]" />
      </section>

      <section className="relative -mt-2 pb-8 sm:pb-12">
        <div className="container max-w-[1200px]">
          <div className="grid items-end gap-9 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#eaf25a]">
                <span className="h-2 w-2 rounded-full bg-[#cbd810]" /> Growth partner for local service businesses
              </div>
              <h1 className="max-w-4xl font-sans text-[46px] font-semibold leading-[.94] tracking-[-.055em] sm:text-[62px] lg:text-[68px]">
                <span className="block lg:whitespace-nowrap">More booked jobs.</span><span className="block text-[#eaf25a] lg:whitespace-nowrap">One growth partner.</span>
              </h1>
            </div>
            <div className="pb-2 lg:justify-self-end">
              <p className="max-w-md text-lg leading-7 text-white/85 sm:text-xl">Local SEO, conversion websites and paid acquisition built as one measurable system for service businesses.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Cta href="/contact">Get a free growth plan</Cta><Cta href="/case-studies/alpha-movers" lime>See client results</Cta></div>
            </div>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/20 bg-[#014f39]/65 md:grid-cols-2 lg:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="flex items-center gap-4 border-white/15 px-6 py-5 [&:not(:last-child)]:border-b md:[&:nth-child(odd)]:border-r md:[&:nth-child(-n+2)]:border-b lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r">
                <HugeiconsIcon icon={item.icon} size={34} className="shrink-0 text-[#eaf25a]" />
                <div><div className="text-2xl font-bold tracking-tight">{item.value}</div><div className="text-sm leading-5 text-white/70">{item.label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-12" aria-labelledby="services-heading">
        <div className="container max-w-[1200px]">
          <div className="rounded-[32px] bg-[#f7f5ef] px-6 py-8 text-[#0d0d0d] sm:px-9 sm:py-11 lg:px-12 lg:py-14">
            <div className="grid gap-6 border-b border-black/10 pb-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">One connected system</p>
                <h2 id="services-heading" className="mt-3 max-w-3xl font-sans text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-5xl">Four capabilities. One clear path to more booked work.</h2>
              </div>
              <p className="max-w-md text-base leading-7 text-black/60 lg:justify-self-end">Every part shares the same strategy, data and commercial goal—so your marketing works together instead of becoming four disconnected projects.</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group grid min-h-[250px] rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35 hover:shadow-[0_18px_45px_rgba(1,95,69,.10)] sm:p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e7f1ed] text-[#015f45]"><HugeiconsIcon icon={service.icon} size={27} /></div>
                    <span className="text-sm font-bold text-black/25">{service.number}</span>
                  </div>
                  <div className="mt-8 self-end">
                    <h3 className="text-2xl font-bold tracking-[-.03em]">{service.title}</h3>
                    <p className="mt-3 max-w-xl leading-6 text-black/60">{service.copy}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-sm font-bold text-[#015f45]"><span>{service.outcome}</span><HugeiconsIcon icon={ArrowRightIcon} size={18} className="transition-transform group-hover:translate-x-1" /></div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-7 flex justify-end"><Link href="/services" className="group inline-flex items-center gap-2 rounded-xl bg-[#015f45] px-5 py-3 text-sm font-bold text-white hover:bg-[#014f39]">Explore all services <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" /></Link></div>
          </div>
        </div>
      </section>

      <section className="pb-8 sm:pb-12" aria-labelledby="proof-heading">
        <div className="container max-w-[1200px]">
          <article className="grid overflow-hidden rounded-[30px] border border-white/20 bg-[#014f39] lg:grid-cols-[1.15fr_.85fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <span className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d]">Verified case study</span>
              <h2 id="proof-heading" className="mt-5 max-w-3xl font-sans text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Alpha Movers earned 160,903 organic impressions in six months.</h2>
              <p className="mt-5 max-w-2xl leading-7 text-white/70">A stronger technical foundation, focused local content and clearer service architecture produced measurable search growth.</p>
              <div className="mt-8"><Cta href="/case-studies/alpha-movers">View the evidence</Cta></div>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
              <Metric value="630" label="organic clicks" /><Metric value="160,903" label="Google Search impressions" />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#f7f5ef] py-16 text-[#0d0d0d] sm:py-24" aria-labelledby="reviews-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Independent proof</p>
              <h2 id="reviews-heading" className="mt-3 font-sans text-4xl font-semibold leading-[1.02] tracking-[-.045em] sm:text-5xl">Don’t take our word for it.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-black/60 lg:justify-self-end">Check our public profiles directly. Ratings are shown platform by platform so the proof stays transparent and sourceable.</p>
          </div>

          <div className="mt-9 grid overflow-hidden rounded-[24px] border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-5">
            {reviewPlatforms.map((platform) => (
              <a key={platform.name} href={platform.href} target="_blank" rel="noreferrer" className="group border-black/10 p-5 transition hover:bg-[#edf5f1] [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r">
                <div className="flex items-center justify-between"><span className="font-bold">{platform.name}</span><HugeiconsIcon icon={ArrowRightIcon} size={16} className="text-[#015f45] transition-transform group-hover:translate-x-1" /></div>
                <div className="mt-5 text-2xl font-bold text-[#015f45]">{platform.score}</div><div className="mt-1 text-xs text-black/50">{platform.detail}</div>
              </a>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.author} className="flex min-h-[285px] flex-col rounded-[24px] border border-black/10 bg-white p-7">
                <HugeiconsIcon icon={QuoteIcon} size={30} className="text-[#015f45]" />
                <blockquote className="mt-6 text-lg leading-7 tracking-[-.015em]">“{review.quote}”</blockquote>
                <figcaption className="mt-auto border-t border-black/10 pt-5"><div className="font-bold">{review.author}</div><div className="mt-1 text-xs text-black/50">Public review on {review.source}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#dceee8] py-16 text-[#063d30] sm:py-24" aria-labelledby="location-heading">
        <div className="container max-w-[1200px]">
          <div className="grid overflow-hidden rounded-[30px] bg-white lg:grid-cols-[.8fr_1.2fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f1ed] text-[#015f45]"><HugeiconsIcon icon={LocationIcon} size={26} /></div>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Our business location</p>
              <h2 id="location-heading" className="mt-3 font-sans text-4xl font-semibold tracking-[-.045em]">Based in Narowal. Working worldwide.</h2>
              <address className="mt-5 not-italic leading-7 text-[#063d30]/70">{siteConfig.address}</address>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl bg-[#cbd810] px-5 py-3 text-sm font-bold text-black hover:bg-[#b8c50e]">Review us on Google <HugeiconsIcon icon={ArrowRightIcon} size={17} className="transition-transform group-hover:translate-x-1" /></a>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-[#015f45]/20 px-5 py-3 text-sm font-bold text-[#015f45] hover:bg-[#edf5f1]"><HugeiconsIcon icon={GlobeIcon} size={17} /> Contact Jadeed</Link>
              </div>
            </div>
            <iframe src={siteConfig.googleMapsEmbedUrl} title="Jadeed Solutions office in Pejowali Kalan, Narowal" width="600" height="450" className="min-h-[360px] w-full border-0 lg:h-full" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5ef] pb-16 text-[#0d0d0d] sm:pb-24" aria-labelledby="faq-heading">
        <div className="container max-w-[1000px]">
          <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr]">
            <div><p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">Clear answers</p><h2 id="faq-heading" className="mt-3 font-sans text-4xl font-semibold tracking-[-.045em]">Frequently asked questions</h2></div>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map(([question, answer], index) => (
                <details key={question} className="group py-5" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{question}</span><span className="text-xl text-[#015f45] group-open:rotate-45">+</span></summary>
                  <p className="max-w-2xl pt-4 leading-7 text-black/60">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[30px] bg-[#dceee8] px-6 py-10 text-[#063d30] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
            <div className="relative max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#015f45]">Your next stage of growth</p><h2 className="mt-3 font-sans text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Let’s build a system that keeps working.</h2><p className="mt-4 max-w-xl text-[#063d30]/70">Tell us where you want to grow. We’ll map the clearest route from visibility to qualified enquiries and booked work.</p></div>
            <Link href="/contact" className="group relative mt-8 inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#cbd810] px-6 py-4 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#b8c50e] lg:mt-0">Get a free growth plan <HugeiconsIcon icon={ArrowRightIcon} size={18} className="transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Cta({ href, children, lime = false }: { href: string; children: React.ReactNode; lime?: boolean }) {
  return <Link href={href} className={`group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${lime ? "bg-[#cbd810] text-[#111111] hover:bg-[#b8c50e]" : "bg-white text-black hover:bg-gray-100"}`}>{children}<span className="relative -mr-1 flex h-4 w-4 items-center justify-center overflow-hidden"><HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0" /><HugeiconsIcon icon={ArrowRightIcon} size={16} className="absolute translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full" /></span></Link>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="flex min-h-[180px] flex-col justify-center p-8 lg:p-10"><div className="text-5xl font-bold tracking-[-.05em] text-[#eaf25a]">{value}</div><div className="mt-2 text-sm text-white/65">{label}</div></div>;
}
