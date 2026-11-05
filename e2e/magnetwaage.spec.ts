import { test, expect } from "@playwright/test";

test("Magnetwaage: Hero, Messprinzip, FAQ, Sicherheit, Kontakt", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Echtheit");

  const prinzip = page.locator("#messprinzip");
  await expect(prinzip).toContainText("Diamagnetisch");
  await expect(prinzip).toContainText("Paramagnetisch");
  await expect(prinzip).toContainText("Ferromagnetisch");
  await expect(prinzip).toContainText("Beispiel");

  // zweite Methode sichtbar
  await expect(page.getByTestId("second-method")).toContainText("zweite Prüfmethode");

  // Schmuck-FAQ klappt auf
  const item = page.locator("details", { hasText: "Eignet sich das Gerät für Schmuck?" });
  await item.locator("summary").click();
  await expect(item.getByText("nicht geeignet")).toBeVisible();

  // Sicherheit: Herzschrittmacher
  await expect(page.locator("#sicherheit")).toContainText("Herzschrittmacher");
  await expect(page.locator("#sicherheit")).toContainText("entzündbares Aerosol");

  // Kontakt -> Impressum, Kaufen mit Preis
  await expect(page.locator("#kontakt").getByRole("link", { name: "Impressum" })).toHaveAttribute("href", "/impressum");
  await expect(page.getByTestId("buy-price")).toHaveText("499 €");
});

test("keine Schmuckwaagen-Texte, keine fremden Markennamen, kein TODO_SPEC", async ({ page, request }) => {
  const res = await request.get("/");
  const html = await res.text();
  for (const w of ["Präzisionswaage", "Kalibriergewicht", "Wägebereich", "MagneticScreenScale", "Goldanalytix", "MARAWE", "Referenzgerät", "TODO_SPEC"]) {
    expect(html, w).not.toContain(w);
  }
  await page.goto("/");
  const desc = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
  expect(desc).toContain("Echtheitsprüfung");
  expect(desc).not.toMatch(/Präzisionswaage|Juwelier/);
  const ld = (await page.locator('script[type="application/ld+json"]').textContent()) ?? "";
  expect(ld).not.toMatch(/Präzisionswaage|Juwelier/);
});

test("unbestätigte Herstellerangaben (250 g, 3 mm) werden nicht als Fakten gezeigt", async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(/250 ?g/);
  expect(text).not.toMatch(/3 ?mm/);
  expect(text).not.toMatch(/Wolfram.*erkennt|CE-/);
});
