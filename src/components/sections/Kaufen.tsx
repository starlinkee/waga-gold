import { siteConfig } from "@/config/site";
import { de } from "@/content/de";
import { BuyForm } from "@/components/BuyForm";

export function Kaufen() {
  return (
    <section id="kaufen" className="scroll-mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">{de.kaufen.title}</h2>
        <p className="mt-4 text-3xl">
          <span data-testid="buy-price">{siteConfig.price.display}</span>{" "}
          <span className="text-base text-muted">{de.kaufen.vat}</span>
        </p>
        <BuyForm className="mt-6" />
      </div>
    </section>
  );
}
