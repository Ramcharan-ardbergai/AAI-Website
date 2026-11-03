import { footer, site } from "@/lib/version2-content";
import { Container } from "@/components/version2/site/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-graphite py-8">
      <Container className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.name} · {footer.tagline}
        </p>
        <p>
          {site.domain} · {site.location}
        </p>
      </Container>
    </footer>
  );
}
