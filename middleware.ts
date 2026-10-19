import { NextResponse, type NextRequest } from "next/server";

/* Dashboard and client portal routing (Jadeed Marketing's src/proxy.ts, as Next 15
   middleware).

   app.jadeedsolutions.com/<path>  →  rendered from /app/<path> (internal rewrite)
   /app/... without a session      →  the sign-in page

   The matcher keeps this off every public-site request: it runs only for the app host and
   for /app paths. The cookie check here is only a fast gate; the real verification happens
   on the server in the dashboard layout (verifySessionCookie). */

const SESSION_COOKIE = "__session";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") ?? "";
  const onAppHost = host.startsWith("app.");
  const base = onAppHost ? "" : "/app";
  const internalPath = onAppHost && !url.pathname.startsWith("/app") ? `/app${url.pathname === "/" ? "" : url.pathname}` : url.pathname;

  const isLogin = internalPath === "/app/login";
  if (!isLogin && internalPath.startsWith("/app") && !request.cookies.has(SESSION_COOKIE)) {
    const login = new URL(`${base}/login`, request.url);
    const next = onAppHost ? url.pathname : url.pathname.replace(/^\/app/, "") || "/";
    if (next !== "/") login.searchParams.set("next", next);
    return NextResponse.redirect(login);
  }

  if (onAppHost && internalPath !== url.pathname) {
    url.pathname = internalPath;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/|api/|favicon|.*\\..*).*)",
      has: [{ type: "host", value: "app\\..*" }],
    },
    "/app/:path*",
    "/app",
  ],
};
