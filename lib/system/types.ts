/**
 * Jadeed Solutions dashboard and client portal — data model (Firestore). Copied from
 * Jadeed Marketing's system (src/lib/system/types.ts) so both run the same logic; the lead
 * fields follow this site's own free-audit form (service, budget, job value, preferred call).
 *
 * Collections
 *   users/{uid}                 UserProfile
 *   invites/{email}             Invite            (lower-case email as the id)
 *   leads/{id}                  Lead              form leads (+ activity/{id})
 *   chats/{id}                  ChatSession       Jadeed AI chats, messages inline
 *   tickets/{id}                Ticket            questions handed to Sameer from the chat
 *   usage/{yyyy-mm}             AI spend this month (lib/ai/gemini.ts)
 *   bookings/{id}               Booking           + bookingDays/{date} (one call a day)
 *   clients/{id}                Client            + results, updates, messages, proposals
 *   invoices/{id}               Invoice
 *   files/{id}                  StoredFile        metadata; the bytes are in Firebase Storage
 *   tasks/{id}                  Task
 *   knowledge/{id}              KnowledgeEntry    "Teach Jadeed AI"
 *   settings/{billing|google|counters}
 *
 * Times are Firestore Timestamps on the server and ISO strings in the browser. Money is
 * stored in minor units (pence / cents) with a currency code.
 */

export type Role = "admin" | "team" | "client" | "client_staff" | "visitor";

export const STAFF_ROLES: readonly Role[] = ["admin", "team"];
export const CLIENT_ROLES: readonly Role[] = ["client", "client_staff"];

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  team: "Team",
  client: "Client",
  client_staff: "Client staff",
  visitor: "Visitor",
};

export type UserProfile = {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  role: Role;
  /** Set for client and client_staff users. */
  clientId?: string;
  createdAt: string;
  lastLoginAt: string;
};

export type Invite = {
  email: string;
  role: Exclude<Role, "visitor">;
  clientId?: string;
  invitedBy: string;
  createdAt: string;
  acceptedAt?: string;
};

/* ------------------------------ leads ------------------------------ */

export type LeadScore = "A" | "B" | "C";
export type LeadStatus = "new" | "contacted" | "call_booked" | "audit_sent" | "won" | "lost";
export type LeadSource = "form" | "chat";

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  call_booked: "Call booked",
  audit_sent: "Audit sent",
  won: "Won",
  lost: "Lost",
};

export type LeadFlag = "regulated" | "low_value" | "researching";

export const FLAG_LABEL: Record<LeadFlag, string> = {
  regulated: "Regulated profession",
  low_value: "Low job value",
  researching: "Just researching",
};

export type PreferredCall = {
  /** "WhatsApp", "Google Meet" or "Phone", as the visitor picked it. */
  method: string;
  /** e.g. "Tue 7 Oct" */
  day: string;
  /** e.g. "12:00" in the visitor's own time zone */
  time: string;
  timeZone?: string;
};

export type Lead = {
  id: string;
  source: LeadSource;
  status: LeadStatus;
  score: LeadScore;
  /** One plain sentence from Jadeed AI: why this score. */
  scoreReason: string;
  /** Jadeed AI's suggested next step for the team. */
  nextStep?: string;
  aiSummary?: string;
  /** What the visitor was shown after sending the form (never the score). */
  visitorSummary?: string;
  flags: string[];
  contact: { name: string; email?: string; phone?: string };
  business: {
    name?: string;
    /** The service they picked on the form, e.g. "Local SEO". */
    service?: string;
    /** Their trade, worked out by Jadeed AI from the message, e.g. "Removals". */
    trade?: string;
    city?: string;
    country?: string;
    website?: string;
    /** Typical value of one job, in whole units of `currency` (the form's slider). */
    jobValue?: number;
    currency?: string;
    /** The monthly budget range they picked. */
    budget?: string;
  };
  goal: { notes?: string; preferredCall?: PreferredCall };
  /** A and B leads may book a call from their audit page. */
  bookable?: boolean;
  /** Secret for the visitor's private audit page, /audit/<token>. */
  token?: string;
  assignedTo?: string;
  chatId?: string;
  bookingId?: string;
  /** Set once the lead became a client (clients/{id}). */
  clientId?: string;
  createdAt: string;
  updatedAt: string;
};

/** leads/{id}/activity/{id}: the lead page timeline (notes, status changes, calls). */
export type LeadActivity = {
  id: string;
  type: "note" | "status" | "assign" | "booking" | "cancel" | "email_draft";
  text: string;
  /** Email of the team member, or "system". */
  by: string;
  byName?: string;
  at: string;
};

/* ------------------------------ tasks ------------------------------ */

export type TaskStatus = "todo" | "doing" | "done";

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = { todo: "To do", doing: "Doing", done: "Done" };

