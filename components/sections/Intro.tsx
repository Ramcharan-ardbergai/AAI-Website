import { Eyebrow, Section } from "@/components/site/Section";
import { intro } from "@/lib/content";

export function Intro() {
  return (
    <Section id="intro" className="bg-panel/35 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),inset_0_-1px_0_rgb(255_255_255/0.06)]">
      <Eyebrow>{intro.eyebrow}</Eyebrow>
      <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
        {intro.title}{" "}
        <span className="font-serif font-normal italic text-gold">{intro.accent}</span>
      </h2>
    </Section>
  );
}
