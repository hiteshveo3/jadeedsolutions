import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsIcon,
  TargetIcon,
  HeartIcon,
  ZapIcon,
  UsersIcon,
  LinkedinIcon,
} from "@/components/icons";
import { stats, siteConfig } from "@/lib/site";
import { getAuthor } from "@/lib/authors";
import {
  ButtonLink,
  CheckList,
  Eyebrow,
  FactRows,
  FeatureGrid,
  PageHero,
  Section,
  SectionHeader,
  StatRow,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "About — A Founder-Led Growth Partner for Local Services",
  description:
    "Jadeed Solutions is a founder-led growth partner based in Narowal, Pakistan, helping local service businesses in the UK, USA and worldwide win more bookings with SEO, websites, apps and ads.",
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  { icon: TargetIcon, title: "Conversion first", text: "Every page and campaign exists to win bookings — not vanity traffic." },
  { icon: HeartIcon, title: "Honest scale", text: "Around 10 active clients. We won’t pretend to be a 200-person agency." },
  { icon: ZapIcon, title: "Organic by default", text: "Most clients grow without ads first. If you want paid ads later, you fund the spend." },
  { icon: UsersIcon, title: "Senior by default", text: "You work with the people who ship the work — not a revolving junior bench." },
];

const team = [
  { name: "Sameer Ahmad Basra", role: "Founder & CEO", initials: "SA", photo: "/team/sameer-ahmad-basra.jpg", href: "/sameer-ahmad-basra" },
  { name: "Aqeel Ahmad", role: "Growth Specialist", initials: "AA" },
  { name: "Asad Waqas", role: "Growth Specialist", initials: "AW" },
];

export default function AboutPage() {
  const founder = getAuthor();

  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A small team that measures<span className="text-[#eaf25a]"> success in booked jobs.</span></>}
        lead="Jadeed Solutions was founded in December 2024 in Narowal, Pakistan. We help local service businesses in the UK, USA and beyond win more work from Google — with SEO, websites, apps and optional ads."
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href="/sameer-ahmad-basra" variant="outlineLight">Read the founder story</ButtonLink>
          </>
        }
        aside={
          <FactRows
            title="At a glance"
            rows={[
              { label: "Founded", value: "December 2024" },
              { label: "Based in", value: "Narowal, Pakistan" },
              { label: "Active clients", value: "Around 10" },
              { label: "Google rating", value: "5.0 · 35 reviews" },
              { label: "Markets", value: "UK · US · UAE · PK" },
            ]}
          />
        }
      />

      <Section tone="cream" labelledBy="founder-heading">
        <div className="grid gap-10 md:grid-cols-[.85fr_1.15fr] md:items-center lg:gap-16">
          <div className="-mx-5 -mt-14 md:mx-0 md:mt-0">
            <Image src={founder.avatar} alt={`${founder.name}, founder of Jadeed Solutions`} width={1024} height={1024} sizes="(min-width: 768px) 480px, 100vw" className="aspect-square w-full object-cover md:rounded-[28px]" />
          </div>
          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2 id="founder-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl">{founder.name}</h2>
            <p className="mt-2 font-semibold text-[#015f45]">{founder.role}</p>
            <p className="mt-5 leading-7 text-black/70">{founder.longBio}</p>
            {founder.highlights && (
              <div className="mt-8">
                <CheckList items={founder.highlights} />
              </div>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/sameer-ahmad-basra" variant="green">Read the full story</ButtonLink>
              <ButtonLink href="https://pk.linkedin.com/in/sameer-ahmad-basra" variant="outlineDark" icon={LinkedinIcon}>Connect on LinkedIn</ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="green" labelledBy="mission-heading">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeader
            id="mission-heading"
            tone="green"
            eyebrow="Our mission"
            title="Make growth predictable for the businesses we serve"
          />
          <figure className="border-l-2 border-[#cbd810] pl-6">
            <blockquote className="text-2xl font-medium leading-snug tracking-[-.02em] sm:text-3xl">
              “We don’t sell fluff. We sell bookings — and we back it up with Search Console data and clear reporting.”
            </blockquote>
            <figcaption className="mt-5 text-sm text-white/65">{founder.name}, Founder &amp; CEO</figcaption>
          </figure>
        </div>
        <p className="mt-10 max-w-3xl leading-7 text-white/75">
          Too many companies pay for marketing they can&apos;t measure. We help local service businesses get found on Google, turn website visits into calls, and only charge for results when the partnership model fits.
        </p>
      </Section>

      <Section tone="white" labelledBy="numbers-heading">
        <h2 id="numbers-heading" className="sr-only">Jadeed Solutions in numbers</h2>
        <StatRow items={stats.map((stat) => ({ value: `${stat.value}${stat.suffix}`, label: stat.label }))} />
      </Section>

      <Section tone="cream" labelledBy="values-heading">
        <SectionHeader id="values-heading" eyebrow="Our values" title="What we stand for" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid columns={4} items={values} />
        </div>
      </Section>

      <Section tone="mint" labelledBy="team-heading">
        <SectionHeader id="team-heading" tone="mint" eyebrow="Our team" title="The people behind your growth" />
        <ul className="mt-10 grid border-t border-[#063d30]/15 md:grid-cols-3 md:gap-x-10">
          {team.map((member) => {
            const content = (
              <>
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#015f45] text-lg font-semibold text-[#eaf25a]">{member.initials}</span>
                )}
                <div>
                  <p className="text-lg font-bold">{member.name}</p>
                  <p className="text-sm text-[#063d30]/70">{member.role}</p>
                </div>
              </>
            );
            return (
              <li key={member.name} className="border-b border-[#063d30]/15">
                {member.href ? (
                  <Link href={member.href} className="flex items-center gap-4 py-6 transition-opacity hover:opacity-80">{content}</Link>
                ) : (
                  <div className="flex items-center gap-4 py-6">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-[#063d30]/70">
          <HugeiconsIcon icon={UsersIcon} size={16} className="mr-1.5 inline -translate-y-px" />
          {siteConfig.address}
        </p>
      </Section>
    </>
  );
}
