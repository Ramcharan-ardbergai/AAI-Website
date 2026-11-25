import Link from "next/link";
import { footer, site } from "@/lib/version2-content";
import { ThemePicker } from "./ThemePicker";

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
          {/* The PNG is used as a stencil so the mark takes the theme's Logo colour. */}
          <span className="nano-logo-mark" aria-hidden="true" />
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
        <div className="nano-header-actions">
          <Link href="/" className="nano-theme-trigger nano-back">
            Palette1
          </Link>
          <ThemePicker />
          <a href="#contact" className="nano-btn nano-btn-small">
            Contact us
          </a>
        </div>
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
