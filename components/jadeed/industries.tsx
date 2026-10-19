"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon, ArrowRightIcon, LocationIcon, SearchIcon } from "@/components/icons";

/* Industries pieces from the design lab: trade search with a typing hint (037),
   and cities with a country switch (063 A). */

const TRADES: readonly [string, string][] = [
  ["Plumber", "/industries/seo-for-plumbers"],
  ["Boiler repair", "/industries/seo-for-plumbers"],
  ["Heating engineer", "/industries/seo-for-plumbers"],
  ["Drain cleaning", "/industries/seo-for-plumbers"],
  ["Cleaning company", "/industries/seo-for-cleaners"],
  ["End of tenancy cleaning", "/industries/seo-for-cleaners"],
  ["Carpet cleaning", "/industries/seo-for-cleaners"],
  ["Commercial cleaning", "/industries/seo-for-cleaners"],
  ["Removals", "/industries/seo-for-uk-removals"],
  ["Man and van", "/industries/seo-for-uk-removals"],
  ["Movers", "/industries/seo-for-uk-removals"],
  ["Electrician", "/industries/seo-for-local-service-businesses"],
  ["Roofer", "/industries/seo-for-local-service-businesses"],
  ["HVAC & AC repair", "/industries/seo-for-local-service-businesses"],
  ["Landscaper", "/industries/seo-for-local-service-businesses"],
  ["Pest control", "/industries/seo-for-local-service-businesses"],
  ["Handyman", "/industries/seo-for-local-service-businesses"],
  ["Locksmith", "/industries/seo-for-local-service-businesses"],
  ["Painter & decorator", "/industries/seo-for-local-service-businesses"],
  ["Builder", "/industries/seo-for-local-service-businesses"],
];
const HINTS = ["plumber", "end of tenancy cleaning", "man and van", "electrician"];

export function TradeSearch() {
  const [q, setQ] = useState("");
  const [hint, setHint] = useState("");
  const timer = useRef(0);
  // A placeholder that types itself and erases (idea 037), paused while the visitor types.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHint(HINTS[0]);
      return;
    }
    let w = 0, c = 0, del = false;
    const tick = () => {
      const word = HINTS[w % HINTS.length];
      c += del ? -1 : 1;
      setHint(word.slice(0, c));
      if (!del && c === word.length) { del = true; timer.current = window.setTimeout(tick, 1300); return; }
      if (del && c === 0) { del = false; w++; }
      timer.current = window.setTimeout(tick, del ? 45 : 90);
    };
    tick();
    return () => window.clearTimeout(timer.current);
  }, []);
  const term = q.trim().toLowerCase();
  const hits = term ? TRADES.filter(([t]) => t.toLowerCase().includes(term)).slice(0, 5) : [];
  return (
    <div className="mx-auto max-w-[560px]">
      <label className="relative flex h-14 items-center gap-3 rounded-full border border-[#BEF70A]/40 bg-white/[0.08] px-5">
        <HugeiconsIcon icon={SearchIcon} size={20} className="text-[#BEF70A]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search your trade" className="h-full flex-1 border-0 !bg-transparent text-base text-white outline-none !shadow-none" />
        {!q && <span className="pointer-events-none absolute left-[52px] text-base text-white/50">What's your trade? e.g. {hint}</span>}
      </label>
      {term && (
        <ul className="mt-2 overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#06301D]/95">
          {hits.length ? (
            hits.map(([t, href]) => (
              <li key={t}>
                <Link href={href} className="group flex items-center justify-between border-t border-white/[0.08] px-5 py-3 first:border-t-0 hover:bg-white/[0.05]">
                  <span className="font-semibold">{t}</span>
                  <HugeiconsIcon icon={ArrowRightIcon} size={16} className="text-white/50 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))
          ) : (
            <li>
              <Link href="/industries/seo-for-local-service-businesses" className="block px-5 py-3 text-sm text-white/75 hover:bg-white/[0.05]">
                Not listed? We work with most local service trades — see the playbook →
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export function CityChips({ groups }: { groups: { label: string; cities: string[] }[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.06] p-1" role="tablist" aria-label="Country">
        {groups.map((g, k) => (
          <button key={g.label} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`h-10 rounded-full px-5 text-sm font-semibold transition-colors ${k === i ? "bg-[#BEF70A] text-[#0B1F12]" : "text-white/70"}`}>
            {g.label} <span className={k === i ? "text-[#0B1F12]/60" : "text-white/40"}>{g.cities.length}</span>
          </button>
        ))}
      </div>
      {groups.map((g, k) => (
        <ul key={g.label} hidden={k !== i} className="mt-6 flex flex-wrap gap-2 motion-safe:animate-[rise_.45s_ease_both]">
          {g.cities.map((c) => (
            <li key={c} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-4 text-sm">
              <HugeiconsIcon icon={LocationIcon} size={15} className="text-[#BEF70A]" />
              {c}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
