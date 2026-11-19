#!/usr/bin/env python3
"""Builds the E0b review frames (HTML -> PNG via headless Chrome).

Imagery is real archival scans read from a LOCAL CACHE that is never committed
(default /tmp/atlas-e0b-cache; override with E0B_CACHE). Cache file names and sources are listed in
docs/atlas-e0b-verification-and-mockups.md. Overlay coordinates are eyeballed in each preview's
pixel space: illustrative, not georegistered.
Usage: python3 docs/atlas-e0b-mockups/build-mockups.py
"""
import os, pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
CACHE = pathlib.Path(os.environ.get("E0B_CACHE", "/tmp/atlas-e0b-cache"))
TMP = pathlib.Path(os.environ.get("E0B_TMP", "/tmp/atlas-e0b-html"))
TMP.mkdir(parents=True, exist_ok=True)

IMG = {
    "heather": (ROOT / "public/assets/archive/heather-1797-atlantic.webp").as_uri(),
    "n1819": (CACHE / "norie1819.jpg").as_uri(),     # BPL IIIF jh344153c, 1800 px wide
    "sayer": (CACHE / "sayer1800.jpg").as_uri(),     # BnF btv1b53105224k via Commons, 1800 px wide
    "npn": (CACHE / "noriepn3840.jpg").as_uri(),     # Rumsey 4612.001 via Commons, 3840 px wide
    "n1844": (CACHE / "norie1844.jpg").as_uri(),     # BPL IIIF h702vp38n, 1800 px wide
}
SIZE = {"heather": (1200, 909), "n1819": (1800, 867), "sayer": (1800, 1289), "npn": (3840, 1777), "n1844": (1800, 806)}

# Existing named-ground route and graphite from src/chart-geometry.js / src/chart-annotations.js.
ROUTE = [(265,380),(273,389),(285,408),(330,427),(425,438),(540,442),(650,447),
         (710,470),(726,515),(730,565),(724,620),(710,665),(710,708)]
GRAPHITE = ["M401 436 C483 396 570 394 682 407", "M401 436 C488 447 588 491 692 478"]
RED, INK = "#b3261e", "#3b0f0c"

CSS = """
*{box-sizing:border-box;margin:0}
body{background:#120c07;color:#e9dcc2;font-family:Georgia,serif;overflow:hidden}
.f{position:relative;width:var(--w);height:var(--h);background:radial-gradient(ellipse at 50% 40%,#2b1c10,#0d0805 80%)}
.tag{position:absolute;z-index:9;font:700 11px/1 monospace;letter-spacing:.12em;padding:6px 9px;border-radius:2px}
.done{background:#2f6b3a;color:#e8ffe8}.prop{background:#8a6414;color:#fff4d0}
.plaque{position:absolute;z-index:5;font:11px/1.3 monospace;letter-spacing:.14em;color:#d9c08a}
.sheet{position:absolute;overflow:hidden;box-shadow:0 18px 50px #000c,0 0 0 2px #3a2814;background:#cdb98f}
.card{position:absolute;z-index:6;background:#1b130bf2;border:1px solid #5a4326;padding:12px 14px;font-size:13.5px;line-height:1.42}
.card b{font:700 11px monospace;letter-spacing:.14em;color:#d9c08a;display:block;margin-bottom:5px}
.chip{display:inline-block;font:10.5px monospace;letter-spacing:.06em;border:1px solid #8a7447;padding:3px 6px;margin:5px 5px 0 0;color:#e9dcc2}
.credit{position:absolute;z-index:6;font:10.5px/1.35 monospace;color:#a89877}
.rail{position:absolute;z-index:7;display:flex}
.rail i{flex:1;height:6px;margin:0 1px;background:#4a3a22}.rail i.on{background:#c0392b}
.rail i.inf{background:repeating-linear-gradient(90deg,#c0392b 0 3px,#4a3a22 3px 6px)}
svg text{font-family:Georgia,serif}
"""


def rail(on, inferred=()):
    return "".join(f'<i class="{"on" if i < on else ""}{" inf" if (i + 1) in inferred else ""}"></i>' for i in range(17))


