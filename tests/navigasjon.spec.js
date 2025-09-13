const { test, expect } = require("@playwright/test");
require("dotenv").config();

const baseUrl = process.env.BASE_URL;

test("User can navigate to venue details", async ({ page }) => {
  await page.goto(baseUrl);

  await page.waitForSelector(".venue-list");

  await page.click(".venue-list .venue-item:first-child");

  await expect(
    page.getByRole("heading", { name: /Venue details/i }),
  ).toBeVisible();
});
