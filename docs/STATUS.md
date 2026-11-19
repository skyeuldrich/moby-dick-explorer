# Moby-Dick Explorer — current status

**Audited:** 2026-11-18 against GitHub `main` and issue/PR history. **This is the first file to read when resuming work.** The prior v0.x briefs and dated “next push” documents are retained as history; they do not reopen merged work.

## What exists on `main`

- A scroll-driven website deployed through GitHub Pages: [open prototype](https://skyeuldrich.github.io/moby-dick-explorer/).
- Unified candlelit desk artwork for desktop/phone, with an authentic **1887** whalemen's agreement inspector, an **1842–44** *Indian Chief* logbook inspector, and Thomas Beale's **1839** sperm-whale plate in the desk inspector. The redundant cream-colored anatomy interlude was removed. [PR #22](https://github.com/skyeuldrich/moby-dick-explorer/pull/22).
- A candle-linked inspection of the historical Roake & Varty whale-utility print. The available 800 × 697 image is **not** a verified high-resolution or CC0 scan; its credited noncommercial use and limits are documented. A full whale-to-candle animation **has not been built**. [PR #24](https://github.com/skyeuldrich/moby-dick-explorer/pull/24).
- Barber's 1839 Nantucket harbor image, gulls, improved engraved wave continuity, and candlelight reframed around the wick. [PR #29](https://github.com/skyeuldrich/moby-dick-explorer/pull/29).
- William Heather's 1797 Atlantic chart, an interpretive red route ending near **Cape Verde**, refined waypoint lettering, and scroll-controlled *conjectural* pencil calculations representing Ahab's thought. [PR #28](https://github.com/skyeuldrich/moby-dick-explorer/pull/28).
- Three separate Ahab passages (Chapters 41, 37, 132) emerging with increasing depth and vanishing into a pure-black interval before the whale-and-squid reveal. Three biological deep-sea creatures and the painterly encounter remain. [PR #23](https://github.com/skyeuldrich/moby-dick-explorer/pull/23).

The preceding work is **merged**; do not assign it again because an old brief contains unchecked boxes. The repository's automated QA exists; this audit is of GitHub records, **not a new hands-on browser or physical-device test**. Physical iOS/Safari review remains worth doing.

## Active work / review gates

| Priority | Item | Present state | Next action |
| --- | --- | --- | --- |
| **1 — active design** | [Issue #27 — three-ocean, 17-stage atlas](https://github.com/skyeuldrich/moby-dick-explorer/issues/27) | [E0 editorial storyboard](atlas-e0-editorial-design-handoff.md), [E0b shortlist](atlas-e0b-archival-chart-shortlist.md), [Copilot E0b report and mockups](atlas-e0b-verification-and-mockups.md) and [independent external source review](atlas-e0b-independent-archive-review.md) exist. PR #30's documentation/mockups merged, but only Heather stages 1–4 use cleared chart imagery. A full-basin 1739 French South Atlantic candidate, 1813 Sunda chart and 1781 Bashee detail were identified. **Full-resolution source scans, several geographic limits, rights compatibility, authentic map-backed mockups and founder approval remain open. No atlas code.** | Inspect/download specific full-resolution archival originals and produce real map-backed 1440×900 + 390×844 mockups for South Atlantic, Indian, Sunda and western/equatorial Pacific; review with founder. **Do not start E1 implementation.** |
| **2 — deferred feature** | [Issue #7 — The Price of Light](https://github.com/skyeuldrich/moby-dick-explorer/issues/7) | Candle/print inspection is merged; no complete historical five-beat animation. Its storyboard/asset approval was deferred by the founder. | Develop/approve archival-image choreography and a source/rights manifest, then create a separate bounded implementation issue for the finished interaction. |
| **3 — research work** | [Issue #15 — literary research workflow](https://github.com/skyeuldrich/moby-dick-explorer/issues/15), [draft PR #18](https://github.com/skyeuldrich/moby-dick-explorer/pull/18) | PR #18 contains **provisional** Chs. 36/42/99 cards. It did not inspect the private critical corpus; a “Fixes #15” marker should not be read as completion. | Founder to review/close or revise the draft PR; continue source-backed literary work in the ChatGPT Project. Do not launch a broad Codex research audit by default. |

**Closed during housekeeping:** [Issue #21](https://github.com/skyeuldrich/moby-dick-explorer/issues/21) duplicated the implemented three-voice descent merged via [PR #23](https://github.com/skyeuldrich/moby-dick-explorer/pull/23). [Issues #25 and #26](https://github.com/skyeuldrich/moby-dick-explorer/issues/25) correspond to merged PRs #28 and #29 and were already closed.

## Editorial ideas *not* approved to code

- **Who Made the Monster?** [completed original research/verified excerpt handoff](editorial-who-made-the-monster.md), but no approved interface placement/art or implementation ticket. The whale's possible intelligent action, a witness's inferred revenge, and Ahab's personification of evil must remain distinct.
- **Religious arc:** Mapple's Jonah sermon → Ahab's chart/defiance → Chapter 132's question about God and agency. A storyboard possibility; literary research and creative approval precede development.
- **Whale-to-candle transformation:** the historical print inspector is live, but a full interactive sequence is still an unapproved production concept.

## Non-negotiable checks before a Codex implementation task

1. Confirm the feature is founder-approved, source-backed, and scoped in **one GitHub Issue**, with dependencies and asset rights resolved.
2. Provide fixed editorial text; Codex implements the experience, rather than researching modern criticism from scratch.
3. Require actual desktop/mobile visual evidence, reverse-scroll, keyboard/touch and reduced-motion checks, `npm test`, `npm run build`, and a **draft PR**. No auto-merge.
4. After review and merge, **update this file** and close/reconcile the issue. If blocked, record exactly what's missing instead of marking it complete.

See [PROJECT.md](PROJECT.md) for purpose and roles, [DECISIONS.md](DECISIONS.md) for governing choices, and [AGENTS.md](../AGENTS.md) for concise Codex instructions.
