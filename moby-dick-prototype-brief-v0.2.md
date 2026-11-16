# Moby-Dick — Prototype Iteration Brief v0.2

**Purpose:** Light second iteration of the existing working prototype. Preserve the existing successful structure, Chapter 44 interaction, mobile/reduced-motion support and tests. This is an art/interaction experiment, **not** a full site rebuild or MVP expansion.

**Build from:** the current `main` branch of `skyeuldrich/moby-dick-explorer`. Make changes on a new feature branch and open a pull request for review. Do not overwrite the v0.1 brief.

## Primary problems to solve

1. Current scroll-driven animation feels visibly **jumpy**. Smoothness is the highest priority and should be evaluated before adding much artwork.
2. Opening needs a stronger progression: **blackness → candle reveals whaling documents/economics → period Nantucket harbor → long map voyage → ocean abyss**.
3. Nautical art should feel more **historically grounded**, drawing on real nineteenth-century engravings and whale anatomical diagrams rather than generic whale graphics.

## Design reference: Boom Supersonic

Reference: https://boomsupersonic.com/superpower

Founder particularly values its feeling of smooth, cinematic scrolling **on mobile**. Codex should inspect the live reference in a browser capable of scrolling and compare the feel, especially continuous progress, image composition, the connection between scroll and motion, and absence of visible jumps. **Do not copy its assets/design**, and do not assume the reference uses a particular animation technology without checking. Note any inability to inspect mobile interactions directly.

## New scene sequence

### 1. Blackness and candlelight
- Start on an almost completely black screen.
- As the visitor scrolls, a small candle flame ignites; its illumination grows to reveal a tabletop, paper record, and a few short period-appropriate economic facts. Aim for a dramatic but restrained, scroll-reversible reveal.
- An authentic historic agreement, account page, whaling shipping notice or other primary-source artifact is preferable to invented pseudo-historic handwriting. If an actual document has not been sourced/rights-checked, use a clear *representative layout* without fabricating a direct quotation.
- Include two or three genuinely informative, sourced historical facts, ideally on: what whale oil/spermaceti were used for; how owners and sailors shared risk through the **lay** (share-of-proceeds) system; the importance of whale products to maritime commerce. Avoid a claim about the *average value of a whale* unless defined by species, place, period, yield and market prices. A precise documented *voyage* is a better economic illustration than an unsourced average.
- Candlelight should guide the eye and make the documents readable. Use CSS/2D layers; no elaborate particle/real-time lighting engine.

### 2. Nantucket harbor
- Reveal a period-informed illustration of **Nantucket during the mid-nineteenth century**: maritime wharves, whaleships and shoreline, with 2–3 small gulls circling subtly overhead as scroll proceeds.
- Avoid modern buildings, docks, clothing, or a generic pirate-port aesthetic. Research before illustrating: Nantucket experienced a large fire in **1846**, and its industry was in decline by the 1850s. If choosing a specific year, label it and make architecture consistent with the period; otherwise label as artistic reconstruction, circa 1840s–1850s.
- Use a beautiful static base illustration with limited parallax/gull motion. The harbor should transition coherently into the chart.

### 3. The extended chart voyage
- Retain the red route line and antique map, but make this section **substantially longer** than v0.1 (start by allocating approximately 2–3 times as much of the overall scroll experience to this section, then tune based on actual feel).
- Let the route traverse a varied chart in phases rather than merely stretching a short animation: named ocean regions or historically plausible chart markers, changing compass/map details, optional small engravings or annotations. Keep additional content sparse in this prototype.
- Do not assert exact Pequod coordinates: the route is interpretive.
- Scrolling backward must still reverse the red line and scene transitions.

### 4. Descent and abyss
- Preserve the existing chart-to-water dissolve and whale/squid tableau; do not rebuild them as a costly 3D sequence.
- Refine the transition if scroll stutter is evident.
- Trial replacing or overlaying generic whale art with a **period whale anatomy diagram** or nineteenth-century natural-history engraving where it advances the visual language. A juxtaposition of neat classificatory diagram and unknowable living leviathan could become a strong theme.
- The sperm-whale/squid scene remains identified as an artistic reconstruction.

## Scroll quality: explicit acceptance requirements
- Prioritize continuous, reversible scroll progress on mouse wheel, trackpad and **mobile touch**.
- Diagnose the existing cause(s) of jerkiness *before* adding a smoothing library: inspect frame pacing, unnecessary DOM writes/reflows, heavy filters/shadows, per-scroll work, image sizes, element layering, sticky sections, device pixel ratio and scroll progress mapping.
- Choose the simplest effective animation technique. Consider GSAP/ScrollTrigger or judicious scroll interpolation only if they actually improve performance. Preserve native scrolling and avoid strong scroll hijacking.
- Keep animation state derived from normalized scroll progress, rendered at most once per animation frame, with no jumps at section boundaries. Verify reversal.
- Test in Chromium desktop/mobile emulation and, where available, iOS Safari/touch hardware. Report actual tested devices, limitations, and results, not unsupported claims of a universal 60 FPS.
- Honor `prefers-reduced-motion` and preserve keyboard access and readable content.

## Period visual sources to investigate

1. **Thomas Beale, *The Natural History of the Sperm Whale* (1839).** Historically significant: an edition used by Melville. Contains engravings and an outline diagram of sperm-whale features. Public-domain scan:
   - https://wellcomecollection.org/works/r9yqq4dt
   - https://www.biodiversitylibrary.org/item/192636
   - Diagram with source credit: https://commons.wikimedia.org/wiki/File:FMIB_40389_-Sperm_whale-_-_Outline_of_the_entire_form-_a,_the_nostril_or_spout-hole;_b,_the_situation_of_the_case;_c,_the_junk;_d,_the.jpeg
2. **New Bedford Whaling Museum — whaling economics, specific voyage accounting and lay shares:**
   - https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/
   - https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/
   - https://www.whalingmuseum.org/old-dartmouth-historical-society-sketches/old-dartmouth-historical-sketch-no-14/
3. **Nantucket Historical Association — shipping newspapers and account archives:** https://nantuckethistory.org/webcat/request/Action?CMD_%28DetailRequest%29%5B0%5D=&ClientSession=4194d105%3A1a083a1e09d%3A-3570&KeyValues=KEY_coll329&ParamID=&ProcessID=6000_3363%280%29&PromptID=&TemplateProcessID=6000_3635
4. **Nantucket whaling logbooks, ships' papers and account books:** https://registry.clir.org/projects/2374/

Use original sourced scans if licensing allows, or make new illustrations based on them while citing the references. Don't mislabel newly drawn art as a historical original.

## Deliverables

- Implement the revised continuous homepage sequence using the current codebase.
- Provide a browser-accessible preview if possible, along with desktop and phone screenshots or a short scroll demonstration.
- Describe *what caused the jerkiness*, what you changed and the evidence it improved.
- Keep original Chapter 44 discovery, mobile support, reduced-motion option and existing tests working.
- Add a short sources/rights section for new imagery and historical claims.
- Leave major navigation design, deep textual scholarship modules, teacher tools, sound and more discoveries for future iterations.
- Create a pull request; do not merge automatically unless asked.

## Creative success test

A first-time visitor feels: **darkness → illumination and commerce → lively Nantucket departure → sustained travel through charted seas → loss of the map and descent into something immense and uncharted**.

We care more about **smoothness, pacing, convincing archival atmosphere and a coherent progression** than about adding many features.
