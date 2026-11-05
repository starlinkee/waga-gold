import { de } from "@/content/de";
import { safety, safetyGroups, type SafetyGroup } from "@/content/product";

export function Sicherheit() {
  const groups = Object.keys(safetyGroups) as SafetyGroup[];
  return (
    <section id="sicherheit" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.sicherheit.title}</h2>
      <p className="mt-2 text-muted">{de.sicherheit.intro}</p>
      {groups.map((g) => (
        <div key={g} className="mt-6 rounded border border-border bg-surface p-5">
          <h3 className="font-mono text-lg text-accent">{safetyGroups[g].title}</h3>
          {safetyGroups[g].note ? <p className="text-sm text-muted">{safetyGroups[g].note}</p> : null}
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {safety
              .filter((s) => s.group === g)
              .map((s) => (
                <li key={s.text}>{s.text}</li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
