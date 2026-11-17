# Melville source access and verification gate

**Private owner-supplied corpus:** The founder has uploaded reference PDFs and ebooks to a separate **private** repository: https://github.com/skyeuldrich/moby-dick-literary-source-materials . Its `SOURCE_INVENTORY.md` records the currently listed works, per-file verification status and rights limitations. **Test whether the Codex workspace has authorized read access to that private repository before promising research from it**: this ChatGPT connection can list files but does not establish the Codex task's GitHub access. Verify text extraction on real pages and document the result. Work outside this public site's Git tree, and never deploy or commit source books here. If authentication, permissions, or extraction fails, disclose the failure and request a lawful source. 

**Purpose:** Prevent the literary agent from quietly citing inaccessible criticism, laundering model recall into an attributed claim, or producing apparently exhaustive interpretations from partial evidence. This is an **intake protocol**, not a claim that the source corpus is already installed.

## What is available now (verified only to the extent stated)

| Source | Public access lead | Verified level as of 2026-11-17 | Not established |
|---|---|---|---|
| *Moby-Dick* (Project Gutenberg #2701) | https://www.gutenberg.org/ebooks/2701 | Public downloadable HTML/plain text advertised; full edition suitable for lawful local chapter indexing | No committed, hashed, chapter-parsed corpus yet |
| Melville Electronic Library, *Versions of Moby-Dick* | https://melville.electroniclibrary.org/how-to-use-the-edition-moby-dick | Public digital edition with editorial reading text, variants and annotations described on site | Agent has NOT ingested or validated all annotations/chapters; modern editorial content has copyright |
| *Power Moby-Dick* | https://www.powermobydick.com/ | Public chapter pages contain annotations; sample pages accessible | Agent has NOT read all notes; site's 2008 annotations are copyrighted and must not be mirrored |
| Cook, *Inscrutable Malice* (2012/2021) | https://www.jonathanalexandercook.com/publications | Publication existence and descriptive information | **Full text not acquired or read** |
| Thompson, *Melville's Quarrel with God* (1952) | See `docs/literary-source-library.md` | Bibliographic candidate | **Full text not acquired or read** |
| C. L. R. James, *Mariners, Renegades and Castaways* (1953) | See `docs/literary-source-library.md` | Bibliographic candidate | **Full text not acquired or read** |
| Norton / Cambridge / Longman editions and criticism | See `docs/literary-source-library.md` | Bibliographic candidates, with some editorial descriptions accessible | **Full modern editorial or scholarly apparatus not acquired or read** |

**Mandatory distinction:** source *discovery* is not source *consultation*. Entries above report initial web availability, not the outcome of a Codex run. Codex's cloud internet permissions might restrict even publicly available pages.

## Access audit before interpretive synthesis

For every high-priority source, record one of:
- **FULL:** full relevant work available and inspected; source file/URL, exact edition/year, section(s) read, date, evidence locator.
- **PASSAGE:** specific verified pages/chapter/excerpt inspected; identify the **boundaries** of inspection.
- **SUMMARY:** catalog, abstract, book review, or secondary description only; cannot attribute detailed propositions, passage interpretations or quotations to the work.
- **BLOCKED:** paywall, DRM, network disabled, inaccessible file, broken link, unsearchable scan, etc.; record concrete failure and what the founder can provide.
- **NOT_ATTEMPTED:** not researched; never silently omit from denominator.

For PDF/ebook supplied by the founder, verify that it opens, that text extraction or page viewing works and that exact passages can be located. Record source *filename/ID*, edition, chapter or page and access status in a **private** intake manifest. Never commit the copyrighted book or a near-complete reproduction of it into the public GitHub repo. Store in public GitHub only permitted original source notes and bibliographic metadata.

## Hard gates

1. **First deliverable is an access audit** of the priority sources, with a small scoreboard: `full_or_passage / summary / blocked / not_attempted`. Do this **before** the three research cards.
2. The novel's own text is required. If it cannot be retrieved and verified, **stop** before making passage cards and ask for a source or network permission.
3. For a card claiming **scholarly disagreement**, require direct consultation of at least **two substantive pieces of independent criticism** that genuinely bear on the passage. A book merely listed in a bibliography or represented by publisher blurb does **not** satisfy this. If fewer than two are available, produce a clearly labeled **provisional close-reading card**, cite only inspected primary text, and mark the scholarly comparison as **BLOCKED**. Do not invent two critical positions attributed to unread authors.
4. If an **identified foundational priority source** cannot be accessed, report that explicit gap **before** treating the card as a ready-to-publish educational analysis. In a research task, ask the founder for the smallest useful chapter/essay rather than generic access to a whole library.
5. Every attributed scholarly claim must have a bibliographic ID plus an exact page/section/quoted fragment verified in the inspected source; do not guess page references.
6. If the source text was accessed through a lawful private file, cite it in the private work log, then publish only permissible original paraphrase and citation in GitHub. Do not include private download tokens, DRM workarounds or copyrighted documents in repository commits.
7. An inability to open a source must **change the confidence/status of conclusions** and the final report. Passing tests and making attractive copy cannot erase research gaps.

## Recommended initial intake / founder requests

**Zero procurement required** for public-domain novel, first pass through free MEL/Power Moby pages, and open-access literary criticism. Codex should attempt these first and record direct source access.

For the founder's particular theological interest, the highest-value lawfully obtained modern sources to supply are:
1. Jonathan A. Cook, *Inscrutable Malice* — relevant chapters treating theodicy, Job, apocalyptic traditions.
2. Lawrance R. Thompson, *Melville's Quarrel with God* — relevant sections on *Moby-Dick*, theological opposition and narrative voice.
3. A scholarly critical-edition apparatus or a Cambridge/Norton critical essay focused on Ahab, Ishmael, or whiteness.
4. For intellectual breadth after religious material: C. L. R. James, *Mariners, Renegades and Castaways*, or an appropriate scholarly essay offering a political/labor reading.

**Request sections, not a complete library.** When the founder can provide only one, use it, but do not claim coverage of other unavailable works.

## Persistent research record

For each source use a minimal original entry such as:

```yaml
source_id: cook-inscrutable-malice-2012
bibliography: "Cook, Jonathan A. Inscrutable Malice. 2012."
status: BLOCKED
access_basis: "publisher description only; no chapter pages"
chapters_pages_checked: []
claims_supported: []
limitations: "Cannot attribute detailed interpretation of Chapter 36"
request_from_founder: "PDF or lawful excerpt of relevant chapters"
```

If the document is private, store only **non-sensitive bibliography and public-facing access summary** in GitHub; keep exact private file locators in the task's private context. Across tasks, private sources are **not automatically persistent**. If the founder wants repeated access, use a permissioned private companion repository or approved source storage that Codex can actually read, and verify it at the start of each research task.

## What a final report must say

- Sources sought, exactly which read and which failed;
- Exact passages or sections consulted, not an unqualified claim to have read a whole book;
- Conclusions grounded in the novel alone versus points attributable to verified criticism;
- High-priority access gaps and specific founder actions;
- What remains speculative or awaiting scholarly confirmation.
