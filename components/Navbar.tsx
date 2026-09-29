"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HugeiconsIcon, ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const links = [
    ["Services", "/services"],
    ["Solutions", "/how-it-works"],
    ["Blog", "/blog"],
    ["Portfolio", "/portfolio"],
    ["Pricing", "/pricing"],
    ["Contact", "/contact"],
  ] as const;

  return (
    <header
      className={`${
        !isHomepage
          ? "fixed top-0 inset-x-0 z-50 py-3.5 bg-[#015f45] text-white"
          : "absolute top-0 inset-x-0 z-50 pt-5 text-white"
      } px-4 sm:px-6 lg:px-10 transition-all duration-300`}
    >
      {/* Noise Texture Overlay matching the hero section exactly */}
      {!isHomepage && (
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      )}

      <nav
        className="relative z-10 mx-auto flex max-w-[1360px] items-center justify-between gap-4"
        aria-label="Main Navigation"
      >
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-2 rounded-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810] ${
            isHomepage
              ? "h-11 rounded-xl border border-white/20 bg-[#014f39]/80 pl-1 pr-3 backdrop-blur-sm sm:h-12 sm:pl-[5px] sm:pr-4"
              : ""
          }`}
        >
          <Image
            src="/jadeed-favicon.webp"
            alt="Jadeed Solutions Logo"
            width={38}
            height={38}
            className="h-9 w-9 rounded-lg sm:h-[38px] sm:w-[38px]"
          />
          <span className="text-[17px] leading-none sm:text-xl">
            Jadeed
            <br className="hidden sm:inline lg:hidden" /> Solutions
          </span>
        </Link>

        <div className="hidden items-center gap-7 rounded-xl border border-white/20 bg-[#014f39]/80 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`rounded-sm transition-colors hover:text-[#eaf25a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cbd810] ${
                pathname.startsWith(href)
                  ? "text-[#cbd810] font-bold"
                  : "text-white/90"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            aria-label={`Call Jadeed Solutions on ${siteConfig.phone}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#cbd810] text-[#111111] transition-colors hover:bg-[#b8c50e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:hidden"
          >
            <HugeiconsIcon icon={PhoneIcon} size={21} />
          </a>
          <Link
            href="/contact"
            className="group hidden h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#cbd810] px-5 text-sm font-bold text-[#111111] transition-colors hover:bg-[#b8c50e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
          >
            Get a free growth plan
            <span
              className="relative flex h-4 w-4 items-center justify-center overflow-hidden"
              aria-hidden="true"
            >
              <HugeiconsIcon
                icon={ArrowRightIcon}
                size={16}
                className="absolute -translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0"
              />
              <HugeiconsIcon
                icon={ArrowRightIcon}
                size={16}
                className="absolute translate-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full"
              />
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
