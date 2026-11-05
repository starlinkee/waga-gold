import { de } from "@/content/de";
import { displayValue, specRows } from "@/content/spec";

export function Spezifikation() {
  return (
    <section id="spezifikation" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.spec.title}</h2>
      <div className="mt-8 overflow-x-auto rounded border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th scope="col" className="px-4 py-3 font-normal">{de.spec.labelHeader}</th>
              <th scope="col" className="px-4 py-3 font-normal">{de.spec.valueHeader}</th>
            </tr>
          </thead>
          <tbody>
            {specRows.map((r) => (
              <tr key={r.label} className="border-b border-border last:border-0">
                <th scope="row" className="px-4 py-3 font-normal">{r.label}</th>
                <td className="px-4 py-3 font-mono text-accent">{displayValue(r.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{de.spec.note}</p>
    </section>
  );
}
