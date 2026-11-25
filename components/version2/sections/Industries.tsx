import { Eyebrow, Section } from "@/components/version2/site/Section";
import { IndustryExplorer } from "@/components/version2/sections/IndustryExplorer";
import { IndustryOrbit } from "@/components/version2/sections/IndustryOrbit";
import { industries } from "@/lib/version2-content";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

/** Palette1 shows the stacked cards; Palette3 passes `orbit` for the orbit view. */
export function Industries({ orbit = false }: { orbit?: boolean }) {
  return (
    <Section id="industries">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-end lg:gap-12">
        <div>
          <Eyebrow>{industries.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            <span className="block">{industries.titleLines[0]}</span>
            <span className="mt-2 inline-block bg-lavender px-2 pb-1 text-graphite">{industries.titleLines[1]}</span>
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{industries.description}</p>
      </div>

      {orbit ? <IndustryOrbit /> : <IndustryExplorer />}

      <div className={`flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between ${orbit ? "mt-10" : "mt-8 border border-line bg-panel p-6 sm:p-8"}`}>
        <p className="max-w-2xl font-heading text-xl font-semibold text-mist sm:text-2xl">{industries.beyond}</p>
        <Link href="#contact" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-lavender px-5 text-sm font-semibold text-graphite transition-colors hover:bg-[var(--lavender-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
          Let&apos;s talk <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
