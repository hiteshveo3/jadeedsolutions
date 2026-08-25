import React from "react";
import Link from "next/link";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// --- HELPER COMPONENTS ---

const SlidingArrow = ({ colorClass = "text-black" }) => (
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

// Dummy Blog Data
const POSTS = [
  { id: 1, title: "How agentic workflows are changing outbound", category: "GTM Strategies", date: "Aug 24, 2026", excerpt: "Learn how automating your outbound sequences with AI agents can increase your pipeline generation by 300%." },
  { id: 2, title: "Building an exact design system in Next.js", category: "Development", date: "Aug 22, 2026", excerpt: "Discover the best practices for maintaining pixel-perfect fidelity when migrating from Webflow to a custom React stack." },
  { id: 3, title: "Why your TAM sourcing is missing key accounts", category: "Data Foundations", date: "Aug 19, 2026", excerpt: "Stop relying on stale data. Here is how modern companies enrich their CRM with real-time scraping and APIs." },
  { id: 4, title: "The ultimate guide to reverse ETL in 2026", category: "Data Foundations", date: "Aug 15, 2026", excerpt: "Moving data from your warehouse to your tools doesn't have to be hard. A comprehensive technical deep dive." },
  { id: 5, title: "Optimizing your Google Business Profile for 2027", category: "Local SEO", date: "Aug 12, 2026", excerpt: "The definitive guide to taking over the local map pack for moving and cleaning companies." },
  { id: 6, title: "Writing ad copy that converts at 10%", category: "Google Ads", date: "Aug 05, 2026", excerpt: "Stop burning budget on generic keywords. Here is how to structure your ad copy for maximum intent." },
];

const BlogCard = ({ post }: { post: any }) => (
  <div className="group cursor-pointer flex flex-col bg-white border border-black/10 rounded-xl p-5">
    <div className="w-full h-[200px] bg-black/5 rounded-lg mb-5 flex items-center justify-center text-black/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-[#015f45]/0 group-hover:bg-[#015f45]/5 transition-colors duration-300"></div>
      [ Image ]
    </div>
    <BadgeStandard text={post.category} />
    <h3 className="text-[20px] font-semibold text-black leading-snug mb-3 group-hover:text-[#015f45] transition-colors">
      {post.title}
    </h3>
    <p className="text-black/60 text-[15px] line-clamp-2 mb-6">
      {post.excerpt}
    </p>
    <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
      <span className="text-[13px] text-black/50 font-medium">{post.date}</span>
      <span className="group-hover:text-[#015f45] text-black font-semibold flex items-center gap-1 text-[14px]">
        Read <SlidingArrow />
      </span>
    </div>
  </div>
);

export default function BlogPage() {
  return (
    <main className={"min-h-screen " + openSans.className + " bg-[#f9f9f9]"}>
      
      {/* PAGE HEADER */}
      <div className="w-full bg-white border-b border-black/5 pt-[120px] pb-[60px] text-center">
        <h1 className="text-[#015f45] text-[40px] md:text-[56px] font-semibold tracking-tight">The Jadeed Blog</h1>
        <p className="text-black/60 text-[18px] md:text-[22px] max-w-[600px] mx-auto mt-4">Insights, strategies, and updates from our team to help you scale your local business.</p>
      </div>

      <section className="relative w-full px-6 py-24 pb-32">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Featured Post */}
          <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-xl p-6 border border-black/10 mb-16 group cursor-pointer">
            <div className="w-full lg:w-[55%] h-[300px] md:h-[400px] bg-black/5 rounded-lg overflow-hidden relative">
               <div className="absolute inset-0 bg-[#015f45]/0 group-hover:bg-[#015f45]/5 transition-colors"></div>
               <div className="w-full h-full flex items-center justify-center text-black/30 font-medium">[ Featured Image ]</div>
            </div>
            <div className="w-full lg:w-[45%] flex flex-col justify-center items-start lg:pl-6">
              <BadgeFeatured text="New Release" />
              <h2 className="text-[32px] md:text-[40px] font-semibold text-black leading-tight mb-4 group-hover:text-[#015f45] transition-colors">
                How to Scale Your Local Service Business with Precision Marketing
              </h2>
              <p className="text-[17px] text-black/70 mb-8 leading-relaxed">
                Discover the exact Google Ads and SEO frameworks that top-performing moving and cleaning companies use to consistently generate 10% more bookings every single month.
              </p>
              <div className="mt-auto flex items-center justify-between w-full border-t border-black/10 pt-6">
                <span className="text-[14px] text-black/50 font-medium">Aug 26, 2026 • 15 min read</span>
                <Link href="/blog/local-seo-google-ads-service-business" className="group-hover:text-[#015f45] text-black font-semibold flex items-center gap-2">
                  Read article <SlidingArrow />
                </Link>
              </div>
            </div>
          </div>

          {/* Grid of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POSTS.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
          
        </div>
      </section>

    </main>
  );
}
