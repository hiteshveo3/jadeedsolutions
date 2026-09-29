import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import React from "react";

const SITE = siteConfig.url.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Local SEO & Google Ads for Service Businesses: 2026 Guide",
  description: "Learn how to scale your local service business using precision marketing. Discover the 2026 playbook for local SEO, Google Ads, and conversion optimization.",
  authors: [{ name: "Team Jadeed", url: `${SITE}/` }],
  publisher: "Jadeed Solutions",
  alternates: {
    canonical: `${SITE}/blog/local-seo-google-ads-service-business`,
  },
  openGraph: {
    type: "article",
    title: "Local SEO & Google Ads for Service Businesses: 2026 Guide",
    description: "Learn how to scale your local service business using precision marketing. Discover the 2026 playbook for local SEO, Google Ads, and conversion optimization.",
    url: `${SITE}/blog/local-seo-google-ads-service-business`,
    siteName: "Jadeed Solutions",
    locale: "en_US",
    images: [
      {
        url: `${SITE}/performance-marketing-local-businesses.webp`,
        width: 1902,
        height: 827,
        alt: "Local SEO and Google Ads precision marketing framework for service businesses",
      },
    ],
    publishedTime: "2026-08-24T08:00:00.000Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale Your Local Service Business via Precision Marketing",
    description: "The complete 2026 guide to local SEO, Google Ads, and revenue-focused growth for local service businesses.",
    images: [`${SITE}/performance-marketing-local-businesses.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      "name": "Jadeed Solutions",
      "url": `${SITE}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE}/logo.png`
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      "url": `${SITE}/`,
      "name": "Jadeed Solutions",
      "publisher": {
        "@id": `${SITE}/#organization`
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/blog/local-seo-google-ads-service-business#webpage`,
      "url": `${SITE}/blog/local-seo-google-ads-service-business`,
      "name": "Local SEO & Google Ads for Service Businesses: 2026 Guide",
      "isPartOf": {
        "@id": `${SITE}/#website`
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}/blog/local-seo-google-ads-service-business#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${SITE}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Local SEO & Ads",
          "item": `${SITE}/blog/category/local-seo-ads`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "How to Scale Your Local Service Business With Precision Marketing",
          "item": `${SITE}/blog/local-seo-google-ads-service-business`
        }
      ]
    },
    {
      "@type": "Article",
      "@id": `${SITE}/blog/local-seo-google-ads-service-business#article`,
      "headline": "How to Scale Your Local Service Business With Precision Marketing",
      "description": "The complete 2026 guide to local SEO, Google Ads, conversion optimization, call tracking, reviews, and revenue-focused growth for local service businesses.",
      "image": `${SITE}/performance-marketing-local-businesses.webp`,
      "author": {
        "@type": "Organization",
        "name": "Team Jadeed",
        "@id": `${SITE}/#organization`
      },
      "publisher": {
        "@id": `${SITE}/#organization`
      },
      "datePublished": "2026-08-24T08:00:00+00:00",
      "mainEntityOfPage": {
        "@id": `${SITE}/blog/local-seo-google-ads-service-business#webpage`
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/blog/local-seo-google-ads-service-business#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does local SEO take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Results depend on competition, market size, current website authority, Business Profile strength, and content quality. Organic Local SEO typically takes 3 to 6 months to see significant movement, whereas Google Ads can generate leads immediately."
          }
        },
        {
          "@type": "Question",
          "name": "Can Google Ads replace SEO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually, no. Ads can generate immediate demand while SEO builds longer-term visibility. Using both strategically creates a stronger acquisition portfolio."
          }
        },
        {
          "@type": "Question",
          "name": "Why are my Google Ads getting clicks but no calls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Potential causes include wrong search intent, weak ad messaging, poor landing pages, lack of trust signals, unclear CTAs, or inaccurate tracking. You must examine the entire funnel."
          }
        }
      ]
    }
  ]
};

export default function SingleBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
