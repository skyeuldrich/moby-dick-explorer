# Moby-Dick Explorer — project charter

**Purpose.** Build a historically grounded, visually atmospheric, interactive companion to Herman Melville's *Moby-Dick*. The site should reward exploration of the novel's language, form, ideas, history, and ambiguities—not merely illustrate its plot. A visitor should leave wanting to read or reread Melville.

**Audience.** Curious readers, students, and teachers, including people encountering the novel for the first time. Preserve accessible alternatives to scroll-driven scenes.

## Experience and design principles

- The present vertical slice moves through a dark opening and candlelit whaling desk, historical Nantucket harbor, an archival sea chart with a scroll-driven red itinerary and Ahab's pencil hypotheses, and a blackening abyss with three passages and an imagined whale/squid encounter. For what is *implemented today*, consult [STATUS.md](STATUS.md), not older prototype briefs.
- Make the reader **do something interpretively meaningful**: compare descriptions, test a proposed route against textual evidence, inspect an archival document, change viewpoint, or see how a word's meaning shifts. Avoid replacing inquiry with explanatory popups or moralizing quizzes.
- Favor actual historical charts, engravings, documents, and source images. Preserve provenance and reuse restrictions in [asset-sources.md](asset-sources.md) and related manifests. No new AI-generated illustrative scenes without a new founder decision; existing approved reconstructions remain.
- Honor the distinction between the narrated Pequod voyage, Ahab's planned/imagined courses, and modern inferred connections. Never pretend that Melville gave an exact ship track or wreck location.
- Protect the tactile illusion: period typography and artwork, coherent candlelight and perspective, smooth reversible scrolling, believable underwater darkness, and desktop/mobile compositional quality.
- Preserve uncertainty and competing *supported* readings. Quote accurately, identify speaker and chapter, and distinguish historical testimony from a character's or narrator's interpretation.
- The founder approves creative direction, substantive interpretation, images, and release decisions. A passing build is not a substitute for a rendered visual review.

## Division of labor

**ChatGPT Project — Creative Director / Project HQ:** research ideas, storyboard scenes, locate source artwork, compare designs, plan the backlog, critique visuals, and review delivered PRs.

**ChatGPT Project — Melville Scholar:** consult the full novel and available literary scholarship, record what was inspected, develop competing readings, select passages, and prepare short *approved editorial handoffs*. Distinguish source-backed criticism from suggestions. Do not make a general coding agent repeat the scholarly work.

**GitHub — lasting record:** this charter for purpose; [STATUS.md](STATUS.md) for the current state; [DECISIONS.md](DECISIONS.md) for lasting decisions and reversals; GitHub Issues for work units; PRs for the implementation and evidence. Existing detailed plans are reference material, not automatically current tasks.

**Codex — implementation:** read the current issue and its approved content/assets, design and code within that scope, use visual/motion QA when warranted, run tests and inspect rendered scenes, then open a **draft PR**. No automatic merge. Do not launch scholarly surveys or invent period artifacts as shortcuts.

## One feature, five stages

1. **Investigate in ChatGPT:** identify the textual or historical question, plausible interpretations, evidence, and educational payoff.
2. **Design in ChatGPT:** define what the visitor sees and *does*, source the assets, review rights, and storyboard desktop/mobile entrance, action, and exit.
3. **Approve in GitHub:** create/update one scoped Issue with approved wording, assets, constraints, evidence, dependencies, and acceptance criteria. If needed, record a durable creative decision in [DECISIONS.md](DECISIONS.md).
4. **Build in Codex:** one bounded issue, one reviewable draft PR, visual captures and test results, blockers reported rather than improvised.
5. **Review and reconcile:** founder checks the live preview, approves or requests changes, then merge; update [STATUS.md](STATUS.md), close completed issue(s), and record enduring revisions.

Start future ChatGPT sessions by asking for an audit of [STATUS.md](STATUS.md) and relevant open issues. Chats are work sessions, **not project memory**. Old prompts and exploratory transcripts are useful evidence but are not binding specifications.

## Links

- [Current state and next action](STATUS.md)
- [Decision register](DECISIONS.md)
- [17-stage textual itinerary](pequod-itinerary-17-stages.md)
- [Atlas E0 design proposal](atlas-e0-editorial-design-handoff.md)
- [Source and reuse register](asset-sources.md)
- [Source-checked literary example: Who Made the Monster?](editorial-who-made-the-monster.md)
- [Deployed prototype](https://skyeuldrich.github.io/moby-dick-explorer/)
