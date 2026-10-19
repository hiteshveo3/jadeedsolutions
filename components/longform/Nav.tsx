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
      <div className="h-full bg-[#BEF70A]" style={{ width: `${progress}%` }} />
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
      <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#BEF70A]">{title}</p>
      <ol className="mt-4 space-y-0.5">
        {items.map((item, index) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex gap-2.5 rounded-[10px] px-3 py-1.5 text-[13px] leading-5 transition-colors ${
                  isActive ? "bg-[#BEF70A]/10 font-semibold text-[#BEF70A]" : "text-white/68 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="w-4 shrink-0 tabular-nums text-white/43">{item.number ?? index + 1}</span>
                <span>
                  {item.label}
                  {item.badge && <span className="ml-1.5 whitespace-nowrap rounded bg-[#BEF70A]/15 px-1 py-px text-[10px] font-bold uppercase tracking-wide text-[#BEF70A]">{item.badge}</span>}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
