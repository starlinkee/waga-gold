import { de } from "@/content/de";

export function Vorteile() {
  return (
    <section id="vorteile" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.vorteile.title}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {de.vorteile.items.map((i) => (
          <div key={i.title} className="rounded border border-border bg-surface p-6">
            <h3 className="font-mono text-lg text-accent">{i.title}</h3>
            <p className="mt-2 text-muted">{i.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
