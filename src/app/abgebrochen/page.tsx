import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { de } from "@/content/de";
import { BuyForm } from "@/components/BuyForm";

export const metadata: Metadata = { robots: { index: false, follow: false } };

async function Message({ searchParams }: Pick<PageProps<"/abgebrochen">, "searchParams">) {
  const { error } = await searchParams;
  return <p className="mt-4 text-muted">{error ? de.abgebrochen.error : de.abgebrochen.text}</p>;
}

export default function Page({ searchParams }: PageProps<"/abgebrochen">) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">{de.abgebrochen.title}</h1>
      <Suspense fallback={null}>
        <Message searchParams={searchParams} />
      </Suspense>
      <BuyForm className="mt-8" />
      <Link href="/" className="mt-6 inline-block text-accent underline">
        {de.abgebrochen.home}
      </Link>
    </div>
  );
}
