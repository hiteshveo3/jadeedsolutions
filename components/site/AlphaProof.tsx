import Image from "next/image";
import { ButtonLink, Section, StatRow } from "./ui";

const alphaStats = [
  { value: "70+", label: "booked jobs" },
  { value: "120+", label: "website enquiries" },
  { value: "218K", label: "Google Search impressions" },
  { value: "643", label: "organic clicks" },
];

/** Verified Alpha Movers proof band (Jun–Sep 2026). Dark tones only. */
export function AlphaProof({
  tone = "deep",
  title = "70+ booked jobs from one website in 3 months.",
}: {
  tone?: "green" | "deep";
  title?: string;
}) {
  return (
    <Section tone={tone} labelledBy="alpha-proof-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Image src="/clients/alpha-movers.jpeg" alt="Alpha Movers logo" width={44} height={44} className="h-11 w-11 rounded-xl" />
            <div className="mr-2">
              <div className="font-bold leading-5">Alpha Movers</div>
              <div className="text-sm leading-5 text-white/65">Removals · London</div>
            </div>
            <span className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d]">Verified case study</span>
          </div>
          <h2 id="alpha-proof-heading" className="mt-7 max-w-xl font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-7 text-white/75">
            Website, local SEO and service pages built as one system. Between June and September 2026 the site earned 218K Google Search impressions and turned that visibility into 120+ enquiries.
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
