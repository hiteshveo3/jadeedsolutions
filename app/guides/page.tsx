import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Guides — Grow Local Service Businesses Online",
  description:
    "Practical guides for plumbers, cleaners and local services: websites, Google growth, apps, ads and when 10% partnership fits.",
};

export default function GuidesHubPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Guides</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
              Growth guides for local services
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Full stack — website, Google, apps and ads — not SEO-only tips.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-slate-50">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                {g.eyebrow}
              </span>
              <h2 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-brand-500">
                {g.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{g.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                Read guide
                <HugeiconsIcon icon={ArrowRightIcon} size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
