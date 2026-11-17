import { test, expect } from "@playwright/test";
async function at(page, p) {
  await page.evaluate(
    (p) =>
      scrollTo(
        0,
        (document.querySelector("#voyage").offsetHeight -
          document.querySelector(".stage").offsetHeight) *
          p,
      ),
    p,
  );
  await expect
    .poll(
      async () => +(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBeCloseTo(p, 4);
  await page.waitForTimeout(100);
}
test("new assets retain alpha, candle stays separate from paper", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
    { width: 360, height: 640 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator(".encounter-image")).toHaveAttribute(
      "src",
      /moby-dick-whale-squid-final.webp$/,
    );
    await expect(page.locator(".encounter-image")).toHaveAttribute("src",/final.webp$/);
    await expect(page.locator(".candle-study")).toHaveAttribute(
      "src",
      /moby-dick-spermaceti-candle-study.webp$/,
    );
    await at(page, 0.14);
    const candle = await page.locator(".candle").boundingBox(),
      paper = await page.locator(".ledger").boundingBox();
    expect(
      candle.x + candle.width < paper.x || candle.y + candle.height < paper.y,
    ).toBe(true);
  }
});
test("scroll swimming reverses and body/light share one transform", async ({
  page,
}) => {
  await page.goto("/");
  const fish = page.locator(".candle-scene .organism-angler");
  await at(page, 0.005);
  const before = await fish.getAttribute("style");
  await at(page, 0.025);
  expect(await fish.getAttribute("style")).not.toBe(before);
  await expect(fish).toHaveAttribute('data-source',/anglerfish.png$/);
  await at(page, 0.005);
  expect(await fish.getAttribute("style")).toBe(before);
  await at(page, 0.075);
  await expect(page.locator(".candle-scene .abyss-life")).toHaveCSS(
    "opacity",
    "0",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await at(page, 0.02);
  await expect(fish).toHaveCSS("transform", "none");
});
