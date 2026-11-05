# Pakiet 2 — strona produktu (plan)

Źródło: `docs/BRIEF.md` (sekcja „Wygląd i feel”, pakiet 2), qitem-20261105004439-22562565b9d6d866. Bazuje na pakiecie 1 (commit `f921f4e`).

## Cel
Jedna, responsywna strona `/` ze wszystkimi sekcjami z briefu, cała treść w `src/content/`, zdjęcia przez `next/image`. Bez Stripe: CTA prowadzi na razie do sekcji zakupu `#kaufen` (pakiet 3 podepnie checkout).

## Założenia
- Struktura z pakietu 1: `src/app`, `src/components`, `src/config/site.ts`, `src/content/de.ts`, `src/content/spec.ts`, tokeny w `src/app/globals.css` (`bg`, `surface`, `border`, `fg`, `muted`, `accent`, `cta`, `cta-fg`). Kolory tylko przez tokeny, czerwony (`cta`) wyłącznie na CTA.
- **Nic nie zmyślać.** Na zdjęciach widać (to wolno napisać): wyświetlacz LCD z niebieskim podświetleniem, odczyt `0.000` z jednostką `g` (3 miejsca po przecinku), 4 przyciski pod wyświetlaczem z oznaczeniami ⏻ / M / P / T, kabel USB w zestawie, czarna walizka z twardą obudową, profilowaną pianką w pokrywie i wyciętymi gniazdami, czerwone zatrzaski, prostopadłościenna osłona/kostka nakładana na wagę, cylindryczny element (brief: odważnik — wartość masy nieznana), moneta w kapslu ważona na kostce. Wszystko inne (zakres, dokładność/powtarzalność, kalibracja, certyfikaty, wymiary, masa, czas pracy, materiał, znaczenie przycisków M/P) = `TODO_SPEC`.
- Uwaga z review pakietu 1: `next.config.ts` ma `cacheComponents: true` i `partialPrefetching: true`. Strona produktu ma być w pełni statyczna (bez `cookies()/headers()`/fetch w server components); licznik jako mały komponent kliencki (`"use client"`). Nie wyłączaj tych flag w tym pakiecie; jeśli coś się z nimi gryzie, opisz to w handoffie (ważne przed Stripe w pakiecie 3). `npm audit` zostaje do pakietu 4.
- Teksty marketingowe (hasła o precyzji, stabilności, niezawodności) mogą być ogólne, ale bez liczb i obietnic technicznych spoza listy wyżej.

## Kroki
1. **Zdjęcia**: skopiuj 4 pliki z `images/` do `public/images/` pod nazwami ASCII (oryginałów nie usuwaj ani nie przenoś):
   - `koffer-display-0000.jpeg` ← `WhatsApp Image 2026-11-02 at 12.40.14 (2).jpeg` (wyświetlacz 0.000 g — **hero**),
   - `koffer-muenze.jpeg` ← `... (3).jpeg` (moneta na kostce),
   - `koffer-inhalt-oben.jpeg` ← `... 12.40.14.jpeg` (widok z góry, cały zestaw — sekcja „Lieferumfang”),
   - `koffer-inhalt-schraeg.jpeg` ← `... (1).jpeg` (zestaw pod kątem).
   Zdjęcia są pionowe (~1126×2000) z drewnianym stołem/kanapą: kadruj `object-cover` + ciemny gradient/winieta (CSS overlay), żeby tło grafitowe dominowało. Alt-teksty po niemiecku, opisowe. Dodaj komentarz `TODO: docelowo zdjęcia na czarnym tle` w pliku z listą zdjęć.
2. **Content** (`src/content/`):
   - `de.ts` — rozbuduj o teksty wszystkich sekcji (hero, Vorteile ×3: Präzision/Stabilität/Zuverlässigkeit, Spezifikation, Lieferumfang, Galerie, FAQ, Versand & Rückgabe).
   - `spec.ts` — zastąp obecne pola listą wierszy `{ label, value }` (lub typem z polami) zawierającą: Anzeige (LCD, beleuchtet), Einheit (g), Auflösung der Anzeige (3 Nachkommastellen / 0.000 g), Bedienung (4 Tasten: ⏻ M P T), Stromversorgung (USB, Kabel im Lieferumfang), Aufbewahrung (Hartschalenkoffer mit Schaumstoffeinlage) — oraz `TODO_SPEC` dla: Wägebereich, Genauigkeit/Reproduzierbarkeit, Kalibriergewicht (Masse), Kalibrierung, Zertifikate, Abmessungen, Gewicht, Betriebsdauer. Uwaga: „Auflösung der Anzeige” ≠ dokładność — nie pisz „Genauigkeit 0,001 g”.
   - `kit.ts` (lub w `de.ts`) — Lieferumfang: Präzisionswaage mit LCD, Abdeckung/Windschutz (kostka), Kalibriergewicht (cylinder; dopisz w kodzie komentarz `TODO: potwierdzić z właścicielem, czym jest cylinder`), USB-Kabel, Koffer.
   - FAQ: tylko pytania, na które znamy odpowiedź (Lieferland: nur Österreich; Preis 499 € inkl. MwSt.; Stromversorgung USB; was ist im Lieferumfang) + pytania z odpowiedzią `TODO_SPEC` tam, gdzie właściciel musi dopisać (np. Messbereich, Kalibrierung, Garantie). Zalecany akordeon `<details>/<summary>` (a11y bez JS).
   - Versand & Rückgabe: wysyłka tylko do AT (z `siteConfig.shippingCountries`); koszt i czas dostawy = `TODO_SPEC`; zwroty — tylko odesłanie do `/widerruf` (treść prawna w pakiecie 4, nie zmyślać okresów/warunków).
