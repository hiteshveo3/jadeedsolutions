export type CaseStudySection = {
  id: string;
  title: string;
  answer: string;
  paragraphs: string[];
  bullets?: string[];
};

export const alphaMoversSections: CaseStudySection[] = [
  {
    id: "executive-summary",
    title: "Executive summary: what changed for Alpha Movers?",
    answer: "Alpha Movers moved from early, fragmented search visibility to a broad organic footprint built around specialist moving services and London-area demand. Google Search Console recorded 630 clicks and 160,903 impressions from 24 February to 23 August 2026.",
    paragraphs: [
      "This case study documents the organic-search development of Alpha Movers, a London removals and relocation business, using two Google Search Console exports supplied on 25 August 2026. The six-month export covers 24 February to 23 August 2026. The three-month export covers 24 May to 23 August 2026. The longer period recorded 630 organic clicks, 160,903 impressions, a calculated click-through rate of 0.39%, and an impression-weighted average position of approximately 26.55. The shorter three-month period produced 486 clicks and 142,133 impressions, which means most of the six-month visibility was generated during the latter half of the measurement window rather than being evenly distributed from the beginning.",
      "The clearest growth signal appears when equivalent 28-day windows are compared. The first 28 days of the six-month export generated 66 clicks from 4,476 impressions. The final 28 days generated 272 clicks from 96,301 impressions. That represents approximately 312% more clicks and 2,051% more impressions. Impression-weighted average position improved by about 13.7 positions, from 36.35 to 22.64. These are search-performance outcomes, not revenue claims. They show that Google displayed Alpha Movers for a much wider set of searches and that users reached the website more often. Booking and revenue attribution require call tracking, form tracking and CRM evidence beyond these exports.",
      "The growth was not limited to the company name. Search visibility developed across sofa and furniture hoisting, single-item transport, crate hire, furniture dismantling, piano moving and location-led removals queries. That breadth matters because local-service SEO becomes more resilient when one homepage or one branded term is not responsible for all discovery. The data also exposes the next optimisation cycle: multiple host and path variants split performance, many high-impression terms still have low CTR, and several location pages sit outside page one. The result is therefore both a success story and a practical roadmap for the next phase."
    ],
    bullets: [
      "630 clicks and 160,903 impressions across the six-month export.",
      "486 clicks and 142,133 impressions in the final three months.",
      "272 clicks and 96,301 impressions in the final 28 days.",
      "Specialist-service pages became major organic entry points.",
      "Canonical consolidation and CTR improvement remain material opportunities."
    ]
  },
  {
    id: "client-context",
    title: "Client context and commercial challenge",
    answer: "Alpha Movers needed a search system capable of generating demand across London removals services without relying only on broad, expensive head terms.",
    paragraphs: [
      "Removal companies compete in a difficult local-search environment. The market mixes broad category searches such as “removals London” with urgent, specific needs such as moving a piano, lifting a sofa through a window, delivering one item, hiring crates or finding movers in a particular borough. Broad keywords can attract large volumes, but they also combine many kinds of intent and are contested by long-established brands, lead-generation directories and Google Business Profiles with substantial review histories. A newer site therefore needs a route into the market that does not depend on immediately ranking for the most competitive phrase in the category.",
      "Alpha Movers also had to communicate operational range. A removals company may offer household moves, flat moves, office relocation, packing, storage, dismantling, specialist lifting and single-item collection, yet a visitor will not automatically understand that breadth from a generic homepage. Search engines face the same ambiguity. If each service is not represented by a clear page with a distinct purpose, internal links and useful supporting information, Google may struggle to identify the most relevant landing page for a specific query. The business then risks ranking one broad page weakly for many intents instead of ranking several focused pages strongly for their respective needs.",
      "The engagement therefore required more than publishing posts or inserting keywords. It required an information architecture that connected service demand, local intent and conversion paths. Jadeed Solutions’ role, as described in the existing client record, included the website, SEO, supporting application work, social activity and paid acquisition. This case study focuses on the organic-search evidence because the supplied workbooks are Google Search Console exports. Where the wider engagement is discussed, it is presented as delivery context rather than credited as the sole cause of every observed search change."
    ]
  },
  {
    id: "measurement-method",
    title: "Measurement method and source integrity",
    answer: "Every headline search metric in this study comes from the supplied Google Search Console workbooks; derived percentages are calculated from their daily rows.",
    paragraphs: [
      "The primary source is the file titled “alphamovers.co.uk-Performance-on-Search-2026-08-25 (1).xlsx”. Its Filters sheet identifies the search type as Web and the date filter as Last 6 months. Its Chart sheet contains daily rows from 24 February through 23 August 2026. The workbook also includes the first 1,000 queries, 747 page rows, 153 country rows, device totals and search-appearance data. Summing the daily Chart rows produces 630 clicks and 160,903 impressions. Those totals reconcile exactly with the device rows: 319 desktop clicks, 309 mobile clicks and two tablet clicks; 128,163 desktop impressions, 31,262 mobile impressions and 1,478 tablet impressions.",
      "The secondary source is the corresponding workbook without “(1)” in its filename. Its Filters sheet identifies Last 3 months, and its daily rows cover 24 May through 23 August 2026. This export totals 486 clicks and 142,133 impressions. It is a subset of the six-month window rather than a separate campaign. Reconciliation matters because an earlier version of the site referenced older screenshots and smaller totals. This article replaces those stale headline numbers with the current exports while retaining the date boundaries so readers understand exactly what is being compared.",
      "Average position is not a fixed rank. Search Console reports the average top position of the property for the impressions included in each row, and the number varies by query, location, device and search context. For period-level analysis, this study uses an impression-weighted position calculated from the daily rows. CTR equals clicks divided by impressions. Growth percentages compare the first and final 28 daily rows of the six-month export. No lead, booking or revenue total is inferred from clicks. Any reference to the performance-aligned commercial model describes the partnership structure; it is not used to manufacture conversion data that the workbook does not contain."
    ]
  },
  {
    id: "baseline",
    title: "The starting baseline: limited reach and unstable positions",
    answer: "The opening weeks showed early traction but limited search coverage: 4,476 impressions and 66 clicks in the first 28 days, with an average position near 36.35.",
    paragraphs: [
      "The six-month export begins on 24 February 2026 with 23 impressions, no clicks and an average position of 61.3. Visibility rises unevenly during March. On 10 March, the site records eight clicks from 266 impressions; on 18 March, it records 16 clicks from 320 impressions. These spikes demonstrate that individual terms or pages could reach useful positions, but the footprint was not yet broad or consistent. The first 28-day period produced 4,476 impressions and 66 clicks. A 1.47% period CTR appears stronger than the final window’s CTR, but the comparison must be interpreted carefully: small early impression sets often contain a higher proportion of branded or narrowly relevant searches, while later expansion introduces thousands of exploratory impressions at lower positions.",
      "The impression-weighted average position for the first 28 days was approximately 36.35. That figure suggests much of the property’s visibility sat beyond the first three result pages, even though selected queries already performed well. Search Console’s query table supports this mixed picture. Branded searches, specialist phrases and a small number of high-intent local searches attracted clicks, while broader removals terms remained lower. This is typical of an emerging topical footprint: Google can understand and reward specific page-query relationships before it develops enough confidence to surface the domain broadly across a competitive service category.",
      "The baseline should therefore not be described as “zero visibility.” It was a stage of partial recognition. Some pages had begun to earn impressions and occasional clicks, but coverage was narrow and daily demand was volatile. The strategic task was to turn isolated relevance into a connected service-and-location system. That meant strengthening the relationship between pages, clarifying which URL should rank for each intent and creating enough useful depth that the site could be considered across a much larger query set."
    ]
  },
  {
    id: "strategy",
    title: "The SEO strategy: build around real moving jobs",
    answer: "The growth model organised search content around the jobs customers actually need—specialist lifting, single-item moves, crates, dismantling and location-led removals—rather than one generic removals keyword.",
    paragraphs: [
      "A strong local-service architecture begins with the customer’s task. Someone who needs a sofa lifted through a balcony is not looking for the same information as someone comparing a full home move. A user searching for crate hire may be preparing to pack independently, while a person searching for piano movers is evaluating risk, equipment and specialist handling. Treating those searches as interchangeable weakens relevance. The Alpha Movers footprint instead developed around distinct service propositions that could answer different constraints and lead users toward the appropriate enquiry path.",
      "The Search Console results provide evidence that this specialist orientation gained traction. “Single item transport” recorded nine clicks from 37 impressions at an average position of 5.51 across the six-month export. “Sofa hoisting experts” generated six clicks from 800 impressions at position 4.2. “Furniture hoist hire prices” produced four clicks from 183 impressions at position 4.42, while “furniture hoist cost” produced three clicks from 49 impressions at position 4.2. “Piano movers Croydon” recorded four clicks from 11 impressions at position 4.91. These are small query-level click counts, but they reveal strong relevance to high-intent needs.",
      "Specialist pages also create supporting authority for broader categories. A removals company that demonstrates knowledge of access constraints, dismantling, lifting, packing and transport types gives both users and search systems more evidence about its operational expertise. This does not mean publishing thin pages for every wording variation. It means assigning one substantial page to each materially different service, connecting it to relevant locations and explaining the decision factors a customer would need. That structure supports conventional search, featured snippets and AI-generated answers because the site contains clear, extractable explanations tied to a real service entity."
    ]
  },
  {
    id: "information-architecture",
    title: "Information architecture and topical coverage",
    answer: "Service hubs, specialist landing pages and London-area pages created multiple relevant entry points while preserving a navigable hierarchy.",
    paragraphs: [
      "The exported page data shows performance distributed across a service hub, specialist service URLs, contact and review pages, and geographical landing pages. That distribution is strategically healthier than a site whose entire organic presence depends on the homepage. The general services page generated 32 clicks from 2,312 impressions on the non-www host, while the www services version generated nine clicks from 1,454 impressions. Single-item transport pages generated meaningful clicks across both host variants. Crate-hire pages accumulated thousands of impressions. Location pages for Ilford, East London, Stratford, Croydon, West London and other areas appeared in the top-page export.",
      "For users, the architecture should answer three questions quickly: what does the company do, where does it operate and why should it be trusted with this type of move? Service pages answer the first question. Location pages connect those capabilities to local availability and conditions. Reviews, contact information and operational detail answer the third. Internal links should mirror these relationships. A sofa-hoisting page can point to relevant coverage areas and related dismantling or single-item transport services. A Croydon page can link to piano moving, flat removals and other services available there without repeating generic copy.",
      "For AI search, a coherent hierarchy improves entity resolution. Retrieval systems need to distinguish Alpha Movers the company from a generic phrase, connect the company to London removals and understand the relationship between its services. Consistent naming, descriptive headings, breadcrumbs, Service schema, Organization or MovingCompany data, and stable canonical URLs all help. None of these elements guarantees an AI citation, but together they reduce ambiguity and make useful passages easier to retrieve, quote and attribute."
    ]
  },
  {
    id: "specialist-service-result",
    title: "Sofa hoisting became the strongest organic entry point",
    answer: "Sofa and furniture-hoisting URLs generated the highest page-level click totals in the export, validating specialist-service demand as an acquisition route.",
    paragraphs: [
      "The leading URL in the six-month Pages export was the non-www sofa-hoisting page at the site root, with 134 clicks and 8,300 impressions at an average position of 12.91. A www service-path version of the same topic generated another 72 clicks and 3,509 impressions at position 6.79. A non-www service-path version added 18 clicks and 723 impressions at position 7.85. These are separate Search Console rows because Google encountered multiple URL variants. Added together for directional topic analysis, sofa-hoisting variants account for at least 224 clicks and 12,532 impressions in the visible export rows.",
      "That concentration demonstrates the commercial value of looking beyond the obvious head term. A user searching for sofa hoisting or furniture-hoist hire is likely dealing with a concrete access problem. The search is specific, urgent and serviceable. A focused page can explain when hoisting is necessary, what affects price, what preparation is required, how access is assessed and how to request a quote. This aligns more closely with the user’s decision than a generic removals page, so both relevance and conversion potential can be stronger even when total search volume is lower.",
      "The result also reveals a technical issue. Three ranking variants for closely related content split signals and reporting. The next phase should select one preferred HTTPS host and one canonical service path, redirect every duplicate permanently, update internal links and sitemaps, and verify canonical recognition in Search Console. Consolidation could focus authority on the strongest URL instead of forcing Google to choose among variants. The case study therefore treats the topic’s success and the duplication risk as simultaneous truths."
    ]
  },
  {
    id: "query-results",
    title: "Query-level results and signs of commercial intent",
    answer: "Brand, specialist-service, pricing and local queries all produced clicks, showing that discovery expanded across several stages of the moving decision.",
    paragraphs: [
      "The top query was “alpha movers,” with 29 clicks from 212 impressions, a 13.68% CTR and an average position of 6.79. “Alpha movers reviews” produced five clicks from 89 impressions at position 3.89. Branded performance is important because it captures people who encountered the company elsewhere, return visitors and customers validating trust. However, the non-branded queries are more informative about acquisition reach. They show visibility for needs that do not presuppose knowledge of Alpha Movers.",
      "High-intent examples include “single item transport,” “piano movers Croydon,” “furniture hoist hire prices,” “furniture hoist cost,” “single item movers near me,” and “dismantle wardrobe service.” These phrases describe a task, location, price question or immediate requirement. The three-month workbook reinforces this pattern: “furniture hoist hire prices” averaged position 3.93; “furniture hoist cost” averaged 3.84; and “single item movers near me” averaged 5.28. Such queries can be more valuable than broad discovery terms because the user has already defined the service problem.",
      "Broader local phrases—“removals Stratford,” “removals Walthamstow,” “movers East London,” “removals Ilford,” “house removals Croydon,” “removals Hounslow” and “movers West London”—generated larger impression sets but generally lower positions and CTR. This is the expected next frontier. The site has entered consideration for competitive geo-service queries, but many impressions occur below the highest-click result positions. Improving location-page distinctiveness, internal authority, reviews, local relevance and title propositions can convert more of that visibility into visits."
    ]
  },
  {
    id: "growth-curve",
    title: "How the growth curve developed month by month",
    answer: "Visibility accelerated after May: impressions rose from 8,873 in May to 15,011 in June, 41,063 in July and 82,811 during the first 23 days of August.",
    paragraphs: [
      "Monthly totals show a non-linear growth pattern. The partial February period generated 382 impressions and one click. March produced 5,843 impressions and 84 clicks. April produced 6,920 impressions and 35 clicks. May generated 8,873 impressions and 41 clicks. These early months contained ranking tests, page discovery and fluctuations rather than a smooth upward line. Search performance often develops this way: individual pages enter and leave result sets while the engine evaluates relevance across devices, locations and queries.",
      "The scale changed in June, when the site recorded 15,011 impressions and 65 clicks. July then generated 41,063 impressions and 170 clicks. The first 23 days of August produced 82,811 impressions and 234 clicks—more impressions than the entire preceding months combined except July, despite being an incomplete month. Average position for the August period improved to approximately 21.99, compared with 30.36 in July. This indicates that the expansion was not caused only by appearing for many remote queries at extremely low positions; the overall position mix also improved.",
      "Daily rows make the acceleration visible. Impressions exceeded 1,000 on 10 July, 1,500 on 21 July and 3,000 on several days from late July onward. On 10 August, the site recorded 5,141 impressions. The largest daily click total was 21 on 15 August, followed by 15 on 17 August and 14 on 21 August. A responsible interpretation avoids assigning every movement to a single change because the export does not contain implementation annotations, algorithm-update controls or competitor data. What it does establish is a clear temporal association between a maturing search footprint and a much larger volume of search exposure."
    ]
  },
  {
    id: "device-analysis",
    title: "Device analysis: mobile generated almost half the clicks",
    answer: "Desktop created most impressions, but mobile produced nearly the same number of clicks with a substantially higher CTR and better average position.",
    paragraphs: [
      "Across six months, desktop generated 128,163 impressions and 319 clicks, while mobile generated 31,262 impressions and 309 clicks. Tablet contributed 1,478 impressions and two clicks. Desktop therefore represented about 79.7% of impressions but only 50.6% of clicks. Mobile represented about 19.4% of impressions and 49.0% of clicks. Search Console reported a desktop CTR of 0.25% and a mobile CTR of 0.99%. Mobile average position was 21.87, compared with 27.59 on desktop.",
      "The difference has practical implications. Removal searches are often made during planning, travel, property handovers or urgent access problems, so mobile users may be closer to action. A person who needs a hoist or a single-item mover may want to call, message or request a quote immediately. Mobile pages should therefore make service fit, area coverage, trust and the next action clear without requiring extensive navigation. Tap targets, form length, phone links, WhatsApp options, page speed and image weight affect whether search visibility becomes a lead.",
      "Desktop still matters because it dominates impressions and may support longer research, office moves and comparison activity. The correct response is not to optimise for one device at the expense of the other. It is to preserve a fast, semantically consistent experience while adapting interaction details. The same service promise and proof should be available on both devices, but mobile should make urgent contact especially frictionless. Future measurement should segment lead quality by device rather than relying only on CTR."
    ]
  },
  {
    id: "geographic-analysis",
    title: "Geographic performance and target-market relevance",
    answer: "The United Kingdom accounted for 547 of 630 clicks and 146,944 of 160,903 impressions, confirming that the search footprint was concentrated in the client’s operating market.",
    paragraphs: [
      "Country data provides an important relevance check. The United Kingdom produced 547 clicks and 146,944 impressions, or approximately 86.8% of clicks and 91.3% of impressions. That concentration supports the conclusion that the campaign reached the intended national market rather than building impressive-looking totals primarily from irrelevant countries. Pakistan generated 51 clicks from 379 impressions, likely reflecting brand, team or stakeholder interest, while the United States generated five clicks from 7,124 impressions.",
      "The United States row has an average position of 8.27 but a CTR of only 0.07%. This illustrates why average position cannot be treated as commercial success without context. The property may appear for informational or ambiguous queries in a country the moving service does not principally serve. Those impressions are less likely to convert. By contrast, UK location and specialist-service searches directly match the business offer. Reporting should therefore prioritise UK clicks, qualified landing pages and leads rather than celebrating every global impression equally.",
      "For local SEO, country relevance is only the first layer. Borough, city and service-area performance matters more. The page export shows Croydon, Ilford, Stratford, East London and West London URLs, but the workbook does not provide city-level user geography. Future analysis should combine Search Console page and query data with Google Business Profile insights, call tracking and a CRM location field. That would show whether visibility translates into enquiries from profitable service areas and identify places where content attracts impressions without operational fit."
    ]
  },
  {
    id: "ctr-opportunity",
    title: "Why CTR fell while results improved",
    answer: "CTR declined because impressions expanded much faster than clicks and many new impressions occurred at lower positions; this is an optimisation opportunity, not evidence that growth failed.",
    paragraphs: [
      "The first 28 days recorded a 1.47% CTR, while the final 28 days recorded 0.28%. Read without context, that decline looks negative. In reality, final-window clicks were more than four times higher and impressions were more than twenty-one times higher. As Google began showing Alpha Movers for a much wider range of terms, many impressions occurred on result pages where click probability is naturally low. Broader non-branded discovery diluted the proportion of clicks even as total traffic rose.",
      "The correct response is neither to ignore CTR nor to optimise it in isolation. Query and page pairs with high impressions, relevant intent and positions near the first page deserve priority. Examples include furniture-hoist terms, crate hire and local removals phrases. Titles should clearly state the service, location and differentiator without becoming repetitive. Meta descriptions can communicate availability, proof, pricing factors or quote pathways. On-page headings and introductory answers should confirm that the visitor has reached the right service immediately.",
      "CTR analysis also needs canonical cleanup. When multiple URL variants appear for the same topic, their impressions and clicks are fragmented. Google may display a less persuasive version or alternate between URLs. Consolidating duplicates, then monitoring the preferred URL, creates a cleaner basis for title testing. Search Console’s query-page filters can be used to compare changes over fixed 28-day periods. The aim is to win more qualified clicks from existing relevant impressions, not to chase an artificially high sitewide percentage by reducing discovery."
    ]
  },
  {
    id: "technical-seo",
    title: "Technical SEO findings: canonicalisation is the clearest gap",
    answer: "The exports show www and non-www URLs, plus root and /services/ variants for related pages, indicating that authority and reporting may be split across duplicates.",
    paragraphs: [
      "The Pages export repeatedly lists both https://alphamovers.co.uk and https://www.alphamovers.co.uk URLs. It also lists closely related sofa-hoisting pages at the root and inside /services/. Crate-hire, single-item transport, services and contact URLs likewise appear across host variants. Search Console can report historical or alternate URLs even after some technical fixes, so the export alone does not prove that every duplicate is currently indexable. It does, however, justify a focused canonical audit.",
      "The preferred technical state is one HTTPS host, one canonical URL per content purpose and permanent redirects from every alternate. Canonical tags should be self-referential on preferred pages. XML sitemaps should include only canonical URLs. Internal links, structured data, hreflang if used, image references and navigation should point directly to preferred versions. Redirect chains should be removed, and server behaviour should be consistent for trailing slashes and case. Google URL Inspection can then confirm the selected canonical for the highest-value pages.",
      "Technical consolidation is not merely housekeeping. The leading sofa-hoisting topic has performance distributed across at least three visible variants. If links, engagement and crawl signals converge on one strong URL, ranking stability and reporting clarity may improve. The same principle protects AI retrieval: a stable entity-document relationship is easier to cite than several near-duplicate pages with conflicting paths. No special “AI schema” replaces this foundation. Clean URLs, consistent facts and accessible content remain the core."
    ]
  },
  {
    id: "ai-search",
    title: "AI-first optimisation: making the evidence retrievable",
    answer: "AI-first SEO means structuring accurate, attributable answers around real customer questions—not mass-producing generic text or adding unsupported AI claims.",
    paragraphs: [
      "Search experiences increasingly summarise information, combine sources and answer questions without requiring users to visit every result. For Alpha Movers, that changes the presentation requirement but not the need for factual authority. A useful specialist page should open with a direct answer, define the service, explain when it is needed, describe price factors, state service areas and show how the process works. Those passages should be written in plain language with descriptive headings so both people and retrieval systems can identify the relevant answer.",
      "Evidence improves citability. Original photos, documented equipment, named service areas, customer reviews, clear policies and dated case evidence distinguish a real operator from generic content. Structured data should describe the business and services consistently, while author and reviewer information should be transparent. The site should avoid creating dozens of near-identical location pages or inventing statistics. AI systems can amplify inconsistencies as easily as they surface strengths, so every address, phone number, service name and claim should match across the website and trusted external profiles.",
      "This case study itself follows an AI-first pattern. It provides an answer-first summary, explicit date range, source methodology, tables, definitions, limitations and question-led sections. That format supports human scanning, conventional indexing and passage retrieval. It does not guarantee inclusion in an AI answer, and no responsible agency should promise that outcome. The defensible objective is to make Alpha Movers the clearest, most verifiable source about its own specialist services and performance."
    ]
  },
  {
    id: "eeat",
    title: "Experience, expertise, authority and trust signals",
    answer: "The strongest trust signals are operational specificity, named responsibility, transparent sources, consistent business information and externally verifiable customer evidence.",
    paragraphs: [
      "Experience should be demonstrated through the work itself. For a moving company, this can include access assessments, handling constraints, equipment choices, protection methods, before-and-after scenarios and photographs from completed jobs where customer privacy permits. Expertise appears in explanations that help a customer make a safer decision. Authority develops when useful pages earn mentions, links, reviews and consistent engagement over time. Trust depends on accurate contact details, visible policies, realistic claims and clarity about who is responsible for the content and service.",
      "Jadeed Solutions’ contribution should also be attributable. This case study is associated with Sameer Ahmad Basra, Founder and CEO of Jadeed Solutions, and links to his author profile and LinkedIn identity. That byline does not make every statement automatically authoritative; its value comes from connecting the analysis to a named person, disclosed methodology and inspectable source files. The article avoids claiming revenue, bookings or ranking guarantees that are not contained in the exports.",
      "For Alpha Movers, future trust work should connect service pages to relevant reviews and project examples without copying the same testimonial everywhere. Business details should remain consistent across the website, Google Business Profile and important directories. Review requests should be neutral and compliant with platform policies. Claims such as “best” or “number one” should be avoided unless independently substantiated. Transparent proof is more persuasive and more durable than superlatives."
    ]
  },
  {
    id: "conversion",
    title: "From search visibility to booked jobs",
    answer: "Search Console proves discovery and visits; proving booked jobs requires conversion tracking that connects calls and forms to landing pages and customer outcomes.",
    paragraphs: [
      "Organic clicks are an intermediate metric. They show that a user moved from Google Search to the website, but not whether that user called, requested a quote, booked a move or generated profitable revenue. The engagement’s performance-aligned model makes this distinction especially important. If compensation depends on generated bookings, attribution rules must be agreed in advance and supported by evidence that both client and agency can inspect.",
      "A suitable measurement system would assign unique identifiers to form submissions, track phone calls with source and landing-page data, preserve campaign parameters and record qualified leads in a CRM. Each enquiry should have a status such as new, contacted, qualified, quoted, booked, completed or lost. Revenue and service type can then be attached to completed jobs. This enables useful questions: Which service pages create the most qualified calls? Does sofa-hoisting traffic generate higher-value jobs? Which borough pages create enquiries outside the operating area? What percentage of branded clicks represents existing customers rather than new acquisition?",
      "Privacy and consent requirements must be respected, especially for call recording and analytics. The goal is not to collect data indiscriminately. It is to connect a minimal set of reliable events to commercial outcomes. Until that system is reconciled, this study keeps the claim boundary at search performance. That restraint strengthens the case rather than weakening it because readers can distinguish measured facts from future hypotheses."
    ]
  },
  {
    id: "what-worked",
    title: "What worked and why it likely worked",
    answer: "The strongest observed pattern is the combination of specialist-service relevance, broader page coverage and improving visibility across commercially meaningful searches.",
    paragraphs: [
      "First, specialist demand created an achievable entry point. Sofa hoisting, furniture-hoist pricing, single-item transport and piano moving express specific needs. Focused pages can match those needs more precisely than a generic removals page. Second, the site developed multiple landing pages across services and locations, increasing the number of relevant query-page combinations available to Google. Third, visibility expanded predominantly in the UK, indicating alignment with the intended market rather than indiscriminate global reach.",
      "Fourth, the growth compounded. The final three months accounted for 486 of 630 clicks and 142,133 of 160,903 impressions. The final 28 days accounted for 272 clicks and 96,301 impressions. This concentration in the latest period is consistent with a site whose topical footprint and ranking eligibility expanded over time. Fifth, mobile visibility translated into clicks efficiently relative to impressions, reinforcing the value of accessible mobile journeys for urgent service searches.",
      "Causality should still be described carefully. The Search Console export does not show publication dates, backlinks, technical deployments, competitors, Google updates or paid activity. It cannot isolate the contribution of every tactic. The defensible statement is that the implemented service-and-location search system was followed by substantial organic expansion, with strongest performance in the specialist themes the strategy emphasised."
    ]
  },
  {
    id: "what-did-not-work",
    title: "What remains weak or unfinished",
    answer: "CTR is low at scale, several competitive local terms remain outside page one, and duplicate URL variants appear to divide signals.",
    paragraphs: [
      "A useful case study should not turn every number into a victory. Sitewide CTR across the six-month daily rows is approximately 0.39%. That is partly explained by the rapid growth of impressions at average positions outside the highest-click results, but it still represents unrealised traffic. Location-led terms such as flat removals London, removals Stratford and movers East London generated hundreds of impressions with limited clicks. Their positions suggest that Google recognises relevance but does not yet consistently rank the site where most users click.",
      "The page export also exposes duplication. Host and path variants can waste crawl attention, split links and make performance analysis harder. Some pages generate many impressions at modest CTR—for example crate-hire variants—indicating that titles, snippets, content fit or ranking position may need improvement. Desktop produces a very large impression pool but a lower CTR than mobile, so desktop snippets and intent matching deserve review.",
      "Finally, the workbook does not prove bookings. A previous narrative estimated bookings from a click percentage, but an estimate should not be presented as a verified outcome without reconciled lead data. The next reporting version should integrate calls, forms, quotes and completed jobs. Honest limitations create a stronger basis for optimisation and make the case study more credible to sophisticated buyers."
    ]
  },
  {
    id: "next-90-days",
    title: "Recommended 90-day roadmap",
    answer: "The next phase should consolidate duplicate URLs, improve snippets for high-impression queries, deepen winning service clusters and connect organic visits to qualified leads.",
    paragraphs: [
      "Days 1–30 should focus on technical consolidation and measurement. Confirm the preferred host, audit canonicals, implement direct permanent redirects, remove duplicate sitemap entries and update internal links. Inspect the top twenty pages in Search Console and verify Google-selected canonicals. Configure or audit call, form and CRM tracking with documented attribution rules. Establish a dashboard that separates UK performance, brand versus non-brand where practical, device, service cluster and qualified enquiries.",
      "Days 31–60 should focus on pages already close to stronger performance. Use query-page data to improve titles, descriptions, introductions and internal links for crate hire, single-item transport, Ilford, Stratford, Croydon and other relevant pages. Merge overlapping pages instead of expanding duplication. Add original operational proof to specialist services: access-assessment guidance, price factors, process steps, FAQs and photographs. Ensure every page has one clear conversion route and that mobile interaction is frictionless.",
      "Days 61–90 should expand authority around proven clusters. Publish supporting resources only where they answer a distinct customer question, such as how furniture hoisting works, when dismantling is required or how crate quantities are estimated. Build relationships and citations from relevant local, property and relocation sources. Review Google Business Profile categories, services, photos and customer questions. At the end of the period, compare fixed 28-day windows and report clicks, impressions, qualified leads, booked jobs and revenue separately."
    ],
    bullets: [
      "Select and enforce one canonical host and path per topic.",
      "Prioritise relevant high-impression queries in positions 4–20.",
      "Improve titles and page openings without keyword stuffing.",
      "Add original operational evidence and named authorship.",
      "Measure qualified enquiries and bookings instead of estimating them."
    ]
  },
  {
    id: "lessons",
    title: "Lessons for other local service businesses",
    answer: "Local-service growth is often faster when the site proves expertise in specific customer jobs, connects them to real locations and measures outcomes honestly.",
    paragraphs: [
      "The first lesson is to map the market by customer problem, not by a single favourite keyword. Specialist needs can create commercially meaningful routes into a competitive category. The second is to give each materially distinct service a clear home while avoiding pages that merely swap one keyword or location name. The third is to build internal relationships between services, locations, proof and contact journeys so the website behaves like a system rather than a collection of isolated landing pages.",
      "The fourth lesson is to separate visibility, traffic, leads and revenue. Each metric answers a different question. Impressions show eligibility and reach. Clicks show visits from search. Leads show response. Bookings show sales conversion. Revenue and margin show commercial value. Reporting them as one funnel prevents agencies and clients from mistaking early growth for final business impact. The fifth lesson is to publish limitations alongside wins. Technical gaps, low CTR and incomplete attribution are not reasons to hide the study; they are the next work programme.",
      "Finally, AI-first optimisation does not require a separate universe of tactics. Clear entities, direct answers, original experience, structured pages, consistent facts and strong source attribution help both traditional and AI-mediated discovery. The objective is not to produce the most words. It is to become the most useful, trustworthy and retrievable source for the questions customers actually ask."
    ]
  },
  {
    id: "conclusion",
    title: "Conclusion",
    answer: "Alpha Movers achieved substantial organic-search expansion in six months, led by specialist services; the next opportunity is to consolidate technical signals and turn the enlarged visibility pool into measured bookings.",
    paragraphs: [
      "Between 24 February and 23 August 2026, Alpha Movers generated 630 organic clicks and 160,903 Google Search impressions. The final 28 days produced 272 clicks and 96,301 impressions, compared with 66 clicks and 4,476 impressions in the opening 28 days. Average position improved by roughly 13.7 places between those equivalent windows. The United Kingdom generated the overwhelming majority of visibility, and specialist sofa-hoisting pages became the largest organic entry point in the exported page data.",
      "The evidence supports a clear narrative: focused service architecture and broader topical coverage were followed by rapidly expanding search discovery. It also supports a clear caution: duplicate URL variants, low CTR across the widened impression pool and incomplete lead attribution prevent the work from being considered finished. The next phase should consolidate authority, improve query-page propositions and connect every qualified enquiry to a commercial outcome.",
      "For Jadeed Solutions, the study demonstrates the value of performance reporting that can be inspected rather than merely asserted. For Alpha Movers, it provides a foundation for the next growth cycle. For other local service businesses, it shows why precise services, credible proof, technical clarity and honest measurement can create a more durable acquisition system than generic marketing activity alone."
    ]
  }
];

