# Moby-Dick — Into the Unmeasured

A working single-page prototype following `moby-dick-prototype-brief-v0.md`.
An original parchment chart yields to a dark ocean and a layered sperm whale / giant squid reconstruction. Scroll position drives route drawing, map panning, dissolution, depth, and descent. Scrolling backward reverses the timeline. No accounts, API keys, backend, audio, or paid services.

## View the prototype

Requires Node.js 20.19+ or 22.12+ (developed with Node 24).

```sh
npm ci
npm run dev -- --port 5173
```

Open http://localhost:5173 in your browser. In a cloud workspace, keep this command running and forward port **5173** using your workspace's port forwarding UI; open its forwarded address. A localhost address on your own machine does not automatically reach the cloud machine.

## Production preview and deployment

```sh
npm run build
npm run preview -- --port 4173
```

Open http://localhost:4173 locally, or forward cloud port **4173**. Deploy the generated `dist/` directory with any static host. For Netlify or Cloudflare Pages, use build command `npm run build`, output directory `dist`. For Vercel use its Vite preset. No environment variables required. This repository does not automatically publish a deployment.

## Tests

```sh
npx playwright install chromium
npm test
```

Tests use `/usr/bin/chromium` when available; set `CHROMIUM_PATH` to override. Otherwise Playwright uses its installed Chromium. Automated desktop (1440×900) and mobile (390×844) checks cover route advancement/reversal, intermediate blending, 1,800 m arrival, dialogs and Escape dismissal, overflow, script errors, keyboard skip, and reduced motion. Screenshots are written to ignored `test-results/`.

### Manual review checklist

- [ ] Scroll slowly through the full sequence, then reverse: route retracts, water recedes, chart returns without a cut.
- [ ] Refresh midway and at the bottom; resize and rotate a mobile viewport; verify coherent progress.
- [ ] Use touch and mouse to open The Chart and encounter notes; close with the visible × and Escape.
- [ ] Navigate using Tab/Shift+Tab, Enter and Escape: visible focus, modal focus containment and restoration, skip link reaches the passage.
- [ ] Enable reduced motion: atmospheric drift stops, map panning stops, shorter timeline preserves content. Skip the voyage for immediate text.
- [ ] Check iOS Safari, desktop Safari, Firefox and Chrome, including 200% zoom and a narrow screen. Chromium is automated; other engines require manual verification.
- [ ] Review literary text and source links; distinguish interpretive geography and reconstruction from documented history.

## Sources, assets, and rights

- Literary quotation verified against Project Gutenberg eBook #2701, Chapter 44: “Almost every night some pencil marks were effaced, and others were substituted.” [Full chapter](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0044). [GITenberg mirror used for verification](https://github.com/GITenberg/Moby-Dick--Or-The-Whale_2701/blob/master/2701-h/2701-h.htm). Melville's 1851 text is public domain in the US; consult local law elsewhere. Interpretive prose is original.
- All map, whale, squid and texture artwork is original inline SVG/CSS created for this prototype. No third-party image assets. The simplified chart is an artistic condensation, not precise geography or the documented route of the Pequod.
- Historical reference: [Maury, Whale Chart, 1851 (UWM)](https://collections.lib.uwm.edu/digital/collection/agdm/id/322). Maury's image is not embedded or represented as Ahab's chart.
- Encounter interpretation: [American Museum of Natural History](https://www.amnh.org/explore/videos/exhibits/the-squid-and-the-whale-evidence-for-an-epic-encounter). Indirect evidence, not an observed fight. The tableau is not to biological scale.
- Cormorant Garamond and DM Sans are bundled through Fontsource under the SIL Open Font License; license files are included with the installed `@fontsource` packages. No runtime font network requests.

## Implementation / tradeoffs

Vite and vanilla JavaScript; CSS custom properties updated once per animation frame. Native dialogs provide focus handling and keyboard dismissal. No scroll interception, WebGL, video, or animation framework. A dedicated text section provides the same literary anchor without animation. Reduced-motion users retain a shorter, scroll-linked opacity sequence with no atmospheric animation or chart panning. The original vector illustration prioritizes a lightweight, cohesive vertical slice over archival cartographic precision or photorealism. Chapter 60 is a future editorial direction, not a nonfunctional control.
