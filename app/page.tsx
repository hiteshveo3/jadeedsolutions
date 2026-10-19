import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon, CodeIcon, MegaphoneIcon, SearchIcon, SmartphoneIcon, TargetIcon, ZapIcon, LinkedinIcon, ArrowUpRightIcon, WhatsappIcon } from "@/components/icons";
import { GoogleLogo } from "@/components/BrandLogos";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import { CircleArrow, Eyebrow, FaqList } from "@/components/site/ui";
import { Topo } from "@/components/site/Art";
import { BigQuote, BrowserFrame, ClicksChart, CompareTable, Receipt, TickGrid, TradesMarquee } from "@/components/jadeed/blocks";
import { CountUp, EvidenceTabs, FeeCalculator, RouteSteps, WorldClocks } from "@/components/jadeed/interactive";

export const metadata: Metadata = {
  title: "Local SEO, websites & paid growth for service businesses",
  description:
    "Jadeed Solutions is a Narowal-based digital growth agency helping local service businesses win more booked jobs through local SEO, conversion websites, Google Ads and transparent reporting.",
  keywords: ["local SEO agency", "digital marketing agency Pakistan", "web development Narowal", "Google Ads for local businesses", "SEO for service businesses", "Jadeed Solutions reviews"],
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

/* Real Jadeed Solutions facts only (pricing, how-it-works, case study, reviews). */
const heroTicks = ["No setup fee on SEO plans", "Fixed SEO from £300 a month", "Or £0 upfront and 10% of paid jobs", "WhatsApp the team doing the work"] as const;

const proof = [
  { value: 70, suffix: "+", label: "booked jobs for Alpha Movers in 3 months" },
  { value: 218, suffix: "K", label: "search impressions in 3 months" },
  { value: 5, decimals: 1, label: "Google rating, from 35 reviews" },
  { value: 10, prefix: "~", label: "active clients — we keep it small" },
] as const;

const trades = ["Moving & removals", "Cleaning", "Plumbing & heating", "HVAC & AC repair", "Roofing", "Electrical", "Landscaping", "Pest control", "Handyman", "Contractors"] as const;

const services = [
  { icon: SearchIcon, title: "Local SEO & Google Maps", copy: "Show up where ready-to-buy customers search, from your Google Business Profile to service-area pages.", href: "/services/seo" },
  { icon: CodeIcon, title: "Conversion-first websites", copy: "Fast, mobile-first sites with clear journeys, so a visit turns into a call or an enquiry.", href: "/services/web-development" },
  { icon: MegaphoneIcon, title: "Paid customer acquisition", copy: "Google and social campaigns shaped around lead quality and the real cost of a booked job.", href: "/services/digital-advertising" },
  { icon: SmartphoneIcon, title: "Mobile apps", copy: "Booking and customer apps when they pay off — shipped for Alpha Movers alongside the website.", href: "/services/app-development" },
  { icon: TargetIcon, title: "Tracking & monthly reporting", copy: "A plain-English report that connects rankings, campaigns and website activity to booked work.", href: "/how-it-works" },
  { icon: ZapIcon, title: "Growth Partnership", copy: "The whole system for £0 upfront and 10% of paid jobs — a 6-month start, then month to month.", href: "/pricing" },
] as const;

const compareRows = [
  ["Setup fee", "None on SEO plans", "Often charged upfront", "No setup — but spend starts day one"],
  ["What you pay", "From £300 a month, or 10% of paid jobs we bring", "A retainer every month", "Every click, whatever happens"],
  ["Who you talk to", "The team doing the work, on WhatsApp", "An account manager", "A platform dashboard"],
  ["What you see", "Calls, enquiries and booked jobs, monthly", "Activity reports", "Clicks and impressions"],
  ["When you stop", "Pages, content and rankings keep working", "The work stops", "The calls stop"],
] as const;

const steps = [
  { title: "Free discovery", text: "WhatsApp or call us. We learn your cities, services and goals — then outline a clear plan. Demos are available if you want to see how we work." },
  { title: "Build the foundations", text: "Website and SEO setup, plus apps if you need them. Mobile-first and conversion-first, so visitors call and book." },
  { title: "Grow visibility", text: "We focus on Google search and your website first — most clients never need ads. If you want ads later, you fund the spend and we manage the campaigns." },
  { title: "Pay fairly", text: "Fixed SEO from £300 a month with no setup fee and a 6-month minimum. Or the Growth Partnership: £0 upfront and 10% of paid jobs, on a 6-month start, then month to month." },
] as const;

const evidence = [
  { label: "Last 3 months", src: "/case-studies/alpha-movers/gsc-3-months-19-oct-2026.webp", caption: "Google Search Console · Alpha Movers · Captured 19 Oct 2026 · last 3 months: 885 clicks, 273K impressions", width: 1902, height: 865 },
  { label: "Last 28 days", src: "/case-studies/alpha-movers/gsc-28-days-oct-2026.webp", caption: "Alpha Movers · last 28 days · 4 Oct 2026: 273 clicks, 83.2K impressions", width: 1918, height: 877 },
  { label: "6 months", src: "/case-studies/alpha-movers/gsc-6-months-oct-2026.webp", caption: "Alpha Movers · last 6 months · 4 Oct 2026: 930 clicks, 285K impressions", width: 1918, height: 883 },
] as const;

const reviewPlatforms = [
  { name: "Trustpilot", detail: "4.0 · 3 reviews", href: siteConfig.trustpilotUrl },
  { name: "Clutch", detail: "5.0 · verified review", href: siteConfig.clutchUrl },
  { name: "Facebook", detail: "100% recommend", href: siteConfig.facebookReviewsUrl },
  { name: "GoodFirms", detail: "Profile", href: siteConfig.goodfirmsUrl },
] as const;

const reviews = [
  { quote: "Their SEO work is excellent and helped bring my business to the first page despite strong competition in Abu Dhabi.", author: "Just Shine Cleaning Services", source: "Trustpilot", logo: "/clients/just-shine.png", initials: "JS" },
  { quote: "They developed my website exactly how I wanted. Their technical skills are strong, and the way they handle UI/UX is outstanding.", author: "Ather Javed", source: "Trustpilot", logo: null, initials: "AJ" },
  { quote: "The team managed the project professionally and efficiently. Their technical expertise, creativity and responsiveness stood out.", author: "CEO, Kamboh Tech Solutions", source: "Clutch", logo: null, initials: "KT" },
] as const;

const faqs = [
  { question: "What does Jadeed Solutions do?", answer: "Jadeed Solutions combines local SEO, Google Ads, conversion-focused websites, mobile applications and reporting into one customer acquisition system for service businesses." },
  { question: "How does pricing work?", answer: "Websites start from £199 and fixed local SEO from £300 a month, with no setup fee and a 6-month minimum. If you would rather pay for results, the Growth Partnership is £0 upfront and 10% of a paid invoice from customers we bring in, on a 6-month initial term, then month to month. Full details are on the pricing page and in our profit-share handbook." },
  { question: "Which businesses are the best fit?", answer: "Local service businesses such as movers, cleaners, plumbers, contractors and other teams that want measurable enquiries and booked jobs rather than disconnected marketing activity." },
  { question: "Do I need Google Ads?", answer: "No. Most clients grow through Google search and their website first. If you want ads later, you fund the spend and we manage the campaigns." },
  { question: "Where is Jadeed Solutions located?", answer: "House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal 51600, Pakistan. We work remotely with clients in the UK, the US, Canada, the UAE and other markets." },
  { question: "Does Jadeed Solutions have independent reviews?", answer: "Yes. Public profiles are on Google Business, Trustpilot, Clutch and Facebook. Each one is linked on this page so you can check the source directly." },
] as const;

export default function Home() {
  const founder = getAuthor();

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${siteConfig.url}/#webpage`, url: siteConfig.url, name: "Jadeed Solutions — local SEO, websites and paid growth", description: "A connected customer acquisition system for local service businesses.", about: { "@id": `${siteConfig.url}/#organization` } },
      {
        "@type": "ItemList",
        name: "Jadeed Solutions services",
        itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Service", name: service.title, description: service.copy, url: `${siteConfig.url}${service.href}`, provider: { "@id": `${siteConfig.url}/#organization` } } })),
      },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    ],
  };

  return (
    <div className="text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* Hero: the live layout the owner likes — full-width illustration, headline below. */}
      <section className="relative h-[280px] overflow-hidden bg-[#37c4e7] sm:h-[420px] lg:h-[480px]">
        <Image src="/performance-marketing-local-businesses.webp" alt="Illustrated journey from a customer's home to a local service business" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[#0B561C]/45 to-[#0B561C] sm:h-40" />
      </section>

      <section className="relative -mt-px bg-[linear-gradient(#0B561C,rgba(11,86,28,0)_70%)] pb-12 md:pb-16">
        <div className="container max-w-[1200px]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-10">
            <h1 className="max-w-4xl text-[42px] leading-[0.96] tracking-[-.045em] min-[420px]:text-[48px] sm:text-[64px] lg:text-[72px]">
              <span className="block lg:whitespace-nowrap">More booked jobs.</span>
              <span className="block text-[#BEF70A] lg:whitespace-nowrap">One growth partner.</span>
            </h1>
            <div className="lg:justify-self-end lg:pb-2">
              <p className="max-w-md text-[17px] leading-7 text-white/80 sm:text-xl">Local SEO, conversion websites and paid acquisition built as one measurable system for service businesses.</p>
              {/* Phone: one lime CTA + a plain text link (Round 4). Desktop: white + lime. */}
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
                <Link href="/contact" className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-[15px] font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] sm:h-12 sm:bg-white sm:hover:bg-white/90">
                  Get a free growth plan
                  <CircleArrow dark />
                </Link>
                <Link href="/case-studies/alpha-movers" className="text-center text-[15px] font-bold text-white underline-offset-4 hover:underline sm:hidden">
                  See client results
                </Link>
                <Link href="/case-studies/alpha-movers" className="group hidden h-12 items-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] sm:inline-flex">
                  See client results
                  <CircleArrow dark />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-9">
            <TickGrid items={heroTicks} />
          </div>

          {/* Proof numbers: big lime, no side lines (idea 044 B + owner note). */}
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-9 lg:grid-cols-4">
            {proof.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-sm leading-5 text-white/70">{item.label}</dt>
                <dd className="order-1 text-[40px] font-semibold leading-none tracking-[-.05em] text-[#BEF70A] sm:text-5xl">
                  <CountUp value={item.value} decimals={"decimals" in item ? item.decimals : 0} prefix={"prefix" in item ? item.prefix : ""} suffix={"suffix" in item ? item.suffix : ""} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Moving strip of trades (idea 005 A). */}
      <section aria-label="Trades we work with" className="border-y border-white/[0.08] py-6">
        <TradesMarquee items={trades} />
      </section>

      {/* Services as a 01–06 list (idea 061 B). */}
      <section className="py-16 md:py-24" aria-labelledby="services-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <Eyebrow>One connected system</Eyebrow>
              <h2 id="services-heading" className="mt-4 max-w-3xl text-[36px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">Six ways we turn searches into booked work.</h2>
            </div>
            <p className="max-w-md leading-7 text-white/70 lg:justify-self-end">Every part shares the same strategy, data and goal — so your marketing works together instead of becoming six separate projects.</p>
          </div>
          <ul className="mt-10 border-t border-white/[0.08]">
            {services.map((s, i) => (
              <li key={s.title} className="border-b border-white/[0.08] py-1.5">
                <Link href={s.href} className="group grid grid-cols-[34px_1fr_auto] items-center gap-4 rounded-[20px] px-4 py-4 transition-colors hover:bg-white/[0.05] sm:grid-cols-[44px_36px_1fr_auto] sm:gap-6 sm:px-6 sm:py-5">
                  <span className="hidden text-sm font-bold tabular-nums text-white/40 sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <HugeiconsIcon icon={s.icon} size={30} className="text-[#BEF70A]" />
                  <span className="min-w-0">
                    <span className="block text-xl font-bold tracking-[-.03em] sm:text-[22px]">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-6 text-white/65">{s.copy}</span>
                  </span>
                  <CircleArrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How you pay: contour lines (007 A), a real receipt (011 B), the calculator (025 B). */}
      <section className="relative overflow-hidden py-16 md:py-24" aria-labelledby="pay-heading">
        <div className="container max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-glow p-6 sm:p-10 lg:p-14">
            <Topo className="-right-36 -top-36" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <Eyebrow>How you pay</Eyebrow>
                <h2 id="pay-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">A fixed monthly plan, or a share of the paid jobs we bring.</h2>
                <p className="mt-5 max-w-xl leading-7 text-white/75">Fixed SEO from £300 a month — no setup fee, 6-month minimum. Or the Growth Partnership: £0 upfront and 10% of paid jobs, on a 6-month start, then month to month. Ad spend, if you want ads, is paid by you to Google.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["No setup fee", "Fee on real bookings", "Ad spend in your name"].map((t) => (
                    <span key={t} className="inline-flex h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 text-[13px] font-semibold">{t}</span>
                  ))}
                </div>
              </div>
              <Receipt title="Job #1042 · Growth Partnership" rows={[["Job value", "£400.00"], ["Our fee (10%)", "£40.00"], ["Setup fee", "£0.00"]]} totalLabel="You keep" total="£360.00" note="Example only — rates are agreed for your trade and job size." />
            </div>
            <div className="relative mt-12 border-t border-white/[0.08] pt-10">
              <FeeCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Jadeed vs agency vs ads (idea 014 B). */}
      <section className="py-16 md:py-20" aria-labelledby="compare-heading">
        <div className="container max-w-[1200px]">
          <Eyebrow>Compare</Eyebrow>
          <h2 id="compare-heading" className="mt-4 max-w-3xl text-[34px] leading-[1.02] tracking-[-.04em] sm:text-5xl">How we're different.</h2>
          <div className="mt-10">
            <CompareTable head={["Jadeed", "Typical agency", "Paying for ads only"]} rows={compareRows} />
          </div>
        </div>
      </section>

      {/* Case study: website + 4 numbers (042 A), clicks rising (047 B), evidence tabs (043 A). */}
      <section className="py-16 md:py-24" aria-labelledby="proof-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <Eyebrow>Verified case study</Eyebrow>
              <h2 id="proof-heading" className="mt-4 max-w-3xl text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">Alpha Movers won 90+ booked jobs from its website in 3 months.</h2>
            </div>
            <p className="max-w-md leading-7 text-white/70 lg:justify-self-end">Search Console captured 19 October shows 885 clicks and 273K impressions over three months. The same three months produced 150+ website enquiries.</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.06] p-5 sm:p-7">
              <BrowserFrame url="alphamovers.co.uk">
                <Image src="/case-studies/alpha-movers/homepage-oct-2026.webp" alt="Alpha Movers homepage built by Jadeed Solutions" width={1200} height={760} className="h-[210px] w-full object-cover object-top" />
              </BrowserFrame>
              <div className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-sm font-extrabold tracking-[.02em] text-[#BEF70A]">AM</span>
                <div>
                  <p className="font-bold">Alpha Movers</p>
                  <p className="text-sm text-white/60">Removals · London & Croydon</p>
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
                {[["90+", "booked jobs"], ["150+", "website enquiries"], ["273K", "search impressions"], ["885", "organic clicks"]].map(([v, l], i) => (
                  <div key={l}>
                    <dd className={`text-[34px] font-semibold leading-none tracking-[-.05em] ${i < 2 ? "text-[#BEF70A]" : ""}`}>{v}</dd>
                    <dt className="mt-1.5 text-sm text-white/65">{l}</dt>
                  </div>
                ))}
              </dl>
              <Link href="/case-studies/alpha-movers" className="group mt-7 inline-flex items-center gap-2.5 text-sm font-bold">
                Read the case study <CircleArrow size="sm" />
              </Link>
            </div>
            <div className="flex flex-col rounded-[26px] border border-white/[0.08] bg-glow p-5 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Alpha Movers · Google clicks</p>
              <p className="mt-2 text-2xl font-bold tracking-[-.03em]">Up and to the right.</p>
              <div className="mt-auto pt-6">
                <ClicksChart badge="+312% clicks" source="Historical: first vs final 28 days · Feb–Aug 2026 · Alpha Movers" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-5 sm:p-7">
            <EvidenceTabs items={evidence} />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="just-shine-results">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Just Shine · Abu Dhabi</Eyebrow>
            <h2 id="just-shine-results" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">370 organic clicks for a local cleaning business in three months.</h2>
            <p className="mt-5 leading-7 text-white/70">22.3K search impressions over three months, with 239 clicks in the last 28 days. Search Console captured 4 October 2026, alongside a website in English and Arabic.</p>
            <Link href="/case-studies/just-shine" className="mt-6 inline-flex items-center gap-3 font-bold text-[#BEF70A]">See Just Shine’s results <CircleArrow size="sm" /></Link>
          </div>
          <Image src="/case-studies/just-shine/homepage-oct-2026.webp" alt="Just Shine Cleaning Services English website built by Jadeed Solutions" width={1600} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full rounded-2xl" />
        </div>
      </section>

      {/* Four steps on a route (idea 053 B). */}
      <section className="py-16 md:py-20" aria-labelledby="steps-heading">
        <div className="container max-w-[1000px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="steps-heading" className="mt-4 max-w-3xl text-[34px] leading-[1.02] tracking-[-.04em] sm:text-5xl">From first chat to booked jobs.</h2>
          <div className="mt-10">
            <RouteSteps steps={steps} />
          </div>
          <p className="mt-6">
            <Link href="/how-it-works" className="group inline-flex items-center gap-2.5 text-sm font-bold">
              See the full process <CircleArrow size="sm" />
            </Link>
          </p>
        </div>
      </section>

      {/* Client's own words with the pill (idea 045 A + owner note). */}
      <section className="py-16 md:py-24" aria-label="Client testimonial">
        <div className="container max-w-[1200px]">
          <BigQuote
            pill="10% after bookings"
            quote="Monthly SEO fees were hard for us. Paying 10% after bookings was the model that made sense — and Jadeed delivered the full stack: website, app, SEO and ads."
            name="Abdullah Bin Mustafa"
            role="Alpha Movers · London"
          />
        </div>
      </section>

      {/* Rating pill + review platforms (idea 046 A), then public reviews. */}
      <section className="py-16 md:py-20" aria-labelledby="reviews-heading">
        <div className="container max-w-[1200px]">
          <Eyebrow>Independent proof</Eyebrow>
          <h2 id="reviews-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] sm:text-5xl">Don’t take our word for it.</h2>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.06] py-2 pl-2 pr-5 transition-colors hover:bg-white/[0.09]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white">
                <GoogleLogo className="h-6 w-6" />
              </span>
              <span>
                <span className="flex items-center gap-2">
                  <b className="text-2xl tracking-[-.03em]">5.0</b>
                  <span className="text-[#BEF70A]" aria-label="5 stars">★★★★★</span>
                </span>
                <span className="block text-xs text-white/60">from 35 Google reviews</span>
              </span>
            </a>
            {reviewPlatforms.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 text-sm transition-colors hover:bg-white/[0.09]">
                <b>{p.name}</b>
                <span className="text-white/60">{p.detail}</span>
                <HugeiconsIcon icon={ArrowUpRightIcon} size={14} className="text-white/50" />
              </a>
            ))}
          </div>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.author} className="flex flex-col rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 md:p-7">
                <span className="text-[44px] leading-none text-[#BEF70A]" aria-hidden="true">“</span>
                <blockquote className="mt-1 text-lg leading-7 tracking-[-.015em]">{review.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                  {review.logo ? (
                    <Image src={review.logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg" />
                  ) : (
                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-sm font-bold text-[#BEF70A]">{review.initials}</span>
                  )}
                  <div>
                    <div className="font-bold">{review.author}</div>
                    <div className="mt-0.5 text-xs text-white/60">Public review on {review.source}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Founder card (idea 041 A). */}
      <section className="py-16 md:py-24" aria-labelledby="founder-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-8 rounded-[30px] border border-white/[0.08] bg-white/[0.05] p-5 sm:p-8 md:grid-cols-[.8fr_1.2fr] md:items-center lg:gap-14 lg:p-12">
            <Image src={founder.avatar} alt={`${founder.name}, founder of Jadeed Solutions`} width={1024} height={1024} sizes="(min-width: 768px) 440px, 100vw" className="aspect-square w-full rounded-[22px] object-cover" />
            <div>
              <Eyebrow>Who you'll talk to</Eyebrow>
              <h2 id="founder-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">A founder who measures success in booked jobs.</h2>
              <p className="mt-6 text-lg font-bold">
                {founder.name} <span className="font-normal text-white/60">· Founder &amp; CEO</span>
              </p>
              <p className="mt-3 max-w-xl leading-7 text-white/75">{founder.bio}</p>
              <p className="hand mt-4 text-[26px] leading-none text-[#BEF70A]">your call is with me ↗</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/sameer-ahmad-basra" className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
                  Read Sameer’s story <CircleArrow dark />
                </Link>
                <a href="https://pk.linkedin.com/in/sameer-ahmad-basra" target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-6 text-sm font-bold transition-colors hover:bg-white/[0.14]">
                  <HugeiconsIcon icon={LinkedinIcon} size={18} /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote team, in the open: digital clocks (idea 048) + the office map. */}
      <section className="py-16 md:py-20" aria-labelledby="location-heading">
        <div className="container max-w-[1200px]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <Eyebrow>Transparent remote partnership</Eyebrow>
              <h2 id="location-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] [text-wrap:balance] sm:text-5xl">Based in Narowal. Working on your clock.</h2>
            </div>
            <p className="max-w-md leading-7 text-white/70 lg:justify-self-end">A small remote team in Pakistan, working with local service businesses in the UK, US, Canada and UAE. Calls are booked in your time zone.</p>
          </div>
          <div className="mt-10">
            <WorldClocks />
          </div>
          <div className="mt-4 grid overflow-hidden rounded-[26px] border border-white/[0.08] bg-white/[0.05] lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Our business location</p>
              <address className="mt-3 not-italic leading-7 text-white/85">{siteConfig.address}</address>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#BEF70A] px-6 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
                  <HugeiconsIcon icon={WhatsappIcon} size={20} /> Message us on WhatsApp
                </a>
                <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-6 text-sm font-bold hover:bg-white/[0.14]">
                  Review us on Google <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                </a>
              </div>
            </div>
            <iframe src={siteConfig.googleMapsEmbedUrl} title="Jadeed Solutions office in Pejowali Kalan, Narowal" width="600" height="450" className="h-[300px] w-full border-0 [filter:invert(.9)_hue-rotate(160deg)_saturate(.7)] lg:h-full lg:min-h-[340px]" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
        </div>
      </section>

      {/* FAQ: heading left, questions right (idea 072 A). */}
      <section className="py-16 md:py-24" aria-labelledby="faq-heading">
        <div className="container max-w-[1100px]">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Clear answers</Eyebrow>
              <h2 id="faq-heading" className="mt-4 text-[34px] leading-[1.02] tracking-[-.04em] sm:text-4xl">Questions owners ask first.</h2>
              <p className="mt-6">
                <Link href="/pricing" className="group inline-flex items-center gap-2.5 text-sm font-bold">
                  See full pricing <CircleArrow size="sm" />
                </Link>
              </p>
            </div>
            <FaqList items={faqs.map((f) => ({ ...f }))} />
          </div>
        </div>
      </section>

    </div>
  );
}
