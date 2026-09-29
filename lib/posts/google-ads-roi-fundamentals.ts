import type { Post } from "@/lib/blog";

export const googleAdsRoiFundamentals: Post = {
  slug: "google-ads-roi-fundamentals",
  title: "Google Ads ROI: The Fundamentals That Actually Matter",
  excerpt:
    "Stop judging ads by clicks. How local service businesses work out a break-even cost per lead, track calls and booked jobs, structure campaigns, cut wasted spend and handle leads so Google Ads makes money.",
  date: "2026-03-21",
  updated: "2026-09-29",
  readingTime: "16 min read",
  category: "Digital Advertising",
  authorSlug: "sameer-ahmad-basra",
  cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1600&q=80",
  content: [
    {
      type: "paragraph",
      text: "Google Ads can put a local service business in front of someone who needs them today. It can also spend a month’s marketing budget on people looking for jobs, DIY tips or a company three counties away. The difference is rarely a clever bidding trick. It is a handful of fundamentals, done consistently.",
    },
    {
      type: "paragraph",
      text: "This guide walks through them in the order they matter: your numbers, your tracking, your campaign structure, your search terms, your landing pages, your bidding — and the part most accounts ignore, what happens after the phone rings. For how we run campaigns ourselves, see [digital advertising](/services/digital-advertising).",
    },
    {
      type: "callout",
      title: "Key takeaways",
      items: [
        "Work out what you can afford to pay for a lead before you spend anything.",
        "Track calls, forms and booked jobs — not clicks — or every optimisation decision is a guess.",
        "Build tightly themed Search campaigns around the services you actually want more of.",
        "Read the search terms report every week; wasted spend hides there.",
        "The fastest way to improve ad ROI is often answering the phone faster.",
      ],
    },

    { type: "heading", text: "1. Know your numbers before you spend" },
    {
      type: "paragraph",
      text: "The most important number in a Google Ads account is one Google never shows you: the most you can pay for a lead and still make money. You can work it out from three figures you already know.",
    },
    {
      type: "list",
      items: [
        "**Average job value** — what a typical booked job is worth.",
        "**Gross margin** — what is left after materials, labour and direct costs, as a percentage.",
        "**Close rate** — out of every ten genuine enquiries, how many become booked jobs.",
      ],
    },
    {
      type: "paragraph",
      text: "Multiply them together and you have your break-even cost per lead. Here is an illustrative example — the figures are made up to show the method, so use your own:",
    },
    {
      type: "table",
      headers: ["Step", "Illustrative figure", "Working"],
      rows: [
        ["Average job value", "£400", "From your last three months of invoices"],
        ["Gross margin", "50%", "After materials, crew and fuel"],
        ["Gross profit per job", "£200", "£400 × 50%"],
        ["Close rate", "40%", "4 in 10 genuine enquiries book"],
        ["Break-even cost per lead", "£80", "£200 × 40%"],
        ["Target cost per lead", "£40", "Half of break-even, leaving room for overheads and profit"],
      ],
    },
    {
      type: "paragraph",
      text: "Anything below the target is working. Anything between the target and break-even is covering its costs but not much else. Anything above break-even is losing money on every job, however good the click-through rate looks. If you get repeat work from the same customers, you can justify a higher figure — but only if you can show the repeat work actually happens.",
    },

    { type: "heading", text: "2. Watch the metrics that measure money" },
    {
      type: "table",
      headers: ["Metric", "What it tells you", "Useful for"],
      rows: [
        ["Click-through rate (CTR)", "How relevant your ad is to the search", "Ad copy and keyword relevance"],
        ["Cost per click (CPC)", "What each visit costs", "Understanding competition, not success"],
        ["Conversion rate", "How well the landing page turns visits into enquiries", "Landing page and offer"],
        ["Cost per lead (CPL)", "What each genuine enquiry costs", "Comparing against your break-even"],
        ["Cost per booked job", "What it costs to win work", "The number that decides budget"],
        ["Return on ad spend (ROAS)", "Revenue from ads divided by ad spend", "Comparing campaigns, once revenue is tracked"],
      ],
    },
    {
      type: "paragraph",
      text: "Clicks, impressions and CTR describe activity. Cost per lead and cost per booked job describe results. A campaign with a lower CTR and a lower cost per booked job is the better campaign.",
    },

    { type: "heading", text: "3. Get tracking right before you scale" },
    {
      type: "paragraph",
      text: "If tracking is wrong, Google’s automated bidding learns from the wrong signals and every decision you make is based on the wrong numbers. For a local service business, a conversion is an action that could become a job:",
    },
    {
      type: "list",
      items: [
        "Calls made directly from the ad’s call button.",
        "Calls from your website, measured with a forwarding number so they can be tied to the ad click.",
        "Form enquiries and quote requests that reach your inbox.",
        "WhatsApp or chat conversations started from the site.",
        "Booked jobs imported from your CRM or booking system as offline conversions, so Google can learn which searches produce paying work rather than just enquiries.",
      ],
    },
    {
      type: "paragraph",
      text: "Mark genuine enquiries as primary conversions — the ones bidding optimises for — and softer actions, such as viewing the contact page, as secondary or not at all. Set a minimum call length so misdials and wrong numbers do not count. Google’s [Ads Help centre](https://support.google.com/google-ads) documents each of these settings.",
    },

    { type: "heading", text: "4. Structure campaigns around services, places and hours" },
    {
      type: "paragraph",
      text: "Start with Search campaigns. They show your ad to people actively searching for what you do, which is where most local service demand lives.",
    },
    {
      type: "list",
      items: [
        "**One theme per ad group.** “End of tenancy cleaning” and “office cleaning” are different buyers with different questions; give each its own keywords, ads and landing page.",
        "**Prioritise profitable services.** Put budget behind the jobs you most want, not the ones that happen to be cheapest to advertise.",
        "**Target where people are, not where they are interested in.** For a local service, target people in or regularly in your area rather than anyone who has shown interest in it — the default setting often includes the latter.",
        "**Draw the map around where you will actually travel,** and exclude areas you do not serve.",
        "**Schedule ads for hours someone can answer.** Calls that go to voicemail at 8 pm are expensive clicks.",
      ],
    },
    {
      type: "paragraph",
      text: "Where Google’s Local Services Ads are available for your trade and country, they are worth testing alongside Search: they are charged per lead rather than per click and show above the standard ads. Automated campaign types that spread spend across many Google surfaces can work later, once conversion tracking is solid — they are hard to steer without it.",
    },

    { type: "heading", text: "5. Control which searches you pay for" },
    {
      type: "paragraph",
      text: "Keywords tell Google what you want to appear for. The search terms report shows what you actually appeared for — and it is where most wasted spend is found.",
    },
    {
      type: "table",
      headers: ["Match type", "Shows for", "When to use"],
      rows: [
        ["Exact", "Searches with the same meaning as the keyword", "Your highest-intent, most profitable searches"],
        ["Phrase", "Searches that include the meaning of the keyword", "Core services where wording varies"],
        ["Broad", "Searches related to the keyword", "Only with reliable conversion tracking and close monitoring"],
      ],
    },
    {
      type: "paragraph",
      text: "Review search terms weekly for a new account and at least monthly once it is stable. Add anything irrelevant as a negative keyword. A starting negative list for most local services includes:",
    },
    {
      type: "list",
      items: [
        "Job-seekers: jobs, careers, salary, vacancies, apprenticeship, training, course.",
        "Do-it-yourself: how to, DIY, tutorial, video, parts, tools.",
        "Wrong service: the adjacent trades and services you do not offer.",
        "Wrong place: towns, regions and countries outside your service area.",
        "Anything that attracts the wrong customer for your business — for some, “free” or “cheapest”.",
      ],
    },

    { type: "heading", text: "6. Match ads and landing pages to the search" },
    {
      type: "paragraph",
      text: "Someone searching “emergency boiler repair Leeds” should see an ad about emergency boiler repair in Leeds, and land on a page about exactly that — not your home page.",
    },
    {
      type: "list",
      items: [
        "Write responsive search ads that repeat the service and area, and give a concrete reason to call: response time, price guidance, guarantees, reviews.",
        "Add call, location, sitelink and callout assets so your ad takes more space and offers more routes to act.",
        "Send each ad group to its own landing page with one service, one main call to action and a tap-to-call button visible without scrolling.",
        "Show proof on the landing page: real photos, review excerpts, accreditations and the areas you cover.",
        "Keep landing pages fast — see [why we build on Next.js](/blog/why-nextjs-for-marketing-sites) — because paid visitors are the least patient visitors you have.",
      ],
    },

    { type: "heading", text: "7. Bidding and budgets" },
    {
      type: "paragraph",
      text: "Automated bidding strategies that optimise for conversions work well — once they are learning from accurate conversions. Before that, they optimise for whatever you are measuring, which may not be leads.",
    },
    {
      type: "numbered",
      items: [
        "**Launch** with conservative bids and a tight keyword list while tracking is verified.",
        "**Switch** to a conversion-focused strategy once the account records a steady flow of genuine enquiries.",
        "**Add a target cost per lead** once you know your real cost per lead, set near your target from section 1.",
        "**Change one thing at a time,** and give each change time to settle before judging it.",
      ],
    },
    {
      type: "paragraph",
      text: "A simple way to size a starting budget: decide how many leads a month you want, multiply by a realistic cost per lead, and divide by about 30 for a daily budget. If that number is more than you can afford, narrow the services or area rather than spreading a small budget thinly across everything.",
    },

    { type: "heading", text: "8. What happens after the lead arrives" },
    {
      type: "paragraph",
      text: "Many Google Ads problems are not Google Ads problems. If fifty enquiries arrive and fifteen are never returned, the campaign is not the part that is broken.",
    },
    {
      type: "list",
      items: [
        "Answer calls during the hours ads run, or divert them to someone who can.",
        "Return missed calls and web enquiries quickly — the first business to respond often wins the job.",
        "Record the outcome of every lead (booked, quoted, lost, not a real lead) in one place.",
        "Feed booked jobs back into Google Ads as offline conversions.",
        "Review a sample of call recordings each month to find objections the ads or landing page could answer.",
      ],
    },
    {
      type: "paragraph",
      text: "This is also why performance-based agreements put response commitments in writing — our [Profit-Share Handbook](/profit-share-handbook) explains the lead-to-sale gap in detail.",
    },

    { type: "heading", text: "9. A weekly and monthly routine" },
    {
      type: "table",
      headers: ["When", "What to check"],
      rows: [
        ["Weekly", "Search terms and new negatives. Spend against budget. Conversions recorded as expected. Any disapproved ads or assets."],
        ["Monthly", "Cost per lead and cost per booked job by campaign. Landing page conversion rates. Ad copy tests. Location and schedule performance. Lead outcomes from the CRM."],
        ["Quarterly", "Break-even figures updated with current job values and margins. Services and areas re-prioritised. Conversion tracking re-tested end to end."],
      ],
    },

    { type: "heading", text: "10. The money leaks we find most often" },
    {
      type: "list",
      items: [
        "Conversion tracking counting page views or button clicks that never became enquiries.",
        "Location targeting set to “interest” rather than “presence”, showing ads to people outside the service area.",
        "Broad match keywords running without negatives, paying for job-seeker and DIY searches.",
        "Every ad sending traffic to the home page.",
        "Ads running overnight and at weekends when nobody answers the phone.",
        "Nobody checking which campaigns produce booked jobs rather than just enquiries.",
        "Agency fees charged as a percentage of spend, which rewards spending more rather than spending well.",
      ],
    },

    { type: "heading", text: "How we manage Google Ads" },
    {
      type: "paragraph",
      text: "The ad account is created in your business’s name and billed to your card; we are added as users. You pay Google or Meta directly, with no markup on spend, and campaign management is part of the plan you choose — performance, tiered or flat fee. See [pricing](/pricing) for how each model works, and pair ads with [SEO](/services/seo) so you are not renting all of your demand.",
    },
    {
      type: "cta",
      title: "Want ads that pay for themselves?",
      text: "Tell us your services, area and average job value — we will show you your break-even cost per lead before you spend anything.",
      label: "Get a free growth plan",
      href: "/contact",
    },
  ],
  faqs: [
    {
      q: "How much should a local service business spend on Google Ads?",
      a: "Start from the number of leads you want and a realistic cost per lead, not from a round monthly figure. If the result is more than you can afford, narrow the services or area rather than spreading the budget thinly.",
    },
    {
      q: "How long before Google Ads is profitable?",
      a: "Paid campaigns usually take six to twelve weeks to reach a reliable cost per enquiry, as tracking is verified, search terms are cleaned up and bidding learns from real conversions.",
    },
    {
      q: "Should I use broad match keywords?",
      a: "Only with accurate conversion tracking, conversion-based bidding and weekly search-term reviews. Without those, exact and phrase match give you far more control.",
    },
    {
      q: "Why am I getting clicks but no calls?",
      a: "Usually one of three things: the searches are not the ones you want (check search terms), the landing page does not match the ad or is slow on mobile, or calls are not being tracked. Check them in that order.",
    },
    {
      q: "Do I still need SEO if I run Google Ads?",
      a: "Ads stop the moment you stop paying. SEO builds visibility that keeps working. Most local businesses do best with ads for immediate demand and SEO for the long term — see the [2026 SEO checklist](/blog/seo-checklist-2026).",
    },
  ],
};
