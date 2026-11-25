/**
 * Canvas animation for the Palette3 hero: tangled particles enter from the
 * left, pass through a core and leave as ordered lanes. The pointer pushes
 * particles aside. `burst` sends a surge through the pipeline.
 */
export function startFlowField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return { stop: () => {}, burst: () => {} };

  const style = getComputedStyle(canvas);
  const color = (name: string) => style.getPropertyValue(name).trim();
  const tangled = color("--muted");
  const ordered = color("--lavender");
  const spark = color("--gold");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sources = [0.2, 0.5, 0.8];
  const lanes = [0.18, 0.34, 0.5, 0.66, 0.82];
  type Particle = { at: number; speed: number; source: number; lane: number; phase: number; spread: number; size: number };
  let particles: Particle[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let previous = 0;
  let visible = true;
  let surge = 0;
  const pointer = { x: -999, y: -999 };

  const ease = (n: number) => n * n * (3 - 2 * n);

  const position = (particle: Particle, at: number, time: number) => {
    const x = at * width;
    let y: number;
    if (at < 0.5) {
      // Wander widely at first, then get drawn into the core.
      const pull = ease(at * 2) ** 2;
      const noise = Math.sin(at * 23 + particle.phase + time * 0.9) * 0.6 + Math.sin(at * 51 - particle.phase * 3 + time * 1.7) * 0.4;
      const start = sources[particle.source] + particle.spread * 0.16 + noise * 0.17;
      y = (start * (1 - pull) + 0.5 * pull) * height;
    } else {
      const open = ease(Math.min(1, (at - 0.5) / 0.2));
      y = (0.5 + (lanes[particle.lane] - 0.5) * open) * height;
    }
    const dx = x - pointer.x;
    const dy = y - pointer.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 110 && distance > 0) {
      const push = (1 - distance / 110) ** 2 * 55;
      return { x: x + (dx / distance) * push, y: y + (dy / distance) * push };
    }
    return { x, y };
  };

  const draw = (time: number) => {
    context.clearRect(0, 0, width, height);

    // Lane guides on the ordered side.
    context.globalAlpha = 0.16;
    context.strokeStyle = ordered;
    context.lineWidth = 1;
    for (const lane of lanes) {
      context.beginPath();
      context.moveTo(width * 0.5, height * 0.5);
      context.bezierCurveTo(width * 0.57, height * 0.5, width * 0.62, height * lane, width * 0.7, height * lane);
      context.lineTo(width, height * lane);
      context.stroke();
    }

    context.lineCap = "round";
    for (const particle of particles) {
      const clean = particle.at >= 0.5;
      const head = position(particle, particle.at, time);
      const tail = position(particle, Math.max(0, particle.at - (clean ? 0.035 : 0.012)), time);
      context.globalAlpha = Math.min(1, particle.at * 8, (1 - particle.at) * 8) * (clean ? 0.95 : 0.55);
      context.strokeStyle = clean ? (particle.phase > 5.6 ? spark : ordered) : tangled;
      context.lineWidth = particle.size * (clean ? 1.3 : 1);
      context.beginPath();
      context.moveTo(tail.x, tail.y);
      context.lineTo(head.x, head.y);
      context.stroke();
    }

    // Ripples leaving the core.
    context.strokeStyle = ordered;
    context.lineWidth = 1.5;
    const base = Math.min(width, height) * 0.13;
    for (let ring = 0; ring < 3; ring++) {
      const grow = (time * 0.35 + ring / 3) % 1;
      context.globalAlpha = (1 - grow) * 0.5;
      context.beginPath();
      context.arc(width / 2, height / 2, base + grow * base * 1.6, 0, Math.PI * 2);
      context.stroke();
    }
    if (surge > 0.02) {
      context.strokeStyle = spark;
      context.lineWidth = 3 * surge;
      context.globalAlpha = surge * 0.8;
      context.beginPath();
      context.arc(width / 2, height / 2, base + (1 - surge) * width * 0.32, 0, Math.PI * 2);
      context.stroke();
    }
    context.globalAlpha = 1;
  };

  const tick = (now: number) => {
    const elapsed = Math.min(0.05, (now - (previous || now)) / 1000);
    previous = now;
    for (const particle of particles) {
      particle.at += particle.speed * elapsed * (particle.at < 0.5 ? 1 : 1.7) * (1 + surge * 4);
      if (particle.at > 1) particle.at -= 1;
    }
    surge *= 1 - elapsed * 2.4;
    draw(now / 1000);
    frame = requestAnimationFrame(tick);
  };

  const run = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    if (still) draw(0);
    else if (visible) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const total = Math.round(Math.min(560, Math.max(180, width * 0.48)));
    particles = Array.from({ length: total }, (_, i) => ({
      at: Math.random(),
      speed: 0.055 + Math.random() * 0.05,
      source: i % sources.length,
      lane: i % lanes.length,
      phase: Math.random() * Math.PI * 2,
      spread: Math.random() - 0.5,
      size: 1 + Math.random() * 1.4,
    }));
    run();
  };

  const move = (event: PointerEvent) => {
    const box = canvas.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
  };

  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  // Nothing is drawn while the hero is off screen.
  const sight = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  });
  sight.observe(canvas);
  window.addEventListener("pointermove", move, { passive: true });

  return {
    burst: () => {
      surge = 1;
    },
    stop: () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      sight.disconnect();
      window.removeEventListener("pointermove", move);
    },
  };
}
