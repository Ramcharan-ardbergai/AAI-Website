import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono, Lora, Space_Grotesk } from "next/font/google";
import { ThemeFrame } from "@/components/site/ThemeFrame";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });

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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${lora.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={null}>
          <ThemeFrame>{children}</ThemeFrame>
        </Suspense>
      </body>
    </html>
  );
}
