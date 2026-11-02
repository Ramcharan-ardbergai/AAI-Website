import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Offer } from "@/components/sections/Offer";
import { Industries } from "@/components/sections/Industries";
import { Blog } from "@/components/sections/Blog";
import { LetsBuild } from "@/components/sections/LetsBuild";

export default function Home() {
  return (
    <>
      <About />
      <Approach />
      <Offer />
      <Industries />
      <Blog />
      <LetsBuild />
    </>
  );
}
