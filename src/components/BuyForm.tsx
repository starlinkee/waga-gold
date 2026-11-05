import { de } from "@/content/de";

// Zwykły formularz POST — działa bez JS. Kolor cta tylko na przycisku.
export function BuyForm({ className = "" }: { className?: string }) {
  return (
    <form action="/api/checkout" method="POST" className={className}>
      <button
        type="submit"
        className="rounded bg-cta px-6 py-3 font-semibold text-cta-fg"
      >
        {de.nav.buy}
      </button>
    </form>
  );
}
