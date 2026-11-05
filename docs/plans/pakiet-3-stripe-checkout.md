# Pakiet 3 — Stripe Checkout (plan)

Źródło: `docs/BRIEF.md` (pakiet 3), qitem-20261105004439-22562565b9d6d866. Bazuje na pakiecie 2 (commit `04a2c94`).

## Cel
Klient klika „Jetzt kaufen – 499 €”, trafia do Stripe Checkout (hosted, EUR, 499 €, wysyłka tylko AT), po płatności widzi stronę podziękowania, po anulowaniu stronę anulowania. Webhook `checkout.session.completed` (z weryfikacją podpisu) wysyła właścicielowi powiadomienie mailowe (Resend za interfejsem; bez klucza = log). E2E działają bez prawdziwego Stripe (mock).

## Założenia
- Stan: `src/config/site.ts` (`price.amount = 49900`, `currency: "EUR"`, `shippingCountries: ["AT"]`), sekcja `#kaufen` w `src/components/sections/Kaufen.tsx`, CTA w `Hero.tsx` i `Header.tsx` (href `#kaufen`), `.env.example` ma już `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `OWNER_EMAIL`, `STRIPE_MOCK`.
- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true` (uwaga reviewera). Pod `cacheComponents` nie używaj `export const dynamic/revalidate`; dynamiczne strony (np. `/danke` czytające `searchParams`) renderuj w `<Suspense>` / przez `await connection()` zgodnie z aktualną dokumentacją Next 16 (sprawdź w docs, nie z pamięci). Route handlery POST są dynamiczne. Jeśli flagi blokują poprawne działanie, opisz to w handoffie zamiast je po cichu wyłączać.
- Zależności: `stripe` (oficjalny SDK, Node runtime). Resend: wystarczy `fetch` do API Resend albo pakiet `resend` — wybór buildera, byle za interfejsem.
- Bez prawdziwych kluczy w repo. Bez `git push`.

## Kroki
1. **Konfiguracja serwerowa** `src/lib/stripe.ts`: czyta env tylko po stronie serwera. Tryb mock = `STRIPE_MOCK === "1"`. **Mock nigdy na produkcji Vercela**: jeśli `VERCEL_ENV === "production"`, mock jest wyłączony niezależnie od `STRIPE_MOCK`. Brak klucza i brak mocka → checkout zwraca czytelny błąd (patrz krok 2), nie crash.
2. **`POST /api/checkout`** (`src/app/api/checkout/route.ts`):
   - Cena, waluta, nazwa produktu (`brandName`) i ilość (1) **wyłącznie z `siteConfig`**; ignoruj dane z requestu.
   - Stripe: `mode: "payment"`, `line_items: [{ price_data: { currency: "eur", unit_amount: 49900, product_data: { name } }, quantity: 1 }]`, `shipping_address_collection: { allowed_countries: ["AT"] }`, `locale: "de"`, `success_url: <origin>/danke?session_id={CHECKOUT_SESSION_ID}`, `cancel_url: <origin>/abgebrochen`. `origin` z `NEXT_PUBLIC_SITE_URL`, fallback na origin requestu. Podatki: cena brutto, bez `automatic_tax` (dopisz `TODO` w kodzie: VAT/Stripe Tax do decyzji właściciela).
   - Odpowiedź: `303` redirect na `session.url` (działa jako zwykły `<form method="POST">`, bez JS). Mock: redirect na `/checkout/mock?session_id=mock_<losowe>`.
   - Błąd Stripe / brak konfiguracji → redirect `303` na `/abgebrochen?error=1` (komunikat „Zahlung derzeit nicht möglich”), szczegół tylko w logu serwera. `GET` → 405.
3. **CTA**: przycisk zakupu w `Kaufen.tsx` i w `Hero.tsx` jako `<form action="/api/checkout" method="POST"><button>…</button></form>` (tekst z `de.nav.buy`, kolor `cta`). Link w `Header.tsx` zostaje kotwicą `#kaufen` (istniejący test tego oczekuje).
4. **Mock checkout** `src/app/checkout/mock/page.tsx`: dostępny tylko gdy mock aktywny (inaczej `notFound()`). Pokazuje wyraźnie „TESTMODUS – keine echte Zahlung”, kwotę `499,00 €`, „Lieferung nur nach Österreich”, dwa przyciski: „Testzahlung abschließen” → wywołuje tę samą funkcję co webhook (`handleCheckoutCompleted`, krok 6) z danymi mock i przekierowuje na `/danke?session_id=mock_…`; „Abbrechen” → `/abgebrochen`. Server action albo mały route handler — wybór buildera.
5. **Strony wyniku** (teksty w `src/content/de.ts`):
   - `/danke`: z `session_id` → w trybie real pobierz sesję ze Stripe i pokaż „Danke für Ihre Bestellung” tylko gdy `payment_status === "paid"`; w mock akceptuj `mock_*`. Bez `session_id` lub nieznana/nieopłacona sesja → neutralny komunikat („Keine Bestellung gefunden”) + link na stronę główną; nigdy nie potwierdzaj płatności bez weryfikacji.
   - `/abgebrochen`: „Zahlung abgebrochen – es wurde nichts berechnet” + przycisk ponownego zakupu (ten sam form) + link na stronę główną; z `?error=1` komunikat o niedostępnej płatności.
   - Obie strony `robots: noindex`.
