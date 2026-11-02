import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /production-ready web apps/i },
  { path: "/about", heading: /build the web the right way/i },
  { path: "/blog", heading: /articles and guides/i },
  { path: "/blog/getting-started", heading: /getting started/i },
  { path: "/contact", heading: /let's talk/i },
  { path: "/legal/privacy", heading: /privacy policy/i },
];

for (const { path, heading } of pages) {
  test(`${path} renders with one h1`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("unknown routes return a real 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /page not found/i,
  );
});

/*
 * Slugs not returned by generateStaticParams render on first request. With
 * Partial Prerendering the static shell (and a 200) may already be sent when
 * the page calls notFound(), so Next.js marks that response `noindex`. The
 * not-found result is then cached and later requests get a real 404.
 */
test("unknown blog posts are noindex, then a cached 404", async ({
  page,
  request,
}) => {
  const path = `/blog/missing-${test.info().project.name}-${Date.now()}`;

  await page.goto(path);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /page not found/i,
  );
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]').first(),
  ).toBeAttached();

  await expect.poll(async () => (await request.get(path)).status()).toBe(404);
});

test("navigation works and marks the current page", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: /open menu/i }).click();

  const nav = page.getByRole("navigation", {
    name: isMobile ? "Mobile" : "Main",
  });
  await nav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  // Checked by attribute: the desktop nav is hidden (and so not in the
  // accessibility tree) on small screens.
  await expect(
    page.locator('nav[aria-label="Main"] a[aria-current="page"]'),
  ).toHaveText("Blog");
});

test("the skip link moves focus to the main content", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Keyboard navigation is a desktop concern");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to content/i });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("health check responds", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ status: "ok" });
});
