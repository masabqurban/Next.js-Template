import { describe, expect, it } from "vitest";

import { absoluteUrl, createMetadata } from "./metadata";

describe("createMetadata", () => {
  it("sets the canonical URL and keeps the default share image", () => {
    const metadata = createMetadata({ title: "About", path: "/about" });

    expect(metadata.title).toBe("About");
    expect(metadata.alternates?.canonical).toBe("/about");
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      }),
    ]);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("adds article fields only for articles", () => {
    const article = createMetadata({
      path: "/blog/post",
      type: "article",
      publishedTime: "2026-01-01",
      tags: ["a"],
    });
    const page = createMetadata({
      path: "/about",
      publishedTime: "2026-01-01",
    });

    expect(article.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-01-01",
      tags: ["a"],
    });
    expect(page.openGraph).not.toHaveProperty("publishedTime");
  });

  it("marks pages as noindex on request", () => {
    expect(createMetadata({ path: "/x", noIndex: true }).robots).toEqual({
      index: false,
      follow: true,
    });
    expect(createMetadata({ path: "/x" }).robots).toBeUndefined();
  });
});

describe("absoluteUrl", () => {
  it("joins paths onto the site URL", () => {
    expect(absoluteUrl("/blog")).toBe("http://localhost:3000/blog");
    expect(absoluteUrl()).toBe("http://localhost:3000/");
  });
});
