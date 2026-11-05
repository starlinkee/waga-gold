import { test, expect } from "@playwright/test";
import { siteConfig } from "../src/config/site";

const legal = [
  { href: "/impressum", name: "Impressum" },
  { href: "/agb", name: "AGB" },
  { href: "/datenschutz", name: "Datenschutz" },
  { href: "/widerruf", name: "Widerruf" },
];

test("Startseite: Marke, Preis, Header, Footer", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "de-AT");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(siteConfig.brandName);
  await expect(page.getByTestId("price")).toHaveText("499 €");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
  await expect(page.getByRole("link", { name: "Jetzt kaufen – 499 €" })).toHaveAttribute("href", "#kaufen");
});

test("Rechtliche Links im Footer laden", async ({ page }) => {
  for (const l of legal) {
    await page.goto("/");
    const link = page.locator("footer").getByRole("link", { name: l.name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", l.href);
    const res = await page.request.get(l.href);
    expect(res.status()).toBe(200);
    await link.click();
    await expect(page).toHaveURL(l.href);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(l.name);
  }
});

test("Unbekannte Seite: 404 mit eigener Seite", async ({ page }) => {
  const res = await page.goto("/nie-ma-takiej");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Seite nicht gefunden" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Zur Startseite" })).toBeVisible();
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe("rgb(11, 13, 16)");
});
