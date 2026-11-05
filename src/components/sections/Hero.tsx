import Image from "next/image";
import { siteConfig } from "@/config/site";
import { de } from "@/content/de";
import { heroCrop, images } from "@/content/images";
import { BuyForm } from "@/components/BuyForm";
import { LcdCounter } from "@/components/LcdCounter";

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="font-mono text-sm tracking-widest text-accent">{siteConfig.brandName}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{de.hero.title}</h1>
          <p className="mt-4 max-w-md text-muted">{de.hero.sub}</p>
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
            src={heroCrop.src}
            alt={images.hero.alt}
            width={heroCrop.width}
            height={heroCrop.height}
            priority
            quality={60}
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, calc(100vw - 32px)"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
