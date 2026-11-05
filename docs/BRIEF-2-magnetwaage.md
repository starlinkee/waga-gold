# Brief 2: produkt = Magnetwaage (test autentyczności), instrukcja PDF (DE)

## Co się zmienia
Produkt to NIE zwykła waga do ważenia złota, tylko **waga magnetyczna do nieniszczącego testu autentyczności** (monety/sztabki Au, Ag, Pt, Pd). Źródło informacji (właściciel: „weź informacje stąd jako nasz produkt"): https://www.gold-analytix.de/pruefgeraete/magneticscreenscale/ (produkt MagneticScreenScale, MARAWE/Goldanalytix). Notatki i teksty robocze: /tmp/claude-1000/ga/ (strona: page.html, instrukcja: anleitung.pdf, wyciąg DE: de.txt). Zrzuty referencyjne: /tmp/claude-1000/ga/ga-*.png.

## Fakty (ze strony producenta, można użyć jako fakty, NIE kopiować sformułowań)
- Pomiar magnetycznej różnicy wagi; rozróżnia materiały diamagnetyczne (Au, Ag) od para-/ferromagnetycznych (wolfram, tantal, molibden).
- Nieniszczące; pomiar przez blister i kapsułę; wnika do ok. 3 mm; monety i sztabki do 250 g; silny magnes neodymowy.
- Wykrywa m.in. wolfram w sztabkach/monetach i tantal w monetach 900/916.
- NIE nadaje się do biżuterii; nie analizuje stopu; sam nie wystarcza – zawsze druga metoda (np. pomiar gęstości).
- Zestaw (wg producenta): waga precyzyjna, nakładka wagi, głowica pomiarowa magnetyczna, osłona pleksi, magnes sztabkowy, płyta grafitowa, spray antystatyczny, zasilacz, instrukcja, walizka.
- Bezpieczeństwo: magnes neodymowy (rozrusznik serca/defibrylator, zgniecenie palców, kruchy – odpryski, z dala od nośników danych/zegarków mech./aparatów słuchowych/elektroniki, nie dla dzieci, nie połykać), spray (łatwopalny aerozol), akumulator NiMH (tylko zasilacz z zestawu, chronić przed ciepłem).

## UWAGA: nasze urządzenie wygląda inaczej
Na zdjęciach w images/ jest czarny, kompaktowy zestaw (mała waga z LCD i przyciskami ⏻ M P T, czarna głowica/kostka, czarny cylinder-osłona, kabel USB, walizka). Producent ma białą wagę laboratoryjną z żółtymi przyciskami. Dlatego: **nie przepisywać parametrów 1:1 jako potwierdzonych dla naszego modelu**. Wszystko, czego nie widać na naszych zdjęciach (zakres 250 g, 3 mm, czas pracy akumulatora, przyciski, procedura kalibracji, kody błędów) oznaczyć jako `TODO_SPEC` / „do potwierdzenia", ewentualnie z notką „wg producenta wzorca".

## Prawa autorskie (ważne)
Instrukcja producenta jest chroniona (© MARAWE GmbH & Co. KG, wszystkie prawa zastrzeżone), marka „MagneticScreenScale"/„Goldanalytix" należy do nich. Własną instrukcję i teksty strony pisać **własnymi słowami**, bez kopiowania akapitów, grafik, logo, nazwy marki ani zdjęć producenta. Nazwa naszej marki = placeholder z configu. Do README dopisać: właściciel potwierdza uprawnienia do sprzedaży/dystrybucji i do użycia informacji (autoryzowany reseller / własny produkt).

## Zadania
A. **Strona**: dostosować treści do produktu (headline: waga magnetyczna do sprawdzania autentyczności złota; sekcje inspirowane strukturą referencji: hero → intro → lista zalet → zasada pomiaru (dia- vs paramagnetyzm) → CTA z ceną → FAQ (pozytywny wynik przy fałszywce, biżuteria, zwykły magnes, interpretacja wyniku, brak analizy stopu, bezpieczeństwo/błędy) → kontakt). Zachować nasz ciemny styl „instrument" i dotychczasowe decyzje (de-AT, 499 €, tylko AT). Usunąć/poprawić wszystko, co przedstawia produkt jako zwykłą wagę jubilerską. Testy e2e zaktualizować.
B. **Instrukcja PDF po niemiecku** (tylko DE, bez EN/ES/FR): własny tekst, ok. 8–12 stron A4, w stylu strony (ciemny nagłówek, mono liczby). Spis treści; 1 Einführung (+ ważne: test magnetyczny nie wystarcza jako jedyna metoda); 2 Sicherheitshinweise (magnes, spray, akumulator, miejsce pracy, czyszczenie); 3 Lieferumfang (to co widać na zdjęciach + TODO); 4 Bedienelemente (⏻, M, P, T = TODO do potwierdzenia); 5 Inbetriebnahme und Messung (ustawienie/poziomowanie, włączenie, zerowanie, pomiar przez blister, odczyt, interpretacja wyniku: dodatni = diamagnetyczny, lekko ujemny = paramagnetyczny, silnie ujemny = ferromagnetyczny); 6 Fehlersuche (kody błędów tylko jako TODO); 7 Pflege, Lagerung, Entsorgung; 8 Kontakt/Impressum-Verweis. Generowanie: skrypt w repo (np. HTML→PDF przez Playwright `page.pdf`), wynik w `public/downloads/anleitung.pdf` (+ źródło), link na stronie produktu i w README. Test e2e: link do PDF działa, PDF się pobiera (nagłówki/Content-Type), plik ma sensowny rozmiar.
C. README: nowa checklista TODO_SPEC dla manuala i uprawnień.

## Zasady
Bez git push. Nie zmyślać parametrów technicznych ani certyfikatów (CE itp.). Teksty o bezpieczeństwie muszą zachować wszystkie ostrzeżenia z listy wyżej.

## Dodatek (właściciel): łatwy podgląd instrukcji
Link do PDF ma być dobrze widoczny na stronie: przycisk „Anleitung (PDF)" w sekcji zestawu/specyfikacji i w stopce, otwierany w nowej karcie (inline, nie wymuszone pobieranie), stały adres `/downloads/anleitung.pdf` (czyli https://waga-gold.vercel.app/downloads/anleitung.pdf). Wersja robocza PDF ma mieć znak „ENTWURF" dopóki TODO_SPEC nie są uzupełnione. Test e2e sprawdza widoczność linku i odpowiedź 200 z application/pdf.

## Aktualizacja (właściciel): to NASZ własny produkt pod własną marką
- README: usunąć punkt „potwierdź uprawnienia reselera". Zamiast niego: zastrzeżenie, że wszystkie parametry i deklaracje (zakres, głębokość penetracji, wykrywane fałszerstwa) właściciel potwierdza pomiarami NASZEGO urządzenia, bo wzięto je ze strony innego producenta.
- Dalej: własne słowa, żadnych nazw/logo/grafik/tekstów Goldanalytix/MARAWE/MagneticScreenScale na stronie ani w PDF; nie porównywać się z nimi i nie sugerować powiązania.
- Deklaracje skuteczności (wolfram, tantal, 3 mm, 250 g) pisać ostrożnie lub jako TODO_SPEC, dopóki nie są zmierzone na naszym urządzeniu. CE i inne certyfikaty tylko jeśli właściciel potwierdzi.
- Instrukcja: stopka producenta = nasza marka (placeholder), dane kontaktowe = TODO.