def frame(name, w, h, body):
    html = f'<!doctype html><meta charset=utf-8><style>{CSS}:root{{--w:{w}px;--h:{h}px}}</style><div class=f>{body}</div>'
    (TMP / f"{name}.html").write_text(html)
    out = HERE / f"{name}.png"
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu",
                    "--allow-file-access-from-files", f"--window-size={w},{h}", "--hide-scrollbars",
                    "--virtual-time-budget=6000", f"--screenshot={out}", (TMP / f"{name}.html").as_uri()],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


class Ov:
    """SVG overlay; every size is multiplied by u so strokes/text keep a constant on-screen size."""
    def __init__(self, uid, u, m=False):
        self.u, self.uid, self.m = u, uid, m
        self.fs, self.zs = (0.82, 0.55) if m else (1, 1)
        self.texts = []
        self.parts = [
            f'<defs><pattern id="h{uid}" width="{9*u}" height="{9*u}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
            f'<rect width="{9*u}" height="{9*u}" fill="{RED}" fill-opacity=".10"/>'
            f'<line x1="0" y1="0" x2="0" y2="{9*u}" stroke="{RED}" stroke-width="{1.6*u}" stroke-opacity=".6"/></pattern></defs>']

    def text(self, x, y, s, anchor="start", size=14):
        self.texts.append((x, y, s, anchor, size))

    def _render_text(self, x, y, s, anchor, size, x0, x1):
        u = self.u
        if not x0 <= x <= x1:
            return ""
        fz = size * self.fs * u
        w = len(s.replace("&amp;", "&")) * fz * 0.56
        left = {"start": x, "middle": x - w / 2, "end": x - w}[anchor]
        left = max(x0 + 6 * u, min(left, x1 - 6 * u - w))
        return (f'<text x="{left}" y="{y}" text-anchor="start" font-size="{fz}" font-weight="700" fill="{INK}" '
                f'stroke="#e8d9b0" stroke-width="{3.4*u}" paint-order="stroke" stroke-linejoin="round">{s}</text>')

    def line(self, pts, kind="inferred"):
        u = self.u
        dash = {"inferred": f"{10*u} {7*u}", "planned": f"{2*u} {8*u}"}[kind]
        p = " ".join(f"{x},{y}" for x, y in pts)
        self.parts.append(f'<polyline points="{p}" fill="none" stroke="{RED}" stroke-width="{3.4*u}" stroke-linecap="round" '
                          f'stroke-linejoin="round" stroke-dasharray="{dash}"/>')

    def ring(self, x, y, label, dx=14, dy=5, anchor="start"):
        u = self.u
        self.parts.append(f'<circle cx="{x}" cy="{y}" r="{7*u}" fill="#e8d9b0" fill-opacity=".85" stroke="{RED}" stroke-width="{3*u}"/>')
        self.text(x + dx * u, y + dy * u, label, anchor)

    def zone(self, cx, cy, rx, ry, label, lx=None, ly=None):
        u = self.u
        rx, ry = rx * self.zs, ry * self.zs
        lx = cx if lx is None else lx
        ly = cy + (ry + 18) * u if ly is None else ly
        self.parts.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx*u}" ry="{ry*u}" fill="url(#h{self.uid})" stroke="{RED}" '
                          f'stroke-width="{2*u}" stroke-dasharray="{5*u} {5*u}"/>')
        self.text(lx, ly, label, "middle", 13)

    def band(self, x, y, w, h, label, ly):
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="url(#h{self.uid})" opacity=".8"/>')
        self.text(x + w / 2, ly, label, "middle", 14)

    def off(self, x, y, label, below=False):
        u = self.u
        self.parts.append(f'<path d="M{x-12*u} {y-14*u} L{x} {y} L{x+12*u} {y-14*u}" fill="none" stroke="{RED}" stroke-width="{3.4*u}" stroke-linecap="round"/>')
        self.text(x, y + 30 * u if below else y - 24 * u, label, "middle", 13)

    def svg(self, key, vb, w, h):
        iw, ih = SIZE[key]
        vx, _, vw, _ = map(float, vb.split())
        labels = [self._render_text(*t, vx, vx + vw) for t in self.texts]
        return (f'<svg width="{w}" height="{h}" viewBox="{vb}" preserveAspectRatio="xMidYMid slice">'
                f'<image href="{IMG[key]}" width="{iw}" height="{ih}"/>' + "".join(self.parts) + "".join(labels) + "</svg>")


