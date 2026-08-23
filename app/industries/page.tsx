import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { niches } from "@/lib/niches";
import { intentPages } from "@/lib/intent-pages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries — Local Service Businesses We Help Grow",
  description:
    "SEO, websites and apps for plumbers, movers, cleaners and local service businesses across 100+ UK & USA cities. From £100/mo or 10% of bookings.",
};

export default function IndustriesHubPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow">Industries</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Built for local service businesses
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              One focus: more bookings from Google and your website. We work
              with plumbers, cleaners, movers and other local services across
              the UK and USA — solo operators through larger firms. Full stack:
              SEO, websites, apps and optional ads.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Trades we serve"
            title="Start here"
            description="Dedicated pages for your trade — with city coverage across the UK & USA."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {niches.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.06}>
                <Link
                  href={`/industries/${n.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                    {n.eyebrow}
                  </span>
                  <h2 className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-brand-500">
                    {n.navLabel}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {n.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500">
                    View {n.navLabel.toLowerCase()} pages
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Also helpful"
            title="By goal"
            description="Buyer-language pages if you already know what you need."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {intentPages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/industries/${p.slug}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-ink"
                >
                  {p.navLabel}
                  <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-slate-500">
            Based in {siteConfig.address} · remote delivery for UK &amp; USA
            clients.
          </p>
        </div>
      </section>

      <CTASection
        title="Don't see your trade yet?"
        description="Tell us your city and service — if you sell local jobs, we can help you win more of them."
      />
    </>
  );
}
