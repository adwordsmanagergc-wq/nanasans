import { Link } from "react-router";
import { CalendarCheck, MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";

/** Closing call to action: book, order takeaway, or browse the menu. */
export default function BookSection() {
  return (
    <section id="book" className="bg-saffron-500 py-20 text-ink sm:py-24">
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-light leading-[1.05] sm:text-5xl">
            Book a Table or <em className="italic">Order Takeaway</em>
          </h2>
          <p className="mt-5 leading-relaxed text-ink/75">
            Message us on WhatsApp at{" "}
            <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>{" "}
            to reserve a table, or order takeaway and delivery across Canggu through Gojek and Grab. Not sure what to
            have? Browse the <Link to="/menu" className="font-semibold underline underline-offset-4">full menu</Link> or{" "}
            <Link to="/faq" className="font-semibold underline underline-offset-4">read our FAQ</Link>.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-[28rem]">
          <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-dark">
            <CalendarCheck className="h-4 w-4" />
            Book on WhatsApp
          </a>
          <Link to="/menu" className="btn btn-outline border-ink/30">
            <UtensilsCrossed className="h-4 w-4" />
            View the Menu
          </Link>
          <a href={SITE.gojekUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline border-ink/30">
            <ShoppingBag className="h-4 w-4" />
            Order on Gojek
          </a>
          <a href={SITE.grabUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline border-ink/30">
            <ShoppingBag className="h-4 w-4" />
            Order on Grab
          </a>
          <Link to="/#visit" className="btn btn-outline border-ink/30 sm:col-span-2">
            <MapPin className="h-4 w-4" />
            Find Us in Canggu
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
