"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import {
  HugeiconsIcon,
  HomeIcon,
  GridIcon,
  BriefcaseIcon,
  NewsIcon,
  MoreIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  CloseIcon,
  TagIcon,
  type IconSvgElement,
} from "./icons";

type NavItem = { label: string; href: string; icon: IconSvgElement };

const primary: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Services", href: "/services", icon: GridIcon },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseIcon },
];

const moreItems: NavItem[] = [
  { label: "Industries", href: "/industries", icon: BriefcaseIcon },
  { label: "Pricing", href: "/pricing", icon: TagIcon },
  { label: "Tools", href: "/tools", icon: GridIcon },
  { label: "Guides", href: "/guides", icon: NewsIcon },
  { label: "Compare", href: "/compare", icon: TagIcon },
  { label: "How it works", href: "/how-it-works", icon: InfoIcon },
  { label: "About", href: "/about", icon: InfoIcon },
  { label: "Contact", href: "/contact", icon: MailIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openSearch = () =>
    window.dispatchEvent(new Event("open-command-search"));

  if (pathname === "/pricing") return null;

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-[70] border-t border-js-dark/10 bg-js-bg lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {primary.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-js-dark" : "text-js-dark/60"
                }`}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={22}
                  strokeWidth={active ? 2 : 1.8}
                />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={openSearch}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-js-dark/60"
            aria-label="Search"
          >
            <HugeiconsIcon icon={SearchIcon} size={22} strokeWidth={1.8} />
            Search
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
              open ? "text-js-dark" : "text-js-dark/60"
            }`}
            aria-label="More"
          >
            <HugeiconsIcon icon={MoreIcon} size={22} strokeWidth={1.8} />
            More
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-js-dark/10 bg-js-bg p-5 pb-24"
            >
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mb-4 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">More</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-js-dark/10 text-slate-600"
                  aria-label="Close"
                >
                  <HugeiconsIcon icon={CloseIcon} size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {moreItems.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-xs font-medium transition-colors ${
                        active
                          ? "border-brand-200 bg-brand-50 text-js-dark"
                          : "border-js-dark/10 text-slate-600"
                      }`}
                    >
                      <HugeiconsIcon icon={item.icon} size={24} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <p className="mt-5 text-center text-xs text-js-dark/60">
                {siteConfig.email}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
