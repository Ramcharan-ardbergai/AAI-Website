import Link from "next/link";
import { ArrowUpRightIcon, BookOpenTextIcon } from "lucide-react";
import { Eyebrow, Section } from "@/components/site/Section";
import { blog } from "@/lib/content";

export function Blog() {
  return (
    <Section id="blog" className="bg-panel/35 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),inset_0_-1px_0_rgb(255_255_255/0.06)]">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <Eyebrow>{blog.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{blog.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">{blog.lead}</p>
          <div className="mt-8 rounded-lg border border-dashed border-ice/35 bg-white/[0.035] p-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ice">Content guide</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Prepare 1 featured article and 3 supporting posts. Each post needs a category, title, 2-3 line summary,
              read time, and optional image later.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <Link
            href="/prototype/blog-featured"
            className="block rounded-lg border border-white/10 bg-panel/80 p-6 shadow-[0_24px_70px_rgb(3_8_28/0.26)] transition-[border-color,scale] duration-150 hover:border-ice/45 active:scale-[0.96] sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-ice/12 px-3 py-1 text-xs font-semibold text-ice">
                <BookOpenTextIcon className="size-3.5" aria-hidden />
                Featured
              </span>
              <span className="font-mono text-xs text-muted-foreground">{blog.featured.readTime}</span>
            </div>
            <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
              {blog.featured.category}
            </p>
            <h3 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-ink">{blog.featured.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{blog.featured.summary}</p>
          </Link>

          <div className="grid gap-4 md:grid-cols-3">
            {blog.items.map((item) => (
              <Link
                key={item.title}
                href="/prototype/blog-supporting"
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition-[border-color,scale] duration-150 hover:border-ice/45 active:scale-[0.96]"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ice">{item.category}</p>
                  <ArrowUpRightIcon className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.summary}</p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
