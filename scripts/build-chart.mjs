import { readFile, writeFile } from "node:fs/promises";
import { project } from "../src/chart-geometry.js";
const land = JSON.parse(
  await readFile(new URL("../src/data/land.geo.json", import.meta.url), "utf8"),
);
const coastline = land.features
  .map((f) => {
    const polys =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates]
        : f.geometry.coordinates;
    return polys
      .map((poly) =>
        poly
          .map(
            (ring) =>
              ring
                .map(
                  (p, i) =>
                    `${i ? "L" : "M"}${project(p)
                      .map((v) => v.toFixed(2))
                      .join(" ")}`,
                )
                .join("") + "Z",
          )
          .join(""),
      )
      .join("");
  })
  .join("");
const names = [
  ["PERU", -73, -12],
  ["CHILE", -68, -32],
  ["ECUADOR", -76, -1],
  ["PACIFIC OCEAN", -105, -21],
  ["Cape Horn", -74, -53],
];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500"><defs><pattern id="regional-grid" width="171.43" height="187.5" patternUnits="userSpaceOnUse"><path d="M171.43 0H0V187.5" stroke="#68694b" stroke-width=".65" fill="none" opacity=".35"/></pattern><pattern id="regional-hatch" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 8L8 0" stroke="#596345" opacity=".3" stroke-width=".6"/></pattern></defs><path d="${coastline}" fill="#b1b293" stroke="#526447" stroke-width="2" fill-rule="evenodd"/><path d="${coastline}" fill="url(#regional-hatch)" fill-rule="evenodd"/><g fill="#515d42" font-family="Georgia" font-size="14" letter-spacing="3">${names
  .map(([n, lon, lat]) => {
    const [x, y] = project([lon, lat]);
    return `<text x="${x}" y="${y}">${n}</text>`;
  })
  .join("")}</g></svg>`;
await writeFile(
  new URL("../public/assets/regional-coast.svg", import.meta.url),
  svg,
);
