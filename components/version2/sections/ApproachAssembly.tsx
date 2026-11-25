"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DatabaseIcon, FileTextIcon, ServerIcon, Table2Icon, UnplugIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/version2/site/Section";
import { approach } from "@/lib/version2-content";
import { cn } from "@/lib/utils";
import "./ApproachAssembly.css";

const icons = [Table2Icon, ServerIcon, DatabaseIcon, FileTextIcon, UnplugIcon];

type Point = [x: number, y: number];
/** Corners of a pentagon around the centre, in % of the stage. */
const pentagon = (radius: number): Point[] =>
  approach.cluster.map((_, i) => {
    const angle = (i / approach.cluster.length) * 2 * Math.PI - Math.PI / 2;
    const at = (value: number) => Math.round((50 + radius * value) * 100) / 100;
    return [at(Math.cos(angle)), at(Math.sin(angle))];
  });

const wide = pentagon(38);
const tight = pentagon(29);
/** Where each piece sits during each step: scattered, mapped, assembled. */
const layouts: Point[][] = [[[24, 14], [75, 26], [34, 43], [21, 77], [72, 80]], wide, tight];
const tilts = [-9, 7, -5, 8, -7];
const solutions: { name: string; at: Point }[] = [
  { name: "Models", at: [50, 29] },
  { name: "Data", at: [68, 62] },
  { name: "Software", at: [32, 62] },
];

const motionQuery = "(prefers-reduced-motion: reduce)";
const allowsMotion = () => !window.matchMedia(motionQuery).matches;
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Palette3 "Our approach": the same five messy starting points are scanned,
 * matched with solutions and then locked into one system, step by step.
 */
export function ApproachAssembly() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const motion = useSyncExternalStore(subscribeMotion, allowsMotion, () => false);
  const playing = motion && inView && !picked;

  // Play from the first step once the stage is on screen.
  useEffect(() => {
    if (!stage.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  const pick = (index: number) => {
    setStep(index);
    setPicked(true);
  };

  return (
    <Section id="approach" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{approach.title}</h2>

          <ol className="mt-9 space-y-3" onPointerEnter={(event) => event.pointerType === "mouse" && setHeld(true)} onPointerLeave={() => setHeld(false)}>
            {approach.steps.map(({ title, body }, i) => (
              <li key={title}>
                <button type="button" onClick={() => pick(i)} aria-current={step === i ? "step" : undefined} className={cn("relative flex w-full gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender", step === i ? "border-lavender bg-panel" : "border-line hover:border-lavender/60")}>
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors", step >= i ? "bg-lavender text-graphite" : "bg-elevated text-muted-foreground")}>0{i + 1}</span>
                  <span>
                    <span className="block font-heading text-lg font-bold text-mist sm:text-xl">{title}</span>
                    <span className={cn("grid transition-[grid-template-rows,opacity] duration-500", step === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm leading-relaxed text-muted-foreground">{body}</span>
                      </span>
                    </span>
                  </span>
                  {playing && step === i && (
                    <span className="approach-timer absolute inset-x-0 bottom-0 h-1 origin-left bg-lavender" style={{ animationPlayState: held ? "paused" : undefined }} onAnimationEnd={() => setStep((current) => (current + 1) % approach.steps.length)} aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div ref={stage} data-step={step} role="img" aria-label={`${approach.cluster.join(", ")}: ${approach.steps[step].title}`} className="approach-stage relative mx-auto aspect-square w-full max-w-[36rem]">
          <span className="approach-radar absolute inset-[6%] rounded-full" aria-hidden="true" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
            {[38, 26, 14].map((radius) => <circle key={radius} cx="50" cy="50" r={radius} className="stroke-line" strokeWidth=".25" />)}
            {/* Step 2: every piece is traced back to the centre. */}
            <g className={cn("transition-opacity duration-700", step === 1 ? "opacity-100" : "opacity-0")}>
              {wide.map(([x, y], i) => <line key={i} x1="50" y1="50" x2={x} y2={y} className="approach-dash stroke-lavender" strokeWidth=".45" strokeDasharray="1.6 1.8" />)}
            </g>
            {/* Step 3: the pieces lock into one shape. */}
            <g className={cn("transition-opacity delay-300 duration-700", step === 2 ? "opacity-100" : "opacity-0")}>
              <polygon points={tight.join(" ")} className="fill-lavender/15 stroke-lavender" strokeWidth=".6" />
              {tight.map(([x, y], i) => <line key={i} x1="50" y1="50" x2={x} y2={y} className="stroke-lavender" strokeWidth=".45" />)}
              <polygon points={tight.join(" ")} pathLength="100" className="approach-current stroke-gold" strokeWidth="1" strokeLinecap="round" strokeDasharray="8 92" />
            </g>
          </svg>

          <div className={cn("approach-core absolute left-1/2 top-1/2 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-graphite transition-all duration-700", step === 2 ? "w-[25%] border-lavender" : "w-[19%] border-line")}>
            <span className={cn("approach-mark h-[44%] w-[62%] transition-colors duration-700", step === 0 ? "bg-muted-foreground/50" : "bg-mist")} />
          </div>

          {solutions.map(({ name, at: [x, y] }, i) => (
            <span key={name} className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-graphite shadow-lg transition-all duration-500 sm:text-[11px]", step === 1 ? "scale-100 opacity-100" : "scale-0 opacity-0")} style={{ left: `${x}%`, top: `${y}%`, transitionDelay: step === 1 ? `${500 + i * 200}ms` : "0ms" }}>
              {name}
            </span>
          ))}

          {approach.cluster.map((label, i) => {
            const Icon = icons[i] ?? DatabaseIcon;
            const [x, y] = layouts[step][i];
            return (
              <span key={label} className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.2,1)]" style={{ left: `${x}%`, top: `${y}%`, rotate: step === 0 ? `${tilts[i]}deg` : "0deg", transitionDelay: `${i * 70}ms` }}>
                <span className="approach-piece flex flex-col items-center gap-1.5" style={{ animationDelay: `${i * -0.9}s` }}>
                  <span className={cn("flex size-11 items-center justify-center rounded-2xl border shadow-xl transition-colors duration-700 sm:size-14", step === 2 ? "border-lavender bg-lavender text-graphite" : step === 1 ? "border-lavender bg-panel text-lavender" : "border-dashed border-muted-foreground/60 bg-panel text-muted-foreground")}>
                    <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
                  </span>
                  <span className="whitespace-nowrap rounded-md bg-panel/90 px-2 py-0.5 text-[10px] font-semibold text-mist sm:text-xs">{label}</span>
                </span>
              </span>
            );
          })}

          <p className={cn("absolute inset-x-0 -bottom-2 text-center font-heading text-xl font-bold text-mist transition-all duration-700 sm:text-2xl", step === 2 ? "translate-y-0 opacity-100 delay-700" : "translate-y-3 opacity-0")}>
            One connected <span className="text-lavender">intelligence.</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
