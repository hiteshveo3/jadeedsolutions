"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, MailIcon, PhoneIcon, ArrowDownIcon } from "./icons";

const footerSections = [
  {
    title: "Solutions",
    links: [
      { label: "Local SEO & 3-Pack", href: "/services/seo" },
      { label: "Google Ads & PPC", href: "/services/digital-advertising" },
      { label: "Conversion Websites", href: "/services/web-development" },
      { label: "Mobile Applications", href: "/services/app-development" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Plumbing & Heating", href: "/industries/seo-for-plumbers" },
      { label: "Cleaning Companies", href: "/industries/seo-for-cleaners" },
      { label: "Moving & Removals", href: "/industries/seo-for-uk-removals" },
      { label: "Contractors & Trades", href: "/industries/seo-for-local-service-businesses" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Growth Guides", href: "/guides" },
      { label: "Case Studies & Proof", href: "/portfolio" },
      { label: "Pricing & Models", href: "/pricing" },
      { label: "Free Growth Check", href: "/tools/growth-check" },
      { label: "Blog & Research", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Team Jadeed", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Model Comparison", href: "/compare/jadeed-vs-marketing-agency" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setOpenSection(openSection === title ? null : title);
  };

  return (
    <footer className="w-full bg-surface-canvas border-t border-black/[0.08] text-ink">
      <div className="max-w-[1340px] mx-auto px-6 py-16 lg:py-20">
        
        {/* Desktop & Tablet Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Info Column (4 Cols Desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="font-bold text-2xl tracking-tight text-ink flex items-center gap-2 mb-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <Image src="/logo.png" alt="Jadeed Solutions" width={30} height={30} className="rounded-lg" />
                <span>Jadeed Solutions<span className="text-brand">.</span></span>
              </Link>
              <p className="text-ink/65 text-sm leading-relaxed max-w-[340px] mb-6 font-normal">
                Connected customer acquisition systems and performance-aligned commercial models for UK & US local service businesses.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 text-sm text-ink/75">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-brand transition-colors flex items-center gap-2 font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span aria-hidden="true">
                  <HugeiconsIcon icon={MailIcon} size={15} />
                </span>
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="hover:text-brand transition-colors flex items-center gap-2 font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <span aria-hidden="true">
                  <HugeiconsIcon icon={PhoneIcon} size={15} />
                </span>
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>

          {/* Desktop 4-Column Navigation (Hidden on Mobile) */}
          <div className="hidden md:grid md:grid-cols-4 lg:col-span-8 gap-8">
            {footerSections.map((sec) => (
              <div key={sec.title}>
                <h4 className="font-bold tracking-wider uppercase text-ink mb-4 text-xs">
                  {sec.title}
                </h4>
                <ul className="space-y-2.5 text-sm text-ink/70 font-medium">
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion Navigation (< 768px with full accessibility and aria-controls) */}
          <div className="md:hidden divide-y divide-black/[0.08] border-y border-black/[0.08] my-2">
            {footerSections.map((sec) => {
              const panelId = `footer-panel-${sec.title.toLowerCase()}`;
              const isExpanded = openSection === sec.title;
              return (
                <div key={sec.title}>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleSection(sec.title)}
                    className="w-full min-h-[48px] py-3 flex items-center justify-between text-left font-bold text-sm text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  >
                    <span>{sec.title}</span>
                    <HugeiconsIcon
                      icon={ArrowDownIcon}
                      size={16}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-brand" : "text-ink/40"
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div id={panelId} role="region" aria-label={sec.title}>
                      <ul className="pb-4 space-y-2.5 text-sm text-ink/70 font-medium pl-1">
                        {sec.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block py-1 hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 mt-12 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/55">
          <div>
            © {year} Jadeed Solutions Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
