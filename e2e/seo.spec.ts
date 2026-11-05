import { test, expect } from "@playwright/test";

test("SEO: title, description, canonical, OG, JSON-LD, Icon", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/WAGA GOLD/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toBeTruthy();
  const ogRes = await request.get(new URL(og!).pathname);
  expect(ogRes.status()).toBe(200);
  expect(ogRes.headers()["content-type"]).toMatch(/^image\//);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "de_AT");

  const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(ld["@type"]).toBe("Product");
  expect(ld.offers.price).toBe("499.00");
  expect(ld.offers.priceCurrency).toBe("EUR");

  const icon = await page.locator('link[rel="icon"]').first().getAttribute("href");
  expect((await request.get(icon!)).status()).toBe(200);
});

test("robots.txt und sitemap.xml", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const rt = await robots.text();
  expect(rt).toContain("Disallow: /api/");
  expect(rt).toContain("sitemap.xml");

  const sm = await request.get("/sitemap.xml");
  expect(sm.status()).toBe(200);
  const xml = await sm.text();
  for (const p of ["/impressum", "/agb", "/datenschutz", "/widerruf"]) expect(xml).toContain(`${p}</loc>`);
  expect(xml).toMatch(/<loc>[^<]*localhost:3000<\/loc>/);
  for (const p of ["/danke", "/abgebrochen", "/checkout", "/api"]) expect(xml).not.toContain(p);
});

test("noindex auf /danke, /abgebrochen, /checkout/mock, 404", async ({ page }) => {
  for (const url of ["/danke", "/abgebrochen", "/checkout/mock?session_id=mock_abc", "/nie-ma-takiej"]) {
    await page.goto(url);
    await expect(page.locator('meta[name="robots"]').first(), url).toHaveAttribute("content", /noindex/);
  }
});
