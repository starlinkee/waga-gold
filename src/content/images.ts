// TODO: docelowo zdjęcia na czarnym tle.
export const images = {
  hero: {
    src: "/images/koffer-display-0000.jpeg",
    alt: "Magnetwaage mit beleuchtetem LCD-Display, das 0.000 g anzeigt",
    position: "50% 66%",
  },
  coin: {
    src: "/images/koffer-muenze.jpeg",
    alt: "Münze in einer Kapsel auf dem schwarzen Messaufsatz",
    position: "50% 50%",
  },
  top: {
    src: "/images/koffer-inhalt-oben.jpeg",
    alt: "Offener Hartschalenkoffer von oben mit Waage, Messaufsatz, Zylinder und USB-Kabel",
    position: "50% 71%",
  },
  angled: {
    src: "/images/koffer-inhalt-schraeg.jpeg",
    alt: "Offener Koffer mit Schaumstoffeinlage und Zubehör im Schrägblick",
    position: "50% 60%",
  },
} as const;

// Wycinek 4:3 zdjęcia hero (lżejszy LCP); oryginał zostaje w galerii.
export const heroCrop = {
  src: "/images/koffer-display-0000-crop.jpeg",
  width: 1126,
  height: 845,
};

export const imageW = 1126;
export const imageH = 2000;
