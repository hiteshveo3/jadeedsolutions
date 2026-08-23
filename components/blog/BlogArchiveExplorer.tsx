"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HugeiconsIcon,
  SearchIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  NewsIcon,
  GridIcon,
  type IconSvgElement,
} from "@/components/icons";
import {
  formatDate,
  type ArchiveYear,
  type Post,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";

type ViewMode = "timeline" | "calendar" | "list";

type Stats = {
  totalPosts: number;
  totalYears: number;
  totalCategories: number;
  readingMins: number;
  latest?: Post;
  categories: string[];
};

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

export function BlogArchiveExplorer({
  archive,
  stats,
}: {
  archive: ArchiveYear[];
  stats: Stats;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<ViewMode>("timeline");
  const [activeYear, setActiveYear] = useState(archive[0]?.year ?? "");
  const [openMonths, setOpenMonths] = useState<Set<string>>(() => {
    const first = archive[0]?.months[0]?.key;
    return new Set(first ? [first] : []);
  });

  const maxMonthCount = useMemo(() => {
    let max = 1;
    for (const y of archive) {
      for (const c of y.monthCounts) max = Math.max(max, c);
    }
    return max;
  }, [archive]);

  const filteredArchive = useMemo(() => {
    const q = query.trim().toLowerCase();
    return archive
      .map((year) => {
        const months = year.months
          .map((m) => {
            const posts = m.posts.filter((p) => {
              const catOk = category === "All" || p.category === category;
              const qOk =
                q === "" ||
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q);
              return catOk && qOk;
            });
            return { ...m, posts, count: posts.length };
          })
          .filter((m) => m.count > 0);
        return {
          ...year,
          months,
          count: months.reduce((s, m) => s + m.count, 0),
        };
      })
      .filter((y) => y.count > 0);
  }, [archive, query, category]);

  const flatPosts = useMemo(
    () =>
      filteredArchive.flatMap((y) => y.months.flatMap((m) => m.posts)),
    [filteredArchive],
  );

  useEffect(() => {
    if (
      filteredArchive.length > 0 &&
      !filteredArchive.some((y) => y.year === activeYear)
    ) {
      setActiveYear(filteredArchive[0].year);
    }
  }, [filteredArchive, activeYear]);

  function toggleMonth(key: string) {
    setOpenMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function expandAll() {
    setOpenMonths(
      new Set(filteredArchive.flatMap((y) => y.months.map((m) => m.key))),
    );
  }

  function collapseAll() {
    setOpenMonths(new Set());
  }

  const latest = stats.latest;
  const latestAuthor = latest ? getAuthor(latest.authorSlug) : null;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={NewsIcon}
          label="Articles"
          value={String(stats.totalPosts)}
        />
        <StatCard
          icon={CalendarIcon}
          label="Years covered"
          value={String(stats.totalYears)}
        />
        <StatCard
          icon={GridIcon}
          label="Topics"
          value={String(stats.totalCategories)}
        />
        <StatCard
          icon={ClockIcon}
          label="Total reading"
          value={`~${stats.readingMins} min`}
        />
      </div>

      {/* Latest spotlight */}
      {latest && (
        <Link
          href={`/blog/${latest.slug}`}
          className="group grid overflow-hidden rounded-3xl bg-white md:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px]">
            <Image
              src={latest.cover}
              alt={latest.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
              Latest
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
              {latest.category}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-brand-500">
              {latest.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {latest.excerpt}
            </p>
            <p className="mt-4 text-xs text-slate-500">
              {latestAuthor?.name} · {formatDate(latest.date)} ·{" "}
              {latest.readingTime}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500">
              Read article
              <HugeiconsIcon icon={ArrowRightIcon} size={16} />
            </span>
          </div>
        </Link>
      )}

      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-1 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-soft backdrop-blur sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm lg:max-w-sm">
            <HugeiconsIcon
              icon={SearchIcon}
              size={16}
              className="shrink-0 text-slate-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, topic, excerpt…"
              className="w-full bg-transparent text-ink outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <ViewToggle view={view} setView={setView} />
            <button
              type="button"
              onClick={expandAll}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-500"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-500"
            >
              Collapse
            </button>
          </div>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FilterChip
            active={category === "All"}
            onClick={() => setCategory("All")}
            label="All topics"
          />
          {stats.categories.map((c) => (
            <FilterChip
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
              label={c}
            />
          ))}
        </div>

        {filteredArchive.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto border-t border-slate-100 pt-3">
            {filteredArchive.map((y) => (
              <a
                key={y.year}
                href={`#year-${y.year}`}
                onClick={() => setActiveYear(y.year)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeYear === y.year
                    ? "bg-brand-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600"
                }`}
              >
                {y.year}
                <span className="ml-1.5 opacity-70">{y.count}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-ink">{flatPosts.length}</span>{" "}
        article{flatPosts.length === 1 ? "" : "s"}
        {query || category !== "All" ? " matching filters" : ""}.
      </p>

      {filteredArchive.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No articles match
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Try another search or clear the topic filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 text-sm font-semibold text-brand-500"
          >
            Clear filters
          </button>
        </div>
      ) : view === "calendar" ? (
        <CalendarView
          archive={filteredArchive}
          maxMonthCount={maxMonthCount}
        />
      ) : view === "list" ? (
        <ListView posts={flatPosts} />
      ) : (
        <TimelineView
          archive={filteredArchive}
          openMonths={openMonths}
          toggleMonth={toggleMonth}
          maxMonthCount={maxMonthCount}
        />
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: IconSvgElement;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2 text-slate-500">
        <HugeiconsIcon icon={icon} size={16} />
        <span className="text-xs font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-brand-500 text-white"
          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function ViewToggle({
  view,
  setView,
}: {
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  const options: { id: ViewMode; label: string }[] = [
    { id: "timeline", label: "Timeline" },
    { id: "calendar", label: "Calendar" },
    { id: "list", label: "List" },
  ];
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setView(o.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
            view === o.id
              ? "bg-white text-brand-500 shadow-sm"
              : "text-slate-500 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function HeatBar({ count, max }: { count: number; max: number }) {
  const pct = count === 0 ? 0 : Math.max(12, Math.round((count / max) * 100));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function TimelineView({
  archive,
  openMonths,
  toggleMonth,
  maxMonthCount,
}: {
  archive: ArchiveYear[];
  openMonths: Set<string>;
  toggleMonth: (key: string) => void;
  maxMonthCount: number;
}) {
  return (
    <div className="relative space-y-12">
      <div
        className="absolute bottom-0 left-[19px] top-2 hidden w-px bg-gradient-to-b from-brand-300 via-slate-200 to-transparent md:block"
        aria-hidden
      />
      {archive.map((year) => (
        <section key={year.year} id={`year-${year.year}`} className="scroll-mt-36">
          <div className="mb-5 flex items-center gap-3 md:gap-5">
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-brand-500 font-display text-sm font-bold text-white shadow-soft">
              {year.year.slice(2)}
            </span>
            <div className="flex flex-1 flex-wrap items-end justify-between gap-3">
              <div>
                <Link
                  href={year.href}
                  className="font-display text-2xl font-semibold text-ink hover:text-brand-500"
                >
                  {year.year}
                </Link>
                <p className="text-sm text-slate-500">
                  {year.count} article{year.count === 1 ? "" : "s"}
                </p>
              </div>
              <YearSparkline counts={year.monthCounts} max={maxMonthCount} />
            </div>
          </div>

          <div className="space-y-3 md:ml-14">
            {year.months.map((m) => {
              const open = openMonths.has(m.key);
              return (
                <div
                  key={m.key}
                  className="overflow-hidden rounded-2xl bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleMonth(m.key)}
                    className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                    aria-expanded={open}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-lg font-semibold text-ink">
                          {m.label}
                        </span>
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-600">
                          {m.count}
                        </span>
                      </div>
                      <div className="mt-2 max-w-xs">
                        <HeatBar count={m.count} max={maxMonthCount} />
                      </div>
                    </div>
                    <Link
                      href={m.href}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden text-xs font-semibold text-brand-500 sm:inline"
                    >
                      Month page
                    </Link>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-transform ${
                        open ? "rotate-90" : ""
                      }`}
                    >
                      <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                    </span>
                  </button>

                  {open && (
                    <div className="border-t border-slate-100 bg-slate-50/80 p-3 sm:p-4">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {m.posts.map((p) => (
                          <li key={p.slug}>
                            <PostMiniCard post={p} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function YearSparkline({ counts, max }: { counts: number[]; max: number }) {
  return (
    <div className="flex items-end gap-1" title="Posts per month (Jan–Dec)">
      {counts.map((c, i) => {
        const h = c === 0 ? 4 : 8 + Math.round((c / max) * 28);
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-2 rounded-sm ${c ? "bg-brand-500" : "bg-slate-200"}`}
              style={{ height: h }}
              title={`${MONTH_NAMES[i]}: ${c}`}
            />
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({
  archive,
  maxMonthCount,
}: {
  archive: ArchiveYear[];
  maxMonthCount: number;
}) {
  return (
    <div className="space-y-8">
      {archive.map((year) => (
        <section
          key={year.year}
          id={`year-${year.year}`}
          className="scroll-mt-36 overflow-hidden rounded-3xl bg-white"
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <Link
              href={year.href}
              className="font-display text-xl font-semibold text-ink hover:text-brand-500"
            >
              {year.year}
            </Link>
            <span className="text-sm text-slate-500">{year.count} posts</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {MONTH_NAMES.map((name, i) => {
              const month = String(i + 1).padStart(2, "0");
              const count = year.monthCounts[i];
              const href = `/blog/archive/${year.year}/${month}`;
              const intensity =
                count === 0 ? 0 : Math.max(0.2, count / maxMonthCount);
              if (count === 0) {
                return (
                  <div
                    key={name}
                    className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-300"
                  >
                    <span className="text-[10px] font-bold uppercase">{name}</span>
                    <span className="text-xs">—</span>
                  </div>
                );
              }
              return (
                <Link
                  key={name}
                  href={href}
                  className="flex aspect-square flex-col items-center justify-center rounded-xl transition-transform hover:scale-[1.03]"
                  style={{
                    backgroundColor: `rgba(255, 107, 53, ${0.12 + intensity * 0.35})`,
                  }}
                >
                  <span className="text-[10px] font-bold uppercase text-brand-700">
                    {name}
                  </span>
                  <span className="font-display text-xl font-semibold text-ink">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            Darker cells = more articles that month. Click a month to open it.
          </div>
        </section>
      ))}
    </div>
  );
}

function ListView({ posts }: { posts: Post[] }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th className="px-4 py-3 font-semibold sm:px-5">Article</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">
              Topic
            </th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">
              Date
            </th>
            <th className="px-4 py-3 font-semibold sm:px-5">Read</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr
              key={p.slug}
              className="border-t border-slate-100"
            >
              <td className="px-4 py-3.5 sm:px-5">
                <Link
                  href={`/blog/${p.slug}`}
                  className="font-semibold text-ink hover:text-brand-500"
                >
                  {p.title}
                </Link>
              </td>
              <td className="hidden px-4 py-3.5 md:table-cell">
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                  {p.category}
                </span>
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3.5 text-slate-500 sm:table-cell">
                {formatDate(p.date)}
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-slate-500 sm:px-5">
                {p.readingTime}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PostMiniCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full gap-3 overflow-hidden rounded-xl bg-white p-2.5"
    >
      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={post.cover}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="80px"
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
          {post.category}
        </p>
        <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-ink group-hover:text-brand-500">
          {post.title}
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          {formatDate(post.date)} · {post.readingTime}
        </p>
      </div>
    </Link>
  );
}
