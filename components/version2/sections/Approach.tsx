import { Eyebrow, Section } from "@/components/version2/site/Section";
import { approach } from "@/lib/version2-content";

/* Cluster (tangled lines + messy sources) resolving into one clear line. */
function ClusterToClarity() {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5 sm:p-8" aria-hidden>
      <div className="flex flex-wrap gap-2">
        {approach.cluster.map((label) => (
          <span key={label} className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-muted-foreground">
            {label}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 600 90" className="mt-4 h-auto w-full" fill="none">
        <path
          d="M0 45 C40 0 70 90 110 20 S170 80 200 45 S250 10 280 45"
          stroke="var(--lavender)"
          strokeWidth="2"
        />
        <path d="M0 60 C50 90 80 0 120 70 S180 10 215 55 S255 80 280 45" stroke="var(--mist)" strokeWidth="2" opacity=".5" />
        <path d="M0 30 C30 70 90 40 130 60 S190 0 220 40 S260 60 280 45" stroke="var(--gold)" strokeWidth="2" opacity=".7" />
        <path d="M280 45 H560" stroke="var(--lavender)" strokeWidth="3" />
        <circle cx="570" cy="45" r="9" fill="var(--gold)" stroke="var(--lavender)" strokeWidth="3" />
      </svg>
    </div>
  );
}

export function Approach() {
  return (
    <Section id="approach">
      <Eyebrow>{approach.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">{approach.title}</h2>

      <div className="mt-10">
        <ClusterToClarity />
      </div>

      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {approach.steps.map(({ title, body }, i) => (
          <li key={title} className="rounded-2xl border border-line bg-panel p-6 transition-shadow hover:shadow-md">
            <span className="inline-flex size-8 items-center justify-center rounded-md bg-lavender font-mono text-xs font-bold text-graphite">
              0{i + 1}
            </span>
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
