import {expect} from '@playwright/test';

export async function seek(page, progress) {
  const expected=await page.evaluate(p => {
    const section = document.querySelector('#voyage');
    const fraction = (p <= .72 ? p : .72 + (p - .72) * 3) / 1.56;
    const range = section.offsetHeight - document.querySelector('.stage').offsetHeight;
    scrollTo(0, section.offsetTop + range * fraction);
    const distance=(scrollY-section.offsetTop)/range*1.56;
    return Number((distance<=.72 ? distance : .72+(distance-.72)/3).toFixed(5));
  }, progress);
  await expect.poll(async () => Number(await page.locator('.stage').getAttribute('data-progress'))).toBe(expected);
}
