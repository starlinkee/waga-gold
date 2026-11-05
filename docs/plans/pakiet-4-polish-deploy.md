# Pakiet 4 — polish i przygotowanie do deployu (plan)

Źródło: `docs/BRIEF.md` (pakiet 4 + „Definicja ukończenia”), qitem-20261105004439-22562565b9d6d866. Bazuje na pakiecie 3 (Stripe).

## Cel
Sklep gotowy do wdrożenia przez właściciela: SEO/meta/OG, favicon, szkielety stron prawnych z TODO, a11y, sprawdzona wydajność, przygotowanie pod Vercel i README, które mówi dokładnie, co właściciel ma uzupełnić. **Bez deployu, bez `git push`, bez linkowania projektu Vercel** — to decyzja właściciela.

## Założenia
- Stan po pakietach 1–3: `src/config/site.ts`, `src/content/*`, sekcje strony, `/api/checkout`, `/api/stripe/webhook`, `/danke`, `/abgebrochen`, `/checkout/mock`, strony prawne jako zalążki (`LegalStub`), domyślny `src/app/favicon.ico` z create-next-app, `metadata` w `layout.tsx` = tylko `brandName`.
- `cacheComponents`/`partialPrefetching` zostają (uwaga reviewera); metadata/sitemap/robots/OG zgodnie z aktualnymi docs Next 16.
- **Nie zmyślać treści prawnych ani danych technicznych.** Strony prawne = struktura nagłówków + wyraźne `TODO`, bez gotowych formułek prawnych (bez okresów zwrotu, gwarancji, klauzul). Fakty techniczne wolno podać tylko te, które są prawdą o kodzie (np. „używamy Stripe do płatności, Resend do e-maili, hosting Vercel”) — i też jako punkt do uzupełnienia przez prawnika.
- Decyzja właściciela (11-05, przez leada): rozdzielczość 0,001 g (z wyświetlacza, do potwierdzenia), licznik LCD uspokaja się na `0.000 g` (stan „gotowa”), nie udaje ważenia. Zakres i dokładność nadal `TODO_SPEC`. Realizuje to krok 0.

## Kroki
0. **Follow-up: licznik LCD i rozdzielczość** (decyzja właściciela; zrób jako pierwszy, osobny commit):
   - `src/content/de.ts`: `LCD_TARGET = 0` (komentarz: stan „gotowa”, decyzja właściciela 11-05).
   - `src/components/LcdCounter.tsx`: zamiast rozpędzania do wartości — krótkie „uspokajanie się” jak przy stabilizacji wagi: przez ~1–1,5 s ostatnie cyfry drgają z malejącą amplitudą (np. |v| ≤ 0.009, bez wartości ujemnych, zawsze 3 miejsca po przecinku), na końcu dokładnie `0.000 g` i koniec animacji. `prefers-reduced-motion: reduce` → od razu `0.000 g`, bez drgań. `aria-label` = `0.000 g`.
   - `src/content/spec.ts`: wiersz „Auflösung der Anzeige” → label „Auflösung”, value „0,001 g”, z komentarzem `// TODO: do potwierdzenia przez właściciela (odczytane z wyświetlacza)`. Wartość renderuje się normalnie (to nie jest `TODO_SPEC`). Zakres/Genauigkeit zostają `TODO_SPEC`; nota „Auflösung ≠ Genauigkeit” w `de.ts` zostaje.
   - Teksty w `de.ts`/hero wspominające licznik lub ważenie dopasuj do stanu „gotowa” (bez sugerowania ważenia konkretnej masy).
   - E2E (`e2e/product.spec.ts`): zamień oczekiwania `134.000 g` na `0.000 g`; główna ścieżka — licznik kończy na `0.000 g` (timeout ~5 s); reduced motion — `0.000 g` od razu i tekst nie zmienia się w ciągu ~500 ms (dwa odczyty); tabela spec ma wiersz „Auflösung” z „0,001 g”; regresja — nigdzie na stronie nie ma „134”.
