"use client";

import { useState } from "react";
import {
  HugeiconsIcon,
  SearchIcon,
  CodeIcon,
  CheckIcon,
} from "@/components/icons";

interface ArchNode {
  id: string;
  name: string;
  url: string;
  type: "Root" | "Service" | "Location" | "Guide";
  theme: {
    bg: string;
    border: string;
    badge: string;
    text: string;
  };
  purpose: string;
  internalLinksTo: string[];
}

const NODES: ArchNode[] = [
  {
    id: "home",
    name: "Homepage (Brand Root)",
    url: "/",
    type: "Root",
    theme: {
      bg: "bg-slate-900",
      border: "border-slate-800",
      badge: "bg-slate-800 text-white",
      text: "text-white",
    },
    purpose: "Primary brand entity, core service overviews, accreditations, social proof, and direct links to main service pillars.",
    internalLinksTo: ["/house-removals/", "/office-removals/", "/areas/camden/", "/contact"],
  },
  {
    id: "service-house",
    name: "House Removals (Core Service)",
    url: "/house-removals/",
    type: "Service",
    theme: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      badge: "bg-indigo-600 text-white",
      text: "text-indigo-950",
    },
    purpose: "Dedicated commercial landing page targeting homeowner relocation, pricing factors, packaging add-ons, and local FAQs.",
    internalLinksTo: ["/areas/camden/", "/areas/croydon/", "/packing-services/", "/blog/moving-checklist/"],
  },
  {
    id: "service-office",
    name: "Office Relocation (B2B Service)",
    url: "/office-removals/",
    type: "Service",
    theme: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      badge: "bg-indigo-600 text-white",
      text: "text-indigo-950",
    },
    purpose: "Commercial B2B page targeting corporate moves, weekend disruption management, server/IT moving, and compliance.",
    internalLinksTo: ["/areas/westminster/", "/storage/", "/contact"],
  },
  {
    id: "loc-camden",
    name: "Camden Area Hub (Local Intent)",
    url: "/areas/camden/",
    type: "Location",
    theme: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      badge: "bg-emerald-600 text-white",
      text: "text-emerald-950",
    },
    purpose: "Hyper-local landing page with real Camden parking suspension guidance, narrow street access tips, and localized reviews.",
    internalLinksTo: ["/house-removals/", "/man-and-van/", "/contact"],
  },
  {
    id: "guide-checklist",
    name: "Moving Checklist (Topical Content)",
    url: "/blog/moving-checklist/",
    type: "Guide",
    theme: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      badge: "bg-amber-600 text-white",
      text: "text-amber-950",
    },
    purpose: "Comprehensive informational asset guiding buyers 6 weeks before moving day, capturing top-of-funnel search intent.",
    internalLinksTo: ["/house-removals/", "/packing-services/", "/areas/camden/"],
  },
];

export function ArchitectureVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("service-house");
  const selectedNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white p-6 shadow-md md:p-8">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <HugeiconsIcon icon={CodeIcon} size={14} />
            Visual Site Architecture
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
            Logical Local SEO URL & Silo Hierarchy
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Click any node below to inspect its role, internal linking flow, and intent target.
          </p>
        </div>
      </div>

      {/* Visual Node Grid */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {NODES.map((node) => {
          const isSelected = selectedId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`flex flex-col text-left p-4 rounded-2xl border transition-all ${
                isSelected
                  ? "border-brand-500 bg-slate-800 ring-2 ring-brand-500/50 shadow-lg scale-[1.02]"
                  : "border-slate-800 bg-slate-800/60 hover:border-slate-700 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${node.theme.badge}`}>
                  {node.type}
                </span>
                <code className="text-[11px] font-mono text-slate-400">{node.url}</code>
              </div>
              <span className="mt-2 font-display text-sm font-bold text-white">
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Node Inspector Drawer */}
      <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/90 p-5 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${selectedNode.theme.badge}`}>
              {selectedNode.type} Node
            </span>
            <h4 className="font-display text-base font-bold text-white">
              {selectedNode.name}
            </h4>
          </div>
          <code className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-mono text-brand-400">
            {selectedNode.url}
          </code>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          <strong className="text-white">Page Purpose:</strong> {selectedNode.purpose}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Contextual Outgoing Links:</span>
          {selectedNode.internalLinksTo.map((link) => (
            <span
              key={link}
              className="inline-flex items-center rounded-lg bg-slate-900 border border-slate-700 px-2.5 py-1 text-xs font-mono text-indigo-300"
            >
              {link}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
