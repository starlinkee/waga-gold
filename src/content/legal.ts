// Szkielety stron prawnych. TO NIE SĄ TEKSTY PRAWNE — właściciel/prawnik uzupełnia.
export const legalBanner = "ENTWURF – rechtlicher Inhalt folgt (TODO)";
export const legalTodo = "TODO";

export type LegalPage = { title: string; sections: string[] };

export const legalPages: Record<"impressum" | "agb" | "datenschutz" | "widerruf", LegalPage> = {
  impressum: {
    title: "Impressum",
    sections: [
      "Name / Firma",
      "Anschrift",
      "Kontakt",
      "UID-Nummer",
      "Firmenbuch",
      "Gewerbebehörde / Kammer",
      "Unternehmensgegenstand",
    ],
  },
  agb: {
    title: "AGB",
    // TODO: Inhalt (Vertragsabschluss, Preise, Lieferung, Gewährleistung ...) durch Rechtsberatung.
    sections: ["Geltungsbereich", "Vertragsabschluss", "Preise und Zahlung", "Lieferung", "Gewährleistung"],
  },
  datenschutz: {
    title: "Datenschutz",
    // Faktisch im Code: Stripe (Zahlung), Resend (E-Mail), Vercel (Hosting). Formulierung durch Rechtsberatung.
    sections: [
      "Verantwortlicher",
      "Verarbeitete Daten",
      "Zahlungsabwicklung (Stripe)",
      "E-Mail-Versand (Resend)",
      "Hosting (Vercel)",
      "Rechte der Betroffenen",
    ],
  },
  widerruf: {
    title: "Widerruf",
    // TODO: Widerrufsbelehrung und Muster-Formular durch Rechtsberatung (keine Fristen im Code).
    sections: ["Widerrufsbelehrung", "Muster-Widerrufsformular"],
  },
};
