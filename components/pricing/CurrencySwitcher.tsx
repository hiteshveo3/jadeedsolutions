"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HugeiconsIcon,
  ArrowDownIcon,
  SearchIcon,
  CheckIcon,
  GlobeIcon,
} from "@/components/icons";
import { currencies, currencyMap } from "@/lib/currencies";
import { useCurrency } from "./CurrencyProvider";

function Flag({ code, name }: { code: string; name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/24x18/${code}.png`}
      srcSet={`https://flagcdn.com/48x36/${code}.png 2x`}
      width={24}
      height={18}
      alt={name}
      loading="lazy"
      className="h-[18px] w-6 shrink-0 rounded-[3px] object-cover shadow-sm"
    />
  );
}

export function CurrencySwitcher() {
  const { currency, setCurrency, availableCodes, live } = useCurrency();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const list = useMemo(() => {
    const available = new Set(availableCodes);
    const q = query.trim().toLowerCase();
    return currencies
      .filter((c) => available.has(c.code))
      .filter(
        (c) =>
          q === "" ||
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q),
      );
  }, [availableCodes, query]);

  const active = currencyMap[currency];

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-11 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white px-4 text-sm font-semibold text-[#0B1F12] transition-colors hover:bg-white/10"
      >
        {active ? (
          <Flag code={active.flag} name={active.name} />
        ) : (
          <HugeiconsIcon icon={GlobeIcon} size={18} />
        )}
        <span>{currency}</span>
        <HugeiconsIcon
          icon={ArrowDownIcon}
          size={16}
          className={`text-white/62 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] shadow-xl">
          <div className="border-b border-white/[0.08] p-3">
            <label className="flex h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-3 text-sm">
              <HugeiconsIcon
                icon={SearchIcon}
                size={16}
                className="shrink-0 text-white/62"
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search currency…"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/62"
              />
            </label>
          </div>

          <ul className="max-h-72 overflow-y-auto py-1">
            {list.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                    c.code === currency ? "bg-white/25" : ""
                  }`}
                >
                  <Flag code={c.flag} name={c.name} />
                  <span className="font-semibold text-white">{c.code}</span>
                  <span className="flex-1 truncate text-xs text-white/62">
                    {c.name}
                  </span>
                  {c.code === currency && (
                    <HugeiconsIcon
                      icon={CheckIcon}
                      size={16}
                      className="shrink-0 text-[#BEF70A]"
                    />
                  )}
                </button>
              </li>
            ))}
            {list.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-white/62">
                No currency found.
              </li>
            )}
          </ul>

          <div className="border-t border-white/[0.08] px-3 py-2 text-[11px] text-white/62">
            {live
              ? "Live exchange rates · updated daily"
              : "Approximate rates · offline"}
          </div>
        </div>
      )}
    </div>
  );
}
