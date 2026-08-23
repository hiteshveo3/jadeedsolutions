import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
  QuoteIcon,
  SearchIcon,
  BookIcon,
  TrendingUpIcon,
  CodeIcon,
  MegaphoneIcon,
  type IconSvgElement,
} from "@/components/icons";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { BackToTop } from "@/components/blog/BackToTop";
import { ShareRow } from "@/components/blog/ShareRow";
import { BlogToc } from "@/components/blog/BlogToc";
import { RichText } from "@/components/blog/RichText";
import { AccordionItem } from "@/components/Accordion";
import { LocalSeoAuditCalculator } from "@/components/blog/LocalSeoAuditCalculator";
import { InteractiveRoadmap } from "@/components/blog/InteractiveRoadmap";
import { ArchitectureVisualizer } from "@/components/blog/ArchitectureVisualizer";
import { KeywordClusterExplorer } from "@/components/blog/KeywordClusterExplorer";
import { CoreWebVitalsMeter } from "@/components/blog/CoreWebVitalsMeter";
import { MythVsRealityCard } from "@/components/blog/MythVsRealityCard";
import {
  posts,
  getPost,
  getRelatedPosts,
  getToc,
  categoryCounts,
  formatDate,
  slugify,
  type ContentBlock,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      publishedTime: post.date,
    },
  };
}

