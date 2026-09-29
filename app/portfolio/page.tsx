import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { LongformHero, Pill } from "@/components/longform/Layout";
import { CaseStudyCard, CheckList, LandingSection, ReviewGrid } from "@/components/landing/Blocks";
import { publishedCaseStudies } from "@/lib/case-studies";
import { clientReviews, googleAggregate, trustpilotAggregate } from "@/lib/reviews";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies & Client Results",
  description:
    "Verified results from Jadeed Solutions clients: the Alpha Movers case study with Google Search Console data, and public reviews from local service businesses on Google, Trustpilot and Clutch.",
  alternates: { canonical: `${siteConfig.url}/portfolio` },
};

const featuredReviewNames = ["Arooj Fatima", "Mariam Ammad", "FLY FLEET DISPATCHERS", "Ihsan ul Haq"];

export default function PortfolioPage() {
  const studies = publishedCaseStudies();
  const reviews = featuredReviewNames
    .map((name) => clientReviews.find((r) => r.name === name))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        eyebrow={<Pill>Verified results</Pill>}
        title={<>Client results you can <span className="text-[#eaf25a]">check for yourself.</span></>}
        subtitle="We only publish numbers we can show the source for — Search Console exports, public reviews and client-confirmed details. More case studies are being prepared and will appear here once the data is reconciled."
        stats={[
          ["160,903", "search impressions for Alpha Movers in 6 months"],
          ["630", "organic clicks in the same period"],
          [`${googleAggregate.score}★`, `from ${googleAggregate.count} Google reviews`],
          ["~10", "active client partnerships"],
        ]}
      />

      <LandingSection id="case-studies" eyebrow="Case studies" title="Published case studies" tone="cream" intro={<>Each case study shows where its figures come from and what is deliberately left out.</>}>
        <div className="space-y-4">
          {studies.map((study) => <CaseStudyCard key={study.id} study={study} />)}
        </div>
      </LandingSection>

      <LandingSection id="what-we-did" eyebrow="The work behind it" title="What a full engagement includes">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[24px] border border-black/10 p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">For Alpha Movers we built and run</p>
            <div className="mt-4">
              <CheckList
                items={[
                  "The website, with service and area pages for London and Croydon",
                  "A mobile app for bookings",
                  "Local SEO, including specialist furniture and sofa hoisting pages",
                  "Social media and paid advertising",
                  "Tracking, so search visibility can be tied to enquiries",
                ]}
              />
            </div>
          </div>
          <div className="rounded-[24px] bg-[#dceee8] p-6 text-[#063d30] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">How it was paid for</p>
            <p className="mt-4 leading-7">
              Monthly SEO fees did not suit Alpha Movers’ cash flow, so the owner chose to pay 10% after bookings instead. That performance model is available to other local service businesses alongside fixed and tiered pricing.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm font-bold text-[#015f45]">
              <Link href="/pricing" className="group inline-flex items-center gap-1.5">Compare pricing models <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
              <Link href="/profit-share-handbook" className="group inline-flex items-center gap-1.5">How performance deals work <HugeiconsIcon icon={ArrowRightIcon} size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </LandingSection>

      <LandingSection
        id="reviews"
        eyebrow="Independent proof"
        title="What clients say in public"
        tone="cream"
        intro={
          <>
            {googleAggregate.score} from {googleAggregate.count} Google reviews and {trustpilotAggregate.score} from {trustpilotAggregate.count} on Trustpilot. Every profile is linked so you can read the originals.
          </>
        }
      >
        <ReviewGrid reviews={reviews} />
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {[
            ["Google", googleAggregate.url],
            ["Trustpilot", siteConfig.trustpilotUrl],
            ["Clutch", siteConfig.clutchUrl],
            ["Facebook", siteConfig.facebookReviewsUrl],
          ].map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 font-semibold text-black/70 hover:border-[#015f45]/40 hover:text-[#015f45]">
              Read reviews on {name} ↗
            </a>
          ))}
        </div>
      </LandingSection>
    </>
  );
}
