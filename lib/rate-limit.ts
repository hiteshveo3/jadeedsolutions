/* A small in-memory rate limiter per server instance (from Jadeed Marketing). Good enough to
   stop one browser hammering an endpoint. */

type Entry = { count: number; resetAt: number };
const store = globalThis as typeof globalThis & { __jadeedLimits?: Map<string, Entry> };
const limits = (store.__jadeedLimits ??= new Map<string, Entry>());

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
}

/** true while `key` has made fewer than `max` calls in the last `windowMs`. */
export function allow(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const entry = limits.get(key);
  if (!entry || entry.resetAt <= now) {
    limits.set(key, { count: 1, resetAt: now + windowMs });
    if (limits.size > 2000) for (const [k, e] of limits) if (e.resetAt <= now) limits.delete(k);
    return true;
  }
  if (entry.count >= max) return false;
  entry.count += 1;
  return true;
}
