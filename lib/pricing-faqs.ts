import { partnershipCopy } from "@/lib/partnership";

/** Pricing page FAQs — also read by Jadeed AI (lib/ai/knowledge.ts). */
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "How is Jadeed different from a fixed agency retainer?",
    a: "Jadeed can structure the commercial engagement around performance, job tiers, or a fixed scope depending on the economics of your business. Rather than billing a static retainer regardless of results, our systems are built around your customer journey, verified calls, and collected revenue.",
  },
  {
    q: "How is attributable collected revenue tracked?",
    a: `Every enquiry from the channels we build and run — tracked calls, forms and WhatsApp — lands in a shared record both sides can see: lead, contacted, booked, completed, paid. You mark what happened; your confirmation is the report. ${partnershipCopy.disputes}`,
  },
  {
    q: "Why do high-ticket businesses use a lower percentage or tiered model?",
    a: "Large projects (such as £15,000 roof replacements or £8,000 HVAC installations) involve substantial material, equipment, and crew costs with different gross margins. Charging a standard 10% on high-ticket jobs would eat into your material costs, so high-value work can use a lower percentage (often around 5%), a service-specific flat rate, or a clearly defined profit-based fee agreed in writing.",
  },
  {
    q: "What happens if a booked job is canceled or refunded?",
    a: `If a job is cancelled or never paid, no fee is charged under the Performance or Tiered models. ${partnershipCopy.refunds}`,
  },
  {
    q: "Do I pay fees on existing customers or direct referrals?",
    a: `No. ${partnershipCopy.existingCustomers} Word-of-mouth referrals you win yourself are excluded too. Fees apply only to new customers who first reach you through the channels we build and run.`,
  },
  {
    q: "How is advertising budget handled?",
    a: "Your advertising budget is paid directly to Google or Meta through your own payment method. Jadeed applies 0% markup to ad spend, ensuring 100% of your advertising budget is deployed directly toward acquiring customers.",
  },
  {
    q: "Can I transition between commercial models as my business evolves?",
    a: "Yes. Many businesses begin on a Performance or Tiered structure to align incentives while establishing search visibility, and later transition to a Flat-Fee structure as volume becomes steady and predictable.",
  },
  {
    q: "How long does a partnership run, and what does it cost to start?",
    a: `Performance and tiered partnerships are £0 upfront: no setup fee, no monthly retainer and no minimum spend. They start with a free growth plan call and a free audit. ${partnershipCopy.commitment} Flat-fee SEO plans have a 6-month minimum. Our Profit-Share Handbook walks through every step.`,
  },
  {
    q: "How are recurring commercial contracts handled?",
    a: `${partnershipCopy.repeatCustomers} For recurring maintenance or commercial cleaning agreements, the written agreement can set a shorter window, so you never pay ongoing fees indefinitely on an established client relationship.`,
  },
  {
    q: "Will you work with my competitors?",
    a: `${partnershipCopy.territoryRule} ${partnershipCopy.territoryCooperation}`,
  },
  {
    q: "Who owns the website, domain and accounts?",
    a: `You do. ${partnershipCopy.ownership} ${partnershipCopy.directCosts}`,
  },
  {
    q: "Do you work with lawyers, clinics or mortgage brokers?",
    a: `Yes, on a custom basis. ${partnershipCopy.regulated} Lawyers, healthcare providers, mortgage and settlement-service businesses get a proposal only after qualified counsel checks the fee structure for their profession and jurisdiction.`,
  },
];
