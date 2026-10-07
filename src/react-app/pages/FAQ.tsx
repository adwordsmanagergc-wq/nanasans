import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import Footer from "@/react-app/components/Footer";
import PageHeader from "@/react-app/components/PageHeader";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your opening hours?",
    answer: "We're open from midday to 2:00 AM every day except Friday, when we open at 5:00 PM and close at 2:00 AM. We recommend booking a table during peak dinner hours (6-8 PM) to avoid waiting, especially on weekends."
  },
  {
    question: "Do you have vegetarian and vegan options?",
    answer: "Yes! We have extensive vegetarian and vegan menus. Our vegetarian curries include Paneer Tikka Masala, Paneer Makhni, Palak Paneer and Mutter Paneer. Vegan guests can enjoy Chole Masala, Aloo Gobi, Rajma Masala, Dal Tadka and more, all prepared without dairy. Just ask our staff for recommendations."
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
    <div className="border-b border-ink/10">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-chili sm:text-xl">
          {faq.question}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isOpen ? "rotate-45 border-ink bg-ink text-paper" : "border-ink/20 text-ink"
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-12 leading-relaxed text-cocoa-500">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);


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
    <div className="min-h-screen bg-paper">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        eyebrow="Good to know"
        title={
          <>
            Nana Sans FAQ: Visiting Our <em className="italic text-saffron-400">Indian Restaurant</em> in Canggu
          </>
        }
        intro="Everything you need to know about dining at Nana Sans."
      />

      <main className="grain mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="border-t border-ink/10">
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
        <div className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper sm:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(217,154,61,0.6), transparent 65%)" }}
          />
          <h2 className="relative font-display text-3xl font-light sm:text-4xl">
            Still have <em className="italic text-saffron-400">questions?</em>
          </h2>
          <p className="relative mt-3 text-paper/65">We're happy to help. Reach out to us on WhatsApp.</p>
          <a
            href="https://wa.me/6281234564499?text=hey%20Nana%20Sans,%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary relative mt-8"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Us
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
