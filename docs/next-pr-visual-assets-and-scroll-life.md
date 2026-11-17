# Next PR — Historical imagery, candlelight, and swimming deep-sea creatures

**Status:** Founder-requested implementation checklist; no artwork swap or motion code has been applied by this document.  
**Base:** latest `main` of `skyeuldrich/moby-dick-explorer`.  
**Scope:** one focused visual revision, not a redesign or new literary module.

## Overall direction

The founder likes the site's experience but considers the current candle and Nantucket scene too diagrammatic. Replace those with convincing archival or materially realistic imagery, keep the scroll journey and editorial information intact, and make the tiny creatures in the opening darkness **swim in response to scroll progress** before candlelight erases them.

**Priority order:**
1. Use the already-uploaded **transparent whale + squid artwork** in the abyss.
2. Make the candle physically believable, using a new high-quality isolated candle image if it improves the result.
3. Replace the generic Nantucket SVG harbor with a genuine dated historical illustration or early photograph.
4. Give the dark-water organisms subtle, distinct scroll-linked swimming motions; lights stay attached to their owners.
5. Verify mobile layout, performance, and historical attribution.

### 1. Swap the whale/squid artwork: required

- The repository already contains **`public/assets/moby-dick-whale-squid-final.webp`** (~379 KB). This is the founder-approved later version, with **transparent background**. Use **this file**, not `moby-dick-abyss-whale-squid.webp` (the older dark-background version).
- `src/main.js` currently renders `<figure class="creatures encounter-artwork"><img ... src="...assets/moby-dick-abyss-whale-squid.webp"...></figure>`. Change the source to the **final** file, preserving accessible alt text.
- In CSS, ensure the scene uses the image's alpha transparency so no rectangular image boundary is visible against the ocean at any scroll position. **Do not put a solid background on the image element or parent, and do not attempt a dark box fade that exposes the image bounds.**
- Keep existing progressive/reversible reveal, timing and Chapter 44 interaction. Ensure whale head, squid eye and feeding tentacles remain visible on desktop and reasonably framed on mobile; never crop without reviewing both animals.
- Update asset credit to **original AI-assisted, period-inspired illustration**, not archival historical art.

### 2. Replace / substantially improve the candle: required visual result

**Problem:** Screenshot shows a tiny, smooth vector candle in an unconvincing brass holder, disconnected from the desk and broad light pool.

- Reference the **new candidate transparent 1024×1536 candle study generated in the ChatGPT Project**. If attached to the Codex task, add its web-optimized `moby-dick-spermaceti-candle-study.webp` to `public/assets/`; if absent, do not fabricate having received it. Ask founder to attach or develop an equally convincing replacement and make the limitation explicit.
- Candidate features: ivory taper with modest irregular wax surface, dark wick, restrained warm flame with blue base, aged brass chamberstick and loop handle, wear/patina. This is a **modern artistic reconstruction**, not an archival photograph of a proven historic candle.
- Physically seat holder onto the timber desk with correct scale, contact shadow and perspective. It should look like a real object on the same surface as the manuscript, not a vector sprite floating against a gradient.
- The glow must **begin creeping upward from the bottom on the first small downward scroll**, then grow across the scene and illuminate actual desk grain and manuscript. Separate the **physical candle asset** from its **CSS/composited ambient illumination** so light is responsive to scroll and can pass over the desk and paper in a coherent falloff. Consider a faint dynamic flame wobble with transform/opacity, without shifting the holder.
- Respect `prefers-reduced-motion`: hold a still, readable candlelit composition with no distracting flame motion.
- On mobile, keep candle large enough to read and prevent the candle/manuscript from colliding; verify light and paper contrast. Don't replace the entire scene with a static raster screenshot.

### 3. Replace Nantucket SVG: new photo preference and historical accuracy

**Founder update, November 17, 2026:** The founder REJECTS the previously suggested yellow-toned historical photograph as the final artwork. The NEW preferred *composition* is the uploaded panoramic postcard photograph titled in handwriting **"No. 2749"**, featuring a sheltered basin, a dense forest of sailing masts on both shores, small boats in the foreground and open sky. File attached in the ChatGPT discussion as `PC-easybasin-1.jpg`. Source: https://nantucketpreservation.org/keeping-history-above-water-nantucket-historic-flooding-on-nantucket-part-1-7249/ ; image URL: https://nantucketpreservation.org/wp-content/uploads/2019/01/PC-easybasin-1.jpg

**Essential date correction:** The historic caption identifies this exact image as **the Easy Street boat basin in 1917, with a fishing fleet sheltering during a storm** (Nantucket Historical Association collection), **not** Nantucket in the Pequod's 1840s–1850s whaling era. See also https://www.coastalresiliencewalk.org/easy-street-basin . The handwritten **No. 2749** is a photographic/collection annotation, not part of the nineteenth-century harbor. **Never display this 1917 image with the existing caption "Nantucket harbor · circa 1840s–1850s," or imply that the boats are whalers.**

**New visual requirements:**
- Remove the strong yellow/ochre/sepia color cast from whichever historical photograph is selected; render in **neutral charcoal-to-silver monochrome** with preserved photographic grain and rich tonal range. No fake AI repainting, no thick distress filter. A subtle warm candle tone is not appropriate to the harbor.
- Preserve the selected photo's deep harbor perspective, dense masts, boat silhouettes and editorial atmospheric character. Favor compositions where foreground water and upper sky give latitude for text overlays without colliding with rigging.
- Correct the current overlaid heading that crosses ships and buildings; prefer a separate text-safe region, a carefully placed dark scrim, or a clear typographic overlay outside the principal silhouettes.
- For the uploaded 1917 image, crop out the handwritten "No. 2749" if possible without harming the composition, while preserving the **unaltered** image separately and citing the scan. Don't crop away important ship or harbor context.
- Verify whether the hosted postcard scan is reusable and whether the project can serve an optimized derivative; collection possession alone doesn't establish permissions. Record source, publisher/photographer (if known), exact or approximate date and license basis. Do not declare public domain without supporting evidence.
- When using the 1917 photo in the site, **label it accurately** (e.g., "Easy Street Basin, Nantucket · 1917 · fishing vessels sheltering during a storm"). Do not change an accurate caption to suggest this image depicts 1851.

