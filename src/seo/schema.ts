// schema.org structured data (JSON-LD), built from the site's real data.
// Only facts that exist in the codebase are used here; see README "SEO" for
// details the owner still needs to confirm.

import { SITE, SITE_ORIGIN } from "@/data/site";
import { MENU } from "@/data/menu";
import { HOME_FAQS } from "@/data/homeFaqs";
import { PHOTO_GEO, RESTAURANT_LOCATION } from "@/data/photoGeo";

type Json = Record<string, unknown>;

const abs = (path: string) => new URL(path, SITE_ORIGIN).href;

export const RESTAURANT_ID = `${SITE_ORIGIN}/#restaurant`;

const DIETS: Record<string, string> = {
  vegetarian: "https://schema.org/VegetarianDiet",
  vegan: "https://schema.org/VeganDiet",
};

export function menuSchema(): Json {
  return {
    "@type": "Menu",
    "@id": `${SITE_ORIGIN}/menu#menu`,
    name: "Nana Sans Menu",
    url: `${SITE_ORIGIN}/menu`,
    inLanguage: "en",
    hasMenuSection: MENU.map((course) => ({
      "@type": "MenuSection",
      name: course.name,
      ...(course.note ? { description: course.note } : {}),
      hasMenuItem: course.dishes.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        ...(dish.description ? { description: dish.description } : {}),
        ...(course.diet ? { suitableForDiet: DIETS[course.diet] } : {}),
        offers: {
          "@type": "Offer",
          price: String(dish.price ?? course.price),
          priceCurrency: "IDR",
        },
      })),
    })),
  };
}

export function restaurantSchema({ withMenu = false } = {}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: SITE.name,
    alternateName: ["Nana Sans", "Nana Sans Bali", "Nana Sans Canggu"],
    description:
      "Indian restaurant in Canggu, Bali serving slow-cooked tandoori dishes, rich creamy curries and British-Indian favourites, with an air-conditioned dining room and plenty of vegetarian and vegan options.",
    url: `${SITE_ORIGIN}/`,
    telephone: `+${SITE.phone}`,
    image: [
      SITE.ogImage,
      abs("/images/gallery-chicken-tikka-masala.webp"),
      abs("/images/gallery-tandoori-chicken.webp"),
      abs("/images/gallery-dining-room.webp"),
    ],
    logo: abs("/images/nana-sans-logo.png"),
    priceRange: "$$",
    servesCuisine: ["Indian", "British-Indian", "North Indian", "Tandoori"],
    menu: `${SITE_ORIGIN}/menu`,
    ...(withMenu ? { hasMenu: menuSchema() } : { hasMenu: `${SITE_ORIGIN}/menu` }),
    acceptsReservations: true,
    address: RESTAURANT_LOCATION.address,
    geo: { "@type": "GeoCoordinates", ...SITE.geo },
    hasMap: SITE.googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: SITE.opens,
        closes: SITE.closes,
      },
    ],
    areaServed: [
      { "@type": "City", name: "Canggu" },
      { "@type": "State", name: "Bali" },
    ],
    sameAs: [SITE.instagramUrl, SITE.googleMapsUrl],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Indoor Seating", value: true },
      { "@type": "LocationFeatureSpecification", name: "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: "Delivery", value: true },
    ],
    potentialAction: [
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: SITE.gojekUrl,
          actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
        },
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      },
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: SITE.bookUrl,
          actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
        },
      },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE.name,
    url: `${SITE_ORIGIN}/`,
    publisher: { "@id": RESTAURANT_ID },
  };
}

export function gallerySchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "A Taste of Nana Sans: Photos from Canggu, Bali",
    url: `${SITE_ORIGIN}/#gallery`,
    associatedMedia: Object.entries(PHOTO_GEO).map(([src, subject]) => ({
      "@type": "ImageObject",
      contentUrl: abs(src),
      name: `${subject} at Nana Sans, Canggu, Bali`,
      contentLocation: RESTAURANT_LOCATION,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[] = HOME_FAQS): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
