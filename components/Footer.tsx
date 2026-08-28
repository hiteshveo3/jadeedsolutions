"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  HugeiconsIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  MailIcon,
  PhoneIcon,
} from "./icons";

const sections = [
  {
    title: "Solutions",
    links: [
      ["Local SEO & 3-Pack", "/services/seo"],
      ["Google Ads & PPC", "/services/digital-advertising"],
      ["Conversion Websites", "/services/web-development"],
      ["Mobile Applications", "/services/app-development"],
      ["All Services", "/services"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Plumbing & Heating", "/industries/seo-for-plumbers"],
      ["Cleaning Companies", "/industries/seo-for-cleaners"],
      ["Moving & Removals", "/industries/seo-for-uk-removals"],
      ["Contractors & Trades", "/industries/seo-for-local-service-businesses"],
      ["All Industries", "/industries"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Growth Guides", "/guides"],
      ["Case Studies & Proof", "/portfolio"],
      ["Pricing & Models", "/pricing"],
      ["Free Growth Check", "/tools/growth-check"],
      ["Blog & Research", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Team Jadeed", "/about"],
      ["How It Works", "/how-it-works"],
      ["Model Comparison", "/compare/jadeed-vs-marketing-agency"],
      ["Contact Us", "/contact"],
    ],
  },
] as const;

export function Footer() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <footer className="border-t border-white/10 bg-[#014f39] text-white">
      <div className="mx-auto max-w-[1340px] px-6 py-10 sm:py-14 lg:py-16">
        <div className="relative mb-14 overflow-hidden rounded-[28px] bg-[#dceee8] px-6 py-9 text-[#063d30] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
          <div className="absolute -bottom-20 right-12 h-48 w-48 rounded-full bg-[#cbd810]/45 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#015f45]">
              Build your next growth system
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold tracking-[-.04em] sm:text-4xl">
              Turn more local demand into booked work.
            </h2>
          </div>
          <Link
            href="/contact"
            className="group relative mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#cbd810] px-6 text-sm font-bold text-[#111111] transition-colors hover:bg-[#b8c50e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015f45] focus-visible:ring-offset-2 lg:mt-0"
          >
            Get a free growth plan
            <HugeiconsIcon
              icon={ArrowRightIcon}
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810]"
            >
              <Image
                src="/jadeed-favicon.webp"
                alt="Jadeed Solutions"
                width={46}
                height={46}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold tracking-tight">
                Jadeed Solutions<span className="text-[#cbd810]">.</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              Connected customer acquisition systems for UK and US local service businesses.
            </p>
            <div className="mt-7 space-y-3 text-sm text-white/75">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 rounded-md transition-colors hover:text-[#eaf25a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810]"
              >
                <HugeiconsIcon icon={MailIcon} size={17} />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="flex items-center gap-2 rounded-md transition-colors hover:text-[#eaf25a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810]"
              >
                <HugeiconsIcon icon={PhoneIcon} size={17} />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="hidden grid-cols-4 gap-8 md:grid">
            {sections.map((section) => (
              <FooterSection key={section.title} section={section} />
            ))}
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10 md:hidden">
            {sections.map((section) => {
              const expanded = open === section.title;
              const panelId = `footer-${section.title.toLowerCase()}`;

              return (
                <div key={section.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : section.title)}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className="flex min-h-12 w-full items-center justify-between py-3 text-left text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810]"
                  >
                    {section.title}
                    <HugeiconsIcon
                      icon={ArrowDownIcon}
                      size={16}
                      className={`transition-transform ${
                        expanded ? "rotate-180 text-[#eaf25a]" : "text-white/50"
                      }`}
                    />
                  </button>
                  {expanded && (
                    <ul id={panelId} className="space-y-2 pb-4 text-sm text-white/65">
                      {section.links.map(([label, href]) => (
                        <li key={href}>
                          <Link href={href} className="block py-1 hover:text-[#eaf25a]">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Jadeed Solutions Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ section }: { section: (typeof sections)[number] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[.14em] text-[#eaf25a]">
        {section.title}
      </h3>
      <ul className="space-y-2.5 text-sm text-white/65">
        {section.links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
