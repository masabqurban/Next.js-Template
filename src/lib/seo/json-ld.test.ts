import { describe, expect, it } from "vitest";

import { breadcrumbJsonLd, serializeJsonLd } from "./json-ld";

describe("serializeJsonLd", () => {
  it("escapes < so a value cannot close the script tag", () => {
    const output = serializeJsonLd({
      "@type": "Thing",
      name: "</script><script>alert(1)</script>",
    });
    expect(output).not.toContain("</script>");
    expect(JSON.parse(output)).toMatchObject({
      name: "</script><script>alert(1)</script>",
    });
  });
});

describe("breadcrumbJsonLd", () => {
  it("numbers items from 1 and uses absolute URLs", () => {
    const data = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]);
    expect(data.itemListElement).toEqual([
      expect.objectContaining({
        position: 1,
        name: "Home",
        item: "http://localhost:3000/",
      }),
      expect.objectContaining({
        position: 2,
        name: "Blog",
        item: "http://localhost:3000/blog",
      }),
    ]);
  });
});
