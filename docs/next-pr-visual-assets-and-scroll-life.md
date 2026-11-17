# Next PR — Historical imagery, candlelight, and swimming deep-sea creatures

**Status:** Founder-requested implementation checklist; no artwork swap or motion code has been applied by this document.  
**Base:** latest `main` of `skyeuldrich/moby-dick-explorer`.  
**Scope:** one focused visual revision, not a redesign or new literary module.

## Overall direction

The founder likes the site's experience but considers the current candle and Nantucket scene too diagrammatic. Replace those with convincing historical or materially realistic imagery, keep the scroll journey and editorial information intact, and make the tiny creatures in the opening darkness **swim in response to scroll progress** before candlelight erases them.

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

### 3. Replace Nantucket SVG with real nineteenth-century imagery: required

**Current problem:** The harbor is a simplified vector cartoon; large title overlaps the warehouses and masts.

**Preferred primary reference:** John Warner Barber, *South-Eastern View of Nantucket, Mass.* (1839), engraved by S. E. Brown; originally published in Barber's *Historical Collections of Massachusetts* (1839). This is a genuinely contemporary view, **not** a modern scene painted to look historical.

- Historical source/scan leads:
  - Barber full-view 1839 book: https://books.google.com/books?id=NtwtjM0nTr8C
  - Original digitization via Wikimedia/Internet Archive: https://commons.wikimedia.org/wiki/File:Historical_collections_-_being_a_general_collection_of_interesting_facts,_traditions,_biographical_sketches,_anecdotes,_etc.,_relating_to_the_history_and_antiquities_of_e_(IA_historicalcolle00barbuoft).pdf
  - Nantucket Historical Association's collection records for **South-Eastern View of Nantucket, Mass.**: https://nantuckethistory.org/webcat/request/Action?CMD_%28SearchRequest%29%5B12%5D=&ClientSession=48c5db7%3A19fc782410d%3A-2a29&Keyword=0&POI31_3683=-KEY_msub27&ParamID=&PromptID=&RequesterType=SearchTemplate&TemplateProcessID=6000_3635&bCachable=1&browseData=1&fromTitle=Subject+Topical+-+Harbor
- Obtain the best **legally reusable original scan**, verify it depicts Nantucket and can withstand the desired crop, and record **actual reproduction rights, creator, date, institutional source URL** in the asset manifest/README. Do **not** use seller product photography or a watermarked reproduction as the final site asset.
- **Fallback if 1839 scan is too small:** the Kilburn Brothers historical photograph *Nantucket Harbor, from the Tower* (mid-to-late nineteenth century). Wikimedia hosts a 2683×1382 public-domain scan: https://commons.wikimedia.org/wiki/File:Nantucket_Harbor,_from_the_tower,_by_Kilburn_Brothers.jpg . Since it is **later than 1851**, label its actual or approximate period instead of implying it records Nantucket when the Pequod departed.
- Avoid John Stobart's *Nantucket: The Celebrated Whaling Port in 1835*: despite the title it was made in **1974**, not in the whaling era, and should not be assumed public domain.
- Optimize selected archival image for web, preserving the original art's visible character, not running it through a generic AI-upscaler or oil-paint effect.
- Use enough editorial contrast for the headline and notes, with an intentional text-safe region or subtle localized backing. The text must not run across ships' masts/warehouses as in the supplied screenshot. Retain the gulls as a sparing animated layer if they enhance the authentic engraving; adapt style and density to avoid looking like clip art.
- Preserve the Nantucket → chart transition and interpretive voyage context.

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
- [ ] Historical Nantucket uses an authentic sourced period image (prefer 1839 Barber); document date, rights and exact provenance.
- [ ] Nantucket headline and notes do not obscure principal ships or make text illegible.
- [ ] Deep creatures **swim with scroll progress**, lights attached, dimming/disappearing before candle fully arrives.
- [ ] Existing route, later anatomical plate, extended abyss, Ahab Chapter 41 quote, Chapter 44 discovery and reduced-motion access survive.
- [ ] Scroll backward reverses reveals without jumps; touch/wheel input feels stable.
- [ ] Screenshots taken at **opening darkness**, **first candle glow**, **full candle / ledger**, **Nantucket harbor**, **initial encounter**, **full encounter** on desktop and mobile emulation.
- [ ] Build/tests pass; note any limitations (mobile emulator vs physical phone, sources not verified, etc.).
- [ ] New scan sources / image rights, and original vs reconstructed images, are documented.

### Work process

Start from latest `main` on a feature branch. Inspect rendered site first. Let visual director and motion QA independently review key mockups, with literary/historical review limited to image attribution and factual labels as needed. Implement the swaps, test, review renders and make one focused PR. Merge/deploy **if** there are no material unresolved problems, and provide the live URL.

**Related but separate:** GitHub Issue #7 proposes adding the *Indian Chief* logbook beside the economic manuscript. Do not crowd this PR with that extra artifact; it can be previewed in a subsequent change.
