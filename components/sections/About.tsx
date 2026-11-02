import { ArrowDownIcon, BrainCircuitIcon, DatabaseIcon, NetworkIcon, WorkflowIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { about } from "@/lib/content";

function HeroVisual() {
  return (
    <div
      className="relative min-h-[30rem] overflow-hidden rounded-lg border border-white/10 bg-panel/70 p-5 shadow-[0_32px_90px_rgb(3_8_28/0.36)] backdrop-blur"
      aria-label="Disconnected systems becoming connected intelligence"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(142_197_255/0.2),transparent_17rem),linear-gradient(135deg,rgb(255_255_255/0.055)_0_1px,transparent_1px_34px)]"
        aria-hidden
      />
      <div className="hero-flow-line absolute left-[11%] right-[11%] top-[47%] h-px bg-gradient-to-r from-ice/10 via-ice/80 to-ice/10" aria-hidden />
      <div className="hero-flow-line hero-flow-line-delayed absolute left-[18%] right-[18%] top-[60%] h-px bg-gradient-to-r from-sky/10 via-sky/65 to-sky/10" aria-hidden />
      <div className="absolute left-[18%] top-[26%] h-[46%] w-px bg-gradient-to-b from-transparent via-ice/35 to-transparent" aria-hidden />
      <div className="absolute right-[18%] top-[26%] h-[46%] w-px bg-gradient-to-b from-transparent via-ice/35 to-transparent" aria-hidden />

      <div className="relative flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-navy/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Before
        </span>
        <span className="rounded-full border border-ice/25 bg-ice/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ice">
          ArdbergAI layer
        </span>
        <span className="rounded-full border border-white/10 bg-navy/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          After
        </span>
      </div>

      <div className="relative mt-4 grid h-full min-h-[24rem] grid-cols-[1fr_0.72fr_1fr] items-center gap-2">
        <div className="space-y-3">
          <div className="hero-float-card rounded-lg border border-white/10 bg-navy/70 p-4 shadow-[0_18px_45px_rgb(3_8_28/0.24)]">
            <DatabaseIcon className="size-5 text-ice" strokeWidth={1.5} aria-hidden />
            <p className="mt-3 text-sm font-semibold text-ink">Scattered data</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Files, tools, systems</p>
          </div>
          <div className="hero-float-card hero-float-card-delayed ml-4 rounded-lg border border-white/10 bg-navy/55 p-4 shadow-[0_18px_45px_rgb(3_8_28/0.18)]">
            <WorkflowIcon className="size-5 text-sky" strokeWidth={1.5} aria-hidden />
            <p className="mt-3 text-sm font-semibold text-ink">Manual workflows</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Slow, disconnected decisions</p>
          </div>
        </div>

        <div className="hero-core relative mx-auto flex size-44 items-center justify-center rounded-full border border-ice/25 bg-ice/[0.055] shadow-[0_0_80px_rgb(142_197_255/0.22)]">
          <div className="absolute inset-0 rounded-full border border-ice/10" />
          <div className="absolute inset-5 rounded-full border border-white/10 bg-panel/80 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]" />
          <div className="absolute inset-12 rounded-full bg-navy/80" />
          <BrainCircuitIcon className="relative size-14 text-gold" strokeWidth={1.5} aria-hidden />
          <div className="absolute -bottom-12 rounded-full border border-white/10 bg-navy/90 px-4 py-2 text-center shadow-[0_12px_28px_rgb(3_8_28/0.24)]">
            <span className="block text-xs font-semibold text-ink">ArdbergAI connects</span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">data + AI + software</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="hero-float-card hero-float-card-delayed mr-4 rounded-lg border border-white/10 bg-navy/55 p-4 shadow-[0_18px_45px_rgb(3_8_28/0.18)]">
            <NetworkIcon className="size-5 text-ice" strokeWidth={1.5} aria-hidden />
            <p className="mt-3 text-sm font-semibold text-ink">Connected systems</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Data, AI, software</p>
          </div>
          <div className="hero-float-card rounded-lg border border-white/10 bg-navy/70 p-4 shadow-[0_18px_45px_rgb(3_8_28/0.24)]">
            <BrainCircuitIcon className="size-5 text-gold" strokeWidth={1.5} aria-hidden />
            <p className="mt-3 text-sm font-semibold text-ink">Working intelligence</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Capabilities teams can use</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden pt-14 sm:pt-20">
      <div className="absolute right-[-12rem] top-24 size-[28rem] rounded-full bg-ice/10 blur-3xl" aria-hidden />
      <Container>
        <div className="grid gap-8 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ice">
              Disconnected systems / Connected intelligence
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold tracking-tight sm:text-6xl">
              {about.title}{" "}
              <span className="font-serif font-normal italic text-gold">{about.accent}</span>
            </h1>
            <p className="mt-5 max-w-xl font-serif text-xl text-muted-foreground sm:text-2xl">{about.lead}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["AI products", "Data systems", "Business workflows"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-semibold text-ice"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {about.columns.map(({ label, title, body }, i) => (
            <div
              key={label}
              className="ambient-float rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_55px_rgb(3_8_28/0.22)] backdrop-blur"
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

      <Container className="relative mt-8">
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
