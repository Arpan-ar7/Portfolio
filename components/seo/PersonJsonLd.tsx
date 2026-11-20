import { profile, seo } from "@/data/site";

/**
 * Invisible "structured data" for Google: a small block of facts saying this site is about one
 * person (you), with your name, other names, job, university, city and your GitHub / LinkedIn.
 * Google uses it to connect searches like "Arpan Kumar Panda" or "Arpan AR7" to this site,
 * and sometimes to show a profile box in the results. Nothing here appears on the page.
 * (Format: JSON-LD from schema.org. All the text comes from data/profile.ts and data/seo.ts.)
 */
export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${seo.siteUrl}/#person`,
        name: profile.name,
        alternateName: seo.otherNames,
        givenName: "Arpan Kumar",
        familyName: "Panda",
        url: seo.siteUrl,
        image: `${seo.siteUrl}/me/arpan-formal.jpg`,
        jobTitle: profile.role,
        description: seo.description,
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
        address: { "@type": "PostalAddress", addressLocality: "Rajkot", addressRegion: "Gujarat", addressCountry: "IN" },
        knowsAbout: seo.knowsAbout,
        // Your profiles elsewhere: this is how Google knows they're all the same person
        sameAs: [profile.github, profile.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${seo.siteUrl}/#website`,
        url: seo.siteUrl,
        name: `${profile.name} — Portfolio`,
        alternateName: ["AR7", "Arpan's portfolio"],
        author: { "@id": `${seo.siteUrl}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is swapped for its code so nothing in the text can break out of the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
