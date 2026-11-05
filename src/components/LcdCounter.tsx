"use client";

import { useEffect, useState } from "react";
import { LCD_TARGET } from "@/content/de";

const DURATION = 1300;
const MAX_JITTER = 0.009; // ostatnie cyfry drgają jak przy stabilizacji wagi
const format = (v: number) => v.toFixed(3);
const finalText = `${format(LCD_TARGET)} g`;

export function LcdCounter() {
  const [value, setValue] = useState(LCD_TARGET);

  useEffect(() => {
    // reduced motion: od razu stan końcowy, bez drgań
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      if (t >= 1) {
        setValue(LCD_TARGET);
        return;
      }
      const amp = MAX_JITTER * (1 - t) ** 2;
      // |sin| + szybka zmiana fazy -> nieregularne, nieujemne odchylenie
      setValue(LCD_TARGET + amp * Math.abs(Math.sin(t * 90) * Math.cos(t * 37)) * 1.5);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      data-testid="lcd-counter"
      role="img"
      aria-label={finalText}
      aria-live="off"
      className="inline-block rounded border border-border bg-surface px-4 py-3 font-mono text-4xl text-accent tabular-nums shadow-[0_0_24px_-8px_var(--color-accent)] sm:text-5xl"
    >
      <span aria-hidden="true">{format(value)} g</span>
    </div>
  );
}
