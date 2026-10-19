import { serveDesignLabPage } from "./serve";

export async function GET() {
  return serveDesignLabPage("index");
}
