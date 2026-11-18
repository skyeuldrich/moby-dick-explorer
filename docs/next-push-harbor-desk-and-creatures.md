# Next visual iteration — approved creative instructions

Approved by the founder on November 17, 2026. This document records the next implementation scope; adding it does not authorize starting implementation. Preserve the functioning narrative, historical sources, literary interactions, accessibility and reduced-motion support. Do not expand the scope.

## Harbor becomes the map

Use one neutral paper tone and charcoal ink treatment across Barber’s 1839 Nantucket engraving, transitional water and the existing historical Atlantic chart. No yellow or sepia shift.

Crop away foreground people, cart and land while preserving the waterfront, ships, sky and animated original gulls. Extend engraved water where necessary. Credit the result as an adaptation of Barber’s 1839 engraving and preserve the unaltered source in Field notes.

As scrolling continues, the harbor and horizon move upward and water increasingly fills the viewport. A broad wave, rendered in the engraving’s own ink texture, crosses the scene and conceals the transition from harbor perspective to chart. Behind it, the same-colored water becomes the Atlantic map centered on Nantucket; the red voyage line begins there. The founder chose an engraved wave transition, not a brightly colored cartoon treatment. The Flapjack reference concerns a wave concealing a scene change. Avoid an exposed cut or generic scene crossfade. Reverse scrolling must reverse the entire transition.

## Replace Nantucket filler with literary quotations

Remove existing harbor headings, filler copy and explanatory labels. Move artwork credits and adaptation details to Field notes. Use these separate quotations:

Harbor: “What wonder, then, that these Nantucketers, born on a beach, should take to the sea for a livelihood!”

Approaching the map: “Nantucket! Take out your map and look at it.”

Both are Ishmael’s narration in Chapter 14, “Nantucket.” The Melville Scholar verified them directly in Project Gutenberg #2701 via the GITenberg transcription (updated December 3, 2017): https://github.com/GITenberg/Moby-Dick--Or-The-Whale_2701/blob/master/2701-0.txt . They appear in reversed textual order in this display; never join them as one continuous excerpt. Keep quiet chapter attribution, avoid presenting literary rhetoric as historical evidence, and clear the quotation before the wave transition. No first-edition collation is claimed.

## One convincing candlelit desk

The founder chose a gently angled view from above. Reveal the setting spatially through scrolling: faint warm light below → flame → candle and holder → illuminated desktop → whaling agreement.

Make the desk, candle and paper share consistent perspective, shadows, materials and illumination. Replace the striped desk background and rectangular information-sheet appearance. The candle must visibly rest on the desk rather than float over it. Preserve the approved spermaceti candle direction.

Research and cite an actual historical whaling agreement as the manuscript reference; no particular contract has yet been selected. Use convincing handwriting, ruled details, folds and paper edges based on that evidence. Preserve the original source and accurately distinguish an adaptation or reconstruction from an archival scan.

The founder chose a whaling agreement plus separate, clearly modern annotations containing the verified economy facts. Do not fabricate an old contract containing modern statistics. Keep annotations visually distinct from the agreement. On mobile, reveal annotations sequentially rather than squeezing all text around the paper. Do not invent contract terms, signatures or provenance.

## Integrate Beale's 1839 sperm-whale anatomy plate into the desk — founder-approved revision (November 18, 2026)

**Remove the current standalone, full-screen anatomical plate between the chart and the abyss.** It interrupts the continuous voyage-to-descent transition, changes the background from nautical chart to cream museum-slide graphics, and offers no compelling reason for visitors to investigate the illustration. The founder approved moving it to the earlier candlelit desk experience instead. This **supersedes** prior instructions that say to preserve a separate later anatomy scene.

