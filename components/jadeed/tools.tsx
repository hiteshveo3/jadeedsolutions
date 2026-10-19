"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon, SearchIcon, SparklesIcon } from "@/components/icons";
import { StreetMap } from "@/components/site/Art";

/* Service-page tools from the design lab (all dark, £, illustrative only). */

const gbp = (n: number, d = 0) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: d, maximumFractionDigits: d })}`;

/* ── Map visibility gauge (idea 027 A layout + B's half-circle, bigger motion) ── */
const spotLabel = (v: number) => (v === 1 ? "Top of the map" : v <= 3 ? "In the map pack" : v <= 10 ? "On page two" : "Hard to find");

export function VisibilityGauge() {
  const [level, setLevel] = useState(4); // 1..20, higher = more visible
  const ref = useRef<HTMLDivElement>(null);
  // On first view, sweep from hard-to-find up to the map pack — a bigger, livelier animation (owner note).
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      let v = 1;
      const tick = () => {
        v += 1;
        setLevel(v);
        if (v < 18) timer = window.setTimeout(tick, 70);
      };
      setLevel(1);
      timer = window.setTimeout(tick, 300);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);
  const spot = 21 - level;
  const t = (level - 1) / 19;
  return (
    <div ref={ref} className="grid items-center gap-6 sm:grid-cols-[1.1fr_.9fr]">
      <svg viewBox="0 0 200 118" className="mx-auto block h-auto w-full max-w-[340px]" aria-hidden="true">
        <path d="M14 104A86 86 0 0 1 186 104" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={16} strokeLinecap="round" />
        <path d="M14 104A86 86 0 0 1 186 104" fill="none" stroke="#BEF70A" strokeWidth={16} strokeLinecap="round" strokeDasharray="271" strokeDashoffset={271 * (1 - t)} style={{ transition: "stroke-dashoffset .35s cubic-bezier(.2,.8,.2,1)" }} />
        <g style={{ transform: `rotate(${-90 + t * 180}deg)`, transformOrigin: "100px 104px", transition: "transform .35s cubic-bezier(.2,.8,.2,1)" }}>
          <line x1={100} y1={104} x2={100} y2={40} stroke="#EEF2E7" strokeWidth={3} strokeLinecap="round" />
          <circle cx={100} cy={40} r={6} fill="#BEF70A" stroke="#06301D" strokeWidth={2} />
        </g>
        <circle cx={100} cy={104} r={7} fill="#EEF2E7" />
        <text x={100} y={88} textAnchor="middle" fontSize={30} fontWeight={700} fill="#EEF2E7" fontFamily="var(--font-sans)" letterSpacing={-1.5}>#{spot}</text>
      </svg>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Your map spot</p>
        <p className="mt-2 text-2xl font-bold tracking-[-.03em]">{spotLabel(spot)}</p>
        <p className="mt-2 text-sm leading-6 text-white/70">Drag it. Your Google profile, service pages and reviews are what move you up the map.</p>
        <input type="range" min={1} max={20} value={level} onChange={(e) => setLevel(Number(e.target.value))} aria-label="Visibility" className="calc-range mt-5" style={{ ["--calc-pct" as string]: `${t * 100}%` }} />
        <p className="mt-3 text-xs text-white/50">Illustration only — no one can honestly promise a position.</p>
      </div>
    </div>
  );
}

/* ── Search before and after, with a switch (idea 028 A) ───────────── */
const SEARCH_TRADES = ["Removals", "Plumber", "Cleaner"] as const;

export function SearchBeforeAfter() {
  const [trade, setTrade] = useState<(typeof SEARCH_TRADES)[number]>("Removals");
  const [on, setOn] = useState(true);
  const q = `${trade.toLowerCase()} near me`;
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">What the work changes</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SEARCH_TRADES.map((t) => (
          <button key={t} type="button" onClick={() => setTrade(t)} className={`h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${t === trade ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06]"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-3 inline-flex rounded-full border border-white/[0.08] bg-white/[0.06] p-1" role="group" aria-label="Before or after">
        {[false, true].map((v) => (
          <button key={String(v)} type="button" aria-pressed={on === v} onClick={() => setOn(v)} className={`h-9 rounded-full px-4 text-sm font-semibold transition-colors ${on === v ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
            {v ? "With Jadeed" : "Without Jadeed"}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-white/75" aria-live="polite">{on ? "You're on the map and named in the AI answer." : "Customers searching nearby don't see you yet."}</p>
      <div className="relative mt-4 overflow-hidden rounded-[22px]">
        <StreetMap me={on} rings={on} h={300} cy={128} />
        <div className="absolute inset-x-3 top-3 flex h-11 items-center gap-2.5 rounded-full bg-[#06301D]/85 px-4 text-[14px] backdrop-blur-md sm:inset-x-4 sm:top-4">
          <HugeiconsIcon icon={SearchIcon} size={16} className="text-[#BEF70A]" />
          <span className="truncate">{q}</span>
        </div>
        <div className="absolute inset-x-3 bottom-3 grid gap-2 sm:inset-x-4 sm:bottom-4 sm:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[16px] bg-[#06301D]/85 p-3 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/50">Map results</p>
            <ol className="mt-2 space-y-1.5 text-[13px]">
              {(on ? ["Your business", "A competitor", "Another competitor"] : ["A competitor", "Another competitor", "A third competitor"]).map((name, i) => (
                <li key={name} className={`flex items-center gap-2 rounded-[10px] px-2 py-1 ${on && i === 0 ? "bg-[#BEF70A]/[0.14] font-bold text-[#BEF70A]" : "text-white/60"}`}>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold ${on && i === 0 ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.08]"}`}>{i + 1}</span>
                  <span className="truncate">{name}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="hidden rounded-[16px] bg-[#06301D]/85 p-3 backdrop-blur-md sm:block">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-white/50"><HugeiconsIcon icon={SparklesIcon} size={12} className="text-[#BEF70A]" /> AI answer</p>
            <p className="mt-2 text-[13px] leading-5 text-white/80">{on ? <>A well-reviewed option nearby is <b className="font-bold text-[#BEF70A]">your business</b>.</> : "Here are a few businesses nearby… yours isn't one of them."}</p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-white/50">Illustration of the goal, not a promise of a position.</p>
    </div>
  );
}

/* ── Ads budget simulator (idea 030 A) ─────────────────────────────── */
export function AdsSimulator() {
  const [budget, setBudget] = useState(300);
  const [cpc, setCpc] = useState(1.8);
  const [rate, setRate] = useState(8);
  const clicks = budget / cpc;
  const enquiries = clicks * (rate / 100);
  const sliders = [
    ["Ad budget for the month", budget, setBudget, 100, 1500, 50, gbp(budget)],
    ["Price per click", cpc, setCpc, 0.4, 5, 0.1, gbp(cpc, 2)],
    ["Visitors who send an enquiry", rate, setRate, 2, 25, 1, `${rate}%`],
  ] as const;
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
      <div className="space-y-5">
        {sliders.map(([label, v, set, min, max, step, shown]) => (
          <div key={label}>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">{label}</span>
              <b className="tabular-nums">{shown}</b>
            </div>
            <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => (set as (n: number) => void)(Number(e.target.value))} aria-label={label} className="calc-range mt-3" style={{ ["--calc-pct" as string]: `${((v - min) / (max - min)) * 100}%` }} />
          </div>
        ))}
        <p className="text-xs text-white/50">Example only. You fund the ad spend directly with Google or Meta; we manage the campaigns.</p>
      </div>
      <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6">
        <dl className="grid grid-cols-3 gap-3">
          {[["Clicks", Math.round(clicks).toString()], ["Enquiries", enquiries.toFixed(1)], ["Per enquiry", enquiries ? gbp(budget / enquiries) : "—"]].map(([l, v]) => (
            <div key={l}>
              <dt className="text-xs text-white/60">{l}</dt>
              <dd className="mt-1 text-[28px] font-semibold leading-none tracking-[-.04em] tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => (
            <i key={i} className={`aspect-square rounded-full transition-colors ${i < Math.round(rate) ? "bg-[#BEF70A]" : "bg-white/15"}`} />
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">Out of every 100 clicks · lime = an enquiry</p>
      </div>
    </div>
  );
}

/* ── An enquiry form that sorts leads (idea 038 A) ─────────────────── */
const SORT = {
  job: [["urgent", "Urgent repair"], ["quote", "Quote for a job"], ["question", "Just a question"]],
  area: [["in", "In your area"], ["near", "Nearby"], ["far", "Further away"]],
  when: [["week", "This week"], ["month", "This month"], ["later", "Just researching"]],
} as const;

export function EnquirySorter() {
  const [pick, setPick] = useState<Record<keyof typeof SORT, string>>({ job: "quote", area: "in", when: "week" });
  const grade = pick.area === "far" || pick.job === "question" ? "C" : pick.when === "later" ? "B" : "A";
  const text = {
    A: ["Ready-to-book lead", "Goes straight to your phone, with a reminder to call the same working day."],
    B: ["Good lead — not urgent", "Gets a quick reply and a follow-up, so it isn't forgotten."],
    C: ["Polite reply, not a fit", "Gets a helpful answer — no time lost on a call."],
  }[grade];
  const labels = { job: "What do they need?", area: "Where are they?", when: "When?" } as const;
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr] md:items-center">
      <div className="space-y-4">
        {(Object.keys(SORT) as (keyof typeof SORT)[]).map((k) => (
          <div key={k}>
            <p className="text-sm font-bold">{labels[k]}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SORT[k].map(([v, l]) => (
                <button key={v} type="button" aria-pressed={pick[k] === v} onClick={() => setPick((p) => ({ ...p, [k]: v }))} className={`h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${pick[k] === v ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06]"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center" aria-live="polite">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Lead grade</p>
        <p className="mt-1 text-[110px] font-bold leading-[0.9] tracking-[-.05em] text-[#BEF70A]">{grade}</p>
        <p className="mt-2 font-bold">{text[0]}</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-white/65">{text[1]}</p>
      </div>
    </div>
  );
}

/* ── Website and app together (idea 069 B) ─────────────────────────── */
export function DeviceFrames({ src, url, alt }: { src: string; url: string; alt: string }) {
  return (
    <div className="relative pb-6 pr-16 sm:pr-24">
      <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.06]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.05] px-3 py-2.5">
          <i className="h-2 w-2 rounded-full bg-white/20" />
          <i className="h-2 w-2 rounded-full bg-white/20" />
          <i className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">{url}</span>
        </div>
        <Image src={src} alt={alt} width={1200} height={760} className="h-[240px] w-full object-cover object-top sm:h-[300px]" />
      </div>
      <div className="absolute bottom-0 right-0 w-[110px] rounded-[24px] bg-[#0D0D0D] p-[5px] shadow-[0_14px_30px_rgba(0,0,0,0.45)] sm:w-[140px]">
        <Image src={src} alt="" width={400} height={800} className="h-[210px] w-full rounded-[19px] object-cover object-left-top sm:h-[260px]" />
      </div>
    </div>
  );
}
