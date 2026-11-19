#!/usr/bin/env python3
"""Builds the E0b review frames (HTML -> PNG via headless Chrome).

Only the Heather 1797 sheet already in public/assets/archive is used as imagery.
Every other sheet is a hatched, labelled PLACEHOLDER: no map is drawn or generated.
Usage: python3 docs/atlas-e0b-mockups/build-mockups.py
"""
import pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
HEATHER = (ROOT / "public/assets/archive/heather-1797-atlantic.webp").as_uri()
SRC = HERE / "src"
SRC.mkdir(exist_ok=True)

# Existing named-ground route from src/chart-geometry.js (1200 x 909 chart space).
ROUTE = [(265,380),(273,389),(285,408),(330,427),(425,438),(540,442),(650,447),
         (710,470),(726,515),(730,565),(724,620),(710,665),(710,708)]
GRAPHITE = ["M401 436 C483 396 570 394 682 407", "M401 436 C488 447 588 491 692 478"]

CSS = """
*{box-sizing:border-box;margin:0}
body{background:#120c07;color:#e9dcc2;font-family:Georgia,serif;overflow:hidden}
.f{position:relative;width:var(--w);height:var(--h);
 background:radial-gradient(ellipse at 50% 40%,#2b1c10,#0d0805 80%)}
.tag{position:absolute;z-index:9;font:700 11px/1 monospace;letter-spacing:.12em;padding:6px 9px;border-radius:2px}
.done{background:#2f6b3a;color:#e8ffe8}.prop{background:#8a6414;color:#fff4d0}.block{background:#8c2f2a;color:#ffe3df}
.plaque{position:absolute;z-index:5;font:11px/1.3 monospace;letter-spacing:.14em;color:#d9c08a}
.sheet{position:absolute;overflow:hidden;box-shadow:0 18px 50px #000c,0 0 0 2px #3a2814;background:#cdb98f}
.hatch{background:repeating-linear-gradient(45deg,#b8a47a 0 12px,#c9b78e 12px 24px);
 display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#4a1d18;
 font:700 15px/1.5 monospace;padding:16px}
.hatch small{font:12px/1.5 Georgia,serif;color:#3b2a18;max-width:520px;margin-top:8px}
.card{position:absolute;z-index:6;background:#1b130bf2;border:1px solid #5a4326;padding:14px 16px;font-size:14px;line-height:1.45}
.card b{font:700 11px monospace;letter-spacing:.14em;color:#d9c08a;display:block;margin-bottom:6px}
.card q{display:block;font-style:italic;margin:6px 0}
.chip{display:inline-block;font:11px monospace;letter-spacing:.08em;border:1px solid #8a7447;padding:3px 7px;margin:4px 6px 0 0;color:#e9dcc2}
.btn{position:absolute;z-index:7;font:12px monospace;border:1px solid #d9c08a;padding:8px 11px;color:#f3e6c6;background:#2a1d10}
.rail{position:absolute;z-index:7;display:flex;gap:0}
.rail i{flex:1;height:6px;margin:0 1px;background:#4a3a22}.rail i.on{background:#c0392b}.rail i.inf{background:repeating-linear-gradient(90deg,#c0392b 0 3px,#4a3a22 3px 6px)}
svg text{font-family:Georgia,serif}
"""


def rail(on, inferred=()):
    return "".join(
        f'<i class="{"on" if i < on else ""}{" inf" if (i + 1) in inferred else ""}"></i>' for i in range(17))


def frame(name, w, h, body):
    html = f'<!doctype html><meta charset=utf-8><style>{CSS}:root{{--w:{w}px;--h:{h}px}}</style><div class=f>{body}</div>'
    (SRC / f"{name}.html").write_text(html)
    out = HERE / f"{name}.png"
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu",
                    "--allow-file-access-from-files", f"--window-size={w},{h}", "--hide-scrollbars",
                    "--virtual-time-budget=4000", f"--screenshot={out}", (SRC / f"{name}.html").as_uri()],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def heather_svg(vb, w, h, show_graphite=True):
    pts = " ".join(f"{x},{y}" for x, y in ROUTE)
    grounds = [(ROUTE[0], "Nantucket · Ch. 22"), (ROUTE[7], "Azores ground · Ch. 51"),
               (ROUTE[12], "Cape Verde ground · Ch. 51")]
    g = "".join(f'<path d="{d}" fill="none" stroke="#5b5b5b" stroke-width="2.2" opacity=".55"/>'
                for d in GRAPHITE) if show_graphite else ""
    marks = "".join(
        f'<circle cx="{p[0]}" cy="{p[1]}" r="6" fill="#b3261e" stroke="#fff" stroke-width="1.5"/>'
        f'<text x="{p[0]+12 if p[0]<700 else p[0]-12}" y="{p[1]+4}" text-anchor="{"start" if p[0]<700 else "end"}" font-size="15" font-weight="700" fill="#3b0f0c" '
        f'stroke="#e8d9b0" stroke-width="3" paint-order="stroke">{t}</text>' for p, t in grounds)
    return f'''<svg width="{w}" height="{h}" viewBox="{vb}" preserveAspectRatio="xMidYMid slice">
 <image href="{HEATHER}" width="1200" height="909"/>
 {g}
 <polyline points="{pts}" fill="none" stroke="#b3261e" stroke-width="3.4" stroke-dasharray="9 7" stroke-linecap="round"/>
 {marks}
 <line x1="0" x2="1200" y1="882" y2="882" stroke="#7a1f19" stroke-width="2" stroke-dasharray="3 5"/>
 <text x="640" y="872" text-anchor="middle" font-size="13" font-weight="700" fill="#7a1f19" stroke="#e8d9b0" stroke-width="3" paint-order="stroke">SHEET EDGE: SECOND SHEET REQUIRED</text></svg>'''


