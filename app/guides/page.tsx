import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { guides, guideWordCount } from "@/lib/guides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides — Grow a Local Service Business Online",
  description:
    "In-depth playbooks for plumbers, cleaners and local service businesses: websites, Google Business Profile, SEO, Google Ads, apps, and how to choose between fixed-fee and performance pricing.",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesHubPage() {
  return (
    <>
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        eyebrow={<Pill>Guides &amp; playbooks</Pill>}
        title={<>In-depth playbooks for <span className="text-[#eaf25a]">local service businesses.</span></>}
        subtitle="The full path from search to booked job — website, Google Business Profile, SEO, ads, apps and operations — written for owners, not marketers."
      />

      <div className="bg-[#f7f5ef] py-12 sm:py-16">
        <div className="container max-w-[1200px]">
          <Link href="/profit-share-handbook" className="group flex flex-col gap-4 rounded-[28px] bg-[#015f45] p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.14em] text-[#eaf25a]">Handbook · Partnership due diligence</span>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Profit-Share Handbook: what we need before we take a percentage</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">The four deal structures, what counts as profit, attribution, the documents we ask for and how disputes resolve.</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#eaf25a]">
              Read the handbook <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35 sm:p-7">
                <span className="text-xs font-bold uppercase tracking-[.12em] text-[#015f45]">{g.eyebrow} · {Math.max(1, Math.round(guideWordCount(g) / 230))} min read</span>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-[-.02em] group-hover:text-[#015f45]">{g.title}</h2>
                <p className="mb-6 mt-3 text-sm leading-6 text-black/60">{g.intro}</p>
                <ol className="mb-6 space-y-1.5 border-t border-black/10 pt-4 text-sm text-black/60">
                  {g.sections.slice(0, 4).map((s, i) => (
                    <li key={s.title} className="flex gap-2"><span className="tabular-nums text-black/35">{i + 1}</span>{s.title}</li>
                  ))}
                  {g.sections.length > 4 && <li className="pl-4 text-black/45">+ {g.sections.length - 4} more parts</li>}
                </ol>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#015f45]">
                  Read the guide <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-sm text-black/55">
            Shorter reads live on the <Link href="/blog" className="font-semibold text-[#015f45] hover:underline">blog</Link>, and trade-specific pages under <Link href="/industries" className="font-semibold text-[#015f45] hover:underline">industries</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
