"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  CheckIcon,
  ClockIcon,
  TrendingUpIcon,
  SparklesIcon,
  SearchIcon,
} from "@/components/icons";

interface MonthPlan {
  month: string;
  badge: string;
  theme: {
    tabActive: string;
    pill: string;
    dot: string;
    border: string;
  };
  title: string;
  focus: string;
  deliverables: string[];
  recommendedTools: string[];
}

const ROADMAP: MonthPlan[] = [
  {
    month: "Month 1",
    badge: "Foundation & Tech",
    theme: {
      tabActive: "bg-indigo-600 text-white shadow-md",
      pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
      dot: "bg-indigo-500",
      border: "border-indigo-200",
    },
    title: "Technical Hygiene & Intent Architecture",
    focus: "Eliminate crawl errors, build canonical URL hierarchies, pre-render key HTML, and claim the Google Business Profile.",
    deliverables: [
      "In-depth competitor gap analysis for target London boroughs",
      "Intent-based keyword clustering (Commercial vs Local vs Info)",
      "Next.js technical SEO setup (Metadata API, robots.txt, XML sitemap)",
      "Google Business Profile optimization (Primary category, services, photos)",
      "Conversion tracking setup (GSC, GA4 event tags for calls & quote forms)",
    ],
    recommendedTools: ["Google Search Console", "PageSpeed Insights", "Google Business Profile Manager"],
  },
  {
    month: "Month 2",
    badge: "Local Expansion",
    theme: {
      tabActive: "bg-emerald-600 text-white shadow-md",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      border: "border-emerald-200",
    },
    title: "Borough Landing Hubs & Schema Markup",
    focus: "Launch hyper-localized landing hubs with unique logistics information, structured data, and trusted citation listings.",
    deliverables: [
      "Launch strategic borough pages (e.g. Camden, Westminster, Croydon) with unique local logistics data",
      "Implement Schema.org LocalBusiness, MovingCompany & Service JSON-LD",
      "Validate BreadcrumbList markup in Google Rich Results Test",
      "Initiate automated review acquisition workflow with recent customers",
      "Submit consistent NAP across top 15 verified UK directories (Yell, FreeIndex, Trustpilot)",
    ],
    recommendedTools: ["Schema.org Validator", "Google Rich Results Test", "Yell / Trustpilot"],
  },
  {
    month: "Month 3",
    badge: "Topical Authority",
    theme: {
      tabActive: "bg-amber-600 text-white shadow-md",
      pill: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      border: "border-amber-200",
    },
    title: "Educational Content & Local Digital PR",
    focus: "Cover the entire buyer moving journey to build topical authority and earn high-relevance London editorial backlinks.",
    deliverables: [
      "Publish full moving checklists and pricing guides (e.g., 'London Removal Costs 2026')",
      "Launch specialized guides for borough parking suspension permits and fragile packing",
      "Distribute digital PR story on regional relocation trends to local London news portals",
      "Establish cross-referral partnerships with local estate agents and self-storage providers",
      "Internal linking overhaul connecting informational guides to commercial booking forms",
    ],
    recommendedTools: ["Ahrefs / Semrush", "HARO / Featured", "Local PR Outlets"],
  },
  {
    month: "Month 4+",
    badge: "Scale & CRO",
    theme: {
      tabActive: "bg-brand-500 text-white shadow-md",
      pill: "bg-orange-50 text-orange-700 border-orange-200",
      dot: "bg-brand-500",
      border: "border-orange-200",
    },
    title: "GSC Performance Tuning & Conversion Optimization",
    focus: "Use Search Console impression data to optimize titles, improve CTR, and streamline the quotation funnel for higher booking rates.",
    deliverables: [
      "Audit GSC queries ranking positions 8–15 and enrich content depth to push to top 3",
      "A/B test meta titles and descriptions on high-impression low-CTR URLs",
      "Optimize mobile quote calculator and contact forms to increase conversion rate",
      "Expand into secondary borough clusters based on organic search demand",
      "Quarterly review of Core Web Vitals to maintain sub-2.5s LCP on real-world mobile traffic",
    ],
    recommendedTools: ["Google Search Console", "Hotjar / Clarity", "Google Analytics 4"],
  },
];

export function InteractiveRoadmap() {
  const [activeTab, setActiveTab] = useState(0);
  const current = ROADMAP[activeTab];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
            <HugeiconsIcon icon={ClockIcon} size={14} />
            Interactive Timeline
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            4-Month Local SEO Implementation Roadmap
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-1.5">
        {ROADMAP.map((item, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={item.month}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] rounded-xl px-4 py-2.5 text-center text-xs font-bold transition-all ${
                isActive
                  ? item.theme.tabActive
                  : "text-slate-600 hover:bg-white/80 hover:text-ink"
              }`}
            >
              <span className="block text-xs opacity-90">{item.month}</span>
              <span className="block text-[11px] font-medium">{item.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${current.theme.pill}`}>
              <span className={`h-2 w-2 rounded-full ${current.theme.dot}`} />
              {current.month} Priority
            </span>
            <h4 className="mt-1.5 font-display text-lg font-bold text-ink">
              {current.title}
            </h4>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-600">
          <strong className="text-slate-900">Strategic Focus:</strong> {current.focus}
        </p>

        {/* Deliverables Checklist */}
        <div className="mt-4 space-y-2.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Key Deliverables & Action Items
          </p>
          {current.deliverables.map((deliv, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white p-3 border border-slate-200/60 shadow-2xs">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-slate-900 text-white text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <span className="text-xs font-medium text-slate-800 leading-relaxed">
                {deliv}
              </span>
            </div>
          ))}
        </div>

        {/* Tools chips */}
        <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200">
          <span className="text-xs font-bold text-slate-500">Recommended Tools:</span>
          {current.recommendedTools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
