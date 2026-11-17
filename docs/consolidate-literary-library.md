# Consolidating the literary library into the website repository

**Status (2026-11-17):** Preparation is complete; **NO research books have been copied**. The website repository is **PUBLIC**, and the source repository `skyeuldrich/moby-dick-literary-source-materials` is **PRIVATE**. Never copy PDFs/EPUBs or research contents into the website repository until **GitHub confirms its visibility is PRIVATE**. Do not make it public again later while those files remain anywhere in its git history.

## Website continuity: decide before switching privacy

The site is published at `https://skyeuldrich.github.io/moby-dick-explorer/` from `.github/workflows/pages.yml` using the GitHub Pages `dist/` artifact. GitHub's docs state that **private-repository GitHub Pages requires the account's GitHub Pro plan** (or qualifying higher plan), not merely **GitHub Copilot Pro**.

- **Keep the existing URL**: obtain/confirm **GitHub Pro**, then go to `https://github.com/skyeuldrich/moby-dick-explorer/settings` → Danger Zone → Change repository visibility → **Make private**. GitHub may unpublish/reconfigure Pages at the moment of switching; verify deployment and Pages settings after the change.
- **Keep GitHub Free**: select an alternate host that builds from a private repository (e.g. Cloudflare Pages, with GitHub integration). **Set up the new deploy first**; its URL may differ. Then make the source repository private and verify the new site.

**Do not switch visibility before selecting a working hosting route.** Subscription prices and hosting entitlements may change; consult current GitHub billing and docs.

## Migration steps after confirming the website repo is private

1. Take a repository snapshot or confirm both repos have current commits and no unmerged work. The pending Issue #15 draft PR #18 contains provisional literary analysis.
2. Create `research-sources/` at the website repository ROOT, **outside `public/`, `src/`, and `dist/`**.
3. Copy the permitted source files from the old private source repository into that directory, preserving descriptive filenames. Verify checksums and compare the source inventory.
4. **Exclude** the Cook EPUB with the `libgen.li` filename until the owner has replaced it with an authorized copy or established appropriate rights. The private source inventory records the restriction.
5. Update `.codex/agents/melville-scholar.toml`, `.github/copilot-instructions.md`, `AGENTS.md`, Issue #15 and `docs/literary-source-access-gate.md` to use the local `research-sources/` folder, and to require actual page-level access auditing.
6. Preserve a compact `research-sources/README.md` with bibliographic descriptions and the requirement that these files never enter published site artifacts. Keep notes/interpretations for the public educational experience in `docs/`.
7. Run `npm test` and `npm run build -- --base=/moby-dick-explorer/`; run `node scripts/verify-public-build.mjs`. The Pages workflow runs this guard before deployment. Confirm the deployed site remains public and functional.
8. Test a Copilot **cloud session in the single private repository**; require it to list at least two source files, extract a real passage, and give page/section locators before marking source access solved.
9. **Only after successful source access and deployment**, archive (do not delete) the old private research repository to avoid duplicate active sources. Do not make the old repository public.

## Publishing safeguard

`scripts/verify-public-build.mjs` checks the actual `dist/` build artifact for ebook/PDF document extensions and known private-research directory names. The Pages workflow calls it after the Vite build. The guard is defense-in-depth, **not** proof that every possible source format could never leak; never import or copy research documents to `public/` or `src/`.

## GitHub docs
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility
