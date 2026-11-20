"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

/**
 * Palette playground: every colour in the nano world is a CSS variable on
 * .nano-world. This dropdown overrides them live (and remembers the choice
 * in this browser). The swarm re-reads its colours on "nano-theme".
 */
const ROLES = [
  { key: "--violet", label: "Primary", hint: "Accent, charged bots, links" },
  { key: "--violet-deep", label: "Primary hover", hint: "Hover / pressed accent" },
  { key: "--ink", label: "Text", hint: "Headings, buttons, bots" },
  { key: "--ink-soft", label: "Secondary text", hint: "Body copy, labels" },
  { key: "--logo", label: "Logo", hint: "Logo mark (default: text colour)" },
  { key: "--ground", label: "Background", hint: "Page ground" },
  { key: "--ground-deep", label: "Surface", hint: "Secondary surface" },
] as const;

type Key = (typeof ROLES)[number]["key"];
type Palette = Record<Key, string>;

const DEFAULTS: Palette = {
  "--violet": "#6a3df5",
  "--violet-deep": "#5326e0",
  "--ink": "#0e0f11",
  "--ink-soft": "#4a4d52",
  // Empty = follow the Text colour until a logo colour is picked.
  "--logo": "",
  "--ground": "#e6e7e4",
  "--ground-deep": "#dadcd8",
};

/** Suggested palettes: three light, three dark. */
const PRESETS: { name: string; palette: Palette }[] = [
  { name: "Lab", palette: DEFAULTS },
  {
    // Aman wellness branding (Behance 204338099): muted sage, warm cream,
    // blush and deep olive-grey.
    name: "Sage",
    palette: {
      "--violet": "#7b836f",
      "--violet-deep": "#b8917a",
      "--ink": "#34362f",
      "--ink-soft": "#6f7267",
      "--logo": "#868d7d",
      "--ground": "#ebe7df",
      "--ground-deep": "#ddd6c8",
    },
  },
  {
    // Anthropic / Claude: ivory ground, near-black ink, clay-coral accent.
    name: "Clay",
    palette: {
      "--violet": "#d97757",
      "--violet-deep": "#c6613f",
      "--ink": "#141413",
      "--ink-soft": "#5e5d59",
      "--logo": "",
      "--ground": "#faf9f5",
      "--ground-deep": "#f0eee6",
    },
  },
  {
    name: "Midnight",
    palette: {
      "--violet": "#8b7bff",
      "--violet-deep": "#aea3ff",
      "--ink": "#e8e9ee",
      "--ink-soft": "#8d92a0",
      "--logo": "",
      "--ground": "#0d0f14",
      "--ground-deep": "#171a22",
    },
  },
  {
    name: "Terminal",
    palette: {
      "--violet": "#8ebf52",
      "--violet-deep": "#a9d873",
      "--ink": "#d6e4d0",
      "--ink-soft": "#7f8f7a",
      "--logo": "",
      "--ground": "#0b0d0b",
      "--ground-deep": "#151915",
    },
  },
  {
    name: "Ocean",
    palette: {
      "--violet": "#4fb3c8",
      "--violet-deep": "#7fd0e0",
      "--ink": "#dbe7f0",
      "--ink-soft": "#7f97a8",
      "--logo": "",
      "--ground": "#0b1622",
      "--ground-deep": "#12222f",
    },
  },
];

const STORAGE = "nano-theme";

function apply(palette: Palette) {
  const world = document.querySelector<HTMLElement>(".nano-world");
  if (!world) return;
  for (const [key, value] of Object.entries(palette)) {
    if (value) world.style.setProperty(key, value);
    else world.style.removeProperty(key);
  }
  document.documentElement.style.background = palette["--ground"];
  window.dispatchEvent(new Event("nano-theme"));
}

/** Effective colour of a role (the logo follows Text until set). */
const shown = (palette: Palette, key: Key) => palette[key] || (key === "--logo" ? palette["--ink"] : "");

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState<Palette>(DEFAULTS);
  const [active, setActive] = useState<Key>("--violet");
  const ref = useRef<HTMLDivElement>(null);

  // Restore a saved palette once on mount.
  useEffect(() => {
    let saved: Palette | null = null;
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) saved = { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      saved = null;
    }
    if (saved) {
      apply(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
      setPalette(saved);
    }
  }, []);

  // Close when clicking outside or pressing Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const update = (next: Palette) => {
    setPalette(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE, JSON.stringify(next));
    } catch {
      /* storage unavailable: still applies for this visit */
    }
  };

  const setColor = (value: string) => update({ ...palette, [active]: value });

  const reset = () => {
    update(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="nano-theme" ref={ref}>
      <button
        type="button"
        className="nano-theme-trigger"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nano-theme-dots" aria-hidden="true">
          <span style={{ background: palette["--violet"] }} />
          <span style={{ background: palette["--ink"] }} />
          <span style={{ background: palette["--ground"] }} />
        </span>
        Theme
        <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="nano-theme-panel" role="dialog" aria-label="Theme colours">
          <ul className="nano-theme-roles">
            {ROLES.map((role) => (
              <li key={role.key}>
                <button
                  type="button"
                  className="nano-theme-role"
                  aria-pressed={active === role.key}
                  onClick={() => setActive(role.key)}
                >
                  <span className="nano-theme-swatch" style={{ background: shown(palette, role.key) }} aria-hidden="true" />
                  <span>
                    <strong>{role.label}</strong>
                    <small>{role.hint}</small>
                  </span>
                  <code>{shown(palette, role.key)}</code>
                </button>
              </li>
            ))}
          </ul>

          <div className="nano-theme-editor">
            <HexColorPicker color={shown(palette, active)} onChange={setColor} />
            <label className="nano-theme-hex">
              <span>Hex</span>
              <HexColorInput color={shown(palette, active)} onChange={setColor} prefixed />
            </label>
            <button type="button" className="nano-theme-reset" onClick={reset}>
              Reset to default
            </button>

            <p className="nano-theme-heading">Suggested</p>
            <div className="nano-theme-presets">
              {PRESETS.map(({ name, palette: p }) => (
                <button
                  key={name}
                  type="button"
                  className="nano-theme-preset"
                  style={{ background: p["--ground"], color: p["--ink"] }}
                  onClick={() => update(p)}
                >
                  <span className="nano-theme-preset-dots" aria-hidden="true">
                    <span style={{ background: p["--violet"] }} />
                    <span style={{ background: p["--ink"] }} />
                    <span style={{ background: p["--ground-deep"] }} />
                  </span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
