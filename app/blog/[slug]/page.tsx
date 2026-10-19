import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon } from "@/components/icons";
import { ContentBlocks } from "@/components/longform/Blocks";
import { InlineMarkdown } from "@/components/longform/Markdown";
import { FaqCards } from "@/components/site/ui";
import { LongformBody, LongformHero, LongformSection, Pill } from "@/components/longform/Layout";
import { ShareRow } from "@/components/blog/ShareRow";
import { getAuthor } from "@/lib/authors";
import { formatDate, getPost, getRelatedPosts, getToc, postArchiveHref, posts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

/** Posts with their own hand-built route under app/blog/<slug>. */
const customRoutes = new Set(["local-seo-google-ads-service-business", "download-public-instagram-photos-without-login"]);

export function generateStaticParams() {
  return posts.filter((p) => !customRoutes.has(p.slug)).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const author = getAuthor(post.authorSlug);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: author.name, url: `${siteConfig.url}/author/${author.slug}` }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [post.cover],
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [author.name],
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

function plain(markdown: string) {
  return markdown.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`]/g, "");
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPost(params.slug);
  if (!post || customRoutes.has(post.slug)) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const author = getAuthor(post.authorSlug);
  const related = getRelatedPosts(post.slug).filter((p) => p.content.length > 1 || customRoutes.has(p.slug));
  const contents = [
    ...getToc(post).map((item) => {
      const numbered = item.label.match(/^(\d+)\.\s+(.*)$/);
      return numbered ? { id: item.id, label: numbered[2], number: numbered[1] } : { id: item.id, label: item.label };
    }),
    ...(post.faqs?.length ? [{ id: "faqs", label: "Frequently asked questions" }] : []),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [post.cover],
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "en",
        articleSection: post.category,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: author.name, url: `${siteConfig.url}/author/${author.slug}`, jobTitle: author.role },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      ...(post.faqs?.length
        ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })) }]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <LongformHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}
        eyebrow={<><Pill>{post.category}</Pill><Pill tone="outline">{post.readingTime}</Pill></>}
        title={post.title}
        subtitle={post.excerpt}
        actions={
          <Link href={`/author/${author.slug}`} className="group inline-flex items-center gap-3 rounded-xl pr-2">
            <Image src={author.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-white/25" />
            <span className="text-sm leading-5">
              <span className="block font-semibold text-white group-hover:underline">{author.name}</span>
              <span className="block text-white/65">{author.role}</span>
            </span>
          </Link>
        }
        meta={
          <>
            <Link href={postArchiveHref(post.date)} className="hover:text-white">
              Published <time dateTime={post.date}>{formatDate(post.date)}</time>
            </Link>
            {post.updated && post.updated !== post.date && (
              <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
            )}
          </>
        }
      />

      <LongformBody contents={contents} contentsTitle="In this article">
        <ContentBlocks blocks={post.content} />

        {post.faqs && post.faqs.length > 0 && (
          <div className="mt-14 border-t border-white/[0.08] pt-12">
            <LongformSection id="faqs" title="Frequently asked questions">
              <FaqCards items={post.faqs.map((faq) => ({ question: faq.q, answer: <InlineMarkdown>{faq.a}</InlineMarkdown> }))} />
            </LongformSection>
          </div>
        )}

        <div className="mt-12 border-y border-white/[0.08] py-4">
          <ShareRow url={url} title={post.title} />
        </div>

        <div className="mt-8 flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 sm:p-6">
          <Image src={author.avatar} alt={author.name} width={64} height={64} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#BEF70A]">Written by</p>
            <Link href={`/author/${author.slug}`} className="mt-1 block text-lg font-semibold tracking-[-.02em] hover:text-[#BEF70A]">{author.name}</Link>
            <p className="text-sm text-white/63">{author.role}</p>
            <p className="mt-2 text-sm leading-6 text-white/78">{author.bio}</p>
          </div>
        </div>
      </LongformBody>

      {related.length > 0 && (
        <section className="bg-transparent py-14 sm:py-20" aria-labelledby="related-heading">
          <div className="container max-w-[1200px]">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-heading" className="text-[28px] font-semibold tracking-[-.035em] sm:text-4xl">Keep reading</h2>
              <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#BEF70A]">
                All articles <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-[24px] border border-white/[0.08] bg-white/[0.05] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[#BEF70A]">{p.category} · {p.readingTime}</span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-.02em]">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/68">{p.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-[#BEF70A]">
                    Read article <HugeiconsIcon icon={ArrowRightIcon} size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
