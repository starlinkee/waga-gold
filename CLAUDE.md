## Testy e2e (VB — obowiązkowe)

- Każda zmiana widoczna dla użytkownika (strona, formularz, przepływ, API używane przez UI) ma test e2e w Playwright: główna ścieżka i najważniejszy błąd.
- Brak Playwrighta w projekcie → najpierw go skonfiguruj: `@playwright/test`, `playwright.config.ts`, katalog `e2e/`, skrypt `npm run test:e2e`.
- `npm run test:e2e` musi przechodzić przed commitem i przed oddaniem do review. Planner ujmuje testy e2e w każdym pakiecie; reviewer odrzuca pracę bez testów e2e albo z czerwonymi testami.