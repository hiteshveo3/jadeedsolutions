"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HugeiconsIcon,
  LocationIcon,
  TargetIcon,
  ZapIcon,
  SmartphoneIcon,
  BriefcaseIcon,
  SparklesIcon,
  RocketIcon,
  LayersIcon,
  BookIcon,
  TrendingUpIcon,
  SearchIcon,
  GridIcon,
} from "@/components/icons";

// Accessible, single-element NavLink with CSS underline & color transition (replaces DOM-heavy letter splitting)
const NavLink = ({
  children,
  onMouseEnter,
  active,
}: {
  children: React.ReactNode;
  onMouseEnter?: () => void;
  active?: boolean;
}) => {
  return (
    <span
      onMouseEnter={onMouseEnter}
      className={`relative inline-flex items-center py-1 transition-colors duration-200 cursor-pointer ${
        active
          ? "text-brand font-semibold"
          : "text-ink/75 hover:text-brand focus-visible:text-brand"
      } group`}
    >
      <span>{children}</span>
      <span
        className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand origin-left transition-transform duration-200 ease-out ${
          active
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        }`}
        aria-hidden="true"
      />
    </span>
  );
};

export function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const openSearch = () => window.dispatchEvent(new Event("open-command-search"));

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center">
      {/* Top Announcement Bar (Light & Warm Editorial Design) */}
      <div className="w-full bg-surface-muted text-ink text-xs font-semibold tracking-wider py-2 px-4 text-center flex items-center justify-center gap-2 border-b border-black/[0.06]">
        <span className="bg-brand text-white text-[10px] font-extrabold px-2 py-0.5 rounded mr-1">
          NEW 2026 PLAYBOOK
        </span>
        <span className="hidden sm:inline text-ink/75">
          Scale local service revenue with precision marketing:
        </span>
        <Link
          href="/blog/local-seo-google-ads-service-business"
          className="text-brand font-bold underline underline-offset-4 hover:text-brand-dark transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Read the guide →
        </Link>
      </div>

      {/* Full-width Nav */}
      <nav className="w-full bg-surface relative" onMouseLeave={() => setHoveredItem(null)} aria-label="Main Navigation">
        <div className="flex items-center justify-between px-6 py-3 border-b border-black/5 max-w-[1400px] mx-auto">
          
          {/* Left Logo + Links */}
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-ink flex items-center gap-2 mr-8 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Image src="/logo.png" alt="Jadeed Solutions Logo" width={28} height={28} className="rounded-md" />
              <span>Jadeed Solutions</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-7 text-base font-medium ml-4">
              <Link
                href="/services"
                onMouseEnter={() => setHoveredItem(null)}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <NavLink>Services</NavLink>
              </Link>
              
              {/* Solutions Dropdown Trigger with Clean Chevron */}
              <div 
                onMouseEnter={() => setHoveredItem("Solutions")} 
                className="flex items-center gap-1 cursor-pointer group py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-expanded={hoveredItem === "Solutions"}
                aria-haspopup="true"
              >
                <NavLink active={hoveredItem === "Solutions"}>Solutions</NavLink>
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    hoveredItem === "Solutions" ? "rotate-180 text-brand" : "text-black/40 group-hover:text-ink"
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <Link
                href="/blog"
                onMouseEnter={() => setHoveredItem(null)}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <NavLink>Blog</NavLink>
              </Link>
              <Link
                href="/portfolio"
                onMouseEnter={() => setHoveredItem(null)}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <NavLink>Portfolio</NavLink>
              </Link>
              <Link
                href="/pricing"
                onMouseEnter={() => setHoveredItem(null)}
                className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <NavLink>Pricing</NavLink>
              </Link>
            </div>
          </div>
          
          {/* Right Side Buttons */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <button 
              onClick={openSearch}
              aria-label="Open command search"
              className="hidden lg:flex items-center gap-2 text-black/50 hover:text-ink mr-2 border-r border-black/10 pr-4 transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span className="border border-black/10 rounded px-1.5 py-0.5 text-xs font-mono" aria-hidden="true">⌘ K</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <Link
              href="/about"
              className="hidden md:block text-ink/80 font-semibold hover:text-brand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              About
            </Link>
            
            {/* Desktop Secondary Link */}
            <Link
              href="/contact"
              className="hidden md:flex text-ink/80 font-semibold hover:text-brand transition-colors px-2 py-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Contact
            </Link>
            
            {/* Primary CTA in Jadeed Green */}
            <Link
              href="/pricing"
              className="group bg-brand text-white font-semibold px-4 py-2 rounded-xl hover:bg-brand-dark transition-all duration-200 flex items-center gap-1.5 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <span>Get pricing</span>
              <span className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1" aria-hidden="true">
                <svg className="absolute w-4 h-4 text-white -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg className="absolute w-4 h-4 text-white translate-x-0 group-hover:translate-x-full transition-transform duration-200 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Solutions Mega Menu Dropdown with Unified Hugeicons */}
        <AnimatePresence>
          {hoveredItem === "Solutions" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 bg-surface border-b border-black/10 pt-8 pb-10 px-8 z-50 shadow-xl"
            >
              <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* Column 1: Core Growth Engines */}
                <div>
                  <h4 className="text-xs font-bold text-brand tracking-widest mb-4 uppercase">
                    Growth Engines
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/services/seo" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors text-emerald-800">
                          <HugeiconsIcon icon={LocationIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Local SEO & 3-Pack</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Dominate local map pack & organic search</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/digital-advertising" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors text-amber-800">
                          <HugeiconsIcon icon={TargetIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Google Ads & PPC</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">High-intent search campaigns with zero waste</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/web-development" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-100 transition-colors text-sky-800">
                          <HugeiconsIcon icon={ZapIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Next.js Web Design</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Sub-second conversion websites</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/app-development" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors text-purple-800">
                          <HugeiconsIcon icon={SmartphoneIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Custom Mobile Apps</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">iOS & Android dispatch & booking apps</div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Industry Blueprints */}
                <div>
                  <h4 className="text-xs font-bold text-brand tracking-widest mb-4 uppercase">
                    Industry Blueprints
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/industries/seo-for-plumbers" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors text-blue-800">
                          <HugeiconsIcon icon={BriefcaseIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Plumbing & Heating</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Emergency calls & boiler installations</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/industries/seo-for-cleaners" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors text-teal-800">
                          <HugeiconsIcon icon={SparklesIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Cleaning Companies</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Residential & commercial recurring jobs</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/industries/seo-for-uk-removals" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors text-amber-800">
                          <HugeiconsIcon icon={RocketIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Moving & Removals</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">High-ticket house removals & packing</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/industries/seo-for-local-service-businesses" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors text-rose-800">
                          <HugeiconsIcon icon={LayersIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Contractors & Trades</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Electricians, roofers & builders</div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Strategy & Resources */}
                <div>
                  <h4 className="text-xs font-bold text-brand tracking-widest mb-4 uppercase">
                    Strategy & Insights
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/blog/local-seo-google-ads-service-business" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors text-indigo-800">
                          <HugeiconsIcon icon={BookIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">2026 Growth Playbook</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Step-by-step local acquisition guide</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/portfolio" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors text-emerald-800">
                          <HugeiconsIcon icon={TrendingUpIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Case Studies & Proof</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Real verified local client results</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/growth-check" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-100 transition-colors text-yellow-800">
                          <HugeiconsIcon icon={SearchIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Free Growth Check</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Instant territory & SEO audit</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/compare/jadeed-vs-marketing-agency" className="flex items-start gap-3 group p-2 -mx-2 rounded-xl hover:bg-surface-canvas transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
                        <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors text-purple-800">
                          <HugeiconsIcon icon={GridIcon} size={20} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">Compare Models</div>
                          <div className="text-xs text-ink/55 mt-0.5 font-normal">Jadeed vs agencies vs freelancers</div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Featured Promo Card */}
                <div className="bg-surface-canvas border border-black/10 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-brand-accent text-ink text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider mb-3">
                      Performance Pricing
                    </span>
                    <h5 className="text-md font-bold text-ink mb-2">Revenue-Aligned Partnership</h5>
                    <p className="text-xs text-ink/65 leading-relaxed mb-4 font-normal">
                      Pay performance fees only on verified collected bookings. Zero fixed agency retainers.
                    </p>
                  </div>
                  <Link 
                    href="/pricing" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    View Pricing Models →
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
