import type { Metadata } from "next";
import Link from "next/link";
import { HugeiconsIcon, TagIcon, HandshakeIcon } from "@/components/icons";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import {
  ButtonLink,
  CheckList,
  FactRows,
  FaqSection,
  FeatureGrid,
  JsonLd,
  PageHero,
  Section,
  SectionHeader,
  Steps,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Services — Local SEO, Websites, Apps & Google Ads",
  description:
    "Local SEO from £100/mo, websites from £199, custom apps and Google Ads — built as one booking system for UK & USA local service businesses, or run on 10% of bookings.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

const flow = [
  { title: "Get found", text: "Local SEO and your Google Business Profile put you in front of people already searching for your service in your area." },
  { title: "Turn visits into enquiries", text: "A fast, mobile-first website with clear services, real proof and one-tap call or WhatsApp buttons." },
  { title: "Add demand when you need it", text: "Google Ads fill quiet weeks while organic visibility compounds. You fund the ad spend; we manage the campaigns." },
  { title: "Keep customers coming back", text: "Apps and simple automation for bookings, reminders and repeat work — only when your operation actually needs it." },
];

const faqs = [
  { question: "Can I buy just one service?", answer: "Yes. SEO, websites, apps and Google Ads are all sold as separate packages. You only combine them if it makes sense for your business." },
  { question: "What does the 10% Growth Partnership include?", answer: "Website, SEO and campaign management, typically paid as 10% of the bookings our work generates. You fund any ad spend directly. It runs on a 12–24 month term and starts with a short paid audit to set the baseline." },
  { question: "How quickly will I see results?", answer: "Ads can bring enquiries within days and websites launch in 1–3 weeks. SEO usually shows meaningful movement in 3–6 months, which is why SEO plans have a 6-month minimum." },
  { question: "Do you work outside the UK and USA?", answer: "Yes. Most clients are in the UK and USA, and we also work with businesses in the UAE, Pakistan and other markets — all delivered remotely." },
];

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Jadeed Solutions services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Services"
        title={<>Four services.<span className="block text-[#eaf25a]">One system for booked jobs.</span></>}
        lead="Local SEO, conversion websites, mobile apps and Google Ads for local service businesses. Buy one on its own, or run them together on a 10% of bookings partnership."
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href="/pricing" variant="outlineLight">See pricing</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="Starting prices"
            rows={[
              ...services.map((service) => ({ label: service.title, value: service.atAGlance[0]?.value ?? service.priceLabel })),
              { label: "Growth Partnership", value: "10% of bookings" },
            ]}
          />
        }
      />

      <Section tone="cream" labelledBy="services-heading">
        <SectionHeader
          id="services-heading"
          eyebrow="What we do"
          title="Pick one service, or connect all four."
          lead="Every service is built around the same goal: more calls, quote requests and booked jobs from people already looking for what you do."
        />
        <div className="mt-10 border-t border-black/10 md:mt-14">
          {services.map((service, index) => (
            <article key={service.slug} className="grid gap-8 border-b border-black/10 py-10 md:py-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f1ed] text-[#015f45]">
                    <HugeiconsIcon icon={service.icon} size={24} />
                  </span>
                  <span className="text-sm font-bold text-black/35">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-6 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">{service.category}</p>
                <h3 className="mt-2 font-sans text-[28px] font-semibold leading-[1.05] tracking-[-.04em] sm:text-4xl">
                  <Link href={`/services/${service.slug}`} className="transition-colors hover:text-[#015f45]">{service.title}</Link>
                </h3>
                <p className="mt-4 max-w-md leading-7 text-black/65">{service.description}</p>
                <p className="mt-5 text-sm font-bold text-[#015f45]">{service.priceLabel}</p>
                <div className="mt-7">
                  <ButtonLink href={`/services/${service.slug}`} variant="green">See the full service</ButtonLink>
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-black/45">What&apos;s included</p>
                <CheckList items={service.included.slice(0, 6)} columns={2} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="green" labelledBy="flow-heading">
        <SectionHeader
          id="flow-heading"
          tone="green"
          eyebrow="One connected system"
          title="How the services work together"
          lead="Standalone tactics produce disconnected results. Connected, each part makes the next one work harder."
        />
        <div className="mt-10 md:mt-14">
          <Steps steps={flow} tone="green" />
        </div>
      </Section>

      <AlphaProof />

      <Section tone="mint" labelledBy="pricing-heading">
        <SectionHeader
          id="pricing-heading"
          tone="mint"
          eyebrow="Pricing"
          title="Two ways to pay"
          lead="Choose a clear fixed price, or tie our fee to the bookings we generate."
        />
        <div className="mt-10">
          <FeatureGrid
            tone="mint"
            columns={2}
            items={[
              { icon: TagIcon, title: "Fixed packages", text: "SEO from £100/month, websites from £199 one-time, apps and ads quoted up front. Clear scope, clear price.", href: "/pricing", linkLabel: "See pricing" },
              { icon: HandshakeIcon, title: "Growth Partnership", text: "Website, SEO and ad management on typically 10% of the bookings we generate, over a 12–24 month term.", href: "/pricing#partnership-calculator", linkLabel: "Try the calculator" },
            ]}
          />
        </div>
      </Section>

      <FaqSection items={faqs} />
    </>
  );
}
