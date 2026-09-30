import { useState } from "react";
import { Bike, Flame, Heart, Leaf, Plus, Snowflake } from "lucide-react";
import { CDN } from "@/data/site";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: Flame,
    title: "A real clay tandoor",
    body: "Meats, paneer and naans are fired at blistering heat for that smoky, charred edge you can't fake.",
  },
  {
    icon: Snowflake,
    title: "Cool, calm dining",
    body: "Step out of the Bali heat into our fully air-conditioned dining room. Stay as long as you like.",
  },
  {
    icon: Leaf,
    title: "Veg & vegan, properly",
    body: "Dedicated vegetarian and vegan menus, not an afterthought. Everyone eats well at Nanny's table.",
  },
  {
    icon: Bike,
    title: "Delivered across Canggu",
    body: "Craving a curry at the villa? Order through GoFood or GrabFood and we'll bring it to your door.",
  },
];

const faqs = [
  {
    question: "What makes Nana Sans the best Indian restaurant in Canggu?",
    answer:
      "Nana Sans combines traditional Indian recipes with British culinary influence, creating a unique dining experience you won't find elsewhere in Canggu. Our dishes are made fresh daily using quality spices, and our warm, family-style hospitality makes every guest feel at home.",
  },
  {
    question: "Is Nana Sans air conditioned?",
    answer:
      "Yes! Nana Sans Tandoori Kitchen is fully air conditioned, providing a cool and comfortable dining experience away from the Bali heat. Enjoy your meal in our refreshing indoor space while savoring authentic Indian flavors.",
  },
  {
    question: "Are there air conditioned restaurants in Canggu?",
    answer:
      "Absolutely! Nana Sans Tandoori Kitchen offers a fully air conditioned dining room in Canggu. It's the perfect escape from the tropical heat while enjoying delicious Indian cuisine with family and friends.",
  },
  {
    question: "Where can I find an air conditioned Indian restaurant in Bali?",
    answer:
      "Nana Sans Tandoori Kitchen in Canggu features full air conditioning throughout the restaurant. Whether you're looking to cool down after a day at the beach or simply prefer indoor dining, we've got you covered with comfortable seating and authentic Indian dishes.",
  },
  {
    question: "Where can I find great Indian food in Canggu, Bali?",
    answer:
      "Nana Sans Tandoori Kitchen is located on Jl. Raya Canggu, in the heart of Canggu. We're easily accessible and offer dine-in, takeaway, and delivery through Gojek. Our menu features everything from tandoori specialties to curries, biryanis, and homemade naans.",
  },
  {
    question: "Is Nana Sans suitable for vegetarians and vegans?",
    answer:
      "Absolutely! We have extensive vegetarian and vegan menus featuring delicious curries, sides, and mains. Our chefs prepare each dish with care, ensuring plant-based diners enjoy the same rich, flavorful experience as everyone else.",
  },
  {
    question: "What's the best Indian restaurant in Bali for families?",
    answer:
      "Nana Sans is perfect for families! Our restaurant was founded on the values of family, warmth, and togetherness. We offer a welcoming atmosphere, kid-friendly options, and generous portions meant to be shared around the table—just like at home.",
  },
  {
    question: "Does Nana Sans offer delivery in Canggu?",
    answer:
      "Yes! You can order Nana Sans through Gojek (GoFood) for delivery anywhere in the Canggu area. Enjoy our delicious Indian cuisine from the comfort of your villa or hotel.",
  },
];

