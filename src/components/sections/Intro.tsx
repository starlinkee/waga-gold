import { de } from "@/content/de";
import { SECOND_METHOD } from "@/content/product";

export function Intro() {
  return (
    <section id="intro" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.intro.title}</h2>
      {de.intro.paragraphs.map((p) => (
        <p key={p} className="mt-4 text-muted">{p}</p>
      ))}
      <p
        data-testid="second-method"
        className="mt-6 rounded border border-border bg-surface px-4 py-3 text-fg"
      >
        {SECOND_METHOD}
      </p>
    </section>
  );
}
