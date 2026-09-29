import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon } from "@/components/icons";
import { InlineMarkdown } from "@/components/longform/Markdown";
import { LocalSeoAuditCalculator } from "@/components/blog/LocalSeoAuditCalculator";
import { InteractiveRoadmap } from "@/components/blog/InteractiveRoadmap";
import { ArchitectureVisualizer } from "@/components/blog/ArchitectureVisualizer";
import { KeywordClusterExplorer } from "@/components/blog/KeywordClusterExplorer";
import { CoreWebVitalsMeter } from "@/components/blog/CoreWebVitalsMeter";
import { MythVsRealityCard } from "@/components/blog/MythVsRealityCard";
import { slugify, type ContentBlock } from "@/lib/blog";

const body = "text-[17px] leading-[1.75] text-[#1d1d1b]/80";

/** Renders lib/blog.ts content blocks in the long-form reading style. Headings get ids for the contents list. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="[&>*+*]:mt-6 [&>h2+*]:mt-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} first={i === 0} />
      ))}
    </div>
  );
}

function Block({ block, first }: { block: ContentBlock; first: boolean }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 id={slugify(block.text)} className={`scroll-mt-28 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-.03em] text-[#111] sm:text-[30px] ${first ? "" : "!mt-14 border-t border-black/10 pt-12"}`}>
          {block.text}
        </h2>
      );

    case "paragraph":
      return <p className={body}><InlineMarkdown>{block.text}</InlineMarkdown></p>;

    case "list":
      return (
        <ul className={`space-y-3 ${body}`}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[7px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dceee8] text-[#015f45]" aria-hidden="true"><HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} /></span>
              <span><InlineMarkdown>{item}</InlineMarkdown></span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className={`space-y-3.5 ${body}`}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#015f45] text-xs font-bold text-white" aria-hidden="true">{i + 1}</span>
              <span><InlineMarkdown>{item}</InlineMarkdown></span>
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-[#cbd810] pl-5 text-[19px] font-medium leading-8 tracking-[-.01em] text-[#111]">
          <InlineMarkdown>{block.text}</InlineMarkdown>
        </blockquote>
      );

    case "callout":
      return (
        <aside className="rounded-2xl bg-[#eef6f2] p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">{block.title ?? "Key takeaways"}</p>
          <ul className="mt-4 space-y-2.5 text-[16px] leading-7 text-[#1d1d1b]/85">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[6px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#015f45] text-white" aria-hidden="true"><HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} /></span>
                <span><InlineMarkdown>{item}</InlineMarkdown></span>
              </li>
            ))}
          </ul>
        </aside>
      );

    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" className="aspect-[16/9] w-full rounded-2xl border border-black/10 object-cover" />
          {block.caption && <figcaption className="mt-2.5 text-sm text-black/55">{block.caption}</figcaption>}
        </figure>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-[#f3f1ec]">
                {block.headers.map((header, i) => (
                  <th key={i} scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-[.1em] text-black/60">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-black/10">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-4 py-3 align-top font-semibold text-[#111]"><InlineMarkdown>{cell}</InlineMarkdown></th>
                    ) : (
                      <td key={c} className="px-4 py-3 align-top text-[#1d1d1b]/80"><InlineMarkdown>{cell}</InlineMarkdown></td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <div className="overflow-hidden rounded-2xl bg-[#0f1f1a]">
          {block.language && <div className="border-b border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/50">{block.language}</div>}
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-[#e8f3ee]">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "cta":
      return (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-[#015f45] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[-.02em]">{block.title}</p>
            {block.text && <p className="mt-1 text-sm leading-6 text-white/75">{block.text}</p>}
          </div>
          <Link href={block.href} className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#cbd810] px-5 text-sm font-bold text-[#111] transition-colors hover:bg-[#b8c50e]">
            {block.label}
            <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      );

    case "dialogue":
      return (
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f7f5ef]">
          {block.title && (
            <div className="border-b border-black/10 bg-white px-5 py-3.5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">Conversation</p>
              <p className="mt-1 text-base font-semibold">{block.title}</p>
            </div>
          )}
          <div className="space-y-4 p-4 sm:p-5">
            {block.turns.map((turn, i) => {
              const us = turn.speaker === "us";
              return (
                <div key={i} className={`flex ${us ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[85%] ${us ? "rounded-br-md bg-[#015f45] text-white" : "rounded-bl-md border border-black/10 bg-white text-[#111]"}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${us ? "text-[#eaf25a]" : "text-black/50"}`}>
                      {turn.name} <span className="font-medium opacity-80">· {us ? "Jadeed" : "Client"}</span>
                    </p>
                    {turn.text.split("\n\n").map((para, pi) => (
                      <p key={pi} className={`mt-1.5 whitespace-pre-line text-[15px] leading-relaxed ${us ? "text-white [&_a]:text-[#eaf25a]" : "text-black/75"}`}>
                        <InlineMarkdown>{para}</InlineMarkdown>
                      </p>
                    ))}
                    {turn.bullets && turn.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {turn.bullets.map((item, bi) => (
                          <li key={bi} className={`flex gap-2 text-sm leading-snug ${us ? "text-white/95" : "text-black/75"}`}>
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${us ? "bg-[#cbd810]" : "bg-[#015f45]"}`} aria-hidden="true" />
                            <span><InlineMarkdown>{item}</InlineMarkdown></span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "seo-audit":
      return <LocalSeoAuditCalculator />;
    case "interactive-roadmap":
      return <InteractiveRoadmap />;
    case "architecture-visualizer":
      return <ArchitectureVisualizer />;
    case "keyword-cluster-explorer":
      return <KeywordClusterExplorer />;
    case "core-web-vitals-meter":
      return <CoreWebVitalsMeter />;
    case "myth-vs-reality":
      return <MythVsRealityCard />;
    default:
      return null;
  }
}
