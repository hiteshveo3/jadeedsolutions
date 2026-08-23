import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { CTASection } from "@/components/CTASection";
import { BlogArchiveExplorer } from "@/components/blog/BlogArchiveExplorer";
import { getArchiveByDate, getArchiveStats } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Archive by Date — Timeline, Calendar & Search",
  description:
    "Advanced blog archive: search and filter Jadeed Solutions articles by year, month and topic. Timeline, calendar heatmap and list views.",
};

export default function BlogArchiveIndexPage() {
  const archive = getArchiveByDate();
  const stats = getArchiveStats();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-10 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-5xl">
          <nav className="text-xs text-slate-500">
            <Link href="/blog" className="hover:text-brand-500">
              Blog
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Archive</span>
          </nav>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
                Archive by date
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Explore every article in a timeline, month heatmap or searchable
                list — jump by year, filter by topic, expand months for previews.
              </p>
            </div>
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-brand-500 hover:underline"
            >
              ← Back to blog
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-14">
        <div className="container max-w-5xl">
          <BlogArchiveExplorer archive={archive} stats={stats} />
        </div>
      </section>

      <CTASection
        title="Can’t find what you need?"
        description="WhatsApp us your topic — or browse the full blog feed."
        secondaryLabel="All posts"
        secondaryHref="/blog"
      />
    </>
  );
}
