import type { Metadata } from "next";
import { comparisons } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";
import { ButtonLink, FeatureGrid, PageHero, Section, SectionHeader } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Compare Jadeed — vs Fiverr, Upwork, Hostinger & Agencies",
  description:
    "See why local service businesses choose Jadeed Solutions over Fiverr, Upwork, DIY website builders and traditional agencies — full growth stack with an optional 10% of bookings model.",
  alternates: { canonical: `${siteConfig.url}/compare` },
};

const matrix: { label: string; values: [string, string, string, string] }[] = [
  { label: "Website, SEO & apps from one team", values: ["Rarely", "No", "Often", "Yes"] },
  { label: "Built around local service bookings", values: ["Varies", "No", "Varies", "Yes"] },
  { label: "Optional fee tied to bookings", values: ["No", "No", "Rarely", "10% model"] },
  { label: "Ongoing SEO & monthly reporting", values: ["Varies", "No", "Yes", "Yes"] },
  { label: "Who manages the work", values: ["You", "You", "Account manager", "Founder-led team"] },
];

const columns = ["Freelancers", "DIY builders", "Big agencies", "Jadeed"];

export default function CompareHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title={<>Jadeed vs<span className="block text-[#eaf25a]">the usual alternatives.</span></>}
        lead="Honest comparisons with freelancers, DIY website builders and traditional agencies — and why a remote, founder-led team works for UK & USA local services."
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href="/pricing" variant="outlineLight">See pricing</ButtonLink>
          </>
        }
      />

      <Section tone="cream" labelledBy="comparisons-heading">
        <SectionHeader id="comparisons-heading" eyebrow="Side by side" title="Pick a comparison" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid
            columns={2}
            items={comparisons.map((comparison) => ({
              eyebrow: comparison.navLabel,
              title: comparison.competitor,
              text: comparison.intro,
              href: `/compare/${comparison.slug}`,
              linkLabel: "Read the comparison",
            }))}
          />
        </div>
      </Section>

      <Section tone="green" labelledBy="matrix-heading">
        <SectionHeader id="matrix-heading" tone="green" eyebrow="At a glance" title="How the options compare" lead="A quick summary. Every business is different — the detailed pages explain the trade-offs." />
        <div className="-mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/25">
                <th scope="col" className="py-4 pr-4 font-semibold text-white/60">What matters</th>
                {columns.map((column) => (
                  <th key={column} scope="col" className={`px-4 py-4 font-bold ${column === "Jadeed" ? "text-[#eaf25a]" : ""}`}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.label} className="border-b border-white/15">
                  <th scope="row" className="py-4 pr-4 font-semibold">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td key={`${row.label}-${index}`} className={`px-4 py-4 ${index === 3 ? "font-bold text-[#eaf25a]" : "text-white/75"}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
