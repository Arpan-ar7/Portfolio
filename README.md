# Arpan Kumar Panda — Portfolio

> A modern, interactive portfolio for **Arpan Kumar Panda**, an AI/ML Engineer and Computer Science student building intelligent systems with machine learning, deep learning, and software engineering.

<p align="center">
  <a href="https://github.com/Arpan-ar7/Portfolio">
    <img src="https://img.shields.io/badge/Source%20Code-GitHub-181717?style=for-the-badge&logo=github" alt="Source code on GitHub" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Built with Next.js" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="Built with TypeScript" />
  </a>
</p>

## About the project

This portfolio is designed to present Arpan's work, skills, projects, and interests through a focused, visual experience. The site combines a space-inspired aesthetic with smooth interactions and a content-first architecture that makes personal details easy to update.

The homepage is organized into:

- **Hero** — introduction, role, and primary call to action
- **About** — background, interests, and quick stats
- **Skills** — AI/ML, software engineering, and current areas of exploration
- **Projects** — selected machine learning and software projects
- **Contact** — a dedicated section and interactive contact panel
- **Footer** — social links and closing navigation

## Highlights

- Responsive portfolio experience for desktop, tablet, and mobile
- Dark space-inspired visual design with an optional light theme
- Animated neural-network background
- Smooth scrolling powered by Lenis
- Interactive navigation and contact panel
- Custom typography using Geist, Space Grotesk, and Instrument Serif
- Centralized portfolio content in `data/site.ts`
- Component-based Next.js App Router architecture
- Optimized for deployment on Vercel

## Tech stack

| Category | Technologies |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) with the App Router |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Motion | [Lenis](https://lenis.darkroom.engineering/) |
| Fonts | Geist, Geist Mono, Space Grotesk, Instrument Serif |
| Tooling | ESLint, Turbopack, npm |
| Deployment | [Vercel](https://vercel.com/) |

## Getting started

### Prerequisites

Make sure you have the following installed:

- Node.js 20 or later
- npm, pnpm, yarn, or Bun
- Git

### Installation

```bash
git clone https://github.com/Arpan-ar7/Portfolio.git
cd Portfolio
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The development server supports hot reload, so changes appear automatically as you edit the project.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Runs ESLint checks |

Before opening a pull request or deploying, run:

```bash
npm run lint
npm run build
```

## Project structure

```text
.
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts, and global UI
│   ├── page.tsx                # Homepage section composition
│   └── globals.css             # Global styles and theme variables
├── components/
│   ├── sections/               # Hero, About, Skills, Projects, Contact, Footer
│   ├── contact/                # Contact panel UI
│   ├── Navbar.tsx              # Site navigation
│   ├── NeuralBackground.tsx    # Animated background experience
│   ├── SmoothScroll.tsx        # Smooth scrolling integration
│   └── BackToTop.tsx           # Back-to-top interaction
├── data/
│   └── site.ts                 # Profile, skills, projects, and social links
├── public/                     # Static assets
├── package.json                # Scripts and dependencies
└── tsconfig.json               # TypeScript configuration
```

## Customize the portfolio

Most personal content can be changed from one file:

```text
data/site.ts
```

Update the following values there:

- Name, role, tagline, university, and degree
- Email, GitHub, and LinkedIn links
- About paragraphs and statistics
- Skill groups and technologies
- Featured projects, descriptions, tags, and repository links

For layout and visual changes, edit the corresponding files in `components/sections/`, `components/`, or `app/globals.css`.

## Deployment

### Deploy with Vercel

The simplest deployment path is to import this repository into [Vercel](https://vercel.com/new). Vercel automatically detects the Next.js project and configures the build settings.

For a local production check:

```bash
npm run build
npm run start
```

### Other hosting platforms

Any platform that supports Node.js and Next.js can host the project. Use the following commands in your deployment configuration:

```bash
npm run build
npm run start
```

## Featured work

The portfolio currently highlights projects across AI/ML, NLP, and applied software engineering, including:

- [Multi-Agent Research System](https://github.com/Arpan-ar7/Multi_Agent_Research_System) — collaborative AI agents that research topics and produce a consolidated report
- [Student Mental Health Predictor](https://github.com/Arpan-ar7/Students_Mental_Health_Predictor) — an ML model served through FastAPI with a web interface
- [Question Answering System](https://github.com/Arpan-ar7/QuestionAnswerSystem-using-RNN-PyTorch-) — a recurrent neural network question-answering project built with PyTorch
- [Credit Risk Prediction](https://github.com/Arpan-ar7/Credit_Risk_Prediction-MLPROJECT) — an end-to-end credit-risk classification pipeline
- [Quora Duplicate Questions](https://github.com/Arpan-ar7/NLP-QuoraDuplicateQuestions) — NLP-based duplicate-question detection
- [Customer Churn Predictor](https://github.com/Arpan-ar7/ChurnPredictor-ML-) — customer churn prediction with data preparation and model evaluation

## Connect

- **GitHub:** [Arpan-ar7](https://github.com/Arpan-ar7)
- **LinkedIn:** [Arpan Kumar Panda](https://www.linkedin.com/in/arpankumarpanda)

If you are interested in AI/ML, software engineering, intelligent systems, or potential collaboration, feel free to connect.

## License

This project is currently intended as a personal portfolio. If you would like to reuse any part of the design or implementation, please contact Arpan first.
