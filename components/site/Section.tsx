import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = React.ComponentProps<"section"> & {
  id: string;
  /** dark = navy background with light text */
  tone?: "light" | "dark";
};

export function Section({ tone = "light", className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-20 sm:py-28", tone === "dark" && "bg-navy text-white", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Small mono label above a section title. */
export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground", className)}
      {...props}
    />
  );
}
