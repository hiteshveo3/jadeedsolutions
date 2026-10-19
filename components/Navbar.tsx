"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, CloseIcon, PhoneIcon, SearchIcon, WhatsappIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/** Final header (round-header, owner): one full-width bar, no dropdowns,
 *  a full green sheet on phones. Ultra minimal and focused. */
const links = [
  ["Services", "/services"],
  ["Results", "/portfolio"],
  ["Pricing", "/pricing"],
  ["About", "/about"],
  ["Blog", "/blog"],
] as const;

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openSearch = () => {
    setOpen(false);
    window.dispatchEvent(new Event("open-command-search"));
  };

  return (
    <>
      <header
        data-site-header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-white/[0.08] bg-[#06301D]/85 backdrop-blur-xl" : "border-transparent bg-[#06301D]/40 backdrop-blur-md"
        }`}
      >
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4">
            <Image src="/jadeed-favicon.webp" alt="" width={34} height={34} className="h-[34px] w-[34px] rounded-[10px]" />
            <span className="text-[17px] font-bold leading-none tracking-[-.03em]">
              Jadeed <span className="font-semibold text-white/60">Solutions</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(pathname, href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[14.5px] font-semibold transition-colors hover:text-white ${
                    isActive(pathname, href) ? "text-[#BEF70A]" : "text-white/75"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the site"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white lg:inline-flex"
            >
              <HugeiconsIcon icon={SearchIcon} size={20} />
            </button>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              aria-label={`Call Jadeed Solutions on ${siteConfig.phone}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white transition-colors hover:bg-white/[0.09] hover:text-[#BEF70A]"
            >
              <HugeiconsIcon icon={PhoneIcon} size={20} />
            </a>
            <Link
              href="/contact"
              className="group hidden h-11 items-center gap-2.5 rounded-full bg-[#BEF70A] pl-5 pr-1.5 text-sm font-bold text-[#0B1F12] transition-colors hover:bg-[#ABDE09] sm:inline-flex"
            >
              Free growth plan
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F12] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45">
                <HugeiconsIcon icon={ArrowRightIcon} size={16} />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15 lg:hidden"
            >
              {open ? (
                <HugeiconsIcon icon={CloseIcon} size={22} />
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 8h16M4 16h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Phone menu: a full green sheet (round-header). */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-[48] overflow-y-auto bg-brand-grad px-5 pb-28 pt-24 lg:hidden"
      >
        <ul className="border-t border-white/[0.08]">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center justify-between border-b border-white/[0.08] py-5 text-[30px] font-extrabold tracking-[-.04em] ${
                  isActive(pathname, href) ? "text-[#BEF70A]" : "text-white"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {label}
                <HugeiconsIcon icon={ArrowRightIcon} size={22} className="text-white/40" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3">
          <Link href="/contact" className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#BEF70A] text-base font-bold text-[#0B1F12]">
            Get a free growth plan
          </Link>
          <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-full bg-white/[0.1] text-base font-bold text-white">
            <HugeiconsIcon icon={WhatsappIcon} size={22} />
            Chat on WhatsApp
          </a>
          <button type="button" onClick={openSearch} className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white/70">
            <HugeiconsIcon icon={SearchIcon} size={18} />
            Search the site
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-white/55">{siteConfig.email}</p>
      </div>
    </>
  );
}
