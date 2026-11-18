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
    await at(page, 0.22);
    await expect(page.locator(".harbor-livelihood")).toHaveCSS("opacity", "1");
    await expect(page.locator(".harbor-livelihood")).toContainText("take to the sea for a livelihood!");
    await at(page, 0.25);
    await expect(page.locator(".harbor-invitation")).toHaveCSS("opacity", "1");
    await expect(page.locator(".harbor-invitation")).toContainText("Nantucket! Take out your map and look at it.");
    await expect(page.locator(".harbor-livelihood")).toHaveCSS("opacity", "0");
    await expect(page.locator(".harbor-copy, .harbor-note")).toHaveCount(0);
    await at(page, 0.28);
    await expect(page.locator(".island-quote").first()).toHaveCSS("opacity", "0");
    await expect(page.locator(".chart")).toHaveCSS("opacity", "1");
    const pageTransform = await page.locator(".harbor-page").getAttribute("style");
    const wave = await page.locator(".harbor-wave").boundingBox();
    expect(wave.y).toBeLessThan(viewport.height);
    expect(wave.y + wave.height).toBeGreaterThan(0);
    await at(page, 0.295);
    await at(page, 0.28);
    expect(await page.locator(".harbor-page").getAttribute("style")).toBe(pageTransform);
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

test("each moving gull contains ink with fully transparent surrounding paper", async ({page}) => {
  await page.goto("/");
  const samples = await page.locator(".engraved-gull image").evaluateAll(async images => {
    return Promise.all(images.map(async sprite => {
      const image = new Image();
      image.src = sprite.href.baseVal;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      const pixels = ctx.getImageData(0, 0, image.width, image.height).data;
      let ink = 0;
      let paper = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) {
          ink++;
          if (pixels[i] > 128) paper++;
        }
      }
      return {ink, paper, total: pixels.length / 4};
    }));
  });
  expect(samples).toHaveLength(3);
  for (const sprite of samples) {
    expect(sprite.ink).toBeGreaterThan(50);
    expect(sprite.ink).toBeLessThan(sprite.total / 2);
    expect(sprite.paper).toBe(0);
  }
});
