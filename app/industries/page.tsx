import type { Metadata } from "next";
import { WhatsappBusinessIcon } from "@/components/icons";
import { niches } from "@/lib/niches";
import { intentPages } from "@/lib/intent-pages";
import { citiesByCountry, cities } from "@/lib/cities";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
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
    "SEO, websites and apps for plumbers, movers, cleaners and other local service businesses across 100 UK & USA cities. From £100/mo or 10% of bookings.",
  alternates: { canonical: `${siteConfig.url}/industries` },
};

export default function IndustriesHubPage() {
  const uk = citiesByCountry("UK");
  const usa = citiesByCountry("USA");

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for local<span className="block text-[#eaf25a]">service businesses.</span></>}
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
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          {[
            { label: "United Kingdom", list: uk },
            { label: "United States", list: usa },
          ].map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">{group.label}</p>
              <ul className="columns-2 gap-x-6 border-t border-white/15 text-sm text-white/80 sm:columns-3">
                {group.list.map((city) => (
                  <li key={city.slug} className="break-inside-avoid border-b border-white/10 py-2.5">{city.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <AlphaProof />

      <Section tone="mint" labelledBy="trade-cta-heading">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow tone="mint">Other trades</Eyebrow>
            <h2 id="trade-cta-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl">Don&apos;t see your trade yet?</h2>
            <p className="mt-5 max-w-xl leading-7 text-[#063d30]/75">Tell us your city and service. If you sell local jobs, we can help you win more of them.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href={siteConfig.whatsappHref} variant="green" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
            <ButtonLink href="/pricing" variant="outlineDark">See pricing</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
