import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("pages have a title, description, canonical and share image", async ({
    page,
  }) => {
    await page.goto("/blog/getting-started");

    await expect(page).toHaveTitle(/Getting started with the template \| Acme/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/blog\/getting-started$/,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .first()
      .getAttribute("content");
    expect(ogImage).toBeTruthy();
    const image = await page.request.get(ogImage!);
    expect(image.ok()).toBe(true);
    expect(image.headers()["content-type"]).toContain("image/png");
  });

  test("every page links its own canonical URL", async ({ page }) => {
    for (const path of ["/", "/about", "/blog", "/contact"]) {
      await page.goto(path);
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(path);
    }
  });

  test("structured data is valid JSON", async ({ page }) => {
    await page.goto("/blog/getting-started");
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = blocks.flatMap((text) => {
      const data = JSON.parse(text) as
        { "@type": string } | { "@type": string }[];
      return (Array.isArray(data) ? data : [data]).map((node) => node["@type"]);
    });
    expect(types).toEqual(
      expect.arrayContaining([
        "Organization",
        "WebSite",
        "BlogPosting",
        "BreadcrumbList",
      ]),
    );
  });

  test("robots.txt, sitemap.xml and rss.xml are served", async ({
    request,
  }) => {
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    const sitemapXml = await sitemap.text();
    expect(sitemapXml).toContain("/blog/getting-started");
    expect(sitemapXml).toContain("/legal/privacy");

    const rss = await request.get("/rss.xml");
    expect(rss.headers()["content-type"]).toContain("application/rss+xml");
    expect(await rss.text()).toContain("<item>");
  });

  test("security headers are set", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();
    expect(headers["content-security-policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});
