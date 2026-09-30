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

## Images

All photos, the logo and the menu pages are served from `public/images/`
(they used to be hot-linked from the old Mocha CDN, which no longer serves them).
The logo, menu pages (`1Starters-Sides.jpg` … `18ourstory.jpg`) and the Our Story
photo (`nanny-sandra.jpg`) are already there. The food and dining-room photos still
need uploading to `public/images/` with exactly these names:

- `nana-sans-logo.png`
- Photos: `Screenshot-2026-03-28-at-3.16.18-pm.png` (chicken tikka masala),
  `Screenshot-2026-03-28-at-3.16.26-pm.png` (tandoori chicken),
  `Screenshot-2026-03-28-at-3.16.33-pm.png` (dal makhani),
  `Screenshot-2026-03-28-at-3.16.53-pm.png` (heritage dishes),
  `Screenshot-2026-03-28-at-3.23.22-pm.png` (dining room),
  `Screenshot-2026-03-28-at-3.23.52-pm.png` (tandoori platter, hero)
- Menu pages: `1Starters-Sides.jpg`, `2Meat-Curries.jpg`, `3Vegetarian-Curries.jpg`,
  `4Vegan-Curries.jpg`, `5Mains.jpg`, `6Nans-Tandoori-Grill.jpg`, `7Wraps.jpg`,
  `8Box-Specials.jpg`, `9Naans-Rotis.jpg`, `10Sauces-Chutney.jpg`,
  `11-rice-biryani.jpg`, `12tea.jpg`, `13drinks.jpg`, `14-fresh-juice.jpg`,
  `15signature-drinks.jpg`, `16signatured-drinks2.jpg`, `17desserts.jpg`,
  `18ourstory.jpg`

## Instagram feed

The home page has a "Follow Us" section. To show the latest posts automatically:

1. Create a free account at [behold.so](https://behold.so), connect the
   `@nanasans_bali` Instagram account and create a JSON feed.
2. In Vercel, open the project → **Settings → Environment Variables** and add
   `VITE_INSTAGRAM_FEED_URL` set to the feed URL (e.g. `https://feeds.behold.so/…`).
3. Redeploy. New Instagram posts then appear on the site automatically.

Without the variable the section shows a "Follow @nanasans_bali" card instead.
