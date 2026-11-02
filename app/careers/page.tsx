import type { Metadata } from "next";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
  title: "Careers | ardbergai",
  description: "Explore careers at ardbergai.",
};

export default function CareersPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Careers</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Open roles will be posted here soon.</p>
      </Container>
    </section>
  );
}
