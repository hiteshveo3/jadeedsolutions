import Link from "next/link";
import { HugeiconsIcon, CheckIcon } from "@/components/icons";
import { CircleArrow, Eyebrow } from "@/components/site/ui";
import { notResults, partnership, partnershipTerms } from "@/lib/partnership";
import { CrossedChips } from "./blocks";
import { FeeDueChecker } from "./interactive";
import { RegulatedNote, TermSlider } from "./terms";

/** Pricing: the whole deal at a glance — ideas 012 A, 020 B, 015 B, 016/023 B,
 *  017 B, 018 B, 019 A, 021 B and 033 A. Terms come from lib/partnership.ts
 *  (Jadeed Marketing's model, set for every country on 4 Oct 2026). */

const deal = [
  ["£0", "upfront on the Growth Partnership"],
  [`${partnership.feePercent}%`, "of paid invoices — after your customer pays"],
  ["1", "partner per trade, per area"],
  [String(partnership.noticeDays), `days' notice after the first ${partnership.minimumTermMonths} months`],
] as const;

const seoIncluded = [
  "Technical SEO audit and roadmap",
  "Google Business Profile optimisation",
  "On-page work on your key pages",
  "Search-optimised local content",
  "Monthly report and a call",
] as const;

export function DealAtAGlance() {
  return (
    <section aria-labelledby="deal-heading" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* 012 A — the big £0 first. */}
        <div className="grid items-center gap-10 rounded-[30px] border border-white/[0.08] bg-glow p-6 sm:p-10 md:grid-cols-[1fr_1fr] lg:p-14">
          <div>
            <Eyebrow>The deal at a glance</Eyebrow>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Upfront</p>
            <p id="deal-heading" className="text-[110px] font-semibold leading-[0.82] tracking-[-.07em] text-[#BEF70A] sm:text-[150px]">£0</p>
          </div>
          <ul className="grid gap-3.5 text-[17px]">
            {["No setup fee, no retainer, no minimum spend", `${partnership.feePercent}% of a paid invoice — only after your customer pays`, "Or fixed SEO from £300 a month", "Ad spend paid by you, never marked up"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]">
                  <HugeiconsIcon icon={CheckIcon} size={13} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* 020 B — four boxes, big lime numbers, no side lines (owner note on 044). */}
        <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {deal.map(([n, l]) => (
            <div key={l} className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-5 sm:p-6">
              <dd className="text-[40px] font-semibold leading-none tracking-[-.05em] text-[#BEF70A] sm:text-5xl">{n}</dd>
              <dt className="mt-2 text-sm text-white/70">{l}</dt>
            </div>
          ))}
        </dl>

        {/* 015 B + 023 B — what counts, and check a fee yourself. */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <h2 className="text-2xl tracking-[-.03em] sm:text-3xl">What counts as a result</h2>
            <div className="mt-6">
              <CrossedChips crossed={notResults} result="A completed job your customer paid for" />
            </div>
          </div>
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <h2 className="text-2xl tracking-[-.03em] sm:text-3xl">Is a fee due? Check it yourself.</h2>
            <div className="mt-6">
              <FeeDueChecker />
            </div>
          </div>
        </div>

        {/* 017 B — plain-language terms, full width; then 021 B price card beside 018 B bill + “No markup”. */}
        <div className="mt-4 grid gap-4">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <Eyebrow>Plain-language terms</Eyebrow>
            <h2 className="mt-4 text-2xl tracking-[-.03em] sm:text-3xl">The fine print is open.</h2>
            <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partnershipTerms.map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="w-7 shrink-0 text-xl font-semibold tracking-[-.04em] text-[#BEF70A]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pt-0.5 text-[15px] leading-6 text-white/75">{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6">
              <Link href="/profit-share-handbook" className="group inline-flex items-center gap-2.5 text-sm font-bold">
                Read the profit-share handbook <CircleArrow size="sm" />
              </Link>
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/[0.08] bg-glow p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Fixed local SEO</span>
                <span className="rounded-full bg-[#BEF70A] px-2.5 py-1 text-[11px] font-bold text-[#0B1F12]">£0 setup</span>
              </div>
              <p className="mt-4">
                <span className="text-[56px] font-semibold leading-none tracking-[-.06em] text-[#BEF70A]">£300</span>
                <span className="text-white/60"> / month, from</span>
              </p>
              <ul className="mt-5 grid gap-2.5 text-[15px]">
                {seoIncluded.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF70A] text-[#0B1F12]"><HugeiconsIcon icon={CheckIcon} size={11} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/50">6-month minimum. Websites from £199.</p>
              <Link href="/contact" className="group mt-6 flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] hover:bg-[#ABDE09]">
                Discuss a plan <CircleArrow dark />
              </Link>
            </div>
            <div className="relative flex flex-col rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">Paid by you, directly</p>
              {[["Google Ads budget", "Your budget"], ["Meta / Facebook Ads", "Your budget"], ["Your domain", "In your name"], ["Cloud usage, if an app needs it", "Your account"]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-dashed border-white/[0.08] py-3 text-[15px]">
                  <span>{k}</span>
                  <b>{v}</b>
                </div>
              ))}
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-sm font-bold">Through Jadeed</span>
                <span className="text-3xl font-semibold tracking-[-.04em] text-[#BEF70A]">£0</span>
              </div>
              <span className="absolute -right-2 -top-3.5 -rotate-[7deg] rounded-full bg-[#BEF70A] px-3.5 py-1.5 text-lg text-[#0B1F12] shadow-[0_2px_0_rgba(11,31,18,0.25)]" style={{ fontFamily: "var(--font-sticker)" }}>
                No markup!
              </span>
            </div>
          </div>
        </div>

        {/* 033 A — term and exit; 019 A — regulated professions. */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.05] p-6 sm:p-8">
            <Eyebrow>Term and exit</Eyebrow>
            <h2 className="mb-6 mt-4 text-2xl tracking-[-.03em] sm:text-3xl">A clear way in, and a clear way out.</h2>
            <TermSlider />
          </div>
          <RegulatedNote />
        </div>
      </div>
    </section>
  );
}
