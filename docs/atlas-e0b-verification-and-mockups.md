# E0b — Archival verification, rights matrix, mockups and implementation handoff

**Date:** 19 November 2026 · **Issue:** [#27](https://github.com/skyeuldrich/moby-dick-explorer/issues/27) · **Status:** Draft for founder review. **No application code, route data or public assets changed. No new archival image was committed.**

Builds on [E0](atlas-e0-editorial-design-handoff.md), [the E0b shortlist](atlas-e0b-archival-chart-shortlist.md) and the [17-stage itinerary](pequod-itinerary-17-stages.md).

## 1. Headline: the new scans could NOT be obtained

This agent environment resolves only GitHub hosts. Every archive host failed DNS (`commons.wikimedia.org`, `upload.wikimedia.org`, `gallica.bnf.fr`, `www.davidrumsey.com`, `www.loc.gov`, `creativecommons.org`), for both `curl` and the web-fetch tool. Therefore:

- **No Blunt, BnF Indian Ocean, Rumsey/Norie or Arrowsmith pixels were inspected.** Resolution, coverage (Crozets, Bashee, Japan, equator) and per-file rights are **still unverified**. The shortlist's figures are unconfirmed catalogue claims.
- Rights terms could not be re-read; nothing below upgrades any rights status.
- Nothing was substituted, drawn or generated. Mockups of unobtained sheets are hatched placeholders.

**Unblock options (founder choice):** (a) re-run this task in an environment with open web access; (b) the founder downloads the originals and drops them in a private location/PR comment for inspection; (c) approve inspecting via IIIF endpoints that are reachable from a permitted network.

## 2. What *was* verified (local assets)

| Finding | Evidence |
| --- | --- |
| **Heather 1797 does not reach Plate, Carrol or the Cape.** The printed sheet's southern limit is the Gulf of Guinea/northern South America (~5°N). It covers stages 1–4 only. | Viewed the full sheet (`public/assets/archive/heather-1797-atlantic.webp`, 4001 × 3031). Confirms E0's “second sheet required” and the red route ending at Cape Verde. |
| **Installed Norie 1844 is the south-east Pacific only** (western South America) and cannot serve Japan or the equatorial endpoint. | `manifest.json`: title “southern or lower part of the Pacific Ocean”, crop region 17500,0,7676,11262. |
| Heather and Norie 1844 are rights-recorded: BPL “no known copyright restrictions” (not a formal Public Domain Mark). | `public/assets/archive/manifest.json`. |

## 3. Source / rights matrix

Legend: ✅ verified here · ⚠️ catalogue claim only, unverified · ⛔ blocked.

| Stages | Candidate | Coverage | Resolution | Rights (as reported) | Status / blocker |
| --- | --- | --- | --- | --- | --- |
| 1–4 | Heather 1797 (BPL), installed | ✅ N. Atlantic only | ✅ 16097 × 12195 full; 4001 wide installed | BPL: no known restrictions | **Cleared, reuse.** |
| 5–7 | Blunt *South Atlantic*, 1840, BnF `btv1b53098744v` via Commons | ⚠️ title: equator–65°S; Plate/St Helena/Cape coastline plausible | ⚠️ listed 8,168 × 11,857 | ⚠️ Commons tags PD (US/France); BnF Gallica terms not re-read | ⛔ Not downloaded. Verify scan, Commons file page and Gallica reuse terms; record edition (1840 vs 1834). |
| 5–7 alt | Blunt 1834, Rumsey 4610.000 (whaler-annotated copy) | ⚠️ same | ⚠️ unknown | ⚠️ Rumsey: CC BY-NC-SA 3.0 on downloads | ⛔ Real owner pencil marks would read as Ahab’s; must be labelled. NC/SA conflicts need a founder/legal decision. |
| 7–9 | Sayer/Huddart 1787, BnF `btv1b53105224k` | ⚠️ Cape→Canton by title; **Crozets (~46°S) unconfirmed** | ⚠️ 17,850 × 12,786 | ⚠️ Commons PD claim | ⛔ Coverage gate. Fallback Arrowsmith (Rumsey 13270.004, NW sheet missing). |
| 10–13 | Norie *China Sea & East India Archipelago* (Rumsey 5498.000) | ⚠️ Sunda/Philippines by catalogue; Bashee unconfirmed | ⚠️ | ⚠️ CC BY-NC-SA 3.0 | ⛔ Not inspected. Dealer images (Heather 1799 at The Map House) are **not** usable. |
| 13–17 | Norie *Pacific, Northern Sheet* (Rumsey 4612.001) | ⚠️ Japan named by publisher; equator coverage unknown | ⚠️ | ⚠️ CC BY-NC-SA 3.0 | ⛔ Not inspected. |
| — | Norton world map | — | — | Not ours | **Excluded.** Not copied or traced. |

**Rights risks to decide before any commit:** Rumsey’s CC BY-NC-SA 3.0 (non-commercial, share-alike) may not fit a derivative annotated site; BnF/Gallica reuse conditions must be read from the actual item; Commons PD tags are evidence, not proof. Prefer LoC/BPL/BnF items with explicit statements. Record file URL, SHA-256, credit and crop for each in `manifest.json`, as the existing assets do.

## 4. Mockups (`docs/atlas-e0b-mockups/`)

Regenerate with `python3 docs/atlas-e0b-mockups/build-mockups.py` (uses headless Chrome; imagery only from the installed Heather sheet).

| Frame | Desktop 1440×900 | Mobile 390×844 | Status |
| --- | --- | --- | --- |
| A1 Folio I, stages 1–4, real Heather + existing route + graphite + evidence chips | [png](atlas-e0b-mockups/A1-heather-stages-1-4-desktop.png) | [png](atlas-e0b-mockups/A1-heather-stages-1-4-mobile.png) | **Completed mockup (cleared imagery).** Route is the existing `routeCoordinates` reading aid. |
| A2 Seam Heather → Blunt; Plate, Carrol, Cape | [png](atlas-e0b-mockups/A2-sheet-seam-plate-carrol-cape-desktop.png) | [png](atlas-e0b-mockups/A2-sheet-seam-plate-carrol-cape-mobile.png) | **Proposed.** Lower sheet is a placeholder; real Heather lower margin shown above it. |
| B Indian Ocean + Sunda → Philippines | [png](atlas-e0b-mockups/B-indian-ocean-sunda-desktop.png) | [png](atlas-e0b-mockups/B-indian-ocean-sunda-mobile.png) | **Proposed; imagery blocked.** |
| C Japan + equatorial uncertainty | [png](atlas-e0b-mockups/C-pacific-japan-equator-desktop.png) | [png](atlas-e0b-mockups/C-pacific-japan-equator-mobile.png) | **Proposed; imagery blocked.** |
| D Transitions + line grammar | [png](atlas-e0b-mockups/D-interaction-board-desktop.png) | — | **Proposed.** |

Not delivered: true chart-backed frames for Plate/Carrol/Cape, Indian Ocean, Sunda, Japan, equator.

## 5. Transitions and interaction design (proposed)

- **Sheet change:** within Folio I the Blunt sheet unfolds from beneath Heather’s lower margin with a visible seam and plaque swap (title, year, archive). Between oceans the sheet turns like a page (~600 ms); `prefers-reduced-motion` = cross-fade. Scrolling back reverses exactly.
- **Red route:** advances with scroll; pauses at each seam and re-enters with a dashed lead-in.
- **Evidence grammar:** solid ring = narrated ground; dashed = inferred link; sparse dotted = planned course (Ch. 87 “purposing to pass”); wide hatched band = equatorial uncertainty (no pin, no coordinates).
- **“Only what Melville tells us”:** button toggles dashed/planned strokes off; keyboard-operable, announced, state persisted for the session.
- **Graphite:** Ahab’s Ch. 44 pencil layer stays on Folio I, unchanged and never treated as evidence; not extended to later sheets.
- **Ending:** the final sheet’s ink yields to the existing black abyss; the three quotations and whale/squid are untouched.

## 6. Implementation handoff (do not start until approved)

**Exact assets needed (all pending verification):** Blunt South Atlantic scan; Indian Ocean chart (BnF 1787 or alternate); Norie China Sea/Archipelago; Norie Pacific Northern sheet. Per asset: source URL, full-scan size, SHA-256, crop region, credit text, rights evidence.

**Missing inputs:** the scans/inspection (§1); rights decision on CC BY-NC-SA; founder approval of chart set and folio style; approved zone geometry and caption text per stage (itinerary supplies confidence/types, not coordinates); registration of each sheet’s graticule from the scan itself.

**Responsive requirements:** desktop sheet ≥ 60 % viewport width with caption beside; mobile portrait sheet panned/zoomed to the stage with caption drawer below; tap targets ≥ 44 px; WebP derivatives ≤ ~2.5 MB per viewport crop, lazy-loaded; plaque never obscured; reduced-motion and reverse scroll.

**Suggested breakdown (separate bounded issues/PRs):**
1. **E1 Atlantic extension** — Blunt sheet, seam, Plate/Carrol/Cape zones, evidence toggle, stage rail, route data model (id, index, label, chapters, confidence, location type, caption).
2. **E2 Indian Ocean + archipelago** — sheet turn, Ch. 87 planned-course styling.
3. **E3 Pacific + equatorial** — Japan sheet, uncertainty band, hand-off to the abyss.
4. Each: asset manifest entries, `npm test`, `npm run build`, desktop/mobile screenshots, reverse-scroll, keyboard and reduced-motion checks, draft PR, no auto-merge.

## 7. Founder-review checklist

- [ ] Choose how to unblock image access (§1).
- [ ] Approve Heather → Blunt (1834 vs 1840) as the Atlantic pair, once inspected.
- [ ] Decide whether Rumsey CC BY-NC-SA material is acceptable; otherwise prefer BnF/LoC/BPL items.
- [ ] Approve folio style: physical sheet seams, page-turn between oceans.
- [ ] Approve line grammar and the “Only what Melville tells us” toggle.
- [ ] Approve the equatorial uncertainty band (no pin).
- [ ] Confirm Ahab’s graphite stays on Folio I only.
- [ ] Authorize drafting E1 only after real-chart mockups for stages 5–17 exist.
