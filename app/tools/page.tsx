import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Free Tools — Growth Check & Pricing Calculator",
  description:
    "Free tools for local service businesses: Growth Check (website, Google, app, ads) and the 10% partnership pricing calculator.",
};

const tools = [
  {
    href: "/tools/growth-check",
    title: "Growth Check",
    text: "5 questions → recommended focus across website, SEO, app, ads or 10% partnership.",
  },
  {
    href: "/pricing#partnership-calculator",
    title: "10% pricing calculator",
    text: "Visualise bookings × job value → what you keep vs our fee.",
  },
];

export default function ToolsHubPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pb-16 pt-16">
        <HeroBackground />
        <div className="container relative z-10 max-w-3xl">
          <Reveal>
            <span className="eyebrow">Tools</span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">
              Free tools to plan your growth
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Built for local service owners — covering our full stack, not just
              one service.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading eyebrow="Start here" title="Pick a tool" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-2xl border border-slate-200 bg-white p-7"
              >
                <h2 className="font-display text-xl font-semibold text-ink group-hover:text-brand-500">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{t.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                  Open
                  <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
