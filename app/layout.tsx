import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DM_Sans,
  Geist_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
  Schibsted_Grotesk,
} from "next/font/google";
import { ThemeFrame } from "@/components/site/ThemeFrame";
import "./globals.css";

const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
// Palette2 (nanobots) fonts.
const display = Schibsted_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const nanoMono = Geist_Mono({ variable: "--font-mono-nano", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ardbergai - Where intelligence becomes impact",
  // TODO: placeholder description
  description: "Custom AI and software engineering for every industry. Based in Hyderabad, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${ibmPlexSans.variable} ${dmSans.variable} ${manrope.variable} ${jetbrainsMono.variable} ${display.variable} ${nanoMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <ThemeFrame>{children}</ThemeFrame>
        </Suspense>
      </body>
    </html>
  );
}