3. **Renderowanie TODO_SPEC**: w UI wartość `TODO_SPEC` wyświetlaj jako neutralne „Angabe folgt” (stała w `de.ts`), w kodzie zostaje `TODO_SPEC`. Literal `TODO_SPEC` nie może pojawić się w HTML strony.
4. **Sekcje** (osobne komponenty w `src/components/sections/`), kolejność: Hero → Vorteile → Spezifikation → Lieferumfang → Galerie → FAQ → Versand & Rückgabe → sekcja zakupu `#kaufen` (cena z configu + CTA; pakiet 3 podmieni CTA na checkout) → istniejący Footer.
   - **Hero**: zdjęcie `koffer-display-0000` (`priority`), hasło o precyzji, cena, CTA „Jetzt kaufen – 499 €” (z `de.nav.buy`) w kolorze `cta`, licznik LCD.
   - **Licznik**: komponent kliencki w foncie mono, kolor `accent`, rozpędza się od `0.000` do `134.000 g` (~1,5 s, easing), format zawsze 3 miejsca po przecinku. `prefers-reduced-motion: reduce` → od razu `134.000 g` bez animacji. Wartość docelowa jako stała w content. `aria-label`/tekst końcowy dostępny dla czytników (np. `aria-live="off"` + końcowa wartość w `aria-label`), `data-testid="lcd-counter"`.
   - **Spezifikation**: tabela `<table>` w stylu karty kalibracyjnej, wartości mono.
   - **Galerie**: 4 zdjęcia, siatka 1 kol. mobile / 2 kol. desktop, `sizes` ustawione.
   - Nawigacja w headerze: kotwice do głównych sekcji (na mobile może być ukryta albo przewijana poziomo — bez hamburgera z JS, jeśli niepotrzebny).
5. **Responsywność**: brak poziomego przewijania od 360 px wzwyż; obrazy z `sizes`, hero czytelne na mobile.
6. **Testy e2e** — zaktualizuj `e2e/skeleton.spec.ts`, jeśli zmieni się h1 (test sprawdza teraz h1 = nazwa marki), i dodaj `e2e/product.spec.ts`:
   - główna ścieżka: wszystkie sekcje widoczne (po nagłówkach/landmarkach), hero ma obrazek z alt, CTA „Jetzt kaufen – 499 €” prowadzi do `#kaufen` i sekcja zakupu pokazuje „499 €”; tabela spec ma wiersz „Einheit” z „g”; licznik kończy na `134.000 g`; FAQ się rozwija po kliknięciu; Versand wspomina Österreich;
   - reduced motion: `page.emulateMedia({ reducedMotion: 'reduce' })` → licznik od razu pokazuje `134.000 g`;
   - błąd / regresja: w HTML nie ma literału `TODO_SPEC`, a niewypełnione pola pokazują „Angabe folgt”; na viewport mobile (projekt mobile z configu) `document.documentElement.scrollWidth <= innerWidth` (brak poziomego scrolla); żadne zdjęcie nie zwraca błędu (wszystkie `img` mają `naturalWidth > 0` po przewinięciu).
7. Commit lokalny po zielonych testach (bez push).

## Weryfikacja (definicja ukończenia)
- `npm run lint`, `npm run build`, `npm run test:e2e` (desktop + mobile) — zielone.
- `grep -rn "TODO_SPEC" src/content` pokazuje placeholdery tylko w content; `grep -rnE "0[,.]001 ?g|Genauigkeit" src` nie zawiera wymyślonej dokładności (wolno: „Auflösung der Anzeige”).
- Czerwony `cta` użyty tylko na przyciskach CTA (`grep -rn "cta" src/components`).
- Oryginały w `images/` nietknięte (`git status` czysty po commicie).

## Poza zakresem
Stripe/checkout, strony sukcesu/anulowania, webhook, mail (pakiet 3); SEO/OG/favicon, treści stron prawnych, Lighthouse, Vercel, README z kluczami (pakiet 4).

## Handoff
Builder → `review-reviewer@waga-gold-conveyor` z wynikami komend z „Weryfikacji” i listą pól `TODO_SPEC` do uzupełnienia przez właściciela.
