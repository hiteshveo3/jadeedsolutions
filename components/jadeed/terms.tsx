"use client";

import Link from "next/link";
import { useState } from "react";
import { HugeiconsIcon, ArrowUpRightIcon, InfoIcon, LocationIcon, WhatsappIcon } from "@/components/icons";
import { CircleArrow } from "@/components/site/ui";
import { siteConfig } from "@/lib/site";
import { partnership, partnershipCopy, regulatedSources, territoryOptions } from "@/lib/partnership";

/* Terms pieces from the design lab (ideas 019, 033, 064), following Jadeed
   Marketing's model — the owner set those terms for every country on 4 Oct 2026. */

/* ── 019 A: regulated professions — panel with source chips ────────── */
export function RegulatedNote() {
  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
      <h3 className="flex items-center gap-2.5 text-xl tracking-[-.02em] sm:text-2xl">
        <HugeiconsIcon icon={InfoIcon} size={24} className="text-[#BEF70A]" />
        Regulated professions
      </h3>
      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/75">
        We don&apos;t assume one rule fits every profession or country. Lawyers, healthcare providers, mortgage and settlement-service businesses receive a custom proposal only after qualified counsel checks the fee structure for the profession and jurisdiction — never a percentage-of-fees or per-client offer.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {regulatedSources.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 text-sm font-semibold transition-colors hover:bg-white/[0.09] hover:text-[#BEF70A]">
            {s.label}
            <HugeiconsIcon icon={ArrowUpRightIcon} size={14} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── 033 A: term and exit — a coloured bar and a month slider ───────── */
type TermPhase = { until: number; label: string; text: string };

const PUBLIC_TERM: readonly TermPhase[] = [
  { until: partnership.minimumTermMonths, label: "Initial term", text: `We build and run the system and report every month. The first ${partnership.minimumTermMonths} months give the work time to start paying.` },
  { until: Infinity, label: "Month to month", text: `Stay because it works. Either side can end the partnership with ${partnership.noticeDays} days' written notice.` },
];

export function TermSlider({ phases = PUBLIC_TERM, months = 24, start = 3, note = "The signed agreement covers early termination for breach." }: { phases?: readonly TermPhase[]; months?: number; start?: number; note?: string }) {
  const [m, setM] = useState(start);
  const phase = phases.find((p) => m <= p.until) ?? phases[phases.length - 1];
  let from = 0;
  const bands = phases.map((p, i) => {
    const to = Math.min(p.until, months);
    const band = { ...p, from: from + 1, width: ((to - from) / months) * 100, i };
    from = to;
    return band;
  });
  const shade = ["bg-[#BEF70A] text-[#0B1F12]", "bg-white/[0.16]", "bg-white/[0.06]"];
  return (
    <div>
      <div className="flex overflow-hidden rounded-full border border-white/[0.08] text-[13px] font-bold">
        {bands.map((b) => (
          <span key={b.label} className={`truncate px-3 py-2 ${shade[Math.min(b.i, shade.length - 1)]} ${b.label === phase.label ? "" : "opacity-80"}`} style={{ width: `${b.width}%` }}>
            {b.label}
          </span>
        ))}
      </div>
      <input
        type="range"
        min={1}
        max={months}
        value={m}
        onChange={(e) => setM(Number(e.target.value))}
        aria-label="Month of the partnership"
        className="calc-range mt-5"
        style={{ ["--calc-pct" as string]: `${((m - 1) / (months - 1)) * 100}%` }}
      />
      <div className="mt-2 flex justify-between text-xs text-white/50">
        <span>Month 1</span>
        <span>Month {months}</span>
      </div>
      <div key={phase.label} className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-5 motion-safe:animate-[rise_.45s_ease_both] sm:p-6" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl tracking-[-.02em]">{phase.label}</h3>
          <span className="rounded-full bg-[#BEF70A]/[0.13] px-3 py-1 text-xs font-bold text-[#BEF70A]">Month {m}</span>
        </div>
        <p className="mt-2 text-[15px] leading-7 text-white/75">{phase.text}</p>
      </div>
      {note && <p className="mt-3 text-xs text-white/50">{note}</p>}
    </div>
  );
}

/* ── 064 B: is your area still open? — type an area, get a next step ──
   We don't publish which areas are taken, so the answer is an honest
   "we'll confirm", with WhatsApp and the free audit one tap away. */
export function AreaCheck({ trade = "your trade", placeholder = "Your town or postcode" }: { trade?: string; placeholder?: string }) {
  const [area, setArea] = useState("");
  const [asked, setAsked] = useState("");
  const message = `Hi Jadeed, is ${asked || "my area"} still open for ${trade}?`;
  return (
    <div>
      <h3 className="text-2xl tracking-[-.03em] sm:text-3xl">Is your area still open?</h3>
      <p className="mt-2 text-[15px] text-white/70">One partner per trade, per area — agreed in writing.</p>
      <form
        className="mt-5 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          setAsked(area.trim() || "your area");
        }}
      >
        <label className="flex h-12 flex-1 items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.1] px-4 focus-within:border-[#BEF70A]">
          <HugeiconsIcon icon={LocationIcon} size={18} className="text-[#BEF70A]" />
          <span className="sr-only">Your area</span>
          <input value={area} onChange={(e) => setArea(e.target.value)} placeholder={placeholder} className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/55" />
        </label>
        <button type="submit" className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
          Check my area <CircleArrow dark />
        </button>
      </form>
      {asked && (
        <div className="mt-4 rounded-[22px] border border-[#BEF70A] bg-[#BEF70A]/[0.07] p-5 motion-safe:animate-[rise_.45s_ease_both] sm:p-6" aria-live="polite">
          <p className="text-lg font-bold">
            We&apos;ll check <span className="text-[#BEF70A]">{asked}</span> for {trade}.
          </p>
          <p className="mt-2 text-[15px] leading-7 text-white/75">
            You get an answer within {partnership.auditReplyHours} hours, before anything is agreed. {partnershipCopy.territoryRule}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href={`${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-5 text-sm font-bold transition-colors hover:bg-white/[0.14]">
              <HugeiconsIcon icon={WhatsappIcon} size={20} />
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="group inline-flex h-11 items-center justify-center gap-2 text-sm font-bold">
              Or request a free audit <CircleArrow size="sm" />
            </Link>
          </div>
        </div>
      )}
      <ul className="mt-5 flex flex-wrap gap-2 text-xs text-white/60">
        {territoryOptions.map((t) => (
          <li key={t} className="rounded-full border border-white/[0.08] px-3 py-1.5">{t}</li>
        ))}
      </ul>
    </div>
  );
}
