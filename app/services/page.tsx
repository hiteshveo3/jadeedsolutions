import React from "react";
import Link from "next/link";
import {
  HugeiconsIcon,
  LocationIcon,
  TargetIcon,
  ZapIcon,
  SmartphoneIcon,
} from "@/components/icons";

// Helper: Edge-to-Edge Dark Green Textured Hero Background
const BgWithTexture = () => (
  <>
    <div
      className="absolute inset-0 z-0 opacity-90"
      style={{
        background: "linear-gradient(to bottom, #027354 0%, #015f45 70%, #014f39 100%)",
      }}
    />
    <div
      className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
      }}
    />
  </>
);

const servicesList = [
  {
    id: "seo",
    title: "Local SEO & Google 3-Pack Optimization",
    badge: "Core Demand Engine",
    desc: "Dominate local map results and organic search when high-intent homeowners search for your services in your exact city.",
    features: [
      "Google Business Profile complete audit & category alignment",
      "Local 3-Pack prominence & geo-grid ranking boost",
      "High-intent commercial keyword mapping (e.g. 'plumber near me')",
      "Review flywheel setup to outrank established competitors",
    ],
    metrics: "Top 3 Map Pack",
    href: "/services/seo",
    icon: LocationIcon,
  },
  {
    id: "digital-advertising",
    title: "Precision Google Ads & Paid Search",
    badge: "Immediate Lead Capture",
    desc: "Capture ready-to-book customers immediately with negative keyword filtering, strict intent targeting, and conversion tracking.",
    features: [
      "High-intent phrase & exact match ad group structures",
      "Aggressive negative keyword filtering (stop budget waste)",
      "Call tracking & CRM closed-loop revenue attribution",
      "Dedicated high-converting mobile landing pages",
    ],
    metrics: "Immediate Inquiries",
    href: "/services/digital-advertising",
    icon: TargetIcon,
  },
  {
    id: "web-development",
    title: "High-Converting Next.js Websites",
    badge: "Conversion Architecture",
    desc: "Lightning-fast, mobile-first websites designed specifically to turn search clicks into qualified phone calls and estimate requests.",
    features: [
      "Sub-second page load speeds with 100% Core Web Vitals",
      "Frictionless mobile booking & one-tap calling interfaces",
      "Built-in LocalBusiness JSON-LD Schema & technical SEO",
      "WhatsApp & SMS instant lead response integration",
    ],
    metrics: "3x Higher Conversion",
    href: "/services/web-development",
    icon: ZapIcon,
  },
  {
    id: "app-development",
    title: "Custom Booking & Mobile Dispatch Apps",
    badge: "Operational Scale",
    desc: "Streamline customer appointments, team dispatching, and repeat client bookings with custom cross-platform applications.",
    features: [
      "Custom iOS and Android booking apps for your clients",
      "Real-time dispatch, schedule tracking, and SMS alerts",
      "Seamless recurring membership and payment workflows",
      "Direct integration with your existing CRM & tools",
    ],
    metrics: "Automated Dispatch",
    href: "/services/app-development",
    icon: SmartphoneIcon,
  },
];

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden px-6 pt-[160px] pb-[100px] border-b border-black/10">
        <BgWithTexture />
        
        <div className="relative z-20 max-w-[1280px] mx-auto flex flex-col items-start sm:items-center text-left sm:text-center">
          
          <span className="inline-flex items-center justify-center bg-[#cbd810] text-[#111111] text-[12px] font-extrabold px-4 py-1.5 rounded-xl uppercase tracking-[0.14em] mb-7 shadow-sm">
            End-to-End Growth Engine
          </span>

          <h1 className="text-white text-[38px] md:text-[54px] lg:text-[62px] font-semibold leading-[1.12] tracking-tight mb-6 max-w-[920px]">
            Measurable Digital Growth Systems for Local Service Businesses
          </h1>

          <p className="text-white/90 text-[18px] md:text-[22px] font-normal max-w-[760px] leading-relaxed mb-10">
            We don't sell generic marketing retainers. We build unified customer acquisition systems that connect search intent to booked jobs and scalable revenue.
          </p>

          {/* Action Buttons: Left-aligned and 1-row on mobile, centered on desktop */}
          <div className="flex flex-row items-center gap-3 w-full sm:w-auto sm:justify-center">
            <Link
              href="/contact"
              className="group bg-white text-black font-semibold text-[14px] sm:text-[15px] h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-gray-100 shadow-sm flex-1 sm:flex-initial"
            >
              Start Free Trial
              <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1">
                <svg className="absolute w-4 h-4 text-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg className="absolute w-4 h-4 text-black translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </Link>

            <Link
              href="/contact"
              className="group bg-[#cbd810] text-[#111111] font-bold text-[14px] sm:text-[15px] h-12 px-5 sm:px-6 rounded-xl flex items-center justify-center gap-2 transition-colors hover:bg-[#b8c50e] shadow-sm flex-1 sm:flex-initial"
            >
              Get a Demo
              <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-1">
                <svg className="absolute w-4 h-4 text-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg className="absolute w-4 h-4 text-black translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* CORE SERVICES SHOWCASE */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">
        
        <div className="text-center max-w-[750px] mx-auto mb-16">
          <span className="text-[13px] font-bold text-[#015f45] uppercase tracking-widest mb-3 inline-block">
            Our Solutions Architecture
          </span>
          <h2 className="text-[34px] md:text-[44px] font-semibold text-[#151515] leading-tight mb-4">
            Everything Required to Own Your Local Market
          </h2>
          <p className="text-[17px] text-black/60 font-normal leading-relaxed">
            Each service works as a modular pillar or a synchronized acquisition engine tailored to your industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicesList.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-black/10 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-[#015f45]/5 group-hover:bg-[#015f45]/10 flex items-center justify-center text-[#015f45] transition-colors">
                      <HugeiconsIcon icon={srv.icon} size={24} />
                    </span>
                    <div>
                      <span className="text-[12px] font-bold text-[#015f45] uppercase tracking-wider">
                        {srv.badge}
                      </span>
                      <h3 className="text-[22px] md:text-[24px] font-bold text-[#151515] leading-snug group-hover:text-[#015f45] transition-colors">
                        {srv.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-[15.5px] text-black/70 font-normal leading-relaxed mb-6">
                  {srv.desc}
                </p>

                {/* Features Checkmark List */}
                <ul className="space-y-3 mb-8 pt-4 border-t border-black/5">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-[14.5px] text-black/75">
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#015f45] mt-0.5">
                        <svg className="w-3 h-3 text-[#cbd810]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-black/10 flex items-center justify-between mt-auto">
                <span className="text-[13.5px] text-black/50 font-medium">
                  Primary Outcome: <strong className="text-[#015f45] font-bold">{srv.metrics}</strong>
                </span>
                <Link
                  href={srv.href}
                  className="inline-flex items-center gap-1.5 font-bold text-[14.5px] text-[#151515] group-hover:text-[#015f45] transition-colors"
                >
                  Explore Pillar
                  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-0.5">
                    <svg className="absolute w-4 h-4 text-current -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    <svg className="absolute w-4 h-4 text-current translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* FLYWHEEL SECTION */}
      <section className="bg-white border-y border-black/10 py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-[13px] font-bold text-[#015f45] uppercase tracking-widest mb-3 inline-block">
              Integrated Performance
            </span>
            <h2 className="text-[34px] md:text-[44px] font-semibold text-[#151515] leading-tight mb-4">
              How the 4 Pillars Connect into One Compound Flywheel
            </h2>
            <p className="text-[17px] text-black/60 font-normal leading-relaxed">
              Standalone tactics produce disjointed results. Our synchronized ecosystem compounds your market authority month after month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Capture High-Intent Demand",
                desc: "Local SEO 3-Pack and targeted Google Search Ads intercept customers actively looking for urgent services.",
              },
              {
                step: "02",
                title: "Convert with Zero Friction",
                desc: "Sub-second Next.js pages with one-tap calling, WhatsApp routing, and intelligent quote calculators maximize conversions.",
              },
              {
                step: "03",
                title: "Automate Dispatch & Fulfillment",
                desc: "Custom mobile apps and CRM integrations streamline technician routing, appointment alerts, and payment collections.",
              },
              {
                step: "04",
                title: "Compound 5-Star Reputation",
                desc: "Automated post-job review sequences feed back into your Google Business Profile, elevating organic ranking for free.",
              },
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#f9f9f9] border border-black/10 rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[32px] font-extrabold text-[#015f45]/20 block mb-3">
                    {st.step}
                  </span>
                  <h4 className="text-[18px] font-bold text-[#151515] mb-3">
                    {st.title}
                  </h4>
                  <p className="text-[14px] text-black/65 font-normal leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-[1280px] mx-auto px-6 py-24">
        <div className="bg-[#015f45] text-white rounded-3xl p-10 lg:p-16 text-center flex flex-col items-center shadow-md relative overflow-hidden">
          
          <span className="inline-block bg-[#cbd810] text-[#111111] text-[11px] font-extrabold px-3.5 py-1.5 rounded-md uppercase tracking-widest mb-6">
            Ready to Dominate?
          </span>

          <h2 className="text-[32px] md:text-[46px] font-bold text-white mb-6 max-w-[700px] leading-tight">
            Build a predictable customer acquisition system for your local business.
          </h2>

          <p className="text-white/80 text-[17px] md:text-[19px] max-w-[600px] mb-10 leading-relaxed font-normal">
            Schedule a growth strategy session to audit your local search territory, ad efficiency, and conversion architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-[#cbd810] text-[#111111] font-bold px-8 py-4 rounded-xl hover:bg-[#b8c50e] transition-all text-[15px] shadow-sm flex items-center gap-2"
            >
              <span>Schedule Strategy Call</span>
              <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-0.5">
                <svg className="absolute w-4 h-4 text-current -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <svg className="absolute w-4 h-4 text-current translate-x-0 group-hover:translate-x-full transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
