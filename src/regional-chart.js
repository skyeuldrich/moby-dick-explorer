import { project, routeCoordinates } from "./chart-geometry.js";
export { project, routeCoordinates } from "./chart-geometry.js";
const points = routeCoordinates.map(project);
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
export const regionalChart = `<div class="map archival-map regional-map" role="img" aria-label="Original Pacific coastal chart study and continuous interpretive offshore route"><img class="chart-engraving" src="${import.meta.env.BASE_URL}assets/regional-coast.svg" width="1200" height="1500" alt="" aria-hidden="true"/><svg class="route-layer" viewBox="0 0 1200 1500" aria-hidden="true"><path id="route" d="${route}" fill="none" stroke="#a33c2b" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${project(routeCoordinates[0])[0]}" cy="${project(routeCoordinates[0])[1]}" r="4" fill="#a33c2b"/></svg></div>`;
export const chartCredit = `<p class="archive-map-credit">Pacific coastal study · interpretive voyage, not exact Pequod coordinates<br>Original period-inspired drawing · Natural Earth public-domain geography</p>`;
