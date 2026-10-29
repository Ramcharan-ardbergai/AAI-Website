import Image from "next/image";

export function Logo() {
  return (
    <a href="#about" className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4">
      <Image src="/logo.svg" alt="" width={40} height={25} priority />
      <span className="font-heading text-lg font-bold tracking-tight text-navy">
        ardberg<span className="text-[#9a6700]">ai</span>
      </span>
      <span className="sr-only">ardbergai home</span>
    </a>
  );
}
