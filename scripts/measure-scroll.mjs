import { chromium } from "@playwright/test";
import { existsSync } from "node:fs";
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
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const cdp = await page.context().newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await cdp.send("Performance.enable");
const target = process.argv[2] || "http://127.0.0.1:5173";
try {
  await page.goto(target, { timeout: 25000 });
  await page.evaluate(() => document.fonts.ready);
  if (!(await page.locator("#voyage").count())) {
    console.log(
      JSON.stringify({
        reference: target,
        title: await page.title(),
        text: (await page.locator("body").innerText()).slice(0, 1200),
      }),
    );
    await page.mouse.wheel(0, 750);
    await page.waitForTimeout(500);
    await page.screenshot({ path: "/tmp/boom-reference.png" });
  } else {
    const before = (await cdp.send("Performance.getMetrics")).metrics;
    const frames = await page.evaluate(
      () =>
        new Promise((resolve) => {
          let start, last;
          const deltas = [];
          const distance =
            document.querySelector("#voyage").offsetHeight - innerHeight;
          function frame(now) {
            if (!start) start = now;
            if (last) deltas.push(now - last);
            last = now;
            const t = Math.min((now - start) / 4000, 1);
            scrollTo(0, distance * t);
            if (t < 1) requestAnimationFrame(frame);
            else resolve(deltas);
          }
          requestAnimationFrame(frame);
        }),
    );
    const after = (await cdp.send("Performance.getMetrics")).metrics;
    const delta = (name) =>
      +(
        after.find((m) => m.name === name).value -
        before.find((m) => m.name === name).value
      ).toFixed(3);
    frames.sort((a, b) => a - b);
    console.log(
      JSON.stringify(
        {
          target,
          viewport: "390x844, DPR 3",
          cpuThrottle: 4,
          frames: frames.length,
          p95FrameMs: +frames[Math.floor(frames.length * 0.95)].toFixed(1),
          gapsOver50Ms: frames.filter((n) => n > 50).length,
          LayoutCount: delta("LayoutCount"),
          RecalcStyleCount: delta("RecalcStyleCount"),
          TaskDuration: delta("TaskDuration"),
        },
        null,
        2,
      ),
    );
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
