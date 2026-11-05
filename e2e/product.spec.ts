import { test, expect } from "@playwright/test";

test("Produktseite: alle Abschnitte, CTA, Spezifikation, FAQ, Versand", async ({ page }) => {
  await page.goto("/");

  const hero = page.locator("section").first();
  const heroImg = hero.locator("img").first();
  await expect(heroImg).toBeVisible();
  expect(await heroImg.getAttribute("alt")).toMatch(/.+/);

  for (const name of ["Vorteile", "Spezifikation", "Lieferumfang", "Galerie", "FAQ", "Versand & Rückgabe", "Jetzt bestellen"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }

  // LCD-Zähler endet bei 134.000 g
  await expect(page.getByTestId("lcd-counter").locator("span")).toHaveText("134.000 g", { timeout: 5000 });

  // Tabelle: Einheit = g
  const einheit = page.getByRole("row", { name: /Einheit/ });
  await expect(einheit).toContainText("g");

  // FAQ klappt auf
  const item = page.locator("details", { hasText: "In welche Länder liefern Sie?" });
  await expect(item.getByText("Derzeit liefern wir nur nach Österreich.")).toBeHidden();
  await item.locator("summary").click();
  await expect(item.getByText("Derzeit liefern wir nur nach Österreich.")).toBeVisible();

  // Versand nur Österreich
  await expect(page.locator("#versand")).toContainText("Österreich");

  // CTA -> #kaufen mit Preis
  await page.getByRole("link", { name: "Jetzt kaufen – 499 €" }).last().click();
  await expect(page).toHaveURL(/#kaufen$/);
  await expect(page.locator("#kaufen")).toBeInViewport();
  await expect(page.getByTestId("buy-price")).toHaveText("499 €");
});

test("reduced motion: Zähler sofort bei 134.000 g", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("lcd-counter").locator("span")).toHaveText("134.000 g", { timeout: 500 });
});

test("kein TODO_SPEC im HTML, Platzhalter als 'Angabe folgt'", async ({ page }) => {
  const res = await page.goto("/");
  const html = await res!.text();
  expect(html).not.toContain("TODO_SPEC");
  await expect(page.getByRole("row", { name: /Wägebereich/ })).toContainText("Angabe folgt");
});

test("kein horizontales Scrollen (360 px), Bilder laden", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  const n = await page.locator("img").count();
  expect(n).toBeGreaterThanOrEqual(4);
  for (let i = 0; i < n; i++) {
    const img = page.locator("img").nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0)).toBe(true);
  }
});
