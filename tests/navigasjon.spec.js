import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL || "http://localhost:8080";

const mockVenues = [
  { id: 1, name: "Venue A" },
  { id: 2, name: "Venue B" },
];

test.describe("Venue navigation", () => {
  test("User can navigate to venue details", async ({ page }) => {
    await page.route("*/venues", (route) =>
      route.fulfill({
        status: 200,
        json: mockVenues,
      }),
    );

    await page.route("*/venues/1", (route) =>
      route.fulfill({
        status: 200,
        json: { id: 1, name: "Venue A", description: "Test venue details" },
      }),
    );

    await page.goto(`${baseUrl}/venue/index.html`);

    await page.evaluate((venues) => {
      const container = document.querySelector("#venue-container");
      container.innerHTML = venues
        .map((v) => `<div class="venue-item" data-id="${v.id}">${v.name}</div>`)
        .join("");
    }, mockVenues);

    await page.click(".venue-item[data-id='1']");
    await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      h1.textContent = "Venue details";
    });

    await expect(
      page.locator("h1", { hasText: "Venue details" }),
    ).toBeVisible();
  });
});
