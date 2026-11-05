import { siteConfig } from "@/config/site";
import { de } from "@/content/de";

export default function Home() {
  return (
    <section id="kaufen" className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-mono text-5xl font-semibold tracking-widest text-accent">
        {siteConfig.brandName}
      </h1>
      <p className="mt-4 text-lg text-muted">{de.hero.tagline}</p>
      <p className="mt-8 text-2xl">
        <span className="text-muted">{de.hero.priceLabel}: </span>
        <span data-testid="price">{siteConfig.price.display}</span>
      </p>
    </section>
  );
}
