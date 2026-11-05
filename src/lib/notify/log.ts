import type { Order, OrderNotifier } from "./types";

const mask = (v: string | null) => (v ? `${v.slice(0, 2)}***` : null);

// Bez klucza Resend: tylko log, bez pełnych danych osobowych.
export class LogNotifier implements OrderNotifier {
  async notifyOwner(order: Order): Promise<void> {
    console.info("[order-notification]", {
      sessionId: order.sessionId,
      amount: order.amount,
      currency: order.currency,
      email: mask(order.customerEmail),
      shipping: mask(order.shippingAddress),
    });
  }
}
