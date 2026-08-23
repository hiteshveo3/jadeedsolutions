"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  CheckIcon,
  SparklesIcon,
  AlertIcon,
  CheckCircleIcon,
  TrendingUpIcon,
} from "@/components/icons";

interface AuditItem {
  id: string;
  category: "Technical" | "GBP & Local" | "Content & Arch" | "Citations & Links" | "Tracking";
  label: string;
  points: number;
}

const AUDIT_ITEMS: AuditItem[] = [
  { id: "tech-1", category: "Technical", label: "Pages pass Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)", points: 10 },
  { id: "tech-2", category: "Technical", label: "Robots.txt & XML sitemaps are active and indexed without errors", points: 10 },
  { id: "tech-3", category: "Technical", label: "Schema.org structured data (LocalBusiness & Service) validated", points: 10 },
  { id: "gbp-1", category: "GBP & Local", label: "Primary GBP category is 100% accurate with itemized services added", points: 10 },
  { id: "gbp-2", category: "GBP & Local", label: "Active process to acquire genuine reviews and reply to all feedback", points: 10 },
  { id: "gbp-3", category: "GBP & Local", label: "Authentic branded photos of team, vehicles, and real jobs uploaded", points: 10 },
  { id: "arch-1", category: "Content & Arch", label: "Dedicated pages for each major service (not crammed on one page)", points: 10 },
  { id: "arch-2", category: "Content & Arch", label: "Strategic location pages with genuine local value (not thin doorway pages)", points: 10 },
  { id: "links-1", category: "Citations & Links", label: "Consistent NAP on verified directories (Yell, Trustpilot, Industry bodies)", points: 10 },
  { id: "track-1", category: "Tracking", label: "GSC + Conversion goals tracking phone calls, quotes, and revenue", points: 10 },
];

export function LocalSeoAuditCalculator() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "tech-2": true,
    "gbp-1": true,
    "arch-1": true,
  });

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalScore = AUDIT_ITEMS.reduce((sum, item) => sum + (checked[item.id] ? item.points : 0), 0);

  const getTier = (score: number) => {
    if (score >= 80) {
      return {
        label: "Elite Local Leader",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        barColor: "bg-emerald-500",
        message: "Excellent foundation! Your website and GBP ecosystem are primed to dominate Google Local Pack & organic search.",
      };
    }
    if (score >= 50) {
      return {
        label: "Growing Contender",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        barColor: "bg-amber-500",
        message: "Solid start, but critical gaps in structured data, location pages, or conversion tracking are costing you calls.",
      };
    }
    return {
      label: "Needs Immediate Action",
      color: "text-rose-600 bg-rose-50 border-rose-200",
      barColor: "bg-rose-500",
      message: "High vulnerability! Your business is invisible for key local searches and likely leaking leads to competitors.",
    };
  };

  const tier = getTier(totalScore);

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            Interactive Audit Tool
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            Check Your Local SEO Readiness Score
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Tick the items you currently have in place to instantly calculate your local search strength.
          </p>
        </div>

        {/* Live Score Gauge */}
        <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-center">
            <span className="font-display text-3xl font-extrabold text-ink">{totalScore}%</span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Score</span>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-bold ${tier.color}`}>
              {tier.label}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full transition-all duration-500 ease-out ${tier.barColor}`}
          style={{ width: `${totalScore}%` }}
        />
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {tier.message}
      </p>

      {/* Checklist grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {AUDIT_ITEMS.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                isChecked
                  ? "border-emerald-200 bg-emerald-50/60 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                  isChecked
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isChecked && <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={3} />}
              </span>
              <div className="flex-1">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className={`mt-0.5 block text-xs font-medium ${isChecked ? "text-slate-900" : "text-slate-700"}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
