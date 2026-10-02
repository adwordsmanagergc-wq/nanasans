import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import "@/react-app/index.css";
import AppRoutes from "@/react-app/AppRoutes";

// If a photo is missing, hide it so the section's background shows through
// instead of the browser's broken-image icon and alt text.
document.addEventListener(
  "error",
  (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.target.style.visibility = "hidden";
      e.target.classList.add("img-missing");
    }
  },
  true
);

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <Analytics />
  </StrictMode>
);

const root = document.getElementById("root")!;
// Production pages are prerendered to static HTML: attach to it instead of re-rendering.
if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
