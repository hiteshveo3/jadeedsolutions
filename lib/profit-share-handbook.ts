/**
 * Profit-Share Handbook — partnership due-diligence guide published at /profit-share-handbook.
 *
 * Section bodies are Markdown (GFM). A line containing only `{{name}}` embeds a
 * component: comparison, payments, phases, checklist or faqs.
 */

export const handbookMeta = {
  path: "/profit-share-handbook",
  label: "Profit-Share Handbook",
  eyebrow: "Partnership due diligence",
  title: "Profit-Share Partnerships: What We Need From You Before We Take a Percentage Instead of a Fee",
  titleLead: "Profit-Share Partnerships:",
  titleRest: "What We Need From You Before We Take a Percentage Instead of a Fee",
  subtitle:
    "A working guide for business owners considering a performance-based partnership with an outside growth partner.",
  seoTitle: "Profit-Share Handbook: what we need before we take a percentage",
  seoDescription:
    "A working guide for business owners considering a performance-based partnership: the four deal structures, what counts as profit, attribution, the documents we need, cross-border payment and how disputes resolve.",
  published: "2026-09-29",
  updated: "2026-09-29",
  disclaimer:
    "General information only · not legal, tax or accounting advice · verify every figure with a qualified professional in the relevant jurisdiction",
} as const;

export type HandbookSection = {
  number: number;
  title: string;
  /** Marked in the contents and heading: read closely when the parties are in different countries. */
  crossBorder?: boolean;
  body: string;
};

