import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

export function generateStaticParams() {
  return posts
    .filter(
      (p) =>
        p.slug !== "local-seo-google-ads-service-business" &&
        p.slug !== "download-public-instagram-photos-without-login"
    )
    .map((p) => ({ slug: p.slug }));
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
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
  };
}

export default function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // If user navigates to a slug that has a dedicated custom route, redirect to it
  if (params.slug === "local-seo-google-ads-service-business") {
    redirect("/blog/local-seo-google-ads-service-business");
  }
  if (params.slug === "download-public-instagram-photos-without-login") {
    redirect("/blog/download-public-instagram-photos-without-login");
  }

  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <ContentPlaceholder
      badge="Editorial In Progress"
      category={`Blog • ${post.category}`}
      title={post.title}
      subtitle={`The full research paper, updated 2026 data, and actionable framework for "${post.title}" are currently being refined.`}
      parentPath="/blog"
      parentLabel="All Blog Articles"
    />
  );
}
