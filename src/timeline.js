import { initSpeciesLife } from "./abyss.js";
import {voices, toScroll, fromScroll} from './descent.js';
import {
  chartWidth,
  chartHeight,
  chartInterior,
  routeLandmarks,
} from "./chart-geometry.js";
const clamp = (value) => Math.max(0, Math.min(1, value));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const smooth = (value) => value * value * (3 - 2 * value);
const fade = (p, a, b, c, d) =>
  smooth(ramp(p, a, b)) * (1 - smooth(ramp(p, c, d)));

export function initVoyage() {
  const $ = (selector) => document.querySelector(selector);
  const section = $("#voyage");
  const stage = $(".stage");
  const header = $("header");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const touch = matchMedia("(pointer: coarse)");
  const nodes = Object.fromEntries(
    [
      "chart",
      "opening",
      "hotspot",
      "transition-copy",
      "abyss-copy",
      "creatures",
      "particles",
      "rays",
      "candle-scene",
      "abyss-life",
      "bottom-glow",
      "desk-tableau",
      "desk-objects",
      "abyss-return",
      "map",
      "chart-waypoint",
      "pencil-comparison",
      "depth",
      "map-caption",
      "archive-map-credit",
      "harbor-scene",
      "harbor-art",
      "harbor-page",
      "harbor-livelihood",
      "harbor-invitation",
      "descent-darkness",
    ].map((name) => [name, $(`.${name}`)]),
  );

  const route = $("#route");
  const depthValue = $(".depth-value");
  const progressLabel = $(".progress-label");
  const cue = $(".scroll-cue span");
  const marker = $(".depth b");
  const waypoint = {
    index: $(".chart-waypoint .eyebrow"),
    title: $(".chart-waypoint h2"),
    note: $(".waypoint-note"),
  };
  const updateSpecies = initSpeciesLife();
  const encounterImage = $(".encounter-image");
  const ocean = $('.ocean');
  const deskPlane = $('.desk-plane');
  const quotes = [...document.querySelectorAll('.descent-quote')];
  const gulls = [...document.querySelectorAll(".engraved-gull")];
  const landmarkNodes = [...document.querySelectorAll(".route-landmark")];
  const landmarkLabels = landmarkNodes.map((node) =>
    node.querySelector("text"),
  );
  const length = route.getTotalLength();
  const routeSamples = Array.from({ length: 257 }, (_, i) =>
    route.getPointAtLength((length * i) / 256),
  );
  const landmarkProgress = routeLandmarks.map(({ point }) => {
    let best = 0,
      distance = Infinity;
    routeSamples.forEach((p, i) => {
      const d = Math.hypot(p.x - point[0], p.y - point[1]);
      if (d < distance) {
        distance = d;
        best = i;
      }
    });
    return best / 256;
  });
  route.style.strokeDasharray = length;
  const pencils = {
    first: { group: $(".graphite-first"), path: $('[data-pencil-draw="first"]') },
    revision: { group: $(".graphite-revision"), path: $('[data-pencil-draw="revision"]') },
    ground: { group: $(".graphite-ground"), path: $('[data-pencil-draw="ground"]') },
  };
  for (const part of Object.values(pencils)) {
    part.length = part.path.getTotalLength();
    part.path.style.strokeDasharray = part.length;
    part.path.style.strokeDashoffset = part.length;
  }
  const ghost = $(".graphite-erasure");
  const comparisonButtons = [...document.querySelectorAll("[data-pencil-choice]")];
  const pencilAnnouncement = $(".pencil-announcement");
  let pencilChoice = "scroll";
  const cache = new WeakMap();
  // No selectors, layout reads, inherited custom-property writes or unchanged text writes in a frame.
  function style(node, property, value) {
    let values = cache.get(node);
    if (!values) {
      values = {};
      cache.set(node, values);
    }
    if (values[property] !== value) {
      node.style[property] = value;
      values[property] = value;
    }
  }
  // First guess, erasure, substituted course and an uncertain ground.
  // The 1797 engraving remains unchanged; all marks share the red route's SVG coordinates.
  function updatePencils(progress) {
    const phase =
      pencilChoice === "first" ? 0.36 :
      pencilChoice === "revised" ? 0.93 : progress;
    const draw = (a, b) => reduced.matches
      ? Number(phase >= b)
      : smooth(ramp(phase, a, b));
    const firstDraw = draw(0.09, 0.32);
    const erased = draw(0.39, 0.55);
    const secondDraw = draw(0.47, 0.72);
    const groundDraw = draw(0.73, 0.91);
    const firstAlpha = firstDraw * (1 - erased);
    style(pencils.first.group, "opacity", firstAlpha.toFixed(3));
    style(pencils.first.path, "strokeDashoffset",
      (pencils.first.length * (1 - firstDraw)).toFixed(2));
    style(ghost, "opacity", (erased * 0.2).toFixed(3));
    style(pencils.revision.group, "opacity", secondDraw.toFixed(3));
    style(pencils.revision.path, "strokeDashoffset",
      (pencils.revision.length * (1 - secondDraw)).toFixed(2));
    style(pencils.ground.group, "opacity", groundDraw.toFixed(3));
    style(pencils.ground.path, "strokeDashoffset",
      (pencils.ground.length * (1 - groundDraw)).toFixed(2));
  }
  for (const button of comparisonButtons) {
    button.addEventListener("click", () => {
      pencilChoice = button.dataset.pencilChoice;
      for (const choice of comparisonButtons) {
        choice.setAttribute("aria-pressed", String(choice === button));
      }
      pencilAnnouncement.textContent = pencilChoice === "first"
        ? "Showing the first conjectural pencil course."
        : pencilChoice === "revised"
          ? "Showing an erased conjecture and a substituted course."
          : "Pencil revisions follow your scroll position.";
      render(current);
    });
  }
  const opacity = (name, value) =>
    style(nodes[name], "opacity", value.toFixed(4));
  const transform = (name, value) => style(nodes[name], "transform", value);
  const text = (node, value) => {
    if (node.textContent !== value) node.textContent = value;
  };
  const enable = (node, enabled) => {
    if (node.inert === enabled) node.inert = !enabled;
  };
  let geometry = { top: 0, range: 1, width: 0, height: 0 };
  let target = 0,
    current = 0,
    frame = 0,
    lastTime = 0,
    measurePending = true,
    instant = true;
  let previousScene = "";
  function render(p) {
    const phone = geometry.width <= 700;
    const approach = smooth(ramp(p, 0.001, 0.075));
    const exposure = smooth(ramp(p, .019, .093));
    const chartProgress = ramp(p, 0.3, 0.6);
    // The completed chart sinks continuously into ocean darkness.
    const chartOpacity = fade(p, 0.26, 0.267, 0.605, 0.72);
    opacity("candle-scene", 1 - smooth(ramp(p, 0.185, 0.204)));
    opacity("abyss-life", 1 - smooth(ramp(p, 0.025, 0.065)));
    updateSpecies(p, reduced.matches);
    opacity("desk-tableau", smooth(ramp(p, .012, .066)));
    const portrait = geometry.width < geometry.height;
    const planeWidth = portrait ? Math.max(geometry.width,geometry.stageHeight*2/3) : Math.min(geometry.width,geometry.stageHeight*1.35);
    const planeHeight = planeWidth * (portrait ? 1.5 : 2/3);
    const restingX = portrait ? Math.min(0,(geometry.width-planeWidth)*.15) : (geometry.width-planeWidth)/2;
    const restingY = portrait ? 0 : (geometry.stageHeight-planeHeight)/2;
    const wickX = planeWidth * (portrait ? .26 : .151);
    const wickY = planeHeight * (portrait ? .225 : .13);
    // The camera and all four controls share the image plane. Project the
    // source-image wick through that camera to position the approaching glow.
    const widen = reduced.matches ? 1 : smooth(ramp(p,.045,.093));
    const cameraScale = 1 + (1-widen)*.65;
    deskPlane.style.setProperty('--picture-feather',`${(2+8*(1-widen)).toFixed(2)}%`);
    const projectedX = geometry.width*.5*(1-widen)+(restingX+wickX)*widen;
    const projectedY = reduced.matches ? restingY+wickY :
      geometry.stageHeight*(1.13-.63*smooth(ramp(p,0,.045)))*(1-widen)+(restingY+wickY)*widen;
    style(deskPlane,'transform',`translate3d(${(projectedX-wickX*cameraScale).toFixed(2)}px,${(projectedY-wickY*cameraScale).toFixed(2)}px,0) scale(${cameraScale.toFixed(5)})`);
    nodes['desk-tableau'].dataset.wickX=projectedX.toFixed(2);
    nodes['desk-tableau'].dataset.wickY=projectedY.toFixed(2);
    nodes['desk-tableau'].style.setProperty('--lit-x',`${projectedX.toFixed(2)}px`);
    nodes['desk-tableau'].style.setProperty('--lit-y',`${projectedY.toFixed(2)}px`);
    nodes["desk-tableau"].style.setProperty("--top-feather", `${(30 * (1 - approach)).toFixed(2)}%`);
    nodes["desk-tableau"].style.setProperty("--light-radius", `${(160 * exposure).toFixed(2)}%`);
    nodes["desk-tableau"].toggleAttribute("data-lit", p > .025 && p < .215);
    opacity(
      "bottom-glow",
      (0.3 * smooth(ramp(p, 0, 0.0025)) + 0.7 * smooth(ramp(p, 0, 0.022))) *
        (1 - smooth(ramp(p, 0.075, 0.115))),
    );
    transform(
      "bottom-glow",
      `translate3d(${projectedX.toFixed(2)}px,${projectedY.toFixed(2)}px,0)`,
    );
    opacity("desk-objects", fade(p, .085, .105, .182, .198));
    enable(nodes["desk-objects"], p >= .10 && p <= .189);
    const swell = smooth(ramp(p, .268, .30));
    const still = reduced.matches;
    opacity("harbor-scene", fade(p, .199, .217, still ? .268 : .300, still ? .3 : .301));
    opacity("harbor-livelihood", fade(p, .202, .215, .232, .239));
    opacity("harbor-invitation", fade(p, .239, .244, .258, .266));
    transform("harbor-page", still ? "none" : `translateY(${(-136 * swell).toFixed(3)}%)`);
    if (p > .185 && p < .302) {
      gulls.forEach((bird, i) =>
        style(
          bird,
          "transform",
          reduced.matches
            ? "none"
            : `translate(${(Math.sin(ramp(p, 0.185, 0.3) * 2.4 + i) * ramp(p, 0.185, 0.3) * (70 + i * 18)).toFixed(2)}px,${((Math.cos(ramp(p, 0.185, 0.3) * 3 + i) - Math.cos(i)) * ramp(p, 0.185, 0.3) * 30).toFixed(2)}px) rotate(${(Math.sin(ramp(p, 0.185, 0.3) * 3 + i) * ramp(p, 0.185, 0.3) * 12).toFixed(2)}deg)`,
        ),
      );
    }
    opacity("chart", chartOpacity);
    transform("chart", "none");
    const pointIndex = chartProgress * (routeSamples.length - 1),
      lo = Math.floor(pointIndex),
      hi = Math.min(routeSamples.length - 1, lo + 1),
      f = pointIndex - lo;
    const point = {
      x: routeSamples[lo].x * (1 - f) + routeSamples[hi].x * f,
      y: routeSamples[lo].y * (1 - f) + routeSamples[hi].y * f,
    };
    const scale = reduced.matches
      ? Math.min(
          geometry.width / chartWidth,
          geometry.stageHeight / chartHeight,
        )
      : Math.max(
          phone ? 1.8 : 2.2,
          geometry.width / (chartInterior.right - chartInterior.left),
          geometry.stageHeight / (chartInterior.bottom - chartInterior.top),
        );
    // Keep actual paper beneath the viewport, including at the ends of the leg.
    const tx = reduced.matches
      ? (geometry.width - chartWidth * scale) / 2
      : Math.max(
          geometry.width - chartInterior.right * scale,
          Math.min(
            -chartInterior.left * scale,
            geometry.width * 0.47 - point.x * scale,
          ),
        );
    const ty = reduced.matches
      ? (geometry.stageHeight - chartHeight * scale) / 2
      : Math.max(
          geometry.stageHeight - chartInterior.bottom * scale,
          Math.min(
            -chartInterior.top * scale,
            geometry.stageHeight * 0.53 - point.y * scale,
          ),
        );
    transform(
      "map",
      `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${scale})`,
    );
    style(route, "strokeDashoffset", (length * (1 - chartProgress)).toFixed(2));
    updatePencils(chartProgress);
    opacity("pencil-comparison", fade(p, 0.34, 0.358, 0.574, 0.605));
    enable(nodes["pencil-comparison"], p >= 0.355 && p <= 0.585);
    opacity("opening", fade(p, 0.30, 0.31, 0.32, 0.345));
    opacity("hotspot", fade(p, 0.29, 0.31, 0.585, 0.61));
    enable(nodes.hotspot, p >= 0.31 && p <= 0.595);
    landmarkNodes.forEach((node, i) => {
      style(
        node,
        "opacity",
        (i === 0
          ? 1
          : smooth(
              ramp(
                chartProgress,
                landmarkProgress[i] - 0.025,
                landmarkProgress[i],
              ),
            )
        ).toFixed(4),
      );
      // Keep visited dots; let the active leg's labels breathe on a small screen.
      style(
        landmarkLabels[i],
        "opacity",
        (
          1 -
          smooth(
            ramp(
              chartProgress,
              landmarkProgress[i] + 0.03,
              landmarkProgress[i] + 0.12,
            ),
          )
        ).toFixed(4),
      );
    });
    const index =
      chartProgress < 0.07
        ? 0
        : chartProgress < landmarkProgress[1] - 0.1
          ? 1
          : chartProgress < landmarkProgress[1] + 0.06
            ? 2
            : chartProgress < 0.95
              ? 3
              : 4;
    const labels = [
      [
        "CHAPTER 22 / CHRISTMAS",
        "Nantucket. Departure.",
        "The Pequod leaves the island for the wintry Atlantic.",
      ],
      [
        "CHAPTER 28 / SOUTHWARD",
        "Leaving winter.",
        "With each degree of latitude, the cold falls astern.",
      ],
      [
        "CHAPTER 51 / THE AZORES",
        "Off the Azores.",
        "Cruising offshore; no port call is narrated.",
      ],
      [
        "CHAPTER 51 / SOUTHWARD",
        "Toward Cape Verde.",
        "The second named ground lies farther south.",
      ],
      [
        "CHAPTER 51 / CAPE VERDE",
        "Off Cape Verde.",
        "The voyage continues beyond this chart.",
      ],
    ];
    text(waypoint.index, labels[index][0]);
    text(waypoint.title, labels[index][1]);
    text(waypoint.note, labels[index][2]);
    opacity("chart-waypoint", fade(p, 0.345, 0.36, 0.6, 0.615));
    opacity("map-caption", 0);
    opacity("archive-map-credit", chartOpacity * smooth(ramp(p, .299, .304)));
    opacity("transition-copy", fade(p, 0.7, 0.715, 0.72, 0.733));
    const black = smooth(ramp(p,.72,.855));
    opacity("descent-darkness", black);
    ocean.style.setProperty('--water-light',1-black);
    stage.dataset.black = String(p >= .855);
    quotes.forEach((node,i) => {
      const [a,b,c,d]=voices[i].window;
      const visibility=fade(p,a,b,c,d);
      const haze=1-visibility;
      style(node,'opacity',visibility.toFixed(4));
      style(node,'filter',reduced.matches?'none':`blur(${(haze*2).toFixed(2)}px)`);
      style(node,'transform',reduced.matches?'none':`skewX(${(Math.sin(p*170+i)*haze*.35).toFixed(3)}deg) translateX(${(Math.sin(p*130)*haze*2).toFixed(2)}px)`);
      style(node,'maskImage',reduced.matches||haze===0?'none':`linear-gradient(${(90+Math.sin(p*90)*8).toFixed(2)}deg,transparent,black ${haze*22}%,black ${100-haze*25}%,transparent)`);
      enable(node,visibility>.95);
    });
    const encounter = ramp(p, 0.94, 1);
    const framing = reduced.matches ? 1 : (phone ? 1.18 : 1.035) - (phone ? .18 : .035) * smooth(encounter);
    stage.dataset.encounter = encounter.toFixed(5);
    opacity("creatures", .62 * smooth(encounter));
    transform("creatures", reduced.matches ? "none" : `translate3d(0,${((1-encounter)*18).toFixed(2)}px,0) scale(${framing.toFixed(4)})`);
    const headRadius = 5 + encounter * 155;
    const armsRadius = 3 + smooth(ramp(encounter,.12,1)) * 150;
    const torsoRadius = 2 + smooth(ramp(encounter,.38,1)) * 150;
    const field = (x,y,r) => `radial-gradient(ellipse ${r.toFixed(2)}% ${(r*.9).toFixed(2)}% at ${x}% ${y}%, #000 0%, #000 32%, #000b 60%, transparent 100%)`;
    const mask = reduced.matches ? "none" : [field(58,45,headRadius),field(68,65,armsRadius),field(30,42,torsoRadius)].join(",");
    style(encounterImage,"maskImage",mask);
    style(encounterImage,"webkitMaskImage",mask);
    opacity("abyss-copy", smooth(ramp(p, 0.975, 1)));
    enable(nodes["abyss-copy"], p >= 0.99);
    opacity("abyss-return", smooth(ramp(p, 0.615, 0.76)) * 0.65 * (1-black));
    opacity("particles",1-black);
    transform(
      "particles",
      reduced.matches
        ? "none"
        : `translate3d(0,${(-ramp(p, 0.7, 1) * 160).toFixed(2)}px,0)`,
    );
    opacity("rays", 0);
    opacity(
      "depth",
      smooth(ramp(p, 0.615, 0.72)) * (1-black) *
        (phone ? 1 - smooth(ramp(p, 0.865, 0.91)) : 1),
    );
    style(
      marker,
      "transform",
      `translate3d(0,${(ramp(p, 0.615, 1) * 120).toFixed(2)}px,0)`,
    );
    text(
      depthValue,
      p < 0.615
        ? "SURFACE"
        : `${Math.round(ramp(p, 0.615, 1) * 1800).toLocaleString("en-US")} M`,
    );
    const scene =
      p < 0.04
        ? "opening-abyss"
        : p < 0.215
          ? "light"
          : p < 0.28
            ? "harbor"
            : p < 0.615
              ? "chart"
              : p < 0.94
                ? "threshold"
                : "abyss";
    if (scene !== previousScene) {
      stage.dataset.scene = scene;
      header.classList.toggle(
        "on-paper",
        ["harbor", "chart"].includes(scene),
      );
      text(
        progressLabel,
        {
          "opening-abyss": "I · THE DEEP",
          light: "II · THE LIGHT",
          harbor: "III · NANTUCKET",
          chart: "IV · THE VOYAGE",
          threshold: "V · THE DESCENT",
          abyss: "VI · THE UNMEASURED",
        }[scene],
      );
      text(
        cue,
        ["opening-abyss", "light"].includes(scene)
          ? "SCROLL TOWARD THE LIGHT"
          : scene === "chart"
            ? "FOLLOW THE LINE"
            : "CONTINUE THE VOYAGE",
      );
      previousScene = scene;
    }
    stage.dataset.progress = p.toFixed(5);
  }
  function measure() {
    const bounds = section.getBoundingClientRect();
    geometry = {
      top: bounds.top + scrollY,
      range: Math.max(1, section.offsetHeight - stage.offsetHeight),
      width: innerWidth,
      height: innerHeight,
      stageHeight: stage.offsetHeight,
    };
    measurePending = false;
  }
  function tick(time) {
    frame = 0;
    if (measurePending) measure();
    target = fromScroll(clamp((scrollY - geometry.top) / geometry.range));
    const dt = Math.min(50, lastTime ? time - lastTime : 16.7);
    lastTime = time;
    // Brief visual catch-up for discrete mouse-wheel steps. Touch keeps native one-to-one motion.
    const direct = instant || reduced.matches || touch.matches;
    current = direct
      ? target
      : current + (target - current) * (1 - Math.exp(-dt / 65));
    if (Math.abs(target - current) < 0.00001) current = target;
    render(current);
    instant = false;
    if (current !== target) frame = requestAnimationFrame(tick);
    else lastTime = 0;
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", () => {
    // Browser chrome changes height during a touch scroll. Stable svh geometry must not be remapped.
    if (touch.matches && innerWidth === geometry.width) return;
    measurePending = true;
    instant = true;
    schedule();
  });
  new ResizeObserver(() => {
    measurePending = true;
    schedule();
  }).observe(section);
  reduced.addEventListener("change", () => {
    measurePending = true;
    instant = true;
    schedule();
  });
  addEventListener("pageshow", () => {
    measurePending = true;
    instant = true;
    schedule();
  });
  function seek(p) {
    if (measurePending) measure();
    instant = true;
    current = target = p;
    render(p);
    scrollTo({ top: geometry.top + geometry.range * toScroll(p), behavior: "instant" });
    schedule();
  }
  function handleHash() {
    if (location.hash === "#chart") seek(0.315);
    else if (location.hash === "#harbor") seek(0.235);
    else {
      instant = true;
      schedule();
    }
  }
  addEventListener("hashchange", handleHash);
  $(".return").addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, "", "#chart");
    seek(0.315);
    nodes.hotspot.focus({ preventScroll: true });
  });
  const discovery = $("#discovery");
  const notes = $("#notes");
  nodes.hotspot.onclick = () => discovery.showModal();
  document
    .querySelectorAll(".about-button,.evidence-button")
    .forEach((button) => {
      button.onclick = () => notes.showModal();
    });
  document.querySelectorAll("#notes, #discovery").forEach((dialog) => {
    dialog.querySelector(".close").onclick = () => dialog.close();
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    });
  });
  $(".continue").onclick = () => {
    discovery.close();
  };
  measure();
  target = current = fromScroll(clamp((scrollY - geometry.top) / geometry.range));
  render(current);
  handleHash();
}
