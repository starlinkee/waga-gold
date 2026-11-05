import { Hero } from "@/components/sections/Hero";
import { Vorteile } from "@/components/sections/Vorteile";
import { Spezifikation } from "@/components/sections/Spezifikation";
import { Lieferumfang } from "@/components/sections/Lieferumfang";
import { Galerie } from "@/components/sections/Galerie";
import { Faq } from "@/components/sections/Faq";
import { Versand } from "@/components/sections/Versand";
import { Kaufen } from "@/components/sections/Kaufen";

export default function Home() {
  return (
    <>
      <Hero />
      <Vorteile />
      <Spezifikation />
      <Lieferumfang />
      <Galerie />
      <Faq />
      <Versand />
      <Kaufen />
    </>
  );
}
