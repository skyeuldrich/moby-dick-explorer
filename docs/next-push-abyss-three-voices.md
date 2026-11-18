# Next push — three voices descending into the abyss

**Status:** Founder-approved editorial and motion direction, **documentation only**. Do not change runtime code in this commit. Implement as a separate, bounded visual iteration after preserving/merging other in-flight work (including any desk redesign). Consult `AGENTS.md`, `moby-dick-prototype-brief-v0.4.md`, `src/main.js`, `src/timeline.js` and `src/style.css` before editing.

## Core experience

Replace the single Chapter 41 descent quotation with **three quotations in this exact display order**. The visitor descends through increasingly dark water. At each depth a sentence seems to emerge from just beyond visual range: indistinct, wavering and refracted at its edges, coming into focus for reading, then receding back into black water. A different voice appears farther down. One quotation at a time.

**Creative shorthand:** *submerged typography* / *refractive visibility falloff* / *underwater optical apparition*. This is **not** a conventional slideshow, popup, rigid vertical text translation or aggressive glitch effect. Imagine a distant fish moving in and out of the visibility limit while a diver sinks, but the **words** are the apparition. The text should feel suspended in a medium.

The emotional progression is:
1. **Divided intention:** lucid means versus mad motive.
2. **Self-aware frenzy:** Ahab recognizes, names and intensifies his own madness.
3. **Collapse of agency:** is Ahab the agent of his actions, or something beyond him?

This is an **interpretive sequence, not the chronological sequence of the novel** (display order Chapters 41 → 37 → 132). Do not imply that the three lines occur in order in the book. The third line poses a metaphysical/free-will question; do not reduce it to a medical diagnosis or simply a higher "level of madness."

## Text — reproduce exactly and attribute correctly

### Encounter 1 — Chapter 41, “Moby Dick”
> “Now, in his heart, Ahab had some glimpse of this, namely: all my means are sane, my motive and my object mad.”

**Speaker/voice label:** **Ishmael narrating Ahab's inner recognition**, *not* a spoken declaration by Ahab. The first-person clause is embedded in Ishmael's reconstruction of Ahab's understanding.

Source: Melville, *Moby-Dick*, Ch. 41. [Public primary-text chapter](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0041).

### Encounter 2 — Chapter 37, “Sunset”
> “They think me mad—Starbuck does; but I’m demoniac, I am madness maddened! That wild madness that’s only calm to comprehend itself!”

**Speaker/voice label:** **Ahab**, in his dramatic monologue. Do not attribute this line to Ishmael.

Source: Melville, *Moby-Dick*, Ch. 37. [Public primary-text chapter](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0037).

### Encounter 3 — Chapter 132, “The Symphony”
> “Is it Ahab, Ahab? Is it I, God, or who, that lifts this arm?”

**Speaker/voice label:** **Ahab**, questioning his agency and the relation of will, compulsion and divine power.

Source: Melville, *Moby-Dick*, Ch. 132. [Public primary-text chapter](https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH0132).

**Verification:** The founder-supplied Norton Critical Edition (third ed., 2018), EPUB in the private ChatGPT project, was inspected for all three passages. Do not assume Codex/Copilot can open Project-attached files; verify the lines against the public-domain novel in the linked chapters when implementing. The Norton file contains note markers (not part of these quotations); never surface those markers as the novel's prose. Quote marks are presentation punctuation, not a claim that line 1 is dialogue.

Use restrained chapter/speaker captions and a chapter link for each, displayed while its quotation is present. Keep attribution legible and accurate on mobile.

## Visual and motion design

