import { useState } from "react";
import { Link } from "react-router";
import { BookOpen, CalendarCheck, MapPin, ShoppingBag } from "lucide-react";
import { MENU, MENU_TAX_NOTE } from "@/data/menu";
import { SITE } from "@/data/site";
import Footer from "@/react-app/components/Footer";
import MenuCoursePanel from "@/react-app/components/MenuCourse";
import { courseId } from "@/react-app/lib/menu";
import MenuViewer from "@/react-app/components/MenuViewer";
import PageHeader from "@/react-app/components/PageHeader";
import FloatingWhatsApp from "@/react-app/components/FloatingWhatsApp";

export default function MenuPage() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <PageHeader
        eyebrow="The Menu"
        title={
          <>
            Nana Sans Menu: Tandoori, Curries &amp; <em className="italic text-saffron-400">Naan</em> in Canggu
          </>
        }
        intro="Every dish we serve, with prices: from the clay-oven tandoor grill and rich meat curries to dedicated vegetarian and vegan curries, fresh naan, biryani, chai and desserts."
      />

      <main className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        {/* Jump links to each course */}
        <nav aria-label="Menu sections" className="border-y border-white/10 py-6">
          <ul className="flex flex-wrap gap-2">
            {MENU.map((course) => (
              <li key={course.name}>
                <a
                  href={`#${courseId(course)}`}
                  className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-paper/75 transition-colors hover:border-saffron-400 hover:text-saffron-300"
                >
                  {course.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <CalendarCheck className="h-4 w-4" />
            Book a Table
          </a>
          <a href={SITE.gojekUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <ShoppingBag className="h-4 w-4" />
            Order Takeaway on Gojek
          </a>
          <Link to="/#visit" className="btn-ghost">
            <MapPin className="h-4 w-4" />
            Find Us in Canggu
          </Link>
          <button type="button" onClick={() => setViewerIndex(0)} className="btn-ghost">
            <BookOpen className="h-4 w-4" />
            Printed Menu
          </button>
        </div>

        {MENU.map((course) => (
          <section key={course.name} id={courseId(course)} className="scroll-mt-24 pt-16">
            <MenuCoursePanel course={course} level={2} onPrintedPage={() => setViewerIndex(course.page)} />
          </section>
        ))}

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-paper/50">
          Prices in Indonesian rupiah (k = thousand). {MENU_TAX_NOTE} Spice levels can be adjusted on request; please
          tell us about any allergies when you order.
        </p>
        <p className="mt-6 text-paper/70">
          Ready to eat?{" "}
          <a
            href={SITE.bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron-300 underline decoration-saffron-400/40 underline-offset-4"
          >
            Book a table on WhatsApp
          </a>
          , order takeaway on{" "}
          <a
            href={SITE.gojekUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron-300 underline decoration-saffron-400/40 underline-offset-4"
          >
            Gojek
          </a>{" "}
          or{" "}
          <a
            href={SITE.grabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron-300 underline decoration-saffron-400/40 underline-offset-4"
          >
            Grab
          </a>
          , or{" "}
          <Link to="/#visit" className="text-saffron-300 underline decoration-saffron-400/40 underline-offset-4">
            find us next to Nico's Smokehouse in Canggu
          </Link>
          .
        </p>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <MenuViewer isOpen={viewerIndex !== null} startIndex={viewerIndex ?? 0} onClose={() => setViewerIndex(null)} />
    </div>
  );
}
