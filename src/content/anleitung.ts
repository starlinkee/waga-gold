// Texte nur für die Bedienungsanleitung (PDF). Fakten/Warnungen kommen aus product.ts.
// Import-frei (wird auch vom Node-Skript scripts/build-anleitung.mjs geladen).
// "TODO_SPEC" = nicht bestätigt für UNSER Gerät; im PDF als "[zu ergänzen]" sichtbar (ENTWURF).

export const TODO = "TODO_SPEC";

export const meta = {
  title: "Bedienungsanleitung – Magnetwaage zur Echtheitsprüfung",
  version: "Version 0.1 (Entwurf)",
};

export const einfuehrung = {
  zweck:
    "Die Magnetwaage ist ein schneller, zerstörungsfreier Vorabtest für Münzen und Barren aus Gold, Silber, Platin und Palladium. Sie zeigt, wie sich ein Stück im Magnetfeld eines starken Magneten verhält.",
  hinweis:
    "Ein Magnettest ist nie die einzige Methode. Er liefert einen Hinweis, keinen Beweis. Führen Sie immer eine zweite, unabhängige Prüfung durch, zum Beispiel eine Dichtemessung.",
  grenzenTitel: "Was das Gerät nicht kann",
};

export const lieferumfang = {
  intro: "Der Koffer enthält nach heutigem Stand:",
  items: [
    { name: "Waage mit beleuchtetem LCD-Display", note: "" },
    { name: "Messaufsatz (Würfel)", note: TODO },
    { name: "Zylinder", note: TODO },
    { name: "USB-Kabel", note: "" },
    { name: "Hartschalenkoffer mit Schaumstoffeinlage", note: "" },
  ],
  offen:
    "Ob Stabmagnet, Graphitplatte, Antistatik-Spray, Netzteil oder Akku zum Lieferumfang gehören, ist noch offen: " + TODO,
};

export const bedienelemente = {
  intro: "Das Gerät hat vier Tasten.",
  rows: [
    { key: "Ein/Aus", func: "Schaltet das Gerät ein und aus." },
    { key: "M", func: TODO },
    { key: "P", func: TODO },
    { key: "T", func: TODO },
  ],
  display:
    "Das beleuchtete LCD zeigt die Masse in Gramm mit drei Nachkommastellen (Auflösung 0,001 g). Die Auflösung der Anzeige ist keine Aussage über die Genauigkeit.",
};

export const messung = {
  steps: [
    "Stellen Sie das Gerät auf eine stabile, waagerechte Unterlage ohne Erschütterungen und ohne Zugluft.",
    "Halten Sie Abstand zu Metallgegenständen, weiteren Magneten und Elektronik. Sie können die Anzeige verfälschen.",
    "Schalten Sie das Gerät ein und warten Sie, bis die Anzeige ruhig steht.",
    "Setzen Sie die Anzeige auf null (Tara). Bedienung: " + TODO,
    "Legen Sie die Probe vorsichtig mittig auf den Messaufsatz. Kein Fallenlassen, keine Schläge.",
    "Warten Sie, bis sich die Anzeige beruhigt hat, und lesen Sie den Wert ab.",
    "Nehmen Sie die Probe wieder ab und prüfen Sie, ob die Anzeige auf null zurückkehrt.",
    "Wiederholen Sie die Messung mehrmals und vergleichen Sie die Werte.",
  ],
  kapsel:
    "Messung durch Blister oder Kapsel: möglich, durch Messungen zu bestätigen. " + TODO,
  masse: "Maximale Probenmasse und Eindringtiefe: " + TODO,
  deutenIntro:
    "Die Anzeige hängt vom magnetischen Verhalten des Materials ab. Die Beispielwerte dienen nur der Veranschaulichung und sind keine Messwerte dieses Geräts.",
  vorzeichenHinweis:
    "Das Vorzeichen der Anzeige muss noch an unserem Gerät durch Messungen bestätigt werden: " + TODO,
  vergleich:
    "Vergleichen Sie eine unbekannte Probe möglichst mit einer sicher echten Probe gleicher Art und Größe.",
};

export const fehlersuche = {
  intro: "Wenn die Anzeige nicht ruhig steht oder unplausibel ist:",
  rows: [
    { problem: "Anzeige schwankt", ursache: "Erschütterungen, Zugluft oder Bewegung am Tisch.", abhilfe: "Anderen, stabilen Standort wählen; Abstand zu Lüftung und Türen." },
    { problem: "Anzeige driftet", ursache: "Gerät noch nicht eingeschwungen oder Temperaturwechsel.", abhilfe: "Einige Minuten warten, dann erneut auf null setzen." },
    { problem: "Anzeige ändert sich ohne Probe", ursache: "Metall, Magnete oder Elektronik in der Nähe.", abhilfe: "Umgebung freiräumen, Abstand vergrößern." },
    { problem: "Anzeige bleibt dunkel", ursache: "Stromversorgung nicht angeschlossen oder Gerät aus.", abhilfe: "USB-Kabel prüfen, Gerät einschalten." },
  ],
  fehlercodes: "Fehlercodes der Anzeige: " + TODO,
};

export const pflege = {
  pflege: [
    "Gerät trocken halten und vor Staub schützen.",
    "Messaufsatz nur mit einem trockenen, fusselfreien Tuch abwischen. Keine Flüssigkeiten, keine Lösungsmittel.",
    "Vor dem Reinigen Gerät ausschalten und vom Strom trennen.",
  ],
  lagerung: [
    "Nach Gebrauch im Hartschalenkoffer aufbewahren.",
    "Magnet getrennt von Elektronik, Datenträgern und mechanischen Uhren lagern.",
    "Nicht in der Nähe von Hitzequellen lagern.",
  ],
  entsorgung:
    "Elektronische Geräte und Akkus gehören nicht in den Hausmüll. Entsorgen Sie sie nach den geltenden Vorschriften über eine Sammelstelle. Angaben zur Rücknahme: " + TODO,
};

export const kontakt = {
  text: "Kontaktdaten des Herstellers finden Sie im Impressum auf der Website.",
  rows: [
    { label: "E-Mail", value: TODO },
    { label: "Telefon", value: TODO },
    { label: "Anschrift", value: TODO },
  ],
};

export const kapitel = [
  "Einführung",
  "Sicherheitshinweise",
  "Lieferumfang",
  "Bedienelemente",
  "Inbetriebnahme und Messung",
  "Fehlersuche",
  "Pflege, Lagerung, Entsorgung",
  "Kontakt",
] as const;
