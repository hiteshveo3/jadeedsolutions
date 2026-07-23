"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { LinkButton } from "./Button";
import {
  HugeiconsIcon,
  SearchIcon,
  ArrowDownIcon,
  ArrowRightIcon,
} from "./icons";

const primaryLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  const openSearch = () =>
    window.dispatchEvent(new Event("open-command-search"));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-display text-base font-semibold sm:text-lg"
        >
          <Image
            src="/logo.png"
            alt={`${siteConfig.name} logo`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Link
              href="/services"
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith("/services")
                  ? "bg-brand-50 text-brand-500"
                  : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              Services
              <span
                role="presentation"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setServicesOpen((v) => !v);
                }}
                className="inline-flex"
              >
                <HugeiconsIcon
                  icon={ArrowDownIcon}
                  size={16}
                  className={`transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Link>
          </div>

          {primaryLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-500"
                    : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Center search */}
        <div className="hidden flex-1 lg:block">
          <button
            type="button"
            onClick={openSearch}
            className="flex h-10 w-full items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 text-left text-sm text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-100"
          >
            <HugeiconsIcon icon={SearchIcon} size={16} className="shrink-0" />
            <span className="flex-1 truncate">Search services, pages…</span>
            <span className="hidden shrink-0 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-medium text-slate-500 sm:block">
              Ctrl K
            </span>
          </button>
        </div>

        {/* Desktop right */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LinkButton href="/contact" size="sm">
            Get a Quote
          </LinkButton>
        </div>

        {/* Mobile right */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LinkButton href="/contact" size="sm">
            Get a Quote
          </LinkButton>
        </div>
      </div>

      {/* Services mega menu */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            className="absolute inset-x-0 top-full hidden border-b border-slate-200 bg-white shadow-lg lg:block"
          >
            <div className="container py-6">
              <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Our services
                    </span>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:underline"
                    >
                      View all
                      <HugeiconsIcon icon={ArrowRightIcon} size={14} />
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-100"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-500">
                          <HugeiconsIcon icon={service.icon} size={20} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">
                            {service.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                            {service.summary}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-brand-500 p-6 text-white">
                  <span className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ring-white/20 backdrop-blur-md">
                    Free consultation
                  </span>
                  <h4 className="mt-3 font-display text-lg font-semibold">
                    Not sure which service you need?
                  </h4>
                  <p className="mt-1 text-sm text-white/85">
                    Tell us your goals and we&rsquo;ll recommend the right mix —
                    free, no obligation.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-500 transition-colors hover:bg-white/90"
                  >
                    Get a quote
                    <HugeiconsIcon icon={ArrowRightIcon} size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
