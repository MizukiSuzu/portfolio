# Calvin Crehencia — Portfolio

A React + Vite portfolio site with a terminal/HUD design theme.

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
  data/resume.js        content: profile, stats, skills, projects
  components/
    Hero.jsx             terminal boot-sequence intro
    StatPanel.jsx         GWA / awards HUD panel
    AbilityBar.jsx        skills as tags
    Projects.jsx           project list
    ProjectCard.jsx        expandable project card
    Footer.jsx
  App.jsx
  index.css              design tokens (colors, fonts)
```
