#!/usr/bin/env node
/**
 * Local emulator seed for the dashboard and client portal (never touches production; the
 * project is "demo-jadeed-solutions", which only exists inside the emulators).
 *
 *   npm run emulators        # in one terminal
 *   npm run seed:emulator    # in another
 *
 * Creates verified test users in the Auth emulator and clearly fake example data in the
 * Firestore emulator: leads, a booked call, chats, a question to teach, and one example
 * client with results, updates, messages, a proposal and invoices. Re-running it resets the
 * examples (fixed ids). The test password is EMULATOR_TEST_PASSWORD in .env.local (a random
 * one is generated and saved there if missing).
 */
import crypto from "node:crypto";
import fs from "node:fs";

const ENV = ".env.local";
let env = fs.existsSync(ENV) ? fs.readFileSync(ENV, "utf8") : "";
const read = (key) => env.match(new RegExp(`^${key}="?([^"\\n]+)"?$`, "m"))?.[1];
let password = read("EMULATOR_TEST_PASSWORD");
if (!password) {
  password = crypto.randomBytes(9).toString("base64url");
  env = env.replace(/\n?$/, "\n") + `EMULATOR_TEST_PASSWORD="${password}"\n`;
  fs.writeFileSync(ENV, env);
}

const PROJECT = "demo-jadeed-solutions";
process.env.FIREBASE_AUTH_EMULATOR_HOST ??= read("FIREBASE_AUTH_EMULATOR_HOST") ?? "127.0.0.1:9098";
process.env.FIRESTORE_EMULATOR_HOST ??= read("FIRESTORE_EMULATOR_HOST") ?? "127.0.0.1:8086";
if (!/127\.0\.0\.1|localhost/.test(process.env.FIRESTORE_EMULATOR_HOST)) throw new Error("Refusing to seed: FIRESTORE_EMULATOR_HOST is not local.");

const { initializeApp } = await import("firebase-admin/app");
const { getAuth } = await import("firebase-admin/auth");
const { getFirestore, Timestamp } = await import("firebase-admin/firestore");
initializeApp({ projectId: PROJECT });
const auth = getAuth();
const db = getFirestore();

/* ------------------------------ users ------------------------------ */

const users = [
  { email: "jadeedsolutionz@gmail.com", name: "Sameer Ahmad Basra (test)" },
  { email: "team.test@jadeed.local", name: "Team Tester", invite: { role: "team" } },
  { email: "owner.test@jadeed.local", name: "Ahmed Khan (test)", invite: { role: "client", clientId: "exampleKhanPlumbing" } },
  { email: "staff.test@jadeed.local", name: "Office Staff (test)", invite: { role: "client_staff", clientId: "exampleKhanPlumbing" } },
];
for (const u of users) {
  const existing = await auth.getUserByEmail(u.email).catch(() => null);
  if (existing) await auth.updateUser(existing.uid, { password, displayName: u.name, emailVerified: true });
  else await auth.createUser({ email: u.email, password, displayName: u.name, emailVerified: true });
  if (u.invite) await db.collection("invites").doc(u.email).set({ email: u.email, ...u.invite, invitedBy: "seed", createdAt: Timestamp.now() });
  console.log(`✓ ${u.email}${u.invite ? ` (${u.invite.role})` : " (admin)"}`);
}

/* ------------------------------ helpers ------------------------------ */

const HOUR = 3600_000;
const now = Date.now();
const ago = (hours) => Timestamp.fromMillis(now - hours * HOUR);
const pk = (ms) => new Date(ms + 5 * HOUR);
const pkDate = (ms) => pk(ms).toISOString().slice(0, 10);
const daysAgo = (days) => pkDate(now - days * 24 * HOUR);
const token = () => crypto.randomBytes(24).toString("base64url");

/* ------------------------------ leads ------------------------------ */

