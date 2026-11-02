import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { Container } from "@/components/site/Container";
import { about, contact } from "@/lib/content";
import "./About.css";

const inputs = ["Data", "Models", "Systems"];
const asciiField = Array.from({ length: 48 }, (_, row) =>
  Array.from({ length: 210 }, (_, column) => {
    const progress = column / 209;
    const bend = Math.sin(column / 17) * 0.7;
    const streams = [7 + 16 * progress + bend, 24 + Math.sin(column / 26), 41 - 16 * progress - bend];
    const distance = Math.min(...streams.map((stream) => Math.abs(row - stream)));
    const pattern = (column * 31 + row * 17 + column * row * 3) % 43;

    if (distance < 0.8 && pattern % 9 !== 0) return "01+=/-"[pattern % 6];
    if (distance < 2.3 && pattern % 5 === 0) return ".";
    return pattern === 0 || pattern === 23 ? "." : " ";
  }).join(""),
).join("\n");

function HeroArtwork() {
  return (
    <div
      className="relative h-[360px] overflow-hidden rounded-[2rem] border border-line bg-panel shadow-[0_30px_90px_-55px_rgba(164,127,227,.5)] sm:h-[440px] xl:h-[480px]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: "linear-gradient(to right, rgba(236,238,240,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,238,240,.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="hero-panel-glow absolute -right-24 top-12 size-80 rounded-full bg-lavender/15 blur-3xl" />
      <div className="absolute left-6 top-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold sm:left-8 sm:top-8">
        From complexity
      </div>

      <svg viewBox="0 0 500 480" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none">
        <path d="M188 154 H222 C250 154 250 240 282 240" stroke="var(--lavender)" strokeWidth="2" opacity=".7" />
        <path d="M188 240 H282" stroke="var(--lavender)" strokeWidth="2" opacity=".7" />
        <path d="M188 326 H222 C250 326 250 240 282 240" stroke="var(--lavender)" strokeWidth="2" opacity=".7" />
        <circle cx="282" cy="240" r="5" fill="var(--gold)" />
        <circle className="hero-signal-dot" r="4" fill="var(--gold)" opacity="0">
          <animateMotion path="M188 154 H222 C250 154 250 240 282 240" dur="11s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;.95;.95;0" dur="11s" repeatCount="indefinite" />
        </circle>
        <circle className="hero-signal-dot" r="4" fill="var(--gold)" opacity="0">
          <animateMotion path="M188 240 H282" dur="11s" begin="3.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;.95;.95;0" dur="11s" begin="3.7s" repeatCount="indefinite" />
        </circle>
        <circle className="hero-signal-dot" r="4" fill="var(--gold)" opacity="0">
          <animateMotion path="M188 326 H222 C250 326 250 240 282 240" dur="11s" begin="7.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;.95;.95;0" dur="11s" begin="7.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {inputs.map((input, index) => (
        <div
          key={input}
          className="absolute left-[6%] flex h-12 w-[36%] -translate-y-1/2 items-center gap-3 rounded-xl border border-line bg-elevated/95 px-3 shadow-lg sm:h-14 sm:px-4"
          style={{ top: `${32 + index * 18}%` }}
        >
          <span className="font-mono text-[10px] font-bold text-gold">0{index + 1}</span>
          <span className="font-heading text-sm font-semibold text-mist sm:text-base">{input}</span>
        </div>
      ))}

      <div className="absolute right-[5%] top-1/2 flex aspect-square w-[42%] -translate-y-1/2 flex-col items-center justify-center rounded-full border border-lavender/60 bg-graphite text-center shadow-[0_0_80px_-20px_rgba(164,127,227,.55)]">
        <div className="absolute inset-3 rounded-full border border-dashed border-lavender/30" />
        <span className="relative font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[10px]">One system</span>
        <span className="relative mt-2 font-heading text-sm font-bold leading-tight text-mist sm:text-xl lg:text-2xl">
          Connected<br />intelligence
        </span>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-lavender sm:bottom-8 sm:right-8">
        Real capability <ArrowUpRightIcon className="size-3.5" />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] overflow-hidden" aria-hidden="true">
        <pre className="hero-ascii-field absolute left-0 top-0 m-0 select-none">{asciiField}</pre>
        <div className="hero-background-glow absolute -left-32 top-32 size-[32rem] rounded-full bg-lavender/[0.06] blur-3xl" />
        <div className="hero-background-glow hero-background-glow-offset absolute right-[8%] top-0 size-[28rem] rounded-full bg-lavender/[0.05] blur-3xl" />
      </div>
      <Container className="relative pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-16 xl:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <p className="mb-7 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              AI &amp; software engineering
            </p>
            <h1 className="max-w-[12ch] font-heading text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-mist sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
              {about.title}
            </h1>
            <p className="mt-7 max-w-xl font-serif text-xl leading-snug text-lavender sm:text-2xl lg:text-[1.75rem]">
              {about.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-lavender px-5 font-semibold text-graphite transition-colors hover:bg-lavender/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
                {contact.cta} <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </a>
              <a href="#approach" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line px-5 font-semibold text-mist transition-colors hover:border-lavender hover:bg-lavender/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
                Our approach <ArrowDownIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <HeroArtwork />
        </div>

        <div className="mt-16 grid gap-3 border-t border-line pt-6 md:grid-cols-3 lg:mt-20">
          {about.columns.map(({ label, title, body }, index) => (
            <div key={label} className="rounded-2xl border border-line bg-panel/70 p-6 transition-colors hover:border-lavender/50 hover:bg-elevated/70">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                0{index + 1} · {label}
              </p>
              <h2 className="mt-5 max-w-[17ch] font-heading text-2xl font-semibold leading-tight text-mist">{title}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <a href="#intro" className="mx-auto mt-10 flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-lavender focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
          {about.scrollLabel} <ArrowDownIcon className="size-4" aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
