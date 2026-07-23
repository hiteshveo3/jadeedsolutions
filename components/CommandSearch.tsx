"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  HugeiconsIcon,
  SearchIcon,
  FileIcon,
  LayersIcon,
  NewsIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "./icons";
import { navLinks } from "@/lib/site";
import { services } from "@/lib/services";
import { posts } from "@/lib/blog";

type SearchItem = {
  label: string;
  href: string;
  group: "Pages" | "Services" | "Blog";
  keywords?: string;
};

const items: SearchItem[] = [
  ...navLinks.map((l) => ({
    label: l.label,
    href: l.href,
    group: "Pages" as const,
  })),
  ...services.map((s) => ({
    label: s.title,
    href: `/services/${s.slug}`,
    group: "Services" as const,
    keywords: s.summary,
  })),
  ...posts.map((p) => ({
    label: p.title,
    href: `/blog/${p.slug}`,
    group: "Blog" as const,
    keywords: `${p.category} ${p.excerpt}`,
  })),
];

const groupIcon = {
  Pages: FileIcon,
  Services: LayersIcon,
  Blog: NewsIcon,
} as const;

export function CommandSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.keywords?.toLowerCase().includes(q)
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-search", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-search", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item.href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={close}
      />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4">
          <HugeiconsIcon icon={SearchIcon} size={20} className="text-slate-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, services, articles..."
            className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, i) => {
              const Icon = groupIcon[item.group];
              return (
                <button
                  key={`${item.href}-${item.label}`}
                  onClick={() => go(item.href)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active === i ? "bg-brand-50 text-brand-500" : "text-slate-700"
                  }`}
                >
                  <HugeiconsIcon
                    icon={Icon}
                    size={16}
                    className="shrink-0 opacity-70"
                  />
                  <span className="flex-1 truncate font-medium">
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={ArrowUpIcon} size={12} />
            <HugeiconsIcon icon={ArrowDownIcon} size={12} />
            navigate
          </span>
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={ArrowRightIcon} size={12} />
            open
          </span>
        </div>
      </div>
    </div>
  );
}
