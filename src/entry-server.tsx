/* eslint-disable react-refresh/only-export-components -- build-time entry, not a hot-reloaded module */
// Build-time renderer: turns each route into static HTML (see scripts/prerender.mjs).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppRoutes from "@/react-app/AppRoutes";
import { PAGES, NOT_FOUND_SEO, getSeo, headHtml } from "@/seo/pages";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );
}

export { PAGES, NOT_FOUND_SEO, getSeo, headHtml };
