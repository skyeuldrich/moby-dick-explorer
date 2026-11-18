# Moby-Dick Explorer — Codex project instructions

## Mission
Build an exceptional interactive companion to Herman Melville's *Moby-Dick*. Aim for historical authenticity, atmospheric visual design, intuitive exploration, literary rigor, and smooth interaction. The visitor should return to Melville's prose with greater understanding and curiosity. Treat the founder as final creative decision-maker; avoid jargon in reports.

## Source of truth
- **For the next visual work, read `docs/next-visual-push-execution-plan.md` FIRST.** It audits implemented vs pending work, PR boundaries, asset dependencies and founder sign-off. `moby-dick-prototype-brief-v0.4.md` is the legacy technical baseline, **not** authority to restore superseded scenes. The task's detailed artistic brief controls design decisions subject to the execution plan's status and sequencing.
- Do not overwrite or invent founder preferences. For a significant proposed departure, describe its rationale and seek approval before implementation.
- The current prototype is a vertical slice; preserve its existing structure unless the specific task asks for change.
- Preserve literary claims' chapter and edition citations. Historical figures need dated sources; modern annotations must not masquerade as original primary sources.
- For substantive literary research, read `docs/literary-source-access-gate.md`. The private source collection is at `skyeuldrich/moby-dick-literary-source-materials` with its `SOURCE_INVENTORY.md`; **test Codex's own access and file-text readability before claiming to use the books**. If access fails, report the precise limitation. Never copy the private books or unauthorized material to this public repository; verify rights/provenance restrictions and use lawful copies.
- Use archival images only with documented provenance and reuse rights. Label original period-inspired illustrations as reconstructions.
- The Pequod's red-line route is interpretive and should not be represented as exact historical coordinates.

## Next approved iteration

Before the next visual implementation, read [the approved harbor, desk and creature brief](docs/next-push-harbor-desk-and-creatures.md). **Founder revision, November 18: move Thomas Beale's original 1839 whale anatomy plate into the unified candlelit desk as an inspectable document, and remove the standalone cream-colored anatomy scene between chart and abyss.** Preserve the original image and credit, connect the inspection to Chapters 32 and 55–57, and restore a continuous chart-to-dark-water transition. This supersedes old instructions to retain the later standalone plate. The brief records founder decisions supplementing v0.4. Its presence is not an instruction to begin implementation during a documentation-only task.

**Desk learning addition, November 18:** Follow [The Price of Light phased checklist](docs/next-push-price-of-light.md): make the actual nineteenth-century Smithsonian-featured “The Whale's Utility to Man” lithograph discoverable from the candle after checking image rights, and storyboard a historically accurate interactive whale-to-spermaceti-candle animation. Prioritize desk realism and Beale integration first; a polished animated clip can be a focused follow-up PR. The whale-malice/source-perspective research is now documented in [Who Made the Monster?](docs/editorial-who-made-the-monster.md), **not authored or researched by Codex**. No code work for it until a later scoped ticket. Do not represent ordinary blubber oil as molded spermaceti wax, or the process as one fantasy machine.

**Additional founder-approved abyss work, queued for the next applicable visual push:** Read [three voices descending into the abyss](docs/next-push-abyss-three-voices.md). Replace the one Chapter 41 fragment with the complete Chapter 41 passage, then Chapter 37 and Chapter 132 Ahab quotations, in this exact thematic order. Increase ocean darkness with depth, use subtle scroll-linked underwater refraction and visibility falloff, preserve a readable pause for each, and update the accessible transcript. Extend the descent rather than compressing all three into the old one-quote interval. This is not a request to change runtime code during a documentation-only task; do not mix this scope into an unrelated in-flight desk PR without direction.

## Division of labor: developer, not literary researcher

