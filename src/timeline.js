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
  const length = route.getTotalLength();
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
  const stops = [
    [
      "III / NORTH ATLANTIC",
      "A course is a question.",
      "Outward from Nantucket · the voyage begins.",
    ],
    [
      "III / SOUTH ATLANTIC",
      "Beyond familiar waters.",
      "Across the equator, toward the Cape of Good Hope.",
    ],
    [
      "III / INDIAN OCEAN",
      "The world grows wider.",
      "Ahab’s imagined certainty meets an ocean of currents.",
    ],
    [
      "III / OPEN WATER",
      "No line can hold it.",
      "An interpretive route · not documented Pequod coordinates.",
    ],
  ];
  function render(p) {
    const chart = ramp(p, 0.32, 0.81);
    const chartOpacity = fade(p, 0.29, 0.35, 0.805, 0.85);
    const abyss = smooth(ramp(p, 0.945, 0.99));
    opacity("candle-scene", 1 - smooth(ramp(p, 0.27, 0.35)));
    opacity("abyss-life", 1 - smooth(ramp(p, 0.09, 0.18)));
    const approach = smooth(ramp(p, 0.04, 0.12));
    const reveal = smooth(ramp(p, 0.13, 0.18));
    const phone = geometry.width <= 700;
    const travel = reduced.matches
      ? 0
      : (1 - approach) * geometry.stageHeight * 0.78;
    const moveAside = phone && !reduced.matches ? reveal : 0;
    opacity("candle", smooth(ramp(p, 0.055, 0.085)));
    transform(
      "candle",
      `translate3d(${(moveAside * geometry.width * 0.29).toFixed(2)}px,${(travel - moveAside * geometry.stageHeight * 0.32).toFixed(2)}px,0) scale(${phone ? 0.65 : 0.9})`,
    );
    style(flame, "opacity", smooth(ramp(p, 0.055, 0.085)).toFixed(4));
    style(halo, "opacity", approach.toFixed(4));
    opacity("bottom-glow", fade(p, 0.025, 0.08, 0.12, 0.18));
    transform(
      "bottom-glow",
      `translate3d(0,${(-approach * 18).toFixed(2)}%,0)`,
    );
    opacity("table-light", smooth(ramp(p, 0.12, 0.19)));
    opacity("ledger", reveal);
    opacity("candle-intro", reveal);
    opacity("candle-caption", reveal);
    enable(nodes.ledger, p >= 0.17 && p < 0.3);
    opacity("chart", chartOpacity);
    transform(
      "map",
      phone && !reduced.matches ? `translate3d(${(-chart * 43).toFixed(3)}%,0,0)` : "none",
    );
    opacity("abyss-return", smooth(ramp(p, 0.93, 0.99)) * 0.8);
    // Gentle, continuous eastward/downward camera; no stepped scene transforms.
    transform(
      "chart",
      reduced.matches
        ? "none"
        : `translate3d(${(-chart * 7).toFixed(3)}%,${(-chart * 9).toFixed(3)}%,0) scale(1.12)`,
    );
    style(
      route,
      "strokeDashoffset",
      (length * (1 - ramp(p, 0.34, 0.8))).toFixed(2),
    );
    opacity("opening", fade(p, 0.315, 0.36, 0.405, 0.45));
    opacity("hotspot", fade(p, 0.34, 0.37, 0.77, 0.8));
    enable(nodes.hotspot, p >= 0.36 && p <= 0.78);
    const waypointIndex = Math.min(3, Math.floor(ramp(p, 0.45, 0.79) * 4));
    const local = ramp(p, 0.45, 0.79) * 4 - waypointIndex;
    opacity(
      "chart-waypoint",
      fade(p, 0.435, 0.46, 0.775, 0.8) * fade(local, 0, 0.12, 0.82, 1),
    );
    text(waypoint.index, stops[waypointIndex][0]);
    text(waypoint.title, stops[waypointIndex][1]);
    text(waypoint.note, stops[waypointIndex][2]);
    opacity("anatomy-scene", fade(p, 0.805, 0.85, 0.905, 0.945));
    enable(nodes["anatomy-scene"], p >= 0.84 && p <= 0.925);
    opacity("transition-copy", fade(p, 0.92, 0.945, 0.965, 0.985));
    opacity("abyss-copy", abyss);
    enable(nodes["abyss-copy"], p >= 0.98);
    opacity("creatures", smooth(ramp(p, 0.94, 0.995)));
    transform(
      "creatures",
      reduced.matches
        ? "none"
        : `translate3d(0,${((1 - ramp(p, 0.94, 1)) * 100).toFixed(2)}px,0)`,
    );
    transform(
      "particles",
      reduced.matches
        ? "none"
        : `translate3d(0,${(-ramp(p, 0.92, 1) * 60).toFixed(2)}px,0)`,
    );
    opacity("rays", (1 - ramp(p, 0.92, 0.99)) * 0.45);
    opacity("depth", smooth(ramp(p, 0.93, 0.965)));
    style(
      marker,
      "transform",
      `translate3d(0,${(ramp(p, 0.94, 1) * 120).toFixed(2)}px,0)`,
    );
    text(
      depthValue,
      p < 0.94
        ? "SURFACE"
        : `${Math.round(ramp(p, 0.94, 1) * 1800).toLocaleString("en-US")} M`,
    );
    opacity("map-caption", chartOpacity);
    opacity("archive-map-credit", chartOpacity);
    const scene =
      p < 0.08
        ? "opening-abyss"
        : p < 0.325
          ? "light"
          : p < 0.825
            ? "chart"
            : p < 0.925
              ? "anatomy"
              : p < 0.97
                ? "threshold"
                : "abyss";
    if (scene !== previousScene) {
      stage.dataset.scene = scene;
      header.classList.toggle(
        "on-paper",
        scene === "harbor" || scene === "chart" || scene === "anatomy",
      );
      text(
        progressLabel,
        {
          "opening-abyss": "I · THE DEEP",
          light: "II · THE LIGHT",
          harbor: "II · NANTUCKET",
          chart: "III · THE CHART",
          anatomy: "IV · THE ANATOMY",
          threshold: "V · THE THRESHOLD",
          abyss: "VI · THE ABYSS",
        }[scene],
      );
      text(
        cue,
        scene === "light" || scene === "opening-abyss"
          ? "SCROLL TOWARD THE LIGHT"
          : scene === "harbor"
            ? "SCROLL TO LEAVE THE HARBOR"
            : scene === "chart"
              ? "SCROLL TO FOLLOW THE LINE"
              : "SCROLL INTO THE UNMEASURED",
      );
      previousScene = scene;
    }
    // Local progress is exposed for repeatable interaction tests, not a separate animation state.
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
    if (location.hash === "#chart") seek(0.37);
    else {
      instant = true;
      schedule();
    }
  }
  addEventListener("hashchange", handleHash);
  $(".return").addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, "", "#chart");
    seek(0.37);
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
    seek(0.875);
  };
  measure();
  target = current = clamp((scrollY - geometry.top) / geometry.range);
  render(current);
  handleHash();
}
