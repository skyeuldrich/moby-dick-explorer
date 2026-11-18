import { test, expect } from '@playwright/test';

async function seek(page, progress) {
  await page.evaluate(p => scrollTo(0, p * (document.querySelector('#voyage').offsetHeight - document.querySelector('.stage').offsetHeight)), progress);
  await expect.poll(async () => +(await page.locator('.stage').getAttribute('data-progress'))).toBeCloseTo(progress, 3);
}

test('authentic agreement and separate mobile facts emerge and reverse', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await seek(page,.04);
  await expect(page.locator('.shipping-agreement')).toHaveCSS('opacity','0');
  await seek(page,.11);
  await expect(page.locator('.shipping-agreement')).toHaveCSS('opacity','1');
  await expect(page.locator('.shipping-agreement img')).toHaveAttribute('src',/whalemens-shipping-paper.webp$/);
  await expect(page.locator('.fleet-fact')).toHaveCSS('opacity','1');
  await expect(page.locator('.shares-fact')).toHaveCSS('opacity','0');
  const image = await page.locator('.shipping-agreement').boundingBox();
  const annotation = await page.locator('.ledger').boundingBox();
  expect(image.y + image.height).toBeLessThan(annotation.y);
  await seek(page,.16);
  await expect(page.locator('.fleet-fact')).toHaveCSS('opacity','0');
  await expect(page.locator('.shares-fact')).toHaveCSS('opacity','1');
  await expect(page.locator('.shares-fact')).toHaveCSS('pointer-events','auto');
  await seek(page,.11);
  await expect(page.locator('.fleet-fact')).toHaveCSS('opacity','1');
  await expect(page.locator('.shares-fact')).toHaveCSS('opacity','0');
});

// The old responsive top offset detached the ellipse from a resized candle.
test('contact shadow stays directly under the holder at every desk size', async ({page}) => {
  for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:844,height:390}]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await seek(page,.11);
    const candle = await page.locator('.candle').boundingBox();
    const shadow = await page.locator('.contact-shadow').boundingBox();
    expect(shadow.y).toBeGreaterThan(candle.y + candle.height * .85);
    expect(shadow.y).toBeLessThan(candle.y + candle.height);
    expect(shadow.x).toBeGreaterThan(candle.x);
    expect(shadow.x + shadow.width).toBeLessThan(candle.x + candle.width);
  }
});
