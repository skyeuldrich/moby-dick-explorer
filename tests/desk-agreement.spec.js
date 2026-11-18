import { test, expect } from "@playwright/test";

import {seek as seek} from "./helpers/seek.js";

test("an object opens from the keyboard and Escape restores focus and depth", async ({ page }) => {
  await page.goto("/");
  await seek(page, 0.14);
  const button = page.locator(".inspect-agreement");
  await button.focus();
  const position = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.locator("#desk-inspector");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(/1887/);
  await expect(dialog.locator("blockquote")).toContainText("his share of the net proceeds of the voyage");
  await expect(dialog.locator("img:visible").first()).toBeInViewport();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(el => el.contains(document.activeElement) || document.activeElement === document.body)).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(position);
});

test("phone visitors can tap voyage records with reduced motion and return to the same desk", async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    baseURL, viewport: { width: 360, height: 640 }, isMobile: true, hasTouch: true,
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await seek(page, 0.14);
    await page.locator(".inspect-ledger").tap();
    const dialog = page.locator("#desk-inspector");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText(/735/);
    await expect(dialog).toContainText(/1846/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
    await dialog.locator(".close").tap();
    await expect(dialog).not.toBeVisible();
    await expect(page.locator(".inspect-ledger")).toBeFocused();
    expect(Number(await page.locator(".stage").getAttribute("data-progress"))).toBeCloseTo(0.14, 3);
  } finally {
    await context.close();
  }
});
