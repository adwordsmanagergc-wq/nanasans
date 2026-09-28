import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import Footer from "@/react-app/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your opening hours?",
    answer: "We're open every day from 12:00 PM (midday) to 2:00 AM, except Fridays when we open at 5:00 PM and stay open until 2:00 AM. We recommend booking a table during peak dinner hours (6-8 PM) to avoid waiting, especially on weekends."
  },
  {
    question: "Are you open late at night?",
    answer: "Yes! We're open until 2:00 AM every night, making us one of the few places in Canggu serving proper hot food after midnight. Tandoori, curries, biryani and fresh naan are all available late, for dine-in or takeaway."
  },
  {
    question: "Do you have vegetarian and vegan options?",
    answer: "Yes! We have extensive vegetarian and vegan menus. Our vegetarian options include paneer dishes, dal makhani, and vegetable curries. Vegan guests can enjoy chana masala, aloo gobi, vegetable biryani, and many more dishes prepared without dairy. Just ask our staff for recommendations."
  },
  {
    question: "How spicy is the food? Can I adjust spice levels?",
    answer: "Our dishes range from mild to hot. We're happy to adjust spice levels to your preference—just let us know when ordering. If you're unsure, start with 'medium' and we can always add more heat. Our butter chicken and korma dishes are naturally milder, while vindaloo and some biryanis are on the spicier side."
  },
  {
    question: "Do you have air conditioning?",
    answer: "Yes, our indoor dining area is fully air-conditioned for your comfort. It's a welcome escape from Bali's tropical heat while you enjoy your meal."
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes! We deliver through GoFood (Gojek). You can order directly through the GoFood app or website. We also offer takeaway if you'd like to pick up your order in person."
  },
  {
    question: "Can I make a reservation?",
    answer: "Absolutely. The easiest way to book a table is via WhatsApp. Just message us at +62 812 3456 4499 with your preferred date, time, and number of guests. We'll confirm your reservation promptly."
  },
  {
    question: "Where exactly are you located?",
    answer: "We're located on Jalan Raya Canggu No. 10C, in the heart of Canggu, Bali. We're easy to find—look for our signage on the main road. Free street parking is available nearby."
  },
  {
    question: "What makes your food British-Indian?",
    answer: "Our cuisine blends authentic North Indian tandoori traditions with British-Indian influences that developed during the colonial era. This means you'll find classic dishes like chicken tikka masala alongside traditional Punjabi favourites. It's the best of both culinary worlds."
  },
  {
    question: "Do you cater for private events?",
    answer: "Yes, we can accommodate private parties and events. Contact us via WhatsApp to discuss your requirements, guest numbers, and menu preferences. We can create custom set menus for groups."
  },
  {
    question: "Are your dishes gluten-free?",
    answer: "Many of our curries are naturally gluten-free, though cross-contamination is possible in our kitchen. Our naan and roti contain gluten. Please inform our staff about any allergies or dietary requirements when ordering, and we'll guide you to safe options."
  }
];

function FAQAccordion({ faq, isOpen, onClick }: { faq: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors px-4 -mx-4"
      >
        <span className="font-medium text-stone-900 pr-4">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5 text-stone-600 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    // Set canonical URL
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://nanasans.com/faq";

    // Update title
    document.title = "FAQ – Nana Sans Tandoori Kitchen | Indian Restaurant Canggu";

    // Update meta description
    let meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (meta) {
      meta.content = "Frequently asked questions about Nana Sans Tandoori Kitchen in Canggu. Opening hours, reservations, vegetarian options, spice levels, delivery, and more.";
    }
  }, []);

  // Generate FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-stone-100">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            Frequently Asked Questions
          </h1>
          <p className="text-stone-400 mt-2">
            Everything you need to know about dining at Nana Sans
          </p>
        </div>
      </header>

      {/* FAQ Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-amber-50 rounded-lg border border-amber-200 p-6 text-center">
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-stone-600 mb-4">
            We're happy to help. Reach out to us on WhatsApp.
          </p>
          <a
            href="https://wa.me/6281234564499?text=hey%20Nana%20Sans,%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Chat with Us
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
