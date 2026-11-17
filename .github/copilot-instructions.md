# Moby-Dick Explorer — GitHub Copilot guidance

Read the root `AGENTS.md` and the current scoped GitHub issue **before** changing code. The approved project brief is `moby-dick-prototype-brief-v0.4.md`; do not substitute older briefs. The founder chooses visual and literary direction, and reviews substantial visual changes before merge.

## What is already done (as of 2026-11-17)
- **Issue #14's creature animation and whale/squid reveal were implemented and merged in PR #16**. Do not regenerate or reimplement them just because the issue remains open. Verify main and inspect rendered results; propose targeted fixes if required.
- PR #17 merged a brief for the next visual iteration. Do not treat that documentation-only PR as a completed visual implementation.
- **Issue #15's literary-source audit and research cards remain pending**. Read that issue for the current scope.

## Cross-tool specialists
The `.codex/agents/` folder contains role definitions for visual director, Melville scholar, learning designer, and motion QA, but Copilot may **not** load those Codex TOML configurations as registered agents. Explicitly consult their documented research/review standards and reproduce bounded review passes when relevant. Never claim an actual specialist subagent ran unless it did.

## Literary source corpus
A separate private repository, `skyeuldrich/moby-dick-literary-source-materials`, contains founder-provided PDFs and other materials. **Permission must be independently verified in the current Copilot environment**, as GitHub app access is not automatic proof of cloud-agent access. The private repo's `SOURCE_INVENTORY.md` lists present works and provenance restrictions. Read `docs/literary-source-access-gate.md` and Issue #15 before any scholarly synthesis. Verify actual extractable pages and edition citations; do not infer book contents from titles or blurbs.

Never copy copyrighted modern criticism, source PDFs/ebooks, private credentials, access tokens, or bulk extracted text into this PUBLIC website repository. Exclude sources with unresolved provenance or license concerns from intake until replaced by authorized copies. Publish only original scholarship, permissible short quotations, and bibliographic references.

## Engineering
Use a feature branch and reviewable PR for each substantive task. Before changing anything, inspect merged history, branch state, existing work, and the issue's acceptance criteria. Preserve the historical chart, candlelit desk, Nantucket engraving, anatomy plate, quotation attribution, independent swim cycles, and transparent whale/squid painting. Run `npm test` and `npm run build`, inspect screenshots/recordings at desktop and mobile scroll checkpoints, and state any rendering tests you could not perform.

Do not auto-merge changes requiring founder approval. Report the PR link, actual preview, tested platforms, unresolved risks, and private-source access failures. Keep coding and literary-source audit in **separate PRs/workstreams**.