export const handbookSections: HandbookSection[] = [
  {
    number: 1,
    title: "Why this document exists",
    body: `
Most agency relationships are simple. You pay a monthly fee, the agency does the work, and if the results disappoint, you cancel. The agency carries no risk. You carry all of it.

A profit-share partnership inverts that. Instead of invoicing you a fixed amount every month, we take an agreed percentage — commonly ten percent — of what the work produces. If nothing is produced, we are not paid. That is a genuinely different proposition, and business owners are usually enthusiastic about it in the first meeting.

The enthusiasm tends to fade at the second meeting, because that is where we explain what a percentage deal requires from you. And it is a great deal more than a fixed-fee deal requires.

The reason is arithmetic, not suspicion. When we charge a fee, we only need to know enough about your business to do the work. When we take a share of profit, our income depends on a number that is calculated inside your accounting system, from figures we cannot see, using judgements we do not control. We are, in a narrow but real sense, an unsecured creditor of a business whose books we have never read.

No sensible person lends money on those terms. No sensible person works on them either.

So this document sets out, in detail, what we ask for and why each item matters. It is written for you — the owner of the business — rather than for other agencies. Read it before the second meeting. If any of it feels unreasonable, say so early; it is far better to discover a mismatch now than eight months into a deal that neither side can exit cleanly.

One more thing before we start. Most of what follows protects both sides. A badly defined profit share hurts the business owner too: you can end up paying a percentage on revenue you would have earned anyway, or arguing about an invoice you genuinely believe is wrong, or discovering that the marketing assets you thought you owned are registered to someone else. Precision early is the cheapest insurance either of us will ever buy.

> **A note on where we are**
>
> We are based in Pakistan. Most of our partners are not — they are in Canada, the United Kingdom, the United States and the UAE. That cross-border element changes several things in this document: how money moves, which country's law governs the agreement, what happens if we disagree, and what tax each side has to account for. Those sections are marked **Cross-border** and worth reading closely even if you skim the rest.
`,
  },
  {
    number: 2,
    title: "What a profit-share partnership actually is",
    body: `
The word “partnership” does a lot of unhelpful work in these conversations. Let us be precise, because the legal difference matters.

### 2.1 What it is not

**It is not a partnership in the legal sense.** A legal partnership means joint ownership, shared liability, and in most jurisdictions joint and several responsibility for each other's debts. If your business is sued, a legal partner can be sued alongside it. Nothing in a profit-share services agreement should create that. The agreement should say so explicitly, in words close to: *nothing in this agreement creates a partnership, joint venture, agency or employment relationship between the parties.*

**It is not equity.** We do not own part of your company. We have no claim on its sale value, no vote, no seat, and no right to block your decisions. When the agreement ends, we hold nothing.

**It is not employment.** We are not your staff, we do not work fixed hours, and we are responsible for our own taxes and our own tools.

**It is not a loan.** If the work produces nothing, you owe us nothing. There is no floor to recover, unless we specifically negotiate one.

### 2.2 What it is

It is a services contract with a variable price. We supply defined services. The price of those services is calculated as a percentage of an agreed financial measure, over an agreed period, subject to an agreed method of calculation.

Almost every dispute in this model comes from one of those four words being left vague: which **percentage**, of which **measure**, over which **period**, by which **method**.

### 2.3 The actual trade

The trade being made is straightforward once you say it plainly:

- **We give up certainty.** We take the risk that the work produces nothing and we are paid nothing, having spent months of labour and often real money on advertising, tools and infrastructure.
- **You give up privacy.** You let an outside party see your revenue, your costs, your customer flow and your accounting decisions, on a recurring basis, for the life of the agreement.

If you are not willing to make the second trade, you should not ask for the first. That is not a criticism — plenty of good businesses prefer to pay a fee and keep their books closed, and that is a perfectly rational choice. It is simply a different deal.
`,
  },
  {
    number: 3,
    title: "Four ways to structure the deal",
    body: `
“Ten percent” is not one arrangement. It is at least four, and they behave very differently. Before we discuss documents, it is worth understanding which structure is on the table, because the documentation burden follows directly from it.

### 3.1 The four structures

**Structure A — Percentage of net profit.** We take 10% of what is left after all costs. This is what most owners mean when they first propose a profit share, and it is the structure that creates the most disputes.

**Structure B — Percentage of gross revenue.** We take a smaller percentage — typically 3% to 8% depending on your margins — of money received, before costs. Simpler to verify, harder to manipulate, but it can bite you in a low-margin month.

**Structure C — Percentage of attributable revenue.** We take a percentage, usually larger than B, of only the revenue the work can be traced to: new customers from channels we built, or revenue above an agreed historic baseline. This is the most honest measure of contribution and the most work to define.

**Structure D — Reduced retainer plus a smaller percentage.** A modest fixed fee covers hard costs and keeps the lights on, with a smaller percentage on top as the upside. Risk is shared rather than transferred.

### 3.2 How they compare

{{comparison}}

### 3.3 What we recommend, and why

We recommend Structure C, with Structure D as the fallback, and we generally advise against Structure A.

That recommendation may seem odd coming from the side that would earn most from a profit share in a very good year. Here is the reasoning.

Net profit is the last line of a document you control. Between the revenue at the top and the profit at the bottom sit dozens of decisions that are entirely legitimate, entirely legal, entirely yours to make, and entirely capable of reducing our payment to zero. A partner who wanted to pay us nothing would not have to commit fraud. They would only have to run their business slightly differently than they otherwise might.

That is a bad position to put a business owner in. It creates a standing temptation, and even where nobody gives in to it, it creates suspicion. We have seen relationships that were producing genuinely good results collapse because the agency could not understand why profit fell in the quarter the owner bought a van.

Attributable revenue avoids this. It is measured close to the source, from systems that both sides can see, and it answers the only question that actually matters: did the work bring in business that would not otherwise have come? If the answer is no, we should not be paid. If the answer is yes, the amount should not depend on how you choose to depreciate equipment.

If attribution is genuinely impossible in your business — a walk-in retail operation with no booking system, for instance — Structure D is the sensible compromise. A small retainer covers the hard costs so that the relationship does not depend on a contested calculation, and a modest percentage of total revenue growth provides the upside.

We will still do Structure A if you insist on it. [Section 4](#section-4) explains what that costs in extra documentation.

### 3.4 A note on the percentage itself

Ten percent of net profit and ten percent of revenue are wildly different amounts. On a business turning over PKR 50 million with a 12% net margin, 10% of profit is PKR 600,000 and 10% of revenue is PKR 5 million. If someone quotes you “ten percent” without specifying the base, the conversation has not started yet.

> **How this maps to our pricing page**
>
> Our [pricing page](/pricing) uses shorter names for the same ideas. **Performance** is Structure C: a percentage — typically around 10% for standard-ticket jobs — of revenue that can be traced to the work. **Tiered** is also Structure C, priced as a fixed fee per completed job instead of a percentage, which suits high-ticket and variable-ticket work. **Flat fee** is not a profit share at all: a fixed monthly or milestone price, so most of this document does not apply to it. Structures A, B and D are available when a business needs them, with D as the fallback when attribution is not possible.
>
> Performance and tiered deals run for an initial term of twelve to twenty-four months ([Section 12.3](#section-12-3)). Fixed-fee SEO plans have a six-month minimum.
`,
  },
  {
    number: 4,
    title: "The hardest problem: what counts as profit",
    body: `
If you have chosen Structure A, this section is the most important one in the document. If you have chosen B, C or D, read it anyway — it will tell you what you are avoiding.

### 4.1 The journey from revenue to net profit

A simplified profit and loss statement moves through several stages, and a percentage can attach at any of them:

1. **Gross revenue** — everything invoiced or received.
2. **Less returns, refunds and discounts** — arrives at net revenue.
3. **Less cost of goods sold** — materials, direct labour, freight. Arrives at gross profit.
4. **Less operating expenses** — rent, salaries, marketing, software, vehicles, professional fees, insurance. Arrives at operating profit, often called EBITDA.
5. **Less depreciation and amortisation** — non-cash charges against past purchases.
6. **Less interest** — on loans and financing.
7. **Less tax** — arrives at net profit.

Each step down that list moves the number further from what the work produced, and closer to decisions about how the business is financed and owned.

### 4.2 The lines that cause arguments

These are not accusations. Every item below is a normal, legal thing that business owners do. They are listed because each one moves the profit figure, and therefore moves our payment, for reasons unconnected to performance.

- **Owner compensation.** The owner of a private company decides their own salary. Raising it by an amount equal to the year's profit is legal and, for tax reasons in several countries, sometimes advisable. It also reduces a profit share to zero.
- **Family members on payroll.** A spouse listed as a director, a son doing weekend work, a relative on a consultancy retainer. All common, all legitimate, all costs.
- **Related-party rent.** The premises are owned by the owner personally or by a holding company, and the trading company pays rent. The rent is a real expense. Its amount is a choice.
- **Management or licence fees.** A group company charges the trading company a fee for brand, systems or administration. Perfectly standard in group structures. Entirely discretionary in size.
- **Vehicles and equipment.** Whether a purchase is expensed immediately or capitalised and depreciated over five years changes this year's profit substantially. Both treatments can be correct depending on the rules and the item.
- **Stock and inventory.** Buying inventory before year end, or writing down slow-moving stock, shifts profit between periods.
- **Timing of invoices.** Issuing January's invoices on the second of January rather than the thirtieth of December moves revenue into the next period.
- **Director loans and drawings.** Money taken out as a loan rather than salary or dividend does not appear as an expense — but it also does not leave the profit line where you might expect.
- **Bad debt provisions.** A judgement about which customers will not pay. Judgements are adjustable.

### 4.3 A worked example

Consider a signage and print business with a genuinely good year.

| Line | Amount |
| :--- | ---: |
| Gross revenue | 8,400,000 |
| Less materials and direct production | (3,700,000) |
| **Gross profit** | **4,700,000** |
| Less staff wages (4 production, 1 admin) | (1,980,000) |
| Less rent and utilities | (540,000) |
| Less vehicle running costs | (310,000) |
| Less software, insurance, professional fees | (265,000) |
| Less advertising spend | (620,000) |
| **Operating profit (EBITDA)** | **985,000** |
| Less owner's salary | (720,000) |
| Less depreciation on new vehicle and printer | (180,000) |
| Less interest on equipment finance | (65,000) |
| **Net profit before tax** | **20,000** |

Ten percent of net profit is 2,000. Ten percent of operating profit before owner compensation is 98,500. Six percent of gross revenue is 504,000.

{{payments}}

Nothing in that table is improper. The owner is entitled to a salary. The vehicle genuinely depreciates. The finance genuinely costs interest. And yet the three possible payments differ by a factor of 250.

This is why “ten percent of profit” is not a deal. It is the beginning of a negotiation about a definition.

### 4.4 How to make Structure A workable

If you want a profit share and we want to be able to trust it, the agreement needs an annexure — a one-page schedule that defines the calculation line by line. At minimum it should:

- **Start from a named line, not a word.** “Profit” means nothing. “Operating profit before owner compensation, depreciation, amortisation, interest and tax, as reported in the monthly profit and loss statement produced by \\[accounting system\\]” means something.
- **Cap owner compensation** for the purposes of the calculation, at a stated figure or a stated percentage of revenue. The owner can pay themselves anything they like; only the capped amount is deducted before our share is worked out.
- **Exclude related-party transactions** above an agreed threshold unless both sides agree they are at market rate.
- **Exclude non-cash items** — depreciation, amortisation, provisions and revaluations.
- **Exclude financing** — interest, loan repayments and lease principal.
- **Exclude one-off and non-trading items** — asset sales, insurance settlements, legal awards, grants.
- **Name the accounting basis.** Cash or accrual, and which one the calculation uses. They can differ by months.
- **Name the period and the deadline.** Calendar month, calculated within fifteen days of month end.
- **Fix the chart of accounts.** Both sides agree the account list at the start. New expense categories introduced later require notice.

An agreement with that schedule attached is workable. An agreement that says “10% of net profit” and nothing else will produce an argument within a year. We have never seen an exception.
`,
  },
  {
    number: 5,
    title: "Attribution: whose revenue is it?",
    body: `
For Structure C, and for any honest version of the others, we have to answer a question that sounds simple and is not: how much of your business did the work actually cause?

### 5.1 The baseline

Before anything begins, both sides agree a baseline — what the business was producing without us. This is normally the trailing twelve months of revenue, month by month, taken from bank records rather than from memory or from a spreadsheet.

Twelve months matters because almost every service business is seasonal. A signage business sells more before election season and before the retail run-up. A cleaning business is quiet in December. Comparing March to February tells you about the calendar, not about the marketing.

Where the business is growing on its own, the baseline should include a growth allowance — an agreed percentage of underlying growth that is credited to the business rather than to us. If you were already growing at 15% a year before we arrived, taking a share of the first 15% would be taking a share of your own momentum.

### 5.2 What we can and cannot trace

Honest attribution starts with admitting what the tools can see.

**Traceable with high confidence:** paid search and paid social conversions with proper tracking; phone calls through tracked numbers; form submissions with source parameters intact; bookings made through a system we built; anything with a unique landing page or offer code.

**Traceable with moderate confidence:** organic search traffic landing on pages we created or optimised, converting through tracked routes; Google Business Profile calls and direction requests, which the platform reports but does not attribute individually.

**Not reliably traceable:** a customer who saw an ad in March, mentioned it to a friend, and the friend walked in during August. A customer who searched, did not click, and typed the domain in directly a week later. Repeat business from a customer originally acquired through a channel we built. Word of mouth generated by work that was itself generated by us.

That third category is real revenue that we genuinely helped create, and no tracking system will ever capture it. Rather than pretend otherwise, we prefer to name it in the agreement and handle it with a stated rule — for example, that revenue from customers first recorded during the term counts as attributable for a defined number of months regardless of the channel of their later purchases.

### 5.3 The infrastructure this requires

Attribution is not a spreadsheet exercise done at the end of the month. It requires systems in place before the first campaign runs:

- **Call tracking** with a dedicated number, so that a phone enquiry is attached to a source rather than guessed at.
- **Analytics and conversion tracking** properly configured, with events for the actions that matter to your business and not just page views.
- **A CRM or a booking system**, even a simple one, so that a lead is recorded, given a source, and followed to won or lost.
- **Consistent source tagging** on every campaign link.
- **A single reporting point** where those sources meet the eventual revenue figure — because a lead that closes six weeks later at a different value than quoted is the norm, not the exception.

If none of this exists today, that is normal and not a problem. It is, however, work that has to happen in the first weeks, and it is work we usually ask to be paid for separately, because it produces no revenue by itself.

### 5.4 The lead-to-sale gap

This is the part of attribution that causes the most friction, and it is worth stating plainly in advance.

We can deliver a qualified enquiry. We cannot answer your phone. If two hundred enquiries arrive and sixty are never returned, the revenue does not appear, and the honest question is whose fault that is.

The agreement should therefore contain response commitments on your side: a stated window for responding to enquiries, a stated route for quoting, and an agreement that enquiry volume and response rate are both reported. Without that, attribution disputes become unresolvable, because each side can point at a number that supports it.

We are not trying to police your sales team. We are trying to make sure that when the figures disappoint, we can tell which half of the machine is broken.
`,
  },
  {
    number: 6,
    title: "What we need from you — Part 1: legal identity",
    body: `
We now move to the documents. This section and the four that follow are the practical answer to the question business owners actually ask: what will you want from me?

Nothing here is unusual. Any bank extending credit, any investor writing a cheque, and any insurer underwriting a policy would ask for the same or more. The difference is that we are asking for it before providing services rather than before providing money.

### 6.1 Proof that the business exists

- **Certificate of incorporation or business registration.** The founding document from the relevant registry — SECP in Pakistan, Companies House in the UK, the provincial or federal corporate registry in Canada, the Secretary of State in the US, the relevant free zone or DED licence in the UAE.
- **Current registration number and registered address**, as they appear on the public record.
- **Certificate of good standing** where the jurisdiction issues one, dated within the last three months. This confirms the company has filed what it was meant to file and has not been struck off.
- **Trade licence or sector permit** where the activity requires one.

> **Why it matters:** we need to know which legal entity we are contracting with, because that is the entity we would have to pursue if things went wrong. A contract signed with a trading name that is not a registered entity is a contract with a person, whether or not either side intended that.

### 6.2 Proof of who controls it

- **Government photo identification** for each owner and each person who will sign.
- **Proof of address** for the signing party — a utility bill or bank statement within three months.
- **Shareholding or ownership structure**, including any holding company above the trading entity.
- **Ultimate beneficial ownership** where the structure is more than one layer deep.
- **Board resolution or written authority** confirming that the person signing is entitled to bind the company. In a company with more than one director, this is not optional.

> **Why it matters:** a percentage agreement runs for years and pays out repeatedly. We need to know that the person signing can commit the company, and we need to know who will still be there if the person we deal with leaves.

### 6.3 Tax registration

- **Tax identification number** — NTN and sales tax registration in Pakistan, GST/HST number in Canada, VAT number in the UK or UAE, EIN in the US.
- **Confirmation of tax residency**, and a tax residency certificate where one is available. This matters for treaty relief and is discussed in [Section 13](#section-13).
- **Registration status for the relevant indirect tax**, because it determines whether our invoices carry tax and whether you can recover it.

### 6.4 Existing obligations that could interfere

- **Any exclusivity agreement** with another agency, marketplace, franchisor or supplier that could restrict what we are allowed to do.
- **Any existing revenue-share, commission or referral arrangement**, because two percentages on the same revenue can quietly exceed the margin.
- **Franchise agreements**, which frequently restrict advertising, brand usage and even domain names.
- **Outstanding disputes or litigation** that could affect the business's ability to trade or pay.
- **Security interests or charges** over the business's assets, where the jurisdiction has a public register.

> **Why it matters:** a franchise agreement that forbids independent Google Ads can end a partnership in week three. It is a five-minute question at the start.
`,
  },
  {
    number: 7,
    title: "What we need from you — Part 2: financial visibility",
    body: `
This is the section owners find most uncomfortable, so it is worth repeating why it exists: our fee is a function of your financial statements. We are not auditing you out of curiosity.

The depth required depends entirely on the structure chosen in [Section 3](#section-3). Structure B needs the least. Structure A needs the most.

### 7.1 Historic records

- **Bank statements** for the trading account, covering the last twelve months as a minimum and twenty-four months where the business is seasonal. Official statements from the bank, not exported spreadsheets.
- **Filed financial statements** for the last two to three years, as submitted to the registry or the tax authority.
- **Filed tax returns** for the same period, or an accountant's confirmation of the figures filed.
- **A month-by-month revenue history**, reconciled to the bank statements.
- **Payment processor statements** — Stripe, Square, PayPal, a card terminal provider — covering the same period.

> **Why we want statements rather than a summary:** a summary is a representation. A bank statement is evidence. The gap between the two is where most unpleasant surprises live, and finding them before the agreement is signed is in everybody's interest.

### 7.2 Ongoing visibility

For the life of the agreement, we will ask for one of the following, in descending order of preference:

1. **Read-only access to the accounting system.** Most platforms — QuickBooks, Xero, Zoho Books, Wave — support an accountant or read-only user who can view reports but change nothing. This is the cleanest arrangement: no monthly chasing, no disputes about whether a report was complete.
2. **Read-only access to payment processors and the bank feed**, where the accounting system is not shared.
3. **A monthly report pack** in an agreed format, produced by your accountant, delivered by an agreed date.

Option 3 works, but it is slower and it puts a person between the figures and the calculation. If the relationship is going to run for years, option 1 saves both sides a great deal of time.

### 7.3 Your accountant

- **Direct contact details** for the accountant or bookkeeper, and your written consent for us to speak to them about the calculation.
- **Confirmation of who prepares the monthly figures** and on what date they are finalised.
- **The chart of accounts** as it stands at the start.

An accountant in the loop from the beginning is an asset, not an obstacle. They will spot the definitional problems in [Section 4](#section-4) faster than either of us, and they are the natural person to produce the agreed schedule each month.

### 7.4 Banking

- **Confirmation that the business banks separately from the owner.** A business that runs through a personal account cannot support a profit share, because the figures cannot be separated from the household. If this is the current position, fixing it is the first task, before any agreement is signed.
- **Details of the account revenue is received into**, so that reported revenue can be checked against deposits.
- **Notice of any additional accounts**, including foreign currency accounts, so that revenue is not simply routed around the one we can see.

### 7.5 What we do with it

Our commitments in return, and these belong in the agreement rather than in a conversation:

- The information is used solely to calculate and verify the amounts due under the agreement.
- It is not disclosed to any third party except our own professional advisers, who are bound by the same terms.
- It is held securely, with named individuals having access.
- It is returned or destroyed within an agreed period after the agreement ends.
- The confidentiality obligation survives termination, typically for three to five years.

If a prospective partner will not give you those commitments in writing, do not give them your bank statements.
`,
  },
  {
    number: 8,
    title: "What we need from you — Part 3: platform and account access",
    body: `
A great deal of avoidable pain in agency relationships comes from account ownership, and almost all of it is preventable with fifteen minutes of care at the start.

### 8.1 The principle: you own, we access

Every asset that matters should be owned by your business and accessed by us. Not the other way round.

That means the account is created under your business email, the billing is in your business's name, the ownership role sits with you, and we are added as a user with the permissions we need. When the agreement ends, you remove our access and nothing else changes.

The alternative — where the agency creates everything under its own account and “manages it for you” — is common, and it is how businesses end up losing their advertising history, their review count, their domain, or their entire website when a relationship sours. We will not do it that way even when a partner offers, because it converts a commercial disagreement into a hostage situation, and those end badly for everyone.

There is one honest exception. Where we run advertising through our own manager account for operational reasons, the individual ad accounts should still be owned by your business, and the agreement should state what happens to them on termination.

### 8.2 The access list

#### Website and infrastructure

- Domain registrar login, or at minimum confirmation of the registrar and the registrant name
- DNS management, where it is separate from the registrar
- Hosting control panel
- Website admin or CMS account with an appropriate role
- Any existing staging or development environment
- SSL and email routing arrangements, where they are not with the host

#### Search and local presence

- Google Business Profile — transferred to ownership by your business, with us added as a manager
- Google Search Console — verified property, with us as a full user
- Google Analytics — admin or editor access, and confirmation of which property is live
- Google Tag Manager, where it exists
- Bing Webmaster Tools, where relevant to the market
- Apple Business Connect, where relevant

#### Advertising

- Google Ads account, with the account ID and confirmation of who the billing party is
- Meta Business Manager, with the business verified and the page and ad account assigned to it
- Any other platform in use — LinkedIn, TikTok, local directories
- Access to historic spend and performance data, not just going-forward access

#### Customer systems

- CRM, booking system or job management software
- Call tracking, where it exists
- Email marketing platform, with list ownership confirmed
- Review platforms — Google, Trustpilot, Clutch, sector-specific sites
- Live chat or messaging tools

#### Brand assets

- Logo files in vector format, not a screenshot
- Brand colours and typefaces
- Photography, with confirmation of who owns the rights
- Any existing style guide
- Trademark registrations, where they exist

### 8.3 Access hygiene

- **Named accounts, never shared passwords.** Each person on our side gets their own login, so access can be removed individually and activity can be traced.
- **Two-factor authentication on your ownership accounts**, with the recovery method under your control — your phone number, your authenticator, your backup codes. Not ours.
- **A written list of every account and who owns it**, maintained as an annexure to the agreement and updated when anything is added.
- **An offboarding clause** that states exactly what happens to each category of asset when the agreement ends, and within what timeframe.

### 8.4 What we hand back

Worth agreeing in advance, because it is the question nobody asks until the relationship is already ending:

- Ad accounts and their history, transferred or left in place under your ownership
- Website files and database, or continued hosting under your account
- All content produced under the agreement, with a clear copyright assignment
- Tracking configuration documented, so the next party can pick it up
- Customer and lead data exported in a usable format
- Any credentials we created on your behalf
`,
  },
  {
    number: 9,
    title: "What we need from you — Part 4: the commercial baseline",
    body: `
Documents tell us the business is real. This section tells us whether the arrangement can work.

### 9.1 Revenue and margin

- Monthly revenue for twenty-four months, reconciled to bank records
- Revenue split by product or service line, because a 40% margin and an 8% margin cannot be marketed the same way
- Gross margin by line, at least approximately
- Average order value, and how much it varies
- Your current price list, and how long prices have held

### 9.2 Customers

- Total active customers, and how “active” is defined
- The split between new and repeat revenue
- Repeat purchase rate and typical interval
- Customer concentration — if one client is 40% of revenue, the risk profile of the whole arrangement changes
- Approximate lifetime value, even as a rough calculation

### 9.3 Current marketing

- What you spend today, by channel, monthly
- What it currently produces, as far as you can tell
- What has been tried and abandoned, and why
- Who did the work previously, and how that relationship ended
- Any contractual restrictions left over from it

That last pair is not idle curiosity. If three agencies have come and gone in two years, there is a pattern, and it is better for both of us to look at it honestly now.

### 9.4 The market

- The geographic area you serve, precisely — not “the GTA” but the actual postcodes you will travel to
- Your main competitors, named
- Seasonality, month by month
- Any regulatory constraint on how you can advertise, which matters in several sectors
`,
  },
  {
    number: 10,
    title: "What we need from you — Part 5: people and response",
    body: `
A profit share makes your operational performance our financial problem. That is uncomfortable to say and necessary to address.

### 10.1 Who does what

- A named decision-maker on your side, with authority to approve budgets and campaigns
- A named day-to-day contact, who may be a different person
- A stated response time for approvals — a campaign held up for three weeks awaiting sign-off costs both sides money
- Who handles incoming enquiries, and during which hours
- What happens outside those hours

### 10.2 Sales response commitments

These go in the agreement, with numbers:

- Maximum time to first response on a web enquiry
- Maximum time to return a missed call
- Whether enquiries are pursued more than once, and how often
- The route from enquiry to quotation, and the typical time it takes
- Who records the outcome, and where

### 10.3 Fulfilment quality

Marketing amplifies whatever the business already is. If the work is late or the quality is inconsistent, more customers means more complaints, worse reviews, and a channel that gets harder to run rather than easier. Reviews in particular compound: local search ranking depends on them, so a drop in service quality directly degrades the asset we are building.

We will ask about current complaint rates and current review scores, and we will ask what happens when something goes wrong.
`,
  },
  {
    number: 11,
    title: "Capacity: can you serve what we build?",
    body: `
This is the single most common cause of failure in performance partnerships, and it has nothing to do with marketing.

### 11.1 The problem

A campaign that works doubles enquiry volume in a quarter. If the business can produce forty units a month and demand rises to ninety, the outcome is not double revenue. It is longer lead times, missed deadlines, staff under pressure, declining quality, worse reviews, and eventually a decision to turn the advertising off.

Nobody gets paid for that outcome, and the relationship usually does not survive it.

### 11.2 What we need to know

- Current capacity, in whatever unit your business counts in — jobs per week, units per month, installations per day
- Current utilisation against that capacity
- Lead time from order to delivery today
- What the constraint actually is — machines, people, space, cash, or a supplier
- How quickly the constraint can be lifted, and what it costs
- Whether the business can fund the growth, which is the next section

### 11.3 Working capital

Growth consumes cash before it produces it. A business that wins a large order often has to buy materials, pay labour and wait sixty days for payment. Profitable businesses run out of money this way regularly.

So we will ask:

- What are your payment terms with customers, and what is actual collection time?
- What are your payment terms with suppliers?
- Do you have a credit facility, and how much of it is used?
- How much cash is available to fund an increase in volume?
- Who pays for advertising spend, and when?

That last question deserves emphasis. Advertising spend is not our fee. If a campaign needs USD 3,000 a month in ad budget, that is your cost, paid to the platform from your card, in addition to our percentage. A partner who expects the agency to fund the media as well as the labour is asking for an investment, not a service agreement, and that is a different conversation with different terms.
`,
  },
  {
    number: 12,
    title: "The agreement, clause by clause",
    body: `
What follows is a description of the clauses a workable agreement contains, and what each one is for. It is not a template and it is not drafting advice. Have a qualified lawyer in your jurisdiction prepare or review the final document.

### 12.1 Parties and capacity

Full legal names, registration numbers and registered addresses of both entities. A statement that each signatory is authorised to bind their party. Trading names listed separately from legal names.

### 12.2 Scope of services

What we will do, in specific terms. Equally important, what we will not do — a short list of exclusions prevents a slow expansion of scope that nobody agreed to. Where deliverables are periodic, say how often.

### 12.3 Term and exclusivity

The initial term, which for a percentage deal should be long enough for the work to produce results — typically twelve to twenty-four months. Whether it renews automatically. Whether either side is exclusive, and in what field and territory.

### 12.4 The calculation

This is the heart of the agreement and it belongs in a numbered schedule rather than in a sentence. It should state the base measure, the percentage, the period, the method, the exclusions from [Section 4](#section-4), the attribution method from [Section 5](#section-5), and a worked example using real figures from the business.

A worked example in the contract is worth more than a page of definitions. When a dispute arises, both parties look at the example first.

### 12.5 Reporting and access

What you provide, in what format, by what date each month. What access is granted and to whom. What notice is required before access changes.

### 12.6 Audit rights

The right to inspect the records behind the calculation. Frequency, normally once a year plus a right triggered by a specific discrepancy. Notice period. Who bears the cost — commonly the party requesting it, unless the audit finds a variance above an agreed threshold, in which case the cost shifts. That threshold makes the clause self-policing.

### 12.7 Payment

Amount, currency, due date, and method. Which party bears bank charges and intermediary fees — on international transfers these can be USD 15 to 50 per payment and should not be a surprise. What happens on late payment: interest rate, suspension rights, and after how long.

### 12.8 Minimum and maximum

Two optional protections worth discussing:

**A floor** guarantees the agency a minimum monthly amount regardless of performance, which reduces the agency's risk and usually buys you a lower percentage.

**A cap** limits the total percentage payable in a period. Owners like caps. Agencies dislike them, because the upside is what compensates for the downside. If a cap is agreed, it should be generous enough that hitting it is a good year, not a normal one.

### 12.9 Termination

Termination for convenience, with a notice period. Termination for cause, with the causes listed: non-payment, material breach, insolvency, refusal of agreed access, criminal conduct. A cure period for breaches that can be cured.

### 12.10 The tail

The clause most often forgotten and most often litigated.

If we spend eighteen months building an organic presence that produces enquiries for years, and the agreement ends, does the flow of payments stop immediately?

Common approaches: payments continue at a reducing rate for a defined period after termination; a single exit payment calculated as a multiple of recent monthly amounts; or a clean break with a higher percentage during the term to compensate.

There is no correct answer, but there is a wrong one, which is saying nothing and arguing about it later.

### 12.11 Intellectual property

Who owns the website, the content, the creative, the data, and the tracking configuration, both during the term and after it. Where ownership transfers on payment, say so. Where we retain rights to our own methods and tools, say that too.

### 12.12 Confidentiality and data protection

Mutual obligations. What counts as confidential, what is excluded, how long the obligation lasts. Where personal data of your customers is involved, the roles under the applicable regime — UK or EU GDPR, Canada's PIPEDA, or the relevant local law — and a data processing schedule if one is required.

### 12.13 Non-circumvention and non-solicitation

That you will not engage our staff directly, and that we will not approach your customers for our own purposes, each for a stated period. Keep these narrow; broad restraints are frequently unenforceable and always create friction.

### 12.14 Liability

A cap on each side's liability, usually tied to amounts paid over a recent period. Exclusion of indirect and consequential loss. Carve-outs for the things that should not be capped: confidentiality breaches, IP infringement, fraud.

### 12.15 Governing law and dispute resolution

Covered in [Section 14](#section-14). It is the clause that determines whether every other clause is worth anything.

### 12.16 Signatures

Both parties, dated. Witnessed where the jurisdiction expects it. If signing electronically, use a platform that produces an audit trail rather than an emailed image of a signature.
`,
  },
  {
    number: 13,
    title: "Getting paid across borders",
    crossBorder: true,
    body: `
This section applies where the agency and the business are in different countries. It is written from the position we know best — a Pakistan-based partner working with a business in Canada, the UK, the US or the UAE — but the structure applies generally.

> Everything in this section is general information, not tax advice. Rates and rules change. Verify with a qualified professional in each jurisdiction before relying on any of it.

### 13.1 How the money moves

**Bank transfer (SWIFT).** The most formal route and the one that produces the cleanest documentation. Slower, and intermediary banks take fees along the way. For Pakistani exporters this route produces the proceeds realisation certificate that the export framework expects.

**Payoneer, Wise and similar platforms.** Faster and usually cheaper, widely used by service exporters. Check that the receiving arrangement still routes proceeds through the banking channel in a way that satisfies local requirements, because informal receipt can forfeit the tax treatment described below.

**What to avoid.** Personal accounts, cryptocurrency, informal transfer networks, and any arrangement that does not produce a paper trail. Aside from the legal exposure, an undocumented payment is not evidence of anything if the relationship later goes to arbitration.

### 13.2 The Pakistan side

Pakistan treats IT and IT-enabled services exports favourably, but the favourable treatment is conditional on doing things formally.

- **Registration.** Registering with the Pakistan Software Export Board, or with P@SHA, unlocks both the concessional tax rate and the foreign currency retention facility. PSEB registration is inexpensive and processed in a matter of days.
- **Tax treatment.** Export proceeds for IT and ITeS received through banking channels fall under a final tax regime at a concessional rate for registered exporters, with a higher rate applying where the exporter is not registered. The bank deducts it when the remittance is credited. Because it is a final regime, that deduction settles the liability on that income rather than being an advance against a later assessment.
- **Foreign currency retention.** Registered IT exporters may retain a proportion of export proceeds in a specialised foreign currency account, which can be used for permitted foreign payments — advertising platforms, software subscriptions, contractor payments — without repeatedly converting currency.
- **Documentation.** Keep the invoice, the contract, the remittance advice and the bank's certificate for each payment. These are what prove the income is export income if it is ever questioned.

### 13.3 The client's side

**Canada.** Payments to a non-resident for services rendered in Canada attract a withholding obligation at 15% under Regulation 105 of the Income Tax Regulations. Services performed entirely outside Canada are outside that requirement. For a remote agency that never sets foot in the country, this normally means no withholding — but the position should be documented, and where any part of the work is performed on Canadian soil, the portion allocable to it is caught. Where a bundled contract covers both, the allocation needs to be reasonable and supportable.

**United States.** A US payer will normally ask for Form W-8BEN-E from a foreign entity, or W-8BEN from an individual, to establish foreign status. Income from services performed outside the United States is generally not US-source income, but the form is what allows the payer to treat it correctly rather than withholding by default.

**United Kingdom.** There is generally no withholding on service fees paid to a non-resident supplier. VAT is handled through the reverse charge mechanism by the UK business rather than charged by the overseas supplier.

**UAE.** No withholding tax on outbound service payments. VAT treatment depends on the place of supply rules and the recipient's registration status.

In every case the practical step is the same: establish before the first invoice whether anything will be withheld. A 15% deduction discovered on the first payment, after the price was agreed net, is a conversation nobody enjoys.

### 13.4 Double taxation

Pakistan has treaties with each of the countries above. Where withholding does apply, a treaty may reduce the rate, and relief is generally claimed by providing a tax residency certificate from the home tax authority to the payer before payment. Claiming it afterwards is possible in principle and painful in practice.

### 13.5 Currency

A percentage deal denominated in the client's currency exposes the agency to exchange movement; denominated in the agency's currency it exposes the client. Neither is wrong, but the agreement should say which, and should name the rate source and date used for conversion — for example, the central bank's published rate on the last business day of the month. “Market rate” is not a definition.

### 13.6 Invoicing

Each invoice should carry: both parties' legal names and addresses, both tax registration numbers, the invoice number and date, the period covered, the calculation basis, the amount and currency, the payment details, and a reference to the clause of the agreement it is raised under. That last item takes ten seconds and resolves most queries before they become disputes.
`,
  },
  {
    number: 14,
    title: "When things go wrong: disputes that actually resolve",
    crossBorder: true,
    body: `
### 14.1 The uncomfortable arithmetic

Suppose the agreement is governed by Ontario law with Ontario courts having jurisdiction, and a Pakistani agency is owed USD 9,000.

Retaining Ontario counsel, pursuing a claim, obtaining judgment and enforcing it will cost more than the amount in dispute, take a year or more, and require someone to be physically available in Canada. The clause is, in practice, unusable.

Now reverse it. Governed by Pakistani law with courts in Lahore, and a Canadian business is owed money by the agency. Equally unusable in the other direction.

A jurisdiction clause that neither side can afford to invoke is not protection. It is decoration.

### 14.2 Arbitration

For cross-border agreements of any size, arbitration is usually the better answer, for one specific reason: arbitral awards travel across borders far more easily than court judgments do.

The New York Convention of 1958 obliges signatory states to recognise and enforce arbitral awards made in other signatory states, on limited grounds of refusal. More than 170 countries are party to it, including Pakistan, Canada, the UK, the US and the UAE. Pakistan gave it permanent domestic effect through the Recognition and Enforcement (Arbitration Agreements and Foreign Arbitral Awards) Act 2011, under which applications go to the High Court and the statute directs a pro-enforcement approach.

A workable arbitration clause specifies: the rules, the seat, the number of arbitrators, the language, and the governing law of the contract. For small commercial matters, a single arbitrator under an established set of rules, seated in a neutral Convention country, in English, is a sensible default. Dubai and Singapore are both commonly used as neutral seats for this corridor.

### 14.3 Arbitration is still expensive

Honesty requires saying this. A single-arbitrator international arbitration is unlikely to be economic for a dispute under about USD 25,000. For a small monthly percentage, the arbitration clause is a deterrent and a backstop rather than a realistic first move.

So the agreement should contain steps before it:

1. **Escalation.** A defined period for the named contacts to resolve it, then a defined period for the principals.
2. **Expert determination for accounting disputes.** Where the disagreement is purely about a figure — whether an expense was correctly excluded, whether revenue was correctly attributed — an independent accountant appointed by agreement decides, at a fraction of the cost and in weeks rather than months. Their decision binds both sides on the number. This single clause resolves the majority of real disputes in percentage deals.
3. **Mediation**, optional and sometimes useful.
4. **Arbitration**, as the final step.

### 14.4 Commercial protections that work better than legal ones

Legal remedies are the last resort. These reduce the chance of needing them:

- **Short payment cycles.** Monthly settlement means the maximum exposure is one month. Quarterly settlement triples it.
- **Suspension rights.** The right to pause campaign management on non-payment, after notice — a defined, proportionate step, not a threat to delete anything.
- **Third-party verification.** Where both sides accept the accountant's figure, most arguments end before they start.
- **Starting small.** A three-month paid pilot before the percentage arrangement begins tells both sides more about each other than any amount of due diligence.

One thing we will not do, and would advise you never to accept from anyone: holding your accounts, domain or website hostage against payment. It is often unlawful, it frequently exposes the party doing it to greater liability than the debt, and it is the reason [Section 8](#section-8) insists that you own everything.
`,
  },
  {
    number: 15,
    title: "Red flags on both sides",
    body: `
### 15.1 Signals that make us decline

None of these is proof of anything. Each is a reason to slow down.

- Business income runs through a personal account
- No accounting system, or books more than a quarter behind
- Reluctance to provide bank statements after a confidentiality agreement is signed
- A substantially cash-based operation with no reliable revenue record
- Three or more agencies in the last two years, each ending badly
- An existing unresolved dispute with a previous agency
- Refusal to put the arrangement in writing, or pressure to start before signing
- A request that we fund advertising spend as well as our own labour
- Expectations that imply a misunderstanding of the market — a tenfold increase in a quarter
- No capacity to serve more customers, and no plan to add any
- The person negotiating cannot bind the company and will not say who can
- Pressure to skip the audit phase because the details can be sorted out later

### 15.2 Signals you should watch for in us

Fair is fair. If a prospective partner does any of the following, be cautious:

- Proposes a percentage without asking what your margins are
- Will not name the exact financial line the percentage attaches to
- Wants ownership of your domain, Google Business Profile or ad accounts
- Will not provide their own registration details and a verifiable address
- Guarantees a specific revenue figure or a specific ranking
- Will not agree an audit right or a third-party expert determination clause
- Offers no termination route, or a notice period longer than a quarter
- Cannot show comparable work with references you are allowed to contact
- Will not accept a pilot period
- Is vague about who actually does the work

### 15.3 The test that cuts through

Ask the question: *if this arrangement produced nothing for twelve months, what would each of us have lost?*

If the honest answer is that the agency loses a year of labour and you lose nothing, the agency is carrying all the risk and will eventually want protections that look like the ones in this document. If the answer is that you lose nothing because you were never going to spend anything anyway, the arrangement is not a partnership — it is a free option, and nobody good will take the other side of it for long.
`,
  },
  {
    number: 16,
    title: "How onboarding runs",
    body: `
A phased sequence, so both sides can stop cheaply if it is not a fit.

{{phases}}
`,
  },
  {
    number: 17,
    title: "The complete checklist",
    body: `
Requirements vary by structure. Use the column that matches the deal on the table.

{{checklist}}
`,
  },
  {
    number: 18,
    title: "Questions we get asked",
    body: `
{{faqs}}
`,
  },
  {
    number: 19,
    title: "What this document is not",
    body: `
This is a practical guide written from commercial experience. It is not legal advice, not tax advice, and not accounting advice, and reading it does not create any relationship between you and us.

Tax rates, regulatory requirements and reporting obligations change, sometimes annually. Every figure and rule mentioned should be verified with a qualified professional in the relevant jurisdiction before you rely on it. The correct structure for your business depends on facts this document cannot know.

Before signing any agreement of this kind:

- Have a lawyer qualified in the governing jurisdiction review the full document
- Have your accountant review the calculation schedule specifically
- Confirm the tax treatment in both countries with a professional in each
- Confirm that no existing agreement restricts what you are about to sign

The cost of that review is small next to the cost of a badly defined percentage running for two years.
`,
  },
  {
    number: 20,
    title: "Where to start",
    body: `
If you are considering this kind of arrangement, the useful first step is not a contract. It is a conversation about three things: what your business actually produces today, whether it could serve more, and whether the figures exist to measure either.

If the answer to all three is yes, the rest of this document is a checklist.

If the answer to any of them is no, that is the work to do first — and it is worth doing whether or not a partnership ever follows. A business with clean books, a working baseline and a known capacity ceiling is easier to grow, easier to sell, easier to finance, and easier to run. The partnership is only the reason you finally got round to it.
`,
  },
];

