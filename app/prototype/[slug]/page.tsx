import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CheckCircle2Icon } from "lucide-react";
import { Container } from "@/components/site/Container";
import { getPrototypePage, prototypePages } from "@/lib/prototype-content";

export function generateStaticParams() {
  return prototypePages.map(({ slug }) => ({ slug }));
}

export default async function PrototypeDetail({ params }: PageProps<"/prototype/[slug]">) {
  const { slug } = await params;
  const page = getPrototypePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeftIcon className="size-4" aria-hidden />
          Back to prototype
        </Link>

        <section className="mt-10 rounded-lg border border-white/10 bg-panel/80 p-6 shadow-[0_24px_70px_rgb(3_8_28/0.28)] sm:p-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{page.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{page.purpose}</p>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold">Content needed</h2>
            <ul className="mt-5 grid gap-3">
              {page.contentNeeds.map((item) => (
                <li key={item} className="flex gap-3 rounded-md border border-white/10 bg-panel/45 p-3 text-sm leading-7 text-muted-foreground">
                  <CheckCircle2Icon className="mt-1 size-4 shrink-0 text-ice" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-dashed border-ice/35 bg-white/[0.035] p-6">
            <h2 className="text-2xl font-bold">How much content</h2>
            <ul className="mt-5 space-y-3">
              {page.lengthGuide.map((item) => (
                <li key={item} className="text-sm leading-7 text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
}
