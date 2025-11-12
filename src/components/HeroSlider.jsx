// src/components/HeroSlider.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Lightweight HeroSlider — no Swiper dependency.
 * - Simple autoplay
 * - Pagination dots
 * - CSS-driven background images
 */

const slides = [
  {
    title: "Cozy Winter Coats",
    subtitle: "Keep your pet warm and stylish",
    image:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=80",
  },
  {
    title: "Grooming for Cold Weather",
    subtitle: "Protective trims and skin care tips",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",
  },
  {
    title: "Health Tips for Pets",
    subtitle: "Seasonal advice from experts",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=80",
  },
];

export default function HeroSlider({ interval = 4500 }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interval]);

  const goTo = (i) => {
    setIndex(i % slides.length);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(
        () => setIndex((s) => (s + 1) % slides.length),
        interval
      );
    }
  };

  return (
    <div className="w-full relative">
      <div className="h-64 md:h-96 rounded-lg overflow-hidden relative">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden={i === index ? "false" : "true"}
          >
            <div className="bg-black/40 w-full h-full flex items-center">
              <div className="container mx-auto px-4 md:px-6 text-white">
                <h2 className="text-2xl md:text-4xl font-bold">{s.title}</h2>
                <p className="mt-2 text-sm md:text-lg">{s.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
