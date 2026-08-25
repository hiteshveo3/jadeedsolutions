import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Local SEO & Google Ads for Service Businesses: 2026 Guide",
  description: "Learn how to scale your local service business using precision marketing. Discover the 2026 playbook for local SEO, Google Ads, and conversion optimization.",
  authors: [{ name: "Team Jadeed", url: "https://jadeedsolutions.com/" }],
  publisher: "Jadeed Solutions",
  alternates: {
    canonical: "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business",
  },
  openGraph: {
    type: "article",
    title: "Local SEO & Google Ads for Service Businesses: 2026 Guide",
    description: "Learn how to scale your local service business using precision marketing. Discover the 2026 playbook for local SEO, Google Ads, and conversion optimization.",
    url: "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business",
    siteName: "Jadeed Solutions",
    locale: "en_US",
    images: [
      {
        url: "https://jadeedsolutions.com/images/blog/local-seo-google-ads-growth-strategy.jpg",
        width: 1200,
        height: 630,
        alt: "Local SEO and Google Ads precision marketing framework for service businesses",
      },
    ],
    publishedTime: "2026-08-24T08:00:00.000Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scale Your Local Service Business via Precision Marketing",
    description: "The complete 2026 guide to local SEO, Google Ads, and revenue-focused growth for local service businesses.",
    images: ["https://jadeedsolutions.com/images/blog/local-seo-google-ads-growth-strategy.jpg"],
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
      "@id": "https://jadeedsolutions.com/#organization",
      "name": "Jadeed Solutions",
      "url": "https://jadeedsolutions.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jadeedsolutions.com/images/logo.png"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jadeedsolutions.com/#website",
      "url": "https://jadeedsolutions.com/",
      "name": "Jadeed Solutions",
      "publisher": {
        "@id": "https://jadeedsolutions.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business#webpage",
      "url": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business",
      "name": "Local SEO & Google Ads for Service Businesses: 2026 Guide",
      "isPartOf": {
        "@id": "https://jadeedsolutions.com/#website"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://jadeedsolutions.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://jadeedsolutions.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Local SEO & Ads",
          "item": "https://jadeedsolutions.com/blog/category/local-seo-ads"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "How to Scale Your Local Service Business With Precision Marketing",
          "item": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business"
        }
      ]
    },
    {
      "@type": "Article",
      "@id": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business#article",
      "headline": "How to Scale Your Local Service Business With Precision Marketing",
      "description": "The complete 2026 guide to local SEO, Google Ads, conversion optimization, call tracking, reviews, and revenue-focused growth for local service businesses.",
      "image": "https://jadeedsolutions.com/images/blog/local-seo-google-ads-growth-strategy.jpg",
      "author": {
        "@type": "Organization",
        "name": "Team Jadeed",
        "@id": "https://jadeedsolutions.com/#organization"
      },
      "publisher": {
        "@id": "https://jadeedsolutions.com/#organization"
      },
      "datePublished": "2026-08-24T08:00:00+00:00",
      "mainEntityOfPage": {
        "@id": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business#webpage"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "FAQPage",
      "@id": "https://jadeedsolutions.com/blog/local-seo-google-ads-service-business#faq",
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
