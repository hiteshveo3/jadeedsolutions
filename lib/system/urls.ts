import { siteConfig } from "@/lib/site";

/** The team dashboard and client portal (middleware.ts routes this host to /app). */
export const appUrl = (path = "") => `${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.jadeedsolutions.com"}${path}`;

/** A page on the public site, e.g. a visitor's private audit page. */
export const siteUrl = (path = "") => `${siteConfig.url}${path}`;
