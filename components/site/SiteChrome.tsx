"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * The public site's header, footer, search and chat. Left out of the team dashboard and the
 * client portal (/app), which have their own shell. On app.jadeedsolutions.com the browser's
 * paths have no /app prefix: the dashboard layout hides [data-site-chrome] with CSS for the
 * first paint, and this drops it completely once the page knows its host.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const [appHost, setAppHost] = useState(false);
  useEffect(() => setAppHost(window.location.hostname.startsWith("app.")), []);
  if (appHost || pathname === "/app" || pathname.startsWith("/app/")) return null;
  return (
    <div data-site-chrome style={{ display: "contents" }}>
      {children}
    </div>
  );
}
