import { expect, test } from "@playwright/test";

test.describe("Contact form", () => {
  // The form is rate-limited per IP. A unique address per test keeps runs
  // independent of each other.
  test.beforeEach(async ({ page }) => {
    const octet = () => Math.floor(Math.random() * 254) + 1;
    await page.setExtraHTTPHeaders({
      "x-forwarded-for": `198.51.${octet()}.${octet()}`,
    });
  });

  test("shows field errors and keeps what the visitor typed", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Message").fill("Too short");
    await page.getByRole("button", { name: "Send message" }).click();

    // Filtered by text: Next.js's route announcer is also a role="alert" region.
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: /fix the highlighted fields/i }),
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(
      page.getByText("Please enter a valid email address."),
    ).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveValue("Jane Doe");
  });

  test("submits a valid message", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Name").fill("Jane Doe");
    await page.getByLabel("Email").fill("jane@example.com");
    await page.getByLabel("Topic").selectOption("support");
    await page
      .getByLabel("Message")
      .fill("Hello! This is a test message sent by the end-to-end suite.");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toContainText("Message sent");
  });
});
