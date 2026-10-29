"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";

/** Id of the section currently crossing the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Header() {
  const active = useActiveSection();

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-cream/90 backdrop-blur">
      <Container className="flex h-full items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-navy",
                active === id && "font-semibold text-navy",
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="px-6 pt-6 font-heading text-lg text-navy">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col px-3">
              {nav.map(({ id, label }) => (
                <SheetClose
                  key={id}
                  render={<a href={`#${id}`} />}
                  className="rounded-md px-3 py-3 text-base text-ink hover:bg-secondary focus-visible:outline-2 focus-visible:outline-navy"
                >
                  {label}
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
