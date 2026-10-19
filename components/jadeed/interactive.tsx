"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* Interactive pieces from the design lab, rebuilt for the live site.
   All dark, lime accent; numbers follow Jadeed Solutions' real offer. */

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

/* ── Count-up numbers (idea 044 B) ─────────────────────────────────── */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1200);
        setShown(value * (1 - Math.pow(1 - k, 3)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="tabular-nums">{prefix}{shown.toFixed(decimals)}{suffix}</span>;
}

/* ── Fee calculator: “see what you keep” (idea 025 B) ──────────────── */
const PRESETS = [
  [150, "Small job · £150"],
  [400, "Typical · £400"],
  [2000, "Big project · £2,000"],
] as const;

export function FeeCalculator({ rate = 0.1 }: { rate?: number }) {
  const [job, setJob] = useState(400);
  const pct = ((job - 100) / (3000 - 100)) * 100;
  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">On a {gbp(job)} job, you keep</p>
        <p className="mt-3 text-[64px] font-semibold leading-[0.86] tracking-[-.065em] text-[#BEF70A] tabular-nums sm:text-[88px]">{gbp(job * (1 - rate))}</p>
        <p className="mt-4 text-sm text-white/70">
          Our fee: <b className="text-white">{gbp(job * rate)}</b> — only on a paid job from a customer we brought in.
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">Value of one paid job</span>
          <b className="tabular-nums">{gbp(job)}</b>
        </div>
        <input
          type="range"
          min={100}
          max={3000}
          step={50}
          value={job}
          onChange={(e) => setJob(Number(e.target.value))}
          aria-label="Value of one paid job"
          className="calc-range mt-4"
          style={{ ["--calc-pct" as string]: `${pct}%` }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map(([v, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setJob(v)}
              className={`h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${job === v ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06] text-[#0B1F12] hover:bg-white/[0.09]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">Growth Partnership example at 10%. Your rate is agreed for your trade and job size — not a quote.</p>
      </div>
    </div>
  );
}

/* ── Four steps on a winding route, tap a pin (idea 053 B) ─────────── */
export function RouteSteps({ steps }: { steps: readonly { title: string; text: string; when?: string }[] }) {
  const [active, setActive] = useState(0);
  const points = [[24, 82], [136, 58], [246, 54], [300, 28]] as const;
  const step = steps[active];
  return (
    <div>
      <svg viewBox="0 0 320 110" className="block h-auto w-full overflow-visible" role="group" aria-label="Steps">
        <path d="M24 82C70 20 112 24 136 58S214 102 246 54 292 22 300 28" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={3} strokeDasharray="1 9" strokeLinecap="round" />
        {points.slice(0, steps.length).map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`} onClick={() => setActive(i)} className="cursor-pointer outline-none [&:focus-visible>circle]:[stroke-width:4]" role="button" tabIndex={0} aria-label={`Step ${i + 1}: ${steps[i].title}`} aria-pressed={i === active} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}>
            <circle r={14} fill={i === active ? "#BEF70A" : "rgba(255,255,255,0.08)"} stroke="#BEF70A" strokeWidth={2} />
            <text y={4.5} textAnchor="middle" fontSize={12} fontWeight={800} fill={i === active ? "#0B1F12" : "#EEF2E7"} fontFamily="var(--font-sans)">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <div key={active} className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 motion-safe:animate-[rise_.45s_ease_both] md:p-7">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">{step.when ?? `Step ${active + 1} of ${steps.length}`}</p>
        <h3 className="mt-2 text-2xl tracking-[-.03em]">{step.title}</h3>
        <p className="mt-2 max-w-2xl leading-7 text-white/[0.72]">{step.text}</p>
      </div>
    </div>
  );
}

/* ── Digital world clocks (idea 048, owner: digital clock better) ──── */
const ZONES = [
  ["Narowal", "Asia/Karachi", true],
  ["London", "Europe/London", false],
  ["New York", "America/New_York", false],
  ["Toronto", "America/Toronto", false],
  ["Dubai", "Asia/Dubai", false],
] as const;

export function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);
  const fmt = (tz: string) => (now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(now) : "--:--");
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
      {ZONES.map(([city, tz, home]) => (
        <div key={city} className={`rounded-[18px] border p-4 text-center ${home ? "border-[#BEF70A] bg-[#BEF70A]/[0.06]" : "border-white/[0.08] bg-white/[0.06]"} ${home ? "col-span-2 sm:col-span-1" : ""}`}>
          <p className="font-mono text-[30px] font-semibold leading-none tracking-[-.02em] tabular-nums" suppressHydrationWarning>
            {fmt(tz)}
          </p>
          <p className="mt-2 text-xs text-white/[0.72]">{city}</p>
          {home && <p className="mt-1 text-xs font-bold text-[#BEF70A]">We're here</p>}
        </div>
      ))}
    </div>
  );
}

