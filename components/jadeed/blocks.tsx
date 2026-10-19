import type { ReactNode } from "react";
import { HugeiconsIcon, CheckIcon, CloseIcon, QuoteIcon } from "@/components/icons";
import { Spark } from "@/components/site/ui";

/* Static pieces from the design lab, rebuilt for the live site (all dark). */

/* ── Moving strip of trades (idea 005 A) ───────────────────────────── */
export function TradesMarquee({ items }: { items: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-label={`Trades we work with: ${items.join(", ")}`}>
      <div className="flex w-max gap-10 py-1 motion-safe:animate-scroll" aria-hidden="true">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10 whitespace-nowrap text-xl font-semibold tracking-[-.03em] text-white/90 sm:text-2xl">
            {t}
            <Spark className="text-[#BEF70A]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 2×2 lime ticks under a headline (idea 002 A) ──────────────────── */
export function TickGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-3 text-[15px] text-white/90">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
            <HugeiconsIcon icon={CheckIcon} size={12} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ── A real receipt on dark with a PAID stamp (idea 011 B) ─────────── */
export function Receipt({ title, rows, totalLabel, total, note, stamp = "PAID ✓" }: { title: string; rows: readonly [string, string][]; totalLabel: string; total: string; note?: string; stamp?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="rounded-t-[16px] bg-[#FAFAF7] px-5 pb-4 pt-5 text-[#0B1F12] tabular-nums">
        <p className="text-center text-[10px] font-bold uppercase tracking-[.16em] text-[#0B1F12]/50">{title}</p>
        {rows.map(([k, v]) => (
          <div key={k} className="mt-3 flex justify-between text-sm">
            <span className="text-[#0B1F12]/65">{k}</span>
            <b>{v}</b>
          </div>
        ))}
        <div className="my-4 border-t-[1.5px] border-dashed border-[#0B1F12]/15" />
        <div className="flex items-end justify-between">
          <span className="text-xs font-bold">{totalLabel}</span>
          <span className="text-[28px] font-semibold leading-none tracking-[-.04em]">{total}</span>
        </div>
        {note && <p className="mt-3 text-[11px] leading-4 text-[#0B1F12]/50">{note}</p>}
      </div>
      <div aria-hidden="true" className="h-2 rotate-180 bg-[linear-gradient(45deg,#FAFAF7_50%,transparent_50%),linear-gradient(-45deg,#FAFAF7_50%,transparent_50%)] bg-[length:16px_16px] bg-repeat-x" />
      <span className="absolute -right-3 -top-3 -rotate-[8deg] rounded-full bg-[#BEF70A] px-3.5 py-1.5 text-lg text-[#0B1F12] shadow-[0_2px_0_rgba(11,31,18,0.25)]" style={{ fontFamily: "var(--font-sticker)" }}>
        {stamp}
      </span>
    </div>
  );
}

/* ── Comparison table, Jadeed column in lime (idea 014 B) ──────────── */
export function CompareTable({ head, rows }: { head: readonly [string, string, string]; rows: readonly (readonly [string, string, string, string])[] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[620px] border-collapse text-left text-[15px]">
        <thead>
          <tr>
            <th className="w-[24%] p-4" />
            <th className="rounded-t-[16px] bg-[#BEF70A]/[0.12] p-4 text-sm font-bold text-[#BEF70A]">
              <span className="inline-flex items-center gap-1.5"><Spark />{head[0]}</span>
            </th>
            <th className="p-4 text-xs font-bold uppercase tracking-[.12em] text-white/50">{head[1]}</th>
            <th className="p-4 text-xs font-bold uppercase tracking-[.12em] text-white/50">{head[2]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, us, a, b], i) => (
            <tr key={label} className="border-t border-white/[0.08]">
              <td className="p-4 text-sm text-white/60">{label}</td>
              <td className={`bg-[#BEF70A]/[0.07] p-4 font-semibold ${i === rows.length - 1 ? "rounded-b-[16px]" : ""}`}>
                <span className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]"><HugeiconsIcon icon={CheckIcon} size={12} /></span>
                  {us}
                </span>
              </td>
              <td className="p-4 text-white/65">{a}</td>
              <td className="p-4 text-white/65">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── “Not a result on its own” — crossed chips, then lime (idea 015 B) ── */
export function CrossedChips({ crossed, result, label = "Doesn't count on its own", arrow = "only this counts" }: { crossed: readonly string[]; result: string; label?: string; arrow?: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/50">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {crossed.map((t) => (
          <span key={t} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.06] px-3.5 text-sm text-white/45 line-through">
            <HugeiconsIcon icon={CloseIcon} size={14} />
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/50">↓ {arrow}</p>
      <p className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#BEF70A] px-5 font-bold text-[#0B1F12]">
        <HugeiconsIcon icon={CheckIcon} size={16} />
        {result}
      </p>
    </div>
  );
}

/* ── Clicks rising: a lime line chart (idea 047 B) ─────────────────── */
export function ClicksChart({ badge, from = "First 28 days", to = "Final 28 days", source }: { badge: string; from?: string; to?: string; source: string }) {
  return (
    <figure>
      <div className="flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#BEF70A] px-3 py-1 text-xs font-bold text-[#0B1F12]">{badge}</span>
      </div>
      <svg viewBox="0 0 300 140" className="mt-2 block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="clicks-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#BEF70A" stopOpacity=".32" />
            <stop offset="1" stopColor="#BEF70A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="rgba(255,255,255,0.08)">
          {[0, 1, 2, 3].map((k) => (
            <line key={k} x1={10} x2={290} y1={20 + k * 36} y2={20 + k * 36} />
          ))}
        </g>
        <path d="M10 122C50 120 70 114 100 106S160 92 190 72 250 36 290 18L290 128L10 128Z" fill="url(#clicks-fill)" />
        <path d="M10 122C50 120 70 114 100 106S160 92 190 72 250 36 290 18" fill="none" stroke="#BEF70A" strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={290} cy={18} r={5} fill="#BEF70A" />
        <circle cx={290} cy={18} r={10} fill="none" stroke="#BEF70A" strokeOpacity=".35" />
        <g fontFamily="var(--font-sans)" fontSize={8} fill="rgba(255,255,255,0.5)">
          <text x={10} y={139}>{from}</text>
          <text x={290} y={139} textAnchor="end">{to}</text>
        </g>
      </svg>
      <figcaption className="mt-2 text-xs text-white/50">{source}</figcaption>
    </figure>
  );
}

/* ── Browser frame for a screenshot (ideas 042/069) ────────────────── */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.06]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.05] px-3 py-2.5">
        <i className="h-2 w-2 rounded-full bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">{url}</span>
      </div>
      {children}
    </div>
  );
}

/* ── Big quote with a lime mark and a pill (idea 045 A + owner note) ── */
export function BigQuote({ quote, name, role, logo, pill }: { quote: string; name: string; role: string; logo?: string; pill?: string }) {
  return (
    <figure className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3">
        <HugeiconsIcon icon={QuoteIcon} size={44} className="text-[#BEF70A]" />
        {pill && <span className="rounded-full bg-[#BEF70A] px-3.5 py-1.5 text-xs font-bold text-[#0B1F12]">{pill}</span>}
      </div>
      <blockquote className="mt-5 text-[22px] font-medium leading-[1.4] tracking-[-.02em] sm:text-[28px]">“{quote}”</blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" width={44} height={44} className="h-11 w-11 rounded-full" />
        )}
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-white/60">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
