import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { de } from "@/content/de";
import { siteConfig } from "@/config/site";
import { isMock } from "@/lib/stripe";
import { handleCheckoutCompleted } from "@/lib/orders";

export const metadata: Metadata = { robots: { index: false, follow: false } };

async function complete(formData: FormData) {
  "use server";
  if (!isMock()) notFound();
  const id = String(formData.get("session_id") ?? "");
  if (!/^mock_[a-z0-9]+$/.test(id)) notFound();
  await handleCheckoutCompleted({
    sessionId: id,
    amount: siteConfig.price.amount,
    currency: siteConfig.price.currency.toLowerCase(),
    customerEmail: "test@example.com",
    customerName: "Test Kunde",
    shippingAddress: "Teststraße 1, 1010 Wien, AT",
  });
  redirect(`/danke?session_id=${id}`);
}

async function Mock({ searchParams }: Pick<PageProps<"/checkout/mock">, "searchParams">) {
  const { session_id } = await searchParams; // najpierw dane runtime: isMock() ma być liczone przy żądaniu, nie w buildzie
  if (!isMock()) notFound();
  const id = typeof session_id === "string" ? session_id : "";
  if (!/^mock_[a-z0-9]+$/.test(id)) notFound();
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="rounded border border-border bg-surface px-4 py-2 font-mono text-accent">
        {de.checkout.mockBanner}
      </p>
      <h1 className="mt-8 text-3xl font-semibold">{de.checkout.mockTitle}</h1>
      <p className="mt-4 text-muted">{siteConfig.brandName}</p>
      <p className="mt-2 text-xl">
        {de.checkout.mockAmountLabel}: <span>{de.checkout.mockAmount}</span>
      </p>
      <p className="mt-2 text-muted">{de.checkout.mockShipping}</p>
      <form action={complete} className="mt-8 flex flex-col items-center gap-4">
        <input type="hidden" name="session_id" value={id} />
        <button type="submit" className="rounded bg-cta px-6 py-3 font-semibold text-cta-fg">
          {de.checkout.mockComplete}
        </button>
        <a href="/abgebrochen" className="text-accent underline">
          {de.checkout.mockCancel}
        </a>
      </form>
    </div>
  );
}

export default function Page({ searchParams }: PageProps<"/checkout/mock">) {
  return (
    <Suspense fallback={null}>
      <Mock searchParams={searchParams} />
    </Suspense>
  );
}