/* ── Evidence tabs: real Search Console screenshots (idea 043 A) ───── */
export function EvidenceTabs({ items }: { items: readonly { label: string; src: string; caption: string; width: number; height: number }[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return (
    <div>
      <div role="tablist" aria-label="Evidence" className="inline-flex flex-wrap gap-1 rounded-full border border-white/[0.08] bg-white/[0.06] p-1">
        {items.map((it, i) => (
          <button key={it.label} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`h-9 rounded-full px-4 text-sm font-semibold transition-colors ${i === active ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70 hover:text-white"}`}>
            {it.label}
          </button>
        ))}
      </div>
      <figure className="mt-5">
        <a href={item.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-[18px] border border-white/[0.08]">
          <Image key={item.src} src={item.src} alt={item.caption} width={item.width} height={item.height} sizes="(min-width: 1200px) 1100px, 100vw" className="h-auto w-full" />
        </a>
        <figcaption className="mt-3 text-xs text-white/55">{item.caption} — unedited screenshot. Tap to open full size.</figcaption>
      </figure>
    </div>
  );
}

/* ── “Is a fee due?” — three toggles, a lime answer (ideas 016 B + 023 B) ── */
const FEE_CHECKS = [
  ["source", "Came through our work?"],
  ["done", "Job completed?"],
  ["paid", "Customer paid?"],
] as const;

export function FeeDueChecker({ invoice = 1200, rate = 0.1 }: { invoice?: number; rate?: number }) {
  const [state, setState] = useState<Record<string, boolean>>({ source: true, done: true, paid: false });
  const ok = FEE_CHECKS.every(([k]) => state[k]);
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
      <div className="space-y-2.5">
        {FEE_CHECKS.map(([k, q]) => (
          <div key={k} className="flex items-center justify-between gap-4 rounded-[16px] bg-white/[0.06] px-4 py-3">
            <span className="text-[15px] font-semibold">{q}</span>
            <span className="inline-flex rounded-full bg-white/[0.08] p-0.5" role="group" aria-label={q}>
              {[true, false].map((v) => (
                <button key={String(v)} type="button" aria-pressed={state[k] === v} onClick={() => setState((s) => ({ ...s, [k]: v }))} className={`h-8 rounded-full px-3.5 text-xs font-bold transition-colors ${state[k] === v ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </span>
          </div>
        ))}
        <p className="pt-1 text-xs text-white/50">Example: a {gbp(invoice)} invoice at {Math.round(rate * 100)}% on the Growth Partnership.</p>
      </div>
      <div className={`rounded-[22px] border p-6 transition-colors ${ok ? "border-[#BEF70A] bg-[#BEF70A]/[0.07]" : "border-white/[0.08] bg-white/[0.06]"}`} aria-live="polite">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">{ok ? "Fee due" : "No fee"}</p>
        <p className={`mt-2 text-[56px] font-semibold leading-none tracking-[-.06em] tabular-nums ${ok ? "text-[#BEF70A]" : ""}`}>{ok ? gbp(invoice * rate) : "£0"}</p>
        <p className="mt-3 text-sm text-white/70">{ok ? `${Math.round(rate * 100)}% of the ${gbp(invoice)} paid invoice.` : "Nothing is due until all three are true."}</p>
      </div>
    </div>
  );
}

/* ── Simple switch card: one of several options at a time (idea 013 B) ── */
export function SwitchCards({ options }: { options: readonly { key: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(options[0]?.key);
  return (
    <div>
      <div role="tablist" className="inline-flex flex-wrap gap-1 rounded-full border border-white/[0.08] bg-white/[0.06] p-1">
        {options.map((o) => (
          <button key={o.key} type="button" role="tab" aria-selected={o.key === active} onClick={() => setActive(o.key)} className={`h-10 rounded-full px-4 text-sm font-semibold transition-colors ${o.key === active ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70 hover:text-white"}`}>
            {o.label}
          </button>
        ))}
      </div>
      {options.map((o) => (
        <div key={o.key} hidden={o.key !== active} className="mt-5 motion-safe:animate-[rise_.45s_ease_both]">
          {o.content}
        </div>
      ))}
    </div>
  );
}
