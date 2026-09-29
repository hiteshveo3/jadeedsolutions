import type { Metadata } from "next";
import { TargetIcon, TagIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { ButtonLink, FeatureGrid, LinkRows, PageHero, Section, SectionHeader } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Free Tools — Growth Check & Pricing Calculator",
  description:
    "Free tools for local service businesses: the 2-minute Growth Check (website, Google, app, ads) and the 10% partnership pricing calculator.",
  alternates: { canonical: `${siteConfig.url}/tools` },
};

export default function ToolsHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title={<>Free tools to<span className="block text-[#eaf25a]">plan your growth.</span></>}
        lead="Quick, no-signup tools for local service owners. Find where to focus first, then see what a 10% partnership would actually cost you."
        actions={
          <>
            <ButtonLink href="/tools/growth-check">Start the Growth Check</ButtonLink>
            <ButtonLink href="/pricing#partnership-calculator" variant="outlineLight">Open the calculator</ButtonLink>
          </>
        }
      />

      <Section tone="cream" labelledBy="tools-heading">
        <SectionHeader id="tools-heading" eyebrow="Start here" title="Pick a tool" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid
            columns={2}
            items={[
              { icon: TargetIcon, eyebrow: "2 minutes", title: "Growth Check", text: "Five questions that point you to the right focus: website, Google visibility, an app, ads — or the 10% Growth Partnership.", href: "/tools/growth-check", linkLabel: "Start the check" },
              { icon: TagIcon, eyebrow: "Calculator", title: "10% pricing calculator", text: "Enter your bookings and average job value to see what you keep and what our fee would be.", href: "/pricing#partnership-calculator", linkLabel: "Open the calculator" },
            ]}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="resources-heading">
        <SectionHeader id="resources-heading" eyebrow="Keep reading" title="More free resources" />
        <div className="mt-10">
          <LinkRows
            columns={3}
            items={[
              { href: "/guides", label: "Growth guides", description: "Plain-English playbooks for local service owners." },
              { href: "/compare", label: "Compare Jadeed", description: "How we stack up against freelancers, DIY and agencies." },
              { href: "/blog", label: "Blog", description: "SEO, websites and growth strategy articles." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
