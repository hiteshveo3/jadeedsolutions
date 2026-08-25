import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies & Client Results | Jadeed Solutions",
  description: "Explore audited case studies and verified growth metrics for local service businesses across the UK & USA.",
};

const SlidingArrow = ({ colorClass = "text-white" }) => (
  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center -mr-0.5 pointer-events-none">
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

const caseStudiesData = [
  {
    id: "alpha-movers",
    client: "Alpha Movers UK",
    category: "Moving & Removals",
    headline: "+320% Increase in Monthly Booked Removals in 90 Days",
    summary: "How a local removal company scaled organic phone calls and eliminated empty truck capacity without paying upfront management retainers.",
    metrics: [
      { label: "Booked Jobs", value: "+320%" },
      { label: "Cost Per Lead", value: "-45%" },
      { label: "Pay Model", value: "10% Performance" },
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Local SEO", "High-Converting Website", "Call Tracking"]
  },
  {
    id: "proclean-commercial",
    client: "ProClean Commercial Services",
    category: "Commercial Cleaning",
    headline: "£0 to £52,000/mo in Recurring Contracts via Google Ads & CRM Attribution",
    summary: "Built a precision search campaign targeting commercial office facilities with strict negative keyword filtering and automated WhatsApp booking.",
    metrics: [
      { label: "Contract Pipeline", value: "£180K+" },
      { label: "Close Rate", value: "38%" },
      { label: "Google Ads ROAS", value: "4.8x" },
    ],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Google Ads", "Conversion Landing Page", "CRM Setup"]
  },
  {
    id: "apex-plumbing",
    client: "Apex Emergency Plumbing",
    category: "Emergency Trades",
    headline: "Dominating the Local 3-Pack Across 12 High-Value Zip Codes",
    summary: "Complete Google Business Profile optimization, review velocity flywheel, and fast mobile emergency landing page for 24/7 plumbing queries.",
    metrics: [
      { label: "Map Pack Rank", value: "Top 3" },
      { label: "Monthly Calls", value: "240+" },
      { label: "Conversion Rate", value: "12.4%" },
    ],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    tags: ["Google Map Pack", "Mobile Speed", "Review Automation"]
  }
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9]">
      
      {/* Header */}
      <section className="w-full bg-white border-b border-black/10 pt-[160px] pb-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center relative z-10">
          <span className="inline-flex items-center justify-center bg-[#cbd810]/25 text-[#015f45] border border-[#cbd810]/50 text-[12.5px] font-bold px-4 py-1.5 rounded-xl uppercase tracking-[0.12em] mb-7">
            Proven Results
          </span>

          <h1 className="text-[40px] md:text-[56px] font-semibold text-[#151515] leading-[1.12] tracking-tight mb-6 max-w-[850px]">
            Real Case Studies & Measurable Growth
          </h1>
          <p className="text-[18px] md:text-[21px] text-black/60 max-w-[750px] mb-10 leading-relaxed font-normal">
            Explore how our precision marketing systems turn search demand into booked appointments and sustainable revenue for local service businesses.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[900px] bg-[#f9f9f9] border border-black/10 rounded-2xl p-6 shadow-sm">
            <div>
              <p className="text-[28px] font-bold text-[#015f45]">+320%</p>
              <p className="text-[13px] text-black/60 font-medium mt-0.5">Average Lead Increase</p>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#151515]">10%</p>
              <p className="text-[13px] text-black/60 font-medium mt-0.5">Performance Pay Model</p>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#015f45]">100%</p>
              <p className="text-[13px] text-black/60 font-medium mt-0.5">Audited Call Tracking</p>
            </div>
            <div>
              <p className="text-[28px] font-bold text-[#151515]">90 Days</p>
              <p className="text-[13px] text-black/60 font-medium mt-0.5">Scaling Roadmap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-col gap-12">
          {caseStudiesData.map((study) => (
            <div
              key={study.id}
              className="bg-white border border-black/10 rounded-3xl p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row gap-10 items-center"
            >
              {/* Image Side */}
              <div className="w-full lg:w-[48%] h-[280px] sm:h-[360px] rounded-2xl overflow-hidden relative bg-black/5 flex-shrink-0 border border-black/5">
                <img
                  src={study.image}
                  alt={study.client}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#015f45] border border-black/10 text-[12px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                  {study.category}
                </span>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-[52%] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-black/5 text-black/70 text-[12px] font-semibold px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-[24px] md:text-[30px] font-semibold text-[#151515] leading-snug mb-4">
                    {study.headline}
                  </h2>
                  <p className="text-[16px] text-black/70 leading-relaxed font-normal mb-8">
                    {study.summary}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10 mb-8">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <p className="text-[22px] md:text-[26px] font-bold text-[#015f45]">
                        {m.value}
                      </p>
                      <p className="text-[12.5px] text-black/55 font-medium mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action CTA Buttons (Each button has its own isolated group trigger) */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="group bg-[#151515] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#015f45] transition-all text-[14.5px] flex items-center gap-2.5 shadow-sm"
                  >
                    <span>View Full Case Study</span>
                    <SlidingArrow colorClass="text-white" />
                  </Link>
                  <Link
                    href="/contact"
                    className="group text-black font-semibold hover:text-[#015f45] transition-colors text-[14.5px] px-3 py-3 flex items-center gap-1.5"
                  >
                    <span>Get Similar Results</span>
                    <SlidingArrow colorClass="text-[#015f45]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="w-full pb-24 px-6">
        <div className="max-w-[1280px] mx-auto bg-[#015f45] text-white rounded-3xl p-10 lg:p-16 text-center flex flex-col items-center relative overflow-hidden shadow-lg">
          <span className="inline-block bg-[#cbd810] text-[#111111] text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-widest mb-6">
            Ready to Scale?
          </span>
          <h2 className="text-[32px] md:text-[46px] font-bold text-white mb-6 max-w-[700px] leading-tight">
            Stop Guessing. Build a Predictable Acquisition Engine.
          </h2>
          <p className="text-white/80 text-[17px] md:text-[19px] max-w-[600px] mb-10 leading-relaxed font-normal">
            Whether you need Local SEO, Google Ads, or a complete high-converting web system, our team is ready to deliver.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-[#cbd810] text-[#111111] font-bold px-8 py-4 rounded-xl hover:bg-[#b8c50e] transition-all text-[15px] shadow-md flex items-center gap-2"
            >
              <span>Book a Strategy Call</span>
              <SlidingArrow colorClass="text-[#111111]" />
            </Link>
            <Link
              href="/tools/growth-check"
              className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-[15px]"
            >
              Free Growth Audit Score
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
