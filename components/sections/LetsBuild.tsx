import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { contact, site } from "@/lib/content";

export function LetsBuild() {
  return (
    <Section id="contact" tone="dark" className="text-center">
      <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-mist sm:text-6xl">{contact.title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{contact.body}</p>
      <Button
        render={<a href={`mailto:${site.email}`} />}
        nativeButton={false}
        className="mt-8 h-12 gap-2 rounded-lg bg-lavender px-6 text-base font-semibold text-graphite hover:bg-lavender/90"
      >
        {contact.cta}
        <ArrowRightIcon />
      </Button>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-gold">
        {site.domain} · {site.location}
      </p>
    </Section>
  );
}