export type StructureKey = "a" | "b" | "c" | "d";

export const structures: { key: StructureKey; letter: string; name: string; recommended?: boolean }[] = [
  { key: "a", letter: "A", name: "Net profit" },
  { key: "b", letter: "B", name: "Gross revenue" },
  { key: "c", letter: "C", name: "Attributable revenue", recommended: true },
  { key: "d", letter: "D", name: "Retainer + %" },
];

/** Section 3.2 */
export const structureComparison: { label: string; values: Record<StructureKey, string> }[] = [
  { label: "Typical rate", values: { a: "10–20%", b: "3–8%", c: "8–15%", d: "Fee + 3–7%" } },
  { label: "Who carries the risk", values: { a: "Partner, entirely", b: "Partner, mostly", c: "Partner, mostly", d: "Shared" } },
  { label: "Ease of verification", values: { a: "Very difficult", b: "Easy", c: "Moderate", d: "Easy" } },
  { label: "Can the figure be manipulated?", values: { a: "Yes, easily", b: "Barely", c: "Only with effort", d: "Barely" } },
  { label: "Documents needed from you", values: { a: "Full accounts", b: "Bank and processor records", c: "Analytics, CRM, baseline", d: "Bank records" } },
  { label: "Cash-flow effect on you", values: { a: "Paid only from surplus", b: "Paid regardless of margin", c: "Paid on growth only", d: "Small fixed outflow" } },
  { label: "Typical time to first payment", values: { a: "6–12 months", b: "1–2 months", c: "3–6 months", d: "Immediate" } },
  { label: "Likelihood of dispute", values: { a: "High", b: "Low", c: "Moderate", d: "Low" } },
  {
    label: "Suits you if",
    values: {
      a: "You have clean books and a real finance function",
      b: "Margins are stable and healthy",
      c: "You have clear historic data and want to pay only for growth",
      d: "You want the partner invested but also accountable monthly",
    },
  },
];

