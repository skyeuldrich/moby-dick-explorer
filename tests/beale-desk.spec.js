import {test, expect} from '@playwright/test';
import {seek} from './helpers/seek.js';

for (const width of [1440,390,360]) {
  test(`Beale can be inspected and returned to on ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:width===1440?900:844});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/');
    await seek(page,.14);
    const button=page.locator('.inspect-beale');
    await expect(button).toBeInViewport();
    const bounds=await button.boundingBox();
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(page.viewportSize().height - 30);
    await button.focus();
    await page.keyboard.press('Enter');
    const dialog=page.locator('#desk-inspector');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('1839');
    await expect(dialog).toContainText('Chapters 55–57');
    await expect(dialog.locator('img')).toHaveAttribute('src',/beale-1839-fig1.webp$/);
    await page.keyboard.press('Escape');
    await expect(button).toBeFocused();
    await expect(page.locator('.anatomy-scene')).toHaveCount(0);
  });
}
