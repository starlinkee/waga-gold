# Pakiet 1 — szkielet (plan)

Źródło: `docs/BRIEF.md` (pakiet 1), qitem-20261105004439-22562565b9d6d866.

## Cel
Działający, pusty szkielet sklepu: Next.js (App Router) + TypeScript + Tailwind, design tokens, layout, config marki, `.env.example`, Playwright z zielonym `npm run test:e2e`. Bez sekcji produktu (to pakiet 2), bez Stripe (pakiet 3).

## Założenia / stan wejściowy
- Repo `~/projekty/waga-gold`, gałąź `main` bez commitów. W katalogu są już: `CLAUDE.md`, `.gitignore`, `docs/`, `images/`, `rigs/`. Nie ruszać `rigs/`, `.claude/`, `docs/BRIEF.md`, `images/`.
- `create-next-app` może odmówić w niepustym katalogu: wygeneruj w katalogu tymczasowym i przenieś pliki albo skonfiguruj ręcznie. Zachowaj istniejący `.gitignore` (dopisz tylko brakujące wpisy, np. `next-env.d.ts` zostaw w repo, `*.tsbuildinfo`, `/out`).
- Node 22.23, npm 10.9. Przeglądarki Playwright nie są zainstalowane: `npx playwright install chromium` (jeśli `--with-deps` wymaga sudo i się nie uda, zgłoś blokadę leadowi zamiast obchodzić).
- Bez Supabase, bez bazy, bez `git push`.

## Kroki
1. Projekt: Next.js (aktualna stabilna, App Router, `src/` opcjonalnie — wybierz jedno i trzymaj się), TypeScript strict, Tailwind, ESLint. Skrypty: `dev`, `build`, `start`, `lint`, `test:e2e`.
2. Fonty: Geist Sans + Geist Mono (`geist` lub `next/font`), zmienne CSS `--font-sans`, `--font-mono`.
3. Design tokens (jedno miejsce, Tailwind theme/CSS variables):
   - tło grafit prawie czarny (np. `bg` ~#0b0d10, `surface` ~#14171c, `border` ~#252a31),
   - tekst jasny / przygaszony,
   - akcent lodowy błękit (`accent`, jak podświetlenie LCD, np. ~#9fe3ff),
   - czerwony akcent tylko do CTA (`cta`, jak zatrzaski walizki, np. ~#d7262e).
   Wartości HEX to propozycja — ważne, żeby były nazwane tokeny, nie kolory w komponentach.
4. Config marki: `src/config/site.ts` (lub `config/site.ts`) — `brandName: 'WAGA GOLD'` (placeholder, jedyne miejsce), `price: { amount: 49900, currency: 'EUR', display: '499 €' }`, `locale: 'de-AT'`, `shippingCountries: ['AT']`.
5. Teksty: `content/de.ts` (jeden plik z tekstami UI, de-AT; na tym etapie tylko teksty layoutu: nawigacja, stopka). Pusty szablon `content/spec.ts` z `TODO_SPEC` (eksport typu + kilka pól z wartością `'TODO_SPEC'`) — wypełnia pakiet 2, ale plik ma istnieć.
6. Layout: `app/layout.tsx` (`<html lang="de-AT">`, fonty, ciemne tło, metadata z `brandName`), komponenty `Header` (nazwa marki + CTA-placeholder „Jetzt kaufen – 499 €” linkujący do `#kaufen`) i `Footer` (linki: Impressum, AGB, Datenschutz, Widerruf → `/impressum` itd.; same strony powstaną w pakiecie 4, teraz mogą prowadzić do 404 albo do prostych stron-zalążków — wybierz zalążki z „TODO”, żeby e2e nie trafiały w 404). `app/page.tsx` — minimalny hero-placeholder z nazwą marki i ceną z configu.
7. `.env.example`: `STRIPE_SECRET_KEY=`, `STRIPE_WEBHOOK_SECRET=`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, `RESEND_API_KEY=`, `OWNER_EMAIL=`, `STRIPE_MOCK=1` — z komentarzami po polsku/angielsku, bez wartości. Żadnych prawdziwych kluczy.
8. Playwright: `@playwright/test`, `playwright.config.ts` (chromium + mobile viewport np. Pixel 7; `webServer` odpalający `npm run build && npm run start` lub `npm run dev` na porcie 3000, `reuseExistingServer: !process.env.CI`), katalog `e2e/`.
9. Testy e2e (`e2e/skeleton.spec.ts`):
   - główna ścieżka: `/` zwraca 200, `<html lang="de-AT">`, widać nazwę marki z configu i „499 €”, header i footer obecne, linki prawne w stopce są widoczne i prowadzą do stron, które się ładują;
   - błąd: nieistniejąca ścieżka (`/nie-ma-takiej`) zwraca 404 i pokazuje własną stronę `not-found` w ciemnym stylu (dodaj `app/not-found.tsx` po niemiecku z linkiem na stronę główną).
10. Krótki `README.md`: jak uruchomić (`npm i`, `npx playwright install chromium`, `npm run dev`, `npm run test:e2e`); pełna lista kluczy do uzupełnienia dopiero w pakiecie 4.
11. Commit lokalny po zielonych testach (bez push).

## Weryfikacja (definicja ukończenia pakietu)
- `npm run lint` bez błędów.
- `npm run build` zielony.
- `npm run test:e2e` zielony (oba projekty: desktop + mobile).
- `git status` czysty po commicie; `git ls-files | grep -E '^\.env($|\.)' ` zwraca tylko `.env.example`.
- Kolory w komponentach tylko przez tokeny; `WAGA GOLD` występuje w kodzie tylko w pliku configu (`grep -rn "WAGA GOLD" --include=*.ts --include=*.tsx . | grep -v node_modules`).

## Poza zakresem
Sekcje produktu, zdjęcia, animacja licznika (pakiet 2); Stripe/Resend (pakiet 3); SEO/OG, treści stron prawnych, Lighthouse, Vercel (pakiet 4).

## Handoff
Builder po zakończeniu przekazuje do review (`review-reviewer@waga-gold-conveyor`) z wynikami komend z sekcji Weryfikacja. Po akceptacji planner przygotuje pakiet 2.
