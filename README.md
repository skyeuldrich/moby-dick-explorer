# Moby-Dick — Into the Unmeasured

Prototype v0.4 follows `moby-dick-prototype-brief-v0.4.md`. See [specialist findings and implementation](docs/prototype-v04-review.md) and [current asset/source audit](docs/asset-sources.md#v04-superseding-source-audit-and-visible-assets).

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

Open http://localhost:4173 locally, or forward cloud port **4173**. Deploy the generated `dist/` directory with any static host. For Netlify or Cloudflare Pages, use build command `npm run build`, output directory `dist`. For Vercel use its Vite preset. No environment variables required. Pushes to `main` run the checked GitHub Pages deployment workflow; feature branches do not deploy over the live site.

## Tests

```sh
npx playwright install chromium
npm test
```

Tests use `/usr/bin/chromium` when available; set `CHROMIUM_PATH` to override. Otherwise Playwright uses its installed Chromium. Automated desktop (1440×900) and mobile (390×844) and narrow-phone (360×640) checks cover the complete sequence, route advancement/reversal, intermediate blending, 1,800 m arrival, dialogs and Escape dismissal, overflow, script errors, keyboard skip, reduced motion, focus restoration, refresh/resize, wheel continuity and emulated touch swipes. Screenshots are written to ignored `test-results/`.

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
- The descent quotation is verified in [Project Gutenberg #2701, Chapter 41](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0041): “all my means are sane, my motive and my object mad.” Ishmael imagines Ahab’s thought; it is not spoken dialogue.
- The current whale plate is Beale’s genuine 1839 sperm-whale outline, served locally. The moving map is William Heather’s genuine 1797 Atlantic sea chart from Boston Public Library / the Norman B. Leventhal Map & Education Center, served locally as a complete reduced sheet. It begins at Nantucket and follows the early voyage toward the Azores and Cape Verde. The catalogue states “No known copyright restrictions. No known restrictions on use.” See [asset sources](docs/asset-sources.md) and `public/assets/archive/manifest.json` for provenance, dates, rights evidence and exact hashes. The continuous red route is a modern interpretation registered to the printed coast and checked against independently traced land envelopes; there is no projection break. The older Hartwig map and Gray skull are retained only as prior-iteration assets. Ocean life and candle remain original reconstructions. The final encounter uses the owner-supplied painterly WebP.
- Historical reference: [Maury, Whale Chart, 1851 (UWM)](https://collections.lib.uwm.edu/digital/collection/agdm/id/322). Maury's image is not embedded or represented as Ahab's chart.
- Encounter interpretation: [American Museum of Natural History](https://www.amnh.org/explore/videos/exhibits/the-squid-and-the-whale-evidence-for-an-epic-encounter). Indirect evidence, not an observed fight. The tableau is not to biological scale.
- Cormorant Garamond and DM Sans are bundled through Fontsource under the SIL Open Font License; license files are included with the installed `@fontsource` packages. No runtime font network requests.

## Implementation / tradeoffs

Vite and vanilla JavaScript; cached scene geometry and local opacity/transform updates rendered at most once per animation frame. Native dialogs provide focus handling and keyboard dismissal. No scroll interception, WebGL, video, or animation framework. Native touch remains one-to-one; desktop wheel visuals use a brief 65 ms catch-up. Filtered full-screen artwork has been removed to reduce rendering cost. A dedicated text section provides the same literary anchor without animation. Reduced-motion users retain a shorter, scroll-linked opacity sequence with no atmospheric animation or chart panning. The displayed Beale plate is from 1839, preceding the novel, with a disclosed crop and inherited scan-edge limitation. Prior later-century assets remain archived in the repository. The final tableau uses the project owner’s supplied painting, presented as an artistic reconstruction. The candle holder and manuscript facsimile research remain unfinished; the chart and Beale plate are verified archival scans. Chapter 60 is a future editorial direction, not a nonfunctional control.

## GitHub Pages preview

The `Deploy literary prototype` workflow tests and builds pull requests, then deploys successful `main` builds to GitHub Pages. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Merge the workflow, then watch **Actions → Deploy literary prototype**. The successful deployment's `github-pages` environment shows the published URL (expected: https://skyeuldrich.github.io/moby-dick-explorer/). This URL is not live until deployment succeeds. Pages must be available for the repository's visibility and GitHub plan.

To reproduce that production path locally:

```sh
npm run build -- --base=/moby-dick-explorer/
npm run preview -- --port 4173 --base=/moby-dick-explorer/
```

Open http://localhost:4173/moby-dick-explorer/ (or the corresponding forwarded cloud address). Both commands must use the same base path. Changing the repository name or attaching a custom domain requires updating the workflow's `--base` value.

## Historical asset branch

The historical-asset pass is preserved in Git history. v0.4 restores Nantucket, retains Chapter 44, adds the Chapter 41 descent, and replaces the displayed skull with Beale’s period sperm-whale figure. See [the asset manifest](docs/asset-sources.md) for selected archival sources, pending verification and visual review choices. Verify local asset integrity with `node scripts/verify-assets.mjs`. Current order: darkness → desk → Nantucket → Atlantic voyage → Beale → extended descent and Chapter 41 → progressive whale/squid encounter.

### Previous archival chart correction (superseded by the Atlantic opening)

The voyage now moves over *The southern or lower part of the Pacific Ocean* (J.W. Norie & Co. / Charles Wilson, 1844; “Additions 1839 & 44”), rather than a new coastline drawing. [Institutional record and rights](https://collections.leventhalmap.org/search/commonwealth:vt154w90j). The crop retains actual engraving, creases, repairs, and manuscript marks. The original pencil ship tracks/whale sightings have no separately established date or vessel attribution; our red line is a separate modern overlay. The camera follows the printed coast past Peru toward Chile and reverses with native scrolling. Reduced motion keeps the sheet still. No runtime image service or map framework is used.

The served scan is 2400×3521 (1.50 MB WebP); its unmodified IIIF source crop and institution manifest are retained locally for audit. Tests check the actual raster hash, source links, land avoidance in scan coordinates, camera coverage at desktop/phone widths, reversal, and reduced-motion stability. See [asset sources](docs/asset-sources.md#archival-chart-correction--norie-1844) for exact crop and rights evidence.

### Nantucket and the actual early voyage

The current moving chart is [William Heather, *A new chart of the Atlantic or Western Ocean*, 1797](https://collections.leventhalmap.org/search/commonwealth:kk91fr56g). It replaces the Pacific opening with **Nantucket → southward Atlantic passage → off the Azores → off Cape Verde**, based on complete readings of chapters 1–68 and the explicit cruising-ground sequence in chapter 51. The line between named grounds is reconstructed because Melville supplies no exact ship fixes. The chart does not pretend to show the later Plate / Carrol / Good Hope / Crozets / Indian Ocean legs; those are documented in the page’s accessible route reading and field notes.

See [the first-half route evidence](docs/pequod-route-first-half.md) and [asset provenance](docs/asset-sources.md#nantucket--atlantic-correction--william-heather-1797). The original full-sheet JPEG, optimized 1.93 MB WebP, and institutional rights manifest are local. Keyboard/reduced-motion paths remain available; the direct `#chart` link opens near the departure. The Beale plate and abyss retain their existing order.

### Previous opaque abyss artwork (superseded by Issue10)

The final encounter now uses `public/assets/moby-dick-abyss-whale-squid.webp` (1672×941, 166,290 bytes), supplied and approved by the project owner. The file is unchanged. It replaces the inline SVG animals while retaining the scroll-driven movement, fade, mobile framing, and reversible transition. The viewport progressively uncovers the painting as it rises from below, revealing the whale before the lower squid; reduced motion removes travel. The complete composition fits at the ending, including narrow and landscape screens. Static edge feathering blends the sheet into the abyss.

[Artwork provenance](docs/asset-sources.md#owner-supplied-whale-and-squid-painting). The test suite verifies the original file hash, local loading, staged reveal, reversal, responsive bounds/aspect ratio, reduced motion, and existing scene/literary behavior. The painting is not claimed to be an archival plate or a directly observed encounter.

### Issue10 asset and motion revision

The final encounter uses the transparent `moby-dick-whale-squid-final.webp`; the candle uses `moby-dick-spermaceti-candle-study.webp`. Both are AI-assisted modern reconstructions. Opening sea life swims with reversible scroll progress, with attached lights and reduced-motion support. The harbor image selection remains pending founder review: private neutral-grayscale previews compare the 1917 fishing fleet and Barber’s 1839 engraving. No unapproved or rights-unresolved photograph is deployed. See [implementation and source notes](docs/issue10-implementation.md).

### Barber’s animated archival harbor

The founder selected Barber’s 1839 Nantucket engraving and asked for its own gulls to wheel with scrolling. The harbor now uses that public-domain print with three original-image bird cutouts on subtle reversible paths. The original page is preserved and linked; reduced motion restores the untouched birds. See [source and adaptation notes](docs/barber-animated-gulls.md).

## Deep-sea motion review

The three approved painterly organisms and spatial whale/squid reveal are documented in [Issue 14 implementation and scientific references](docs/issue14-implementation.md). They are modern artistic reconstructions with biology-informed 2D movement, not archival plates or exact species simulations.
