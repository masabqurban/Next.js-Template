import { timingSafeEqual } from "node:crypto";

/**
 * Best-effort client IP. Only trust these headers when the app runs behind a
 * proxy that sets them (Vercel, Cloudflare, nginx…); otherwise they can be
 * spoofed by the client.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/** Constant-time string comparison, so response timing can't leak a secret. */
export function safeCompare(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
