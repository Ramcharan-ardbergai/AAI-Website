import { Eyebrow, Section } from "@/components/site/Section";
import { offer } from "@/lib/content";

export function Offer() {
  return (
    <Section id="offer" tone="dark">
      <Eyebrow className="text-ice">{offer.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl">{offer.title}</h2>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {offer.items.map(({ title, body }, i) => (
          <li
            key={title}
            className="rounded-2xl border border-white/10 bg-panel p-6 transition-colors hover:border-gold/60"
          >
            <span className="font-mono text-xs font-bold text-gold">0{i + 1}</span>
            <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