def build(device):
    D = device == "desktop"
    W, H = (1440, 900) if D else (390, 844)
    sh = dict(left=60, top=70, width=860, height=700) if D else dict(left=12, top=76, width=366, height=430)
    cardpos = ("left:950px;top:70px;width:410px" if D
               else f"left:12px;top:{sh['top'] + sh['height'] + 10}px;width:366px")
    rail_pos = "left:60px;top:800px;width:860px" if D else "left:12px;top:796px;width:366px"
    btn = "left:950px;top:640px" if D else "right:12px;top:40px"
    plaque_pos = "left:60px;top:30px" if D else "left:12px;top:30px"

    def common(tag_cls, tag, folio, nstage):
        return (f'<div class="tag {tag_cls}" style="right:16px;top:14px;{"" if D else "display:none"}">{tag}</div>'
                f'<div class="tag {tag_cls}" style="left:12px;bottom:10px;{"display:none" if D else ""}">{tag}</div>'
                f'<div class=plaque style="{plaque_pos}">THE MELVILLE ATLAS · {folio}<br>STAGE {nstage} OF 17</div>')

    def placeholder(title, note, style):
        return f'<div class="sheet hatch" style="{style}">{title}<small>{note}</small></div>'

    def sheet_style(**o):
        s = {**sh, **o}
        return f'left:{s["left"]}px;top:{s["top"]}px;width:{s["width"]}px;height:{s["height"]}px'

    toggle = f'<div class=btn style="{btn}">◐ ONLY WHAT MELVILLE TELLS US</div>' if D else ""
    top_h = 250 if D else 150
    out = {}

    vb = "150 300 800 560" if D else "230 300 540 600"
    out["A1-heather-stages-1-4"] = (
        common("done", "COMPLETED MOCKUP · real cleared asset", "FOLIO I / ATLANTIC", "1–4") +
        f'<div class=sheet style="{sheet_style()}">{heather_svg(vb, sh["width"], sh["height"])}</div>'
        f'<div class=card style="{cardpos}"><b>CH. 51 · NAMED GROUNDS</b>Ishmael lists the cruising grounds the Pequod passed: Azores, Cape Verde, the Plate, Carrol.<span class=chip>NAMED · HIGH</span><span class=chip>LINE BETWEEN · INFERRED</span><br><br>Existing 1797 Heather sheet (BPL). Dashed red = modern reading aid. Grey graphite = existing Ch. 44 layer, kept unchanged.</div>'
        + toggle + f'<div class=rail style="{rail_pos}">{rail(4, (2,))}</div>')

    seam_vb = "150 700 800 200" if D else "190 770 420 130"
    out["A2-sheet-seam-plate-carrol-cape"] = (
        common("prop", "PROPOSED · south sheet NOT acquired", "FOLIO I → SHEET II", "5–7") +
        f'<div class=sheet style="{sheet_style(height=top_h)}">{heather_svg(seam_vb, sh["width"], top_h, show_graphite=False)}</div>' +
        placeholder("PLACEHOLDER · BLUNT SOUTH ATLANTIC (1834/1840)",
                    "Unfolds from beneath the Heather lower margin. Plate, Carrol and Cape zones are placed ONLY after the scan is inspected, as broad bands, never pins.",
                    sheet_style(top=sh["top"] + top_h, height=sh["height"] - top_h)) +
        f'<div class=card style="{cardpos}"><b>CH. 51 · THE PLATE → CARROL → THE CAPE</b>Route turns west toward the Río de la Plata, then east to Carrol Ground (south of St Helena) and the Cape.<span class=chip>GROUNDS · HIGH</span><span class=chip>TRACK · INFERRED</span></div>'
        + toggle + f'<div class=rail style="{rail_pos}">{rail(7, (5, 6, 7))}</div>')

    out["B-indian-ocean-sunda"] = (
        common("prop", "PROPOSED · both sheets blocked", "FOLIO II / INDIAN OCEAN", "8–13") +
        placeholder("PLACEHOLDER · BnF 1787 INDIAN OCEAN",
                    "Crozets (~46°S) coverage unverified; fallback Arrowsmith. Passage inset: Norie China Sea & East India Archipelago. Planned course (Ch. 87) drawn interrupted.",
                    sheet_style()) +
        f'<div class=card style="{cardpos}"><b>CH. 87 · A PLAN, NOT A FIX</b><q>…purposing to pass…</q>Interrupted red = intention; solid = narrated place.<span class=chip>SUNDA · HIGH</span><span class=chip>JAVA SEA · MEDIUM</span><span class=chip>PHILIPPINES · INFERRED</span></div>'
        + toggle + f'<div class=rail style="{rail_pos}">{rail(13, (11, 12))}</div>')

    out["C-pacific-japan-equator"] = (
        common("prop", "PROPOSED · sheet blocked", "FOLIO III / PACIFIC", "13–17") +
        placeholder("PLACEHOLDER · NORIE PACIFIC, NORTHERN SHEET",
                    "Needs Bashee/Japan/equator coverage check. Installed Norie 1844 is the SOUTH-EAST Pacific and cannot serve. Ending: broad hatched equatorial uncertainty band; no wreck pin; dissolves into the existing black abyss.",
                    sheet_style()) +
        f'<div class=card style="{cardpos}"><b>CHS. 126–135 · A REGION, NOT A POINT</b>Season-on-the-Line. Longitude of the loss is not given.<span class=chip>REGION · HIGH</span><span class=chip>WRECK · UNKNOWN</span></div>'
        + toggle + f'<div class=rail style="{rail_pos}">{rail(17, (15,))}</div>')
    for k, body in out.items():
        frame(f"{k}-{device}", W, H, body)


