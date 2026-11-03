import { About } from "@/components/version2/sections/About";
import { Intro } from "@/components/version2/sections/Intro";
import { Approach } from "@/components/version2/sections/Approach";
import { Offer } from "@/components/version2/sections/Offer";
import { Industries } from "@/components/version2/sections/Industries";
import { LetsBuild } from "@/components/version2/sections/LetsBuild";

export function HomeSections() {
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
