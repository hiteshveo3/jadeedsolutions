import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { getCaseStudy } from "@/lib/case-studies";
import { Section, StatRow, ButtonLink } from "./ui";

export function JustShineProof() {
  const study = getCaseStudy("just-shine");
  if (!study) return null;
  return <Section tone="green" labelledBy="shine-proof-heading">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div><p className="text-sm font-bold text-[#BEF70A]">Just Shine · Abu Dhabi</p><h2 id="shine-proof-heading" className="mt-4 text-3xl font-semibold sm:text-4xl">A cleaning website with measurable search growth.</h2><p className="mt-5 leading-7 text-white/75">370 organic clicks and 22.3K impressions over three months. Search Console captured 4 October 2026; website, SEO and social delivered together.</p><div className="mt-7"><ButtonLink href="/case-studies/just-shine" variant="white">See the cleaning case study</ButtonLink></div></div>
      <StatRow items={study.metrics.slice(0, 4)} columns={2} />
    </div>
  </Section>;
}

export function ClientEvidence({ study }: { study: CaseStudy }) {
  return <>
    <Section tone="deep" labelledBy="client-results-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-[#BEF70A]">{study.location} · SEO & website</p>
      <h1 id="client-results-heading" className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{study.client}: growth you can inspect.</h1>
      <p className="mt-6 max-w-3xl leading-7 text-white/75">{study.summary}</p>
      <p className="mt-4 text-sm text-white/60">Search Console screenshots captured 4 October 2026. Each reporting window is shown separately; clicks and impressions measure search activity.</p>
      <div className="mt-10"><StatRow items={study.metrics} columns={3} tone="deep" /></div>
      <div className="mt-8 flex flex-wrap gap-4"><ButtonLink href="/contact">Get a growth plan</ButtonLink><a href={study.website} target="_blank" rel="noreferrer" className="py-3 font-bold text-[#BEF70A]">Visit {study.client} ↗</a></div>
    </Section>
    <Section tone="green" labelledBy="client-evidence-heading">
      <h2 id="client-evidence-heading" className="text-3xl font-semibold">Search results and the website behind them</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">{study.images.filter(i => !i.placeholder).map(i=><figure key={i.src} className="min-w-0"><a href={i.src} target="_blank" rel="noreferrer" aria-label={`Open full-size: ${i.alt}`}><Image src={i.src} alt={i.alt} width={1600} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full rounded-xl" /></a><figcaption className="mt-3 text-sm leading-6 text-white/70">{i.caption}</figcaption></figure>)}</div>
      <Link href="/portfolio" className="mt-10 inline-block font-bold text-[#BEF70A]">All client results →</Link>
    </Section>
  </>;
}
