import { partnershipCopy } from "@/lib/partnership";
import { siteConfig } from "@/lib/site";

/* The business facts every Jadeed AI feature may use: the site chat (/api/ask), "Draft with
   AI" in Teach Jadeed AI, and the client portal's assistant. One place, so they never drift. */
export const FACTS = `- Jadeed Solutions: local SEO, conversion websites, mobile apps and Google Ads for local service businesses in the UK, US, Canada and UAE. A small remote team in Narowal, Pakistan, led by founder Sameer Ahmad Basra. Jadeed Marketing is the company's US brand.
- Fixed plans: local SEO from £300 a month (no setup fee, 6-month minimum); websites from £199; apps and ads quoted up front. Ad spend is paid by the client straight to Google or Meta, never marked up.
- Growth Partnership: ${partnershipCopy.oneLiner} ${partnershipCopy.upfront}
- A result needs all three: the customer came through Jadeed, the work was completed, and the customer paid. Clicks, leads, calls and bookings alone are not results.
- ${partnershipCopy.percentageRule}
- ${partnershipCopy.attributionWindow}
- ${partnershipCopy.existingCustomers}
- ${partnershipCopy.repeatCustomers}
- ${partnershipCopy.refunds}
- Reporting runs on trust: the owner marks what happened with each customer in a shared record; evidence only for a disputed entry; never bank statements as routine.
- ${partnershipCopy.commitment}
- ${partnershipCopy.territoryRule} Never say an area is open; the team confirms availability after the free audit.
- Regulated professions (law, healthcare, mortgage, settlement services) get a proposal only after legal review; never quote them a percentage.
- ${partnershipCopy.ownership}
- Proof: Alpha Movers (London removals) and Just Shine (Abu Dhabi cleaning) are real clients with case studies. Google rating 5.0 from 35 reviews; around 10 active clients. Never invent results, reviews or clients.
- Contact: WhatsApp ${siteConfig.phone}, email ${siteConfig.email}, or the free growth plan on /contact (reply within 24 hours).`;
