"use client";

import { FaqCards } from "@/components/site/ui";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articlePart1, articleFaqs, articlePart2 } from "./articleContent";

const SlidingArrow = ({ colorClass = "text-white" }) => (
  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1">
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


const markdownComponents = {
  h2: ({ node, ...props }: any) => {
    const text = String(props.children);
    const match = text.match(/^(\d+)\.\s+(.*)/);
    if (match) {
      const sectionId = "section-" + match[1];
      return (
        <h2 id={sectionId} className="text-[25px] md:text-[27px] mt-16 mb-7 flex items-center gap-4 border-b border-white/[0.08] pb-4 font-semibold text-white scroll-mt-32">
          <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BEF70A]/25 text-[#BEF70A] text-[17px] font-bold">
            {match[1]}
          </span>
          <span>{match[2]}</span>
        </h2>
      );
    }
    const cleanId = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      <h2 id={cleanId} className="text-[25px] md:text-[27px] mt-16 mb-7 font-semibold text-white border-b border-white/[0.08] pb-4 scroll-mt-32" {...props} />
    );
  },
  h3: ({ node, ...props }: any) => (
    <h3 className="text-[20px] md:text-[21px] font-semibold text-white mt-10 mb-4" {...props} />
  ),
  p: ({ node, ...props }: any) =>
    node?.children?.some((child: any) => child.type === "element" && child.tagName === "img") ? (
      <div className="mb-6 leading-[1.8] text-white/83 font-normal text-[16.5px]" {...props} />
    ) : (
      <p className="mb-6 leading-[1.8] text-white/83 font-normal text-[16.5px]" {...props} />
    ),
  a: ({ node, ...props }: any) => (
    <a className="text-[#BEF70A] hover:underline font-semibold" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="flex flex-col gap-3.5 mb-8 mt-3 pl-1" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="flex items-start gap-3.5 text-white/83 text-[16px] leading-relaxed">
      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.05] mt-1">
        <svg className="w-3 h-3 text-[#BEF70A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="flex-1 font-normal" {...props} />
    </li>
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-white" {...props} />
  ),
  blockquote: ({ node, ...props }: any) => (
    <blockquote className="my-8 py-5 px-6 rounded-[20px] bg-[#BEF70A]/[0.07] text-white/92 text-[17px] italic leading-relaxed" {...props} />
  ),
  table: ({ node, ...props }: any) => (
    <div className="jt-wrap my-8">
      <table className="jt" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => <thead {...props} />,
  th: ({ node, ...props }: any) => <th {...props} />,
  td: ({ node, ...props }: any) => <td {...props} />,
  tr: ({ node, ...props }: any) => <tr {...props} />,
  code: ({ node, className, children, ...props }: any) => (
    <code className={className || "bg-black/25 text-[#BEF70A] font-mono text-xs px-1.5 py-0.5 rounded font-semibold"} {...props}>
      {children}
    </code>
  ),
  pre: ({ node, children }: any) => (
    <div className="my-6 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.05] text-white not-prose shadow-sm">
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed text-[#c3e6cd] [&_code]:bg-transparent [&_code]:p-0 [&_code]:font-normal [&_code]:text-inherit">
        <pre>{children}</pre>
      </div>
    </div>
  ),
  img: ({ node, ...props }: any) => (
    <figure className="my-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] shadow-sm">
      <div className="relative w-full h-[280px] sm:h-[420px] bg-black/25 overflow-hidden">
        <img className="w-full h-full object-cover" {...props} alt={props.alt || "Article graphic"} />
      </div>
      {props.alt && (
        <figcaption className="py-3 px-5 text-[13.5px] text-white/68 font-medium bg-black/[0.02] border-t border-white/[0.08] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#BEF70A] flex-shrink-0" />
          <span>{props.alt}</span>
        </figcaption>
      )}
    </figure>
  )
};

const BlogSidebar = () => {
  const links = [
    { title: "Quick Summary", id: "quick-summary" },
    { title: "1. Why This Problem Happens", id: "section-1" },
    { title: "2. Public vs Rights to Reuse", id: "section-2" },
    { title: "3. Bulk vs Manual Downloading", id: "section-3" },
    { title: "4. The Tool: Instaloader", id: "section-4" },
    { title: "5. Installing Python on Windows", id: "section-5" },
    { title: "6. Anonymous Profile Download", id: "section-6" },
    { title: "7. Saved Folder Architecture", id: "section-7" },
    { title: "8. Downloading Reels", id: "section-8" },
    { title: "9. Business Profile HTTP 400", id: "section-9" },
    { title: "10. The Temporary Patch", id: "section-10" },
    { title: "11. Windows Py Launcher Fix", id: "section-11" },
    { title: "12. Images Are Only 20%", id: "section-12" },
    { title: "13. Build an Image Inventory", id: "section-13" },
    { title: "14. AI Coding Tools Workflow", id: "section-14" },
    { title: "15. Convert Heavy Images to WebP", id: "section-15" },
    { title: "16. Authentic Image SEO", id: "section-16" },
    { title: "17. Keyword Research First", id: "section-17" },
    { title: "18. Map Images to Pages", id: "section-18" },
    { title: "19. Give Every Image a Purpose", id: "section-19" },
    { title: "20. Image Selection Scoring", id: "section-20" },
    { title: "21. Build a Media Manifest", id: "section-21" },
    { title: "22. AI Works From Manifests", id: "section-22" },
    { title: "23. Complete Local SEO System", id: "section-23" },
    { title: "24. 800-Photo Real Project Example", id: "section-24" },
    { title: "25. AI Vision for Alt Text", id: "section-25" },
    { title: "26. Context from Captions", id: "section-26" },
    { title: "27. Case Studies from Sequences", id: "section-27" },
    { title: "28. Avoiding Thin Gallery Pages", id: "section-28" },
    { title: "29. Repeatable Media Pipeline", id: "section-29" },
    { title: "30. Updating Archives", id: "section-30" },
    { title: "31. Common Problems", id: "section-31" },
    { title: "32. AI-Assisted SEO Model", id: "section-32" },
    { title: "33. The Complete Workflow", id: "section-33" },
    { title: "34. Frequently Asked Questions", id: "section-34" },
    { title: "35. Final Takeaway", id: "section-35" },
  ];

  return (
    <div className="w-full lg:w-[320px] flex-shrink-0 sticky top-[120px] pt-4 hidden lg:block">
      <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-[13px] text-white/92 tracking-widest uppercase mb-4">On this page</h3>
        <ul className="flex flex-col gap-1 text-[13.5px] font-medium max-h-[58vh] overflow-y-auto pr-2 custom-scrollbar">
          {links.map((link, idx) => (
            <li key={idx}>
              <a 
                href={"#" + link.id} 
                className="block px-3 py-2 rounded-lg text-white/73 hover:bg-[#06301D]/5 hover:text-[#BEF70A] transition-all duration-200"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function SingleBlogPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <section className="relative w-full pb-24 bg-transparent">
        
        {/* Header with noise overlay and exact styling */}
        <div className="w-full bg-transparent border-b border-white/[0.08] pt-[160px] pb-20 px-6 relative overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
            style={{ 
              backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')", 
              backgroundRepeat: "repeat" 
            }} 
          />
          
          <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center relative z-10">
            <span className="inline-flex items-center justify-center bg-[#BEF70A]/25 text-[#BEF70A] border border-[#BEF70A]/50 text-[12.5px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-[0.12em] mb-7">
              Development &amp; SEO
            </span>
            
            <h1 className="text-[38px] md:text-[54px] lg:text-[60px] font-semibold text-white leading-[1.12] tracking-tight mb-8 max-w-[900px]">
              How to Bulk Download Public Instagram Photos Without Login — And Turn Them Into an SEO-Ready Website Image Library
            </h1>
            <p className="text-[18px] md:text-[21px] text-white/68 max-w-[800px] mb-10 leading-relaxed font-normal">
              A practical guide to retrieving publicly accessible Instagram media in bulk, organizing it with AI agents, converting to modern WebP, and preparing it for website image SEO.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-[15px] text-white/58 font-medium">
              <Link href="/author/sameer-ahmad-basra" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-[10px] text-white font-bold">SB</div>
                Sameer Ahmad Basra
              </Link>
              <span>•</span>
              <span>August 28, 2026</span>
              <span>•</span>
              <span>20 min read</span>
            </div>
          </div>
        </div>

        {/* Body Container */}
        <div className="max-w-[1200px] mx-auto px-6 pt-16 flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Main Article Content */}
          <div className="flex-1 w-full min-w-0 max-w-[800px]">
            
            {/* Top Featured Hero Image Container */}
            <div className="w-full h-[300px] md:h-[480px] bg-black/25 rounded-2xl border border-white/[0.08] mb-14 flex items-center justify-center text-white/28 overflow-hidden relative shadow-sm">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-85"></div>
            </div>
            
            {/* ARTICLE CONTENT USING CUSTOM COMPONENTS */}
            <div className="text-[16.5px] leading-relaxed text-white/88 font-normal">
              
              {/* Part 1 (Sections 1 to 33) */}
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {articlePart1}
              </ReactMarkdown>

              {/* Section 34 FAQs Rendered in its chronological position */}
              <h2 id="section-34" className="text-[25px] md:text-[27px] mt-16 mb-7 flex items-center gap-4 border-b border-white/[0.08] pb-4 font-semibold text-white scroll-mt-32">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#BEF70A]/25 text-[#BEF70A] text-[17px] font-bold">
                  34
                </span>
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="mb-12">
                <FaqCards items={articleFaqs} openFirst={false} />
              </div>

              {/* Part 2 (Section 35 Final Takeaway) */}
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {articlePart2}
              </ReactMarkdown>

            </div>
          </div>
          
          <BlogSidebar />
          
        </div>
      </section>

      {/* Related Articles Section (Clean Inverted Styling on #f9f9f9 background) */}
      <div className="w-full bg-transparent py-24 px-6 border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-[32px] font-bold text-white mb-2">Continue Reading</h2>
              <p className="text-white/68 text-[18px]">More strategies to help your local business grow.</p>
            </div>
            <Link href="/blog" className="bg-[#BEF70A] text-[#0B1F12] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black/70 transition-colors group shadow-sm">
              View all articles <SlidingArrow colorClass="text-white" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Scale Your Local Service Business With Precision Marketing", 
                date: "Aug 24, 2026", 
                cat: "Local SEO & Ads",
                slug: "local-seo-google-ads-service-business",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "Modern Local SEO Roadmap for a Service-Based Business", 
                date: "Aug 14, 2026", 
                cat: "SEO",
                slug: "modern-local-seo-roadmap-service-business",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "5 Website mistakes costing your moving company thousands", 
                date: "Aug 18, 2026", 
                cat: "Web Design",
                slug: "local-seo-google-ads-service-business",
                img: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              }
            ].map((item, idx) => (
              <Link key={idx} href={`/blog/${item.slug}`} className="flex flex-col bg-white/[0.05] border border-white/[0.08] rounded-2xl p-6 shadow-sm group">
                <div className="w-full h-[180px] bg-black/25 rounded-xl mb-6 overflow-hidden relative">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="inline-block bg-[#06301D]/[0.06] text-[#BEF70A] text-[12px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4 self-start">
                  {item.cat}
                </span>
                <h3 className="text-[19px] font-bold text-white leading-snug mb-4 group-hover:text-[#BEF70A] transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-white/[0.08]">
                  <span className="text-[13.5px] text-white/58 font-medium">{item.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}
