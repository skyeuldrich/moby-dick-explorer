# Moby-Dick Explorer — next visual push: audited execution plan

> **Engineering-only scope (founder update, November 18, 2026):** The literary analysis of whale malice, comparison of Melville and Owen Chase, scholarly interpretation, and quote selection happen **in the ChatGPT research Project, not Codex/Copilot**. Codex implements founder-approved content and may perform bounded visual/source-asset checks, but must not launch literary research or delegate to `melville_scholar`. The literary agent has since delivered [the verified **Who Made the Monster?** excerpt/interpretation brief](editorial-who-made-the-monster.md), which remains **a future feature requiring interaction/placement approval**. It is not a task or blocker for PR A/B/C. See `AGENTS.md`.

**Status:** Implementation handoff; approved creative goals, revised against actual `main` on November 18, 2026. **This is documentation, not an instruction to implement the entire program in one session.** Read this before the detailed briefs. Where old briefs conflict with this audit, **this document controls execution scope and completed-work status**, while the topic-specific briefs control artistic details.

## What exists already — DO NOT rebuild

Verified on `main`:
- **Unified, candlelit desk artwork**: `public/assets/desk-landscape.webp` and `desk-portrait.webp` contain desk, candle, **1887** whalemen's shipping paper, inkwell, quill and folded papers. Responsive scene lives in `src/desk.css` and `src/scenes.js`.
- **Interactive desk document inspector**: `src/desk-discovery.js` provides accessible inspection of the original 1887 shipping paper and genuine **1842–44 Indian Chief logbook** (the latter already in `public/assets/archive/bloomfield-indian-chief-1842-44.webp`). Keep this functionality. The 1887 paper is later than Melville's publication; do not describe the document as an 1840s contract.
- **Harbor/map**: Barber's 1839 engraved Nantucket, distinct Chapter 14 quotations, engraved wave transition, regional chart and red route already exist. Test/repair regressions, but **do not redo** the harbor, gulls or map. The original `docs/next-push-harbor-desk-and-creatures.md` contains historical requirements now implemented.
- **Organisms and encounter**: Three transparent deep-sea species, their body/light motion, and the final transparent whale/squid with progressive reveal are already present. Preserve them.
- **Archival Beale original**: `public/assets/archive/beale-1839-fig1.webp` and `beale-1839-p23-source.jpg` are present. However, the plate **remains a redundant standalone cream-colored scene** between map and abyss, not an interactive object on the desk.

## Outstanding work — schedule as reviewable, bounded PRs

### PR A — integrate Beale into the existing desk, remove redundant scene

