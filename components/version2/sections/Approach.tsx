import { Eyebrow, Section } from "@/components/version2/site/Section";
import { ClusterToClarity } from "@/components/version2/sections/ClusterToClarity";
import { approach } from "@/lib/version2-content";

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