/** Accordion row that animates its height with a CSS grid trick. */
function Disclosure({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg leading-snug text-ink transition-colors group-hover:text-chili sm:text-xl">
          {title}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open ? "rotate-45 border-ink bg-ink text-paper" : "border-ink/20 text-ink"
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pr-12 leading-relaxed text-cocoa-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [seoOpen, setSeoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Our Story */}
      <section id="story" className="grain overflow-hidden bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* The family photo, framed like a keepsake print */}
            <figure className="relative -rotate-2 transition-transform duration-700 hover:rotate-0">
              <div className="overflow-hidden rounded-md bg-paper-300 shadow-[0_40px_80px_-30px_rgba(27,19,14,0.75)]">
                <img
                  src={`${CDN}/nanny-sandra.jpg`}
                  alt="Old family photograph of Sandra, the 'Nanny' behind Nana Sans, smiling as she holds a baby"
                  className="aspect-square w-full object-cover"
                  width={1100}
                  height={1076}
                  loading="lazy"
                />
              </div>
            </figure>
            <div className="absolute -bottom-2 -right-2 rounded-2xl bg-ink px-6 py-5 text-paper shadow-2xl sm:-right-8">
              <p className="font-display text-4xl italic text-saffron-400">Nanny</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-paper/60">The heart of our kitchen</p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <span className="eyebrow">Our Story · A Tribute to My Mother</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
              Ever wondered where the name <em className="italic text-chili">Nana Sans</em> comes from?
            </h2>

            <div className="mt-8 space-y-5 leading-relaxed text-cocoa-500 sm:text-lg">
              <p>
                I was raised in a family where love, hard work, and community meant everything. But at the heart of it
                all is one person: my mother, Sandra.
              </p>
              <p>
                She's more than just my mom, she's the glue that holds our big, beautiful family together. A woman of
                strength, warmth, and endless love, she's always made sure that no one ever feels alone, especially
                around the dinner table.
              </p>
              <blockquote className="border-l-2 border-saffron-500 pl-6 font-display text-2xl font-light italic leading-snug text-ink sm:text-[1.7rem]">
                “Her home-cooked meals weren't just food; they were comfort, connection, and a reminder that no matter
                where life takes us, family is always at the core.”
              </blockquote>
              <p>
                My nieces and nephews lovingly call her "Nanny," and it's from that love that Nana Sans was born. This
                restaurant is my way of honoring her; of sharing the warmth, hospitality, and home-cooked flavors that
                she's always given us.
              </p>
              <p>
                Being far from home made me realize just how powerful food is. It has the ability to bring people
                together, to create a sense of belonging. That's exactly what Nana Sans is all about: a place where
                anyone, whether traveling or living far from home, can walk in and feel like family.
              </p>
              <p>
                At Nana Sans, we believe food brings people together. We are nothing without our community, and we'd
                love for you to be part of ours. So come on in, share a meal, share a story, and most of all, feel at
                home.
              </p>
            </div>
            <p className="mt-8 flex items-center gap-3 font-display text-2xl italic text-ink">
              Welcome to the family.
              <Heart className="h-5 w-5 fill-chili text-chili" />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper-200 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100} className="bg-paper-100 p-8 transition-colors duration-500 hover:bg-paper-50">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-saffron-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa-500">{body}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* FAQ + About */}
      <section id="faq" className="bg-paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Good to know</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
              Frequently asked <em className="italic text-chili">questions</em>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-cocoa-500">
              Planning a visit, ordering in, or bringing the whole family? Here's what guests usually ask us.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-t border-ink/10">
              {faqs.map((faq, index) => (
                <Disclosure
                  key={faq.question}
                  title={faq.question}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {faq.answer}
                </Disclosure>
              ))}
              <Disclosure title="About Indian cuisine in Canggu" open={seoOpen} onToggle={() => setSeoOpen(!seoOpen)}>
                <div className="space-y-4">
                  <p>
                    <strong className="text-ink">Nana Sans Tandoori Kitchen</strong> is Canggu's premier destination
                    for Indian cuisine with British influence. Located in the heart of Canggu, Bali, we serve a wide
                    variety of dishes including tandoori specialties, rich curries, aromatic biryanis, fresh naans, and
                    homemade chutneys.
                  </p>
                  <p>
                    Whether you're searching for the <strong className="text-ink">best Indian restaurant in Canggu</strong>
                    , looking for <strong className="text-ink">Indian food delivery in Bali</strong>, or want to enjoy
                    a memorable dining experience with family and friends, Nana Sans offers something for everyone. Our
                    menu caters to meat lovers, vegetarians, and vegans alike.
                  </p>
                  <p>
                    We're proud to bring the flavors of India to Canggu with dishes crafted from family recipes passed
                    down through generations. From our signature tandoori grill to our creamy butter chicken and
                    fragrant vegetable curries, every dish is prepared with love and the finest ingredients.
                  </p>
                  <p>
                    Visit us at{" "}
                    <strong className="text-ink">Jl. Raya Canggu, Tibubeneng, Kuta Utara, Badung Regency, Bali</strong>{" "}
                    or order online through Gojek for delivery straight to your door. Experience why locals and tourists
                    alike consider Nana Sans the <strong className="text-ink">top Indian restaurant in Canggu, Bali</strong>.
                  </p>
                </div>
              </Disclosure>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
