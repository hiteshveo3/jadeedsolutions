"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HugeiconsIcon,
  SearchIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@/components/icons";
import { formatDate } from "@/lib/blog";
import { getAuthor } from "@/lib/authors";

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  cover: string;
  featured?: boolean;
  authorSlug?: string;
};

const PAGE_SIZE = 6;

export function BlogList({
  posts,
  categories,
}: {
  posts: BlogListItem[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  const showFeatured = activeCategory === "All" && query.trim() === "";
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const gridItems = showFeatured
    ? filtered.filter((p) => p.slug !== featured?.slug)
    : filtered;
  const shown = gridItems.slice(0, visible);
  const hasMore = visible < gridItems.length;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 text-sm md:max-w-xs">
          <HugeiconsIcon
            icon={SearchIcon}
            size={16}
            className="shrink-0 text-slate-500"
          />
          <input
            placeholder="Search articles…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            className="w-full bg-transparent text-ink outline-none placeholder:text-slate-500"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setVisible(PAGE_SIZE);
              }}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-brand-500 text-white"
                  : "border border-slate-200 bg-white text-ink hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {showFeatured && featured && (
        <div className="mt-8">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[280px]">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <span className="inline-flex w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                Featured · {featured.category}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink group-hover:text-brand-500">
                {featured.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {featured.excerpt}
              </p>
              <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{getAuthor(featured.authorSlug).name}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featured.date)}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <HugeiconsIcon icon={ClockIcon} size={13} />
                  {featured.readingTime}
                </span>
              </span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                Read article
                <HugeiconsIcon
                  icon={ArrowRightIcon}
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </div>
      )}

      {shown.length > 0 ? (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => {
              const author = getAuthor(post.authorSlug);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex w-fit rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                      {post.category} · {post.readingTime}
                    </span>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-brand-500">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-xs text-slate-500">
                      {author.name} · {formatDate(post.date)}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                      Read article
                      <HugeiconsIcon
                        icon={ArrowRightIcon}
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-200"
              >
                Load more articles
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-sm text-slate-500">
            No articles found. Try a different search or category.
          </p>
        </div>
      )}
    </div>
  );
}
