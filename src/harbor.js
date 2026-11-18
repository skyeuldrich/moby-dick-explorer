import { barberHarbor } from './barber-harbor.js';
import './harbor.css';

// A modern extension of the engraved water. Mirror a small open-water sample
// from Barber so the original incisions carry into the passing swell.
const sample = '<svg width="320" height="64" viewBox="500 1390 740 126" preserveAspectRatio="none"><use href="#barber-sheet"/></svg>';
const texture = `<pattern id="barber-water" width="640" height="128" patternUnits="userSpaceOnUse">
  <g id="barber-water-row">${sample}<g transform="translate(640 0) scale(-1 1)">${sample}</g></g>
  <use href="#barber-water-row" transform="translate(0 128) scale(1 -1)"/>
</pattern>`;

// Curved hatch marks gather at the lip of the wave and flatten toward its back.
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
const strokes = Array.from({length:52}, (_, i) => {
  const depth = 8 + 194 * Math.pow(i / 52, .86);
  const dash = 3 + ((i * 53) % 89);
  return `<path d="${contour(depth)}" stroke-width="${i < 10 ? .6 : 1.2}" stroke-dasharray="${dash} ${7 + i % 19} ${dash * 1.7} ${13 + i % 27}" opacity="${(.12 + .65 * i / 52).toFixed(2)}"/>`;
}).join('');

const wave = `<svg class="harbor-wave" viewBox="0 -1 1440 260" preserveAspectRatio="none" aria-hidden="true">
  <defs><clipPath id="swell-edge"><path d="${lip} L1456,-2 H-16Z"/></clipPath></defs>
  <g clip-path="url(#swell-edge)"><rect y="-2" width="1440" height="262" fill="#dcdcd8"/>
  <rect width="1440" height="260" fill="url(#barber-water)" opacity=".2"/>
  <g fill="none" stroke="#454642">${strokes}<path d="${lip}" stroke-width="1"/></g></g></svg>`;

const quotation = (id, words) => `<blockquote class="island-quote ${id}"><p>“${words}”</p>
  <cite>Ishmael · Chapter 14, “Nantucket”</cite></blockquote>`;

export const harborScene = `<section class="harbor-scene" aria-label="Nantucket departure">
  <div class="harbor-page">
    <svg class="harbor-water" aria-hidden="true"><defs>${texture}</defs><rect width="100%" height="100%" fill="url(#barber-water)"/></svg>
    ${barberHarbor}
    ${quotation('harbor-livelihood', 'What wonder, then, that these Nantucketers, born on a beach, should take to the sea for a livelihood!')}
    ${quotation('harbor-invitation', 'Nantucket! Take out your map and look at it.')}
    ${wave}
  </div>
</section>`;
