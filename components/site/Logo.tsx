import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="#about" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lavender">
      <Image src="/logo.png" alt="" width={43} height={30} priority className="site-logo-mark" />
      <span className="font-heading text-lg font-bold tracking-tight text-mist">
        ardberg<span className="text-lavender">ai</span>
      </span>
      <span className="sr-only">ardbergai home</span>
    </Link>
  );
}
