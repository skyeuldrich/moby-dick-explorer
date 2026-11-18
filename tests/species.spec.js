import {test,expect} from '@playwright/test';
import {deform,species} from '../src/species-motion.js';
async function at(page,p){
 const target=await page.evaluate(p=>{const range=document.querySelector('#voyage').offsetHeight-document.querySelector('.stage').offsetHeight;scrollTo(0,range*p);return +(scrollY/range).toFixed(5)},p);
 await expect.poll(async()=>+(await page.locator('.stage').getAttribute('data-progress'))).toBe(target);
}
test('three approved image species replace the SVG cast and swim while scroll is stopped',async({page})=>{
 await page.goto('/');await expect(page.locator('.candle-scene .species-animal')).toHaveCount(3);
 await expect(page.locator('.candle-scene .abyss-life svg')).toHaveCount(0);
 await expect.poll(()=>page.locator('html').getAttribute('data-species-ready'),{timeout:20000}).toBe('true');
 const nodes=page.locator('.candle-scene .species-animal');
 const before=await nodes.evaluateAll(es=>es.map(e=>e.dataset.phase));
 await page.waitForTimeout(600);
 const after=await nodes.evaluateAll(es=>es.map(e=>e.dataset.phase));
 expect(after).not.toEqual(before);expect(new Set(after).size).toBe(3);
 for(const source of await nodes.evaluateAll(es=>es.map(e=>e.dataset.source))){expect((await page.request.get(source)).ok()).toBe(true)}
});
test('macro travel reverses independently, stops at candle, and reduced motion holds still',async({page})=>{
 await page.goto('/');await expect.poll(()=>page.locator('html').getAttribute('data-species-ready'),{timeout:20000}).toBe('true');
 const fish=page.locator('.candle-scene .organism-angler');
 await at(page,.005);const start=await fish.getAttribute('style');
 const first = await fish.boundingBox();
 await at(page,.025);
 const descended = await fish.boundingBox();
 expect(descended.x).toBeCloseTo(first.x, 1);
 expect(descended.width).toBeCloseTo(first.width, 1);
 expect(descended.y).toBeLessThan(first.y - 40);
 await at(page,.005);expect(await fish.getAttribute('style')).toBe(start);
 await at(page,.075);await expect(page.locator('.candle-scene .abyss-life')).toHaveCSS('opacity','0');
 const stopped=await fish.getAttribute('data-phase');await page.waitForTimeout(200);expect(await fish.getAttribute('data-phase')).toBe(stopped);
 await page.emulateMedia({reducedMotion:'reduce'});await at(page,0);
 await expect(fish).toHaveCSS('transform','none');await expect.poll(()=>fish.getAttribute('data-phase')).toBe('0.0000');
 const held=await fish.getAttribute('data-frame');await page.waitForTimeout(180);expect(await fish.getAttribute('data-frame')).toBe(held);
});
test('deformation is local and species-specific, with dark bodies and anatomically placed lights',()=>{
 expect(species.map(s=>s.id)).toEqual(['angler','jelly','loosejaw']);
 const lure=deform('angler',.944,.313,.23),head=deform('angler',.65,.55,.23);
 expect(lure).not.toEqual([.944,.313]);expect(head).toEqual([.65,.55]);
 const bell=deform('jelly',.75,.20,.15),trailing=deform('jelly',.2,.8,.15);
 expect(Math.abs(bell[1]-.20)).not.toBeCloseTo(Math.abs(trailing[1]-.8),4);
 expect(deform('loosejaw',.9,.5,0)[1]).not.toBeCloseTo(deform('loosejaw',.1,.5,0)[1],3);
 for(const entry of species)expect(entry.alpha).toBeLessThan(.15);
 expect(species[0].lights).toHaveLength(1);expect(species[2].lights[0][0]).toBeCloseTo(.161,3);
});

test('rendered encounter gains real visible contours before the complete painting',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 await at(page,.925);await page.locator('.encounter-image').evaluate(e=>e.decode());
 // Sample actual composited screenshot pixels, not the source image or CSS opacity.
 const light=async()=>{
  const box=await page.locator('.encounter-image').boundingBox();
  const png=(await page.screenshot()).toString('base64');
  return page.evaluate(async({png,box})=>{
   const image=new Image();image.src=`data:image/png;base64,${png}`;await image.decode();
   const c=document.createElement('canvas');c.width=image.width;c.height=image.height;
   const ctx=c.getContext('2d');ctx.drawImage(image,0,0);
   const data=ctx.getImageData(Math.round(box.x+box.width*.55),Math.round(box.y+box.height*.39),20,20).data;
   let sum=0;for(let i=0;i<data.length;i+=4)sum+=(data[i]+data[i+1]+data[i+2])/3;return sum/(data.length/4);
  },{png,box});
 };
 await at(page,.87);const dark=await light();
 await at(page,.925);const contour=await light();
 await at(page,1);const complete=await light();
 expect(contour).toBeGreaterThan(dark+1);expect(complete).toBeGreaterThan(contour+5);
 await at(page,.925);expect(await light()).toBeCloseTo(contour,0);
});


test('jelly bell contracts briefly then relaxes over the longer cycle',()=>{
 const span=phase=>deform('jelly',.8,.45,phase)[1]-deform('jelly',.8,.1,phase)[1];
 const resting=span(0),contracted=span(.22),relaxing=span(.8);
 expect(contracted).toBeLessThan(resting-.015);
 expect(relaxing).toBeGreaterThan(contracted);
 expect(relaxing).toBeLessThan(resting+.01);
});