1. **SEO / meta** (`src/app/layout.tsx` + content):
   - `metadataBase` z `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000`), `title` z szablonem `%s | {brandName}`, `description` po niemiecku z `de.ts` (bez obietnic technicznych), `alternates.canonical`, `openGraph` (type website, locale `de_AT`, siteName, image), `twitter: summary_large_image`.
   - OG image 1200×630: `src/app/opengraph-image.tsx` (`ImageResponse`: ciemne tło, nazwa marki, „0.000 g” w mono, cena) albo statyczny kadr zdjęcia z LCD — wybór buildera; nazwa marki z configu.
   - `src/app/robots.ts` (allow `/`, disallow `/api/`, `/checkout/`, `/danke`, `/abgebrochen`; link do sitemap) i `src/app/sitemap.ts` (`/` + 4 strony prawne).
   - `noindex` na `/danke`, `/abgebrochen`, `/checkout/mock`, `not-found`.
   - JSON-LD `Product` na `/`: name = brandName, image, `offers: { price: "499.00", priceCurrency: "EUR", url }`. Bez ocen/recenzji, bez `availability`, GTIN, marki producenta itp. (nieznane).
2. **Favicon / ikony**: usuń domyślny `favicon.ico` z create-next-app, dodaj `src/app/icon.svg` (prosty znak: np. stylizowany „0.000” albo szalka w kolorze `accent` na `bg`) + `apple-icon.png` (180×180). Bez logotypów osób trzecich.
3. **Strony prawne** (`/impressum`, `/agb`, `/datenschutz`, `/widerruf`) — rozbuduj `LegalStub` w szkielety:
   - na górze banner „ENTWURF – rechtlicher Inhalt folgt (TODO)”;
   - nagłówki sekcji, które właściciel/prawnik musi wypełnić, każda z treścią `TODO`. Np. Impressum: Name/Firma, Anschrift, Kontakt, UID-Nummer, Firmenbuch, Gewerbebehörde/Kammer, Unternehmensgegenstand; Datenschutz: Verantwortlicher, verarbeitete Daten, Zahlungsabwicklung (Stripe), E-Mail-Versand (Resend), Hosting (Vercel), Rechte der Betroffenen; AGB i Widerruf: tylko nagłówki z `TODO` (bez wzoru formularza i bez terminów).
   - Teksty w `src/content/legal.ts`. W README zaznacz, że to nie są teksty prawne.
   - Link „AGB” i „Widerruf” przy przycisku zakupu w sekcji `#kaufen` (sam link, bez formułki o akceptacji — formułkę dopisze właściciel; `TODO` w kodzie).
4. **A11y**:
   - skip link „Zum Inhalt” do `<main id="inhalt">`, widoczne style `:focus-visible` (accent), landmarki, jeden `h1` na stronę, `alt` na zdjęciach, kontrast tekstu `muted` na `bg`/`surface` ≥ 4.5:1 (popraw token, jeśli nie spełnia).
   - Dodaj `@axe-core/playwright` (devDependency) i test (krok 8).
5. **Wydajność**: zdjęcia przez `next/image` z poprawnym `sizes`, `priority` tylko w hero; fonty przez `geist`; brak zbędnego JS po stronie klienta (tylko licznik + to, co wymaga). Lighthouse (mobile) na `npm run build && npm run start`: `npx lighthouse http://localhost:3000 --preset=perf` itp. albo z Chrome DevTools — cel: Performance ≥ 90, Accessibility/Best Practices/SEO ≥ 95. Wyniki (4 liczby) w handoffie. Jeśli Lighthouse nie da się uruchomić w WSL (brak Chrome), użyj chromium z Playwrighta (`CHROME_PATH`), a gdy i to się nie uda — napisz to wprost w handoffie zamiast podawać wyniki.
6. **`npm audit`** (uwaga reviewera z pak. 1): `npm audit`; napraw to, co da się bez breaking changes (`npm audit fix`, bez `--force`); resztę wypisz w handoffie i README.
7. **Vercel**: bez `vercel.json`, jeśli niepotrzebny (Next.js wykrywany automatycznie). W README sekcja „Deploy na Vercel”: import repo z GitHuba, zmienne środowiskowe per środowisko (Production/Preview), **`STRIPE_MOCK` nigdy w Production**, `NEXT_PUBLIC_SITE_URL` = docelowa domena, rejestracja webhooka w Stripe Dashboard: `https://<domena>/api/stripe/webhook`, eventy `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed` (po rework pakietu 3: powiadomienie tylko przy `payment_status = paid`; dopasuj listę do tego, co faktycznie obsługuje `src/app/api/stripe/webhook/route.ts`), sekret → `STRIPE_WEBHOOK_SECRET`; najpierw klucze test, potem live. Nie uruchamiaj `vercel` CLI.
8. **Testy e2e**:
   - `e2e/seo.spec.ts` — główna ścieżka: `/` ma `<title>` z marką, `meta[name=description]`, `og:image` zwraca 200 i `image/*`, `link[rel=canonical]`, JSON-LD z `price: "499.00"` i `EUR`; `/robots.txt` i `/sitemap.xml` zwracają 200, sitemap zawiera `/` i strony prawne; ikona (`/icon.svg` lub link z `<head>`) zwraca 200.
   - błąd/regresja: `/danke`, `/abgebrochen`, `/checkout/mock` mają `meta[name=robots]` z `noindex`; sitemap **nie** zawiera `/danke`, `/abgebrochen`, `/checkout`, `/api`.
   - `e2e/legal.spec.ts`: 4 strony mają h1, banner „ENTWURF” i są osiągalne ze stopki; link AGB/Widerruf przy przycisku zakupu działa.
   - `e2e/a11y.spec.ts`: axe na `/`, `/abgebrochen`, `/impressum`, 404 — zero naruszeń `serious`/`critical`; skip link dostaje fokus po pierwszym Tab i przenosi do `#inhalt`.
   - Wszystkie istniejące testy dalej zielone.
