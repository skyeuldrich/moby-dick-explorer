import { chromium, expect } from "@playwright/test";
import { existsSync, mkdirSync } from "node:fs";
const url = process.argv[2];
if (!url) throw Error("Usage: node scripts/verify-preview.mjs <preview URL>");
const output = process.env.PREVIEW_SCREENSHOT_DIR || "/tmp/moby-v04-preview";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  args: ["--no-sandbox"],
  env: {
    ...process.env,
    HOME: "/tmp/moby-browser",
    XDG_CONFIG_HOME: "/tmp/moby-browser/config",
    XDG_CACHE_HOME: "/tmp/moby-browser/cache",
  },
});
try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
    { width: 360, height: 640 },
  ]) {
    const page = await browser.newPage({ viewport });
    const failures = [];
    page.on("pageerror", (e) => failures.push(e.message));
    page.on("response", (r) => {
      if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
    });
    await page.goto(url, { timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    await expect(
      page.locator('meta[name="prototype-version"]'),
    ).toHaveAttribute("content", "0.4");
    for (const [label, p] of [
      ["desk", 0.14],
      ["harbor", 0.235],
      ["peru", 0.47],
      ["beale", 0.66],
      ["madness", 0.8],
      ["partial", 0.94],
      ["encounter", 1],
    ]) {
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
          async () =>
            +(await page.locator(".stage").getAttribute("data-progress")),
        )
        .toBeCloseTo(p, 3);
      if (label === "peru") {
        await expect(page.locator(".chart-engraving")).toBeVisible();
        expect(
          await page
            .locator(".chart-engraving")
            .evaluate((e) => e.complete && e.naturalWidth === 1200),
        ).toBe(true);
        await page.locator(".hotspot").click();
        await expect(page.locator("#discovery")).toBeVisible();
        await page.keyboard.press("Escape");
      }
      if (label === "madness") {
        await expect(page.locator(".descent-quote")).toHaveCSS("opacity", "1");
        await expect(page.locator(".creatures")).toHaveCSS("opacity", "0");
      }
      await page.screenshot({
        path: `${output}/${label}-${viewport.width}.png`,
      });
    }
    expect(
      await page
        .locator(".archival-plate img")
        .evaluate((e) => e.complete && e.naturalWidth === 1980),
    ).toBe(true);
    expect(failures).toEqual([]);
    console.log(
      `Verified ${url}: ${viewport.width}px, seven scenes, local assets, Chapter44, quote timing, no HTTP/script errors`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
