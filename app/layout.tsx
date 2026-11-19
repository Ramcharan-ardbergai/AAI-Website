import type { Metadata } from "next";
import { Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import { ThemeFrame } from "@/components/site/ThemeFrame";
import "./globals.css";

const display = Schibsted_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono-nano", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ardbergai - Where intelligence becomes impact",
  // TODO: placeholder description
  description: "Custom AI and software engineering for every industry. Based in Hyderabad, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${mono.variable}`}>
      <body>
        <ThemeFrame>{children}</ThemeFrame>
      </body>
    </html>
  );
}
