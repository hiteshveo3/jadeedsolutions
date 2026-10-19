import type { Metadata } from "next";

/* The Jadeed Solutions dashboard and client portal (app.jadeedsolutions.com). Private:
   never indexed. The public site's header, footer and chat are left out here by
   components/site/SiteChrome.tsx. */
export const metadata: Metadata = {
  title: { default: "Jadeed", template: "%s · Jadeed" },
  robots: { index: false, follow: false },
};

export default function SystemLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* Belt and braces on the app host, where paths have no /app prefix in the browser. */}
      <style>{"[data-site-chrome]{display:none!important}"}</style>
      {children}
    </>
  );
}
