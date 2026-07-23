import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon, TrendingUpIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real case studies from Jadeed Solutions — SEO, websites, apps and ads for local service businesses.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Our work"
            title="Results that speak for themselves"
            description="Real local-service case studies — not stock portfolios. Open any project for full metrics and proof."
          />
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="container grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal key={study.id} delay={(i % 2) * 0.08}>
              <Link
                href={`/case-studies/${study.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-transparent hover:bg-brand-50"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.images[0]?.src ?? "/placeholders/add-image.svg"}
                    alt={study.client}
                    className="h-full w-full object-cover object-top"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">
                    {study.industry.split("(")[0].trim()}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-2 text-brand-500">
                    <HugeiconsIcon icon={TrendingUpIcon} size={16} />
                    <span className="text-sm font-semibold">
                      {study.metrics[0]?.value} · {study.metrics[0]?.label}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink group-hover:text-brand-500">
                    {study.client}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {study.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                    View case study
                    <HugeiconsIcon
                      icon={ArrowRightIcon}
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Want results like these?"
        description="Let's build your next success story together."
      />
    </>
  );
}
