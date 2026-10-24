<div align="center">

# Arpan Kumar Panda · Portfolio

**AI/ML engineer in the making. Software that works. Always looking up at the stars.**

A space-themed personal portfolio where the background is the *real* night sky, live,
and scrolling the page takes you on a trip from Earth to the Moon.

<!-- When the site is deployed, add the live link here:
[**Visit the live site →**](https://your-domain.com)
-->

[![Next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![No UI libraries](https://img.shields.io/badge/UI_libraries-none-f5c451?style=flat-square)](#tech-stack)

</div>

<!-- Screenshots: save images in docs/screenshots/ with these names, then delete this comment line and the closing one below.

<p align="center">
  <img src="docs/screenshots/hero.png" alt="Hero: dotted portrait over the live night sky" width="100%" />
</p>
<p align="center">
  <img src="docs/screenshots/contact.png" alt="Contact: a hand reaching into a beam of light" width="49%" />
  <img src="docs/screenshots/footer.png" alt="Footer: Earthrise over the Moon" width="49%" />
</p>

-->

---

## The idea

The whole page is one small journey through space:

1. **Lift-off.** You start on Earth: a glowing horizon under my name, with the real stars overhead.
2. **The trip.** Scrolling carries you through About, Skills and Projects.
3. **First contact.** "Let's talk" pulls the whole page into a burst of light.
4. **Landing.** The page ends on the Moon, looking back at the Earth, with a trip meter showing you've travelled **384,400 km**.

It's black and gold, with soft light coming in from the side. No UI libraries: just React, Tailwind and a few canvases.

## Features

### 🌌 A live night sky
The background is the actual sky above Rajkot, India, at this exact moment.

- About 100 real bright stars and constellation lines (Orion, Scorpius, the Big Dipper, Cassiopeia and more).
- The sky turns slowly with the Earth's real rotation. Come back in a few hours and different stars will be up.
- **Hover** a star to see its name and constellation, and light up the constellation's lines.
- **Click** a star to open an info card: a short fact, how bright it is, where it is in the sky *right now* ("40° up, toward the north-east"), and a Wikipedia link.

### 🧑‍🚀 A portrait made of stars
- My photo, drawn as thousands of halftone dots with a gold rim light.
- On load, the dots start scattered like stars and gather into the portrait in a wave.
- Hover it and the dots ripple away from your cursor and float back.
- Scroll down and it scatters into space.

### ✍️ A quote that types itself
The tagline streams in word by word, like an AI model generating an answer, with a blinking cursor.

### ✨ "Let's talk"
- The page swirls into the button you clicked, and a burst of warm light fills the screen.
- You land in a dark scene with a beam of golden light, dust drifting through it, and film grain.
- Michelangelo's hand reaches into the light from one side while I wave from the other.
- **Gmail me** opens Gmail directly. Hover it for **Open in Gmail** or **Copy email**.

### 🌕 The landing
- *Earthrise* over the Moon, a trip meter that counts up as you scroll, and a few honest lines.

### ♿ Made with care
- Respects **reduced motion**: every animation calms down or switches off.
- Keyboard friendly, with real links and buttons and `Esc` to close panels.
- Canvases pause when off screen or when the tab is hidden. The images are small WebP files, preloaded so the contact scene opens instantly.

## How the live sky works

No API, no images: it's computed in the browser every frame.

1. Each star has a fixed "address" on the sky: **right ascension** and **declination** ([`lib/stars.ts`](lib/stars.ts)).
2. From the current time and the observer's longitude, the code works out the **local sidereal time**: which slice of the sky is overhead right now.
3. Spherical trigonometry turns each star's address into **altitude** (how high it is) and **azimuth** (compass direction) for Rajkot.
4. A stereographic projection draws the dome of the sky on the screen as if you're lying on your back looking up: straight overhead in the middle, north at the top.

The ~100 named stars are real. The faint background dots are decorative filler for depth.

## Tech stack

| | |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + a little custom CSS for animations |
| **Graphics** | HTML Canvas (night sky, dotted portrait, light-beam dust) |
| **Smooth scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Fonts** | Instrument Serif, Space Grotesk, Geist, Geist Mono |

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

Almost everything you'd want to change lives in **one file**: [`data/site.ts`](data/site.ts).

- **Profile:** name, role, tagline, email, GitHub, LinkedIn
- **About:** paragraphs, stats and the closing quote
- **Skills:** the two skill cards and their groups
- **Projects:** titles, descriptions, tags and links
- **The sky:** change `sky.lat` / `sky.lon` to show the live sky over *your* city

Star facts and constellation names are in [`lib/starInfo.ts`](lib/starInfo.ts). Colors are CSS variables at the top of [`app/globals.css`](app/globals.css).

## Project structure

```text
app/
  layout.tsx            Fonts, background layers, navbar, contact panel
  page.tsx              The sections, top to bottom
  globals.css           Colors, animations, reduced-motion rules
components/
  sections/             Hero, About, Skills, Projects, Contact, Footer
  contact/              "Let's talk" panel, light-beam scene, Gmail button
  NightSky.tsx          The live sky, hover labels and star info card
  DottedPortrait.tsx    The halftone portrait (canvas)
  StarLight.tsx         Black background with soft side light
  StreamingLine.tsx     The AI-style typing quote
  TripMeter.tsx         Earth-to-Moon distance counter
data/
  site.ts               All the text and links on the site
lib/
  stars.ts              Star catalog + constellation lines
  starInfo.ts           Star facts and constellation names
public/
  me/                   My photos
  media/                Space images
```

## Deploying

The easiest way is [Vercel](https://vercel.com/new): import the repo and it detects Next.js automatically. Any host that runs Node.js works too:

```bash
npm run build
npm run start
```

## Credits

- **"Earthrise"**: photo by astronaut William Anders, NASA, Apollo 8 (1968). Public domain.
- **"The Creation of Adam"**: fresco by Michelangelo (c. 1512), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg). Public domain. Adam's hand is cut out and tinted gold.
- **Star positions**: standard J2000 catalog values for the brightest stars.
- **Built with help from AI.** I'm not hiding it (the footer says so too 😄).

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
