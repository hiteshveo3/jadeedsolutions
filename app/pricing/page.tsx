"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
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
    <main className="min-h-screen bg-surface-canvas text-ink antialiased">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. EDITORIAL PRICING HERO (LIGHT, LEFT-ALIGNED 2-COLUMN) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full pt-[140px] md:pt-[160px] pb-16 md:pb-24 px-6 border-b border-black/[0.08] bg-surface">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subhead & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <Eyebrow className="mb-6">
              Commercial Pricing Models
            </Eyebrow>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight mb-6 max-w-[700px]">
              Simple pricing. Built around your business.
            </h1>

            <p className="text-md md:text-lg text-ink/75 font-normal leading-relaxed mb-8 max-w-[620px]">
              Choose performance, tiered, or flat pricing. Jadeed then builds the acquisition system around your service, margins, job value and customer journey.
            </p>

            {/* Currency Selector (Accessible Radiogroup) */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm font-semibold text-ink/70">Currency:</span>
              <div
                role="radiogroup"
                aria-label="Select currency"
                className="inline-flex bg-surface-muted p-1 rounded-xl border border-black/[0.08]"
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
                          ? "bg-surface text-ink shadow-xs border border-black/[0.08]"
                          : "text-ink/65 hover:text-ink border border-transparent"
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
                className="w-full sm:w-auto"
              />
              <CTAButton
                variant="secondary"
                href="#models"
                label="Compare models"
                className="w-full sm:w-auto"
              />
            </div>

            {/* Trust Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-black/[0.08] w-full text-sm text-ink/75 font-medium">
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
            <div className="bg-surface-canvas border border-black/[0.08] rounded-2xl p-7 md:p-8">
              
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

      {/* ------------------------------------------------------------- */}
      {/* 2. THREE COMMERCIAL MODELS (PRESERVED TAB ARCHITECTURE) */}
      {/* ------------------------------------------------------------- */}
      <section id="models" className="max-w-[1280px] mx-auto px-6 py-20 md:py-24">
        
        <div className="max-w-[720px] mb-12 text-left">
          <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
            Commercial Structures
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-3">
            Three ways to work with Jadeed.
          </h2>
          <p className="text-md text-ink/75 font-normal leading-relaxed">
            The right structure depends on your margins, ticket size, job frequency and how predictable you want your costs to be.
          </p>
        </div>

        {/* Segmented Model Selector Tabs */}
        <div className="flex border-b border-black/[0.08] mb-8 overflow-x-auto" role="tablist" aria-label="Commercial Models">
          {[
            { id: "performance", label: "Performance Model" },
            { id: "tiered", label: "Tiered Pricing" },
            { id: "flat", label: "Flat-Fee Structure" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedModelTab === tab.id}
              onClick={() => setSelectedModelTab(tab.id as any)}
              className={`min-h-[48px] px-6 py-3 text-base font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                selectedModelTab === tab.id
                  ? "border-brand text-brand bg-brand-tint/40"
                  : "border-transparent text-ink/65 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Model Panel */}
        <div className="bg-surface border border-black/[0.08] rounded-2xl p-7 md:p-10">
          
          {selectedModelTab === "performance" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
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
                />
              </div>

              {/* Deduplicated & Distinct Representative Calculation */}
              <div className="lg:col-span-5 bg-surface-canvas border border-black/[0.08] rounded-xl p-6">
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
                <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
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
                />
              </div>

              <div className="lg:col-span-5 bg-surface-canvas border border-black/[0.08] rounded-xl p-6">
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
                <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
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
                />
              </div>

              <div className="lg:col-span-5 bg-surface-canvas border border-black/[0.08] rounded-xl p-6">
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
      <section id="recommender" className="w-full bg-brand-tint border-y border-black/[0.08] py-20 md:py-24 px-6">
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

          <div className="bg-surface border border-black/[0.08] rounded-2xl p-6 md:p-10 shadow-xs">
            
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" role="group" aria-label="Question options">
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
                        className={`min-h-[50px] p-4 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                          isSelected
                            ? "border-brand bg-brand-tint text-brand font-bold"
                            : "border-black/[0.08] bg-surface-canvas text-ink/80 hover:border-black/25 font-medium"
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

                <div className="bg-surface-canvas border border-black/[0.08] rounded-xl p-5 mb-8">
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
          <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
            Unit Economics
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink leading-tight mb-2">
            Interactive revenue & fee calculator.
          </h2>
          <p className="text-md text-ink/75 font-normal">
            Adjust completed jobs and average invoice value to see indicative performance fees.
          </p>
        </div>

        <div className="bg-surface border border-black/[0.08] rounded-2xl p-7 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Controls: Sliders + Steppers + Direct Number Inputs (Bounds: 1-100 & 100-30000) */}
            <div className="lg:col-span-7 space-y-8">
              
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
                      className="w-11 h-11 rounded-lg bg-surface-muted text-ink font-bold text-lg flex items-center justify-center hover:bg-surface-track cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      –
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
                      className="w-11 h-11 rounded-lg bg-surface-muted text-ink font-bold text-lg flex items-center justify-center hover:bg-surface-track cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      +
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
                  className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-brand"
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
                  
                  <div className="flex items-center gap-1">
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
                  className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-brand"
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

            {/* Right Summary: Pale Green Editorial Financial Panel */}
            <div className="lg:col-span-5 bg-surface-mint border border-brand/15 rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand block mb-3">
                  Financial Summary (Indicative)
                </span>

                <div className="space-y-4 pb-6 border-b border-black/[0.08]">
                  <div>
                    <span className="text-sm text-ink/70 block">Estimated attributed revenue:</span>
                    <div className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
                      {currSymbol}{calcGrossRevenue.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm pt-1">
                    <span className="text-ink/75">Example Jadeed fee ({isCalcHighTicket ? "~5%" : "10%"}):</span>
                    <span className="font-bold text-brand">{currSymbol}{calcExampleFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm pt-1">
                    <span className="text-ink/75">Revenue after example fee:</span>
                    <span className="font-bold text-ink">{currSymbol}{calcRemaining.toLocaleString()}</span>
                  </div>
                </div>

                <Disclaimer className="mt-4">
                  Excludes ad spend, labor, materials, tax and operating costs. Indicative performance example only.
                </Disclaimer>
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
      <section className="w-full bg-surface-warm border-y border-black/[0.08] py-20 md:py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
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
            <div className="lg:col-span-6 bg-surface border border-black/[0.08] rounded-2xl p-7 md:p-8">
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
      <section className="max-w-[1320px] mx-auto px-6 py-20 md:py-24">
        
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
      <section className="w-full bg-brand-tint border-y border-black/[0.08] py-20 md:py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-left">
              <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
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
            <div className="lg:col-span-6 bg-surface border border-black/[0.08] rounded-2xl p-7 md:p-8">
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
      <section className="max-w-[960px] mx-auto px-6 pb-20 md:py-24">
        
        <div className="text-center max-w-[620px] mx-auto mb-12">
          <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink">
            Everything you need to know.
          </h2>
        </div>

        {/* Grouped Accordion Container with aria-controls & id pairings */}
        <div className="bg-surface border border-black/[0.08] rounded-2xl divide-y divide-black/[0.08] shadow-xs">
          {faqs.map((faq, idx) => {
            const panelId = `faq-answer-${idx}`;
            const questionId = `faq-question-${idx}`;
            const isExpanded = activeFaq === idx;

            return (
              <div key={idx} className="transition-colors">
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => setActiveFaq(isExpanded ? null : idx)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 font-semibold text-base md:text-md text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span>{faq.q}</span>
                  <span className="w-8 h-8 rounded-lg bg-surface-muted text-ink/75 flex items-center justify-center text-sm flex-shrink-0" aria-hidden="true">
                    <HugeiconsIcon
                      icon={ArrowDownIcon}
                      size={16}
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {isExpanded && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={questionId}
                    className="px-5 md:px-6 pb-6 pt-1 text-base text-ink/75 leading-relaxed font-normal"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. FINAL CONVERSION CTA (PALE GREEN SURFACE) */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full bg-brand-tint border-t border-black/[0.08] py-20 md:py-24 px-6">
        <div className="max-w-[1000px] mx-auto bg-surface border border-black/[0.08] rounded-2xl p-8 md:p-14 text-center shadow-xs">
          
          <Eyebrow className="mb-6">
            Get Started
          </Eyebrow>

          <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-3 leading-tight">
            Tell us what a typical job is worth.
          </h2>

          <p className="text-ink/75 text-md md:text-lg max-w-[580px] mx-auto mb-8 leading-relaxed font-normal">
            We'll show you what the commercial structure could look like and how the acquisition system connects to your revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <CTAButton
              variant="primary"
              href="/contact"
              label="Get my pricing recommendation"
              className="w-full sm:w-auto"
            />
            <CTAButton
              variant="secondary"
              href="/contact"
              label="Talk to Jadeed"
              className="w-full sm:w-auto"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
