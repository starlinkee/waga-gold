import Link from "next/link";
import { de } from "@/content/de";
import { TODO_SPEC, displayValue } from "@/content/spec";

// TODO_SPEC: Kontaktdaten (E-Mail, Telefon) vom Eigentümer.
export function Kontakt() {
  return (
    <section id="kontakt" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.kontakt.title}</h2>
      <p className="mt-4 text-muted">
        {de.kontakt.text}{" "}
        <Link href="/impressum" className="text-accent underline">{de.kontakt.impressum}</Link>.
      </p>
      <ul className="mt-4 space-y-1 text-muted">
        <li>{de.kontakt.email}: <span className="font-mono text-accent">{displayValue(TODO_SPEC)}</span></li>
        <li>{de.kontakt.phone}: <span className="font-mono text-accent">{displayValue(TODO_SPEC)}</span></li>
      </ul>
    </section>
  );
}