def board():
    rows = [("1 · Fold within a folio", "Heather lower margin lifts; Blunt sheet slides up beneath it with a visible seam and plaque swap. Red line pauses at the seam and re-enters with a dashed lead-in."),
            ("2 · Cut between oceans", "Indian→Pacific: the sheet turns like a page (≈600 ms); reduced-motion = cross-fade with plaque change."),
            ("3 · Evidence toggle", "‘Only what Melville tells us’ fades dashed links and leaves grounds; keyboard Space/Enter; announced to screen readers."),
            ("4 · Graphite (Ch. 44)", "Existing pencil/erasure layer stays on Folio I; never carried to later sheets and never treated as position evidence."),
            ("5 · Ending", "Final sheet’s ink yields to the existing black abyss. Three quotations and whale/squid reveal untouched.")]
    cells = "".join(
        f'<div class=card style="position:static;width:430px;height:170px"><b>{a}</b>{b}</div>' for a, b in rows)
    legend = '''<svg width="430" height="170" style="background:#cdb98f"><g font-size="14" fill="#2a1a0c">
<line x1="20" x2="120" y1="30" y2="30" stroke="#b3261e" stroke-width="4"/><text x="135" y="35">Narrated ground (ring marker)</text>
<line x1="20" x2="120" y1="65" y2="65" stroke="#b3261e" stroke-width="3" stroke-dasharray="10 7"/><text x="135" y="70">Inferred link between grounds</text>
<line x1="20" x2="120" y1="100" y2="100" stroke="#b3261e" stroke-width="3" stroke-dasharray="2 8"/><text x="135" y="105">Planned course (Ch. 87)</text>
<line x1="20" x2="120" y1="135" y2="135" stroke="#555" stroke-width="2.2" opacity=".6"/><text x="135" y="140">Ahab graphite (fictional, Ch. 44)</text></g></svg>'''
    body = (f'<div class="tag prop" style="right:16px;top:14px">PROPOSED · interaction grammar</div>'
            f'<div class=plaque style="left:40px;top:30px">E0b · TRANSITIONS &amp; EVIDENCE GRAMMAR</div>'
            f'<div style="position:absolute;left:40px;top:70px;display:flex;flex-wrap:wrap;gap:20px;width:1380px">{cells}<div>{legend}</div></div>')
    frame("D-interaction-board-desktop", 1440, 900, body)


if __name__ == "__main__":
    for d in ("desktop", "mobile"):
        build(d)
    board()
