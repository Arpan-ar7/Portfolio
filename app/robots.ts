import type { MetadataRoute } from "next";
import { seo } from "@/data/site";

// Makes /robots.txt: lets every search engine read the whole site, and tells them where the
// sitemap is.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
    host: seo.siteUrl,
  };
}
