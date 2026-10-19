"use client";

import { Car } from "iconsax-react";
import { useState } from "react";
import {
  ArrowDownIcon,
  CalendarIcon,
  GlobeIcon,
  GridIcon,
  HugeiconsIcon,
  MegaphoneIcon,
  SearchIcon,
  SmartphoneIcon,
  type IconSvgElement,
} from "@/components/icons";
import { ECOSYSTEM, type NodeId } from "./data";
import { Tick } from "./ui";

const ICONS: Record<NodeId, IconSvgElement> = {
  booking: CalendarIcon,
  website: GlobeIcon,
  customer: SmartphoneIcon,
  chauffeur: Car as IconSvgElement,
  admin: GridIcon,
  seo: SearchIcon,
  marketing: MegaphoneIcon,
};

function NodeIcon({ id, size }: { id: NodeId; size: number }) {
  return <HugeiconsIcon icon={ICONS[id]} size={size} variant="Bulk" />;
}

// Ring positions in % of the square diagram; the booking system sits in the middle.
const POS: Record<Exclude<NodeId, "booking">, [number, number]> = {
  website: [50, 9],
  customer: [86, 30],
  chauffeur: [86, 70],
  admin: [50, 91],
  seo: [14, 70],
  marketing: [14, 30],
};

function Detail({ id }: { id: NodeId }) {
  const n = ECOSYSTEM.find((e) => e.id === id)!;
  return (
    <div className="vc-fade" key={id}>
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">{n.short}</p>
      <h3 className="mt-3 text-[28px] leading-[1.05] tracking-[-.04em] sm:text-4xl">{n.name}</h3>
      <p className="mt-3 text-[17px] leading-7 text-white/80">{n.purpose}</p>
      <p className="mt-6 text-xs font-extrabold uppercase tracking-[.15em] text-white/55">What it does</p>
      <ul className="mt-3 grid gap-2.5">
        {n.does.map((d) => (
          <Tick key={d}>{d}</Tick>
        ))}
      </ul>
      <div className="mt-6 rounded-[20px] bg-[#BEF70A]/[0.08] p-5">
        <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">How you benefit</p>
        <p className="mt-2 text-[16px] leading-7 text-white/85">{n.benefit}</p>
      </div>
    </div>
  );
}

export function Ecosystem() {
  const [sel, setSel] = useState<NodeId | null>("booking");
  const ring = ECOSYSTEM.filter((e) => e.id !== "booking");

  return (
    <>
      {/* Phone and tablet: a vertical spine, every part hangs off the booking system. */}
      <div className="lg:hidden">
        <ol className="relative grid gap-3 before:absolute before:bottom-8 before:left-[29px] before:top-8 before:w-px before:bg-white/[0.12]">
          {ECOSYSTEM.map((n) => {
            const open = sel === n.id;
            const hub = n.id === "booking";
            return (
              <li key={n.id} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`eco-m-${n.id}`}
                  onClick={() => setSel(open ? null : n.id)}
                  className={`flex w-full items-center gap-4 rounded-[20px] p-2.5 pr-4 text-left transition-colors ${open ? "bg-white/[0.09]" : "bg-white/[0.05] hover:bg-white/[0.08]"}`}
                >
                  <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ${hub ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-[#06301D] text-[#BEF70A]"}`}>
                    <NodeIcon id={n.id} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold">{n.name}</span>
                    <span className="block text-sm text-white/[0.72]">{hub ? "Everything below connects here" : n.short}</span>
                  </span>
                  <HugeiconsIcon icon={ArrowDownIcon} size={16} className={`text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div id={`eco-m-${n.id}`} className="ml-[58px] mt-4 pb-4">
                    <Detail id={n.id} />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* Desktop: hub-and-spoke diagram with a detail panel. */}
      <div className="hidden items-center gap-14 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative mx-auto aspect-square w-full max-w-[580px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(238,242,231,0.08)" strokeWidth="0.25" />
            {ring.map((n) => {
              const [x, y] = POS[n.id as keyof typeof POS];
              const on = sel === n.id || sel === "booking";
              return (
                <line
                  key={n.id}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={on ? "#BEF70A" : "rgba(238,242,231,0.18)"}
                  strokeOpacity={on ? (sel === n.id ? 1 : 0.55) : 1}
                  strokeWidth={sel === n.id ? 0.6 : 0.3}
                  strokeDasharray={on ? undefined : "1 1"}
                  style={{ transition: "stroke .25s, stroke-width .25s" }}
                />
              );
            })}
          </svg>

          <button
            type="button"
            aria-pressed={sel === "booking"}
            onClick={() => setSel("booking")}
            className={`absolute left-1/2 top-1/2 grid h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center transition-colors ${
              sel === "booking" ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-[#0B561C] text-white hover:text-[#BEF70A]"
            }`}
          >
            <span>
              <span className={`mx-auto flex w-fit ${sel === "booking" ? "" : "text-[#BEF70A]"}`}>
                <NodeIcon id="booking" size={28} />
              </span>
              <span className="mt-2 block text-[15px] font-bold leading-tight">
                Booking
                <br />
                system
              </span>
            </span>
          </button>

          {ring.map((n) => {
            const [x, y] = POS[n.id as keyof typeof POS];
            const on = sel === n.id;
            return (
              <button
                key={n.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSel(n.id)}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold transition-colors ${
                  on ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-[#0B561C] text-white hover:text-[#BEF70A]"
                }`}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full ${on ? "bg-[#0B1F12] text-[#BEF70A]" : "bg-white/[0.08] text-[#BEF70A]"}`}>
                  <NodeIcon id={n.id} size={17} />
                </span>
                {n.name}
              </button>
            );
          })}
        </div>

        <div className="min-h-[520px] rounded-[26px] bg-white/[0.05] p-8" aria-live="polite">
          <Detail id={sel ?? "booking"} />
        </div>
      </div>
    </>
  );
}
