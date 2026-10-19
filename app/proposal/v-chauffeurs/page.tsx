import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRightIcon,
  BookIcon,
  CodeIcon,
  FileIcon,
  HugeiconsIcon,
  LayersIcon,
  LocationIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  TrendingUpIcon,
  VideoIcon,
  WhatsappIcon,
  type IconSvgElement,
} from "@/components/icons";
import { ButtonLink, FaqCards, PageHero, Section, StatRow } from "@/components/site/ui";
import { siteConfig } from "@/lib/site";
import { clientReviews, googleAggregate, trustpilotAggregate } from "@/lib/reviews";
import { FAQS } from "@/components/proposal/vchauffeurs/data";
import { Nav } from "@/components/proposal/vchauffeurs/Nav";
import { Ecosystem } from "@/components/proposal/vchauffeurs/Ecosystem";
import { Previews } from "@/components/proposal/vchauffeurs/Previews";
import { PublicationLanes, Roadmap } from "@/components/proposal/vchauffeurs/Roadmap";
import { Calculator, PlanCards } from "@/components/proposal/vchauffeurs/Pricing";
import { FirstThreeMonths, PaymentTypes } from "@/components/proposal/vchauffeurs/Investment";
import { AskAiCallout } from "@/components/proposal/vchauffeurs/AskAi";
import { HeroComposition } from "@/components/proposal/vchauffeurs/Mockups";
import { CARD, Cross, Head, LABEL, Num, SOFT, Tick } from "@/components/proposal/vchauffeurs/ui";
import "./vc.css";

/* Private, unlisted proposal for V Chauffeurs (UK). Not indexed and not in the
   sitemap. Built only from the site design system (components/site/ui, icons,
   globals). All business facts live in components/proposal/vchauffeurs/data.ts. */

