"use client";

import { useEffect, useState } from "react";

export type ContentsItem = { id: string; label: string; number?: number | string; badge?: string };

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1" aria-hidden="true">
      <div className="h-full bg-[#cbd810]" style={{ width: `${progress}%` }} />
    </div>
  );
}

export function ContentsNav({ items, title = "Contents" }: { items: ContentsItem[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="custom-scrollbar sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pr-2">
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">{title}</p>
      <ol className="mt-4 space-y-0.5 border-l border-black/10">
        {items.map((item, index) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-3.5 text-[13px] leading-5 transition-colors ${
                  isActive ? "border-[#015f45] font-semibold text-[#015f45]" : "border-transparent text-black/60 hover:text-black"
                }`}
              >
                <span className="w-4 shrink-0 tabular-nums text-black/35">{item.number ?? index + 1}</span>
                <span>
                  {item.label}
                  {item.badge && <span className="ml-1.5 whitespace-nowrap rounded bg-[#cbd810]/60 px-1 py-px text-[10px] font-bold uppercase tracking-wide text-[#063d30]">{item.badge}</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
