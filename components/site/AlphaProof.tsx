import Image from "next/image";
import { ButtonLink, Section, StatRow } from "./ui";

const alphaStats = [
  { value: "90+", label: "booked jobs" },
  { value: "150+", label: "website enquiries" },
  { value: "273K", label: "Google Search impressions" },
  { value: "885", label: "organic clicks" },
];

/** Verified Alpha Movers proof band (Jul–Oct 2026). Dark tones only. */
export function AlphaProof({
  tone = "deep",
  title = "90+ booked jobs from one website in 3 months.",
}: {
  tone?: "green" | "deep";
  title?: string;
}) {
  return (
    <Section tone={tone} labelledBy="alpha-proof-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-sm font-extrabold tracking-[.02em] text-[#BEF70A]">AM</span>
            <div className="mr-2">
              <div className="font-bold leading-5">Alpha Movers</div>
              <div className="text-sm leading-5 text-white/65">Removals · London</div>
            </div>
            <span className="inline-flex rounded-full bg-[#BEF70A] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0B1F12]">Verified case study</span>
          </div>
          <h2 id="alpha-proof-heading" className="mt-7 max-w-xl font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Website, local SEO and service pages built as one system. Search Console captured on 19 October 2026 shows 273K impressions and 885 clicks over the last three months. The same three months produced 150+ enquiries and 90+ booked jobs.
          </p>
          <div className="mt-8">
            <ButtonLink href="/case-studies/alpha-movers" variant="white">View the evidence</ButtonLink>
          </div>
        </div>
        <StatRow items={alphaStats} tone={tone} columns={2} />
      </div>
    </Section>
  );
}