const leads = [
  {
    id: "exampleLeadKhan",
    name: "Khan Plumbing (example)",
    contact: { name: "Ahmed Khan", email: "owner.test@jadeed.local", phone: "+44 7700 900123" },
    service: "Growth Partnership (10%)",
    budget: "£1k–£5k / month",
    jobValue: 450,
    trade: "Plumbing",
    city: "Croydon",
    country: "United Kingdom",
    score: "A",
    status: "won",
    hours: 400,
    reason: "A typical job is worth about £450, named their business and explained what they need.",
    next: "Prepare the visibility audit before the call and confirm the territory is open.",
    summary: "Ahmed runs a three-van plumbing business in Croydon and wants more boiler and leak jobs from Google Maps.",
    clientId: "exampleKhanPlumbing",
    message: "We're a family plumbing firm in Croydon, three vans. Most work comes from referrals and we barely show on Google Maps. Want more boiler repairs.",
  },
  {
    id: "exampleLeadSwift",
    name: "Swift Removals (example)",
    contact: { name: "Laura Bennett", email: "laura@example.com", phone: "+44 7700 900456" },
    service: "Local SEO",
    budget: "£1k–£5k / month",
    jobValue: 1200,
    trade: "Removals",
    city: "Leeds",
    country: "United Kingdom",
    score: "A",
    status: "call_booked",
    hours: 6,
    reason: "A typical job is worth about £1,200, wants local SEO and explained the problem clearly.",
    next: "Prepare the audit for Leeds removals before Thursday's call.",
    summary: "Laura's removals company in Leeds gets enquiries but loses them to bigger firms on Google. She wants more house-move jobs.",
    message: "Removals company in Leeds, 2 lorries. We get some calls but the big national firms beat us on Google every time. Looking for more full house moves.",
  },
  {
    id: "exampleLeadBright",
    name: "Bright Clean Co (example)",
    contact: { name: "Omar Haddad", email: "omar@example.com" },
    service: "Web Development",
    budget: "One-time project",
    jobValue: 350,
    trade: "Cleaning",
    city: "Dubai",
    country: "United Arab Emirates",
    score: "B",
    status: "contacted",
    hours: 30,
    reason: "Wants a new website as a one-time project; a typical job is worth about £350.",
    next: "Send the website proposal and the two example sites.",
    summary: "Omar's cleaning company in Dubai needs a new booking website to replace an old one.",
    message: "Need a new website with online booking for my cleaning company in Dubai.",
  },
  {
    id: "exampleLeadCool",
    name: "Cool Air HVAC (example)",
    contact: { name: "Mike Rivera", email: "mike@example.com", phone: "+1 555 0142" },
    service: "Digital Advertising",
    budget: "£5k–£10k / month",
    jobValue: 800,
    trade: "HVAC",
    city: "Houston",
    country: "United States",
    score: "A",
    status: "new",
    hours: 2,
    reason: "A budget of £5k–£10k a month and a typical job worth about £800.",
    next: "Reply today; US leads usually suit Jadeed Marketing's partnership too.",
    summary: "Mike runs an HVAC company in Houston spending heavily on Google Ads with poor lead quality.",
    message: "We spend a lot on Google Ads in Houston but the leads are poor. Want someone to fix the campaigns and the landing pages.",
  },
  {
    id: "exampleLeadPatel",
    name: "Patel Dental (example)",
    contact: { name: "Dr R. Patel", email: "patel@example.com" },
    service: "Local SEO",
    budget: "Not sure yet",
    jobValue: 120,
    trade: "Dentistry",
    city: "Birmingham",
    country: "United Kingdom",
    score: "C",
    status: "new",
    hours: 50,
    reason: "Dental clinic (a regulated profession) with a low stated job value; just exploring.",
    next: "Check the advertising rules for dentists before any proposal; send the audit by email.",
    summary: "A dental clinic in Birmingham asking how local SEO works.",
    flags: ["regulated"],
    message: "How does local SEO work for a dental clinic?",
  },
];

for (const l of leads) {
  const ts = ago(l.hours);
  await db.collection("leads").doc(l.id).set({
    source: "form",
    status: l.status,
    score: l.score,
    scoreReason: l.reason,
    nextStep: l.next,
    aiSummary: l.summary,
    visitorSummary: `Thanks, ${l.contact.name.split(" ")[0]}. Here's what I heard: ${l.summary}`,
    flags: l.flags ?? [],
    contact: l.contact,
    business: { name: l.name, service: l.service, trade: l.trade, city: l.city, country: l.country, jobValue: l.jobValue, currency: "GBP", budget: l.budget },
    goal: { notes: l.message, preferredCall: { method: "Google Meet", day: "Thu 9 Oct", time: "12:00", timeZone: "Europe/London" } },
    bookable: l.score !== "C",
    token: token(),
    ...(l.clientId ? { clientId: l.clientId } : {}),
    context: { pageUrl: "/contact", scoredBy: "seed", points: "" },
    example: true,
    createdAt: ts,
    updatedAt: ts,
  });
}
console.log(`✓ ${leads.length} example leads`);

