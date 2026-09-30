import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "@/react-app/index.css";
import App from "@/react-app/App.tsx";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
