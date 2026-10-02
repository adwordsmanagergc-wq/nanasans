/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Behold.so JSON feed URL for the Instagram section (optional). */
  readonly VITE_INSTAGRAM_FEED_URL?: string;
}

declare module "virtual:image-sizes" {
  const sizes: Record<string, [number, number]>;
  export default sizes;
}
