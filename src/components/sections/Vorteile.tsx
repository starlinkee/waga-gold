import { de } from "@/content/de";
import { benefits, limits } from "@/content/product";

export function Vorteile() {
  return (
    <section id="vorteile" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.vorteile.title}</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {benefits.map((b) => (
          <li key={b} className="rounded border border-border bg-surface p-5 text-muted">
            {b}
          </li>
        ))}
      </ul>
      <h3 className="mt-12 font-mono text-lg text-accent">{de.vorteile.limitsTitle}</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
        {limits.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </section>
  );
}
