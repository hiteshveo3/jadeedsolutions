"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon, LinkIcon, SearchIcon, SparklesIcon, StarIcon, TargetIcon, TrendingUpIcon, type IconSvgElement } from "@/components/icons";

/* Proposal blocks from the design lab (ideas 022, 024, 035, 036). Every number
   comes in as a prop: a capped success fee or a monthly fee is one client's own
   deal, so these belong on private proposal pages with that client's real
   figures. 035/036 also run on public pages with clearly labelled sample data. */

const money = (n: number, symbol: string) => `${symbol}${Math.round(n).toLocaleString("en-GB")}`;
const short = (n: number, symbol: string) => (n >= 1000 ? `${symbol}${Math.round(n / 1000)}k` : `${symbol}${n}`);
const chip = (on: boolean) => `h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${on ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06] text-[#0B1F12] hover:bg-white/[0.09]"}`;

/* ── 022 B: success fee with an upper limit — big number, slider, chart ── */
export function SuccessFeeChart({
  percent,
  cap,
  symbol = "£",
  max = 60000,
  start = 10000,
  step = 1000,
  presets = [10000, 25000, 50000],
  basis = "first-year contract",
}: {
  percent: number;
  cap: number;
  symbol?: string;
  max?: number;
  start?: number;
  step?: number;
  presets?: readonly number[];
  basis?: string;
}) {
  const [v, setV] = useState(start);
  const rate = percent / 100;
  const fee = (x: number) => Math.min(x * rate, cap);
  const yMax = cap * 2;
  const X = (x: number) => 34 + (x / max) * 260;
  const Y = (f: number) => 130 - (Math.min(f, yMax) / yMax) * 120;
  const vCap = cap / rate;
  const dashEnd = Math.min(max, yMax / rate);
  const line = vCap < max ? `M${X(0)} ${Y(0)}L${X(vCap)} ${Y(cap)}H${X(max)}` : `M${X(0)} ${Y(0)}L${X(max)} ${Y(max * rate)}`;
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Success fee</p>
        <p className="mt-2 text-[64px] font-semibold leading-none tracking-[-.06em] text-[#BEF70A] tabular-nums" aria-live="polite">{money(fee(v), symbol)}</p>
        <p className="mt-3 text-sm text-white/70">
          on a <b className="text-white tabular-nums">{money(v, symbol)}</b> {basis}
        </p>
        <input
          type="range"
          min={step}
          max={max}
          step={step}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Contract value"
          className="calc-range mt-5"
          style={{ ["--calc-pct" as string]: `${((v - step) / (max - step)) * 100}%` }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button key={p} type="button" onClick={() => setV(p)} className={chip(v === p)}>
              {money(p, symbol)}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">
          {percent}% of the {basis} value, never more than {money(cap, symbol)} per contract.
        </p>
      </div>
      <svg viewBox="0 0 300 150" className="block h-auto w-full" role="img" aria-label={`Success fee rises at ${percent}% and stops at ${money(cap, symbol)}`}>
        <g stroke="rgba(255,255,255,0.12)">
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={34} x2={294} y1={130 - k * 40} y2={130 - k * 40} />
          ))}
        </g>
        <g fill="rgba(255,255,255,0.5)" fontSize={8} fontFamily="var(--font-sans)">
          {[0, 1, 2, 3].map((k) => (
            <text key={k} x={2} y={133 - k * 40}>{short((yMax / 3) * k, symbol)}</text>
          ))}
          {[0, 1, 2, 3].map((k) => (
            <text key={k} x={X((max / 3) * k) - (k === 3 ? 16 : k ? 8 : 0)} y={146}>{short((max / 3) * k, symbol)}</text>
          ))}
        </g>
        {vCap < max && <path d={`M${X(vCap)} ${Y(cap)}L${X(dashEnd)} ${Y(dashEnd * rate)}`} stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" fill="none" />}
        <path d={line} stroke="#BEF70A" strokeWidth={2.4} fill="none" />
        {vCap < max && (
          <text x={Math.min(X(vCap) + 8, 200)} y={Y(cap) - 6} fontSize={8.5} fontWeight={700} fill="#EEF2E7" fontFamily="var(--font-sans)">
            Cap: {money(cap, symbol)} per contract
          </text>
        )}
        <circle cx={X(v)} cy={Y(fee(v))} r={6} fill="#BEF70A" stroke="#06301D" strokeWidth={2} style={{ transition: "cx .2s, cy .2s" }} />
      </svg>
    </div>
  );
}

