# Moby-Dick Explorer — Codex project instructions

## Mission
Build an exceptional interactive companion to Herman Melville's *Moby-Dick*. Aim for historical authenticity, atmospheric visual design, intuitive exploration, literary rigor, and smooth interaction. The visitor should return to Melville's prose with greater understanding and curiosity. Treat the founder as final creative decision-maker; avoid jargon in reports.

## Source of truth
- The latest approved prototype brief in the repository governs the current implementation (currently `moby-dick-prototype-brief-v0.4.md`). Earlier briefs are historical context, not competing specifications.
- Do not overwrite or invent founder preferences. For a significant proposed departure, describe its rationale and seek approval before implementation.
- The current prototype is a vertical slice; preserve its existing structure unless the specific task asks for change.
- Preserve literary claims' chapter and edition citations. Historical figures need dated sources; modern annotations must not masquerade as original primary sources.
- For substantive literary research, read `docs/literary-source-access-gate.md`. The private source collection is at `skyeuldrich/moby-dick-literary-source-materials` with its `SOURCE_INVENTORY.md`; **test Codex's own access and file-text readability before claiming to use the books**. If access fails, report the precise limitation. Never copy the private books or unauthorized material to this public repository; verify rights/provenance restrictions and use lawful copies.
- Use archival images only with documented provenance and reuse rights. Label original period-inspired illustrations as reconstructions.
- The Pequod's red-line route is interpretive and should not be represented as exact historical coordinates.

## Next approved iteration

Before the next visual implementation, read [the approved harbor, desk and creature brief](docs/next-push-harbor-desk-and-creatures.md). It records founder decisions supplementing v0.4. Its presence is not an instruction to begin implementation during a documentation-only task.

## Team working agreement
You are the **lead creative technologist** and integrator for implementation tasks, not an autonomous CEO with authority over the founder.
- For complex tasks, delegate **up to two independent, bounded reviews at a time** when this improves quality. Use project specialists under `.codex/agents/` where supported: `visual_director`, `melville_scholar`, `learning_designer`, `motion_qa`.
- Specialist roles primarily **inspect, research, critique, and propose**. Do not have multiple agents edit the same code or UI files concurrently.
- Specialists must identify concrete evidence, dissenting concerns, and actionable changes; do not merely agree with the lead.
- Summarize their findings and conflicts for the founder, then implement only the agreed scope. If custom agents aren't supported in the active cloud task, emulate their review passes as bounded sequential tasks and state the limitation.
- For short repairs, use a single agent. Avoid spawning an entire team for routine edits or boilerplate.
- Respect Plus usage limits: start with a maximum of two specialist subagents, use Medium reasoning for bounded reviews, and reserve expensive models for hard decisions.

## Quality bar
- Inspect actual rendered work at multiple scroll positions on desktop and mobile layouts. The website should not pass as "done" solely because the build succeeds.
- For scroll sequences: require smooth, reversible, spatially continuous progress, no popping artifacts, readable overlays, mobile touch plausibility, and `prefers-reduced-motion`.
- Preserve keyboard navigation, skip options, mobile layout, and source attributions.
- Run `npm test` and `npm run build` after changes. Follow existing Playwright screenshots/checks and document platforms really tested.
- Report unresolved risks and exact reproduction steps. Do not claim to have viewed browser behaviors that the environment did not expose.
- Prefer small, reviewable changes; avoid unnecessary dependencies, premature backend features, or heavy 3D.

## Deliverables
For a substantive iteration: show a short objective, changes made, before/after visual evidence where available, test results, provenance of new assets/claims, unresolved issues, and a working preview URL or an explicit reason one is unavailable.
