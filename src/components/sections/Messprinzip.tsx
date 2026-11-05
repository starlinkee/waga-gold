import { de } from "@/content/de";
import { principle } from "@/content/product";

// Własny schemat: magnet pod próbką, strzałka = kierunek siły. Odczyty to przykłady, nie pomiary.
function Diagram({ direction }: { direction: "up" | "down" | "down-strong" }) {
  const strong = direction === "down-strong";
  const down = direction !== "up";
  return (
    <svg viewBox="0 0 120 100" className="mx-auto h-28 w-full max-w-[160px]" aria-hidden="true">
      <circle cx="60" cy="28" r="14" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      <rect x="35" y="72" width="50" height="16" rx="2" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2" />
      <path
        d={down ? "M60 48 V66 M54 60 L60 66 L66 60" : "M60 66 V48 M54 54 L60 48 L66 54"}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={strong ? 4 : 2}
      />
    </svg>
  );
}

const cards = [
  { ...principle.dia, dir: "up" as const },
  { ...principle.para, dir: "down" as const },
  { ...principle.ferro, dir: "down-strong" as const },
];

export function Messprinzip() {
  return (
    <section id="messprinzip" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.messprinzip.title}</h2>
      <p className="mt-4 max-w-3xl text-muted">{principle.intro}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded border border-border bg-surface p-6 text-center">
            <Diagram direction={c.dir} />
            <h3 className="mt-2 font-mono text-lg text-accent">{c.title}</h3>
            <p className="text-sm text-muted">{c.materials}</p>
            <p className="mt-3 text-muted">{c.text}</p>
            <p className="mt-4 font-mono text-xl text-fg">
              {c.example} <span className="text-xs text-muted">({de.messprinzip.example})</span>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{principle.exampleNote}</p>
      <p className="mt-2 text-sm text-muted">{principle.ptPdNote}</p>
    </section>
  );
}
