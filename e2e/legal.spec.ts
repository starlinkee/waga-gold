import { test, expect } from "@playwright/test";

const pages = [
  ["/impressum", "Impressum"],
  ["/agb", "AGB"],
  ["/datenschutz", "Datenschutz"],
  ["/widerruf", "Widerruf"],
] as const;

test("Rechtsseiten: h1, ENTWURF-Banner, aus dem Footer erreichbar", async ({ page }) => {
  for (const [href, name] of pages) {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name }).click();
    await expect(page).toHaveURL(href);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await expect(page.getByText("ENTWURF – rechtlicher Inhalt folgt")).toBeVisible();
  }
});

test("AGB/Widerruf-Links beim Kaufbutton", async ({ page }) => {
  await page.goto("/");
  const kaufen = page.locator("#kaufen");
  await kaufen.getByRole("link", { name: "AGB" }).click();
  await expect(page).toHaveURL(/\/agb$/);
  await page.goBack();
  await page.locator("#kaufen").getByRole("link", { name: "Widerruf" }).click();
  await expect(page).toHaveURL(/\/widerruf$/);
});