export const metadata: Metadata = {
  title: "V Chauffeurs · Partnership Proposal",
  description: "A 24-month digital development and growth partnership proposal for V Chauffeurs.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

/* ---------- Content that only this page uses ---------- */

const USUAL = [
  ["Web design agency", "Website build invoice"],
  ["App developer", "Separate app development fee"],
  ["SEO agency", "Setup fee, then a monthly retainer"],
  ["Social and video studio", "Own tools and subscriptions"],
  ["Maintenance contractor", "Paid per fix, explained from scratch"],
];

const ALL_IN_ONE = [
  "Premium website",
  "Online booking and enquiries",
  "Android and iPhone customer apps",
  "Chauffeur app",
  "Admin dashboard",
  "SEO and local search",
  "AI search optimisation",
  "Social media and video",
  "Research and growth strategy",
  "Maintenance and technical support",
];

const OUTCOMES = [
  ["Website development", "A professional presence customers can trust from the first visit."],
  ["Booking platform", "A more organised way to receive, quote and confirm bookings."],
  ["Customer and chauffeur apps", "Convenient booking for customers and clear journeys for drivers."],
  ["SEO and AI search", "Better chances of being found by people already looking for a chauffeur."],
  ["Automation and dashboard", "Less repetitive admin, and one place to see the whole operation."],
  ["Ongoing support", "A dependable system maintained and improved by the team that built it."],
];

const SEO_STAGES = [
  ["Build", "SEO structure built into the website from the start, not added later."],
  ["Optimise", "Technical, service and local pages tuned to genuine search intent."],
  ["Become discoverable", "Consistent business information for Google, Maps and AI search."],
  ["Measure", "Search Console and analytics show what people search and find."],
  ["Improve", "Expand what works, fix what doesn't, respond to competitors."],
];

const SEO_PILLARS: { icon: IconSvgElement; title: string; items: string[] }[] = [
  { icon: CodeIcon, title: "Technical SEO", items: ["Search-friendly architecture", "Titles, descriptions and headings", "Sitemap, indexing and canonicals", "Speed, mobile usability and structured data"] },
  { icon: FileIcon, title: "Service SEO", items: ["Dedicated pages for confirmed services", "Real customer questions answered", "Vehicle and booking information optimised"] },
  { icon: LocationIcon, title: "Local SEO", items: ["Genuinely served, approved locations", "Google Business Profile, where eligible", "Consistent listings and local content"] },
  { icon: SparklesIcon, title: "Content and authority", items: ["Keyword and competitor research", "Useful business and travel content", "Authority-building opportunities"] },
];

const VIDEO_THEMES = ["Airport transfers", "Corporate travel", "The fleet", "The customer experience"];

const ONGOING: { icon: IconSvgElement; title: string; items: string[] }[] = [
  { icon: LayersIcon, title: "Website and app support", items: ["Maintain functionality and fix issues", "Updates, performance and reliability", "Improve features and add agreed ones"] },
  { icon: SearchIcon, title: "SEO and AI visibility", items: ["Monitor rankings and competitors", "Update and expand content", "Maintain local search information"] },
  { icon: BookIcon, title: "Business research", items: ["New service-related searches", "Booking and conversion improvements", "Emerging AI and new channels"] },
  { icon: TrendingUpIcon, title: "Monthly reporting", items: ["Traffic, visibility and enquiries", "Confirmed bookings and their sources", "Work completed and next opportunities"] },
];

const FUNNEL = [
  ["Found", "How many customers are finding V Chauffeurs?"],
  ["Enquired", "How many send an enquiry?"],
  ["Booked", "How many enquiries become confirmed bookings?"],
  ["Earned", "How much revenue comes from tracked digital bookings, and from which channels?"],
  ["Kept", "What does acquiring a customer cost, and what profit remains?"],
];

const REASONS = [
  ["Lower initial pressure", "No large upfront development invoice. Our fees are spread across the relationship."],
  ["Continuity", "The team that builds the system keeps maintaining it, so nothing needs re-explaining to new providers."],
  ["Long-term SEO and brand", "Visibility builds over time. We refine early work and expand what performs, using real data."],
  ["Shared interests", "We want the platform to perform, because its success is what sustains the partnership."],
];

const PHASES = [
  { tag: "Phase 1 · Months 1–3", name: "Foundation and launch", text: "The development-intensive period: website live, apps, dashboard and the main SEO implementation." },
  { tag: "Phase 2 · Months 4–24", name: "Growth and optimisation", text: "SEO improvements, content, monthly videos, system enhancements and customer acquisition, guided by real data." },
  { tag: "Phase 3 · Throughout, and at month 24", name: "Long-term digital support", text: "Maintenance, research and steady improvement all the way through, then a joint review of results and renewal by mutual agreement." },
];

const WE_DO = [
  "Website and booking platform",
  "Customer and chauffeur apps",
  "Admin dashboard",
  "Technical SEO and AI search",
  "Approved branding and design",
  "Social media and video",
  "Maintenance and improvements",
  "Research and reporting",
];

const YOU_DO = [
  "Vehicles and fleet operations",
  "Chauffeur recruitment and management",
  "Customer service and communication",
  "Journey fulfilment",
  "Prices, quotations and refunds",
  "Licences and insurance",
  "Operational decisions and service quality",
  "Business information and approvals",
];

const COUNTS = [
  "A completed and paid booking",
  "From our agreed digital channels",
  "A repeat booking by a customer we brought in, during the partnership",
  "A multi-day booking, counted once",
];
const DOESNT = ["A cancelled booking", "An unpaid booking", "Existing customers won independently of our channels", "Each extra day of a multi-day booking"];

const INCLUDED = [
  "Website, booking system, apps and dashboard (agreed core features)",
  "SEO setup and ongoing SEO",
  "AI search optimisation",
  "Our SEO research and design tools",
  "Four AI-produced promotional videos a month",
  "Maintenance, technical support and monthly reporting",
];

type Cost = { name: string; price: string; kind: "One-time" | "Yearly" | "Monthly" | "Usage-based" | "Optional"; note: string };
const THIRD_PARTY: Cost[] = [
  { name: "Claude Max 20x", price: "$200 / month", kind: "Monthly", note: "Months 1–3 only, for the intensive build. $600 in total." },
  { name: "Claude Pro", price: "$20 / month", kind: "Monthly", note: "From month 4. Supports our workflow; it does not pay for rankings." },
  { name: "Google Play developer account", price: "$25 once", kind: "One-time", note: "Registered under the business's control." },
  { name: "Apple Developer Program", price: "$99 / year", kind: "Yearly", note: "Membership controlled by the business." },
  { name: "Website domain", price: "Registrar price", kind: "Yearly", note: "Your asset. We handle the technical connection." },
  { name: "Hosting, Firebase and database", price: "Low at first", kind: "Usage-based", note: "Expected to be low initially, but no fixed maximum is promised." },
  { name: "Booking emails and WhatsApp", price: "Free allowances first", kind: "Usage-based", note: "Resend free tier and WhatsApp Business app. Paid API options discussed first." },
  { name: "Maps, SMS, payments, live AI", price: "Only if needed", kind: "Usage-based", note: "Requirement, expected cost and alternatives explained before enabling." },
  { name: "Google Ads or Meta ads", price: "Your budget", kind: "Optional", note: "Not compulsory. Funded separately and approved in advance." },
];

const NEXT = [
  "Review the completed business questionnaire",
  "Confirm services, fleet, operating areas, booking procedures and licensing",
  "Agree the final brand direction and core system requirements",
  "Confirm the domain, subscriptions and payment arrangements",
  "Receive the first monthly payment and initial subscription funds",
  "Begin development as soon as access and information are available",
];

/* Reviews shown in the proof section. Two come from lib/reviews.ts (kept in sync with the
   site); the Just Shine review is the client's own Trustpilot review (16 Apr 2026), lightly
   shortened. */
const pick = (name: string) => clientReviews.find((r) => r.name === name);
const PROOF_REVIEWS = [
  {
    name: "Just Shine Cleaning Services",
    source: "Trustpilot",
    quote:
      "They managed my social media and created a beautiful website for Just Shine Cleaning Services. Their SEO work helped bring my business to the first page despite strong competition in Abu Dhabi.",
  },
  ...["FLY FLEET DISPATCHERS", "Ather Javed"].flatMap((n) => {
    const r = pick(n);
    return r ? [{ name: r.name, source: r.source, quote: r.quote }] : [];
  }),
];

/* ---------- Page ---------- */

export default function VChauffeursProposal() {
  return (
    <div className="vc">
      {/* ---------------- Hero ---------------- */}
      <div id="overview">
        <PageHero
          eyebrow="Private partnership proposal"
          title={
            <>
              One connected digital business for <span className="text-[#BEF70A]">V Chauffeurs</span>.
            </>
          }
          lead="Website, booking system, customer and chauffeur apps, admin dashboard, SEO, AI search and marketing, delivered by one team over 24 months with no setup or development fee."
          actions={
            <>
              <ButtonLink href="#pricing">Explore partnership options</ButtonLink>
              <ButtonLink href="#plan" variant="outlineLight">
                See the 90-day plan
              </ButtonLink>
            </>
          }
          aside={
            <figure className={`${SOFT} px-4 py-8 sm:px-6 sm:py-10`}>
              <HeroComposition />
              <figcaption className="mt-6 text-center text-[13px] text-white/55">Concept of the planned customer app · brand to be approved</figcaption>
            </figure>
          }
        >
          <div className="mt-12 border-t border-white/[0.08] pt-8">
            <StatRow
              items={[
                { value: "24 mo", label: "Proposed partnership" },
                { value: "£0", label: "Setup or development fee" },
                { value: "1 mo", label: "Website live target" },
                { value: "3 mo", label: "Core system target" },
              ]}
            />
          </div>
        </PageHero>
      </div>

      <Nav />

      {/* ---------------- Why different ---------------- */}
      <Section tone="green">
        <Head
          eyebrow="Executive summary"
          title="One coordinated partnership, not five separate providers."
          intro="Most new businesses pay one company for a website, another for apps, another for SEO, and more for marketing and maintenance. We bring all of it into one long-term partnership, and spread our fees across it instead of asking for a large upfront payment."
        />
        <div className="vc-reveal mt-12 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-6">
          <div className={`${SOFT} p-5 sm:p-7`}>
            <p className={`${LABEL} text-white/60`}>The usual way</p>
            <ul className="mt-5 grid gap-2">
              {USUAL.map(([who, cost]) => (
                <li key={who} className="flex flex-col gap-0.5 rounded-2xl bg-white/[0.05] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <span className="font-semibold">{who}</span>
                  <span className="text-sm text-white/60">{cost}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center" aria-hidden="true">
            <span className="grid h-12 w-12 rotate-90 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12] lg:rotate-0">
              <HugeiconsIcon icon={ArrowRightIcon} size={18} />
            </span>
          </div>
          <div className="rounded-[22px] border border-[#BEF70A] bg-white/[0.07] p-5 sm:p-7">
            <p className={`${LABEL} text-[#BEF70A]`}>With Jadeed Solutions</p>
            <p className="mt-3 font-display text-[28px] font-bold leading-[1.12] tracking-[-.015em]">One partner. One monthly fee. £0 setup.</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {ALL_IN_ONE.map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------- What we build ---------------- */}
      <Section id="build">
        <Head
          eyebrow="What we build"
          title="One system. Every part connected."
          intro="The booking system sits at the centre. The website, customer app, chauffeur app and admin dashboard all read from it and write to it, so a booking made anywhere is visible everywhere. Select any part to see what it does."
        />
        <div className="mt-12">
          <Ecosystem />
        </div>

        <div className="mt-20 lg:mt-28">
          <Head eyebrow="Planned interfaces" title="See what customers, chauffeurs and your office will use." />
          <div className="mt-10">
            <Previews />
          </div>
        </div>
      </Section>

      {/* ---------------- Proof: real, verified work (lib/case-studies.ts, lib/reviews.ts) ---------------- */}
      <Section id="proof" tone="green">
        <Head
          eyebrow="Proof, not promises"
          title="We have built this kind of system before."
          intro="Real work for real service businesses: websites, booking apps, admin tools and SEO. These are other clients' results, not a forecast for V Chauffeurs."
        />

        {/* 1 · Website + SEO: Alpha Movers */}
        <div className="vc-reveal mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
          <figure>
            <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#051B1E]">
              <div className="flex items-center gap-1.5 px-4 py-3" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.18]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.18]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.18]" />
              </div>
              <Image
                src="/case-studies/alpha-movers/homepage-oct-2026.webp"
                alt="Alpha Movers homepage, designed and built by Jadeed Solutions"
                width={1896}
                height={877}
                sizes="(min-width: 1024px) 640px, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-white/55">Alpha Movers, London removals · website, mobile app, SEO and ads by Jadeed Solutions</figcaption>
          </figure>
          <div>
            <StatRow
              columns={2}
              items={[
                { value: "90+", label: "Booked jobs from the website", note: "Jul–Oct 2026" },
                { value: "150+", label: "Website enquiries", note: "Jul–Oct 2026" },
                { value: "273K", label: "Google impressions", note: "Last 3 months · 19 Oct 2026" },
                { value: "885", label: "Organic clicks", note: "Last 3 months · 19 Oct 2026" },
              ]}
            />
            <figure className="mt-8">
              <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-white p-2">
                <Image
                  src="/case-studies/alpha-movers/gsc-3-months-19-oct-2026.webp"
                  alt="Alpha Movers Google Search Console, last 3 months, captured 19 October 2026: 885 clicks and 273K impressions"
                  width={1902}
                  height={865}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 text-[13px] text-white/55">Google Search Console screenshot · captured 19 October 2026</figcaption>
            </figure>
            <div className="mt-6">
              <ButtonLink href="/case-studies/alpha-movers" variant="outlineLight">
                Read the Alpha Movers case study
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* 2 · A booking app we built: the same building blocks V Chauffeurs needs */}
        <div className="vc-reveal mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className={`${LABEL} text-[#BEF70A]`}>A booking app we built</p>
            <h3 className="mt-3 text-[28px] leading-[1.1] sm:text-4xl">Booking, assigning and tracking, already working for a UAE service business.</h3>
            <p className="mt-4 leading-7 text-white/[0.72]">IHR Dream Cleaning&apos;s app (Abu Dhabi): customers book in three steps, and the office assigns staff, sees payment status and knows where each booking came from.</p>
            <ul className="mt-6 grid gap-2.5">
              {[
                "Step-by-step booking: what, when, where",
                "Assign a team member to each booking",
                "Paid / unpaid and assigned / not assigned at a glance",
                "Booking source tracked (for example, Website)",
              ].map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
            <p className="mt-6 rounded-[18px] bg-[#BEF70A]/[0.08] p-4 text-[15px] leading-6 text-white/85">
              <strong className="font-bold text-white">For V Chauffeurs:</strong> the same blocks become journey booking, assigning a chauffeur, payment status and booking sources.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { src: "/case-studies/apps/cleaning-booking-flow.webp", alt: "Customer booking screen of the IHR Dream Cleaning app built by Jadeed Solutions", cap: "Customer: book a service" },
              { src: "/case-studies/apps/cleaning-bookings-admin.webp", alt: "Bookings management screen of the IHR Dream Cleaning app built by Jadeed Solutions, customer details blurred", cap: "Office: assign and track" },
            ].map((s, i) => (
              <figure key={s.src} className={i === 1 ? "mt-10" : ""}>
                <div className="overflow-hidden rounded-[28px] border-[6px] border-[#051B1E] bg-[#051B1E] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
                  <Image src={s.src} alt={s.alt} width={576} height={1280} sizes="(min-width: 1024px) 260px, 45vw" className="h-auto w-full rounded-[22px]" />
                </div>
                <figcaption className="mt-3 text-center text-[13px] text-white/60">{s.cap}</figcaption>
              </figure>
            ))}
            <p className="col-span-2 text-center text-xs text-white/45">Real app screenshots · customer names and addresses blurred for privacy</p>
          </div>
        </div>

        {/* 3 · What clients say */}
        <div className="vc-reveal mt-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${LABEL} text-[#BEF70A]`}>What clients say</p>
              <h3 className="mt-3 text-[28px] leading-[1.1] sm:text-4xl">Rated by the businesses we work with.</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={googleAggregate.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-bold transition-colors hover:bg-white/[0.14]">
                <span className="inline-flex items-center gap-1 text-[#BEF70A]"><HugeiconsIcon icon={StarIcon} size={15} variant="Bold" /> {googleAggregate.score}</span> Google · {googleAggregate.count} reviews
              </a>
              <a href={trustpilotAggregate.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-bold transition-colors hover:bg-white/[0.14]">
                <span className="inline-flex items-center gap-1 text-[#BEF70A]"><HugeiconsIcon icon={StarIcon} size={15} variant="Bold" /> {trustpilotAggregate.score}</span> Trustpilot · {trustpilotAggregate.count} reviews
              </a>
            </div>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {PROOF_REVIEWS.map((r) => (
              <li key={r.name} className={`flex flex-col ${CARD} p-6`}>
                <p className="flex gap-0.5 text-[#BEF70A]" role="img" aria-label="5 out of 5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} size={16} variant="Bold" />
                  ))}
                </p>
                <blockquote className="mt-3 flex-1 leading-7 text-white/85">“{r.quote}”</blockquote>
                <p className="mt-5 font-bold">{r.name}</p>
                <p className="text-sm text-white/55">{r.source} review</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------- Outcomes ---------------- */}
      <Section tone="green">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <Head eyebrow="The outcome" title="What V Chauffeurs gets out of this." intro="Each piece of technology is there for a business reason. Here is what it means in practice." />
          </div>
          <ol className="border-t border-white/[0.08]">
            {OUTCOMES.map(([from, to], i) => (
              <li key={from} className="vc-reveal grid gap-2 border-b border-white/[0.08] py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6 sm:py-8">
                <span className="vc-num text-3xl font-semibold leading-none tracking-[-.05em] text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className={`${LABEL} text-white/55`}>{from}</p>
                  <p className="mt-2 text-xl font-semibold leading-snug tracking-[-.02em] sm:text-2xl">{to}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------- 90-day plan ---------------- */}
      <Section id="plan">
        <Head
          eyebrow="The first 90 days"
          title="Website live in month one. Core system complete by month three."
          intro="Development and the main SEO implementation happen together, so the website never needs rebuilding for search engines later."
        />
        <div className="mt-12">
          <Roadmap />
        </div>
        <div className="vc-reveal mt-12">
          <PublicationLanes />
        </div>
      </Section>

      {/* ---------------- SEO & AI ---------------- */}
      <Section id="seo" tone="green">
        <Head
          eyebrow="Search and AI visibility"
          title="Built to be found, then improved every month."
          intro="People look for chauffeurs on Google, on Maps, and increasingly by asking AI tools. Our SEO work starts while the website is being built, and continues for the whole partnership."
        />

        <ol className="vc-reveal mt-12 grid gap-3 lg:grid-cols-5">
          {SEO_STAGES.map(([t, d], i) => (
            <li key={t} className={`flex gap-4 ${SOFT} p-5 lg:block lg:p-6`}>
              <Num n={i + 1} />
              <div className="lg:mt-5">
                <h3 className="text-xl tracking-[-.03em]">{t}</h3>
                <p className="mt-1.5 text-[15px] leading-6 text-white/[0.72]">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-white/60">Step 5 feeds back into step 2, every month of the partnership.</p>

        {/* Progressive disclosure: the four areas stay scannable, the full checklist is one tap away. */}
        <details className="group mt-12 rounded-[22px] border border-white/[0.08] bg-white/[0.06] open:bg-white/[0.07]">
          <summary className="flex cursor-pointer list-none flex-col gap-4 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between [&::-webkit-details-marker]:hidden">
            <ul className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
              {SEO_PILLARS.map(({ icon, title }) => (
                <li key={title} className="flex items-center gap-2.5 font-bold">
                  <HugeiconsIcon icon={icon} size={24} className="text-[#BEF70A]" />
                  {title}
                </li>
              ))}
            </ul>
            <span className="inline-flex h-10 w-fit shrink-0 items-center gap-2 rounded-full bg-[#BEF70A]/[0.13] px-4 text-sm font-bold text-[#BEF70A]">
              <span className="group-open:hidden">See the full SEO checklist</span>
              <span className="hidden group-open:inline">Hide the checklist</span>
              <HugeiconsIcon icon={PlusIcon} size={14} className="transition-transform group-open:rotate-45" />
            </span>
          </summary>
          <div className="grid gap-6 border-t border-white/[0.08] p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
            {SEO_PILLARS.map(({ title, items }) => (
              <div key={title}>
                <h3 className="text-lg">{title}</h3>
                <ul className="mt-3 grid gap-2.5">
                  {items.map((it) => (
                    <Tick key={it}>{it}</Tick>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className={`vc-reveal ${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-[#BEF70A]`}>AI search optimisation</p>
            <h3 className="mt-3 text-2xl leading-snug tracking-[-.03em]">Clear enough for Google, AI Overviews and ChatGPT search to understand.</h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {["Consistent business information", "Well-organised service and area content", "Relevant structured data", "Direct answers to real questions", "Accurate brand details across platforms", "Updates as search technology changes"].map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-white/60">AI optimisation improves how well your business is understood. It cannot guarantee inclusion, recommendations or rankings in third-party AI systems.</p>
          </div>
          <div className={`vc-reveal ${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-[#BEF70A]`}>When to expect results</p>
            <ol className="mt-5 grid gap-5">
              {[
                ["Months 1–3", "Foundations built and implemented."],
                ["Following months", "First visibility changes may become measurable."],
                ["Longer term", "Competitive rankings and steady organic bookings can take considerably longer."],
              ].map(([w, d], i) => (
                <li key={w} className="grid grid-cols-[14px_minmax(0,1fr)] gap-4">
                  <span className={`mt-1.5 h-3.5 w-3.5 rounded-full ${i === 0 ? "bg-[#BEF70A]" : i === 1 ? "bg-[#BEF70A]/50" : "bg-white/[0.18]"}`} aria-hidden="true" />
                  <div>
                    <p className="font-bold">{w}</p>
                    <p className="mt-0.5 text-[15px] leading-6 text-white/[0.72]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/[0.08] pt-4 text-sm leading-6 text-white/75">
              <strong className="font-bold text-white">No responsible provider can guarantee first position on Google.</strong> We aim for strong, sustainable visibility, not temporary rankings.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- Marketing & video ---------------- */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Head eyebrow="Brand, marketing and video" title="Four promotional videos, every month." intro="About 30 seconds each, made with our existing AI video tools at no extra subscription cost to you, and always showing your real services and vehicles." />
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {["Digital branding and design guidance", "Social profile setup and optimisation", "Social content planning", "Promotional graphic design", "Business and service content", "Marketing research and recommendations"].map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
          </div>
          <div className="vc-reveal">
            <ul className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Example video themes">
              {VIDEO_THEMES.map((t, i) => (
                <li key={t} className="flex flex-col">
                  <div className={`flex aspect-[9/16] flex-col justify-between rounded-[18px] p-2.5 sm:p-4 ${i === 0 ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.06] text-white"}`}>
                    <HugeiconsIcon icon={VideoIcon} size={22} className={i === 0 ? "" : "text-[#BEF70A]"} />
                    <span className="text-[11px] font-bold leading-tight sm:text-sm">{t}</span>
                  </div>
                  <span className="vc-num mt-2 text-center text-xs text-white/55">~0:30</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-white/55">Example themes. Topics are agreed with you each month.</p>
          </div>
        </div>
      </Section>

      {/* ---------------- After 90 days + measuring success ---------------- */}
      <Section tone="green">
        <Head eyebrow="After the first three months" title="Built, then kept sharp." intro="Once the system is launched, the work shifts to maintaining, improving and expanding it. Rankings are never permanent; ongoing work keeps V Chauffeurs competitive." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ONGOING.map(({ icon, title, items }) => (
            <div key={title} className={`vc-reveal ${CARD} p-6 md:p-7`}>
              <HugeiconsIcon icon={icon} size={30} className="text-[#BEF70A]" />
              <h3 className="mt-6 text-xl tracking-[-.03em]">{title}</h3>
              <ul className="mt-4 grid gap-2.5">
                {items.map((it) => (
                  <Tick key={it}>{it}</Tick>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`vc-reveal mt-3 ${CARD} p-5 sm:p-8 lg:p-10`}>
          <div className="max-w-[660px]">
            <p className={`${LABEL} text-[#BEF70A]`}>How we will measure success</p>
            <h3 className="mt-2 text-2xl leading-snug tracking-[-.03em] sm:text-[28px]">Not traffic for its own sake. The questions your monthly report answers.</h3>
          </div>
          <ol className="mt-8 grid gap-2">
            {FUNNEL.map(([stage, q], i) => (
              <li key={stage} className="grid grid-cols-[112px_minmax(0,1fr)] items-stretch gap-3 sm:grid-cols-[minmax(0,32%)_minmax(0,1fr)] sm:gap-6">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center rounded-full bg-[#BEF70A] px-2 py-3 text-[15px] font-bold text-[#0B1F12]" style={{ width: `${100 - i * 11}%` }}>
                    {stage}
                  </div>
                </div>
                <p className="flex items-center text-[15px] leading-6 text-white/85 sm:text-base">{q}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm leading-6 text-white/60">
            V Chauffeurs is a new business, so we will not promise a booking number or a return before real data exists. Once genuine booking data is available, the return can be calculated accurately.
          </p>
        </div>
      </Section>

      {/* ---------------- 24-month partnership ---------------- */}
      <Section id="partnership">
        <Head
          eyebrow="Why 24 months"
          title="Building the platform is only the beginning."
          intro="A new chauffeur business needs time to build its reputation, appear in searches and learn which channels work. Twenty-four months supports affordability, continuity and long-term planning, without locking you into something unproductive."
        />

        <div className="vc-reveal mt-12">
          <ol className="grid grid-cols-12 gap-1 lg:grid-cols-[repeat(24,minmax(0,1fr))]" aria-hidden="true">
            {Array.from({ length: 24 }, (_, m) => (
              <li key={m} className={`h-9 rounded-lg ${m < 3 ? "bg-[#BEF70A]" : m === 23 ? "border-2 border-[#BEF70A]" : "bg-white/[0.1]"}`} />
            ))}
          </ol>
          <div className="vc-num mt-2 flex justify-between text-[13px] text-white/55" aria-hidden="true">
            <span>Month 1</span>
            <span className="hidden lg:inline">Month 12</span>
            <span>Month 24</span>
          </div>

          <ol className="mt-10 grid gap-3 lg:grid-cols-3">
            {PHASES.map((p, i) => (
              <li key={p.tag} className={`${CARD} p-6 md:p-7`}>
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-6 rounded-sm ${i === 0 ? "bg-[#BEF70A]" : i === 1 ? "bg-white/[0.2]" : "border-2 border-[#BEF70A]"}`} aria-hidden="true" />
                  <span className={`${LABEL} text-[#BEF70A]`}>{p.tag}</span>
                </div>
                <h3 className="mt-4 text-xl tracking-[-.03em]">{p.name}</h3>
                <p className="mt-2 leading-7 text-white/[0.72]">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-14 grid gap-x-12 border-t border-white/[0.08] sm:grid-cols-2">
          {REASONS.map(([t, d], i) => (
            <li key={t} className="vc-reveal border-b border-white/[0.08] py-6">
              <p className="vc-num text-sm font-bold text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl tracking-[-.03em]">{t}</h3>
              <p className="mt-1.5 leading-7 text-white/[0.72]">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------- Working relationship + ownership ---------------- */}
      <Section tone="green">
        <Head eyebrow="Our working relationship" title="Clear roles. Your business stays yours." intro="We build and support the digital infrastructure. We will not act as your transport operator or take over customer journeys." />
        <div className="vc-reveal mt-12 grid gap-3 lg:grid-cols-2">
          <div className={`${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-[#BEF70A]`}>Jadeed Solutions handles</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {WE_DO.map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
          </div>
          <div className={`${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-white/60`}>V Chauffeurs handles</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
              {YOU_DO.map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 max-w-[760px] leading-7 text-white/[0.72]">
          During setup we will need your business information, brand material, operating details, access and timely decisions. After launch we manage the technical and marketing work independently, and consult you on important changes.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="vc-reveal">
            <h3 className="text-2xl tracking-[-.03em]">Ownership and access</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className={`${SOFT} p-5`}>
                <p className="text-sm font-bold text-[#BEF70A]">Always yours</p>
                <ul className="mt-3 grid gap-2">
                  {["Business information", "Customer records", "Your domain", "Company-owned service accounts"].map((s) => (
                    <Tick key={s}>{s}</Tick>
                  ))}
                </ul>
              </div>
              <div className={`${SOFT} p-5`}>
                <p className="text-sm font-bold text-white/70">Stays with us</p>
                <ul className="mt-3 grid gap-2">
                  {["Our agency subscriptions", "Our reusable internal tools"].map((s) => (
                    <Tick key={s}>{s}</Tick>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-6 text-white/[0.72]">
              You get the booking and admin tools you need to operate. If you ask for more access or the partnership ends, we coordinate a reasonable handover of the agreed materials, credentials and data.
            </p>
          </div>
          <div className="vc-reveal">
            <h3 className="text-2xl tracking-[-.03em]">If circumstances change</h3>
            <ol className="mt-5 grid gap-2">
              {["Discuss the situation openly", "Give reasonable advance communication", "Review any outstanding payments", "Arrange an orderly transition where needed"].map((s, i) => (
                <li key={s} className={`flex items-center gap-4 ${SOFT} px-4 py-3`}>
                  <Num n={i + 1} solid={false} />
                  <span className="text-[15px]">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[15px] leading-6 text-white/[0.72]">No complicated commercial penalties. We want you to stay because of the value, not because you fear losing access to your own business.</p>
          </div>
        </div>
      </Section>

      {/* ---------------- Pricing ---------------- */}
      <Section id="pricing">
        <Head
          eyebrow="Choose your partnership model"
          title="Same service. Three ways to pay for it."
          intro="Every model includes the same core development and ongoing growth services, over 24 months, with no setup or development fee. Choose by cash flow and how much you want to share risk."
        />
        <div className="mt-12">
          <PlanCards />
        </div>

        <div className="mt-16">
          <div className="vc-reveal mb-6 max-w-[680px]">
            <h3 className="text-[28px] leading-[1.05] tracking-[-.04em] sm:text-4xl">Compare at any booking volume</h3>
            <p className="mt-2 leading-7 text-white/[0.72]">Move the slider to see the monthly partnership fee for each model.</p>
          </div>
          <Calculator />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className={`vc-reveal ${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-[#BEF70A]`}>How booking bonuses work · Balanced and Performance</p>
            <h3 className="mt-2 text-2xl leading-snug tracking-[-.03em]">A flat fee per completed, paid booking from our channels.</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-bold">Counts</p>
                <ul className="mt-3 grid gap-2.5">
                  {COUNTS.map((s) => (
                    <Tick key={s}>{s}</Tick>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold">Never counts</p>
                <ul className="mt-3 grid gap-2.5">
                  {DOESNT.map((s) => (
                    <Cross key={s}>{s}</Cross>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 border-t border-white/[0.08] pt-4 text-sm leading-6 text-white/60">Booking records and sources are visible in the management system, and monthly totals are reviewed together.</p>
          </div>

          <div className={`vc-reveal flex flex-col ${CARD} p-6 sm:p-8`}>
            <p className={`${LABEL} text-[#BEF70A]`}>No percentage of journey value</p>
            <p className="mt-2 text-white/[0.72]">Example under the Performance Partnership:</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {["£150", "£2,000"].map((v) => (
                <div key={v} className="rounded-[18px] bg-white/[0.06] p-4">
                  <p className="vc-num text-[28px] font-semibold leading-none tracking-[-.04em]">{v}</p>
                  <p className="mt-1 text-[13px] text-white/55">journey</p>
                  <div className="mt-4 border-t border-white/[0.08] pt-3">
                    <p className="text-xs text-white/55">Success fee</p>
                    <p className="vc-num text-2xl font-semibold tracking-[-.04em] text-[#BEF70A]">£20</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-auto pt-5 text-[15px] leading-6 text-white/[0.72]">A seven-day or ten-day booking also carries one £20 fee, not one per day.</p>
          </div>
        </div>

        <div className={`vc-reveal mt-3 ${CARD} p-6 sm:p-8`}>
          <p className={`${LABEL} text-[#BEF70A]`}>Payment arrangements</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              ["Before work begins", "First monthly partnership fee, paid in advance."],
              ["Same date each month", "Following monthly fees, paid in advance."],
              ["Monthly, after the fact", "Booking bonuses (Balanced, Performance) calculated from agreed records and billed separately."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 md:block">
                <Num n={i + 1} />
                <div className="md:mt-4">
                  <p className="font-bold">{t}</p>
                  <p className="mt-1 text-[15px] leading-6 text-white/[0.72]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-8 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
            {["No website setup fee", "No app development fee for agreed core features", "No SEO setup fee", "No charge for our design and video tools"].map((s) => (
              <li key={s} className="rounded-full bg-[#BEF70A]/[0.13] px-4 py-2 text-sm font-semibold text-[#BEF70A]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------- Investment ---------------- */}
      <Section id="investment" tone="green">
        <Head
          eyebrow="Complete transparency"
          title="What is included, and what is not."
          intro="Our agency tools are already paid for and included. A few business-specific services need their own subscription or payment. Nothing paid is enabled just because it exists."
        />

        <div className="vc-reveal mt-12">
          <h3 className="text-xl">What you pay, by type</h3>
          <div className="mt-4">
            <PaymentTypes />
          </div>
        </div>

        <div className="vc-reveal mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col rounded-[22px] border border-[#BEF70A] bg-white/[0.07] p-6 sm:p-8">
            <p className={`${LABEL} text-[#BEF70A]`}>Included in our partnership</p>
            <p className="mt-3 font-display text-[28px] font-bold leading-[1.12] tracking-[-.015em]">Covered by your monthly fee.</p>
            <ul className="mt-6 grid gap-3">
              {INCLUDED.map((s) => (
                <Tick key={s}>{s}</Tick>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <div className="border-t border-white/[0.08] pt-6">
                <StatRow
                  columns={2}
                  items={[
                    { value: "£0", label: "Setup or development fee" },
                    { value: "£0", label: "Extra for our agency tools" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className={`${CARD} p-2 sm:p-3`}>
            <p className={`px-4 pb-2 pt-4 ${LABEL} text-white/60 sm:px-5`}>Third-party costs · only when required</p>
            <ul>
              {THIRD_PARTY.map((c) => (
                <li key={c.name} className="grid gap-1 border-b border-white/[0.08] px-4 py-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6 sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{c.name}</span>
                    <span className="rounded-full bg-white/[0.08] px-2.5 py-0.5 text-[11px] font-semibold text-white/70">{c.kind}</span>
                  </div>
                  <span className="vc-num font-bold text-[#BEF70A] sm:row-span-2 sm:self-center sm:text-right">{c.price}</span>
                  <p className="text-sm leading-6 text-white/60">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3">
          <FirstThreeMonths />
        </div>
        <p className="mt-6 max-w-[760px] leading-7 text-white/80">
          <strong className="font-bold text-white">The main benefit:</strong> V Chauffeurs can start building its complete digital system without a large, separate website or app development invoice.
        </p>
      </Section>

      {/* ---------------- FAQs ---------------- */}
      <Section id="faqs" tone="green">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-12">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <Head eyebrow="FAQs" title="Questions directors usually ask." />
            <div className="mt-8">
              <AskAiCallout />
            </div>
          </div>
          <FaqCards items={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </Section>

      {/* ---------------- Closing ---------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Head
              eyebrow="Our recommendation"
              title={
                <>
                  Fixed Partnership, <span className="text-[#BEF70A]">£300 a month</span> for 24 months.
                </>
              }
              intro="A predictable payment, and future booking growth carries no per-booking success fee. Balanced and Performance remain fully available if a lower base and a results-linked structure suit you better. All three carry the same commitment and service."
            />
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className={`${SOFT} p-5`}>
                <dt className="font-bold">Why this is good value</dt>
                <dd className="mt-1.5 text-[15px] leading-6 text-white/[0.72]">Website and custom app development are usually separate costs, and UK SEO alone can carry substantial monthly fees. Here they all sit with one partner.</dd>
              </div>
              <div className={`${SOFT} p-5`}>
                <dt className="font-bold">What we are honest about</dt>
                <dd className="mt-1.5 text-[15px] leading-6 text-white/[0.72]">We are not promising to outperform every major international chauffeur brand immediately. We grow your presence in the markets you genuinely serve.</dd>
              </div>
            </dl>
            <p className="mt-8 max-w-[600px] leading-7 text-white/80">We welcome questions, concerns and suggestions from your directors and board. If a reasonable change makes the partnership more workable for both sides, we are glad to discuss it.</p>
            <div className="mt-6">
              <AskAiCallout compact />
            </div>
            <p className="mt-6 text-sm font-semibold text-white/60">Still need us? Contact Sameer directly:</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("V Chauffeurs partnership")}`} icon={MailIcon}>
                Email Jadeed Solutions
              </ButtonLink>
              <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappIcon}>
                Message on WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-6 max-w-[560px] text-sm leading-6 text-white/60">
              Our pricing is already structured to reduce upfront pressure, so we are not proposing further reductions that would remove the long-term work behind the service.
            </p>
          </div>
          <div className={`${CARD} p-6 sm:p-8 lg:self-start`}>
            <p className={`${LABEL} text-[#BEF70A]`}>Once you choose a model</p>
            <ol className="mt-5 border-t border-white/[0.08]">
              {NEXT.map((s, i) => (
                <li key={s} className="flex gap-5 border-b border-white/[0.08] py-4">
                  <span className="vc-num w-6 shrink-0 font-bold text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-6 text-white/85">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[15px] leading-6 text-white/[0.72]">Our immediate goal: the website live in month one, and the core connected system complete within three months.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
