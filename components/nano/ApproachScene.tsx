"use client";

import { useEffect, useRef, useState } from "react";
import { approach } from "@/lib/version2-content";

/**
 * Pinned scroll scene: as the section scrolls, the swarm goes from five
 * scattered clusters to one solid cube, and the three steps advance.
 */
export function ApproachScene() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Three snap points (p = 0, 0.5, 1): one scroll gesture per step.
  const step = p < 0.25 ? 0 : p < 0.75 ? 1 : 2;
  const scattered = p < 0.3;

  return (
    <section id="approach" ref={ref} data-swarm-scroll className="nano-approach">
      <span className="nano-snap" style={{ top: 0 }} aria-hidden="true" />
      <span className="nano-snap" style={{ top: "60vh" }} aria-hidden="true" />
      <span className="nano-snap" style={{ top: "120vh" }} aria-hidden="true" />
      <div className="nano-approach-pin">
        <div className="nano-wrap nano-approach-grid">
          <div>
            <p className="nano-label">{approach.eyebrow}</p>
            <h2 className="nano-h2">{approach.title}</h2>
            <ol className="nano-steps">
              {approach.steps.map(({ title, body }, i) => (
                <li key={title} className="nano-step" data-active={i === step || undefined}>
                  <span className="nano-step-bar" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-swarm="clusters" className="nano-approach-stage">
            {approach.cluster.map((label, i) => (
              <span
                key={label}
                data-swarm-anchor={`c${i}`}
                className={`nano-cluster nano-cluster-${i}`}
                data-hidden={!scattered || undefined}
              >
                {label}
              </span>
            ))}
            <div className="nano-outcome" data-visible={p > 0.8 || undefined}>
              <p className="nano-label">Unified system</p>
              <p className="nano-outcome-title">One connected intelligence.</p>
              <p className="nano-outcome-body">Clear signals. Useful decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
