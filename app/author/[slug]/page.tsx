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
    alternates: { canonical: `${siteConfig.url}/author/${author.slug}` },
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
    "@id": `${siteConfig.url}/author/${author.slug}/#person`,
    name: author.name,
    url: `${siteConfig.url}/author/${author.slug}`,
    jobTitle: author.role,
    image: `${siteConfig.url}${author.avatar}`,
    description: author.longBio,
    sameAs: author.socials?.filter((social) => social.label === "LinkedIn").map((social) => social.href),
    knowsAbout: ["Technical SEO", "Local SEO", "Google Search Console", "Conversion websites", "AI-first content strategy"],
    homeLocation: { "@type": "Place", name: author.location },
    worksFor: { "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#f7f5ef] pb-20 pt-28 text-[#111]">
        <div className="container py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-black/50">
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
          <div className="mt-6 grid overflow-hidden rounded-[30px] bg-[#015f45] text-white lg:grid-cols-[.7fr_1.3fr]">
            <div className="relative min-h-[380px] bg-[#f28a16]">
            <Image
              src={author.avatar}
              alt={`${author.name}, Founder and CEO of Jadeed Solutions`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <span className="inline-flex items-center rounded-full bg-[#cbd810] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                Founder profile
              </span>
              <h1 className="mt-4 font-sans text-4xl font-semibold tracking-[-.045em] md:text-6xl">
                {author.name}
              </h1>
              <p className="mt-2 font-semibold text-[#eaf25a]">{author.role}</p>
              <p className="mt-5 max-w-2xl leading-7 text-white/70">{author.longBio}</p>

              {author.highlights && author.highlights.length > 0 && (
                <ul className="mt-6 grid gap-3 text-left text-sm text-white/75 sm:grid-cols-2">
                  {author.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cbd810]" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {author.socials && author.socials.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                  {author.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                        target={s.label === "LinkedIn" ? "_blank" : undefined}
                        rel={s.label === "LinkedIn" ? "noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#015f45]"
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
              <h2 className="font-sans text-3xl font-semibold tracking-[-.035em] text-[#111]">
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
