> **Current harbor:** the founder selected Barber’s 1839 engraving and requested animated original gulls. See [the implemented adaptation](barber-animated-gulls.md). Earlier pending-selection notes below document the preceding review.

# Issue10 implementation and pending harbor decision

Implemented the founder-uploaded transparent final whale/squid (1671×941, SHA256 9c8d32f85e93d3d679b430e15e052d89620df808f0dfd33a566c736532c02c8c) and realistic transparent candle (1024×1536, SHA256 646cca7b8dd052bda2230de5e91284f75566232e4bc2f927e052dc27c3af585c). Both are original AI-assisted, period-inspired illustrations, not archival art. Their bytes are unchanged. Removed the image-edge mask and box shading from the transparent encounter. Local shading belongs only behind the text. The candle has separate scroll-dependent ambient illumination and a contact shadow aligned to its holder.

Opening organisms travel on distinct scroll-driven arcs. Their lights are children of the same SVG, so move with their bodies. Idle drift is disabled in the opening; reduced motion disables travel. They disappear by progress .065, before the established candle scene. Existing route, quotations, anatomy and literary discovery remain.

## Harbor is awaiting founder selection

Do not close Issue10: the image swap is deliberately not merged. The interim live harbor receives typography positioning repairs only. No photo or new gull composite was silently selected. Private desktop/mobile comparisons were rendered with neutral CSS grayscale, separate text areas, and no AI repainting. The 1917 number is cropped out of the presentation; the complete source is retained privately.

A: Easy Street Basin, 1917, fishing fleet sheltering during a storm. NHA courtesy credit at https://www.coastalresiliencewalk.org/easy-street-basin confirms identification. Mirror https://images.squarespace-cdn.com/content/v1/63403b84d1a00b5a54c967a1/fbf478e1-c589-47bc-9c86-19632c3eac34/nps+easy+storm.png . Original supplied lead https://nantucketpreservation.org/wp-content/uploads/2019/01/PC-easybasin-1.jpg returned HTTP 403 in this environment. Courtesy credit does not establish reuse permission. No rights grant found: private founder preview only, no image bytes committed or publicly deployed. Photographer and publication provenance remain unresolved.

B: John Warner Barber, South-Eastern View of Nantucket, Mass., 1839; engraved S.E.Brown, Boston. Full original page https://archive.org/download/historicalcollec00barb_0/page/n480.jpg ; book https://archive.org/details/historicalcollec00barb_0 . Underlying US 1839 publication is public domain through copyright expiry; see https://copyright.cornell.edu/publicdomain . Page rotated counterclockwise and enlarged in CSS for the preview, retaining the original separately. This is the historically closer alternative, not a photograph. Whitney circa 1862 could not be obtained as a clean rights-cleared scan; no article screenshot was substituted.

Visual Director found the 1917 composition stronger; historical specialist favors the 1839 chronological fit and clear rights. No final choice inferred. Founder must choose the harbor artwork; choosing1917 additionally requires documented reuse clearance.

Actual browser checks cover desktop 1440×900, phone 390×844, narrow 360×640 and landscape 844×390. Physical devices remain untested.

Validation: all 30 Playwright tests and the production Pages build passed. Seven-scene browser checks passed at desktop and two phone widths. Motion QA independently verified scroll reversal, attached lights, fade timing and no new per-frame layout reads; Visual Director verified candle placement and transparent-art framing, and requested the local heading scrim and side-by-side desktop comparison that were implemented.
