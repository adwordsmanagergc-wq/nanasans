import { useEffect, useState } from "react";

const galleryImages = [
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.16.18-pm.png",
    alt: "Creamy chicken tikka masala curry served at Nana Sans Indian restaurant Canggu",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.23.22-pm.png",
    alt: "Air-conditioned indoor dining area at Nana Sans Tandoori Kitchen Bali",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.16.53-pm.png",
    alt: "Traditional Indian heritage dishes at Nana Sans Canggu",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.16.33-pm.png",
    alt: "Authentic dal makhani and vegetarian Indian curry at Nana Sans Bali",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.16.26-pm.png",
    alt: "Flame-grilled tandoori chicken platter fresh from the clay oven in Canggu",
  },
];

// Duplicate images for seamless infinite scroll
const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

export default function PhotoGallery() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = () => setFontLoaded(true);
  }, []);

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-amber-600/10 rounded-full border border-amber-600/20 mb-4">
            <span className="text-amber-700 text-sm tracking-widest uppercase font-light">
              Gallery
            </span>
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: fontLoaded ? "'Cormorant Garamond', serif" : "serif" }}
          >
            A Taste of Nana Sans
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore our dishes and warm atmosphere
          </p>
        </div>
      </div>

      {/* Rolling Carousel */}
      <div className="relative">
        {/* Gradient Fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <div className="flex animate-scroll hover:pause-animation">
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-2 group"
            >
              <div className="w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${galleryImages.length} * (16rem + 1rem)));
          }
        }
        
        @media (min-width: 640px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-${galleryImages.length} * (14rem + 1rem)));
            }
          }
        }
        
        @media (min-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-${galleryImages.length} * (16rem + 1rem)));
            }
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
