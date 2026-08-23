import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { BlogList, type BlogListItem } from "@/components/blog/BlogList";
import { HeroBackground } from "@/components/HeroBackground";
import { posts, categories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — insights & guides",
  description:
    "Insights and guides on SEO, web development, app development, and digital advertising from the Jadeed Solutions team.",
};

export default function BlogPage() {
  const items: BlogListItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readingTime: p.readingTime,
    category: p.category,
    cover: p.cover,
    featured: p.featured,
    authorSlug: p.authorSlug,
  }));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white">
        <HeroBackground />
        <div className="container relative z-10 py-12 md:py-16">
          <header className="max-w-2xl">
            <span className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
              Insights &amp; guides
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              Ideas to grow your business
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Practical guides and insights on SEO, development, app development
              and paid advertising — no fluff, just what actually works for local
              businesses.
            </p>
            <p className="mt-4">
              <Link
                href="/blog/archive"
                className="text-sm font-semibold text-brand-500 hover:underline"
              >
                Browse archive by date →
              </Link>
            </p>
          </header>
        </div>
      </section>

      <div className="bg-slate-50">
        <div className="container py-10 md:py-14">
          <BlogList posts={items} categories={categories} />
        </div>
      </div>

      <CTASection />
    </>
  );
}