**Historically closer comparison before final choice:**
1. **Nantucket whaling waterfront, circa 1862**, photographed by **Edward T. Whitney**, known through Henry S. Wyer's later reproduction. Historians Ryan Cooper and Robert Hellman identified and evaluated the surviving original stereograph in *Historic Nantucket* (Winter 2005). It actually depicts square-rigged whaling vessels and Straight Wharf, closer to the novel's industrial setting. Read: https://hellmanwhalingcollection.org/wp-content/uploads/22A-Photographic-Mystery-Solved-the-Origin-of-Wyers-Famous-View-of-Nantucket-Wharves22-Winter-2005.pdf . Find a clean copy in an archive and verify reuse rights; do not use a low-resolution screenshot from the article as the final asset.
2. **John Warner Barber, *South-Eastern View of Nantucket, Mass.* (1839)**, historically closest in date, but an engraving rather than a photograph. Source lead: https://books.google.com/books?id=NtwtjM0nTr8C .
3. The **user-provided 1917 Easy Street photograph**—currently favored for its dynamic composition, but fifty-plus years later than the whaling era. Only use with 1917 identification.

**Founder-facing decision:** Produce a quick **side-by-side desktop/mobile preview** of (a) the uploaded 1917 photograph in **neutral grayscale**, and (b) the best available rights-cleared genuinely whaling-era view (prefer Whitney c. 1862, otherwise Barber 1839). Explain the chronological tradeoff. **Do not silently substitute the previous yellow photo**. Make the preferred 1917 version available for visual feedback before merging the Nantucket image swap. Other approved work (whale/squid, candle, marine-life motion) can proceed independently.

Do not run new gull animations over the archival photo until the visual director has confirmed they look authentic; they risk turning the photograph into a composite of mismatched periods.

### 4. Deep-water lights: swim as the visitor scrolls toward the candle

- `src/abyss.js` defines the faint anglerfish / jelly-like creature / siphonophore-like chain motifs; `src/timeline.js` handles normalized progress. Use **scroll progress**, not just a looping CSS animation, for visible swimming/travel.
- Individual organisms should move in **different directions, speeds and mild arcs**, e.g. slow horizontal gliding, small vertical drift, occasional orientation changes. Luminescent points stay physically attached to their creature bodies; do not animate lights as unrelated stars.
- The effect should be **subtle, eerie and almost invisible**, as originally envisioned. On first downward motion, they travel a little and begin fading as the approaching candlelight grows.
- **Before the candle is fully in view**, organism bodies and lights should fade to zero. The bright near-field flame must suppress visibility of distant ocean life. Do not allow faint points to persist through candle/ledger/desk.
- Scrolling upward reverses positional progress and visibility consistently; if any automatic idle drift remains, it must not fight scroll direction, create jumps, or spoil reduced-motion.
- Avoid costly per-element blur/filters/reflows; apply transforms and opacity to composited wrappers and render no more than once per animation frame.

### 5. Layout, historical integrity and test checklist

- [ ] The abyss uses `moby-dick-whale-squid-final.webp`, and the previous rectangular-background edge is gone throughout its reveal.
- [ ] Candle body, flame, wick and metal holder look plausible and sit on the desk; the first scroll still reveals the glow rising from below.
- [ ] Candle illuminates the manuscript without unreadable text, flattened lighting or overlap at 390×844 and 1440×900.
- [ ] Nantucket art preview compares the user-supplied **1917 Easy Street photograph in neutral grayscale** with a more whaling-era image (Whitney c. 1862 or Barber 1839); founder preference respected, chronological accuracy/source/rights verified, no yellow cast and no false 1840s caption.
- [ ] Nantucket headline and notes do not obscure ships or masts; any 1917 image is identified as **1917 fishing fleet**, never the Pequod's harbor.
- [ ] Deep creatures **swim with scroll progress**, lights attached, dimming/disappearing before candle fully arrives.
- [ ] Existing route, later anatomical plate, extended abyss, Ahab Chapter 41 quote, Chapter 44 discovery and reduced-motion access survive.
- [ ] Scroll backward reverses reveals without jumps; touch/wheel input feels stable.
- [ ] Screenshots taken at **opening darkness**, **first candle glow**, **full candle / ledger**, **Nantucket harbor**, **initial encounter**, **full encounter** on desktop and mobile emulation.
- [ ] Build/tests pass; note any limitations (mobile emulator vs physical phone, sources not verified, etc.).
- [ ] New scan sources / image rights, and original vs reconstructed images, are documented.

### Work process

Start from latest `main` on a feature branch. Inspect rendered site first. Let visual director and motion QA independently review key mockups, with literary/historical review limited to image attribution and factual labels as needed. Implement the swaps, test, review renders and make one focused PR. Merge/deploy **if** there are no material unresolved problems, and provide the live URL.

**Related but separate:** GitHub Issue #7 proposes adding the *Indian Chief* logbook beside the economic manuscript. Do not crowd this PR with that extra artifact; it can be previewed in a subsequent change.
