import "server-only";
import { LogNotifier } from "./log";
import { ResendNotifier } from "./resend";
import type { OrderNotifier } from "./types";

export type { Order, OrderNotifier } from "./types";

export function getNotifier(): OrderNotifier {
  const { RESEND_API_KEY, OWNER_EMAIL, RESEND_FROM } = process.env;
  if (RESEND_API_KEY && OWNER_EMAIL && RESEND_FROM) {
    return new ResendNotifier(RESEND_API_KEY, OWNER_EMAIL, RESEND_FROM);
  }
  return new LogNotifier();
}
