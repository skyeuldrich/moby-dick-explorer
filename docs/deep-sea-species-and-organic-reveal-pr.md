# Next prototype PR — Three biological deep-sea creatures + whale/squid materialization

**Status:** Approved creative direction; implement on a NEW feature branch after completing active work from latest `main`.  
**Artwork status:** Three new transparent creature stickers are being prepared in ChatGPT. **Do not claim uploaded images exist until the founder uploads them to `public/assets/`.** Do not substitute new crude inline SVG drawings.

## Mission
Replace the existing simplified first-screen SVG motifs with **three distinctive species**, each with a correctly located bioluminescent light source and a biological locomotion cycle. Make the approved transparent whale-and-squid painting **materialize gradually out of black water** as the visitor descends; no abrupt solid cutout or rectangular image edge.

Maintain almost-total darkness and deep-sea dread. The user expects to need to raise screen brightness to distinguish the animals.

## 1 — Final species choices and appearance

**(a) Deep-sea anglerfish — one suspended lure**
- Use a recognizable dark-bodied female midwater anglerfish (e.g., black seadevil / Oneirodes-like), enormous mouth, short fins, and a single lure above/in front of its head. Keep morphology consistent with a midwater species rather than NOAA's bottom-dwelling Chaunacops as a literal visual model.
- **Lighting:** single faint esca at tip of illicium. A tiny local halo; the fish body is almost invisible, revealed by small rim lighting.
- **Movement:** slow hover, mild fin fanning/tail corrections, rare short glide, lure stalk flexes subtly independent of body. Not constant nose-forward swimming, not cartoon bobbing.
- Evidence: Monterey Bay Aquarium https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/deep-sea-anglerfish ; anglerfish observational footage (different genus) https://oceanexplorer.noaa.gov/multimedia/okeanos-explorations-ex1905-dailyupdates-aug30-media-one-of-my-favorites/ .

**(b) Bioluminescent jellyfish — bell pulses**
- Choose a plausible luminous midwater medusa, rendered with translucent muted pigments; the whole bell shows subdued blue-green light, never a neon jellyfish sign. Tentacles remain faint and trail below/behind.
- **Movement:** bell undergoes asymmetric pulsation: shorter active contraction pushes water, longer elastic relaxation; body advances a small distance following each thrust; bell margin flares/returns and tentacles lag / flex with phase offset. Slight current-driven drift/rotation between pulses.
- Avoid whole-image uniform vertical scaling: that makes the whole jelly squeeze like rubber and tentacles contract with the bell. **Animate the bell and trailing structures separately.**
- Research: Costello et al., *The Hydrodynamics of Jellyfish Swimming* (2021), https://doi.org/10.1146/annurev-marine-031120-091442 ; Smithsonian https://ocean.si.edu/ocean-life/invertebrates/jellyfish-and-comb-jellies .
- Species identity must be checked: not all jellyfish species continuously glow, and comb jellies are biologically distinct from true jellyfish.

**(c) Stoplight loosejaw — red facial light + blue photophores**
- A slender jet-black *Malacosteus* (stoplight loosejaw), elongated hinged lower jaw and pointed teeth. Avoid accidentally illustrating a viperfish instead.
- **Lighting:** small red suborbital photophore below eye, additional green/blueish adjacent light, faint blue photophores along underside. These should look like tiny dim points, not red laser spotlights or neon stripes.
- **Movement:** sparse small-amplitude body/tail undulation, long still predatory pauses, occasional small trajectory adjustment. The jaw can remain open; don't add exaggerated rapid pursuit cycles without observed reference.
- Sources: Woods Hole Oceanographic Institution https://www.whoi.edu/ocean-learning-hub/ocean-facts/stoplight-loosejaw/ ; American Museum of Natural History https://www.amnh.org/explore/news-blogs/bioluminescence-in-fish ; Smithsonian https://ocean.si.edu/ocean-life/fish/bioluminescence .

### Art direction and files

- Three independent **alpha-transparent PNG/optimized WebP sticker assets**, not one flattened underwater scene. Separate exactly three animals from any composite sheet and verify none of their fins, mantle, or tentacles are cropped.
- Match the historical/natural-history painterly whale/squid: fluid painted volumes, subdued greys and faint bioluminescent pigments; no vector-cartoon look, hyper-real concept-art gloss, or false archival labeling. These are **modern original period-inspired reconstructions**, not historic scans.
- Preserve the creatures' native silhouettes and alpha edges, with no rectangular tinted/opaque backgrounds.
- Light halos should preferably be **code layers anchored to specific anatomical landmarks** (lure tip, jelly bell, loosejaw suborbital photophore and photophores) rather than oversized halos baked into the image. On scroll and when the candle approaches, lights and bodies fade together.
- Asset filenames suggested: `anglerfish-deepsea.png`, `jellyfish-deepsea.png`, `stoplight-loosejaw-deepsea.png`; optimize WebP derivatives if warranted. The developer should not scrape scientific photos without license.

## 2 — Motion architecture: *two different kinds of movement*

**(i) Scroll-tied scene/camera path:** the viewer travels downward. As scroll progress changes, each creature enters the field, moves relative to viewpoint with parallax, and exits toward darkness. No simplistic convergence on viewport center. Reversing scroll should reverse these **macro** placements.

