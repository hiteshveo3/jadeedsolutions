import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/HeroBackground";
import {
  archiveYearParams,
  formatDate,
  formatMonthLabel,
  getArchiveByDate,
  getPostsByYear,
} from "@/lib/blog";
import { HugeiconsIcon, ArrowRightIcon, CalendarIcon } from "@/components/icons";

export function generateStaticParams() {
  return archiveYearParams();
}

export function generateMetadata({
  params,
}: {
  params: { year: string };
}): Metadata {
  return {
    title: `Blog Archive · ${params.year}`,
    description: `Jadeed Solutions blog posts published in ${params.year} — browse by month with previews.`,
  };
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function BlogYearArchivePage({
  params,
}: {
  params: { year: string };
}) {
  const items = getPostsByYear(params.year);
  if (items.length === 0) notFound();

  const yearGroup = getArchiveByDate().find((y) => y.year === params.year);
  if (!yearGroup) notFound();

  const max = Math.max(1, ...yearGroup.monthCounts);

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
            <span className="text-ink">{params.year}</span>
          </nav>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {params.year}
              </h1>
              <p className="mt-2 text-slate-600">
                {items.length} article{items.length === 1 ? "" : "s"} · jump to
                any month below
              </p>
            </div>
            <div className="flex items-end gap-1.5" aria-hidden>
              {yearGroup.monthCounts.map((c, i) => (
                <div
                  key={i}
                  className={`w-3 rounded-sm ${c ? "bg-brand-500" : "bg-slate-200"}`}
                  style={{ height: c ? 12 + (c / max) * 36 : 8 }}
                  title={`${MONTH_NAMES[i]}: ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {MONTH_NAMES.map((name, i) => {
              const month = String(i + 1).padStart(2, "0");
              const count = yearGroup.monthCounts[i];
              if (!count) {
                return (
                  <div
                    key={name}
                    className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-2 py-3 text-center text-slate-300"
                  >
                    <p className="text-[10px] font-bold uppercase">{name}</p>
                    <p className="text-sm">—</p>
                  </div>
                );
              }
              return (
                <a
                  key={name}
                  href={`#month-${month}`}
                  className="rounded-xl bg-brand-50 px-2 py-3 text-center transition-colors hover:bg-brand-500 hover:text-white"
                >
                  <p className="text-[10px] font-bold uppercase">{name}</p>
                  <p className="font-display text-lg font-semibold">{count}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container max-w-5xl space-y-12">
          {yearGroup.months.map((m) => (
            <div key={m.key} id={`month-${m.month}`} className="scroll-mt-28">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white">
                    <HugeiconsIcon icon={CalendarIcon} size={18} />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {formatMonthLabel(m.year, m.month)}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {m.count} article{m.count === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
                <Link
                  href={m.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500"
                >
                  Month page
                  <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {m.posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white"
                  >
                    <div className="relative aspect-[16/9] bg-slate-100">
                      <Image
                        src={p.cover}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                        {p.category}
                      </span>
                      <h3 className="mt-1 font-display text-lg font-semibold text-ink group-hover:text-brand-500">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {p.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-slate-500">
                        {formatDate(p.date)} · {p.readingTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
