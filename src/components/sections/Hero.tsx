import Image from "next/image";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";
import { images, imageH, imageW } from "@/content/images";
import { BuyForm } from "@/components/BuyForm";
import { LcdCounter } from "@/components/LcdCounter";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
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
          <BuyForm className="mt-6" />
        </div>
        {/* Zdjęcie jako osobny kadr (nie pod tekstem), kadr na wyświetlaczu wagi. */}
        <div className="relative aspect-[4/3] overflow-hidden rounded border border-border">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            width={imageW}
            height={imageH}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover"
            style={{ objectPosition: images.hero.position }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
