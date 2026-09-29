import type { Metadata } from "next";
import { GrowthCheck } from "@/components/tools/GrowthCheck";
import { siteConfig } from "@/lib/site";
import { LinkRows, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Free Growth Check — Website, Google, App & 10% Partnership",
  description:
    "Free 5-question Growth Check for local service businesses. See whether you need a website, SEO, an app, ads — or Jadeed’s 10% Growth Partnership.",
  alternates: { canonical: `${siteConfig.url}/tools/growth-check` },
};

export default function GrowthCheckPage() {
  return (
    <>
      <PageHero
        compact
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Growth Check" }]}
        eyebrow="Free tool · 2 minutes"
        title="Growth Check"
        lead="Five quick questions. Get a recommended focus across your website, Google visibility, apps, ads or the 10% Growth Partnership."
      />

      <Section tone="cream" narrow labelledBy="growth-check">
        <h2 id="growth-check" className="sr-only">Growth Check questions</h2>
        <GrowthCheck />
        <div className="mt-12">
          <LinkRows
            items={[
              { href: "/pricing#partnership-calculator", label: "10% pricing calculator", description: "See what you keep versus our fee." },
              { href: "/guides", label: "Growth guides", description: "Website, SEO, app or 10% — how to choose." },
              { href: "/compare", label: "Compare Jadeed", description: "Us vs freelancers, DIY builders and agencies." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
