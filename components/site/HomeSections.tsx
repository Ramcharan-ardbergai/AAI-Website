import { About } from "@/components/version2/sections/About";
import { HeroFlow } from "@/components/version2/sections/HeroFlow";
import { Intro } from "@/components/version2/sections/Intro";
import { Approach } from "@/components/version2/sections/Approach";
import { ApproachSteps } from "@/components/version2/sections/ApproachSteps";
import { Offer } from "@/components/version2/sections/Offer";
import { OfferShowcase } from "@/components/version2/sections/OfferShowcase";
import { Industries } from "@/components/version2/sections/Industries";
import { LetsBuild } from "@/components/version2/sections/LetsBuild";

export function HomeSections({ orbit = false }: { orbit?: boolean }) {
  return (
    <>
      {/* `orbit` marks Palette3, which has its own hero and industries view. */}
      {orbit ? <HeroFlow /> : <About />}
      <Intro />
      {orbit ? <ApproachSteps /> : <Approach />}
      {orbit ? <OfferShowcase /> : <Offer />}
      <Industries orbit={orbit} />
      <LetsBuild />
    </>
  );
}
