import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const scanMask = JSON.parse(
  readFileSync(new URL("./fixtures/heather-1797-land.json", import.meta.url)),
);
import {seek as at} from "./helpers/seek.js";
const opacity = (page, selector) =>
  page.locator(selector).evaluate((e) => +getComputedStyle(e).opacity);
for (const size of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  test(`v04 order, composition and progressive encounter ${size.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.wheel(0, 25);
    await expect.poll(() => opacity(page, ".bottom-glow")).toBeGreaterThan(0.15);
    await at(page, 0.075);
    await expect(page.locator(".desk-objects")).toHaveJSProperty("inert", true);
    await at(page, 0.14);
    await expect(page.locator(".candle-scene .abyss-life")).toHaveCSS("opacity", "0");
    await expect(page.locator(".inspect-agreement")).toBeInViewport();
    await expect(page.locator(".inspect-ledger")).toBeInViewport();
    await page.screenshot({ path: `test-results/v04-desk-${size.width}.png` });
    await at(page, 0.235);
    await expect(page.locator(".harbor-scene")).toHaveCSS("opacity", "1");
    await page.screenshot({
      path: `test-results/v04-harbor-${size.width}.png`,
    });
    await at(page, 0.47);
    await expect(page.locator(".chart")).toHaveCSS("opacity", "1");
    await expect(page.locator(".anatomy-scene")).toHaveCount(0);
    await page.screenshot({ path: `test-results/v04-azores-${size.width}.png` });
    await page.locator(".hotspot").click();
    await page.getByRole("button", { name: "Return to the voyage" }).click();
    expect(
      +(await page.locator(".stage").getAttribute("data-progress")),
    ).toBeCloseTo(0.47, 2);
    await at(page, 0.601);
    expect(
      await page.locator("#route").evaluate((e) => +e.style.strokeDashoffset),
    ).toBe(0);
    await expect(page.locator(".anatomy-scene")).toHaveCount(0);
    await at(page, 0.66);
    const chartFade = Number(await page.locator(".chart").evaluate(e => getComputedStyle(e).opacity));
    expect(chartFade).toBeGreaterThan(0);
    expect(chartFade).toBeLessThan(1);
    await expect(page.locator(".stage")).toHaveAttribute("data-scene", "threshold");
    await page.screenshot({ path: `test-results/v04-submerging-${size.width}.png` });
    await at(page, 0.76);
    await expect(page.locator(".descent-quote").first()).toHaveCSS("opacity", "1");
    await expect(page.locator(".creatures")).toHaveCSS("opacity", "0");
    const quote = await page.locator(".descent-quote blockquote").first().boundingBox(),
      depth = await page.locator(".depth").boundingBox();
    expect(
      quote.y + quote.height < depth.y || quote.x + quote.width < depth.x,
    ).toBe(true);
    await page.screenshot({ path: `test-results/v04-quote-${size.width}.png` });
    await at(page, 0.93);
    await expect(page.locator(".descent-quote").first()).toHaveCSS("opacity", "0");
    await at(page, 0.97);
    await page.screenshot({
      path: `test-results/v04-partial-${size.width}.png`,
    });
    const before = await page.locator(".encounter-image").boundingBox();
    expect(before.y).toBeGreaterThanOrEqual(0);
    expect(await page.locator(".encounter-image").evaluate(e=>getComputedStyle(e).maskImage)).toContain("radial-gradient");
    await at(page, 1);
      if(size.width<=700) await expect(page.locator(".depth")).toHaveCSS("opacity","0");
    for (const name of [".encounter-image"]) {
      const b = await page.locator(name).boundingBox();
      expect(b.x).toBeGreaterThanOrEqual(0);
      expect(b.x + b.width).toBeLessThan(size.width);
      expect(b.y + b.height).toBeLessThan(size.height);
    }
    await page.screenshot({ path: `test-results/v04-final-${size.width}.png` });
    await at(page, 0.76);
    await expect(page.locator(".descent-quote").first()).toHaveCSS("opacity", "1");
    await expect(page.locator(".creatures")).toHaveCSS("opacity", "0");
    expect(errors).toEqual([]);
  });
}
function inRing([x, y], ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [a, b] = ring[i],
      [c, d] = ring[j];
    if (b > y !== d > y && x < ((c - a) * (y - b)) / (d - b) + a) hit = !hit;
  }
  return hit;
}
test("continuous curved route stays in water on the actual archival scan", async ({
  page,
}) => {
  await page.goto("/");
  const d = await page.locator("#route").getAttribute("d");
  expect((d.match(/M/g) || []).length).toBe(1);
  expect(await page.locator("#route").getAttribute("mask")).toBeNull();
  const points = await page.locator("#route").evaluate((e) =>
    Array.from({ length: 1601 }, (_, i) => {
      const p = e.getPointAtLength((e.getTotalLength() * i) / 1600);
      return [p.x, p.y];
    }),
  );
  for (const p of points)
    expect(
      scanMask.polygons.some((poly) => inRing(p, poly)),
    ).toBe(false);
});
test("field notes match displayed source and reading path includes Chapter 41", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".about-button").first().click();
  await expect(page.locator("#notes")).toContainText("William Heather");
  await expect(page.locator("#notes")).toContainText("Thomas Beale");
  await expect(page.locator("#notes")).not.toContainText("Marcella");
  await page.keyboard.press("Escape");
  await page.locator(".skip").focus();
  await page.keyboard.press("Enter");
  await page.locator(".quote-transcript summary").click();
  await expect(
    page.getByRole("link", { name: "Read Chapter 41" }),
  ).toBeVisible();
});
