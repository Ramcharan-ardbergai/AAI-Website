import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { about } from "@/lib/content";

/* Decorative "bridge" of blocks between two ledges, after the opening picture. */
const bridge = [
  "left-[30%] bottom-[38%] h-[34%] w-[3%] bg-lavender/80",
  "left-[38%] bottom-[34%] h-[44%] w-[3%] bg-white/50 border border-white",
  "left-[44%] bottom-[30%] h-[52%] w-[3%] bg-lavender/70",
  "left-[49%] bottom-[28%] h-[36%] w-[4%] bg-[#d9d2c6]",
  "left-[55%] bottom-[22%] h-[56%] w-[4%] bg-[#e4ddd1]",
  "left-[61%] bottom-[24%] h-[34%] w-[4%] bg-white/50 border border-white",
  "left-[66%] bottom-[18%] h-[14%] w-[12%] bg-[#e4ddd1]",
  "left-[72%] bottom-[24%] h-[10%] w-[10%] bg-lavender/60",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-16 sm:pt-24">
      <Container>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
          {about.title}
        </h1>
        <p className="mt-5 max-w-xl font-serif text-xl text-muted-foreground sm:text-2xl">{about.lead}</p>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {about.columns.map(({ label, title, body }, i) => (
            <div key={label}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                0{i + 1} · {label}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight">{title}</h2>
              <div className="my-4 h-8 w-px bg-ink/40" aria-hidden />
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative mt-10 h-56 sm:h-80" aria-hidden>
        <div className="absolute bottom-0 left-0 h-[55%] w-[30%] rounded-tr-xl bg-gradient-to-b from-[#e9e3d8] to-[#d6cfc2]" />
        <div className="absolute bottom-[55%] left-[6%] size-10 bg-[#e4ddd1] shadow-sm sm:size-14" />
        <div className="absolute bottom-0 right-0 h-[45%] w-[30%] rounded-tl-xl bg-gradient-to-b from-[#e9e3d8] to-[#d6cfc2]" />
        <div className="absolute bottom-[45%] right-[6%] size-10 bg-[#e4ddd1] shadow-sm sm:size-14" />
        {bridge.map((cls) => (
          <div key={cls} className={`absolute backdrop-blur-sm ${cls}`} />
        ))}
      </div>

      <div className="flex justify-center bg-cream py-6">
        <Button
          variant="outline"
          render={<a href="#intro" />}
          nativeButton={false}
          className="h-10 gap-2 rounded-full px-5 text-navy"
        >
          {about.scrollLabel}
          <ArrowDownIcon />
        </Button>
      </div>
    </section>
  );
}
