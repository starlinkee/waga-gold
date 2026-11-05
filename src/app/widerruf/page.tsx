import type { Metadata } from "next";
import { LegalStub } from "@/components/LegalStub";
import { legalPages } from "@/content/legal";

const page = legalPages.widerruf;

export const metadata: Metadata = { title: page.title, alternates: { canonical: "/widerruf" } };

export default function Page() {
  return <LegalStub page={page} />;
}
