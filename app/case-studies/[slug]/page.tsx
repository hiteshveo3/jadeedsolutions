import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { HeroBackground } from "@/components/HeroBackground";
import { CTASection } from "@/components/CTASection";
import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = caseStudies.find((c) => c.id === params.slug);
  if (!study) return {};
  return {
    title: `${study.client} case study`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((c) => c.id === params.slug);
  if (!study) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-12 md:pb-20 md:pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/portfolio" className="hover:text-brand-500">
                  Portfolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">
                {study.client}
              </li>
            </ol>
          </nav>
          <span className="eyebrow mt-6">Case study</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {study.client}
          </h1>
          <p className="mt-3 text-slate-600">
            {study.industry} · {study.location}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{study.summary}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="container max-w-3xl space-y-8">
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-xs text-slate-500">Website</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">
                {study.website && study.website !== "#" ? (
                  <a
                    href={study.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-500 hover:underline"
                  >
                    {study.website.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  "Coming soon"
                )}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-xs text-slate-500">Engagement</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{study.engagementModel}</dd>
            </div>
            {study.siteAge && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
                <dt className="text-xs text-slate-500">Site age</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{study.siteAge}</dd>
              </div>
            )}
          </dl>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-white px-4 py-5 text-center">
                <div className="font-display text-2xl font-semibold text-brand-500">
                  {m.value}
                </div>
                <div className="mt-1 text-xs text-slate-500">{m.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">What this proves</h2>
            <ul className="mt-4 space-y-2">
              {study.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-slate-600">
                  <HugeiconsIcon
                    icon={CheckIcon}
                    size={16}
                    className="mt-0.5 shrink-0 text-brand-500"
                    strokeWidth={2.6}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {study.topQueries.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                Keyword clusters
              </h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {study.topQueries.map((q) => (
                  <li
                    key={q.query}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-3"
                  >
                    <span className="block text-sm font-semibold text-ink">{q.query}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">{q.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Proof & visuals</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {study.images
                .filter((img) => !img.caption.toLowerCase().includes("logo"))
                .map((img) => (
                  <figure
                    key={img.src + img.caption}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[16/10] w-full bg-slate-100 object-cover object-top"
                    />
                    <figcaption className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
                      {img.placeholder ? "Screenshot coming soon" : img.caption}
                    </figcaption>
                  </figure>
                ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {study.services.map((s) => (
              <Link
                key={s}
                href={`/services/${s}`}
                className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-500 ring-1 ring-slate-200 transition-colors hover:bg-brand-50"
              >
                Related: {s.replace(/-/g, " ")}
                <HugeiconsIcon icon={ArrowRightIcon} size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Want results like ${study.client}?`}
        description={`${siteConfig.name} grows local service businesses on SEO, web, apps and ads — including a 10% bookings model.`}
      />
    </>
  );
}
