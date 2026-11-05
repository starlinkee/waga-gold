import type Stripe from "stripe";
import { siteConfig } from "@/config/site";
import { getStripe, hasStripeKey, isMock, siteOrigin } from "@/lib/stripe";

const redirect = (url: string) => Response.redirect(url, 303);

// Dane z requestu są ignorowane: cena, waluta, ilość tylko z siteConfig.
export async function POST(req: Request) {
  const origin = siteOrigin(req);
  try {
    if (isMock()) {
      const id = `mock_${crypto.randomUUID().replace(/-/g, "")}`;
      return redirect(`${origin}/checkout/mock?session_id=${id}`);
    }
    if (!hasStripeKey()) throw new Error("Stripe not configured");

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      // TODO: VAT / Stripe Tax do decyzji właściciela (cena brutto, bez automatic_tax).
      line_items: [
        {
          price_data: {
            currency: siteConfig.price.currency.toLowerCase(),
            unit_amount: siteConfig.price.amount,
            product_data: { name: siteConfig.brandName },
          },
          quantity: 1,
        },
      ],
      shipping_address_collection: {
        allowed_countries: [
          ...siteConfig.shippingCountries,
        ] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      locale: "de",
      success_url: `${origin}/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/abgebrochen`,
    });
    if (!session.url) throw new Error("No session url");
    return redirect(session.url);
  } catch (err) {
    console.error("[checkout] failed", err instanceof Error ? err.message : "unknown");
    return redirect(`${origin}/abgebrochen?error=1`);
  }
}
