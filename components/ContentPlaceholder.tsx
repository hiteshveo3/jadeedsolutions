import React from "react";
import Link from "next/link";

interface PlaceholderProps {
  badge?: string;
  title: string;
  category?: string;
  subtitle?: string;
  parentPath?: string;
  parentLabel?: string;
}

export function ContentPlaceholder({
  badge = "Under Development",
  title,
  category = "Jadeed Solutions",
  subtitle = "Our team is currently preparing and finalizing the in-depth data, playbooks, and case studies for this section for 2026.",
  parentPath = "/",
  parentLabel = "Return Home",
}: PlaceholderProps) {
  return (
    <main className="min-h-screen bg-[#f9f9f9] flex flex-col justify-between">
      <section className="relative w-full pt-[160px] pb-24 px-6 flex items-center justify-center">
        {/* Subtle Noise Texture */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-[800px] w-full mx-auto text-center flex flex-col items-center relative z-10">
          <span className="inline-flex items-center justify-center bg-[#cbd810]/25 text-[#015f45] border border-[#cbd810]/50 text-[12px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-[0.12em] mb-7">
            {badge}
          </span>

          <span className="text-[14px] font-semibold text-[#015f45] uppercase tracking-widest mb-3">
            {category}
          </span>

          <h1 className="text-[36px] md:text-[48px] lg:text-[54px] font-semibold text-[#151515] leading-[1.15] tracking-tight mb-6 max-w-[700px]">
            {title}
          </h1>

          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm w-full my-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#cbd810] animate-pulse" />
              <span className="text-[13px] font-bold text-black/60 uppercase tracking-wider">
                Status: In Editorial & Technical Review
              </span>
            </div>
            <p className="text-[17px] text-black/75 leading-relaxed font-normal mb-6">
              {subtitle}
            </p>
            <p className="text-[15px] text-black/60 leading-relaxed font-normal">
              Content is currently being prepared & updated for 2026. For immediate inquiries or specific project requirements, please contact our team directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <Link
              href={parentPath}
              className="bg-[#151515] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-black/85 transition-all text-[15px] shadow-sm flex items-center gap-2"
            >
              ← {parentLabel}
            </Link>
            <Link
              href="/contact"
              className="bg-[#015f45] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#015f45]/90 transition-all text-[15px] shadow-sm"
            >
              Contact Team Jadeed
            </Link>
            <Link
              href="/blog"
              className="bg-white border border-black/10 text-black font-semibold px-6 py-3.5 rounded-xl hover:bg-black/5 transition-all text-[15px]"
            >
              Read Latest Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
