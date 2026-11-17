# Literary research library — Moby-Dick Explorer

**Purpose:** A curated, expanding bibliographic map for the `melville_scholar` agent and the `learning_designer`. This is an **index of sources to consult**, not a claim that the agent has read their complete contents. Prefer interpretive depth and competing positions over accumulating links.

## Publication and rights rules

This GitHub repository is **public**. Never commit copyrighted modern critical editions, full scholarly books/articles, pirated PDFs, or scraped copyrighted annotations. The 1851 novel is public domain in the United States; modern editorial apparatus, annotations, introductions, and scholarship may have independent copyright. Record metadata, stable URLs, chapter/page citations, and original paraphrases; quote modern criticism only in short, necessary excerpts with attribution and source verification.

If the founder has lawful private copies, work with them through an authorized private workspace instead of adding them to this repository. Treat publisher pages and abstracts as **descriptions of a work**, never as evidence that the entire work was read. A reading log must distinguish:
- `full-text-inspected`: whole source accessible and read/retrieved at relevant page
- `passage-inspected`: specific pages/sections inspected
- `abstract-or-catalog-only`: bibliographic or abstract metadata, *not* authority for detailed claims
- `unavailable`: reference lead only

For quotations of *Moby-Dick*, give **chapter number, title, speaker, and exact edition**. Melville's first American and British editions have differences, sometimes material to interpretation. Do not flatten narrator, character, and author into a single voice.

## I. Primary literary texts and textual authority

| Source | Access | Value | Work status |
|---|---|---|---|
| Herman Melville, *Moby-Dick; or, The Whale* (1851), Project Gutenberg #2701: https://www.gutenberg.org/ebooks/2701 | Free US public-domain transcription | Base searchable chapter text. Cite edition/transcription, verify against scholarly edition for contested wording | Source identified; **not ingested** |
| Melville Electronic Library (MEL), *Versions of Moby-Dick*: https://melville.electroniclibrary.org/how-to-use-the-edition-moby-dick | Free scholarly digital edition, modern editorial contributions may be protected | Edited reading text, British/American variants, contextual annotations, revision narratives. Text is based on Bryant and Springer's Longman critical edition | Source identified; **not ingested** |
| Northwestern–Newberry, *Moby-Dick, or The Whale* (1988), ed. Harrison Hayford, Hershel Parker and G. Thomas Tanselle: https://nupress.northwestern.edu/9780810119116/moby-dick-or-the-whale/ | Scholarly print edition; licensed | Authoritative textual scholarship, edition variants | Catalog/publisher information only |
| John Bryant and Haskell Springer (eds.), *Moby-Dick: A Longman Critical Edition* (2006), represented in MEL | Critical edition; licensed/online apparatus | Fluid-text perspective and notes | Catalog/edition description only |
| *Melville's Marginalia Online*: https://www.melvillesmarginalia.org/pages/policies | Public scholarly catalog and digitized examples | What books Melville owned, borrowed, marked; do not infer particular influence from ownership alone | Source identified |

## II. Scholarly tools and commentary

| Source | Value | Access/research limitation |
|---|---|---|
| *Power Moby-Dick: The Online Annotation*, Margaret Guroff: https://www.powermobydick.com/ | Fast explanations of names, allusions, phrases, whaling details; editorial notes are copyrighted | Link and consult; do not bulk-copy annotations |
| Hershel Parker (ed.), *Moby-Dick: A Norton Critical Edition*, 3rd ed. (2018): https://wwnorton.co.uk/books/9780393285000-moby-dick-nce-3e-pa | Core anthology of documents, reception and criticism; editorial apparatus | Publisher description; access full text through library or lawful copy |
| *The New Cambridge Companion to Herman Melville* (2014), esp. Samuel Otter, “Reading Moby-Dick”: https://www.cambridge.org/core/books/abs/new-cambridge-companion-to-herman-melville/readingmobydick/F99471F024183282D440268013AD6AC6 | Modern scholarly approach to the novel as a whole | Full chapter may require access |
| Charles Olson, *Call Me Ishmael* (1947): https://www.press.jhu.edu/books/title/1262/call-me-ishmael | Influential interpretation stressing Shakespearean and other formative contexts | Publisher description; full book not ingested |
| C. L. R. James, *Mariners, Renegades and Castaways* (1953): https://brandeisuniversitypress.com/title/mariners-renegades-and-castaways-the-story-of-herman-melville-and-the-world-we-live-in-1/ | Political and democratic/authoritarian readings; useful counterweight to solely theological readings | Publisher description; full book not ingested |
| Lawrance R. Thompson, *Melville's Quarrel with God* (1952): https://press.princeton.edu/books/hardcover/9780691650357/melvilles-quarrel-with-god | Influential religious/skeptical framework, to be weighed against later scholarship rather than taken as settled fact | Publisher description; full book not ingested |
| Jonathan A. Cook, *Inscrutable Malice: Theodicy, Eschatology, and the Biblical Sources of “Moby-Dick”* (2012): https://academic.oup.com/cornell-scholarship-online/book/42287 | Sustained account of Job, apocalyptic tradition, suffering, Ahab/Ishmael. High priority for the founder's religious questions | Abstracts visible; book not ingested |
| “The Question of Providence in Moby-Dick” (2025): https://www.journals.uchicago.edu/doi/abs/10.1086/734927 | Recent argument centered on Ishmael's learning to understand an ambiguous but sometimes good world | Abstract/catalog only |
| *Melville Electronic Library — Sources*: https://melville.electroniclibrary.org/sources | Intertexts, whale-science books and Melville's rewriting of historical sources | Online project description; investigate specific source documents |

## III. Pedagogy / interactive literary reading

| Source | Why it matters |
|---|---|
| Henry Jenkins and Wyn Kelley (eds.), *Reading in a Participatory Culture: Remixing Moby-Dick in the English Classroom* (2013): https://www.degruyterbrill.com/document/doi/10.65528/9780807771259/html | A precedent for connecting close reading and exploratory participation. Read before proposing teacher-configurable modules |
| *The Moby-Dick Classroom*: https://teachers.americanliterature.com/the-moby-dick-classroom/ | Existing chapter-based teaching tool, useful competitor/benchmark rather than an authority replacing scholarship |
| *The Melville Society — Digital Resources*: https://www.melvillesociety.org/digital-resources | Portal for vetted archives, manuscript collections, and specialized scholarship |

## IV. Research priorities and method

1. Establish an edition policy and copy a documented, lawfully reusable 1851 reading text for reliable chapter-level search. First inspect and reconcile Gutenberg #2701 with MEL's reading text, then record chosen source, source date, checksum and any meaningful differences. **Not implemented yet.**
2. Build a chapter-anchored passage index and thematic cross-references rather than dumping all scholarly books into a prompt. Suggested tags: `religion/theodicy`, `narration/Ishmael`, `race/Queequeg`, `labor/economy`, `cetology/knowledge`, `style/rhetoric`, `fate/agency`, `queerness/intimacy`, `environment/ecology`, `whiteness/interpretation`.
3. For a specific claim, retrieve the novel passage, consult edition context, then scholarship expressing **genuinely different arguments**. Record exactly which portions were inspected and where a disputed point remains unresolved.
4. Produce original passage cards using the schema in `docs/literary-passage-card-template.md`. A good interaction foregrounds a detail of Melville's language, asks a productive question, and links back to the chapter.
5. Keep an evidence log so mistakes (misquotation, fictional geography, invented interpretation, anachronism) can be corrected across PRs. No fabricated page citations or claims of scholarly consensus.
