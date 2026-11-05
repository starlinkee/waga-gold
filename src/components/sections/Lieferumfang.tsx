import Image from "next/image";
import { de } from "@/content/de";
import { images, imageH, imageW } from "@/content/images";
import { kit } from "@/content/kit";
import { displayValue } from "@/content/spec";

export function Lieferumfang() {
  return (
    <section id="lieferumfang" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16">
      <h2 className="text-2xl font-semibold">{de.lieferumfang.title}</h2>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
        <ul className="space-y-3">
          {kit.map((k) => (
            <li key={k.name} className="rounded border border-border bg-surface px-4 py-3">
              {k.name}
              {k.note ? (
                <span className="text-muted"> – Funktion: {displayValue(k.note)}</span>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="relative aspect-[4/3] overflow-hidden rounded border border-border">
          <Image
            src={images.top.src}
            alt={images.top.alt}
            width={imageW}
            height={imageH}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover"
              style={{ objectPosition: images.top.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
