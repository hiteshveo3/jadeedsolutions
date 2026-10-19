"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Icon } from "@/components/system/Icon";
import { Select, field } from "@/components/system/ui";
import { cn } from "@/lib/utils";

/* Search box, chip groups and menus that keep a dashboard list's filters in the URL (from
   Jadeed Marketing), so a filtered view can be bookmarked or shared and the server renders it. */

export type ChipGroup = { param: string; label: string; options: { value: string; label: string; count?: number }[] };
export type MenuFilter = { param: string; label: string; options: { value: string; label: string }[] };

export function ListFilters({ search, chips = [], menus = [] }: { search?: string; chips?: ChipGroup[]; menus?: MenuFilter[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const timer = useRef<number | undefined>(undefined);

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    // A changed filter closes the side panel: the open record may no longer be in the list.
    next.delete("lead");
    next.delete("open");
    start(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={cn("space-y-3", pending && "opacity-70")}>
      {search ? (
        <div className="relative max-w-md">
          <label className="sr-only" htmlFor="list-search">
            {search}
          </label>
          <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            id="list-search"
            type="text"
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => update({ q: value.trim() }), 300);
            }}
            placeholder={search}
            className={cn(field, "h-10 rounded-full py-0 pl-10 pr-10")}
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                update({ q: "" });
              }}
              className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/55 hover:bg-white/[0.08] hover:text-white"
            >
              <Icon name="x" size={16} />
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
        {chips.map((group) => {
          const current = params.get(group.param) ?? "";
          return (
            <div key={group.param} role="group" aria-label={group.label} className="flex flex-wrap gap-1.5">
              {[{ value: "", label: "All" }, ...group.options].map((option) => {
                const on = current === option.value;
                return (
                  <button
                    key={option.value || "all"}
                    type="button"
                    aria-pressed={on}
                    onClick={() => update({ [group.param]: option.value })}
                    className={cn("inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors", on ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.07] text-white/75 hover:bg-white/[0.11] hover:text-white")}
                  >
                    {option.label}
                    {"count" in option && typeof option.count === "number" ? <span className={cn("text-xs font-medium", on ? "text-[#0B1F12]/70" : "text-white/45")}>{option.count}</span> : null}
                  </button>
                );
              })}
            </div>
          );
        })}
        {menus.map((menu) => (
          <div key={menu.param} className="w-48">
            <Select label={menu.label} hideLabel value={params.get(menu.param) ?? ""} options={[{ value: "", label: `${menu.label}: all` }, ...menu.options]} onChange={(value) => update({ [menu.param]: value })} />
          </div>
        ))}
      </div>
    </div>
  );
}
