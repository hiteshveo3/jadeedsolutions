import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  MailIcon,
} from "@/components/icons";
import { authors, getAuthor, allAuthors } from "@/lib/authors";
import { getPostsByAuthor, formatDate } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return allAuthors().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const author = authors[params.slug];
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    openGraph: {
      type: "profile",
      title: author.name,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

export default function AuthorPage({
  params,
}: {
  params: { slug: string };
}) {
  const author = authors[params.slug];
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    image: `${siteConfig.url}${author.avatar}`,
    description: author.longBio,
    worksFor: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50">
        <div className="container py-10 md:py-14">
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
                {author.name}
              </li>
            </ol>
          </nav>

          {/* Profile header */}
          <div className="mt-6 flex flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-white p-8 text-center md:flex-row md:items-center md:gap-8 md:p-10 md:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatar}
              alt={author.name}
              className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-brand-100 md:h-32 md:w-32"
            />
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Author
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {author.name}
              </h1>
              <p className="mt-1 font-semibold text-brand-500">{author.role}</p>
              <p className="mt-4 max-w-2xl text-slate-600">{author.longBio}</p>

              {author.socials && author.socials.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {author.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-500"
                    >
                      {s.label === "Email" && (
                        <HugeiconsIcon icon={MailIcon} size={15} />
                      )}
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Posts */}
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Articles by {author.name.split(" ")[0]}
              </h2>
              <span className="text-sm text-slate-500">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
            </div>

            {posts.length === 0 ? (
              <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                No articles yet — check back soon.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
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
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-flex rounded-full bg-brand-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink group-hover:text-brand-500">
                        {p.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <HugeiconsIcon icon={CalendarIcon} size={14} />
                          <time dateTime={p.date}>{formatDate(p.date)}</time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <HugeiconsIcon icon={ClockIcon} size={14} />
                          {p.readingTime}
                        </span>
                      </div>
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
            )}
          </section>
        </div>
      </div>
    </>
  );
}
