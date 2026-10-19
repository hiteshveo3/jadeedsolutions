import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { authUrl, googleConfigured } from "@/lib/google/calendar";
import { appBase, getSessionUser } from "@/lib/system/session";

export const runtime = "nodejs";

const STATE_COOKIE = "g_oauth_state";

/** Admin only: sends the owner to Google to let Jadeed use his calendar (Settings → Google Calendar). */
export async function GET(request: Request) {
  const base = await appBase();
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return NextResponse.redirect(new URL(`${base}/login?next=/settings`, request.url));
  if (!googleConfigured()) return NextResponse.redirect(new URL(`${base}/settings?google=not_configured`, request.url));

  const state = randomBytes(24).toString("base64url");
  const redirectUri = new URL("/api/google/callback", request.url).toString();
  const response = NextResponse.redirect(authUrl(redirectUri, state));
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: redirectUri.startsWith("https://"),
    sameSite: "lax",
    path: "/api/google",
    maxAge: 600,
  });
  return response;
}
