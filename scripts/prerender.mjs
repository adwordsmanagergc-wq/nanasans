// Build step: render every route to static HTML so crawlers get full content.
// Runs after `vite build` (client) and `vite build --ssr` (dist-ssr/entry-server.js).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_ORIGIN = "https://nanasans.com";

const { render, PAGES, NOT_FOUND_SEO, headHtml } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !/<div id="root"><\/div>/.test(template)) {
  throw new Error("dist/index.html is missing the <!--app-head--> marker or an empty #root");
}

/** "/" -> index.html, "/blog" -> blog.html, "/blog/x" -> blog/x.html (served with Vercel cleanUrls). */
const fileFor = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

function writePage(route, seo, file) {
  const appHtml = render(route);
  // Function replacements: a string replacement would treat "$$", "$&" etc. in the content as patterns.
  const html = template
    .replace("<!--app-head-->", () => headHtml(seo))
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log(`  prerendered ${route.padEnd(52)} -> dist/${file}`);
}

console.log("Prerendering routes:");
for (const seo of PAGES) writePage(seo.path, seo, fileFor(seo.path));
// Vercel serves dist/404.html (with a 404 status) for any unknown URL.
writePage("/404", NOT_FOUND_SEO, "404.html");

// Sitemap: posts use their publish date; other pages use the date their source
// last changed in git, falling back to today.
const today = new Date().toISOString().slice(0, 10);
function gitDate(...files) {
  try {
    const out = execSync(`git log -1 --format=%cs -- ${files.join(" ")}`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    return out || today;
  } catch {
    return today;
  }
}
const SOURCES = {
  "/": ["src/react-app/pages/Home.tsx", "src/react-app/components", "src/data/menu.ts"],
  "/menu": ["src/react-app/pages/MenuPage.tsx", "src/data/menu.ts"],
  "/blog": ["src/react-app/pages/Blog.tsx", "src/data/blogPosts.ts"],
  "/faq": ["src/react-app/pages/FAQ.tsx"],
  "/privacy": ["src/react-app/pages/PrivacyPolicy.tsx"],
};
const urls = PAGES.filter((p) => !p.noindex).map((p) => {
  const loc = p.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${p.path}`;
  const lastmod = p.lastmod ?? (SOURCES[p.path] ? gitDate(...SOURCES[p.path]) : today);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
);
console.log(`  wrote dist/sitemap.xml (${urls.length} URLs)`);

fs.rmSync(ssrDir, { recursive: true, force: true });
