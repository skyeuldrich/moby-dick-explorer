import {test,expect} from '@playwright/test';
import {seek} from './helpers/seek.js';

for (const width of [1440,390,360]) {
  test(`three voices have separate readable depths, black pause and reversibility at ${width}`,async({page})=>{
    await page.setViewportSize({width,height:width===1440?900:844});
    await page.goto('/');
    const quotes=page.locator('.descent-quote');
    await expect(quotes).toHaveCount(3);
    for(const [index,p] of [[0,.76],[1,.82],[2,.88],[1,.82],[0,.76]]) {
      await seek(page,p);
      await expect(quotes.nth(index)).toHaveCSS('opacity','1');
      for(let other=0;other<3;other++)if(other!==index)await expect(quotes.nth(other)).toHaveCSS('opacity','0');
      const box=await quotes.nth(index).boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y+box.height).toBeLessThanOrEqual(page.viewportSize().height);
    }
    await seek(page,.925);
    for(const quote of await quotes.all()) await expect(quote).toHaveCSS('opacity','0');
    await expect(page.locator('.creatures')).toHaveCSS('opacity','0');
    await expect(page.locator('.stage')).toHaveAttribute('data-black','true');
    const screenshot=(await page.screenshot()).toString('base64');
    const maximum=await page.evaluate(async png=>{
      const image=new Image();image.src=`data:image/png;base64,${png}`;await image.decode();
      const c=document.createElement('canvas');c.width=image.width;c.height=image.height;
      const ctx=c.getContext('2d');ctx.drawImage(image,0,0);
      const pixels=ctx.getImageData(0,0,c.width,c.height).data;
      let maximum=0;
      for(let i=0;i<pixels.length;i+=4) maximum=Math.max(maximum,pixels[i],pixels[i+1],pixels[i+2]);
      return maximum;
    },screenshot);
    expect(maximum).toBe(0);
    await page.emulateMedia({reducedMotion:'reduce'});
    await seek(page,.88);
    await expect(quotes.nth(2)).toHaveCSS('opacity','1');
    await page.locator('.quote-transcript summary').click();
    await expect(page.locator('.quote-transcript')).toContainText('Now, in his heart, Ahab had some glimpse of this');
    await expect(page.locator('.quote-transcript')).toContainText('madness maddened');
    await expect(page.locator('.quote-transcript')).toContainText('Is it Ahab, Ahab?');
  });
}

test('chart remains drawn around the descent handoff on desktop',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 for(const p of [.604,.605,.606,.62,.606,.605,.604]){
  await seek(page,p);
  expect(await page.locator('.chart').evaluate(e=>Number(getComputedStyle(e).opacity))).toBeGreaterThan(.9);
  expect(await page.locator('.chart-engraving').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
 }
});
