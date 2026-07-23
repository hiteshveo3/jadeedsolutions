"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon, ArrowDownIcon } from "@/components/icons";
import type { TocItem } from "@/lib/blog";

export function BlogToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[70px] z-40 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft lg:static lg:z-auto lg:shadow-none"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between lg:cursor-default"
      >
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
          On this page
        </span>
        <HugeiconsIcon
          icon={ArrowDownIcon}
          size={16}
          className={`text-slate-500 transition-transform lg:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <ol
        className={`mt-4 gap-1 sm:grid-cols-2 lg:grid ${open ? "grid" : "hidden"}`}
      >
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                active === item.id
                  ? "bg-brand-50 font-semibold text-brand-500"
                  : "text-ink/80 hover:text-brand-500"
              }`}
            >
              <span
                className={`font-bold ${
                  active === item.id ? "text-brand-500" : "text-brand-500/50"
                }`}
              >
                {i + 1}.
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
