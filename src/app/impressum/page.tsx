import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";
import { legalPages } from "@/content/legal";

const page = legalPages.impressum;

export const metadata: Metadata = { title: page.title, alternates: { canonical: "/impressum" } };

export default function Page() {
  return <LegalStub page={page} />;
}
