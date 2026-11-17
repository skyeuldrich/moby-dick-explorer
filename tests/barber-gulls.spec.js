import { test, expect } from "@playwright/test";
async function at(page, p) {
  const expected = await page.evaluate((p) => {
    const r =
      document.querySelector("#voyage").offsetHeight -
      document.querySelector(".stage").offsetHeight;
    scrollTo(0, r * p);
    return +(scrollY / r).toFixed(5);
  }, p);
  await expect
    .poll(
      async () => +(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBe(expected);
}
for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
  { width: 360, height: 640 },
]) {
  test(`original engraved gulls wheel and reverse at ${viewport.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await at(page, 0.215);
    await expect(page.locator(".engraved-gull")).toHaveCount(3);
    const first = await page
      .locator(".engraved-gull")
      .evaluateAll((es) => es.map((e) => e.style.transform));
    await at(page, 0.25);
    const second = await page
      .locator(".engraved-gull")
      .evaluateAll((es) => es.map((e) => e.style.transform));
    expect(second).not.toEqual(first);
    expect(new Set(second).size).toBe(3);
    await at(page, 0.215);
    expect(
      await page
        .locator(".engraved-gull")
        .evaluateAll((es) => es.map((e) => e.style.transform)),
    ).toEqual(first);
    await at(page, 0.235);
    const art = await page.locator(".barber-harbor").boundingBox(),
      text = await page.locator(".harbor-copy").boundingBox();
    expect(art.x).toBeGreaterThanOrEqual(-5);
    expect(art.x + art.width).toBeLessThan(viewport.width + 5);
    expect(text.y + text.height).toBeLessThan(art.y);
    await expect(page.locator(".harbor-copy")).toContainText("1839");
    await expect(page.locator(".harbor-note")).toContainText(
      "Original engraved gulls",
    );
    await page.screenshot({
      path: `test-results/barber-harbor-${viewport.width}.png`,
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await at(page, 0.24);
    await expect(page.locator(".barber-adaptation")).toHaveCSS(
      "display",
      "none",
    );
    await expect(page.locator(".engraved-gull").first()).toHaveCSS(
      "transform",
      "none",
    );
  });
}
