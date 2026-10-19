/**
 * The Growth Partnership — one source for its terms, so pages never drift.
 *
 * These follow Jadeed Marketing's published model (C:\Jadeed Marketing\jadeed-marketing\
 * src/data/business.ts — owner decisions Q19–Q30, 2 Oct 2026). Jadeed Marketing is the
 * US brand of Jadeed Solutions; on 4 Oct 2026 the owner set the same terms for every
 * country on this site. Change a fact here and copy it there, never inline on a page.
 *
 * Do not embellish: no guarantees, no invented results, never "you cannot cancel".
 * Fixed plans (SEO from £300/mo, 6-month minimum; websites from £199) are separate.
 */

export const partnership = {
  name: "Growth Partnership",
  /** Standard local-service percentage of a paid invoice. High-value work is custom. */
  feePercent: 10,
  minimumTermMonths: 6,
  noticeDays: 30,
  attributionDays: 90,
  repeatMonths: 12,
  reactivationInactiveMonths: 12,
  flatRateReviewMonths: 12,
  auditReplyHours: 24,
} as const;

/** A result needs all three. */
export const resultConditions = [
  {
    title: "It came through Jadeed",
    body: "The customer first reached you through the marketing we built and run — a tracked call, form, message or booking from the channels in your agreement.",
  },
  { title: "The work was completed", body: "The job was actually done, not just quoted or booked." },
  { title: "You were paid", body: "The customer paid you. Our fee is worked out on paid work only." },
] as const;

/** Never a result on their own. */
export const notResults = ["A click", "An impression", "A lead or form", "A phone call", "A booking on its own"] as const;

const p = partnership;

/** Plain-words copy shared by every page. */
export const partnershipCopy = {
  oneLiner: "£0 upfront. No retainer. You pay only after your customer pays.",
  upfront: "No setup fee, no monthly retainer and no minimum spend.",
  whatIsFree: "Calls, leads, clicks and quotes cost you nothing.",
  feeShort: `${p.feePercent}% of paid jobs`,
  percentageRule: `For a standard local-service agreement, the fee is ${p.feePercent}% of the full customer invoice after that invoice is paid. High-value or cost-heavy work can use a lower percentage, a service-specific flat rate, or a clearly defined profit-based fee agreed in writing.`,
  flatRate: `Flat rates differ by service type. We weigh average job value and margin, keyword difficulty, lead quality, close rate, seasonality, service-area competition, fulfilment capacity and the effort required to win the work. An agreed rate is reviewed at most once every ${p.flatRateReviewMonths} months.`,
  termShort: `${p.minimumTermMonths}-month start, then month to month`,
  commitment: `${p.minimumTermMonths}-month initial term, then month to month. Either side can end the partnership with ${p.noticeDays} days' written notice after the initial term; the signed agreement covers early termination for breach.`,
  attributionWindow: `A customer is attributable when their first contact comes through a Jadeed-controlled channel and the job is completed and paid within ${p.attributionDays} days — a working default the agreement can adjust for longer sales cycles.`,
  existingCustomers: `Customers you already had are not charged, unless a genuinely inactive customer (no paid job in about ${p.reactivationInactiveMonths} months) returns through a Jadeed-run reactivation campaign.`,
  repeatCustomers: `Repeat work from a customer Jadeed introduced can count for ${p.repeatMonths} months from their first paid job while the partnership is active — never indefinitely — unless the written agreement says otherwise.`,
  refunds: "If a customer's payment is refunded, reversed or charged back, no fee is due on it; a fee already paid is credited against the next settlement.",
  invoicing: "Earned fees are batched after your customer pays. The invoice threshold and schedule are agreed for each business.",
  tracking: "A shared record of each customer — lead, contacted, booked, completed, paid — is the normal reference, so both sides see the same jobs. You mark what happened; your confirmation is the report.",
  trust: "You know your business better than anyone, so day-to-day reporting runs on trust: you tell us what happened with the customers we send. In return, we ask for the access and cooperation the digital side needs — the website, tracking and profiles we run for you — and we always explain why we need it.",
  disputes: "If an entry is ever in question, we may ask for an invoice reference, a payment-processor confirmation or a redacted document for that one job. We never ask for bank statements as routine, and we never publish your customers' invoices.",
  directCosts: "You pay your domain, optional ad spend and any cloud usage directly, through accounts in your own name. Nothing is billed through us or marked up.",
  ownership: "Your domain, website, Google Business Profile and accounts stay in your name.",
  territoryRule: "During an active exclusive partnership, we generally don't work with a competing business in the same agreed territory. The territory is defined in writing when we sign — not every city is automatically exclusive.",
  territoryCooperation: "Exclusivity works because the system can run. If tracking or agreed access keeps getting switched off, or outcomes stop being reported, we raise it with you first and agree a reasonable time to sort it out. Only if it continues might campaigns or exclusivity pause, as the agreement sets out.",
  regulated: "Regulated professions use a jurisdiction-specific arrangement only after qualified legal review; we do not publish a percentage-of-fees or per-client offer for them.",
  partnership: "You know your customers, your crews and your margins better than anyone, and we listen to that. We bring the digital side — the website, search, tracking and how you appear online — and ask you to weigh our recommendations there seriously. Neither of us runs the other's business; we both get paid when the work does.",
} as const;

/** How a territory can be drawn. */
export const territoryOptions = [
  "A service radius around your base",
  "A cluster of postcodes or ZIP codes",
  "A city boundary, where that matches how you work",
] as const;

/** Who the model works for. Guidance, not a rigid checklist. */
export const goodFit = [
  "A working phone line and a way to answer new enquiries quickly",
  "The ability and capacity to take on more work",
  "Job margins that leave room for a fee",
  "Willingness to keep tracking in place and mark what happened with each customer",
  "Openness to our recommendations on the website, search and how you appear online",
] as const;

/** The full plain-language terms, in the order the pricing page lists them. */
export const partnershipTerms = [
  `A result counts only when the customer came through Jadeed, the job was completed, and you were paid. ${partnershipCopy.whatIsFree}`,
  partnershipCopy.percentageRule,
  partnershipCopy.attributionWindow,
  partnershipCopy.existingCustomers,
  partnershipCopy.repeatCustomers,
  partnershipCopy.refunds,
  partnershipCopy.invoicing,
  partnershipCopy.tracking,
  partnershipCopy.commitment,
  partnershipCopy.directCosts,
  partnershipCopy.ownership,
  partnershipCopy.territoryRule,
  partnershipCopy.regulated,
] as const;

/** Sources for the regulated-professions note (verified on Jadeed Marketing's pricing page). */
export const regulatedSources = [
  {
    href: "https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_5_4_professional_independence_of_a_lawyer/",
    label: "ABA Model Rule 5.4",
  },
  {
    href: "https://oig.hhs.gov/fraud/enforcement/types-of-civil-monetary-penalties-and-affirmative-exclusions/",
    label: "HHS OIG anti-kickback overview",
  },
  {
    href: "https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/real-estate-settlement-procedures-act/real-estate-settlement-procedures-act-faqs/",
    label: "CFPB RESPA FAQs",
  },
] as const;
