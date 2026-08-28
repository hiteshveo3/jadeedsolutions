import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HugeiconsIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  LocationIcon,
  ZapIcon,
  CodeIcon,
  TargetIcon,
  UsersIcon,
  TrendingUpIcon,
  BriefcaseIcon,
  SparklesIcon,
  RocketIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sameer Ahmad Basra — Founder Profile & Story",
  description:
    "Sameer Ahmad Basra is the founder of Jadeed Solutions, helping local service-based businesses generate more bookings through high-performing websites, SEO, software, AI, and custom automation.",
  alternates: {
    canonical: `${siteConfig.url}/sameer-ahmad-basra`,
  },
  openGraph: {
    title: "Sameer Ahmad Basra — Founder of Jadeed Solutions",
    description:
      "Helping local service businesses get more customers by combining high-performing websites, SEO, software, AI, and custom automation.",
    url: `${siteConfig.url}/sameer-ahmad-basra`,
    images: [
      {
        url: "/sameer-ahmad-basra.jpg",
        width: 1080,
        height: 1080,
        alt: "Sameer Ahmad Basra — Founder of Jadeed Solutions",
      },
    ],
  },
};

const SlidingArrow = ({ colorClass = "text-black" }) => (
  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1">
    <svg
      className={
        "absolute w-4 h-4 " +
        colorClass +
        " -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
      }
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
    <svg
      className={
        "absolute w-4 h-4 " +
        colorClass +
        " translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out"
      }
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  </div>
);

