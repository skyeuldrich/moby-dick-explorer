import { chartWidth, chartHeight, chartInterior } from "./chart-geometry.js";
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
      "candle-intro",
      "candle-caption",
      "ledger",
      "candle",
      "table-light",
      "bottom-glow",
      "anatomy-scene",
      "abyss-return",
      "map",
      "chart-waypoint",
      "depth",
      "map-caption",
      "archive-map-credit",
      "desk",
      "harbor-scene",
      "harbor-art",
      "descent-quote",
      "descent-darkness",
    ].map((name) => [name, $(`.${name}`)]),
  );
  const flame = $(".flame");
  const halo = $(".flame-halo");
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
  const gulls = [...document.querySelectorAll(".gull")];
  const squid = $(".squid");
  const length = route.getTotalLength();
  const routeSamples = Array.from({ length: 257 }, (_, i) =>
    route.getPointAtLength((length * i) / 256),
  );
  route.style.strokeDasharray = length;
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
    const reveal = smooth(ramp(p, 0.075, 0.105));
    const chartProgress = ramp(p, 0.3, 0.6);
    const chartOpacity = fade(p, 0.255, 0.3, 0.605, 0.635);
    opacity("candle-scene", 1 - smooth(ramp(p, 0.185, 0.235)));
    opacity("abyss-life", 1 - smooth(ramp(p, 0.025, 0.065)));
    opacity("desk", smooth(ramp(p, 0.04, 0.09)));
    opacity("candle", smooth(ramp(p, 0.005, 0.035)));
    const travel = reduced.matches
      ? 0
      : (1 - approach) * geometry.stageHeight * 1.1;
    transform(
      "candle",
      `translate3d(0,${travel.toFixed(2)}px,0) scale(${phone ? 0.95 : 1.6})`,
    );
    style(flame, "opacity", smooth(ramp(p, 0.005, 0.035)).toFixed(4));
    style(halo, "opacity", approach.toFixed(4));
    opacity(
      "bottom-glow",
      (0.3 * smooth(ramp(p, 0, 0.0025)) + 0.7 * smooth(ramp(p, 0, 0.022))) *
        (1 - smooth(ramp(p, 0.075, 0.115))),
    );
    transform(
      "bottom-glow",
      `translate3d(0,${(-approach * 25).toFixed(2)}%,0) scale(${(1 + approach).toFixed(3)})`,
    );
    opacity("table-light", smooth(ramp(p, 0.025, 0.105)));
    opacity("ledger", reveal);
    opacity("candle-intro", reveal);
    opacity("candle-caption", 0);
    enable(nodes.ledger, p >= 0.1 && p < 0.205);
    opacity("harbor-scene", fade(p, 0.185, 0.235, 0.255, 0.3));
    if (p > 0.185 && p < 0.3) {
      transform(
        "harbor-art",
        reduced.matches
          ? "none"
          : `translate3d(0,${((0.235 - p) * 45).toFixed(2)}px,0) scale(1.025)`,
      );
      gulls.forEach((bird, i) =>
        style(
          bird,
          "transform",
          reduced.matches
            ? "none"
            : `translate(${(Math.sin(p * 30 + i * 2) * 22).toFixed(2)}px,${(Math.cos(p * 30 + i * 2) * 8).toFixed(2)}px)`,
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
      ? Math.min(geometry.width / chartWidth, geometry.stageHeight / chartHeight)
      : Math.max(phone ? 1 : 1.65,
          geometry.width / (chartInterior.right - chartInterior.left),
          geometry.stageHeight / (chartInterior.bottom - chartInterior.top));
    // Keep actual paper beneath the viewport, including at the ends of the leg.
    const tx = reduced.matches
      ? (geometry.width - chartWidth * scale) / 2
      : Math.max(geometry.width - chartInterior.right * scale,
          Math.min(-chartInterior.left * scale, geometry.width * 0.47 - point.x * scale));
    const ty = reduced.matches
      ? (geometry.stageHeight - chartHeight * scale) / 2
      : Math.max(geometry.stageHeight - chartInterior.bottom * scale,
          Math.min(-chartInterior.top * scale, geometry.stageHeight * 0.53 - point.y * scale));
    transform(
      "map",
      `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${scale})`,
    );
    style(route, "strokeDashoffset", (length * (1 - chartProgress)).toFixed(2));
    opacity("opening", fade(p, 0.27, 0.295, 0.32, 0.345));
    opacity("hotspot", fade(p, 0.29, 0.31, 0.585, 0.61));
    enable(nodes.hotspot, p >= 0.31 && p <= 0.595);
    const index = point.y < 345 ? 0 : point.y < 435 ? 1 : point.y < 645 ? 2 : 3;
    const labels = [
      [
        "III / THE EASTERN PACIFIC",
        "Offshore, a line begins.",
        "An interpretive Pacific leg.",
      ],
      [
        "III / ECUADOR",
        "Following the coast.",
        "Ocean to the west. A continent to the east.",
      ],
      [
        "III / PERU",
        "The coast of Peru.",
        "A sustained passage beyond the equator.",
      ],
      [
        "III / CHILE",
        "Toward colder waters.",
        "The chart ends. The ocean continues.",
      ],
    ];
    text(waypoint.index, labels[index][0]);
    text(waypoint.title, labels[index][1]);
    text(waypoint.note, labels[index][2]);
    opacity("chart-waypoint", fade(p, 0.345, 0.36, 0.575, 0.605));
    opacity("map-caption", 0);
    opacity("archive-map-credit", chartOpacity);
    opacity("anatomy-scene", fade(p, 0.615, 0.64, 0.685, 0.72));
    enable(nodes["anatomy-scene"], p >= 0.635 && p <= 0.705);
    opacity("transition-copy", fade(p, 0.7, 0.73, 0.75, 0.77));
    opacity("descent-darkness", smooth(ramp(p, 0.7, 0.91)) * 0.75);
    opacity("descent-quote", fade(p, 0.755, 0.785, 0.825, 0.855));
    enable(nodes["descent-quote"], p >= 0.78 && p <= 0.84);
    const encounter = ramp(p, 0.87, 1);
    const framing = phone ? 1.35 - 0.35 * smooth(encounter) : 1;
    stage.dataset.encounter = encounter.toFixed(5);
    opacity("creatures", smooth(ramp(p, 0.87, 0.91)));
    transform(
      "creatures",
      reduced.matches
        ? "none"
        : `translate3d(0,${((1 - encounter) * geometry.stageHeight * 0.95).toFixed(2)}px,0) scale(${framing.toFixed(4)})`,
    );
    style(squid, "opacity", smooth(ramp(p, 0.92, 0.985)).toFixed(4));
    opacity("abyss-copy", smooth(ramp(p, 0.975, 1)));
    enable(nodes["abyss-copy"], p >= 0.99);
    opacity("abyss-return", smooth(ramp(p, 0.71, 0.83)) * 0.65);
    transform(
      "particles",
      reduced.matches
        ? "none"
        : `translate3d(0,${(-ramp(p, 0.7, 1) * 160).toFixed(2)}px,0)`,
    );
    opacity("rays", 0);
    opacity(
      "depth",
      smooth(ramp(p, 0.7, 0.74)) *
        (phone ? 1 - smooth(ramp(p, 0.865, 0.91)) : 1),
    );
    style(
      marker,
      "transform",
      `translate3d(0,${(ramp(p, 0.71, 1) * 120).toFixed(2)}px,0)`,
    );
    text(
      depthValue,
      p < 0.71
        ? "SURFACE"
        : `${Math.round(ramp(p, 0.71, 1) * 1800).toLocaleString("en-US")} M`,
    );
    const scene =
      p < 0.04
        ? "opening-abyss"
        : p < 0.215
          ? "light"
          : p < 0.28
            ? "harbor"
            : p < 0.62
              ? "chart"
              : p < 0.71
                ? "anatomy"
                : p < 0.87
                  ? "threshold"
                  : "abyss";
    if (scene !== previousScene) {
      stage.dataset.scene = scene;
      header.classList.toggle(
        "on-paper",
        ["harbor", "chart", "anatomy"].includes(scene),
      );
      text(
        progressLabel,
        {
          "opening-abyss": "I · THE DEEP",
          light: "II · THE LIGHT",
          harbor: "III · NANTUCKET",
          chart: "IV · THE VOYAGE",
          anatomy: "V · THE ARCHIVE",
          threshold: "VI · THE DESCENT",
          abyss: "VII · THE UNMEASURED",
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
    target = clamp((scrollY - geometry.top) / geometry.range);
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
    scrollTo({ top: geometry.top + geometry.range * p, behavior: "instant" });
    schedule();
  }
  function handleHash() {
    if (location.hash === "#chart") seek(0.35);
    else {
      instant = true;
      schedule();
    }
  }
  addEventListener("hashchange", handleHash);
  $(".return").addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, "", "#chart");
    seek(0.35);
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
  document.querySelectorAll("dialog").forEach((dialog) => {
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
  target = current = clamp((scrollY - geometry.top) / geometry.range);
  render(current);
  handleHash();
}
