import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { de } from "@/content/de";
import { getStripe, hasStripeKey, isMock } from "@/lib/stripe";

export const metadata: Metadata = { robots: { index: false, follow: false } };

async function isPaid(sessionId: string): Promise<boolean> {
  if (isMock() && /^mock_[a-z0-9]+$/.test(sessionId)) return true;
  if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId) || !hasStripeKey()) return false;
  try {
    const s = await getStripe().checkout.sessions.retrieve(sessionId);
    return s.payment_status === "paid";
  } catch {
    return false;
  }
}

async function Result({ searchParams }: Pick<PageProps<"/danke">, "searchParams">) {
  const { session_id } = await searchParams;
  const paid = typeof session_id === "string" && (await isPaid(session_id));
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">{paid ? de.danke.title : de.danke.none}</h1>
      <p className="mt-4 text-muted">{paid ? de.danke.text : de.danke.noneText}</p>
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