def vb_u(vb, w):
    return float(vb.split()[2]) / w


# ---- per-sheet overlays, in image-pixel coordinates (zone radii are in screen px) ----
def ov_a1(D, vb, w):
    o = Ov("a1", vb_u(vb, w), w < 400); u = o.u
    o.parts.append("".join(f'<path d="{d}" fill="none" stroke="#5b5b5b" stroke-width="{2.2*u}" opacity=".55"/>' for d in GRAPHITE))
    o.line(ROUTE)
    for p, t, a in [(ROUTE[0], "Nantucket · Ch. 22", "start"), (ROUTE[7], "Azores ground · Ch. 51", "end"),
                    (ROUTE[12], "Cape Verde ground · Ch. 51", "end")]:
        o.ring(p[0], p[1], t, 14 if a == "start" else -14, 5, a)
    o.parts.append(f'<line x1="0" x2="1200" y1="882" y2="882" stroke="#7a1f19" stroke-width="{2*u}" stroke-dasharray="{3*u} {5*u}"/>')
    o.text(640, 872, "SHEET EDGE · NEXT SHEET REQUIRED", "middle", 12)
    return o


def ov_a2(D, vb, w):
    o = Ov("a2", vb_u(vb, w), w < 400)
    o.line([(536, 3), (400, 300), (230, 690)])
    o.line([(230, 690), (520, 610), (790, 500)])
    o.line([(790, 500), (1000, 600), (1148, 657)])
    o.zone(230, 690, 85, 38, "PLATE GROUND · zone" if o.m else "PLATE GROUND · zone, not a pin")
    o.zone(790, 520, 85, 38, "CARROL GROUND · zone")
    o.ring(1148, 657, "Cape of Good Hope", 14, -12)
    o.off(536, 22 * o.u, "from Cape Verde" if o.m else "from Cape Verde ground", below=True)
    return o


def ov_b1(D, vb, w):
    o = Ov("b1", vb_u(vb, w), w < 400)
    o.line([(150, 1108), (330, 1175), (610, 1212)])
    o.line([(610, 1212), (900, 1000), (1200, 780), (1368, 672)])
    o.ring(150, 1108, "Cape of Good Hope")
    o.off(610, 1226, "Crozets ~46°S: off the sheet" if o.m else "Crozets ~46°S: beyond the printed edge")
    o.ring(1368, 672, "Java Head / Sunda Strait", -14, -10, "end")
    return o


def ov_b2(D, vb, w):
    o = Ov("b2", vb_u(vb, w), w < 400)
    o.line([(1368, 672), (1430, 650), (1490, 628)], "planned")
    o.line([(1490, 628), (1520, 470), (1615, 356), (1624, 246)])
    o.ring(1368, 672, "Sunda Strait" if o.m else "Sunda Strait · Ch. 87 plan", -20, 28, "start")
    o.zone(1495, 590, 60, 30, "JAVA SEA · zone")
    o.ring(1624, 246, "Bashee Islands", -14, 5, "end")
    return o


def ov_c1(D, vb, w):
    o = Ov("c1", vb_u(vb, w), w < 400)
    o.line([(335, 1512), (600, 1330), (900, 1190), (1100, 1330), (1380, 1692)])
    o.ring(335, 1512, "Bashee Islands")
    o.zone(900, 1190, 110, 48, "JAPAN GROUND" if o.m else "JAPAN GROUND · broad zone")
    o.off(1380, 1692, "on to the Line")
    o.band(0, 1655, 3840, 30, "", 0)
    o.text(float(vb.split()[0]) + float(vb.split()[2]) / 2, 1650,
           "SOUTHERN LIMIT ≈ 12–13°N · equator on next sheet" if o.m else "SHEET'S SOUTHERN LIMIT ≈ 12–13°N · the equator is on the next sheet", "middle", 13)
    return o


def ov_c2(D, vb, w):
    o = Ov("c2", vb_u(vb, w), w < 400)
    x0, cw = float(vb.split()[0]), float(vb.split()[2])
    o.band(x0, 120, cw, 55, "", 0)
    o.text(x0 + cw / 2, 153, "THE LINE · no pin, no wreck" if o.m else "THE LINE · season-on-the-line · no pin, no wreck", "middle", 14)
    return o