function categoryIcon(category: string): IconSvgElement {
  switch (category) {
    case "SEO":
      return TrendingUpIcon;
    case "Web Development":
      return CodeIcon;
    case "App Development":
      return CodeIcon;
    case "Digital Advertising":
      return MegaphoneIcon;
    default:
      return BookIcon;
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const author = getAuthor(post.authorSlug);
  const toc = getToc(post);
  const related = getRelatedPosts(post.slug);
  const popular = posts.slice(0, 4);
  const counts = categoryCounts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.cover],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: author.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
  };

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50">
        <div className="container py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-brand-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink" aria-current="page">
                {post.category}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article>
              <header>
                <Link
                  href="/blog"
                  className="inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                  {post.category}
                </Link>
                <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                  <Link
                    href={`/author/${author.slug}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-brand-500"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-brand-100"
                    />
                    <span className="font-semibold text-ink">{author.name}</span>
                  </Link>
                  <Link
                    href={`/blog/archive/${post.date.slice(0, 4)}/${post.date.slice(5, 7)}`}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-500"
                  >
                    <HugeiconsIcon icon={CalendarIcon} size={16} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </Link>
                  <span className="inline-flex items-center gap-1.5">
                    <HugeiconsIcon icon={ClockIcon} size={16} />
                    {post.readingTime}
                  </span>
                </div>
              </header>

              <div className="relative mt-6 aspect-[2/1] overflow-hidden rounded-3xl">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-5 border-y border-slate-200 py-3">
                <ShareRow url={url} title={post.title} />
              </div>

              <div className="mt-6 space-y-4">
                <BlogToc items={toc} />
                {post.content.map((block, i) => (
                  <ContentBlockRenderer key={i} block={block} />
                ))}

                {post.faqs && post.faqs.length > 0 && (
                  <section className="mt-8">
                    <h2
                      id="faqs"
                      className="scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-ink"
                    >
                      Frequently asked questions
                    </h2>
                    <div className="mt-4 space-y-3">
                      {post.faqs.map((f) => (
                        <AccordionItem key={f.q} title={f.q}>
                          <RichText text={f.a} />
                        </AccordionItem>
                      ))}
                    </div>
                  </section>
                )}

                <div className="border-t border-slate-200 pt-5">
                  <ShareRow url={url} title={post.title} />
                </div>

                <div className="mt-6 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-brand-100"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                      Written by
                    </p>
                    <Link
                      href={`/author/${author.slug}`}
                      className="font-display text-base font-semibold text-ink transition-colors hover:text-brand-500"
                    >
                      {author.name}
                    </Link>
                    <p className="text-xs text-slate-500">{author.role}</p>
                    <p className="mt-1.5 text-sm text-slate-500">{author.bio}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="space-y-6">
              <aside className="space-y-6 md:sticky md:top-24">
                <Link
                  href="/blog"
                  className="hidden h-11 items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-600 transition-colors hover:bg-slate-100 lg:flex"
                >
                  <HugeiconsIcon
                    icon={SearchIcon}
                    size={16}
                    className="shrink-0"
                  />
                  <span className="flex-1 truncate">Search the blog…</span>
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-4 text-sm font-bold text-ink">
                    Popular posts
                  </h3>
                  <ul className="space-y-2">
                    {popular.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="group -mx-2 flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-100"
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-500 text-white">
                            <HugeiconsIcon
                              icon={categoryIcon(p.category)}
                              size={20}
                            />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold leading-snug text-ink group-hover:text-brand-500">
                              {p.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-500">
                              {p.category} · {p.readingTime}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
                  <h3 className="mb-4 text-sm font-bold text-ink">Categories</h3>
                  <ul className="space-y-2">
                    {counts.map(({ category, count }) => (
                      <li key={category}>
                        <Link
                          href="/blog"
                          className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-brand-50 hover:text-brand-500"
                        >
                          <span>{category}</span>
                          <span className="rounded-full bg-brand-500 px-2 text-xs font-semibold text-white">
                            {count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-brand-500 p-5">
                  <p className="font-display text-base font-semibold leading-snug text-white">
                    Ready to grow your business online?
                  </p>
                  <p className="mt-1.5 text-xs text-white/80">
                    Free consultation · No obligation
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-500 transition-opacity hover:opacity-90"
                  >
                    Get a free quote
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                  </Link>
                </div>
              </aside>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <div className="mb-6 flex items-end justify-between">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  More from the blog
                </h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 hover:underline"
                >
                  View all
                  <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-soft"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-flex rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {p.category} · {p.readingTime}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-brand-500">
                        {p.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
                        Read article
                        <HugeiconsIcon
                          icon={ArrowRightIcon}
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          id={slugify(block.text)}
          className="scroll-mt-24 pt-2 font-display text-2xl font-semibold tracking-tight text-ink"
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-[15px] leading-relaxed text-slate-700">
          <RichText text={block.text} />
        </p>
      );

    case "list":
      return (
        <ul className="space-y-2.5 text-[15px] text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <HugeiconsIcon
                icon={CheckIcon}
                size={16}
                strokeWidth={2.4}
                className="mt-0.5 shrink-0 text-brand-500"
              />
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="space-y-2.5 text-[15px] text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );

    case "quote":
      return (
        <blockquote className="my-2 flex gap-4 rounded-2xl bg-slate-50 p-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
            <HugeiconsIcon icon={QuoteIcon} size={20} />
          </span>
          <p className="text-[15px] italic leading-relaxed text-slate-700">
            <RichText text={block.text} />
          </p>
        </blockquote>
      );

    case "callout":
      return (
        <aside className="my-4 rounded-2xl bg-brand-500 p-6 text-white">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide">
            <HugeiconsIcon icon={CheckIcon} size={15} strokeWidth={2.4} />
            {block.title ?? "Key takeaways"}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <HugeiconsIcon
                  icon={CheckIcon}
                  size={14}
                  strokeWidth={2.4}
                  className="mt-0.5 shrink-0"
                />
                <span className="font-medium">
                  <RichText text={item} variant="onBrand" />
                </span>
              </li>
            ))}
          </ul>
        </aside>
      );

    case "image":
      return (
        <figure className="my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="aspect-[16/9] w-full rounded-2xl object-cover"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="my-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-brand-500 text-white">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`px-4 py-3 font-bold ${i > 0 ? "text-center" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`border-t border-slate-200 px-4 py-3 ${
                        c === 0
                          ? "font-semibold text-ink"
                          : "text-center text-slate-700"
                      }`}
                    >
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "code":
      return (
        <div className="my-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
          {block.language && (
            <div className="border-b border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
              {block.language}
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-100">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "cta":
      return (
        <div className="my-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-brand-500 p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold">{block.title}</p>
            {block.text && (
              <p className="mt-1 text-sm text-white/80">
                <RichText text={block.text} variant="onBrand" />
              </p>
            )}
          </div>
          <Link
            href={block.href}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-500 transition-opacity hover:opacity-90"
          >
            {block.label}
            <HugeiconsIcon icon={ArrowRightIcon} size={16} />
          </Link>
        </div>
      );

    case "dialogue":
      return (
        <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {block.title && (
            <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-500">
                Conversation
              </p>
              <p className="mt-1 font-display text-base font-semibold text-ink sm:text-lg">
                {block.title}
              </p>
            </div>
          )}
          <div className="space-y-4 p-4 sm:p-5">
            {block.turns.map((turn, i) => {
              const isUs = turn.speaker === "us";
              return (
                <div
                  key={i}
                  className={`flex ${isUs ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[85%] ${
                      isUs
                        ? "rounded-br-md bg-brand-500 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-ink"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isUs ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {turn.name}
                      <span className="ml-1.5 font-medium opacity-80">
                        · {isUs ? "Jadeed" : "Client"}
                      </span>
                    </p>
                    {turn.text.split("\n\n").map((para, pi) => (
                      <p
                        key={pi}
                        className={`mt-1.5 whitespace-pre-line text-[14px] leading-relaxed ${
                          isUs ? "text-white" : "text-slate-700"
                        }`}
                      >
                        <RichText
                          text={para}
                          variant={isUs ? "onBrand" : "default"}
                        />
                      </p>
                    ))}
                    {turn.bullets && turn.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {turn.bullets.map((item, bi) => (
                          <li
                            key={bi}
                            className={`flex items-start gap-2 text-[13px] leading-snug ${
                              isUs ? "text-white/95" : "text-slate-700"
                            }`}
                          >
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                isUs ? "bg-white" : "bg-brand-500"
                              }`}
                            />
                            <RichText
                              text={item}
                              variant={isUs ? "onBrand" : "default"}
                            />
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
