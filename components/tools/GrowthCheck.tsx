"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  WhatsappIcon,
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
    <div className="md:rounded-[28px] md:border md:border-white/12 md:bg-white/[0.05] md:p-10">
      <div>
        <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[.15em]">
          <span className="text-[#BEF70A]">{done ? "Your results" : `Question ${step + 1} of ${total}`}</span>
          <span className="text-white/53">{progress}%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/30">
          <div className="h-full rounded-full bg-white/[0.05] transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        {!done && current && (
          <div>
            <h3 className="font-sans text-[28px] font-semibold leading-[1.1] tracking-[-.04em] sm:text-4xl">{current.prompt}</h3>
            {current.hint && <p className="mt-3 leading-7 text-white/68">{current.hint}</p>}
            <ul className="mt-8 space-y-3">
              {current.answers.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => pick(a.id)}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.05] px-5 py-4 text-left font-semibold transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BEF70A]"
                  >
                    <span>{a.label}</span>
                    <HugeiconsIcon icon={ArrowRightIcon} size={18} className="shrink-0 text-[#BEF70A] transition-transform group-hover:translate-x-1" />
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-white/63 transition-colors hover:text-[#BEF70A]"
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
            <p className="mt-3 max-w-2xl leading-7 text-white/68">
              Based on your answers — not a sales script. Pick what fits: we have separate packages for SEO, websites and apps, or full growth on £0 upfront and 10% of paid jobs.
            </p>

            <ol className="mt-8 border-t border-white/[0.08]">
              {top.map((item, i) => {
                const meta = growthServiceMeta[item.key as GrowthServiceKey];
                return (
                  <li key={item.key} className="flex gap-5 border-b border-white/[0.08] py-6">
                    <span className="text-3xl font-semibold leading-none tracking-[-.05em] text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <Link href={meta.href} className="text-lg font-bold transition-colors hover:text-[#BEF70A]">{meta.label}</Link>
                      <p className="mt-1 leading-7 text-white/68">{meta.blurb}</p>
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
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#BEF70A] px-5 text-sm font-semibold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]"
              >
                <HugeiconsIcon icon={WhatsappIcon} size={18} />
                WhatsApp my results
              </a>
              <Link
                href="/pricing#partnership-calculator"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#BEF70A]/25 px-5 text-sm font-semibold text-[#BEF70A] transition-colors hover:bg-white/10"
              >
                See the 10% calculator
              </Link>
            </div>
            <button
              type="button"
              onClick={restart}
              className="mt-6 text-sm font-bold text-white/63 transition-colors hover:text-[#BEF70A]"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
