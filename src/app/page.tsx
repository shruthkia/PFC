import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { Mission } from "@/components/sections/mission";
import { Chapters } from "@/components/sections/chapters";
import { Activities } from "@/components/sections/activities";
import { Faq } from "@/components/sections/faq";
import { Leadership } from "@/components/sections/leadership";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Mission />
      <Chapters />
      <Activities />
      <Faq />
      <Leadership />
      <Cta />
    </>
  );
}
