import { cookies } from "next/headers";
import { after } from "next/server";
import { CHAT_COOKIE, CHAT_ID, VISITOR_COOKIE, loadChat } from "@/lib/jadeed-ai/store";
import { summarizeChat } from "@/lib/jadeed-ai/summary";
import { allow, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * The chat widget's beacon when the panel is closed or the page is left (from Jadeed
 * Marketing's /api/chat/end). Writes the AI summary and tags for the dashboard. Only new
 * messages since the last summary cost a model call. The chat is found from the visitor's own
 * cookies, so a beacon can't touch someone else's chat.
 */
export async function POST(request: Request) {
  if (!allow(`chat-end:${clientIp(request) ?? "unknown"}`, 20, 10 * 60 * 1000)) return new Response(null, { status: 429 });
  const jar = await cookies();
  const chatId = jar.get(CHAT_COOKIE)?.value;
  const visitorId = jar.get(VISITOR_COOKIE)?.value;
  if (!chatId || !CHAT_ID.test(chatId) || !visitorId) return new Response(null, { status: 204 });

  after(async () => {
    const chat = await loadChat(chatId);
    if (!chat || chat.visitorId !== visitorId) return;
    await summarizeChat(chat);
  });
  return new Response(null, { status: 204 });
}