SH = {"desktop": (1320, 600), "mobile": (366, 410)}

FRAMES = {
    "A1-heather-stages-1-4": dict(key="heather", folio="FOLIO I / ATLANTIC", st="1–4", rail=(4, (2,)),
        vb=("120 330 760 345", "240 330 500 560"), ov=ov_a1,
        head="CH. 22–51 · NAMED GROUNDS", body="Nantucket to the Azores and Cape Verde grounds. Dashed red = modern reading aid between named grounds. Grey graphite = existing Ch. 44 layer, unchanged.",
        chips=["NAMED · HIGH", "LINE BETWEEN · INFERRED", "GRAPHITE · FICTIONAL"],
        credit="Heather 1797, existing asset (public/assets/archive/manifest.json)."),
    "A2-atlantic-plate-carrol-cape-stages-5-7": dict(key="n1819", folio="SHEET II / SOUTH ATLANTIC", st="5–7", rail=(7, (5, 6, 7)),
        vb=("0 0 1800 818", "140 83 700 784"), ov=ov_a2,
        head="CH. 51 · PLATE → CARROL → CAPE", body="One continuous 1819 sheet holds the River Plate, St Helena and the Cape. Zones are broad; lines between them are inferred. Ship tracks already printed or pencilled on this sheet belong to other voyages.",
        chips=["GROUNDS · HIGH", "TRACK · INFERRED", "FOREIGN TRACKS ON SHEET"],
        credit="J.W. Norie &amp; Co., A new and correct chart of the Atlantic Ocean, 1 Jan 1819. Leventhal Map &amp; Education Center, BPL (commonwealth:jh3441523); no known restrictions."),
    "A2b-atlantic-carrol-cape-stages-6-7": dict(key="n1819", folio="SHEET II / SOUTH ATLANTIC", st="6–7", rail=(7, (6, 7)),
        vb=("0 0 1800 818", "560 83 700 784"), ov=ov_a2, mobile_only=True,
        head="CH. 51 · CARROL GROUND → THE CAPE", body="Second mobile beat: the sheet pans east. Carrol Ground stays a broad zone; the Cape is the narrated turning point.",
        chips=["CARROL · HIGH", "TRACK · INFERRED"],
        credit="J.W. Norie &amp; Co., A new and correct chart of the Atlantic Ocean, 1 Jan 1819. Leventhal Map &amp; Education Center, BPL (commonwealth:jh3441523); no known restrictions."),
    "B1-indian-cape-to-sunda-stages-8-11": dict(key="sayer", folio="SHEET III / INDIAN OCEAN", st="8–11", rail=(11, (8, 9, 10, 11)),
        vb=("60 600 1400 636", "100 630 540 605"), ov=ov_b1,
        head="CH. 87 · THE CROZETS, THEN SUNDA", body="The Crozets (~46°S) lie south of this sheet, so stage 8 is an arrow past the edge, never a marker. The line to Java Head is inferred.",
        chips=["CROZETS · OFF-SHEET", "CAPE → SUNDA · INFERRED"],
        credit="Sayer/Huddart Indian Ocean chart, 1787, BnF Gallica btv1b53105224k via Wikimedia Commons (public domain)."),
    "B2-sunda-java-sea-philippines-bashee-stages-11-13": dict(key="sayer", folio="SHEET III / INDIAN OCEAN", st="11–13", rail=(13, (11, 12, 13)),
        vb=("656 190 1144 520", "1180 210 540 605"), ov=ov_b2,
        head="CH. 87 · A PLAN, NOT A FIX", body="Dotted red = the Ch. 87 planned course through Sunda. Dashed = inferred passage through the Java Sea and Philippine waters. The ring marks Bashee, which the text names.",
        chips=["SUNDA · PLANNED", "JAVA SEA · MEDIUM", "PHILIPPINES · INFERRED", "BASHEE · NAMED"],
        credit="Sayer/Huddart Indian Ocean chart, 1787, BnF Gallica btv1b53105224k via Wikimedia Commons (public domain)."),
    "C1-pacific-bashee-japan-stages-13-16": dict(key="npn", folio="SHEET IV / NORTH PACIFIC", st="13–16", rail=(16, (14, 15, 16)),
        vb=("0 1010 1500 682", "300 660 900 1008"), ov=ov_c1,
        head="CHS. 111–132 · TO THE JAPAN GROUND", body="From Bashee north-east to the Japan Ground, drawn as a broad zone. This sheet stops at about 12–13°N, so the last leg continues on the next sheet.",
        chips=["JAPAN · BROAD ZONE", "TRACK · INFERRED", "SHEET GAP TO THE SOUTH"],
        credit="J.W. Norie &amp; Co., New Chart of the Pacific Ocean, 1 Oct 1825. David Rumsey Map Collection, Stanford Libraries (4612.001), CC BY-NC-SA 3.0; cropped and annotated."),
    "C2-pacific-equatorial-stage-17": dict(key="n1844", folio="SHEET V / SOUTH-EAST PACIFIC", st="17", rail=(17, (15, 16, 17)),
        vb=("560 20 1000 455", "700 0 450 504"), ov=ov_c2,
        head="CHS. 126–135 · A REGION, NOT A POINT", body="The loss has no longitude in the text. A faded band marks the Line; there is no pin, no wreck and no named islet.",
        chips=["REGION · HIGH", "WRECK · UNKNOWN"],
        credit="J.W. Norie &amp; Co., Pacific chart, 1844. Leventhal Map &amp; Education Center, BPL (commonwealth:vt154w90j); no known restrictions."),
}


