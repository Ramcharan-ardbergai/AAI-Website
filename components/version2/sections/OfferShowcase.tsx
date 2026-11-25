"use client";

import { useState } from "react";
import { ArrowUpRightIcon, UserRoundIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/version2/site/Section";
import { offer } from "@/lib/version2-content";
import { cn } from "@/lib/utils";
import "./OfferShowcase.css";

/** "We build platforms": layers stack into a platform. */
function PlatformScene() {
  return (
    <div className="offer-stack">
      {["Software", "Models", "Data"].map((name, i) => (
        <div key={name} className="offer-layer border border-lavender/60 bg-panel" style={{ top: `${22 + i * 21}%`, zIndex: 3 - i, animationDelay: `${i * -0.5}s` }}>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-mist">{name}</span>
          <span className="flex gap-1">
            {[0, 1, 2].map((light) => <span key={light} className="offer-light size-1.5 rounded-full bg-gold" style={{ animationDelay: `${(i * 3 + light) * 0.2}s` }} />)}
          </span>
        </div>
      ))}
    </div>
  );
}

/** "We partner with your teams": one path from first conversation to production. */
function JourneyScene() {
  const path = "M30 118 C90 118 80 42 150 52 S230 110 290 46";
  return (
    <>
      <svg viewBox="0 0 320 160" className="absolute inset-0 size-full" fill="none">
        <path d={path} className="stroke-line" strokeWidth="3" strokeLinecap="round" />
        <path d={path} pathLength="100" className="offer-journey stroke-lavender" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" />
        {[[30, 118], [150, 52], [290, 46]].map(([x, y], i) => (
          <circle key={x} cx={x} cy={y} r="7" className="offer-stop fill-panel stroke-lavender" strokeWidth="3" style={{ animationDelay: `${i * 1.3}s` }} />
        ))}
        <circle r="5" className="offer-traveller fill-gold" style={{ offsetPath: `path("${path}")` }} />
      </svg>
      <span className="absolute bottom-3 left-4 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">First conversation</span>
      <span className="absolute right-4 top-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-gold">Production</span>
    </>
  );
}

/** "We embed engineers": our engineers move into your team's circle. */
function TeamScene() {
  const seats = [0, 60, 120, 180, 240, 300];
  return (
    <>
      <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border border-dashed border-lavender/50" />
        <span className="offer-team absolute inset-0">
          {seats.map((angle, i) => {
            const ours = i % 2 === 1;
            return (
              <span key={angle} className="absolute inset-0" style={{ rotate: `${angle}deg` }}>
                <span className={cn("absolute left-1/2 top-0 -ml-4 -mt-4 flex size-8 items-center justify-center rounded-full border", ours ? "offer-join border-lavender bg-lavender text-graphite" : "border-line bg-panel text-muted-foreground")} style={ours ? { animationDelay: `${i * 0.35}s` } : undefined}>
                  {/* Undo the seat angle and the ring's spin so people stay upright. */}
                  <span style={{ rotate: `${-angle}deg` }}>
                    <UserRoundIcon className="offer-upright size-4" />
                  </span>
                </span>
              </span>
            );
          })}
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-mist">Your team</span>
      </div>
    </>
  );
}

/** Same order as offer.items. */
const extras = [
  { scene: <PlatformScene />, need: "We need a product built" },
  { scene: <JourneyScene />, need: "We want a partner from start to finish" },
  { scene: <TeamScene />, need: "Our team needs more engineers" },
];

/** The card leans toward the pointer and a soft light follows it. */
function follow(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const box = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width;
  const y = (event.clientY - box.top) / box.height;
  const { style } = event.currentTarget;
  style.setProperty("--x", `${x * 100}%`);
  style.setProperty("--y", `${y * 100}%`);
  style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
  style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
}

function rest(event: React.PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--tilt-x");
  event.currentTarget.style.removeProperty("--tilt-y");
}

/** Palette3 "What we offer": animated cards plus a quick "which fits you?" picker. */
export function OfferShowcase() {
  const [chosen, setChosen] = useState<number | null>(null);
  const choice = chosen === null ? null : offer.items[chosen];

  return (
    <Section id="offer" tone="dark">
      <Eyebrow>{offer.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-mist sm:text-5xl">{offer.title}</h2>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {offer.items.map(({ title, body }, i) => (
          <li key={title} className="offer-reveal">
            <article onPointerMove={follow} onPointerLeave={rest} className={cn("offer-card group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-elevated transition duration-300", chosen === i ? "border-lavender ring-2 ring-lavender" : "border-line hover:border-lavender/60", chosen !== null && chosen !== i && "opacity-50")}>
              <div className="offer-scene relative h-48 overflow-hidden border-b border-line bg-graphite/60" aria-hidden="true">
                {extras[i]?.scene}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold text-mist">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                <a href="#contact" data-contact-help={title.replace(/\.$/, "")} className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-lavender focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
                  Talk about this <ArrowUpRightIcon className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </a>
              </div>
              <span className="offer-spotlight pointer-events-none absolute inset-0" aria-hidden="true" />
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-3xl border border-line bg-graphite/60 p-6 sm:p-8">
        <p className="font-heading text-xl font-bold text-mist sm:text-2xl">Which fits you?</p>
        <div role="group" aria-label="Which fits you?" className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {extras.map(({ need }, i) => (
            <button key={need} type="button" aria-pressed={chosen === i} onClick={() => setChosen(chosen === i ? null : i)} className={cn("rounded-full border px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender", chosen === i ? "border-lavender bg-lavender text-graphite" : "border-line text-mist hover:border-lavender")}>
              {need}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {choice && (
            <div key={choice.title} className="mt-6 flex flex-col gap-4 border-t border-line pt-6 animate-in fade-in slide-in-from-bottom-3 duration-500 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base text-muted-foreground">
                Your match: <span className="font-semibold text-mist">{choice.title}</span> {choice.body}
              </p>
              <a href="#contact" data-contact-help={choice.title.replace(/\.$/, "")} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-lavender px-6 text-sm font-semibold text-graphite transition-colors hover:bg-[var(--lavender-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
                Start with this <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
