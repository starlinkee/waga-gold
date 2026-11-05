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

  if (event.type === "checkout.session.completed") {
    await handleCheckoutCompleted(orderFromSession(event.data.object));
  }
  return Response.json({ received: true });
}
