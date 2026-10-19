/** "£1,234.50" from pence/cents (whole amounts without the ".00"). Safe in the browser and on the server. */
export function money(cents: number | undefined, currency = "GBP") {
  const value = (cents ?? 0) / 100;
  return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: Number.isInteger(value) ? 0 : 2 }).format(value);
}

/** Pence/cents from what a person typed: "1,250.50", "£900", "900". Undefined when it isn't a number. */
export function toCents(input: string | number | undefined | null): number | undefined {
  if (input === undefined || input === null || input === "") return undefined;
  const value = typeof input === "number" ? input : Number(String(input).replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) && value >= 0 ? Math.round(value * 100) : undefined;
}

/** The currency symbol on its own, e.g. "£". */
export function currencySymbol(currency = "GBP") {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).formatToParts(0).find((part) => part.type === "currency")?.value ?? currency;
}
