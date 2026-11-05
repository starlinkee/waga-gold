import Link from "next/link";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-mono text-lg font-semibold tracking-widest text-accent">
          {siteConfig.brandName}
        </Link>
        <nav aria-label="Abschnitte" className="hidden gap-6 text-sm text-muted md:flex">
          {de.nav.links.map((l) => (
            <Link key={l.href} href={`/${l.href}`} className="hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>
        <a href="#kaufen" className="rounded bg-cta px-4 py-2 text-sm font-semibold text-cta-fg whitespace-nowrap">
          {de.nav.buy}
        </a>
      </div>
    </header>
  );
}
