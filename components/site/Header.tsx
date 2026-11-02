"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowUpRightIcon, ChevronDownIcon, ChevronRightIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SiteSearch } from "./SiteSearch";

type Group = (typeof navGroups)[number];
type Destination = Group["items"][number];

const sectionIds = navGroups.flatMap((group) => [
  ...(group.featured?.id ? [group.featured.id] : []),
  ...group.items.flatMap((item) => item.id ? [item.id] : []),
]);

function useActiveSection(pathname: string) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

function MenuLink({ item, onClick, featured = false }: { item: Destination; onClick: () => void; featured?: boolean }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group/link flex items-start justify-between gap-4 rounded-lg px-4 py-3 text-mist transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender",
        featured && "min-h-40 flex-col bg-gradient-to-br from-elevated via-panel to-lavender/20 p-6 hover:bg-elevated",
      )}
    >
      <span>
        <span className={cn("block font-medium", featured && "font-heading text-xl font-semibold text-mist")}>{item.label}</span>
        {item.description && <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.description}</span>}
      </span>
      <ArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
    </Link>
  );
}

function DesktopPanel({ group, close }: { group: Group; close: () => void }) {
  return (
    <div id={`nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")}`} className="absolute inset-x-0 top-full hidden pt-2 lg:block">
      <Container>
        <nav
          aria-label={`${group.label} links`}
          className={cn(
            "overflow-hidden rounded-xl border border-line bg-panel p-2 shadow-2xl",
            group.variant === "wide" ? "grid grid-cols-[minmax(16rem,19rem)_1fr]" : "ml-auto w-80",
          )}
        >
          {group.featured && <MenuLink item={group.featured} onClick={close} featured />}
          <div className="p-3">
            <p className="px-4 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{group.eyebrow}</p>
            <div className={cn(group.variant === "wide" && "grid grid-cols-2 gap-x-2", group.label === "Industries" && "grid-cols-3")}>
              {group.items.map((item) => <MenuLink key={item.href} item={item} onClick={close} />)}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const suppressFocusOpen = useRef(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const selectedGroup = navGroups.find((group) => group.label === openGroup);
  const selectedMobileGroup = navGroups.find((group) => group.label === mobileGroup);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const pageContent = [document.querySelector("main"), document.querySelector("footer")].filter((element): element is HTMLElement => element instanceof HTMLElement);
    const previousInert = pageContent.map((element) => element.inert);
    document.body.style.overflow = "hidden";
    pageContent.forEach((element) => { element.inert = true; });
    return () => {
      document.body.style.overflow = previousOverflow;
      pageContent.forEach((element, index) => { element.inert = previousInert[index]; });
    };
  }, [mobileOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setMobileOpen(false);
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  function closeMobile(restoreFocus = false) {
    setMobileOpen(false);
    setMobileGroup(null);
    if (restoreFocus) window.setTimeout(() => document.querySelector<HTMLButtonElement>('button[aria-label="Open menu"]')?.focus(), 50);
  }

  function openMobileGroup(label: string) {
    setMobileGroup(label);
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>("#mobile-navigation [data-mobile-back]")?.focus());
  }

  function backToMobileGroups() {
    const previousGroup = mobileGroup;
    setMobileGroup(null);
    requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>(`#mobile-navigation [data-mobile-group="${previousGroup}"]`)?.focus();
    });
  }

  function trapMobileFocus(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !mobileOpen) return;
    const focusable = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])
      .filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  function openSearch() {
    setOpenGroup(null);
    closeMobile();
    setSearchOpen(true);
  }

  function isCurrent(group: Group) {
    const items = [...(group.featured ? [group.featured] : []), ...group.items];
    return items.some((item) => item.href === pathname || (pathname === "/" && item.id === activeSection));
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-line bg-graphite"
        onMouseLeave={() => setOpenGroup(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            if (openGroup) {
              const trigger = headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu-group="${openGroup}"]`);
              suppressFocusOpen.current = true;
              requestAnimationFrame(() => {
                trigger?.focus();
                suppressFocusOpen.current = false;
              });
            }
            setOpenGroup(null);
            if (mobileOpen) closeMobile(true);
          }
          trapMobileFocus(event);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpenGroup(null);
        }}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => {
              const expanded = openGroup === group.label;
              return (
                <button
                  key={group.label}
                  data-menu-group={group.label}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={expanded ? `nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")}` : undefined}
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onFocus={() => {
                    if (!suppressFocusOpen.current) setOpenGroup(group.label);
                  }}
                  onClick={(event) => {
                    setOpenGroup(group.label);
                    if (event.detail === 0) {
                      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")} a`)?.focus());
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setOpenGroup(group.label);
                      requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-panel-${group.label.toLowerCase().replaceAll(" ", "-")} a`)?.focus());
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-mist focus-visible:outline-2 focus-visible:outline-lavender",
                    (expanded || isCurrent(group)) && "text-lavender",
                  )}
                >
                  {group.label}
                  <ChevronDownIcon className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")} aria-hidden />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Search site"
              onClick={openSearch}
              className="hidden size-10 items-center justify-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-lavender hover:text-lavender focus-visible:outline-2 focus-visible:outline-lavender lg:flex"
            >
              <SearchIcon className="size-4" aria-hidden />
            </button>
            <Link href="/#contact" onClick={() => setOpenGroup(null)} className="rounded-full bg-lavender px-4 py-2.5 text-sm font-semibold text-graphite transition-colors hover:bg-lavender/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender sm:px-5">
              Let&apos;s talk
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={mobileOpen ? "mobile-navigation" : undefined}
              onClick={() => {
                if (mobileOpen) closeMobile(true);
                else {
                  setMobileOpen(true);
                  requestAnimationFrame(() => document.querySelector<HTMLButtonElement>("#mobile-navigation nav[aria-label='Mobile'] button")?.focus());
                }
              }}
              className="flex size-10 items-center justify-center rounded-md text-mist focus-visible:outline-2 focus-visible:outline-lavender lg:hidden"
            >
              {mobileOpen ? <XIcon className="size-5" aria-hidden /> : <MenuIcon className="size-5" aria-hidden />}
            </button>
          </div>
        </Container>

        {selectedGroup && <DesktopPanel group={selectedGroup} close={() => setOpenGroup(null)} />}

        {mobileOpen && (
          <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-graphite lg:hidden">
            <Container className="py-5">
              {selectedMobileGroup ? (
                <>
                  <button data-mobile-back type="button" onClick={backToMobileGroups} className="mb-6 flex items-center gap-3 rounded-md py-2 text-sm font-semibold uppercase tracking-[0.15em] text-lavender focus-visible:outline-2 focus-visible:outline-lavender">
                    <ArrowLeftIcon className="size-4" aria-hidden />
                    {selectedMobileGroup.label}
                  </button>
                  <nav aria-label={`${selectedMobileGroup.label} links`} className="space-y-1">
                    {selectedMobileGroup.featured && <MenuLink item={selectedMobileGroup.featured} onClick={closeMobile} featured />}
                    <p className="px-4 pb-2 pt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{selectedMobileGroup.eyebrow}</p>
                    {selectedMobileGroup.items.map((item) => <MenuLink key={item.href} item={item} onClick={closeMobile} />)}
                  </nav>
                </>
              ) : (
                <nav aria-label="Mobile" className="divide-y divide-line">
                  {navGroups.map((group) => (
                    <button
                      key={group.label}
                      data-mobile-group={group.label}
                      type="button"
                      onClick={() => openMobileGroup(group.label)}
                      className="flex w-full items-center justify-between py-5 text-left text-lg font-medium text-mist focus-visible:outline-2 focus-visible:outline-lavender"
                    >
                      {group.label}
                      <ChevronRightIcon className="size-5" aria-hidden />
                    </button>
                  ))}
                  <button type="button" onClick={openSearch} className="flex w-full items-center gap-3 py-5 text-left text-lg font-medium text-mist focus-visible:outline-2 focus-visible:outline-lavender">
                    <SearchIcon className="size-5" aria-hidden />
                    Search site
                  </button>
                </nav>
              )}
            </Container>
          </div>
        )}
      </header>

      {openGroup && <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => setOpenGroup(null)} className="fixed inset-0 z-40 hidden cursor-default bg-black/50 backdrop-blur-sm lg:block" />}
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
