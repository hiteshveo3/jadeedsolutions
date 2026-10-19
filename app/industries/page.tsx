import type { Metadata } from "next";
import { WhatsappIcon } from "@/components/icons";
import { niches } from "@/lib/niches";
import { intentPages } from "@/lib/intent-pages";
import { citiesByCountry, cities } from "@/lib/cities";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import { CityChips, TradeSearch } from "@/components/jadeed/industries";
import { TradesMarquee } from "@/components/jadeed/blocks";
import {
  ButtonLink,
  Eyebrow,
  FactRows,
  FeatureGrid,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Industries — Local Service Businesses We Help Grow",
  description:
    "SEO, websites and apps for plumbers, movers, cleaners and other local service businesses across 100 UK & USA cities. From £300/mo or 10% of paid jobs.",
  alternates: { canonical: `${siteConfig.url}/industries` },
};

export default function IndustriesHubPage() {
  const uk = citiesByCountry("UK");
  const usa = citiesByCountry("USA");

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for local<span className="block text-[#BEF70A]">service businesses.</span></>}
        lead="Plumbers, cleaners, movers and other local services across the UK and USA — solo operators through multi-crew firms. One goal: more bookings from Google and your website."
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href="/how-it-works" variant="outlineLight">See how it works</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="Coverage"
            rows={[
              { label: "Trade playbooks", value: niches.length },
              { label: "City pages per trade", value: `${cities.length} (${uk.length} UK · ${usa.length} USA)` },
              { label: "Buyer guides", value: intentPages.length },
            ]}
          />
        }
      />

      {/* Find your trade: a search that types its own hint (idea 037) + a moving strip of trades (005). */}
      <section aria-labelledby="find-trade-heading" className="py-14 md:py-20">
        <div className="container max-w-[1200px] text-center">
          <h2 id="find-trade-heading" className="text-[34px] leading-[1.02] tracking-[-.04em] sm:text-5xl">Find your trade</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">Type what you do — we'll take you to the right playbook.</p>
          <div className="mt-8">
            <TradeSearch />
          </div>
        </div>
        <div className="mt-12 border-y border-white/[0.08] py-5">
          <TradesMarquee items={["Plumbers", "Cleaners", "Removals", "Electricians", "Roofers", "HVAC & AC", "Landscapers", "Pest control", "Handymen", "Locksmiths"]} />
        </div>
      </section>

      <Section tone="cream" labelledBy="trades-heading">
        <SectionHeader id="trades-heading" eyebrow="Trades we serve" title="Start with your trade" lead="Each playbook covers what we do for that trade, how we work and city pages across both markets." />
        <div className="mt-10 md:mt-14">
          <FeatureGrid
            columns={2}
            items={niches.map((niche) => ({
              eyebrow: `${cities.length} city pages`,
              title: niche.navLabel,
              text: niche.intro,
              href: `/industries/${niche.slug}`,
              linkLabel: `View the ${niche.navLabel.toLowerCase()} playbook`,
            }))}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="goals-heading">
        <SectionHeader id="goals-heading" eyebrow="By goal" title="Already know what you need?" lead="Buyer-language pages for the most common requests." />
        <div className="mt-10">
          <LinkRows columns={2} items={intentPages.map((page) => ({ href: `/industries/${page.slug}`, label: page.navLabel, meta: page.eyebrow, description: page.seoDescription }))} />
        </div>
      </Section>

      <Section tone="green" labelledBy="cities-heading">
        <SectionHeader id="cities-heading" tone="green" eyebrow="City coverage" title={`${cities.length} cities across the UK and USA`} lead="Choose your trade above to see the page for your city." />
        <div className="mt-10">
          <CityChips groups={[{ label: "United Kingdom", cities: uk.map((c) => c.name) }, { label: "United States", cities: usa.map((c) => c.name) }]} />
        </div>
      </Section>

      <AlphaProof />

      <Section tone="mint" labelledBy="trade-cta-heading">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow tone="mint">Other trades</Eyebrow>
            <h2 id="trade-cta-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl">Don&apos;t see your trade yet?</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/83">Tell us your city and service. If you sell local jobs, we can help you win more of them.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href={siteConfig.whatsappHref} variant="green" icon={WhatsappIcon}>WhatsApp us</ButtonLink>
            <ButtonLink href="/pricing" variant="outlineDark">See pricing</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
