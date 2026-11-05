import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";
import { legalPages } from "@/content/legal";

const page = legalPages.datenschutz;

export const metadata: Metadata = { title: page.title, alternates: { canonical: "/datenschutz" } };

export default function Page() {
  return <LegalStub page={page} />;
}
