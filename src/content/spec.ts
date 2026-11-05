// Dane techniczne. Wartość TODO_SPEC = brak potwierdzonej informacji od właściciela.
// W UI renderowana jako "Angabe folgt" (patrz displayValue) — literał nie trafia do HTML.
import { de } from "@/content/de";

export const TODO_SPEC = "TODO_SPEC";

export type SpecRow = { label: string; value: string };

// Wiersze potwierdzone zdjęciami lub zasadą działania.
// TODO_SPEC: wartości do potwierdzenia pomiarami naszego urządzenia.
export const specRows: SpecRow[] = [
  { label: "Messprinzip", value: "Magnetische Gewichtsdifferenz" },
  { label: "Anzeige", value: "LCD, beleuchtet" },
  { label: "Einheit", value: "g" },
  // TODO: do potwierdzenia przez właściciela (odczytane z wyświetlacza)
  { label: "Auflösung", value: "0,001 g" },
  { label: "Bedienung", value: "4 Tasten: Ein/Aus, M, P, T" },
  { label: "Stromversorgung", value: "USB-Kabel im Lieferumfang" },
  { label: "Aufbewahrung", value: "Hartschalenkoffer mit Schaumstoffeinlage" },
  { label: "Messbereich (max. Masse der Probe)", value: TODO_SPEC },
  { label: "Eindringtiefe", value: TODO_SPEC },
  { label: "Magnettyp", value: TODO_SPEC },
  { label: "Akku-Laufzeit", value: TODO_SPEC },
  { label: "Abmessungen", value: TODO_SPEC },
  { label: "Gewicht", value: TODO_SPEC },
  { label: "Zertifikate", value: TODO_SPEC },
];

export function displayValue(value: string): string {
  return value.replaceAll(TODO_SPEC, de.todo);
}
