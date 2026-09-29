import type { Metadata } from "next";
import Image from "next/image";
import { HugeiconsIcon, QuoteIcon, ArrowRightIcon } from "@/components/icons";
import { GoogleLogo, TrustpilotLogo, ClutchLogo, FacebookLogo } from "@/components/BrandLogos";
import { publishedCaseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import {
  ButtonLink,
  CheckList,
  Eyebrow,
  FactRows,
  PageHero,
  Section,
  SectionHeader,
  StatRow,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Case Studies & Client Results",
  description:
    "Verified results for local service businesses: Alpha Movers won 70+ booked jobs and 120+ website enquiries in 3 months. Plus public reviews on Google, Trustpilot and Clutch.",
  alternates: { canonical: `${siteConfig.url}/portfolio` },
};

const headlines: Record<string, string> = {
  "alpha-movers": "Alpha Movers won 70+ booked jobs from its website in 3 months.",
};

const reviews = [
  { quote: "Their SEO work is excellent and helped bring my business to the first page despite strong competition in Abu Dhabi.", author: "Just Shine Cleaning Services", source: "Trustpilot", logo: "/clients/just-shine.png", initials: "JS" },
  { quote: "They developed my website exactly how I wanted. Their technical skills are strong, and the way they handle UI/UX is outstanding.", author: "Ather Javed", source: "Trustpilot", logo: null, initials: "AJ" },
  { quote: "The team managed the project professionally and efficiently. Their technical expertise, creativity and responsiveness stood out.", author: "CEO, Kamboh Tech Solutions", source: "Clutch", logo: null, initials: "KT" },
] as const;

const platforms = [
  { name: "Google", logo: GoogleLogo, score: "5.0", detail: "Business Profile", href: siteConfig.googleBusinessUrl },
  { name: "Trustpilot", logo: TrustpilotLogo, score: "4.0", detail: "3 public reviews", href: siteConfig.trustpilotUrl },
  { name: "Clutch", logo: ClutchLogo, score: "5.0", detail: "Verified B2B review", href: siteConfig.clutchUrl },
  { name: "Facebook", logo: FacebookLogo, score: "100%", detail: "recommended", href: siteConfig.facebookReviewsUrl },
] as const;

export default function PortfolioPage() {
  const studies = publishedCaseStudies();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Real results,<span className="block text-[#eaf25a]">with the receipts.</span></>}
        lead="We only publish numbers we can back up with Search Console exports, booking records or public reviews. Here's the proof so far."
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href="/case-studies/alpha-movers" variant="outlineLight">Read the Alpha Movers study</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="Verified so far"
            rows={[
              { label: "Booked jobs · Alpha Movers", value: "70+ in 3 months" },
              { label: "Website enquiries", value: "120+" },
              { label: "Search impressions", value: "218K" },
              { label: "Google rating", value: "5.0" },
            ]}
          />
        }
      />

      {studies.map((study, index) => {
        const chart = study.images.find((image) => image.src.includes("gsc-3-months-sep-2026"));
        return (
          <Section key={study.id} tone={index % 2 === 0 ? "deep" : "green"} labelledBy={`study-${study.id}`}>
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {study.id === "alpha-movers" && (
                    <Image src="/clients/alpha-movers.jpeg" alt={`${study.client} logo`} width={44} height={44} className="h-11 w-11 rounded-xl" />
                  )}
                  <div className="mr-2">
                    <div className="font-bold leading-5">{study.client}</div>
                    <div className="text-sm leading-5 text-white/65">{study.location}</div>
                  </div>
                  <span className="inline-flex rounded-full bg-[#cbd810] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d]">Verified case study</span>
                </div>
                <h2 id={`study-${study.id}`} className="mt-7 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">
                  {headlines[study.id] ?? study.client}
                </h2>
                <p className="mt-5 leading-7 text-white/75">{study.summary}</p>
                <p className="mt-4 text-sm text-white/60">Engagement model: {study.engagementModel}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={`/case-studies/${study.id}`} variant="white">View the full case study</ButtonLink>
                  <a href={study.website} target="_blank" rel="noopener noreferrer" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                    Visit {study.client} <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
              <div className="space-y-10">
                <StatRow tone="deep" columns={2} items={study.metrics.slice(0, 4)} />
                <CheckList tone="deep" items={study.highlights} />
              </div>
            </div>
            {chart && (
              <figure className="mt-12 md:mt-16">
                <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                  <span className="font-bold">{chart.caption}</span>
                  <span className="text-white/60">Google Search Console · Web search</span>
                </figcaption>
                <Image src={chart.src} alt={chart.alt} width={1407} height={741} sizes="(min-width: 1200px) 1100px, 100vw" className="h-auto w-full md:rounded-2xl" />
              </figure>
            )}
          </Section>
        );
      })}

      <Section tone="cream" labelledBy="reviews-heading">
        <SectionHeader id="reviews-heading" eyebrow="Independent proof" title="What clients say in public" lead="Every quote below is a public review you can check at the source." />
        <div className="mt-10 grid border-t border-black/10 md:mt-14 lg:grid-cols-3 lg:gap-x-10">
          {reviews.map((review) => (
            <figure key={review.author} className="flex flex-col border-b border-black/10 py-8 lg:py-10">
              <HugeiconsIcon icon={QuoteIcon} size={28} className="text-[#015f45]" />
              <blockquote className="mt-5 flex-1 text-lg leading-7 tracking-[-.015em]">“{review.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {review.logo ? (
                  <Image src={review.logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg" />
                ) : (
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e7f1ed] text-sm font-bold text-[#015f45]">{review.initials}</span>
                )}
                <div>
                  <div className="font-bold">{review.author}</div>
                  <div className="mt-0.5 text-xs text-black/60">Public review on {review.source}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="mt-12 grid border-t border-black/10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
          {platforms.map((platform) => {
            const Logo = platform.logo;
            return (
              <li key={platform.name}>
                <a href={platform.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 border-b border-black/10 py-5">
                  <span className="flex items-center gap-3">
                    <Logo className="h-7 w-7 shrink-0" />
                    <span>
                      <span className="block font-bold">{platform.name}</span>
                      <span className="block text-xs text-black/60">{platform.detail}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-xl font-bold text-[#015f45]">
                    {platform.score}
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="mint" labelledBy="next-heading">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow tone="mint">Your business next</Eyebrow>
            <h2 id="next-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">Find out where your next booked jobs will come from.</h2>
            <p className="mt-5 max-w-xl leading-7 text-[#063d30]/75">Take the free 2-minute Growth Check, or send us your website and city for a free plan.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href="/tools/growth-check" variant="green">Take the Growth Check</ButtonLink>
            <ButtonLink href="/contact" variant="outlineDark">Get a free plan</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
