import React from "react";
import Link from "next/link";
import { posts } from "@/lib/blog";

const SlidingArrow = ({ colorClass = "text-black" }) => (
  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1" aria-hidden="true">
    <svg className={"absolute w-4 h-4 " + colorClass + " -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
    <svg className={"absolute w-4 h-4 " + colorClass + " translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  </div>
);

const BadgeFeatured = ({ text }: { text: string }) => (
  <span className="inline-block bg-[#cbd810]/30 text-[#015f45] text-[12px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3 border border-[#cbd810]/50">
    {text}
  </span>
);

const BadgeStandard = ({ text }: { text: string }) => (
  <span className="inline-block bg-black/5 text-black/70 text-[12px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3 border border-black/10">
    {text}
  </span>
);

export default function BlogPage() {
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      
      {/* PAGE HEADER */}
      <div className="w-full bg-white border-b border-black/5 pt-[120px] pb-[60px] text-center">
        <h1 className="text-[#015f45] text-[40px] md:text-[56px] font-semibold tracking-tight">The Jadeed Blog</h1>
        <p className="text-black/60 text-[18px] md:text-[22px] max-w-[600px] mx-auto mt-4">
          Actionable systems, technical guides, and growth strategies for local service businesses.
        </p>
      </div>

      <section className="relative w-full px-6 py-20 pb-32">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Featured Post */}
          {featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl p-6 md:p-8 border border-black/10 mb-16 group cursor-pointer hover:border-[#015f45]/30 transition-all shadow-xs"
            >
              <div className="w-full lg:w-[50%] h-[280px] md:h-[380px] bg-[#EFF6F2] border border-[#015f45]/10 rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#015f45] text-white flex items-center justify-center font-bold text-xl mb-4 shadow-sm">
                  ⚡
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#015f45] bg-white px-3 py-1 rounded-md border border-[#015f45]/20 mb-2">
                  Technical Architecture
                </div>
                <div className="text-xs text-black/60 max-w-[260px]">
                  Instagram Media Pipeline → WebP Conversion → Image SEO
                </div>
              </div>
              <div className="w-full lg:w-[50%] flex flex-col justify-center items-start lg:pl-4">
                <BadgeFeatured text="Latest Technical Guide" />
                <h2 className="text-[26px] md:text-[34px] font-semibold text-black leading-tight mb-4 group-hover:text-[#015f45] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-[15.5px] md:text-[16.5px] text-black/70 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between w-full border-t border-black/10 pt-6">
                  <span className="text-[13px] md:text-[14px] text-black/50 font-medium">
                    {featuredPost.date} • {featuredPost.readingTime}
                  </span>
                  <span className="group-hover:text-[#015f45] text-black font-semibold flex items-center gap-2 text-sm">
                    Read article <SlidingArrow />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer flex flex-col bg-white border border-black/10 rounded-xl p-6 hover:border-[#015f45]/30 transition-all shadow-xs"
              >
                <div className="w-full h-[180px] bg-black/5 rounded-lg mb-5 flex flex-col items-center justify-center text-black/40 overflow-hidden relative border border-black/[0.04]">
                  <div className="absolute inset-0 bg-[#015f45]/0 group-hover:bg-[#015f45]/5 transition-colors duration-300"></div>
                  <span className="text-2xl mb-1">📄</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">{post.category}</span>
                </div>
                <BadgeStandard text={post.category} />
                <h3 className="text-[19px] font-semibold text-black leading-snug mb-3 group-hover:text-[#015f45] transition-colors">
                  {post.title}
                </h3>
                <p className="text-black/60 text-[14.5px] line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-[13px] text-black/50 font-medium">{post.date}</span>
                  <span className="group-hover:text-[#015f45] text-black font-semibold flex items-center gap-1 text-[13px]">
                    Read <SlidingArrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
      </section>

    </main>
  );
}