6. **Webhook** `POST /api/stripe/webhook`:
   - Surowe ciało (`await req.text()`), nagłówek `stripe-signature`, `stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)`. Brak nagłówka / zły podpis / brak sekretu → `400` (bez szczegółów w odpowiedzi). Node runtime.
   - `checkout.session.completed` → `handleCheckoutCompleted(session)` w `src/lib/orders.ts`: buduje dane zamówienia (id sesji, kwota, waluta, e-mail klienta, adres wysyłki, imię) i woła notifier. Inne eventy → `200` i ignoruj. Odpowiedź `200 { received: true }`.
   - Webhook nie może zależeć od trybu mock (podpis weryfikowany zawsze).
7. **Notifier** `src/lib/notify/`: interfejs `OrderNotifier { notifyOwner(order): Promise<void> }`; `ResendNotifier` (gdy `RESEND_API_KEY` i `OWNER_EMAIL` ustawione; nadawca z nowej zmiennej `RESEND_FROM`) i `LogNotifier` (inaczej: `console.info("[order-notification]", …)` bez pełnych danych osobowych w logu — e-mail/adres skrócony). Błąd wysyłki maila logowany, nie wywraca webhooka (Stripe nie powinien retry'ować przez mail). Mail po niemiecku lub polsku — krótki: numer sesji, kwota, adres wysyłki, e-mail klienta.
8. **`.env.example`**: dopisz `RESEND_FROM=` z komentarzem; przy `STRIPE_MOCK` komentarz „nigdy na produkcji”. **`playwright.config.ts`**: `webServer.env` = `{ STRIPE_MOCK: "1", STRIPE_WEBHOOK_SECRET: "whsec_e2e_dummy", STRIPE_SECRET_KEY: "" }` (wartości dummy, nie prawdziwe klucze), żeby e2e nigdy nie dotykały Stripe.
9. **Testy e2e** `e2e/checkout.spec.ts`:
   - główna ścieżka: na `/` klik „Jetzt kaufen – 499 €” w sekcji `#kaufen` → URL `/checkout/mock`, widać „499,00 €” i „Österreich” → „Testzahlung abschließen” → `/danke`, widać podziękowanie; to samo z CTA w hero (wystarczy sprawdzić, że prowadzi do `/checkout/mock`);
   - anulowanie: mock → „Abbrechen” → `/abgebrochen`, komunikat „nichts berechnet”, przycisk ponownego zakupu działa;
   - manipulacja ceną: `request.post("/api/checkout", { form: { amount: "1" } })` z `maxRedirects: 0` → 303 na `/checkout/mock…`, a strona mock dalej pokazuje 499,00 €;
   - webhook poprawny: payload `checkout.session.completed` podpisany `Stripe.webhooks.generateTestHeaderString({ payload, secret: "whsec_e2e_dummy" })` → `200`, `{ received: true }`;
   - webhook błędny: zły podpis → `400`; brak nagłówka → `400`;
   - `/danke` bez `session_id` → „Keine Bestellung gefunden”, brak tekstu podziękowania;
   - `GET /api/checkout` → 405.
   Istniejące testy (`skeleton`, `product`) mają dalej przechodzić.
10. Commit lokalny po zielonych testach (bez push); dołącz ten plik planu.

## Weryfikacja (definicja ukończenia)
- `npm run lint`, `npm run build`, `npm run test:e2e` (desktop + mobile) — zielone.
- `git grep -nE "sk_(test|live)_[A-Za-z0-9]{10,}|whsec_[A-Za-z0-9]{20,}|re_[A-Za-z0-9]{20,}"` — pusto (dopuszczalne tylko dummy `whsec_e2e_dummy`).
- Cena w kodzie checkoutu pochodzi z `siteConfig` (`grep -n "49900" src` → tylko `src/config/site.ts`).
- Ręcznie (opcjonalnie, jeśli builder ma klucze testowe — nie wymagane): `stripe listen --forward-to localhost:3000/api/stripe/webhook`. Bez kluczy: zaznacz w handoffie, że ścieżka real nie była sprawdzona na żywo.

## Poza zakresem
SEO/OG, strony prawne, Lighthouse, konfiguracja Vercel, README z pełną listą kluczy, `npm audit` (pakiet 4). Stripe Tax/faktury, magazyn, panel zamówień, baza danych — nie robimy.

## Handoff
Builder → `review-reviewer@waga-gold-conveyor` z wynikami komend, informacją, czy ścieżka real była testowana, i ewentualnymi problemami z `cacheComponents`.
