import type { ReactNode } from "react";
import { NanoFooter, NanoHeader } from "@/components/nano/NanoChrome";
import "@/components/nano/nano.css";

/** One look for every route (the /palette pages render the same site). */
export function ThemeFrame({ children }: { children: ReactNode }) {
  return (
    <div className="nano-world">
      <NanoHeader />
      <main>{children}</main>
      <NanoFooter />
    </div>
  );
}
