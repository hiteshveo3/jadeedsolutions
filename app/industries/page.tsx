import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { industries } from "@/lib/industries";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries — Local Service Businesses We Help Grow",
  description:
    "Websites, local SEO and Google Ads for plumbers, cleaners, movers, trades and contractors in the UK, US, Canada and UAE — with fixed, performance or tiered pricing.",
  alternates: { canonical: `${siteConfig.url}/industries` },
};

export default function IndustriesHubPage() {
  return (
    <>
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow={<Pill>Industries</Pill>}
        title={<>Built for local service businesses that <span className="text-[#eaf25a]">live on booked jobs.</span></>}
        subtitle="One focus: more calls and bookings from Google and your website. Each page below explains what we build for that trade, the searches we target and what the first 90 days look like."
      />

      <div className="bg-[#f7f5ef] py-12 sm:py-16">
        <div className="container grid max-w-[1200px] gap-4 md:grid-cols-2">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-[.12em] text-[#015f45]">{industry.navLabel}</span>
              <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-[-.03em] group-hover:text-[#015f45]">{industry.h1}</h2>
              <p className="mb-6 mt-3 text-sm leading-6 text-black/60">{industry.intro}</p>
              {industry.playbook.length > 0 && (
                <ul className="mb-6 space-y-1.5 border-t border-black/10 pt-4 text-sm text-black/60">
                  {industry.playbook.slice(0, 4).map((s) => (
                    <li key={s.title} className="flex gap-2"><span className="text-[#015f45]" aria-hidden="true">→</span>{s.title}</li>
                  ))}
                </ul>
              )}
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#015f45]">
                See the playbook <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <div className="container mt-8 max-w-[1200px]">
          <p className="text-sm text-black/60">
            Not listed? We work with most businesses that win customers from Google — <Link href="/contact" className="font-semibold text-[#015f45] hover:underline">tell us what you do</Link>, or read the <Link href="/guides" className="font-semibold text-[#015f45] hover:underline">guides</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
