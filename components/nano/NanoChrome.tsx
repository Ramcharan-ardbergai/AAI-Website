import Image from "next/image";
import { footer, site } from "@/lib/version2-content";

const links = [
  { label: "Approach", href: "#approach" },
  { label: "What we offer", href: "#offer" },
  { label: "Industries", href: "#industries" },
];

export function NanoHeader() {
  return (
    <header className="nano-header">
      <div className="nano-wrap nano-header-row">
        <a href="#about" className="nano-logo">
          <Image src="/logo.png" alt="" width={38} height={26} priority className="nano-logo-mark" />
          <span>
            ardberg<span className="nano-accent">ai</span>
          </span>
          <span className="sr-only">ardbergai home</span>
        </a>
        <nav aria-label="Main" className="nano-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="nano-btn nano-btn-small">
          Contact us
        </a>
      </div>
    </header>
  );
}

export function NanoFooter() {
  return (
    <footer className="nano-footer">
      <div className="nano-wrap nano-footer-row">
        <p>
          © {site.name} · {footer.tagline}
        </p>
        <p>
          {site.domain} · {site.location}
        </p>
      </div>
    </footer>
  );
}
