import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import {seek as seek} from "./helpers/seek.js";

test("voyage embeds the documented archival raster and links its institutional record", async ({
  page,
}) => {
  await page.goto("/");
  const image = page.locator(".chart-engraving");
  const url = await image.getAttribute("src");
  expect(url).toContain("/assets/archive/heather-1797-atlantic.webp");
  const response = await page.request.get(url);
  expect(response.ok()).toBe(true);
  const manifest = JSON.parse(
    readFileSync("public/assets/archive/manifest.json"),
  );
  const entry = manifest.assets.find((a) => a.file === url.split("/").at(-1));
  expect(
    createHash("sha256")
      .update(await response.body())
      .digest("hex"),
  ).toBe(entry.sha256);
  expect(entry.canonicalUrl).toBe(
    "https://collections.leventhalmap.org/search/commonwealth:kk91fr56g",
  );
  await expect
    .poll(() =>
      image.evaluate(
        (e) =>
          e.complete && e.naturalWidth === 4001 && e.naturalHeight === 3031,
      ),
    )
    .toBe(true);
  await page.locator(".about-button").first().click();
  await expect(
    page.getByRole("link", { name: "View the original chart and rights" }),
  ).toHaveAttribute("href", entry.canonicalUrl);
  await expect(page.locator("#notes")).toContainText(
    "No known restrictions on use",
  );
  await expect(page.locator("#notes")).not.toContainText("Natural Earth");
});

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  test(`archival chart fills the moving view and reverses at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    for (const p of [0.3, 0.35, 0.4, 0.47, 0.55, 0.601, 0.47, 0.35]) {
      await seek(page, p);
      const scan = await page.locator(".chart-engraving").boundingBox();
      expect(scan.x).toBeLessThanOrEqual(0.1);
      expect(scan.y).toBeLessThanOrEqual(0.1);
      expect(scan.x + scan.width).toBeGreaterThanOrEqual(viewport.width - 0.1);
      expect(scan.y + scan.height).toBeGreaterThanOrEqual(
        viewport.height - 0.1,
      );
      if (viewport.width <= 700 && p >= 0.36 && p <= 0.55) {
        const collisions = await page.locator("#route").evaluate((e) => {
          const b = document
            .querySelector(".chart-waypoint")
            .getBoundingClientRect();
          const length = e.getTotalLength() - Number(e.style.strokeDashoffset);
          return Array.from({ length: 401 }, (_, i) => {
            const p = e.getPointAtLength((length * i) / 400);
            const s = new DOMPoint(p.x, p.y).matrixTransform(e.getScreenCTM());
            return (
              s.x > b.left - 2 &&
              s.x < b.right + 2 &&
              s.y > b.top - 2 &&
              s.y < b.bottom + 2
            );
          }).filter(Boolean).length;
        });
        expect(collisions, "waypoint must not hide the red voyage line").toBe(
          0,
        );
      }
      if (p >= 0.35 && p <= 0.55) {
        const tip = await page.locator("#route").evaluate((e) => {
          const p = e.getPointAtLength(
            e.getTotalLength() - Number(e.style.strokeDashoffset),
          );
          const screen = new DOMPoint(p.x, p.y).matrixTransform(
            e.getScreenCTM(),
          );
          return { x: screen.x, y: screen.y };
        });
        expect(tip.x).toBeGreaterThan(20);
        expect(tip.x).toBeLessThan(viewport.width - 20);
        expect(tip.y).toBeGreaterThan(40);
        expect(tip.y).toBeLessThan(viewport.height - 40);
      }
    }
    await seek(page, 0.47);
    await expect(page.locator(".chart-waypoint h2")).toHaveText(
      "Off the Azores.",
    );
  });
}

test("reduced motion keeps the archival sheet still while its route advances", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await seek(page, 0.35);
  const before = await page.locator(".map").getAttribute("style");
  const offset = await page
    .locator("#route")
    .evaluate((e) => +e.style.strokeDashoffset);
  await seek(page, 0.55);
  expect(await page.locator(".map").getAttribute("style")).toBe(before);
  expect(
    await page.locator("#route").evaluate((e) => +e.style.strokeDashoffset),
  ).toBeLessThan(offset);
});

test("the early voyage begins at Nantucket and reaches named grounds in textual order", async ({
  page,
}) => {
  await page.goto("/#chart");
  await expect
    .poll(
      async () => +(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBeCloseTo(0.315, 3);
  const route = page.locator("#route");
  const start = await route.evaluate((e) => {
    const p = e.getPointAtLength(0);
    return [p.x, p.y];
  });
  const origin = page.locator('[data-waypoint="nantucket"]');
  await expect(origin).toHaveAttribute("data-chapter", "22");
  expect(
    await origin
      .locator("circle")
      .evaluate((e) => [+e.getAttribute("cx"), +e.getAttribute("cy")]),
  ).toEqual(start);
  await expect(page.locator(".opening .eyebrow")).toContainText("NANTUCKET");
  await seek(page, 0.35);
  await expect(page.locator('[data-waypoint="azores"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator('[data-waypoint="cape-verde"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await seek(page, 0.51);
  await expect(page.locator('[data-waypoint="azores"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator('[data-waypoint="cape-verde"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await seek(page, 0.55);
  await expect(page.locator('[data-waypoint="azores"] text')).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator(".chart-waypoint h2")).toHaveText(
    "Toward Cape Verde.",
  );
  await seek(page, 0.601);
  await expect(page.locator(".chart-waypoint h2")).toHaveText(
    "Off Cape Verde.",
  );
  await expect(page.locator('[data-waypoint="cape-verde"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".anatomy-scene")).toHaveCount(0);
  await seek(page, 0.35);
  await expect(page.locator('[data-waypoint="azores"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await page.locator(".about-button").first().click();
  await expect(page.locator("#notes")).toContainText("Rio de la Plata");
  await expect(page.locator("#notes")).toContainText(
    "connecting track and distance offshore are reconstructed",
  );
});

test("nonanimated course explains the whole first-half sequence and the limited map leg", async ({
  page,
}) => {
  await page.goto("/#literary");
  await page.locator(".route-transcript summary").click();
  const text = await page.locator(".route-transcript").innerText();
  const names = [
    "Nantucket",
    "Azores",
    "Cape Verde",
    "Río de la Plata",
    "Carrol",
    "Good Hope",
    "Crozets",
    "Java",
  ];
  const positions = names.map((n) => text.indexOf(n));
  expect(positions.every((n) => n >= 0)).toBe(true);
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
  await expect(page.locator(".route-transcript")).toContainText(
    "opening leg through Cape Verde",
  );
  await expect(page.locator(".route-transcript")).toContainText(
    "no exact ship positions",
  );
  await expect(
    page.locator(".route-transcript a").filter({ hasText: "Chapter 51" }),
  ).toHaveAttribute("href", /link2HCH0051$/);
});
