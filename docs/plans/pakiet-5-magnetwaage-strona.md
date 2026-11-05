# Pakiet 5 — strona jako Magnetwaage (plan)

Źródło: `docs/BRIEF-2-magnetwaage.md` (zadanie A), qitem-20261105160340-5a0c5aff6c09093c. Bazuje na pakiecie 4 (`60e8ae6`), strona wdrożona na https://waga-gold.vercel.app.

## Cel
Strona przedstawia produkt jako **wagę magnetyczną do nieniszczącego sprawdzania autentyczności** monet/sztabek (Au, Ag, Pt, Pd), a nie jako wagę jubilerską. Nowa struktura sekcji wg briefu, ciemny styl „instrument”, de-AT, 499 €, tylko AT bez zmian. Fakty i ostrzeżenia w **jednym module content**, z którego w pakiecie 6 skorzysta instrukcja PDF.

## Założenia
- Fakty o zasadzie działania, ograniczeniach i bezpieczeństwie: lista w briefie (sekcje „Fakty” i „Bezpieczeństwo”). Materiał roboczy w `/tmp/claude-1000/ga/` (`de.txt`, `page.html`, zrzuty `ga-*.png`) służy tylko do lektury: **nic z niego nie kopiuj do repo** (tekst, grafiki, logo, zdjęcia, nazwy „MagneticScreenScale”/„Goldanalytix”/„MARAWE”). Piszemy własnymi słowami, nazwa marki tylko z `siteConfig.brandName`. Build i testy nie mogą zależeć od `/tmp`.
- **Nasze urządzenie wygląda inaczej niż wzorzec.** Jako fakty o naszym produkcie wolno podać zasadę działania i ograniczenia metody (to fizyka i zastosowanie), ale parametry wzorca (do 250 g, ok. 3 mm, pomiar przez blister/kapsułę, magnes neodymowy, wykrywanie wolframu/tantalu, akumulator NiMH, zasilacz, spray, płyta grafitowa, pleksi) **nie są potwierdzone dla naszego modelu**: albo `TODO_SPEC`, albo ostrożnie z dopiskiem „Wert wird noch durch Messungen an diesem Gerät bestätigt” (przez wspólną stałą/oznaczenie w content, żeby dało się je masowo usunąć/potwierdzić). **Aktualizacja właściciela: to nasz własny produkt pod własną marką** — na stronie nigdy nie wspominaj innego producenta, „Referenzgerät”, nie porównuj się i nie sugeruj powiązania. Moneta w kapslu na zdjęciu `koffer-muenze` to jedyny dowód „pomiaru przez kapsułę” — nadal TODO do potwierdzenia.
- Zestaw z naszych zdjęć: waga z LCD i przyciskami ⏻ M P T, czarna kostka (na niej leży moneta), czarny cylinder, kabel USB, walizka. Funkcji kostki/cylindra nie zgadujemy (brief: głowica/kostka i cylinder-osłona) — nazwy robocze + `TODO_SPEC`. Usuń „Kalibriergewicht” jako fakt (nie wiemy, czy cylinder to odważnik).
- Zostają: `LCD_TARGET = 0`, licznik uspokaja się na `0.000 g`, „Auflösung 0,001 g” (TODO potwierdzić), Stripe/checkout, SEO-mechanika, strony prawne, `cacheComponents`. Nie zmyślać certyfikatów (CE itp.).
- Link do instrukcji PDF i sam PDF — **pakiet 6** (żeby nie było martwego linku).

## Kroki
1. **Content — jedno źródło faktów** `src/content/product.ts` (nowy), czyste dane bez JSX, żeby PDF w pak. 6 mógł z nich korzystać:
   - `principle` — zasada pomiaru własnymi słowami: magnes pod/nad próbką zmienia wskazanie wagi; diamagnetyczne (Au, Ag) → odpychane, para-/ferromagnetyczne (np. wolfram, tantal, molibden) → przyciągane; interpretacja odczytu: dodatni = diamagnetyczny, lekko ujemny = paramagnetyczny, silnie ujemny = ferromagnetyczny (wg briefu; jeśli kierunek znaku zależy od budowy naszego urządzenia, dodaj `TODO_SPEC: kierunek znaku do potwierdzenia`).
   - `benefits` — lista zalet (nieniszczący, szybki test, metale szlachetne Au/Ag/Pt/Pd, wykrywa podejrzane domieszki para-/ferromagnetyczne) — bez liczb wzorca jako faktów.
   - `limits` — ograniczenia (zachowaj wszystkie): nie do biżuterii, nie analizuje stopu, nigdy jedyna metoda — zawsze druga metoda (np. pomiar gęstości).
   - `safety` — ostrzeżenia (zachowaj **wszystkie** z briefu): magnes (rozrusznik/defibrylator, zgniecenie palców, kruchy/odpryski, z dala od nośników danych, zegarków mechanicznych, aparatów słuchowych, elektroniki, nie dla dzieci, nie połykać), spray (łatwopalny aerozol), akumulator NiMH (tylko zasilacz z zestawu, chronić przed ciepłem). Elementy, których obecność w naszym zestawie nie jest potwierdzona (spray, akumulator, zasilacz), oznacz `inKitConfirmed: false` / „falls im Lieferumfang – zu bestätigen”, ale ostrzeżeń nie usuwaj.
   - `unverifiedSpecs` — deklaracje do potwierdzenia pomiarami naszego urządzenia (250 g, ~3 mm, pomiar przez blister/kapsułę, wykrywanie wolframu/tantalu 900/916 itd.) z flagą `verified: false`; w UI pokazywane ostrożnie („bis zu … – Messung ausstehend”) albo jako „Angabe folgt” — wybór buildera, spójnie. Bez CE/certyfikatów.
