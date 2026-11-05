import { siteConfig } from "@/config/site";
import { de } from "@/content/de";

// Pakiet 3 podmieni przycisk na checkout.
export function Kaufen() {
  return (
    <section id="kaufen" className="scroll-mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">{de.kaufen.title}</h2>
        <p className="mt-4 text-3xl">
          <span data-testid="buy-price">{siteConfig.price.display}</span>{" "}
          <span className="text-base text-muted">{de.kaufen.vat}</span>
        </p>
        <button
          type="button"
          className="mt-6 rounded bg-cta px-6 py-3 font-semibold text-cta-fg"
        >
          {de.nav.buy}
        </button>
      </div>
    </section>
  );
}
