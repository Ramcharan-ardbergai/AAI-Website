import { industryMasks } from "./industry-masks";

/**
 * Microbot swarm. Thousands of tiny blocks live on one fixed canvas behind
 * the page. Each section offers a "stage" (`data-swarm="<shape>"`); the stage
 * nearest the middle of the viewport is the swarm's current job, and every
 * bot springs toward its slot in that shape. Switching stages makes the
 * swarm fly apart and rebuild itself into the next formation. The cursor
 * pushes bots away and charges them violet.
 */

type Shape = "sphere" | "helix" | "clusters" | "offer" | "icon" | "wave";

type Stage = { el: HTMLElement; shape: Shape; x: number; y: number; w: number; h: number };

type Target = { x: number; y: number; z: number; accent: boolean; hidden: boolean };

const TAU = Math.PI * 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, v: number) => {
  const x = clamp01((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** Filled cells of each industry icon mask, as unit coordinates (-0.5..0.5). */
const iconPoints: Float32Array[] = industryMasks.map((rows) => {
  const pts: number[] = [];
  const h = rows.length;
  const w = rows[0].length;
  rows.forEach((row, r) => {
    for (let c = 0; c < w; c++) {
      if ("#%@*+=".includes(row[c])) pts.push(c / w - 0.5, (r / h - 0.5) * 0.95);
    }
  });
  return Float32Array.from(pts);
});

export class Swarm {
  private readonly ctx: CanvasRenderingContext2D;
  private n = 0;
  private x = new Float32Array(0);
  private y = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);
  private z = new Float32Array(0);
  private k = new Float32Array(0);
  private r0 = new Float32Array(0);
  private r1 = new Float32Array(0);
  private r2 = new Float32Array(0);
  private charge = new Float32Array(0);
  private stages: Stage[] = [];
  private readonly anchors = new Map<string, DOMRect>();
  private progress = 0;
  private smoothProgress = 0;
  private vw = 0;
  private vh = 0;
  private dpr = 1;
  private size = 3;
  private raf = 0;
  private readonly start = performance.now();
  private readonly mouse = { x: -9999, y: -9999, on: false };
  private readonly reduced: boolean;
  private readonly t: Target = { x: 0, y: 0, z: 0, accent: false, hidden: false };
  private lastScroll = Number.NaN;
  private readonly cleanup: (() => void)[] = [];
  private ink = "#0e0f11";
  private violet = "#6a3df5";

  constructor(private readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas unavailable");
    this.ctx = ctx;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const readColors = () => {
      const style = getComputedStyle(canvas);
      this.ink = style.getPropertyValue("--ink").trim() || this.ink;
      this.violet = style.getPropertyValue("--violet").trim() || this.violet;
      this.request();
    };
    readColors();
    // The theme picker changes the palette live.
    window.addEventListener("nano-theme", readColors);
    this.cleanup.push(() => window.removeEventListener("nano-theme", readColors));

    const onResize = () => this.resize();
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.on = true;
    };
    const onLeave = () => (this.mouse.on = false);
    const onScroll = () => this.reduced && this.request();
    const onVisible = () => !document.hidden && this.request();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisible);
    this.cleanup.push(() => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisible);
    });

    this.resize();
    this.request();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((fn) => fn());
  }

  private request() {
    if (!this.raf && !document.hidden) this.raf = requestAnimationFrame(this.frame);
  }

  private resize() {
    this.vw = document.documentElement.clientWidth;
    this.vh = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.vw * this.dpr);
    this.canvas.height = Math.round(this.vh * this.dpr);
    this.canvas.style.width = `${this.vw}px`;
    this.canvas.style.height = `${this.vh}px`;
    this.size = this.vw < 640 ? 2.4 : 3;
    const n = this.vw < 640 ? 1300 : this.vw < 1024 ? 1900 : 2600;
    if (n !== this.n) {
      this.n = n;
      const rand = () => Float32Array.from({ length: n }, () => Math.random());
      this.x = Float32Array.from({ length: n }, () => Math.random() * this.vw);
      this.y = Float32Array.from({ length: n }, () => Math.random() * this.vh);
      this.vx = new Float32Array(n);
      this.vy = new Float32Array(n);
      this.z = new Float32Array(n);
      this.k = Float32Array.from({ length: n }, () => 0.012 + Math.random() * 0.03);
      this.r0 = rand();
      this.r1 = rand();
      this.r2 = rand();
      this.charge = new Float32Array(n);
    }
    this.stages = Array.from(document.querySelectorAll<HTMLElement>("[data-swarm]")).map((el) => ({
      el,
      shape: el.dataset.swarm as Shape,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }));
    this.request();
  }

  /* ------------------------------------------------------------------------ */

  private activeStage() {
    let best: Stage | null = null;
    let bestD = Infinity;
    const mid = this.vh * 0.5;
    for (const s of this.stages) {
      const r = s.el.getBoundingClientRect();
      s.x = r.left;
      s.y = r.top;
      s.w = r.width;
      s.h = r.height;
      if (r.width === 0 || r.bottom < -this.vh * 0.3 || r.top > this.vh * 1.3) continue;
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    return best;
  }

  /** Slot i of the active shape, in viewport px (z: -1 far .. 1 near). */
  private target(s: Stage, i: number, t: number, out: Target) {
    const { r0, r1, r2, n } = this;
    const cx = s.x + s.w / 2;
    const cy = s.y + s.h / 2;
    const R = Math.min(s.w, s.h) * 0.42;
    out.accent = r2[i] < 0.06;
    out.hidden = false;
    const project = (px: number, py: number, pz: number, ry: number, rx: number) => {
      const cY = Math.cos(ry);
      const sY = Math.sin(ry);
      const x1 = px * cY + pz * sY;
      const z1 = -px * sY + pz * cY;
      const cX = Math.cos(rx);
      const sX = Math.sin(rx);
      const y1 = py * cX - z1 * sX;
      const z2 = py * sX + z1 * cX;
      const persp = 1 / (1 - z2 * 0.12);
      out.x = cx + x1 * R * persp;
      out.y = cy + y1 * R * persp;
      out.z = z2;
    };

    switch (s.shape) {
      case "sphere": {
        if (i < n * 0.86) {
          // Fibonacci sphere: an even skin of bots.
          const m = n * 0.86;
          const k = i + 0.5;
          const phi = Math.acos(1 - (2 * k) / m);
          const theta = Math.PI * (1 + Math.sqrt(5)) * k;
          project(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta), t * 0.22, -0.42);
        } else {
          // A ring of charged bots in the planet's equatorial plane (same tilt),
          // hidden where it passes behind the planet.
          const a = r0[i] * TAU + t * 0.35;
          const rr = 1.38 + (r1[i] - 0.5) * 0.12;
          // The ring stays centred on the planet; its plane turns continuously
          // about the centre, a full 360° flip roughly every 80 seconds.
          // Starts near horizontal with a slight tilt (~-15°), then keeps turning.
          const roll = -0.26 + t * 0.08;
          const rxp = Math.cos(a) * rr;
          project(rxp * Math.cos(roll), rxp * Math.sin(roll), Math.sin(a) * rr, 0, -0.42);
          const dx = out.x - cx;
          const dy = out.y - cy;
          out.hidden = out.z < 0 && dx * dx + dy * dy < R * R * 0.98;
          out.accent = r1[i] < 0.55;
        }
        return;
      }
      case "helix": {
        const v = r0[i];
        const along = (v - 0.5) * 2.2;
        const phase = v * TAU * 2.2 + t * 0.6;
        if (r1[i] < 0.7) {
          const strand = r1[i] < 0.35 ? 0 : Math.PI;
          const jitter = (r2[i] - 0.5) * 0.08;
          project(Math.cos(phase + strand) * 0.5 + jitter, along, Math.sin(phase + strand) * 0.5, 0, 0.1);
        } else {
          const rung = Math.floor(v * 26) / 26;
          const ph = rung * TAU * 2.2 + t * 0.6;
          const u = r2[i] * 2 - 1;
          project(Math.cos(ph) * 0.5 * u, (rung - 0.5) * 2.2, Math.sin(ph) * 0.5 * u, 0, 0.1);
          out.accent = Math.abs(u) > 0.85;
        }
        return;
      }
      case "clusters": {
        // Five messy clusters stream into one solid cube as the section scrolls.
        const p = this.progress;
        const c = Math.floor(r0[i] * 5);
        const anchor = this.anchors.get(`c${c}`);
        const ax = anchor ? anchor.left + anchor.width / 2 : cx + Math.cos((c / 5) * TAU) * R;
        const ay = anchor ? anchor.top + anchor.height / 2 : cy + Math.sin((c / 5) * TAU) * R;
        // Bots orbit the label in a loose band, leaving the text clear.
        const lw = anchor ? anchor.width / 2 : 50;
        const lh = anchor ? anchor.height / 2 : 8;
        const band = r2[i];
        const ang = r1[i] * TAU + t * (0.25 + band * 0.35) * (c % 2 ? 1 : -1);
        const bx = ax + Math.cos(ang) * (lw + 16 + band * 26) + Math.sin(t * 3 + i) * 1.5;
        const by = ay + Math.sin(ang) * (lh + 16 + band * 20) + Math.cos(t * 2.4 + i) * 1.5;

        // Cube lattice slot.
        const side = Math.ceil(Math.cbrt(n));
        const gx = (i % side) / (side - 1) - 0.5;
        const gy = (Math.floor(i / side) % side) / (side - 1) - 0.5;
        const gz = Math.floor(i / (side * side)) / (side - 1) - 0.5;
        project(gx * 1.05, gy * 1.05, gz * 1.05, t * 0.3 + 0.6, -0.45);
        const qx = out.x;
        const qy = out.y;
        const qz = out.z;

        const m = smooth(0.25 + r1[i] * 0.3, 0.5 + r1[i] * 0.3, p);
        const bend = Math.sin(Math.PI * m) * (r2[i] - 0.5) * R * 0.8;
        out.x = bx + (qx - bx) * m + bend;
        out.y = by + (qy - by) * m;
        out.z = qz * m;
        out.accent = m > 0 && m < 1 ? r2[i] < 0.3 : out.accent;
        return;
      }
      case "offer": {
        const j = i % 3;
        const box = this.anchors.get(`o${j}`);
        const ox = box ? box.left + box.width / 2 : s.x + (s.w / 3) * (j + 0.5);
        const oy = box ? box.top + box.height / 2 : cy;
        const S = box ? Math.min(box.width, box.height) * 0.42 : R * 0.4;
        const u = r0[i] * 2 - 1;
        const v = r1[i] * 2 - 1;
        let px = 0;
        let py = 0;
        let pz = 0;
        if (j === 0) {
          // Platforms: three stacked slabs.
          const slab = Math.floor(r2[i] * 3);
          const wd = 1 - slab * 0.25;
          px = u * wd;
          pz = v * wd * 0.6;
          py = 0.55 - slab * 0.5;
        } else if (j === 1) {
          // Partnership: two strands braided from start to finish.
          const strand = r2[i] < 0.5 ? 0 : Math.PI;
          px = u * 1.1;
          const a = u * TAU * 1.2 + t * 1.2 + strand;
          py = Math.sin(a) * 0.35 * Math.sqrt(1 - u * u);
          pz = Math.cos(a) * 0.35 * Math.sqrt(1 - u * u);
          out.accent = strand > 0 && r2[i] > 0.9;
        } else {
          // Embedding: a team grid, one charged block slotting in.
          const cell = Math.floor(r2[i] * 16);
          const gx = (cell % 4) - 1.5;
          const gy = Math.floor(cell / 4) - 1.5;
          const drop = cell === 6 ? (1 - smooth(0, 0.4, (t / 4) % 1)) * 1.4 : 0;
          px = gx * 0.42 + u * 0.13;
          py = gy * 0.42 + v * 0.13 - drop;
          pz = 0;
          out.accent = cell === 6;
        }
        const rot = t * 0.3;
        const c = Math.cos(rot);
        const sn = Math.sin(rot);
        const x1 = j === 2 ? px : px * c + pz * sn;
        const z1 = j === 2 ? 0 : -px * sn + pz * c;
        out.x = ox + x1 * S;
        out.y = oy + (py + z1 * 0.35) * S;
        out.z = z1;
        return;
      }
      case "icon": {
        const idx = Number(s.el.dataset.swarmIcon ?? 0) || 0;
        const pts = iconPoints[idx] ?? iconPoints[0];
        const count = pts.length / 2;
        const p = i % count;
        const W = Math.min(s.w * 0.9, s.h * 1.7);
        const wob = Math.sin(t * 1.4 + pts[p * 2] * 6) * 0.04;
        out.x = cx + pts[p * 2] * W + (r1[i] - 0.5) * 3;
        out.y = cy + pts[p * 2 + 1] * W * 0.62 + (r2[i] - 0.5) * 3;
        out.z = wob * 10;
        return;
      }
      case "wave": {
        // A regular grid laid out as a rolling floor in the lower part of the section.
        const cols = Math.ceil(Math.sqrt(n * 2.6));
        const rows = Math.ceil(n / cols);
        const gx = (i % cols) / (cols - 1) - 0.5;
        const gz = Math.floor(i / cols) / Math.max(1, rows - 1);
        const h = Math.sin(gx * 9 + t * 0.9) * Math.cos(gz * 5 - t * 0.6);
        const persp = 0.55 + gz * 0.65;
        out.x = cx + gx * s.w * 1.1 * persp;
        out.y = s.y + s.h * (0.68 + gz * 0.3) - h * 20 * persp;
        out.z = gz * 2 - 1;
        out.accent = h > 0.9;
        return;
      }
    }
  }

  private readonly frame = (now: number) => {
    this.raf = 0;
    const t = (now - this.start) / 1000;
    const stage = this.activeStage();
    this.anchors.clear();
    this.progress = 0;
    if (stage) {
      stage.el.querySelectorAll<HTMLElement>("[data-swarm-anchor]").forEach((a) => {
        this.anchors.set(a.dataset.swarmAnchor ?? "", a.getBoundingClientRect());
      });
      const host = stage.el.closest<HTMLElement>("[data-swarm-scroll]");
      if (host) {
        const r = host.getBoundingClientRect();
        const target = clamp01(-r.top / Math.max(1, r.height - this.vh));
        // Ease toward the scroll position so morphs flow instead of stepping.
        this.smoothProgress += (target - this.smoothProgress) * (this.reduced ? 1 : 0.08);
        this.progress = this.smoothProgress;
      }
    }
    const { ctx, n, x, y, vx, vy, z, k, charge, mouse, reduced } = this;
    const tg = this.t;
    const size = this.size;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.vw, this.vh);

    // Formations move rigidly with the page: shift every bot by the scroll
    // delta so scrolling never stretches the swarm like a spring.
    const sy = window.scrollY;
    const shift = Number.isNaN(this.lastScroll) ? 0 : sy - this.lastScroll;
    this.lastScroll = sy;

    for (let i = 0; i < n; i++) {
      if (stage) {
        this.target(stage, i, reduced ? 0 : t, tg);
        z[i] = tg.z;
        if (tg.hidden) {
          // Behind the planet: park it there unseen.
          x[i] = tg.x;
          y[i] = tg.y;
          vx[i] = 0;
          vy[i] = 0;
          continue;
        }
        if (reduced) {
          x[i] = tg.x;
          y[i] = tg.y;
        } else {
          vx[i] += (tg.x - x[i]) * k[i];
          vy[i] += (tg.y - y[i]) * k[i];
        }
      }
      if (!reduced) {
        y[i] -= shift;
        if (mouse.on) {
          const dx = x[i] - mouse.x;
          const dy = y[i] - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 120) * 2.4;
            vx[i] += (dx / d) * f;
            vy[i] += (dy / d) * f;
            charge[i] = 1;
          }
        }
        vx[i] *= 0.84;
        vy[i] *= 0.84;
        x[i] += vx[i];
        y[i] += vy[i];
        charge[i] *= 0.97;
      }

      if (y[i] < -10 || y[i] > this.vh + 10) continue;
      const depth = (z[i] + 1) / 2;
      const s = size * (0.7 + depth * 0.6);
      const accent = (stage && tg.accent) || charge[i] > 0.3;
      ctx.fillStyle = accent ? this.violet : this.ink;
      ctx.globalAlpha = 0.28 + depth * 0.62;
      ctx.fillRect(x[i] - s / 2, y[i] - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    if (!reduced) this.request();
  };
}
