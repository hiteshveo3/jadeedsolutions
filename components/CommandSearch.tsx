"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SearchGroup, SearchItem } from "@/lib/ai/knowledge";
import { openChat } from "@/components/chat/ChatWidget";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  CloseIcon,
  GridIcon,
  HomeIcon,
  InfoIcon,
  LayersIcon,
  NewsIcon,
  SearchIcon,
  SparklesIcon,
  TagIcon,
  type IconSvgElement,
} from "./icons";

/* Site search (rebuilt 5 Oct 2026). Runs in the browser over the site's own index
   (lib/ai/knowledge.ts). "Ask Jadeed AI" hands the question to the chat widget,
   which sits bottom-right exactly as on Jadeed Marketing. */

const GROUP_ICON: Record<SearchGroup, IconSvgElement> = {
  Pages: HomeIcon,
  Pricing: TagIcon,
  Services: LayersIcon,
  Industries: BriefcaseIcon,
  Guides: BookIcon,
  Blog: NewsIcon,
  Compare: GridIcon,
  FAQ: InfoIcon,
};
const GROUP_ORDER: SearchGroup[] = ["Pricing", "Services", "Industries", "Pages", "FAQ", "Guides", "Compare", "Blog"];

const SUGGESTED = ["How does the 10% partnership work?", "Is there a setup fee?", "What does local SEO cost?", "Is my area still open?"] as const;
const POPULAR = ["/pricing", "/how-it-works", "/services/seo", "/case-studies/alpha-movers", "/contact"];

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const at = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded bg-[#BEF70A]/[0.18] px-0.5 text-[#BEF70A]">{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

function score(item: SearchItem, words: string[]) {
  const title = item.title.toLowerCase();
  const body = `${item.summary} ${item.keywords}`.toLowerCase();
  let s = 0;
  for (const w of words) {
    if (title.startsWith(w)) s += 6;
    else if (title.includes(w)) s += 4;
    else if (body.includes(w)) s += 1;
    else return 0;
  }
  return s;
}

export function CommandSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const words = useMemo(() => query.toLowerCase().split(/\s+/).filter((w) => w.length > 1), [query]);
  const results = useMemo(() => {
    if (!words.length) return [];
    return items
      .map((item) => ({ item, s: score(item, words) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 24)
      .map((r) => r.item);
  }, [items, words]);
  const popular = useMemo(() => POPULAR.map((p) => items.find((i) => i.path === p && i.group !== "FAQ")).filter(Boolean) as SearchItem[], [items]);
  const grouped = useMemo(() => GROUP_ORDER.map((g) => [g, results.filter((r) => r.group === g)] as const).filter(([, list]) => list.length), [results]);
  // Row 0 is "Ask Jadeed AI" when there is a query; results follow in group order.
  const flat = useMemo(() => grouped.flatMap(([, list]) => list), [grouped]);
  const rows = query.trim() ? flat.length + 1 : popular.length;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    window.setTimeout(() => returnFocus.current?.focus?.(), 0);
  }, []);
  const go = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router]
  );
  const ask = useCallback(
    (question: string) => {
      close();
      openChat(question);
    },
    [close]
  );

  /* Open from the header button or ⌘K / Ctrl K. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement;
        setOpen((v) => !v);
      }
    };
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, close]);

  useEffect(() => setActive(0), [query]);

  const onSearchKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(rows - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!query.trim()) {
        const item = popular[active];
        if (item) go(item.path);
      } else if (active === 0) ask(query);
      else {
        const item = flat[active - 1];
        if (item) go(item.path);
      }
    }
  };

  const row = (i: number) => `cs-row-${i}`;
  let rowIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex justify-center sm:px-4 sm:pt-[9vh]" role="dialog" aria-modal="true" aria-label="Search the site">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0 bg-[#051B1E]/70 backdrop-blur-md" onClick={close} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative flex h-full w-full max-w-[680px] flex-col overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#0B561C_0%,#06301D_55%,#051B1E_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[min(640px,82vh)] sm:rounded-[28px]"
          >
            <div className="flex shrink-0 items-center gap-3 px-4 pb-3 pt-4 sm:px-5">
              <HugeiconsIcon icon={SearchIcon} size={20} className="shrink-0 text-[#BEF70A]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                placeholder="Search pricing, services, guides…"
                aria-label="Search the site"
                role="combobox"
                aria-expanded={rows > 0}
                aria-controls="cs-results"
                aria-activedescendant={rows ? row(active) : undefined}
                className="h-11 min-w-0 flex-1 bg-transparent text-[17px] text-white outline-none placeholder:text-white/45"
              />
              <button type="button" onClick={close} aria-label="Close" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white">
                <HugeiconsIcon icon={CloseIcon} size={18} />
              </button>
            </div>
            <div className="mx-4 h-px shrink-0 bg-white/[0.08] sm:mx-5" />

            <div id="cs-results" role="listbox" aria-label="Results" className="custom-scrollbar flex-1 overflow-y-auto px-3 py-3 sm:px-4">
              {!query.trim() ? (
                <>
                  <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[.14em] text-white/45">Ask Jadeed AI</p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {SUGGESTED.map((q) => (
                      <button key={q} type="button" onClick={() => ask(q)} className="rounded-full bg-white/[0.06] px-3.5 py-2 text-left text-[13px] font-medium text-white/85 transition-colors hover:bg-[#BEF70A]/[0.14] hover:text-[#BEF70A]">
                        {q}
                      </button>
                    ))}
                  </div>
                  <p className="px-2 pb-2 pt-6 text-[11px] font-bold uppercase tracking-[.14em] text-white/45">Popular pages</p>
                  {popular.map((item, i) => (
                    <ResultRow key={item.path} id={row(i)} item={item} query="" active={active === i} onHover={() => setActive(i)} onPick={() => go(item.path)} />
                  ))}
                </>
              ) : (
                <>
                  <button id={row(0)} role="option" aria-selected={active === 0} type="button" onMouseEnter={() => setActive(0)} onClick={() => ask(query)} className={`flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition-colors ${active === 0 ? "bg-[#BEF70A]/[0.12]" : "hover:bg-white/[0.05]"}`}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
                      <HugeiconsIcon icon={SparklesIcon} size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold">Ask Jadeed AI</span>
                      <span className="block truncate text-[13px] text-white/60">“{query.trim()}”</span>
                    </span>
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} className={active === 0 ? "text-[#BEF70A]" : "text-white/30"} />
                  </button>
                  {grouped.length === 0 && <p className="px-3 py-8 text-center text-sm text-white/55">No pages match “{query.trim()}”. Jadeed AI can still answer it.</p>}
                  {grouped.map(([group, list]) => (
                    <div key={group} className="mt-3">
                      <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-[.14em] text-white/45">{group === "FAQ" ? "Questions" : group}</p>
                      {list.map((item) => {
                        rowIndex += 1;
                        const i = rowIndex;
                        return <ResultRow key={`${item.group}-${item.title}-${item.path}`} id={row(i)} item={item} query={query} active={active === i} onHover={() => setActive(i)} onPick={() => go(item.path)} />;
                      })}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-4 pt-1 text-[12px] text-white/45">
              <span>Search the whole site, or ask Jadeed AI.</span>
              <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                <kbd className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-sans text-[11px] text-white/70">↑↓</kbd> move
                <kbd className="ml-2 rounded-md bg-white/[0.08] px-1.5 py-0.5 font-sans text-[11px] text-white/70">Esc</kbd> close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ResultRow({ id, item, query, active, onHover, onPick }: { id: string; item: SearchItem; query: string; active: boolean; onHover: () => void; onPick: () => void }) {
  return (
    <button id={id} role="option" aria-selected={active} type="button" onMouseEnter={onHover} onClick={onPick} className={`flex w-full items-center gap-3 rounded-[16px] px-3 py-2.5 text-left transition-colors ${active ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}>
      <HugeiconsIcon icon={GROUP_ICON[item.group]} size={20} className="shrink-0 text-[#BEF70A]" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold">
          <Highlight text={item.title} query={query} />
        </span>
        <span className="block truncate text-[13px] text-white/55">{item.summary}</span>
      </span>
      <HugeiconsIcon icon={ArrowRightIcon} size={16} className={`shrink-0 transition-opacity ${active ? "text-[#BEF70A] opacity-100" : "opacity-0"}`} />
    </button>
  );
}
