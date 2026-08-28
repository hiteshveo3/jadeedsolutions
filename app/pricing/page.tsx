"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HugeiconsIcon,
  ZapIcon,
  LocationIcon,
  BriefcaseIcon,
  CalendarIcon,
  TrendingUpIcon,
  SparklesIcon,
  CheckIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  InfoIcon,
  PlusIcon,
  MinusIcon,
  SmartphoneIcon,
  CheckCircleIcon,
  CodeIcon,
  TargetIcon,
  LayersIcon,
  GlobeIcon,
  PhoneIcon,
} from "@/components/icons";
import {
  Eyebrow,
  Disclaimer,
  CTAButton,
  StatCard,
} from "@/components/pricing/PricingComponents";

/* -------------------------------------------------------------------------- */
/* DATA STRUCTURES                                                            */
/* -------------------------------------------------------------------------- */

const funnelStages = [
  {
    step: "01",
    phase: "Demand",
    name: "Attract",
    summary: "Capture high-intent local search demand",
    items: ["Local SEO & Map Pack", "Targeted search campaigns", "Negative keyword shield"],
    icon: LocationIcon,
  },
  {
    step: "02",
    phase: "Conversion",
    name: "Convert",
    summary: "Frictionless mobile engagement",
    items: ["Sub-second web pages", "Dedicated landing funnels", "Direct WhatsApp channel"],
    icon: ZapIcon,
  },
  {
    step: "03",
    phase: "Screening",
    name: "Qualify",
    summary: "Filter urgency, scope & location",
    items: ["AI qualification assistant", "Interactive estimate flow", "Lead CRM & call audit"],
    icon: SparklesIcon,
  },
  {
    step: "04",
    phase: "Schedule",
    name: "Book",
    summary: "Lock in paying customer appointments",
    items: ["Direct calendar booking", "Instant lead response", "Automated SMS alerts"],
    icon: CalendarIcon,
  },
  {
    step: "05",
    phase: "Operations",
    name: "Deliver",
    summary: "Job fulfillment and dispatch",
    items: ["Job status tracking", "Live customer ETA alerts", "Field technician dispatch"],
    icon: BriefcaseIcon,
  },
  {
    step: "06",
    phase: "Compounding",
    name: "Grow",
    summary: "Compound reputation & repeat revenue",
    items: ["Review request automation", "Revenue attribution audit", "Customer retention engine"],
    icon: TrendingUpIcon,
  },
];

const recommenderQuestions = [
  {
    id: "businessType",
    question: "What kind of service business do you operate?",
    options: [
      { label: "Plumbing / Heating", value: "Plumbing" },
      { label: "HVAC / Air Conditioning", value: "HVAC" },
      { label: "Roofing / Structural", value: "Roofing" },
      { label: "Cleaning / Facilities", value: "Cleaning" },
      { label: "Removals / Logistics", value: "Removals" },
      { label: "Electrical / Solar", value: "Electrical" },
      { label: "Renovation / Trades", value: "Contractor" },
      { label: "Commercial Services", value: "Commercial" },
    ],
  },
  {
    id: "avgTicket",
    question: "What is your typical invoice value for a completed job?",
    options: [
      { label: "Under £500", value: "under-500", desc: "High frequency, standard service" },
      { label: "£500 – £1,500", value: "500-1500", desc: "Standard residential & commercial" },
      { label: "£1,500 – £5,000", value: "1500-5000", desc: "Mid-to-high ticket projects" },
      { label: "£5,000 – £15,000+", value: "high-ticket", desc: "Large installation or construction" },
    ],
  },
  {
    id: "variation",
    question: "How much do your job sizes vary from week to week?",
    options: [
      { label: "Mostly consistent", value: "consistent", desc: "Jobs are similar in scope and price" },
      { label: "Widely variable", value: "variable", desc: "Mix of minor repairs and large jobs" },
    ],
  },
  {
    id: "preference",
    question: "What commercial structure fits your business preference?",
    options: [
      { label: "Revenue-aligned", value: "performance", desc: "Align fees with verified collected revenue" },
      { label: "Fixed fee per job", value: "tiered", desc: "Predictable flat fee tied to job size" },
      { label: "Predictable monthly", value: "flat", desc: "Fixed monthly scope with zero revenue sharing" },
    ],
  },
];

const comparisonRows = [
  {
    dimension: "Billing basis",
    performance: "Attributable collected revenue",
    tiered: "Fixed fee per completed job tier",
    flat: "Predictable fixed monthly fee",
  },
  {
    dimension: "Best fit",
    performance: "Trackable customer revenue with consistent job economics",
    tiered: "Variable ticket trades (HVAC, Roofing, Remodeling)",
    flat: "Companies wanting predictable budgeting",
  },
  {
    dimension: "Revenue-linked fee",
    performance: "Illustrative ~10% (lower for high-ticket)",
    tiered: "No percentage bite (flat per tier)",
    flat: "None (100% fixed)",
  },
  {
    dimension: "Cost predictability",
    performance: "Tied to actual revenue results",
    tiered: "High per-job certainty",
    flat: "Maximum monthly predictability",
  },
  {
    dimension: "Ad spend billing",
    performance: "Direct to Google/Meta (0% markup)",
    tiered: "Direct to Google/Meta (0% markup)",
    flat: "Direct to Google/Meta (0% markup)",
  },
  {
    dimension: "Closed-loop attribution",
    performance: "Required for fee reconciliation",
    tiered: "Required for job tier tracking",
    flat: "Provided for marketing insight",
  },
  {
    dimension: "Uncollected / canceled jobs",
    performance: "£0 fee (calculated only on cleared revenue)",
    tiered: "£0 fee (only on completed work)",
    flat: "Included in fixed monthly scope",
  },
  {
    dimension: "Core website & landing pages",
    performance: "Included in growth build",
    tiered: "Included in growth build",
    flat: "Included in growth build",
  },
  {
    dimension: "Google Ads management",
    performance: "Included",
    tiered: "Included",
    flat: "Included",
  },
  {
    dimension: "Local SEO & Maps",
    performance: "Included",
    tiered: "Included",
    flat: "Included",
  },
  {
    dimension: "Lead CRM & call tracking",
    performance: "Included",
    tiered: "Included",
    flat: "Included",
  },
  {
    dimension: "Optional field mobile app",
    performance: "Available add-on",
    tiered: "Available add-on",
    flat: "Available add-on",
  },
];

