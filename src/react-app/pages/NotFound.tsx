import { Link } from "react-router";
import { CalendarCheck, MapPin, UtensilsCrossed } from "lucide-react";
import { SITE } from "@/data/site";
import Footer from "@/react-app/components/Footer";
import PageHeader from "@/react-app/components/PageHeader";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper">
      <PageHeader
        eyebrow="404"
        title="Sorry, we couldn't find that page"
        intro="The page may have moved. Here's where you can find our menu, directions and bookings."
      />
      <main className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-16 sm:flex-row sm:px-8">
        <Link to="/menu" className="btn-dark">
          <UtensilsCrossed className="h-4 w-4" />
          See the Menu
        </Link>
        <Link to="/#visit" className="btn-outline">
          <MapPin className="h-4 w-4" />
          Find Us in Canggu
        </Link>
        <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <CalendarCheck className="h-4 w-4" />
          Book a Table
        </a>
      </main>
      <Footer />
    </div>
  );
}