/** Section 4.3 — the three possible payments from the worked example. */
export const paymentSpread = [
  { label: "10% of net profit", value: 2000 },
  { label: "10% of operating profit before owner compensation", value: 98500 },
  { label: "6% of gross revenue", value: 504000 },
] as const;

/** Section 16 */
export const onboardingPhases: { phase: number; title: string; when?: string; body: string }[] = [
  {
    phase: 0,
    title: "Qualification and free growth plan",
    when: "One call · free",
    body: `What the business does, what it wants, roughly what size it is, whether there is capacity to grow, whether the books exist. Thirty minutes. Most conversations end here, and that is a success rather than a failure.

This call is free, and so is the short growth plan that comes out of it: a review of your search visibility, website and competitors, with the clearest next steps. It tells you whether there is an opportunity. Nothing up to this point costs you anything, whichever structure you end up choosing.`,
  },
  {
    phase: 1,
    title: "Confidentiality and first documents",
    when: "Week 1",
    body: "A mutual confidentiality agreement, signed before anything sensitive is exchanged. Then registration documents, identification, and twelve months of bank statements.",
  },
  {
    phase: 2,
    title: "Paid audit",
    when: "Weeks 2 to 3 · percentage deals only",
    body: `This is the deep version of the free growth plan, and it applies to percentage deals only. The growth plan tells you whether there is an opportunity; the audit measures it precisely enough to put money against. We review the accounts, the current marketing, the analytics, the competitive position and the capacity constraints, and produce a written assessment: what the opportunity actually is, what structure suits it, what baseline we would propose, and what needs to be fixed first.

This phase is paid, and it should be. A partner willing to do this work free has either not done it properly or intends to recover it elsewhere. Paying for it also means the assessment is yours: if you decide not to proceed, you keep a document worth having.`,
  },
  {
    phase: 3,
    title: "Structure and agreement",
    when: "Weeks 3 to 5",
    body: "Agree the structure from [Section 3](#section-3). Draft the calculation schedule. Lock the baseline in writing. Each side's lawyer reviews. Sign.",
  },
  {
    phase: 4,
    title: "Access and instrumentation",
    when: "Weeks 5 to 6",
    body: "Account ownership verified and corrected where needed. Access granted. Tracking, call tracking and CRM configured. The measurement system has to be trustworthy before it is used to calculate anybody's money.",
  },
  {
    phase: 5,
    title: "First ninety days",
    when: "Days 1 to 90",
    body: "Execution begins. Monthly reporting from day one, even while the numbers are small, so that the reporting format is settled before it matters. Fortnightly calls for the first two months.",
  },
  {
    phase: 6,
    title: "First settlement",
    body: "The first calculation is produced, walked through line by line with both sides and, where relevant, the accountant. Expect to adjust the schedule after the first one; no definition survives contact with a real month entirely unchanged. Better to amend it in month two than to argue about it in month fourteen.",
  },
];

