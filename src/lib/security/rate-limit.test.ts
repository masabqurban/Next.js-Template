import { describe, expect, it } from "vitest";

import { createMemoryRateLimiter } from "./rate-limit";

function clock(start = 0) {
  let time = start;
  return { now: () => time, advance: (ms: number) => (time += ms) };
}

describe("createMemoryRateLimiter", () => {
  it("allows requests up to the limit, then blocks", async () => {
    const { now } = clock();
    const limiter = createMemoryRateLimiter({ limit: 2, windowMs: 1000, now });

    expect((await limiter.limit("ip")).success).toBe(true);
    expect((await limiter.limit("ip")).success).toBe(true);
    const third = await limiter.limit("ip");
    expect(third.success).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it("tracks keys independently", async () => {
    const { now } = clock();
    const limiter = createMemoryRateLimiter({ limit: 1, windowMs: 1000, now });

    expect((await limiter.limit("a")).success).toBe(true);
    expect((await limiter.limit("b")).success).toBe(true);
    expect((await limiter.limit("a")).success).toBe(false);
  });

  it("frees capacity as requests leave the sliding window", async () => {
    const { now, advance } = clock();
    const limiter = createMemoryRateLimiter({ limit: 1, windowMs: 1000, now });

    await limiter.limit("ip");
    advance(999);
    expect((await limiter.limit("ip")).success).toBe(false);
    advance(1);
    expect((await limiter.limit("ip")).success).toBe(true);
  });

  it("reports when the window resets", async () => {
    const { now } = clock(5000);
    const limiter = createMemoryRateLimiter({ limit: 3, windowMs: 1000, now });

    const result = await limiter.limit("ip");
    expect(result.remaining).toBe(2);
    expect(result.reset).toBe(6000);
  });
});
