# Calvin Crehencia — Portfolio

A React + Vite portfolio site with a dark editorial theme.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`, deployable to Vercel, Netlify, GitHub Pages, or any static host.

## Editing content

All resume/project content lives in `src/data/resume.js` — edit that file to update your info without touching any components.

## Structure

```
src/
  data/resume.js         content: profile, links, stats, skills, projects
  data/statusColor.js    per-project accent and status colors
  components/
    Hero.jsx             intro, contact, GitHub/LinkedIn/resume links
    Honors.jsx           GWA and awards
    Skills.jsx           skill chips with captions
    Projects.jsx         projects section
    ProjectCarousel.jsx  3D project carousel (arrow keys work)
    ProjectModal.jsx     project detail dialog
    Footer.jsx
  App.jsx
  index.css              design tokens and styles
```

Set `github`, `linkedin` and `resume` in `profile`, and `links.live` / `links.source` per project. Empty values are hidden. Put your resume PDF in `public/` and set `resume: "/resume.pdf"`.
