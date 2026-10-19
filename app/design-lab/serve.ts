import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Local-only design lab: the Forest reference and the palette rounds.
 * The static pages live in /design-lab at the project root (outside /public),
 * so they are never shipped as public files and 404 in production builds.
 */
const pages = new Set(["index", "forest", "round-1", "round-2", "round-3", "round-4", "round-5", "header", "ideas", "font-check"]);

export async function serveDesignLabPage(name: string) {
  if (process.env.NODE_ENV === "production" || !pages.has(name)) {
    return new Response("Not found", { status: 404 });
  }

  const html = await readFile(path.join(process.cwd(), "design-lab", `${name}.html`), "utf8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
