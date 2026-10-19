import type { ProposalKnowledge } from "./types";

/* Knowledge for the AI on /proposal/v-chauffeurs. Server only. Written from the approved
   V Chauffeurs proposal text (Oct 2026) and the verified Alpha Movers case study
   (lib/case-studies.ts). The AI answers from these sections only. If a price or term
   changes, change it here and in components/proposal/vchauffeurs/data.ts together. */

export const vChauffeursKnowledge: ProposalKnowledge = {
  path: "/proposal/v-chauffeurs",
  client: "V Chauffeurs",
  sections: [
    {
      id: "summary",
      title: "Overview",
      anchor: "#overview",
      text: `V Chauffeurs is preparing to launch as a professional chauffeur service in the UK. Jadeed Solutions proposes one coordinated 24-month digital partnership instead of separate providers for each service. It covers: premium website design and development; online booking and enquiry management; Android and iPhone customer apps; a chauffeur app; a central admin dashboard; SEO; AI search optimisation; local search visibility; social media and video marketing; business research and digital growth strategy; and ongoing maintenance, improvements and technical support. Instead of a large upfront development payment, service fees are spread across the partnership, so there is no separate setup or development fee. Prepared by Jadeed Solutions (Sameer Ahmad).`,
    },
    {
      id: "website",
      title: "Premium business website",
      anchor: "#build",
      text: `A modern, professional website designed for a premium UK chauffeur business: fully responsive on mobile, tablet and desktop; designed around V Chauffeurs' approved branding and colours (black, white and gold are among the directions being considered, subject to final brand approval); straightforward navigation and easy booking enquiries; structured around the company's actual services, vehicles and operating areas; built with speed, security, accessibility and search visibility in mind; connected to the central booking and administration system. The mockups on the proposal page are concepts, not finished designs.`,
    },
    {
      id: "booking",
      title: "Complete booking system",
      anchor: "#build",
      text: `A connected booking system for customers to request or arrange journeys and a central place for the business to manage bookings. Depending on the company's confirmed operating procedures it can include: journey details and pickup/drop-off locations; travel dates, times and passenger information; vehicle selection; single-day and multi-day booking requests; booking status and confirmation; customer booking history; payment and quotation workflows; automated booking emails and notifications; booking-source tracking for marketing performance. The final pricing, quotation and payment process will follow V Chauffeurs' actual business operations; Jadeed will not impose a process that does not suit the company.`,
    },
    {
      id: "apps",
      title: "Customer apps, chauffeur app and admin dashboard",
      anchor: "#build",
      text: `Customer apps for Android and iPhone, aligned with the website booking platform: customer profiles, bookings, journey details, booking history and notifications. A separate chauffeur app connects drivers to the central booking system; its functions are agreed around how V Chauffeurs allocates and manages journeys. The admin dashboard is the central management interface: booking records and statuses, customer information, vehicle and chauffeur information, journey management, booking-source reporting, website and app administration, and business performance information. Website, customer apps, chauffeur app and admin dashboard are developed as one coordinated system.`,
    },
    {
      id: "plan",
      title: "First 90 days",
      anchor: "#plan",
      text: `Month 1, business website goes live: finalise visual direction, build primary pages, initial booking and enquiry flow, technical infrastructure, fundamental SEO and AI-search-ready structure, analytics and search tools. Expected milestone: website live within the first month, provided the required business information, domain access and launch approvals are available. Month 2, advanced development and SEO: develop the customer and chauffeur apps, build and connect the admin dashboard, improve booking workflows, advanced technical SEO, approved service and location content, internal linking and structured data, local and AI search foundations, testing. Month 3, complete system and optimisation: finalise core app features, integration and system testing, fix issues, complete primary SEO, refine performance, prepare apps for publication, set up monitoring and reporting. Target: a functional core digital ecosystem within a maximum of three months, assuming timely access, decisions and reasonable agreement on core features. Significant new requirements discovered later are discussed before the delivery plan changes.`,
    },
    {
      id: "publication",
      title: "Mobile app publication",
      anchor: "#plan",
      text: `App development and app-store publication are separate. Jadeed prepares the apps during the first three months, but publication on Google Play and Apple's App Store depends on account verification, testing, technical requirements and approval by Google and Apple, so those timelines cannot be guaranteed. Jadeed assists with the process. For the iPhone app, the current setup also needs suitable Mac access for Apple's build and publishing workflow; Jadeed will work to arrange it, but iPhone publication may take additional time. New personal Google developer accounts may need to complete Google's required app testing before public release.`,
    },
    {
      id: "seo",
      title: "SEO",
      anchor: "#seo",
      text: `SEO starts during website development, not after. First three months, main SEO implementation: Technical SEO (search-friendly architecture, titles and descriptions, headings, XML sitemap and indexing, canonical URLs, mobile usability and performance, internal linking, structured data, Search Console and analytics). Service SEO (content for confirmed services, search-focused page structure, real customer questions answered, vehicle and booking information). Local SEO (genuinely served, approved locations; Google Business Profile setup or optimisation where eligible; consistent company information; local listings; location content where useful). Content and authority (keyword and competitor research, search-intent content, useful travel information, content planning, authority-building). Results: the first three months build the foundations; initial visibility changes may become measurable in the following months; competitive rankings and sustained organic bookings can take considerably longer. No responsible provider can guarantee first position in Google, especially against established competitors. The goal is strong, sustainable visibility, not temporary rankings.`,
    },
    {
      id: "ai-search",
      title: "AI search optimisation",
      anchor: "#seo",
      text: `Customers also research services through AI-powered search and answer systems. Jadeed structures V Chauffeurs' online presence so it can be understood and discovered there: clear, consistent business information; well-organised service and location content; structured data; direct answers to real customer questions; strong internal links; accurate brand information across platforms; AI visibility research; ongoing improvements. This considers Google Search and AI Overviews, ChatGPT search and other AI discovery platforms. AI optimisation improves the quality and accessibility of business information; it does not guarantee inclusion, recommendations or rankings in third-party AI systems.`,
    },
    {
      id: "marketing",
      title: "Branding, marketing and video",
      anchor: "#seo",
      text: `Included: digital branding and design guidance, social media profile setup and optimisation, social content planning, promotional graphic design, business and service content, video-based promotion, and marketing research and recommendations. Four promotional videos per month, about 30 seconds each, on approved themes such as services, the customer experience, airport transfers, corporate travel or fleet presentation. Production with Jadeed's existing agency AI video tools is included in the partnership fee; there is no separate charge for those subscriptions. Content will accurately reflect the company's real services, vehicles and capabilities.`,
    },
    {
      id: "ongoing",
      title: "After the first three months, reporting and measuring success",
      anchor: "#seo",
      text: `After launch the work shifts to maintaining, improving and expanding the system: website and app maintenance, fixing issues, updates, performance and reliability monitoring, improving features and supporting agreed new functionality; continuous SEO and AI visibility (rankings, content updates, technical SEO, competitors, local information) because rankings are never permanent; ongoing business research (new searches, booking improvements, conversion, emerging AI, new channels). Monthly reporting covers website traffic, search visibility, enquiries, confirmed bookings tracked through the system, booking sources, completed development work, marketing activity and opportunities. As V Chauffeurs is newly launching, Jadeed will not promise an exact number of bookings or a guaranteed return; once real booking data exists, the return can be calculated accurately. The objective is turning relevant visibility into enquiries, bookings and sustainable growth, not traffic alone.`,
    },
    {
      id: "pricing",
      title: "The three partnership models",
      anchor: "#pricing",
      text: `All three models include the same core digital development and ongoing growth services, are based on a 24-month partnership, and have no setup or development fee (£0). Fixed Partnership: £300 per month, no per-booking success fee; recommended for predictable budgeting; the payment is the same whether the system brings five bookings or fifty. Balanced Partnership: £200 per month plus £10 per eligible completed booking. Performance Partnership: £100 per month plus £20 per eligible completed booking; the lowest starting monthly investment; in the first month the client pays only the £100 base in advance plus the agreed third-party subscription costs. Monthly fee formula = base fee + (bonus × eligible completed bookings in that month). Examples of monthly partnership fees (Fixed / Balanced / Performance): 0 bookings £300/£200/£100; 5 bookings £300/£250/£200; 10 bookings £300/£300/£300; 20 bookings £300/£400/£500; 30 bookings £300/£500/£700. Below 10 bookings Performance is cheapest; at 10 all three cost £300; above 10 Fixed is cheapest. These are examples, not booking forecasts; they exclude third-party costs.`,
    },
    {
      id: "bonuses",
      title: "How booking bonuses work",
      anchor: "#pricing",
      text: `Bonuses apply only to the Balanced and Performance models. An eligible booking is a completed, paid booking generated by the agreed digital marketing or customer acquisition channels. A booking must be completed and paid before a bonus is charged; cancelled or unpaid bookings do not qualify. A multi-day booking counts as one booking (a seven-day or ten-day booking carries the same single bonus). If a customer first comes through Jadeed's channels and later books again directly, that repeat booking stays eligible during the active partnership. Existing customers acquired independently of these channels are not automatically included. Booking records and sources are visible in the management system and monthly totals are reviewed together. There is no percentage commission on journey value: under Performance, a £150 booking and a £2,000 booking each carry a £20 fee.`,
    },
    {
      id: "payments",
      title: "Payment arrangements",
      anchor: "#pricing",
      text: `Monthly partnership fees are paid in advance: the first payment before the project begins, then on the same agreed date each month. No separate website setup fee, no separate app development fee for agreed core features, no individual SEO setup fee, and no extra charge for Jadeed's existing design or video-production tools. For Balanced and Performance, completed-booking bonuses are calculated monthly from the agreed booking records and billed separately. Third-party subscriptions, registration fees and approved usage-based costs are separate from the partnership fee.`,
    },
    {
      id: "costs",
      title: "Third-party and additional costs",
      anchor: "#investment",
      text: `Jadeed's own agency tools for SEO research, design and AI video are included. Business-specific costs paid by the client: Claude AI subscription for development, Claude Max 20x at $200/month for months 1–3 ($600 total), then Claude Pro at $20/month from month 4; the client either buys it directly or provides funds for Jadeed to arrange it; tax, exchange-rate and payment-provider charges are confirmed at checkout; it supports the development workflow and does not pay for rankings; any separate API or live AI feature usage is assessed separately. Google Play: $25 one-time developer registration, ideally registered under the business's control. Apple App Store: $99 per year developer programme, controlled by the business. Website domain: the business's own asset, paid at the registrar's actual price; Jadeed handles the technical connection. Hosting, Firebase and database: usage-based; expected to be relatively low at first, but no fixed £5–£10 maximum is promised; paid capacity is recommended only when justified. Booking emails and WhatsApp: free allowances first (for example Resend, and the free WhatsApp Business app); advanced WhatsApp API automation is discussed with its cost before implementation. Advertising (Google Ads, Meta): optional, funded separately and approved in advance. Other usage costs such as maps, location, SMS, payment processing or live AI are explained with expected cost and alternatives before enabling. No paid tool is bought simply because it exists.`,
    },
    {
      id: "investment",
      title: "First three months investment",
      anchor: "#investment",
      text: `First three months, by model. Partnership fees: Fixed £900, Balanced £600, Performance £300 (three months of the base fee). Booking bonuses: none for Fixed, £10 per eligible booking for Balanced, £20 per eligible booking for Performance. Claude Max 20x: $600 for every model. Setup or development fee: £0 for every model. Domain, publishing and usage costs: as required. GBP and USD are deliberately kept separate so no currency conversion or tax is hidden; there is no combined total because no exchange rate has been agreed. The main benefit: V Chauffeurs can start building its full digital system without a large, separate website or app development invoice.`,
    },
    {
      id: "term",
      title: "Why a 24-month partnership",
      anchor: "#partnership",
      text: `A new chauffeur business needs time to build reputation, appear in searches, win customers and learn which channels work. Four reasons: lower initial financial pressure (no large upfront development fee, income spread over the relationship); continuity (the team that builds the system maintains it, so nothing needs re-explaining to new providers); long-term SEO and brand development (refining early work and expanding what performs, using real data); shared commercial interests. 24 months is the preferred period for affordability, continuity and planning; it is not meant to create pressure or trap the company in an unproductive relationship.`,
    },
    {
      id: "roles",
      title: "Who does what",
      anchor: "#partnership",
      text: `Jadeed Solutions handles: website and booking platform development, customer and chauffeur apps, admin dashboard, technical SEO and AI search optimisation, approved digital branding and design, social media and video production, technical maintenance and improvements, digital marketing research, performance reporting, and digital technical support within the agreed scope. V Chauffeurs handles: vehicles and fleet operations, chauffeur recruitment and management, customer service and direct communication, journey fulfilment, operating prices, quotations and refunds, business licences and insurance, operational decisions and service quality, and providing accurate business information and approvals. Jadeed will not act as the transport operator or take over customer journey management. During setup V Chauffeurs provides business information, brand material, operating details, access and timely decisions; after setup Jadeed manages technical and marketing work independently and consults on important changes.`,
    },
    {
      id: "ownership",
      title: "Ownership, access and if circumstances change",
      anchor: "#partnership",
      text: `V Chauffeurs' business information, customer records, domain and company-owned service accounts remain under the company's control. Jadeed manages the agreed systems and day-to-day technical administration during the partnership, and the client has access to the booking and admin tools it needs. If the client requests more technical access or the partnership ends, Jadeed coordinates a reasonable handover of agreed project materials, relevant credentials and business data. Jadeed's own agency subscriptions and reusable internal tools are not transferred. If circumstances change, the approach is to discuss openly, give reasonable advance communication, review any outstanding payments and arrange an orderly transition; no complicated commercial penalties are intended. At the end of 24 months both sides review results, workload and requirements; the partnership may continue on existing pricing or updated terms agreed together, by mutual agreement.`,
    },
    {
      id: "recommendation",
      title: "Recommendation, value and next steps",
      anchor: "#faqs",
      text: `Jadeed recommends the Fixed Partnership, £300 per month for 24 months: a predictable payment with no per-booking success fees as bookings grow. Balanced and Performance remain fully available; all three carry the same commitment and service. Value: website and custom app development are usually separate costs and UK SEO alone can carry substantial monthly fees; here they sit with one partner. Jadeed does not promise to outperform every major international chauffeur brand immediately. Directors' concerns and suggestions are welcome and reasonable changes can be discussed, but the pricing is already structured to reduce upfront pressure, so further reductions that remove the long-term work are not proposed. Next steps once a model is chosen: review the completed business questionnaire; confirm services, fleet, operating areas, booking procedures and licensing; agree final brand direction and core requirements; confirm domain, subscriptions and payments; receive the first monthly payment and initial subscription funds; begin development once access and information are available. Contact: Sameer Ahmad, info@jadeedsolutions.com, or WhatsApp from the proposal page.`,
    },
    {
      id: "proof",
      title: "Previous work, apps and reviews",
      anchor: "#proof",
      text: `Previous work (other clients; not a forecast for V Chauffeurs). Alpha Movers, a London removals company: Jadeed built the website and a mobile app and runs their SEO, social and paid acquisition. Verified results: 90+ booked jobs and 150+ enquiries from the website in July–October 2026; Google Search Console (captured 19 October 2026) shows 885 organic clicks and 273K impressions over the last three months. Full case study: /case-studies/alpha-movers. A booking app Jadeed built for IHR Dream Cleaning, a cleaning company in Abu Dhabi, UAE: customers book in three steps (what, when, where); the office assigns staff to each booking and sees paid/unpaid status, assigned/not assigned status and the booking source (for example Website). For V Chauffeurs the same building blocks become journey booking, assigning a chauffeur, payment status and booking sources. Reviews: 5.0 on Google from 35 reviews and 4.0 TrustScore on Trustpilot from 3 reviews (all five-star). Just Shine Cleaning Services (Abu Dhabi) wrote on Trustpilot that Jadeed managed their social media, built their website and that the SEO work brought them to the first page despite strong competition.`,
    },
  ],
};
