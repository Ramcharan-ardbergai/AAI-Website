"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react";
import { approach } from "@/lib/version2-content";
import "./ClusterToClarity.css";

const desktopPaths = [
  "M155 43 C350 43 360 162 500 180",
  "M255 106 C380 106 410 175 500 180",
  "M145 180 C350 155 405 205 500 180",
  "M275 254 C390 254 405 185 500 180",
  "M210 315 C365 315 380 195 500 180",
  "M550 180 H700",
];

const mobilePaths = [
  "M100 58 C100 178 170 220 180 295",
  "M275 105 C275 205 195 230 180 295",
  "M80 160 C80 240 165 250 180 295",
  "M260 205 C260 260 195 270 180 295",
  "M110 242 C130 270 160 280 180 295",
  "M180 330 V355",
];

function FlowLines({ paths, mobile = false }: { paths: string[]; mobile?: boolean }) {
  return (
    <svg
      className={`clarity-lines ${mobile ? "clarity-lines-mobile" : "clarity-lines-desktop"}`}
      viewBox={mobile ? "0 0 360 510" : "0 0 1000 360"}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {paths.map((path, index) => (
        <g key={path}>
          <path d={path} className="clarity-wire" pathLength="1" style={{ animationDelay: `${index * 100}ms` }} />
          <path d={path} className="clarity-wire-pulse" pathLength="1" style={{ animationDelay: `${1.5 + index * 0.27}s` }} />
        </g>
      ))}
    </svg>
  );
}

export function ClusterToClarity() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`clarity-panel relative isolate overflow-hidden rounded-[2rem] border border-line bg-panel p-5 sm:p-8 ${inView ? "is-visible" : ""}`}
      role="img"
      aria-label="Five disconnected sources converge through ArdbergAI into one connected intelligence."
    >
      <div className="clarity-grid" aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs" aria-hidden="true">
        <span className="text-muted-foreground">01 / Scattered inputs</span>
        <span className="text-lavender">02 / Connected outcome</span>
      </div>

      <div className="clarity-stage" aria-hidden="true">
        <FlowLines paths={desktopPaths} />
        <FlowLines paths={mobilePaths} mobile />

        {approach.cluster.map((label, index) => (
          <div key={label} className={`clarity-chip clarity-chip-${index + 1}`}>
            <span className="clarity-chip-dot" />
            <span>{label}</span>
          </div>
        ))}

        <div className="clarity-core">
          <div className="clarity-core-halo" />
          <div className="clarity-core-ring" />
          <SparklesIcon className="relative size-8 text-gold" strokeWidth={1.5} />
          <span className="clarity-core-label">ArdbergAI</span>
        </div>

        <div className="clarity-result">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Unified system</span>
            <ArrowUpRightIcon className="size-4 text-lavender" />
          </div>
          <div className="clarity-result-mark mt-5 flex items-end gap-1.5" aria-hidden="true">
            {[34, 55, 43, 75, 62, 100].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <p className="mt-5 max-w-[15ch] font-heading text-2xl font-bold leading-tight tracking-tight text-mist sm:text-3xl">
            One connected intelligence.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">Clear signals. Useful decisions.</p>
        </div>
      </div>

      <div className="relative flex items-center gap-3 border-t border-line pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground" aria-hidden="true">
        <span className="size-1.5 rounded-full bg-gold" />
        Complexity, connected into capability
      </div>
    </div>
  );
}
