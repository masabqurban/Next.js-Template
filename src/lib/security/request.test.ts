import { describe, expect, it } from "vitest";

import { getClientIp, safeCompare } from "./request";

describe("getClientIp", () => {
  it("uses the first address in x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });
    expect(getClientIp(headers)).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then to 'unknown'", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe(
      "198.51.100.2",
    );
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("safeCompare", () => {
  it("matches equal strings only", () => {
    expect(safeCompare("secret-value", "secret-value")).toBe(true);
    expect(safeCompare("secret-value", "secret-valuX")).toBe(false);
    expect(safeCompare("short", "secret-value")).toBe(false);
  });
});
