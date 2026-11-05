import Link from "next/link";
import { de } from "@/content/de";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <nav
        aria-label="Rechtliches"
        className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-6 text-sm text-muted"
      >
        {de.footer.legal.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-accent">
            {l.label}
          </Link>
        ))}
        <a href={de.anleitung.href} target="_blank" rel="noopener" className="hover:text-accent">
          {de.anleitung.label}
        </a>
      </nav>
    </footer>
  );
}
