import { describe, expect, it } from "vitest";

import { posts } from "../data/posts";
import {
  buildToc,
  relatedPosts,
  slugify,
  sortByNewest,
  toSummary,
} from "./posts";

describe("slugify", () => {
  it("creates URL-safe ids", () => {
    expect(slugify("Getting started!")).toBe("getting-started");
    expect(slugify("  Café & Crème  ")).toBe("cafe-creme");
  });
});

describe("buildToc", () => {
  it("lists headings and de-duplicates their ids", () => {
    const toc = buildToc([
      { type: "heading", text: "Setup" },
      { type: "paragraph", text: "Body" },
      { type: "heading", text: "Setup" },
    ]);
    expect(toc).toEqual([
      { id: "setup", text: "Setup" },
      { id: "setup-1", text: "Setup" },
    ]);
  });
});

describe("sortByNewest", () => {
  it("sorts by date descending without mutating the input", () => {
    const input = [
      { publishedAt: "2026-01-01" },
      { publishedAt: "2026-03-01" },
      { publishedAt: "2026-02-01" },
    ];
    const sorted = sortByNewest(input);
    expect(sorted.map((p) => p.publishedAt)).toEqual([
      "2026-03-01",
      "2026-02-01",
      "2026-01-01",
    ]);
    expect(input[0]?.publishedAt).toBe("2026-01-01");
  });
});

describe("relatedPosts", () => {
  it("prefers posts with shared tags and excludes the post itself", () => {
    const make = (slug: string, tags: string[], publishedAt: string) => ({
      slug,
      tags,
      publishedAt,
    });
    const current = make("a", ["x", "y"], "2026-01-01");
    const result = relatedPosts(current, [
      current,
      make("b", ["z"], "2026-05-01"),
      make("c", ["x", "y"], "2026-02-01"),
      make("d", ["y"], "2026-03-01"),
    ]);
    expect(result.map((p) => p.slug)).toEqual(["c", "d"]);
  });
});

describe("sample content", () => {
  it("has unique slugs and valid ISO dates", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const post of posts) {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(toSummary(post).readingTime).toBeGreaterThanOrEqual(1);
    }
  });
});
