# Next push — maps that think, and transitions that cohere

**Founder-requested goals and proposed design/implementation handoff, November 18, 2026. Documentation only; do not edit the website in response to this plan itself. Founder reviews the resulting art/PRs before merge.** This is the **next active work plan**, superseding the older `docs/next-visual-push-execution-plan.md` as a description of *pending* tasks. Earlier PRs A/B/C have merged: integrated Beale desk, three-voice abyss, and an existing candle/Smithsonian lithograph inspector. Preserve all three.

**Core aim:** Make the Atlantic map read as a captain's evolving intellectual instrument, and remove visible discontinuities between historical engraving, ocean, candle, and anatomical sheet. Expand the map beyond Cape Verde **in a later separate global itinerary feature**; do not cram 17 stops onto the old Atlantic chart or an existing short scroll window.

**Scope order:** [**PR D1 · Issue #25**](https://github.com/skyeuldrich/moby-dick-explorer/issues/25): chart typography + Ahab's scroll-controlled annotations → [**PR D2 · Issue #26**](https://github.com/skyeuldrich/moby-dick-explorer/issues/26): harbor/desk/anatomical visual continuity → [**PR E · Issue #27**](https://github.com/skyeuldrich/moby-dick-explorer/issues/27): 17-stop transoceanic atlas (design/source and geography gate first, then implementation). A future *religious interpretation* is a founder/ChatGPT literary-agent editorial task, **not** a code task in these PRs.

## Verified implementation baseline (main, 2026-11-18)

- Route is an SVG red path drawn in `src/regional-chart.js` from `src/chart-geometry.js`, registered to the actual `public/assets/archive/heather-1797-atlantic.webp`; it ends **off Cape Verde**. `src/timeline.js` controls a roughly `.3–.6` route and `.605–.72` chart fade.
- Waypoint titles are `<text>` inside SVG; **`.route-landmark text` uses 8px DM Sans, red-brown fill and a thick contrast stroke** in `src/style.css`. The large `<h1>Moby—Dick</h1>` inside `.opening` overlays an existing antique map's printed words.
- `src/barber-harbor.js` layers Barber's period `barber-1839-source.jpg` with a **separate sampled SVG water texture and curved harbor-wave SVG**. `src/timeline.js` animates `.harbor-page` and `.harbor-art` using **different scroll transforms**: a visible water-line shear.
- `src/timeline.js` starts a center-bottom `.bottom-glow`, but the candle in `public/assets/desk-{landscape,portrait}.webp` sits left of center. `src/desk.css` controls the shared image/hotspots.
- The genuine Beale diagram lies under the agreement near the lower edge of the **landscape desk view**; phones reveal more. The inspector in `src/desk-discovery.js` opens the full archival original.
- `src/descent.js` and `src/descent.css` already implement the **fixed** 41 → 37 → 132 black-ocean quotation sequence. Preserve it, its true-black plateau and encounter.

## PR D1 — the chart becomes Ahab's thinking surface

### 1. Remove obstructive title; fix waypoint type

- [ ] **Remove the giant visible `Moby—Dick` title from over the original map**, and reduce other overlays if they obscure historical place names. Preserve exactly one meaningful accessible `<h1>` (visually hidden is acceptable), browser/document title, site header brand and skip links. Keep only small editorial metadata near Nantucket if it improves orientation; no giant floating title or beige title card.
- [ ] Replace **red SVG waypoint labels** with an elegant restrained period-compatible typographic treatment (prefer Cormorant Garamond / sensible readable serif rather than current tiny DM Sans + thick halo). Red stays for path/dots, not heavy label text. Labels must be readable on the archived chart **without** pretending to be ink printed in 1797. Use gentle dark-ink color and minimal translucent paper-tone backing only where needed. Test mobile sizes / density, label collisions and long names. Do not repaint the original map's typography.
- [ ] Retain truthful source credit. No inaccurate user-facing assumption that the current 1797 Atlantic sheet depicts all oceans or an exact ship track.

### 2. Give Ahab's Chapter 44 pencil marks physical life

- [ ] Above the genuine chart, add a **separate graphite / erasure layer** representing Ahab's reasoning. The printed source remains pristine. Suggested observable actions: tentative dashed whale-ground curves, short recalculated course lines, positional symbols, an erased choice leaving a faint trace, another curve replacing it. The drawings can gather in 2–3 stages as the user scrolls from Nantucket toward Cape Verde. **Do not** draw a random full-page storm of equations.
- [ ] **Distinguish two kinds of marks**: (i) muted red *reader's reconstructed route* between textual grounds, (ii) gray-pencil *Ahab's hypothetical analysis* that appears, changes, and vanishes. Explicitly mark Ahab's pencil simulation as **our editorial reconstruction**, not surviving annotations or authenticated handwriting. Do not fabricate dated coordinates, actual predictions, or claim exact personal calculations by Melville's Ahab.
- [ ] Tie annotations to **real features from Ch. 44:** charts, tides/currents, reported whale grounds, seasonal migrations, pencil revisions and erased tracks. **Editorial prompt:** “What does a line on a chart tell you—and what must Ahab infer?” The first stage shows a conjectural course, the next revises it, the last lets the red route advance despite persistent uncertainty.
- [ ] Ch. 44's literal textual anchor includes **“Almost every night some pencil marks were effaced, and others were substituted.”** This exact short line is already approved in `src/main.js`. Link to the source chapter and preserve the existing `The Chart` discovery. Upgrade the interaction through observation/comparison, **not another explanation-only popup**.
- [ ] All animation phase and visibility are **scroll-dependent and reversible**; scroll back restores earlier penciled possibilities. No arbitrary autoplay timer, fake ink bleeding, GPU-heavy eraser particles, or alteration of the archival scan. Reduced-motion users can inspect a still **before / revised** pair and read the same underlying explanation. Keyboard and touch users can access the insight.
- [ ] Implement the overlay as **reusable chart-annotation components tied to source/chart coordinates and narrative stops**, not fragile screen-pixel placements, so later PR E can reuse it across actual Atlantic/Indian/Pacific maps.
- [ ] Capture desktop + 390/360px frames before, during and after an erasure; include reverse scroll clip. Check no annotation crosses text or map datum / route position as the responsive camera moves.

**D1 stop condition:** Do not extend beyond Cape Verde yet. Do not use the copyrighted Norton itinerary image as an asset. No religion research and no full-journey route in this PR.

## PR D2 — preserve the physical illusion

### 3. Harbor engraving and waves move together

- [ ] The founder reports a visible speed mismatch between the original Barber engraved waterlines and the computer-generated continuation below it. **Eliminate independent scroll velocity/scale:** turn original lower harbor engraving plus the necessary extension into **one image-space treatment with a single scroll transform** (one SVG coordinate system, one composited raster, or one co-moving image group). A lone CSS speed adjustment that fails on mobile is insufficient.
- [ ] Use only **authentic source ink/linework** as the basis for the extended engraving. Clone, transform and blend archival hatching at the seam if needed; clearly document the extended area as a **modern adaptation**, not unaltered nineteenth-century print. Do not create fake AI wave artwork or replace Barber's town/boats.
- [ ] Preserve the three separated animated original gull sprites, existing literary text and Nantucket→chart fade. Birds may move within the unified harbor group; **water must never separate into two drifting print layers**. Review slow scroll with .20–.30 phase in both directions, at desktop and 360/390px; include a recording at the seam.

### 4. Make candle the actual source of approaching light

- [ ] The deep-water-to-desk glow currently rises from bottom-center while the physical candle appears toward the left. Anchor the first visible warm gradient to the **same projected wick coordinates** for both desktop and portrait. The light must appear to come from the future flame—no free-floating central spotlight that moves sideways when the desk enters.
- [ ] **Preferred art-saving option:** Use a controlled camera/framing move as the light appears: begin tight enough that the candle's flame is **near the center of the visitor's view**, then widen or pan into the complete tabletop with documents legible. Keep the existing lit artifact itself stable; the viewport moves, not the physical candle. This may require image-space transforms and recalculated hotspot alignments; transform the paper and its button overlays as **one parent**. A visible resting candle surrounded by documents is more important than keeping it centered for the entire desk dwell.
- [ ] If the existing landscape/portrait compositions cannot produce a credible center-flame approach and an accessible full-document desk with a camera move, supply **two precise compositional mockups/asset requirements and STOP for founder art approval** rather than generating a new synthetic tabletop or wrecking the current composite.
- [ ] Preserve the actual candle hotspot (*The Price of Light*), shipping paper, voyage records and Beale button. Retain physical wax/flame cues and responsive controls. Check color/luminance continuity in frames before the desk appears and after the candle is obvious.

### 5. Show Beale's diagram on desktop before it is clicked

- [ ] Fix the landscape crop: the founder cannot get a satisfying in-context view of the **whale itself** on desktop because the physical sheet falls below the viewport. Aim for a discernible **entire whale silhouette, head and tail, at a normal desktop viewport** during a comfortable part of desk scrolling, while the actual plate remains beneath/alongside the agreement. The small printed labels can remain the task of the full-resolution inspector.
- [ ] Try a subtle camera travel, picture-framing adjustment or founder-approved source-preserving composite edit; no detached floating sticker or source-figure redraw. Do not break the already-good phone crop. Screenshot at 1440×900, 1280×800, 390×844 and 360×640. Confirm the diagram hotspot is visible, not obscured by sticky footer UI, and opens the existing original Beale page.
- [ ] If the candle-centered composition and full Beale sightline conflict, provide both visual options with tradeoffs for founder review before modifying all assets.

**D2 stop condition:** Keep the existing three quotations and whale/squid sequence untouched, and do not start film production or unrelated literary features.

## PR E — full seventeen-stage world journey, NOT part of D1/D2

**Approved geography handoff:** [Pequod's 17-stage route](pequod-itinerary-17-stages.md). The founder supplied a primary-text itinerary and a **Norton edition world map screenshot for reference only**. Do not ship the Norton image, trace its exact proprietary drawing, or present it as a public-domain source. This expanded geography is not a historical ship log: **named regions are grounded, intervening lines are illustrative**.

- [ ] **Pre-implementation review of atlas storyboard:** map three major geographic spans—**Atlantic** (Nantucket / Azores / Cape Verde / Plate / Carrol / Cape), **southern Indian and Indonesian seas** (Crozets / Java Head & Sunda / Java Sea), **western & equatorial Pacific** (Philippines/Bashee/Japan → equatorial Pacific). Consider deliberate **paper-chart folio changes** or a 1840s-compatible multi-sheet sea atlas; don't distort the actual Heather 1797 Atlantic plate into a fictitious global chart.
- [ ] Existing approved local originals: `heather-1797-atlantic.webp` and `norie-1844-pacific-east.webp`. Additional Indian Ocean / Sunda / east Asian mapping must use a **specific sourced public-domain scan** with audited dates/resolution and usage permission. Candidate to verify: Aaron Arrowsmith, early-nineteenth-century Indian Ocean charts (Rumsey/Commons), and J.W. Norie China Sea / East India Archipelago survey issued 1821 with later updates. Do not assume a candidate is cleared without checking the exact reproduction.
- [ ] Plan a nonintrusive **global overview** (with sectional jumps) for readers who want the entire route. A source map from **1892** already in repo may serve as a *dated later overview* only, clearly labeled 1892; it must not be passed off as Ahab's period chart.
- [ ] Trace broad routes across the correct ocean basins in the **founder-specified 17-stage order**, including the Atlantic **backtracking toward the Río de la Plata and eastward again toward St. Helena**. No shortcut from Cape Verde to the Cape that erases the Plate and Carrol grounds. Distinguish **explicitly narrated** stops, **described regions with unknown exact track**, and **inferred/planned** passages. Do not draw exact latitudes, longitudes, port calls, or a certain wreck location without the novel's evidence.
- [ ] In Ch. 87, **Ahab “purposing to pass”** from Sunda into the Javan sea toward the Philippines/Japan is prospective narration; Chs. 109–111 show the later approach to Formosa/Bashee and emergence into the Pacific. **Do not claim each intermediate sea track is an eyewitness-logged fix**. The final “Season-on-the-Line” is an equatorial Pacific **region**, not a known sinking coordinate.
- [ ] Separate the visitor's red itinerary from Ahab's erasable graphite hypotheses. Reuse D1's authored annotation layer. Geographical stops, literary chapter links and confidence labels come **from the approved route brief**, not autonomous scholarly research by Codex.
- [ ] Expand the **physical chart scroll distance** and prefer per-folio narrative coordinates / data-driven waypoints; don't squeeze 17 stops into the current `.3–.6` travel interval or disturb the existing `toScroll/fromScroll` three-voice abyss timing. Transition into the same verified dark abyss **after the final voyage segment**; keep reverse scroll functional.
- [ ] Provide small accessible itinerary table, source/chapter tooltip on each stage, actual chart provenance/years, 1440/390/360 screenshots and reverse-scroll recording. Claim a route as **interpretive, not exact** in visible text, not hidden comments.
- [ ] **Asset and visual gate first.** Before implementing a large global atlas rewrite, show founder a storyboard with at least one frame from **each ocean segment** and a documented source/rights matrix. Pause if visual continuity or legibility cannot be maintained.

## Religious story arc — storyboard reservations only

The founder wants religion and providence represented without converting the website into an encyclopedia of themes. Literary analysis is underway **outside Codex**. Do **not** author passages, implement religious popups, or infer theological conclusions in PR D1/D2/E.

**Promising one-arc spine** (to be reviewed by literary agent):
- **Before departure: Jonah and divine command** — Father Mapple's Chapter 9 sermon occurs in **New Bedford before Ishmael reaches Nantucket**. It could enter as an **optional retrospective echo** attached to the voyage's beginning, with accurate chronology rather than pretending the sermon happened on Nantucket.
- **At the chart: human foresight vs. providence** — Chapter 44 juxtaposes Ahab's charts and calculations with language of whales' “secret intelligence from the Deity.” That opens a question about the limits of mastery without preempting an answer.
- **In the abyss: agency, fate and God** — The existing Chapter 132 passage “Is it I, God, or who, that lifts this arm?” is the natural end of this arc. Do not add a fourth quote to PR B's fixed sequence or brighten the black water.

**Narrative proposition, not approved interpretation:** Does charting the ocean express mastery, or an attempt to read providence? The literary agent should compare Father Mapple/Jonah (Chs. 8–9), Ahab's account of hidden agency (Ch. 36), Ishmael's language in Ch. 44, and Ahab's crisis in Ch. 132. Submit an editorial brief and proposed interaction, not a Codex task.

## Accessibility, quality gates and release process

- Source-based art first; **no newly generated AI illustrations for this push**. Raster editing/transforms of archival documents and existing art are allowed with source integrity, dated attributions and rights verification.
- Preserve the candle/Smit​hsonian print inspector; no resumption of the abandoned five-scene AI-image storyboard. Its future animated treatment requires a separate approved concept based on transformed archival prints.
- Keep architecture light: use existing `src/timeline.js`, `src/chart-geometry.js`, `src/regional-chart.js`, `src/harbor.js`, `src/desk.css`, `src/scenes.js` and inspector before inventing a framework. Limit each PR to its stated work.
- `npm test`, `npm run build`, Playwright screenshots, physical mobile/keyboard checks when available, reverse scroll and `prefers-reduced-motion` are acceptance criteria; report untested environments.
- **PR D1 and D2 require separate draft PRs and founder visual approval. NO AUTO-MERGE.** After D1 is approved/merged, rebase D2. PR E needs initial storyboard signoff before any large multi-chart implementation.
- Usage budget: default Sol Medium, escalate for an isolated implementation bug; no literary-source audits, critic research or swarms of subagents in Codex.

**Implementation task routing:** D1 = map title/labels/graphite; D2 = harbor continuous water + candle-light positioning + landscape Beale sightline; E = global transoceanic atlas after art/source review. Never treat all three as one Codex job.
