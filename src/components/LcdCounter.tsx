"use client";

import { useEffect, useState } from "react";
import { LCD_TARGET } from "@/content/de";

const DURATION = 1500;
const format = (v: number) => v.toFixed(3);
const finalText = `${format(LCD_TARGET)} g`;

export function LcdCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      raf = requestAnimationFrame(() => setValue(LCD_TARGET));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(LCD_TARGET * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
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
      <span aria-hidden="true">
        {format(value)} g
      </span>
    </div>
  );
}
