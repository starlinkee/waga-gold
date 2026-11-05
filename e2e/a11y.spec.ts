import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const url of ["/", "/abgebrochen", "/impressum", "/nie-ma-takiej"]) {
  test(`axe: keine serious/critical Verstöße auf ${url}`, async ({ page }) => {
    await page.goto(url);
    await page.waitForTimeout(1500); // Zähleranimation abwarten
    const { violations } = await new AxeBuilder({ page }).analyze();
    const bad = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad.map((v) => `${v.id}: ${v.nodes[0]?.html}`)).toEqual([]);
  });
}

test("Skip-Link: Fokus beim ersten Tab, springt zu #inhalt", async ({ page, isMobile }) => {
  test.skip(isMobile, "Tastaturtest nur Desktop");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Zum Inhalt" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#inhalt$/);
  await expect(page.locator("main#inhalt")).toBeVisible();
});
