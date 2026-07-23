import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { posts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  const months = new Set(posts.map((p) => p.date.slice(0, 7)));
  return [...months].map((ym) => {
    const [year, month] = ym.split("-");
    return { year, month };
  });
}

export function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Metadata {
  const label = formatMonthLabel(params.year, params.month);
  return {
    title: `Archive · ${label}`,
    description: `Blog posts from ${label} on Jadeed Solutions.`,
  };
}

function formatMonthLabel(year: string, month: string) {
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export default function BlogArchivePage({
  params,
}: {
  params: { year: string; month: string };
}) {
  const prefix = `${params.year}-${params.month}`;
  const items = posts.filter((p) => p.date.startsWith(prefix));
  if (items.length === 0) notFound();

  const label = formatMonthLabel(params.year, params.month);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-12 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-2xl">
          <nav className="text-xs text-slate-500">
            <Link href="/blog" className="hover:text-brand-500">
              Blog
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Archive</span>
          </nav>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {label}
          </h1>
          <p className="mt-2 text-slate-600">
            {items.length} article{items.length === 1 ? "" : "s"} published this month.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container max-w-2xl space-y-4">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-transparent hover:bg-brand-50"
            >
              <span className="text-xs font-semibold text-brand-500">{p.category}</span>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                {p.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {formatDate(p.date)} · {p.readingTime}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