9. **README.md** — przepisz na pełną instrukcję:
   - uruchomienie, testy, struktura (`src/config/site.ts`, `src/content/*`), tryb mock;
   - **„Do uzupełnienia przez właściciela”** (checklista): klucze Stripe test i live (`STRIPE_SECRET_KEY`), `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM` (zweryfikowana domena w Resend), `OWNER_EMAIL`, `NEXT_PUBLIC_SITE_URL`/domena, nazwa marki (`brandName` w `src/config/site.ts`), wszystkie pola `TODO_SPEC` (lista z `src/content/spec.ts` + koszt i czas wysyłki), znaczenie przycisków M/P, czym jest cylinder w zestawie, potwierdzenie rozdzielczości 0,001 g (wzięta z wyświetlacza), teksty prawne (Impressum, AGB, Datenschutz, Widerruf — przez prawnika/generator), decyzja VAT/Stripe Tax, zdjęcia na czarnym tle, wyniki `npm audit` do decyzji;
   - **„Przed włączeniem sprzedaży”** (z review pakietu 3, osobna wyraźna sekcja): (1) ścieżka real Stripe nie była testowana na żywo — test z kluczami testowymi (`stripe listen --forward-to localhost:3000/api/stripe/webhook` albo endpoint na preview Vercela): checkout, `/danke`, webhook, mail Resend; dopiero potem klucze live; (2) webhook w Stripe z eventami `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed` (nie tylko completed); (3) `NEXT_PUBLIC_SITE_URL` = domena produkcyjna; (4) `STRIPE_MOCK` nigdy w Production; (5) decyzje: VAT/Stripe Tax, `RESEND_FROM` ze zweryfikowaną domeną; (6) znane ograniczenie: brak idempotencji webhooka (bez bazy) → przy retry Stripe możliwy podwójny mail o zamówieniu — sprawdzać w Stripe Dashboard przed wysyłką;
   - „Deploy na Vercel” (krok 7).
   Listę `TODO_SPEC` wygeneruj z kodu (`grep -rn TODO src`), nie z pamięci.
10. Commit lokalny po zielonych testach (bez push); dołącz ten plik planu.

## Weryfikacja (definicja ukończenia całego briefu)
- `npm run lint`, `npm run build`, `npm run test:e2e` (desktop + mobile) — zielone.
- `git grep -nE "sk_(test|live)_[A-Za-z0-9]{10,}|whsec_[A-Za-z0-9]{20,}|re_[A-Za-z0-9]{20,}"` — pusto (poza dummy `whsec_e2e_dummy`); `git ls-files | grep -E '^\.env'` → tylko `.env.example`.
- Każdy `TODO`/`TODO_SPEC` z `grep -rn "TODO" src` ma odpowiednik w checkliście README.
- Wyniki Lighthouse i `npm audit` w handoffie.

## Poza zakresem
Deploy, `git push`, linkowanie Vercel, kupno domeny, pisanie tekstów prawnych, analityka/cookie banner (brak trackingu → brak banera; jeśli builder doda cokolwiek śledzącego — nie dodawać), wersja EN.

## Handoff
Builder → `review-reviewer@waga-gold-conveyor` z wynikami komend, Lighthouse, `npm audit` i linkiem do checklisty w README. Po akceptacji: brief zamknięty, lead informuje właściciela.
