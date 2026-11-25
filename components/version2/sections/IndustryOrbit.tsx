"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, CarFrontIcon, FactoryIcon, FlaskConicalIcon, HeartPulseIcon, LandmarkIcon, RadioTowerIcon, ShoppingBagIcon, TruckIcon, WorkflowIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { industries, industryAnchor } from "@/lib/version2-content";
import { cn } from "@/lib/utils";
import "./IndustryOrbit.css";

export const industryIcons = [FlaskConicalIcon, FactoryIcon, LandmarkIcon, ZapIcon, HeartPulseIcon, ShoppingBagIcon, TruckIcon, RadioTowerIcon, CarFrontIcon];

const count = industries.items.length;
const pad = (n: number) => String(n).padStart(2, "0");

/** Position of an industry on the orbit, in % of the square. The first sits at 12 o'clock. */
const nodes = industries.items.map((_, i) => {
  const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
  const at = (value: number) => Math.round((50 + 41 * value) * 100) / 100;
  return { x: at(Math.cos(angle)), y: at(Math.sin(angle)) };
});

const motionQuery = "(prefers-reduced-motion: reduce)";
const allowsMotion = () => !window.matchMedia(motionQuery).matches;
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const roundButton = "flex size-11 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-lavender hover:text-lavender focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";

/**
 * Industries as an orbit around one connected core. Once on screen it travels
 * from industry to industry on its own (3 seconds each). Pointing at an icon or
 * name shows it and holds the tour until the pointer leaves; clicking one stops
 * the tour.
 */
export function IndustryOrbit() {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const motion = useSyncExternalStore(subscribeMotion, allowsMotion, () => false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const touring = motion && !picked && inView;
  const { title, body, signals } = industries.items[active];
  const ActiveIcon = industryIcons[active] ?? WorkflowIcon;

  const pick = (index: number) => {
    setActive((index + count) % count);
    setPicked(true);
  };

  const pointing = (index: number) => ({
    onPointerEnter: (event: React.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      setActive(index);
      setHeld(true);
    },
    onPointerLeave: () => setHeld(false),
  });

  // The tour runs only while the section is on screen, so it starts on arrival.
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  // Header menu links point at #industry-…: select that industry. Router links
  // don't fire "hashchange", so clicks on those anchors are watched as well.
  useEffect(() => {
    const select = (hash: string) => {
      const index = industries.items.findIndex((item) => `#${industryAnchor(item.title)}` === hash);
      if (index < 0) return;
      setActive(index);
      setPicked(true);
    };
    const onHash = () => select(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a[href*='#']");
      if (link instanceof HTMLAnchorElement) select(link.hash);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={root} className="industry-orbit relative mt-12 border-y border-line py-10">
      {industries.items.map((item) => (
        <span key={item.title} id={industryAnchor(item.title)} className="absolute top-0 scroll-mt-24" aria-hidden="true" />
      ))}

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="41" className="stroke-line" strokeWidth=".3" />
            <circle cx="50" cy="50" r="28" className="industry-orbit-ring stroke-line" strokeWidth=".35" strokeDasharray=".6 2.2" />
            {nodes.map(({ x, y }, i) => (
              <line key={i} x1="50" y1="50" x2={x} y2={y} className="stroke-line" strokeWidth=".25" />
            ))}
            <line x1={nodes[active].x} y1={nodes[active].y} x2="50" y2="50" className="industry-orbit-flow stroke-lavender" strokeWidth=".8" strokeLinecap="round" strokeDasharray="1.5 2.5" />
            <circle cx="50" cy="50" r="17" className="fill-panel stroke-line" strokeWidth=".35" />
            {/* Travels along the orbit to the next industry, then selects it. */}
            {touring && (
              <circle key={active} cx="50" cy="50" r="41" pathLength="360" strokeWidth="1.1" strokeLinecap="round" transform={`rotate(${(active * 360) / count - 90} 50 50)`} className="industry-orbit-travel stroke-lavender" style={{ animationPlayState: held ? "paused" : undefined }} onAnimationEnd={() => setActive((current) => (current + 1) % count)} />
            )}
          </svg>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <ActiveIcon key={active} className="size-[16%] text-lavender animate-in fade-in zoom-in-50 duration-200" strokeWidth={1.25} />
          </div>

          {industries.items.map((item, i) => {
            const Icon = industryIcons[i] ?? WorkflowIcon;
            return (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                aria-pressed={i === active}
                onClick={() => pick(i)}
                {...pointing(i)}
                className={cn(
                  "group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[scale,background-color,border-color,color] duration-300 hover:z-10 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender sm:size-14",
                  i === active ? "scale-115 border-lavender bg-lavender text-graphite" : "border-line bg-panel text-mist hover:scale-110 hover:border-lavender hover:text-lavender",
                )}
                style={{ left: `${nodes[i].x}%`, top: `${nodes[i].y}%` }}
              >
                <Icon className="size-5 sm:size-6" strokeWidth={1.5} aria-hidden="true" />
                <span className="pointer-events-none absolute top-full mt-1.5 hidden whitespace-nowrap rounded-md border border-line bg-panel px-2 py-1 text-xs font-medium text-mist shadow-lg group-hover:block group-focus-visible:block" aria-hidden="true">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live={picked ? "polite" : "off"} className="min-w-0">
          <div key={active} className="min-h-[23rem] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <p className="font-mono text-6xl font-bold leading-none text-lavender/25 sm:text-7xl" aria-hidden="true">{pad(active + 1)}</p>
            <h3 className="mt-3 font-heading text-3xl font-bold tracking-tight text-mist sm:text-4xl">{title}</h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
            <p className="mt-7 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Signals we connect</p>
            <ul className="mt-3">
              {signals.map((signal, i) => (
                <li key={signal} className="relative flex items-center gap-3 py-1.5 text-sm font-medium text-mist">
                  {i < signals.length - 1 && <span className="absolute left-[4.5px] top-1/2 h-full w-px bg-lavender/50" aria-hidden="true" />}
                  <span className="relative size-2.5 rounded-full border-2 border-lavender bg-graphite" aria-hidden="true" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
            <Link href="#contact" data-contact-industry={title} className="inline-flex min-h-11 items-center gap-2 border-b border-lavender font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-lavender transition-colors hover:text-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
              Discuss this industry <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </Link>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => pick(active - 1)} className={roundButton} aria-label="Previous industry">
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
              </button>
              <span className="font-mono text-xs text-muted-foreground">{pad(active + 1)} / {pad(count)}</span>
              <button type="button" onClick={() => pick(active + 1)} className={roundButton} aria-label="Next industry">
                <ArrowRightIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-1">
        {industries.items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => pick(i)}
              {...pointing(i)}
              className={cn("min-h-9 border-b-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender", i === active ? "border-lavender text-mist" : "border-transparent text-muted-foreground hover:text-mist")}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
