# Next push — atlas Folio I visual source gate (E0c)

**Prepared:** November 18, 2026 (Eastern). **Status:** Scoping and design instructions for review; **not founder approval to implement**. Parent work: [Issue #27](https://github.com/skyeuldrich/moby-dick-explorer/issues/27). There is no new atlas code awaiting merge.

## Current state

- Website **as deployed**: Heather 1797 Atlantic chart, Nantucket → Azores → Cape Verde, an interpretive red itinerary, separate hypothetical Chapter 44 graphite; the desk/harbor and the three-voice black abyss are already merged.
- [E0 storyboard](atlas-e0-editorial-design-handoff.md), [original shortlist](atlas-e0b-archival-chart-shortlist.md), [Copilot PR #30 report + placeholder boards](atlas-e0b-verification-and-mockups.md), and [independent archive review](atlas-e0b-independent-archive-review.md) exist.
- [Folio I browser review concept](reviews/atlas-e0b/folio1-atlantic-review.html) illustrates a Heather → second South Atlantic paper sheet, a chapter-evidence panel, and a narrated-only toggle. It loads archive images **over the network** rather than bundling them. If the host cannot be reached, the sheet shows a placeholder; users can load a downloaded Collin image locally. **This is NOT a verified pixel-aligned map mockup and does not contain route geometry.**
- **New preferred candidate for testing, not yet chosen:** E. Collin, *Carte réduite de l'Océan Atlantique Méridional* (1818), BnF/Commons file [btv1b10567560p](https://commons.wikimedia.org/wiki/File:Carte_r%C3%A9duite_de_l%27Oc%C3%A9an_Atlantique_M%C3%A9ridional_comprenant_depuis_l%27Equateur_jusqu%27%C3%A0_59_Degr%C3%A8s_de_Latitude_Sud_-_Collin%2C_E._-_btv1b10567560p.jpg). Catalogue reports **12,269 × 8,293 pixels** and equator to 59°S. Public-domain France/US notices have been reported on the Commons page; **do not infer file-level clearance without inspecting the exact item and its source terms**.
- **Fallback:** the [1739 Dépôt de la Marine South Atlantic chart](atlas-e0b-independent-archive-review.md) (full-basin catalogue extent); the whaler-used Blunt 1834 source is historically appealing but its Rumsey digital image has reuse caveats. Do not silently substitute the incomplete 1840 Blunt portrait scan.

## Only approved next *research/design* task, E0c

**Goal:** Deliver authentic source-backed desktop (1440 × 900) and phone (390 × 844) *review images*, and a short asset decision table for the **South Atlantic stages 5–7 only**. This is a controlled **asset-selection and visual-validation** push, not the 17-stage atlas rewrite.

1. **Get actual source pixels.** Download the specific Collin original, not just Commons search thumbnails. If external archive DNS/network access fails as it did in Copilot PR #30 and ChatGPT, **stop and request the original file from the founder**. Do not create a second set of hatched placeholder boards.
2. **Inspect geographic fitness** by reading its graticule and printed coasts at image scale: South America / Río de la Plata offshore (Plate Ground), South Atlantic/St Helena vicinity (Carrol Ground), Cape of Good Hope. The novel provides relative regions, *not* exact ship fixes. Photograph or annotate a **separate review overlay** showing verified chart features, map bounds, planned crop and uncertain narrative areas. If Collin is incomplete, present the 1739/Blunt alternative and why.
3. **Document lawful reproduction basis for the exact image bytes**: catalogued title, actual sheet date/edition, institution, permanent item and download URLs, license/rights statement (and any source-site reuse conditions), dimensions, SHA-256, attribution, transformation/crop. Do not treat archival age alone as publication permission. Don't commit an image with unresolved terms.
4. **Create image-backed compositions** (no generative replacement) for 1440 × 900 and 390 × 844: Heather's final readable view, physical sheet handoff, Plate → Carrol → Cape region; show stable source plaque, stage/chapter label, accessible alternative reading. **No claims of precise ship tracks.** Make the distinction visible between red narrated-place areas and inferred links. Ch. 44 graphite remains separate, never confused with map printing.
5. **Report decisions for founder review:** chart A vs fallback, full-resolution legibility, artwork/scene pacing, desktop/phone crops, licensing decision needed, whether seam concept works. Stop before writing site route code.

**Output:** One bounded **draft PR** with review frames, source-and-rights record, findings and honest blockers, plus browser screenshot evidence for each viewport if a preview runs. **Never merge or deploy without explicit founder visual approval**; no application changes.

## After E0c founder approval — later E1 implementation task (NOT NOW)

Only then scope the first code PR: build Folio I continuation onto an approved and registered south-Atlantic source, stages 5–7, reversible scroll and accessible itinerary. Keep the existing desk/harbor, Heather, graphite, black abyss timing and whale/squid intact. Tests: `npm test`, `npm run build`; real desktop 1440×900 and phones 390×844, 360×640; forward/back, keyboard, reduced motion, visible provenance. Do not tackle Indian/Pacific in this same PR.

## Dependency / stop rule

**No verified original Collin/alternative pixels and rights → no new source-backed mockup → no E1 coding assignment.** For now, actual original images and founder review are the blockers. Documents and a speculative HTML source loader are not proof of source fitness.

## Editorial integrity

The 17-stage itinerary [is here](pequod-itinerary-17-stages.md); stages 5–7 follow Ch. 51: off the Río de la Plata/Plate Ground, then Carrol south of St Helena, then Cape of Good Hope. Do not invent port calls, route coordinates, distances, vessel chronology, or a sinking pin. Preserve the distinction between Melville's narrated sequence, a modern linking hypothesis, and Ahab's graphite.
