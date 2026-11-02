"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, CheckCircle2Icon, Layers3Icon, MessageSquareTextIcon, SearchIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/site/Section";
import { approach } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = [SearchIcon, CheckCircle2Icon, Layers3Icon, MessageSquareTextIcon];

const chip = "rounded-md border border-white/10 bg-white/[0.055] px-2 py-1 text-xs text-muted-foreground";

function Diagram({ active }: { active: number }) {
  if (active === 0) {
    return (
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {approach.cluster.map((label) => (
            <span key={label} className={chip}>
              {label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold text-ink">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/20" />
          <ArrowRightIcon className="size-4 text-gold" aria-hidden />
          <span className="rounded-md border border-gold/40 bg-gold/10 px-3 py-2">Business goal</span>
        </div>
      </div>
    );
  }

  if (active === 1) {
    return (
      <ol className="grid w-full gap-2 text-sm">
        {approach.understandingSteps.map((step, i) => (
          <li key={step} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.055] p-3">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-gold font-mono text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (active === 2) {
    return (
      <ul className="grid w-full gap-2 text-sm">
        {approach.layers.map((layer) => (
          <li
            key={layer}
            className={cn(
              "rounded-md border px-4 py-3",
              layer === "AI capabilities"
                ? "border-gold/50 bg-gold/12 font-semibold text-ink"
                : "border-white/10 bg-white/[0.055] text-muted-foreground",
            )}
          >
            {layer}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid w-full gap-3 text-sm">
      {["Relevant capabilities", "Proof from real work", "Next conversation"].map((label, i) => (
        <div
          key={label}
          className={cn(
            "rounded-md border p-3",
            i === 2 ? "border-gold/50 bg-gold/12 font-semibold text-ink" : "border-white/10 bg-white/[0.055]",
          )}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);
  const ActiveIcon = icons[active];
  const current = approach.stages[active];

  return (
    <Section id="approach">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{approach.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Select each step to see how scattered information becomes a practical AI or software capability.
          </p>

          <div className="mt-8 grid gap-2">
            {approach.stages.map(({ title }, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg border p-3 text-left transition-[background-color,border-color,scale] duration-150 active:scale-[0.96]",
                    active === i
                      ? "border-gold/60 bg-gold/12 text-ink"
                      : "border-white/10 bg-white/[0.035] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-ink",
                  )}
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-navy text-gold">
                    <Icon className="size-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.18em]">0{i + 1}</span>
                    <span className="block font-semibold">{title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ambient-glow rounded-lg border border-white/10 bg-panel/80 p-5 shadow-[0_24px_70px_rgb(3_8_28/0.28)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-md bg-gold text-primary-foreground">
              <ActiveIcon className="size-5" strokeWidth={2} aria-hidden />
            </span>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Step 0{active + 1}
              </p>
              <h3 className="text-2xl font-bold">{current.title}</h3>
            </div>
          </div>

          <div className="ambient-sheen mt-6 flex min-h-64 items-center rounded-lg bg-cream/70 p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]">
            <Diagram active={active} />
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">{current.body}</p>
          <Link
            href="/prototype/approach"
            className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-gold transition-colors duration-150 hover:text-ink"
          >
            View content brief
          </Link>
        </div>
      </div>
    </Section>
  );
}
