import { constructWebhookEvent } from "@/lib/stripe";
import { handleCheckoutCompleted, orderFromSession } from "@/lib/orders";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Bad Request", { status: 400 });

  const body = await req.text();
  let event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Powiadomienie o zamówieniu tylko dla opłaconej sesji (payment_status === "paid").
  // completed + unpaid (opóźnione metody, np. SEPA) czeka na async_payment_succeeded.
  let notified = false;
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        notified = await handleCheckoutCompleted(orderFromSession(session));
      } else {
        console.info("[order] payment pending, no notification", session.id);
      }
      break;
    }
    case "checkout.session.async_payment_failed":
      console.info("[order] async payment failed", event.data.object.id);
      break;
  }
  return Response.json({ received: true, notified });
}
