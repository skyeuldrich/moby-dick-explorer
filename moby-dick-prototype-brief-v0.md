# Moby-Dick — Homepage Prototype Brief (v0.1)

**Status:** Proposed creative defaults; subject to founder review.  
**Audience:** Creative director, illustrator, frontend engineer, and QA / accessibility reviewer.  
**Purpose:** Build a working vertical slice that proves the visual and intellectual premise before expanding into a full MVP.

## 1. Product premise

Create an explorable literary experience about Herman Melville's *Moby-Dick*. Immersive animation is not the end; it should make passages and ideas more compelling. The visitor should feel curiosity, awe, and the limits of human knowledge.

**Core metaphor:** The nautical chart represents Ahab's effort to measure, predict, and master the sea. Descending beneath the chart confronts the visitor with what the chart cannot contain.

## 2. Prototype scope: a single continuous homepage

**Opening / map:**
- Start on a large, weathered, nineteenth-century-inspired nautical chart. No ocean-first intro.
- The route begins near Nantucket and follows a **thin, distinctive red line**. The visitor's downward scrolling causes the red route to extend and the chart to pan; motion is linked to scroll position, not a self-running video.
- Cartographic elements: real-looking latitudes/longitudes, coastal engraving, whale illustrations, printed/handscript notes, copperplate-style detail, parchment texture. Keep annotations legible and restrained.
- The path is an **artistic condensation of the fictional voyage**, not a claim to represent a documented exact Pequod route. Do not invent purported historical coordinates.
- Include **one discovery hotspot** connected to Chapter 44, “The Chart.” Its passage-specific note explains Ahab's use of charts, logs, and revised routes to pursue a whale.

**Threshold / transition:**
- As scrolling advances, coastline and navigational details thin out. Red route runs into open ocean.
- The parchment, grid, and route dissolve/bleed away into dark, moving water. This should feel like moving from the representation of the ocean to the thing itself.
- The shift is continuous and reversible on upward scroll. Avoid a hard cut or loading screen.

**Abyss:**
- Scrolling now controls a descent below the surface. Light vanishes as ocean depth increases. Scale is conveyed by sparse silhouettes and suspended particles, not clutter.
- End at a powerful, slow-moving, **sperm whale and giant squid tableau**. For the prototype, use layered 2D art, parallax, and slight motion, not full 3D simulation or a choreographed fight.
- A small optional annotation explains this is an **artistic reconstruction**; the American Museum of Natural History documents indirect evidence of encounters rather than direct observation.
- Give the visitor a way to return to the chart and discover the related literary material.

**Narrative / literary anchor:**
- Chapter 44, “The Chart,” provides the opening's conceptual logic and first excerpt. Use a brief accurate quotation from a named edition, with the full chapter accessible via a source link.
- Chapter 60, “The Line,” is the recommended **next** substantial discovery after the homepage prototype. It is not required to finish prototype v0.

## 3. Art direction

Aim for a historically grounded and tactile version of the eerie maritime atmosphere of *The Marvelous Misadventures of Flapjack*, without copying its designs.

- **Palette:** warm bone/parchment, tar black, faded sepia, restrained oxidized blue-green; one strong route-red accent.
- **Media:** cartographic linework, natural-history engraving, worn paper, ink, selective moving illumination.
- **Character:** unsettling, intimate, visually intricate; avoid pirate-theme clichés and excessive distressed text.
- **Typography:** historical-inspired headings, crisp readable body text; source passages must remain legible.
- **Movement:** deliberate, spatial, scroll-synced; atmosphere rather than fast action.
- **Sound:** none by default in prototype. Leave architecture open to optional ambient sound later.

## 4. Behavior and usability

