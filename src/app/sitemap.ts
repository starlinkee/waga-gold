import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/impressum", "/agb", "/datenschutz", "/widerruf"].map((p) => ({ url: `${siteUrl}${p}` }));
}
