// Geotags for Nana Sans' own photos: what's in each shot and where it was taken.
// Emitted as schema.org ImageObject (contentLocation + GeoCoordinates) so search
// engines associate every photo with the restaurant in Canggu, Bali.
// Keep in sync with the ImageGallery JSON-LD in index.html.

import { CDN, SITE_ORIGIN } from "@/data/site";

export const RESTAURANT_LOCATION = {
  "@type": "Place",
  name: "Nana Sans Tandoori Kitchen, Canggu, Bali",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalan Raya Canggu No. 10C",
    addressLocality: "Canggu",
    addressRegion: "Bali",
    postalCode: "80351",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -8.6413098,
    longitude: 115.1545625,
  },
};

export const PHOTO_GEO: Record<string, string> = {
  [`${CDN}/gallery-tandoori-platter.webp`]: "Tandoori Platter",
  [`${CDN}/gallery-chicken-tikka-masala.webp`]: "Chicken Tikka Masala",
  [`${CDN}/gallery-tandoori-chicken.webp`]: "Tandoori Chicken",
  [`${CDN}/gallery-vegetarian-curry.webp`]: "Vegetarian Curry",
  [`${CDN}/gallery-heritage-dishes.webp`]: "Traditional Indian Heritage Dishes",
  [`${CDN}/gallery-dining-room.webp`]: "Air-Conditioned Dining Room",
};

export function geoImageObject(url: string, caption?: string) {
  const subject = PHOTO_GEO[url];
  const absolute = new URL(url, SITE_ORIGIN).href;
  if (!subject) return absolute;
  return {
    "@type": "ImageObject",
    contentUrl: absolute,
    url: absolute,
    name: `${subject} at Nana Sans, Canggu, Bali`,
    ...(caption ? { caption } : {}),
    contentLocation: RESTAURANT_LOCATION,
  };
}
