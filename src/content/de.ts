// Teksty UI (de-AT). Na tym etapie tylko layout: nawigacja i stopka.
import { siteConfig } from "@/config/site";

export const de = {
  nav: {
    buy: `Jetzt kaufen – ${siteConfig.price.display}`,
    home: "Startseite",
  },
  hero: {
    tagline: "Präzision, die man spürt.",
    priceLabel: "Preis",
  },
  footer: {
    legal: [
      { href: "/impressum", label: "Impressum" },
      { href: "/agb", label: "AGB" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/widerruf", label: "Widerruf" },
    ],
  },
  legalStub: "TODO: Inhalt folgt.",
  notFound: {
    title: "Seite nicht gefunden",
    text: "Diese Seite existiert nicht.",
    back: "Zur Startseite",
  },
} as const;
