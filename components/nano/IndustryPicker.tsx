"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { industries, industryAnchor } from "@/lib/version2-content";

const count = industries.items.length;
const motionQuery = "(prefers-reduced-motion: reduce)";
const allowsMotion = () => !window.matchMedia(motionQuery).matches;
const subscribeMotion = (onChange: () => void) => {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Nine industries, one at a time: the swarm builds the chosen industry's icon.
 * Advances every 7 seconds (progress bar along the list's bottom edge);
 * hovering the block pauses it, choosing an industry restarts the timer.
 */
export function IndustryPicker() {
  const [active, setActive] = useState(0);
  // No auto-advance for people who prefer reduced motion.
  const auto = useSyncExternalStore(subscribeMotion, allowsMotion, () => false);
  const item = industries.items[active];

  useEffect(() => {
    const sync = () => {
      const i = industries.items.findIndex(({ title }) => `#${industryAnchor(title)}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div className="nano-industries">
      <div className="nano-industry-listwrap">
        <ul className="nano-industry-list" role="tablist" aria-label="Industries">
          {industries.items.map(({ title }, i) => (
            <li key={title} id={industryAnchor(title)}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="industry-panel"
                className="nano-industry-tab"
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="nano-industry-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {title}
              </button>
            </li>
          ))}
        </ul>
        {auto && (
          <div className="nano-industry-progress" aria-hidden="true">
            <span key={active} onAnimationEnd={() => setActive((a) => (a + 1) % count)} />
          </div>
        )}
      </div>

      <div id="industry-panel" role="tabpanel" className="nano-industry-panel" aria-live="polite">
        <div data-swarm="icon" data-swarm-icon={active} className="nano-industry-stage" aria-hidden="true" />
        <h3 className="nano-industry-title">{item.title}</h3>
        <p className="nano-body">{item.body}</p>
        <p className="nano-signals">
          {item.signals.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <a href="#contact" className="nano-link">
          Discuss this industry <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