**(ii) Species-specific autonomous swimming:** each organism has its own restrained idle clock/cycle (lure flick, fin corrections, pulsed bell, body-wave/jaw posture). Movement must be rooted in the animal's morphology, not generic CSS up-and-down float. These micro motions can continue with no scrolling, unlike positional progression.

Rendering suggestions (choose the **lightest workable approach** after inspecting current `src/abyss.js`, `src/timeline.js`, `src/style.css`):
- Use transparent stickers for body surfaces, with **separate deformable anatomical overlays/masks or modest 2D mesh deformation** for motion-critical parts: anglerfish lure stalk/fin, jelly bell + tentacles, loosejaw tail. A single unsegmented rigid PNG cannot reproduce convincing local anatomy with CSS translation alone.
- If deformation is not plausible with minimal code, construct a **small multi-frame animation/spritesheet** from the approved creature artwork, preserving original appearance across frames. Never quietly introduce crude hand-drawn replacements.
- Prefer composited transforms, stable geometry, independent phase timings, `requestAnimationFrame` as needed; don't install 3D frameworks for three tiny creatures.
- Respect `prefers-reduced-motion` (still images and gently visible light sources); on low-end mobile, reduce complexity or use a performance tier.
- The scene remains nearly black. Do **not** make all creatures bright or simultaneously legible. Near the start they should be distant, small, fleeting moving points. Their forms become discernible only by looking carefully / increasing brightness.
- As the candle's first glow rises, dim each creature and its attached lights. **All creatures must be gone once the candlelit manuscript/desk dominates**. Reverse coherently on upward scrolling.
- Test with actual scroll-down and scroll-up playback, not screenshots alone.

## 3 — Whale and squid should *emerge from darkness*, not appear as a pasted opaque sticker

Current approved transparent artwork file in repository: `public/assets/moby-dick-whale-squid-final.webp` (verify `src/main.js` points to it on latest main). The painting is excellent but its appearance is too concrete from the first reveal.

- Start encounter with **zero visible animal**, then the faintest contour/spectral suggestion of a massive body. As the visitor descends: **head/jaw and some curling arms emerge first**, then broader whale torso, squid eye/mantle and feeding tentacles, ending in a complete but still low-light painting.
- Reveal is **non-uniform** and spatially progressive, as if viewing into progressively closer/deeper water: soft-edged animated alpha/luminance mask plus contrast/opacity progression, with some portions remaining concealed longer. No hard wipe, full-image fade occurring in a single instant, popping silhouettes, or obvious rectangular edges.
- A slight *depth haze* can fade as creatures become visible. Avoid a bright spotlight or artificial light source in the aphotic ocean; effect is artistic and subtle.
- Scroll down controls encounter visibility and reveal **continuously and reversibly** (not a timer that keeps running if scrolling stops). Mouse wheel and touchscreen should not jitter or cause discrete jump-cuts.
- Keep the correct sticker aspect ratio and anatomy; do not stretch whale or squid, crop off feeding tentacles, or invent an extra copy in another layer.
- Preserve the existing extended ocean descent and its **Chapter 41 Ahab-madness quotation**, which must fade out **before** encounter reveal.
- Test two device viewports `1440×900` and `390×844`. At distinct scroll checkpoints verify: initial darkness → first ghostly contour → head and arms → full painting. On narrow screens, preserve discovery rather than expose whole image at one size/crop.

## Existing work and integration checks

- `src/abyss.js` currently uses SVGs for an anglerfish, colony, jellyfish, small fish and thread; replace the first-screen motifs with the new three-species cast; do not introduce additional random glowing organisms that dilute the distinction.
- If there is still a siphonophore drawn into the opening, remove or reassign it unless founder authorizes a fourth species.
- `src/timeline.js` currently binds scroll scenes; preserve the other scene timings. Do not let this change delay/map/candle/Nantucket work in another active PR.
- Coordinate with visual-director for artwork fidelity, motion-QA for performance, and literature researcher only when a nature-history fact is asserted as historical literary context.
- Avoid copying third-party videos or images into site. Link/reference them as behavior guidance.
- Cite/credit modern research in `README` or an accessible source note.

## Acceptance checks

- [ ] Three transparent species image assets in `public/assets`; no MS-Paint-style fallback SVG creatures during normal rendering.
- [ ] Anglerfish single lure movement/body fin correction, jellyfish pulse + delayed tentacles, loosejaw small red face and blue underside lights + subtle swim.
- [ ] Species swim differently even while user pauses scrolling.
- [ ] Scrolling advances camera/world position but does not just slide all creatures toward screen center.
- [ ] Candle approach causes creatures/light to fade until none visible by illuminated desk.
- [ ] Whale and squid emerge by **gradual, spatially nonuniform, scroll-reversible visibility**, not a single cut or harsh overall opacity switch.
- [ ] No visible image rectangles, halo boxes, clipped appendages, or text occlusion.
- [ ] Smooth at desktop and emulated mobile; reduced-motion is legible and non-animated.
- [ ] Build/tests pass and test screenshots/short recordings made at key scene positions, plus asset/biology attribution.
- [ ] Provide PR, preview, merge/deployment status, and remaining limitations honestly.

**Implementation workflow:** Wait until all three final images are in GitHub; inspect main and build on a feature branch; produce a playable review and compare animation to research videos; fix art regressions; run tests; merge if changes pass and founder approval not required for a major departure. Distinguish native app/browser testing from emulation. Keep existing working areas untouched.
