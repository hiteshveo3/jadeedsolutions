"use client";

import { useId, useState } from "react";
import { PLANS, PLAN_INCLUDES, TERM_MONTHS, fee, gbp } from "./data";
import { LABEL } from "./ui";

/* Same card treatment as /pricing: recommended plan gets the lime line and pill.
   What all three share sits once above the cards, so each card shows only what differs. */
export function PlanCards() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-col gap-3 rounded-[22px] bg-white/[0.05] p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-6">
        <p className={`${LABEL} shrink-0 text-[#BEF70A]`}>All three include</p>
        <ul className="flex flex-wrap gap-2">
          {[`${TERM_MONTHS}-month partnership`, ...PLAN_INCLUDES].map((f) => (
            <li key={f} className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-sm font-semibold text-white/85">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid gap-3 lg:grid-cols-3">
        {PLANS.map((p) => (
          <li
            key={p.id}
            className={`relative flex flex-col rounded-[24px] border p-6 md:p-7 ${p.recommended ? "border-[#BEF70A] bg-white/[0.07]" : "border-white/[0.08] bg-white/[0.05]"}`}
          >
            <div className="flex min-h-[26px] items-center">
              {p.recommended ? (
                <span className="w-fit rounded-full bg-[#BEF70A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B1F12]">Recommended · predictable budget</span>
              ) : (
                <span className="text-sm text-white/60">{p.id === "balanced" ? "Lower base, modest success bonus" : "Lowest fixed commitment"}</span>
              )}
            </div>
            <h3 className="mt-3 text-2xl">{p.name}</h3>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white/[0.06] px-4 py-3.5">
                <p className="text-xs text-white/60">Monthly base fee</p>
                <p className="vc-num mt-1 text-[34px] font-semibold leading-none tracking-[-.04em] text-[#BEF70A]">{gbp(p.base)}</p>
                <p className="mt-1 text-xs text-white/55">paid in advance</p>
              </div>
              <div className="rounded-2xl bg-white/[0.06] px-4 py-3.5">
                <p className="text-xs text-white/60">Per eligible booking</p>
                <p className={`vc-num mt-1 text-[34px] font-semibold leading-none tracking-[-.04em] ${p.bonus ? "text-white" : "text-white/40"}`}>{gbp(p.bonus)}</p>
                <p className="mt-1 text-xs text-white/55">{p.bonus ? "billed monthly, after completion" : "no success fee"}</p>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-6 text-white/80">{p.line}</p>
            <p className="mt-auto pt-5 text-sm leading-6 text-white/60">{p.fit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const MAX_BOOKINGS = 40;
// Lines differ by dash pattern as well as tone, so colour is never the only cue.
const STYLE = {
  fixed: { stroke: "#BEF70A", dash: undefined, label: "Fixed" },
  balanced: { stroke: "rgba(238,242,231,0.85)", dash: "7 5", label: "Balanced" },
  performance: { stroke: "rgba(238,242,231,0.5)", dash: "2 4", label: "Performance" },
} as const;

export function Calculator() {
  const [n, setN] = useState(5);
  const sliderId = useId();
  const fees = PLANS.map((p) => ({ ...p, total: fee(p.base, p.bonus, n) }));
  const min = Math.min(...fees.map((f) => f.total));
  const lowest = fees.filter((f) => f.total === min);
  const scaleMax = fee(100, 20, MAX_BOOKINGS);

  const W = 380;
  const H = 230;
  const pad = { l: 44, r: 12, t: 14, b: 34 };
  const x = (b: number) => pad.l + (b / MAX_BOOKINGS) * (W - pad.l - pad.r);
  const y = (v: number) => H - pad.b - (v / scaleMax) * (H - pad.t - pad.b);

  return (
    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-5 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <label htmlFor={sliderId} className={`${LABEL} text-[#BEF70A]`}>
            Eligible completed bookings in a month
          </label>
          <div className="mt-3 flex items-baseline gap-3">
            <output htmlFor={sliderId} className="vc-num text-[56px] font-semibold leading-none tracking-[-.05em]">
              {n}
            </output>
            <span className="text-base text-white/60">{n === 1 ? "booking" : "bookings"}</span>
          </div>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={MAX_BOOKINGS}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            aria-valuetext={`${n} eligible completed bookings`}
            className="calc-range mt-6"
            style={{ ["--calc-pct" as string]: `${(n / MAX_BOOKINGS) * 100}%` }}
          />
          <div className="vc-num mt-2 flex justify-between text-[13px] text-white/55" aria-hidden="true">
            {[0, 10, 20, 30, 40].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <ul className="mt-8 grid gap-4" aria-live="polite">
            {fees.map((f) => {
              const best = f.total === min;
              return (
                <li key={f.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] font-semibold">
                      {STYLE[f.id].label}
                      {best && <span className="ml-2 rounded-full bg-[#BEF70A]/[0.13] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[.1em] text-[#BEF70A]">{lowest.length > 1 ? "Joint lowest" : "Lowest"}</span>}
                    </span>
                    <span className="vc-num text-xl font-semibold">
                      {gbp(f.total)}
                      <span className="text-[13px] font-normal text-white/55"> /mo</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden="true">
                    <div
                      className={`h-full rounded-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${best ? "bg-[#BEF70A]" : "bg-white/[0.28]"}`}
                      style={{ width: `${(f.total / scaleMax) * 100}%` }}
                    />
                  </div>
                  <p className="vc-num mt-1 text-[13px] text-white/55">{f.bonus === 0 ? `${gbp(f.base)} fixed` : `${gbp(f.base)} + ${n} × ${gbp(f.bonus)}`}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className={`${LABEL} text-white/60`}>Monthly fee as bookings grow</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full max-w-[520px]" role="img" aria-label="Line chart: Fixed stays at £300. Balanced and Performance rise with bookings. All three equal £300 at 10 bookings.">
            {[0, 300, 600, 900].map((v) => (
              <g key={v}>
                <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="rgba(238,242,231,0.08)" />
                <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="rgba(238,242,231,0.6)" className="vc-num">
                  £{v}
                </text>
              </g>
            ))}
            {[0, 10, 20, 30, 40].map((b) => (
              <text key={b} x={x(b)} y={H - pad.b + 18} textAnchor="middle" fontSize="11" fill="rgba(238,242,231,0.6)" className="vc-num">
                {b}
              </text>
            ))}
            <line x1={x(n)} x2={x(n)} y1={pad.t} y2={H - pad.b} stroke="rgba(190,247,10,0.45)" strokeWidth="1.5" />
            {PLANS.map((p) => (
              <line
                key={p.id}
                x1={x(0)}
                y1={y(p.base)}
                x2={x(MAX_BOOKINGS)}
                y2={y(fee(p.base, p.bonus, MAX_BOOKINGS))}
                stroke={STYLE[p.id].stroke}
                strokeWidth="2.5"
                strokeDasharray={STYLE[p.id].dash}
                strokeLinecap="round"
              />
            ))}
            <circle cx={x(10)} cy={y(300)} r="4.5" fill="#06301D" stroke="#BEF70A" strokeWidth="2" />
            {PLANS.map((p) => (
              <circle key={p.id} cx={x(n)} cy={y(fee(p.base, p.bonus, n))} r="4" fill={STYLE[p.id].stroke} />
            ))}
          </svg>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/80">
            {PLANS.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <svg width="26" height="8" aria-hidden="true">
                  <line x1="1" y1="4" x2="25" y2="4" stroke={STYLE[p.id].stroke} strokeWidth="2.5" strokeDasharray={STYLE[p.id].dash} strokeLinecap="round" />
                </svg>
                {STYLE[p.id].label}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-[20px] bg-[#BEF70A]/[0.08] p-5">
            <p className="text-base font-bold">All three cost exactly £300 at 10 bookings a month.</p>
            <p className="mt-2 text-[15px] leading-6 text-white/[0.72]">Below 10, Performance has the lowest fee. Above 10, Fixed does. Fee = monthly base + (bonus × eligible completed bookings).</p>
          </div>
        </div>
      </div>
      <p className="mt-8 border-t border-white/[0.08] pt-5 text-sm leading-6 text-white/60">
        These are examples, not forecasts. Eligible completed bookings are not guaranteed. Figures show partnership fees only and exclude third-party subscriptions and costs.
      </p>
    </div>
  );
}
