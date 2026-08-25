import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { posts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { ContentPlaceholder } from "@/components/ContentPlaceholder";

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
    title: `${post.title} | Jadeed Solutions`,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
  };
}

export default function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  // If user navigates to the new featured slug under [slug], redirect to the dedicated route
  if (params.slug === "local-seo-google-ads-service-business") {
    redirect("/blog/local-seo-google-ads-service-business");
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
