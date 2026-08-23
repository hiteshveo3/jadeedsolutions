"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { HugeiconsIcon, WhatsappBusinessIcon } from "@/components/icons";

const SHOW_ON = [
  "/pricing",
  "/industries",
  "/contact",
  "/tools",
  "/compare",
  "/guides",
  "/services",
  "/how-it-works",
];

export function StickyWhatsApp() {
  const pathname = usePathname();
  const show = SHOW_ON.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (!show) return null;

  const href = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
    "Hi Jadeed — I came from the website. I'd like help growing my local service business.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Jadeed Solutions"
      className="fixed bottom-20 right-4 z-[65] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] lg:bottom-8 lg:right-8"
    >
      <HugeiconsIcon icon={WhatsappBusinessIcon} size={22} />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
