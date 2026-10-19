"use client";

import { useState } from "react";
import { HugeiconsIcon, CheckIcon, CloseIcon, PlusIcon, PhoneIcon, HandshakeIcon, SearchIcon, CodeIcon } from "@/components/icons";

/* Process & timeline pieces from the design lab (ideas 026, 029, 031, 054–060),
   written for Jadeed Solutions. Anything that is an example says so. */

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const chip = (on: boolean) => `h-8 rounded-full px-3.5 text-xs font-semibold transition-colors ${on ? "bg-[#BEF70A] text-[#0B1F12]" : "border border-white/[0.08] bg-white/[0.06] text-[#0B1F12]"}`;
const Tick = ({ size = 12 }: { size?: number }) => (
  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
    <HugeiconsIcon icon={CheckIcon} size={size} />
  </span>
);

/* ── 029 A: timeline slider + card ─────────────────────────────────── */
export function StepSlider({ steps }: { steps: readonly { title: string; text: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <input type="range" min={0} max={steps.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} aria-label="Step" className="calc-range" style={{ ["--calc-pct" as string]: `${(i / (steps.length - 1)) * 100}%` }} />
      <div className="mt-3 grid text-xs font-bold" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((s, k) => (
          <button key={s.title} type="button" onClick={() => setI(k)} className={`text-left transition-colors ${k <= i ? "text-[#BEF70A]" : "text-white/45"} ${k === steps.length - 1 ? "text-right" : ""}`}>
            {String(k + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      {steps.map((s, k) => (
        <div key={s.title} hidden={k !== i} className="mt-5 rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 motion-safe:animate-[rise_.45s_ease_both] md:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">Step {k + 1} of {steps.length}</p>
          <h3 className="mt-2 text-2xl tracking-[-.03em] sm:text-3xl">{s.title}</h3>
          <p className="mt-3 max-w-2xl leading-7 text-white/[0.75]">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ── 054 A + B: is this a fit? ─────────────────────────────────────── */
const FIT_YES = ["A working phone line and a way to answer new enquiries quickly", "The ability and capacity to take on more work", "Job margins that leave room for a fee", "Willingness to keep tracking in place and mark what happened with each customer"] as const;
const FIT_NO = ["You need a guaranteed #1 ranking by a date", "You're fully booked all year round", "You'd rather not track where enquiries come from", "You want a one-off logo, not growth"] as const;
const FIT_Q = [
  ["q1", "Local service business?", "We work with local service businesses — it's what we know best."],
  ["q2", "Could you take on more work?", "More calls only help if you can take the jobs."],
  ["q3", "Happy to track enquiries?", "Tracking is how we show what's working — and how the 10% model stays fair."],
] as const;

export function FitColumns() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6">
        <p className="font-bold text-[#BEF70A]">A good fit</p>
        <ul className="mt-4 grid gap-3 text-[15px]">
          {FIT_YES.map((t) => (
            <li key={t} className="flex gap-3"><Tick />{t}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.03] p-6">
        <p className="font-bold text-white/70">Not a fit (yet)</p>
        <ul className="mt-4 grid gap-3 text-[15px] text-white/65">
          {FIT_NO.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white/50"><HugeiconsIcon icon={CloseIcon} size={12} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function FitQuiz() {
  const [a, setA] = useState<Record<string, boolean>>({ q1: true, q2: true, q3: true });
  const no = FIT_Q.find(([k]) => !a[k]);
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-start">
      <div className="space-y-2.5">
        {FIT_Q.map(([k, q]) => (
          <div key={k} className="flex items-center justify-between gap-4 rounded-[16px] bg-white/[0.06] px-4 py-3">
            <span className="text-[15px] font-semibold">{q}</span>
            <span className="inline-flex rounded-full bg-white/[0.08] p-0.5" role="group" aria-label={q}>
              {[true, false].map((v) => (
                <button key={String(v)} type="button" aria-pressed={a[k] === v} onClick={() => setA((s) => ({ ...s, [k]: v }))} className={`h-8 rounded-full px-3.5 text-xs font-bold ${a[k] === v ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
                  {v ? "Yes" : "No"}
                </button>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className={`rounded-[22px] border p-6 ${no ? "border-white/[0.08] bg-white/[0.06]" : "border-[#BEF70A] bg-[#BEF70A]/[0.07]"}`} aria-live="polite">
        <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Our honest answer</p>
        <p className="mt-2 text-3xl font-bold tracking-[-.03em]">{no ? "Probably not yet." : "Looks like a fit."}</p>
        <p className="mt-2 text-sm leading-6 text-white/70">{no ? no[2] : "Book a free growth plan — we'll look at your visibility and outline the next steps."}</p>
      </div>
    </div>
  );
}

/* ── 055 A: a typical first month, by week ─────────────────────────── */
const WEEKS = [
  ["Week 1", "Discovery and access", ["Google Business Profile access", "Analytics and call tracking", "Your services and areas, agreed"]],
  ["Week 2", "Foundations", ["Website fixes or new pages", "Service and area pages planned", "Profile cleaned up"]],
  ["Week 3", "Go live", ["Pages live", "Calls and forms tracked end to end", "First review requests"]],
  ["Week 4", "First report", ["What's live", "Early signals", "Next month's plan, on a call"]],
] as const;

export function WeekTabs() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {WEEKS.map(([w], k) => (
          <button key={w} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)} className={chip(k === i)}>
            {w}
          </button>
        ))}
      </div>
      {WEEKS.map(([w, t, list], k) => (
        <div key={w} hidden={k !== i} className="mt-4 rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 motion-safe:animate-[rise_.45s_ease_both]">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">{w}</p>
          <h3 className="mt-2 text-2xl tracking-[-.03em]">{t}</h3>
          <ul className="mt-4 grid gap-2.5 text-[15px]">
            {list.map((x) => (
              <li key={x} className="flex gap-3"><Tick />{x}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-3 text-xs text-white/50">A typical first month on a fixed SEO plan — your own plan is agreed on the discovery call.</p>
    </div>
  );
}

/* ── 056 B: who does what, one switch ──────────────────────────────── */
const YOU = ["Answer the calls and do great work", "Mark what happened with each customer — completed, paid", "Weigh our website and search recommendations seriously", "Ask happy customers for a review"] as const;
const US = ["Website, service pages and Google profile", "SEO — and ads, if you want them", "Tracking every call and form", "A plain-English report and a call, monthly"] as const;

export function YouAndUs() {
  const [side, setSide] = useState<"you" | "us">("us");
  const list = side === "you" ? YOU : US;
  return (
    <div>
      <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.06] p-1" role="tablist">
        {(["you", "us"] as const).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={side === k} onClick={() => setSide(k)} className={`h-10 rounded-full px-5 text-sm font-semibold ${side === k ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
            {k === "you" ? "What you do" : "What we do"}
          </button>
        ))}
      </div>
      <ul key={side} className="mt-5 grid gap-2.5 motion-safe:animate-[rise_.45s_ease_both] sm:grid-cols-2">
        {list.map((t) => (
          <li key={t} className="flex items-center gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.06] px-4 py-3.5 text-[15px]"><Tick />{t}</li>
        ))}
      </ul>
    </div>
  );
}

/* ── 057 B: the monthly report — numbers and small bars (example) ──── */
export function MonthlyReport() {
  const cards = [
    ["Calls", "48", "+12", [20, 26, 30, 34, 41, 48]],
    ["Enquiries", "31", "+7", [12, 15, 19, 22, 24, 31]],
  ] as const;
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map(([label, value, delta, bars]) => (
          <div key={label} className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/65">{label}</span>
              <span className="rounded-full bg-[#BEF70A] px-2.5 py-0.5 text-xs font-bold text-[#0B1F12]">{delta}</span>
            </div>
            <p className="mt-2 text-5xl font-semibold tracking-[-.05em]">{value}</p>
            <div className="mt-5 flex h-12 items-end gap-1.5" aria-hidden="true">
              {bars.map((b, k) => (
                <i key={k} className="flex-1 rounded-[4px] motion-safe:animate-[growup_.9s_cubic-bezier(.2,.8,.2,1)_both]" style={{ height: `${(b / Math.max(...bars)) * 100}%`, background: k === bars.length - 1 ? "#BEF70A" : "rgba(255,255,255,0.16)", transformOrigin: "bottom", animationDelay: `${k * 60}ms` }} />
              ))}
            </div>
            <p className="mt-2 text-xs text-white/45">Last 6 months</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/50">Example report. Yours shows your own impressions, clicks, calls and enquiries.</p>
    </div>
  );
}

/* ── 058 B: from handshake to phone ringing, the last step rings ───── */
const RINGING = [
  ["Day one", "Handshake", "We agree the plan, the commercial model and your territory, in writing.", HandshakeIcon],
  ["First weeks", "Foundations", "Website, profile and tracking set up so every call can be counted.", CodeIcon],
  ["Then", "Visibility grows", "Specific, easier searches first, then the competitive ones.", SearchIcon],
  ["As it compounds", "Phone ringing", "More searches show you — more calls, more booked jobs.", PhoneIcon],
] as const;

export function HandshakeToPhone() {
  return (
    <ol className="grid gap-5">
      {RINGING.map(([when, title, text, icon], i) => (
        <li key={title} className="flex gap-4">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${i === RINGING.length - 1 ? "bg-[#BEF70A] text-[#0B1F12] motion-safe:animate-[pulse-lime_1.6s_infinite]" : "bg-white/[0.08] text-[#BEF70A]"}`}>
            <HugeiconsIcon icon={icon} size={20} />
          </span>
          <div>
            <p className="text-xs font-bold text-[#BEF70A]">{when}</p>
            <p className="mt-0.5 text-lg font-bold">{title}</p>
            <p className="mt-1 text-sm leading-6 text-white/70">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── 059 A: every recommendation comes with a “why” (example month) ── */
const RECS = [
  ["Add an “emergency boiler repair” page", "People search it late at night, and no local page answers it well.", "More after-hours calls."],
  ["Ask for reviews by text after each job", "Customers answer a text far more often than an email.", "More reviews, higher on the map."],
  ["Pause the broad “plumber” ad", "Clicks cost a lot and rarely booked.", "The same budget goes to searches that book."],
] as const;

export function Recommendations() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/[0.12] border-y border-white/[0.08]">
      {RECS.map(([t, why, effect], i) => (
        <div key={t}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left font-bold">
            {t}
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all ${open === i ? "rotate-45 bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.08]"}`}>
              <HugeiconsIcon icon={PlusIcon} size={16} />
            </span>
          </button>
          {open === i && (
            <div className="pb-5 text-[15px] leading-7 text-white/75">
              <p><b className="text-white">Why:</b> {why}</p>
              <p><b className="text-[#BEF70A]">What it should change:</b> {effect}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── 060 A: where the work stands — ring + live checklist (example) ── */
const TASKS = [["Google profile cleaned up", true], ["Call tracking on", true], ["Homepage rewritten", true], ["Boiler repair page", true], ["Emergency page", true], ["Review request texts", true], ["Area page: Bromley", false], ["Area page: Sutton", false], ["Weekend ad test", false]] as const;

export function TaskRing() {
  const [done, setDone] = useState<boolean[]>(TASKS.map(([, d]) => d));
  const n = done.filter(Boolean).length;
  return (
    <div className="grid items-center gap-8 sm:grid-cols-[.8fr_1.2fr]">
      <div className="text-center">
        <svg viewBox="0 0 120 120" className="mx-auto block h-40 w-40" aria-hidden="true">
          <circle cx={60} cy={60} r={50} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={10} />
          <circle cx={60} cy={60} r={50} fill="none" stroke="#BEF70A" strokeWidth={10} strokeLinecap="round" strokeDasharray={314} strokeDashoffset={314 * (1 - n / TASKS.length)} transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset .4s" }} />
          <text x={60} y={67} textAnchor="middle" fontSize={22} fontWeight={700} fill="#EEF2E7" fontFamily="var(--font-sans)">{n}/{TASKS.length}</text>
        </svg>
        <p className="mt-2 text-sm text-white/65">tasks done this month</p>
      </div>
      <ul className="grid gap-1">
        {TASKS.map(([t], i) => (
          <li key={t}>
            <button type="button" aria-pressed={done[i]} onClick={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))} className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left text-[15px] transition-colors hover:bg-white/[0.05]">
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors ${done[i] ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.08] text-transparent"}`}><HugeiconsIcon icon={CheckIcon} size={12} /></span>
              <span className={done[i] ? "text-white/60" : ""}>{t}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 026 B: coin stacks — you keep vs our fee ──────────────────────── */
export function CoinStacks({ rate = 0.1 }: { rate?: number }) {
  const [job, setJob] = useState(600);
  const keep = job * (1 - rate), fee = job * rate;
  const coins = (count: number, color: string, edge: string) =>
    Array.from({ length: count }, (_, i) => <i key={i} className="-mt-2 block h-[14px] w-[74px] rounded-[50%] first:mt-0" style={{ background: color, boxShadow: `inset 0 -3px 0 rgba(0,0,0,0.14), 0 0 0 1.5px ${edge}` }} />);
  return (
    <div>
      <div className="flex h-[230px] items-end justify-center gap-10 border-b-2 border-white/[0.08] pb-1">
        <div className="flex flex-col-reverse items-center">{coins(Math.min(16, Math.max(1, Math.round(keep / 60))), "#BEF70A", "rgba(11,31,18,0.35)")}</div>
        <div className="flex flex-col-reverse items-center">{coins(Math.max(1, Math.round(fee / 60)), "#EEF2E7", "rgba(255,255,255,0.5)")}</div>
      </div>
      <div className="mt-3 flex justify-center gap-10 text-sm">
        <span className="w-[110px] text-center font-bold">You keep {gbp(keep)}</span>
        <span className="w-[110px] text-center text-white/65">Our fee {gbp(fee)}</span>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-white/70">Booked job value</span>
        <b className="tabular-nums">{gbp(job)}</b>
      </div>
      <input type="range" min={200} max={2000} step={100} value={job} onChange={(e) => setJob(Number(e.target.value))} aria-label="Booked job value" className="calc-range mt-3" style={{ ["--calc-pct" as string]: `${((job - 200) / 1800) * 100}%` }} />
      <p className="mt-3 text-xs text-white/50">Growth Partnership example at 10%. Your rate is agreed for your trade and job size.</p>
    </div>
  );
}

/* ── 031 A: try the numbers — visitors to booked jobs (example) ────── */
const FUNNEL = { cautious: [100, 5, 40], planning: [200, 8, 50], target: [400, 10, 60] } as const;

export function FunnelNumbers({ jobValue = 400 }: { jobValue?: number }) {
  const [k, setK] = useState<keyof typeof FUNNEL>("planning");
  const [vis, er, br] = FUNNEL[k];
  const enq = (vis * er) / 100, booked = (enq * br) / 100;
  const rows = [["Relevant visitors a month", vis, 100], ["Enquiries", Math.round(enq), (enq / 40) * 100], ["Booked jobs", Math.round(booked * 10) / 10, (booked / 24) * 100]] as const;
  return (
    <div>
      <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.06] p-1" role="tablist">
        {(["cautious", "planning", "target"] as const).map((key) => (
          <button key={key} type="button" role="tab" aria-selected={k === key} onClick={() => setK(key)} className={`h-9 rounded-full px-4 text-sm font-semibold capitalize ${k === key ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
            {key}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {rows.map(([label, value, w]) => (
          <div key={label}>
            <div className="flex justify-between text-sm"><span className="text-white/70">{label}</span><b className="tabular-nums">{value}</b></div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15"><i className="block h-full rounded-full bg-[#BEF70A] transition-[width] duration-500" style={{ width: `${Math.min(100, w)}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between rounded-[16px] border border-[#BEF70A] bg-[#BEF70A]/[0.07] px-5 py-4">
        <span className="text-sm">Work booked a month</span>
        <span className="text-2xl font-semibold tracking-[-.03em] text-[#BEF70A] tabular-nums">{gbp(booked * jobValue)}</span>
      </div>
      <p className="mt-3 text-xs text-white/50">Example figures at a {gbp(jobValue)} average job — not a forecast.</p>
    </div>
  );
}
