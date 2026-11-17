const asset = (name) => `${import.meta.env.BASE_URL}assets/archive/${name}`;
export const mapImage = asset("hartwig-ocean-currents-1892.webp");
export const skullImage = asset("gray-cetology-skull-1871.webp");
export {
  regionalChart as archivalChart,
  chartCredit as mapCredit,
} from "./regional-chart.js";
export const archivalPlate = `<figure class="anatomy-plate archival-plate beale-plate"><p class="eyebrow">THE NATURAL HISTORY OF THE SPERM WHALE / 1839</p><img src="${asset("beale-1839-fig1.webp")}" width="1980" height="570" alt="Beale’s original lettered outline of a sperm whale, Figure 1, from his 1839 natural history" decoding="async"/><figcaption><p class="plate-key">a · spout-hole &nbsp; b · case &nbsp; f · fin</p><p>A body divided into names and measures.<br>Beyond the plate, a living animal remains.</p><a href="https://wellcomecollection.org/works/r9yqq4dt" target="_blank" rel="noopener noreferrer">Thomas Beale, 1839, p. 23 · Wellcome Collection</a><p class="citation">Public domain · cropped; source scan clips the far-left fluke tip.</p><a href="${asset("beale-1839-p23-source.jpg")}" target="_blank" rel="noopener noreferrer">See the full source page ↗</a></figcaption></figure>`;
