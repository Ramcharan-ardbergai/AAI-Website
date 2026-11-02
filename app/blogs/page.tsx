import type { Metadata } from "next";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
  title: "Blogs | ardbergai",
  description: "Read updates and articles from ardbergai.",
};

export default function BlogsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Blogs</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">Articles are coming soon.</p>
      </Container>
    </section>
  );
}
