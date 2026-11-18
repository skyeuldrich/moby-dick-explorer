const archive = `${import.meta.env.BASE_URL}assets/archive/`;
const birds = [
  { x: 1712, y: 677, width: 66, height: 36 },
  { x: 1846, y: 804, width: 90, height: 63 },
  { x: 2006, y: 867, width: 55, height: 31 },
];

function detail(kind, bird, index) {
  return `<image href="${archive}barber-gulls/${kind}-${index + 1}.png" x="${bird.x}" y="${bird.y}" width="${bird.width}" height="${bird.height}"/>`;
}

// Local paper repairs remain fixed. Each moving sprite contains only the
// bird's ink. Reduced motion displays the original, unaltered plate.
export const barberHarbor = `<svg class="harbor-art barber-harbor" viewBox="370 390 3130 1120"
  preserveAspectRatio="xMidYMid slice" role="img" aria-label="Animated adaptation of John Warner Barber’s 1839 South-Eastern View of Nantucket; three original engraved gulls wheel gently with scrolling">
  <defs>
    <clipPath id="barber-window"><rect x="370" y="390" width="3130" height="1120"/></clipPath>
    <image id="barber-sheet" style="filter:grayscale(1)" href="${archive}barber-1839-source.jpg" width="2302" height="4031" transform="matrix(0 -1 1 0 0 2302)"/>
  </defs>
  <g clip-path="url(#barber-window)">
    <use href="#barber-sheet"/>
    <g class="barber-adaptation" aria-hidden="true">
      ${birds.map((bird, index) => detail('sky', bird, index)).join('')}
      ${birds.map((bird, index) => `<g class="engraved-gull" data-bird="${index}"
        style="transform-origin:${bird.x + bird.width / 2 - 370}px ${bird.y + bird.height / 2 - 390}px">
        ${detail('gull', bird, index)}
      </g>`).join('')}
    </g>
  </g>
</svg>`;
