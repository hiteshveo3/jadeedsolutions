import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsappBusinessIcon } from "@/components/icons";
import { getIntentPage, intentPages, type IntentPage } from "@/lib/intent-pages";
import { getNiche, niches, nicheCities, type Niche } from "@/lib/niches";
import { getAuthor } from "@/lib/authors";
import { getService } from "@/lib/services";
import { getGuide, guides } from "@/lib/guides";
import { industryPlaybooks } from "@/lib/industry-playbooks";
import { getIndustry } from "@/lib/industries";
import { LongformMarkdown } from "@/components/longform/Markdown";
import { siteConfig } from "@/lib/site";
import { AlphaProof } from "@/components/site/AlphaProof";
import {
  ButtonLink,
  CheckList,
  Eyebrow,
  FaqSection,
  FeatureGrid,
  LinkRows,
  PageHero,
  Section,
  SectionHeader,
  Steps,
} from "@/components/site/ui";

export function generateStaticParams() {
  const seen = new Set<string>();
  return [...intentPages.map((p) => ({ slug: p.slug })), ...niches.map((n) => ({ slug: n.slug }))].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const entry = getNiche(params.slug) ?? getIntentPage(params.slug);
  if (!entry) return {};
  const url = `${siteConfig.url}/industries/${entry.slug}`;
  return {
    title: entry.seoTitle,
    description: entry.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: entry.seoTitle, description: entry.seoDescription, url },
  };
}

export default async function IndustrySlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const niche = getNiche(params.slug);
  if (niche) return <NicheView niche={niche} />;
  const page = getIntentPage(params.slug);
  if (page) return <IntentView page={page} />;
  notFound();
}

