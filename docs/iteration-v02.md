# Prototype v0.2 — review notes

## Implemented

Blackness → scroll-kindled candle → representative whaling trade document with three short facts → original period-informed Nantucket harbor with three scroll-circling gulls → extended red-route chart → anatomical study → chart dissolving into water → whale/squid abyss. Chapter 44, source notes, native dialogs, skip-to-text, and reduced motion remain. A keyboard-accessible return restores focus to the chart discovery.

The ledger is explicitly a representative layout. No facsimile or historical quotation has been fabricated. The harbor is labeled an artistic reconstruction, circa 1840s–1850s, rather than a particular year or faithful topographic view. All new art is original SVG/CSS; no asset requests, animation dependencies or paid services were introduced.

The chart uses about 640 viewport-heights of route travel, versus roughly 225 in v0.1 (about 2.8×). North Atlantic, South Atlantic, Indian Ocean and open-water notes punctuate the journey. Red-route coordinates remain interpretive.

## Why scrolling stuttered / what changed

The old renderer read `getBoundingClientRect` and `offsetHeight` on each scroll frame; wrote inherited CSS variables to the document root; replaced depth and phase text repeatedly; and moved the depth marker through `top`. Full-screen masks, filters, blurred light and filtered grain added rendering work. Animated particles and SVGs continued updating while hidden. The old progress denominator used changing `innerHeight`, which can remap progress when mobile browser chrome expands/collapses.

The replacement caches geometry, uses stable `svh` section/stage sizes, ignores touch browser-chrome-only resize events, and batches local changes in one requested animation frame. It caches DOM references and property values, avoids unchanged text writes, moves the depth marker with a transform, removes full-screen filters/masks, and stops hidden gull updates. Visible chart dash drawing still needs SVG paint; this is a lightweight prototype, not a claim of zero rendering work.

Touch retains native one-to-one progress. Discrete desktop wheel steps get 65 ms exponential visual catch-up without changing the browser’s scroll position. The frame loop stops once settled. Reduced motion disables interpolation and camera/gull motion, with a shorter timeline. Anchor jumps and page restoration derive from actual position rather than replaying an animation.

## Measured evidence

Same Chromium environment, 390×844 mobile emulation, DPR 3, 4× CPU throttle; four-second requestAnimationFrame-driven traversal of the whole sequence. This is a reproducible synthetic stress comparison, not physical phone FPS or proof of universal 60 FPS. The revised sequence is longer and contains more scenes. Results vary with machine load.

| Observation | v0.1 baseline | v0.2 final isolated run |
| --- | ---: | ---: |
| Frame callbacks | 86 | 235 |
| 95th-percentile frame interval | 83.3 ms | 16.8 ms |
| Gaps over 50 ms | 22 | 2 |
| Chrome layout count | 174 | 82 |
| Main-thread task time | 3.916 s | 1.492 s |

Run `node scripts/measure-scroll.mjs` with the dev server on port 5173. It uses browser counters and frame timestamps; it does not collect production visitor data.

Seven Playwright checks cover desktop/mobile scenes, route advance/reversal and dissolve, all existing dialogs, focus restoration, skip-to-text, reduced motion, refresh/resize, synthetic CDP touch swipes, wheel continuity/reversal, and short-phone/landscape document fit. Screenshots for darkness, candle, harbor, chart, anatomical study, threshold and abyss are generated under `test-results/` at desktop and phone sizes. Actual iOS Safari, Android hardware, Safari and Firefox are not tested here.

## Historical sources and rights

- New Bedford Whaling Museum: [whales and hunting](https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/) and [life aboard](https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/) are the brief’s contextual sources for oil, spermaceti candles and lay shares. No numerical whale-value estimate or voyage yield is asserted.
- Melville, *Moby-Dick* (1851), chapters 6 (“The Street”), 16 (“The Ship”), 25 (“Postscript”), 44 (“The Chart”) and 96 (“The Try-Works”): contemporary **literary** evidence for the trade, lays, lighting and processing, not a statistical history. Text checked through the [GITenberg Gutenberg #2701 mirror](https://github.com/GITenberg/Moby-Dick--Or-The-Whale_2701/blob/master/2701-h/2701-h.htm). Chapter 16 describes the lay as a proportion of profits; the fictional negotiated shares are not generalized as typical crew wages.
- Harbor: [Nantucket Historical Association](https://nha.org/research/nantucket-history/history-topics/the-great-fire-of-1846/) for 1846 fire context; the brief’s [CLIR logbooks and ships’ papers project](https://registry.clir.org/projects/2374/) identifies further primary materials. Gabled timber warehouses, casks, timber wharves, narrow hulls, square rigging and furled canvas are reconstructed motifs, not traced from an identified waterfront image.
- Anatomy: Thomas Beale, *The Natural History of the Sperm Whale* (1839), [Wellcome](https://wellcomecollection.org/works/r9yqq4dt), [BHL](https://www.biodiversitylibrary.org/item/192636). Beale is named in Melville’s Extracts and Cetology. The new labeled drawing emphasizes the large blunt head, narrow lower jaw, small flipper and low dorsal hump. It is not a facsimile of Beale’s plate or a licensed reproduction.
- Existing Maury chart, Gutenberg quotation and AMNH reconstruction references remain in README and the site’s field notes. Existing Fontsource OFL fonts remain locally bundled.

**Research limitation:** Boom Supersonic’s live reference and the museum, Wellcome, BHL and NHA sites returned proxy/network 403 errors. Chromium also failed to navigate to the Boom reference. I could not inspect its live mobile scroll behavior, verify archive images, or rights-check original scans. Consequently none are embedded or claimed as inspected. Primary-source text was accessible via the Gutenberg GitHub mirror. Direct archival comparison, a historian’s review of the new illustration, and real-device Safari testing remain outstanding.

## Review / preview

Use the feature branch `feat/candle-harbor-voyage-v02`. Run `npm ci` then `npm run dev -- --port 5173`. Open localhost:5173 locally, or forward port 5173 from the cloud workspace. For a Pages-path production preview, run the paired build/preview commands in README. Existing published v0.1 is preserved; this branch is not automatically deployed over it. The current environment offers no public preview-forwarding tool.
