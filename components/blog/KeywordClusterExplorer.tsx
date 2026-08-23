"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  SearchIcon,
  CheckIcon,
  TrendingUpIcon,
} from "@/components/icons";

interface KeywordItem {
  keyword: string;
  intent: "Commercial" | "Local Commercial" | "Price Discovery" | "Informational";
  targetUrl: string;
  userMindset: string;
  theme: {
    badge: string;
  };
}

const KEYWORDS: KeywordItem[] = [
  {
    keyword: "removals London",
    intent: "Commercial",
    targetUrl: "/",
    userMindset: "High purchase intent; looking for a reputable London moving firm right away.",
    theme: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  },
  {
    keyword: "house removals London",
    intent: "Commercial",
    targetUrl: "/house-removals/",
    userMindset: "Comparing dedicated house removal services, van capacities, and moving team credentials.",
    theme: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  },
  {
    keyword: "office relocation London",
    intent: "Commercial",
    targetUrl: "/office-removals/",
    userMindset: "Corporate buyer needing weekend moves, compliance, and minimal business downtime.",
    theme: { badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  },
  {
    keyword: "removals Camden",
    intent: "Local Commercial",
    targetUrl: "/areas/camden/",
    userMindset: "Looking specifically for a local mover familiar with Camden parking permits and access.",
    theme: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  },
  {
    keyword: "movers in Croydon",
    intent: "Local Commercial",
    targetUrl: "/areas/croydon/",
    userMindset: "Wants a trusted South London removals team nearby for quick quotation.",
    theme: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  },
  {
    keyword: "house removals cost London",
    intent: "Price Discovery",
    targetUrl: "/blog/house-removals-cost-guide/",
    userMindset: "Budgeting for an upcoming move; needs transparent price bands and fee breakdowns.",
    theme: { badge: "bg-amber-50 text-amber-700 border-amber-200" },
  },
  {
    keyword: "how to pack fragile items for moving",
    intent: "Informational",
    targetUrl: "/blog/packing-fragile-items/",
    userMindset: "Early in the moving journey; seeking actionable DIY guidance before booking packing.",
    theme: { badge: "bg-purple-50 text-purple-700 border-purple-200" },
  },
  {
    keyword: "moving house checklist 6 weeks",
    intent: "Informational",
    targetUrl: "/blog/moving-checklist/",
    userMindset: "Organizing their timeline; high potential to convert into a booked move.",
    theme: { badge: "bg-purple-50 text-purple-700 border-purple-200" },
  },
];

export function KeywordClusterExplorer() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All"
    ? KEYWORDS
    : KEYWORDS.filter((k) => k.intent === filter);

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 border border-indigo-100">
            <HugeiconsIcon icon={SearchIcon} size={14} />
            Search Intent Explorer
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            Intent-Based Keyword Clustering Matrix
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Click a filter to see how queries map to user mindset and dedicated URL assets.
          </p>
        </div>
      </div>

      {/* Intent Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["All", "Commercial", "Local Commercial", "Price Discovery", "Informational"].map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {filtered.map((item) => (
          <div
            key={item.keyword}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-slate-300 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${item.theme.badge}`}>
                  {item.intent}
                </span>
                <code className="text-xs font-mono text-slate-500">{item.targetUrl}</code>
              </div>
              <p className="mt-2 font-display text-base font-bold text-ink">
                &ldquo;{item.keyword}&rdquo;
              </p>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {item.userMindset}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-brand-600">
              <span>Target Asset:</span>
              <span className="font-mono text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {item.targetUrl}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
