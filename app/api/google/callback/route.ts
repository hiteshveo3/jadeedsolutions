import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectCalendar } from "@/lib/google/calendar";
import { appBase, getSessionUser } from "@/lib/system/session";

export const runtime = "nodejs";

const STATE_COOKIE = "g_oauth_state";

/** Google sends the owner back here after "Allow". Stores the calendar connection. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const base = await appBase();
  const back = (result: string) => {
    const response = NextResponse.redirect(new URL(`${base}/settings?google=${result}`, request.url));
    response.cookies.delete({ name: STATE_COOKIE, path: "/api/google" });
    return response;
  };

  const user = await getSessionUser();
  if (!user || user.role !== "admin") return NextResponse.redirect(new URL(`${base}/login`, request.url));

  const expected = (await cookies()).get(STATE_COOKIE)?.value;
  const state = url.searchParams.get("state");
  if (!expected || !state || state !== expected) return back("expired");
  if (url.searchParams.get("error")) return back("denied");

  const code = url.searchParams.get("code");
  if (!code) return back("error");
  try {
    await connectCalendar(code, new URL("/api/google/callback", request.url).toString(), user.email);
    return back("connected");
  } catch (error) {
    console.error("[google] Connecting the calendar failed", error instanceof Error ? error.message : error);
    return back("error");
  }
}
