import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, Leaf } from "lucide-react";
import Footer from "@/react-app/components/Footer";
import { menuImages } from "@/react-app/components/MenuViewer";
import { menuSections, formatPrice } from "@/data/menu";

const DIET_SCHEMA = {
  Vegetarian: "https://schema.org/VegetarianDiet",
  Vegan: "https://schema.org/VeganDiet",
};

export default function Menu() {
  useEffect(() => {
    // Set canonical URL
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://nanasans.com/menu";

    // Update title
    document.title = "Menu & Prices – Nana Sans Indian Restaurant Canggu";

    // Update meta description
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (meta) {
      meta.content = "Full menu and prices at Nana Sans, the Indian restaurant in Canggu, Bali. Tandoori chicken, butter chicken, biryani, butter naan from Rp 25k, plus vegetarian and vegan dishes.";
    }
  }, []);

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Nana Sans Tandoori Kitchen Menu",
    url: "https://nanasans.com/menu",
    inLanguage: "en",
    hasMenuSection: menuSections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      description: section.description,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        ...(item.diet ? { suitableForDiet: DIET_SCHEMA[item.diet] } : {}),
        offers: { "@type": "Offer", priceCurrency: "IDR", price: String(item.price) }
      }))
    }))
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Menu Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />

      {/* Header */}
      <header className="bg-stone-900 text-white py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Our Menu: Indian Food in Canggu
          </h1>
          <p className="text-stone-400 mt-2">
            Tandoori, curries, biryani and fresh naan at Nana Sans, Jalan Raya Canggu No. 10C
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-stone-700 leading-relaxed mb-8">
          Nana Sans Tandoori Kitchen is an air-conditioned Indian restaurant in Canggu, Bali,
          serving North Indian food with a British-Indian twist. Everything from our tandoor is
          cooked to order, and our naan is baked fresh all day. Below are our most popular dishes
          and prices, followed by the full menu including starters, wraps, box specials, drinks
          and desserts. Open daily from 11:00 AM to 10:00 PM for dine-in, takeaway and delivery.
        </p>

        {menuSections.map((section) => (
          <section key={section.name} className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
            <h2 className="text-2xl font-bold text-stone-900">{section.name}</h2>
            <p className="text-stone-500 mb-4">{section.description}</p>
            <ul className="divide-y divide-stone-100">
              {section.items.map((item) => (
                <li key={item.name} className="py-3 flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-stone-900 flex items-center gap-2">
                      {item.name}
                      {item.diet && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                          <Leaf className="w-3 h-3" />
                          {item.diet}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-stone-600">{item.description}</p>
                  </div>
                  <span className="font-semibold text-amber-700 whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">Full Menu</h2>
        <div className="space-y-6">
          {menuImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={`${image.alt} menu at Nana Sans Indian restaurant in Canggu, Bali`}
              loading="lazy"
              className="w-full rounded-xl shadow-md"
            />
          ))}
        </div>

        {/* Order CTA */}
        <div className="mt-8 bg-amber-50 rounded-lg border border-amber-200 p-6 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            Hungry?
          </h2>
          <p className="text-stone-600 mb-4">
            Book a table on WhatsApp, or order delivery anywhere in Canggu on GoFood or Grab.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/6281234564499?text=hey%20Nana%20Sans,%20I'd%20like%20to%20book%20a%20table"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Book on WhatsApp
            </a>
            <a
              href="https://gofood.co.id/bali/restaurant/nana-sans-tandoori-kitchen-indian-restaurant-jalan-raya-canggu-no-10c-f682a778-bdca-4b87-bf0c-ffdaa384737a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#00AA13] text-white rounded-lg hover:bg-[#008F10] transition-colors font-medium"
            >
              Order on GoFood
            </a>
            <a
              href="https://food.grab.com/id/id/restaurant/nanasans-tandoori-kitchen-tibubeneng-delivery/6-C3DJGCL1BBUCUA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 bg-[#00B14F] text-white rounded-lg hover:bg-[#009644] transition-colors font-medium"
            >
              Order on Grab
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
