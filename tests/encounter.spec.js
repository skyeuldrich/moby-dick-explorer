import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
async function at(page, p) {
  const expected = await page.evaluate((p) => {
    const range =
      document.querySelector("#voyage").offsetHeight -
      document.querySelector(".stage").offsetHeight;
    scrollTo(0, range * p);
    return +(scrollY / range).toFixed(5);
  }, p);
  await expect
    .poll(
      async () => +(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBe(expected);
}
const visibleFraction = async (page, height) => {
  const b = await page.locator(".encounter-image").boundingBox();
  return (
    Math.max(0, Math.min(height, b.y + b.height) - Math.max(0, b.y)) / b.height
  );
};
test("the encounter serves the unchanged owner-supplied WebP instead of vector animals", async ({
  page,
}) => {
  await page.goto("/");
  const img = page.locator(".encounter-image");
  await expect(img).toHaveAttribute(
    "src",
    /assets\/moby-dick-whale-squid-final\.webp$/,
  );
  const response = await page.request.get(await img.getAttribute("src"));
  expect(response.ok()).toBe(true);
  expect(
    createHash("sha256")
      .update(await response.body())
      .digest("hex"),
  ).toBe("9c8d32f85e93d3d679b430e15e052d89620df808f0dfd33a566c736532c02c8c");
  await expect
    .poll(() =>
      img.evaluate(
        (e) => e.complete && e.naturalWidth === 1671 && e.naturalHeight === 941,
      ),
    )
    .toBe(true);
  await expect(img).toHaveAttribute("alt", /artistic reconstruction/i);
  await expect(page.locator("svg.creatures, .whale, .squid")).toHaveCount(0);
});
for (const size of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
  { width: 844, height: 390 },
]) {
  test(`painting reveals progressively, fits and reverses at ${size.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    await page.locator(".encounter-image").evaluate((e) => e.decode());
    await at(page, 0.8);
    await expect(page.locator(".descent-quote")).toHaveCSS("opacity", "1");
    await expect(page.locator(".creatures")).toHaveCSS("opacity", "0");
    await at(page, 0.94);
    await expect(page.locator(".descent-quote")).toHaveCSS("opacity", "0");
    const firstVisible = await visibleFraction(page, size.height),
      firstRect = await page.locator(".encounter-image").boundingBox();
    expect(firstVisible).toBeGreaterThan(0);
    expect(firstVisible).toBeCloseTo(1,2);
    const firstMask=await page.locator(".encounter-image").evaluate(e=>getComputedStyle(e).maskImage);
    expect(firstMask).toContain("radial-gradient");
    await at(page, 0.97);
    expect(await page.locator(".encounter-image").evaluate(e=>getComputedStyle(e).maskImage)).not.toBe(firstMask);
    await at(page, 1);
    expect(await visibleFraction(page, size.height)).toBeCloseTo(1, 3);
    const image = await page.locator(".encounter-image").boundingBox();
    expect(image.x).toBeGreaterThanOrEqual(0);
    expect(image.y).toBeGreaterThanOrEqual(0);
    expect(image.x + image.width).toBeLessThanOrEqual(size.width);
    expect(image.y + image.height).toBeLessThanOrEqual(size.height);
    expect(image.width / image.height).toBeCloseTo(1671 / 941, 3);
    if (size.width < 700) {
      const text = await page.locator(".abyss-copy").boundingBox();
      expect(text.y + text.height).toBeLessThan(image.y);
    }
    await at(page, 0.94);
    expect(await visibleFraction(page, size.height)).toBeCloseTo(
      firstVisible,
      2,
    );
    const reverse = await page.locator(".encounter-image").boundingBox();
    expect(Math.abs(reverse.y - firstRect.y)).toBeLessThan(2);
    await at(page, 0.86);
    await expect(page.locator(".creatures")).toHaveCSS("opacity", "0");
  });
}
test("reduced motion presents the whole painting without travel or clipping", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await at(page, 1);
  await expect(page.locator(".creatures")).toHaveCSS("transform", "none");
  await expect(page.locator(".encounter-image")).toHaveCSS("clip-path", "none");
  await expect(page.locator(".encounter-image")).toBeVisible();
  await page.getByRole("button", { name: "On this encounter" }).click();
  await expect(page.locator("#notes")).toContainText(
    "supplied and approved by the project owner",
  );
});
