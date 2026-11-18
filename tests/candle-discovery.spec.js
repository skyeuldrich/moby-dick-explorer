import {test,expect} from '@playwright/test';
import {seek} from './helpers/seek.js';

for(const width of [1440,390,360]) {
  test(`candle discovery preserves the desk and returns focus at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:width===1440?900:844});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('/');
    await seek(page,.14);
    const buttons=page.locator('.desk-object');
    await expect(buttons).toHaveCount(4);
    const boxes=await buttons.evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};}));
    for(const a of boxes){
      expect(a.x).toBeGreaterThanOrEqual(0);
      expect(a.x+a.width).toBeLessThanOrEqual(width);
      expect(a.height).toBeGreaterThanOrEqual(44);
      for(const b of boxes) if(a!==b)expect(a.x+a.width<=b.x || b.x+b.width<=a.x || a.y+a.height<=b.y || b.y+b.height<=a.y).toBe(true);
    }
    const candle=page.locator('.inspect-candle');
    await candle.focus();
    const depth=await page.evaluate(()=>scrollY);
    await page.keyboard.press('Enter');
    const dialog=page.locator('#desk-inspector');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Roake & Varty');
    await expect(dialog).toContainText('800 × 697');
    await dialog.locator('img').evaluate(i=>i.decode());
    expect(await dialog.locator('img').evaluate(i=>i.naturalWidth)).toBe(800);
    await page.keyboard.press('Escape');
    await expect(candle).toBeFocused();
    expect(await page.evaluate(()=>scrollY)).toBe(depth);
  });
}
