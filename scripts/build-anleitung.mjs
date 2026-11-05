// Erzeugt public/downloads/anleitung.pdf (A4) aus src/content/*.ts mit Playwright-Chromium.
// Aufruf: npm run build:anleitung  (nicht Teil von `npm run build`).
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (...a) => resolve(root, ...a);

const A = await import("../src/content/anleitung.ts");
const P = await import("../src/content/product.ts");
const { siteConfig } = await import("../src/config/site.ts");
const { images } = await import("../src/content/images.ts");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const MISSING = '<span class="todo">[zu ergänzen]</span>';
const fill = (s) => esc(s).replaceAll(A.TODO, MISSING);
const li = (arr) => `<ul>${arr.map((t) => `<li>${fill(t)}</li>`).join("")}</ul>`;

// Entwurf automatisch, solange TODO_SPEC im Inhalt steht (oder ANLEITUNG_DRAFT=1/0 erzwingt).

// Entwurf automatisch, solange TODO_SPEC im Inhalt steht (ANLEITUNG_DRAFT=1/0 erzwingt).
const bodyHasTodo = JSON.stringify([A.lieferumfang, A.bedienelemente, A.messung, A.fehlersuche, A.pflege, A.kontakt]).includes(A.TODO);
const DRAFT = process.env.ANLEITUNG_DRAFT ? process.env.ANLEITUNG_DRAFT !== "0" : bodyHasTodo;

const img = (f) => `data:image/jpeg;base64,${readFileSync(p("public/images", f)).toString("base64")}`;
// Kadr (object-position) z images.ts, to samo źródło co strona.
const pos = (key) => images[key].position;
const fontCss = (name, file, weight) =>
  `@font-face{font-family:"${name}";font-weight:${weight};src:url(data:font/woff2;base64,${readFileSync(p("node_modules/geist/dist/fonts", file)).toString("base64")}) format("woff2");}`;

const safetyHtml = Object.entries(P.safetyGroups)
  .map(([g, meta]) => {
    const items = P.safety.filter((s) => s.group === g);
    return `<h3>${esc(meta.title)}</h3>${meta.note ? `<p class="note">${fill(meta.note)}</p>` : ""}<ul class="warn">${items
      .map((s) => `<li>${esc(s.text)}${s.inKitConfirmed ? "" : ` <em>(${esc("Zubehör noch zu bestätigen")})</em>`}</li>`)
      .join("")}</ul>`;
  })
  .join("");

const princ = P.principle;
const table = [
  ["Diamagnetisch", princ.dia.materials, "schwach abgestoßen", princ.dia.example],
  ["Paramagnetisch", princ.para.materials, "schwach angezogen", princ.para.example],
  ["Ferromagnetisch", princ.ferro.materials, "stark angezogen", princ.ferro.example],
];

const ch = (n, title, inner) => `<section class="ch"><h2><span class="n">${n}</span>${esc(title)}</h2>${inner}</section>`;
const K = A.kapitel;
const now = new Date();
const date = now.toLocaleDateString("de-AT", { day: "2-digit", month: "long", year: "numeric" });

