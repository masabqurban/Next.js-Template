export type RateLimitResult = {
  success: boolean;
  /** Requests left in the current window. */
  remaining: number;
  /** Epoch milliseconds when the oldest counted request leaves the window. */
  reset: number;
};

export interface RateLimiter {
  limit(key: string): Promise<RateLimitResult>;
}

type MemoryRateLimiterOptions = {
  /** Maximum requests allowed per key inside `windowMs`. */
  limit: number;
  windowMs: number;
  /** Injected for tests. */
  now?: () => number;
  /** Sweep expired keys once the map holds this many entries. */
  maxKeys?: number;
};

/**
 * Sliding-window rate limiter kept in process memory.
 *
 * Good enough for a single long-running server (Docker, VPS). On serverless,
 * every instance has its own memory and cold starts reset it, so it only
 * raises the cost of abuse. For a hard guarantee, implement `RateLimiter`
 * with a shared store such as Redis (e.g. `@upstash/ratelimit`) and swap it in
 * where the limiter is created; callers don't change.
 */
export function createMemoryRateLimiter({
  limit,
  windowMs,
  now = Date.now,
  maxKeys = 10_000,
}: MemoryRateLimiterOptions): RateLimiter {
  const hits = new Map<string, number[]>();

  function sweep(time: number) {
    for (const [key, timestamps] of hits) {
      if (timestamps.every((t) => time - t >= windowMs)) hits.delete(key);
    }
  }

  return {
    async limit(key) {
      const time = now();
      if (hits.size >= maxKeys) sweep(time);

      const recent = (hits.get(key) ?? []).filter((t) => time - t < windowMs);
      const success = recent.length < limit;
      if (success) recent.push(time);
      hits.set(key, recent);

      return {
        success,
        remaining: Math.max(0, limit - recent.length),
        reset: (recent[0] ?? time) + windowMs,
      };
    },
  };
}
