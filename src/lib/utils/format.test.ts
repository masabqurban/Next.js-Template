import { describe, expect, it } from "vitest";

import { formatDate, readingTime } from "./format";

describe("formatDate", () => {
  it("formats calendar dates without time-zone drift", () => {
    expect(formatDate("2026-03-01")).toBe("March 1, 2026");
    expect(formatDate("2026-12-31")).toBe("December 31, 2026");
  });
});

describe("readingTime", () => {
  it("rounds to whole minutes with a minimum of one", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime("word ".repeat(220))).toBe(1);
    expect(readingTime("word ".repeat(660))).toBe(3);
  });
});
