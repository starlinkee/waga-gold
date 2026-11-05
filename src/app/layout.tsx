import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { de, seo } from "@/content/de";
import { siteUrl } from "@/lib/site-url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteConfig.brandName, template: `%s | ${siteConfig.brandName}` },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: siteConfig.brandName,
    title: siteConfig.brandName,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.brandName, description: seo.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-bg text-fg">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2 focus:text-accent"
        >
          {de.skip}
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
