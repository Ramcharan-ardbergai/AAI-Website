import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/version2/site/Section";
import { approach } from "@/lib/version2-content";
import { cn } from "@/lib/utils";

/** What each step looks like: scattered inputs, chosen blocks, one system. */
function StepVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <ul className="flex flex-wrap content-center justify-center gap-2">
        {approach.cluster.map((label) => (
          <li key={label} className="rounded-md border border-dashed border-muted-foreground/60 px-2.5 py-1 text-xs text-muted-foreground">
            {label}
          </li>
        ))}
      </ul>
    );
  }

  if (step === 1) {
    return (
      <ul className="flex flex-wrap content-center justify-center gap-2">
        {approach.solutions.map((label) => (
          <li key={label} className="rounded-md border border-lavender bg-panel px-3.5 py-2 text-sm font-semibold text-mist">
            {label}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="flex items-center gap-2.5 rounded-xl bg-lavender px-5 py-3 font-heading text-base font-bold text-graphite">
      <CheckIcon className="size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      {approach.resultLabel}
    </p>
  );
}

/**
 * Palette3 "Our approach": all three steps side by side, readable at a glance,
 * each ending in what the client receives.
 */
export function ApproachSteps() {
  return (
    <Section id="approach">
      <Eyebrow>{approach.eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{approach.title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{approach.lead}</p>

      <ol className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-6">
        {approach.steps.map(({ title, body, output }, i) => {
          const last = i === approach.steps.length - 1;
          return (
            <li key={title} className={cn("relative flex flex-col rounded-2xl border bg-panel p-6", last ? "border-lavender" : "border-line")}>
              <div className="flex min-h-32 items-center justify-center rounded-xl bg-elevated p-4">
                <StepVisual step={i} />
              </div>

              <span className="mt-6 font-mono text-xs font-bold text-lavender">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold text-mist">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>

              <div className="mt-auto pt-6">
                <div className="border-t border-line pt-4">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold">{approach.outputLabel}</p>
                  <p className="mt-1.5 text-sm font-semibold leading-relaxed text-mist">{output}</p>
                </div>
              </div>

              {!last && (
                <span className="absolute -bottom-8 left-1/2 z-10 flex size-8 -translate-x-1/2 items-center justify-center lg:-right-7 lg:bottom-auto lg:left-auto lg:top-[4.5rem] lg:translate-x-0" aria-hidden="true">
                  <span className="flex size-8 items-center justify-center rounded-full border border-line bg-graphite text-lavender">
                    <ArrowRightIcon className="size-4 rotate-90 lg:rotate-0" />
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
