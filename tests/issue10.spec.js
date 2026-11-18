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
test("approved encounter painting remains accessible after the desk", async ({page}) => {
  await page.goto("/");
  const image = page.locator(".encounter-image");
  await expect(image).toHaveAttribute("src", /moby-dick-whale-squid-final.webp$/);
  await at(page, 1);
  await expect(image).toBeVisible();
  expect(await image.evaluate(async image => {
    await image.decode();
    return image.naturalWidth;
  })).toBeGreaterThan(1000);
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
