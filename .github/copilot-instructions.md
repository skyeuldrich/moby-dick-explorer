# Moby-Dick Explorer — GitHub Copilot guidance

Read `AGENTS.md`, **`docs/next-visual-push-execution-plan.md`**, and the current scoped GitHub issue **before** changing code. `moby-dick-prototype-brief-v0.4.md` is the legacy prototype baseline; follow the audited execution plan for current status, supersessions and PR ordering. The founder chooses visual and literary direction, and reviews substantial visual changes before merge.

## Current visual implementation (verified November 18, 2026)
- `main` contains a unified landscape/portrait candlelit desk, a real (1887) shipping paper inspector, an 1842–44 Indian Chief logbook inspector, a Barber 1839 harbor scene and wave transition into the nautical chart, three animated abyss species, and the transparent whale/squid painting. **Do not redo these.**
- **Not done:** Beale's authentic 1839 plate is still a standalone cream-colored anatomical scene. Move the **original image** to the desk and remove the standalone scene. Preserve the image source and its attribution, not the obsolete location or CSS. This supersedes the old “preserve anatomy plate” instruction where it means preserving a separate scene.
- **Not done:** The three submerged Ch. 41/37/132 quotes, continuous blue→pitch-black water, and empty-black interval before the whale/squid. See Issue #21.
- **Not done:** Rights-reviewed, full-resolution Smithsonian whale-products lithograph and its candle-triggered inspection; the approved whale-to-candle animation is **storyboard first**, finished film later.
- **Execution sequence:** bounded PR A (desk/Beale) → PR B (abyss quotes) → PR C (Smithsonian engraving and storyboard). Each needs screenshots, build/tests, and founder review before merge. For model budget, Sol Medium is the default, with selective escalation, not Astra High for an entire release.

## Earlier implementation history
- **Issue #14's creature animation and whale/squid reveal were implemented and merged in PR #16**. Do not regenerate or reimplement them just because the issue remains open. Verify main and inspect rendered results; propose targeted fixes if required.
- PR #17 merged a brief for the next visual iteration. Do not treat that documentation-only PR as a completed visual implementation.
- **Issue #15's literary-source audit and research cards remain pending**. Read that issue for the current scope.

## Cross-tool specialists
The `.codex/agents/` folder contains role definitions for visual director, Melville scholar, learning designer, and motion QA, but Copilot may **not** load those Codex TOML configurations as registered agents. Explicitly consult their documented research/review standards and reproduce bounded review passes when relevant. Never claim an actual specialist subagent ran unless it did.

## Literary source corpus
A separate private repository, `skyeuldrich/moby-dick-literary-source-materials`, contains founder-provided PDFs and other materials. **Permission must be independently verified in the current Copilot environment**, as GitHub app access is not automatic proof of cloud-agent access. The private repo's `SOURCE_INVENTORY.md` lists present works and provenance restrictions. Read `docs/literary-source-access-gate.md` and Issue #15 before any scholarly synthesis. Verify actual extractable pages and edition citations; do not infer book contents from titles or blurbs.

Never copy copyrighted modern criticism, source PDFs/ebooks, private credentials, access tokens, or bulk extracted text into this PUBLIC website repository. Exclude sources with unresolved provenance or license concerns from intake until replaced by authorized copies. Publish only original scholarship, permissible short quotations, and bibliographic references.

## Engineering
Use a feature branch and reviewable PR for each substantive task. Before changing anything, inspect merged history, branch state, existing work, and the issue's acceptance criteria. Preserve the historical chart, unified candlelit desk, Nantucket engraving, **authentic Beale plate asset (relocate into the desk)**, quotation attribution, independent swim cycles, and transparent whale/squid painting. Do not retain the obsolete standalone anatomical scene. Run `npm test` and `npm run build`, inspect screenshots/recordings at desktop and mobile scroll checkpoints, and state any rendering tests you could not perform.

Do not auto-merge changes requiring founder approval. Report the PR link, actual preview, tested platforms, unresolved risks, and private-source access failures. Keep coding and literary-source audit in **separate PRs/workstreams**.
