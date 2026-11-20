// ============================================================
//  HOW GOOGLE (and LinkedIn, WhatsApp...) SEES YOUR SITE.
//  Used by app/layout.tsx, app/sitemap.ts, app/robots.ts and app/opengraph-image.tsx.
// ============================================================

export const seo = {
  // Your site's address. If you buy your own domain later (e.g. arpankumarpanda.dev),
  // change it here and everything else follows.
  siteUrl: "https://ar7arpan.vercel.app",

  // The blue link in Google results and the text on the browser tab.
  // Keep your full name first: that's what people search for.
  // (Google cuts titles off after about 60 characters.)
  title: "Arpan Kumar Panda — AI/ML & Software Engineer Portfolio",

  // The grey text under the link in Google results (about 150-160 characters).
  description:
    "Arpan Kumar Panda (Arpan, AR7): machine learning engineer and software engineer from Marwadi University. RAG, multi-agent AI, ML projects and a live Android app.",

  // Other names people might search for you by (helps Google connect them to you)
  otherNames: ["Arpan", "Arpan Panda", "AR7", "Arpan-ar7"],

  // What you work on (for Google's "about this person" data)
  knowsAbout: [
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Natural Language Processing",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Multi-agent systems",
    "LangGraph",
    "PyTorch",
    "Software Engineering",
    "Android development",
  ],

  // Google Search Console's check that this site is yours. When you add the site there and pick
  // "HTML tag", paste just the content="..." code here (leave it empty until then).
  googleVerification: "",
};
