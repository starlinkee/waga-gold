import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

async function pdfText(file: string): Promise<string> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(file)), useSystemFonts: true }).promise;
  let out = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const c = await (await doc.getPage(i)).getTextContent();
    out += c.items.map((it) => ("str" in it ? it.str : "")).join(" ") + "\n";
  }
  expect(doc.numPages).toBeGreaterThanOrEqual(8);
  expect(doc.numPages).toBeLessThanOrEqual(12);
  return out;
}

const HREF = "/downloads/anleitung.pdf";

test("Anleitung (PDF): Link in Lieferumfang und Footer, öffnet in neuer Karte, PDF korrekt ausgeliefert", async ({ page, context, request }) => {
  await page.goto("/");
  const inKit = page.locator("#lieferumfang").getByRole("link", { name: /Anleitung \(PDF\)/ });
  const inFooter = page.locator("footer").getByRole("link", { name: /Anleitung \(PDF\)/ });
  for (const link of [inKit, inFooter]) {
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", HREF);
    await expect(link).toHaveAttribute("target", "_blank");
    expect(await link.getAttribute("download")).toBeNull();
  }

  // Headless-Chromium hat keinen PDF-Viewer: die neue Karte bleibt leer, daher Navigation über die Requests prüfen.
  const requested: string[] = [];
  context.on("request", (r) => requested.push(new URL(r.url()).pathname));
  const [popup] = await Promise.all([context.waitForEvent("page"), inKit.click()]);
  await expect.poll(() => requested).toContain(HREF);
  await popup.close();

  const res = await request.get(HREF);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/pdf");
  expect(res.headers()["content-disposition"] ?? "").not.toMatch(/attachment/);
  const body = await res.body();
  expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  expect(body.length).toBeGreaterThan(50_000);
  expect(body.length).toBeLessThan(5_000_000);
});

test("Anleitung (PDF): Inhalt – ENTWURF und Warnungen vorhanden, keine fremden Marken; Fehlerfall 404", async ({ request }) => {
  const file = "public/downloads/anleitung.pdf";
  const text = await pdfText(file);
  expect(text).toContain("ENTWURF");
  expect(text).toContain("Herzschrittmacher");
  expect(text).not.toMatch(new RegExp(["Magnetic" + "ScreenScale", "Gold" + "analytix", "MAR" + "AWE", "Referenz" + "gerät"].join("|"), "i"));
  expect(readFileSync(file).length).toBeGreaterThan(50_000);

  const missing = await request.get("/downloads/nie-ma.pdf");
  expect(missing.status()).toBe(404);
});
