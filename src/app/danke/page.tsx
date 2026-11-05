import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { de } from "@/content/de";
import { getStripe, hasStripeKey, isMock } from "@/lib/stripe";

export const metadata: Metadata = { robots: { index: false, follow: false } };

type Status = "paid" | "pending" | "none";

async function getStatus(sessionId: string): Promise<Status> {
  if (isMock() && /^mock_[a-z0-9]+$/.test(sessionId)) return "paid";
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId) || !hasStripeKey()) return "none";
  try {
    const s = await getStripe().checkout.sessions.retrieve(sessionId);
    if (s.payment_status === "paid") return "paid";
    // Opóźniona metoda płatności: zamówienie złożone, pieniądze jeszcze nie.
    if (s.status === "complete" && s.payment_status === "unpaid") return "pending";
    return "none";
  } catch {
    return "none";
  }
}

async function Result({ searchParams }: Pick<PageProps<"/danke">, "searchParams">) {
  const { session_id } = await searchParams;
  const status = typeof session_id === "string" ? await getStatus(session_id) : "none";
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">{de.danke.titles[status]}</h1>
      <p className="mt-4 text-muted">{de.danke.texts[status]}</p>
      <Link href="/" className="mt-8 inline-block text-accent underline">
        {de.danke.home}
      </Link>
    </div>
  );
}

export default function Page({ searchParams }: PageProps<"/danke">) {
  return (
    <Suspense fallback={null}>
      <Result searchParams={searchParams} />
    </Suspense>
  );
}
