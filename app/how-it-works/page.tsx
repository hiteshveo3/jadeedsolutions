import type { Metadata } from "next";
import {
  FileIcon,
  PhoneIcon,
  TrendingUpIcon,
  WhatsappBusinessIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
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
    "How Jadeed Solutions grows local service businesses: free discovery, fix the foundations, grow Google visibility, then pay fixed SEO from £100/mo (6-month minimum) or a share of the bookings we generate (12–24 month term).",
  alternates: { canonical: `${siteConfig.url}/how-it-works` },
};

const steps = [
  { title: "Free discovery", text: "WhatsApp or call us. We learn your cities, services and goals — then outline a clear plan. Demos are available if you want to see how we work." },
  { title: "Build the foundations", text: "Website and SEO setup, plus apps if you need them. Mobile-first and conversion-first, so visitors call and book." },
  { title: "Grow visibility", text: "We focus on Google search and your website first — most clients never need ads. If you want paid ads later, you fund the spend and we manage the campaigns." },
  { title: "Pay fairly", text: "Fixed SEO from £100/mo with no setup fee and a 6-month minimum, so results can compound. Or the Growth Partnership: typically 10% of the bookings we generate, on a 12–24 month term." },
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
  { question: "Is there a setup fee?", answer: "No. There is no setup fee on standard plans. Fixed SEO plans have a 6-month minimum so the work has time to compound. The Growth Partnership runs on a 12–24 month term and starts with a short paid audit to set the baseline." },
  { question: "How does the 10% model work?", answer: "On the Growth Partnership you typically pay 10% of the bookings our work generates, as defined in your agreement, over a 12–24 month term. You fund any ad spend directly to Google or Meta. Our profit-share handbook explains how it works in full." },
  { question: "Do I need Google Ads?", answer: "No. Most clients grow through Google search and their website first. If you want ads later, you fund the spend and we manage the campaigns." },
  { question: "Who will I work with?", answer: "A small, hands-on team led by founder Sameer Ahmad Basra. We work with around 10 active clients at a time." },
  { question: "Where are you based?", answer: "Narowal, Pakistan. We work remotely with local service businesses in the UK, USA, UAE and other markets." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>From first chat<span className="block text-[#eaf25a]">to booked jobs.</span></>}
        lead="A simple, founder-led process. We learn your business, fix the foundations, grow your visibility and report on real enquiries — not vanity charts."
        actions={
          <>
            <ButtonLink href={siteConfig.whatsappHref} icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
            <ButtonLink href={`tel:${siteConfig.phoneHref}`} variant="outlineLight" icon={PhoneIcon}>Call {siteConfig.phone}</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="The basics"
            rows={[
              { label: "Setup fee", value: "None" },
              { label: "Fixed plans", value: "6-month minimum" },
              { label: "Fixed SEO", value: "From £100/mo" },
              { label: "Growth Partnership", value: "10% of bookings, 12–24 mo" },
              { label: "Ad spend", value: "Paid by you, to Google" },
            ]}
          />
        }
      />

      <Section tone="cream" labelledBy="process-heading">
        <SectionHeader id="process-heading" eyebrow="The process" title="Four steps, start to finish" lead="Clear communication at every stage — but every page and campaign is built to win bookings." />
        <div className="mt-10 md:mt-14">
          <Steps steps={steps} />
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
              { icon: WhatsappBusinessIcon, title: "Direct access", text: "WhatsApp the team that does the work. No ticket queues." },
            ]}
          />
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
