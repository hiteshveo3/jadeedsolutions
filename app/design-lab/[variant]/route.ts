import { serveDesignLabPage } from "../serve";

export async function GET(_request: Request, { params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  return serveDesignLabPage(variant);
}
