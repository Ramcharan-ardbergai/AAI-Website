import Image from "next/image";

export function Logo() {
  return (
    <a href="#about" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src="/logo.png" alt="" width={43} height={30} priority />
      <span className="font-heading text-lg font-bold tracking-tight text-ink">
        ardberg<span className="text-gold">ai</span>
      </span>
      <span className="sr-only">ardbergai home</span>
    </a>
  );
}
