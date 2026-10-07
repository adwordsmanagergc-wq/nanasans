import fs from "fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { imageSize } from "image-size";

/**
 * Exposes the pixel size of every file in public/images as
 * `virtual:image-sizes`, so <img> tags can carry width/height attributes
 * (prevents layout shift) without hand-maintained numbers.
 */
function imageSizes(): Plugin {
  const id = "virtual:image-sizes";
  const resolved = "\0" + id;
  const dir = path.resolve(__dirname, "public/images");
  return {
    name: "nana-sans-image-sizes",
    resolveId: (source) => (source === id ? resolved : undefined),
    load(loadId) {
      if (loadId !== resolved) return;
      const sizes: Record<string, [number, number]> = {};
      for (const file of fs.readdirSync(dir)) {
        if (!/\.(webp|jpe?g|png|gif|avif)$/i.test(file)) continue;
        try {
          const { width, height } = imageSize(fs.readFileSync(path.join(dir, file)));
          if (width && height) sizes[`/images/${file}`] = [width, height];
        } catch {
          // Unreadable image: it simply renders without width/height.
        }
      }
      return `export default ${JSON.stringify(sizes)};`;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imageSizes()],
  build: {
    // Vite minifies production builds by default; set explicitly so it stays that way.
    minify: "esbuild",
    cssMinify: true,
    chunkSizeWarningLimit: 5000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
