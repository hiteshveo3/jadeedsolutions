"use client";

import { useState } from "react";
import { CheckIcon, ClockIcon, HugeiconsIcon, LinkIcon, TargetIcon } from "@/components/icons";
import { ROADMAP, SYSTEM_PARTS, type BuildState } from "./data";
import { LABEL, SOFT, Tick } from "./ui";

/* 90-day plan. Each month separates four things a director needs to tell apart:
   what we work on, what you can see at the end, the milestone, and what it depends on.
   The status board shows where every part of the system stands at the end of the month,
   so the roadmap no longer repeats the product mockups shown above. */

const STATE: Record<BuildState, { dot: string; text: string; label: string }> = {
  live: { dot: "bg-[#BEF70A]", text: "text-[#BEF70A]", label: "Done or live" },
  build: { dot: "bg-[#BEF70A]/40", text: "text-white/85", label: "In progress" },
  planned: { dot: "bg-white/[0.18]", text: "text-white/50", label: "Not yet" },
  external: { dot: "border-2 border-dashed border-[#BEF70A]/60 bg-transparent", text: "text-white/85", label: "Outside our control" },
};

function StatusBoard({ i }: { i: number }) {
  const m = ROADMAP[i];
  return (
    <div className={`${SOFT} p-5 sm:p-6`}>
      <p className={`${LABEL} text-white/60`}>Where the system stands · end of month {m.month}</p>
      <ul className="mt-4 grid gap-1.5">
        {SYSTEM_PARTS.map((part, p) => {
          const [state, note] = m.status[p];
          const s = STATE[state];
          return (
            <li key={part} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} aria-hidden="true" />
              <span className="min-w-0 flex-1 text-[15px] font-semibold">{part}</span>
              <span className={`text-right text-[13px] font-semibold ${s.text}`}>{note}</span>
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/60" aria-label="Key">
        {(Object.keys(STATE) as BuildState[]).map((k) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${STATE[k].dot}`} aria-hidden="true" />
            {STATE[k].label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MonthBody({ i }: { i: number }) {
  const m = ROADMAP[i];
  return (
    <div className="grid gap-6">
      <p className="text-lg leading-7">{m.target}</p>

      <div>
        <p className={`${LABEL} text-white/60`}>We work on</p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
          {m.work.map((w) => (
            <Tick key={w}>{w}</Tick>
          ))}
        </ul>
      </div>

      <div>
        <p className={`${LABEL} text-white/60`}>You can see</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {m.deliverables.map((d) => (
            <li key={d} className="inline-flex items-center gap-1.5 rounded-full bg-[#BEF70A]/[0.13] px-3.5 py-1.5 text-sm font-semibold text-[#BEF70A]">
              <HugeiconsIcon icon={CheckIcon} size={12} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="flex gap-3 rounded-[20px] bg-[#BEF70A]/[0.08] p-4">
          <HugeiconsIcon icon={TargetIcon} size={22} className="text-[#BEF70A]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#BEF70A]">Milestone</p>
            <p className="mt-1 text-[15px] font-bold leading-6">{m.milestone}</p>
          </div>
        </div>
        <div className="flex gap-3 rounded-[20px] bg-white/[0.05] p-4">
          <HugeiconsIcon icon={LinkIcon} size={20} className="text-white/60" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-white/60">Depends on</p>
            <p className="mt-1 text-sm leading-6 text-white/80">{m.dependsOn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Roadmap() {
  const [i, setI] = useState(0);

  return (
    <>
      {/* Phone and tablet: a vertical sequence, every month open. */}
      <ol className="grid gap-12 lg:hidden">
        {ROADMAP.map((r, idx) => (
          <li key={r.month} className="relative pl-12">
            <span className="vc-num absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-[#BEF70A] text-sm font-bold text-[#0B1F12]">{r.month}</span>
            {idx < ROADMAP.length - 1 && <span className="absolute bottom-[-48px] left-[18px] top-11 w-px bg-white/[0.12]" aria-hidden="true" />}
            <p className={`${LABEL} text-[#BEF70A]`}>Month {r.month}</p>
            <h3 className="mt-1.5 text-2xl leading-tight">{r.title}</h3>
            <div className="mt-4">
              <MonthBody i={idx} />
            </div>
            <div className="mt-5">
              <StatusBoard i={idx} />
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: an interactive horizontal timeline. */}
      <div className="hidden lg:block">
        <div role="tablist" aria-label="Development months" className="relative grid grid-cols-3">
          <div className="absolute left-0 right-0 top-[19px] h-[2px] rounded-full bg-white/[0.1]" aria-hidden="true" />
          <div
            className="absolute left-0 top-[19px] h-[2px] rounded-full bg-[#BEF70A] transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${((i + 1) / 3) * 100}%` }}
            aria-hidden="true"
          />
          {ROADMAP.map((r, idx) => {
            const on = idx === i;
            const done = idx <= i;
            return (
              <button
                key={r.month}
                role="tab"
                id={`rm-tab-${idx}`}
                aria-selected={on}
                aria-controls="rm-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setI(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const n = (idx + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setI(n);
                    document.getElementById(`rm-tab-${n}`)?.focus();
                  }
                }}
                className="group relative pr-6 text-left"
              >
                <span
                  className={`vc-num relative z-10 grid h-10 w-10 place-items-center rounded-full text-[15px] font-bold transition-colors ${
                    done ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-[#06301D] text-white/70 ring-1 ring-inset ring-white/[0.12] group-hover:text-white"
                  }`}
                >
                  {r.month}
                </span>
                <span className={`mt-4 flex items-center gap-1.5 ${LABEL} ${on ? "text-[#BEF70A]" : "text-white/55"}`}>
                  <HugeiconsIcon icon={ClockIcon} size={13} />
                  Month {r.month}
                </span>
                <span className={`mt-1.5 block text-xl font-semibold leading-snug ${on ? "text-white" : "text-white/60 group-hover:text-white/85"}`}>{r.title}</span>
              </button>
            );
          })}
        </div>

        <div id="rm-panel" role="tabpanel" aria-labelledby={`rm-tab-${i}`} className="mt-12 grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start gap-12">
          <div key={i} className="vc-fade">
            <MonthBody i={i} />
          </div>
          <div key={`s${i}`} className="vc-fade">
            <StatusBoard i={i} />
          </div>
        </div>
      </div>
    </>
  );
}

/* Our build vs Google/Apple review: two lanes, so nobody reads app-store approval
   as part of the 90-day promise. */
export function PublicationLanes() {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-5 sm:p-8">
      <p className={`${LABEL} text-[#BEF70A]`}>Important · App publication is a separate step</p>
      <div className="mt-6 grid grid-cols-12 gap-y-1.5" aria-hidden="true">
        <span className="col-span-7 text-[13px] text-white/60">Months 1–3 · our timeline</span>
        <span className="col-span-5 text-right text-[13px] text-white/60">Their timeline</span>
        <div className="col-span-8 rounded-full bg-[#BEF70A] px-4 py-2.5 text-sm font-bold text-[#0B1F12]">We build and prepare</div>
        <div className="col-span-6 col-start-7 rounded-full border-2 border-dashed border-[#BEF70A]/50 px-4 py-2 text-sm font-bold text-white">Google and Apple review</div>
      </div>
      <div className="mt-6 grid gap-4 text-[15px] leading-6 text-white/[0.72] sm:grid-cols-2">
        <p>
          <strong className="font-bold text-white">Within our control:</strong> developing and preparing the customer and chauffeur apps during the first three months, and assisting with submission.
        </p>
        <p>
          <strong className="font-bold text-white">Outside our control:</strong> Google and Apple account verification, testing requirements and approval timelines. iPhone publishing also needs suitable Mac access, so it may take additional time.
        </p>
      </div>
    </div>
  );
}
