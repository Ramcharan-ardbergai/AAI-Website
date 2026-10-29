import { Eyebrow, Section } from "@/components/site/Section";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <Section id="industries">
      <Eyebrow>{industries.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">{industries.title}</h2>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.items.map(({ title, body }) => (
          <li key={title} className="rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-md">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-serif text-xl italic text-navy sm:text-2xl">{industries.beyond}</p>
    </Section>
  );
}
