import { de } from "@/content/de";

export function LegalStub({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-fg">{title}</h1>
      <p className="mt-4 text-muted">{de.legalStub}</p>
    </div>
  );
}
