import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Target, 
  TrendingUp, 
  Search, 
  BarChart3, 
  ShieldCheck,
  CheckCircle2,
  Settings,
  Handshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Growth Proposal | Brabham Quality Heating and Air',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrabhamProposalPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-20 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Growth & Performance Proposal
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-medium">
              Prepared for Charles Sells | Brabham Quality Heating and Air
            </p>
          </div>
          
          <div className="p-8 md:p-10 text-lg leading-relaxed text-slate-600">
            <p className="mb-6">
              Hi Charles,
            </p>
            <p className="mb-6">
              Thank you for reviewing the initial proposal and for your candid feedback. I completely understand your position on the website and the minor concerns regarding the compensation structure.
            </p>
            <p className="font-semibold text-slate-800 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
              My core philosophy is that we are building a mutually beneficial partnership. The strategy below has been adjusted to align 100% with your current infrastructure and comfort level.
            </p>
          </div>
        </div>

        {/* Addressed Concerns Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Zero Infrastructure Changes</h3>
            <p className="text-slate-600">
              You mentioned you do not want to change the website at all and prefer to avoid Next.js. <strong>I hear you loud and clear.</strong> The website will stay exactly where it is and how it is. All our marketing, SEO, and tracking efforts will be built around your existing stack. No migrations, no rebuilds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Handshake size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Flexible Compensation</h3>
            <p className="text-slate-600">
              Regarding your minor concerns with the compensation structure—we can absolutely adjust this. My primary goal is a performance-based relationship where we both win and make money together. We can iron out these minor details on a quick call to ensure it makes perfect sense for your margins.
            </p>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Target className="text-blue-600" />
              The Action Plan
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-8">
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Local SEO & GBP Optimization</h4>
                  <p className="text-slate-600 mb-3">Dominating the local map pack for HVAC queries in your service areas.</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Google Business Profile restructuring and regular updates</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Citation building in hyper-local and HVAC-specific directories</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Review generation strategy implementation</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">2</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Performance Marketing (PPC)</h4>
                  <p className="text-slate-600 mb-3">High-intent lead generation capturing customers actively looking for immediate HVAC repairs and installations.</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Google Local Services Ads (LSA) optimization</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Highly targeted Google Search Ads for high-ticket services</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Advanced conversion tracking (without altering your site's core)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold">3</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">On-Page Content & Authority</h4>
                  <p className="text-slate-600 mb-3">Building topical authority purely through content addition and minor metadata tweaks.</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Publishing targeted service-area pages (City + Service)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Technical on-page adjustments (Title tags, schemas, etc.)</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to discuss the details?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
            Let's get on a brief 15-minute call to finalize the compensation details and align on the launch timeline. I'm excited to help Brabham Quality Heating and Air dominate your local market.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:smbasrag@gmail.com" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-colors text-lg inline-flex items-center justify-center gap-2">
              Email Me Back
            </a>
            <Link href="/" className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold transition-colors text-lg inline-flex items-center justify-center gap-2">
              View Our Main Site
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
