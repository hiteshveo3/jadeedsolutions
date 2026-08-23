import type { Metadata } from "next";
import Link from "next/link";
import {
  HugeiconsIcon,
  TargetIcon,
  HeartIcon,
  ZapIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsCounter } from "@/components/StatsCounter";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { LinkButton } from "@/components/Button";
import { stats, siteConfig } from "@/lib/site";
import { getAuthor } from "@/lib/authors";

export const metadata: Metadata = {
  title: "About — Growth Partner for UK & USA Local Services",
  description: `Jadeed Solutions is a Lahore-based growth partner for local service businesses in the UK, USA and worldwide — SEO, websites, apps and ads on a 10% performance model.`,
};

const values = [
  {
    icon: TargetIcon,
    title: "Conversion first",
    description:
      "Every page and campaign exists to win bookings — not vanity traffic.",
  },
  {
    icon: HeartIcon,
    title: "Honest scale",
    description:
      "Around 10 active clients. We won’t pretend we’re a 200-person agency.",
  },
  {
    icon: ZapIcon,
    title: "Organic by default",
    description:
      "Most clients grow without ads first. If you want paid ads later, you fund the spend.",
  },
  {
    icon: UsersIcon,
    title: "Senior by default",
    description:
      "You work with people who ship the work — not a revolving junior bench.",
  },
];

const team = [
  {
    name: "Sameer Ahmad Basra",
    role: "Founder & CEO",
    initials: "SA",
    photo: "/team/sameer-ahmad-basra.jpg",
    href: "/author/sameer-ahmad-basra",
  },
  { name: "Aqeel Ahmad", role: "Growth Specialist", initials: "AA" },
  { name: "Asad Waqas", role: "Growth Specialist", initials: "AW" },
];

export default function AboutPage() {
  const founder = getAuthor();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow">About us</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              The growth partner for UK &amp; USA local service businesses
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              {siteConfig.name} was founded on a simple belief: digital marketing
              should be accountable. Based in Lahore, we help local service
              businesses grow with SEO, websites, apps — and optional ads — so
              more Google searches become booked jobs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              {founder.name}
            </h2>
            <p className="mt-1 text-sm font-medium text-brand-500">
              {founder.role}
              {founder.location ? ` · ${founder.location}` : ""}
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              {founder.longBio}
            </p>
            {founder.highlights && (
              <ul className="mt-6 space-y-2.5">
                {founder.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={siteConfig.whatsappHref}>WhatsApp</LinkButton>
              <LinkButton
                href={`/author/${founder.slug}`}
                variant="secondary"
              >
                Full profile
                <HugeiconsIcon icon={ArrowRightIcon} size={16} className="ml-1" />
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Our mission"
            title="Make growth predictable for the businesses we serve"
            description="Too many companies pay for marketing they can't measure. We help local service businesses get found on Google, turn website visits into calls, and only charge for results when the partnership model fits."
          />
          <Reveal>
            <div className="rounded-2xl bg-brand-500 p-8 text-white sm:p-10">
              <p className="font-display text-2xl font-medium leading-relaxed">
                &ldquo;We don&rsquo;t sell fluff. We sell bookings — and we back
                it up with Search Console data and clear reporting.&rdquo;
              </p>
              <p className="mt-6 text-sm text-white/80">
                {founder.name}, {founder.role}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StatsCounter
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500 text-white">
                    <HugeiconsIcon icon={v.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Our team"
            title="The specialists behind your growth"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {team.map((member, i) => {
              const card = (
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-7 text-center">
                  {"photo" in member && member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-20 w-20 rounded-full object-cover ring-2 ring-brand-100"
                    />
                  ) : (
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-500 font-display text-2xl font-semibold text-white">
                      {member.initials}
                    </span>
                  )}
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                </div>
              );
              return (
                <Reveal key={member.name} delay={i * 0.08}>
                  {"href" in member && member.href ? (
                    <Link href={member.href} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for more booked jobs?"
        description="WhatsApp or call — tell us your city and what you sell. We'll outline how we'd help you win more work."
      />
    </>
  );
}
