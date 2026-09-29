import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { comparisons } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Jadeed — vs Fiverr, Upwork, DIY Builders & Agencies",
  description:
    "Honest comparisons for local service businesses: Jadeed Solutions versus Fiverr freelancers, Upwork contractors, DIY website builders and traditional marketing agencies — including when the alternative is the better choice.",
  alternates: { canonical: `${siteConfig.url}/compare` },
};

export default function CompareHubPage() {
  return (
    <>
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Compare" }]}
        eyebrow={<Pill>Honest comparisons</Pill>}
        title={<>Jadeed vs the usual alternatives — <span className="text-[#eaf25a]">including when they win.</span></>}
        subtitle="Freelancers, contractors, DIY builders and big agencies all have their place. These pages compare cost, accountability, ownership and results, and say plainly when another option suits you better."
      />

      <div className="bg-[#f7f5ef] py-12 sm:py-16">
        <div className="container grid max-w-[1200px] gap-4 md:grid-cols-2">
          {comparisons.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}`} className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35 sm:p-7">
              <span className="text-xs font-bold uppercase tracking-[.12em] text-[#015f45]">Jadeed {c.navLabel}</span>
              <h2 className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em] group-hover:text-[#015f45]">{c.h1}</h2>
              <p className="mb-6 mt-3 text-sm leading-6 text-black/60">{c.verdict}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#015f45]">
                Read the comparison <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
