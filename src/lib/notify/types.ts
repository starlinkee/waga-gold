export type Order = {
  sessionId: string;
  amount: number | null; // w centach
  currency: string | null;
  customerEmail: string | null;
  customerName: string | null;
  shippingAddress: string | null;
};

export interface OrderNotifier {
  notifyOwner(order: Order): Promise<void>;
}
