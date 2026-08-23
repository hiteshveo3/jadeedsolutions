import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/comparisons";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Compare Jadeed — vs Fiverr, Upwork, Hostinger & Agencies",
  description:
    "See why local service businesses choose Jadeed Solutions over Fiverr, Upwork, DIY builders and traditional agencies — full growth stack, 10% option.",
};

export default function CompareHubPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Compare</span>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink">
              Jadeed vs the usual alternatives
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Aggressive on value — honest on why remote delivery from Pakistan
              works for UK &amp; USA local services.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-slate-50">
        <div className="container grid gap-4 sm:grid-cols-2">
          {comparisons.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 font-semibold text-ink"
            >
              {c.h1.replace("Jadeed Solutions vs ", "vs ")}
              <HugeiconsIcon icon={ArrowRightIcon} size={18} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
