import { about, contact, industries, intro, offer, site } from "@/lib/version2-content";
import { ApproachScene } from "./ApproachScene";
import { IndustryPicker } from "./IndustryPicker";
import { SwarmCanvas } from "./SwarmCanvas";

// "We turn it into connected intelligence." with the solution phrase accented.
const accentAt = about.lead.indexOf("connected intelligence");
const leadStart = accentAt > 0 ? about.lead.slice(0, accentAt) : "";
const leadEnd = accentAt > 0 ? about.lead.slice(accentAt) : about.lead;

export function NanoHome() {
  return (
    <>
      <SwarmCanvas />

      {/* Hero: the swarm holds a living sphere of connected intelligence. */}
      <section id="about" className="nano-hero">
        <div className="nano-wrap nano-hero-grid">
          <div className="nano-hero-copy">
            {/* The situation sets up the line; the solution is the headline. */}
            <p className="nano-situation">{about.title}</p>
            <h1 className="nano-h1 nano-hero-title">
              {leadStart}
              <span className="nano-accent">{leadEnd}</span>
            </h1>
            <div className="nano-actions">
              <a href="#contact" className="nano-btn">
                {contact.cta} <span aria-hidden="true">→</span>
              </a>
              <a href="#approach" className="nano-btn nano-btn-ghost">
                Our approach <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div data-swarm="sphere" className="nano-hero-stage" aria-hidden="true" />
        </div>
        <ul className="nano-wrap nano-ribbon">
          {about.columns.map(({ label, title, body }) => (
            <li key={label}>
              <span className="nano-label">{label}</span>
              <strong>{title}</strong>
              <span>{body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Intro: life sciences, told by a helix. */}
      <section id="intro" className="nano-section">
        <div className="nano-wrap nano-intro">
          <div>
            <p className="nano-label">{intro.eyebrow}</p>
            <h2 className="nano-h2 nano-intro-title">{intro.title}</h2>
            <p className="nano-lead nano-intro-body">{intro.body}</p>
          </div>
          <div data-swarm="helix" className="nano-intro-stage" aria-hidden="true" />
        </div>
      </section>

      <ApproachScene />

      {/* Offer: three formations, one per way of working. */}
      <section id="offer" className="nano-section">
        <div className="nano-wrap">
          <p className="nano-label">{offer.eyebrow}</p>
          <h2 className="nano-h2">{offer.title}</h2>
          <ul data-swarm="offer" className="nano-offer">
            {offer.items.map(({ title, body }, i) => (
              <li key={title}>
                <div data-swarm-anchor={`o${i}`} className="nano-offer-stage" aria-hidden="true" />
                <h3>{title}</h3>
                <p className="nano-body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="industries" className="nano-section">
        <div className="nano-wrap">
          <div className="nano-industries-head">
            <div>
              <p className="nano-label">{industries.eyebrow}</p>
              <h2 className="nano-h2">
                {industries.titleLines[0]} <span className="nano-accent">{industries.titleLines[1]}</span>
              </h2>
            </div>
            <p className="nano-body">{industries.description}</p>
          </div>
          <IndustryPicker />
          <p className="nano-beyond">
            {industries.beyond}{" "}
            <a href="#contact" className="nano-link">
              Let&apos;s talk <span aria-hidden="true">→</span>
            </a>
          </p>
        </div>
      </section>

      {/* Contact: the swarm settles into a calm rolling sheet. */}
      <section id="contact" className="nano-contact">
        <div data-swarm="wave" className="nano-contact-stage" aria-hidden="true" />
        <div className="nano-wrap nano-contact-copy">
          <h2 className="nano-h1">{contact.title}</h2>
          <p className="nano-lead">{contact.body}</p>
          <a href={`mailto:${site.email}`} className="nano-btn">
            {contact.cta} <span aria-hidden="true">→</span>
          </a>
          <p className="nano-label nano-contact-meta">
            {site.domain} · {site.location}
          </p>
        </div>
      </section>
    </>
  );
}
