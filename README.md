# Nana Sans – Authentic Tandoori & British-Indian Cuisine in Canggu

The marketing website for **Nana Sans Tandoori Kitchen**, an Indian restaurant in
Canggu, Bali. A single-page React app with a home page (hero, gallery, full-screen
menu viewer, story & FAQ), a blog, an FAQ page, and a privacy policy.

This is a recreation of the original app (exported from the Mocha platform) as a
**standard, portable Vite + React app** with all Mocha/Cloudflare-specific platform
dependencies removed. It runs anywhere a static site can be hosted and is
configured for one-click deployment to **Vercel**.

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [lucide-react](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check and build to dist/
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Deploying to Vercel

The repo includes a `vercel.json` preconfigured for a Vite SPA, so deployment is
automatic:

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New… → Project** and import the repository.
3. Vercel auto-detects the Vite framework. No changes needed — defaults are:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
4. Click **Deploy**.

The `rewrites` rule in `vercel.json` sends all non-asset routes to `index.html`
so client-side routes such as `/blog`, `/blog/:slug`, `/faq`, and `/privacy`
resolve correctly on direct navigation and page refresh.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## Project structure

```
index.html                     App shell + SEO meta tags and JSON-LD structured data
public/
  robots.txt                   Search-engine crawl rules
  sitemap.xml                  Static sitemap
src/
  react-app/
    main.tsx                   React entry point
    App.tsx                    Routes
    index.css                  Tailwind + design tokens
    components/                Hero, PhotoGallery, MenuViewer, AboutSection, Footer, FloatingWhatsApp
    pages/                     Home, Blog, BlogPost, FAQ, PrivacyPolicy
    lib/utils.ts               `cn()` class-name helper
  data/
    blogPosts.ts               Blog article content
  shared/
    types.ts                   Shared types (placeholder)
```

## Notes on assets & migration

- Images (logo, food photos, and the full menu pages) are still served from the
  original Mocha content URLs (`*.mochausercontent.com`). **These will stop
  working once Mocha shuts down.** Before then, download the images, re-host them
  (e.g. in `public/` or on Vercel Blob / another CDN), and update the URLs in the
  components (`HeroSection.tsx`, `PhotoGallery.tsx`, `MenuViewer.tsx`,
  `AboutSection.tsx`) and in `index.html`.
- The original app ran on Cloudflare Workers and generated `robots.txt` /
  `sitemap.xml` dynamically in a worker. Those are now plain static files in
  `public/`.
- The original export bundled Mocha auth (users service), a D1 database, and an
  email service binding. **None of these were used by the site** — the app is
  fully static — so they have been dropped. If you later add features that need a
  backend, add Vercel Serverless/Edge Functions under an `api/` directory.
