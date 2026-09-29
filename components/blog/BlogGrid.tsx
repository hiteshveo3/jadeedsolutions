"use client";

import Link from "next/link";
import { useState } from "react";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { CategoryTile } from "@/components/blog/CategoryTile";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  dateLabel: string;
};

export function BlogGrid({ posts, topics }: { posts: PostSummary[]; topics: string[] }) {
  const [topic, setTopic] = useState("All");
  const visible = topic === "All" ? posts : posts.filter((p) => p.category === topic);

  return (
    <div>
      <div role="radiogroup" aria-label="Filter by topic" className="flex flex-wrap gap-2">
        {["All", ...topics].map((t) => {
          const checked = topic === t;
          const count = t === "All" ? posts.length : posts.filter((p) => p.category === t).length;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => setTopic(t)}
              className={`min-h-[40px] rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015f45] ${
                checked ? "border-[#015f45] bg-[#015f45] text-white" : "border-black/10 bg-white text-black/70 hover:border-[#015f45]/40"
              }`}
            >
              {t} <span className={checked ? "text-white/70" : "text-black/40"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#015f45]/35">
            <CategoryTile category={post.category} readingTime={post.readingTime} />
            <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-.02em] group-hover:text-[#015f45]">{post.title}</h3>
            <p className="mb-5 mt-2 line-clamp-3 text-sm leading-6 text-black/60">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-[13px]">
              <time dateTime={post.date} className="text-black/50">{post.dateLabel}</time>
              <span className="inline-flex items-center gap-1 font-bold text-[#015f45]">
                Read <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
