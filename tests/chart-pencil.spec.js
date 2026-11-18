import { test, expect } from "@playwright/test";
import { seek } from "./helpers/seek.js";

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  test(`archival pencil observations draw, erase and return at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await seek(page, 0.401); // first hypothetical course has been drawn
    const first = page.locator(".graphite-first");
    const revision = page.locator(".graphite-revision");
    expect(Number(await first.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
    await expect(revision).toHaveCSS("opacity", "0");
    await page.screenshot({ path: `test-results/pencil-first-${viewport.width}.png` });

    await seek(page, 0.48); // the first stroke is erased; replacement begins
    expect(Number(await first.evaluate(el => getComputedStyle(el).opacity))).toBeLessThan(0.05);
    expect(Number(await revision.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0);
    await page.screenshot({ path: `test-results/pencil-revision-${viewport.width}.png` });

    await seek(page, 0.585);
    expect(Number(await revision.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0.99);
    await page.screenshot({ path: `test-results/pencil-after-${viewport.width}.png` });

    await seek(page, 0.401);
    expect(Number(await first.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
    await expect(revision).toHaveCSS("opacity", "0");
    await page.screenshot({ path: `test-results/pencil-reversed-${viewport.width}.png` });
    expect(errors).toEqual([]);
  });
}

test("keyboard comparison is reversible without altering the original chart", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await seek(page, 0.5);
  const panel = page.locator(".pencil-comparison");
  await expect(panel).toHaveJSProperty("inert", false);
  await panel.getByRole("button", { name: "First thought" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-pencil-choice="first"]')).toHaveAttribute("aria-pressed", "true");
  expect(Number(await page.locator(".graphite-first").evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
  await panel.getByRole("button", { name: "Revised" }).click();
  await expect(page.locator('[data-pencil-choice="revised"]')).toHaveAttribute("aria-pressed", "true");
  expect(Number(await page.locator(".graphite-erasure").evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThan(0);
  await panel.getByRole("button", { name: "Follow scroll" }).click();
  await expect(page.locator('[data-pencil-choice="scroll"]')).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".chart-engraving")).toHaveAttribute("src", /heather-1797-atlantic/);
});

test("reduced motion retains legible static first and revised hypotheses", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await seek(page, 0.5);
  await page.getByRole("button", { name: "First thought" }).click();
  expect(Number(await page.locator(".graphite-first").evaluate(el => getComputedStyle(el).opacity))).toBe(1);
  await page.getByRole("button", { name: "Revised" }).click();
  expect(Number(await page.locator(".graphite-revision").evaluate(el => getComputedStyle(el).opacity))).toBe(1);
  await expect(page.locator(".pencil-announcement")).toContainText("substituted course");
});