def build(name, spec, D):
    W, H = (1440, 900) if D else (390, 844)
    mode = "desktop" if D else "mobile"
    sw, sh = SH[mode]
    vb = spec["vb"][0 if D else 1]
    sheet_svg = spec["ov"](D, vb, sw).svg(spec["key"], vb, sw, sh)
    if D:
        s_pos, card_pos = "left:60px;top:64px", "left:60px;top:684px;width:860px;height:140px"
        rail_pos, credit_pos, plaque = "left:60px;top:836px;width:1320px", "left:60px;top:856px;width:1320px", "left:60px;top:26px"
        tag = '<div class="tag done" style="right:60px;top:26px">COMPLETED MOCKUP · real archival scan</div>'
    else:
        s_pos, card_pos = "left:12px;top:84px", "left:12px;top:504px;width:366px"
        rail_pos, credit_pos, plaque = "left:12px;top:812px;width:366px", "left:12px;top:720px;width:366px", "left:12px;top:44px"
        tag = '<div class="tag done" style="left:12px;top:10px">COMPLETED MOCKUP · real scan</div>'
    chips = "".join(f'<span class=chip>{c}</span>' for c in spec["chips"])
    card = f'<div class=card style="{card_pos}"><b>{spec["head"]}</b>{spec["body"]}<br>{chips}</div>'
    legend = ""
    if D:
        legend = (f'<div class=card style="left:940px;top:684px;width:440px;height:140px"><b>HOW TO READ THE LINE</b>'
                  f'<svg width="400" height="86"><g font-size="12.5" fill="#e9dcc2" font-family="Georgia">'
                  f'<circle cx="30" cy="12" r="7" fill="#e8d9b0" stroke="{RED}" stroke-width="3"/><text x="72" y="16">ring = place Melville names</text>'
                  f'<line x1="2" x2="60" y1="36" y2="36" stroke="{RED}" stroke-width="3.4" stroke-dasharray="10 7"/><text x="72" y="40">dashed = inferred link</text>'
                  f'<line x1="2" x2="60" y1="60" y2="60" stroke="{RED}" stroke-width="3.4" stroke-dasharray="2 8" stroke-linecap="round"/><text x="72" y="64">dotted = planned course (Ch. 87)</text>'
                  f'<rect x="270" y="4" width="50" height="16" fill="{RED}" fill-opacity=".25" stroke="{RED}" stroke-dasharray="4 4"/><text x="326" y="17">broad zone</text>'
                  f'</g></svg></div>')
    credit = f'<div class=credit style="{credit_pos}">{spec["credit"]} Overlay placement illustrative, not georegistered.</div>'
    body = (tag + f'<div class=plaque style="{plaque}">THE MELVILLE ATLAS · {spec["folio"]} · STAGES {spec["st"]} OF 17</div>'
            + f'<div class=sheet style="{s_pos};width:{sw}px;height:{sh}px">{sheet_svg}</div>' + card + legend + credit
            + f'<div class=rail style="{rail_pos}">{rail(*spec["rail"])}</div>')
    frame(f"{name}-{mode}", W, H, body)