/* ── 024 B: how many months of the fee one contract pays for ────────── */
export function ContractPayback({ contractValue, monthlyFee, symbol = "£", label = "contract" }: { contractValue: number; monthlyFee: number; symbol?: string; label?: string }) {
  const months = Math.floor(contractValue / monthlyFee);
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(months);
      return;
    }
    let id = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      id = window.setInterval(() => setLit((n) => (n >= months ? (window.clearInterval(id), n) : n + 1)), 70);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, [months]);
  return (
    <div ref={ref}>
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">One {money(contractValue, symbol)} {label} pays for</p>
        <p className="mt-2 text-[56px] font-semibold leading-none tracking-[-.06em] text-[#BEF70A] tabular-nums sm:text-[72px]">{months} months</p>
        <p className="mt-2 text-sm text-white/70">of a {money(monthlyFee, symbol)} monthly fee</p>
      </div>
      <div className="mx-auto mt-6 grid max-w-[560px] grid-cols-[repeat(auto-fill,minmax(22px,1fr))] gap-1.5" aria-hidden="true">
        {Array.from({ length: months }, (_, i) => (
          <i key={i} className={`block h-[22px] rounded-[6px] transition-colors duration-300 ${i < lit ? "bg-[#BEF70A]" : "bg-white/[0.1]"}`} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-white/50">
        {months} × {money(monthlyFee, symbol)} = {money(months * monthlyFee, symbol)}
      </p>
    </div>
  );
}

/* ── 035 A: who ranks today — a tab per competitor ─────────────────── */
export type Rival = { name: string; url?: string; shot?: { src: string; width: number; height: number }; authority: number; linking: number; backlinks: number };

export function CompetitorTabs({ rivals, you, youLabel = "You", note }: { rivals: readonly Rival[]; you: { linking: number }; youLabel?: string; note?: string }) {
  const [i, setI] = useState(0);
  const r = rivals[i];
  const top = Math.max(r.linking, you.linking) * 1.05;
  return (
    <div>
      <div role="tablist" aria-label="Competitors" className="flex flex-wrap gap-2">
        {rivals.map((x, k) => (
          <button key={x.name} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`h-9 rounded-full px-4 text-sm font-semibold transition-colors ${k === i ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06] text-[#0B1F12] hover:bg-white/[0.09]"}`}>
            {x.name}
          </button>
        ))}
      </div>
      <div key={r.name} role="tabpanel" className={`mt-5 grid items-start gap-5 motion-safe:animate-[rise_.45s_ease_both] ${r.shot ? "md:grid-cols-[1fr_1fr]" : ""}`}>
        {r.shot && (
          <div className="overflow-hidden rounded-[18px] border border-white/[0.08]">
            <Image src={r.shot.src} alt={`${r.name} homepage`} width={r.shot.width} height={r.shot.height} sizes="(min-width: 768px) 520px, 100vw" className="h-auto w-full" />
          </div>
        )}
        <div>
          <p className="text-xl font-bold tracking-[-.02em]">{r.name}</p>
          {r.url && <p className="text-sm text-white/55">{r.url}</p>}
          <dl className="mt-4 grid grid-cols-3 gap-2.5">
            {[["Authority", r.authority], ["Linking sites", r.linking], ["Backlinks", r.backlinks]].map(([l, n]) => (
              <div key={l} className="rounded-[16px] border border-white/[0.08] bg-white/[0.06] p-3.5">
                <dt className="text-xs text-white/60">{l}</dt>
                <dd className="mt-1 text-[28px] font-semibold leading-none tracking-[-.04em] tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 space-y-3 text-sm">
            {[[r.name, r.linking, false], [youLabel, you.linking, true]].map(([l, n, me]) => (
              <div key={String(l)}>
                <div className="flex justify-between">
                  <span className={me ? "font-bold text-[#BEF70A]" : "text-white/70"}>{l} · linking sites</span>
                  <b className="tabular-nums">{n}</b>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.1]">
                  <i className={`block h-full rounded-full transition-[width] duration-500 ${me ? "bg-[#BEF70A]" : "bg-white/45"}`} style={{ width: `${(Number(n) / top) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {note && <p className="mt-4 text-xs text-white/50">{note}</p>}
    </div>
  );
}

/* ── 036 A: you vs the market leader, one number at a time ──────────── */
export type GapMetric = { label: string; icon: IconSvgElement; you: number; leader: number };

export function YouVsLeader({ metrics, youLabel = "You", leaderLabel = "Market leader", note }: { metrics: readonly GapMetric[]; youLabel?: string; leaderLabel?: string; note?: string }) {
  const [k, setK] = useState(1);
  const m = metrics[k];
  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[.95fr_1.05fr]">
      <div className="grid gap-1" role="tablist" aria-label="Metrics">
        {metrics.map((x, i) => (
          <button key={x.label} type="button" role="tab" aria-selected={i === k} onClick={() => setK(i)} className={`flex items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-left transition-colors ${i === k ? "bg-[#BEF70A]/[0.1] text-white" : "text-white/75 hover:bg-white/[0.05]"}`}>
            <HugeiconsIcon icon={x.icon} size={20} className="text-[#BEF70A]" />
            <span className="flex-1 text-[15px] font-semibold">{x.label}</span>
            <span className="text-xs tabular-nums text-white/55">{x.you} → {x.leader}</span>
          </button>
        ))}
      </div>
      <div key={m.label} role="tabpanel" className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 motion-safe:animate-[rise_.45s_ease_both]">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">{m.label}</p>
        {[[leaderLabel, m.leader, false], [youLabel, m.you, true]].map(([l, n, me]) => (
          <div key={String(l)} className="mt-5">
            <div className="flex items-end justify-between">
              <span className={`text-sm ${me ? "font-bold text-[#BEF70A]" : "text-white/70"}`}>{l}</span>
              <b className="text-[30px] font-semibold leading-none tracking-[-.04em] tabular-nums">{n}</b>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.1]">
              <i className={`block h-full rounded-full transition-[width] duration-500 ${me ? "bg-[#BEF70A]" : "bg-white/45"}`} style={{ width: `${Math.max(2, (Number(n) / Math.max(m.leader, m.you)) * 100)}%` }} />
            </div>
          </div>
        ))}
        <p className="mt-5 text-sm leading-6 text-white/70">A gap you can close with the right pages, reviews and links.</p>
      </div>
      {note && <p className="text-xs text-white/50 md:col-span-2">{note}</p>}
    </div>
  );
}

/* ── 035 + 036 on public pages: a sample audit, clearly labelled ─────
   Icons are components, so the sample data lives here (client side). */
const SAMPLE_RIVALS: readonly Rival[] = [
  { name: "Competitor A", authority: 34, linking: 76, backlinks: 640 },
  { name: "Competitor B", authority: 27, linking: 52, backlinks: 410 },
  { name: "Competitor C", authority: 19, linking: 30, backlinks: 160 },
  { name: "Competitor D", authority: 14, linking: 22, backlinks: 90 },
];
const SAMPLE_GAPS: readonly GapMetric[] = [
  { label: "Authority score", icon: TargetIcon, you: 12, leader: 34 },
  { label: "Visits a month", icon: TrendingUpIcon, you: 140, leader: 900 },
  { label: "Ranking keywords", icon: SearchIcon, you: 38, leader: 410 },
  { label: "Linking websites", icon: LinkIcon, you: 18, leader: 76 },
  { label: "Google reviews", icon: StarIcon, you: 24, leader: 210 },
  { label: "AI mentions", icon: SparklesIcon, you: 0, leader: 12 },
];

export function SampleAudit() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Who ranks today · sample</p>
        <div className="mt-5">
          <CompetitorTabs rivals={SAMPLE_RIVALS} you={{ linking: 18 }} />
        </div>
      </div>
      <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">You vs the leader · sample — tap a number</p>
        <div className="mt-5">
          <YouVsLeader metrics={SAMPLE_GAPS} leaderLabel="Competitor A" />
        </div>
      </div>
      <p className="text-xs text-white/50 lg:col-span-2">Sample numbers, not a real business. Your free audit uses your own website, your area and the competitors who actually rank there.</p>
    </div>
  );
}
