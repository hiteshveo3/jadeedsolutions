"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, ArrowDownIcon, ArrowRightIcon, MailIcon, PhoneIcon, WhatsappIcon, LinkedinIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "./icons";
import { TerritoryRings } from "./site/Art";

const sections = [
  {
    title: "Services",
    links: [
      ["Local SEO & Google Maps", "/services/seo"],
      ["Google Ads & PPC", "/services/digital-advertising"],
      ["Conversion websites", "/services/web-development"],
      ["Mobile apps", "/services/app-development"],
      ["All services", "/services"],
    ],
  },
  {
    title: "Industries",
    links: [
      ["Plumbing & heating", "/industries/seo-for-plumbers"],
      ["Cleaning companies", "/industries/seo-for-cleaners"],
      ["Moving & removals", "/industries/seo-for-uk-removals"],
      ["Contractors & trades", "/industries/seo-for-local-service-businesses"],
      ["All industries", "/industries"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Growth guides", "/guides"],
      ["Case studies", "/portfolio"],
      ["Pricing", "/pricing"],
      ["Profit-share handbook", "/profit-share-handbook"],
      ["Free growth check", "/tools/growth-check"],
      ["Blog", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Founder", "/sameer-ahmad-basra"],
      ["About", "/about"],
      ["How it works", "/how-it-works"],
      ["Jadeed vs an agency", "/compare/jadeed-vs-marketing-agency"],
      ["Contact", "/contact"],
    ],
  },
] as const;

const socials = [
  ["LinkedIn", siteConfig.social.linkedin, LinkedinIcon],
  ["Instagram", siteConfig.social.instagram, InstagramIcon],
  ["Facebook", siteConfig.social.facebook, FacebookIcon],
  ["YouTube", siteConfig.social.youtube, YoutubeIcon],
] as const;

export function Footer() {
  const [open, setOpen] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <footer data-site-footer className="relative overflow-hidden">
      {/* Closing CTA (idea 008 A): “Is your area still open?” — dark gradient, lime territory rings.
          Territory per lib/partnership.ts (every country, owner 4 Oct 2026). Hidden on the contact page,
          and on private client proposals, whose terms differ from the standard offer. */}
      {pathname !== "/contact" && !pathname?.startsWith("/proposal/") && (
        <section aria-labelledby="closing-cta" className="px-5 pb-6 pt-16 sm:px-8 md:pt-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-8 overflow-hidden rounded-[30px] border border-white/[0.08] bg-glow px-6 py-12 sm:px-10 md:grid-cols-[1.15fr_.85fr] md:py-14 lg:px-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#BEF70A]/[0.13] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-[#BEF70A]">
                <Spark /> Free audit · reply in 24 hours
              </p>
              <h2 id="closing-cta" className="mt-5 text-[36px] leading-[1] tracking-[-.04em] sm:text-5xl">
                Is your area still open?
              </h2>
              <p className="mt-4 max-w-lg text-[17px] leading-7 text-white/75">
                We check how you show up on Google and AI today, and whether your area is available — before anything is agreed. £0 upfront, a fee only on paid jobs, and your territory in writing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#BEF70A] pl-6 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09]">
                  Check my area
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F12] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45">
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                  </span>
                </Link>
                <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white/[0.08] px-6 text-sm font-bold text-white transition-colors hover:bg-white/10">
                  <HugeiconsIcon icon={WhatsappIcon} size={20} />
                  Talk it through
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[320px]">
              <TerritoryRings />
              <span className="absolute left-[58%] top-[44%] rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#0B1F12]">One partner per area</span>
            </div>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-[1200px] px-5 pt-12 sm:px-8 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 rounded-lg">
              <Image src="/jadeed-favicon.webp" alt="" width={40} height={40} className="rounded-xl" />
              <span className="text-xl font-bold tracking-[-.03em]">
                Jadeed <span className="font-semibold text-white/60">Solutions</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              Local SEO, websites and paid growth for service businesses — measured in booked jobs. A remote team in Narowal, Pakistan, working with clients in the UK, US, Canada and UAE.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/75">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition-colors hover:text-[#BEF70A]">
                <HugeiconsIcon icon={MailIcon} size={18} className="text-[#BEF70A]" />
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2.5 transition-colors hover:text-[#BEF70A]">
                <HugeiconsIcon icon={PhoneIcon} size={18} className="text-[#BEF70A]" />
                {siteConfig.phone}
              </a>
            </div>
            <div className="mt-6 flex gap-2">
              {socials.map(([label, href, icon]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-white/75 transition-colors hover:bg-white/[0.09] hover:text-[#BEF70A]">
                  <HugeiconsIcon icon={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden grid-cols-4 gap-8 md:grid">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-xs uppercase tracking-[.14em] text-[#BEF70A]" style={{ fontFamily: "var(--font-sans)", fontWeight: 800 }}>
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
            ))}
          </div>

          <div className="divide-y divide-white/10 border-y border-white/[0.08] md:hidden">
            {sections.map((section) => {
              const expanded = open === section.title;
              const panelId = `footer-${section.title.toLowerCase()}`;
              return (
                <div key={section.title}>
                  <button type="button" onClick={() => setOpen(expanded ? null : section.title)} aria-expanded={expanded} aria-controls={panelId} className="flex min-h-12 w-full items-center justify-between py-3 text-left text-sm font-bold">
                    {section.title}
                    <HugeiconsIcon icon={ArrowDownIcon} size={16} className={`transition-transform ${expanded ? "rotate-180 text-[#BEF70A]" : "text-white/50"}`} />
                  </button>
                  {expanded && (
                    <ul id={panelId} className="space-y-2 pb-4 text-sm text-white/65">
                      {section.links.map(([label, href]) => (
                        <li key={href}>
                          <Link href={href} className="block py-1 hover:text-[#BEF70A]">
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

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Jadeed Solutions. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/site-map" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Big faint name (idea 009 A) — whole word visible, letters never touching (owner, 5 Oct 2026). */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-3 sm:px-6">
        <p className="mx-auto mt-8 max-w-[1280px] whitespace-nowrap pb-[0.06em] text-center text-[22vw] leading-[1] tracking-[-.01em] text-white/[0.06] lg:text-[270px]" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
          Jadeed
        </p>
      </div>
    </footer>
  );
}

function Spark() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.7 5.6 3.4 9 10.5 10.5C15.4 13.5 12.7 16.9 12 22.5 11.3 16.9 8.6 13.5 1.5 12 8.6 10.5 11.3 7.1 12 1.5Z" fill="currentColor" />
    </svg>
  );
}
