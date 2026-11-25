"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, SendHorizontalIcon, XIcon } from "lucide-react";
import { emptyEnquiry, enquiryClipboard, enquiryMailto, enquiryMessage, helpOptions, industryOptions, openChatEvent, type Enquiry } from "@/lib/contact";
import { contactChat, contactForm, site } from "@/lib/version2-content";

type Step = { key: keyof Enquiry; options?: string[]; type?: "email" | "long"; optional?: boolean };

const steps: Step[] = [
  { key: "industry", options: industryOptions },
  { key: "help", options: helpOptions },
  { key: "challenge", type: "long" },
  { key: "name" },
  { key: "email", type: "email" },
  { key: "company", optional: true },
];

const chip = "rounded-full border border-lavender/50 px-3 py-1.5 text-left text-xs font-medium text-mist transition-colors hover:bg-lavender hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";
const solid = "min-h-11 items-center justify-center rounded-lg bg-lavender px-4 text-sm font-semibold text-graphite transition-colors hover:bg-[var(--lavender-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";

function Bubble({ from, children }: { from: "us" | "you"; children: React.ReactNode }) {
  return (
    <p className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${from === "us" ? "self-start rounded-bl-sm bg-elevated text-mist" : "self-end rounded-br-sm bg-lavender text-graphite"}`}>
      <span className="sr-only">{from === "us" ? "ardbergai: " : "You: "}</span>
      {children}
    </p>
  );
}

/**
 * A guided chat: fixed questions asked one at a time (no AI, no server). It ends
 * by preparing an email in the visitor's own mail app.
 */
export function ContactChat() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Enquiry>(emptyEnquiry);
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"" | "drafted" | "copied">("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const step: Step | undefined = steps[index];

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(openChatEvent, show);
    return () => window.removeEventListener(openChatEvent, show);
  }, []);

  // Keep the newest message in view and the cursor ready for typing.
  useEffect(() => {
    if (!open) return;
    log.current?.scrollTo({ top: log.current.scrollHeight });
    input.current?.focus({ preventScroll: true });
  }, [open, index, status]);

  const answer = (value: string) => {
    if (!step) return;
    setAnswers((current) => ({ ...current, [step.key]: value }));
    setDraft("");
    setIndex((current) => current + 1);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (value || step?.optional) answer(value);
  };

  const restart = () => {
    setAnswers(emptyEnquiry);
    setIndex(0);
    setDraft("");
    setStatus("");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(enquiryClipboard(answers));
      setStatus("copied");
    } catch {
      /* clipboard unavailable: the summary above can still be selected */
    }
  };

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={`${solid} fixed bottom-5 right-5 z-40 flex min-h-13 gap-2 rounded-full px-5 shadow-2xl`}>
        <MessageCircleIcon className="size-5" aria-hidden="true" /> {contactChat.launcher}
      </button>
    );
  }

  const field = {
    value: draft,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(event.target.value),
    "aria-label": step ? contactChat.questions[step.key] : undefined,
    placeholder: step?.optional ? contactChat.optionalHint : contactChat.hint,
    className: "min-w-0 flex-1 resize-none rounded-lg border border-line bg-graphite px-3 py-2.5 text-sm text-mist placeholder:text-muted-foreground/70 focus-visible:border-lavender focus-visible:outline-2 focus-visible:outline-lavender",
  };

  return (
    <div role="dialog" aria-label={contactChat.title} onKeyDown={(event) => event.key === "Escape" && setOpen(false)} className="fixed inset-x-3 bottom-3 z-40 flex h-[min(34rem,calc(100dvh-6rem))] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:bottom-5 sm:left-auto sm:right-5 sm:w-96">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <p className="font-heading text-base font-semibold text-mist">{contactChat.title}</p>
          <p className="text-xs text-muted-foreground">{contactChat.subtitle}</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex size-9 items-center justify-center rounded-lg text-mist hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
          <XIcon className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div ref={log} role="log" className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
        <Bubble from="us">{contactChat.greeting}</Bubble>
        {steps.slice(0, index + 1).map(({ key }, i) => (
          <div key={key} className="flex flex-col gap-2.5">
            <Bubble from="us">{contactChat.questions[key]}</Bubble>
            {i < index && <Bubble from="you">{answers[key] || contactChat.skipped}</Bubble>}
          </div>
        ))}
        {step?.options && (
          <div className="flex flex-wrap gap-2">
            {step.options.map((option) => <button key={option} type="button" onClick={() => answer(option)} className={chip}>{option}</button>)}
          </div>
        )}
        {!step && (
          <>
            <Bubble from="us">{contactChat.summary}</Bubble>
            <p className="whitespace-pre-wrap break-words rounded-lg border border-line bg-graphite p-3 text-xs leading-relaxed text-mist">{enquiryMessage(answers)}</p>
            {status && <Bubble from="us">{status === "copied" ? `${contactChat.copied} ${site.email}.` : `${contactForm.draftBody} ${contactChat.fallback} ${site.email}.`}</Bubble>}
          </>
        )}
      </div>

      <div className="border-t border-line p-3">
        {!step ? (
          <div className="flex flex-col gap-2">
            {/* data-contact-panel keeps this mail link from reopening the contact form. */}
            <a href={enquiryMailto(answers)} data-contact-panel="" onClick={() => setStatus("drafted")} className={`${solid} flex`}>Prepare my email</a>
            <div className="flex justify-between">
              <button type="button" onClick={copy} className="px-2 py-1.5 text-sm font-medium text-lavender hover:underline">Copy message</button>
              <button type="button" onClick={restart} className="px-2 py-1.5 text-sm font-medium text-muted-foreground hover:text-mist hover:underline">Start over</button>
            </div>
          </div>
        ) : step.options ? (
          <p className="py-1.5 text-center text-xs text-muted-foreground">{contactChat.chooseHint}</p>
        ) : (
          <form onSubmit={submit} className="flex items-end gap-2">
            {step.type === "long" ? (
              <textarea {...field} ref={input} required rows={2} maxLength={1200} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />
            ) : (
              <input key={step.key} {...field} ref={input} type={step.type === "email" ? "email" : "text"} required={!step.optional} maxLength={120} />
            )}
            <button type="submit" aria-label={step.optional && !draft.trim() ? "Skip" : "Send answer"} className={`${solid} flex w-11 px-0`}>
              <SendHorizontalIcon className="size-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
