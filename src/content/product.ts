// Jedno źródło faktów, ograniczeń i ostrzeżeń o produkcie (strona + w pakiecie 6 instrukcja PDF).
// Czyste dane, bez JSX, bez importów. Własne sformułowania.
// "TODO_SPEC" = brak potwierdzenia dla NASZEGO urządzenia (w UI: "Angabe folgt").

export const UNVERIFIED_NOTE = "Wert wird noch durch Messungen an diesem Gerät bestätigt";

export const principle = {
  intro:
    "Unter oder über der Probe sitzt ein starker Magnet. Er verändert das Gewicht, das die Waage anzeigt – je nachdem, wie sich das Material im Magnetfeld verhält.",
  dia: {
    title: "Diamagnetisch",
    materials: "z. B. Gold, Silber",
    text: "Das Material wird vom Magnetfeld schwach abgestoßen. Die Anzeige ändert sich nur minimal in eine Richtung.",
    example: "+0.0xx",
  },
  para: {
    title: "Paramagnetisch",
    materials: "z. B. Wolfram, Tantal, Molybdän",
    text: "Das Material wird schwach angezogen. Die Anzeige weicht leicht in die Gegenrichtung ab.",
    example: "-0.0xx",
  },
  ferro: {
    title: "Ferromagnetisch",
    materials: "z. B. Eisen, Nickel",
    text: "Das Material wird stark angezogen. Die Anzeige weicht deutlich in die Gegenrichtung ab.",
    example: "-0.xxx",
  },
  // Wskazanie: dodatni = diamagnetyczny, lekko ujemny = paramagnetyczny, silnie ujemny = ferromagnetyczny.
  // TODO_SPEC: kierunek znaku zależy od budowy urządzenia — do potwierdzenia pomiarem na naszym egzemplarzu.
  exampleNote: "Beispiel zur Veranschaulichung, keine Messwerte dieses Geräts.",
  ptPdNote:
    "Platin und Palladium sind von Natur aus schwach paramagnetisch. Ihre Anzeige unterscheidet sich daher von der von Gold und Silber; Vergleichswerte folgen.",
} as const;

export const benefits = [
  "Zerstörungsfrei: Die Probe bleibt unverändert.",
  "Schneller Vorabtest für Münzen und Barren aus Gold, Silber, Platin und Palladium.",
  "Macht magnetisch auffällige Beimischungen sichtbar, die ein Handmagnet nicht zeigt.",
  "Klare Anzeige im beleuchteten LCD mit drei Nachkommastellen.",
  "Kompakt im Hartschalenkoffer verstaut und transportierbar.",
] as const;

export const limits = [
  "Nicht für Schmuck geeignet.",
  "Es wird keine Legierung analysiert und kein Feingehalt bestimmt.",
  "Ein Magnettest ist nie die einzige Methode: Immer eine zweite, unabhängige Prüfung durchführen, zum Beispiel eine Dichtemessung.",
  "Ein unauffälliges Ergebnis beweist keine Echtheit.",
] as const;

export const SECOND_METHOD =
  "Wichtig: Dieser Test ersetzt keine zweite Prüfmethode. Prüfen Sie zusätzlich zum Beispiel die Dichte.";

export type SafetyGroup = "magnet" | "spray" | "akku";
export type SafetyItem = {
  group: SafetyGroup;
  text: string;
  // false = Zubehör/Bauteil ist für unser Gerät noch nicht bestätigt, Warnung bleibt trotzdem stehen.
  inKitConfirmed: boolean;
};

export const safetyGroups: Record<SafetyGroup, { title: string; note?: string }> = {
  magnet: { title: "Starker Magnet" },
  spray: { title: "Spray", note: "Falls im Lieferumfang – zu bestätigen." },
  akku: { title: "Akku (NiMH)", note: "Falls im Lieferumfang – zu bestätigen." },
};

export const safety: SafetyItem[] = [
  { group: "magnet", inKitConfirmed: true, text: "Nicht für Personen mit Herzschrittmacher oder Defibrillator: Mindestabstand einhalten." },
  { group: "magnet", inKitConfirmed: true, text: "Quetschgefahr für Finger: Magnete ziehen einander und Metallteile mit großer Kraft an." },
  { group: "magnet", inKitConfirmed: true, text: "Magnete sind spröde und können splittern. Nicht fallen lassen, keine Schläge." },
  { group: "magnet", inKitConfirmed: true, text: "Abstand halten zu Datenträgern, mechanischen Uhren, Hörgeräten und Elektronik." },
  { group: "magnet", inKitConfirmed: true, text: "Nicht für Kinder. Magnete nicht verschlucken." },
  { group: "spray", inKitConfirmed: false, text: "Spray ist ein entzündbares Aerosol: von Hitze, Funken und offenem Feuer fernhalten." },
  { group: "akku", inKitConfirmed: false, text: "Nur das mitgelieferte Netzteil verwenden." },
  { group: "akku", inKitConfirmed: false, text: "Akku vor Hitze schützen." },
];

// Deklaracje z cudzego wzorca. NIE potwierdzone dla naszego urządzenia, nie pokazywać na stronie jako fakty.
export const unverifiedSpecs = [
  { label: "Maximale Probenmasse", claim: "250 g", verified: false },
  { label: "Eindringtiefe", claim: "ca. 3 mm", verified: false },
  { label: "Messung durch Blister/Kapsel", claim: "möglich", verified: false },
  { label: "Auffälligkeit Wolfram in Barren/Münzen", claim: "erkennbar", verified: false },
  { label: "Auffälligkeit Tantal in Münzen 900/916", claim: "erkennbar", verified: false },
] as const;
