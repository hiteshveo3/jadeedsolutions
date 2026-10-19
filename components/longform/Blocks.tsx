import Link from "next/link";
import { HugeiconsIcon, ArrowRightIcon, CheckIcon, ClockIcon, SparklesIcon } from "@/components/icons";
import { InlineMarkdown } from "@/components/longform/Markdown";
import { LocalSeoAuditCalculator } from "@/components/blog/LocalSeoAuditCalculator";
import { InteractiveRoadmap } from "@/components/blog/InteractiveRoadmap";
import { ArchitectureVisualizer } from "@/components/blog/ArchitectureVisualizer";
import { KeywordClusterExplorer } from "@/components/blog/KeywordClusterExplorer";
import { CoreWebVitalsMeter } from "@/components/blog/CoreWebVitalsMeter";
import { MythVsRealityCard } from "@/components/blog/MythVsRealityCard";
import { slugify, type ContentBlock } from "@/lib/blog";

const body = "text-[17px] leading-[1.75] text-white/[0.84]";

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
        <h2 id={slugify(block.text)} className={`scroll-mt-28 text-balance text-[26px] font-semibold leading-[1.15] tracking-[-.03em] text-white sm:text-[30px] ${first ? "" : "!mt-14 border-t border-white/[0.08] pt-12"}`}>
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
              <span className="mt-[7px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-[#0B1F12]" aria-hidden="true"><HugeiconsIcon icon={CheckIcon} size={12} strokeWidth={2.6} /></span>
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
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#BEF70A] text-xs font-bold text-[#0B1F12]" aria-hidden="true">{i + 1}</span>
              <span><InlineMarkdown>{item}</InlineMarkdown></span>
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="relative pl-9 before:absolute before:left-0 before:-top-1 before:font-display before:text-[46px] before:leading-none before:text-[#BEF70A] before:content-['“'] py-1 text-[21px] font-medium leading-[1.45] tracking-[-.015em] text-white">
          <InlineMarkdown>{block.text}</InlineMarkdown>
        </blockquote>
      );

    case "callout":
      return (
        <aside className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 sm:p-7">
          <p className="flex items-center gap-2 text-sm font-bold">
            <HugeiconsIcon icon={ClockIcon} size={20} className="text-[#BEF70A]" />
            {block.title && block.title !== "Key takeaways" ? block.title : "In 30 seconds"}
          </p>
          <ol className="mt-5 space-y-4 text-[16px] leading-7 text-white/[0.84]">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-5 shrink-0 text-[26px] font-semibold leading-7 tracking-[-.04em] text-[#BEF70A]" aria-hidden="true">{i + 1}</span>
                <span><InlineMarkdown>{item}</InlineMarkdown></span>
              </li>
            ))}
          </ol>
        </aside>
      );

    case "image":
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} loading="lazy" className="aspect-[16/9] w-full rounded-2xl border border-white/[0.08] object-cover" />
          {block.caption && <figcaption className="mt-2.5 text-sm text-white/63">{block.caption}</figcaption>}
        </figure>
      );

    case "table":
      return (
        <div className="jt-wrap">
          <table className="jt min-w-[520px]">
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i} scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row"><InlineMarkdown>{cell}</InlineMarkdown></th>
                    ) : (
                      <td key={c}><InlineMarkdown>{cell}</InlineMarkdown></td>
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
        <div className="overflow-hidden rounded-2xl bg-white/[0.05]">
          {block.language && <div className="border-b border-white/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/50">{block.language}</div>}
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-[#e8f3ee]">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "cta":
      return (
        <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.06] p-6 text-white sm:p-7">
          <p className="hand text-[24px] leading-none text-[#BEF70A]">psst — we can do this for you</p>
          <div className="mt-4 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex gap-4">
              <HugeiconsIcon icon={SparklesIcon} size={36} className="text-[#BEF70A]" />
              <div>
                <p className="text-lg font-semibold tracking-[-.02em]">{block.title}</p>
                {block.text && <p className="mt-1 text-sm leading-6 text-white/75">{block.text}</p>}
              </div>
            </div>
            <Link href={block.href} className="group inline-flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
              {block.label}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0B1F12] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45"><HugeiconsIcon icon={ArrowRightIcon} size={16} /></span>
            </Link>
          </div>
        </div>
      );

    case "dialogue":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05]">
          {block.title && (
            <div className="border-b border-white/[0.08] bg-transparent px-5 py-3.5">
              <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">Conversation</p>
              <p className="mt-1 text-base font-semibold">{block.title}</p>
            </div>
          )}
          <div className="space-y-4 p-4 sm:p-5">
            {block.turns.map((turn, i) => {
              const us = turn.speaker === "us";
              return (
                <div key={i} className={`flex ${us ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[85%] ${us ? "rounded-br-md bg-white/[0.05] text-white" : "rounded-bl-md border border-white/[0.08] bg-white/[0.05] text-white"}`}>
                    <p className={`text-[11px] font-bold uppercase tracking-wider ${us ? "text-[#BEF70A]" : "text-white/58"}`}>
                      {turn.name} <span className="font-medium opacity-80">· {us ? "Jadeed" : "Client"}</span>
                    </p>
                    {turn.text.split("\n\n").map((para, pi) => (
                      <p key={pi} className={`mt-1.5 whitespace-pre-line text-[15px] leading-relaxed ${us ? "text-white [&_a]:text-[#BEF70A]" : "text-white/83"}`}>
                        <InlineMarkdown>{para}</InlineMarkdown>
                      </p>
                    ))}
                    {turn.bullets && turn.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {turn.bullets.map((item, bi) => (
                          <li key={bi} className={`flex gap-2 text-sm leading-snug ${us ? "text-white/95" : "text-white/83"}`}>
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${us ? "bg-[#BEF70A]" : "bg-white/40"}`} aria-hidden="true" />
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
