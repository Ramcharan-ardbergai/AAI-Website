"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, ChevronDownIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/version2/site/Container";
import { navGroups } from "@/lib/version2-content";
import { palettes, type PaletteSlug } from "@/lib/palettes";
import { Logo } from "./Logo";

function closeMenu(event: React.MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

function sectionHref(destination: { href: string; id?: string }) {
  return destination.id ? `#${destination.id}` : destination.href;
}

export function Header({ palette }: { palette: PaletteSlug }) {
  const [sectionHash, setSectionHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setSectionHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-graphite/95 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
            <details key={group.label} name="site-nav" className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-mist/80 transition-colors hover:bg-elevated hover:text-mist focus-visible:outline-2 focus-visible:outline-lavender [&::-webkit-details-marker]:hidden">
                {group.label}
                <ChevronDownIcon className="size-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className={`absolute top-[calc(100%+0.75rem)] rounded-xl border border-line bg-panel p-5 shadow-2xl ${group.variant === "wide" ? "left-1/2 w-[min(38rem,85vw)] -translate-x-1/2" : "right-0 w-64"}`}>
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">{group.eyebrow}</p>
                {group.featured && (
                  <Link href={sectionHref(group.featured)} onClick={closeMenu} className="mb-3 block rounded-lg border border-lavender/25 bg-lavender/10 p-3 transition-colors hover:bg-lavender/15 focus-visible:outline-2 focus-visible:outline-lavender">
                    <span className="block text-sm font-semibold text-mist">{group.featured.label}</span>
                    {group.featured.description && <span className="mt-1 block text-xs text-muted-foreground">{group.featured.description}</span>}
                  </Link>
                )}
                <div className={group.items.length > 4 ? "grid grid-cols-2 gap-1" : "grid gap-1"}>
                  {group.items.map((item) => (
                    <Link key={item.href} href={sectionHref(item)} onClick={closeMenu} className="rounded-lg px-3 py-2.5 transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
                      <span className="block text-sm font-medium text-mist">{item.label}</span>
                      {item.description && <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          ))}
          <details name="site-nav" className="group relative">
            <summary onClick={() => setSectionHash(window.location.hash)} className="flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-mist/80 transition-colors hover:bg-elevated hover:text-mist focus-visible:outline-2 focus-visible:outline-lavender [&::-webkit-details-marker]:hidden">
              <span className="size-3 rounded-full border border-line bg-lavender" aria-hidden="true" />
              Palettes
              <ChevronDownIcon className="size-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-xl border border-line bg-panel p-3 shadow-2xl">
              <p className="px-2 pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Explore colours</p>
              {palettes.map((option) => (
                <Link key={option.slug} href={`${option.href}${sectionHash}`} onClick={closeMenu} aria-current={palette === option.slug ? "page" : undefined} className="block rounded-lg px-2 py-2.5 transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-mist">
                    {option.name}
                    {palette === option.slug && <CheckIcon className="size-4 text-lavender" aria-hidden="true" />}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">{option.description}</span>
                  <span className="mt-2 flex gap-1" aria-hidden="true">
                    {option.swatches.map((swatch) => <span key={swatch.name} className="h-3 flex-1 rounded-sm border border-line" style={{ backgroundColor: swatch.hex }} />)}
                  </span>
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <Link href="#contact" className="hidden min-h-10 items-center gap-2 rounded-lg bg-lavender px-4 text-sm font-semibold text-graphite transition-colors hover:bg-[var(--lavender-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender lg:inline-flex">
          Contact us <ArrowUpRightIcon className="size-4" aria-hidden="true" />
        </Link>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger onClick={() => setSectionHash(window.location.hash)} render={<Button variant="ghost" size="icon" className="text-mist lg:hidden" aria-label="Open menu" />}>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto border-line">
            <SheetTitle className="px-6 pt-6 font-heading text-lg text-mist">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col gap-4 px-6 pb-8">
              <div className="border-b border-line pb-4">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">Colour palettes</p>
                {palettes.map((option) => (
                  <Link key={option.slug} href={`${option.href}${sectionHash}`} onClick={() => setMobileOpen(false)} aria-current={palette === option.slug ? "page" : undefined} className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-mist hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
                    <span className="flex items-center gap-2"><span className="size-3 rounded-full border border-line" style={{ backgroundColor: option.swatches[2].hex }} aria-hidden="true" />{option.name}</span>
                    {palette === option.slug && <CheckIcon className="size-4 text-lavender" aria-hidden="true" />}
                  </Link>
                ))}
              </div>
              {navGroups.map((group) => (
                <div key={group.label} className="border-b border-line pb-4">
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">{group.label}</p>
                  {group.featured && (
                    <Link href={sectionHref(group.featured)} onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-sm font-medium text-mist hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
                      {group.featured.label}
                    </Link>
                  )}
                  {group.items.map((item) => (
                    <Link key={item.href} href={sectionHref(item)} onClick={() => setMobileOpen(false)} className="block rounded-lg px-2 py-2 text-sm text-mist hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href="#contact" onClick={() => setMobileOpen(false)} className="rounded-lg bg-lavender px-4 py-3 text-center text-sm font-semibold text-graphite">
                Contact us
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
