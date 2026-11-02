import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/#about" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src="/logo.svg" alt="" width={40} height={25} priority />
      <span className="font-heading text-lg font-bold tracking-tight text-mist">
        ardberg<span className="text-lavender">ai</span>
      </span>
      <span className="sr-only">ardbergai home</span>
    </Link>
  );
}
