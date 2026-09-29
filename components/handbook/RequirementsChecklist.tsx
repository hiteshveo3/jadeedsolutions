"use client";

import { useState } from "react";
import { checklistGroups, structures, type StructureKey } from "@/lib/profit-share-handbook";

type View = StructureKey | "all";

const LABELS: Record<string, string> = { R: "Required", A: "Advised", N: "Not needed" };

function Status({ value }: { value: string }) {
  const label = LABELS[value] ?? value;
  const style =
    value === "R"
      ? "bg-[#015f45] text-white"
      : value === "A"
        ? "bg-[#dceee8] text-[#063d30]"
        : value === "N"
          ? "bg-black/[0.05] text-black/45"
          : "border border-black/15 text-black/70";
  const wrap = value in LABELS ? "whitespace-nowrap rounded-full" : "max-w-[8.5rem] rounded-lg text-right leading-tight";
  return <span className={`inline-flex px-2.5 py-1 text-xs font-semibold ${wrap} ${style}`}>{label}</span>;
}

export function RequirementsChecklist() {
  const [view, setView] = useState<View>("c");
  const index = structures.findIndex((s) => s.key === view);
  const selected = structures[index];
  const all = checklistGroups.flatMap((g) => g.items);
  const counts = selected
    ? { R: all.filter((i) => i.req[index] === "R").length, A: all.filter((i) => i.req[index] === "A").length, N: all.filter((i) => i.req[index] === "N").length }
    : null;
  let n = 0;

  return (
    <div className="mt-7">
      <div role="radiogroup" aria-label="Show requirements for" className="flex flex-wrap gap-2">
        {[...structures.map((s) => ({ key: s.key as View, label: `${s.letter} — ${s.name}`, recommended: s.recommended })), { key: "all" as View, label: "Compare all four", recommended: false }].map((option) => {
          const checked = view === option.key;
          return (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => setView(option.key)}
              className={`min-h-[40px] rounded-full border px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#015f45] ${
                checked ? "border-[#015f45] bg-[#015f45] text-white" : "border-black/15 bg-white text-black/70 hover:border-[#015f45]/50"
              }`}
            >
              {option.label}
              {option.recommended && <span className={`ml-1.5 text-[10px] font-bold uppercase tracking-wide ${checked ? "text-[#eaf25a]" : "text-[#015f45]"}`}>Recommended</span>}
            </button>
          );
        })}
      </div>

      {selected && counts && (
        <p className="mt-4 text-sm text-black/60" aria-live="polite">
          Structure {selected.letter}: <strong className="font-semibold text-black">{counts.R} required</strong>
          {[
            [counts.A, "advised"],
            [counts.N, "not needed"],
            [all.length - counts.R - counts.A - counts.N, "conditional"],
          ]
            .filter(([count]) => count)
            .map(([count, label]) => `, ${count} ${label}`)
            .join("")}
          .
        </p>
      )}

      <div className="mt-5 overflow-x-auto rounded-2xl border border-black/10">
        <table className={`w-full border-collapse text-[15px] ${selected ? "" : "min-w-[760px]"}`}>
          <thead>
            <tr className="bg-[#f3f1ec] text-left text-xs font-bold uppercase tracking-[.1em] text-black/60">
              <th scope="col" className="w-10 px-3 py-3 sm:px-4">#</th>
              <th scope="col" className="px-3 py-3 sm:px-4">Item</th>
              {selected ? (
                <th scope="col" className="w-px whitespace-nowrap px-3 py-3 text-right sm:px-4">
                  <span className="sm:hidden">Structure {selected.letter}</span>
                  <span className="hidden sm:inline">{selected.letter} — {selected.name}</span>
                </th>
              ) : (
                structures.map((s) => <th key={s.key} scope="col" className="px-3 py-3">{s.letter} — {s.name}</th>)
              )}
            </tr>
          </thead>
          {checklistGroups.map((group) => (
            <tbody key={group.title}>
              <tr>
                <th scope="colgroup" colSpan={selected ? 3 : 6} className="border-t border-black/10 bg-[#fafaf7] px-3 py-2 text-left text-xs font-extrabold uppercase tracking-[.12em] text-[#015f45] sm:px-4">{group.title}</th>
              </tr>
              {group.items.map((row) => {
                n += 1;
                return (
                  <tr key={row.item} className="border-t border-black/10">
                    <td className="px-3 py-2.5 tabular-nums text-black/40 sm:px-4">{n}</td>
                    <th scope="row" className="px-3 py-2.5 text-left font-medium text-[#1d1d1b] sm:px-4">{row.item}</th>
                    {selected ? (
                      <td className="w-px px-3 py-2.5 text-right sm:px-4"><Status value={row.req[index]} /></td>
                    ) : (
                      row.req.map((value, i) => <td key={structures[i].key} className="px-3 py-2.5"><Status value={value} /></td>)
                    )}
                  </tr>
                );
              })}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
