// Contact details and outbound links shared across the site.

// Photos and menu pages are served from public/images (self-hosted, so they
// don't depend on the old Mocha CDN).
export const CDN = "/images";
export const SITE_ORIGIN = "https://nanasans.com";

export const LOGO = `${CDN}/nana-sans-logo.png`;

export const SITE = {
  name: "Nana Sans Tandoori Kitchen",
  phoneDisplay: "+62 812 3456 4499",
  phone: "6281234564499",
  hours: "Open daily · 11:00 – 22:00",
  addressLine1: "Jalan Raya Canggu No. 10C",
  addressLine2: "Tibubeneng, Canggu, Bali 80351",
  bookUrl: `https://wa.me/6281234564499?text=${encodeURIComponent("Hi Nana Sans, I'd like to book a table")}`,
  directionsUrl:
    "https://www.google.com/maps/dir//Nana+Sans+Tandoori+Indian+Restaurant+Canggu,+Jl.+Raya+Canggu,+Tibubeneng,+Kuta+Utara,+Badung+Regency,+Bali+80361/@-8.7185538,115.2481957,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd23990a4833983:0xb1371ea48cd70454!2m2!1d115.1545625!2d-8.6413098?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D",
  mapEmbedUrl: "https://www.google.com/maps?q=-8.6413098,115.1545625&z=16&output=embed",
  gojekUrl:
    "https://gofood.co.id/bali/restaurant/nana-sans-tandoori-kitchen-indian-restaurant-jalan-raya-canggu-no-10c-f682a778-bdca-4b87-bf0c-ffdaa384737a",
  grabUrl:
    "https://food.grab.com/id/id/restaurant/nanasans-tandoori-kitchen-tibubeneng-delivery/6-C3DJGCL1BBUCUA",
  instagramUrl: "https://www.instagram.com/nanasans_bali/",
  instagramHandle: "@nanasans_bali",
};
