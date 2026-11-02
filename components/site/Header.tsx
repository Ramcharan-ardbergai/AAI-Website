"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";

const activeNavStyles: Record<string, string> = {
  about: "bg-ice text-navy shadow-[0_6px_18px_rgb(142_197_255/0.2)] hover:bg-ice hover:text-navy",
  approach: "bg-[#6d8cff] text-white shadow-[0_6px_18px_rgb(109_140_255/0.24)] hover:bg-[#6d8cff] hover:text-white",
  offer: "bg-gold text-primary-foreground shadow-[0_6px_18px_rgb(255_200_87/0.22)] hover:bg-gold hover:text-primary-foreground",
  industries: "bg-[#6ee7b7] text-navy shadow-[0_6px_18px_rgb(110_231_183/0.2)] hover:bg-[#6ee7b7] hover:text-navy",
  blog: "bg-[#f9a8d4] text-navy shadow-[0_6px_18px_rgb(249_168_212/0.2)] hover:bg-[#f9a8d4] hover:text-navy",
  contact: "bg-[#f0abfc] text-navy shadow-[0_6px_18px_rgb(240_171_252/0.2)] hover:bg-[#f0abfc] hover:text-navy",
};

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
    <header className="sticky top-0 z-40 h-14 border-b border-white/10 bg-[#081538]/78 shadow-[0_10px_40px_rgb(3_8_28/0.26)] backdrop-blur-xl">
      <Container className="flex h-full items-center justify-between">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] lg:flex">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-white/[0.06] hover:text-ink focus-visible:outline-2 focus-visible:outline-gold xl:px-3",
                active === id && activeNavStyles[id],
              )}
            >
              {label}
            </a>
          ))}
          <a
            href="/version-2"
            className="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-white/[0.06] hover:text-ink focus-visible:outline-2 focus-visible:outline-gold xl:px-3"
          >
            Version 2
          </a>
        </nav>

        <Sheet>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="px-6 pt-6 font-heading text-lg text-ink">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col px-3">
              {nav.map(({ id, label }) => (
                <SheetClose
                  key={id}
                  render={<a href={`#${id}`} />}
                  className="rounded-md px-3 py-3 text-base text-ink hover:bg-secondary focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {label}
                </SheetClose>
              ))}
              <SheetClose
                render={<a href="/version-2" />}
                className="rounded-md px-3 py-3 text-base text-ink hover:bg-secondary focus-visible:outline-2 focus-visible:outline-gold"
              >
                Version 2
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
