# Moby-Dick — Prototype Visual & Motion Refinement v0.4

**Status:** Implementation brief for the next small prototype iteration.  
**Repository:** `skyeuldrich/moby-dick-explorer`, latest `main`.  
**Owner's priority:** A dramatically better visual and scrolling experience—not a larger feature set.

## Mission

Improve the existing working website without rebuilding it. Use current design, code, tests, and content as a baseline. Fix the founder's observed defects and strengthen the atmospheric sequence. Prioritize: **(1) smooth/reversible scrolling, (2) spatially believable candle + desk reveal, (3) geographically coherent zoomed map, (4) longer abyss with progressive whale/squid reveal, (5) editorial polish.**

The intended complete sequence:

**Night darkness with faint living shapes → approaching candlelight from below → full-viewport candlelit desk and historical manuscript → period Nantucket → sustained zoomed-in nautical map voyage → separate nineteenth-century whale anatomical plate → long dark ocean descent containing a brief Ahab-madness quotation → partial-to-full reveal of sperm whale and giant squid.**

Do not change this order.

### 1. Night sky / creatures to candle

- Existing sea-creature silhouettes should drift subtly in darkness. They can be barely perceptible at first, but they must **dim and vanish before the candlelit desk is established**. No sea creatures showing through the illuminated manuscript area.
- The **first small downward scroll** should bring a faint **warm glow up from just below the bottom edge**. Glow rises and expands as the visitor advances.
- A **large, believable spermaceti candle** then moves into view *from below*, rather than appearing at an already centered fixed position. Candle rises to a visually central/lower-central placement and sits on the desk.
- Its flame has a broad but graded halo affecting much of the screen; the closer light should overpower what the viewer could previously discern in the distant darkness. Avoid a flat radial gradient pasted on top of everything.
- Candle material, wick, flame, shadow, desk contact, and lighting falloff must look materially convincing; improve the existing lightweight illustration without introducing a 3D engine.
- Make progress scroll-linked and reversible. When scrolling back, the manuscript and desk recede, the candle/light withdraw downward, and darkness with faint sea life can return.

### 2. Full-screen desk and manuscript

- The environment should read as a **desk filling the viewport**, not a floating paper card against darkness. The candle rests on it; a manuscript/ledger lies on its surface, sharing perspective and lighting.
- **Fix the screenshot-reported overlapping text**: text must not collide with bottom labels, source notes, other content, or viewport edges at mobile width. Remove unnecessary decorative overlays / non-informative filler labels.
- Replace the existing lengthy Henry Smith / *Marcella* “Success to the old Marcella…” opening quote: founder dislikes it. Prefer a compelling factual lead rather than another invented or weak quote.
- Suggested headline: **“735 American whaleships.”** Supporting date and meaning: around **1846**, estimates put the American fleet at 735 of roughly 900 whaleships worldwide, with around 20,000 men aboard American ships.
- Secondary details, as space allows: an estimated ~70,000 people dependent on whaling directly or indirectly; and a documented 1836 example from the whaleship *Milton*: captain $5,882 vs lowest-paid seaman $571, an illustration of the unequal **lay** shares.
- Optional material, only if space supports it: the *Benjamin Tucker*'s reported 1851 net profit, $45,320, as a **voyage-specific** example rather than a purported average whale price.
- **Verify every number and definition against the named sources before publication.** Prior research pointers are in `moby-dick-prototype-brief-v0.3.md`; treat them as candidate references, not an excuse to skip verification. Ensure 1846-dollar figures are not represented as inflation-adjusted dollars.
- Visually separate a genuine historical document from *modern* editorial annotations. A representative illustrated ledger is allowed, but do not present modern figures or invented phrasing as text from an authentic period artifact.
- Use concise editorial copy. Limit visible material to two or three facts and source links; allow an accessible alternate arrangement on narrow screens.

### 3. Nantucket

Preserve the existing period harbor scene and subtle gull movements. The candlelit document leads into Nantucket. Avoid introducing modern vessels/buildings or extra content in this pass. Only repair regressions.

### 4. Zoomed and geographically plausible nautical chart

- Current global map is **too zoomed out**. Show a tighter regional area that changes as the visitor scrolls; a useful target interaction is following the **Pacific coast of South America past Peru** while more coastline/chart details enter the viewport.
- The red voyage line should be **one continuous legible route**, its progress drawing smoothly with scroll. No detached or broken segments and **no crossing land**.
- Map and route coordinates should use the same geographic transform. If working from original stylized SVG coastlines, trace a coherent water-only path relative to those same coastlines; don't animate a path across an unrelated map layer.
- Prefer progressive pan/translate (or composited sections with continuity) over a single whole-earth view. Keep cartographic features comprehensible during movement, with appropriate zoom and legible labels.
- The route is artistic/interpretive, **not** documentation of precise Pequod coordinates. Preserve that disclosure without cluttering the experience.
- Preserve a satisfying sustained voyage before the next scene, on desktop and mobile.