export const alphaMoversFaqs = [
  ["How many organic clicks did Alpha Movers receive?", "Google Search Console recorded 630 clicks from 24 February to 23 August 2026. The final three months produced 486 clicks, and the final 28 days produced 272 clicks."],
  ["How many Google Search impressions did Alpha Movers receive?", "The six-month export recorded 160,903 impressions. The final three-month export recorded 142,133 impressions, showing that visibility accelerated sharply in the latter half of the period."],
  ["What was the percentage growth?", "Comparing equivalent 28-day windows, clicks increased from 66 to 272, approximately 312%. Impressions increased from 4,476 to 96,301, approximately 2,051%."],
  ["Which Alpha Movers service performed best in organic search?", "Sofa and furniture-hoisting URL variants were the strongest visible page-level entry points, accounting for at least 224 clicks across three leading variants in the six-month Pages export."],
  ["Did the SEO campaign generate verified bookings?", "The supplied files verify search impressions and clicks, not calls, forms, bookings or revenue. This case study therefore does not present an estimated booking total as a verified result."],
  ["What is the biggest technical SEO opportunity?", "The exports contain www and non-www hosts plus multiple paths for closely related pages. Consolidating these variants into one preferred canonical URL per topic is the clearest technical opportunity."],
  ["What does AI-first SEO mean in this case study?", "It means providing direct answers, explicit sources, consistent entities, structured data, useful headings and original evidence that can be understood by people, search engines and retrieval-based AI systems."],
] as const;