/** Long-form playbook for the industry (Markdown), with an on-page contents list. */
function Playbook({ slug }: { slug: string }) {
  const sections = industryPlaybooks[slug] ?? [];
  if (sections.length === 0) return null;
  const audience = getIndustry(slug)?.audience ?? "your business";
  return (
    <Section tone="white" id="playbook" labelledBy="playbook-heading">
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>The playbook</Eyebrow>
          <h2 id="playbook-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance]">Our playbook for {audience}</h2>
          <nav aria-label="Playbook contents" className="mt-6 hidden lg:block">
            <ol className="border-t border-black/10 text-sm">
              {sections.map((section, index) => (
                <li key={section.title} className="border-b border-black/10">
                  <a href={`#playbook-${index + 1}`} className="block py-3 font-medium text-black/70 transition-colors hover:text-[#015f45]">{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="min-w-0 max-w-[760px]">
          {sections.map((section, index) => (
            <article key={section.title} id={`playbook-${index + 1}`} className="scroll-mt-28 border-b border-black/10 py-10 first:pt-0 last:border-b-0">
              <h3 className="font-sans text-[26px] font-semibold leading-tight tracking-[-.035em] [text-wrap:balance] sm:text-3xl">{section.title}</h3>
              <div className="mt-5"><LongformMarkdown>{section.body}</LongformMarkdown></div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Guide, service and handbook links so every industry page leads somewhere deeper. */
function FurtherReading({ slug, serviceSlug }: { slug: string; serviceSlug: string }) {
  const guide = guides.find((g) => g.relatedIndustry === slug) ?? getGuide("website-seo-app-or-10-percent");
  const service = getService(serviceSlug);
  const items = [
    ...(guide ? [{ href: `/guides/${guide.slug}`, label: guide.title, meta: "Guide" }] : []),
    ...(service ? [{ href: `/services/${service.slug}`, label: service.h1, meta: "Service" }] : []),
    { href: "/profit-share-handbook", label: "Profit-share partnerships: what we need before we take a percentage", meta: "Handbook" },
    { href: "/pricing", label: "Pricing: fixed, tiered or pay per booking", meta: "Pricing" },
  ];
  return (
    <Section tone="white" labelledBy="reading-heading">
      <SectionHeader id="reading-heading" eyebrow="Further reading" title="Go deeper before you decide" />
      <div className="mt-10">
        <LinkRows columns={2} items={items} />
      </div>
    </Section>
  );
}

function CtaBand({ note, serviceSlug, title }: { note: string; serviceSlug: string; title: string }) {
  const service = getService(serviceSlug);
  return (
    <Section tone="mint" labelledBy="industry-cta-heading">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow tone="mint">Free plan</Eyebrow>
          <h2 id="industry-cta-heading" className="mt-3 font-sans text-[32px] font-semibold leading-[1.05] tracking-[-.045em] [text-wrap:balance] sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-7 text-[#063d30]/75">{note}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href={siteConfig.whatsappHref} variant="green" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          {service && <ButtonLink href={`/services/${service.slug}`} variant="outlineDark">{service.title}</ButtonLink>}
        </div>
      </div>
    </Section>
  );
}

function NicheView({ niche }: { niche: Niche }) {
  const author = getAuthor(niche.authorSlug);
  const cityViews = nicheCities(niche);
  const groups = [
    { label: "United Kingdom", list: cityViews.filter((city) => city.country === "UK") },
    { label: "United States", list: cityViews.filter((city) => city.country === "USA") },
  ];
  const reviewed = new Date(niche.reviewedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: niche.navLabel }]}
        eyebrow={`For ${niche.tradePlural}`}
        title={niche.h1}
        lead={niche.intro}
        actions={
          <>
            <ButtonLink href="/contact">Get a free plan</ButtonLink>
            <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          </>
        }
        aside={
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">Why owners trust us</p>
            <CheckList tone="green" items={niche.trustSignals} />
          </div>
        }
      >
        <Link href={`/author/${author.slug}`} className="mt-10 flex w-fit items-center gap-3 border-t border-white/15 pt-6 transition-opacity hover:opacity-85">
          <Image src={author.avatar} alt={author.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <span className="text-sm leading-5">
            <span className="block font-bold">Reviewed by {author.name}</span>
            <span className="block text-white/60">Updated {reviewed}</span>
          </span>
        </Link>
      </PageHero>

      <Section tone="cream" labelledBy="experience-heading">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <SectionHeader id="experience-heading" eyebrow="Why Jadeed" title={`Growth built for ${niche.tradePlural}`} />
          <CheckList items={niche.experience} />
        </div>
      </Section>

      <Section tone="white" labelledBy="expertise-heading">
        <SectionHeader id="expertise-heading" eyebrow="What we do" title={`Everything a ${niche.tradeLabel} business needs online`} />
        <div className="mt-10 md:mt-14">
          <FeatureGrid columns={4} numbered items={niche.expertise} />
        </div>
      </Section>

      <Playbook slug={niche.slug} />

      <Section tone="green" labelledBy="method-heading">
        <SectionHeader id="method-heading" tone="green" eyebrow="Our method" title="How we grow your bookings" />
        <div className="mt-10 md:mt-14">
          <Steps tone="green" steps={niche.methodology} />
        </div>
      </Section>

      <Section tone="cream" labelledBy="fit-heading">
        <SectionHeader id="fit-heading" eyebrow="Is it a fit?" title="Who it's for, and what you get" />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-black/45">Built for</p>
            <CheckList items={niche.whoFor} />
          </div>
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-black/45">Outcomes</p>
            <CheckList items={niche.outcomes} />
          </div>
        </div>
      </Section>

      {niche.relatedCaseStudy === "alpha-movers" && <AlphaProof />}

      <Section tone="white" labelledBy="cities-heading">
        <SectionHeader id="cities-heading" eyebrow="Cities" title={`${niche.navLabel} pages by city`} lead="Pick your city for local search examples and how we'd approach your market." />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[.15em] text-[#015f45]">{group.label}</p>
              <ul className="columns-2 gap-x-6 border-t border-black/10 text-sm sm:columns-3">
                {group.list.map((city) => (
                  <li key={city.slug} className="break-inside-avoid border-b border-black/10">
                    <Link href={`/industries/${niche.slug}/${city.slug}`} className="block py-2.5 font-medium transition-colors hover:text-[#015f45]">{city.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <FaqSection items={niche.faqs} />

      <FurtherReading slug={niche.slug} serviceSlug={niche.relatedService} />

      <CtaBand title={`Get a free plan for your ${niche.tradeLabel} business`} note={niche.ctaNote} serviceSlug={niche.relatedService} />
    </>
  );
}

function IntentView({ page }: { page: IntentPage }) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: page.navLabel }]}
        eyebrow={page.eyebrow}
        title={page.h1}
        lead={page.intro}
        actions={
          <>
            <ButtonLink href="/contact">Get a free plan</ButtonLink>
            <ButtonLink href={siteConfig.whatsappHref} variant="outlineLight" icon={WhatsappBusinessIcon}>WhatsApp us</ButtonLink>
          </>
        }
        aside={
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[.15em] text-[#eaf25a]">What you get</p>
            <CheckList tone="green" items={page.outcomes} />
          </div>
        }
      />

      <Section tone="cream" labelledBy="help-heading">
        <SectionHeader id="help-heading" eyebrow="How we help" title="What we actually do" />
        <div className="mt-10 md:mt-14">
          <FeatureGrid numbered items={page.howWeHelp} />
        </div>
      </Section>

      <Playbook slug={page.slug} />

      <Section tone="cream" labelledBy="who-heading">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <SectionHeader id="who-heading" eyebrow="Who it's for" title="Built for businesses like yours" />
          <CheckList items={page.whoFor} />
        </div>
      </Section>

      {page.relatedCaseStudy === "alpha-movers" && <AlphaProof />}

      <FaqSection items={page.faqs} />

      <FurtherReading slug={page.slug} serviceSlug={page.relatedService} />

      <CtaBand title="Get your free plan" note={page.ctaNote} serviceSlug={page.relatedService} />
    </>
  );
}