export default function FounderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/sameer-ahmad-basra/#profile`,
    url: `${siteConfig.url}/sameer-ahmad-basra`,
    name: "Sameer Ahmad Basra — Founder Profile & Story",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteConfig.url}/sameer-ahmad-basra/#person`,
      name: "Sameer Ahmad Basra",
      jobTitle: "Founder & Lead Architect",
      worksFor: {
        "@type": "Organization",
        name: "Jadeed Solutions",
        url: siteConfig.url,
      },
      image: `${siteConfig.url}/sameer-ahmad-basra.jpg`,
      description:
        "Sameer Ahmad Basra is the founder of Jadeed Solutions, helping local service-based businesses generate more bookings by combining high-performing websites, SEO, software, AI, and custom-built automation.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan",
        addressLocality: "Narowal",
        postalCode: "51600",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      sameAs: [
        "https://pk.linkedin.com/in/sameer-ahmad-basra",
        "https://github.com/hiteshveo3",
      ],
      knowsAbout: [
        "Web Development",
        "Next.js & React",
        "Technical SEO",
        "Local Search Optimization",
        "AI Workflow Automation",
        "Custom Business Software",
        "Conversion Rate Optimization",
      ],
    },
  };

  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#015f45] px-6 pt-[150px] pb-20 text-white border-b border-black/10">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-8 font-medium">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#cbd810]" aria-current="page">
                Sameer Ahmad Basra
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Col: Headshot Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-square rounded-[28px] overflow-hidden border-2 border-white/20 shadow-2xl bg-[#f28a16]">
                <Image
                  src="/sameer-ahmad-basra.jpg"
                  alt="Sameer Ahmad Basra — Founder of Jadeed Solutions"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#111614]/85 backdrop-blur-md border border-white/15 rounded-xl py-2.5 px-4 flex items-center justify-between text-white shadow-lg">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#cbd810]">
                      Founder &amp; Lead Architect
                    </div>
                    <div className="text-sm font-semibold text-white/90">Jadeed Solutions</div>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cbd810] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#cbd810]"></span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Bio & Core Positioning */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="inline-flex items-center justify-center bg-[#cbd810] text-[#111111] text-[12px] font-extrabold px-3.5 py-1.5 rounded-xl uppercase tracking-[0.14em] mb-5 shadow-sm">
                Founder Profile &amp; Story
              </span>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold leading-[1.12] tracking-tight mb-6">
                Sameer Ahmad Basra
              </h1>

              <p className="text-[17px] sm:text-[19px] text-white/90 leading-relaxed font-normal mb-6">
                Helping local service-based businesses generate more bookings by combining high-performing websites, SEO, software, AI, and custom-built automation — with a model where Jadeed Solutions only charges when the business gets an actual booking.
              </p>

              {/* Verified Quick Meta Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 bg-[#014f39]/70 border border-white/15 rounded-2xl p-4 sm:p-5 text-sm">
                <div className="flex items-start gap-2.5">
                  <HugeiconsIcon icon={LocationIcon} size={18} className="text-[#cbd810] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60 font-semibold">Location</span>
                    <span className="text-white/90 font-medium">Narowal, Punjab, Pakistan</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <HugeiconsIcon icon={RocketIcon} size={18} className="text-[#cbd810] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60 font-semibold">Founded</span>
                    <span className="text-white/90 font-medium">December 2024</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <HugeiconsIcon icon={TargetIcon} size={18} className="text-[#cbd810] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60 font-semibold">Official Business Address</span>
                    <span className="text-white/90 font-medium text-xs sm:text-sm">
                      House No. 5, Street No. 1, New Lahore Road, Pejowali Kalan, Narowal 51600, Pakistan
                    </span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group bg-[#cbd810] text-[#111111] font-bold text-[14px] sm:text-[15px] h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-[#b8c50e] shadow-sm"
                >
                  Book a Growth Consultation
                  <SlidingArrow colorClass="text-[#111111]" />
                </Link>
                <a
                  href="https://wa.me/923167669343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold text-[14px] sm:text-[15px] h-12 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  WhatsApp Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STATS BAR */}
      <section className="border-b border-black/10 bg-white py-10 px-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="border-l-2 border-[#015f45] pl-4">
            <div className="text-[28px] md:text-[34px] font-bold text-[#151515] leading-none mb-1">Dec 2024</div>
            <div className="text-xs text-black/60 font-semibold uppercase tracking-wider">Founded Jadeed</div>
          </div>
          <div className="border-l-2 border-[#cbd810] pl-4">
            <div className="text-[28px] md:text-[34px] font-bold text-[#015f45] leading-none mb-1">100%</div>
            <div className="text-xs text-black/60 font-semibold uppercase tracking-wider">Performance-Aligned</div>
          </div>
          <div className="border-l-2 border-[#015f45] pl-4">
            <div className="text-[28px] md:text-[34px] font-bold text-[#151515] leading-none mb-1">Full-Stack</div>
            <div className="text-xs text-black/60 font-semibold uppercase tracking-wider">Web, SEO &amp; AI</div>
          </div>
          <div className="border-l-2 border-[#cbd810] pl-4">
            <div className="text-[28px] md:text-[34px] font-bold text-[#015f45] leading-none mb-1">Global</div>
            <div className="text-xs text-black/60 font-semibold uppercase tracking-wider">UK, UAE, US &amp; PK</div>
          </div>
        </div>
      </section>

      {/* MAIN PROFILE STORY NARRATIVE */}
      <section className="py-20 px-6 max-w-[1000px] mx-auto">
        <div className="space-y-16">
          
          {/* Section 1: Professional Positioning */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              01 · Professional Positioning
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              Technology in Service of Real Business Outcomes
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              My work is not limited to one narrow technical discipline. I started with website development, but over time my work expanded into search engine optimization, frontend and backend development, app development, artificial intelligence, custom business automation, and complete digital systems for service-based businesses.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              The purpose behind all of these technologies is simple: <strong>help a business get found, make it easier for customers to trust and contact that business, and turn that attention into actual bookings.</strong>
            </p>
            <div className="mt-6 p-5 bg-[#015f45]/[0.04] border-l-4 border-[#015f45] rounded-r-xl text-[16px] italic text-[#151515]">
              &ldquo;Technology should never become the main story. The business outcome is the story. A local business owner needs to know that we understand their business, build the right system, improve their visibility, and help turn customer demand into actual work.&rdquo;
            </div>
          </div>

          {/* Section 2: Origin & Fiverr Realities */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              02 · The Journey Begins
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              From WordPress Freelancing to Direct Partnerships
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              My professional journey originally started with <strong>WordPress website development</strong>. At the beginning, my focus was mainly on building websites for clients. I also worked through platforms such as Fiverr, where I gained practical experience dealing with clients and delivering web development services.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              Over time, however, I realized that freelance marketplaces were not the business model I wanted to depend on permanently. Between platform commissions and payment-withdrawal fees, sometimes around <strong>20–25% of the project&apos;s value</strong> could effectively disappear before reaching me.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75">
              More importantly, I wanted to build direct, accountable, and long-term relationships with businesses instead of having a marketplace permanently sitting between the client and me. That became the catalyst to build independently.
            </p>
          </div>

          {/* Section 3: Founding Jadeed & Consistency */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              03 · Founding Story
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              Founding Jadeed Solutions in December 2024
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              I founded <strong>Jadeed Solutions in December 2024</strong>. There was no co-founder.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              In the beginning, I encouraged several friends and people around me to join the journey. We created a group around the idea and initially tried to build something together. Some joined at first, but gradually their interest faded and several moved on.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              <strong>I continued.</strong>
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75">
              That period became a defining chapter because it taught me that ideas are common, but <strong>consistency is what creates the difference</strong>. Today, Jadeed Solutions is the result of continuous learning, building, experimenting, and delivering when others gradually lost momentum.
            </p>
          </div>

          {/* Section 4: Why "Jadeed"? */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              04 · The Vision
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              Why the Name &ldquo;Jadeed&rdquo;?
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              The word <strong>Jadeed</strong> represents being modern, new, and innovative. Jadeed Solutions was initially conceived like a modern marketing and digital services company.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              However, as my skill set expanded and the problems we were solving became more technical, the direction evolved. Instead of remaining purely a marketing agency, Jadeed Solutions transitioned into a <strong>technology and software-driven growth company</strong>.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75">
              Today, marketing remains part of what we solve, but our work increasingly combines websites, technical SEO, frontend and backend development, custom mobile applications, AI systems, workflow automation, and business infrastructure.
            </p>
          </div>

          {/* Section 5: The Turning Points (Just Shine & Alpha Movers) */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              05 · Turning Points
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              How SEO and Modern Engineering Took Center Stage
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-[#015f45] pl-4">
                <h3 className="text-[18px] font-bold text-[#151515] mb-1">
                  Just Shine Cleaning Services (UAE) — The Spark
                </h3>
                <p className="text-[15.5px] leading-relaxed text-black/75">
                  The owner, <strong>Waheedullah</strong>, asked me to work on the SEO of his website. Initially, I had not thought deeply about SEO as a primary career focus. But when the website began showing early ranking jumps and real inquiries in Abu Dhabi, curiosity pushed me to study search algorithms deeply and understand exactly why results happen.
                </p>
              </div>

              <div className="border-l-2 border-[#cbd810] pl-4">
                <h3 className="text-[18px] font-bold text-[#151515] mb-1">
                  Alpha Movers (London, UK) — Full Next.js &amp; AI Scale
                </h3>
                <p className="text-[15.5px] leading-relaxed text-black/75">
                  Working with <strong>Abdullah</strong>, who was building his London removal business, became an invaluable live laboratory. I initially built the site on WordPress, and as traffic surged, rebuilt the entire architecture in <strong>Next.js</strong> with AI-assisted workflows. GSC recorded over 160K impressions, proving that SEO is exponentially more powerful when the practitioner understands the underlying software engineering.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Full Tech Stack & AI Philosophy */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              06 · Engineering &amp; AI Stack
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              Full Digital Systems, Custom Automation &amp; AI
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-6">
              Depending on the business requirement, our technical capabilities span modern web frameworks, mobile applications, and backend systems:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                "Next.js, React & TypeScript",
                "WordPress & Headless CMS",
                "Flutter & Cross-Platform Mobile Apps",
                "Technical SEO & Intent Architecture",
                "AI-Assisted Workflows (ChatGPT, Antigravity)",
                "Custom Automation (Internal tools over bloated SaaS)",
                "Custom Dashboards & Lead Management",
                "Frictionless Booking & One-Tap Calling Engines",
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[15px] font-medium text-black/80">
                  <HugeiconsIcon icon={CheckCircleIcon} size={18} className="text-[#015f45] shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            <p className="text-[15.5px] leading-relaxed text-black/70 italic">
              We prefer building custom automation tools ourselves to maintain full control over business logic, workflows, data security, and long-term operating costs rather than making clients dependent on costly third-party subscriptions.
            </p>
          </div>

          {/* Section 7: The Performance-Based Promise */}
          <div className="bg-gradient-to-br from-[#015f45] to-[#014f39] text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
            <div
              className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />
            <div className="relative z-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#cbd810] mb-2 block">
                07 · Commercial Alignment
              </span>
              <h2 className="text-[26px] sm:text-[32px] font-bold text-white mb-4">
                &ldquo;We Only Charge When You Get an Actual Booking&rdquo;
              </h2>
              <p className="text-[16.5px] leading-relaxed text-white/90 mb-4">
                One of our strongest commercial principles is aligning our revenue directly with client success. Instead of asking local service business owners to pay indefinite retainers for vague marketing activity, we offer arrangements tied directly to booked jobs and verified customer revenue (such as 5% to 10% performance models or structured fixed milestones).
              </p>
              <p className="text-[16.5px] leading-relaxed text-white/80">
                If the client grows, we grow together.
              </p>
            </div>
          </div>

          {/* Section 8: Team & Sister Brands */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 sm:p-10 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#015f45] mb-2 block">
              08 · Team &amp; Brand Ecosystem
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-[#151515] mb-5">
              Focused Team &amp; The Jadeed Ecosystem
            </h2>
            <p className="text-[16.5px] leading-relaxed text-black/75 mb-4">
              Jadeed Solutions operates with a <strong>small and highly capable team</strong>. I remain directly involved in strategy, development, technical SEO, AI systems, automation, and overall quality. <strong>Asad Waqas</strong> works closely alongside me as one of the primary pillars of the business.
            </p>
            <p className="text-[16.5px] leading-relaxed text-black/75">
              Alongside Jadeed Solutions, we are developing <strong>Jadeed Marketing</strong> as a sister brand focused specifically on marketing campaigns, while Jadeed Solutions focuses on technology, software, full-stack development, SEO, and business infrastructure.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL FOUNDER CTA BANNER */}
      <section className="w-full bg-[#111614] text-white py-20 px-6 border-t border-black/10 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <span className="bg-[#cbd810] text-[#111111] text-[11px] font-extrabold px-3.5 py-1.5 rounded-xl uppercase tracking-widest mb-6">
            Direct Partnership
          </span>
          <h2 className="text-[32px] sm:text-[44px] font-bold leading-tight mb-5 max-w-[800px]">
            Ready to Build a Measurable Growth Engine for Your Business?
          </h2>
          <p className="text-[17px] text-white/70 max-w-[680px] leading-relaxed mb-8">
            Let&apos;s discuss your services, target cities, and growth goals. Book a free consultation or message directly on WhatsApp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-[#cbd810] text-[#111111] font-bold text-[15px] h-12 px-7 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-[#b8c50e] shadow-sm"
            >
              Get Free Growth Plan
              <SlidingArrow colorClass="text-[#111111]" />
            </Link>
            <a
              href="mailto:info@jadeedsolutions.com"
              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold text-[15px] h-12 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              info@jadeedsolutions.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