2. **`spec.ts` / `kit.ts`**: spec = to, co widać na zdjęciach + `TODO_SPEC` dla: Messbereich (max. Masse der Probe), Eindringtiefe, Magnettyp, Stromversorgung/Akku-Laufzeit, Abmessungen, Gewicht, Zertifikate; usuń „Wägebereich/Kalibriergewicht” w sensie wagi jubilerskiej. `kit.ts`: Waage mit LCD, Messaufsatz/Würfel (TODO Funktion), Zylinder (TODO Funktion), USB-Kabel, Koffer + komentarz w kodzie `TODO_SPEC: czy zestaw zawiera magnes sztabkowy, płytę grafitową, spray antystatyczny, zasilacz, instrukcję?` (na stronie bez tej listy).
3. **Sekcje** (kolejność wg briefu): Hero → Intro → Vorteile (lista) → Messprinzip (dia- vs para-/ferromagnetisch; prosty schemat CSS/SVG własny, np. strzałki odpychanie/przyciąganie + przykładowe odczyty `+0.0xx`/`-0.0xx` jako ilustracja oznaczona „Beispiel”) → Kaufen (CTA z ceną, istniejący `BuyForm`) → FAQ → Kontakt. Spezifikation, Lieferumfang, Galerie, Versand zostają (umieść po Messprinzip lub po Kaufen — wybór buildera, logicznie). Nawigacja w headerze odpowiednio.
   - **Hero**: headline o sprawdzaniu autentyczności złota i srebra magnetycznie (bez obietnic 100% pewności), podtytuł o nieniszczącym teście, cena, CTA, licznik LCD (0.000 g).
   - **Intro**: problem fałszywek (rdzeń wolframowy itp.) i rola wagi magnetycznej jako szybkiego wstępnego testu — wraz z zastrzeżeniem o drugiej metodzie.
   - **FAQ** (min. tematy z briefu): pozytywny wynik przy fałszywce (możliwe — dlatego druga metoda), biżuteria (nie), zwykły magnes (dlaczego nie wystarcza), interpretacja wyniku, brak analizy stopu, bezpieczeństwo/błędy pomiaru (np. drgania, przeciąg, magnetyczne przedmioty w pobliżu — ogólne, bez kodów błędów); plus dotychczasowe (dostawa AT, cena). Odpowiedzi z nieznanymi danymi = `TODO_SPEC`.
   - **Kontakt**: nie znamy danych kontaktowych → tekst + link do `/impressum` + `TODO_SPEC` (E-Mail/Telefon).
   - **Sicherheit**: krótki blok z najważniejszymi ostrzeżeniami (magnes + rozrusznik serca) na stronie, pełna lista w FAQ lub osobnej sekcji.
4. **Usuń/popraw wszystko „waga jubilerska”**: `grep -rniE "Präzisionswaage|Wägebereich|Kalibriergewicht|Juwelier|Feinwaage" src e2e` → zero trafień (poza ewentualnym TODO-komentarzem). Popraw `seo.description`, `ogAlt`, alt-teksty w `images.ts`, `opengraph-image.tsx`, JSON-LD (`name`/`description`), teksty Vorteile.
5. **Testy e2e**: zaktualizuj `product.spec.ts`, `seo.spec.ts` i inne, które sprawdzają stare teksty; nowe asercje:
   - główna ścieżka: h1 mówi o sprawdzaniu autentyczności (np. zawiera „Echtheit”), widoczne sekcje Intro, Vorteile, Messprinzip (z „diamagnetisch” i „paramagnetisch”/„ferromagnetisch”), Kaufen z „499 €”, FAQ (pytanie o biżuterię rozwija się i mówi „nicht geeignet”/równoważne), Kontakt z linkiem do Impressum; blok bezpieczeństwa zawiera ostrzeżenie o rozruszniku serca („Herzschrittmacher”); zastrzeżenie o drugiej metodzie widoczne na stronie;
   - regresja/błąd: brak słów „Präzisionswaage”, „Kalibriergewicht”, „Wägebereich” w HTML; brak „MagneticScreenScale”, „Goldanalytix”, „MARAWE” w HTML i w `src/`; brak literału `TODO_SPEC` w HTML; meta description i JSON-LD nie mówią o wadze jubilerskiej; bez poziomego scrolla na mobile; checkout dalej działa (istniejące testy zielone).
6. Commit lokalny po zielonych testach (bez push), z tym planem.

## Weryfikacja
- `npm run lint`, `npm run build`, `npm run test:e2e` (desktop + mobile) — zielone.
- `grep -rniE "magneticscreenscale|goldanalytix|marawe" src public e2e` → pusto (w `docs/` brief może je wymieniać).
- `grep -rniE "Präzisionswaage|Wägebereich|Kalibriergewicht" src` → pusto.
- Wszystkie ostrzeżenia z listy briefu obecne w `src/content/product.ts` (reviewer porównuje listę 1:1).
- Deklaracje skuteczności (wolfram, tantal, 3 mm, 250 g) nigdzie nie podane jako potwierdzone; brak słów „Referenzgerät”, „Hersteller” w kontekście innej firmy, brak CE.

## Poza zakresem
Instrukcja PDF, link „Anleitung (PDF)”, README (pakiet 6). Zmiany ceny/kraju/checkoutu. Nowe zdjęcia. Deploy/push.

## Handoff
Builder → `review-reviewer@waga-gold-conveyor` z wynikami komend i listą nowych `TODO_SPEC`.
