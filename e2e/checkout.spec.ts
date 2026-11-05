import { test, expect } from "@playwright/test";
import Stripe from "stripe";

const SECRET = "whsec_e2e_dummy";
const BUY = "Jetzt kaufen – 499 €";

function signedEvent(type = "checkout.session.completed", paymentStatus = "paid") {
  const payload = JSON.stringify({
    id: "evt_test",
    object: "event",
    type,
    data: {
      object: {
        id: "cs_test_e2e",
        object: "checkout.session",
        amount_total: 49900,
        currency: "eur",
        payment_status: paymentStatus,
        customer_details: { email: "a@b.at", name: "Test" },
      },
    },
  });
  const header = Stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET });
  return { payload, header };
}

test("Kauf (Mock): Startseite -> Testkasse -> Danke", async ({ page }) => {
  await page.goto("/");
  await page.locator("#kaufen").getByRole("button", { name: BUY }).click();
  await expect(page).toHaveURL(/\/checkout\/mock\?session_id=mock_/);
  await expect(page.getByText("499,00 €")).toBeVisible();
  await expect(page.getByText("Österreich")).toBeVisible();
  await page.getByRole("button", { name: "Testzahlung abschließen" }).click();
  await expect(page).toHaveURL(/\/danke\?session_id=mock_/);
  await expect(page.getByRole("heading", { name: "Danke für Ihre Bestellung" })).toBeVisible();
});

test("Hero-CTA führt zur Testkasse", async ({ page }) => {
  await page.goto("/");
  await page.locator("section").first().getByRole("button", { name: BUY }).click();
  await expect(page).toHaveURL(/\/checkout\/mock/);
});

test("Abbruch: Testkasse -> abgebrochen, erneut kaufen", async ({ page }) => {
  await page.goto("/");
  await page.locator("#kaufen").getByRole("button", { name: BUY }).click();
  await page.getByRole("link", { name: "Abbrechen" }).click();
  await expect(page).toHaveURL(/\/abgebrochen$/);
  await expect(page.getByText("es wurde nichts berechnet")).toBeVisible();
  await page.getByRole("button", { name: BUY }).click();
  await expect(page).toHaveURL(/\/checkout\/mock/);
});

test("Preismanipulation wird ignoriert", async ({ page, request }) => {
  const res = await request.post("/api/checkout", { form: { amount: "1" }, maxRedirects: 0 });
  expect(res.status()).toBe(303);
  const loc = res.headers()["location"];
  expect(loc).toContain("/checkout/mock");
  await page.goto(loc);
  await expect(page.getByText("499,00 €")).toBeVisible();
});

test("GET /api/checkout -> 405", async ({ request }) => {
  expect((await request.get("/api/checkout")).status()).toBe(405);
});

async function post(request: import("@playwright/test").APIRequestContext, type: string, status: string) {
  const { payload, header } = signedEvent(type, status);
  const res = await request.post("/api/stripe/webhook", {
    data: payload,
    headers: { "stripe-signature": header, "content-type": "application/json" },
  });
  expect(res.status()).toBe(200);
  return res.json();
}

test("Webhook: completed + paid -> Benachrichtigung", async ({ request }) => {
  expect(await post(request, "checkout.session.completed", "paid")).toEqual({ received: true, notified: true });
});

test("Webhook: completed + unpaid -> keine Benachrichtigung", async ({ request }) => {
  expect(await post(request, "checkout.session.completed", "unpaid")).toEqual({ received: true, notified: false });
});

test("Webhook: async_payment_succeeded -> Benachrichtigung", async ({ request }) => {
  expect(await post(request, "checkout.session.async_payment_succeeded", "paid")).toEqual({ received: true, notified: true });
});

test("Webhook: async_payment_failed -> 200, keine Benachrichtigung", async ({ request }) => {
  expect(await post(request, "checkout.session.async_payment_failed", "unpaid")).toEqual({ received: true, notified: false });
});

test("Webhook: falsche oder fehlende Signatur -> 400", async ({ request }) => {
  const { payload } = signedEvent();
  const bad = await request.post("/api/stripe/webhook", {
    data: payload,
    headers: { "stripe-signature": "t=1,v1=deadbeef", "content-type": "application/json" },
  });
  expect(bad.status()).toBe(400);
  const none = await request.post("/api/stripe/webhook", {
    data: payload,
    headers: { "content-type": "application/json" },
  });
  expect(none.status()).toBe(400);
});

test("/danke ohne session_id bestätigt nichts", async ({ page }) => {
  await page.goto("/danke");
  await expect(page.getByRole("heading", { name: "Keine Bestellung gefunden" })).toBeVisible();
  await expect(page.getByText("Danke für Ihre Bestellung")).toHaveCount(0);
});
