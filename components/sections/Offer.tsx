import Link from "next/link";
import { ArrowUpRightIcon, HandshakeIcon, LayersIcon, UsersIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/site/Section";
import { offer } from "@/lib/content";

const icons = [LayersIcon, HandshakeIcon, UsersIcon];
const slugs = ["platforms", "partner", "embed"];

export function Offer() {
  return (
    <Section id="offer" className="bg-panel/35 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),inset_0_-1px_0_rgb(255_255_255/0.06)]">
      <Eyebrow>{offer.eyebrow}</Eyebrow>
      <ul className="mt-10 grid gap-10 md:grid-cols-3">
        {offer.items.map(({ title, body }, i) => {
          const Icon = icons[i];
          return (
            <li key={title} className="border-t-2 border-ink/70 pt-8">
              <Icon className="size-7 text-gold" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 text-3xl font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
              <Link
                href={`/prototype/${slugs[i]}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-ice transition-colors duration-150 hover:text-ink"
              >
                Content brief
                <ArrowUpRightIcon className="size-3.5" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
