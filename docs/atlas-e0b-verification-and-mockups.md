# E0b — Archival verification, rights matrix, mockups and implementation handoff

**Date:** 19 November 2026 · **Issue:** [#27](https://github.com/skyeuldrich/moby-dick-explorer/issues/27) · **Status:** Draft for founder review. **No application code, route data or public asset changed. No archival image was committed except the cropped, credited review mockups in `atlas-e0b-mockups/`.**

Builds on [E0](atlas-e0-editorial-design-handoff.md), the [E0b shortlist](atlas-e0b-archival-chart-shortlist.md) and the [17-stage itinerary](pequod-itinerary-17-stages.md). This replaces the first E0b pass, which could not reach any archive.

## 1. Headline

Real scans were fetched and inspected. Two shortlist assumptions **failed** and one better chart was found:

1. **The Blunt 1840 South Atlantic does not cover the Plate Ground.** Its scale runs 25°W–30°E, so the River Plate (~35–58°W) is off the sheet.
2. **The Sayer/Huddart 1787 Indian Ocean chart stops near 38–39°S**, so the **Crozets (~46°S) are off the sheet**. No inspected sheet shows them.
3. **Found: Norie, *A new and correct chart of the Atlantic Ocean*, 1 Jan 1819** (BPL). One sheet spans about 60°W–64°E and the equator to ~43.5°S, covering the Plate, St Helena, the Cape and Madagascar (stages 5–7). It replaces Blunt for the Atlantic mockups.
4. **The north Pacific sheet (Norie, 1 Oct 1825) stops at ~12–13°N and the installed Norie 1844 reaches only ~6–7°N.** The equator is on the 1844 sheet, but about 5–6° of latitude is on neither (see §3).

## 2. How the scans were inspected

Originals were downloaded to a local, **uncommitted** cache (`/tmp/atlas-e0b-cache`). Commons files were matched against Commons' own SHA-1. Coverage was read from the printed graticules and place names; imprint dates were read from the scan.

| Scan | Full size | SHA-256 of original |
| --- | --- | --- |
| Blunt 1840 (BnF `btv1b53098744v`, via Commons) | 8168 × 11857 | `1236dac687b47d009fa6bc9a93b3ef7a5ac913dab52c783d74b46b20d12733e2` |
| Sayer/Huddart 1787 (BnF `btv1b53105224k`, “1 of 2”, via Commons) | 17850 × 12786 | `6533b89f1477c98034f8c0de8d00a03ebed80e03435e4aef7eaaf8651f98fc64` |
| Norie Pacific north, 1825 (Rumsey 4612.001, via Commons) | 34225 × 15834 | `b1ff65c454c50406b5e4a08cd5484b4c9a0485b8dee8bee9ea6f47377fb42dd4` |
| Norie Atlantic 1819 (BPL `commonwealth:jh3441523`, image `jh344153c`) | 10867 × 5235 (IIIF) | previews only; hash the full file before any commit |
| Norie Pacific south, 1844 (BPL `commonwealth:vt154w90j`, image `h702vp38n`) | 25176 × 11262 (IIIF) | installed asset, see `public/assets/archive/manifest.json` |

Mockup previews used: 1800 px wide (Norie 1819, Sayer, Norie 1844), 3840 px wide (Norie 1825). Overlay coordinates are **eyeballed in preview space, illustrative, not georegistered**.

## 3. Coverage, resolution and rights matrix

| Stages | Chart | Coverage verified from pixels | Resolution | Rights evidence | Verdict |
| --- | --- | --- | --- | --- | --- |
| 1–4 | Heather 1797 (installed) | N. Atlantic; ends near Cape Verde | 16097 × 12195 full | BPL “no known restrictions” (manifest) | **Cleared; keep.** |
| 5–7 | **Norie Atlantic 1819** | River Plate, Brazil coast, St Helena, Guinea, Cape, Madagascar; ~60°W–64°E, equator–~43.5°S. Mercator. | 10867 × 5235 | BPL: no known restrictions (not a formal Public Domain Mark) | **Recommended.** Carries **other voyages' printed and pencilled tracks** (dates such as 1825, 1848) that must be disclosed in the UI. |
| 5–7 (rejected) | Blunt 1840 | Equator–65°S but only 25°W–30°E; sparse; insets of Table Bay, Walvis Bay, St Helena. **No Plate.** | 8168 × 11857 | Commons “Public domain”; Gallica terms not re-read | Not for stage 5. Optional Cape/Table Bay detail. |
| 5–7 (rejected) | Maury 1850 South Atlantic pilot chart (LoC 2009575948) | 70°W–25°W but wind-rose grid only, no coastline | 7062 × 10890 | not assessed | Rejected as a basemap. |
| 8–13 | **Sayer/Huddart 1787** | Cape, Mozambique Channel, Madagascar, Arabian Sea, Bay of Bengal, Sunda Strait/Java Head, Java Sea, China Sea, Philippines, Bashee, Formosa. Southern limit ~38–39°S. | 17850 × 12786 | Commons “Public domain”; BnF terms not re-read | **Usable for stages 8–13, but not the Crozets** and not Japan. |
| 8 | Crozets (~46°S, ~51.7°E) | **Not on any inspected sheet.** The 1819 sheet's neatline is ~3° short. | — | — | **Blocker (§8).** Mockups show an off-sheet arrow only. |
| 13–16 | **Norie Pacific north, 1825** | China coast, Korea, Japan, Bashee/Luzon/Manila/Guam, Kamchatka to the Americas; southern limit ~12–13°N | 34225 × 15834 | Commons tags “Public domain” but its Permission field states Rumsey **CC BY-NC-SA 3.0**, credit “David Rumsey Map Collection, David Rumsey Map Center, Stanford Libraries” | **Usable. CC BY-NC-SA accepted by the founder** (see §9 on share-alike). |
| 17 | Norie Pacific south, 1844 (installed) | Equator printed at about the top fifth; northern edge ~6–7°N | 25176 × 11262 | BPL: no known restrictions | **Usable for the equatorial endpoint.** The 5–6° latitude strip between this and the 1825 sheet is on neither. |
| optional | Horsburgh *China Sea*, 1850, sheet 1 (BPL `wm11d081n`) | S. China Sea, Borneo, Palawan, Sulu; not Sunda or Bashee | 8840 × 5894 | BPL: no known restrictions | Optional detail inset only. |
| optional | Maury *Whale Chart*, 1851 (BPL `x633f952x`) | World sperm/right whale grounds | 10536 × 7472 | BPL: no known restrictions | Optional overview; must be dated to its own edition. |
| — | Rumsey 5498.000 (Norie China Sea), Rumsey 4610.000 (1834 Blunt) | **Not inspected.** Item pages sit behind a reCAPTCHA wall, which was not bypassed. | — | — | Unneeded now (Sayer covers the region). |
| — | Norton world map | — | — | Not ours | **Excluded.** Not copied or traced. |

**Rights caveats.** BPL's “no known restrictions” is a catalogue statement, not a formal Public Domain Mark. The BnF Commons PD tags are evidence, not a read of the current Gallica reuse terms. LoC served HTTP 429 to direct tile requests and Gallica returned 403, so both were reached only through Commons mirrors. Nothing below upgrades any rights status.

## 4. Mockups (`atlas-e0b-mockups/`)

All frames below are **completed mockups on real, verified scans**, except D, which is a proposed interaction board with no imagery. Each frame carries its source credit and the caveat “overlay placement illustrative, not georegistered”. Regenerate: `python3 docs/atlas-e0b-mockups/build-mockups.py` (needs the local cache and headless Chrome).

| Frame | Stages | Desktop 1440×900 | Mobile 390×844 |
| --- | --- | --- | --- |
| A1 Heather, Nantucket → Cape Verde, graphite kept | 1–4 | [png](atlas-e0b-mockups/A1-heather-stages-1-4-desktop.png) | [png](atlas-e0b-mockups/A1-heather-stages-1-4-mobile.png) |
| A2 Norie 1819: Plate, Carrol, Cape | 5–7 | [png](atlas-e0b-mockups/A2-atlantic-plate-carrol-cape-stages-5-7-desktop.png) | [png](atlas-e0b-mockups/A2-atlantic-plate-carrol-cape-stages-5-7-mobile.png) + [second pan](atlas-e0b-mockups/A2b-atlantic-carrol-cape-stages-6-7-mobile.png) |
| T1 Seam: Heather lifts, 1819 sheet slides up | 4→5 | [png](atlas-e0b-mockups/T1-sheet-transition-desktop.png) | — (proposed: vertical slide) |
| B1 Sayer: Cape → Crozets arrow → Sunda | 8–11 | [png](atlas-e0b-mockups/B1-indian-cape-to-sunda-stages-8-11-desktop.png) | [png](atlas-e0b-mockups/B1-indian-cape-to-sunda-stages-8-11-mobile.png) |
| B2 Sayer: Sunda → Java Sea → Philippines → Bashee | 11–13 | [png](atlas-e0b-mockups/B2-sunda-java-sea-philippines-bashee-stages-11-13-desktop.png) | [png](atlas-e0b-mockups/B2-sunda-java-sea-philippines-bashee-stages-11-13-mobile.png) |
| C1 Norie 1825: Bashee → Japan zone, sheet-limit gap | 13–16 | [png](atlas-e0b-mockups/C1-pacific-bashee-japan-stages-13-16-desktop.png) | [png](atlas-e0b-mockups/C1-pacific-bashee-japan-stages-13-16-mobile.png) |
| C2 Norie 1844: the Line, uncertain endpoint | 17 | [png](atlas-e0b-mockups/C2-pacific-equatorial-stage-17-desktop.png) | [png](atlas-e0b-mockups/C2-pacific-equatorial-stage-17-mobile.png) |
| D Transitions and evidence grammar | — | [png](atlas-e0b-mockups/D-interaction-board-desktop.png) | — |

**Not mockups of real imagery:** stage 8 (Crozets) is only an off-sheet arrow; the Plate and Carrol Grounds are broad hatched zones and the Java, Japan and equatorial placements are zones or bands, never pins. No wreck is shown anywhere.

## 5. Transitions and interactions (proposed; T1 is mocked mid-transition)

- **Within an ocean (Heather → 1819 sheet):** the 1819 sheet slides up beneath Heather's lower margin (~800 ms), with a visible seam, shadow and a plaque swap. The sheets differ in projection and scale, so the red line **pauses and re-enters with a dashed lead-in**; it is never drawn as one continuous line.
- **Between oceans (1819 → Sayer → Norie 1825 → Norie 1844):** the sheet turns like a page (~600 ms). Scrolling back reverses exactly. `prefers-reduced-motion`: cross-fade with the plaque change.
- **Red route:** advances with scroll along the 17-segment rail.
- **Evidence grammar:**
  - Ring: a place Melville names.
  - Dashed: an inferred link between grounds.
  - Dotted: the Ch. 87 planned course (“purposing to pass”).
  - Hatched ellipse or band: a broad ground, region or the Line. **Never a pin.**
  - Off-sheet chevron: a named place beyond the printed edge (Crozets).
- **“Only what Melville tells us”:** toggles off dashed and dotted strokes and leaves rings. Keyboard operable, announced to screen readers.
- **Graphite (Ch. 44):** Ahab's pencil layer is shown only on Folio I (A1), unchanged. It is **not** carried to later sheets and is never treated as position evidence. The pencilled and printed tracks already on the 1819 sheet are historical marks of other voyages and need a visible “not the Pequod” note.
- **Ending:** the final sheet's ink yields to the existing black abyss. The three quotations and the whale/squid reveal are untouched.

## 6. Implementation handoff (do not start until approved)

**Exact assets (full-resolution files to be re-verified and hashed before commit):**

1. Norie 1819 Atlantic, BPL `jh344153c`, IIIF full 10867 × 5235 → WebP derivatives (stage 5–7 crops).
2. Sayer/Huddart 1787, BnF `btv1b53105224k` via Commons → crops for stages 8–13.
3. Norie Pacific north, Rumsey 4612.001 via Commons → crops for stages 13–16. Needs a **CC BY-NC-SA credit and license line** on every derivative.
4. Norie 1844 (installed) → stage 17 crop.

Each needs a `manifest.json` entry in the existing format (source URL, SHA-256, credit, rights evidence, processing).

**Missing inputs:** founder approval of the imagery and frames; a decision on the Crozets and the Pacific gap (§8); approved zone geometry and caption text per stage; sheet graticule registration for any real positioning (none done); a re-read of BnF/Gallica terms.

**Responsive requirements:** desktop sheet ≥ 60 % of viewport width with the caption beside or below; mobile portrait sheet panned per stage with the caption below (two pans for stages 5–7); tap targets ≥ 44 px; WebP derivatives ≤ ~2.5 MB per viewport crop, lazy-loaded; plaque never obscured; reduced motion, keyboard and reverse scroll.

**Suggested breakdown (separate bounded PRs; each with manifests, `npm test`, `npm run build`, desktop/mobile screenshots, reverse-scroll, keyboard and reduced-motion checks, draft PR, no auto-merge):**

1. **E1 Atlantic:** Norie 1819 sheet, Heather seam, Plate/Carrol/Cape zones, route data model (id, index, label, chapters, confidence, location type), evidence toggle, rail.
2. **E2 Indian Ocean and archipelago:** Sayer sheet, off-sheet Crozets, Ch. 87 planned-course styling.
3. **E3 Pacific and equatorial:** Norie 1825 and 1844 sheets, Japan zone, the Line band, hand-off to the abyss.

## 7. Reproducing the cache

Not committed. Fetch with a descriptive User-Agent:

- Commons originals through the MediaWiki API (`prop=imageinfo&iiprop=url|sha1`), then verify SHA-1.
- BPL IIIF: `https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:jh344153c/full/1800,/0/default.jpg` (1819) and `…/commonwealth:h702vp38n/full/1800,/0/default.jpg` (1844).
- Resize the Sayer original to 1800 px (`sayer1800.jpg`) and the Norie 1825 original to 3840 px (`noriepn3840.jpg`); name BPL previews `norie1819.jpg` and `norie1844.jpg`.

## 8. Open blockers and uncertainties

- **Crozets (stage 8) are off every sheet.** Options: (a) keep the off-sheet arrow; (b) a Southern Ocean sheet not yet found (an Arrowsmith/Purdy-type chart; Rumsey 13270.004 has a missing sheet); (c) a small bordered inset. Founder choice.
- **Latitude gap (~5–6°) between the 1825 and 1844 Pacific sheets.** The mockup labels it, and shows no bridging line. The 1844 sheet is the south-east Pacific, so the east–west position of the 1825 exit is only schematic.
- **Foreign tracks on the 1819 sheet** must be labelled, and the founder should confirm the sheet is visually acceptable with them.
- **Rights:** BnF/Gallica terms not re-read; BPL's wording is “no known restrictions”; Rumsey item pages were captcha-gated and unread, so the CC BY-NC-SA 3.0 wording comes from the Commons file page.
- The 1825 date is read from the scan's imprint (“October 1st 1825, J.W. Norie & Co.”). The sheet is period chart evidence, not a record of the Pequod.
- All overlays are illustrative, not registered. No mockup represents ship coordinates, dates or the wreck.

## 9. Share-alike note

The founder accepted Rumsey's CC BY-NC-SA 3.0. Derivatives of the 1825 sheet (the C1 mockups and any later crops) must carry the Rumsey credit, the license name and a note that the image was cropped and annotated, and must be offered under the same license. A site using them must remain non-commercial.

## 10. Founder-review checklist

- [ ] Approve the chart set: Heather → **Norie 1819** (not Blunt) → Sayer 1787 → Norie 1825 → Norie 1844.
- [ ] Decide how to handle the Crozets (off-sheet arrow, inset, or another sheet).
- [ ] Decide how to show the 5–6° gap between the two Pacific sheets (labelled gap as mocked, or a hand-off dissolve).
- [ ] Confirm the 1819 sheet's visible foreign tracks are acceptable with a “not the Pequod” note.
- [ ] Confirm CC BY-NC-SA 3.0 share-alike and credit lines for the 1825 sheet.
- [ ] Approve folio style: sheet slide within an ocean, page-turn between oceans (T1, D).
- [ ] Approve the line grammar and the “Only what Melville tells us” toggle.
- [ ] Approve broad zones and the Line band (no pins, no wreck).
- [ ] Confirm Ahab's graphite stays on Folio I only.
- [ ] Authorize drafting E1 only after the points above.