/** Section 17 — R = Required, A = Advised, N = Not needed; any other string is shown as written. */
type Requirement = "R" | "A" | "N" | (string & {});

export const checklistGroups: { title: string; items: { item: string; req: [Requirement, Requirement, Requirement, Requirement] }[] }[] = [
  {
    title: "Legal identity",
    items: [
      { item: "Certificate of incorporation or registration", req: ["R", "R", "R", "R"] },
      { item: "Certificate of good standing", req: ["R", "A", "R", "A"] },
      { item: "Photo ID for each signatory", req: ["R", "R", "R", "R"] },
      { item: "Proof of address for signatory", req: ["R", "R", "R", "A"] },
      { item: "Ownership and shareholding structure", req: ["R", "A", "R", "A"] },
      { item: "Authority to sign (board resolution)", req: ["R", "R", "R", "R"] },
      { item: "Tax registration number", req: ["R", "R", "R", "R"] },
      { item: "Tax residency certificate", req: ["If treaty relief claimed", "If treaty relief claimed", "If treaty relief claimed", "If treaty relief claimed"] },
      { item: "Disclosure of exclusivity or franchise terms", req: ["R", "R", "R", "R"] },
    ],
  },
  {
    title: "Financial visibility",
    items: [
      { item: "Bank statements", req: ["24 months", "12 months", "24 months", "12 months"] },
      { item: "Filed financial statements, 2–3 years", req: ["R", "A", "R", "A"] },
      { item: "Filed tax returns", req: ["R", "N", "A", "N"] },
      { item: "Payment processor statements", req: ["R", "R", "R", "A"] },
      { item: "Read-only accounting system access", req: ["R", "N", "A", "N"] },
      { item: "Chart of accounts", req: ["R", "N", "A", "N"] },
      { item: "Accountant contact and written consent", req: ["R", "A", "R", "A"] },
      { item: "Separate business bank account", req: ["R", "R", "R", "R"] },
    ],
  },
  {
    title: "Platform and account access",
    items: [
      { item: "Domain and DNS access", req: ["R", "R", "R", "R"] },
      { item: "Hosting and CMS access", req: ["R", "R", "R", "R"] },
      { item: "Google Business Profile ownership", req: ["R", "R", "R", "R"] },
      { item: "Analytics and Search Console access", req: ["R", "R", "R", "R"] },
      { item: "Ad account access, including history", req: ["R", "R", "R", "R"] },
      { item: "CRM or booking system access", req: ["A", "A", "R", "A"] },
      { item: "Call tracking configured", req: ["A", "A", "R", "A"] },
      { item: "Brand assets in vector format", req: ["R", "R", "R", "R"] },
    ],
  },
  {
    title: "Commercial baseline",
    items: [
      { item: "24-month revenue history", req: ["R", "R", "R", "R"] },
      { item: "Revenue and margin by line", req: ["R", "R", "R", "A"] },
      { item: "Customer counts and repeat rate", req: ["A", "A", "R", "A"] },
      { item: "Current marketing spend by channel", req: ["R", "R", "R", "R"] },
      { item: "Previous agency history and terms", req: ["R", "R", "R", "R"] },
      { item: "Capacity and lead-time statement", req: ["R", "R", "R", "R"] },
      { item: "Working capital position", req: ["R", "A", "R", "A"] },
    ],
  },
  {
    title: "People and response",
    items: [
      { item: "Named decision-maker and contact", req: ["R", "R", "R", "R"] },
      { item: "Sales response commitments", req: ["R", "R", "R", "R"] },
    ],
  },
  {
    title: "Signed schedules",
    items: [
      { item: "Agreed baseline, signed", req: ["R", "R", "R", "R"] },
      { item: "Calculation schedule, signed", req: ["R", "R", "R", "R"] },
      { item: "Attribution methodology, signed", req: ["A", "N", "R", "A"] },
      { item: "Account ownership register", req: ["R", "R", "R", "R"] },
    ],
  },
];