- **Physical staging:** Treat the authentic Thomas Beale anatomical plate as a second period paper or book page **partly tucked beneath or beside** the desk's principal whaling agreement. It should share the same overhead perspective, candlelight, paper material, contact shadows, and scale as the unified desk image. Keep the plate recognizable as a historic printed illustration, not a new AI image. The desk is a working scene, not a museum display or a collage of disconnected PNGs.
- **One coherent composition:** Include the anatomical paper in the planned unified desk artwork/composite, then provide a **precisely aligned, interactive DOM hotspot** or separate interactive layer so the visitor can inspect the document. A flattened backdrop alone does not deliver the educational experience. If the archival plate and proposed 1842–44 Indian Chief logbook compete for space, favor **the whaling agreement + Beale plate**; treat the logbook as optional rather than crowding the table.
- **Visitor action:** A visible corner of the illustration invites inspection. On click/tap/keyboard activation, lift or enlarge the sheet into a dedicated, readable viewing state with the **original archival figure** (and optional high-resolution source page), controllable zoom/pan or clear lettered labels; provide an obvious close/return to desk. Do not falsely imply a physical paper could float without support—an inspection view can be a deliberate focus/reading overlay.
- **Educational problem:** What can a scientific diagram of a sperm whale explain, and what does it leave out about a living whale? Connect the labeled anatomy to Ishmael's classificatory ambitions in **Chapter 32, “Cetology,”** and to the problem of representing whales in **Chapters 55–57**. Invite visitors to examine *particular* lettered features, try to understand the representation, then recognize its limits; do not reduce this to a generic explanatory popup. Quotations/claims must be verified against the novel and inspected scholarship. A brief interpretive prompt and optional deeper reading are preferable to an exhaustive label panel.
- **Provenance:** Use the genuine Thomas Beale, *The Natural History of the Sperm Whale* (1839), p. 23, fig. 1, **already in the repository** as `public/assets/archive/beale-1839-fig1.webp`, with `beale-1839-p23-source.jpg` retained. Source: Wellcome Collection, https://wellcomecollection.org/works/r9yqq4dt . Retain the existing source credit and disclose that the archive scan already clips the extreme far-left fluke tip. Verify all shown letter definitions against Beale before presenting them as facts. Do not invent additional historical letters or label a modern redrawing as Beale's original.
- **Narrative transition:** Once the plate is part of the earlier desk, allow **Nantucket → chart → progressively darkening water → abyss** with no cream-colored anatomical interlude. Preserve the period-map aesthetic and the next approved abyss quotation/black-water sequence defined in `docs/next-push-abyss-three-voices.md`. Rebalance the existing scroll timing so removal of the scene does **not** create a dead interval or abrupt leap.
- **Implementation integration:** Remove or retire the currently rendered `<section class="anatomy-scene">...` from `src/main.js`, the `archivalPlate` insertion there, and its current `src/timeline.js` visibility/scene staging (presently around progress `.615–.72`). Adjust scene/depth labels, active controls, tests, and screenshots to match the new narrative. Preserve the underlying original Beale files for the desk inspection. Avoid dead markup, unused imports and timers.
- **Mobile, keyboard and reduced-motion:** Ensure the illustration can be discovered and inspected on a phone without tiny touch targets or unreadable diagram labels. The archival figure is viewable as a crisp image independent of background art; provide meaningful alt text, source access, text description/transcription and keyboard-operable close/return. No forced motion.
- **Visual sign-off:** Supply **before/after captures of the desk**, an open diagram-inspection state on desktop/mobile, and **continuous chart-to-darkness frames/recording** proving there is no background-color discontinuity. Test reverse scroll, keyboard operation, `npm test`, `npm run build` and browser rendering. Founder reviews before merging.

**Intent:** The desk becomes an investigation into human methods of describing and exploiting whales—contracts, accounts and anatomy—before the viewer ventures into the ocean. The untouched living animal is encountered in the final abyss, beyond what the diagram can convey.

## Creatures remain in their ocean

Retain the approved painterly assets, subtle autonomous anatomical swimming and attached bioluminescence. Remove scroll-driven sideways travel and rotation. Keep world positions stable: as the viewer descends, creatures pass upward and out of frame, without swimming backward in response to scrolling. Autonomous swimming continues when scrolling stops. Retain the fade into approaching candlelight and reduced-motion behavior.

## Implementation acceptance

Keep this push limited to the four original workstreams, with the Beale plate relocation integrated into the **desk** workstream; do not add unrelated features. Inspect actual desktop and mobile output and short motion recordings. Verify seamless water-to-chart continuity, believable candle contact and illumination, readable mobile composition, creature motion independent of scrolling, and reversible transitions. Preserve the existing chart route, **Beale's archival plate asset and attribution (now within the desk)**, Ahab passage and whale/squid encounter. The earlier instruction to preserve a **later standalone anatomical scene is superseded**. Run the existing automated checks and add focused regression coverage where necessary.

The founder’s standing workflow is to merge and deploy after checks and visual inspection pass, then provide the live URL. Pause for significant unresolved artistic decisions or material failures. For this instruction-only update, do not begin the visual implementation.
