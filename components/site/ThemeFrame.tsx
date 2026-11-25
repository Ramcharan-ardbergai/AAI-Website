"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NanoFooter, NanoHeader } from "@/components/nano/NanoChrome";
import { palette1, palette3 } from "@/lib/palettes";
import { ContactChat } from "./ContactChat";
import { ContactDialog } from "./ContactDialog";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "@/components/nano/nano.css";

export function ThemeFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Palette2 is the nanobots design, with its own header, footer and colours.
  if (pathname === "/palette2") {
    return (
      <div className="nano-world flex-1">
        <NanoHeader />
        <main>{children}</main>
        <NanoFooter />
      </div>
    );
  }

  const palette = [...palette1, ...palette3].find((option) => option.href === pathname)?.slug ?? "graphite";
  const version = pathname.startsWith("/palette3") ? 3 : 1;

  return (
    <div className={`palette-${palette} flex min-h-screen flex-1 flex-col bg-background text-foreground`}>
      <Header palette={palette} version={version} />
      <main className="flex-1">{children}</main>
      <Footer />
      {version === 3 && (
        <>
          <ContactDialog palette={palette} />
          <ContactChat />
        </>
      )}
    </div>
  );
}
