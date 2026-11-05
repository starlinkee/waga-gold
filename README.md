# waga-gold

Jednostronicowy sklep (Next.js App Router + TypeScript + Tailwind) sprzedający jedną wagę precyzyjną za 499 € z dostawą tylko do Austrii. Płatność: Stripe Checkout, powiadomienie właściciela: Resend (bez klucza = log).

## Uruchomienie

```bash
npm i
npx playwright install chromium
cp .env.example .env.local   # opcjonalnie; z STRIPE_MOCK=1 działa bez kluczy
npm run dev                  # http://localhost:3000
npm run lint
npm run test:e2e             # build + start + Playwright (desktop + mobile), zawsze w trybie mock
```

## Struktura

- `src/config/site.ts` – nazwa marki (`brandName`, placeholder), cena, waluta, kraje dostawy. Jedyne źródło ceny (checkout bierze ją stąd).
- `src/content/` – wszystkie teksty (`de.ts`), dane techniczne (`spec.ts`), zestaw (`kit.ts`), zdjęcia (`images.ts`), szkielety prawne (`legal.ts`).
- `src/components/sections/` – sekcje strony; `src/app/api/` – `checkout` i `stripe/webhook`; `src/lib/` – Stripe, zamówienia, notifier.
- **Tryb mock** (`STRIPE_MOCK=1`): przycisk kupna prowadzi do `/checkout/mock` zamiast do Stripe. Wyłączony zawsze, gdy `VERCEL_ENV=production`.

## Do uzupełnienia przez właściciela (checklista)

Lista z `grep -rn TODO src`.

**Konfiguracja / klucze** (`.env.example`, na Vercelu w ustawieniach projektu)
- [ ] `STRIPE_SECRET_KEY` (najpierw testowy, potem live)
- [ ] `STRIPE_WEBHOOK_SECRET` (z endpointu webhooka w Stripe)
- [ ] `RESEND_API_KEY`, `RESEND_FROM` (adres ze zweryfikowanej domeny w Resend), `OWNER_EMAIL`
- [ ] `NEXT_PUBLIC_SITE_URL` = docelowa domena (używane w canonical, OG, sitemap, robots, URL-ach Stripe)
- [ ] nazwa marki: `brandName` w `src/config/site.ts` (obecnie placeholder)

**Dane techniczne produktu** (`src/content/spec.ts`, wartość `TODO_SPEC` → na stronie „Angabe folgt”)
- [ ] Wägebereich, Genauigkeit / Reproduzierbarkeit, Kalibriergewicht (Masse), Kalibrierung, Zertifikate, Abmessungen, Gewicht, Betriebsdauer
- [ ] FAQ (`src/content/de.ts`): odpowiedzi o Wägebereich, Kalibrierung, Garantie
- [ ] Wysyłka (`src/components/sections/Versand.tsx`): Versandkosten i Lieferzeit
- [ ] potwierdzenie rozdzielczości **0,001 g** (`spec.ts`; odczytana z wyświetlacza, nie z dokumentacji)
- [ ] czym jest cylinder w zestawie (`src/content/kit.ts`, obecnie „Kalibriergewicht”) i co robią przyciski M / P
- [ ] zdjęcia docelowo na czarnym tle (`src/content/images.ts`)

**Teksty prawne i decyzje** – strony `/impressum`, `/agb`, `/datenschutz`, `/widerruf` to **szkielety z TODO, nie teksty prawne** (`src/content/legal.ts`, banner „ENTWURF”)
- [ ] Impressum, AGB, Datenschutz, Widerruf – przez prawnika lub generator; usunąć banner po uzupełnieniu
- [ ] formułka akceptacji AGB/Widerruf przy przycisku zakupu (`Kaufen.tsx`, teraz tylko linki)
- [ ] VAT / Stripe Tax (`src/app/api/checkout/route.ts`; cena jest brutto, bez `automatic_tax`)

**Zależności:** `npm audit` pokazuje 8 podatności *moderate*, wyłącznie w łańcuchu dev (`eslint` / `typescript-eslint` / `minimatch`); `npm audit --omit=dev` = 0. Naprawa wymaga `npm audit fix --force` (breaking changes) – do decyzji, nie ruszane.

## Bedienungsanleitung (PDF)

Własna instrukcja po niemiecku (A4), generowana z kodu do `public/downloads/anleitung.pdf` (**commitowany**, serwowany inline pod stałym adresem `/downloads/anleitung.pdf`; linki: sekcja Lieferumfang i stopka).

