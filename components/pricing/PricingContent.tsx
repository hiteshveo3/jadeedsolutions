"use client";

import { type ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { AccordionItem } from "@/components/Accordion";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import {
  HugeiconsIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  HandshakeIcon,
  RocketIcon,
  TrendingUpIcon,
  TagIcon,
  VideoIcon,
  type IconSvgElement,
} from "@/components/icons";
import { CurrencyProvider } from "./CurrencyProvider";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { Price } from "./Price";

const included = [
  "Full digital marketing management",
  "Search engine optimization",
  "Google Ads & paid campaigns",
  "AI-generated marketing images",
  "AI video content (see note)",
  "Social media & content",
  "Business website & landing pages",
  "Mobile app development — iOS & Android",
  "Dedicated account manager",
  "Monthly performance reporting",
];

const highlights = [
  "No setup fee",
  "No minimum spend",
  "No monthly retainer",
  "You pay only for real bookings",
  "Cancel anytime",
];

const steps: { icon: IconSvgElement; title: string; text: string }[] = [
  {
    icon: HandshakeIcon,
    title: "Discovery & onboarding",
    text: "A free call to understand your business, your services and your goals.",
  },
  {
    icon: RocketIcon,
    title: "Build & launch",
    text: "We set up your website or app, campaigns, SEO and AI content — ready to go.",
  },
  {
    icon: TrendingUpIcon,
    title: "We drive bookings",
    text: "Ongoing SEO, ads and AI images & videos that bring real customers to you.",
  },
  {
    icon: TagIcon,
    title: "You pay 10%",
    text: "Only pay 10% of the bookings we generate. No bookings, no commission.",
  },
];

type ServiceCard = {
  name: string;
  price: ReactNode;
  tag?: string;
  features: string[];
  cta: string;
};

const servicesList: ServiceCard[] = [
  {
    name: "SEO",
    price: <Price gbp={100} period="/mo" periodClassName="text-slate-500 text-base" />,
    tag: "6-month minimum",
    features: [
      "Technical & on-page SEO",
      "Content optimization",
      "Local SEO & Google Business Profile",
      "Monthly rankings & traffic report",
    ],
    cta: "Start SEO",
  },
  {
    name: "Business Website",
    price: (
      <Price gbp={100} period="one-time" periodClassName="text-slate-500 text-base" />
    ),
    tag: "Starting from",
    features: [
      "Multi-page business website",
      "Blog + single blog pages",
      "Services listing + single service pages",
      "Contact form, mobile-first & SEO-ready",
    ],
    cta: "Get a website",
  },
  {
    name: "Google Ads Management",
    price: <span>Custom</span>,
    tag: "Tailored quote",
    features: [
      "Search, Display & performance campaigns",
      "Conversion tracking setup",
      "Landing page guidance",
      "Ongoing optimization & reporting",
    ],
    cta: "Get a quote",
  },
  {
    name: "Mobile App — iOS & Android",
    price: <span>Custom</span>,
    tag: "Tailored quote",
    features: [
      "Native-quality iOS & Android apps",
      "UI/UX design included",
      "Backend & integrations",
      "App Store & Play Store launch",
    ],
    cta: "Get a quote",
  },
];

function Yes() {
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-brand-500">
      <HugeiconsIcon icon={CheckIcon} size={16} strokeWidth={2.4} />
      Yes
    </span>
  );
}

function No() {
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-400">
      <HugeiconsIcon icon={CloseIcon} size={14} />—
    </span>
  );
}

const faqs: { q: string; a: string }[] = [
  {
    q: "How exactly is the 10% calculated?",
    a: "We charge 10% of the bookings (sales) we generate for you through our marketing. If we don't bring you bookings, you don't pay a commission — our incentives are fully aligned with your growth.",
  },
  {
    q: "Are there any setup fees or minimums?",
    a: "No. For the Growth Partnership there's no setup fee, no minimum ad spend and no monthly retainer. You only pay a percentage of the bookings we deliver.",
  },
  {
    q: "Can I buy just one service instead?",
    a: "Yes. SEO, business websites, Google Ads management and mobile apps are all available individually if you prefer fixed pricing rather than the partnership model.",
  },
  {
    q: "What's included in the £100/mo SEO plan?",
    a: "Technical and on-page SEO, content optimization, local SEO and monthly reporting. We ask for a 6-month minimum because SEO results compound over time.",
  },
  {
    q: "What do I get with the £100 website?",
    a: "A complete multi-page business website — home, services listing and single service pages, blog and single blog pages, and a contact form. It's mobile-first and SEO-ready from day one.",
  },
  {
    q: "How do AI images and videos work?",
    a: "AI-generated marketing images are always included in the partnership. For a regular flow of AI videos (for example up to ~10 per month), we ask you to cover the AI tool subscription and we handle all of the creation.",
  },
  {
    q: "Is your pricing global?",
    a: "Yes. All prices are set in GBP (£) and shown in your local currency using live exchange rates. Billing is handled in GBP or an agreed currency.",
  },
  {
    q: "Who is this best for?",
    a: "Local, service-based businesses that want more customers. That's our focus and where the partnership model delivers the strongest results.",
  },
];

