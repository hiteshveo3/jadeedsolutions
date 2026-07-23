import type { Metadata } from "next";
import { HugeiconsIcon, TargetIcon, HeartIcon, ZapIcon, UsersIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { StatsCounter } from "@/components/StatsCounter";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { HeroBackground } from "@/components/HeroBackground";
import { stats, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — a growth partner for local service businesses in the UK, USA and worldwide, based in Lahore, Pakistan.`,
};

const values = [
  {
    icon: TargetIcon,
    title: "Results-obsessed",
    description:
      "We measure our success by yours. Every decision is tied to real business outcomes.",
  },
  {
    icon: HeartIcon,
    title: "Genuinely invested",
    description:
      "We treat your business like our own — honest advice, no fluff, real partnership.",
  },
  {
    icon: ZapIcon,
    title: "Fast & focused",
    description:
      "We move quickly, ship often, and stay laser-focused on what actually drives growth.",
  },
  {
    icon: UsersIcon,
    title: "Senior by default",
    description:
      "Experienced specialists run your account — never handed off to juniors.",
  },
];

const team = [
  {
    name: "Sameer Ahmad Basra",
    role: "Founder & CEO",
    initials: "SA",
    photo: "/team/sameer-ahmad-basra.jpg",
  },
  { name: "Aqeel Ahmad", role: "Growth Specialist", initials: "AA" },
  { name: "Asad Waqas", role: "Growth Specialist", initials: "AW" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal className="flex flex-col gap-5">
            <span className="eyebrow">About us</span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              We&rsquo;re a growth partner, not just an agency
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              {siteConfig.name} was founded on a simple belief: digital marketing
              should be accountable. Based in Lahore, we help local service
              businesses in the UK, USA and worldwide grow with SEO, websites,
              apps and paid ads.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Our mission"
            title="Make growth predictable for the businesses we serve"
            description="Too many companies waste money on marketing that can't be measured. We exist to change that — combining strategy, creativity, and engineering to turn digital channels into reliable revenue."
          />
          <Reveal>
            <div className="rounded-2xl bg-brand-500 p-8 text-white sm:p-10">
              <p className="font-display text-2xl font-medium leading-relaxed">
                &ldquo;We don&rsquo;t sell services. We sell growth — and we back it
                up with data, transparency, and relentless execution.&rdquo;
              </p>
              <p className="mt-6 text-sm text-white/80">
                {team[0].name}, {team[0].role}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
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

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 transition-colors hover:border-transparent hover:bg-brand-50">
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

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our team"
            title="The specialists behind your growth"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center transition-colors hover:border-transparent hover:bg-brand-50">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to work with us?"
        description="We'd love to hear about your goals. Let's start a conversation."
        primaryLabel="Get in touch"
      />
    </>
  );
}
