/**
 * In-depth sections for /industries/[slug]. Bodies are Markdown (GFM).
 * Commercial and specific to what we deliver; the how-to detail lives in /guides.
 */
export type PlaybookSection = { title: string; body: string };

export const industryPlaybooks: Record<string, PlaybookSection[]> = {
  "seo-for-plumbers": [
    {
      title: "What we build for a plumbing business",
      body: `
Plumbing has two kinds of customer — the emergency caller and the planned-work buyer — and the site we build serves both:

- **An emergency page** with response times, areas covered, call-out pricing guidance and a tap-to-call button that stays reachable on mobile.
- **A page per core service**: boiler installation, boiler repair and servicing, drain unblocking, leak detection, bathroom plumbing and commercial work — each with what is included, price guidance, registrations and reviews for that job.
- **An areas-covered page**, plus individual area pages only where you have real local jobs, photos and reviews to show.
- **Proof pages**: past jobs with photos, and reviews grouped by service.
- **Call, form and WhatsApp tracking** from launch day, so every enquiry has a source.

Alongside the website we optimise your Google Business Profile — categories, services, service areas, hours and photos — and set up a simple review request that goes out after every job.
`,
    },
    {
      title: "The searches we go after",
      body: `
We prioritise searches by how likely they are to become a paid job, not by volume alone.

| Search intent | Example searches | Where it lands |
|---|---|---|
| Emergency | “emergency plumber near me”, “burst pipe plumber”, “no hot water” | Emergency page and Business Profile |
| Named service | “boiler repair”, “blocked drain”, “leak detection” | The matching service page |
| Planned, high value | “combi boiler installation cost”, “bathroom plumber” | Service page with price guidance and finance options |
| Local | “plumber [area]”, “local plumbing company” | Business Profile, areas page, genuine area pages |
| Research | “why is my boiler losing pressure”, “how to find my stopcock” | Helpful guides linking to the right service |
`,
    },
    {
      title: "Your first 90 days with us",
      body: `
| When | What happens |
|---|---|
| Weeks 1–2 | Audit of your Business Profile, website, rankings and competitors. Call, form and WhatsApp tracking installed. Review requests set up. |
| Weeks 3–6 | Emergency and top service pages rebuilt or written. Mobile call button, forms and speed fixed. Business Profile categories, services and areas corrected. |
| Weeks 7–12 | Further service pages, first helpful guides, photo and review programme running. Focused Google Ads or Local Services Ads if you want faster demand. |
| Every month | A plain-English report: visibility, Map actions, calls, forms and — where tracked — booked jobs, plus the plan for the next month. |
`,
    },
    {
      title: "What we need from you",
      body: `
- Access to your Google Business Profile, website and any ad accounts — or we set them up in your business’s name.
- The jobs you want more of, the areas you cover and roughly what each job is worth.
- Registration and licence details that apply to you, and your insurance and guarantees.
- Photos of your team, vans and finished work — phone photos are fine.
- Someone to answer the phone during the hours we drive calls.

For the step-by-step version of everything above, read our full guide: [How plumbers get more jobs online](/guides/how-plumbers-get-more-jobs-online).
`,
    },
  ],

  "seo-for-cleaners": [
    {
      title: "What we build for a cleaning business",
      body: `
Cleaning customers are letting you into their home or workplace, so trust and clarity carry the site:

- **A page per service** — regular domestic cleaning, end of tenancy, deep cleaning, office and commercial, short-let turnover and any specialist services — each with a checklist of what is included and what is not.
- **Pricing guidance** by property size or hours, and a short quote or booking flow for standard domestic cleans.
- **Trust in the first screen**: rating, insurance, how staff are vetted, and your re-clean or satisfaction guarantee.
- **Reviews grouped by service**, and real photos of your team and work.
- **Tracking** for calls, quote requests, bookings and WhatsApp from launch.

We also optimise your Google Business Profile and set up review requests and repeat-booking reminders, because retention is where cleaning businesses make their margin.
`,
    },
    {
      title: "The searches we go after",
      body: `
| Search intent | Example searches | Where it lands |
|---|---|---|
| Regular domestic | “weekly cleaner”, “house cleaning near me” | Regular cleaning page with booking flow |
| One-off, high intent | “end of tenancy cleaning”, “move out cleaning”, “deep clean” | The matching service page with checklist and price guide |
| Commercial | “office cleaning company”, “commercial cleaners” | Commercial page with a quick enquiry form |
| Short-let | “Airbnb cleaning”, “turnover cleaning” | Short-let page with scheduling details |
| Research | “end of tenancy cleaning checklist”, “how often to deep clean” | Helpful guides linking to the service |

Our client Just Shine Cleaning Services, in the competitive Abu Dhabi market, said in a public Trustpilot review that our SEO work helped bring them to the first page despite strong competition.
`,
    },
    {
      title: "Your first 90 days with us",
      body: `
| When | What happens |
|---|---|
| Weeks 1–2 | Audit of your Business Profile, site, rankings and competitors. Tracking for calls, forms and bookings installed. Review requests set up. |
| Weeks 3–6 | Top two service pages rebuilt with checklists, pricing guidance and trust signals. Booking or quote flow simplified. |
| Weeks 7–12 | Further service pages, a useful guide or two, photo programme and repeat-booking reminders. Focused ads if you want faster bookings. |
| Every month | Report on visibility, enquiries, bookings and repeat-booking rate, and the plan for the next month. |
`,
    },
    {
      title: "What we need from you",
      body: `
- Access to your Google Business Profile, website and booking system — or we set them up in your business’s name.
- The services you want more of, your areas, and prices or price ranges.
- How staff are vetted and insured, and your guarantee.
- Real photos of your team and work, with customer permission where needed.
- A quick response to quote requests — same day where possible.

The full how-to is in our guide: [How cleaning companies get more bookings online](/guides/how-cleaning-companies-get-more-bookings).
`,
    },
  ],

  "seo-for-uk-removals": [
    {
      title: "Why removals search is different",
      body: `
A house move is a planned, relatively high-value purchase. Customers compare several companies, read reviews carefully and want a price before they commit. At the same time, demand is split across dozens of specific needs — house moves, office moves, man-and-van jobs, piano moves, furniture hoisting, packing, crate hire and storage — and across every borough or town you cover.

That means a removals website has to do two things well: **cover the specific services and areas people search for**, and **make getting a quote effortless**.
`,
    },
    {
      title: "What worked for Alpha Movers",
      body: `
Alpha Movers, a removals company in London and Croydon, is our flagship case study. The owner, Abdullah Bin Mustafa, found monthly SEO fees hard to justify and chose to pay 10% after bookings instead. We built and run the whole engine: website, mobile app, SEO, social and paid ads.

A few decisions made the difference:

- **Specialist services got their own pages.** We pushed into sofa and furniture hoisting even though it was not an early focus — the site now earns strong impressions for hoisting searches and competes for higher-value specialist jobs.
- **High-intent local searches were prioritised.** “Piano movers Croydon” is one of the queries producing clicks.
- **Area pages were built where Alpha actually works** — East London, Croydon, Stratford — and are building share steadily.
- **Supporting services such as crate hire** gained their own visibility.

Google Search Console recorded **630 organic clicks and 160,903 impressions** between 24 February and 23 August 2026. The final 28 days alone produced 272 clicks and 96,301 impressions. Booking and revenue figures are deliberately left out of the public case study until they are reconciled with lead data. [Read the full case study](/case-studies/alpha-movers).
`,
    },
    {
      title: "The pages a removals site needs",
      body: `
- **Home** — who you are, the areas you cover, your rating and a quote button.
- **House removals**, **office removals** and **man and van** — the core services, each with what is included and price guidance.
- **Specialist services** — piano moving, furniture and sofa hoisting, fragile items, student moves — where you genuinely offer them.
- **Packing, crates and storage** — often searched separately and a useful add-on to the main job.
- **Area pages** for boroughs and towns where you have real jobs, reviews and local knowledge to show — parking, access and typical property types.
- **Pricing guide or quote calculator**, so visitors can see a range before they call.
- **Reviews and past moves**, with photos.
`,
    },
    {
      title: "The searches we go after",
      body: `
| Search intent | Example searches | Where it lands |
|---|---|---|
| Brand | “alpha movers” — your own name | Home page and Business Profile |
| Core service + area | “removals Croydon”, “removals East London”, “man and van Stratford” | Service pages and genuine area pages |
| Specialist | “piano movers”, “sofa hoist”, “furniture hoisting” | Specialist service pages |
| Add-ons | “crate hire London”, “packing service” | Packing and crates pages |
| Research | “how much do removals cost”, “what size van do I need” | Pricing guide and helpful articles |

The example searches above come from Alpha Movers’ own Search Console data.
`,
    },
    {
      title: "Turning searches into booked moves",
      body: `
Ranking is only half of it. Removals customers leave if getting a price is hard. We build quote flows that ask for what a mover actually needs — property size or inventory, moving date, both addresses, stairs, lifts and parking — and give an instant estimate or a fast call back.

Every quote request, call and WhatsApp message is tracked, so we can see which services and areas produce booked moves and put more effort there. Paid ads can fill the diary while organic visibility grows; our [Google Ads ROI guide](/blog/google-ads-roi-fundamentals) explains how we decide what a lead is worth.
`,
    },
    {
      title: "Paying for it",
      body: `
Removals suits a performance model well: job values are fairly consistent and bookings are easy to track — which is why Alpha Movers chose to pay 10% after bookings. You can also choose a fixed SEO plan from £100 a month with a six-month minimum, or a tiered fee per completed move.

Before choosing a percentage deal, read our [Profit-Share Handbook](/profit-share-handbook), or compare the models on the [pricing page](/pricing).
`,
    },
  ],

  "seo-for-local-service-businesses": [
    {
      title: "Emergency trades and project trades need different marketing",
      body: `
Trades fall into two broad groups, and most businesses have a bit of both:

- **Emergency and call-out work** — locksmiths, electricians, heating engineers, drainage, pest control — is decided in minutes. Map rankings, reviews and answering the phone win it.
- **Project work** — roofing, renovations, extensions, landscaping, heating and cooling installs — is decided over weeks. Project photos, reviews, accreditations, clear processes and quotes win it.

We build your online presence around the mix you want: fast, mobile-first routes to a phone call for emergency work, and detailed service pages with galleries and quote forms for projects.
`,
    },
    {
      title: "What we build for trades and contractors",
      body: `
- **A page per service** you want more of, with what is included, price guidance or typical ranges, and reviews for that job.
- **Project galleries** with before-and-after photos and a short description of each job — the strongest proof a tradesperson can show.
- **Accreditations and registrations** displayed clearly — for example NICEIC or NAPIT for UK electricians, Gas Safe for gas work, TrustMark, or your state or provincial licence numbers in the US and Canada.
- **Guarantees, insurance and warranties** stated plainly.
- **Quote forms** that ask for what you need to price the job — photos, measurements, postcode or ZIP code — so you spend less time on site visits that go nowhere.
- **Tracking** for every call, form and WhatsApp message.

And behind the site: Google Business Profile optimisation, a review request after every job, and consistent listings on the directories that matter in your trade and country.
`,
    },
    {
      title: "The searches we go after",
      body: `
| Trade type | Example searches | Where it lands |
|---|---|---|
| Emergency | “emergency electrician”, “locksmith near me”, “boiler breakdown” | Emergency page and Business Profile |
| Project | “roof replacement cost”, “house extension builders”, “garden landscaping” | Service page with gallery, price ranges and quote form |
| Installation | “heat pump installation”, “EV charger installer”, “air conditioning install” | Installation service pages |
| Local | “[trade] in [area]”, “local builders” | Business Profile, areas page, genuine area pages |
| Research | “how long does a roof last”, “do I need planning permission” | Helpful guides linking to the service |
`,
    },
    {
      title: "High-ticket work and tiered pricing",
      body: `
A percentage fee can be a poor fit for high-ticket projects with big material and labour costs — 10% of a roof replacement is very different from 10% of a call-out. For those businesses we usually recommend a **lower percentage or a tiered model**: a fixed fee per completed job, set by job type or value, agreed before work starts.

Fixed-fee plans are always available too — SEO from £100 a month with a six-month minimum, and websites from £199. The [pricing page](/pricing) compares the models, and the [Profit-Share Handbook](/profit-share-handbook) explains what a performance or tiered deal needs from you.
`,
    },
    {
      title: "Your first 90 days with us",
      body: `
| When | What happens |
|---|---|
| Weeks 1–2 | Audit of your Business Profile, site, rankings and competitors. Tracking installed. Review requests set up. |
| Weeks 3–6 | Priority service pages and project gallery built. Accreditations, guarantees and quote forms added. Business Profile corrected. |
| Weeks 7–12 | Further services, helpful guides, review and photo programme. Focused ads for your most profitable jobs if you want faster demand. |
| Every month | Report on visibility, enquiries and booked jobs, with the plan for the next month. |

Most of this mirrors the approach in our [plumbers guide](/guides/how-plumbers-get-more-jobs-online), which is a good read for any trade.
`,
    },
  ],
};
