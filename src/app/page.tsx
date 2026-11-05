import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Vorteile } from "@/components/sections/Vorteile";
import { Spezifikation } from "@/components/sections/Spezifikation";
import { Lieferumfang } from "@/components/sections/Lieferumfang";
import { Galerie } from "@/components/sections/Galerie";
import { Faq } from "@/components/sections/Faq";
import { Versand } from "@/components/sections/Versand";
import { Kaufen } from "@/components/sections/Kaufen";
import { Messprinzip } from "@/components/sections/Messprinzip";
import { Sicherheit } from "@/components/sections/Sicherheit";
import { Kontakt } from "@/components/sections/Kontakt";
import { seo } from "@/content/de";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: siteConfig.brandName,
  description: seo.description,
  image: `${siteUrl}/images/koffer-display-0000.jpeg`,
  offers: {
    "@type": "Offer",
    price: (siteConfig.price.amount / 100).toFixed(2),
    priceCurrency: siteConfig.price.currency,
    url: siteUrl,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Intro />
      <Vorteile />
      <Messprinzip />
      <Spezifikation />
      <Lieferumfang />
      <Galerie />
      <Kaufen />
      <Faq />
      <Sicherheit />
      <Versand />
      <Kontakt />
    </>
  );
}
