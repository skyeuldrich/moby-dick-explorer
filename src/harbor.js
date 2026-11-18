import { barberHarbor } from './barber-harbor.js';
import './harbor.css';

// A modern extension of the engraved water. Mirror a small open-water sample
// from Barber so the original incisions carry into the passing swell.
const sample = '<svg width="320" height="64" viewBox="500 1390 740 126" preserveAspectRatio="none"><use href="#barber-sheet"/></svg>';
const texture = `<pattern id="barber-water" width="640" height="128" patternUnits="userSpaceOnUse">
  <g id="barber-water-row">${sample}<g transform="translate(640 0) scale(-1 1)">${sample}</g></g>
  <use href="#barber-water-row" transform="translate(0 128) scale(1 -1)"/>
</pattern>`;

// Only the clipping silhouette is authored. All visible hatch ink is sampled
// from Barber, and travels with the harbor in the shared image-space group.
function level(x, depth) {
  const bend = 32 * Math.sin(x / 245) + 16 * Math.sin(x / 106 - depth / 130);
  return depth + bend * Math.pow(depth / 200, 1.25);
}
function contour(depth) {
  const points = [];
  for (let x = -16; x <= 1456; x += 8) points.push(`${x},${level(x, depth).toFixed(1)}`);
  return 'M' + points.join(' L');
}
const lip = contour(200);

const wave = `<svg class="harbor-wave" viewBox="0 -1 1440 260" preserveAspectRatio="none" aria-hidden="true">
  <defs><clipPath id="swell-edge"><path d="${lip} L1456,-2 H-16Z"/></clipPath></defs>
  <g clip-path="url(#swell-edge)"><rect y="-2" width="1440" height="262" fill="#dcdcd8"/>
  <rect width="1440" height="260" fill="url(#barber-water)" opacity=".38"/></g></svg>`;

const quotation = (id, words) => `<blockquote class="island-quote ${id}"><p>“${words}”</p>
  <cite>Ishmael · Chapter 14, “Nantucket”</cite></blockquote>`;

export const harborScene = `<section class="harbor-scene" aria-label="Nantucket departure">
  <div class="harbor-page">
    <div class="harbor-ink">
    <svg class="harbor-water" aria-hidden="true"><defs>${texture}</defs><rect width="100%" height="100%" fill="url(#barber-water)"/></svg>
    ${barberHarbor}
    ${wave}
    </div>
    ${quotation('harbor-livelihood', 'What wonder, then, that these Nantucketers, born on a beach, should take to the sea for a livelihood!')}
    ${quotation('harbor-invitation', 'Nantucket! Take out your map and look at it.')}
  </div>
</section>`;
