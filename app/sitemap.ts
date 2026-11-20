import type { MetadataRoute } from "next";
import { seo } from "@/data/site";

// Makes /sitemap.xml: the list of pages for search engines. The site is one page, so it's one
// entry. (Submit this address in Google Search Console: <your site>/sitemap.xml)
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: seo.siteUrl, changeFrequency: "monthly", priority: 1 }];
}
