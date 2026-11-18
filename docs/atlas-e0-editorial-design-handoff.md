# E0 — The Pequod’s three-ocean atlas: editorial and archival design handoff

**Date:** 18 November 2026  
**Status:** Research and storyboard proposal **committed for founder review**. No atlas code, imagery, route coordinates, or public-site UI has been changed. This is the Stage E0 design gate of [Issue #27](https://github.com/skyeuldrich/moby-dick-explorer/issues/27).  
**Source of geographic truth:** [approved 17-stage itinerary](pequod-itinerary-17-stages.md). The chapter references below were checked against the novel in the Project’s uploaded Norton Critical Edition (2018); the public links point to the corresponding chapters in the 1851 novel, Project Gutenberg #2701. The Norton map is *reference only* and must never become a distributed image or traced template.

## 1. Editorial thesis and recommendation

**Three ocean folios, not one invented seamless map.** The Pequod travels through charted seas but is not a chartable historical vessel. Preserve the pleasure of unfolding real engraved nautical sheets; have the visitor move from one physical page to another when a change of ocean requires it. The active red itinerary is a *modern reading aid*, not a logbook reconstruction. D1’s graphite is different: it dramatizes Ahab’s uncertain calculations, not the movement of the vessel.

The interaction should expose a recurring interpretive problem: *what does the novel say happened, what did Ahab intend, and what must the reader infer?* Rather than put that answer in 17 popups, let the visual grammar change when the evidence changes. Textual grounds can remain fixed while conjectural connecting lines vanish under a “Show only what Melville tells us” inspection action.

**Three primary regions, potentially five or more actual source sheets.** One chart should not be stretched outside its printed bounds. The existing 1797 Atlantic scan has a proven north-Atlantic implementation, not validated Plate/Carrol/Cape coverage; the surviving 1844 Pacific crop depicts the eastern *southern* Pacific near South America, **not Japan**. Both constraints are essential.

## 2. Narrative beats / storyboard: one proposed viewport per folio

These are *composition sketches*, not finished visual mockups or permission to code. Once source scans are acquired, produce true chart-backed frames at desktop and mobile sizes for founder approval.

### A — Atlantic: “The geography the prototype omits” (stages 1–7)

    ┌────────────────────────────────────────────────────────────────┐
    │ THE MELVILLE ATLAS         FOLIO I / ATLANTIC       05 OF 17 │
    │                                                                │
    │          [REAL ENGRAVED ATLANTIC SHEET; chart ink visible]     │
    │             Azores  ·  Cape Verde                              │
    │                        ╲                                       │
    │                         ╲    [interpretive RED course]        │
    │                  Plate Ground  ─────→  Carrol Ground           │
    │                                             ⇢ Good Hope       │
    │                                                                │
    │ CHAPTER 51  |  “on the Plate ... off the mouth of the          │
    │               Rio de la Plata”                                 │
    │ Named offshore ground  •  Exact track unknown                 │
    └────────────────────────────────────────────────────────────────┘

**Reveal:** Continue the red track *across* the South Atlantic toward the Río de la Plata, then east toward Carrol Ground / St Helena, rather than letting it drift down Africa or jump to Good Hope. This is the most important factual correction from the abbreviated current prototype.

**Action:** Hold “Only narrated places”: the named offshore grounds persist, but connecting red curves fade, exposing the difference between sequence and position. Release to return to the reconstructed itinerary. Ch. 44 graphite remains on its separate layer; it never becomes evidence of actual positions.

**Page handling:** Reuse the current Heather 1797 sheet for the places it demonstrably covers. Before the Plate segment, either move to a *second verified southern-Atlantic chart in the same folio* or secure a source whose geographic bounds genuinely reach Plate/Carrol/Cape. Do not fill uncovered space with hand-drawn replica coastline.

### B — Indian Ocean and Sunda: “A voyage becomes a prediction” (stages 8–12)

    ┌────────────────────────────────────────────────────────────────┐
    │ FOLIO II / INDIAN OCEAN                         10–12 OF 17   │
    │                                                                │
    │ [period Indian basin / SE Asian chart; authentic coastline]    │
    │  Cape  →  Crozetts  ···→  Java Head / Sunda                     │
    │                                  ⋯⋯ planned passage           │
    │                                     Javan Sea → Philippines    │
    │                                                                │
    │  CHAPTER 58: “Steering north-eastward from the Crozetts”       │
    │  CHAPTER 87: Ahab “purposing to pass” through Sunda            │
    │                                                                │
    │  [Observed direction]    [Proposed course]                     │
    └────────────────────────────────────────────────────────────────┘

**Reveal:** At the Crozetts, an actual narrated direction carries the vessel northeast (Chs. 58–59). At Sunda, the route’s epistemic status changes: Ch. 87 describes an *intended* passage through the Javan Sea, past the Philippines, toward Japan. Rendering all of this as a solid logged track would turn intention into fact.

**Action:** On the Ch. 87 line, a press/keyboard action moves the course from solid regional red to interrupted hypothetical strokes. The visitor sees how a grammatical phrase (“purposing to pass”) changes the apparent certainty of an entire route. Ch. 109 later corroborates proximity to Formosa and Bashee, *not every intermediate ship fix*.

**Page handling:** Use an Indian-basin chart for Good Hope/Crozets/NE passage and a source-appropriate China Sea / East India Archipelago inset for the confined waters. This is one editorial folio but may be two genuine paper sheets, with a visible fold/change rather than a forged panorama.

### C — Western and equatorial Pacific: “Where must the line stop?” (stages 13–17)

    ┌────────────────────────────────────────────────────────────────┐
    │ FOLIO III / PACIFIC                              16–17 OF 17  │
    │                                                                │
    │  [historical NORTHERN/WESTERN PACIFIC sheet; not eastern crop] │
    │   Bashee Isles → Japan ground                                  │
    │                      ╲                                         │
    │                       ╲   southeast toward Line               │
    │                    [broad EQUATORIAL ZONE, no pin]             │
    │                   ~~~ [unnamed rocks: NOT identified] ~~~       │
    │                                                                │
    │  CH. 126 / unnamed rocks    CHS. 128–135 / final chase         │
    │  The novel fixes a region, not the wreck's longitude.         │
    └────────────────────────────────────────────────────────────────┘

**Reveal:** The open ocean grows more dominant, the route becomes less geographically determinate, and the equatorial endpoint is represented as an *area of textual evidence*, not a GPS pin. The chart's texture yields to the existing black ocean/abyss sequence after the final stage. Do **not** move or recreate the three quotation windows or whale/squid artwork in this project.

**Action:** The reader may trace the named Bashee/Japan positions, but cannot pin the sinking. A faint zone can be inspected to reveal *why* the map cannot be completed: the narrative gives no wreck longitude. This makes the limit of cartography the final discovery rather than presenting a fabricated answer.

### Global orientation / mobile view

A single collapsed *Itinerary / 17* control should open a concise, keyboard-accessible textual list with chapter links, location type, and which folio contains it. Do not require 17 consecutive hotspots or 17 large explanatory cards. Mobile presents the same sheet and editorial annotation through controlled horizontal camera pans; preserve aspect ratio, original engravings, and a fixed maximum for overlays. Each page change must make sense in reverse scroll.

**Pacing:** Give the Atlantic's Plate → Carrol correction its own reading dwell; give Crozets → Java its own long water passage; dwell on the distinction between intention and travel at Sunda; reserve the final silent equatorial zone before the abyss. Extend the physical scroll range rather than dividing the current chart interval into 17 tiny equal intervals. Avoid a fabricated number of days or miles.

## 3. Route evidence / confidence grammar

Use **separate fields** for *a named location*, *the claim of travel*, and *the certainty of the joining path*. A named island can be geographically identifiable while the Pequod's offshore position remains unknown.

| Stage(s) | Source chapters | Evidence from novel | Drawing treatment |
| --- | --- | --- | --- |
| 1 | 22 | Christmas departure from Nantucket | Named port and offshore departure, no pilot-track line |
| 2 | 28–29 | Southward in the Atlantic | Broad-direction corridor |
| 3–6 | 51 | Four grounds in order: Azores, Cape Verde, Plate/Río de la Plata mouth, Carrol south of St Helena | Four labeled offshore *areas*, no fake docking pins; dashed links |
| 7 | 51 | Eastward and Cape of Good Hope seas | Regional rounding / transition to Indian folio |
| 8 | 52 | Southeast of Cape, off distant Crozetts | Region (and note: right-whaling ground in this passage) |
| 9 | 58–61 | “Steering north-eastward from the Crozetts”; toward Java; Indian Ocean | Broad direction, not waypoint fixes |
| 10 | 87 | Drawing near Sunda/Java Head | Named strait region, avoid exact line through channel |
| 11–12 | 87; compare 109 | *Planned* Javan Sea / Philippine sweep; later narrated proximity to Formosa/Bashee | Broken prospective line **marked planned**; intervening path remains inference |
| 13 | 109–111 | Near Formosa/Bashee, passes Bashee into Pacific | Named passage; no exact ship fix |
| 14 | 111–118 | Japanese cruising grounds, broad western Pacific | Sea/whaling region, not Japan landfall |
| 15 | 118–126 | Movement toward the equatorial grounds | Broad southeastward passage; exact curvature conjectural |
| 16 | 126 | Unnamed rocky islets in equatorial-fishing-ground approach | Unnamed zone; **no modern island-chain assignment** |
| 17 | 128–135; compare 44 | “Season-on-the-Line,” pursuit and loss in equatorial Pacific | Broad closing zone; **no sinking pin or longitude** |

Suggested visually separate layers:
- **Black/brown printed ink:** unmodified archive, labels and historic tracks in the source are *not Pequod marks*.
- **Muted red label + area ring:** narrated offshore ground or named region; no dot unless actual landform/port is being marked for orientation.
- **Thin red interrupted link:** modern reconstruction between named narrative anchors, never a measured ship track.
- **Pale red wide wash:** stated ocean region whose exact boundaries are not specified; schematic not georeferenced polygon.
- **Graphite:** Ahab's dramatized erasable speculation based on Ch. 44. This is a different ontology from the visitor's red route.

Two inspectable reading states: **“Narrative evidence”** (only labeled places/directions and published chapter excerpts) and **“Reconstructed course”** (adds interpreted transitions). A separate button can expose *planned* segments with their grammatical evidence. Accessible list and reduced-motion state convey the same difference without animated disappearance.

**Do not generate:** daily latitudes/longitudes, timestamps, crossing counts, sailing distances, numerical route confidence, the coordinates of a whaling ground with no known bounds, unmentioned landings, a precise final sinking location, or assumed dates of scenes. The original map's printed marks are evidence about the *map*, not the Pequod.

## 4. Audited chart candidates and rights decisions

Source publication before 1851 is preferred. Any image added to this public repository requires **exact digitized item, scan dimensions, intended crop, image-source rights, attribution string and asset SHA-256** in the existing archival manifest. Historical age alone is not clearance for an arbitrary modern scan. Rights findings below describe the *specific host's stated terms*, not a legal opinion.

| Role / preference | Exact historical source, institution / link | Geographic fitness | Rights / remaining gate |
| --- | --- | --- | --- |
| **Atlantic north — reuse** | William Heather, *A new chart of the Atlantic or Western Ocean* (**1797**), Boston Public Library / Leventhal: https://collections.leventhalmap.org/search/commonwealth:kk91fr56g . Already installed as heather-1797-atlantic.webp; IIIF metadata and asset manifest are retained. | **Verified for current** Nantucket, Azores, Cape Verde sequence. Not verified as depicting all Plate/Carrol/Cape positions legibly. | BPL metadata: **“No known copyright restrictions. No known restrictions on use.”** Existing approved scan; retain credit. **Still need a southern Atlantic source/coverage test** before completing stages 5–7. |
| **Indian basin — first research choice** | Aaron Arrowsmith, *Chart of the Indian Ocean*, **1802, additions to 1812**, David Rumsey Map Collection, sheets 2–4 composite **13270.004**: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~316621~90085236 ; southeast sheet **13270.002**: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~316619~90085233 . | Genuine oceanic chart, candidate for Cape/Crozets-to-Indonesia continuity. Rumsey explicitly says **northwest sheet 1 is missing**. Verify precisely whether the *three available sheets* cover every requested stage and readable sheet join. | Rumsey's digital files are under **CC BY-NC-SA 3.0**: https://www.davidrumsey.com/about/copyright-and-permissions . Attribution, noncommercial use and share-alike on adaptations need an explicit compatibility decision; **not yet cleared for this project**. |
| **Indian alternative / historically compelling plotting chart** | William Heather / J.W. Norie, *Outline chart intended ... to prick off a ship’s track*, **1830**, Royal Museums Greenwich object **STK201:6/3**: https://www.rmg.co.uk/collections/objects/rmgc-object-543594 . | Museum identifies it as an **Indian and Western Pacific track chart**, c. 1:17,000,000; the held sheet's **lower half is torn/missing**. Great conceptual fit but possibly a fatal coverage gap. | RMG licensing guidance for its free low-resolution images imposes **CC BY-NC-ND**, maximum 1280px and restrictions on web use: https://images.rmg.co.uk/wp-content/uploads/2024/09/Images-Price-List-2024-25-WEB-ACCESSIBLE.pdf . **Do not use/crop/animate a downloaded RMG image without clarification.** Reference only. |
| **Sunda / Philippines passage — conditional** | J. W. Norie, *A New Chart of the China Sea and East India Archipelago* (**first 1821; catalogued edition additions to 1850**), Rumsey **5498.000**: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~377625~90143759 . | Catalogue names Sunda, Molucca and Philippine islands. Source is a very wide, two-section chart; verify both section coverage, chart ink legibility and whether Bashee Isles appear. Existing ship's **pencil track belongs to an unrelated historical map**. | Same Rumsey **CC BY-NC-SA 3.0** conditional-use gate. Clearly date the *1850 additions*; do not present the object as an untouched 1821 sheet or Ahab's chart. |
| **Northern/western Pacific — first research choice** | J. W. Norie, *A New Chart of the Pacific Ocean, Northern Sheet* (**1825; additions 1836**), Rumsey **4612.001**: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~245923~5514563 ; composite **4612.003**: https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~245933~5514565 . | Publisher explicitly describes eastern Asian coast incl. Japan and the Pacific. **Northern sheet** is the correct candidate for the Japan/Bashee segment, subject to crop inspection; southern sheet or equatorial inset may be needed for endpoint. | Rumsey **CC BY-NC-SA 3.0** conditional-use gate. A Commons thumbnail is **not** proof of independent rights clearance; identify exact scan being republished. |
| **Already installed, but NOT a Japan map** | Norie & Charles Wilson, *The southern or lower part of the Pacific Ocean*, **1844**, BPL/Leventhal: https://collections.leventhalmap.org/search/commonwealth:vt154w90j . File **norie-1844-pacific-east.webp** in public assets. | Actual installed crop is **x=17500–25176** of a 25,176px full sheet, near western South America. The metadata calls the sheet **southern/lower Pacific**. It cannot illustrate the Japanese North Pacific leg; do **not** recycle it by renaming. Consider a genuine *full* southern sheet only if its geographic bounds support equatorial Pacific. | BPL metadata **“No known copyright restrictions. No known restrictions on use.”** Existing file can remain in source archive, but not misrepresented as the eastern Asian sheet. |
| **Optional orientation only, not nineteenth-century navigation** | Hartwig, *The Sea and Its Living Wonders*, **1892** ocean-current world-map plate, existing **hartwig-ocean-currents-1892.webp**. | Two-hemisphere overview and late cartographic content; useful only with clear 1892 dating and projection break. | Existing public-domain-US record. **Not** Ahab's period chart and not a substitute for the three folios. |
| **Supplementary public-domain Sunda context, lower priority** | NYPL *A new and correct chart of part of the Island of JAVA ... with the Streights of Sunda*: https://old-digitalcollections.nypl.org/items/510d47e4-65bb-a3d9-e040-e00a18064a99 . | Real Sunda close-up, but not an ocean-folio solution. Verify date, extent and resolution before a decision. | NYPL marks this item **public domain in the US**; verify precise scan and download route. NYPL's general public-domain statement: https://digitalcollections.nypl.org/about . |

### Rights recommendation

1. **Prefer scans with explicit unrestricted-use statements from the holding institution** (as with the two existing BPL files) or a genuine item-level public-domain/CC0 declaration. Seek a southern Atlantic and Indian-basin equivalent before turning to a restrictive licence.
2. If choosing Rumsey sources, explicitly approve the **CC BY-NC-SA 3.0** conditions for the site's *image adaptations*, ensure suitable attribution/indication of changes, and check whether the way GitHub Pages assets are distributed fits the licence. The historical engraved work may be out of copyright; the source website still imposes conditions on its downloadable file. Do not label the Rumsey scan CC0.
3. **Reject RMG 1830 as a deployable file for now:** lower sheet damaged and explicit no-derivatives web terms are a mismatch for crop/pan/texture processing. It remains a strong visual/research reference.
4. Record any later-than-1851 edition as later historical evidence, not an object Ahab necessarily had. Do not use the 2018 Norton scholarly map as art or reuse a commercial seller's listing image.
5. **Do not download, modify, or commit any new archival image during E0.** E1 begins only after exact source/rights approval, pixel inspection, and founder signoff.

## 5. Handoff to Codex *after* approval (no code now)

**Data model, not coordinates yet:** Each of 17 editorial stages: immutable id/order, folio id, source chapter(s), brief quoted textual anchor, plain-English label, location kind (named port/ground/ocean area/direction/prospect), narrative evidence class (observed/retrospective/plan/inference), display geometry type (point only where grounded / broad area / directional band / no coordinates), confidence *in naming*, and confidence *in connection*; next-stage connection and map source id. Store uncertainty as text/evidence, not a decimal likelihood.

**Visual architecture:** Three editorial folios with stable archive-space overlays and 1–2 intra-folio sheet changes if geographical coverage demands them. Each sheet retains an archival provenance plaque (cartographer; printed edition; archive). Page-turn/crossfade transitions show the change in source chart; don't stitch mismatched projections into a synthetic continuous planet. Separate authoritative map ink, red visitor reconstruction, gray Ahab conjecture, and interaction hit regions. The end of the third folio leads into the unchanged abyss.

**Interaction/QA acceptance:** At all 17 stages the label and chapter link are reachable by pointer, keyboard, and itinerary index. The evidence-only toggle removes reconstruction but **does not erase named anchors**; planned segments display their status before and after Ch. 109. Ahab graphite transitions remain reversible. Every chart is correct on 1440×900, 1280×800, 390×844, 360×640, and short landscape; viewport crop never implies a nonexistent source coast. Test reverse scrolling across each sheet boundary, reduced motion, touch, keyboard, quote timing, and fixed-hotspot alignment. Build the public-source audit and track asset SHA-256. Inspect in a browser at key stages; automated passes are necessary, not a substitute for visual approval.

**Phasing / complexity:** 
- **E0 (this document):** editorial evidence and source candidates, layout and clearance gates. No engineering.
- **E0b (still before implementation):** secure exact southern Atlantic and Indian scans with acceptable rights, verify Japan/Bashee in the northern sheet; create three actual map-backed compositions (desktop + phone). Founder approves folio and source list. High archival uncertainty, low engineering cost.
- **E1:** data/architecture plus Atlantic continuation; **high** difficulty (chart registration, arc geometry, responsive camera).
- **E2:** Indian/Sunda and Pacific folios, inter-folio transitions; **high** difficulty (multiple projections and uncertain links).
- **E3:** cross-folio pacing, keyboard/reader, QA, credits and deployment; **medium-high** difficulty.

**Hold points for founder:** (a) accept three folios with genuine sheet changes, possibly 4–6 physical chart images; (b) choose a rights-compatible scan set; (c) approve the three rendered layouts; (d) separately authorize the implementation PR. No code, no auto-merge, no new synthetic historical illustrations before those decisions.

## 6. Primary and institutional evidence trail

- Melville, *Moby-Dick* (1851), [Ch. 22](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0022), [Ch. 28](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0028), [Ch. 44](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0044), [Ch. 51](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0051), [Ch. 52](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0052), [Ch. 58](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0058), [Ch. 59](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0059), [Ch. 87](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0087), [Ch. 109](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0109), [Ch. 111](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0111), [Ch. 126](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0126), [Ch. 128–135](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0128).
- The novel's exact passage evidence is indexed in [Pequod's 17-stage itinerary](pequod-itinerary-17-stages.md) and [early-course verification](pequod-route-first-half.md). None establishes a precise modern course track or final wreck longitude.
- The underlying Norie 1844 metadata, crop geometry and rights are in [public archival manifest](../public/assets/archive/manifest.json) and [Norie IIIF manifest](../public/assets/archive/norie-1844-iiif-manifest.json). This is direct repository provenance, not guessed image coverage.
- Rumsey, [rights/permissions](https://www.davidrumsey.com/about/copyright-and-permissions) (its CC BY-NC-SA 3.0 terms); RMG [1830 chart catalogue](https://www.rmg.co.uk/collections/objects/rmgc-object-543594) and [web-image terms](https://images.rmg.co.uk/wp-content/uploads/2024/09/Images-Price-List-2024-25-WEB-ACCESSIBLE.pdf); [NYPL public-domain policy](https://digitalcollections.nypl.org/about).

**Immediate next task:** resolve actual full-coverage and rights-cleared folios, then create authentic-source visual layouts. No app-code work should begin merely because this planning document exists.
