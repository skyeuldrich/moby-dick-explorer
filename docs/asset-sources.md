> **Issue10 update:** the encounter now uses the transparent final AI-assisted illustration; the realistic candle is also a modern AI-assisted reconstruction. See [Issue10 source and review notes](issue10-implementation.md) for hashes, historical comparisons, and unresolved 1917 reuse rights.

> **Current encounter:** the [owner-supplied whale-and-squid painting](#owner-supplied-whale-and-squid-painting) replaces the earlier inline SVG tableau.

> **Current voyage map:** William Heather’s genuine **1797 Atlantic sea chart**, described in [the Nantucket / Atlantic correction](#nantucket--atlantic-correction--william-heather-1797) below. The 1844 Pacific chart and earlier drawings document previous iterations.

# Historical asset sources — first implemented pass

Scope: `feature/historical-asset-manifest`, following `moby-dick-asset-checklist.md`. This is an implementation manifest, not a claim that every asset category is finished. Two genuine archival images now replace the invented map and invented anatomy drawing. Five custom dim organism motifs, a spatial warm-light transition, a new candle study, and a less decorative editorial reading sheet accompany them. No stock art or generated archival facsimiles are used.

## Selected archival assets actually displayed

### 1. Ocean-current world map

- **Asset:** `public/assets/archive/hartwig-ocean-currents-1892.webp` (1200 × 706; 371,742 bytes).
- **Title:** “Map of the Globe, showing the direction of the Ocean Currents, Cotidal Lines, &c.” (book's illustration list, facing p. 3).
- **Creator/date:** cartographer not established from the available scan; reproduced in Georg Hartwig, *The Sea and Its Living Wonders*, seventh edition, Longmans, Green, and Co., London/New York, **1892**. The edition date is verified on its title page; it is not asserted to be the map's first publication date.
- **Source/holding chain:** publisher as above; digitization credited to Internet Archive; Chris Curnow, Sharon Joiner, Tom Cosmas and Distributed Proofreaders / Project Gutenberg #62011; GITenberg mirror.
- **Original edition URL:** https://www.gutenberg.org/ebooks/62011
- **Exact downloaded image:** https://raw.githubusercontent.com/GITenberg/The-Sea-and-Its-Living-Wonders-A-Popular-Account-of-the-Marvels-of-the-Deep-and-of-the-Progre__62011/077c350ec1dc7ef1b9f5dbfa98e3fab0ed30a8e8/62011-h/images/world_map_lg.png
- **Rights:** source [metadata](https://github.com/GITenberg/The-Sea-and-Its-Living-Wonders-A-Popular-Account-of-the-Marvels-of-the-Deep-and-of-the-Progre__62011/blob/077c350ec1dc7ef1b9f5dbfa98e3fab0ed30a8e8/metadata.yaml) explicitly states **“Public domain in the USA.”** Historical plate, not a modern illustration or generated cover. The historical author died in 1880. Gutenberg's release credits and title page were inspected before use.
- **Processing:** full source, converted from PNG to lossless RGB WebP using Pillow; no crop, fabricated texture, recoloring, or upscaling. The scan's existing blemishes remain. Local serving only.
- **Site use:** replaces the faux SVG world map. The red line is a separate modern **interpretive** overlay. It deliberately hides a short joining segment between the two hemispheres (a simple vector mask on the red line, not a filter on the map). This preserves sequential drawing across the projection break and is disclosed in the visible caption. It does not claim an exact Pequod route. Panning crosses the sheet on phones; all image and route coordinates share the same SVG space.
- **Review:** this is a real late-nineteenth-century physical/ocean-current map, **not** Maury's 1851 whale chart and not a navigation chart from Ahab's cabin. The scan is only 1200 px wide: readable as an atmospheric chart, insufficient for a fine-print map reader. A higher-resolution, closer-to-1851 chart remains desirable.

### 2. Cetological skull plate

- **Asset:** `public/assets/archive/gray-cetology-skull-1871.webp` (450 × 475; 143,246 bytes).
- **Title:** “Figs. 1 & 2. Side view and top view of the skull of *Neobalæna marginata*, from Dr. Hector’s figures.” Caption and surrounding classification inspected in the source.
- **Creator/date:** John Edward Gray, *Supplement to the Catalogue of Seals and Whales in the British Museum*, **1871**, printed by order of the Trustees; Taylor and Francis, London. Caption credits Dr. Hector's figures; the engraver is not identified.
- **Source/holding chain:** British Museum publication; Internet Archive/Canadian Libraries digitization credited in the release; Bryan Ness and Distributed Proofreaders / Project Gutenberg #69699; GITenberg mirror.
- **Original URLs:** https://www.gutenberg.org/ebooks/69699 ; https://archive.org/details/supplcataseal00brituoft
- **Exact downloaded image:** https://raw.githubusercontent.com/GITenberg/Supplement-to-the-catalogue-of-seals-and-whales-in-the-British-Museum_69699/e6bfb7ed62a4284298eed154cbb60487b6859751/69699-h/images/figure01-02.jpg
- **Rights:** source [metadata](https://github.com/GITenberg/Supplement-to-the-catalogue-of-seals-and-whales-in-the-British-Museum_69699/blob/e6bfb7ed62a4284298eed154cbb60487b6859751/metadata.yaml) explicitly states **“Public domain in the USA.”** Original 1871 figures, not the site's modern cover. Title page, release credits and figure caption checked before implementation.
- **Processing:** complete source JPEG decoded to lossless RGB WebP. No relabeling of the printed figure numbers, crop, artificial aging or upscaling. Display height is capped; phones receive the whole plate rather than a misleading crop.
- **Site use:** replaces the newly invented sperm-whale “anatomy” SVG in the separate archive scene **after** the route completes. Caption retains the historical name and says **“A baleen whale skull, not a sperm whale.”** This is a cetological comparison, not an anatomical diagram of Moby Dick.
- **Review:** scholarly and genuine, but later than the novel and a different whale group. A full-body sperm-whale plate from Beale is still the preferred candidate to evaluate when its scan and rights record are accessible. Do not silently relabel this skull as a sperm whale.

### Reproducibility / rights scope

`public/assets/archive/manifest.json` records the exact source URLs pinned to mirror commits, source and derivative SHA-256 values, native dimensions, conversion and usage. `node scripts/verify-assets.mjs` verifies committed bytes against the manifest. No network requests are made by the site for images. The public-domain finding is the source's US rights statement; this document does not invent a separate worldwide CC license. We extracted historical images rather than copying the whole Gutenberg ebook or its trademark/license wrapper. No captions or historical labels are painted out.

## Historical references actually informing the new work

### 3. Spermaceti candle — period text, original rendering

- **Reference:** Michael Faraday, *The Chemical History of a Candle*, edited by William Crookes, Lecture I: the mid-nineteenth-century lectures, examined here in the **1908 Chatto & Windus “new impression”**. This is not a scan of the 1861 first edition. Project Gutenberg #14474 / GITenberg.
- **Original URL:** https://www.gutenberg.org/ebooks/14474
- **Verified text:** https://github.com/GITenberg/The-Chemical-History-of-a-Candle_14474/blob/8e778424cd5462a2d553cc0c5c141846994039f2/14474.txt (Lecture I).
- **Checked evidence:** Faraday explicitly identifies “a sperm candle” made from the purified oil of the spermaceti whale and discusses contemporary wicks, moulding, tapering and finishing. His descriptions of different waxes/manufacturing methods are **not** all asserted to apply to sperm wax specifically.
- **Rights:** [source metadata](https://github.com/GITenberg/The-Chemical-History-of-a-Candle_14474/blob/8e778424cd5462a2d553cc0c5c141846994039f2/metadata.yaml): “Public domain in the USA”; Faraday died in 1867 and Crookes in 1919. The examined title page explicitly says 1908. Text used as research; no archival candle image is copied.
- **Site file/use:** `public/assets/spermaceti-study.svg`, original lightweight rendering: slender smooth ivory/cream wax, restrained cotton wick and a shallow brass chamberstick with ring handle, socket and dished rim. Replaces the old drippy brown wax and polygon candlestick. Flame remains a separately composited scroll-controlled layer.
- **Important limitation:** this is **not a replica of a verified museum candle/holder**. Faraday’s lecture text confirms the period material and candle practice, not the specific holder geometry. The brass chamberstick form remains a provisional period-style interpretation; object-level museum verification is unfinished. The interface and field notes call it a reconstruction. Do not call this an archival photograph or finished artifact-authentic hero.
- **Existing contextual reference retained:** New Bedford Whaling Museum, Yankee Whaling: https://www.whalingmuseum.org/research/research-resources/whaling-history/yankee-whaling/ . Its candle material context was supplied in v0.3; the live page is currently blocked here, so it has not been independently re-fetched during this pass.

### 4. Marine form and light — original motifs, not scans

- **Files:** `src/abyss.js` and the associated CSS. Five motifs: lure-bearing angler-like silhouette, colonial chain, jelly-like bell, small organism and luminous thread; nine dim points of marine snow. They are deliberately non-diagnostic stylizations, not claims about a named species at an exact depth.
- **Checked period reference:** Hartwig's above 1892 edition, p. 356, illustrated *Physophora Philippii* with float, swimming bells and tentacles; p. 423 onward, historical accounts of luminous marine organisms appearing as star-like points. These inform the colonial/bell vocabulary and light restraint. We do **not** turn his surface-phosphorescence examples into a scientific record of this abyss scene.
- **Original URL:** https://www.gutenberg.org/ebooks/62011 ; source image/form reference https://github.com/GITenberg/The-Sea-and-Its-Living-Wonders-A-Popular-Account-of-the-Marvels-of-the-Deep-and-of-the-Progre__62011/blob/077c350ec1dc7ef1b9f5dbfa98e3fab0ed30a8e8/62011-h/images/356.png . Reference viewed; not embedded. Same public-domain edition as above.
- **Biological restraint:** light concentrated in tiny lure/colony/rim points; bodies are much dimmer, no eyes-as-characters, neon hue or fantasy fins. The angler is not identified as Hartwig's *Lophius piscatorius* (a different, bottom-dwelling form); his entry is **not** evidence for an abyssal luminous species. Contemporary photographic/scientific validation of the motifs remains pending.
- **Modern reference candidates still unverified:** Smithsonian Ocean anglerfish https://ocean.si.edu/ocean-life/fish/anglerfish ; NOAA Ocean Exploration https://oceanexplorer.noaa.gov/ . Direct access was denied; no images downloaded and no licenses assumed.
- **Motion:** tiny 44–67 second transform drifts; no flicker or autonomous reveal. Scene opacity, parallax and warm approach derive from scroll progress. Hidden-scene drifts pause. Reduced motion removes the drift and spatial travel. The final abyss reuses the motifs at lower visibility around the existing reconstruction.

### 5. Manuscript / facts — editorial sheet, not a logbook facsimile

- **Current use:** original ruled reading-sheet layout. Plain typographic hierarchy replaces decorative faux-ledger styling; no fabricated cursive, signatures, balance totals or receipts. Label: **“Editorial reading sheet / journal excerpt + modern notes.”** The genuine period quotation and modern statistics remain distinct.
- **Actual journal reference retained:** Henry Smith, journal of the bark *Marcella*, **1840–1841**, quotation supplied in v0.3 and attributed to the New Bedford Whaling Museum's reproduction: https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/ . No manuscript page has been obtained or rights-checked; only the existing attributed quotation is displayed. The live museum page could not be independently re-fetched during this pass.
- **Economic sources retained:** same NBWM page for the *Milton* (1836) and *Benjamin Tucker* (1851) voyage figures; https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/ for lays; https://www.pbs.org/wgbh/americanexperience/films/whaling/ for Dolin's 1846 estimates. These are the authoritative v0.3 content pool, not new numbers gathered in this pass. No publisher/museum image reuse rights are inferred from those links.
- **Outstanding:** direct visual research in actual whaling logs, account books or broadsides. Until a page and its rights record are verified, the panel must remain an openly modern editorial sheet rather than masquerading as a historical contract.

## Candidate review and classification

| Category | Candidate | Classification / decision |
| --- | --- | --- |
| Whale | Gray 1871, figs. 1–2, *Neobalæna marginata* skull | **Use archival image directly**, lossless web conversion; selected, full plate. |
| Whale | Gray 1871, fig. 7, *Orca stenorhyncha* | Genuine edition/caption checked; **use archival image directly** possible, not selected: another taxon and no advantage over the full two-view skull. |
| Whale | Hartwig 1892, p. 98, “Skull of Whale, with the Baleen” (`images/098a.png`) | Genuine edition/caption checked; **use archival image directly** possible, not selected: very small source and less detail. |
| Whale | Beale, *Natural History of the Sperm Whale* (1839), Wellcome/BHL scans from prior brief | Preferred full-body candidate; **restore/clean archival image** only after inspecting original and rights record. Not verified/downloaded in this pass. |
| Map | Hartwig 1892 ocean-current globe map | **Use archival image directly + modern overlay**, selected; original coloring and blemishes retained. |
| Map | Maury, *Whale Chart (Preliminary Sketch)*, 1851, UWM https://collections.lib.uwm.edu/digital/collection/agdm/id/322 | Better contextual date; **use/clean archival image** candidate pending reachable scan and rights record. Not used. |
| Candle | Faraday, Lecture I (1908 reprint of the earlier lectures) | **Create original reference-grounded rendering**, selected as period text, not a visual replica. |
| Candle | Museum-held spermaceti candle + contemporary chamberstick | **Hybrid composite / reference-grounded rendering** pending object-level access. No object accession or form invented. |
| Manuscript | *Marcella* journal (NBWM reproduction) | Existing **quotation in modern editorial layout** retained; facsimile use pending image/right verification. |
| Manuscript | Nantucket ships' papers/account books, CLIR collection project https://registry.clir.org/projects/2374/ | **Hybrid composite / layout reference** candidate, not inspected and no facsimile used. |
| Deep sea | Hartwig's colonial/bell illustrations and historical light accounts | **Create new motifs from form references**, not archival specimens or a modern-depth assemblage. |
| Deep sea | Smithsonian / NOAA deep-sea photography | Contemporary scientific-reference candidates pending access; no borrowed photography. |

## Review before continuing

1. Do the organisms remain discoverable at their deliberately very low luminance on your screen? A bright room or an uncalibrated phone may make them nearly disappear.
2. Is a clearly dated **1892 two-hemisphere map** acceptable as an initial authentic replacement, or should the next pass require Maury/another pre-1851 chart?
3. Is the **baleen-whale skull comparison** the right archival moment, or should we prioritize a full-body sperm-whale plate from Beale next?
4. Candle holder needs museum-object validation; the current smooth wax is an informed reconstruction, not a completed object replica. The manuscript also remains an editorial sheet.
5. The final sperm-whale/giant-squid tableau is still the original stylized reconstruction. The unused earlier harbor and anatomy drawing remain in `src/scenes.js` but are not presented.

## Access, testing and branch scope

Direct requests to Commons, Internet Archive, BHL, LOC, NBWM and Smithsonian were rejected by the environment's enforced package-host-only policy. No policy bypass or third-party image proxy was used. Public-domain editions were instead inspected through normal, permitted Gutenberg/GITenberg GitHub mirrors. Rights and images were checked there before use. Broader museum/candle/manuscript research remains partly blocked; the user has been asked about environment access while independent implementation continued.

Images are local; no paid service, new runtime dependency, hotlinking or high-resolution artificial enlargement. Two derivatives total about 503 KiB. Desktop/mobile scene, reverse scroll, native wheel/touch, keyboard, reduced-motion, restoration, asset-loading and source-label tests are run in Chromium. Physical iOS/Android and Safari remain untested. Work belongs only to `feature/historical-asset-manifest`; do not merge or deploy over main during this pass.

### Validation recorded for this pass

The ten-test Chromium suite passed, followed by a focused phone reduced-motion check after disabling the new map camera in that mode. The production Pages-path build, desktop/phone asset and interaction smoke checks, and SHA-256 asset checks passed. Desktop and phone screenshots were inspected, including caption placement. A four-second synthetic production traversal at 390×844, DPR 3 and 4× CPU throttle recorded p95 16.8 ms, one interval over 50 ms and 1.757 s main-thread task time in that run; these are emulation observations, not a physical-phone FPS guarantee.

## v0.4 superseding source audit and visible assets

This section supersedes earlier descriptions of the *currently displayed* Hartwig map and Gray skull. Those files remain in the repository as prior-iteration sources; v0.4 displays the regional chart and Beale plate below.

### Beale's sperm-whale outline — selected and verified

Thomas Beale, *The Natural History of the Sperm Whale* (London: John Van Voorst, **1839**), printed p.23, Fig.1. Holding institution and digital source: **Wellcome Collection**. [Catalogue record](https://wellcomecollection.org/works/r9yqq4dt); [IIIF manifest](https://iiif.wellcomecollection.org/presentation/b29332576); [original full-resolution source](https://iiif.wellcomecollection.org/image/b29332576_0043.jp2/full/full/0/default.jpg).

The record and IIIF manifest explicitly identify [Public Domain Mark 1.0](http://creativecommons.org/publicdomain/mark/1.0/). Scholar and lead inspected the image before implementation. Original page is preserved unchanged as `public/assets/archive/beale-1839-p23-source.jpg` (2033×3510). The display file `beale-1839-fig1.webp` is a lossless crop `[0,1500,1980,2070]` (1980×570), retaining Fig.1 heading and original anatomical letters. No anatomy was retouched; the source scan already clips the far-left fluke tip. Both full and derivative files have source/derivative hashes and processing records in `manifest.json`. Modern caption transcribes a=spout-hole, b=case, f=fin from Beale's printed key; it does not paint new labels onto the engraving.

### Regional chart — original rendering, checked geography

Natural Earth `ne_110m_land.geojson`, from [the maintainers' repository](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), saved as `src/data/land.geo.json`. [Source rights](https://github.com/nvkelso/natural-earth-vector/blob/master/LICENSE.md) explicitly state all versions of their vector/raster data are public domain. Main contributors: Tom Patterson, Nathaniel Vaughn Kelso and others. This is modern geography, **not an old chart**. `src/regional-chart.js` renders an original period-inspired Pacific coastal study and a continuous curved interpretive route in the same projection. The view follows offshore Central America, Ecuador, Peru and Chile. Automated independent ray-casting checks sample the rendered route against the land polygons; no land crossings are permitted. The old hemisphere-break mask is no longer used. No exact Pequod coordinates are asserted.

### Economy and prose — sources actually fetched and read

Direct source access was restored for this iteration. Melville Scholar verified the following against the live named pages:

- [PBS American Experience, *Into the Deep* transcript](https://www.pbs.org/wgbh/americanexperience/films/whaling/), Eric Jay Dolin's “golden age” passage: 1846's 735 American whaleships out of 900 worldwide, 20,000 men aboard, $70 million infrastructure, 70,000 direct/indirect livelihoods. Displayed as historical estimates, not exact census counts or current dollars.
- [New Bedford Whaling Museum, Whales and Hunting](https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/): *Milton* (1836) captain $5,882 and worst-paid seaman $571; *Benjamin Tucker* (1851) 73,707 gallons whale oil, 5,348 gallons sperm oil, 30,012 pounds baleen, and $45,320 net profit after expenses. This profit includes owners' share; it is not crew pay or the price of one whale.
- [Life Aboard](https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/): lays were percentage shares rather than conventional wages, with advances and store purchases charged against them. The interface says “subject to deductions”; it does not impose an unsupported universal accounting definition.
- [Project Gutenberg #2701](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm), Chapter 41: “all my means are sane, my motive and my object mad.” The preceding sentence imagines a glimpse into Ahab's heart; this is Ishmael's narration, not Ahab's spoken dialogue. Chapter 44 excerpt remains accurate, with editorial capitalization of the opening “Almost.” We verified Gutenberg, not an independent 1851 facsimile collation. The novel's original publication year is 1851.

The economic sheet is modern annotation, not a fabricated manuscript. The *Marcella* quotation has been removed. The original candle, harbor, abyss organisms and whale/squid reconstruction retain their prior provenance/limitations; the encounter remains labeled an artistic reconstruction based on indirect evidence.

The regional coastline is generated reproducibly by `scripts/build-chart.mjs` into `public/assets/regional-coast.svg`, which is served as a static image separate from the animated route. Both use `src/chart-geometry.js`; the original geometry remains in the repository for verification, not in the browser bundle. NHA's current verified fire reference is https://nha.org/nha-offers-new-tour-of-the-great-fire/ (July5 2018). Pair with https://nha.org/research/nantucket-history/history-topic/whaling/ for the island's industry into the1850s.

## Archival chart correction — Norie, 1844

This replaces the v0.4 Natural Earth drawing in the moving voyage. The actual scanned chart supplies all visible coastline, lettering, rhumb lines, soundings, and paper wear; no newly drawn coastline, faux grid, tint, or artificial aging is overlaid. The red route alone is a modern addition.

- **Asset:** *The southern or lower part of the Pacific Ocean*.
- **Creator/title/date:** J.W. Norie & Co.; Charles Wilson, publishers, London. Catalogue date 1844; edition “Additions 1839 & 44.” Call number G9251.P5 1844 .J82. Do not separately date or attribute the pencil annotations: the catalogue does not establish their date or ship.
- **Holding institution:** Boston Public Library, Norman B. Leventhal Map & Education Center.
- **Original record:** https://collections.leventhalmap.org/search/commonwealth:vt154w90j
- **Archival identifier:** https://ark.digitalcommonwealth.org/ark:/50959/vt154w90j
- **Rights evidence / IIIF manifest:** https://ark.digitalcommonwealth.org/ark:/50959/vt154w90j/manifest. Both record and manifest state **“No known copyright restrictions. No known restrictions on use.”** This is the institution's exact wording, not a formal Public Domain Mark. The underlying chart is a nineteenth-century published work; the repository retains a copy of the institution's manifest.
- **Historical relevance:** catalogued as a blueback nautical chart with relief by hachures and depths by soundings. It covers the South Pacific and western South America, including Patagonia. The full sheet includes a note addressed to whalers about migration and currents near Australia, and manuscript ship tracks and whale sightings in pencil. The Australia note is outside the site's eastern crop; do not claim it is visible there or that Melville/Ahab used this particular sheet.
- **Actual scan:** 25,176×11,262, image ID `commonwealth:h702vp38n`. Full sheet image service: https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:h702vp38n/info.json
- **Downloaded source crop:** https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:h702vp38n/17500,0,7676,11262/2400,/0/default.jpg. The IIIF region is x=17,500, y=0, width=7,676, height=11,262; server reduction yields 2400×3521. The crop selects western South America and nearby ocean so the visitor travels over a closer regional view rather than a distant complete Pacific sheet.
- **Local files:** `public/assets/archive/norie-1844-pacific-east-source.jpg` (unmodified IIIF download); `norie-1844-pacific-east.webp` (quality-88 WebP, same pixels/dimensions); `norie-1844-iiif-manifest.json` (institutional evidence). Source and derivative sizes/hashes are recorded in `manifest.json` and checked by `scripts/verify-assets.mjs`. No hotlink at runtime.
- **Site use:** sustained voyage between Nantucket and Beale's separate anatomy plate. The red route is registered directly in the scan's pixel space, remaining offshore along Ecuador, Peru, and Chile. It is interpretive, not precise Pequod coordinates or an archival record of one actual voyage. Original pencil markings remain visible and distinct from the red overlay. The map image is unchanged during scrolling; only the shared camera transform and red stroke change.
- **Verification limits:** independent manually traced land envelopes in `tests/fixtures/norie-1844-land.json` catch gross route/coast collisions; these are not a new georeferenced historical survey. Rendered inspection against the scan is still required. The image is a regional crop, not a fine-print reader for the entire chart. Original repairs, handwriting, and catalogue stamps are retained.

**Choice:** Norie's 1844 chart is both earlier than the novel and an actual navigational object with whaling annotations. Maury's alternative BPL sheet `ht250c50j` is also unrestricted but is primarily a monthly wind-rose pilot chart dated approximately 1851–1859; it is not embedded. Rumsey's Imray alternative was not used because the scan's stated license adds noncommercial/share-alike conditions.

### Validation of the chart correction

The bounded Melville Scholar pass independently checked the institutional record, nautical-chart classification, 1844 edition, rights wording, and limits on dating the manuscript marks. The Visual Director inspected actual start/middle/end screenshots at desktop and phone widths; its initial concern about a mobile panel covering the red line was repaired with a compact top-right panel, then visually rechecked with no remaining blocker. The lead inspected the rendered scan and retained the original scene order.

All 20 Playwright tests passed, including 1,601 route samples against the independently traced scan land masks, actual served-image hash, viewport coverage, forward/reverse route progress, phone panel/route separation, reduced motion, existing literary dialogs, keyboard skip, and the complete scene sequence. Production build and six asset hash checks passed. The preview verifier passed seven scene checkpoints at 1440×900, 390×844, and 360×640 with no HTTP/script errors. Chromium phone emulation is not physical-device testing.

The existing four-second full-sequence stress script, at 390×844 / DPR 3 / 4× emulated CPU slowdown, observed a 16.8 ms p95 RAF interval with two gaps over 50 ms. This synthetic result does not establish sustained physical-phone frame rate. The change keeps a static compressed raster beneath the lightweight vector route; there is no per-frame image processing or runtime archive request.

## Nantucket / Atlantic correction — William Heather, 1797

The founder corrected the voyage’s geography: it must begin at Nantucket and follow Melville’s actual narrative, rather than an unrelated Pacific coastal leg. [The first-half route reading](pequod-route-first-half.md) documents the text, first-half scope, quotations, route sequence, and limits.

- **Asset name/title/date:** *A new chart of the Atlantic or Western Ocean*, William Heather, 1797. The catalogue notes “by J. Norie, teacher of navigation, Leadenhall Street” in the lower-left margin. Do not confuse the chart’s publication year with the Pequod’s departure year, which chapter 22 does not supply.
- **Holding institution:** Boston Public Library, Norman B. Leventhal Map & Education Center.
- **Original URL:** https://collections.leventhalmap.org/search/commonwealth:kk91fr56g
- **Rights / provenance:** https://ark.digitalcommonwealth.org/ark:/50959/kk91fr56g/manifest. Record and IIIF manifest state **“No known copyright restrictions. No known restrictions on use.”** Quote the institutional statement rather than inventing a formal Public Domain Mark. A copy of the institutional manifest is retained locally.
- **Historical relevance:** a genuine North Atlantic navigation chart, with soundings, prevailing-current arrows, tracks of 1790s voyages, and seven coastal views. It includes Nantucket, the Azores/Western Isles, and Cape Verde. It is not presented as a specific chart used by Melville or Ahab. Existing printed voyage tracks and manuscript marks are not the Pequod’s.
- **Full scan:** 16097×12195, IIIF image ID `commonwealth:kk91fr57r`. https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:kk91fr57r/info.json
- **Downloaded image:** https://iiif.digitalcommonwealth.org/iiif/2/commonwealth:kk91fr57r/full/4000,/0/default.jpg — the image service returns 4001×3031. This is a reduced complete sheet, not a crop.
- **Local assets:** `public/assets/archive/heather-1797-atlantic-source.jpg` (unmodified download, 2,357,291 bytes); `heather-1797-atlantic.webp` (complete same sheet, 1,930,454 bytes, quality-82 lossy encoding); `heather-1797-iiif-manifest.json`. Source/derivative SHA-256 and exact dimensions/processing are in the archive manifest and verified by the asset script. Lossy encoding changes pixel values; there is no recoloring, invented aging, retouching, or replacement coastline.
- **Site use:** sustained map sequence begins just seaward of the small printed Nantucket island. A single red line follows the narrated southward departure, crosses toward the Azores, and continues south toward Cape Verde. The actual scan and route share one pixel-space camera. Raster, red route, and modern labels remain distinct. Dots mark reconstructed offshore positions; marker labels fade after a ground is passed to keep the mobile view clear.
- **Literary rights/source:** Melville’s nineteenth-century text is public domain in the US. Chapter 51 supplies the sequence of cruising grounds; chapters 22 and 28 anchor departure and initial southward motion. Exact ship fixes are absent. Full citations and the successfully inspected pinned Gutenberg mirror are recorded in the route reading.
- **Limits:** this chart shows the **beginning**, ending at Cape Verde. The remaining first-half itinerary is in the accessible reading alternative and notes, not drawn onto geography the chart does not include. The single-sheet view remains static for reduced motion. The old Pacific assets remain preserved as prior-iteration sources; they are no longer displayed.

## Owner-supplied whale-and-squid painting

- **Asset:** `public/assets/moby-dick-abyss-whale-squid.webp`.
- **Creator/title/date:** creator and creation date were not supplied. The filename is the project owner’s supplied name; no historical artist attribution or publication date is inferred from the style.
- **Source:** image supplied and approved by the project owner in this conversation, then uploaded directly to the repository in commit [`c18caa6`](https://github.com/skyeuldrich/moby-dick-explorer/commit/c18caa668d2b90a8f3bc2674b4fe616190a83c79). [Exact uploaded file](https://github.com/skyeuldrich/moby-dick-explorer/blob/c18caa668d2b90a8f3bc2674b4fe616190a83c79/public/assets/moby-dick-abyss-whale-squid.webp).
- **Rights/use:** the project owner explicitly requested its use in the website. No public-domain, open-license, museum, or archival provenance is asserted for this supplied artwork.
- **Original bytes:** WebP, RGB, 1672×941, 166,290 bytes; SHA-256 `3d99db544201f8b49a7208c1a49aef2436d73353f282b2ba6313ef1f7b7b752b`. The uploaded file is served unchanged; no recompression, pixel edits, crop, or generated replacement. The browser applies only layout, edge feathering, ambient shading, and a scroll-linked reveal.
- **Site use:** replaces the complete inline SVG whale-and-squid illustration in the final abyss scene. The existing encounter wrapper continues to fade, translate, and scale with reversible native scrolling. The viewport progressively uncovers the painting as it rises from below; its lower squid and tentacles enter view gradually. Since both animals are one image, there is no separate per-animal opacity animation.
- **Responsive/accessibility:** explicit image dimensions reserve its aspect ratio; it fits within desktop, phone, and landscape viewports at the ending. The phone caption remains above the image. Reduced motion shows the whole painting without travel. Alt text and field notes identify an artistic reconstruction; indirect-evidence interpretation and the AMNH link remain.
- **Historical distinction:** Beale’s separately displayed 1839 whale plate remains the archival illustration. This painting is an artistic reconstruction, not another historical anatomical plate and not documentation of a directly witnessed fight. Earlier descriptions of an original stylized SVG encounter record previous iterations.
