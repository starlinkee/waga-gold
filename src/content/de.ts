// Teksty UI (de-AT).
import { siteConfig } from "@/config/site";

const price = siteConfig.price.display;

export const de = {
  todo: "Angabe folgt",
  nav: {
    buy: `Jetzt kaufen – ${price}`,
    home: "Startseite",
    links: [
      { href: "#vorteile", label: "Vorteile" },
      { href: "#spezifikation", label: "Spezifikation" },
      { href: "#lieferumfang", label: "Lieferumfang" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  hero: {
    tagline: "Präzision, die man spürt.",
    sub: "Eine Waage mit beleuchtetem LCD – verstaut im Hartschalenkoffer.",
    priceLabel: "Preis",
    lcdLabel: "Anzeige",
  },
  vorteile: {
    title: "Vorteile",
    items: [
      { title: "Präzision", text: "Die Anzeige löst auf drei Nachkommastellen auf – ablesbar im beleuchteten LCD." },
      { title: "Stabilität", text: "Die Abdeckung schützt die Wägefläche vor äußeren Einflüssen." },
      { title: "Zuverlässigkeit", text: "Im Hartschalenkoffer mit Schaumstoffeinlage sicher verstaut und transportiert." },
    ],
  },
  spec: {
    title: "Spezifikation",
    note: "Hinweis: Die Auflösung der Anzeige ist keine Aussage über die Genauigkeit.",
    labelHeader: "Merkmal",
    valueHeader: "Wert",
  },
  lieferumfang: { title: "Lieferumfang" },
  galerie: { title: "Galerie" },
  faq: {
    title: "FAQ",
    items: [
      { q: "In welche Länder liefern Sie?", a: "Derzeit liefern wir nur nach Österreich." },
      { q: "Was kostet die Waage?", a: `${price} inklusive MwSt.` },
      { q: "Wie wird die Waage mit Strom versorgt?", a: "Über USB. Das Kabel ist im Lieferumfang enthalten." },
      { q: "Was ist im Lieferumfang enthalten?", a: "Waage, Abdeckung, Kalibriergewicht, USB-Kabel und Hartschalenkoffer." },
      { q: "Was ist der Wägebereich?", a: "TODO_SPEC" },
      { q: "Wie wird die Waage kalibriert?", a: "TODO_SPEC" },
      { q: "Gibt es eine Garantie?", a: "TODO_SPEC" },
    ],
  },
  versand: {
    title: "Versand & Rückgabe",
    shipping: "Versand nur nach Österreich.",
    cost: "Versandkosten",
    time: "Lieferzeit",
    returns: "Informationen zur Rückgabe finden Sie unter",
    returnsLink: "Widerruf",
  },
  kaufen: {
    title: "Jetzt bestellen",
    priceLabel: "Preis",
    vat: "inkl. MwSt.",
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

// Wartość końcowa licznika LCD (gramy).
export const LCD_TARGET = 134;
