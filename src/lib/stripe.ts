import "server-only";
import Stripe from "stripe";

// Mock tylko przy STRIPE_MOCK=1 i NIGDY na produkcji Vercela.
export function isMock(): boolean {
  if (process.env.VERCEL_ENV === "production") return false;
  return process.env.STRIPE_MOCK === "1";
}

export function hasStripeKey(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key);
}

// Weryfikacja podpisu webhooka nie wymaga klucza API.
export function constructWebhookEvent(body: string, signature: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET not set");
  return new Stripe(process.env.STRIPE_SECRET_KEY || "sk_unused").webhooks.constructEvent(
    body,
    signature,
    secret,
  );
}

export function siteOrigin(req: Request): string {
  return process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
}
