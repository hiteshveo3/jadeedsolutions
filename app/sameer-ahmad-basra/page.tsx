"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HugeiconsIcon,
  LocationIcon,
  RocketIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  CodeIcon,
  ZapIcon,
  TargetIcon,
  SparklesIcon,
  LayersIcon,
  GlobeIcon,
  ArrowRightIcon,
  BriefcaseIcon,
} from "@/components/icons";
import { siteConfig } from "@/lib/site";

const acts = [
  { id: "act-1", number: "01", name: "Authority", label: "Positioning" },
  { id: "act-2", number: "02", name: "Struggle", label: "The Realization" },
  { id: "act-3", number: "03", name: "Breakthrough", label: "I Continued" },
  { id: "act-4", number: "04", name: "Vision", label: "Live Systems" },
  { id: "act-5", number: "05", name: "Alignment", label: "Your Story" },
];

export default function SameerFounderStoryPage() {
  const [activeAct, setActiveAct] = useState("act-1");
  const [justShineTab, setJustShineTab] = useState<"before" | "after">("after");
  const [alphaMoversTab, setAlphaMoversTab] = useState<"before" | "after">("after");
  const [activeSkillCategory, setActiveSkillCategory] = useState<"frameworks" | "ai" | "growth">("frameworks");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const act of acts) {
        const el = document.getElementById(act.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveAct(act.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white/[0.05] text-[#FAF9F6] selection:bg-[#BEF70A] selection:text-[#0B1F12]">
      
      {/* SKIP LINK FOR ACCESSIBILITY */}
      <a
        href="#main-story-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#ABDE09] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to main content
      </a>

      {/* FLOATING INTERACTIVE TIMELINE SPINE (Desktop / Tablet) */}
      <aside
        aria-label="Story Timeline Navigation"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-4 p-3 rounded-2xl bg-white/[0.05]/85 backdrop-blur-md border border-white/[0.08]"
      >
        <span className="text-[10px] font-mono tracking-widest text-[#BEF70A] uppercase px-2">Story Arc</span>
        <div className="flex flex-col gap-2 relative">
          <div className="absolute left-[15px] top-3 bottom-3 w-[2px] bg-white/10 pointer-events-none" />
          {acts.map((act) => {
            const isActive = activeAct === act.id;
            return (
              <button
                key={act.id}
                onClick={() => scrollToSection(act.id)}
                aria-label={`Jump to ${act.name}`}
                className="group relative flex items-center gap-3 px-2 py-1.5 rounded-xl transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BEF70A]"
              >
                <span
                  className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold font-mono transition-all duration-300 ${
                    isActive
                      ? "bg-[#BEF70A] text-[#0B1F12] scale-110"
                      : "bg-white/[0.05] text-white/50 group-hover:text-white group-hover:bg-white/20"
                  }`}
                >
                  {act.number}
                </span>
                <span
                  className={`text-xs font-semibold tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}
                >
                  {act.name}
                  <span className="block text-[10px] text-white/30 font-normal">{act.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MOBILE HORIZONTAL TIMELINE BAR (Sticky at Top) */}
      <div className="lg:hidden sticky top-[68px] z-30 w-full bg-white/[0.05]/95 backdrop-blur-md border-b border-white/[0.08] px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {acts.map((act) => (
          <button
            key={act.id}
            onClick={() => scrollToSection(act.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold transition-colors shrink-0 ${
              activeAct === act.id
                ? "bg-[#BEF70A] text-[#0B1F12]"
                : "bg-white/10 text-white/70 hover:bg-white/15"
            }`}
          >
            {act.number}. {act.name}
          </button>
        ))}
      </div>

      <div id="main-story-content">
        
        {/* ========================================================================= */}
        {/* ACT 1: POSITIONING & AUTHORITY (HERO SECTION) */}
        {/* ========================================================================= */}
        <section
          id="act-1"
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent px-6 pt-[140px] pb-24 border-b border-white/[0.08]"
        >
          {/* Noise Texture Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-35 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          <div className="relative z-10 max-w-[1100px] mx-auto w-full flex flex-col items-center text-center">

            {/* Act Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BEF70A]/40 bg-[#06301D]/80 px-4 py-1 text-xs font-mono font-bold tracking-widest text-[#BEF70A] uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-[#BEF70A] animate-pulse" />
              Act I · Positioning &amp; Authority
            </div>

            {/* Founder Portrait Visual */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white/[0.08] mb-8 bg-[#c6e962] ring-8 ring-[#BEF70A]/20"
            >
              <Image
                src="/team/sameer-ahmad-basra-2026.jpg"
                alt="Sameer Ahmad Basra — Founder of Jadeed Solutions"
                fill
                priority
                className="object-cover object-center"
              />
            </motion.div>

            {/* Main Name Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[42px] sm:text-[60px] lg:text-[72px] font-semibold tracking-[-.05em] text-white leading-[1.08] mb-6"
            >
              Sameer Ahmad Basra
            </motion.h1>

            {/* Subtitle / Core Positioning (Refined conversational lead) */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[20px] sm:text-[24px] lg:text-[26px] font-medium text-[#BEF70A] max-w-[850px] leading-snug mb-6"
            >
              I help local service businesses get booked when they get found.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[16px] sm:text-[18px] text-white/80 max-w-[760px] leading-relaxed font-normal mb-10"
            >
              Through high-performing websites, technical SEO, AI-assisted automation, and a commercial model where Jadeed Solutions only charges when you get an actual booking.
            </motion.p>

            {/* Proof Metric Strip */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full max-w-[820px] grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-4 rounded-2xl bg-[#06301D]/90 border border-white/[0.08] backdrop-blur-md"
            >
              <div className="flex flex-col items-center text-center p-2 border-b sm:border-b-0 sm:border-r border-white/[0.08]">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#BEF70A] font-mono">90+</span>
                <span className="text-xs text-white/70 font-medium">Booked Jobs for One Client in 3 Months</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 border-b sm:border-b-0 sm:border-r border-white/[0.08]">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Dec 2024</span>
                <span className="text-xs text-white/70 font-medium">Founded in Narowal, Pakistan</span>
              </div>
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#BEF70A] font-mono">10%</span>
                <span className="text-xs text-white/70 font-medium">Pay-After-Booking Option</span>
              </div>
            </motion.div>

            {/* Direct Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group bg-[#BEF70A] text-[#0B1F12] font-bold text-base h-14 pl-7 pr-2 rounded-full flex items-center justify-center gap-3 transition-colors hover:bg-[#ABDE09]"
              >
                Book a Growth Consultation
                <HugeiconsIcon
                  icon={ArrowRightIcon}
                  size={18}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#0B1F12] p-[11px] text-[#BEF70A] transition-transform duration-300 group-hover:-rotate-45"
                />
              </Link>
              <a
                href="https://wa.me/923167669343"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-base h-14 px-7 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                WhatsApp Directly
              </a>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 2: THE STRUGGLE (WORDPRESS → FREELANCE CRISIS) */}
        {/* ========================================================================= */}
        <section
          id="act-2"
          className="relative py-28 px-6 bg-white/[0.05] text-[#e0e0e0] border-b border-white/[0.08] overflow-hidden"
        >
          <div className="max-w-[800px] mx-auto">

            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d0d0d0]/60 uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ff5252]" />
              Act II · The Struggle &amp; Market Realities
            </div>

            <h2 className="font-sans text-[28px] sm:text-[36px] font-semibold tracking-[-.03em] text-white leading-tight mb-8">
              From Marketplace Dependencies to Direct Ownership
            </h2>

            <div className="space-y-6 text-[16px] sm:text-[17px] leading-[1.65] text-[#d0d0d0] font-normal">
              <p>
                My professional journey originally started with <strong>WordPress website development</strong>, working through platforms such as Fiverr to gain client experience, understand requirements, and deliver technical solutions.
              </p>
              
              <p>
                Over time, however, I realized that freelance marketplaces were not the model I wanted to depend on permanently. Between platform commission cuts and withdrawal fees, a heavy toll was taken on every transaction.
              </p>

              {/* The Tension Pull Quote */}
              <div className="my-10 p-6 sm:p-8 rounded-2xl bg-[#ff5252]/[0.08] relative">
                <p className="text-[19px] sm:text-[22px] font-medium text-white leading-snug">
                  &ldquo;Between platform commissions and payment-withdrawal fees, 20–25% of every project&apos;s value effectively disappeared before it reached me.&rdquo;
                </p>
                <span className="block mt-3 text-xs font-mono text-[#ff5252] uppercase tracking-wider font-bold">
                  The Breaking Point · Why Marketplace Mediocrity Had to End
                </span>
              </div>

              <p>
                More importantly, I wanted to build direct, accountable, and long-term relationships with businesses instead of having a marketplace permanently sitting between the client and me. That realization became the turning point to build independently.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 3: THE BREAKTHROUGH (CLIMAX — "I CONTINUED") */}
        {/* ========================================================================= */}
        <section
          id="act-3"
          className="relative py-32 px-6 bg-gradient-to-b from-[#1a1e1c] via-[#06301D] to-[#06301D] text-white border-b border-white/[0.08] overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          <div className="relative z-10 max-w-[960px] mx-auto text-center flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BEF70A]/50 bg-[#BEF70A]/10 px-5 py-1.5 text-xs font-mono font-bold tracking-widest text-[#BEF70A] uppercase mb-8">
              <HugeiconsIcon icon={SparklesIcon} size={14} className="text-[#BEF70A]" />
              Act III · The Climax
            </div>

            {/* Giant Title: I Continued */}
            <motion.h2
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[48px] sm:text-[68px] lg:text-[84px] font-bold tracking-[-.04em] text-white leading-none mb-8"
            >
              I Continued<span className="text-[#BEF70A]">.</span>
            </motion.h2>

            <div className="w-24 h-1.5 bg-[#BEF70A] rounded-full mb-12" />

            {/* 3 Punchy Narrative Paragraphs */}
            <div className="space-y-8 text-[18px] sm:text-[21px] leading-[1.7] text-white/90 font-normal max-w-[820px] text-left sm:text-center">
              <p>
                I founded <strong>Jadeed Solutions in December 2024</strong>. No co-founder, no external funding. Just the idea and the conviction that consistency outlasts inspiration.
              </p>

              <p className="text-white/75">
                At first, several friends joined the conversation. We created a group and talked about building something together. Some stayed briefly, but gradually their interest faded. They moved on. The momentum evaporated.
              </p>

              <p className="text-white font-medium text-[20px] sm:text-[23px] bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
                <strong>I continued.</strong> That single decision became the defining moment. Not because everything was easy, but because I chose consistency over comfort. Ideas are common. Everyone has them. Showing up when others quit — that is what creates the difference.
              </p>
            </div>

            {/* Standalone Memorable Quote Callout */}
            <div className="mt-14 inline-block p-6 sm:p-8 rounded-3xl bg-[#06301D]/90 border-2 border-[#BEF70A]/40">
              <blockquote className="text-[22px] sm:text-[28px] font-bold text-[#BEF70A] tracking-tight">
                &ldquo;Consistency is what creates the difference.&rdquo;
              </blockquote>
              <span className="block mt-2 text-xs font-mono text-white/60 uppercase tracking-widest">
                — Sameer Ahmad Basra · Founded December 2024
              </span>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 4: VISION REALIZED (INTERACTIVE CASE STUDIES & CAPABILITY TREE) */}
        {/* ========================================================================= */}
        <section
          id="act-4"
          className="relative py-28 px-6 bg-transparent text-white border-b border-white/[0.08] overflow-hidden"
        >
          <div className="max-w-[1140px] mx-auto">
            
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#BEF70A] uppercase tracking-widest mb-3">
                <HugeiconsIcon icon={RocketIcon} size={16} />
                Act IV · Vision Realized &amp; Proof Systems
              </div>
              <h2 className="font-sans text-[32px] sm:text-[44px] font-semibold tracking-[-.04em] text-white mb-4">
                Where Engineering &amp; Search Deliver Measurable Bookings
              </h2>
              <p className="text-[17px] text-white/73 max-w-[720px] leading-relaxed">
                SEO is not abstract marketing. It is software engineering connected to human search intent.
              </p>
            </div>

            {/* INTERACTIVE CASE STUDY CARDS (Side-by-Side / Before-After Toggle) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              
              {/* CARD 1: Just Shine Cleaning Services */}
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#BEF70A] font-extrabold block">
                        Abu Dhabi, UAE · Cleaning Industry
                      </span>
                      <h3 className="text-[22px] sm:text-[24px] font-bold text-white">
                        Just Shine Cleaning Services
                      </h3>
                    </div>
                    {/* Toggle Button */}
                    <div className="flex items-center rounded-xl bg-black/25 p-1 text-xs font-bold">
                      <button
                        onClick={() => setJustShineTab("before")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          justShineTab === "before" ? "bg-white/[0.05] text-white" : "text-white/68 hover:text-white"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        onClick={() => setJustShineTab("after")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          justShineTab === "after" ? "bg-white/[0.05] text-white" : "text-white/68 hover:text-white"
                        }`}
                      >
                        After SEO
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {justShineTab === "before" ? (
                      <motion.div
                        key="before-js"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4 text-sm text-white/83"
                      >
                        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
                          <span className="font-bold text-rose-900 block mb-1">The Challenge:</span>
                          Basic WordPress site with zero search engine visibility in a hyper-competitive Abu Dhabi territory.
                        </div>
                        <p className="leading-relaxed">
                          Owner <strong>Waheedullah</strong> asked if search optimization could bring real inquiries. It became the testing ground that sparked my obsession with understanding search algorithms.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="after-js"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4 text-sm text-white/83"
                      >
                        <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                          <span className="font-bold text-[#BEF70A] block mb-1">The Breakthrough:</span>
                          Deep technical audit, local service-area architecture, and commercial keyword alignment.
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-3 rounded-xl bg-[#06301D]/5 border border-[#BEF70A]/10 text-center">
                            <div className="text-xl font-bold text-[#BEF70A] font-mono">Page 1</div>
                            <div className="text-[11px] text-white/68 font-medium">Abu Dhabi Google results (client’s Trustpilot review)</div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#06301D]/5 border border-[#BEF70A]/10 text-center">
                            <div className="text-xl font-bold text-[#BEF70A] font-mono">Web + SEO + Social</div>
                            <div className="text-[11px] text-white/68 font-medium">Delivered as one package</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/58 font-medium">
                  <span>Verified 5.0 Trustpilot Review</span>
                  <Link href="/blog/local-seo-google-ads-service-business" className="group inline-flex items-center gap-1.5 text-[#BEF70A] font-bold">
                    Read strategy
                    <HugeiconsIcon icon={ArrowRightIcon} size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* CARD 2: Alpha Movers */}
              <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#BEF70A] font-extrabold block">
                        London, UK · Moving &amp; Removals
                      </span>
                      <h3 className="text-[22px] sm:text-[24px] font-bold text-white">
                        Alpha Movers London
                      </h3>
                    </div>
                    {/* Toggle Button */}
                    <div className="flex items-center rounded-xl bg-black/25 p-1 text-xs font-bold">
                      <button
                        onClick={() => setAlphaMoversTab("before")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          alphaMoversTab === "before" ? "bg-white/[0.05] text-white" : "text-white/68 hover:text-white"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        onClick={() => setAlphaMoversTab("after")}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          alphaMoversTab === "after" ? "bg-white/[0.05] text-white" : "text-white/68 hover:text-white"
                        }`}
                      >
                        After Next.js
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {alphaMoversTab === "before" ? (
                      <motion.div
                        key="before-am"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4 text-sm text-white/83"
                      >
                        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200">
                          <span className="font-bold text-rose-900 block mb-1">The Bottleneck:</span>
                          Original WordPress build struggled with slow mobile page speed and disconnected quote journeys.
                        </div>
                        <p className="leading-relaxed">
                          Owner <strong>Abdullah</strong> needed London search visibility and instant quote requests that converted without manual friction.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="after-am"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4 text-sm text-white/83"
                      >
                        <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                          <span className="font-bold text-[#BEF70A] block mb-1">Next.js &amp; AI Overhaul:</span>
                          Rebuilt from the ground up in Next.js with an AI-assisted content pipeline and fast Core Web Vitals.
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-3 rounded-xl bg-[#06301D]/5 border border-[#BEF70A]/10 text-center">
                            <div className="text-xl font-bold text-[#BEF70A] font-mono">273K</div>
                            <div className="text-[11px] text-white/68 font-medium">Search Impressions (GSC, 3 mo)</div>
                          </div>
                          <div className="p-3 rounded-xl bg-[#06301D]/5 border border-[#BEF70A]/10 text-center">
                            <div className="text-xl font-bold text-[#BEF70A] font-mono">90+</div>
                            <div className="text-[11px] text-white/68 font-medium">Booked Jobs (3 mo)</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/58 font-medium">
                  <span>Google Search Console Verified</span>
                  <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-[#BEF70A] font-bold">
                    View full case study
                    <HugeiconsIcon icon={ArrowRightIcon} size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>

            {/* SKILLS & CAPABILITY TREE */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-3xl p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#BEF70A] font-extrabold block mb-1">
                    System Architecture
                  </span>
                  <h3 className="font-sans text-[24px] sm:text-[28px] font-semibold tracking-[-.03em] text-white">
                    Full-Stack Systems: Where Technology Serves Outcomes
                  </h3>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 bg-black/25 p-1 rounded-xl self-start sm:self-auto">
                  <button
                    onClick={() => setActiveSkillCategory("frameworks")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeSkillCategory === "frameworks"
                        ? "bg-[#BEF70A] text-[#0B1F12]"
                        : "text-white/68 hover:text-white"
                    }`}
                  >
                    Frameworks
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("ai")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeSkillCategory === "ai"
                        ? "bg-[#BEF70A] text-[#0B1F12]"
                        : "text-white/68 hover:text-white"
                    }`}
                  >
                    AI &amp; Automation
                  </button>
                  <button
                    onClick={() => setActiveSkillCategory("growth")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      activeSkillCategory === "growth"
                        ? "bg-[#BEF70A] text-[#0B1F12]"
                        : "text-white/68 hover:text-white"
                    }`}
                  >
                    SEO &amp; Growth
                  </button>
                </div>
              </div>

              {/* Capability Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    cat: "frameworks",
                    title: "Next.js, React & TypeScript",
                    desc: "Sub-second mobile loading speeds, SEO pre-rendering, and enterprise reliability.",
                    icon: CodeIcon,
                  },
                  {
                    cat: "frameworks",
                    title: "Flutter & Mobile Apps",
                    desc: "Cross-platform booking, dispatch, and driver communication apps.",
                    icon: ZapIcon,
                  },
                  {
                    cat: "frameworks",
                    title: "WordPress & Headless CMS",
                    desc: "Deep legacy mastery with modern headless decoupled integration.",
                    icon: LayersIcon,
                  },
                  {
                    cat: "ai",
                    title: "Agentic AI & Antigravity",
                    desc: "Accelerating research, manifests, code refactoring, and content pipelines.",
                    icon: SparklesIcon,
                  },
                  {
                    cat: "ai",
                    title: "Custom In-House Automation",
                    desc: "Building custom automation tools over bloated third-party monthly SaaS subscriptions.",
                    icon: RocketIcon,
                  },
                  {
                    cat: "ai",
                    title: "Lead Capture & Instant Dispatch",
                    desc: "One-tap calling engines, automated WhatsApp confirmations, and CRM sync.",
                    icon: BriefcaseIcon,
                  },
                  {
                    cat: "growth",
                    title: "Technical SEO & Schema",
                    desc: "Intent clustering, JSON-LD schemas, internal link equity, and indexing dominance.",
                    icon: TargetIcon,
                  },
                  {
                    cat: "growth",
                    title: "Google 3-Pack & Local Maps",
                    desc: "Geo-grid dominance when ready-to-book homeowners search for local help.",
                    icon: LocationIcon,
                  },
                  {
                    cat: "growth",
                    title: "Conversion Architecture",
                    desc: "Transforming raw impressions into phone calls, quote requests, and booked jobs.",
                    icon: TrendingUpIcon,
                  },
                ]
                  .filter((item) => item.cat === activeSkillCategory)
                  .map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-2xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#06301D]/10 text-[#BEF70A] flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        <HugeiconsIcon icon={skill.icon} size={20} />
                      </div>
                      <h4 className="text-[17px] font-bold text-white mb-2">{skill.title}</h4>
                      <p className="text-xs text-white/73 leading-relaxed">{skill.desc}</p>
                    </motion.div>
                  ))}
              </div>

              {/* Meta Commentary Box */}
              <div className="mt-10 p-6 rounded-2xl bg-[#06301D]/5 border border-[#BEF70A]/15 text-center">
                <p className="text-[16px] sm:text-[17px] font-medium text-[#BEF70A] italic leading-relaxed">
                  &ldquo;This is where I learned that SEO isn&apos;t marketing — it&apos;s engineering. And engineering without business outcomes is just code.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ACT 5: FUTURE & ALIGNMENT (COMMERCIAL MODEL & TEAM) */}
        {/* ========================================================================= */}
        <section
          id="act-5"
          className="relative py-32 px-6 bg-gradient-to-br from-[#06301D] via-[#06301D] to-[#111614] text-white border-b border-white/[0.08] overflow-hidden"
        >
          <div className="max-w-[920px] mx-auto text-center flex flex-col items-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#BEF70A]/40 bg-[#BEF70A]/10 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-[#BEF70A] uppercase mb-8">
              Act V · Future &amp; Commercial Alignment
            </div>

            <h2 className="font-sans text-[36px] sm:text-[50px] lg:text-[58px] font-semibold tracking-[-.04em] text-white leading-[1.12] mb-6">
              We Don&apos;t Charge for Activity.<br />
              <span className="text-[#BEF70A]">We Charge for Results.</span>
            </h2>

            <div className="space-y-6 text-[17px] sm:text-[19px] leading-relaxed text-white/90 max-w-[780px] font-normal mb-12">
              <p>
                Performance-aligned pricing (such as 5% to 10% of each paid job, with £0 upfront) means I only win when you win. No retainers. No vague promises. Just real bookings and measurable business growth.
              </p>
              <p className="text-white/70 text-base">
                I am not interested in agencies that operate at a distant, detached level. I remain hands-on, directly invested in your growth because my commercial model connects our outcomes.
              </p>
            </div>

            {/* Team Integration Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 border border-white/[0.08] backdrop-blur-md mb-14 text-sm text-white/90">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#BEF70A] text-[#0B1F12] font-bold text-xs flex items-center justify-center border-2 border-[#BEF70A]">
                  SB
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-[#0B1F12] font-bold text-xs flex items-center justify-center border-2 border-[#BEF70A]">
                  AW
                </div>
              </div>
              <span>
                Built by <strong>Sameer Ahmad Basra</strong> and <strong>Asad Waqas</strong>. Scaled for your success.
              </span>
            </div>

            {/* Final Emotional Call to Action */}
            <div className="w-full bg-white/[0.05]/90 border border-white/[0.08] rounded-3xl p-8 sm:p-12 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#BEF70A] font-bold mb-3">
                Your Next Chapter
              </span>
              <h3 className="font-sans text-[28px] sm:text-[36px] font-semibold tracking-[-.03em] text-white mb-4">
                Your Story Starts Here
              </h3>
              <p className="text-white/70 text-base max-w-[560px] mb-8">
                Let&apos;s build a measurable growth engine for your local service business. Book a free consultation or message directly.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="group bg-[#BEF70A] text-[#0B1F12] font-bold text-base h-14 px-8 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] w-full sm:w-auto"
                >
                  Book a Consultation
                  <HugeiconsIcon
                    icon={ArrowRightIcon}
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="mailto:info@jadeedsolutions.com"
                  className="bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-base h-14 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
                >
                  info@jadeedsolutions.com
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
