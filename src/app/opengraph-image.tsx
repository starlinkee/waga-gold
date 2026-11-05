import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { seo } from "@/content/de";

export const alt = seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Kolory OG = wartości tokenów z globals.css (ImageResponse nie czyta CSS variables).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0d10",
          color: "#e8ecf1",
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: 12, color: "#9fe3ff", fontFamily: "monospace" }}>
          {siteConfig.brandName}
        </div>
        <div style={{ fontSize: 56, marginTop: 40 }}>{seo.productName}</div>
        <div style={{ fontSize: 120, marginTop: 20, color: "#9fe3ff", fontFamily: "monospace" }}>0.000 g</div>
        <div style={{ fontSize: 48, marginTop: 40 }}>{siteConfig.price.display}</div>
      </div>
    ),
    size,
  );
}