Primary issue: [#7](https://github.com/skyeuldrich/moby-dick-explorer/issues/7).

- [ ] **FIRST: art feasibility gate.** Show a believable composite mockup **in both aspect ratios** using the existing desk photographs and the real Beale plate. The plate must look physically present, partially exposed beneath or beside the whaling agreement, sharing perspective, scale, paper and candlelight. The visual quality must match the current unified desk. **Do not** layer a flat Beale image onto the photo and call that complete. If no suitable image compositor/generation capability or approved artwork is available, output exact asset specifications and **stop this visual integration** for founder-provided art. Do not regenerate a worse CSS/SVG desk.
- [ ] Preserve the existing 1887 agreement and 1842–44 Indian Chief inspector; if physical tabletop area is tight, prioritize the visible **agreement + Beale plate**, keeping Indian Chief discoverable through the inspector. Explicitly acknowledge the 1887 date when inspected; if changing the period document, obtain founder approval and verify its provenance.
- [ ] Use/extend the current `#desk-inspector` for Beale: tap/keyboard hotspot aligned to actual sheet on both images; show the **unaltered** original figure, a legible source/label key and a short question about diagrams versus living whales tied to Melville Ch. 32 and Ch. 55–57. Original figure not redrawn; maintain source credit including clipped fluke detail.
- [ ] Remove standalone `anatomy-scene` from `src/main.js`, its fade/scene/depth-label logic in `src/timeline.js`, obsolete import and CSS, and **redistribute** its old p≈.615–.72 window for continuous map→deep-water transition without dead scroll or cream flash.
- [ ] Keep `#voyage` scroll length, interactive desk dwell window and active hotspot timing coherent when changing the timeline. Validate at 1440px, 390px, 360px and reverse-scroll. All changed assets need provenance and meaningful text alternatives.
- [ ] **Stop for founder visual review** with side-by-side screenshots, exact asset list, `npm test`, `npm run build`. Do not auto-merge.

### PR B — three submerged quotes and black-water descent

Primary issue: [#21](https://github.com/skyeuldrich/moby-dick-explorer/issues/21). Artistic/specification source: [three-voice abyss brief](next-push-abyss-three-voices.md).

- [ ] Present exact three quotes in **Chapter 41 → 37 → 132 thematic order**, with attribution: #1 is **Ishmael reconstructing Ahab's thought**; #2 and #3 are **Ahab speaking**. Not novel chronology.
- [ ] Extend the **actual** abyss scroll range; don't squeeze long quotes into the former single quote interval. Give each a readable dwell and motion linked to scroll, with restrained water-edge optical distortion and soft reveal. The quoted letters must become sharp during their reading plateau.
- [ ] Ocean progresses continuously from dark blue/green to **pure #000000 by the third quotation**, removing any `abyss-return` organism glow, particles, scene gradients, rays, HUD glare or background tint that would contradict the blackness.
- [ ] Quote 3 disappears completely; **a distinct interval of empty black water** follows before the existing whale/squid appears with the current progressive spatial reveal against a black background.
- [ ] Reversible, pause-safe interaction and reduced-motion mode; replace the one-quote transcript with all three texts, speakers, chapter links and keyboard-accessible structure. Test desktop, touch/mobile and narrow phone.
- [ ] **Rebase on merged PR A**, since both touch `src/timeline.js`. Focus PR B on the abyss only; no desk rework. Founder reviews before merge.

### PR C — “The Price of Light” engraving inspection + production planning

Artistic/technical brief: [whale-to-candle checklist](next-push-price-of-light.md). Depends on stable PR A desk placement.

- [ ] Find the **exact** nineteenth-century lithograph *The Whale's Utility to Man*, shown in the [Smithsonian's For Light and Fashion exhibit](https://americanhistory.si.edu/explore/exhibitions/on-the-water/online/fishing-living/commercial-fishers/whaling/light-fashion). **Verify the specific image's reproduction/right-to-publish status** and a usable full-size scan; identify source, date and rights. A webpage thumbnail is **not** an acceptable zoomable full-resolution asset. Do not invent or swap a different print.
- [ ] If an approved image is available, add a **candle hotspot** and use the existing inspector/dialog pattern for readable enlargement, short historical context, source link and accessible return to desk. Map hotspot positions to both desk images, preserve all other hotspots. **If rights or resolution block local reproduction, link to the museum and mark the in-site high-resolution view BLOCKED**, not completed.
- [ ] Deliver a **visual five-beat storyboard using the approved historical beats below** and an asset manifest for the subsequent ~30–45-second “Price of Light” experience (mother + calf → hunt → cutting-in and head matter **versus** blubber tryworks → onshore spermaceti refining/molding → the matching candle burns out). Preview only if coherent illustration assets are available; never use crude CSS placeholder whales and declare the animation complete. **Do not build the whole movie as a prerequisite of this PR.**
- [ ] Preserve supplied Chapter 87/96 literary context and the stated distinction between **head spermaceti** and blubber oil; do not independently research interpretation. Implement physical desk continuity, responsive/caption/reduced-motion requirements. Founder approves before merge.

### Later, separate film/learning feature — NOT a prerequisite

- [ ] Build and test the complete optional, pausable/replayable “Price of Light” animated investigation **only after storyboard and original art are approved**. Scope and controls in [the animation brief](next-push-price-of-light.md).
- **Completed outside Codex, deferred as a future feature:** [**Who Made the Monster?**](editorial-who-made-the-monster.md) has a primary-checked quotation set and the founder's literary agent's analysis. Codex must **not** research this topic or implement the concept as part of PR A/B/C; a separate art/interaction approval and future ticket are still needed.

## Asset and research gates

- **Existing art is the baseline.** Codex/Copilot must not replace coherent images with rough vectors, generated fake archival lettering, arbitrary separate PNGs, or unsourced scans. If an image-editing tool is unavailable, report exact required layers, dimensions, orientation, lighting and hotspot coordinates for an external art pass. Code may proceed only on tasks independent of missing art.
- The website repo is **public**. Do not add private books/EPUBs or copyrighted criticism. ChatGPT Project research files are not automatically accessible in Codex; check any cited primary passage directly via public Melville text.
- An image's **age** is not a substitute for verifying the actual reproduced file's reuse basis; rights-related unknowns must be documented.
- The current desk's main displayed shipping agreement dates to **1887**; period fidelity is imperfect. Preserve the truthful source identification and ask founder before changing the asset.
- Any edit of scroll timing must update timeline progress boundaries, hover/focus/inert state, CSS, labels, existing tests, screenshot baselines, `prefers-reduced-motion` and reverse scrolling in the **same PR**.

## Budget-friendly Codex working procedure

1. **One PR / one bounded Codex session at a time**. Start from latest `main`; read this plan and **only the matching detailed brief**. Report what was already done before editing.
2. Default to **Sol at Medium** for implementation, tests, documentation and ordinary visual/timing repairs. Try **Sol High or Astra Medium** for an isolated architecture/performance diagnosis if Medium is blocked; reserve **Astra High** for a genuinely hard, bounded problem, not full-project execution.
3. Set explicit **stop conditions**: missing asset/right → source/asset report; unverified rendering → don't declare visual success; major regression → report and pause. Do **not** spend usage repeatedly inventing alternatives.
4. Deliver a PR with actual before/after captures, smoke/test/build results, an itemized checklist (done/blocked/deferred), and **do not auto-merge**. Review and merge before beginning the next PR.
5. Prefer one visual and, if needed, one motion/QA review pass; **no literary-research subagents** or open-ended multiagent swarm. Skip orchestration for bounded repairs.

## Superseded older instructions

- Older briefs calling for a **separate anatomical plate after the chart** are superseded. Beale goes on the desk.
- Older asset briefs proposing replacing the current harbor, separated candle or SVG ocean animals are **historical**: those replacements are already implemented.
- The 1842–44 Indian Chief logbook is **already integrated into the inspector**; don't build it again. Its physical placement is optional and subordinate to Beale/whaling agreement.
- Old “run everything and merge/deploy once tests pass” language is superseded for significant visual/art decisions: **founder review before merge**.
- Do not interpret the complete full-length animation or “Monster We Invented” research as prerequisites to the next desk/abyss visual releases.

**Sources of truth:** `AGENTS.md`, this plan, [desk master brief](next-push-harbor-desk-and-creatures.md), [abyss spec](next-push-abyss-three-voices.md), [Price of Light spec](next-push-price-of-light.md). The specific detailed brief controls its artistic subject; this execution plan controls baseline, order, asset gates and stopping points.
