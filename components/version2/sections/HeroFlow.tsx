"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { Container } from "@/components/version2/site/Container";
import { industryIcons } from "@/components/version2/sections/IndustryOrbit";
import { about, contact, industries } from "@/lib/version2-content";
import { cn } from "@/lib/utils";
import { startFlowField } from "./flow-field";
import { startNeuralField } from "./neural-field";
import "./HeroFlow.css";

const inputs = ["Data", "Models", "Systems"];
const words = about.title.split(" ");
const accent = "connected intelligence";
const accentAt = about.lead.indexOf(accent);
const motionQuery = "(prefers-reduced-motion: reduce)";
const allowsMotion = () => !window.matchMedia(motionQuery).matches;
const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function HeroFlow() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const network = useRef<HTMLCanvasElement>(null);
  const pipeline = useRef<ReturnType<typeof startFlowField> | null>(null);
  const explorer = useRef<HTMLDivElement>(null);
  // -1 is the overview; 0 and up is an industry travelling through the pipeline.
  const [active, setActive] = useState(-1);
  const [picked, setPicked] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const motion = useSyncExternalStore(subscribeMotion, allowsMotion, () => false);
  const touring = motion && inView && !picked && !held;
  const industry = industries.items[active];
  const labels: readonly string[] = industry?.signals ?? inputs;
  const Icon = industryIcons[active];

  useEffect(() => {
    if (!canvas.current) return;
    const flow = startFlowField(canvas.current);
    pipeline.current = flow;
    return flow.stop;
  }, []);

  useEffect(() => (network.current ? startNeuralField(network.current) : undefined), []);

  useEffect(() => {
    if (!explorer.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(explorer.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!touring) return;
    const timer = window.setTimeout(() => {
      setActive((current) => ((current + 2) % (industries.items.length + 1)) - 1);
      pipeline.current?.burst();
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [touring, active]);

  const explore = (index: number) => {
    setActive(index);
    setPicked(true);
    pipeline.current?.burst();
  };

  return (
    <section id="about" className="relative isolate overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-flow-grid absolute inset-0" />
        <div className="hero-flow-aurora absolute -left-40 -top-40 size-[38rem] rounded-full bg-lavender/20 blur-[110px]" />
        <div className="hero-flow-aurora hero-flow-aurora-late absolute -right-40 top-10 size-[34rem] rounded-full bg-gold/10 blur-[110px]" />
      </div>

      <canvas ref={network} className="hero-flow-network pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] w-full" aria-hidden="true" />

      <Container className="pt-10 text-center sm:pt-12">
        <p className="hero-flow-rise mx-auto flex w-fit items-center gap-2.5 rounded-full border border-line bg-panel/70 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-lavender opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-lavender" />
          </span>
          AI &amp; software engineering
        </p>

        <h1 aria-label={about.title} className="mx-auto mt-6 max-w-5xl font-heading text-[2.75rem] font-bold leading-[1.05] tracking-[-0.05em] text-mist sm:text-7xl lg:text-[5.5rem]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden="true">
              <span className="hero-flow-rise inline-block" style={{ animationDelay: `${120 + i * 110}ms` }}>
                {i === words.length - 1 ? <span className="hero-flow-shine">{word}</span> : word}
              </span>{" "}
            </span>
          ))}
        </h1>

        <p className="hero-flow-rise mx-auto mt-6 max-w-2xl font-serif text-2xl leading-snug text-mist sm:text-3xl" style={{ animationDelay: "700ms" }}>
          {accentAt < 0 ? about.lead : (
            <>
              {about.lead.slice(0, accentAt)}
              <span className="hero-flow-shine">{accent}</span>
              {about.lead.slice(accentAt + accent.length)}
            </>
          )}
        </p>

        <div className="hero-flow-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "850ms" }}>
          <a href="#contact" className="hero-flow-cta group relative inline-flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-full bg-lavender px-7 font-semibold text-graphite transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
            {contact.cta} <ArrowUpRightIcon className="size-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
          </a>
          <a href="#approach" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-line bg-panel/60 px-7 font-semibold text-mist backdrop-blur transition-colors hover:border-lavender focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender">
            Our approach <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <div ref={explorer}>
        <div className="hero-flow-rise relative mt-3 h-[300px] sm:h-[340px]" style={{ animationDelay: "1000ms" }} aria-hidden="true">
          <canvas ref={canvas} className="absolute inset-0 size-full" />
          {labels.map((input, i) => (
            <span key={i} className="hero-flow-float absolute left-[4%] -translate-y-1/2 sm:left-[7%]" style={{ top: `${20 + i * 30}%`, animationDelay: `${i * -1.6}s` }}>
              <span key={input} className="block rounded-full border border-line bg-panel/90 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-mist shadow-lg animate-in fade-in slide-in-from-left-4 duration-500 sm:px-4 sm:py-2 sm:text-xs">
                {input}
              </span>
            </span>
          ))}
          <div className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:size-36">
            <span className="hero-flow-halo absolute inset-0 rounded-full" />
            <span className="absolute inset-1 rounded-full bg-graphite" />
            {/* The ardbergai mark always stays at the centre; it pops with each change. */}
            <span key={active} className="hero-flow-mark relative h-10 w-16 bg-mist animate-in zoom-in-75 duration-500 sm:h-16 sm:w-24" />
          </div>
          <span className="hero-flow-float absolute -top-1 right-[4%] sm:right-[7%]">
            <span key={active} className="flex items-center gap-3 rounded-2xl border border-lavender/50 bg-panel/90 px-4 py-2.5 text-right shadow-lg animate-in fade-in slide-in-from-right-4 duration-500">
              {Icon && <Icon className="size-6 shrink-0 text-lavender" strokeWidth={1.5} />}
              <span>
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-gold">{industry ? "Connected for" : "One system"}</span>
                <span className="block font-heading text-sm font-semibold text-mist sm:text-base">{industry?.title ?? "Connected intelligence"}</span>
              </span>
            </span>
          </span>
        </div>

        <Container className="pb-10 pt-4 text-center">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Explore what we connect</p>
          <div role="group" aria-label="Explore industries" onPointerEnter={(event) => event.pointerType === "mouse" && setHeld(true)} onPointerLeave={() => setHeld(false)} className="mt-3 flex gap-2 overflow-x-auto p-1 sm:flex-wrap sm:justify-center">
            {[-1, ...industries.items.map((_, i) => i)].map((index) => (
              <button
                key={index}
                type="button"
                aria-pressed={active === index}
                onClick={() => explore(index)}
                className={cn("relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender", active === index ? "border-lavender bg-lavender text-graphite" : "border-line bg-panel/70 text-mist hover:border-lavender")}
              >
                {industries.items[index]?.title ?? "Overview"}
                {touring && active === index && <span className="hero-flow-timer absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold" aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div aria-live={picked ? "polite" : "off"} className="mx-auto mt-4 min-h-14 max-w-2xl">
            <p key={active} className="text-base leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500">
              {industry?.body ?? about.columns[1].body}
            </p>
          </div>
        </Container>
      </div>

      <Container className="pb-14">
        <div className="grid gap-3 border-t border-line pt-6 md:grid-cols-3">
          {about.columns.map(({ label, title, body }, index) => (
            <div key={label} className="hero-flow-card group relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-lavender/60">
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lavender transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                0{index + 1} · {label}
              </p>
              <h2 className="mt-5 max-w-[17ch] font-heading text-2xl font-semibold leading-tight text-mist">{title}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <a href="#intro" className="mx-auto mt-10 flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-lavender focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
          {about.scrollLabel} <ArrowDownIcon className="size-4 motion-safe:animate-bounce" aria-hidden="true" />
        </a>
      </Container>
    </section>
  );
}
