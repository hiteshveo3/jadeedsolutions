import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import { siteConfig } from "@/lib/site";
import { ButtonLink, FeatureGrid, LinkRows, PageHero, Section, SectionHeader } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Guides — Grow Local Service Businesses Online",
  description:
    "Practical guides for plumbers, cleaners and local services: websites, Google growth, apps, ads and when a 10% partnership fits.",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function GuidesHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title={<>Growth guides for<span className="block text-[#eaf25a]">local service owners.</span></>}
        lead="Plain-English playbooks covering your website, Google visibility, apps and ads — and how to choose the right package for your stage."
        actions={<ButtonLink href="/tools/growth-check">Take the free Growth Check</ButtonLink>}
      />

      <Section tone="cream" labelledBy="guides-heading">
        <SectionHeader id="guides-heading" eyebrow="All guides" title="Start with the one that fits" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid
            numbered
            items={guides.map((guide) => ({
              eyebrow: guide.eyebrow,
              title: guide.title,
              text: guide.intro,
              href: `/guides/${guide.slug}`,
              linkLabel: "Read the guide",
            }))}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="more-heading">
        <SectionHeader id="more-heading" eyebrow="Keep going" title="More ways to plan your growth" />
        <div className="mt-10">
          <LinkRows
            columns={3}
            items={[
              { href: "/blog", label: "Blog", description: "In-depth SEO, website and growth articles." },
              { href: "/industries", label: "Industries", description: "Playbooks and city pages for your trade." },
              { href: "/pricing", label: "Pricing", description: "Fixed packages or 10% of bookings." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
