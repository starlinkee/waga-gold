import Link from "next/link";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-mono text-lg font-semibold tracking-widest text-accent">
          {siteConfig.brandName}
        </Link>
        <a
          href="#kaufen"
          className="rounded bg-cta px-4 py-2 text-sm font-semibold text-cta-fg"
        >
          {de.nav.buy}
        </a>
      </div>
    </header>
  );
}
