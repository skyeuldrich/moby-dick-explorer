import { test, expect } from "@playwright/test";
async function seek(page, p) {
  await page.evaluate((p) => {
    const s = document.querySelector("#voyage");
    scrollTo(
      0,
      s.offsetTop +
        (s.offsetHeight - document.querySelector(".stage").offsetHeight) * p,
    );
  }, p);
  await expect
    .poll(async () =>
      Number(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBeCloseTo(p, 3);
}
for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`voyage, discovery and reversal at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".candle-scene")).toHaveCSS("opacity", "1");
    await expect(page.locator(".ledger")).toHaveCSS("opacity", "0");
    await page.screenshot({
      path: `test-results/darkness-${viewport.width}.png`,
    });
    await seek(page, 0.14);
    await expect(page.locator(".ledger")).toHaveCSS("opacity", "1");
    await page.screenshot({
      path: `test-results/candle-${viewport.width}.png`,
    });
    const ledger = await page.locator(".ledger").boundingBox();
    expect(ledger.x).toBeGreaterThanOrEqual(0);
    expect(ledger.x + ledger.width).toBeLessThanOrEqual(viewport.width);
    expect(ledger.y + ledger.height).toBeLessThan(viewport.height - 30);
    await seek(page, 0.285);
    await expect(page.locator(".harbor-scene")).toHaveCSS("opacity", "1");
    await page.screenshot({
      path: `test-results/harbor-${viewport.width}.png`,
    });
    await seek(page, 0.37);
    await expect(
      page.getByRole("heading", { name: "Moby—Dick" }),
    ).toBeVisible();
    const start = await page
      .locator("#route")
      .evaluate((e) => +getComputedStyle(e).strokeDashoffset.replace("px", ""));
    await page.getByRole("button", { name: /01 \/ A DISCOVERY/ }).click();
    await expect(page.locator("#discovery")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#discovery")).not.toBeVisible();
    await expect(page.locator(".hotspot")).toBeFocused();
    await page.locator(".hotspot").blur();
    await page.screenshot({ path: `test-results/chart-${viewport.width}.png` });
    await seek(page, 0.64);
    expect(
      await page
        .locator("#route")
        .evaluate(
          (e) => +getComputedStyle(e).strokeDashoffset.replace("px", ""),
        ),
    ).toBeLessThan(start);
    await page.screenshot({
      path: `test-results/anatomy-${viewport.width}.png`,
    });
    await seek(page, 0.83);
    const opacity = await page
      .locator(".chart")
      .evaluate((e) => +getComputedStyle(e).opacity);
    expect(opacity).toBeGreaterThan(0);
    expect(opacity).toBeLessThan(1);
    await page.screenshot({
      path: `test-results/threshold-${viewport.width}.png`,
    });
    await seek(page, 1);
    await expect(page.locator(".depth-value")).toHaveText("1,800 M");
    await page.screenshot({ path: `test-results/abyss-${viewport.width}.png` });
    await page.getByRole("button", { name: "On this encounter" }).click();
    await expect(page.locator("#notes")).toBeVisible();
    await page.keyboard.press("Escape");
    await seek(page, 0.37);
    expect(
      await page
        .locator(".chart")
        .evaluate((e) => +getComputedStyle(e).opacity),
    ).toBe(1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
test("keyboard skip and reduced motion retain literary content", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#literary/);
  await expect(
    page.getByRole("heading", { name: "The will to map the unknown." }),
  ).toBeInViewport();
  expect(
    await page
      .locator(".whale")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  await page.getByRole("link", { name: "Return to the chart" }).click();
  await expect(page.locator(".hotspot")).toBeFocused();
  await expect(page.locator(".hotspot")).toBeInViewport();
  await expect(page.locator(".chart")).toHaveCSS("transform", "none");
});
test("refresh, resize, and reverse preserve a continuous timeline", async ({
  page,
}) => {
  await page.goto("/");
  await seek(page, 0.65);
  await page.reload();
  await expect
    .poll(
      async () => +(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBeCloseTo(0.65, 2);
  await page.setViewportSize({ width: 900, height: 700 });
  await expect(page.locator(".chart")).toHaveCSS("opacity", "1");
  await seek(page, 0.25);
  await expect(page.locator(".harbor-scene")).not.toHaveCSS("opacity", "0");
  await seek(page, 0.14);
  await expect(page.locator(".ledger")).toHaveCSS("opacity", "1");
  await seek(page, 0);
  await expect(page.locator(".ledger")).toHaveCSS("opacity", "0");
});
test("touch swipes advance and reverse without viewport-height remapping", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173");
  const cdp = await context.newCDPSession(page);
  const swipe = async (from, to) => {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 190, y: from }],
    });
    for (let i = 1; i <= 12; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 190, y: from + ((to - from) * i) / 12 }],
      });
      await page.waitForTimeout(16);
    }
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await page.waitForTimeout(1000);
  };
  await swipe(720, 180);
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await seek(page, 0.45);
  const before = await page.evaluate(() => scrollY);
  await swipe(180, 720);
  expect(await page.evaluate(() => scrollY)).toBeLessThan(before);
  expect(await page.locator(".stage").getAttribute("data-scene")).toBe("chart");
  await context.close();
});
test("mouse wheel advances continuously and reverses the red route", async ({
  page,
}) => {
  await page.goto("/");
  await seek(page, 0.5);
  const before = await page
    .locator("#route")
    .evaluate((e) => Number(e.style.strokeDashoffset));
  await page.mouse.wheel(0, 450);
  const samples = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const values = [];
        const read = () => {
          values.push(
            Number(document.querySelector(".stage").dataset.progress),
          );
          if (values.length < 24) requestAnimationFrame(read);
          else resolve(values);
        };
        requestAnimationFrame(read);
      }),
  );
  expect(samples.at(-1)).toBeGreaterThan(samples[0]);
  expect(samples.every((p, i) => !i || p >= samples[i - 1])).toBe(true);
  expect(
    await page
      .locator("#route")
      .evaluate((e) => Number(e.style.strokeDashoffset)),
  ).toBeLessThan(before);
  await page.mouse.wheel(0, -450);
  await expect
    .poll(async () =>
      Number(await page.locator(".stage").getAttribute("data-progress")),
    )
    .toBeCloseTo(0.5, 3);
});
test("candle document fits a short phone and landscape viewport", async ({
  page,
}) => {
  for (const size of [
    { width: 360, height: 640 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(size);
    await page.goto("/");
    await seek(page, 0.14);
    const box = await page.locator(".ledger").boundingBox();
    expect(box.y).toBeGreaterThan(0);
    expect(box.y + box.height).toBeLessThan(size.height - 25);
    expect(box.x + box.width).toBeLessThan(size.width);
    await page.screenshot({
      path: `test-results/candle-${size.width}x${size.height}.png`,
    });
  }
});
