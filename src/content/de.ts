// Teksty UI (de-AT).
import { siteConfig } from "@/config/site";

const price = siteConfig.price.display;

export const seo = {
  description:
    "Magnetwaage zur zerstörungsfreien Echtheitsprüfung von Münzen und Barren aus Gold, Silber, Platin und Palladium. Lieferung nur nach Österreich.",
  ogAlt: "Magnetwaage mit beleuchtetem LCD-Display zur Echtheitsprüfung",
  productName: "Magnetwaage zur Echtheitsprüfung",
} as const;

export const de = {
  todo: "Angabe folgt",
  skip: "Zum Inhalt",
  nav: {
    buy: `Jetzt kaufen – ${price}`,
    home: "Startseite",
    links: [
      { href: "#vorteile", label: "Vorteile" },
      { href: "#messprinzip", label: "Messprinzip" },
      { href: "#lieferumfang", label: "Lieferumfang" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  hero: {
    title: "Gold und Silber magnetisch auf Echtheit prüfen",
    sub: "Zerstörungsfreier Vorabtest für Münzen und Barren – ein Hinweis, kein Beweis.",
    priceLabel: "Preis",
    lcdLabel: "Anzeige",
  },
  intro: {
    title: "Warum ein Magnettest?",
    paragraphs: [
      "Fälschungen sind oft von außen kaum zu erkennen. Manche Barren und Münzen haben einen Kern aus einem anderen Metall, etwa Wolfram, und sehen trotzdem überzeugend aus.",
      "Die Magnetwaage zeigt, wie sich ein Stück im Magnetfeld verhält. So lassen sich magnetisch auffällige Beimischungen schnell sichtbar machen, ohne die Probe zu beschädigen.",
    ],
  },
  vorteile: { title: "Vorteile", limitsTitle: "Grenzen der Methode" },
  messprinzip: { title: "Messprinzip", example: "Beispiel" },
  spec: {
    title: "Spezifikation",
    note: "Hinweis: Die Auflösung der Anzeige ist keine Aussage über die Genauigkeit.",
    labelHeader: "Merkmal",
    valueHeader: "Wert",
  },
  lieferumfang: { title: "Lieferumfang" },
  galerie: { title: "Galerie" },
  sicherheit: { title: "Sicherheit", intro: "Bitte vor der Benutzung lesen." },
  kontakt: {
    title: "Kontakt",
    text: "Fragen zum Gerät oder zur Bestellung? Unsere Kontaktdaten finden Sie im",
    impressum: "Impressum",
    email: "E-Mail",
    phone: "Telefon",
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "Kann ein Test positiv ausfallen, obwohl das Stück gefälscht ist?",
        a: "Ja. Nicht jede Fälschung enthält magnetisch auffällige Materialien. Deshalb ersetzt der Magnettest nie eine zweite Prüfmethode, zum Beispiel eine Dichtemessung.",
      },
      {
        q: "Eignet sich das Gerät für Schmuck?",
        a: "Nein, für Schmuck ist das Gerät nicht geeignet.",
      },
      {
        q: "Warum reicht ein normaler Magnet nicht?",
        a: "Ein Handmagnet zeigt nur starke Anziehung. Die feinen Unterschiede zwischen diamagnetischen und schwach paramagnetischen Materialien zeigen sich erst als Veränderung der Anzeige einer Waage.",
      },
      {
        q: "Wie lese ich das Ergebnis?",
        a: "Gold und Silber sind diamagnetisch, die Anzeige ändert sich nur gering. Paramagnetische und ferromagnetische Materialien ziehen die Anzeige in die Gegenrichtung, ferromagnetische besonders stark. Konkrete Grenzwerte: Angabe folgt.",
      },
      {
        q: "Analysiert das Gerät die Legierung?",
        a: "Nein. Es bestimmt weder Feingehalt noch Zusammensetzung, sondern zeigt nur das magnetische Verhalten.",
      },
      {
        q: "Was kann die Messung beeinflussen?",
        a: "Erschütterungen, Zugluft, ein unebener Untergrund sowie magnetische oder metallische Gegenstände in der Nähe können die Anzeige verfälschen. Messen Sie ruhig, eben und mit Abstand zu anderen Gegenständen.",
      },
      {
        q: "Welche Sicherheitshinweise gelten?",
        a: "Der Magnet ist stark: nicht für Personen mit Herzschrittmacher, Quetschgefahr, spröde, nicht für Kinder. Alle Hinweise stehen im Abschnitt Sicherheit.",
      },
      { q: "In welche Länder liefern Sie?", a: "Derzeit liefern wir nur nach Österreich." },
      { q: "Was kostet das Gerät?", a: `${price} inklusive MwSt.` },
      { q: "Wie wird das Gerät mit Strom versorgt?", a: "Ein USB-Kabel liegt bei. Weitere Angaben zur Stromversorgung: TODO_SPEC" },
      { q: "Was ist im Lieferumfang enthalten?", a: "Waage mit LCD, Messaufsatz, Zylinder, USB-Kabel und Hartschalenkoffer." },
      { q: "Wie groß darf eine Probe sein?", a: "TODO_SPEC" },
      { q: "Wie tief misst das Gerät in die Probe?", a: "TODO_SPEC" },
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
    legalPrefix: "Siehe auch:",
  },
  checkout: {
    mockBanner: "TESTMODUS – keine echte Zahlung",
    mockTitle: "Testkasse",
    mockAmountLabel: "Betrag",
    mockAmount: "499,00 €",
    mockShipping: "Lieferung nur nach Österreich",
    mockComplete: "Testzahlung abschließen",
    mockCancel: "Abbrechen",
  },
  danke: {
    titles: {
      paid: "Danke für Ihre Bestellung",
      pending: "Bestellung eingegangen",
      none: "Keine Bestellung gefunden",
    },
    texts: {
      paid: "Ihre Zahlung ist eingegangen. Wir melden uns mit weiteren Informationen zum Versand.",
      pending: "Ihre Zahlung wird noch bearbeitet. Versandt wird erst nach Zahlungseingang.",
      none: "Zu diesem Link liegt keine bezahlte Bestellung vor.",
    },
    home: "Zur Startseite",
  },
  abgebrochen: {
    title: "Zahlung abgebrochen",
    text: "Zahlung abgebrochen – es wurde nichts berechnet.",
    error: "Zahlung derzeit nicht möglich",
    retry: "Erneut kaufen",
    home: "Zur Startseite",
  },
  footer: {
    legal: [
      { href: "/impressum", label: "Impressum" },
      { href: "/agb", label: "AGB" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/widerruf", label: "Widerruf" },
    ],
  },
  notFound: {
    title: "Seite nicht gefunden",
    text: "Diese Seite existiert nicht.",
    back: "Zur Startseite",
  },
} as const;

// Wartość końcowa licznika LCD (gramy): stan „gotowa”, decyzja właściciela 11-05.
export const LCD_TARGET = 0;
