import { ArrowUpRightIcon, CarFrontIcon, FactoryIcon, FlaskConicalIcon, HeartPulseIcon, LandmarkIcon, RadioTowerIcon, ShoppingBagIcon, TruckIcon, WorkflowIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { industries, industryAnchor } from "@/lib/content";
import { cn } from "@/lib/utils";

const industryIcons = [FlaskConicalIcon, FactoryIcon, LandmarkIcon, ZapIcon, HeartPulseIcon, ShoppingBagIcon, TruckIcon, RadioTowerIcon, CarFrontIcon];

const accents = [
  { text: "text-lavender", border: "border-lavender/40", bar: "bg-lavender" },
  { text: "text-gold", border: "border-gold/40", bar: "bg-gold" },
  { text: "text-mist", border: "border-mist/40", bar: "bg-mist" },
] as const;

function IndustryArtwork({ index, signal }: { index: number; signal: string }) {
  const Icon = industryIcons[index] ?? WorkflowIcon;
  const accent = accents[index % accents.length];

  return (
    <div className="relative h-44 shrink-0 overflow-hidden border-b border-line bg-elevated/40 md:h-full md:w-[60%] md:border-b-0 md:border-l" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: "linear-gradient(to right, rgba(236,238,240,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,238,240,.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <span className="absolute left-5 top-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Industry / {String(index + 1).padStart(2, "0")}
      </span>
      <svg viewBox="0 0 360 176" preserveAspectRatio="none" className={cn("absolute inset-0 size-full", accent.text)} fill="none">
        <path d="M160 120 H210 C235 120 235 72 260 72 H320" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
        <circle cx="210" cy="120" r="3" fill="currentColor" />
        <circle cx="260" cy="72" r="3" fill="currentColor" />
      </svg>
      <div className={cn("absolute right-7 top-11 flex size-20 items-center justify-center rounded-full border bg-panel/90 transition-transform duration-300 group-hover:scale-110 md:right-[12%] md:top-[20%] md:size-28", accent.border)}>
        <Icon className={cn("size-9 md:size-12", accent.text)} strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-5 left-5 w-[54%] rounded-lg border border-line bg-panel/95 px-3 py-2.5 shadow-lg md:bottom-[16%] md:left-[8%] md:w-[48%] md:p-4">
        <span className="block truncate font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{signal}</span>
        <div className="mt-2 flex h-6 items-end gap-1">
          {Array.from({ length: 12 }, (_, bar) => (
            <span
              key={bar}
              className={cn("min-w-0 flex-1 rounded-t-[2px] opacity-75", accent.bar)}
              style={{ height: `${7 + ((bar * 7 + index * 5) % 18)}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function IndustryExplorer() {
  const count = String(industries.items.length).padStart(2, "0");

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <span>Explore {count} industries</span>
        <span>Scroll to explore ↓</span>
      </div>
      <div className="relative pt-4">
      {industries.items.map(({ title, body, signals }, index) => (
        <article
          id={industryAnchor(title)}
          key={title}
          className="industry-stack-card group mb-4 min-w-0 scroll-mt-24 overflow-hidden border border-line bg-panel shadow-[0_-16px_30px_-20px_rgba(0,0,0,.7)] transition-colors target:border-lavender md:h-[320px] lg:mb-0 lg:h-[clamp(240px,35vh,320px)] lg:motion-safe:sticky"
          style={{ top: `calc(4.5rem + ${index * 2}rem)`, zIndex: index + 1 }}
        >
          <div className="flex h-8 items-center justify-between gap-3 border-b border-line bg-elevated px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <span className="shrink-0 font-mono text-[10px] font-bold text-gold">{String(index + 1).padStart(2, "0")} / {count}</span>
              <h3 className="truncate font-heading text-sm font-semibold text-mist sm:text-base">{title}</h3>
            </div>
            <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:block">Industry systems</span>
          </div>
          <div className="flex flex-col md:h-[calc(100%-2rem)] md:flex-row-reverse">
            <IndustryArtwork index={index} signal={signals[0]} />
            <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 md:w-[40%] lg:p-4 xl:p-6">
              <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">{body}</p>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-mist/65">
                {signals.map((signal) => <span key={signal}>{signal}</span>)}
              </div>
              <Link
                href="/#contact"
                className="mt-7 inline-flex w-fit items-center gap-2 border-b border-lavender pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-lavender transition-colors hover:text-mist focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender md:mt-auto"
              >
                Discuss this industry <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      ))}
      </div>
    </div>
  );
}
