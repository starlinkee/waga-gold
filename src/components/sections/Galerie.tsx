import Image from "next/image";
import { de } from "@/content/de";
import { images, imageH, imageW } from "@/content/images";

const gallery = [images.coin, images.top, images.angled, images.hero];

export function Galerie() {
  return (
    <section id="galerie" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.galerie.title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {gallery.map((img) => (
          <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded border border-border">
            <Image
              src={img.src}
              alt={img.alt}
              width={imageW}
              height={imageH}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover"
              style={{ objectPosition: img.position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}
