# Literary source access ledger — 2026-11-17

This is the result of **this task's** access attempts, not the earlier
[discovery report](literary-criticism-access-audit-2026-11-17.md). Status
describes inspection, not presumed availability elsewhere. The private
inventory and its restrictions could not be inspected. No private source has
been opened, extracted, or used. No critical work has been inspected for any
of the three pilot passages: scholarly comparisons are **blocked**, and any
cards are provisional primary-text close readings, not production-ready.

Scoreboard, counting the 18 rows below: **1 FULL or PASSAGE / 0 SUMMARY /
15 BLOCKED / 2 NOT_ATTEMPTED**. An earlier discovery of a public excerpt or
full PDF is not evidence that this task read it.

| Source and specific target | Status and evidence from this task | Smallest useful next access |
|---|---|---|
| Melville, *Moby-Dick*, Standard Ebooks, revision `89725132954ec3f297e0d86f4a5ab636675d7f13` | **PASSAGE**: chapters 36, 42, 99, Etymology and Epilogue opened in XHTML; chapter index checked, not every chapter read. See [retrieval](#chapter-local-retrieval). | Check contested passages against a scholarly edition. |
| Project Gutenberg [#2701](https://www.gutenberg.org/ebooks/2701), original download | **BLOCKED**: `www.gutenberg.org` DNS resolution failed; the accessible edition above lists #2701 as a source, but is not claimed byte-identical. | Network access to the original text for a direct comparison. |
| [MEL Versions](https://melville.electroniclibrary.org/how-to-use-the-edition-moby-dick), including annotations | **BLOCKED**: DNS resolution failed; no variant or annotation inspected. | Access to the Versions guide and relevant Ch. 36, 42, 99 readings and notes. |
| [Power Moby-Dick](https://www.powermobydick.com/) notes | **BLOCKED**: DNS resolution failed at site root; no notes inspected. | Access to notes for Ch. 36, 42 and 99. |
| Jonathan A. Cook, *Inscrutable Malice* (2012), biblical/theodicy chapters | **BLOCKED**: publisher host `academic.oup.com` DNS resolution failed; no pages inspected. | Lawful excerpt on Ahab, Job and theodicy. |
| Lawrance R. Thompson, *Melville's Quarrel with God* (1952), *Moby-Dick* sections | **BLOCKED**: private corpus 404; publisher host DNS resolution failed. No pages inspected. | Authorized access or an excerpt on Ch. 36 and religious opposition. |
| C. L. R. James, *Mariners, Renegades and Castaways* (1953), Ahab and shipboard politics | **BLOCKED**: publisher host DNS resolution failed; no pages inspected. | Lawful excerpt on Ahab and the crew. |
| Northwestern–Newberry critical edition (1988), editorial apparatus | **NOT_ATTEMPTED**: no pages inspected. | Relevant textual notes and variant apparatus for the three chapters. |
| Bryant and Springer, Longman critical edition (2006), represented in MEL | **NOT_ATTEMPTED** as a separate licensed edition; MEL itself blocked above. | Relevant apparatus or authorized access. |
| Jenny Franchot, “Melville’s Traveling God” (1998), pp. 157–185 | **BLOCKED**: Cambridge host DNS resolution failed; no chapter pages inspected. | Authorized essay. |
| John Bryant, “Moby-Dick as Revolution” (1998), pp. 65–90 | **BLOCKED**: Cambridge host DNS resolution failed; no chapter pages inspected. | Authorized essay. |
| Samuel Otter, “Reading Moby-Dick” (2013), pp. 68–84 | **BLOCKED**: private corpus 404 and Cambridge host DNS resolution failed; no pages inspected. | Authorized access to the private copy or essay. |
| Hester Blum, “Melville and Oceanic Studies” (2013), pp. 22–36 | **BLOCKED**: private corpus 404; author PDF host `static1.squarespace.com` DNS resolution failed. Earlier discovery is not a reading in this task. | Authorized private access or the author-hosted essay when network permits. |
| Geoffrey Sanborn, “Melville and the Nonhuman World” (2013), pp. 10–21 | **BLOCKED**: private corpus 404 and Cambridge host DNS resolution failed; no pages inspected. | Authorized access to the private copy or essay. |
| Walter E. Bezanson, “[The Dynamic in Moby-Dick: Ishmael’s Voices],” Norton 3rd ed. (2018), p. 663 onward | **BLOCKED**: `wwnorton.co.uk` DNS resolution failed; no pages inspected. | Licensed Norton excerpt. |
| Harrison Hayford, “‘Loomings’: Yarns and Figures in the Fabric,” Norton 3rd ed. (2018), p. 667 onward | **BLOCKED**: `wwnorton.co.uk` DNS resolution failed; no pages inspected. | Licensed Norton excerpt. |
| Mary K. Bercaw Edwards and Wyn Kelley, “Melville and the Spoken Word,” Norton 3rd ed. (2018), pp. 686–692 | **BLOCKED**: `wwnorton.co.uk` DNS resolution failed; no pages inspected. | Licensed Norton excerpt. |
| Geoffrey Sanborn, “Moby-Dick” (2022), *A New Companion to Herman Melville* | **BLOCKED**: author-posted `academia.edu` host DNS resolution failed; distinct from the 2013 chapter. | Accessible author-posted essay or authorized copy. |

The GitHub API returned **404** for the private repository and
`SOURCE_INVENTORY.md`; the workspace's `gh auth status` also reported an
invalid token. A 404 does not distinguish missing repository from insufficient
permissions. Neither proves whether any particular file exists or is
extractable. Please grant this cloud task authorized read access, including the
inventory, or supply lawful excerpts privately. The issue lists other Cambridge
chapters (Greiman, DeLombard, Marr); none was available for inspection. The
manifest's excluded EPUB must remain excluded until its provenance and
license are resolved. Once access is restored, verify each permitted file's
edition, page labels, and actual text extraction in a private intake log.
Do not add private texts or modern annotations to this public repository.

## Chapter-local retrieval

For this research, use the [Standard Ebooks source tree at the pinned
revision](https://github.com/standardebooks/herman-melville_moby-dick/tree/89725132954ec3f297e0d86f4a5ab636675d7f13/src/epub/text).
Its `content.opf` identifies Gutenberg #2701 and an Internet Archive scan as
sources and describes its text as the New York edition. This is a modern
transcription, not a verified facsimile; no claim of identity with either
1851 witness or the current Gutenberg download is made.

The tree contains `etymology.xhtml`, `extracts.xhtml`, `chapter-1.xhtml`
through `chapter-135.xhtml`, and `epilogue.xhtml`; each is a complete section
file. For chapter *N*, open `chapter-N.xhtml#chapter-N`, with no leading zero;
for the front and back matter use the corresponding filename and section ID.
The pinned Git tree's content identity is
`1fe910d281810928699b7238733c4c6ade07254d` for `src`; individual chapter
Git blob IDs for 36, 42 and 99 are respectively
`9ad5ca3d3325063469ddf4f8bca1e9df8c1fad08`,
`21398e109148441d14de43706ed6025baade77a5`, and
`a036e35038db3b61933cea9dc1954c4a6c339f63`. These are Git SHA-1 object
identifiers, not SHA-256 checksums of downloaded files. The tree listing was
checked and the named passages opened on 2026-11-17; this does not assert that
every file was read. GitHub's file viewer may not navigate XHTML IDs as rendered
book anchors, so use the file and section ID together as a locator.

The edition's [license](https://github.com/standardebooks/herman-melville_moby-dick/blob/89725132954ec3f297e0d86f4a5ab636675d7f13/LICENSE.md)
states that the source text is believed public domain in the US and contributors
dedicate their contributions under CC0. Users elsewhere must check local law.
Before publishing a textual claim, inspect MEL's variants and a critical
apparatus; neither was available here. Do not equate this transcription with
the London or New York first edition without that verification.
