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
  Handshake,
  MapPin,
  Star,
  LineChart,
  FileText
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
    <div className="min-h-screen bg-transparent py-12 sm:py-20 font-sans text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft overflow-hidden mb-8 border border-white/[0.08]">
          <div className="bg-gradient-to-r from-[#0B561C] to-[#06301D] px-8 py-12 text-white border-b-4 border-[#BEF70A]">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Brabham Quality Heating & Air
            </h1>
            <p className="text-lg md:text-2xl text-brand-100 font-light mb-8">
              Digital Acquisition & Growth Proposal
            </p>
            <div className="pt-8 border-t border-white/[0.08] text-sm font-medium flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="text-white/52">Prepared for:</span> Charles
              </div>
              <div className="text-left md:text-right">
                <span className="text-white/52">Prepared by:</span> Sameer Ahmad<br />
                <a href="https://www.jadeedsolutions.com" className="text-brand-300 underline hover:text-brand-200 transition-colors">www.jadeedsolutions.com</a>
              </div>
            </div>
          </div>
          
          <div className="p-8 md:p-10 text-lg leading-relaxed text-white/80">
            <h2 className="text-2xl font-bold mb-4 text-white">Dear Charles,</h2>
            <p className="mb-4">
              Thank you again for sharing all of the details. I’ve now completed my initial review of Brabham Quality Heating and Air, and I’m genuinely interested in working with you on this.
            </p>
            <p className="mb-4">
              From what I can see, I believe there is a very strong opportunity to build Brabham into a significant source of consistent, high-intent inbound business, particularly because HVAC customers are usually searching when they already have a problem or are actively considering a replacement, installation, or improvement.
            </p>
            <div className="rounded-[20px] bg-[#BEF70A]/[0.07] p-6 my-6 text-white font-medium">
              My objective would not simply be to bring traffic to the website. The objective would be to bring people who are actually looking for HVAC services and turn that search demand into calls, appointments and booked jobs.
            </div>
          </div>
        </div>

        {/* Opportunity Section */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft border-t-4 border-[#BEF70A] overflow-hidden mb-8 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
            <MapPin className="text-[#BEF70A]" />
            What I See as the Opportunity
          </h2>
          <p className="mb-4 leading-relaxed">The market territory you mentioned is quite large:</p>
          <ul className="space-y-3 mb-6 font-medium text-white/80">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#BEF70A]" /> 
              Beaufort, SC → Midway, GA (North to South)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#BEF70A]" /> 
              Statesboro, GA → the Coast (East to West)
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-white/80">
            Because this is such a broad territory, I would first like to confirm exactly which cities and areas Brabham currently services. If you genuinely cover the entire territory you mentioned, that gives us considerably more search demand to work with.
          </p>
          <p className="mb-6 leading-relaxed text-white/80">
            I would then build the marketing around the services and locations where customers are actually searching. The main focus would be on the higher-value opportunities you mentioned, particularly:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/[0.05] border border-white/[0.08] p-4 rounded-xl text-center font-semibold text-white/80">System replacements</div>
            <div className="bg-white/[0.05] border border-white/[0.08] p-4 rounded-xl text-center font-semibold text-white/80">New HVAC installations</div>
            <div className="bg-white/[0.05] border border-white/[0.08] p-4 rounded-xl text-center font-semibold text-white/80">Indoor air quality</div>
            <div className="bg-white/[0.05] border border-white/[0.08] p-4 rounded-xl text-center font-semibold text-white/80">Other high-value HVAC services</div>
            <div className="bg-white/[0.05] border border-white/[0.08] p-4 rounded-xl text-center font-semibold text-white/80 md:col-span-2">Repair and maintenance searches where they make commercial sense</div>
          </div>
          <p className="leading-relaxed text-white/80">
            Rather than targeting everything randomly, I would identify where the strongest demand and commercial opportunities are and build around those areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Website Foundation */}
          <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <Settings className="text-[#BEF70A]" />
              The Website Foundation & Next.js
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              My strong recommendation is to rebuild the website in <strong>Next.js</strong>.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              The current website has some limitations, and fixing those issues or adding AI features could take a lot of time and increase the cost. With Next.js, I can build a better design, integrate AI using Gemini and other AI tools, and make the website easier to manage and customize. I can also set everything up on your side.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              I understand that you have already paid for the current website, and <strong>I am not asking you to pay again for this.</strong> I am only recommending this based on my previous experience.
            </p>
            <div className="rounded-[20px] bg-[#BEF70A]/[0.07] p-4 mb-4">
              <p className="text-sm font-semibold text-white">
                The websites I converted to Next.js have seen up to 5x growth in traffic. I also shared the Excel data with you reflecting this.
              </p>
            </div>
            <p className="text-sm leading-relaxed text-white/72 font-medium">
              If you want, I can show you the results through videos, or we can have a live call and discuss how we can move forward.
            </p>
          </div>

          {/* Google Opportunity */}
          <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <Star className="text-yellow-500" />
              One of the Biggest Opportunities
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              I noticed that Brabham already has a Google Business Profile, which is a great starting point. However, it currently has zero reviews. <strong>This is something I would consider one of our highest priorities.</strong>
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              For a local HVAC business, genuine customer reviews have a major impact on trust and local visibility. If we can build a strong base of genuine Google reviews over time (e.g., 40–50+ reviews), we can give the business a much stronger position in local search.
            </p>
            <p className="text-sm leading-relaxed font-semibold text-white">
              The goal is not simply to collect reviews. The goal is to build enough real-world trust that when someone sees Brabham in search results, they are much more likely to call.
            </p>
          </div>
        </div>

        {/* Traffic -> Actual Business & Case Study */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] overflow-hidden mb-8 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-white">Website Traffic → Actual Business</h2>
          <p className="mb-4 leading-relaxed font-semibold text-white">
            I also want to make one thing very clear: I don't consider traffic itself a success.
          </p>
          <p className="mb-4 leading-relaxed text-white/80">
            For example, if we eventually build the website to several thousand relevant organic visits per month, the important question isn't <em>"How much traffic did we generate?"</em> The important question is:
          </p>
          <blockquote className="rounded-[20px] bg-[#BEF70A]/[0.07] p-6 text-white mb-6 font-semibold text-lg">
            “How many of those visitors became real customers?”
          </blockquote>
          <p className="mb-4 leading-relaxed text-white/80">
            Based on competitive research, I believe <strong>2,000–3,000+ monthly organic visits</strong> is a realistic medium-term target to work toward, potentially within approximately 3–6 months depending on the market and competition.
          </p>
          <p className="mb-8 leading-relaxed font-medium text-white">
            If the website is properly structured around high-intent searches, the commercial value can become significant. The quality of that traffic matters far more than simply getting visitors.
          </p>

          <div className="border-t border-white/[0.08] pt-8 mt-8">
            <h3 className="font-bold text-2xl mb-4 text-white flex items-center gap-2">
              <TrendingUp className="text-[#BEF70A]" />
              Case Study: Alpha Movers UK
            </h3>
            <p className="mb-6 leading-relaxed text-sm text-white/72">
              I have direct experience with a UK local-service business, Alpha Movers, where we successfully turned organic website traffic into actual booked jobs.
            </p>
            
            <div className="rounded-[20px] bg-[#BEF70A]/[0.07] p-6 mb-8 text-white">
              <p className="font-bold text-lg mb-2 text-brand-200">The Result After 6 Months:</p>
              <p className="text-2xl font-bold mb-2 text-white">15–20 confirmed bookings per month, generated exclusively through SEO.</p>
              <p className="text-sm text-white/70">
                Depending on the type of traffic, around 10 website clicks are currently resulting in approximately 1–2 booked jobs in our strongest segments.
              </p>
            </div>

            <p className="mb-4 text-sm font-bold text-white">6-Month SEO Growth Trajectory (Monthly Bookings)</p>
            
            {/* Tailwind Bar Chart */}
            <div className="border border-white/[0.08] p-6 mb-8 bg-white/[0.05] rounded-xl">
              <div className="flex items-end h-40 gap-2 mb-2">
                <div className="w-1/6 bg-white/25 h-[10%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">2</span></div>
                <div className="w-1/6 bg-brand-200 h-[25%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">5</span></div>
                <div className="w-1/6 bg-brand-300 h-[45%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">9</span></div>
                <div className="w-1/6 bg-brand-400 h-[60%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">12</span></div>
                <div className="w-1/6 bg-[#BEF70A] h-[85%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">17</span></div>
                <div className="w-1/6 bg-[#BEF70A] h-[100%] relative rounded-t"><span className="absolute -top-6 w-full text-center text-xs font-bold text-white/72">20</span></div>
              </div>
              <div className="flex justify-between text-xs font-medium text-white/62 border-t border-white/[0.08] pt-3">
                <span className="w-1/6 text-center">Month 1</span>
                <span className="w-1/6 text-center">Month 2</span>
                <span className="w-1/6 text-center">Month 3</span>
                <span className="w-1/6 text-center">Month 4</span>
                <span className="w-1/6 text-center">Month 5</span>
                <span className="w-1/6 text-center">Month 6</span>
              </div>
            </div>

            <div className="overflow-x-auto mb-6 rounded-xl border border-white/[0.08]">
              <table className="w-full text-sm text-left">
                <thead className="bg-transparent text-white/80">
                  <tr>
                    <th className="p-4 font-semibold border-b border-white/[0.08]">Timeline</th>
                    <th className="p-4 font-semibold border-b border-white/[0.08]">Strategic Focus</th>
                    <th className="p-4 font-semibold text-center border-b border-white/[0.08]">Bookings / Mo</th>
                  </tr>
                </thead>
                <tbody className="text-white/72">
                  <tr>
                    <td className="p-4 font-medium border-b border-white/[0.08]">Months 1-2</td>
                    <td className="p-4 border-b border-white/[0.08]">Technical foundation, Google Business Profile optimization, initial local keywords.</td>
                    <td className="p-4 text-center border-b border-white/[0.08]">2 - 5</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="p-4 font-medium border-b border-white/[0.08]">Months 3-4</td>
                    <td className="p-4 border-b border-white/[0.08]">Content expansion, target area service pages, initial citation building.</td>
                    <td className="p-4 text-center border-b border-white/[0.08]">9 - 12</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Months 5-6</td>
                    <td className="p-4">Authority scaling, review generation loop, capturing high-intent terms.</td>
                    <td className="p-4 text-center font-bold text-[#BEF70A]">15 - 20</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="leading-relaxed text-sm text-white/72">
              If it would be useful, I can introduce you to the owner in London so you can hear directly from him about the work and results. I can also share the live reporting dashboard so you can see exactly how the leads and website activity are being tracked.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Opportunities Section */}
          <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold mb-4 text-white">About the 30 Opportunities & 20 Booked Jobs</h2>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              There is one point I would really like to understand better. You mentioned approximately 30 opportunities per month, with around 20 becoming booked jobs, and an average job value of approximately $10,000.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              That's a very interesting number, and I want to understand where that existing business is currently coming from. Are those 30 opportunities primarily coming through referrals and word of mouth? And are the 20 booked jobs mostly system replacements/installations?
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              Understanding this is important because if Brabham is already generating that level of business without a proper digital acquisition system, there may be a very significant opportunity to add another consistent source of demand through search.
            </p>
          </div>

          {/* Pricing Section */}
          <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] p-8">
            <h2 className="text-xl font-bold mb-4 text-white">Pricing and High-Intent Traffic</h2>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              I would also need your current starting prices/ranges for the major services. There is a reason for this.
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/72">
              When someone searches for a service and we give them useful information about the service and an appropriate price/range where possible, we can attract people who are genuinely considering purchasing rather than simply collecting curiosity-driven enquiries.
            </p>
            <p className="mb-4 text-sm leading-relaxed font-semibold text-white">
              That can help reduce low-quality or “junk” leads.
            </p>
            <p className="text-sm leading-relaxed text-white/72">
              You don't need to provide every possible price immediately. Even starting prices for your main services would give me enough information to structure the website and content around the right commercial intent.
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft overflow-hidden mb-8 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
            <BarChart3 className="text-[#BEF70A]" />
            Tracking Everything
          </h2>
          <p className="mb-4 leading-relaxed text-white/80">
            I don't want us to have an argument six months from now about where a customer came from. We can build a transparent tracking system from the beginning.
          </p>
          <p className="mb-6 leading-relaxed text-white/80">
            There are several ways we can do this. Depending on what works best for you, we can have a dedicated dashboard showing things such as:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {['Website visitors', 'Search traffic', 'Calls', 'Forms', 'Leads', 'Appointments', 'Booked jobs', 'Revenue generated'].map(item => (
              <div key={item} className="bg-white/[0.07] text-white p-4 rounded-xl text-center text-sm font-semibold border border-[#BEF70A]/30">
                {item}
              </div>
            ))}
          </div>
          <p className="mb-4 leading-relaxed text-white/80">
            We can even connect the reporting to WhatsApp, and if you eventually want something more advanced, I can build a dedicated web/mobile dashboard for the business.
          </p>
          <p className="font-semibold text-white text-lg">
            The important thing is that we can clearly identify what is happening and where the business is coming from.
          </p>
        </div>

        {/* Compensation / Partnership */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft overflow-hidden mb-8 p-8 md:p-10 text-white border border-white/[0.08]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
            <Handshake className="text-[#BEF70A]" />
            Performance-Based Partnership & Compensation
          </h2>
          <p className="mb-4 leading-relaxed text-white/70">
            Normally, my SEO work starts with a fixed monthly fee or a standard percentage. For you, however, I am willing to structure this differently because I see this as an opportunity for a long-term partnership.
          </p>
          <div className="bg-white/[0.05] border border-slate-700 p-6 rounded-xl my-6">
            <p className="text-lg font-medium text-white mb-2">My original proposal mentioned 5% of revenue from attributable booked jobs.</p>
            <p className="text-white/70 mb-4">
              However, you mentioned having a minor concern regarding the compensation structure.
            </p>
            <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
              <p className="font-bold text-[#BEF70A] text-xl mb-2">Sir, price is not an issue.</p>
              <p className="text-white/70">
                We can work in whatever way you suggest. Just let me know how you want to proceed. My priority is starting the work and delivering results for you.
              </p>
            </div>
          </div>
          <p className="font-medium text-brand-200">
            The most important thing for me is that we agree on a simple, transparent attribution system before we start, so both sides know exactly what counts.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft border border-white/[0.08] overflow-hidden mb-8 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-white">Proposed Timeline</h2>
          <p className="mb-8 leading-relaxed text-white/80">
            I have already identified enough from my initial audit to believe that there is a good opportunity here. My target would be to get the new structure in place and start pushing the website toward meaningful rankings within the first 2–3 months.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="bg-white/[0.07] text-white font-bold px-4 py-2 rounded-lg text-sm">Month 1</span>
              </div>
              <p className="text-white/80 pt-1">Website foundation, Next.js integration, keyword research, service structure, location strategy, Google presence and tracking.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="bg-white/[0.07] text-white font-bold px-4 py-2 rounded-lg text-sm">Months 2–3</span>
              </div>
              <p className="text-white/80 pt-1">Expansion of service/location pages, content, local visibility, reviews, citations, relevant authority building and continued optimization.</p>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 mt-1">
                <span className="bg-white/[0.07] text-white font-bold px-4 py-2 rounded-lg text-sm">Months 3–6</span>
              </div>
              <p className="text-white/80 pt-1">Scale what is working, strengthen the strongest locations/services and progressively increase qualified organic traffic and booked opportunities.</p>
            </div>
          </div>
          <p className="mt-8 text-sm text-white/62 italic">
            Again, these are targets rather than guarantees. SEO depends on the market, competition, website history, implementation speed and several other factors.
          </p>
        </div>

        {/* Needs & CTA */}
        <div className="bg-white/[0.05] rounded-3xl shadow-soft border-t-4 border-[#BEF70A] overflow-hidden mb-8 p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-white">What I Need From You to Start</h2>
          <ul className="space-y-3 mb-8 text-white/80 font-medium">
            {[
              'Domain/DNS access for the website.',
              'Google Search Console access, if it already exists.',
              'Google Analytics access, if it already exists.',
              'Confirmation of the complete service territory.',
              'Your main service list.',
              'Starting prices/ranges for the major services.',
              'More information about where the existing 30 monthly opportunities are coming from.',
              'Any additional information about Brabham that you think would help me understand the business better.'
            ].map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-[#BEF70A] flex-shrink-0 mt-1" size={18} />
                <span>{req}</span>
              </li>
            ))}
          </ul>
          <p className="mb-8 text-sm text-white/72">
            If you have someone else managing any of the existing accounts, that's not a problem. We can simply arrange the appropriate access.
          </p>

          <div className="bg-white/[0.05] border border-white/[0.08] p-8 rounded-2xl">
            <h3 className="font-bold text-xl mb-4 text-white">Ready to Start</h3>
            <p className="mb-4 text-white/80 leading-relaxed">
              I am ready to start now. Once I have the necessary access and information, I can begin implementing rather than spending weeks going back and forth.
            </p>
            <p className="mb-4 text-white/80 leading-relaxed">
              And if you would like to check my background or previous work before moving forward, I'm completely comfortable with that. I can provide examples, reporting, dashboards, or introduce you to previous clients where appropriate.
            </p>
            <p className="mb-6 text-white/80 leading-relaxed">
              I also want to be transparent that this would be my first US market project, which is one reason I'm particularly interested in making this a genuine long-term collaboration. I already have experience with local-service SEO and lead generation, and I can handle the work myself.
            </p>
            
            <p className="font-bold text-white text-2xl mb-4">If Brabham grows, I grow with you.</p>
            <p className="text-white/80 leading-relaxed mb-8 border-b border-white/[0.08] pb-8">
              And if we can prove the model with Brabham, I believe there could be opportunities to work together on other projects in the future as well.
            </p>

            <p className="mb-4 font-medium text-white">Finally, I'm happy to jump on a call whenever you're available.</p>
            <p className="mb-6 text-sm text-white/72">
              I'm generally available from 10:00 AM to 12:00 AM Pakistan time, which is approximately 1:00 AM to 3:00 PM Eastern Time (South Carolina) at the moment. If you give me a time that works for you, I'll make myself available.
            </p>

            <h3 className="text-2xl font-bold text-white mb-8">I'm ready when you are.</h3>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/[0.08] pt-8 mt-8">
              <div>
                <p className="font-bold text-xl text-white">Sameer Ahmad</p>
                <p className="text-white/72 mb-1">Digital Growth Partner</p>
                <a href="https://www.jadeedsolutions.com" className="text-[#BEF70A] font-medium hover:underline">www.jadeedsolutions.com</a>
              </div>
              <a href="mailto:charles.sells@mail.com" className="bg-[#BEF70A] hover:bg-[#ABDE09] text-[#0B1F12] px-8 py-4 rounded-xl font-bold transition-colors w-full sm:w-auto text-center">
                Reply to Proposal
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
