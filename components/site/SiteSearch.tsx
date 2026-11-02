"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { navGroups } from "@/lib/content";

const destinations = Array.from(
  new Map(
    navGroups.flatMap((group) => [
      ...(group.featured ? [group.featured] : []),
      ...group.items,
    ]).map((item) => [item.href, item]),
  ).values(),
);

export function SiteSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchTerm = query.trim().toLowerCase();
  const matches = searchTerm ? destinations.filter((item) =>
    `${item.label} ${item.description ?? ""}`.toLowerCase().includes(searchTerm),
  ) : [];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function close() {
    setQuery("");
    onClose();
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!matches[0]) return;
    router.push(matches[0].href);
    close();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="site-search-title"
      onClose={close}
      onClick={(event) => event.target === event.currentTarget && close()}
      className="fixed top-20 mx-auto mt-0 w-[min(90vw,44rem)] max-h-[min(75vh,40rem)] rounded-2xl border border-line bg-panel p-0 text-mist shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h2 id="site-search-title" className="font-heading text-lg font-semibold">Search the site</h2>
        <button type="button" onClick={close} aria-label="Close search" className="rounded-md p-2 hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender">
          <XIcon className="size-5" />
        </button>
      </div>
      <form onSubmit={submit} className="flex items-center gap-3 border-b border-line px-5 py-4">
        <SearchIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages and topics"
          aria-label="Search pages and topics"
          className="min-w-0 flex-1 bg-transparent text-base text-mist outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-line px-2 py-1 font-mono text-xs text-muted-foreground sm:block">Enter</kbd>
      </form>
      <nav aria-label="Search results" className="max-h-[min(53vh,30rem)] overflow-y-auto p-3">
        {!searchTerm ? <p className="px-4 py-4 text-sm text-muted-foreground">Search pages, industries, and topics.</p> : matches.length ? matches.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="block rounded-lg px-4 py-3 hover:bg-elevated focus-visible:outline-2 focus-visible:outline-lavender"
          >
            <span className="block font-medium text-mist">{item.label}</span>
            {item.description && <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>}
          </Link>
        )) : <p className="px-4 py-6 text-sm text-muted-foreground">No matching pages or topics.</p>}
      </nav>
    </dialog>
  );
}
