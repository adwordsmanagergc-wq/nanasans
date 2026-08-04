import HeroSection from "@/react-app/components/HeroSection";
import FloatingWhatsApp from "@/react-app/components/FloatingWhatsApp";
import PhotoGallery from "@/react-app/components/PhotoGallery";
import AboutSection from "@/react-app/components/AboutSection";
import Footer from "@/react-app/components/Footer";
import WelcomeDoors from "@/react-app/components/WelcomeDoors";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <WelcomeDoors />

      <HeroSection />

      <PhotoGallery />

      <AboutSection />

      <Footer />

      <FloatingWhatsApp />
    </main>
  );
}
