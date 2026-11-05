import type { Order, OrderNotifier } from "./types";

export class ResendNotifier implements OrderNotifier {
  constructor(
    private apiKey: string,
    private to: string,
    private from: string,
  ) {}

  async notifyOwner(o: Order): Promise<void> {
    const amount = o.amount != null ? (o.amount / 100).toFixed(2) : "?";
    const text = [
      o.isTest ? "*** TEST (Mock) – keine echte Bestellung ***" : "Neue Bestellung / Nowe zamówienie",
      `Session: ${o.sessionId}`,
      `Betrag: ${amount} ${(o.currency ?? "").toUpperCase()}`,
      `Kunde: ${o.customerName ?? "-"} <${o.customerEmail ?? "-"}>`,
      `Lieferadresse: ${o.shippingAddress ?? "-"}`,
    ].join("\n");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: this.from, to: [this.to], subject: o.isTest ? "[TEST] Neue Bestellung" : "Neue Bestellung", text }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
  }
}
