import { test, expect } from '@playwright/test';
for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
 test(`voyage, discovery and reversal at ${viewport.width}px`,async({page})=>{
  await page.setViewportSize(viewport); const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('heading',{name:'Moby—Dick'})).toBeVisible();
  const start=await page.locator('#route').evaluate(e=>+getComputedStyle(e).strokeDashoffset.replace('px',''));
  await page.getByRole('button',{name:/01 \/ A DISCOVERY/}).click();await expect(page.locator('#discovery')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.locator('#discovery')).not.toBeVisible();
  await page.screenshot({path:`test-results/chart-${viewport.width}.png`});
  await page.evaluate(()=>scrollTo(0,(document.querySelector('#voyage').offsetHeight-innerHeight)*.45));await page.waitForTimeout(120);
  expect(await page.locator('#route').evaluate(e=>+getComputedStyle(e).strokeDashoffset.replace('px',''))).toBeLessThan(start);
  const opacity=await page.locator('.chart').evaluate(e=>+getComputedStyle(e).opacity);expect(opacity).toBeGreaterThan(0);expect(opacity).toBeLessThan(1);
  await page.screenshot({path:`test-results/threshold-${viewport.width}.png`});
  await page.evaluate(()=>scrollTo(0,document.querySelector('#voyage').offsetHeight-innerHeight));await page.waitForTimeout(120);
  await expect(page.locator('.depth-value')).toHaveText('1,800 M');await page.screenshot({path:`test-results/abyss-${viewport.width}.png`});
  await page.getByRole('button',{name:'On this encounter'}).click();await expect(page.locator('#notes')).toBeVisible();await page.keyboard.press('Escape');
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(120);expect(await page.locator('.chart').evaluate(e=>+getComputedStyle(e).opacity)).toBe(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
 });
}
test('keyboard skip and reduced motion retain literary content',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();await page.keyboard.press('Enter');await expect(page).toHaveURL(/#literary/);await expect(page.getByRole('heading',{name:'The will to map the unknown.'})).toBeInViewport();expect(await page.locator('.whale').evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
});