- Generowanie: `npm run build:anleitung` (Playwright Chromium, nie jest częścią `npm run build`). **Po każdej zmianie treści uruchom to polecenie i skommituj nowy PDF.**
- Źródło: `scripts/build-anleitung.mjs` (szablon + CSS druku), teksty tylko instrukcji `src/content/anleitung.ts`, fakty i ostrzeżenia ze wspólnego `src/content/product.ts` (to samo źródło co strona).
- Znak „ENTWURF” (znak wodny + stopka) włącza się automatycznie, dopóki w treści jest `TODO_SPEC` (renderowane jako „[zu ergänzen]”). Wymuszenie: `ANLEITUNG_DRAFT=0|1 npm run build:anleitung`. Aby zdjąć ENTWURF: uzupełnij wszystkie `TODO_SPEC` w `anleitung.ts` i wygeneruj PDF ponownie.
- Test e2e (`e2e/anleitung.spec.ts`) sprawdza link, nagłówki odpowiedzi, liczbę stron (8–12) i tekst commitowanego PDF; nie sprawdza, czy PDF jest aktualny względem źródła.

**Zastrzeżenie:** wszystkie parametry i deklaracje (zakres/max. masa próbki, głębokość penetracji, wykrywanie fałszerstw: wolfram, tantal itd., pomiar przez blister/kapsułę) pochodziły ze strony innego producenta. Właściciel musi je potwierdzić pomiarami **naszego** urządzenia, zanim zdejmie `TODO_SPEC`/ENTWURF. CE i inne certyfikaty tylko po potwierdzeniu przez właściciela. Teksty są własne – nie wklejać materiałów innych producentów.

**Checklista manuala (`TODO_SPEC`, `grep -rn TODO_SPEC src scripts`):**
- [ ] funkcje przycisków M / P / T i sposób tarowania/zerowania (`anleitung.ts`: bedienelemente, messung)
- [ ] kierunek znaku odczytu (+ dla Au/Ag, − dla Wolfram/Tantal/ferro) – potwierdzić pomiarem (`product.ts`, `anleitung.ts`)
- [ ] maksymalna masa próbki i głębokość penetracji (`anleitung.ts`, `spec.ts`, FAQ w `de.ts`)
- [ ] pomiar przez blister/kapsułę (`anleitung.ts`, `product.ts` → `unverifiedSpecs`)
- [ ] deklaracje: wolfram w sztabkach/monetach, tantal w monetach 900/916 (`product.ts` → `unverifiedSpecs`)
- [ ] rodzaj magnesu, zasilanie/akumulator (NiMH?), czas pracy (`spec.ts`, `product.ts`)
- [ ] zawartość zestawu: spray, płyta grafitowa, magnes sztabkowy, zasilacz, instrukcja; funkcja „Würfel” i „Zylinder” (`kit.ts`, `anleitung.ts`)
- [ ] kalibracja, kody błędów wyświetlacza (`anleitung.ts`)
- [ ] utylizacja / rejestracje odbioru elektrośmieci (`anleitung.ts`)
- [ ] dane kontaktowe producenta: e-mail, telefon, adres (`anleitung.ts`, `Kontakt.tsx`)

**Z review pakietu 5:**
- [ ] ogólne zdania o skuteczności bez liczb (Intro „magnetisch auffällige Beimischungen schnell sichtbar machen”, Vorteile „…die ein Handmagnet nicht zeigt”) potwierdzić pomiarem na naszym egzemplarzu (np. moneta z rdzeniem W, próbka Ta)
- [ ] powtórzyć Lighthouse po deployu (strona dłuższa, nowy SVG)

## Przed włączeniem sprzedaży

1. **Ścieżka prawdziwego Stripe nie była testowana na żywo** (budowa bez kluczy; e2e działają tylko na mocku). Przetestuj z kluczami *testowymi*: `stripe listen --forward-to localhost:3000/api/stripe/webhook` albo endpoint na preview Vercela – checkout, strona `/danke`, webhook, mail z Resend. Dopiero potem klucze live.
2. Webhook w Stripe musi mieć eventy: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed` (nie tylko `completed`). Powiadomienie o zamówieniu idzie wyłącznie przy `payment_status = paid`; przy płatnościach opóźnionych (np. SEPA) mail dostaniesz po `async_payment_succeeded`.
3. `NEXT_PUBLIC_SITE_URL` = domena produkcyjna.
4. **`STRIPE_MOCK` nigdy w Production.** Na Preview też lepiej nie (mail z mocka jest oznaczony `[TEST]`, ale publiczny mock jest zbędny).
5. Decyzje: VAT / Stripe Tax; `RESEND_FROM` ze zweryfikowaną domeną.
6. Znane ograniczenie: **brak idempotencji webhooka** (brak bazy) – przy ponowieniu przez Stripe możliwy podwójny mail o zamówieniu. Przed wysyłką sprawdź zamówienie w Stripe Dashboard.

## Deploy na Vercel

Nie ma `vercel.json` – Next.js jest wykrywany automatycznie. Deploy robi właściciel (to nie jest zrobione):

1. Import repozytorium z GitHuba w Vercel.
2. Zmienne środowiskowe osobno dla Production i Preview (patrz checklista). `STRIPE_MOCK` **nie** w Production.
3. Po pierwszym deployu zarejestruj w Stripe Dashboard webhook `https://<domena>/api/stripe/webhook` z trzema eventami wyżej; sekret wpisz do `STRIPE_WEBHOOK_SECRET`.
4. Najpierw klucze testowe i próbny zakup, potem klucze live.
