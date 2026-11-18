import {test,expect} from '@playwright/test';
import {seek} from './helpers/seek.js';

for(const viewport of [
  {width:1440,height:900},
  {width:1280,height:800},
  {width:390,height:844},
  {width:360,height:640},
]) {
  test(`desk camera settles with accessible objects and reverses at ${viewport.width}x${viewport.height}`,async({page})=>{
    await page.setViewportSize(viewport);
    await page.goto('/');
    for(const p of [.015,.045,.07,.045,.015]) {
      await seek(page,p);
      const projection=await page.locator('.desk-tableau').evaluate(node=>({x:Number(node.dataset.wickX),y:Number(node.dataset.wickY)}));
      const glow=await page.locator('.bottom-glow').boundingBox();
      const picture=await page.locator('.desk-picture img').boundingBox();
      const portrait=viewport.width<viewport.height;
      expect(glow.x+glow.width/2).toBeCloseTo(projection.x,1);
      expect(glow.y+glow.height/2).toBeCloseTo(projection.y,1);
      expect(picture.x+picture.width*(portrait?.26:.151)).toBeCloseTo(projection.x,1);
      expect(picture.y+picture.height*(portrait?.225:.13)).toBeCloseTo(projection.y,1);
      if(p===.045) {
        expect(projection.x).toBeCloseTo(viewport.width/2,1);
        expect(projection.y).toBeCloseTo(viewport.height/2,1);
      }
    }
    await seek(page,.14);
    const image=await page.locator('.desk-picture img').boundingBox();
    if(viewport.width>700) {
      expect(image.x).toBeGreaterThanOrEqual(0);
      expect(image.x+image.width).toBeLessThanOrEqual(viewport.width);
      // The source's complete Beale sheet is in the image's bottom quarter.
      expect(image.y+image.height*.98).toBeLessThan(viewport.height-25);
    }
    const objects=page.locator('.desk-object');
    const settled=await objects.evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};
    }));
    expect(settled).toHaveLength(4);
    for(const rect of settled) {
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.y).toBeGreaterThanOrEqual(0);
      expect(rect.x+rect.width).toBeLessThanOrEqual(viewport.width);
      expect(rect.y+rect.height).toBeLessThanOrEqual(viewport.height);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
    await seek(page,.17);
    expect(await objects.evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};
    }))).toEqual(settled);
    await seek(page,.045);
    await expect(page.locator('.desk-objects')).toHaveJSProperty('inert',true);
    await seek(page,.14);
    expect(await objects.evaluateAll(nodes=>nodes.map(node=>{
      const r=node.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};
    }))).toEqual(settled);
    const beale=page.locator('.inspect-beale');
    await beale.click();
    await expect(page.locator('#desk-inspector img')).toHaveAttribute('src',/beale-1839-fig1.webp$/);
    await page.keyboard.press('Escape');
    await expect(beale).toBeFocused();
    let reference;
    for(const p of [.235,.26,.28,.295,.28,.26,.235]) {
      await seek(page,p);
      const offsets=await page.locator('.harbor-ink').evaluate(ink=>{
        const base=ink.getBoundingClientRect();
        return ['.harbor-art','.harbor-water','.harbor-wave'].map(selector=>{
          const node=ink.querySelector(selector),r=node.getBoundingClientRect();
          return {x:r.x-base.x,y:r.y-base.y,width:r.width,height:r.height,transform:getComputedStyle(node).transform};
        });
      });
      if(!reference)reference=offsets;
      for(let i=0;i<offsets.length;i++) {
        expect(offsets[i].x).toBeCloseTo(reference[i].x,2);
        expect(offsets[i].y).toBeCloseTo(reference[i].y,2);
        expect(offsets[i].width).toBeCloseTo(reference[i].width,2);
        expect(offsets[i].height).toBeCloseTo(reference[i].height,2);
        expect(offsets[i].transform).toBe(reference[i].transform);
      }
    }
  });
}
