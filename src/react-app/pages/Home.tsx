import { useEffect } from "react";
import { useLocation } from "react-router";
import SiteNav from "@/react-app/components/SiteNav";
import HeroSection from "@/react-app/components/HeroSection";
import Marquee from "@/react-app/components/Marquee";
import MenuSection from "@/react-app/components/MenuSection";
import FloatingWhatsApp from "@/react-app/components/FloatingWhatsApp";
import PhotoGallery from "@/react-app/components/PhotoGallery";
import InstagramSection from "@/react-app/components/InstagramSection";
import AboutSection from "@/react-app/components/AboutSection";
import VisitSection from "@/react-app/components/VisitSection";
import BlogHighlights from "@/react-app/components/BlogHighlights";
import Footer from "@/react-app/components/Footer";
import WelcomeDoors from "@/react-app/components/WelcomeDoors";

export default function HomePage() {
  const { hash } = useLocation();

  // Scroll to the section named in the URL (e.g. /#menu from another page).
  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(id);
  }, [hash]);

  return (
    <main className="min-h-screen bg-paper">
      <WelcomeDoors />

      <SiteNav overlay />

      <HeroSection />

      <Marquee />

      <MenuSection />

      <AboutSection />

      <PhotoGallery />

      <InstagramSection />

      <VisitSection />

      <BlogHighlights />

      <Footer />

      <FloatingWhatsApp />
    </main>
  );
}
