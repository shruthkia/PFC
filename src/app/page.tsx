import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Chapters } from "@/components/sections/chapters";
import { Activities } from "@/components/sections/activities";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { Leadership } from "@/components/sections/leadership";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Chapters />
      <Activities />
      <FaqTeaser />
      <Leadership />
      <Cta />
    </>
  );
}
