import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { CategoryTile } from "@/components/blog/CategoryTile";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { categoryCounts, formatDate, posts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — SEO, websites and ads for local service businesses",
  description:
    "Practical guides from Jadeed Solutions on local SEO, Google Ads, websites and apps for movers, cleaners, plumbers and trades — written from real client work.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const rest = sorted.filter((p) => p.slug !== featured.slug);
  const counts = categoryCounts();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    blogPost: sorted.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${siteConfig.url}/blog/${p.slug}`, datePublished: p.date })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow={<Pill>The Jadeed blog</Pill>}
        title={<>Growth notes for <span className="text-[#eaf25a]">local service businesses.</span></>}
        subtitle="Practical guides on local SEO, Google Ads, websites and apps — written from real client work, with the numbers and trade-offs left in."
        stats={[
          [String(posts.length), "articles"],
          [String(counts.length), "topics"],
          ["Free", "to read and share"],
          ["2026", "updated for"],
        ]}
      />

      <div className="bg-[#f7f5ef] py-12 sm:py-16">
        <div className="container max-w-[1200px]">

          <Link href={`/blog/${featured.slug}`} className="group grid gap-6 rounded-[28px] border border-black/10 bg-white p-5 transition-colors hover:border-[#015f45]/35 sm:p-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
            <CategoryTile category={featured.category} readingTime={featured.readingTime} large />
            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-[#cbd810] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-[#063d30]">Featured</span>
              <h2 className="mt-4 text-balance text-[28px] font-semibold leading-[1.1] tracking-[-.035em] group-hover:text-[#015f45] sm:text-[36px]">{featured.title}</h2>
              <p className="mt-4 leading-7 text-black/65">{featured.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-sm">
                <span className="text-black/55"><time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readingTime}</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-[#015f45]">Read article <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </div>
            </div>
          </Link>

          <section aria-labelledby="all-articles" className="mt-14">
            <h2 id="all-articles" className="mb-5 text-2xl font-semibold tracking-[-.03em]">All articles</h2>
            <BlogGrid
              posts={rest.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, readingTime: p.readingTime, date: p.date, dateLabel: formatDate(p.date) }))}
              topics={counts.map((c) => c.category).filter((c) => rest.some((p) => p.category === c))}
            />
            <p className="mt-6 text-sm text-black/55">Looking for something older? <Link href="/blog/archive" className="font-semibold text-[#015f45] hover:underline">Browse the archive by month</Link>.</p>
          </section>

          <section aria-labelledby="longer-reads" className="mt-16 grid gap-4 md:grid-cols-2">
            <h2 id="longer-reads" className="sr-only">Longer reads</h2>
            <Link href="/profit-share-handbook" className="group rounded-[24px] bg-[#015f45] p-6 text-white sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#eaf25a]">Handbook</p>
              <p className="mt-2 text-xl font-semibold tracking-[-.02em]">Profit-share partnerships: what we need before we take a percentage</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#eaf25a]">Read the handbook <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
            <Link href="/guides" className="group rounded-[24px] border border-black/10 bg-white p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-[#015f45]">Guides</p>
              <p className="mt-2 text-xl font-semibold tracking-[-.02em]">Growth guides for plumbers, cleaners and choosing a pricing model</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#015f45]">Browse the guides <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
