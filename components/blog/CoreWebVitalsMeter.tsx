"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  SparklesIcon,
  CheckIcon,
  ClockIcon,
} from "@/components/icons";

interface Metric {
  name: string;
  acronym: string;
  target: string;
  goodThreshold: string;
  unit: string;
  description: string;
  optimizationLevers: string[];
  theme: {
    color: string;
    pill: string;
    bar: string;
  };
}

const METRICS: Metric[] = [
  {
    name: "Largest Contentful Paint",
    acronym: "LCP",
    target: "≤ 2.5s",
    goodThreshold: "Good: 0–2.5s",
    unit: "Seconds",
    description: "Measures perceived page loading speed by timing when the main hero image or headline becomes fully visible.",
    optimizationLevers: [
      "Use Next.js priority on hero images with next/image",
      "Preload key webfonts and self-host fonts with next/font",
      "Utilize edge caching and server-side pre-rendering",
    ],
    theme: {
      color: "text-emerald-700",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bar: "bg-emerald-500",
    },
  },
  {
    name: "Interaction to Next Paint",
    acronym: "INP",
    target: "≤ 200ms",
    goodThreshold: "Good: 0–200ms",
    unit: "Milliseconds",
    description: "Assesses page responsiveness by measuring the delay between user actions (clicks/taps) and the visual feedback update.",
    optimizationLevers: [
      "Minimize heavy main-thread JavaScript execution",
      "Debounce real-time inputs (quote calculators, search filters)",
      "Break long tasks with React transitions or requestIdleCallback",
    ],
    theme: {
      color: "text-indigo-700",
      pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
      bar: "bg-indigo-500",
    },
  },
  {
    name: "Cumulative Layout Shift",
    acronym: "CLS",
    target: "≤ 0.1",
    goodThreshold: "Good: 0–0.1",
    unit: "Score",
    description: "Measures visual layout stability by detecting unexpected layout shifts as images, ads, or fonts load asynchronously.",
    optimizationLevers: [
      "Always set explicit width and height dimensions on all images",
      "Reserve slot heights for dynamic banners and sticky CTA elements",
      "Use font-display: swap with fallback size adjustments",
    ],
    theme: {
      color: "text-purple-700",
      pill: "bg-purple-50 text-purple-700 border-purple-200",
      bar: "bg-purple-500",
    },
  },
];

export function CoreWebVitalsMeter() {
  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-6 shadow-md md:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <HugeiconsIcon icon={SparklesIcon} size={14} />
            web.dev Official Standards
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
            Core Web Vitals Thresholds for Local SEO
          </h3>
          <p className="mt-1 text-xs text-slate-300">
            Google uses real-world Chrome User Experience (CrUX) field data to evaluate page experience.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {METRICS.map((metric) => (
          <div
            key={metric.acronym}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-extrabold text-white">
                  {metric.acronym}
                </span>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold font-mono">
                  {metric.target}
                </span>
              </div>
              <h4 className="mt-1 font-display text-xs font-semibold text-slate-300">
                {metric.name}
              </h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {metric.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/80">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Key Fixes:
              </span>
              <ul className="mt-1.5 space-y-1 text-xs text-slate-300">
                {metric.optimizationLevers.map((lever, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{lever}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