/* A booked call for Swift Removals, two days ahead at 2 PM UK time (6 PM PKT in BST). */
const callMs = Date.parse(`${pkDate(now + 2 * 24 * HOUR)}T13:00:00Z`);
const callDate = pkDate(callMs);
await db.collection("bookings").doc("exampleBookingSwift").set({
  leadId: "exampleLeadSwift",
  date: callDate,
  startsAt: Timestamp.fromMillis(callMs),
  minutes: 30,
  method: "meet",
  status: "confirmed",
  timeZone: "Europe/London",
  contact: leads[1].contact,
  businessName: leads[1].name,
  createdAt: ago(5),
});
await db.collection("bookingDays").doc(callDate).set({ date: callDate, bookingId: "exampleBookingSwift", createdAt: ago(5) });
await db.collection("leads").doc("exampleLeadSwift").update({ bookingId: "exampleBookingSwift" });
await db.collection("leads").doc("exampleLeadSwift").collection("activity").doc("a1").set({ type: "booking", text: "Booked a 30-minute call by Google Meet.", by: "system", at: ago(5) });
await db.collection("leads").doc("exampleLeadBright").collection("activity").doc("a1").set({ type: "note", text: "Called Omar. He wants booking and WhatsApp on the site. Sending two examples.", by: "team.test@jadeed.local", byName: "Team Tester", at: ago(20) });
console.log("✓ a booked call");

/* ------------------------------ tasks ------------------------------ */

await db.collection("tasks").doc("exampleTask1").set({ title: "Prepare the Leeds removals audit for Laura's call", status: "doing", done: false, assignee: "jadeedsolutionz@gmail.com", assigneeName: "Sameer Ahmad Basra (test)", due: daysAgo(-1), leadId: "exampleLeadSwift", leadName: "Swift Removals (example)", createdBy: "seed", createdAt: ago(5), updatedAt: ago(5) });
await db.collection("tasks").doc("exampleTask2").set({ title: "Send Omar the two example booking sites", status: "todo", done: false, assignee: "team.test@jadeed.local", assigneeName: "Team Tester", due: daysAgo(0), leadId: "exampleLeadBright", leadName: "Bright Clean Co (example)", createdBy: "seed", createdAt: ago(20), updatedAt: ago(20) });
console.log("✓ 2 tasks");

/* ------------------------------ chats, tickets, teach ------------------------------ */

const at = (hours) => new Date(now - hours * HOUR).toISOString();
await db.collection("chats").doc("exampleChat0000000001").set({
  visitorId: "example-visitor-000001",
  contact: {},
  messages: [
    { role: "user", text: "How does the 10% partnership work?", page: "/pricing", at: at(26) },
    { role: "assistant", text: "You pay £0 upfront. Jadeed earns 10% of the full customer invoice, only after a customer we brought in has completed and paid for the job. See [how the fee works](/pricing).", cards: ["Pages shown: Pricing (/pricing)"], at: at(26) },
    { role: "user", text: "Can I leave after six months?", page: "/pricing", at: at(26) },
    { role: "assistant", text: "Yes. The first term is six months, then it runs month to month with 30 days' written notice.", at: at(26) },
  ],
  messageCount: 4,
  userMessageCount: 2,
  firstPage: "/pricing",
  pages: ["/pricing"],
  aiSummary: "A visitor on the pricing page asked how the 10% Growth Partnership fee works and whether they can leave after six months. Both were answered.",
  tags: ["pricing", "partnership", "contract_terms"],
  outcome: "answered",
  language: "en",
  summarizedCount: 4,
  example: true,
  createdAt: ago(26),
  updatedAt: ago(26),
  expireAt: Timestamp.fromMillis(now + 730 * 24 * HOUR),
});
await db.collection("chats").doc("exampleChat0000000002").set({
  visitorId: "example-visitor-000002",
  contact: { name: "Jamie (example)", email: "jamie@example.com" },
  messages: [
    { role: "user", text: "Do you work with letting agents in Manchester?", page: "/industries", at: at(3) },
    { role: "assistant", text: "I'm not sure we take letting agents — that's one for Sameer. Want me to pass it on?", cards: ["Offered to pass the question to Sameer"], at: at(3) },
  ],
  messageCount: 2,
  userMessageCount: 1,
  firstPage: "/industries",
  pages: ["/industries"],
  ticketId: "exampleTicket1",
  aiSummary: "Jamie asked whether Jadeed works with letting agents in Manchester. Jadeed AI didn't know and passed the question to Sameer.",
  tags: ["industry", "fit_check"],
  outcome: "handoff",
  language: "en",
  summarizedCount: 2,
  example: true,
  createdAt: ago(3),
  updatedAt: ago(3),
  expireAt: Timestamp.fromMillis(now + 730 * 24 * HOUR),
});
await db.collection("tickets").doc("exampleTicket1").set({ chatId: "exampleChat0000000002", question: "Do you work with letting agents in Manchester?", email: "jamie@example.com", name: "Jamie (example)", page: "/industries", status: "open", createdAt: ago(3) });
await db.collection("knowledge").doc("q_example_letting").set({ question: "Do you work with letting agents?", answer: "", status: "pending", createdBy: "chat", count: 2, chatIds: ["exampleChat0000000002"], createdAt: ago(30), lastAskedAt: ago(3) });
await db.collection("knowledge").doc("q_example_weekends").set({ question: "Do you answer messages at weekends?", answer: "Yes. The team works seven days a week from Pakistan, and Sameer replies to messages within 24 hours, weekends included.", status: "approved", createdBy: "jadeedsolutionz@gmail.com", answeredBy: "jadeedsolutionz@gmail.com", approvedBy: "jadeedsolutionz@gmail.com", count: 0, createdAt: ago(100) });
console.log("✓ 2 chats, a ticket, 2 teach entries");