const faqs = [
  {
    q: "How is Jadeed different from a fixed agency retainer?",
    a: "Jadeed can structure the commercial engagement around performance, job tiers, or a fixed scope depending on the economics of your business. Rather than billing a static retainer regardless of results, our systems are built around your customer journey, verified calls, and collected revenue.",
  },
  {
    q: "How is attributable collected revenue tracked?",
    a: "Every customer inquiry generated through the Jadeed acquisition infrastructure is captured via dynamic call tracking, timestamped forms, or direct WhatsApp booking channels. Performance fees are calculated only on completed jobs and cleared revenue recorded in your reconciliation dashboard.",
  },
  {
    q: "Why do high-ticket businesses use a lower percentage or tiered model?",
    a: "Large projects (such as £15,000 roof replacements or £8,000 HVAC installations) involve substantial material, equipment, and crew costs with different gross margins. Charging a standard 10% on high-ticket jobs would eat into your material costs. Therefore, high-ticket work qualifies for a ~5% rate or fixed per-job tiers.",
  },
  {
    q: "What happens if a booked job is canceled or refunded?",
    a: "If a job is canceled, uncollected, or refunded, no fee is charged under the Performance or Tiered models. Fees apply strictly to cleared, collected payments from new customers.",
  },
  {
    q: "Do I pay fees on existing customers or direct referrals?",
    a: "No. Existing customers in your database and direct offline word-of-mouth referrals are excluded from performance billing. Fees apply only to net-new customers generated through the Jadeed infrastructure.",
  },
  {
    q: "How is advertising budget handled?",
    a: "Your advertising budget is paid directly to Google or Meta through your own payment method. Jadeed applies 0% markup to ad spend, ensuring 100% of your advertising budget is deployed directly toward acquiring customers.",
  },
  {
    q: "Can I transition between commercial models as my business evolves?",
    a: "Yes. Many businesses begin on a Performance or Tiered structure to align incentives while establishing search visibility, and later transition to a Flat-Fee structure as volume becomes steady and predictable.",
  },
  {
    q: "How are recurring commercial contracts handled?",
    a: "For recurring maintenance or commercial cleaning agreements, we define a transparent initial attribution window (such as the first 3 months) so you do not pay ongoing fees indefinitely on established client relationships.",
  },
];

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const from = displayValue;
    const distance = value - from;
    const startedAt = performance.now();
    const duration = 800;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + distance * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // displayValue is intentionally captured as the animation's starting point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function PricingPage() {
  const jobsSliderId = useId();
  const ticketSliderId = useId();

  // Currency State
  const [currency, setCurrency] = useState<"£" | "$" | "€">("£");

  // Commercial Model Tab State
  const [selectedModelTab, setSelectedModelTab] = useState<"performance" | "tiered" | "flat">("performance");

  // Unified Calculator Range Bounds (Jobs: 1-100, Ticket: 100-30000)
  const MIN_JOBS = 1;
  const MAX_JOBS = 100;
  const MIN_TICKET = 100;
  const MAX_TICKET = 30000;

  // Calculator State
  const [calcJobs, setCalcJobs] = useState(16);
  const [calcTicket, setCalcTicket] = useState(750);

  // Debounced Derived Calculations (150ms debounce prevents jank on rapid drag)
  const [debouncedJobs, setDebouncedJobs] = useState(calcJobs);
  const [debouncedTicket, setDebouncedTicket] = useState(calcTicket);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedJobs(calcJobs);
      setDebouncedTicket(calcTicket);
    }, 150);
    return () => clearTimeout(timer);
  }, [calcJobs, calcTicket]);

  // Recommender State (Step-by-step)
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({
    businessType: "Plumbing",
    avgTicket: "500-1500",
    variation: "consistent",
    preference: "performance",
  });
  const [showRecResult, setShowRecResult] = useState(false);

  // Expandable Comparison & FAQ States
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const currSymbol = currency;

  // Unit Economics Calculator Logic (Uses debounced values)
  const calcGrossRevenue = debouncedJobs * debouncedTicket;
  const isCalcHighTicket = debouncedTicket >= 3000;
  const illustrativeRate = isCalcHighTicket ? 0.05 : 0.10;
  const calcExampleFee = Math.round(calcGrossRevenue * illustrativeRate);
  const calcRemaining = calcGrossRevenue - calcExampleFee;

  // Recommender Recommendation Engine
  const getRecommendationResult = () => {
    const { avgTicket, variation, preference } = userAnswers;
    if (avgTicket === "high-ticket" || variation === "variable" || preference === "tiered") {
      return {
        model: "Tiered Pricing",
        headline: "Tiered model looks like your strongest starting point.",
        why: "Your revenue is trackable, job sizes carry varying material and labor margins, and a predictable per-job fee protects high-ticket project profitability.",
        type: "tiered",
      };
    }
    if (preference === "flat") {
      return {
        model: "Flat-Fee Structure",
        headline: "Flat-fee structure looks like your strongest fit.",
        why: "You prefer predictable monthly operational budgeting, full system management, and retaining 100% of customer revenue.",
        type: "flat",
      };
    }
    return {
      model: "Performance Model",
      headline: "Performance model looks like your strongest fit.",
      why: "Your revenue is trackable, job economics are relatively consistent, and your average ticket supports an attribution-based commercial structure.",
      type: "performance",
    };
  };

  const recResult = getRecommendationResult();

  return (
    <main className="min-h-screen bg-[#F7F5EF] text-ink antialiased">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. EDITORIAL PRICING HERO (LIGHT, LEFT-ALIGNED 2-COLUMN) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full bg-[#00684f] px-6 pb-20 pt-[140px] text-white md:pb-28 md:pt-[170px]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subhead & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <Eyebrow className="mb-6 border-[#cbd810]/40 bg-[#cbd810] text-[#063d30]">
              Commercial Pricing Models
            </Eyebrow>

            <h1 className="mb-6 max-w-[760px] text-5xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Simple pricing. <span className="text-[#e7f34a]">Built around your business.</span>
            </h1>

            <p className="text-md mb-8 max-w-[620px] font-normal leading-relaxed text-white/75 md:text-lg">
              Choose performance, tiered, or flat pricing. Jadeed then builds the acquisition system around your service, margins, job value and customer journey.
            </p>

            {/* Currency Selector (Accessible Radiogroup) */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-semibold text-white/70">Currency:</span>
              <div
                role="radiogroup"
                aria-label="Select currency"
                className="inline-flex rounded-xl border border-white/15 bg-white/10 p-1"
              >
                {(["£", "$", "€"] as const).map((c) => {
                  const isChecked = currency === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setCurrency(c)}
                      className={`min-h-[44px] px-4 rounded-lg text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                        isChecked
                          ? "border border-white bg-white text-[#063d30] shadow-xs"
                          : "border border-transparent text-white/70 hover:text-white"
                      }`}
                    >
                      {c === "£" ? "£ GBP" : c === "$" ? "$ USD" : "€ EUR"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <CTAButton
                variant="primary"
                href="#recommender"
                label="Find my pricing model"
                className="w-full bg-[#cbd810] text-[#063d30] hover:bg-[#e7f34a] sm:w-auto"
              />
              <CTAButton
                variant="secondary"
                href="#models"
                label="Compare models"
                className="w-full border-white/30 bg-white text-[#063d30] hover:bg-white/90 sm:w-auto"
              />
            </div>

            {/* Trust Row */}
            <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t border-white/15 pt-8 text-sm font-medium text-white/75 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.5} />
                </span>
                <span>Ad spend stays separate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.5} />
                </span>
                <span>Revenue attribution</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.5} />
                </span>
                <span>Flexible commercial models</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Editorial Revenue Allocation Diagram */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[28px] border border-white/20 bg-[#F7F5EF] p-7 text-ink shadow-[0_22px_70px_rgba(0,0,0,0.18)] md:p-9">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.08]">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Revenue Allocation Model
                </span>
                <span className="text-xs bg-brand-tint text-brand font-semibold px-2.5 py-1 rounded-md">
                  Performance Example
                </span>
              </div>

              {/* Total Customer Revenue Header */}
              <div className="mb-6">
                <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-1">
                  Customer Collected Revenue
                </span>
                <div className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
                  {currSymbol}1,000
                </div>
              </div>

              {/* Proportional Split Bar */}
              <div className="mb-6">
                <div className="w-full h-3 bg-surface-track rounded-full overflow-hidden flex" aria-hidden="true">
                  <div className="w-[10%] bg-brand" title="Jadeed Fee (10%)" />
                  <div className="w-[90%] bg-brand-soft" title="Business Retained (90%)" />
                </div>
                <div className="flex justify-between text-xs font-medium text-ink/65 mt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand" aria-hidden="true" />
                    <span>Jadeed fee (10%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-soft" aria-hidden="true" />
                    <span>Business retained (90%)</span>
                  </span>
                </div>
              </div>

              {/* Numbers Breakdown */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-black/[0.08]">
                <div>
                  <span className="text-xs text-ink/65 block">Example Jadeed fee:</span>
                  <span className="text-xl font-bold text-brand">{currSymbol}100</span>
                </div>
                <div>
                  <span className="text-xs text-ink/65 block">Revenue retained:</span>
                  <span className="text-xl font-bold text-ink">{currSymbol}900</span>
                </div>
              </div>

              <Disclaimer className="mt-4">
                Illustrative commercial example. Actual commercial terms depend on agreed scope, margins, and attribution rules.
              </Disclaimer>

            </div>
          </div>

        </div>
      </section>

      {/* Proof-led implementation layout */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <div className="grid overflow-hidden rounded-[28px] border border-black/[0.16] bg-white p-3 md:grid-cols-[0.44fr_0.56fr] md:gap-10 md:p-10">
          <div className="relative min-h-[560px] overflow-hidden bg-[#DCEEE8] p-7 md:p-8">
            <span className="text-sm font-bold text-brand">Jadeed Solutions</span>
            <blockquote className="mt-9 max-w-[440px] text-xl leading-[1.45] text-ink/80">
              “Pricing should protect the client’s margin and keep both teams accountable. The right structure makes growth easier to measure—and easier to trust.”
            </blockquote>
            <div className="mt-10 relative z-10">
              <strong className="block text-lg text-[#063d30]">Sameer Ahmad Basra</strong>
              <span className="text-sm text-ink/60">Founder, Jadeed Solutions</span>
            </div>
            <Image src="/team/sameer-ahmad-basra.jpg" alt="Sameer Ahmad Basra, founder of Jadeed Solutions" width={420} height={420} className="absolute bottom-0 right-0 h-[300px] w-[300px] object-cover object-top md:h-[340px] md:w-[340px]" />
          </div>

          <div className="flex flex-col px-3 py-10 md:px-2 md:py-3">
            <h2 className="max-w-[720px] text-3xl font-semibold leading-tight tracking-[-0.035em] text-ink md:text-4xl">Implement a commercial model without rebuilding your operation.</h2>
            <ul className="mt-7 space-y-4 text-lg leading-relaxed text-ink/65">
              {["Choose performance, tiered or fixed pricing around real job economics", "Agree attribution, exclusions and payment rules before launch", "Move between models as volume and operational maturity change"].map((item) => <li key={item} className="flex gap-3"><span className="text-brand">•</span><span>{item}</span></li>)}
            </ul>
            <CTAButton variant="primary" href="/contact" label="Explore your best-fit model" className="mt-8 self-start" />
            <div className="mt-auto grid gap-3 pt-12 sm:grid-cols-2">
              {[{i:TargetIcon,t:"Attribution rules"},{i:LayersIcon,t:"Flexible structures"},{i:TrendingUpIcon,t:"Revenue reporting"},{i:GlobeIcon,t:"UK & US markets"}].map((item) => (
                <div key={item.t} className="flex min-h-14 items-center gap-3 border border-dashed border-black/30 px-4 text-sm font-semibold text-ink/80"><HugeiconsIcon icon={item.i} size={20} className="text-brand" />{item.t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust infrastructure layout */}
      <section className="bg-[#F7F5EF] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <div className="mx-auto max-w-[900px] text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Commercial infrastructure</span>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink md:text-6xl">A growth system your team can trust.</h2>
            <p className="mt-5 text-lg text-ink/60">Built for transparent attribution, reliable reporting and commercial clarity.</p>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.25fr_1fr] lg:items-center">
            <div className="space-y-10">
              {[{i:CheckCircleIcon,h:"Rules agreed upfront",p:"Attribution, exclusions and payment timing are documented before work begins."},{i:CodeIcon,h:"Your platforms stay yours",p:"Ad accounts, analytics and reporting remain visible and under your control."}].map((x)=><div key={x.h} className="border-b border-black/10 pb-9"><HugeiconsIcon icon={x.i} size={28} className="text-brand"/><h3 className="mt-4 text-2xl font-semibold">{x.h}</h3><p className="mt-3 leading-relaxed text-ink/60">{x.p}</p></div>)}
            </div>
            <div className="flex min-h-[460px] items-center justify-center border border-dashed border-brand/40 bg-[#DCEEE8] p-8">
              <div className="text-center"><HugeiconsIcon icon={CheckCircleIcon} size={132} strokeWidth={1.2} className="mx-auto text-[#00684f]"/><strong className="mt-8 block text-2xl text-[#063d30]">Measured. Reconciled. Transparent.</strong><span className="mt-2 block text-sm text-ink/60">One shared view from enquiry to collected revenue</span></div>
            </div>
            <div className="space-y-10">
              {[{i:TrendingUpIcon,h:"Clear monthly reporting",p:"See generated enquiries, completed jobs, attributed revenue and fees in one view."},{i:PhoneIcon,h:"Direct human support",p:"Commercial questions and attribution disputes are reviewed by the Jadeed team."}].map((x)=><div key={x.h} className="border-b border-black/10 pb-9"><HugeiconsIcon icon={x.i} size={28} className="text-brand"/><h3 className="mt-4 text-2xl font-semibold">{x.h}</h3><p className="mt-3 leading-relaxed text-ink/60">{x.p}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Capability and evidence layout */}
      <section className="mx-auto max-w-[1440px] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[980px] text-center"><span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Proof-led growth</span><h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink md:text-6xl">The building blocks of measurable acquisition.</h2><p className="mt-5 text-lg text-ink/60">Strategy, implementation, tracking and commercial alignment—connected as one system.</p></div>
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div><h3 className="text-3xl font-semibold leading-tight md:text-4xl">Test the right growth model without losing commercial control.</h3><ul className="mt-8 space-y-6">{["Launch focused SEO, website and paid-acquisition improvements", "Connect marketing activity to qualified enquiries and completed work", "Refine the commercial structure using observed job economics"].map(i=><li key={i} className="flex gap-4 text-lg leading-relaxed text-ink/65"><span className="mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#DCEEE8] text-brand"><HugeiconsIcon icon={CheckIcon} size={15}/></span>{i}</li>)}</ul></div>
          <div className="border border-black/[0.08] bg-[#DCEEE8] p-8 md:p-10"><Image src="/case-studies/alpha-movers/logo-alpha.png" alt="Alpha Movers" width={150} height={60} className="h-10 w-auto object-contain"/><blockquote className="mt-8 text-xl leading-relaxed text-ink/75">“A stronger technical foundation, focused local content and clearer service architecture produced measurable search growth.”</blockquote><div className="mt-8 overflow-hidden bg-white p-3"><Image src="/case-studies/alpha-movers/gsc-6-months.png" alt="Alpha Movers six month Google Search Console growth" width={900} height={520} className="h-auto w-full"/></div><Link href="/case-studies/alpha-movers" className="mt-7 inline-flex items-center gap-2 font-bold text-brand">View verified case study <HugeiconsIcon icon={ArrowRightIcon} size={17}/></Link></div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. THREE COMMERCIAL MODELS (PRESERVED TAB ARCHITECTURE) */}
      {/* ------------------------------------------------------------- */}
      <section id="models" className="max-w-[1280px] mx-auto px-6 py-20 md:py-24">
        
        <div className="max-w-[720px] mb-12 text-left">
          <span className="mb-3 inline-flex rounded-full bg-[#DCEEE8] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Commercial Structures
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-3">
            Three ways to work with Jadeed.
          </h2>
          <p className="text-md text-ink/75 font-normal leading-relaxed">
            The right structure depends on your margins, ticket size, job frequency and how predictable you want your costs to be.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              name: "Performance",
              strap: "Pay in line with attributable revenue.",
              value: "10%",
              unit: "illustrative standard-ticket rate",
              items: ["Fee follows collected revenue", "0% markup on ad spend", "Agreed attribution before launch"],
              recommended: true,
            },
            {
              number: "02",
              name: "Tiered",
              strap: "Predictable fees by completed job value.",
              value: "Custom",
              unit: "fixed tiers by job type or value",
              items: ["Protects high-ticket margins", "Simple job-level reconciliation", "Built for variable project values"],
              recommended: false,
            },
            {
              number: "03",
              name: "Flat Fee",
              strap: "A defined scope with fixed budgeting.",
              value: "Fixed",
              unit: "monthly or milestone-based scope",
              items: ["No revenue sharing", "Clear deliverables and timeline", "Best for predictable requirements"],
              recommended: false,
            },
          ].map((model) => (
            <article key={model.number} className={`relative flex h-full flex-col rounded-[24px] border p-6 md:p-7 ${model.recommended ? "border-[#00684f] bg-[#EAF6F2]" : "border-black/[0.09] bg-white"}`}>
              {model.recommended && <span className="absolute right-5 top-5 rounded-full bg-[#CBD810] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#063d30]">Recommended start</span>}
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">Model {model.number}</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink">{model.name}</h3>
              <p className="mt-2 min-h-[48px] text-base leading-relaxed text-ink/70">{model.strap}</p>
              <div className="my-6 border-y border-black/[0.08] py-5">
                <strong className="block text-4xl tracking-[-0.045em] text-ink">{model.value}</strong>
                <span className="mt-1 block text-sm text-ink/60">{model.unit}</span>
              </div>
              <ul className="mb-7 space-y-3">
                {model.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-ink/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#DCEEE8] text-brand" aria-hidden="true"><HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.5} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <CTAButton variant={model.recommended ? "primary" : "secondary"} href="/contact" label={model.recommended ? "Get my recommendation" : "Discuss this model"} className="mt-auto w-full" />
            </article>
          ))}
        </div>

        {/* Segmented Model Selector Tabs */}
        <div className="hidden" role="tablist" aria-label="Commercial Models">
          {[
            { id: "performance", label: "Performance" },
            { id: "tiered", label: "Tiered" },
            { id: "flat", label: "Flat Fee" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedModelTab === tab.id}
              onClick={() => setSelectedModelTab(tab.id as any)}
              className={`min-h-[44px] whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                selectedModelTab === tab.id
                  ? "border-black/[0.08] bg-white text-[#00684f] shadow-xs"
                  : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Model Panel */}
        <div className="hidden">
          
          {selectedModelTab === "performance" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="mb-3 inline-flex rounded-full bg-[#DCEEE8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  Model 01
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-2">
                  Performance
                </h3>
                <p className="text-base text-ink font-medium mb-4">
                  Align our fee with agreed attributable revenue.
                </p>
                <p className="text-base text-ink/75 leading-relaxed mb-6 font-normal">
                  Performance fees are tied to agreed attributable collected revenue. The exact attribution and payment rules are defined before launch.
                </p>

                <div className="space-y-2.5 text-sm text-ink font-medium mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Best for:</strong> Businesses with trackable customer revenue and relatively consistent job economics.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Billing basis:</strong> Agreed percentage of attributable collected revenue.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Ad spend:</strong> Paid directly to Google/Meta with 0% markup.</span>
                  </div>
                </div>

                <CTAButton
                  variant="primary"
                  href="/contact"
                  label="Get my pricing recommendation"
                  className="w-full sm:w-auto"
                />
              </div>

              {/* Deduplicated & Distinct Representative Calculation */}
              <div className="border-t border-black/[0.09] pt-6 lg:col-span-5 lg:rounded-2xl lg:border-0 lg:bg-[#DCEEE8] lg:p-7">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-ink/65 uppercase tracking-wider">
                    Representative Model Example
                  </span>
                  <a href="#calculator" className="text-xs text-brand font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm">
                    Calculate your volume ↓
                  </a>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Attributable revenue:</span>
                    <span className="font-bold text-ink">{currSymbol}1,500</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Illustrative rate:</span>
                    <span className="font-bold text-brand">10%</span>
                  </div>
                  <div className="flex justify-between pt-1 text-base font-bold text-ink">
                    <span>Jadeed fee:</span>
                    <span className="text-brand">{currSymbol}150</span>
                  </div>
                </div>
                <Disclaimer className="mt-4">
                  Illustrative commercial example. Actual commercial terms depend on agreed scope, margins, and attribution rules.
                </Disclaimer>
              </div>
            </div>
          )}

          {selectedModelTab === "tiered" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="mb-3 inline-flex rounded-full bg-[#DCEEE8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  Model 02
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-2">
                  Tiered
                </h3>
                <p className="text-base text-ink font-medium mb-4">
                  Simple fees based on job type or value.
                </p>
                <p className="text-base text-ink/75 leading-relaxed mb-6 font-normal">
                  Best for businesses with variable job sizes (such as HVAC, Roofing, or Remodeling) where material and subcontractor costs vary significantly. A fixed per-job tier keeps unit economics predictable.
                </p>

                <div className="space-y-2.5 text-sm text-ink font-medium mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Best for:</strong> Contractors, trades, and variable-ticket service operations.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Billing basis:</strong> Pre-agreed fixed fee per completed job size.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Margin safe:</strong> Protects gross margin on large equipment purchases.</span>
                  </div>
                </div>

                <CTAButton
                  variant="primary"
                  href="/contact"
                  label="Get my pricing recommendation"
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="border-t border-black/[0.09] pt-6 lg:col-span-5 lg:rounded-2xl lg:border-0 lg:bg-[#DCEEE8] lg:p-7">
                <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-3">
                  Illustrative HVAC / Trade Tiers
                </span>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Diagnostic / service check:</span>
                    <span className="font-bold text-brand">{currSymbol}25</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Residential under {currSymbol}10k:</span>
                    <span className="font-bold text-brand">{currSymbol}125</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Residential {currSymbol}10k–{currSymbol}15k:</span>
                    <span className="font-bold text-brand">{currSymbol}250</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-black/[0.06]">
                    <span className="text-ink/75">Residential {currSymbol}15k+:</span>
                    <span className="font-bold text-brand">{currSymbol}500</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-ink/75">Commercial projects:</span>
                    <span className="font-bold text-brand">{currSymbol}500</span>
                  </div>
                </div>
                <Disclaimer className="mt-4">
                  Illustrative structure only. Custom tiers are defined during technical onboarding.
                </Disclaimer>
              </div>
            </div>
          )}

          {selectedModelTab === "flat" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="mb-3 inline-flex rounded-full bg-[#DCEEE8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                  Model 03
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-2">
                  Flat
                </h3>
                <p className="text-base text-ink font-medium mb-4">
                  Predictable cost with a defined scope.
                </p>
                <p className="text-base text-ink/75 leading-relaxed mb-6 font-normal">
                  For businesses that prefer fixed monthly budgeting with zero revenue sharing. Jadeed builds and actively manages your entire acquisition infrastructure for an agreed project fee.
                </p>

                <div className="space-y-2.5 text-sm text-ink font-medium mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Best for:</strong> Teams seeking fixed monthly budgeting and operational clarity.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Billing basis:</strong> Fixed monthly or milestone-based project fee.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
                    <span><strong>Scope:</strong> Defined web development, local SEO, and campaign management.</span>
                  </div>
                </div>

                <CTAButton
                  variant="primary"
                  href="/contact"
                  label="Talk to Jadeed"
                  className="w-full sm:w-auto"
                />
              </div>

              <div className="border-t border-black/[0.09] pt-6 lg:col-span-5 lg:rounded-2xl lg:border-0 lg:bg-[#DCEEE8] lg:p-7">
                <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-3">
                  Scope Structure
                </span>
                <div className="text-3xl font-bold text-ink mb-2">
                  Custom
                </div>
                <p className="text-sm text-ink/75 leading-relaxed mb-4 font-normal">
                  Based on target market competition, required infrastructure layers, and ongoing campaign complexity.
                </p>
                <div className="p-3 bg-surface rounded-lg border border-black/[0.06] text-xs text-ink/70">
                  Fixed monthly cost • 100% of generated customer revenue remains with your business.
                </div>
              </div>
            </div>
          )}

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. STEP-BY-STEP MODEL RECOMMENDER (ACCESSIBLE DIAGNOSTIC) */}
      {/* ------------------------------------------------------------- */}
      <section id="recommender" className="w-full border-y border-black/[0.08] bg-[#DCEEE8] px-6 py-20 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          
          <div className="max-w-[680px] mb-10 text-left">
            <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
              Model Diagnostic
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-2">
              Find your likely best-fit model.
            </h2>
            <p className="text-base text-ink/75 font-normal">
              Answer 4 brief questions about your business to view your recommended commercial structure.
            </p>
          </div>

          <div className="border-y border-black/[0.09] py-7 md:rounded-2xl md:border md:bg-white md:p-10 md:shadow-xs">
            
            {!showRecResult ? (
              <div>
                {/* Step Progress Bar */}
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-ink/65 uppercase tracking-wider">
                  <span>Question {currentStep + 1} of {recommenderQuestions.length}</span>
                  <span>{Math.round(((currentStep + 1) / recommenderQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-muted rounded-full mb-8 overflow-hidden" aria-hidden="true">
                  <div
                    className="h-full bg-brand transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / recommenderQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                <h3 className="text-xl md:text-2xl font-semibold text-ink mb-6">
                  {recommenderQuestions[currentStep].question}
                </h3>

                {/* Options Grid */}
                <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8" role="group" aria-label="Question options">
                  {recommenderQuestions[currentStep].options.map((opt) => {
                    const field = recommenderQuestions[currentStep].id;
                    const isSelected = userAnswers[field] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setUserAnswers({ ...userAnswers, [field]: opt.value });
                        }}
                        className={`min-h-[54px] border-x-0 border-b border-t-0 bg-transparent px-1 py-4 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:rounded-xl sm:border sm:px-4 ${
                          isSelected
                            ? "border-brand text-brand font-bold sm:bg-brand-tint"
                            : "border-black/[0.12] text-ink/80 hover:border-brand/50 hover:text-brand font-medium sm:bg-[#F7F5EF]"
                        }`}
                      >
                        <div className="text-base font-semibold">{opt.label}</div>
                        {"desc" in opt && <div className="text-xs text-ink/65 mt-0.5 font-normal">{opt.desc}</div>}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-black/[0.08]">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                    className={`min-h-[44px] px-4 rounded-lg text-sm font-bold flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      currentStep === 0 ? "opacity-30 cursor-not-allowed text-black/40" : "text-ink/75 hover:text-ink cursor-pointer"
                    }`}
                  >
                    <HugeiconsIcon icon={ArrowLeftIcon} size={16} aria-hidden="true" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep < recommenderQuestions.length - 1) {
                        setCurrentStep((prev) => prev + 1);
                      } else {
                        setShowRecResult(true);
                      }
                    }}
                    className="min-h-[48px] px-6 rounded-xl bg-brand text-white text-sm font-semibold flex items-center gap-2 hover:bg-brand-dark transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <span>{currentStep === recommenderQuestions.length - 1 ? "View Recommendation" : "Next Question"}</span>
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : (
              /* Recommendation Result Card */
              <div className="text-left">
                <Eyebrow className="mb-4">
                  Recommended Starting Point
                </Eyebrow>

                <h3 className="text-2xl md:text-3xl font-semibold text-ink mb-3">
                  {recResult.headline}
                </h3>

                <div className="mb-8 border-l-2 border-brand py-1 pl-5">
                  <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-2">Why this fit:</span>
                  <p className="text-base text-ink/85 leading-relaxed font-normal">
                    {recResult.why}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <CTAButton
                    variant="primary"
                    href="/contact"
                    label="Discuss this structure"
                  />
                  <CTAButton
                    variant="secondary"
                    onClick={() => {
                      setShowRecResult(false);
                      setCurrentStep(0);
                    }}
                    label="See another model"
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. UNIT ECONOMICS CALCULATOR (FULLY SYNCHRONIZED BOUNDS) */}
      {/* ------------------------------------------------------------- */}
      <section id="calculator" className="max-w-[1280px] mx-auto px-6 py-20 md:py-24">
        
        <div className="max-w-[680px] mb-12 text-left">
          <span className="mb-3 inline-flex rounded-full bg-[#DCEEE8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
            Unit Economics
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-2">
            Interactive revenue & fee calculator.
          </h2>
          <p className="text-md text-ink/75 font-normal">
            Adjust completed jobs and average invoice value to see indicative performance fees.
          </p>
        </div>

        <div className="border-y border-black/[0.09] py-8 md:border-0 md:py-0">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            
            {/* Left Controls: Sliders + Steppers + Direct Number Inputs (Bounds: 1-100 & 100-30000) */}
            <div className="space-y-8 md:rounded-[24px] md:bg-white md:p-8 lg:col-span-7 lg:p-10">
              
              {/* Input 1: Completed Jobs */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor={`jobs-${jobsSliderId}`} className="text-base font-semibold text-ink">
                    Completed jobs per month:
                  </label>
                  
                  {/* Stepper Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCalcJobs((prev) => Math.max(MIN_JOBS, prev - 1))}
                      aria-label="Decrease completed jobs by 1"
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-black/[0.08] bg-white text-brand transition-colors hover:bg-[#DCEEE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <HugeiconsIcon icon={MinusIcon} size={18} strokeWidth={2.4} />
                    </button>
                    <input
                      id={`jobs-input-${jobsSliderId}`}
                      type="number"
                      min={MIN_JOBS}
                      max={MAX_JOBS}
                      step="1"
                      aria-label="Completed jobs count"
                      value={calcJobs}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setCalcJobs(isNaN(val) ? MIN_JOBS : val);
                      }}
                      onBlur={() => {
                        setCalcJobs(Math.max(MIN_JOBS, Math.min(MAX_JOBS, calcJobs)));
                      }}
                      className="w-14 h-11 text-md font-bold text-brand text-center bg-surface-canvas border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <button
                      type="button"
                      onClick={() => setCalcJobs((prev) => Math.min(MAX_JOBS, prev + 1))}
                      aria-label="Increase completed jobs by 1"
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-black/[0.08] bg-white text-brand transition-colors hover:bg-[#DCEEE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <HugeiconsIcon icon={PlusIcon} size={18} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>

                <input
                  id={`jobs-${jobsSliderId}`}
                  type="range"
                  min={MIN_JOBS}
                  max={MAX_JOBS}
                  step="1"
                  aria-label="Completed jobs slider"
                  value={calcJobs}
                  onChange={(e) => setCalcJobs(Number(e.target.value))}
                  className="calc-range"
                  style={{ "--calc-pct": `${((calcJobs - MIN_JOBS) / (MAX_JOBS - MIN_JOBS)) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-xs text-ink/65 mt-2 font-medium" aria-hidden="true">
                  <span>{MIN_JOBS} job</span>
                  <span>{Math.round((MIN_JOBS + MAX_JOBS) / 2)} jobs</span>
                  <span>{MAX_JOBS} jobs</span>
                </div>
              </div>

              {/* Input 2: Average Job Value */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor={`ticket-${ticketSliderId}`} className="text-base font-semibold text-ink">
                    Average invoice value:
                  </label>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCalcTicket((prev) => Math.max(MIN_TICKET, prev - 50))}
                      aria-label="Decrease average invoice value by 50"
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-black/[0.08] bg-white text-brand transition-colors hover:bg-[#DCEEE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <HugeiconsIcon icon={MinusIcon} size={18} strokeWidth={2.4} />
                    </button>
                    <span className="text-base font-bold text-ink/65">{currSymbol}</span>
                    <input
                      id={`ticket-input-${ticketSliderId}`}
                      type="number"
                      min={MIN_TICKET}
                      max={MAX_TICKET}
                      step="50"
                      aria-label="Average invoice value amount"
                      value={calcTicket}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setCalcTicket(isNaN(val) ? MIN_TICKET : val);
                      }}
                      onBlur={() => {
                        setCalcTicket(Math.max(MIN_TICKET, Math.min(MAX_TICKET, calcTicket)));
                      }}
                      className="w-24 h-11 text-md font-bold text-brand text-center bg-surface-canvas border border-black/[0.08] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                    <button
                      type="button"
                      onClick={() => setCalcTicket((prev) => Math.min(MAX_TICKET, prev + 50))}
                      aria-label="Increase average invoice value by 50"
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-black/[0.08] bg-white text-brand transition-colors hover:bg-[#DCEEE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <HugeiconsIcon icon={PlusIcon} size={18} strokeWidth={2.4} />
                    </button>
                  </div>
                </div>

                <input
                  id={`ticket-${ticketSliderId}`}
                  type="range"
                  min={MIN_TICKET}
                  max={MAX_TICKET}
                  step="50"
                  aria-label="Average invoice value slider"
                  value={calcTicket}
                  onChange={(e) => setCalcTicket(Number(e.target.value))}
                  className="calc-range"
                  style={{ "--calc-pct": `${((calcTicket - MIN_TICKET) / (MAX_TICKET - MIN_TICKET)) * 100}%` } as React.CSSProperties}
                />
                <div className="flex justify-between text-xs text-ink/65 mt-2 font-medium" aria-hidden="true">
                  <span>Low ({currSymbol}{MIN_TICKET})</span>
                  <span>Mid ({currSymbol}15k)</span>
                  <span>High ({currSymbol}30k)</span>
                </div>
              </div>

              {/* Helper Notice */}
              <div className="bg-surface-canvas border border-black/[0.06] rounded-xl p-4 text-sm text-ink/75 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-brand-tint text-brand flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                  <HugeiconsIcon icon={InfoIcon} size={14} />
                </span>
                <span>
                  {isCalcHighTicket ? (
                    <>
                      <strong>High-ticket range ({currSymbol}3,000+):</strong> Illustrative rate adjusts to ~5% or tiered fixed job fees to respect equipment and material overhead.
                    </>
                  ) : (
                    <>
                      <strong>Standard ticket range:</strong> Illustrative 10% rate applies to standard local residential and commercial service calls.
                    </>
                  )}
                </span>
              </div>

            </div>

            {/* Right Summary: recommendation-led calculator panel */}
            <div className="-mx-6 mt-3 flex flex-col justify-between bg-[#DCEEE8] px-6 py-8 md:m-0 md:rounded-[24px] md:p-8 lg:col-span-5">
              <div>
                <span className="mb-5 block text-xs font-bold uppercase tracking-[0.17em] text-[#063d30]">
                  Your indicative pricing signal
                </span>

                <div className="rounded-2xl border border-[#00684f]/20 bg-white p-5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink/55">Estimated attributed revenue / month</span>
                  <div className="mt-1 text-4xl font-bold tracking-[-0.04em] text-ink md:text-5xl">
                    {currSymbol}<AnimatedNumber value={calcGrossRevenue} />
                  </div>
                </div>

                <div className="my-4 rounded-2xl bg-white/70 p-5 text-base leading-snug text-[#173f34]">
                  {isCalcHighTicket ? (
                    <><strong>A lower percentage or tiered fee</strong> is likely the safer starting point for this ticket size.</>
                  ) : (
                    <><strong>Performance pricing is commercially viable</strong> at this indicative monthly revenue level.</>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="relative rounded-2xl border-2 border-[#00684f] bg-[#EAF6F2] p-5">
                    <span className="absolute -top-3 right-3 rounded-full bg-[#00684f] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Indicative fee</span>
                    <span className="block text-sm font-medium text-ink/70">Jadeed performance fee · {isCalcHighTicket ? "~5%" : "10%"}</span>
                    <strong className="mt-1 block text-3xl tracking-tight text-[#063d30]">{currSymbol}<AnimatedNumber value={calcExampleFee} /></strong>
                  </div>
                  <div className="rounded-2xl border border-[#00684f]/20 bg-transparent p-5">
                    <span className="block text-sm font-medium text-ink/70">Business retains</span>
                    <strong className="mt-1 block text-3xl tracking-tight text-ink">{currSymbol}<AnimatedNumber value={calcRemaining} /></strong>
                  </div>
                </div>

                <Disclaimer className="mt-5">Excludes ad spend, labor, materials, tax and operating costs. Indicative example only.</Disclaimer>
              </div>

              <CTAButton
                variant="primary"
                href="/contact"
                label="Get my pricing recommendation"
                className="w-full mt-8"
              />
            </div>

          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. HOW THE NUMBERS WORK & MARGIN PROTECTION (CONSOLIDATED) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full border-y border-black/[0.08] bg-[#F7F5EF] px-6 py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-left">
              <span className="mb-3 inline-flex rounded-full bg-[#CBD810] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#063d30]">
                Margin Protection
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-4">
                A {currSymbol}20,000 project is not {currSymbol}20,000 of profit.
              </h2>
              <p className="text-md text-ink/75 leading-relaxed mb-4 font-normal">
                For higher-ticket work, a lower percentage — such as 5% in some structures — or fixed job tiers may make more sense.
              </p>
              <p className="text-sm text-ink/70 leading-relaxed font-normal">
                Actual commercial terms depend on margins, scope, attribution rules and the agreed structure.
              </p>
            </div>

            {/* Right Side: Calculation Comparison Visual */}
            <div className="border-t border-black/[0.09] pt-7 lg:col-span-6 lg:rounded-2xl lg:border lg:bg-white lg:p-8">
              <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-4">
                High-Ticket Calculation Comparison
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-black/[0.08]">
                <div className="p-3 bg-surface-canvas rounded-xl border border-black/[0.06]">
                  <span className="text-xs text-ink/65 block">Project revenue</span>
                  <div className="text-xl font-bold text-ink mt-0.5">{currSymbol}20,000</div>
                </div>

                <div className="p-3 bg-brand-tint rounded-xl border border-brand/15">
                  <span className="text-xs text-brand block">Illustrative rate</span>
                  <div className="text-xl font-bold text-brand mt-0.5">5%</div>
                </div>

                <div className="p-3 bg-surface-canvas rounded-xl border border-black/[0.06]">
                  <span className="text-xs text-ink/65 block">Example Jadeed fee</span>
                  <div className="text-xl font-bold text-ink mt-0.5">{currSymbol}1,000</div>
                </div>
              </div>

              <Disclaimer className="mt-4">
                Actual commercial structure depends on margins, scope, and attribution rules agreed during technical onboarding.
              </Disclaimer>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. COMPLETE ACQUISITION SYSTEM (CONNECTED PIPELINE ARCHITECTURE) */}
      {/* ------------------------------------------------------------- */}
      <section className="hidden" aria-hidden="true">
        
        <div className="max-w-[760px] mx-auto text-center mb-14">
          <Eyebrow className="mb-4">
            System Architecture
          </Eyebrow>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-3">
            One connected system from search to revenue.
          </h2>
          <p className="text-md text-ink/75 font-normal">
            Every dollar in marketing connects directly to an automated 6-stage infrastructure engineered to capture, book, and retain high-value local customers.
          </p>
        </div>

        {/* Desktop Connected Journey (6 Modular Cards with Directional Flow) */}
        <div className="hidden lg:block bg-surface border border-black/[0.08] rounded-2xl p-8 shadow-xs">
          
          {/* Top Stage Connector Header */}
          <div className="grid grid-cols-6 gap-4 pb-6 mb-8 border-b border-black/[0.08] relative">
            {funnelStages.map((st, idx) => (
              <div key={st.step} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-tint text-brand text-xs font-extrabold flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">
                    {st.phase}
                  </span>
                </div>
                {idx < funnelStages.length - 1 && (
                  <span className="text-black/25 font-bold pr-2" aria-hidden="true">→</span>
                )}
              </div>
            ))}
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-6 gap-5">
            {funnelStages.map((st) => (
              <div
                key={st.step}
                className="group flex flex-col justify-between bg-surface-canvas hover:bg-brand-tint/30 border border-black/[0.06] hover:border-brand/30 rounded-xl p-5 transition-all duration-200"
              >
                <div>
                  {/* Card Top: Icon & Step */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-black/[0.08] text-brand flex items-center justify-center group-hover:scale-105 group-hover:bg-brand group-hover:text-white transition-all shadow-xs" aria-hidden="true">
                      <HugeiconsIcon icon={st.icon} size={18} strokeWidth={2} />
                    </div>
                    <span className="text-xs font-mono font-bold text-ink/40">
                      #{st.step}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-ink mb-1 group-hover:text-brand transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-xs text-ink/65 mb-4 leading-relaxed font-normal min-h-[32px]">
                    {st.summary}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-black/[0.06]">
                    {st.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5 text-xs text-ink/75 font-normal">
                        <span className="w-3.5 h-3.5 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                          <HugeiconsIcon icon={CheckIcon} size={9} strokeWidth={3} />
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Journey Pipeline Flow Banner */}
          <div className="mt-8 pt-6 border-t border-black/[0.08] flex items-center justify-between text-xs text-ink/70 bg-surface-canvas/60 rounded-xl px-5 py-3.5 border border-black/[0.05]">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
              <span><strong>Input:</strong> High-intent local searches (Google, Maps & Ads)</span>
            </div>
            <span className="text-brand font-bold flex items-center gap-1" aria-hidden="true">
              <span>Automated Closed-Loop Pipeline</span>
              <span>───────→</span>
            </span>
            <div className="flex items-center gap-2 font-medium text-brand">
              <span className="w-2 h-2 rounded-full bg-brand" aria-hidden="true" />
              <span><strong>Output:</strong> Cleared Revenue & Compounding 5-Star Reviews</span>
            </div>
          </div>

        </div>

        {/* Mobile & Tablet Vertical Timeline (< 1024px) */}
        <div className="lg:hidden relative pl-6 border-l-2 border-brand/30 space-y-6 ml-2">
          {funnelStages.map((st) => (
            <div key={st.step} className="relative bg-surface border border-black/[0.08] rounded-xl p-5 shadow-xs">
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-brand border-2 border-white" aria-hidden="true" />
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand-tint px-2 py-0.5 rounded-md">
                    Stage {st.step} · {st.phase}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-brand-tint text-brand flex items-center justify-center" aria-hidden="true">
                  <HugeiconsIcon icon={st.icon} size={16} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-ink mb-1">
                {st.name}
              </h3>
              <p className="text-xs text-ink/65 mb-3 font-normal">
                {st.summary}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-black/[0.06]">
                {st.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-1.5 text-xs text-ink/75 font-normal">
                    <span className="w-3.5 h-3.5 rounded-full bg-brand-tint text-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <HugeiconsIcon icon={CheckIcon} size={9} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Optional Operations Sub-Section */}
        <div className="mt-10 p-6 bg-surface-muted/60 border border-black/[0.06] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-1">
              Field Operations (Optional Add-on)
            </span>
            <h4 className="text-md font-bold text-ink">
              Need field technician apps and dispatch workflows?
            </h4>
            <p className="text-sm text-ink/75 mt-0.5 font-normal">
              Optional mobile apps (iOS/Android), team scheduling, technician job notifications, and live customer ETA alerts.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-sm font-bold text-brand hover:underline whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Ask about field tools →
          </Link>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. TRANSPARENCY & GOVERNANCE (PALE GREEN SURFACE) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full border-y border-black/[0.08] bg-[#DCEEE8] px-6 py-20 md:py-24">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-left">
              <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Transparency & Governance
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-6">
                Clear fees. Clear attribution.
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-surface text-brand flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-xs" aria-hidden="true">
                    <HugeiconsIcon icon={CheckIcon} size={14} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h4 className="text-md font-bold text-ink">Your ad budget stays separate</h4>
                    <p className="text-sm text-ink/75 mt-0.5 font-normal">
                      Ad spend is paid directly to Google or Meta with zero markup or hidden fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-surface text-brand flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-xs" aria-hidden="true">
                    <HugeiconsIcon icon={CheckIcon} size={14} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h4 className="text-md font-bold text-ink">Attribution rules are agreed upfront</h4>
                    <p className="text-sm text-ink/75 mt-0.5 font-normal">
                      Dynamic call tracking and CRM timestamps clearly identify new inquiries versus existing clients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-surface text-brand flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-xs" aria-hidden="true">
                    <HugeiconsIcon icon={CheckIcon} size={14} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h4 className="text-md font-bold text-ink">Reporting connects acquisition to revenue</h4>
                    <p className="text-sm text-ink/75 mt-0.5 font-normal">
                      Your reconciliation dashboard shows exact inquiries, estimates sent, and jobs completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Breakdown Card */}
            <div className="border-t border-black/[0.09] pt-7 lg:col-span-6 lg:rounded-2xl lg:border lg:bg-white lg:p-8">
              <span className="text-xs font-bold text-ink/65 uppercase tracking-wider block mb-4">
                A Simple Financial Breakdown
              </span>

              <div className="space-y-3 pb-6 border-b border-black/[0.08] text-sm">
                <div className="flex justify-between p-3 bg-surface-canvas rounded-lg">
                  <span className="text-ink/75">Google Ad Spend (Direct platform billing):</span>
                  <span className="font-bold text-ink">{currSymbol}1,200</span>
                </div>

                <div className="flex justify-between p-3 bg-surface-canvas rounded-lg">
                  <span className="text-ink/75">Attributed Booked Revenue (12 completed jobs):</span>
                  <span className="font-bold text-brand">{currSymbol}8,400</span>
                </div>

                <div className="flex justify-between p-3 bg-brand-tint rounded-lg text-brand">
                  <span className="font-semibold">Jadeed Performance Fee (10% illustrative):</span>
                  <span className="font-bold">{currSymbol}840</span>
                </div>
              </div>

              <Disclaimer className="mt-4">
                Every marketing expenditure is segregated so that performance and customer acquisition costs remain fully transparent.
              </Disclaimer>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. EXPANDABLE MODEL COMPARISON (NON-REDUNDANT COPY) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 md:py-24">
        
        <div className="max-w-[700px] mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-2">
            Compare models in detail.
          </h2>
          <p className="text-md text-ink/75 font-normal">
            A granular breakdown of billing mechanics, deliverables, and requirements.
          </p>
        </div>

        {/* Trigger button uses distinct copy: "View detailed breakdown" */}
        <div className="text-center mb-8">
          <button
            type="button"
            aria-expanded={comparisonOpen}
            aria-controls="comparison-breakdown-panel"
            onClick={() => setComparisonOpen(!comparisonOpen)}
            className="inline-flex min-h-[48px] items-center gap-2 bg-surface border border-black/[0.12] text-ink font-semibold px-6 py-2.5 rounded-xl hover:bg-surface-muted transition-all text-sm cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <span>{comparisonOpen ? "Hide detailed breakdown" : "View detailed breakdown"}</span>
            <HugeiconsIcon
              icon={ArrowDownIcon}
              size={16}
              aria-hidden="true"
              className={`transition-transform duration-200 ${comparisonOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {comparisonOpen && (
          <div id="comparison-breakdown-panel" role="region" aria-label="Detailed model comparison breakdown" className="bg-surface border border-black/[0.08] rounded-2xl overflow-hidden shadow-xs">
            
            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-muted border-b border-black/[0.08] text-xs font-bold uppercase tracking-wider text-ink/75">
                    <th className="p-4 pl-6 w-[260px]">Dimension</th>
                    <th className="p-4 text-brand">Performance</th>
                    <th className="p-4">Tiered</th>
                    <th className="p-4">Flat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.05] text-sm text-ink/85 font-medium">
                  {comparisonRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-surface-canvas transition-colors">
                      <td className="p-4 pl-6 font-semibold text-ink">{row.dimension}</td>
                      <td className="p-4 text-brand font-medium">{row.performance}</td>
                      <td className="p-4 text-ink/75">{row.tiered}</td>
                      <td className="p-4 text-ink/75">{row.flat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View (< 768px) */}
            <div className="md:hidden divide-y divide-black/[0.08]">
              {[
                { name: "Performance Model", dataKey: "performance" as const },
                { name: "Tiered Model", dataKey: "tiered" as const },
                { name: "Flat Model", dataKey: "flat" as const },
              ].map((m, mIdx) => (
                <div key={mIdx} className="p-5">
                  <h4 className="text-md font-bold text-brand mb-3">{m.name}</h4>
                  <div className="space-y-2.5 text-sm">
                    {comparisonRows.map((row, rIdx) => (
                      <div key={rIdx} className="flex justify-between py-1 border-b border-black/[0.04]">
                        <span className="text-ink/65 font-medium">{row.dimension}:</span>
                        <span className="text-ink font-semibold text-right max-w-[55%]">{row[m.dataKey]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE ARIA-CONTROLS ACCORDION) */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto my-10 max-w-[1280px] rounded-[32px] bg-[#DCEEE8] px-6 py-20 md:px-12 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-brand">
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-ink md:text-5xl">
            Pricing, without the fine-print fog.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
            Clear answers on attribution, fees, ad spend and which commercial model fits your business.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const panelId = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;
            const isExpanded = activeFaq === idx;

            return (
              <div key={idx} className={`overflow-hidden rounded-[20px] transition-colors duration-700 ${isExpanded ? "bg-[#F7F5EF]" : "bg-white"}`}>
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => setActiveFaq(isExpanded ? null : idx)}
                  className="flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-5 p-5 text-left text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:px-7 md:py-6 md:text-lg"
                >
                  <span>{faq.q}</span>
                  <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#00684f] transition-colors duration-700 ${isExpanded ? "bg-[#00684f] text-white" : "bg-white text-[#00684f]"}`} aria-hidden="true">
                    <HugeiconsIcon
                      icon={isExpanded ? MinusIcon : PlusIcon}
                      size={18}
                      strokeWidth={2.2}
                    />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={questionId}
                      aria-hidden={!isExpanded}
                      className="max-w-[760px] px-5 pb-6 pr-16 text-base font-normal leading-relaxed text-ink/70 md:px-7 md:pb-7 md:pr-20"
                    >
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
        <div className="grid items-center gap-7 rounded-[28px] bg-[#00684f] p-7 text-white md:grid-cols-[1fr_auto] md:p-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#CBD810] text-[#063d30]" aria-hidden="true">
              <HugeiconsIcon icon={SmartphoneIcon} size={23} strokeWidth={2} />
            </span>
            <div>
              <span className="mb-2 inline-flex rounded-full border border-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.17em] text-[#CBD810]">
                Field Operations · Optional Add-on
              </span>
              <h2 className="text-2xl font-semibold tracking-[-0.025em] md:text-3xl">Connect marketing to the team doing the work.</h2>
              <p className="mt-2 max-w-[720px] text-sm leading-relaxed text-white/75 md:text-base">Add technician apps, dispatch workflows, job notifications and live customer ETA alerts when your operation is ready for them.</p>
            </div>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#CBD810] px-5 text-sm font-bold text-[#063d30] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Explore field tools
            <HugeiconsIcon icon={ArrowRightIcon} size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. FINAL CONVERSION CTA */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-[#F7F5EF] py-20 md:py-28">
        <div className="relative z-10 mx-auto max-w-[820px] px-6 text-center">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-ink md:text-6xl">
            Tell us what a typical job is worth.
          </h2>

          <p className="mx-auto mb-8 mt-5 max-w-[620px] text-base font-normal leading-relaxed text-ink/75 md:text-lg">
            We'll show you what the commercial structure could look like and how the acquisition system connects to your revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <CTAButton
              variant="primary"
              href="/contact"
              label="Get my pricing recommendation"
              className="w-full !bg-black text-white hover:!bg-[#00684f] sm:w-auto"
            />
            <CTAButton
              variant="secondary"
              href="/contact"
              label="Talk to Jadeed"
              className="w-full border border-black bg-transparent text-ink hover:bg-white sm:w-auto"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
