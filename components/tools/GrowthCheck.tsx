"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/site";
import {
  growthQuestions,
  growthServiceMeta,
  scoreGrowth,
  type GrowthServiceKey,
} from "@/lib/growth-check";

export function GrowthCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = growthQuestions.length;
  const current = growthQuestions[step];
  const progress = done ? 100 : Math.round((step / total) * 100);

  const ranked = useMemo(() => scoreGrowth(answers), [answers]);
  const top = ranked.filter((r) => r.score > 0).slice(0, 3);

  function pick(answerId: string) {
    if (!current) return;
    const nextAnswers = { ...answers, [current.id]: answerId };
    setAnswers(nextAnswers);
    if (step + 1 >= total) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  }

  function restart() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  const waText = [
    `Hi Jadeed — I completed the free Growth Check.`,
    ``,
    ...growthQuestions.map((q) => {
      const a = q.answers.find((x) => x.id === answers[q.id]);
      return `${q.prompt}\n→ ${a?.label ?? "—"}`;
    }),
    ``,
    `Suggested focus: ${top.map((t) => growthServiceMeta[t.key].label).join(", ") || "General growth"}`,
    ``,
    `I'd like a free plan for my business.`,
  ].join("\n");

  const waHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 sm:px-10">
        <span className="eyebrow">Free tool</span>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Growth Check
        </h1>
        <p className="mt-2 max-w-2xl text-base text-slate-600">
          5 quick questions. See where you need a website, Google visibility,
          an app, ads — or our 10% Growth Partnership. Built for local service
          businesses.
        </p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500">
          {done ? "Results" : `Question ${step + 1} of ${total}`}
        </p>
      </div>

      <div className="p-6 sm:p-10">
        {!done && current && (
          <div>
            <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {current.prompt}
            </h2>
            {current.hint && (
              <p className="mt-2 text-sm text-slate-500">{current.hint}</p>
            )}
            <ul className="mt-6 space-y-3">
              {current.answers.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => pick(a.id)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-ink sm:text-base"
                  >
                    {a.label}
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-6 text-sm font-semibold text-slate-500 hover:text-brand-500"
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {done && (
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Your suggested focus
            </h2>
            <p className="mt-2 text-slate-600">
              Based on your answers — not a sales script. Pick what fits; we
              have separate packages for SEO, websites and apps, or full growth
              on 10% of bookings.
            </p>

            <ol className="mt-8 space-y-4">
              {top.map((item, i) => {
                const meta = growthServiceMeta[item.key as GrowthServiceKey];
                return (
                  <li
                    key={item.key}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 font-display text-lg font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <Link
                        href={meta.href}
                        className="font-display text-lg font-semibold text-ink hover:text-brand-500"
                      >
                        {meta.label}
                      </Link>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {meta.blurb}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={waHref} size="lg" className="w-full sm:w-auto">
                WhatsApp my results
              </LinkButton>
              <LinkButton
                href="/pricing#partnership-calculator"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                See 10% calculator
              </LinkButton>
            </div>
            <button
              type="button"
              onClick={restart}
              className="mt-5 text-sm font-semibold text-slate-500 hover:text-brand-500"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