/* ------------------------------ an example client ------------------------------ */

const cid = "exampleKhanPlumbing";
const client = db.collection("clients").doc(cid);
await client.set({
  businessName: "Khan Plumbing (example)",
  contactName: "Ahmed Khan",
  ownerEmail: "owner.test@jadeed.local",
  phone: "+44 7700 900123",
  trade: "Plumbing",
  city: "Croydon",
  country: "United Kingdom",
  territory: "Plumbing · Croydon",
  status: "active",
  feePercent: 10,
  currency: "GBP",
  leadId: "exampleLeadKhan",
  startedAt: daysAgo(120),
  lastMessageAt: ago(4),
  lastMessageFrom: "client",
  example: true,
  createdAt: ago(2900),
  updatedAt: ago(4),
});

const results = [
  ["exampleResult01", "Mrs. Khan", "Boiler repair", "Google Business Profile", 70, "paid", 120000, 68, "exampleInvoice01"],
  ["exampleResult02", "J. Turner", "Leak fix", "Website form", 40, "paid", 38000, 37, "exampleInvoice02"],
  ["exampleResult03", "L. Moore", "Tap repair", "Google Business Profile", 9, "paid", 24000, 6, null],
  ["exampleResult04", "R. Patel", "New radiator", "Text or WhatsApp", 6, "booked", null, null, null],
  ["exampleResult05", "S. Ali", "Bathroom quote", "Website form", 4, "quoted", null, null, null],
  ["exampleResult06", "D. Evans", "Blocked drain", "Phone call", 2, "lead", null, null, null],
  ["exampleResult07", "P. Green", "Boiler service", "Jadeed AI chat", 1, "contacted", null, null, null],
];
for (const [id, customer, service, channel, firstDays, status, paid, paidDays, invoiceId] of results) {
  await client.collection("results").doc(id).set({
    clientId: cid,
    customer,
    service,
    channel,
    firstContact: daysAgo(firstDays),
    status,
    ...(paid ? { paidCents: paid, paidOn: daysAgo(paidDays), feePercent: 10, feeCents: Math.round(paid / 10), jobValueCents: paid } : { feePercent: 10, jobValueCents: 30000 }),
    ...(invoiceId ? { invoiceId } : {}),
    createdBy: "seed",
    createdByRole: "team",
    createdAt: ago(firstDays * 24),
    updatedAt: ago(firstDays * 24),
  });
}

const updates = [
  ["exampleUpdate01", 3, "SEO", "Two new area pages are live", "Built pages for Thornton Heath and Purley, with photos from your recent jobs.", "People search by area, and you had no page for either.", "Ask your last ten customers for a Google review — we've set up the text message."],
  ["exampleUpdate02", 10, "Website", "A faster homepage", "Compressed the images and removed an old slider. The page now loads in under 2 seconds on phones.", "Slow pages lose callers before they see your number.", "Add a 'Book a boiler service' button to the top of every page."],
  ["exampleUpdate03", 17, "Google Business Profile", "Your Google profile is complete", "Added services, opening hours, 24 photos and answers to common questions.", "A complete profile shows up more often in the Map Pack.", "Post one job photo a week; we'll remind you."],
];
for (const [id, days, area, title, body, why, next] of updates) {
  await client.collection("updates").doc(id).set({ clientId: cid, title, body, why, next, area, kind: "update", attachments: [], createdBy: "jadeedsolutionz@gmail.com", createdByName: "Sameer", createdAt: ago(days * 24) });
}