- Desktop-first art composition, but functional mobile treatment is mandatory.
- Scroll forward/backward scrubs the same timeline. Refresh/resize does not leave the user in a broken state.
- Discovery hotspot is visible on pointer and touch, keyboard accessible, and dismissible.
- Support `prefers-reduced-motion` through a simpler static or low-motion path with equivalent literary content.
- Provide skip-to-content / skip-animation access. The experience must not trap keyboard users or require fine motor gestures.
- Optimize imagery so map/abyss do not create punishing load times. No fake buttons or nonfunctional controls.

## 5. What is explicitly excluded

- Full map of every event/location in the novel.
- Claims of an exact historic Pequod route.
- Entire novel annotation / search / user accounts / AI chat / teacher dashboard.
- Four complete interpretive experiences.
- Photorealistic or physics-accurate underwater combat simulation.
- Mandatory sound, background music, or autoplay video.

## 6. Deliverables for Codex

1. Runnable source code in a version-controlled repository.
2. Working browser preview/deployment with the complete chart → advancing red line → ocean abyss → whale/squid tableau sequence.
3. One working Chapter 44 hotspot with text, context, and citation.
4. Desktop/mobile adaptations and reduced-motion behavior.
5. Clear implementation README, asset attributions/rights notes, and instructions for local run and deployment.
6. Manual test checklist covering animation continuity, scroll reversal, mobile layout, keyboard access, and major browser behavior.

## 7. Acceptance criteria

- A new visitor immediately sees a beautiful chart, not a generic landing-page hero.
- Scrolling visibly advances the red route; scrolling back reverses it.
- The map-to-abyss sequence is legible, smooth, and coherent; there is no abrupt switch.
- The abyss evokes scale and dread; the whale/squid scene is visually clear without expensive 3D.
- At least one literary discovery emerges through interaction, not a conventional study-guide menu.
- Source text is accurate, sources are acknowledged, asset usage can be traced, and reduced-motion/mobile alternatives work.
- A reviewer can open a deployed URL and judge whether the art and interaction justify investment in a larger MVP.

## 8. Verified research starting points

- Melville, *Moby-Dick*, ch. 44, “The Chart” (Ahab uses wrinkled charts and whale sightings): https://etc.usf.edu/lit2go/42/moby-dick/705/chapter-44-the-chart/
- Melville, *Moby-Dick*, ch. 60, “The Line” (whale-line danger and mortality): https://etc.usf.edu/lit2go/42/moby-dick/741/chapter-60-the-line/
- M. F. Maury, *Whale Chart (Preliminary Sketch)*, 1851, University of Wisconsin-Milwaukee: https://collections.lib.uwm.edu/digital/collection/agdm/id/322
- High-resolution public-domain copy of Maury's 1851 chart: https://commons.wikimedia.org/wiki/File:1851_Whale_chart_by_Matthew_Fontaine_Maury,_from_the_Digital_Commonwealth_-_commonwealth_x633f952x.jpg
- GeoDiscovery/Stanford public-domain reuse notice for Maury chart: https://geodiscovery.uwm.edu/catalog/stanford-zc804pd3385
- AMNH sperm whale–giant squid evidence and reconstruction: https://www.amnh.org/explore/videos/exhibits/the-squid-and-the-whale-evidence-for-an-epic-encounter
- Melville Electronic Library for textual scholarship: https://melville.electroniclibrary.org/

**Editorial caution:** Maury's chart is a genuine contemporary source referenced by Melville, not a replica of the fictional chart in Ahab's cabin. Any route overlaid in red should be labeled interpretive/artistic.

## 9. Deliberate founder choices remaining

The defaults above can be approved without further research. If desired, founder may adjust: (a) exact level of uncanny/cartoon influence versus archival realism; (b) whether the whale/squid tableau appears in prototype v0 or phase 2; and (c) whether this prototype should have a spending cap beyond the ChatGPT/Codex subscription.

## 10. Handoff instruction

Codex should implement the working vertical slice, make practical technical choices, test in the browser, and report design tradeoffs. Do not expand to four full literary discoveries or add infrastructure unrelated to the prototype. Do not represent artwork as historical documentation without attribution.
