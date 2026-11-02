import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const paths = [
  "/",
  "/about",
  "/blog",
  "/blog/getting-started",
  "/contact",
  "/legal/terms",
];

async function seriousViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  return results.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map(({ id, help, nodes }) => ({
      id,
      help,
      targets: nodes.map((n) => n.target),
    }));
}

// The theme follows the OS setting, so colour contrast is checked in both schemes.
for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`${colorScheme} mode`, () => {
    test.use({ colorScheme });

    for (const path of paths) {
      test(`${path} has no serious accessibility violations`, async ({
        page,
      }) => {
        await page.goto(path);
        expect(await seriousViolations(page)).toEqual([]);
      });
    }
  });
}
