// Register the route to Heather's actual 1797 chart, not modern coast geometry.
// Full-sheet source: 4001 × 3031. SVG/CSS space has the identical aspect ratio.
export const chartWidth = 1200;
export const chartHeight = (3031 * chartWidth) / 4001;
export const chartInterior = { left: 30, top: 30, right: 1170, bottom: 880 };
export const chartSource =
  "https://collections.leventhalmap.org/search/commonwealth:kk91fr56g";
// Ch22: Nantucket; ch28: southward; ch51: off Azores, then off Cape Verde.
// Positions BETWEEN named grounds are reconstructions, not textual ship fixes.
// Start just seaward of the chart's small Nantucket island; no invented pilot log.
export const routeCoordinates = [
  [265, 380],
  [273, 389],
  [285, 408],
  [330, 427],
  [425, 438],
  [540, 442],
  [650, 447],
  [710, 470],
  [726, 515],
  [730, 565],
  [724, 620],
  [710, 665],
  [710, 708],
];
export const routeLandmarks = [
  {
    id: "nantucket",
    label: "Nantucket",
    point: routeCoordinates[0],
    chapter: 22,
  },
  {
    id: "azores",
    label: "Off the Azores",
    point: routeCoordinates[7],
    chapter: 51,
  },
  {
    id: "cape-verde",
    label: "Off Cape Verde",
    point: routeCoordinates.at(-1),
    chapter: 51,
  },
];
