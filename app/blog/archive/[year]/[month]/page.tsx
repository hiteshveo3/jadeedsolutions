import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import { LinkButton } from "@/components/Button";
import {
  archiveMonthParams,
  formatDate,
  formatMonthLabel,
  getArchiveByDate,
  getPostsByYearMonth,
  posts as allPosts,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, ArrowRightIcon, ArrowDownIcon } from "@/components/icons";

export function generateStaticParams() {
  return archiveMonthParams();
}

export function generateMetadata({
  params,
}: {
  params: { year: string; month: string };
}): Metadata {
  const label = formatMonthLabel(params.year, params.month);
  return {
    title: `Archive · ${label}`,
    description: `Blog posts from ${label} on Jadeed Solutions — guides on SEO, websites, apps and growth.`,
  };
}

export default function BlogMonthArchivePage({
  params,
}: {
  params: { year: string; month: string };
}) {
  const items = getPostsByYearMonth(params.year, params.month);
  if (items.length === 0) notFound();

  const label = formatMonthLabel(params.year, params.month);
  const archive = getArchiveByDate();
  const flatMonths = archive.flatMap((y) => y.months);
  const idx = flatMonths.findIndex(
    (m) => m.year === params.year && m.month === params.month,
  );
  const prev = idx > 0 ? flatMonths[idx - 1] : null;
  // flatMonths is newest-first, so "next" chronologically older is idx+1
  const next = idx >= 0 && idx < flatMonths.length - 1 ? flatMonths[idx + 1] : null;

  const readingMins = items.reduce((s, p) => {
    const n = parseInt(p.readingTime, 10);
    return s + (Number.isFinite(n) ? n : 0);
  }, 0);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-12 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-5xl">
          <nav className="text-xs text-slate-500">
            <Link href="/blog" className="hover:text-brand-500">
              Blog
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/blog/archive" className="hover:text-brand-500">
              Archive
            </Link>
            <span className="mx-1.5">/</span>
            <Link
              href={`/blog/archive/${params.year}`}
              className="hover:text-brand-500"
            >
              {params.year}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{label.split(" ")[0]}</span>
          </nav>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {label}
              </h1>
              <p className="mt-3 text-slate-600">
                {items.length} article{items.length === 1 ? "" : "s"} · ~
                {readingMins} min total reading
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {prev && (
                <Link
                  href={prev.href}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-500"
                >
                  <HugeiconsIcon icon={ArrowDownIcon} size={14} className="rotate-90" />
                  {prev.shortLabel} {prev.year}
                </Link>
              )}
              {next && (
                <Link
                  href={next.href}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-500"
                >
                  {next.shortLabel} {next.year}
                  <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container max-w-5xl space-y-6">
          {items.map((p, i) => {
            const author = getAuthor(p.authorSlug);
            return (
              <article
                key={p.slug}
                className={`overflow-hidden rounded-3xl bg-white ${
                  i === 0 ? "md:grid md:grid-cols-[1.1fr_1fr]" : ""
                }`}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className={`relative block overflow-hidden bg-slate-100 ${
                    i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[280px]" : "aspect-[21/9]"
                  }`}
                >
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </Link>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                    {p.category}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                    <Link href={`/blog/${p.slug}`} className="hover:text-brand-500">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {p.excerpt}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">
                    {author.name} · {formatDate(p.date)} · {p.readingTime}
                  </p>
                  <div className="mt-5">
                    <LinkButton href={`/blog/${p.slug}`} size="sm">
                      Read article
                      <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                    </LinkButton>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600">
              {allPosts.length} articles in the full archive
            </p>
            <div className="flex flex-wrap gap-2">
              <LinkButton href="/blog/archive" variant="secondary" size="sm">
                Full archive
              </LinkButton>
              <LinkButton href={siteConfig.whatsappHref} size="sm">
                WhatsApp us
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