def transition():
    """T1: proposed fold between Heather (Folio I) and the 1819 sheet, both real assets."""
    sw, sh, top_h = 1320, 600, 250
    u1 = 760 / sw
    o1 = Ov("t1", u1)
    o1.line(ROUTE[7:])
    o1.ring(ROUTE[12][0], ROUTE[12][1], "Cape Verde ground", -14, -12, "end")
    s1 = o1.svg("heather", f"120 {709 - top_h * u1:.0f} 760 {top_h * u1:.0f}", sw, top_h)
    u2 = 1800 / sw
    o2 = Ov("t2", u2)
    o2.line([(536, 0), (400, 300), (230, 690)])
    o2.zone(230, 690, 85, 38, "PLATE GROUND · zone")
    s2 = o2.svg("n1819", f"0 0 1800 {(sh - top_h) * u2:.0f}", sw, sh - top_h)
    body = ('<div class="tag done" style="right:60px;top:26px">COMPLETED MOCKUP · mid-transition, real scans</div>'
            '<div class=plaque style="left:60px;top:26px">PROPOSED TRANSITION · FOLIO I → SHEET II (≈800 ms, reverses on scroll up)</div>'
            f'<div class=sheet style="left:60px;top:64px;width:{sw}px;height:{sh}px">'
            f'<div style="position:absolute;left:0;top:0">{s1}</div>'
            f'<div style="position:absolute;left:0;top:{top_h}px;box-shadow:0 -14px 22px #0009">{s2}</div></div>'
            '<div class=card style="left:60px;top:684px;width:1320px"><b>HOW THE SHEETS JOIN</b>The 1819 sheet slides up beneath the Heather lower margin; the dashed lead-in re-enters at the top edge and the plaque swaps. '
            'Projection and scale differ between the two sheets, so the seam is a hand-off, never a continuous line. Reduced motion: cross-fade with the plaque change.</div>'
            '<div class=credit style="left:60px;top:856px;width:1320px">Heather 1797 (existing asset) over Norie 1819 (BPL, commonwealth:jh3441523). Overlay placement illustrative, not georegistered.</div>'
            f'<div class=rail style="left:60px;top:836px;width:1320px">{rail(5, (5,))}</div>')
    frame("T1-sheet-transition-desktop", 1440, 900, body)


def board():
    rows = [("1 · Fold within an ocean", "Heather lower margin lifts and the 1819 South Atlantic sheet slides up beneath it with a visible seam and plaque swap. The red line pauses and re-enters with a dashed lead-in."),
            ("2 · Turn between oceans", "Atlantic → Indian → Pacific: the sheet turns like a page (≈600 ms); reduced-motion = cross-fade with plaque change."),
            ("3 · Evidence toggle", "'Only what Melville tells us' fades dashed and dotted links and leaves rings; keyboard Space/Enter; announced to screen readers."),
            ("4 · Graphite (Ch. 44)", "Existing pencil/erasure layer stays on Folio I; never carried to later sheets and never treated as position evidence."),
            ("5 · Off-sheet and gaps", "Crozets: arrow past the sheet edge. North/south Pacific sheets: labelled gap, then the Line. No bridging line is drawn."),
            ("6 · Ending", "The last sheet's ink yields to the existing black abyss. Three quotations and the whale/squid reveal are untouched.")]
    cells = "".join(f'<div class=card style="position:static;width:430px;height:170px"><b>{a}</b>{b}</div>' for a, b in rows)
    body = ('<div class="tag prop" style="right:16px;top:14px">PROPOSED · interaction grammar (no imagery)</div>'
            '<div class=plaque style="left:40px;top:30px">E0b · TRANSITIONS &amp; EVIDENCE GRAMMAR</div>'
            f'<div style="position:absolute;left:40px;top:70px;display:flex;flex-wrap:wrap;gap:20px;width:1380px">{cells}</div>')
    frame("D-interaction-board-desktop", 1440, 900, body)


if __name__ == "__main__":
    for n, s in FRAMES.items():
        for D in (True, False):
            if D and s.get("mobile_only"):
                continue
            build(n, s, D)
    transition()
    board()
