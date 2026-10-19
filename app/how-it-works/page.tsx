import type { Metadata } from "next";
import {
  FileIcon,
  PhoneIcon,
  TrendingUpIcon,
  WhatsappIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import { SampleAudit } from "@/components/jadeed/proposal";
import { partnershipCopy } from "@/lib/partnership";
import { CoinStacks, FitColumns, FitQuiz, FunnelNumbers, HandshakeToPhone, MonthlyReport, Recommendations, StepSlider, TaskRing, WeekTabs, YouAndUs } from "@/components/jadeed/process";
import {
  ButtonLink,
  CheckList,
  FactRows,
  FaqSection,
  FeatureGrid,
  PageHero,
  Section,
  SectionHeader,
  Steps,
  TextLink,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "How It Works — From First Chat to Booked Jobs",
  description:
    "How Jadeed Solutions grows local service businesses: free discovery, fix the foundations, grow Google visibility, then pay fixed SEO from £300/mo (6-month minimum) or 10% of paid jobs with £0 upfront (6-month start, then month to month).",
  alternates: { canonical: `${siteConfig.url}/how-it-works` },
};

const steps = [
  { title: "Free discovery", text: "WhatsApp or call us. We learn your cities, services and goals — then outline a clear plan. Demos are available if you want to see how we work." },
  { title: "Build the foundations", text: "Website and SEO setup, plus apps if you need them. Mobile-first and conversion-first, so visitors call and book." },
  { title: "Grow visibility", text: "We focus on Google search and your website first — most clients never need ads. If you want paid ads later, you fund the spend and we manage the campaigns." },
  { title: "Pay fairly", text: "Fixed SEO from £300/mo with no setup fee and a 6-month minimum, so results can compound. Or the Growth Partnership: £0 upfront and 10% of paid jobs, on a 6-month start, then month to month." },
];

const alternatives = [
  {
    title: "vs freelancers",
    href: "/compare/jadeed-vs-fiverr",
    points: ["One accountable team — not gigs that disappear after delivery", "Built for bookings, not generic “SEO packages”", "Website, SEO and optional app under one roof"],
  },
  {
    title: "vs DIY website builders",
    href: "/compare/jadeed-vs-hostinger",
    points: ["Templates don’t rank or convert by themselves", "Ongoing SEO and reporting, not a one-click theme", "City pages for the markets you actually serve"],
  },
  {
    title: "vs big agencies",
    href: "/compare/jadeed-vs-marketing-agency",
    points: ["Work tied to booked jobs — not vanity metrics", "Organic first; ads only if you ask", "Lean remote team keeps pricing fair"],
  },
];

const faqs = [
  { question: "Is there a setup fee?", answer: "No. There is no setup fee on standard plans. Fixed SEO plans have a 6-month minimum so the work has time to compound. The Growth Partnership is £0 upfront — no setup fee, no retainer, no minimum spend — and starts with a free audit, a 6-month initial term, then month to month with 30 days' notice." },
  { question: "How does the 10% model work?", answer: "On the Growth Partnership you pay 10% of the full customer invoice after your customer pays — only for customers who came through our work and only on completed, paid jobs, as defined in your agreement. It starts with a 6-month term, then runs month to month. You fund any ad spend directly to Google or Meta. Our profit-share handbook explains how it works in full." },
  { question: "Do I need Google Ads?", answer: "No. Most clients grow through Google search and their website first. If you want ads later, you fund the spend and we manage the campaigns." },
  { question: "Who will I work with?", answer: "A small, hands-on team led by founder Sameer Ahmad Basra. We work with around 10 active clients at a time." },
  { question: "Where are you based?", answer: "Narowal, Pakistan. We work remotely with local service businesses in the UK, USA, UAE and other markets." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>From first chat<span className="block text-[#BEF70A]">to booked jobs.</span></>}
        lead="A simple, founder-led process. We learn your business, fix the foundations, grow your visibility and report on real enquiries — not vanity charts."
        actions={
          <>
            <ButtonLink href={siteConfig.whatsappHref} icon={WhatsappIcon}>WhatsApp us</ButtonLink>
            <ButtonLink href={`tel:${siteConfig.phoneHref}`} variant="outlineLight" icon={PhoneIcon}>Call {siteConfig.phone}</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="The basics"
            rows={[
              { label: "Setup fee", value: "None" },
              { label: "Fixed plans", value: "6-month minimum" },
              { label: "Fixed SEO", value: "From £300/mo" },
              { label: "Growth Partnership", value: "10% of paid jobs · £0 upfront" },
              { label: "Ad spend", value: "Paid by you, to Google" },
            ]}
          />
        }
      />

      <Section tone="cream" labelledBy="process-heading">
        <SectionHeader id="process-heading" eyebrow="The process" title="Four steps, start to finish" lead="Clear communication at every stage — but every page and campaign is built to win bookings." />
        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <StepSlider steps={steps} />
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">From handshake to phone ringing</p>
            <div className="mt-5">
              <HandshakeToPhone />
            </div>
          </div>
        </div>
      </Section>

      {/* Ideas 035 A + 036 A — what the free audit shows, with sample numbers. */}
      <Section tone="green" labelledBy="audit-heading">
        <SectionHeader id="audit-heading" tone="green" eyebrow="Free audit · reply in 24 hours" title="See where you stand before anything is agreed" lead="Every audit compares you with the businesses that rank in your area today — and checks whether your area is still open." />
        <div className="mt-10">
          <SampleAudit />
        </div>
      </Section>

      <Section tone="cream" labelledBy="first-month-heading">
        <SectionHeader id="first-month-heading" eyebrow="Your first month" title="Week by week" lead="What a typical first month looks like, so you know what to look for and when." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <WeekTabs />
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Who does what</p>
            <div className="mt-4">
              <YouAndUs />
            </div>
            <p className="mt-6 border-t border-white/[0.08] pt-5 text-[15px] leading-7 text-white/70">{partnershipCopy.partnership}</p>
          </div>
        </div>
      </Section>

      <Section tone="green" labelledBy="monthly-heading">
        <SectionHeader id="monthly-heading" tone="green" eyebrow="Every month" title="What you get while we work" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid
            tone="green"
            columns={4}
            items={[
              { icon: FileIcon, title: "A clear report", text: "Search impressions, clicks, calls and enquiries in plain English." },
              { icon: PhoneIcon, title: "A real conversation", text: "A call to walk through what moved, what didn’t and what’s next." },
              { icon: TrendingUpIcon, title: "Shipped improvements", text: "Pages, content and fixes delivered every month — not just advice." },
              { icon: WhatsappIcon, title: "Direct access", text: "WhatsApp the team that does the work. No ticket queues." },
            ]}
          />
        </div>
      </Section>

      <Section tone="cream" labelledBy="report-heading">
        <SectionHeader id="report-heading" eyebrow="Plain English" title="A report you can read in two minutes" lead="Numbers that matter, every recommendation with a reason, and a live view of what's done." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <MonthlyReport />
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">This month we recommend · example</p>
            <div className="mt-3">
              <Recommendations />
            </div>
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Where the work stands · example — tap a task</p>
            <div className="mt-5">
              <TaskRing />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="green" labelledBy="numbers-heading">
        <SectionHeader id="numbers-heading" tone="green" eyebrow="Try the numbers" title="From visitors to booked work" lead="Switch the presets and move the job value — on the Growth Partnership, most of every booking stays with you." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <FunnelNumbers />
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <CoinStacks />
          </div>
        </div>
      </Section>

      <Section tone="cream" labelledBy="fit-heading">
        <SectionHeader id="fit-heading" eyebrow="Is this a fit?" title="We'd rather tell you now" lead="Than waste your time. Here's who we help best — and a quick check you can do yourself." />
        <div className="mt-10 grid gap-4">
          <FitColumns />
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
            <FitQuiz />
          </div>
        </div>
      </Section>

      <Section tone="cream" labelledBy="alternatives-heading">
        <SectionHeader id="alternatives-heading" eyebrow="Why buy from us" title="Jadeed vs the usual alternatives" lead="What you get when you work with us instead of the usual options." />
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-3 md:gap-10">
          {alternatives.map((block) => (
            <div key={block.title}>
              <h3 className="mb-4 text-2xl font-semibold tracking-[-.035em]">{block.title}</h3>
              <CheckList items={block.points} />
              <div className="mt-5">
                <TextLink href={block.href}>Read the comparison</TextLink>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AlphaProof />

      <FaqSection items={faqs} />
    </>
  );
}
