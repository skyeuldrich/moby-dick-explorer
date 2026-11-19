# Moby-Dick Explorer — Codex operating instructions

**Start every task here:** [docs/STATUS.md](docs/STATUS.md) (what has shipped, what is active, what is blocked) → [docs/PROJECT.md](docs/PROJECT.md) (mission and division of labor) → the **one GitHub Issue** assigned for this task, including its linked approved brief and source/asset records. [docs/DECISIONS.md](docs/DECISIONS.md) holds lasting founder choices.

**Precedence:** The founder's explicit, current task and approved issue govern its scope; `docs/STATUS.md` governs what has already merged and the current approval gates; `docs/DECISIONS.md` governs standing creative choices; task-specific approved documents govern details. Old `moby-dick-prototype-brief-v0*.md`, `docs/next-visual-push-execution-plan.md`, and old unchecked issue boxes are historical evidence, **not** authorization to redo completed work. Report any material contradiction before changing the experience.

## Current gate (November 18, 2026 Eastern)

**PRs #22, #23, #24, #28, and #29 are merged.** Do not redo the existing desk/Beale plate, three abyss passages, candle/whale-utility print inspector, pencil chart annotations, harbor wave alignment, or candle framing.

**Issue #27 is the active atlas project at the E0c image/visual approval gate, NOT implementation.** Read the [next-push E0c brief](docs/atlas-next-push-handoff.md) FIRST, then the [E0 storyboard](docs/atlas-e0-editorial-design-handoff.md), the [E0b archive audit](docs/atlas-e0b-independent-archive-review.md), and the [17-stage itinerary](docs/pequod-itinerary-17-stages.md). A source-linked [Folio I HTML concept](docs/reviews/atlas-e0b/README.md) exists, but **Collin 1818 source bytes, geographic registration, reuse documentation, real chart-backed mockups and founder approval are missing**. The previous Copilot PR #30 was merged as documentation with placeholders, **not art approval**. The next possible assignment is **source validation and Atlantic stages 5–7 visual review only**; if the archive scan is unreachable, stop and ask for the original file. **Do not start E1/17-stage runtime code, trace the Norton map, or publish unapproved scans.**

Other open work: `#7` holds the deferred *Price of Light* animation concept (the inspector has shipped); `#15` concerns source-backed literary research with an unresolved draft PR #18. See [STATUS.md](docs/STATUS.md) for current boundaries.

## Division of labor

- **Codex is the implementer:** frontend design, interaction/motion, integration, accessibility, tests, and rendered visual QA. Implement **approved** historical facts, captions, quotes, and research findings; don't launch a broad Melville-criticism survey or recruit `melville_scholar` for ordinary coding tasks.
- **Founder and ChatGPT Project own literary/educational research and editorial signoff.** Respect the [Who Made the Monster? handoff](docs/editorial-who-made-the-monster.md) as research ready for future interaction planning, *not* an authorization to code it.
- For difficult design tasks, use at most one bounded visual-director or motion-QA critique at a time when helpful. For small fixes, use one agent. Never send several agents to edit the same UI files concurrently.
- Prefer a cost-conscious capable model for bounded coding (historically Sol Medium); escalate for an isolated unresolved problem. Do not spend coding sessions redoing literary research already completed in ChatGPT.

## Visual and historical integrity

- Use the verified period charts, engravings, documents and credits already in [docs/asset-sources.md](docs/asset-sources.md) and the asset manifests. No new AI-generated illustrative scenes without founder approval; existing approved original reconstructions remain. Do not replace convincing artwork with flat CSS/SVG approximations or invent archival provenance.
- Do not commit private copyrighted books, scholarly PDFs, or unauthorized material to this public repository. For any task *explicitly* requiring scholarship access, first follow [docs/literary-source-access-gate.md](docs/literary-source-access-gate.md); report what could and couldn't be inspected, rather than citing inaccessible works.
- Distinguish **red interpretive voyage route** from **conjectural graphite marks**; never invent a precise location or a location for the wreck. Verify chart coverage and usage permissions rather than assuming an old map depicts the correct sea.
- Preserve an authentic nineteenth-century feel, the existing unified desk and archival inspectors, biologically grounded abyss creatures, increasing darkness, and seamless reversible scroll. Keep chronology, literary voices, transcriptions and attributions accurate.

## Delivery and QA

1. **One bounded issue, one focused draft PR.** Honor explicit dependencies, asset rights and founder approval gates; stop and describe exact missing inputs rather than inventing substitutes. Do not auto-merge.
2. Run `npm test` and `npm run build` for website changes. Inspect the *rendered* experience at desktop and mobile sizes, multiple scroll positions, and both scroll directions; check keyboard/touch, reduced-motion, readability, focus management and source attribution. Physical-device/platform testing must be described truthfully.
3. Show before/after screenshots or a visual recording when appropriate, test results, source provenance, limitations, and an accessible preview/review path.
4. After founder approval and merge, reconcile the GitHub Issue and update [docs/STATUS.md](docs/STATUS.md). Update [docs/DECISIONS.md](docs/DECISIONS.md) for durable founder-approved changes, not every implementation detail.
5. Documentation-only housekeeping does not require application tests, but must not claim browser QA or a newly deployed experience.

**Success criterion:** Readers should discover something about *Moby-Dick* by exploring the site, not just view effects or explanatory overlays.
