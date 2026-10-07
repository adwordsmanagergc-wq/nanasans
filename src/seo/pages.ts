// Per-route SEO: title, description, canonical, social tags and JSON-LD.
// Used at build time (prerender writes these into each page's HTML) and in
// the browser (updates the head on client-side navigation).

import { SITE, SITE_ORIGIN } from "@/data/site";
import { blogPosts } from "@/data/blogPosts";
import { breadcrumbSchema, faqSchema, gallerySchema, menuSchema, restaurantSchema, websiteSchema } from "./schema";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
  /** Absolute or site-relative image URL for social previews. */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  /** Structured data emitted in the page head. */
  jsonLd?: Record<string, unknown>[];
  /** For the sitemap: YYYY-MM-DD of the last content change, if known. */
  lastmod?: string;
}

const STATIC_PAGES: PageSeo[] = [
  {
    path: "/",
    title: "Nana Sans | Indian Restaurant & Tandoori in Canggu, Bali",
    description:
      "Slow-cooked tandoori, creamy curries and British-Indian favourites at Nana Sans, an Indian restaurant in Canggu. Air-conditioned, with veg & vegan options.",
    jsonLd: [restaurantSchema(), websiteSchema(), gallerySchema(), faqSchema()],
  },
  {
    path: "/menu",
    title: "Menu | Nana Sans Indian Restaurant & Tandoori in Canggu",
    description:
      "The full Nana Sans menu with prices: tandoori grill, curries, vegetarian and vegan dishes, biryani, naan, wraps, chai and desserts. Indian food in Canggu, Bali.",
    jsonLd: [
      { "@context": "https://schema.org", ...menuSchema() },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
      ]),
    ],
  },
  {
    path: "/blog",
    title: "Blog – Indian Food & Tandoori Cooking Tips | Nana Sans Canggu",
    description:
      "Explore articles about tandoori cooking, vegetarian Indian cuisine, and food pairing tips from Nana Sans Tandoori Kitchen in Canggu, Bali.",
  },
  {
    path: "/faq",
    title: "FAQ – Nana Sans Tandoori Kitchen | Indian Restaurant Canggu",
    description:
      "Frequently asked questions about Nana Sans Tandoori Kitchen in Canggu. Opening hours, reservations, vegetarian options, spice levels, delivery, and more.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Nana Sans Tandoori Kitchen, Canggu",
    description:
      "How Nana Sans Tandoori Kitchen in Canggu, Bali collects, uses and protects your personal information when you visit our website or book a table.",
  },
];

const POST_PAGES: PageSeo[] = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} | Nana Sans Canggu`,
  description: post.metaDescription,
  ogType: "article",
  image: post.image,
  imageAlt: post.imageAlt,
  lastmod: post.date,
}));

export const NOT_FOUND_SEO: PageSeo = {
  path: "/404",
  title: "Page Not Found | Nana Sans Canggu",
  description: "Sorry, we couldn't find that page. Explore the Nana Sans menu, find us in Canggu or book a table.",
  noindex: true,
};

/** Every route that is prerendered to static HTML and listed in the sitemap. */
export const PAGES: PageSeo[] = [...STATIC_PAGES, ...POST_PAGES];

export function getSeo(pathname: string): PageSeo {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return PAGES.find((p) => p.path === path) ?? NOT_FOUND_SEO;
}

export const canonicalUrl = (seo: PageSeo) => (seo.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${seo.path}`);

const absolute = (url: string) => new URL(url, SITE_ORIGIN).href;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Meta tags as [attribute, key, content] triples, shared by the build and the browser. */
function metaTags(seo: PageSeo): [string, string, string][] {
  const image = absolute(seo.image ?? SITE.ogImage);
  const tags: [string, string, string][] = [
    ["name", "description", seo.description],
    ["name", "robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
    ["property", "og:title", seo.title],
    ["property", "og:description", seo.description],
    ["property", "og:url", canonicalUrl(seo)],
    ["property", "og:type", seo.ogType ?? "website"],
    ["property", "og:image", image],
    ["property", "og:image:alt", seo.imageAlt ?? "Tandoori platter at Nana Sans Indian restaurant in Canggu, Bali"],
    ["property", "og:site_name", SITE.name],
    ["property", "og:locale", "en_US"],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", seo.title],
    ["name", "twitter:description", seo.description],
    ["name", "twitter:image", image],
  ];
  return tags;
}

/** HTML for the <head> of a prerendered page. */
export function headHtml(seo: PageSeo): string {
  const lines = [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...(seo.noindex ? [] : [`<link rel="canonical" href="${canonicalUrl(seo)}"/>`]),
    ...metaTags(seo).map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escapeHtml(content)}"/>`),
    ...(seo.jsonLd ?? []).map(
      // Escape "<" so a value can never close the script tag early.
      (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`
    ),
  ];
  return lines.join("\n    ");
}

/** Brings the live document head in line with the current route (client-side navigation). */
export function applySeo(seo: PageSeo) {
  document.title = seo.title;
  for (const [attr, key, content] of metaTags(seo)) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.content = content;
  }
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (seo.noindex) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl(seo);
  }
}
