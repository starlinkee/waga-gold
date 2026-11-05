import Image from "next/image";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";
import { images, imageH, imageW } from "@/content/images";
import { LcdCounter } from "@/components/LcdCounter";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <Image
        src={images.hero.src}
        alt={images.hero.alt}
        width={imageW}
        height={imageH}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/90 to-bg/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-transparent to-bg/60" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-32">
        <h1 className="font-mono text-4xl font-semibold tracking-widest text-accent sm:text-6xl">
          {siteConfig.brandName}
        </h1>
        <p className="mt-4 text-xl text-fg">{de.hero.tagline}</p>
        <p className="mt-2 max-w-md text-muted">{de.hero.sub}</p>
        <div className="mt-8">
          <LcdCounter />
        </div>
        <p className="mt-8 text-2xl">
          <span className="text-muted">{de.hero.priceLabel}: </span>
          <span data-testid="price">{siteConfig.price.display}</span>
        </p>
        <a
          href="#kaufen"
          className="mt-6 inline-block rounded bg-cta px-6 py-3 font-semibold text-cta-fg"
        >
          {de.nav.buy}
        </a>
      </div>
    </section>
  );
}
