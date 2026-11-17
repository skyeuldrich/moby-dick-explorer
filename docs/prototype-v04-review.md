# Prototype v0.4 — specialist review and implementation

## Team execution

The cloud tool supports subagents but does not have a parameter for selecting project TOML roles. Four bounded, read-only subagents were explicitly given their matching `.codex/agents/*.toml` definitions. Each used the configured `gpt-6.1-sol` model at Medium reasoning. No more than two were active: Visual Director + Motion & QA, then Melville Scholar + Learning Designer. Visual and Motion later performed bounded final rechecks together. Only the lead edited application files.

- **Visual Director:** inspected twelve scroll checkpoints at 1440×900 and 390×844. Identified colliding headline, floating contact shadow, quote/depth collision, unresolved mobile encounter crop, and narrative mismatch of the baleen skull.
- **Motion & QA:** independently reproduced short-phone flame clipping and offscreen-start geometry, finite map-grid boundary, and incomplete mobile ending. Confirmed the existing cached RAF architecture avoids per-frame layout reads. Sampled the original regional route 8,008 times with no land hits; revised curved route is independently sampled in the automated suite. Exercised native Chromium wheel, emulated touch, restoration and reduced motion.
- **Melville Scholar:** fetched named sources directly and verified the economy figures, lay qualification, Chapter 41 wording and narrator, and Chapter 44 excerpt. Found the genuine public-domain Beale 1839 plate and identified stale Field notes. Supplied source-page and rights evidence.
- **Learning Designer:** personally exercised desktop/mobile reading and discovery paths. Found the discovery button skipped the archive, the reading alternative lacked its Chapter 41 link, and the notes contradicted the displayed chart. Proposed a small visitor-comprehension trial; no visitor study was actually conducted.

## Reconciliation and decisions

Visual recommended prioritizing composition over chart ornament; Motion found a concrete finite-grid discontinuity. We retained the restrained map, fixed the boundary, and curved its offshore path rather than adding decoration. The chart uses one shared projection for coastline and route, with no hidden connector or detached subpaths.

For the encounter, the alternatives were an oversized horizontal tour versus an initially close view that gradually widens. We chose widening: discovery remains spatial, but the ending resolves both animals on a phone. Vertical descent remains dominant.

Visual questioned the baleen-skull detour; Scholar found Beale's actual sperm-whale plate. This replaces the detour with a period-correct subject without inventing an archival image. The source scan already clips the extreme left fluke tip, which remains disclosed.

Learning's sequencing concern was resolved by closing Chapter 44 in place with “Return to the voyage,” rather than jumping past the archive. Stale map and quotation descriptions have been removed from Field notes. The alternate reading path includes a direct Chapter 41 source link.

## Implemented sequence

Faint sea life → first-scroll warm glow → larger candle grounded on a full-screen desk → concise economic reading sheet → restored Nantucket and gulls → close Pacific chart past Peru and Chile → separate Beale plate → extended dark descent → Chapter 41 thought → progressive whale/squid encounter.

The prior final abyss occupied about 5% of a 1500svh sequence. The new descent runs from roughly .71 to 1 of 2200svh: about six viewport-heights, with quote and encounter separated. Touch remains native and directly mapped. A short desktop visual catch-up smooths discrete wheel input; no framework, scroll interception, WebGL or video was added. Ocean motion and camera travel are disabled in reduced motion; equivalent chapter text remains available below the sequence.

## Evidence and limits

Automated checks cover existing interactions plus first-scroll light, sea-life withdrawal, scene order, curved route continuity/offshore placement, headline and paper bounds, quote/depth separation, quote disappearance before encounter, partial-to-full reveal, full final animal bounds at 1440/390/360 widths, reversal, and accurate Field notes. Screenshots are generated for desktop, phone and narrow phone at each major scene.

Chromium desktop and mobile emulation, including synthetic CDP touch gestures, are tested. These are not physical iPhone/Android, Safari, Firefox or screen-reader sessions. No real-user comprehension results are claimed. The current Boom reference was loaded and scrolled in Chromium mobile emulation after importing the environment's installed public CA certificates into an isolated browser trust store; TLS checks remained enabled. This was a limited reference inspection, not a full cross-device benchmark or a claim about its animation technology.

The candle and final encounter remain lightweight original illustrations. The chamberstick is period-inspired, not a measured replica of a museum object. The coastal chart is a new period-inspired drawing using modern public-domain Natural Earth geography; it is not falsely labeled an archival chart. These are the material artistic limitations for founder review.

## Final repairs and measured chart optimization

The final visual recheck found a phone depth-ruler/squid collision; the instrument now fades before the encounter. Motion's final first-25px review found the original positive opacity too weak to perceive, so the early glow curve was strengthened. A second rendered check at 360×640 confirmed a visible faint warm trace, not just a nonzero style value.

A production stress traversal (390×844, DPR3, 4× CPU, four seconds across the entire sequence) exposed chart paint cost: p95 50ms, four >50ms gaps and 3.786s main-thread task time. The coastline was inside the same SVG as the changing dash. We moved its static engraving into a locally generated SVG image, with the animated route on its own composited overlay using the same projection. Geography no longer ships as runtime JavaScript. In the subsequent isolated run, p95 was 16.8ms, one >50ms gap and 1.536s task time; bundled JS fell from 169.20kB (65.13kB gzip) to 30.27kB (12.40kB gzip). These are environment measurements, not physical-phone FPS claims.

The NHA fire link was repaired to https://nha.org/nha-offers-new-tour-of-the-great-fire/ (official article, July5 2018, directly verified). Harbor text now states the supported destruction and whaling's prominence into the1850s, without asserting a particular rebuilding year.

## Final validation before PR

A clean `npm ci` completed. All **15** Chromium tests passed on the final architecture, including the 360px layout. The production build, four archival SHA-256 checks, and production-base-path browser smoke checks at 1440/390/360 widths passed. The smoke runner verifies version0.4, static map and Beale image loading, seven scene checkpoints, Chapter44 modal and quote-before-encounter timing, and rejects HTTP/script errors. `scripts/verify-preview.mjs` also supports verifying the final hosted URL after deployment. Publication and hosted verification are reported separately in the delivery message rather than assumed from local results.
