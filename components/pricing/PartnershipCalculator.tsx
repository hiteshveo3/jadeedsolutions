"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LinkButton } from "@/components/Button";
import { useCurrency } from "./CurrencyProvider";
import { siteConfig } from "@/lib/site";
import {
  BOOKINGS_MAX,
  BOOKINGS_MIN,
  JOB_MAX,
  JOB_MIN,
  PARTNERSHIP_COMMISSION,
  TYPICAL_RETAINER_GBP,
  clamp,
  partnershipMath,
} from "@/lib/calculator-industries";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useAnimatedNumber(target: number, durationMs = 280) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      displayRef.current = target;
      setDisplay(target);
      return;
    }
    const from = displayRef.current;
    const to = target;
    if (from === to) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;
      displayRef.current = next;
      setDisplay(next);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, reduced]);

  return display;
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  valueLabel,
  id,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  valueLabel: string;
  id: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-base font-semibold text-ink">
          {label}
        </label>
        <span className="rounded-full bg-brand-50 px-4 py-1.5 font-display text-base font-semibold tabular-nums text-brand-600">
          {valueLabel}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={valueLabel}
        className="calc-range"
        style={{ ["--calc-pct" as string]: `${pct}%` }}
      />
      <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function PartnershipCalculator() {
  const { format } = useCurrency();
  const baseId = useId();
  const liveRef = useRef<HTMLParagraphElement>(null);

  const [bookings, setBookings] = useState(8);
  const [avgJob, setAvgJob] = useState(150);
  const [hydrated, setHydrated] = useState(false);

  const math = partnershipMath(bookings, avgJob);
  const quietFee = 0;
  const busyMath = partnershipMath(
    clamp(Math.round(bookings * 1.75) || 14, BOOKINGS_MIN, BOOKINGS_MAX),
    avgJob,
  );

  const animKeep = useAnimatedNumber(math.keep);
  const animFee = useAnimatedNumber(math.fee);
  const animRevenue = useAnimatedNumber(math.revenue);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const b = p.get("bookings");
    const j = p.get("job");
    if (b != null && !Number.isNaN(Number(b))) {
      setBookings(clamp(Number(b), BOOKINGS_MIN, BOOKINGS_MAX));
    }
    if (j != null && !Number.isNaN(Number(j))) {
      setAvgJob(clamp(Number(j), JOB_MIN, JOB_MAX));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("bookings", String(bookings));
    url.searchParams.set("job", String(avgJob));
    url.searchParams.delete("industry");
    url.searchParams.delete("compare");
    const hash = url.hash || "#partnership-calculator";
    window.history.replaceState({}, "", `${url.pathname}${url.search}${hash}`);
  }, [hydrated, bookings, avgJob]);

  useEffect(() => {
    if (!liveRef.current) return;
    liveRef.current.textContent = `You keep ${format(Math.round(math.keep))} after 10% fee of ${format(Math.round(math.fee))}`;
  }, [math.keep, math.fee, format]);

  const waText = [
    `Hi Jadeed — I used the pricing calculator.`,
    ``,
    `Scenario: ${bookings} bookings/mo × ${format(avgJob)} avg job`,
    `Est. monthly revenue: ${format(math.revenue)}`,
    `Jadeed 10%: ${format(math.fee)}`,
    `I keep: ${format(math.keep)}`,
    ``,
    `I'd like to talk about the Growth Partnership.`,
  ].join("\n");

  const waHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      id="partnership-calculator"
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft"
    >
      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 sm:px-10 sm:py-8">
        <span className="eyebrow">Visualizer</span>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          See what you&rsquo;d pay
        </h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-600">
          Set bookings and average job value. Instantly see our{" "}
          <span className="font-semibold text-brand-500">10%</span> fee and what
          you keep — same offer for every local service business.
        </p>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-950">
          Estimate only · based on bookings <strong>we</strong> generate — not
          your existing jobs · 6-month minimum · Alpha Movers avg job was
          ~£150–250.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Controls */}
        <div className="flex flex-col justify-center gap-10 p-6 sm:p-10 lg:p-12">
          <SliderField
            id={`${baseId}-bookings`}
            label="Bookings we generate / month"
            value={bookings}
            min={BOOKINGS_MIN}
            max={BOOKINGS_MAX}
            step={1}
            onChange={(n) => setBookings(clamp(n, BOOKINGS_MIN, BOOKINGS_MAX))}
            valueLabel={`${bookings}`}
          />

          <SliderField
            id={`${baseId}-job`}
            label="Average job value"
            value={avgJob}
            min={JOB_MIN}
            max={JOB_MAX}
            step={5}
            onChange={(n) => setAvgJob(clamp(n, JOB_MIN, JOB_MAX))}
            valueLabel={format(avgJob)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quiet month
              </p>
              <p className="mt-1 text-sm text-slate-600">0 bookings from us</p>
              <p className="mt-3 font-display text-2xl font-semibold text-ink">
                Pay {format(quietFee)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Busier month
              </p>
              <p className="mt-1 text-sm text-slate-600">
                ~{busyMath.revenue > 0 ? Math.round(busyMath.revenue / (avgJob || 1)) : 0}{" "}
                bookings
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-ink">
                Pay {format(Math.round(busyMath.fee))}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">Monthly revenue generated</span>
              <span className="font-display text-xl font-semibold tabular-nums text-ink">
                {format(Math.round(animRevenue))}
              </span>
            </div>
            <div
              className="mt-4 flex h-3.5 overflow-hidden rounded-full bg-slate-200"
              role="img"
              aria-label="You keep 90 percent, Jadeed fee 10 percent"
            >
              <div
                className="h-full bg-brand-500 transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: math.revenue > 0 ? "90%" : "0%" }}
              />
              <div
                className="h-full bg-ink/80 transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: math.revenue > 0 ? "10%" : "0%" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs font-medium text-slate-500">
              <span>You keep {(100 - PARTNERSHIP_COMMISSION * 100).toFixed(0)}%</span>
              <span>Jadeed {(PARTNERSHIP_COMMISSION * 100).toFixed(0)}%</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Break-even vs a typical {format(TYPICAL_RETAINER_GBP)}/mo retainer:
              about{" "}
              <span className="font-semibold text-ink">
                {math.breakEvenBookings} bookings/mo
              </span>{" "}
              at this job value.
            </p>
          </div>
        </div>

        {/* Results — equal column, roomy */}
        <div className="flex min-h-full flex-col justify-between gap-10 bg-brand-500 p-8 text-white sm:p-10 lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white/80">
              You keep each month
            </p>
            <p className="mt-3 font-display text-6xl font-semibold tabular-nums tracking-tight sm:text-7xl">
              {format(Math.round(animKeep))}
            </p>
            <p className="mt-3 text-base text-white/90">
              After our {(PARTNERSHIP_COMMISSION * 100).toFixed(0)}% on bookings
              we generate
            </p>
          </div>

          <dl className="space-y-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-white/25 pb-4">
              <dt className="text-base text-white/85">Jadeed fee (10%)</dt>
              <dd className="font-display text-3xl font-semibold tabular-nums">
                {format(Math.round(animFee))}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-white/25 pb-4">
              <dt className="text-base text-white/85">6 months you keep</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums">
                {format(Math.round(math.sixKeep))}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-base text-white/85">Jadeed over 6 months</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums">
                {format(Math.round(math.sixFee))}
              </dd>
            </div>
          </dl>

          <div className="rounded-2xl bg-white/15 p-5 text-base leading-relaxed text-white/95">
            {math.fee === 0 ? (
              <p>
                Zero bookings from us ={" "}
                <span className="font-semibold">zero commission</span>. A
                typical fixed retainer still bills ~{format(TYPICAL_RETAINER_GBP)}
                /mo.
              </p>
            ) : math.fee < TYPICAL_RETAINER_GBP ? (
              <p>
                At this volume you&rsquo;d pay{" "}
                <span className="font-semibold">
                  {format(Math.round(math.fee))}
                </span>{" "}
                — about{" "}
                <span className="font-semibold">
                  {format(Math.round(TYPICAL_RETAINER_GBP - math.fee))} less
                </span>{" "}
                than a typical {format(TYPICAL_RETAINER_GBP)}/mo retainer.
              </p>
            ) : (
              <p>
                Busy month? You still only pay 10% of what we brought in — not a
                flat retainer when it&rsquo;s quiet.
              </p>
            )}
          </div>

          <div>
            <LinkButton href={waHref} size="lg" variant="white" className="w-full">
              WhatsApp this scenario
            </LinkButton>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="mt-4 block text-center text-base font-semibold text-white/90 underline-offset-2 hover:underline"
            >
              Or call {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
