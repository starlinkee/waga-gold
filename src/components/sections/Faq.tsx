import { de } from "@/content/de";
import { displayValue } from "@/content/spec";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.faq.title}</h2>
      <div className="mt-8 space-y-3">
        {de.faq.items.map((i) => (
          <details key={i.q} className="group rounded border border-border bg-surface px-4 py-3">
            <summary className="cursor-pointer font-medium">{i.q}</summary>
            <p className="mt-2 text-muted">{displayValue(i.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
