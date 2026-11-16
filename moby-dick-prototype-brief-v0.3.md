# Moby-Dick — Prototype Revision Brief v0.3

**Purpose:** Focused iteration on the existing working website. Preserve previous implementation; do not rebuild the project or add new product features. This brief supersedes the staging/order of scenes in v0.2, but not its accessibility, performance, and historical-integrity requirements.

**Repository:** `skyeuldrich/moby-dick-explorer`. Start from the latest `main` branch, work on a dedicated branch, run tests and inspect the rendered site. Once changes pass, open a PR and merge if there are no material unresolved issues. Offer the live deployment link for founder review; source-code review is not required from this nontechnical founder.

## 1. New mandatory scene order

**Blackness → glowing candle rises into view → historical whaling manuscript and economic facts → period Nantucket harbor → extended red-line map voyage → whale anatomical illustration → chart dissolves / descent into the abyss → whale-and-squid tableau.**

This order is deliberate. **The anatomical whale plate must NOT occur in the middle of the chart voyage.** It is a new scene *after the mapped journey* and *before sinking into the abyss*. The manuscript/candle scene is before Nantucket, not on the map.

## 2. Candle reveal — spatial movement, not a fade-in at the center

Current behavior is wrong: the candle appears in place. The founder wants to **scroll down toward the candle**.

- Begin in near-blackness with no visible candle.
- On forward scrolling, show faint warm light **emerging from below the bottom edge**.
- As the visitor scrolls farther, the light grows brighter, the lit area climbs upward, and the candle moves into view from below, ultimately occupying a visually centered position.
- Once the candle is visible/centered, its pool of light illuminates a period-style manuscript, account ledger, or document on a nearby surface.
- Reveal short, **verified** economic facts in that light. Avoid long essay paragraphs and unsourced placeholder copy.
- Maintain the sense of physical movement through a dark environment. Do not fake this by merely changing opacity on an already centered candle.
- This sequence must be **scroll-linked, smoothly reversible**, and polished on mobile touch; avoid transitions that jump between fixed positions.
- Creative detail: make it a **spermaceti candle**, the premium candle wax derived from sperm whales' heads, so the act of illuminating whaling history is itself implicated in the whale economy. This detail is historically supported by the New Bedford Whaling Museum.

## 3. Manuscript content: verified short historical facts and quotation

Use this **research-backed content pool**. The primary visible scene should present the period quotation plus two or three statistics, with remaining facts in a discrete optional note or small annotation if it helps pacing. Preserve dates and attribution; do not combine distinct voyages or mislabel nominal historical dollars as current dollars.

1. **Actual period quotation, 1840–1841:** Henry Smith wrote in the journal of the bark *Marcella* of New Bedford: “Success to the old Marcella may she speedily return to her original haven abundantly laden with the riches of the ocean.” Attribution: journal of Henry Smith, *Marcella* (1840–1841), as reproduced by New Bedford Whaling Museum. Source: https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/
2. **Fleet size, 1846:** About **735 American whaleships**, out of roughly **900 worldwide**, employed about **20,000 men aboard American ships**. The figures are a historical estimate reported by Eric Jay Dolin in PBS *American Experience*. Do not present them as exact census totals. Source: https://www.pbs.org/wgbh/americanexperience/films/whaling/
3. **Industry's reach, 1846:** An estimated **$70 million** (in 1846 dollars) invested in whaling infrastructure; roughly **70,000 people** made a living from whaling directly or indirectly, according to Dolin's figures. Source: https://www.pbs.org/wgbh/americanexperience/films/whaling/
4. **One voyage's return, 1851:** The New Bedford whaler *Benjamin Tucker* returned with **73,707 gallons of whale oil**, **5,348 gallons of sperm oil**, and **30,012 pounds of baleen**; the museum reports a **$45,320 net profit**. Those are outputs from a specific voyage, not the value of an average whale. Source: https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/
5. **Inequality at sea, 1836:** The whaleship *Milton*'s captain received **$5,882**, versus **$571** for the lowest-paid seaman on the same voyage, according to the New Bedford Whaling Museum. Sailors were paid by a fractional **lay** in voyage proceeds rather than conventional wages. Source: https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/ ; lay explanation: https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/

**Context for the candle:** Whaling produced the oil used in lamps and machinery as well as spermaceti wax used to make superior candles. Source: https://www.whalingmuseum.org/research/research-resources/whaling-history/yankee-whaling/

**Editorial discipline:**
- This is not a scrapbook of statistics. Use visually compelling hierarchy and a concise narrative arc: **hope for riches → size of the enterprise → wealth versus sailor's share**.
- Cite each factual panel with an unobtrusive source link. Identify the journal quote as genuine; do not manufacture a fake historical contract or put modern statistics in a period scribe's mouth.
- A plausible ledger-like design is fine, provided readers can distinguish original primary source from modern factual annotation. Use readable type.
- If space is scarce, prioritize 1, 2, and 5; put the others behind optional reveal interactions.

## 4. Map and anatomical whale: corrected transition

- Preserve the longer chart voyage with scroll-drawn red line and coastal/navigational details.
- **Finish the map voyage first.** The anatomical whale illustration is a **separate, deliberate next scene**. The visitor moves beyond the end of the red route into a period-inspired scientific plate, ideally referencing an 1830s–1850s source such as Thomas Beale's sperm whale anatomy work.
- Let the viewer linger on the anatomy illustration, perhaps offering one or two period anatomical labels. Do not turn this into a new encyclopedic chapter or cover up the animated route with the illustration.
- As scrolling continues, this attempt to diagram and measure the whale yields to the unknowable real ocean: the chart/plate fades into darkness and the viewer sinks into the abyss.
- Preserve the whale–giant-squid tableau and label it an artistic reconstruction based on indirect evidence, not an eyewitness depiction.
- Cite archival art actually used, or label newly drawn period-inspired art as original reconstruction. Ensure reuse rights for any scans.

## 5. Quality and implementation constraints

- Address the founder's concern that the scroll currently feels jumpy. Diagnose the actual cause and improve scroll progress mapping, scene boundaries, rendering, compositing, and mobile touch performance. Compare interaction feel with https://boomsupersonic.com/superpower when possible. Do not imitate its art or use an unnecessarily heavy engine.
- Reversible backward scrolling, no hard cuts, no unexpected autoplay, readable text at mobile widths.
- Keep keyboard navigation, chapter 44 discovery, reduced-motion alternative, and current tests intact.
- Avoid scope creep: no new literary chapters, accounts, audio system, teacher dashboard, physics simulation or content-management backend.
- Test the build and browser behavior, report which engines/devices were tested, fix regressions, and deploy a preview.

## Acceptance criteria

1. A first-time visitor must **scroll into** a dim light rising from *below*, reaching a candle at center; the candle must not pop into existence at center.
2. The candle exposes period-inspired documents with genuinely sourced whaling-economy details, not filler.
3. Period Nantucket follows the candle; map follows Nantucket, and red route draws for a sustained journey.
4. Whale anatomical engraving appears **only after the map voyage**, as a transition toward the abyss.
5. Abyss follows the anatomy scene, ending at the whale/squid reconstruction.
6. Transitions are continuous and smooth forward and backward, including on mobile; accessibility and existing interactions survive.
7. All new claims and artifact labels are source-accurate. Provide a working deployment URL and summarize tradeoffs.
