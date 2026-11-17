import { chartWidth, chartHeight, routeCoordinates } from "./chart-geometry.js";
export { routeCoordinates } from "./chart-geometry.js";
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
export const regionalChart = `<div class="map archival-map regional-map" role="img" aria-label="Actual 1844 Norie nautical chart of the Pacific, following the coast past Peru and Chile; red route is a modern interpretation"><img class="chart-engraving" src="${import.meta.env.BASE_URL}assets/archive/norie-1844-pacific-east.webp" width="2400" height="3521" alt="" aria-hidden="true" fetchpriority="high" decoding="async"/><svg class="route-layer" viewBox="0 0 ${chartWidth} ${chartHeight}" aria-hidden="true"><path id="route" d="${route}" fill="none" stroke="#a33c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${points[0][0]}" cy="${points[0][1]}" r="4" fill="#a33c2b"/></svg></div>`;
export const chartCredit = `<p class="archive-map-credit">Norie & Co. · Pacific nautical chart, 1844 · Boston Public Library<br>Red line: interpretive voyage, not exact Pequod coordinates</p>`;