export type Task = {
  id: string;
  title: string;
  notes?: string;
  status: TaskStatus;
  /** Kept for quick counts ("open tasks"). */
  done: boolean;
  assignee?: string;
  assigneeName?: string;
  /** Pakistan date, YYYY-MM-DD. */
  due?: string;
  leadId?: string;
  leadName?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

/* ------------------------------ bookings ------------------------------ */

export type BookingStatus = "confirmed" | "cancelled" | "done" | "no_show";

export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  confirmed: "Booked",
  cancelled: "Cancelled",
  done: "Done",
  no_show: "No-show",
};

export type Booking = {
  id: string;
  leadId: string;
  /** Pakistan calendar date, the one-call-a-day key. */
  date: string;
  startsAt: string;
  minutes: number;
  method: "meet" | "whatsapp";
  status: BookingStatus;
  cancelReason?: string;
  /** The visitor's time zone when they booked, for emails. */
  timeZone: string;
  contact: { name: string; email?: string; phone?: string };
  businessName?: string;
  meetUrl?: string;
  /** The event on jadeedsolutionz@gmail.com's Google Calendar. */
  eventId?: string;
  /** The Resend id of the reminder scheduled an hour before (cancelled if the call moves). */
  reminderEmailId?: string;
  createdAt: string;
};

/* ------------------------------ Teach Jadeed AI ------------------------------ */

export type KnowledgeEntry = {
  id: string;
  question: string;
  /** Empty while a question Jadeed AI couldn't answer waits for the team. */
  answer: string;
  status: "pending" | "approved";
  /** "chat" when Jadeed AI logged it, otherwise the email of the team member. */
  createdBy: string;
  answeredBy?: string;
  approvedBy?: string;
  /** The answer came from "Draft with AI" and hasn't been edited by a person yet. */
  aiDraft?: boolean;
  /** How many times visitors asked it (chat-logged questions). */
  count?: number;
  chatIds?: string[];
  createdAt: string;
};

/* ------------------------------ Jadeed AI chats ------------------------------ */

/** Fixed tags so chats can be counted and filtered; Jadeed AI picks up to four. */
export const CHAT_TAGS = [
  "pricing",
  "partnership",
  "fit_check",
  "territory",
  "industry",
  "how_it_works",
  "results_proof",
  "contract_terms",
  "website",
  "seo",
  "apps",
  "ads",
  "support",
  "not_a_fit",
  "job_seeker",
  "spam",
  "other",
] as const;
export type ChatTag = (typeof CHAT_TAGS)[number];

export type ChatOutcome = "answered" | "lead" | "booked" | "handoff" | "not_fit" | "left";

export const CHAT_OUTCOME_LABEL: Record<ChatOutcome, string> = {
  answered: "Answered",
  lead: "Became a lead",
  booked: "Booked a call",
  handoff: "Sent to Sameer",
  not_fit: "Not a fit",
  left: "Left mid-way",
};

export type ChatMessageRecord = {
  role: "user" | "assistant";
  text: string;
  /** Plain notes for what was shown with an assistant reply (sources, "talk to Sameer"). */
  cards?: string[];
  /** The page the visitor was on. */
  page?: string;
  status?: "stopped" | "error";
  at: string;
};

/**
 * chats/{id}: one document per conversation, messages inline. Kept 24 months after the last
 * message: `expireAt` drives the Firestore TTL policy.
 */
export type ChatSession = {
  id: string;
  /** Random id kept in a cookie, to group a returning visitor's chats. */
  visitorId: string;
  contact: { name?: string; email?: string; phone?: string };
  messages: ChatMessageRecord[];
  messageCount: number;
  userMessageCount: number;
  firstPage: string;
  pages: string[];
  timeZone?: string;
  leadId?: string;
  leadToken?: string;
  leadScore?: LeadScore;
  ticketId?: string;
  /** Questions logged for "Teach Jadeed AI" during the chat. */
  loggedQuestions?: number;
  aiSummary?: string;
  tags?: ChatTag[];
  outcome?: ChatOutcome;
  /** ISO 639-1 code of the visitor's language. */
  language?: string;
  /** messageCount when the summary was written. */
  summarizedCount?: number;
  followUp?: { emailId: string; status: "scheduled" | "cancelled"; sendAt: string };
  createdAt: string;
  updatedAt: string;
};

/** tickets/{id}: a question handed to Sameer from the chat. Reply within 24 hours. */
export type Ticket = {
  id: string;
  chatId?: string;
  question: string;
  email?: string;
  phone?: string;
  name?: string;
  page?: string;
  status: "open" | "answered";
  createdAt: string;
};

/* ------------------------------ client portal ------------------------------ */
/*
 * clients/{id}                      Client
 *   results/{id}                    ResultEntry   the shared record of customers Jadeed brought
 *   updates/{id}                    WorkUpdate    written by the team (never by AI)
 *   messages/{id}                   ClientMessage one thread per client, replaces WhatsApp
 *   proposals/{id}                  Proposal
 * invoices/{id}                     Invoice       top level, so admins can list them all
 * files/{id}                        StoredFile
 * settings/billing                  BillingSettings (bank details on invoices)
 */

export type ClientStatus = "onboarding" | "active" | "paused" | "ended";

export const CLIENT_STATUS_LABEL: Record<ClientStatus, string> = {
  onboarding: "Onboarding",
  active: "Active",
  paused: "Paused",
  ended: "Ended",
};

