import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

async function seek(page, p) {
  await page.evaluate(p => scrollTo(0, (document.querySelector('#voyage').offsetHeight - document.querySelector('.stage').offsetHeight) * p), p);
  await expect.poll(async () => +(await page.locator('.stage').getAttribute('data-progress'))).toBeCloseTo(p, 3);
}

test('voyage embeds the documented archival raster and links its institutional record', async ({page}) => {
  await page.goto('/');
  const image = page.locator('.chart-engraving');
  const url = await image.getAttribute('src');
  expect(url).toContain('/assets/archive/norie-1844-pacific-east.webp');
  const response = await page.request.get(url);
  expect(response.ok()).toBe(true);
  const manifest = JSON.parse(readFileSync('public/assets/archive/manifest.json'));
  const entry = manifest.assets.find(a => a.file === url.split('/').at(-1));
  expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(entry.sha256);
  expect(entry.canonicalUrl).toBe('https://collections.leventhalmap.org/search/commonwealth:vt154w90j');
  await expect.poll(() => image.evaluate(e => e.complete && e.naturalWidth === 2400 && e.naturalHeight === 3521)).toBe(true);
  await page.locator('.about-button').first().click();
  await expect(page.getByRole('link', { name: 'View the original chart and rights' })).toHaveAttribute('href', entry.canonicalUrl);
  await expect(page.locator('#notes')).toContainText('No known restrictions on use');
  await expect(page.locator('#notes')).not.toContainText('Natural Earth');
});

for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:360,height:640}]) {
  test(`archival chart fills the moving view and reverses at ${viewport.width}px`, async ({page}) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    for(const p of [.3,.35,.4,.47,.55,.601,.47,.35]) {
      await seek(page,p);
      const scan = await page.locator('.chart-engraving').boundingBox();
      expect(scan.x).toBeLessThanOrEqual(0.1);
      expect(scan.y).toBeLessThanOrEqual(0.1);
      expect(scan.x+scan.width).toBeGreaterThanOrEqual(viewport.width-0.1);
      expect(scan.y+scan.height).toBeGreaterThanOrEqual(viewport.height-0.1);
      if(viewport.width <= 700 && p >= .36 && p <= .55) {
        const collisions = await page.locator('#route').evaluate(e => {
          const b=document.querySelector('.chart-waypoint').getBoundingClientRect();
          const length=e.getTotalLength()-Number(e.style.strokeDashoffset);
          return Array.from({length:401},(_,i)=>{
            const p=e.getPointAtLength(length*i/400);
            const s=new DOMPoint(p.x,p.y).matrixTransform(e.getScreenCTM());
            return s.x>b.left-2 && s.x<b.right+2 && s.y>b.top-2 && s.y<b.bottom+2;
          }).filter(Boolean).length;
        });
        expect(collisions, 'waypoint must not hide the red voyage line').toBe(0);
      }
      if(p >= .35 && p <= .55) {
        const tip = await page.locator('#route').evaluate(e => {
          const p=e.getPointAtLength(e.getTotalLength()-Number(e.style.strokeDashoffset));
          const screen=new DOMPoint(p.x,p.y).matrixTransform(e.getScreenCTM());
          return {x:screen.x,y:screen.y};
        });
        expect(tip.x).toBeGreaterThan(20);expect(tip.x).toBeLessThan(viewport.width-20);
        expect(tip.y).toBeGreaterThan(40);expect(tip.y).toBeLessThan(viewport.height-40);
      }
    }
    await seek(page,.47);
    await expect(page.locator('.chart-waypoint h2')).toHaveText('The coast of Peru.');
  });
}

test('reduced motion keeps the archival sheet still while its route advances', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  await seek(page,.35);
  const before=await page.locator('.map').getAttribute('style');
  const offset=await page.locator('#route').evaluate(e=>+e.style.strokeDashoffset);
  await seek(page,.55);
  expect(await page.locator('.map').getAttribute('style')).toBe(before);
  expect(await page.locator('#route').evaluate(e=>+e.style.strokeDashoffset)).toBeLessThan(offset);
});
