import {
  chartWidth,
  chartHeight,
  routeCoordinates,
  routeLandmarks,
} from "./chart-geometry.js";
export { routeCoordinates } from "./chart-geometry.js";
import { graphiteMarks } from "./chart-annotations.js";
const points = routeCoordinates;
const route =
  `M${points[0].join(" ")}` +
  points
    .slice(0, -1)
    .map((p, i) => {
      const prev = points[Math.max(0, i - 1)],
        next = points[i + 1],
        after = points[Math.min(points.length - 1, i + 2)];
      return `C${p.map((v, j) => v + (next[j] - prev[j]) / 6).join(" ")} ${next.map((v, j) => v - (after[j] - p[j]) / 6).join(" ")} ${next.join(" ")}`;
    })
    .join("");
const landmarks = routeLandmarks
  .map(
    ({ id, label, point: [x, y], chapter }) =>
      `<g class="route-landmark" data-waypoint="${id}" data-chapter="${chapter}"><circle cx="${x}" cy="${y}" r="3"/><text x="${x + 9}" y="${y - 9}">${label}</text></g>`,
  )
  .join("");
export const regionalChart = `<div class="map archival-map regional-map" role="img" aria-label="Actual 1797 Atlantic sea chart: the Pequod departs Nantucket, sails southward, then cruises off the Azores and Cape Verde as named by Melville; red connecting track reconstructed; gray hypotheses are modern editorial sketches"><img class="chart-engraving" src="${import.meta.env.BASE_URL}assets/archive/heather-1797-atlantic.webp" width="4001" height="3031" alt="" aria-hidden="true" fetchpriority="high" decoding="async"/><svg class="route-layer" viewBox="0 0 ${chartWidth} ${chartHeight}" aria-hidden="true">${graphiteMarks}<path id="route" d="${route}" fill="none" stroke="#a33c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>${landmarks}</svg></div>`;
export const chartCredit = `<p class="archive-map-credit">William Heather · Atlantic sea chart, 1797 · Boston Public Library<br>Melville’s named grounds · connecting track reconstructed</p>`;
