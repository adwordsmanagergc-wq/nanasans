import HeroSection from "@/react-app/components/HeroSection";
import FloatingWhatsApp from "@/react-app/components/FloatingWhatsApp";
import PhotoGallery from "@/react-app/components/PhotoGallery";
import AboutSection from "@/react-app/components/AboutSection";
import Footer from "@/react-app/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <PhotoGallery />

      <AboutSection />

      <Footer />

      <FloatingWhatsApp />
    </main>
  );
}