const css = `
${fontCss("Geist", "geist-sans/Geist-Regular.woff2", 400)}
${fontCss("Geist", "geist-sans/Geist-SemiBold.woff2", 600)}
${fontCss("GeistMono", "geist-mono/GeistMono-Regular.woff2", 400)}
@page{size:A4;margin:22mm 18mm 22mm 18mm}
@page:first{margin:0}
*{box-sizing:border-box}
html{font-family:Geist,sans-serif;font-size:10.5pt;line-height:1.5;color:#14171c}
.mono,td.mono,.ex{font-family:GeistMono,monospace}
h1,h2,h3{font-weight:600;margin:0}
.cover{height:280mm;overflow:hidden;background:#0b0d10;color:#e8ecf1;padding:30mm 22mm;position:relative}
.cover .brand{font-size:14pt;letter-spacing:.3em;color:#9fe3ff}
.cover h1{font-size:30pt;line-height:1.15;margin-top:60mm;max-width:150mm}
.cover .ver{margin-top:14mm;color:#8b94a1;font-family:GeistMono,monospace}
.cover .lcd{position:absolute;left:22mm;bottom:28mm;font-family:GeistMono,monospace;font-size:28pt;color:#9fe3ff;border:1px solid #252a31;background:#14171c;padding:4mm 8mm}
.toc{page-break-before:always;page-break-after:always}
.toc h2{font-size:18pt;margin-bottom:8mm}
.toc ol{list-style:none;padding:0;margin:0}
.toc li{display:flex;gap:4mm;padding:2.5mm 0;border-bottom:1px solid #d9dde3}
.toc .n{font-family:GeistMono,monospace;color:#0b6e8f;width:8mm}
.ch{page-break-before:always}
.ch:nth-of-type(1){page-break-before:auto}
.ch>h2{font-size:17pt;background:#0b0d10;color:#e8ecf1;padding:4mm 5mm;margin-bottom:6mm;border-left:3mm solid #9fe3ff}
.ch>h2 .n{font-family:GeistMono,monospace;color:#9fe3ff;margin-right:4mm}
h3{font-size:12pt;margin:6mm 0 2mm}
p{margin:0 0 3mm}
ul,ol{margin:0 0 3mm;padding-left:6mm}
li{margin-bottom:1.5mm}
.warn li{color:#7a1015}
.callout{border:1.5px solid #d7262e;background:#fdecee;padding:4mm 5mm;margin:4mm 0;font-weight:600}
.note{color:#4b5563;font-size:9.5pt}
table{width:100%;border-collapse:collapse;margin:3mm 0 5mm;font-size:10pt}
th,td{border:1px solid #cdd2d9;padding:2mm 3mm;text-align:left;vertical-align:top}
th{background:#eef1f4}
.todo{color:#b45309;font-weight:600;background:#fef3c7;padding:0 1mm}
figure{margin:4mm 0;break-inside:avoid}
figure img{width:100%;max-height:80mm;object-fit:cover;border:1px solid #cdd2d9}
figcaption{font-size:9pt;color:#4b5563}
.wm{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:50}
.wm span{font-size:110pt;font-weight:600;color:rgba(215,38,46,.10);transform:rotate(-35deg);letter-spacing:.1em}
`;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(A.meta.title)}</title><style>${css}</style></head><body>
${DRAFT ? '<div class="wm"><span>ENTWURF</span></div>' : ""}
<section class="cover"><div class="brand">${esc(siteConfig.brandName)}</div><h1>${esc(A.meta.title)}</h1>
<div class="ver">${esc(A.meta.version)}<br>${esc(date)}${DRAFT ? "<br>ENTWURF" : ""}</div><div class="lcd">0.000 g</div></section>
<section class="toc"><h2>Inhaltsverzeichnis</h2><ol>${K.map((k, i) => `<li><span class="n">${i + 1}</span>${esc(k)}</li>`).join("")}</ol>
<p class="note" style="margin-top:8mm">Hersteller: ${esc(siteConfig.brandName)}. Kontaktdaten: ${MISSING}</p></section>
${ch(1, K[0], `<p>${esc(A.einfuehrung.zweck)}</p><div class="callout">${esc(A.einfuehrung.hinweis)}</div>
<h3>Messprinzip in Kürze</h3><p>${esc(princ.intro)}</p><p>${esc(P.SECOND_METHOD)}</p>
<h3>Vorteile</h3>${li(P.benefits)}<h3>${esc(A.einfuehrung.grenzenTitel)}</h3>${li(P.limits)}`)}
${ch(2, K[1], `<div class="callout">Lesen Sie diese Hinweise vor der ersten Benutzung vollständig.</div>${safetyHtml}
<h3>Arbeitsplatz</h3>${li(["Arbeiten Sie auf einer freien, stabilen Fläche. Keine anderen Magnete und keine losen Metallteile in Reichweite.", "Magnet und Messaufsatz nie ruckartig bewegen oder zusammenschnappen lassen.", "Kinder und Personen mit Herzschrittmacher fernhalten."])}
<h3>Reinigung</h3>${li(["Nur trocken reinigen, Gerät vorher ausschalten und vom Strom trennen.", "Keine Spraydosen oder Flüssigkeiten auf Elektronik und Magnet."])}`)}
${ch(3, K[2], `<p>${esc(A.lieferumfang.intro)}</p><table><tr><th>Teil</th><th>Funktion</th></tr>${A.lieferumfang.items.map((i) => `<tr><td>${esc(i.name)}</td><td>${i.note ? fill(i.note) : "–"}</td></tr>`).join("")}</table>
<figure><img src="${img("koffer-inhalt-oben.jpeg")}" alt="" style="object-position:${pos("top")};height:80mm"><figcaption>Geöffneter Koffer mit Waage, Messaufsatz, Zylinder und USB-Kabel.</figcaption></figure><p>${fill(A.lieferumfang.offen)}</p>`)}
${ch(4, K[3], `<p>${esc(A.bedienelemente.intro)}</p><table><tr><th>Taste</th><th>Funktion</th></tr>${A.bedienelemente.rows.map((r) => `<tr><td class="mono">${esc(r.key)}</td><td>${fill(r.func)}</td></tr>`).join("")}</table>
<figure><img src="${img("koffer-display-0000-crop.jpeg")}" alt="" style="object-position:50% 50%"><figcaption>Beleuchtetes LCD im Ruhezustand: 0.000 g.</figcaption></figure><p>${esc(A.bedienelemente.display)}</p>`)}
${ch(5, K[4], `<h3>Schritt für Schritt</h3><ol>${A.messung.steps.map((s) => `<li>${fill(s)}</li>`).join("")}</ol>
<p>${fill(A.messung.kapsel)}</p><p>${fill(A.messung.masse)}</p>
<h3>Anzeige deuten</h3><p>${esc(A.messung.deutenIntro)}</p>
<table><tr><th>Verhalten</th><th>Beispiele</th><th>Wirkung</th><th>Anzeige (Beispiel)</th></tr>${table.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td class="mono">${esc(r[3])}</td></tr>`).join("")}</table>
<p class="note">${esc(princ.exampleNote)} ${fill(A.messung.vorzeichenHinweis)}</p><p>${esc(princ.ptPdNote)}</p><p>${esc(A.messung.vergleich)}</p>
<div class="callout">${esc(P.SECOND_METHOD)}</div>`)}
${ch(6, K[5], `<p>${esc(A.fehlersuche.intro)}</p><table><tr><th>Problem</th><th>Mögliche Ursache</th><th>Abhilfe</th></tr>${A.fehlersuche.rows.map((r) => `<tr><td>${esc(r.problem)}</td><td>${esc(r.ursache)}</td><td>${esc(r.abhilfe)}</td></tr>`).join("")}</table><p>${fill(A.fehlersuche.fehlercodes)}</p>`)}
${ch(7, K[6], `<h3>Pflege</h3>${li(A.pflege.pflege)}<h3>Lagerung</h3>${li(A.pflege.lagerung)}<h3>Entsorgung</h3><p>${fill(A.pflege.entsorgung)}</p>`)}
${ch(8, K[7], `<p>${esc(A.kontakt.text)}</p><table>${A.kontakt.rows.map((r) => `<tr><th>${esc(r.label)}</th><td>${fill(r.value)}</td></tr>`).join("")}</table><p class="note">Hersteller: ${esc(siteConfig.brandName)}</p>`)}
</body></html>`;

const hash = createHash("sha256").update(html.replace(/ \d{2}\. \w+ \d{4}/g, "")).digest("hex").slice(0, 12);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
mkdirSync(p("public/downloads"), { recursive: true });
const buf = await page.pdf({
  format: "A4",
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: `<div style="width:100%;font-size:8px;color:#6b7280;padding:0 18mm;display:flex;justify-content:space-between;font-family:sans-serif"><span>${esc(siteConfig.brandName)} – Bedienungsanleitung${DRAFT ? " – ENTWURF" : ""}</span><span>Seite <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  preferCSSPageSize: true,
});
await browser.close();
writeFileSync(p("public/downloads/anleitung.pdf"), buf);
const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`anleitung.pdf: ${pages} Seiten, ${(buf.length / 1024).toFixed(0)} kB, Entwurf=${DRAFT}, Quelle=${hash}`);
