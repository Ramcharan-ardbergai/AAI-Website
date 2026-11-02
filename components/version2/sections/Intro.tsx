import { Eyebrow, Section } from "@/components/version2/site/Section";
import { intro } from "@/lib/version2-content";

export function Intro() {
  return (
    <Section id="intro" className="bg-panel">
      <Eyebrow>{intro.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
        {intro.title}
      </h2>
      <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted-foreground sm:text-2xl">{intro.body}</p>
    </Section>
  );
}
