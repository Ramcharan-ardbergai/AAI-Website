"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { palettes } from "@/lib/palettes";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function ThemeFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const palette = palettes.find((option) => option.href === pathname)?.slug ?? "graphite";

  return (
    <div className={`palette-${palette} flex min-h-screen flex-1 flex-col bg-background text-foreground`}>
      <Header palette={palette} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
