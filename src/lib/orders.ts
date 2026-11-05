import "server-only";
import type Stripe from "stripe";
import { getNotifier, type Order } from "@/lib/notify";

export function orderFromSession(s: Stripe.Checkout.Session): Order {
  const ship = s.collected_information?.shipping_details;
  const a = ship?.address;
  return {
    sessionId: s.id,
    amount: s.amount_total,
    currency: s.currency,
    customerEmail: s.customer_details?.email ?? null,
    customerName: s.customer_details?.name ?? ship?.name ?? null,
    shippingAddress: a
      ? [ship?.name, a.line1, a.line2, `${a.postal_code ?? ""} ${a.city ?? ""}`.trim(), a.country]
          .filter(Boolean)
          .join(", ")
      : null,
  };
}

// Wspólna ścieżka: webhook i mock. Błąd powiadomienia nie wywraca wywołania.
export async function handleCheckoutCompleted(order: Order): Promise<void> {
  try {
    await getNotifier().notifyOwner(order);
  } catch (err) {
    console.error("[order-notification] failed", err instanceof Error ? err.message : "unknown");
  }
}
