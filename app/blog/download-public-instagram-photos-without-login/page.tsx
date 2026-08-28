"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articlePart1, articleFaqs, articlePart2 } from "./articleContent";
import {
  HugeiconsIcon,
  CheckIcon,
  CopyIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  ZapIcon,
  SparklesIcon,
  LayersIcon,
} from "@/components/icons";

const SlidingArrow = ({ colorClass = "text-white" }) => (
  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1" aria-hidden="true">
    <svg className={"absolute w-4 h-4 " + colorClass + " -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
    <svg className={"absolute w-4 h-4 " + colorClass + " translate-x-0 group-hover:translate-x-full transition-transform duration-200 ease-in-out"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  </div>
);

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(index === 0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(index === 0 ? undefined : 0);

  useEffect(() => {
    if (isOpen) {
      const bounds = contentRef.current?.getBoundingClientRect();
      setHeight(bounds?.height);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <div className="border-b border-black/[0.08] overflow-hidden bg-transparent">
      <button 
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 text-left flex items-center justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015f45] rounded-md"
      >
        <h3 className="text-base md:text-lg font-semibold text-[#151515] group-hover:text-[#015f45] transition-colors pr-4">
          {question}
        </h3>
        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 ml-2 group-hover:border-[#015f45] group-hover:bg-[#EFF6F2] transition-colors">
          <HugeiconsIcon
            icon={ArrowDownIcon}
            size={14}
            className={`text-black/60 group-hover:text-[#015f45] transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
          />
        </div>
      </button>
      <div 
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height }}
      >
        <div ref={contentRef} className="pb-6 pt-1">
          <p className="text-sm md:text-base text-black/70 leading-relaxed font-normal">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const VisualCard = ({
  tag,
  title,
  subtitle,
  children,
}: {
  tag: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div className="my-10 bg-white border border-black/[0.08] rounded-2xl p-6 md:p-8 shadow-xs not-prose">
    <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.06]">
      <span className="text-xs font-bold uppercase tracking-wider text-[#015f45] bg-[#EFF6F2] px-3 py-1 rounded-md">
        {tag}
      </span>
      <span className="text-xs text-black/50 font-mono font-medium">Architecture Visual</span>
    </div>
    <h4 className="text-lg md:text-xl font-bold text-[#151515] mb-2">{title}</h4>
    {subtitle && <p className="text-sm text-black/65 mb-6 font-normal leading-relaxed">{subtitle}</p>}
    <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-xl p-5 md:p-6 overflow-hidden">
      {children}
    </div>
  </div>
);

const CodeBlock = ({ language, code }: { language?: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-black/[0.08] bg-[#111614] text-white not-prose shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a211e] border-b border-white/[0.08] text-xs text-white/60 font-mono">
        <span>{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#015f45] px-2 py-0.5 rounded"
        >
          <HugeiconsIcon icon={copied ? CheckIcon : CopyIcon} size={13} aria-hidden="true" />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-[#c3e6cd]">
        <pre>{code}</pre>
      </div>
    </div>
  );
};

const TOC_ITEMS = [
  { id: "why-this-happens", label: "1. Why This Problem Happens" },
  { id: "public-vs-rights", label: "2. Copyright & Rights to Reuse" },
  { id: "bulk-vs-manual", label: "3. Bulk Downloading Efficiency" },
  { id: "tool-instaloader", label: "4. The Tool: Instaloader" },
  { id: "installing-python", label: "5. Installing Python on Windows" },
  { id: "executing-download", label: "6. Anonymous Bulk Download" },
  { id: "folder-structure", label: "7. Target Folder Architecture" },
  { id: "http-400-error", label: "9. Fixing Business Profile HTTP 400" },
  { id: "image-inventory", label: "13. Building the Image Inventory" },
  { id: "ai-coding-agents", label: "14. AI Agent Orchestration" },
  { id: "webp-conversion", label: "15. Batch WebP/AVIF Conversion" },
  { id: "image-seo-rules", label: "16. Authentic Descriptive Alt Text" },
  { id: "manifest-pattern", label: "21. Media Manifest Architecture" },
  { id: "full-case-study", label: "24. 800-Photo Real Project Walkthrough" },
  { id: "faq", label: "34. Frequently Asked Questions" },
];

export default function InstagramDownloadBlogPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#151515] antialiased">
      
      {/* Top Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#015F45] z-50 transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      {/* ARTICLE HERO / HEADER */}
      <section className="relative w-full pt-[140px] md:pt-[160px] pb-16 md:pb-20 px-6 bg-white border-b border-black/[0.08]">
        <div className="max-w-[900px] mx-auto text-left">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-black/50 mb-6 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#015f45] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#015f45] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-black/80 truncate max-w-[280px]">Bulk Download Instagram Images</span>
          </nav>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EFF6F2] border border-[#015f45]/20 text-[#015f45] text-xs font-bold px-3.5 py-1.5 rounded-lg uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#015f45]" aria-hidden="true" />
            <span>Development & SEO Workflow</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-semibold text-[#151515] tracking-tight leading-[1.18] mb-6">
            How to Bulk Download Public Instagram Photos Without Login — And Turn Them Into an SEO-Ready Website Image Library
          </h1>

          <p className="text-base md:text-lg text-black/75 font-normal leading-relaxed mb-8 max-w-[800px]">
            A step-by-step technical guide to retrieving publicly accessible Instagram media in bulk, organizing it with AI agents, converting to modern WebP, and preparing it for image SEO.
          </p>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-black/[0.08] text-xs md:text-sm text-black/65 font-medium">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#015f45] text-white flex items-center justify-center font-bold text-xs">
                SB
              </div>
              <div>
                <span className="text-black font-semibold block">Sameer Ahmad Basra</span>
                <span className="text-xs text-black/50">Founder, Jadeed Solutions</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon icon={CalendarIcon} size={15} aria-hidden="true" />
              <span>Aug 28, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon icon={ClockIcon} size={15} aria-hidden="true" />
              <span>20 min read</span>
            </div>
          </div>

        </div>
      </section>

      {/* ARTICLE BODY + TOC LAYOUT */}
      <section className="max-w-[1240px] mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sticky Table of Contents (Desktop Sidebar) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white border border-black/[0.08] rounded-2xl p-6 shadow-xs max-h-[80vh] overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#015f45] mb-4">
              Article Contents
            </h4>
            <ul className="space-y-2 text-xs text-black/70 font-medium">
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block py-1 hover:text-[#015f45] hover:underline transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-black/[0.06] bg-[#FAF9F6] p-4 rounded-xl">
              <span className="text-xs font-bold text-black block mb-1">Need web growth help?</span>
              <p className="text-xs text-black/60 mb-3">We build connected customer acquisition systems for local service businesses.</p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#015f45] hover:underline"
              >
                View Pricing Models →
              </Link>
            </div>
          </aside>

          {/* Main Article Content Column */}
          <article className="lg:col-span-8 bg-white border border-black/[0.08] rounded-2xl p-7 md:p-12 shadow-xs">
            
            {/* Visual 1: Hero Workflow Banner */}
            <VisualCard
              tag="Pipeline Flow"
              title="From Social Content to Structured Website Assets"
              subtitle="The end-to-end transformation workflow from raw public social media posts to search-optimized WebP assets."
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-white rounded-lg border border-black/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6F2] text-[#015f45] font-bold flex items-center justify-center mx-auto mb-2">1</div>
                  <div className="font-bold text-black">Public Instagram</div>
                  <div className="text-black/50 text-[11px]">800 Raw Posts</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-black/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6F2] text-[#015f45] font-bold flex items-center justify-center mx-auto mb-2">2</div>
                  <div className="font-bold text-black">Instaloader</div>
                  <div className="text-black/50 text-[11px]">Bulk Download</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-black/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6F2] text-[#015f45] font-bold flex items-center justify-center mx-auto mb-2">3</div>
                  <div className="font-bold text-black">AI & Scripts</div>
                  <div className="text-black/50 text-[11px]">Clean & Classify</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-black/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-[#015f45] text-white font-bold flex items-center justify-center mx-auto mb-2">4</div>
                  <div className="font-bold text-black">Image SEO</div>
                  <div className="text-black/50 text-[11px]">WebP + Alt Text</div>
                </div>
              </div>
            </VisualCard>

            {/* Markdown Body Part 1 */}
            <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-[#151515] prose-p:text-black/80 prose-p:leading-relaxed prose-li:text-black/80 prose-table:text-sm prose-th:text-[#015f45] prose-th:bg-[#EFF6F2] prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-black/[0.06] prose-a:text-[#015f45] prose-a:font-semibold hover:prose-a:underline">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline ? (
                      <CodeBlock language={match?.[1]} code={String(children).replace(/\n$/, "")} />
                    ) : (
                      <code className="bg-black/5 text-[#015f45] font-mono text-xs px-1.5 py-0.5 rounded" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {articlePart1}
              </ReactMarkdown>
            </div>

            {/* Visual 2: 5-Stage Folder Tree */}
            <VisualCard
              tag="Directory Hierarchy"
              title="Isolated 5-Stage Project Media Architecture"
              subtitle="Preserving master originals protects your project from destructive batch operations."
            >
              <div className="font-mono text-xs text-black/80 space-y-1.5 bg-[#FAF9F6] p-4 rounded-lg border border-black/[0.05]">
                <div className="text-[#015f45] font-bold">client-media/</div>
                <div className="pl-4">├── <span className="font-semibold text-black">01-original-instagram/</span> <span className="text-black/50">(Master untouched backup — 800 files)</span></div>
                <div className="pl-4">├── <span className="font-semibold text-black">02-working/</span> <span className="text-black/50">(Filtered, deduplicated workspace)</span></div>
                <div className="pl-4">├── <span className="font-semibold text-black">03-classified/</span> <span className="text-black/50">(Subfolders by service: wardrobes, kitchens, etc.)</span></div>
                <div className="pl-4">├── <span className="font-semibold text-black">04-webp/</span> <span className="text-black/50">(Scaled production WebP responsive sizes)</span></div>
                <div className="pl-4">└── <span className="font-semibold text-[#015f45]">05-production/</span> <span className="text-black/50">(Manifest-mapped assets ready for Next.js)</span></div>
              </div>
            </VisualCard>

            {/* Visual 3: AI Agent Workflow */}
            <VisualCard
              tag="Agentic Execution"
              title="Autonomous Pipeline Orchestration"
              subtitle="How tools like Google Antigravity, Cursor, and Codex manage multi-step technical pipelines."
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-black/[0.08] text-center w-full">
                  <div className="font-bold text-black">Input Files</div>
                  <div className="text-black/50 mt-0.5">800 Social Media JPGs</div>
                </div>
                <span className="text-[#015f45] font-bold" aria-hidden="true">→</span>
                <div className="p-3 bg-[#EFF6F2] rounded-lg border border-[#015f45]/20 text-center w-full">
                  <div className="font-bold text-[#015f45]">AI Agent Engine</div>
                  <div className="text-[#015f45]/70 mt-0.5">Vision + Scripts + JSON</div>
                </div>
                <span className="text-[#015f45] font-bold" aria-hidden="true">→</span>
                <div className="p-3 bg-white rounded-lg border border-black/[0.08] text-center w-full">
                  <div className="font-bold text-black">Next.js Pages</div>
                  <div className="text-black/50 mt-0.5">SEO-Ready Site Routes</div>
                </div>
              </div>
            </VisualCard>

            {/* Markdown Body Part 2 */}
            <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:text-[#151515] prose-p:text-black/80 prose-p:leading-relaxed prose-li:text-black/80 prose-table:text-sm prose-th:text-[#015f45] prose-th:bg-[#EFF6F2] prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-black/[0.06] prose-a:text-[#015f45] prose-a:font-semibold hover:prose-a:underline mt-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline ? (
                      <CodeBlock language={match?.[1]} code={String(children).replace(/\n$/, "")} />
                    ) : (
                      <code className="bg-black/5 text-[#015f45] font-mono text-xs px-1.5 py-0.5 rounded" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {articlePart2}
              </ReactMarkdown>
            </div>

            {/* Visual 4: 33. Full System Summary Infographic Card */}
            <div className="my-12 p-8 bg-[#EFF6F2] border border-[#015f45]/20 rounded-2xl not-prose">
              <div className="text-xs font-bold uppercase tracking-wider text-[#015f45] mb-2">
                Executive Architecture Map
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#151515] mb-3">
                Complete End-to-End Image SEO Pipeline
              </h3>
              <p className="text-sm text-black/75 mb-6 font-normal leading-relaxed">
                A unified view of data flow from missing assets to automated acquisition and conversion-ready web pages.
              </p>
              
              <div className="space-y-3 font-mono text-xs text-[#015f45] bg-white p-6 rounded-xl border border-[#015f45]/15 shadow-xs">
                <div>Client Project (Assets Missing)</div>
                <div className="pl-4">↓ Authorized Public Profile</div>
                <div className="pl-4">↓ Instaloader Bulk Download (Anonymous)</div>
                <div className="pl-8">↓ Master Backup & Python Inventory</div>
                <div className="pl-8">↓ Deduplication & Multimodal AI Classification</div>
                <div className="pl-12">↓ Semrush Keyword Cluster & Route Mapping</div>
                <div className="pl-12">↓ WebP/AVIF Batch Compression & Alt Text</div>
                <div className="pl-16">↓ Structured Media Manifest (<code className="text-black bg-black/5 px-1 rounded">media-manifest.json</code>)</div>
                <div className="pl-16">↓ Agentic Website Integration (Next.js)</div>
                <div className="pl-20 text-black font-bold">✓ Production Verified & Indexed</div>
              </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS SECTION */}
            <div id="faq" className="mt-16 pt-12 border-t border-black/[0.08]">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-[#015f45] block mb-2">
                  Frequently Asked Questions
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#151515]">
                  Everything You Need to Know
                </h2>
              </div>

              <div className="divide-y divide-black/[0.08] border-t border-black/[0.08]">
                {articleFaqs.map((faq, idx) => (
                  <FAQItem key={idx} index={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>

            {/* FINAL ARTICLE CTA CARD */}
            <div className="mt-16 bg-[#111614] text-white rounded-2xl p-8 md:p-10 text-center not-prose">
              <span className="inline-block bg-[#cbd810] text-[#111111] text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider mb-4">
                Connected Growth Systems
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Need High-Converting Infrastructure for Your Service Business?
              </h3>
              <p className="text-sm md:text-base text-white/75 max-w-[580px] mx-auto mb-8 font-normal leading-relaxed">
                Jadeed Solutions builds intelligent web architecture, high-intent advertising campaigns, and revenue-aligned commercial models for UK & US local service operations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto bg-[#015f45] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#014f39] transition-all flex items-center justify-center gap-2 text-sm shadow-xs"
                >
                  <span>Explore Pricing Models</span>
                  <SlidingArrow />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-all text-sm border border-white/10"
                >
                  Book Growth Consultation
                </Link>
              </div>
            </div>

          </article>

        </div>
      </section>

    </main>
  );
}
