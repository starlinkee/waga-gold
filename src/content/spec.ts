// Dane techniczne. Wartość TODO_SPEC = brak potwierdzonej informacji od właściciela.
// W UI renderowana jako "Angabe folgt" (patrz displayValue) — literał nie trafia do HTML.
import { de } from "@/content/de";

export const TODO_SPEC = "TODO_SPEC";

export type SpecRow = { label: string; value: string };

// Wiersze potwierdzone zdjęciami.
// Pozostałe (Wägebereich, Genauigkeit, Kalibriergewicht, ...) = TODO_SPEC do uzupełnienia przez właściciela.
export const specRows: SpecRow[] = [
  { label: "Anzeige", value: "LCD, beleuchtet" },
  { label: "Einheit", value: "g" },
  { label: "Auflösung der Anzeige", value: "3 Nachkommastellen (0.000 g)" },
  { label: "Bedienung", value: "4 Tasten: Ein/Aus, M, P, T" },
  { label: "Stromversorgung", value: "USB, Kabel im Lieferumfang" },
  { label: "Aufbewahrung", value: "Hartschalenkoffer mit Schaumstoffeinlage" },
  { label: "Wägebereich", value: TODO_SPEC },
  { label: "Genauigkeit / Reproduzierbarkeit", value: TODO_SPEC },
  { label: "Kalibriergewicht (Masse)", value: TODO_SPEC },
  { label: "Kalibrierung", value: TODO_SPEC },
  { label: "Zertifikate", value: TODO_SPEC },
  { label: "Abmessungen", value: TODO_SPEC },
  { label: "Gewicht", value: TODO_SPEC },
  { label: "Betriebsdauer", value: TODO_SPEC },
];

export function displayValue(value: string): string {
  return value === TODO_SPEC ? de.todo : value;
}
