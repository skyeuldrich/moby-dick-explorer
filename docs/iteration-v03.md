# Prototype v0.3

The candle now approaches from below: a low warm glow precedes the flame, then the candle rises to the viewport center. After a short centered pause, the document is illuminated. On phones the candle then glides to the document's upper edge to leave reading space. Position, illumination and reversal derive from the same scroll position; reduced motion uses illumination without camera travel.

The red route finishes before the anatomy plate appears. The plate has its own full-screen parchment scene and a reading interval, followed by the dissolve into water and the preserved whale/squid tableau. Map travel duration, harbor, Chapter 44 discovery and keyboard/reduced-motion paths remain.

## Source discipline

The visible content follows the research-backed pool supplied in `moby-dick-prototype-brief-v0.3.md`: Henry Smith's Marcella journal quotation (1840–1841), Dolin's approximate fleet/employment estimates for 1846, and the Milton captain/seaman comparison from the same 1836 voyage. The quotation is distinguished from modern factual annotations. Dollar figures are nominal historical amounts. The existing field notes hold Dolin's infrastructure/reach estimates and the Benjamin Tucker's specific 1851 outputs and museum-reported net profit, without asserting an average whale value. All panels link to the supplied NBWM/PBS sources. Spermaceti candle context links to NBWM's Yankee Whaling page.

No new archival images are embedded. The document layout and anatomical illustration are original reconstructions. Source facts are taken from the authoritative brief; external museum/reference browsing remains restricted in this environment.

## Validation

Nine Chromium tests cover the retained desktop/mobile interactions, phone/landscape document fit, native touch and wheel reversal, page restoration, keyboard/reduced motion, and the two essential corrections. Tests measure the candle's offscreen start, upward travel, centered position before document illumination, and matching reverse position. They assert that the route has finished and the plate remains hidden, then that the plate appears with the chart hidden.

Rendered desktop/phone screenshots were inspected. A four-second synthetic mobile traversal (390×844, DPR 3, 4× CPU throttle) recorded 16.8 ms p95 frame interval, zero intervals over 50 ms, 58 layouts and 1.097 s main-thread task time in this run. Emulation varies with machine load; this is not a real-device FPS guarantee. Safari and physical phones remain untested.

Production is built with the existing Pages base path and deployed by the repository's existing main-branch workflow. GitHub API and public Pages access may be blocked from this workspace; distinguish a successful push/trigger from a confirmed completed deployment.
