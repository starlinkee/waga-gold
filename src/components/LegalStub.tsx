import { legalBanner, legalTodo, type LegalPage } from "@/content/legal";

export function LegalStub({ page }: { page: LegalPage }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p role="note" className="rounded border border-border bg-surface px-4 py-2 font-mono text-sm text-accent">
        {legalBanner}
      </p>
      <h1 className="mt-8 text-3xl font-semibold text-fg">{page.title}</h1>
      {page.sections.map((s) => (
        <section key={s} className="mt-8">
          <h2 className="text-xl font-semibold">{s}</h2>
          <p className="mt-2 text-muted">{legalTodo}</p>
        </section>
      ))}
    </div>
  );
}
