// TODO_SPEC: Funktion von Würfel und Zylinder (Arbeitsnamen) mit dem Eigentümer klären.
// TODO_SPEC: Enthält der Zestaw einen Stabmagneten, eine Graphitplatte, Antistatik-Spray, ein Netzteil, eine Anleitung?
// (auf der Seite wird diese Liste nicht gezeigt)
export type KitItem = { name: string; note?: string };

export const kit: KitItem[] = [
  { name: "Waage mit LCD-Anzeige" },
  { name: "Messaufsatz (Würfel)", note: "TODO_SPEC" },
  { name: "Zylinder", note: "TODO_SPEC" },
  { name: "USB-Kabel" },
  { name: "Hartschalenkoffer mit Schaumstoffeinlage" },
];
