import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    env: {
      STRIPE_MOCK: "1",
      STRIPE_WEBHOOK_SECRET: "whsec_e2e_dummy",
      STRIPE_SECRET_KEY: "",
      RESEND_API_KEY: "",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
