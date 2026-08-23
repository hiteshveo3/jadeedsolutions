import type { Metadata } from "next";
import Link from "next/link";
import {
  HugeiconsIcon,
  HandshakeIcon,
  RocketIcon,
  TrendingUpIcon,
  TagIcon,
  CheckIcon,
  type IconSvgElement,
} from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works — SEO & Growth for Local Services",
  description:
    "How Jadeed Solutions grows local service businesses: discovery, build, SEO + AI-ready content, then 10% of bookings or fixed SEO from £100/mo. 6-month minimum.",
};

const steps: { icon: IconSvgElement; title: string; text: string }[] = [
  {
    icon: HandshakeIcon,
    title: "1. Free discovery",
    text: "WhatsApp or call us. We learn your cities, services and goals — then outline a clear plan. Demos available if you want to see how we work.",
  },
  {
    icon: RocketIcon,
    title: "2. Build the foundations",
    text: "Website and SEO setup (and apps if you need them). Mobile-first, conversion-first — so visitors call and book.",
  },
  {
    icon: TrendingUpIcon,
    title: "3. Grow visibility",
    text: "We focus on Google search and your website first — most clients never need ads. If you want paid ads later, you fund the spend; we manage campaigns with no extra management fee.",
  },
  {
    icon: TagIcon,
    title: "4. You pay fairly",
    text: "Growth Partnership: 10% of bookings we generate. Or fixed SEO from £100/mo. No setup fee. 6-month minimum — enough time for results to compound.",
  },
];

const vsAlternatives: { title: string; points: string[] }[] = [
  {
    title: "vs Fiverr / Upwork freelancers",
    points: [
      "One accountable team — not random gigs that disappear after delivery",
      "Built for bookings, not generic “SEO packages”",
      "Website, SEO and optional app under one roof — 10% model available",
    ],
  },
  {
    title: "vs Hostinger / DIY website builders",
    points: [
      "Templates don’t rank or convert by themselves — we build for Google + calls",
      "Ongoing SEO and reporting, not a one-click theme",
      "City pages and content for the markets you actually serve",
    ],
  },
  {
    title: "vs big agencies & “Google Ads only” shops",
    points: [
      "We tie work to booked jobs — not vanity metrics or endless retainers",
      "Most clients grow on Google first — ads only if you ask",
      "Lean remote team keeps pricing fair; 10% partnership aligns our incentives with yours",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow">How it works</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Simple process. Conversion first.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Friendly, clear communication — but every page and campaign is
              built to win bookings. Mobile-first sites, Google visibility and
              a website that turns searches into calls. Based in Lahore, serving
              UK &amp; USA local services.
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={siteConfig.whatsappHref} size="lg">
                WhatsApp us
              </LinkButton>
              <LinkButton
                href={`tel:${siteConfig.phoneHref}`}
                variant="secondary"
                size="lg"
              >
                Call {siteConfig.phone}
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="The process"
            title="From first chat to booked jobs"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white">
                    <HugeiconsIcon icon={s.icon} size={24} />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why buy from us"
            title="Jadeed vs the usual alternatives"
            description="What you get when you work with us instead of the usual alternatives."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {vsAlternatives.map((block, i) => (
              <Reveal key={block.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {block.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {block.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <HugeiconsIcon
                          icon={CheckIcon}
                          size={16}
                          className="mt-0.5 shrink-0 text-brand-500"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            See{" "}
            <Link href="/pricing" className="font-semibold text-brand-500">
              pricing
            </Link>{" "}
            or browse{" "}
            <Link href="/industries" className="font-semibold text-brand-500">
              industries
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to start?"
        description="No setup fee. 6-month minimum. WhatsApp or call — forms open WhatsApp with your message ready."
      />
    </>
  );
}
