import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const validEmail = process.env.TEST_USER_EMAIL;
const validPassword = process.env.TEST_USER_PASSWORD;

const fillLoginForm = async (page, email, password) => {
  await page.goto("http://localhost:8080/login/index.html");
  await page.waitForSelector("#loginForm");

  if (email) await page.locator('input[name="email"]').fill(email);
  if (password) await page.locator('input[name="password"]').fill(password);

  await page.getByRole("button", { name: "Login" }).click();
};

test.describe("Login flow", () => {
  test("User can log in with valid credentials", async ({ page }) => {
    await page.route("*/holidaze/auth/login", (route) =>
      route.fulfill({
        status: 200,
        json: { name: "Test User", email: validEmail },
      }),
    );

    await fillLoginForm(page, validEmail, validPassword);

    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });

  test("Shows error with invalid credentials", async ({ page }) => {
    await page.route("*/holidaze/auth/login", (route) =>
      route.fulfill({
        status: 401,
        json: { message: "Invalid email or password" },
      }),
    );

    await fillLoginForm(page, validEmail, "wrongpassword");

    await expect(page.locator("#message-container")).toContainText(
      /Invalid email or password/i,
    );
  });
});
