import { cookies } from "next/headers";
import { z } from "zod";
import { CHAT_COOKIE, CHAT_ID, VISITOR_COOKIE, contactFields, createTicket, loadChat, updateChat } from "@/lib/jadeed-ai/store";
import { sendMail, teamInbox, textEmail } from "@/lib/mail";
import { allow, clientIp } from "@/lib/rate-limit";
import { appUrl } from "@/lib/system/urls";

export const runtime = "nodejs";

/**
 * "Send this to Sameer" from the Jadeed AI chat (the widget's hand-off form). As on Jadeed
 * Marketing (hand_off_to_team), the question becomes a ticket in the dashboard (Teach Jadeed
 * AI → "Waiting for a reply"), the chat records the visitor's details, and the team gets an
 * email. Sameer replies within 24 hours.
 */

const schema = z.object({
  source: z.string().max(40).optional(),
  name: z.string().trim().min(1).max(80),
  contact: z.string().trim().min(3).max(120),
  message: z.string().trim().max(1000).default(""),
  page: z.string().max(200).regex(/^\//).catch("/"),
});

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!allow(`handoff:${clientIp(request) ?? "unknown"}`, 6, 10 * 60 * 1000)) return Response.json({ error: "Please wait a minute and try again." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Please add your name and an email or phone number." }, { status: 400 });
  const { name, contact, message, page } = parsed.data;
  const email = EMAIL.test(contact) ? contact.toLowerCase() : undefined;
  const phone = email ? undefined : contact.replace(/[^\d+ ]/g, "").trim() || undefined;
  if (!email && !phone) return Response.json({ error: "Please add an email address or a phone number." }, { status: 400 });

  const jar = await cookies();
  const cookieChat = jar.get(CHAT_COOKIE)?.value;
  const chat = cookieChat && CHAT_ID.test(cookieChat) ? await loadChat(cookieChat) : null;
  const chatId = chat && chat.visitorId === jar.get(VISITOR_COOKIE)?.value ? chat.id : undefined;

  const ticketId = await createTicket({ chatId, question: message || "Asked to talk to Sameer", email, phone, name, page });
  if (chatId) await updateChat(chatId, { ...contactFields({ name, email, phone }), ...(ticketId ? { ticketId } : {}), outcome: "handoff" });

  const sent = await sendMail(
    teamInbox(),
    textEmail(
      `[Jadeed AI] ${name} wants to talk to Sameer`,
      [
        `${name} asked for a reply from the Jadeed AI chat on ${page}.`,
        "",
        `Email: ${email ?? "not given"}`,
        `Phone / WhatsApp: ${phone ?? "not given"}`,
        "",
        "Their question:",
        message || "(none — they asked for a person)",
        "",
        chatId ? `Read the chat: ${appUrl(`/chats/${chatId}`)}` : "",
        "Reply within 24 hours, then mark it answered in Teach Jadeed AI.",
      ].join("\n")
    ),
    email ? { replyTo: email } : {}
  );

  if (!ticketId && !sent.sent && process.env.NODE_ENV === "production") {
    return Response.json({ error: "That didn't send. Please try again in a moment." }, { status: 503 });
  }
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