export const CURRENCIES = ["GBP", "USD", "AED", "CAD", "PKR", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Client = {
  id: string;
  businessName: string;
  /** The owner we deal with. */
  contactName: string;
  ownerEmail: string;
  phone?: string;
  trade?: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  /** Their area and trade (one partner per trade, per area). */
  territory?: string;
  status: ClientStatus;
  /** Their fee as a percentage of a paid invoice (10 for the standard Growth Partnership). */
  feePercent: number;
  currency: string;
  leadId?: string;
  notes?: string;
  startedAt?: string;
  lastMessageAt?: string;
  lastMessageFrom?: "team" | "client";
  /** Pending "you have a new message" emails (Resend ids), cancelled when the thread is read. */
  pendingEmail?: { client?: { id: string; at: string }; team?: { id: string; at: string } };
  createdAt: string;
  updatedAt: string;
};

export type ResultStatus = "lead" | "contacted" | "booked" | "quoted" | "completed" | "paid" | "lost";

export const RESULT_STATUS_LABEL: Record<ResultStatus, string> = {
  lead: "Lead",
  contacted: "Contacted",
  booked: "Booked",
  quoted: "Quoted",
  completed: "Completed",
  paid: "Paid",
  lost: "Lost",
};

/** One customer Jadeed brought in, as both sides see it. A fee is due only once it's paid. */
export type ResultEntry = {
  id: string;
  clientId: string;
  /** Customer name or the client's own reference. */
  customer: string;
  service?: string;
  /** Where they came from: website form, call, Google Business Profile… */
  channel?: string;
  /** YYYY-MM-DD, the first contact (the 90-day window starts here). */
  firstContact: string;
  status: ResultStatus;
  jobValueCents?: number;
  paidCents?: number;
  /** YYYY-MM-DD */
  paidOn?: string;
  feePercent: number;
  feeCents?: number;
  invoiceId?: string;
  notes?: string;
  createdBy: string;
  createdByRole: "team" | "client";
  createdAt: string;
  updatedAt: string;
};

export type FileRef = { id: string; name: string; type: string; size: number };

export type StoredFile = FileRef & {
  clientId: string;
  purpose: "message" | "update" | "payment" | "proposal";
  path: string;
  uploadedBy: string;
  createdAt: string;
};

/**
 * A work update in three plain parts (owner's pick, Design Lab idea 098 B): what we did,
 * why, and what's next. `body` is "what we did".
 */
export type WorkUpdate = {
  id: string;
  clientId: string;
  title: string;
  body: string;
  why?: string;
  next?: string;
  /** SEO, Website, Ads, Reviews… shown as a small chip. */
  area?: string;
  kind: "update" | "report";
  attachments?: FileRef[];
  createdBy: string;
  createdByName?: string;
  createdAt: string;
};

export type ClientMessage = {
  id: string;
  clientId: string;
  body: string;
  from: "team" | "client";
  by: string;
  byName?: string;
  /** Written by the client's Jadeed AI when it couldn't answer a question. */
  viaAi?: boolean;
  attachments?: FileRef[];
  createdAt: string;
};

export type ProposalStatus = "draft" | "sent" | "approved" | "declined";

export const PROPOSAL_STATUS_LABEL: Record<ProposalStatus, string> = {
  draft: "Draft",
  sent: "Waiting for you",
  approved: "Approved",
  declined: "Declined",
};

export type Proposal = {
  id: string;
  clientId: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
  /** Key terms as short label/value pairs (Design Lab idea 097 A): Upfront, Fee, Term, Territory. */
  keyTerms?: { label: string; value: string }[];
  /** Plain words, e.g. "£0 upfront, 10% of each paid invoice". */
  price?: string;
  terms?: string;
  status: ProposalStatus;
  sentAt?: string;
  decidedAt?: string;
  decidedBy?: { name: string; email: string };
  declineReason?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceStatus = "draft" | "sent" | "paid" | "void";

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Due",
  paid: "Paid",
  void: "Void",
};

export type InvoiceLine = {
  resultId?: string;
  description: string;
  /** The paid customer invoice the fee is worked out on. */
  baseCents?: number;
  feePercent?: number;
  amountCents: number;
};

export type Invoice = {
  id: string;
  clientId: string;
  clientName: string;
  /** e.g. JS-2026-0007 */
  number: string;
  /** YYYY-MM the fees were earned in. */
  period: string;
  lines: InvoiceLine[];
  totalCents: number;
  currency: string;
  status: InvoiceStatus;
  issuedOn?: string;
  dueOn?: string;
  paidOn?: string;
  markedPaidBy?: string;
  proofs?: (FileRef & { uploadedBy: string; at: string })[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type BillingSettings = {
  accountTitle: string;
  bankName: string;
  iban: string;
  accountNumber?: string;
  swift?: string;
  branch?: string;
  notes?: string;
  /** Optional registration line the owner enters himself (shown on invoices only). */
  registration?: string;
  paymentTermsDays: number;
};
