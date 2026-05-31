# The Twins of the Father
[![Netlify Status](https://api.netlify.com/api/v1/badges/59a77d3c-5775-4af9-801c-f2a8fd68cad7/deploy-status)](https://app.netlify.com/projects/twins-of-the-father/deploys)

An Astro-based blog for **The Twins of the Father**, with static generation, RSS, search, and a lightweight content model for writing posts in Markdown.

## Live site
- [twins.bitrot.net](https://twins.bitrot.net)

## Tech stack
- [Astro](https://astro.build/) (static output)
- [Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- [Vitest](https://vitest.dev/) for utility and migration-script tests
- [Pagefind](https://pagefind.app/) for client-side search indexing
- Netlify for deployment

## Getting started
### Prerequisites
- Node.js 20+ (Netlify build is pinned to Node 20)
- npm

### Install
```bash path=null start=null
npm install
```

### Run locally
```bash path=null start=null
npm run dev
```
Open the local URL shown by Astro (typically `http://localhost:4321`).

## Available scripts
- `npm run dev` — start Astro dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run check` — run Astro type/content checks
- `npm run test` — run Vitest test suite

## Content authoring
Posts live in `src/content/posts/*.md` and use Astro content collections defined in `src/content/config.ts`.

Expected frontmatter:
- `title` (string)
- `date` (date)
- `tags` (string array, optional)
- `draft` (boolean, optional; defaults to `false`)

Example:
```md path=null start=null
---
title: "A New Post"
date: 2026-05-31
tags: ["family", "blog"]
draft: false
---

Post content here.
```

## Search
The search page is implemented at `src/pages/search.astro` with Pagefind UI.
For Netlify, search indexing runs during build via:
- `npm run build && npx pagefind@1 --site dist`

If you build locally and want search data generated manually:
```bash path=null start=null
npm run build
npx pagefind@1 --site dist
```

## RSS
RSS feed is generated at `src/pages/rss.xml.js` and available at `/rss.xml`.

## Deploying
### Netlify
This repo includes `netlify.toml` with:
- build command: `npm run build && npx pagefind@1 --site dist`
- publish directory: `dist`
- Node version: `20`

The status badge above links to the Netlify deploy history for this site. To create a new Netlify site from this repository, connect the repo in Netlify.

## Project structure
```text path=null start=null
src/
  components/    # Header, footer, post card
  content/       # Astro content collection schema + post markdown
  layouts/       # Base and post layouts
  pages/         # Routes (index, post, tags, search, RSS, 404)
  utils/         # Helpers + tests (excerpt, tag slug)
public/          # Static assets
```
