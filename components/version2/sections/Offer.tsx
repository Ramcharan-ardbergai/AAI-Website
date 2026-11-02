import { Eyebrow, Section } from "@/components/version2/site/Section";
import { offer } from "@/lib/version2-content";

export function Offer() {
  return (
    <Section id="offer" tone="dark">
      <Eyebrow>{offer.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-mist sm:text-5xl">{offer.title}</h2>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {offer.items.map(({ title, body }, i) => (
          <li
            key={title}
            className="rounded-2xl border border-line bg-elevated p-6 transition-colors hover:border-lavender/60"
          >
            <span className="font-mono text-xs font-bold text-gold">0{i + 1}</span>
            <h3 className="mt-4 text-xl font-bold text-mist">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
