<div align="center">

# Arpan Kumar Panda · Portfolio

**AI/ML engineer in the making. Software that works. Always looking up at the stars.**

My personal portfolio: a dark night sky, a portrait made of dots, and a 3D orbit of the
projects I've built.

<!-- When the site is deployed, add the live link here:
[**Visit the live site →**](https://your-domain.com)
-->

[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![No UI libraries](https://img.shields.io/badge/UI_libraries-none-5b9bff?style=flat-square)](#tech-stack)

</div>

---

## What's on the page

1. **Hero.** My name, what I do, and my photo drawn as thousands of dots. The dots gather
   into the portrait on load, ripple away from your cursor, and scatter as you scroll.
   My motto types itself out at the bottom, like an AI model answering.
2. **About.** A panel that rises up and fills the screen as you scroll to it.
3. **My toolkit.** My skills, grouped like a spec sheet.
4. **Things I've built.**
   - Two highlight cards: my research on machine unlearning, and UniCart, a live app on Google Play.
   - All my other projects on a **3D orbit**: scrolling turns a spiral of glowing screens around
     a beam of light. Every project type has its own bold color. Click a project to open its
     details, photos and GitHub link. It works on phones and tablets too.
5. **Let's talk.** The page swirls into the button and a burst of light opens a contact scene:
   a beam of light, drifting dust, Michelangelo's hand reaching in, and me waving.

Behind everything: a near-black night sky with slowly drifting, twinkling stars. The page
shifts a little with your mouse, for a feeling of depth.

### Made with care
- Respects **reduced motion**: every animation calms down or switches off.
- Keyboard friendly: real links and buttons, and `Esc` closes windows.
- Smooth: only cheap things move (`transform` / `opacity`), and canvases pause when off screen.
- Works on phones, tablets and desktops.

## Tech stack

| | |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + a little custom CSS for animations |
| **Graphics** | HTML Canvas (stars, dotted portrait, light-beam dust) and CSS 3D (the project orbit) |
| **Smooth scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Fonts** | Space Grotesk, Geist, Geist Mono |

## Getting started

You'll need **Node.js 20+**.

```bash
git clone https://github.com/Arpan-ar7/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Make an optimized production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Check the code with ESLint |

## Make it yours

All the text lives in the [`data/`](data) folder. You don't need to touch the components to change content.

| File | What's in it |
| --- | --- |
| [`data/profile.ts`](data/profile.ts) | Name, role, tagline, email, links, About text and stats |
| [`data/skills.ts`](data/skills.ts) | The "My toolkit" section |
| [`data/spotlights.ts`](data/spotlights.ts) | The two highlight cards (research, live app) |
| [`data/projects.ts`](data/projects.ts) | All the other projects, with their photos |
| [`data/seo.ts`](data/seo.ts) | How Google and link previews see the site: address, title, description, other names |
| [`data/collaborators.ts`](data/collaborators.ts) | People I build with: credited on our shared projects and in the "Built together" card |

**Adding a project photo:** put the image in `public/projects/`, then add it to the project's
`images` list in `data/projects.ts` (with its width and height in pixels).

Colors are CSS variables at the top of [`app/globals.css`](app/globals.css).

## Project structure

Every file does one job and starts with a short comment saying what it is.

```text
app/                        Next.js entry point
  layout.tsx                  Fonts, background, navbar, contact panel (on every page)
  page.tsx                    The page: its sections, top to bottom
  globals.css                 Colors, animations, reduced-motion rules
  icon.png  apple-icon.png  favicon.ico   The site icon (my photo on blue)
  opengraph-image.jpg         The picture shown when the link is shared (1200 x 630)
  robots.ts  sitemap.ts       /robots.txt and /sitemap.xml for search engines

components/
  sections/                 One file per page section, in page order
    Hero.tsx  About.tsx  Skills.tsx  Projects.tsx  Contact.tsx
    BuiltTogether.tsx  Footer.tsx

  hero/                     Pieces only the Hero uses
    DottedPortrait.tsx        The portrait made of dots (canvas)
    StreamingLine.tsx         The motto that types itself out
    LocalTime.tsx             Live clock in the bottom bar

  projects/                 Pieces only the Projects section uses
    SpotlightCard.tsx         The two highlight cards (research, live app)
    ProjectOrbit.tsx          The 3D orbit you scroll through: scrolling + layout
    OrbitScreen.tsx           One glowing screen on the orbit
    ProjectInfo.tsx           The text and buttons about the project at the front
    TypeFilter.tsx            Project types: a list (big screens) or chips (phones)
    OrbitProgress.tsx         "03 / 08" and the progress bar
    ProjectDetails.tsx        The window that opens when you click a project
    MiniChart.tsx             Small decorative chart for projects without a photo
    projectTypes.ts           The bold color for each project type

  contact/                  The "Let's talk" screen and the contact section's pieces
    ContactPanel.tsx          The full-screen panel and its opening/closing transition
    ContactContent.tsx        The heading, text and links inside it
    LightBeamBackdrop.tsx     The light-beam scene behind it
    EmailButton.tsx           "Gmail me" with open/copy options

  background/               The night sky behind the whole site
    NightSky.tsx              The dark sky and the soft blue side light
    StarField.tsx             The drifting, twinkling stars (canvas)

  layout/                   Always on screen
    Navbar.tsx  BackToTop.tsx  SmoothScroll.tsx

  seo/                      Invisible info for search engines
    PersonJsonLd.tsx          Tells Google who the site is about (name, job, university, profiles)

  ui/                       Small pieces shared by several sections
    Reveal.tsx  RevealWords.tsx  ScrollRise.tsx  SectionHeading.tsx
    GroupLabel.tsx  LetsTalkButton.tsx  icons.tsx
    TeammateLink.tsx          "Built together with <name> ↗" on shared projects

data/                       All the text on the site (see "Make it yours")
  site.ts                     Collects the files below in one import
  profile.ts  skills.ts  spotlights.ts  projects.ts  collaborators.ts  seo.ts

lib/                        Plain helpers, no React
  dom.ts                      Where an element is on the page, is the contact screen open
  format.ts                   Small text helpers (e.g. 1 → "01")
  pointer.ts                  Mouse tracking for the "follow the cursor" effect
  smoothScroll.ts             Smooth scrolling (Lenis) helpers

public/                     Images, served as they are
  me/                         My photos
  media/                      Images for the contact scene
  projects/                   Project screenshots
```

**Where does a new file go?**
- A whole new page section → `components/sections/`, then add it to `app/page.tsx`.
- A piece used by only one section → that section's folder (`hero/`, `projects/`, `contact/`).
- A piece used by several sections → `components/ui/`.
- A helper that isn't a component → `lib/`.
- Text or project info → `data/`.

## Deploying

The easiest way is [Vercel](https://vercel.com/new): import the repo and it detects Next.js automatically. Any host that runs Node.js works too:

```bash
npm run build
npm run start
```

## Credits

- **"The Creation of Adam"**: fresco by Michelangelo (c. 1512), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg). Public domain. Adam's hand is cut out and tinted blue.
- **Built with help from AI.**

## About me

I'm a 3rd-year B.Tech CSE student at **Marwadi University**, focused on AI and machine learning, from classic ML and NLP to deep learning with PyTorch and LLM agents with LangChain and LangGraph. I'm actively looking for **AI/ML roles** and just as open to **software engineering** positions.

<div align="center">

[![Email](https://img.shields.io/badge/Gmail-arpankumarpandaar7%40gmail.com-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:arpankumarpandaar7@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arpankumarpanda-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arpankumarpanda)
[![GitHub](https://img.shields.io/badge/GitHub-Arpan--ar7-181717?style=for-the-badge&logo=github)](https://github.com/Arpan-ar7)

**Feedback welcome!** If anything on the site feels over-designed, confusing, or just not good, tell me. I'd really appreciate it.

</div>

## License

This is my personal portfolio. Feel free to look around and learn from the code, but please don't copy the design or my personal content as-is. If you'd like to reuse something, just ask.
