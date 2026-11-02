"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ActivityIcon,
  BanknoteIcon,
  BoxesIcon,
  CarIcon,
  FactoryIcon,
  HeartPulseIcon,
  RadioTowerIcon,
  ShoppingBagIcon,
  ZapIcon,
} from "lucide-react";
import { Eyebrow, Section } from "@/components/site/Section";
import { industries } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons = [
  ActivityIcon,
  FactoryIcon,
  BanknoteIcon,
  ZapIcon,
  HeartPulseIcon,
  ShoppingBagIcon,
  BoxesIcon,
  RadioTowerIcon,
  CarIcon,
];

export function Industries() {
  const [active, setActive] = useState(0);
  const current = industries.items[active];
  const ActiveIcon = icons[active];

  return (
    <Section id="industries">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <Eyebrow>{industries.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{industries.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
            Explore one domain at a time. Each industry has its own data shape, operational pressure, and AI opportunity.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {industries.items.map(({ title }, i) => {
              const Icon = icons[i];
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn(
                    "group flex min-h-16 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-[background-color,border-color,scale] duration-150 active:scale-[0.96]",
                    active === i
                      ? "border-[#6ee7b7]/70 bg-[#6ee7b7]/14 text-ink"
                      : "border-white/10 bg-white/[0.035] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-ink",
                  )}
                >
                  <Icon className="size-4 shrink-0 text-[#6ee7b7]" strokeWidth={1.5} aria-hidden />
                  <span className="text-xs font-semibold leading-5">{title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-panel/80 p-6 shadow-[0_24px_70px_rgb(3_8_28/0.28)] backdrop-blur sm:p-8">
          <div className="absolute right-[-5rem] top-[-5rem] size-56 rounded-full bg-[#6ee7b7]/12 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex size-14 items-center justify-center rounded-lg bg-[#6ee7b7] text-navy shadow-[0_14px_32px_rgb(110_231_183/0.24)]">
                <ActiveIcon className="size-7" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6ee7b7]">
                0{active + 1} / {industries.items.length}
              </p>
            </div>

            <h3 className="mt-8 max-w-xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">{current.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">{current.body}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Signals", "Systems", "Outcomes"].map((label, i) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.045] p-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    0{i + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">{label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-serif text-xl italic text-ink sm:text-2xl">{industries.beyond}</p>
            <Link
              href="/prototype/industries"
              className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#6ee7b7] transition-colors duration-150 hover:text-ink"
            >
              View content brief
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
