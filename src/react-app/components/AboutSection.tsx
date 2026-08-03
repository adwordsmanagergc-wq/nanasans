import { useState, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";

export default function AboutSection() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = () => setFontLoaded(true);
  }, []);

  const faqs = [
    {
      question: "What makes Nana Sans the best Indian restaurant in Canggu?",
      answer: "Nana Sans combines traditional Indian recipes with British culinary influence, creating a unique dining experience you won't find elsewhere in Canggu. Our dishes are made fresh daily using quality spices, and our warm, family-style hospitality makes every guest feel at home."
    },
    {
      question: "Is Nana Sans air conditioned?",
      answer: "Yes! Nana Sans Tandoori Kitchen is fully air conditioned, providing a cool and comfortable dining experience away from the Bali heat. Enjoy your meal in our refreshing indoor space while savoring authentic Indian flavors."
    },
    {
      question: "Are there air conditioned restaurants in Canggu?",
      answer: "Absolutely! Nana Sans Tandoori Kitchen offers a fully air conditioned dining room in Canggu. It's the perfect escape from the tropical heat while enjoying delicious Indian cuisine with family and friends."
    },
    {
      question: "Where can I find an air conditioned Indian restaurant in Bali?",
      answer: "Nana Sans Tandoori Kitchen in Canggu features full air conditioning throughout the restaurant. Whether you're looking to cool down after a day at the beach or simply prefer indoor dining, we've got you covered with comfortable seating and authentic Indian dishes."
    },
    {
      question: "Where can I find great Indian food in Canggu, Bali?",
      answer: "Nana Sans Tandoori Kitchen is located on Jl. Raya Canggu, in the heart of Canggu. We're easily accessible and offer dine-in, takeaway, and delivery through Gojek. Our menu features everything from tandoori specialties to curries, biryanis, and homemade naans."
    },
    {
      question: "Is Nana Sans suitable for vegetarians and vegans?",
      answer: "Absolutely! We have extensive vegetarian and vegan menus featuring delicious curries, sides, and mains. Our chefs prepare each dish with care, ensuring plant-based diners enjoy the same rich, flavorful experience as everyone else."
    },
    {
      question: "What's the best Indian restaurant in Bali for families?",
      answer: "Nana Sans is perfect for families! Our restaurant was founded on the values of family, warmth, and togetherness. We offer a welcoming atmosphere, kid-friendly options, and generous portions meant to be shared around the table—just like at home."
    },
    {
      question: "Does Nana Sans offer delivery in Canggu?",
      answer: "Yes! You can order Nana Sans through Gojek (GoFood) for delivery anywhere in the Canggu area. Enjoy our delicious Indian cuisine from the comfort of your villa or hotel."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-stone-100 to-stone-200 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Our Story Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="w-full lg:w-2/5 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-600/20 rounded-2xl transform rotate-3" />
                <img
                  src="https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.23.22-pm.png"
                  alt="Sandra, the inspiration behind Nana Sans Tandoori Kitchen, sharing warmth and hospitality in Canggu Bali"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Story Text */}
            <div className="w-full lg:w-3/5">
              <h2 
                className="text-4xl md:text-5xl text-stone-800 mb-2 flex items-center gap-3"
                style={{ fontFamily: fontLoaded ? "'Playfair Display', serif" : "serif" }}
              >
                Our Story <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              </h2>
              <p 
                className="text-amber-700 font-medium tracking-wide mb-6 uppercase text-sm"
                style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
              >
                A Tribute to My Mother
              </p>
              
              <div 
                className="space-y-4 text-stone-700 leading-relaxed"
                style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
              >
                <p className="font-medium text-stone-800">
                  Ever wondered where the name Nana Sans comes from?
                </p>
                <p>
                  I was raised in a family where love, hard work, and community meant everything. But at the heart of it all is one person: my mother, Sandra.
                </p>
                <p>
                  She's more than just my mom—she's the glue that holds our big, beautiful family together. A woman of strength, warmth, and endless love, she's always made sure that no one ever feels alone, especially around the dinner table. Her home-cooked meals weren't just food; they were comfort, connection, and a reminder that no matter where life takes us, family is always at the core.
                </p>
                <p>
                  My nieces and nephews lovingly call her "Nanny," and it's from that love that Nana Sans was born. This restaurant is my way of honoring her; of sharing the warmth, hospitality, and home-cooked flavors that she's always given us.
                </p>
                <p>
                  At Nana Sans, we believe food brings people together. We are nothing without our community, and we'd love for you to be part of ours. So come on in, share a meal, share a story, and most of all—feel at home.
                </p>
                <p className="font-medium text-stone-800 flex items-center gap-2">
                  Welcome to the family. <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Dropdown */}
        <div className="mb-8">
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            className="w-full flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <span className="text-stone-800 font-medium">About Indian Cuisine in Canggu</span>
            <ChevronDown className={`w-5 h-5 text-stone-600 transition-transform duration-300 ${seoOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-500 ${seoOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div 
              className="bg-white/60 backdrop-blur-sm rounded-b-xl px-6 py-5 border border-t-0 border-stone-200 space-y-4 text-stone-700"
              style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
            >
              <p>
                <strong>Nana Sans Tandoori Kitchen</strong> is Canggu's premier destination for Indian cuisine with British influence. Located in the heart of Canggu, Bali, we serve a wide variety of dishes including tandoori specialties, rich curries, aromatic biryanis, fresh naans, and homemade chutneys.
              </p>
              <p>
                Whether you're searching for the <strong>best Indian restaurant in Canggu</strong>, looking for <strong>Indian food delivery in Bali</strong>, or want to enjoy a memorable dining experience with family and friends, Nana Sans offers something for everyone. Our menu caters to meat lovers, vegetarians, and vegans alike.
              </p>
              <p>
                We're proud to bring the flavors of India to Canggu with dishes crafted from family recipes passed down through generations. From our signature tandoori grill to our creamy butter chicken and fragrant vegetable curries, every dish is prepared with love and the finest ingredients.
              </p>
              <p>
                Visit us at <strong>Jl. Raya Canggu, Tibubeneng, Kuta Utara, Badung Regency, Bali</strong> or order online through Gojek for delivery straight to your door. Experience why locals and tourists alike consider Nana Sans the <strong>top Indian restaurant in Canggu, Bali</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 
            className="text-2xl md:text-3xl text-stone-800 mb-6 text-center"
            style={{ fontFamily: fontLoaded ? "'Playfair Display', serif" : "serif" }}
          >
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/90 transition-colors"
                  style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
                >
                  <span className="text-stone-800 font-medium pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-600 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <p 
                    className="px-6 pb-4 text-stone-600 leading-relaxed"
                    style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