**Depth and light — required progression:** Start the descent with a perceptible but very dark blue/blue-green ocean, then **continuously darken the whole water column toward pure black as scroll depth increases**. By the time the third quotation (Chapter 132) appears, **the entire sea/background must be pitch black (#000000), with no residual blue-green wash, gradients, visible rays, glowing particles or ambient ocean illumination**. The third quotation alone remains readable as pale text against black, with restrained edge refraction; do not use a black overlay that hides the words. After the third quotation fades out, **hold a distinct, scroll-traversable interval of empty pure black with no quotation and no visible whale/squid**. Only after that pause may the painterly whale-and-squid emerge via the existing progressive spatial reveal, initially with weak contrast against black. This black background should persist beneath the encounter rather than snapping back to blue. The full blue-to-black transition is smooth, monotonic with depth, tied to scroll position and fully reversible. Avoid a generic bright blue gradient, underwater wallpaper, bubbles, artificial spotlight or a sudden switch to black. Hide or dim UI elements that would contradict the pitch-black-water illusion while retaining essential accessible navigation. If a depth gauge is visible earlier, it must not obscure the lines.

**Appearance:** A quote begins as broken traces at the limits of visibility (low-contrast, softly separated strokes); its edges coalesce through a gentle refractive shimmer to a **crisp, readable center**. It has a short full-opacity/legibility plateau as the reader continues to scroll; then a moving veil of darkness / turbidity erases it, like a shape sinking beyond sight. The next quote appears at a deeper visual level. Do not just tween opacity 0→1→0 on centered static text; combine scroll-controlled opacity with soft spatial masking and modest **optical displacement**. For example: very slow, low-amplitude horizontal phase-shift in narrow wave bands across letter edges, combined with an anisotropic blur/haze on the entering and departing margins. Displace letters on the order of **a few pixels**, not enough to make the sentences wiggle like jelly. Keep punctuation recognizable.

**Timebase:** **Where the quote is in the sequence must be determined by scroll position.** The reveal, legible plateau, fade and darkness must stop and reverse with the user's scrolling. **A separate, very subtle autonomous shimmer** may continue when scrolling pauses, but it must not cause a legible quote to disappear while stationary. No autoplay advance, forced scrolling or scroll snap.

**Pacing:** The current `src/timeline.js` has one `descent-quote` using `fade(p, .755, .785, .825, .855)`; the whale/squid encounter starts at roughly `p=.87` and builds to `1`. **Do not squeeze three long quotations into the old one-quote window.** Extend/rebalance the abyss section and, if needed, adjust `#voyage` scroll height so each quote has a readable dwell zone at ordinary wheel/touch speeds. Never overlap two fully legible quotes; allow a brief nearly invisible tail/lead only if needed. Quote 3 dissolves fully before the whale-and-squid emergence.

**Relationship to whale/squid reveal:** Preserve the existing progressive spatial reveal and the long period of darkness. After the last quote vanishes, leave a moment of almost empty water, then let the existing whale/squid image emerge. No sudden bright flash or hard scene cut. This makes the distinction between **Ahab's mental projection** and **the living creatures themselves** felt without claiming the final painting is a scene narrated by Ahab.

**Typography:** Preserve the site's refined literary styling. Long passages need responsive line breaks; do not fit them by shrinking type to microtext. Responsive text measure and increased vertical space are preferable to clamping or cropping. Calm, cinematic, minimally decorated treatment.

**Effect implementation:** Favor lightweight CSS opacity/masks, tiny composited motion and, where supported, a narrowly scoped displacement effect. Do not run a full-screen turbulence filter over the whole site. WebGL or heavy video is not required. Avoid per-frame layout reads and high-cost blurs. If displacement causes poor legibility or performance, reduce it and retain masking, haze and luminance falloff. For the last 10–20% of the reveal, maintain good text edge sharpness and contrast on ordinary screen brightness.

## Accessibility and editorial obligations

- Provide a static, complete **three-quote transcript** with chapter labels, speakers and chapter links in the existing `#literary` section, replacing the current one-quote transcript.
- The active cinematic quote must be real text in DOM, not text baked into an image. Avoid screen-reader repetition: visually hidden/aria-hidden layers or accessible transcript should be designed as one understandable reading path.
- Non-active quotations and links must not be focusable/invisible in keyboard navigation.
- `prefers-reduced-motion`: remove continuous refraction, drift and turbulent effects; retain legible text and a navigable nonanimated transcript/step-through route.
- Keep contrast high during the plateau even if the *surrounding ocean* becomes darker. The site should not require increasing monitor brightness to read quotation text.
- Source captions should not obscure the words. Honor legibility at 1440px, 390px and 360px viewport widths.
- The full excerpt from Ch. 41 is essential: don't revert to the abbreviated `all my means ...` fragment.

## Acceptance criteria / QA

- [ ] Exact verified three quotes and correct speaker/chapter attribution, in 41 → 37 → 132 display order.
- [ ] One coherent scroll-driven journey into increasing darkness, with each quote emerging, sharpening, lingering and fading into black water.
- [ ] Background darkens smoothly from dark blue/blue-green to **pure #000000 by quote three**; third quote appears against pitch black, no residual ambient ocean lighting.
- [ ] After quote three, a **distinct scroll interval of completely empty blackness** precedes whale/squid emergence; black backdrop remains behind the encounter.
- [ ] Visible **underwater optical refraction** and **soft spatial haze** beyond simple opacity, but no distracting shaking / water-wobble that impedes reading.
- [ ] Three distinct, comfortable readable plateaus; adjust overall scroll length if necessary.
- [ ] Scroll backwards through quote 3 → 2 → 1 with correct symmetric stages; pausing does not make the text expire.
- [ ] Quotes fully clear before the progressive whale/squid reveal; existing sequence, artwork and mobile framing preserved.
- [ ] Desktop, mobile/touch, narrow mobile and reduced-motion screenshots/video at entrance, plateau, exit for all three quotes.
- [ ] Accessible three-quote transcript, keyboard behavior, legible captions and chapter links.
- [ ] `npm test`, `npm run build`, and existing production preview checks pass; report any performance measurements and untested platforms.
- [ ] A single focused PR with before/after evidence and no unrelated desk/harbor changes; founder reviews imagery before merge.

## Handoff

Use the site's existing `descent-quote`/darkness/encounter orchestration as the integration point, but choose a data-driven three-voice implementation rather than copying the current one-quote markup three times into brittle scroll conditionals. Preserve the available literary source, the dark ocean animals and final painterly whale/squid encounter. Have the Melville Scholar check attribution and the Visual Director + Motion & QA check the visual result.

**No implementation in this documentation-only commit.**
