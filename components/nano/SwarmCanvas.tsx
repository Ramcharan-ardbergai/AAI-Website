"use client";

import { useEffect, useRef } from "react";
import { Swarm } from "./swarm";

/** The microbot swarm: one fixed canvas behind the whole page. */
export function SwarmCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let swarm: Swarm | null = null;
    // Wait a frame so every stage on the page is laid out before the first measure.
    const id = requestAnimationFrame(() => {
      try {
        swarm = new Swarm(canvas);
      } catch {
        swarm = null;
      }
    });
    return () => {
      cancelAnimationFrame(id);
      swarm?.destroy();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="nano-canvas" />;
}
