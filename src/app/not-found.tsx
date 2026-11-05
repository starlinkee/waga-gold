import Link from "next/link";
import type { Metadata } from "next";
import { de } from "@/content/de";

export const metadata: Metadata = { title: de.notFound.title, robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-fg">{de.notFound.title}</h1>
      <p className="mt-4 text-muted">{de.notFound.text}</p>
      <Link href="/" className="mt-8 inline-block text-accent underline">
        {de.notFound.back}
      </Link>
    </div>
  );
}