/** Section 18. Answers are Markdown. */
export const handbookFaqs: { question: string; answer: string }[] = [
  {
    question: "Is ten percent of profit expensive?",
    answer:
      "Compared to a fixed fee, it is expensive in good years and free in bad ones. That is the entire point. If you expect consistently strong results, a fixed fee is cheaper. If you are uncertain, or if cash is tight, the percentage moves the risk onto us and you pay only out of what arrives.",
  },
  {
    question: "Why do you need my tax returns if you only get a share of profit?",
    answer:
      "Because filed returns are the one version of the figures that carries a consequence for being wrong. Management accounts can be prepared any way at all. A filed return is a statement to a tax authority. It is the most reliable check available to either of us.",
  },
  {
    question: "Can we start with a handshake and write it up later?",
    answer:
      "No. Not because of distrust, but because the definitions in [Sections 4](#section-4) and [5](#section-5) are genuinely difficult, and they are ten times harder to agree once there is money on the table. Writing them down first is how both sides discover they meant different things while it is still free to find out.",
  },
  {
    question: "What if I sell the business?",
    answer:
      "The agreement should say. Common positions: it transfers to the buyer, it terminates with a defined exit payment, or the seller settles the outstanding amount at completion. Decide at the start; a change-of-control clause costs one sentence.",
  },
  {
    question: "What if you disappear?",
    answer:
      "Termination for cause, with a cure period, and a handover obligation covering credentials, data and documentation. You own the accounts throughout, so the practical exposure is the time lost rather than the assets.",
  },
  {
    question: "Can I cap what you earn?",
    answer:
      "Yes, though expect the percentage to rise in exchange. A cap removes the upside that compensates for the downside, so the pricing has to move somewhere else.",
  },
  {
    question: "Do you work with businesses that have never advertised?",
    answer:
      "Yes, and often they are the best fit, because the baseline is clean and improvement is easy to see. But the first months are slower and a retainer element is usually sensible.",
  },
  {
    question: "Do I have to use your systems?",
    answer: "No. You must have systems that produce reliable figures. If yours already do, we will use them.",
  },
  {
    question: "What happens if we disagree about a number?",
    answer:
      "The expert determination clause in [Section 14.3](#section-14-3): an independent accountant, appointed by agreement, decides. Both sides accept the figure. It takes weeks rather than months, and costs a fraction of anything else.",
  },
  {
    question: "How long before this is worth it for me?",
    answer:
      "For paid channels, usually six to twelve weeks to reach a reliable cost per enquiry. For organic and local search, six to twelve months. A percentage arrangement is not a fast route to results; it is a way of not paying for them until they arrive.",
  },
  {
    question: "Is a profit share better than hiring someone in-house?",
    answer:
      "Different trade. An employee costs a salary whether or not the work succeeds, and you carry the management burden and the hiring risk. A percentage costs nothing when nothing happens, but it costs more in a strong year, and you do not control the day-to-day. Businesses with steady, predictable demand usually do better in-house. Businesses trying to find out whether growth is possible usually do better with a percentage.",
  },
];

export function sectionId(number: number | string) {
  return `section-${String(number).replace(/\./g, "-")}`;
}

/** Strips Markdown link targets and syntax so text can be counted or used in schema. */
export function plainText(markdown: string) {
  return markdown
    .replace(/\{\{\w+\}\}/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\\([[\]])/g, "$1")
    .replace(/[#>*_|`]/g, " ")
    .replace(/:?-{3,}:?/g, " ");
}

export function handbookWordCount() {
  const text = [
    handbookMeta.title,
    handbookMeta.subtitle,
    ...handbookSections.flatMap((s) => [s.title, s.body]),
    ...structureComparison.flatMap((row) => [row.label, ...Object.values(row.values)]),
    ...onboardingPhases.flatMap((p) => [`Phase ${p.phase}`, p.title, p.when ?? "", p.body]),
    ...checklistGroups.flatMap((g) => g.items.map((i) => i.item)),
    ...handbookFaqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return plainText(text).split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}
