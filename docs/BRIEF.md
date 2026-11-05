# Brief: sklep jednoproduktowy – waga do złota

## Cel
Strona e-commerce sprzedająca JEDEN produkt: profesjonalną, precyzyjną wagę do złota (walizka, waga z wyświetlaczem LCD, osłona/kostka, odważnik, kabel USB). Strona ma przekazywać: profesjonalny sprzęt, naukowa precyzja, stabilność, niezawodność.

## Decyzje właściciela
- Stack: Next.js (App Router) + TypeScript + Tailwind, deploy Vercel, płatności Stripe Checkout (hosted). BEZ Supabase / bazy danych.
- Cena: 499 EUR (brutto). Sprzedaż tylko do Austrii (Stripe `shipping_address_collection.allowed_countries: ['AT']`).
- Język: niemiecki (de-AT) jako główny. Teksty trzymać w jednym pliku (łatwa podmiana/EN później).
- Dane techniczne: na razie wyłącznie to, co widać na zdjęciach w `images/` (wyświetlacz 0.000 g z jednostką g, rozdzielczość 3 miejsc po przecinku widoczna na wyświetlaczu, 4 przyciski, zasilanie USB, walizka z pianką, osłona, kostka/odważnik). NIE zmyślać zakresu, dokładności ani certyfikatów. Brakujące wartości = wyraźne placeholdery `TODO_SPEC` w jednym pliku `content/spec.ts`.
- Nazwa marki: placeholder `WAGA GOLD` w jednym miejscu (config), do podmiany.
- Klucze Stripe/Resend/inne: właściciel doda później. Kod ma działać z kluczami testowymi w `.env`, mieć `.env.example`, a bez kluczy w trybie dev/e2e używać mocka Stripe (e2e nie może zależeć od prawdziwego Stripe).

## Wygląd i feel
- Tło prawie czarne (grafit), główny akcent: lodowy błękit (jak podświetlenie wyświetlacza), drobny akcent czerwony (jak zatrzaski walizki) tylko przy CTA.
- Typografia: czysty grotesk (Geist/Inter) + mono (Geist Mono) dla liczb i danych technicznych, styl karty kalibracyjnej.
- Hero: zdjęcie z wyświetlaczem 0.000 g, krótkie hasło o precyzji, CTA „Jetzt kaufen – 499 €".
- Animacja minimalna: licznik rozpędzający się do 134.000 g (respektować prefers-reduced-motion).
- Sekcje: hero, zalety (precyzja/stabilność/niezawodność), specyfikacja (tabela mono), zawartość zestawu, galeria, FAQ, wysyłka AT i zwroty, stopka z linkami prawnymi.
- Zdjęcia: `images/` (4 zdjęcia z telefonu, drewniany stół/kanapa). Użyć next/image, kadrować ciemno z winietą/gradientem; w TODO zaznaczyć, że docelowo warto zrobić zdjęcia na czarnym tle.

## Pakiety (kolejno; każdy z testami e2e Playwright)
1. Szkielet: Next.js+TS+Tailwind, Playwright (`npm run test:e2e`), design tokens, layout, config marki, `.env.example`.
2. Strona produktu: wszystkie sekcje wyżej, responsywna, content w `content/`.
3. Stripe Checkout: endpoint tworzący sesję (AT only, 499 EUR, EUR), strony sukcesu/anulowania, webhook `checkout.session.completed` (weryfikacja podpisu), powiadomienie mailowe do właściciela (Resend, za interfejsem; bez klucza = log). Mock Stripe dla e2e. Główna ścieżka + błąd (anulowanie/niepoprawny podpis webhooka).
4. Polish i deploy: SEO/meta/OG, favicon, Impressum/AGB/Datenschutz/Widerruf jako szkielety z TODO (wymagane prawnie w AT/UE, tekstów prawnych nie zmyślać), a11y, wydajność (Lighthouse), konfiguracja Vercel, README z listą kluczy do uzupełnienia.

## Definicja ukończenia
`npm run build` i `npm run test:e2e` zielone, reviewer akceptuje każdy pakiet, brak sekretów w repo, README mówi dokładnie, co właściciel ma uzupełnić (klucze Stripe test/live, webhook secret, Resend, nazwa marki, dane techniczne, teksty prawne, domena).

## Zasady
- Bez `git push` (właściciel zdecyduje). Commity lokalne OK po zielonych testach.
- Nie zmyślać danych technicznych ani treści prawnych.
