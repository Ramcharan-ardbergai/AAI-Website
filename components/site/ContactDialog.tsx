"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import { industryIcons } from "@/components/version2/sections/IndustryOrbit";
import { emptyEnquiry, enquiryClipboard, enquiryMailto, enquiryMessage, helpOptions, industryOptions, openChatEvent, type Enquiry } from "@/lib/contact";
import { contact, contactChat, contactForm, industries, site } from "@/lib/version2-content";
import { cn } from "@/lib/utils";
import type { PaletteSlug } from "@/lib/palettes";

const label = "mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold";
const field = "w-full rounded-xl border border-line bg-graphite px-4 py-3 text-base text-mist transition-colors placeholder:text-muted-foreground/70 focus-visible:border-lavender focus-visible:outline-2 focus-visible:outline-lavender";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";
const primary = `inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lavender px-6 text-base font-semibold text-graphite transition-colors hover:bg-[var(--lavender-hover)] ${focusRing}`;
const quiet = `inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-mist ${focusRing}`;
const choice = `rounded-xl border text-sm font-medium transition-colors ${focusRing}`;
const chosen = "border-lavender bg-lavender text-graphite";
const unchosen = "border-line text-mist hover:border-lavender hover:bg-lavender/10";

/** The message as it takes shape, beside the questions. */
function Preview({ values }: { values: Enquiry }) {
  const rows = [
    [contactForm.preview.industry, values.industry],
    [contactForm.preview.help, values.help],
    [contactForm.preview.challenge, values.challenge.trim()],
    [contactForm.preview.from, [values.name, values.company].map((part) => part.trim()).filter(Boolean).join(", ")],
  ];
  const index = industries.items.findIndex(({ title }) => title === values.industry);
  const Icon = industryIcons[index] ?? MessageCircleIcon;

  return (
    <div className="mt-auto hidden pt-6 md:block">
      <div className="relative mx-auto mb-6 flex size-32 items-center justify-center [@media(max-height:700px)]:hidden" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border border-dashed border-graphite/40 motion-safe:animate-[spin_40s_linear_infinite]" />
        <span className="absolute inset-4 rounded-full border border-graphite/25" />
        <span className="flex size-16 items-center justify-center rounded-full bg-graphite text-lavender">
          <Icon key={values.industry} className="size-8 animate-in fade-in zoom-in-50 duration-300" strokeWidth={1.5} />
        </span>
      </div>
      <div className="rounded-2xl bg-graphite p-5 shadow-2xl">
        <p className={label}>{contactForm.preview.title}</p>
        <dl className="space-y-2.5">
          {rows.map(([name, value]) => (
            <div key={name} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 text-sm">
              <dt className="text-muted-foreground">{name}</dt>
              <dd className={cn("line-clamp-2 break-words", value ? "font-medium text-mist" : "text-muted-foreground/50")}>{value || "—"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/**
 * The "Start a conversation" window. Any link to #contact, or to the contact
 * email address, opens it. There is no server: finishing prepares an email in
 * the visitor's own mail app.
 */
export function ContactDialog({ palette }: { palette: PaletteSlug }) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(emptyEnquiry);
  const [step, setStep] = useState(0);
  const [drafted, setDrafted] = useState(false);
  const [copied, setCopied] = useState(false);
  const last = contactForm.steps.length - 1;

  useEffect(() => {
    // Capture on window so this runs before the router handles the link.
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.closest("[data-contact-panel]")) return;
      if (link.hash !== "#contact" && link.getAttribute("href") !== `mailto:${site.email}`) return;
      event.preventDefault();
      const industry = link.dataset.contactIndustry;
      if (industry) setValues((current) => ({ ...current, industry }));
      const help = link.dataset.contactHelp;
      if (help) setValues((current) => ({ ...current, help }));
      setStep(0);
      setDrafted(false);
      setCopied(false);
      setOpen(true);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  const set = (key: keyof Enquiry, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const bind = (key: keyof Enquiry) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(key, event.target.value),
  });

  const mailto = enquiryMailto(values);

  // The browser checks the required fields of the visible step before this runs.
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    // Spaces alone don't count as a challenge: clear them so "required" applies.
    if (step === 1 && !values.challenge.trim()) {
      set("challenge", "");
      return;
    }
    if (step < last) {
      setStep(step + 1);
      return;
    }
    window.location.href = mailto;
    setDrafted(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(enquiryClipboard(values));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const switchToChat = () => {
    setOpen(false);
    window.dispatchEvent(new Event(openChatEvent));
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        {/* The window is portalled out of the page, so it needs the palette class itself. */}
        <Dialog.Popup data-contact-panel="" className={`palette-${palette} fixed inset-0 z-50 flex flex-col overflow-hidden bg-panel font-sans text-mist shadow-2xl transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:inset-0 sm:m-auto sm:h-[min(42rem,calc(100dvh-3rem))] sm:w-[min(64rem,calc(100vw-3rem))] sm:rounded-3xl sm:border sm:border-line md:flex-row`}>
          <div className="flex shrink-0 flex-col bg-lavender p-5 pr-16 text-graphite md:w-[42%] md:p-8">
            <Dialog.Title className="font-heading text-2xl font-bold tracking-tight text-graphite md:text-4xl">{contact.cta}</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-graphite/85 md:text-base">{contact.body}</Dialog.Description>
            <Preview values={values} />
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col">
            <Dialog.Close aria-label="Close" className={`fixed right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-panel text-mist transition-colors hover:bg-elevated md:absolute md:right-4 md:top-4 ${focusRing}`}>
              <XIcon className="size-5" aria-hidden="true" />
            </Dialog.Close>

            {drafted ? (
              <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-10 text-center sm:px-10" role="status">
                <span className="mt-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-lavender text-graphite ring-8 ring-lavender/20 animate-in zoom-in-50 duration-500" aria-hidden="true">
                  <CheckIcon className="size-10" />
                </span>
                <h3 className="mt-7 font-heading text-3xl font-bold tracking-tight text-mist">{contactForm.draftTitle}</h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">{contactForm.draftBody}</p>
                <p className="mt-6 max-w-sm text-sm text-muted-foreground">
                  No email app opened? Copy your message and send it to <span className="font-semibold text-mist">{site.email}</span>.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={copy} className={primary}>{copied ? "Copied" : "Copy message"}</button>
                  <a href={mailto} className={cn(choice, unchosen, "inline-flex min-h-12 items-center px-6")}>Open email again</a>
                </div>
                <details className="mt-5 w-full max-w-sm text-left">
                  <summary className={`cursor-pointer rounded text-center text-sm font-semibold text-lavender ${focusRing}`}>View full message</summary>
                  <p className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-line bg-graphite p-4 text-sm leading-relaxed text-mist">{enquiryMessage(values)}</p>
                </details>
                <button type="button" onClick={() => setDrafted(false)} className={`${quiet} mb-auto mt-3`}>Edit my message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
                <ol className="flex gap-2 px-6 pt-5 sm:px-10 md:pr-20 md:pt-7">
                  {contactForm.steps.map((name, i) => (
                    <li key={name} className="flex-1" aria-current={i === step ? "step" : undefined}>
                      <span className="block h-1 overflow-hidden rounded-full bg-line">
                        <span className={cn("block h-full origin-left bg-lavender transition-transform duration-500", i <= step ? "scale-x-100" : "scale-x-0")} />
                      </span>
                      <span className={cn("mt-2 block text-xs font-medium", i === step ? "text-mist" : "text-muted-foreground")}>{name}</span>
                    </li>
                  ))}
                </ol>

                <div key={step} className="flex-1 overflow-y-auto px-6 py-6 animate-in fade-in slide-in-from-right-4 duration-300 sm:px-10">
                  <h3 className="mb-5 font-heading text-2xl font-bold tracking-tight text-mist">{contactForm.headings[step]}</h3>

                  {step === 0 && (
                    <div className="space-y-6">
                      <fieldset>
                        <legend className={label}>Your industry</legend>
                        <div className="flex flex-wrap gap-2">
                          {industryOptions.map((option) => (
                            <button key={option} type="button" aria-pressed={values.industry === option} onClick={() => set("industry", values.industry === option ? "" : option)} className={cn(choice, "px-3.5 py-2", values.industry === option ? chosen : unchosen)}>
                              {option}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className={label}>How can we work together?</legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {helpOptions.map((option) => (
                            <button key={option} type="button" aria-pressed={values.help === option} onClick={() => set("help", values.help === option ? "" : option)} className={cn(choice, "px-4 py-3 text-left", values.help === option ? chosen : unchosen)}>
                              {option}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <label className={label} htmlFor="contact-challenge">The challenge</label>
                      <textarea {...bind("challenge")} autoFocus required maxLength={1200} rows={8} placeholder={contactForm.challengeHint} className={`${field} resize-none`} />
                      <p className="mt-2 text-right font-mono text-xs text-muted-foreground" aria-hidden="true">{values.challenge.length} / 1200</p>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <label className={label} htmlFor="contact-name">Name</label>
                        <input {...bind("name")} autoFocus required autoComplete="name" className={field} />
                      </div>
                      <div>
                        <label className={label} htmlFor="contact-email">Work email</label>
                        <input {...bind("email")} required type="email" autoComplete="email" className={field} />
                      </div>
                      <div>
                        <label className={label} htmlFor="contact-company">Company (optional)</label>
                        <input {...bind("company")} autoComplete="organization" className={field} />
                      </div>
                      <p className="text-xs text-muted-foreground">{contactForm.note}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-10">
                  {step === 0 ? (
                    <button type="button" onClick={switchToChat} className={quiet}>
                      <MessageCircleIcon className="size-4" aria-hidden="true" /> {contactChat.switchPrompt}
                    </button>
                  ) : (
                    <button type="button" onClick={() => setStep(step - 1)} className={quiet}>
                      <ArrowLeftIcon className="size-4" aria-hidden="true" /> Back
                    </button>
                  )}
                  {/* Keyed so a click on "Continue" can't turn into a submit of the next step. */}
                  <button key={step} type="submit" className={`${primary} shrink-0`}>
                    {step < last ? "Continue" : "Prepare my email"} <ArrowRightIcon className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
