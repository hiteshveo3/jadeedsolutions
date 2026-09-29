"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  WhatsappBusinessIcon,
} from "@/components/icons";
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
    <div className="md:rounded-[28px] md:border md:border-black/10 md:bg-white md:p-10">
      <div>
        <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[.15em]">
          <span className="text-[#015f45]">{done ? "Your results" : `Question ${step + 1} of ${total}`}</span>
          <span className="text-black/45">{progress}%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[#015f45] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        {!done && current && (
          <div>
            <h3 className="font-sans text-[28px] font-semibold leading-[1.1] tracking-[-.04em] sm:text-4xl">{current.prompt}</h3>
            {current.hint && <p className="mt-3 leading-7 text-black/60">{current.hint}</p>}
            <ul className="mt-8 space-y-3">
              {current.answers.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => pick(a.id)}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border border-black/15 bg-white px-5 py-4 text-left font-semibold transition-colors hover:border-[#015f45] hover:bg-[#edf5f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015f45]"
                  >
                    <span>{a.label}</span>
                    <HugeiconsIcon icon={ArrowRightIcon} size={18} className="shrink-0 text-[#015f45] transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-black/55 transition-colors hover:text-[#015f45]"
              >
                <HugeiconsIcon icon={ArrowLeftIcon} size={16} />
                Back
              </button>
            )}
          </div>
        )}

        {done && (
          <div>
            <h3 className="font-sans text-[28px] font-semibold leading-[1.1] tracking-[-.04em] sm:text-4xl">Your suggested focus</h3>
            <p className="mt-3 max-w-2xl leading-7 text-black/60">
              Based on your answers — not a sales script. Pick what fits: we have separate packages for SEO, websites and apps, or full growth on 10% of bookings.
            </p>

            <ol className="mt-8 border-t border-black/10">
              {top.map((item, i) => {
                const meta = growthServiceMeta[item.key as GrowthServiceKey];
                return (
                  <li key={item.key} className="flex gap-5 border-b border-black/10 py-6">
                    <span className="text-3xl font-semibold leading-none tracking-[-.05em] text-[#015f45]">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <Link href={meta.href} className="text-lg font-bold transition-colors hover:text-[#015f45]">{meta.label}</Link>
                      <p className="mt-1 leading-7 text-black/60">{meta.blurb}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#015f45] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#014f39]"
              >
                <HugeiconsIcon icon={WhatsappBusinessIcon} size={18} />
                WhatsApp my results
              </a>
              <Link
                href="/pricing#partnership-calculator"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#015f45]/25 px-5 text-sm font-semibold text-[#015f45] transition-colors hover:bg-[#edf5f1]"
              >
                See the 10% calculator
              </Link>
            </div>
            <button
              type="button"
              onClick={restart}
              className="mt-6 text-sm font-bold text-black/55 transition-colors hover:text-[#015f45]"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