const comparisonRows: {
  feature: string;
  partnership: ReactNode;
  individual: ReactNode;
}[] = [
  {
    feature: "Pricing model",
    partnership: "10% of bookings",
    individual: "Fixed per service",
  },
  {
    feature: "Upfront cost",
    partnership: "None",
    individual: (
      <>
        From <Price gbp={100} />
      </>
    ),
  },
  { feature: "Search engine optimization", partnership: <Yes />, individual: (
    <>
      Add-on · <Price gbp={100} period="/mo" />
    </>
  ) },
  { feature: "Google Ads management", partnership: <Yes />, individual: "Add-on" },
  {
    feature: "Business website",
    partnership: <Yes />,
    individual: (
      <>
        From <Price gbp={100} />
      </>
    ),
  },
  { feature: "Mobile app (iOS & Android)", partnership: <Yes />, individual: "Custom" },
  { feature: "AI marketing images", partnership: <Yes />, individual: <No /> },
  { feature: "AI videos", partnership: "Limited*", individual: <No /> },
  { feature: "Dedicated account manager", partnership: <Yes />, individual: <No /> },
  {
    feature: "Minimum commitment",
    partnership: "None",
    individual: "SEO: 6 months",
  },
];

export function PricingContent() {
  return (
    <CurrencyProvider>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white">
        <HeroBackground />
        <div className="container relative z-10 py-16 text-center sm:py-20">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5">
            <span className="eyebrow">Pricing</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Pricing built around your growth
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Our main model is simple: we only win when you win. Pay just{" "}
              <span className="font-semibold text-brand-500">
                10% of the bookings we generate
              </span>{" "}
              — no setup fees, no minimums, no retainers. Prefer a single fixed
              service? Those are available too.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Flagship — Growth Partnership */}
      <section className="section bg-slate-50">
        <div className="container">
          <div className="mb-6 flex justify-end">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5">
              <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-500 sm:inline">
                Currency
              </span>
              <CurrencySwitcher />
            </div>
          </div>
          <Reveal className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid lg:grid-cols-[1.6fr_1fr]">
              <div className="p-8 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Flagship · 99% of our clients
                </span>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  Growth Partnership
                </h2>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-6xl font-semibold text-brand-500">
                    10%
                  </span>
                  <span className="text-lg text-slate-600">
                    of the bookings we generate
                  </span>
                </div>
                <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
                  A full-service growth engine for local businesses. We handle
                  everything — marketing, SEO, ads, AI content, your website and
                  even your mobile app — and you only pay when we deliver real
                  bookings.
                </p>

                <p className="mt-8 text-sm font-bold uppercase tracking-wider text-slate-500">
                  Everything included
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <HugeiconsIcon
                        icon={CheckCircleIcon}
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center gap-6 bg-brand-500 p-8 text-white sm:p-10">
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    Why it works
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <HugeiconsIcon
                          icon={CheckIcon}
                          size={18}
                          strokeWidth={2.4}
                          className="mt-0.5 shrink-0"
                        />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <LinkButton
                    href="/contact"
                    size="lg"
                    variant="white"
                    className="w-full"
                  >
                    Start a partnership
                  </LinkButton>
                  <p className="mt-3 text-center text-xs text-white/80">
                    Free discovery call · No obligation
                  </p>
                </div>
              </div>
            </div>

            {/* AI note */}
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-brand-50 p-6 sm:flex-row sm:items-start">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white">
                <HugeiconsIcon icon={VideoIcon} size={20} />
              </span>
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-bold text-ink">
                  About AI images &amp; videos:
                </span>{" "}
                AI-generated marketing images are always included. Our core
                marketing is image-led, with the occasional video. For a regular
                stream of AI videos (e.g. up to ~10/month), we ask you to cover
                the AI tool subscription — and we handle all of the creation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How the 10% works */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="Aligned with your success"
            description="Four simple steps — you only pay a commission once we're actually driving bookings."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white">
                      <HugeiconsIcon icon={step.icon} size={24} />
                    </span>
                    <span className="font-display text-2xl font-semibold text-slate-200">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Individual services */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="À la carte"
            title="Prefer a single service?"
            description="Not ready for a full partnership? Buy any service individually at a fixed, transparent price."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {servicesList.map((service, i) => (
              <Reveal key={service.name} delay={(i % 4) * 0.08}>
                <div className="card flex h-full flex-col p-6">
                  {service.tag && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {service.tag}
                    </span>
                  )}
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                    {service.name}
                  </h3>
                  <div className="mt-3 font-display text-3xl font-semibold text-ink">
                    {service.price}
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <HugeiconsIcon
                          icon={CheckIcon}
                          size={16}
                          strokeWidth={2.4}
                          className="mt-0.5 shrink-0 text-brand-500"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <LinkButton
                    href="/contact"
                    variant="secondary"
                    className="mt-6 w-full"
                  >
                    {service.cta}
                  </LinkButton>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">
            All prices are in GBP (£) and shown in your selected currency using
            live exchange rates. Final billing is in GBP or an agreed currency.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Compare"
            title="Partnership vs individual services"
            description="Both are great — it just depends on whether you want a full growth engine or a single fixed service."
          />
          <Reveal className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-brand-500 text-white">
                    <th className="px-4 py-4 font-bold">Feature</th>
                    <th className="px-4 py-4 text-center font-bold">
                      Growth Partnership
                    </th>
                    <th className="px-4 py-4 text-center font-bold">
                      Individual services
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="border-t border-slate-200 px-4 py-3 font-semibold text-ink">
                        {row.feature}
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 text-center text-slate-700">
                        {row.partnership}
                      </td>
                      <td className="border-t border-slate-200 px-4 py-3 text-center text-slate-700">
                        {row.individual}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-slate-500">
            *AI videos: images are always included; a steady stream of AI videos
            requires a client-funded AI tool subscription.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions, answered"
            description="Everything you need to know about how we charge and what's included."
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} title={faq.q}>
                {faq.a}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to only pay for results?"
        description="Book a free discovery call and we'll show you exactly how the 10% partnership would work for your business."
        primaryLabel="Start a partnership"
        secondaryLabel="Ask a question"
        secondaryHref="/contact"
      />
    </CurrencyProvider>
  );
}
