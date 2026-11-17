// Positions are registered directly to the BPL scan, not to modern geography.
// The displayed scan is 2400 × 3521; its CSS/SVG space is exactly half-size.
export const chartWidth = 1200;
export const chartHeight = 1760.5;
// Avoid revealing the scan's outer black photography surround during panning.
export const chartInterior = { left: 0, top: 60, right: 1170, bottom: 1700 };
// Modern interpretive offshore leg, manually registered to the printed coast.
// No claim of precise Pequod positions, or authorship of the sheet's pencil marks.
export const routeCoordinates = [
  [610, 285],
  [605, 340],
  [620, 405],
  [660, 475],
  [715, 545],
  [770, 615],
  [805, 690],
  [810, 765],
  [795, 850],
];
export const chartSource = 'https://collections.leventhalmap.org/search/commonwealth:vt154w90j';