const messages = [
  ["exampleMessage01", 30, "team", "The Thornton Heath page is live. Could you send 3 photos from recent jobs there?", "Sameer"],
  ["exampleMessage02", 26, "client", "Sure, sending them tonight.", "Ahmed Khan"],
  ["exampleMessage03", 4, "client", "Got two new calls from the Purley page this week. Should I add them to the record?", "Ahmed Khan"],
];
for (const [id, hours, from, body, byName] of messages) {
  await client.collection("messages").doc(id).set({ clientId: cid, body, from, by: from === "team" ? "jadeedsolutionz@gmail.com" : "owner.test@jadeed.local", byName, attachments: [], createdAt: ago(hours) });
}

await client.collection("proposals").doc("exampleProposal01").set({
  clientId: cid,
  title: "Growth partnership for Croydon — next 6 months",
  summary: "Keep growing boiler and leak jobs from Google Maps, add two more area pages a month, and start review requests by text.",
  keyTerms: [
    { label: "Upfront", value: "£0" },
    { label: "Fee", value: "10% of each paid invoice" },
    { label: "Term", value: "6 months, then monthly" },
    { label: "Territory", value: "Plumbing · Croydon" },
  ],
  sections: [
    { heading: "Where you are today", body: "You show in the Map Pack for 'plumber Croydon' but not for the nearby areas where most of your boiler work is." },
    { heading: "What we'll do", body: "- Two new area pages a month\n- Review requests by text after every job\n- A monthly report in your portal" },
  ],
  price: "£0 upfront. 10% of each customer invoice, only after your customer pays.",
  terms: "Six-month first term, then month to month with 30 days' written notice. One partner per trade, per area.",
  status: "sent",
  sentAt: ago(30),
  createdBy: "jadeedsolutionz@gmail.com",
  createdAt: ago(40),
  updatedAt: ago(30),
});

const invoice = (id, number, status, lines, extra) => ({
  clientId: cid,
  clientName: "Khan Plumbing (example)",
  number,
  period: lines.period,
  lines: lines.items,
  totalCents: lines.items.reduce((s, l) => s + l.amountCents, 0),
  currency: "GBP",
  status,
  createdAt: ago(extra.createdHours),
  updatedAt: ago(extra.createdHours),
  ...extra.fields,
});
await db.collection("invoices").doc("exampleInvoice01").set(
  invoice("exampleInvoice01", "JS-2026-0001", "paid", { period: daysAgo(68).slice(0, 7), items: [{ resultId: "exampleResult01", description: `Mrs. Khan · Boiler repair · paid ${daysAgo(68)}`, baseCents: 120000, feePercent: 10, amountCents: 12000 }] }, { createdHours: 60 * 24, fields: { issuedOn: daysAgo(60), dueOn: daysAgo(46), paidOn: daysAgo(50), markedPaidBy: "jadeedsolutionz@gmail.com" } })
);
await db.collection("invoices").doc("exampleInvoice02").set(
  invoice("exampleInvoice02", "JS-2026-0002", "sent", { period: daysAgo(37).slice(0, 7), items: [{ resultId: "exampleResult02", description: `J. Turner · Leak fix · paid ${daysAgo(37)}`, baseCents: 38000, feePercent: 10, amountCents: 3800 }] }, { createdHours: 5 * 24, fields: { issuedOn: daysAgo(5), dueOn: daysAgo(-9) } })
);
await db.collection("settings").doc("counters").set({ [`invoice${daysAgo(0).slice(0, 4)}`]: 2 }, { merge: true });
await db.collection("settings").doc("billing").set({
  accountTitle: "TEST ACCOUNT — replace in Settings",
  bankName: "Example Bank (test)",
  iban: "PK00TEST0000000000000000",
  paymentTermsDays: 14,
  notes: "Example details for local testing only.",
});
console.log("✓ example client: 7 results, 3 updates, 3 messages, a proposal, 2 invoices");
console.log(`\nSign in at /app with any test user. Password: EMULATOR_TEST_PASSWORD in ${ENV}`);
process.exit(0);
