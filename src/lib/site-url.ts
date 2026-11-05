// Publiczny adres strony (NEXT_PUBLIC_SITE_URL), fallback na localhost.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
