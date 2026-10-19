import type { Metadata } from "next";
import Link from "next/link";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { siteConfig } from "@/lib/site";
import { sitemapEntries } from "@/lib/sitemap-data";

export const metadata: Metadata = {
  title: "Site map",
  description: "Every page on the Jadeed Solutions website: services, industries, pricing, guides, comparisons, case studies and blog articles.",
  alternates: { canonical: `${siteConfig.url}/site-map` },
};

export default function SiteMapPage() {
  const entries = sitemapEntries();
  const groups = Array.from(new Set(entries.map((e) => e.group)));

  return (
    <>
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Site map" }]}
        eyebrow={<Pill>Site map</Pill>}
        title="Every page, in one place."
        subtitle={<>{entries.length} pages across services, industries, guides and the blog. Search engines can use the <a href="/sitemap.xml" className="underline underline-offset-4 hover:text-white">XML sitemap</a>.</>}
      />
      <div className="bg-transparent py-12 sm:py-16">
        <div className="container grid max-w-[1200px] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group} aria-labelledby={`group-${group}`} className="rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-6">
              <h2 id={`group-${group}`} className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">{group}</h2>
              <ul className="mt-4 space-y-2 text-[15px] leading-6">
                {entries
                  .filter((e) => e.group === group)
                  .map((e) => (
                    <li key={e.path || "/"}>
                      <Link href={e.path || "/"} className="text-white/83 hover:text-[#BEF70A] hover:underline">{e.title}</Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
