/* Client-safe chat settings for proposal pages (the knowledge itself stays server-side
   in lib/ai/proposals). A proposal path listed here gets the assistant; any other
   /proposal page keeps the chat hidden, as before. */

export type ProposalChat = {
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  suggested: string[];
  launcher: string;
};

const CHATS: Record<string, ProposalChat> = {
  "/proposal/v-chauffeurs": {
    title: "Proposal assistant",
    subtitle: "Answers from this proposal",
    greeting:
      "Hello! Ask me anything about this proposal: the three pricing models, booking bonuses, the 90-day plan, app publication, costs or ownership. I answer only from this proposal, in English or Urdu, and pass anything else to Sameer.",
    placeholder: "Ask about this proposal…",
    launcher: "Ask about this proposal",
    suggested: [
      "Which pricing model suits a new business?",
      "What counts as an eligible booking?",
      "What would I pay with 15 bookings a month?",
      "When will the website and apps be ready?",
      "Which costs are not included?",
      "Who owns the domain and customer data?",
    ],
  },
};

export function proposalChat(pathname: string | null | undefined): ProposalChat | null {
  if (!pathname) return null;
  return CHATS[pathname.replace(/\/$/, "")] ?? null;
}
