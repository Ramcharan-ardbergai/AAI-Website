/**
 * Canvas animation behind the Palette3 headline: a slowly turning 3D neural
 * network. Signals travel along its links, light up the node they reach and
 * carry on to the next. The pointer tilts the network and fires nearby nodes.
 * Returns a cleanup function.
 */
export function startNeuralField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const style = getComputedStyle(canvas);
  const color = (name: string) => style.getPropertyValue(name).trim();
  const link = color("--lavender");
  const spark = color("--gold");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  type Node = { x: number; y: number; z: number; glow: number; links: number[] };
  type Signal = { from: number; to: number; at: number; hops: number };
  let nodes: Node[] = [];
  let signals: Signal[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let previous = 0;
  let wait = 0;
  let angle = 0;
  let visible = true;
  const pointer = { x: -999, y: -999 };
  const tilt = { x: 0, y: 0 };

  // Nodes spread evenly over a shell (golden-angle spiral) at varying depth.
  const build = (total: number) => {
    nodes = Array.from({ length: total }, (_, i) => {
      const y = 1 - (2 * (i + 0.5)) / total;
      const radius = Math.sqrt(1 - y * y);
      const turn = i * 2.39996;
      const depth = 0.72 + Math.random() * 0.38;
      return { x: Math.cos(turn) * radius * depth, y: y * depth, z: Math.sin(turn) * radius * depth, glow: 0, links: [] };
    });
    nodes.forEach((node, i) => {
      const near = nodes
        .map((other, j) => ({ j, distance: Math.hypot(node.x - other.x, node.y - other.y, node.z - other.z) }))
        .filter(({ j }) => j !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);
      for (const { j } of near) {
        if (!node.links.includes(j)) node.links.push(j);
        if (!nodes[j].links.includes(i)) nodes[j].links.push(i);
      }
    });
    signals = [];
  };

  const fire = (from: number, hops: number) => {
    const { links } = nodes[from];
    if (signals.length > 70 || !links.length) return;
    signals.push({ from, to: links[Math.floor(Math.random() * links.length)], at: 0, hops });
  };

  const project = () => {
    const cos = Math.cos(angle + tilt.x);
    const sin = Math.sin(angle + tilt.x);
    const lean = 0.25 + tilt.y;
    return nodes.map(({ x, y, z }) => {
      const turnedX = x * cos - z * sin;
      const turnedZ = x * sin + z * cos;
      const tippedY = y * Math.cos(lean) - turnedZ * Math.sin(lean);
      const tippedZ = y * Math.sin(lean) + turnedZ * Math.cos(lean);
      const scale = 2.6 / (2.6 - tippedZ);
      return {
        x: width / 2 + turnedX * scale * Math.min(width * 0.46, 620),
        y: height / 2 + tippedY * scale * height * 0.44,
        depth: (tippedZ + 1.2) / 2.4,
      };
    });
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const points = project();

    context.strokeStyle = link;
    context.lineWidth = 1;
    nodes.forEach((node, i) => {
      for (const j of node.links) {
        if (j < i) continue;
        context.globalAlpha = 0.04 + 0.2 * points[i].depth * points[j].depth;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    });

    context.lineCap = "round";
    for (const { from, to, at } of signals) {
      const a = points[from];
      const b = points[to];
      const start = Math.max(0, at - 0.35);
      context.globalAlpha = 0.35 + 0.65 * a.depth;
      context.strokeStyle = spark;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(a.x + (b.x - a.x) * start, a.y + (b.y - a.y) * start);
      context.lineTo(a.x + (b.x - a.x) * at, a.y + (b.y - a.y) * at);
      context.stroke();
    }

    points.forEach(({ x, y, depth }, i) => {
      const { glow } = nodes[i];
      if (glow > 0.05) {
        context.globalAlpha = glow * 0.25;
        context.fillStyle = spark;
        context.beginPath();
        context.arc(x, y, 5 + glow * 12 * depth, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 0.25 + 0.7 * depth;
      context.fillStyle = glow > 0.3 ? spark : link;
      context.beginPath();
      context.arc(x, y, 1 + depth * 2.6 + glow * 1.5, 0, Math.PI * 2);
      context.fill();
    });
    context.globalAlpha = 1;
  };

  const tick = (now: number) => {
    const elapsed = Math.min(0.05, (now - (previous || now)) / 1000);
    previous = now;
    angle += elapsed * 0.09;
    const box = canvas.getBoundingClientRect();
    const near = pointer.x >= 0 && pointer.x <= box.width && pointer.y >= 0 && pointer.y <= box.height;
    tilt.x += ((near ? (pointer.x / box.width - 0.5) * 0.7 : 0) - tilt.x) * 0.05;
    tilt.y += ((near ? (pointer.y / box.height - 0.5) * 0.5 : 0) - tilt.y) * 0.05;

    wait -= elapsed;
    if (wait <= 0) {
      wait = 0.22;
      fire(Math.floor(Math.random() * nodes.length), 4);
      if (near) {
        const points = project();
        const closest = points.findIndex(({ x, y }) => Math.hypot(x - pointer.x, y - pointer.y) < 70);
        if (closest >= 0) {
          nodes[closest].glow = 1;
          fire(closest, 3);
          fire(closest, 3);
        }
      }
    }

    for (const node of nodes) node.glow *= 1 - elapsed * 2.2;
    const arrived: Signal[] = [];
    signals = signals.filter((signal) => {
      signal.at += elapsed * 1.5;
      if (signal.at < 1) return true;
      arrived.push(signal);
      return false;
    });
    for (const { to, hops } of arrived) {
      nodes[to].glow = 1;
      if (hops > 0) fire(to, hops - 1);
    }

    draw();
    frame = requestAnimationFrame(tick);
  };

  const run = () => {
    cancelAnimationFrame(frame);
    previous = 0;
    if (still) draw();
    else if (visible) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    build(width < 640 ? 60 : 130);
    run();
  };

  const move = (event: PointerEvent) => {
    const box = canvas.getBoundingClientRect();
    pointer.x = event.clientX - box.left;
    pointer.y = event.clientY - box.top;
  };

  const sizes = new ResizeObserver(resize);
  sizes.observe(canvas);
  const sight = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    run();
  });
  sight.observe(canvas);
  window.addEventListener("pointermove", move, { passive: true });

  return () => {
    cancelAnimationFrame(frame);
    sizes.disconnect();
    sight.disconnect();
    window.removeEventListener("pointermove", move);
  };
}
