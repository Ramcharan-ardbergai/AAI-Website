import { About } from "@/components/sections/About";
import { Intro } from "@/components/sections/Intro";
import { Approach } from "@/components/sections/Approach";
import { Offer } from "@/components/sections/Offer";
import { Industries } from "@/components/sections/Industries";
import { LetsBuild } from "@/components/sections/LetsBuild";

export default function Home() {
  return (
    <>
      <About />
      <Intro />
      <Approach />
      <Offer />
      <Industries />
      <LetsBuild />
    </>
  );
}
