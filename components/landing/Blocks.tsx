import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon, QuoteIcon, StarIcon } from "@/components/icons";
import { InlineMarkdown } from "@/components/longform/Markdown";
import { FaqCards } from "@/components/site/ui";
import type { CaseStudy } from "@/lib/case-studies";
import type { ClientReview } from "@/lib/reviews";

type Tone = "white" | "cream" | "mint" | "green";

const toneClass: Record<Tone, string> = {
  white: "bg-transparent text-white",
  cream: "bg-transparent text-white",
  mint: "bg-white/[0.07] text-white",
  green: "bg-transparent text-white",
};

/** Full-width landing section with an eyebrow, heading and optional intro beside it. */
export function LandingSection({
  id,
  eyebrow,
  title,
  intro,
  tone = "white",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  tone?: Tone;
  children: ReactNode;
}) {
  const dark = tone === "green";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-24 py-16 sm:py-20 ${toneClass[tone]}`}>
      <div className="container max-w-[1200px]">
        <div className={intro ? "grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-end" : ""}>
          <div>
            {eyebrow && <p className={`text-xs font-extrabold uppercase tracking-[.15em] ${dark ? "text-[#BEF70A]" : "text-[#BEF70A]"}`}>{eyebrow}</p>}
            <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-balance text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-[44px]">{title}</h2>
          </div>
          {intro && <div className={`max-w-md text-base leading-7 lg:justify-self-end ${dark ? "text-white/75" : "opacity-70"}`}>{intro}</div>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-6">
          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dark ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.05] text-[#0B1F12]"}`} aria-hidden="true">
            <HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} />
          </span>
          <span className={dark ? "text-white/85" : "text-white/83"}><InlineMarkdown>{item}</InlineMarkdown></span>
        </li>
      ))}
    </ul>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse border-white/[0.08] p-5 [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:not(:last-child)]:border-r">
          <dt className="mt-1 text-sm text-white/63">{s.label}</dt>
          <dd className="text-3xl font-bold tracking-[-.04em] text-[#BEF70A]">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StepsGrid({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 ${steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BEF70A] text-sm font-bold text-[#0B1F12]">{i + 1}</span>
          <h3 className="mt-5 text-lg font-bold tracking-[-.02em]">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/70">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function AtAGlance({ rows, title = "At a glance" }: { rows: { label: string; value: string }[]; title?: string }) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-[#06301D]/70 p-6 text-white backdrop-blur-sm">
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">{title}</p>
      <dl className="mt-4 divide-y divide-white/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <dt className="text-white/65">{row.label}</dt>
            <dd className="text-right font-semibold">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ReviewGrid({ reviews }: { reviews: ClientReview[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {reviews.map((review) => (
        <figure key={`${review.name}-${review.quote.slice(0, 20)}`} className="flex flex-col rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-6">
          <div className="flex items-center justify-between">
            <HugeiconsIcon icon={QuoteIcon} size={26} className="text-[#BEF70A]" aria-hidden="true" />
            <span className="flex gap-0.5 text-[#BEF70A]" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: review.rating }, (_, i) => (
                <HugeiconsIcon key={i} icon={StarIcon} size={14} className="fill-current" aria-hidden="true" />
              ))}
            </span>
          </div>
          <blockquote className="mb-5 mt-4 text-[15px] leading-7 text-white/88">“{review.quote}”</blockquote>
          <figcaption className="mt-auto border-t border-white/[0.08] pt-4">
            <div className="text-sm font-bold capitalize">{review.name.toLowerCase()}</div>
            <div className="mt-0.5 text-xs text-white/58">Public review on {review.source}{review.business ? ` · ${review.business}` : ""}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.id}`} className="group grid overflow-hidden rounded-[28px] bg-white/[0.05] text-white lg:grid-cols-[1.1fr_.9fr]">
      <div className="p-6 sm:p-9">
        <div className="flex items-center gap-3">
          {study.logo && <Image src={study.logo} alt="" width={44} height={44} className="h-11 w-11 rounded-xl bg-white/[0.05] object-contain p-1" />}
          <div>
            <p className="font-semibold">{study.client}</p>
            <p className="text-xs text-white/60">{study.industry} · {study.location}</p>
          </div>
        </div>
        <p className="mt-6 text-[17px] leading-7 text-white/85">{study.summary}</p>
        {study.testimonial && (
          <blockquote className="mt-6 relative pl-9 before:absolute before:left-0 before:-top-1 before:font-display before:text-[46px] before:leading-none before:text-[#BEF70A] before:content-['“'] text-white">
            “{study.testimonial.quote}”
            <footer className="mt-2 text-sm text-white/60">{study.testimonial.name} · {study.testimonial.role}</footer>
          </blockquote>
        )}
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-[#BEF70A]">
          Read the case study <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-1">
        {study.metrics.slice(0, 4).map((m) => (
          <div key={m.label} className="flex flex-col-reverse justify-center bg-transparent p-5 sm:p-6">
            <dt className="mt-1 text-xs leading-5 text-white/60">{m.label}</dt>
            <dd className="text-2xl font-bold tracking-[-.04em] text-[#BEF70A] sm:text-3xl">{m.value}</dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

export function FaqList({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return <FaqCards items={faqs.map((f) => ({ question: f.question, answer: <InlineMarkdown>{f.answer}</InlineMarkdown> }))} />;
}

export function LinkCards({ items }: { items: { href: string; eyebrow: string; title: string; text?: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="group flex flex-col rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-[#BEF70A]">{item.eyebrow}</span>
          <span className="mt-3 text-lg font-semibold leading-snug tracking-[-.02em] group-hover:text-[#BEF70A]">{item.title}</span>
          {item.text && <span className="mb-5 mt-2 line-clamp-3 text-sm leading-6 text-white/68">{item.text}</span>}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-[#BEF70A]">
            Read more <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
