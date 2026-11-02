import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { about } from "@/lib/content";

const connectionNodes = [
  "left-[16%] top-[30%]",
  "left-[30%] top-[52%]",
  "left-[45%] top-[34%]",
  "left-[59%] top-[58%]",
  "left-[74%] top-[38%]",
  "left-[86%] top-[54%]",
];

export function About() {
  return (
    <section id="about" className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden pt-14 sm:pt-20">
      <div className="absolute right-[-12rem] top-24 size-[28rem] rounded-full bg-ice/10 blur-3xl" aria-hidden />
      <Container>
        <h1 className="max-w-3xl pt-12 font-heading text-4xl font-bold tracking-tight sm:text-6xl">
          {about.title}{" "}
          <span className="font-serif font-normal italic text-gold">{about.accent}</span>
        </h1>
        <p className="mt-5 max-w-xl font-serif text-xl text-muted-foreground sm:text-2xl">{about.lead}</p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {about.columns.map(({ label, title, body }, i) => (
            <div
              key={label}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_55px_rgb(3_8_28/0.22)] backdrop-blur"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                0{i + 1} / {label}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight">{title}</h2>
              <div className="my-4 h-8 w-px bg-gold/60" aria-hidden />
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative mt-10 h-56 overflow-hidden bg-gradient-to-b from-transparent via-[#0b1e4d]/50 to-[#09183f] sm:h-80" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[#102c76]/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]" />
        <div className="absolute bottom-[22%] left-[5%] h-[26%] w-[18%] rounded-t-lg border border-white/10 bg-[#19377c]/90 shadow-[0_18px_45px_rgb(3_8_28/0.22)]" />
        <div className="absolute bottom-[22%] right-[5%] h-[26%] w-[18%] rounded-t-lg border border-white/10 bg-[#19377c]/90 shadow-[0_18px_45px_rgb(3_8_28/0.22)]" />
        <div className="absolute left-[20%] right-[20%] top-[43%] h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent" />
        <div className="absolute left-[24%] right-[24%] top-[54%] h-px bg-gradient-to-r from-transparent via-sky/70 to-transparent" />
        <div className="absolute left-[25%] top-[45%] h-[18%] w-[50%] rounded-full border border-ice/25 bg-ice/[0.03] blur-[1px]" />
        {connectionNodes.map((cls, i) => (
          <div
            key={cls}
            className={`absolute ${cls} size-8 rounded-lg border border-ice/35 bg-ice/15 shadow-[0_0_30px_rgb(142_197_255/0.16)] backdrop-blur-sm sm:size-10`}
          >
            <div className={`absolute inset-2 rounded ${i % 2 === 0 ? "bg-sky/70" : "bg-ice/45"}`} />
          </div>
        ))}
        <div className="absolute bottom-[22%] left-[37%] h-[12%] w-[26%] rounded-md border border-white/10 bg-sky/45 shadow-[0_16px_40px_rgb(79_127_196/0.2)]" />
      </div>

      <Container className="relative -mt-2">
        <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-panel/70 p-5 text-center shadow-[0_22px_65px_rgb(3_8_28/0.28)] backdrop-blur sm:p-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Introducing ArdbergAI</p>
          <p className="mt-3 text-base leading-8 text-ink/85 sm:text-lg">{about.intro}</p>
        </div>
      </Container>

      <div className="flex justify-center py-6">
        <Button
          variant="outline"
          render={<a href="#approach" />}
          nativeButton={false}
          className="h-10 gap-2 rounded-full px-5 text-ink"
        >
          {about.scrollLabel}
          <ArrowDownIcon />
        </Button>
      </div>
    </section>
  );
}
