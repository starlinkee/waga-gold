import Link from "next/link";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";
import { TODO_SPEC, displayValue } from "@/content/spec";

export function Versand() {
  return (
    <section id="versand" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.versand.title}</h2>
      <ul className="mt-6 space-y-2 text-muted">
        <li>
          {siteConfig.shippingCountries.includes("AT") ? de.versand.shipping : null}
        </li>
        <li>{de.versand.cost}: <span className="font-mono text-accent">{displayValue(TODO_SPEC)}</span></li>
        <li>{de.versand.time}: <span className="font-mono text-accent">{displayValue(TODO_SPEC)}</span></li>
        <li>
          {de.versand.returns}{" "}
          <Link href="/widerruf" className="text-accent underline">{de.versand.returnsLink}</Link>.
        </li>
      </ul>
    </section>
  );
}