**For all website design/implementation tasks, Codex/Copilot is the visual designer, frontend developer, motion engineer and QA tester — NOT the literary analysis agent.** The founder develops scholarship and selects passages separately in the ChatGPT Moby Dick Website Project. Implement **approved** quotes, captions, interpretation cards, and historical facts supplied in task briefs without launching new criticism surveys, scholarly-source audits, `melville_scholar` subagents, or private-library access attempts. The proposed whale-malice investigation (“The Monster We Invented”) is **owned outside Codex** and is **not a Codex deliverable, dependency or checklist item**. Once the founder approves a literary/content brief **and opens a dedicated implementation task**, accept the approved text as fixed product copy and build the experience. **Who Made the Monster?** now has a founder-supplied, source-checked [editorial handoff](docs/editorial-who-made-the-monster.md); it remains **out of the current visual push** pending a separately approved interaction and placement.

**Minimal factual safeguards still apply:** preserve precise attribution and existing source links; check a short, specific citation or archival asset permission only where required to avoid publishing a false claim or unauthorized image. If an approved text/source is missing or inconsistent, flag the exact blocker and continue with independent design/code tasks; do not substitute an autonomous research project. Historical manufacturing steps for the candle animation should come from a founder-approved storyboard/content brief, not Codex research.

## Scope and model budget for the next push

- **Never treat the entire backlog as one Codex assignment.** Three separate, reviewable PRs: **A:** Beale plate onto the existing unified desk, remove redundant anatomy scene; **B:** three-quote dark-water abyss (Issue #21); **C:** Smithsonian print inspection (rights/full-resolution gated), plus whale-to-candle storyboard/asset manifest. A finished short film is a later task, not a prerequisite; the whale-malice inquiry belongs to the founder's separate literary workflow, never the default Codex task.
- `main` already has the landscape/portrait desk, 1887 agreement inspector, real 1842–44 logbook inspector, Barber harbor-to-chart wave, three swimming species, and whale/squid painting. Do not rebuild them. Test and preserve the existing results.
- Prefer **Sol Medium** for bounded implementation and testing. Escalate to **Sol High or Astra Medium** for a difficult, isolated problem; reserve **Astra High** for an unresolved, high-complexity diagnosis. Do not burn a session on repeated speculative asset creation when suitable original art is missing. Usage varies by task/model and this is a cost-control recommendation, not a performance guarantee.
- For missing artwork, uncertain reuse rights or insufficient full-resolution scans, **report a blocker and request a specific asset**; never claim a link-only fallback meets a zoomable art-inspection requirement. Never auto-merge significant visual changes before founder review.

## Team working agreement
You are the **lead creative technologist** and integrator for implementation tasks, not an autonomous CEO with authority over the founder.
- For complex tasks, delegate **up to two independent, bounded reviews at a time** when this improves quality. For visual push tasks use only relevant **visual_director** and **motion_qa** specialist passes where supported; do not invoke `melville_scholar` or do independent literary analysis.
- Visual/motion specialists primarily **inspect, critique, and propose implementable changes**. Do not have multiple agents edit the same code or UI files concurrently.
- Specialists must identify concrete evidence, dissenting concerns, and actionable changes; do not merely agree with the lead.
- Summarize their findings and conflicts for the founder, then implement only the agreed scope. If custom agents aren't supported in the active cloud task, emulate their review passes as bounded sequential tasks and state the limitation.
- For short repairs, use a single agent. Avoid spawning an entire team for routine edits or boilerplate.
- Respect usage limits: default to one coding agent and at most one bounded specialist review per task; use Sol Medium for routine tasks, escalate selectively, and reserve Astra High for an isolated hard problem.

## Quality bar
- Inspect actual rendered work at multiple scroll positions on desktop and mobile layouts. The website should not pass as "done" solely because the build succeeds.
- For scroll sequences: require smooth, reversible, spatially continuous progress, no popping artifacts, readable overlays, mobile touch plausibility, and `prefers-reduced-motion`.
- Preserve keyboard navigation, skip options, mobile layout, and source attributions.
- Run `npm test` and `npm run build` after changes. Follow existing Playwright screenshots/checks and document platforms really tested.
- Report unresolved risks and exact reproduction steps. Do not claim to have viewed browser behaviors that the environment did not expose.
- Prefer small, reviewable changes; avoid unnecessary dependencies, premature backend features, or heavy 3D.

## Deliverables
For a substantive iteration: show a short objective, changes made, before/after visual evidence where available, test results, provenance of new assets/claims, unresolved issues, and a working preview URL or an explicit reason one is unavailable.
