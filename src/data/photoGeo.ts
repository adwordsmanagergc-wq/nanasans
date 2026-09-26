// Geotags for Nana Sans' own photos: what's in each shot and where it was taken.
// Emitted as schema.org ImageObject (contentLocation + GeoCoordinates) so search
// engines associate every photo with the restaurant in Canggu, Bali.
// Keep in sync with the ImageGallery JSON-LD in index.html.

const CDN = "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com";

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
  [`${CDN}/Screenshot-2026-03-28-at-3.23.52-pm.png`]: "Tandoori Platter",
  [`${CDN}/Screenshot-2026-03-28-at-3.16.18-pm.png`]: "Chicken Tikka Masala",
  [`${CDN}/Screenshot-2026-03-28-at-3.16.26-pm.png`]: "Tandoori Chicken",
  [`${CDN}/Screenshot-2026-03-28-at-3.16.33-pm.png`]: "Dal Makhani",
  [`${CDN}/Screenshot-2026-03-28-at-3.16.53-pm.png`]: "Traditional Indian Heritage Dishes",
  [`${CDN}/Screenshot-2026-03-28-at-3.23.22-pm.png`]: "Air-Conditioned Dining Room",
};

export function geoImageObject(url: string, caption?: string) {
  const subject = PHOTO_GEO[url];
  if (!subject) return url;
  return {
    "@type": "ImageObject",
    contentUrl: url,
    url,
    name: `${subject} at Nana Sans, Canggu, Bali`,
    ...(caption ? { caption } : {}),
    contentLocation: RESTAURANT_LOCATION,
  };
}