### 5. Whale anatomical plate AFTER the voyage

- The anatomy illustration is a **separate scene** between completing the map voyage and entering the abyss. It must **not** overlap the middle of the route.
- Aim for an authentic nineteenth-century natural-history plate, ideally referenced to Thomas Beale's sperm-whale work (1839); exact archival scans require provenance/rights review. A new illustration *inspired by* the period must be labeled as such.
- Make it a deliberate pause between human mapping/classification and the living unknowability of the abyss. This need not become an encyclopedic feature.

### 6. Long, progressive descent into the abyss

- Add substantially more scroll distance *after the anatomy plate* before reaching the whale/squid scene. Visitors should feel the passage of depth, not a short crossfade.
- Make the water darken in stages, with lighting falloff, occasional sparse particles, depth and scale cues. Keep the darkness atmospheric but the interactive elements readable.
- During the descent, fade in, hold briefly, then fade out a **single accurate passage**:

  > “all my means are sane, my motive and my object mad.”

  **Correct attribution:** Herman Melville, *Moby-Dick*, **Chapter 41, “Moby Dick”**. It appears in Ishmael's narration as an imagined glimpse of Ahab's inner thinking, **not** as Ahab's direct spoken dialogue. Use the quotation accurately and label it in a subtle accessible way. Verify against Project Gutenberg / the 1851 edition. Source: https://www.gutenberg.org/files/2701/2701-h/2701-h.htm

- Quote must disappear **before** the whale/squid encounter becomes visible.

### 7. Whale and squid reveal

- Do **not** allow the complete tableau to pop in at once.
- The viewer continues descending past dark water and reveals the massive creatures progressively: a head/part of body first, then more of the whale and squid as the viewpoint travels lower. Use viewport clipping, masks, parallax, scale and opacity as needed, but preserve the sensation of **discovery by movement**.
- Keep the subdued, ominous character and note that this is an artistic reconstruction based on indirect evidence; do not imply direct eyewitness observation.

## Interaction and performance quality bar

- Native wheel/touch scrolling with stable, scroll-dependent animation; no scroll trapping or jump cuts between scene thresholds.
- Diagnose current jumpiness: check scroll normalization, smoothing, requestAnimationFrame scheduling, layout thrashing, asset loading shifts, scene segment boundaries and costly blurs/filters.
- Prefer the lightest solution that achieves the target; do not install a heavy animation framework just by default. Use a library only with a concrete benefit.
- Upward scroll reverses every phase coherently (light, desk, chart route, quote, reveal).
- No text clipping/overlap on narrow screens. Test at least desktop ~1440×900 and mobile ~390×844, plus one additional narrow mobile width if feasible.
- Preserve keyboard access, dialogs/Chapter 44 discovery, skip mechanism and `prefers-reduced-motion` alternatives.
- If live access permits, compare the *feel* of scrolling with https://boomsupersonic.com/superpower (especially mobile). Do not copy its assets or falsely claim full visual/mobile inspection.

## Workflow / deliverables

1. Inspect current `main`, existing tests, and the actual rendered prototype; identify likely implementation causes of the named problems before editing.
2. Make changes on a new branch, preserving working features and the prior revision in Git history.
3. Add/adjust tests for: instant start of candle glow on first scroll; sea-creature visibility ending by candle scene; scene ordering; route continuity/water-only placement; quote visibility timing; progressive whale reveal; reversible scroll; text bounds at mobile widths. Use deterministic checks where possible and acknowledge visual checks that cannot be automated.
4. Run clean install/build, automated browser checks, and inspect key scroll checkpoints using screenshots on desktop and mobile. Fix errors, obvious collision, jitter, clipping and regressions.
5. Update README/attributions for assets, economic facts and Melville quote. Cite actual image sources and rights; don't silently fabricate them.
6. Create PR and merge to `main` **if tests pass and there are no material unresolved issues**. If GitHub blocks PR creation/merge, preserve the branch and give the founder an exact direct link and error. Do not falsely report deployment.
7. Verify GitHub Pages deployment and provide the actual live URL and a short before/after summary. State which platforms were really tested.

### Explicit non-goals

No new chapters or major literary experiences, no accounts, teacher tools, search interface, audio engine, back end, CMS, 3D simulation or broad rewrite of the working code.

## Acceptance test — founder perspective

A visitor notices the first trace of candlelight at the **first scroll**, approaches a full-screen desk with a believable candle and readable economic manuscript, travels from Nantucket onto a **closer and geographically coherent** chart, sees the whale anatomy *after* that voyage, descends for a substantial distance while Ahab's madness quotation briefly appears, and then discovers the whale and squid **piece by piece** in the deep. The experience remains smooth, reversible and readable on mobile.
