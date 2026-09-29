import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HugeiconsIcon, CloseIcon, WhatsappBusinessIcon } from "@/components/icons";
import { comparisons, getComparison } from "@/lib/comparisons";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import {
  ButtonLink,
  CheckList,
  FaqSection,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
} from "@/components/site/ui";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getComparison(params.slug);
  if (!page) return {};
  const url = `${siteConfig.url}/compare/${page.slug}`;
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: page.seoTitle, description: page.seoDescription, url },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const page = getComparison(params.slug);
  if (!page) notFound();

  const others = comparisons.filter((c) => c.slug !== page.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Compare", href: "/compare" }, { label: page.navLabel }]}
        eyebrow={`Jadeed ${page.navLabel}`}
        title={page.h1}
        lead={page.intro}
        actions={
          <>
            <ButtonLink href="/contact">Get a free growth plan</ButtonLink>
            <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          </>
        }
      />

      <Section tone="cream" labelledBy="difference-heading">
        <SectionHeader id="difference-heading" eyebrow="The difference" title="What you get — and what you miss" />
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 text-xl font-semibold tracking-[-.03em]">With Jadeed Solutions</p>
            <CheckList items={page.youGet} />
          </div>
          <div>
            <p className="mb-4 text-xl font-semibold tracking-[-.03em]">With {page.competitor}</p>
            <ul className="border-t border-black/10">
              {page.theyMiss.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-black/10 py-4 leading-6 text-black/70">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-black/10 text-black/60">
                    <HugeiconsIcon icon={CloseIcon} size={12} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="green" labelledBy="why-heading">
        <SectionHeader id="why-heading" tone="green" eyebrow="Why Jadeed" title="Why local businesses choose us" />
        <div className="mt-10">
          <CheckList tone="green" columns={2} items={page.whyJadeed} />
        </div>
      </Section>

      <AlphaProof />

      <FaqSection items={page.faqs} />

      <Section tone="mint" labelledBy="other-comparisons-heading">
        <SectionHeader id="other-comparisons-heading" tone="mint" eyebrow="More comparisons" title="Still weighing your options?" />
        <div className="mt-10">
          <LinkRows tone="mint" columns={3} items={others.map((other) => ({ href: `/compare/${other.slug}`, label: `Jadeed ${other.navLabel}`, description: other.competitor }))} />
        </div>
      </Section>
    </>
  );
}
