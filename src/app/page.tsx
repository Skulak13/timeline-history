"use client";

import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [activeElement, setActiveElement] = useState<{
    source: "timeline" | "gallery";
    index: number;
  } | null>(null);

  const syncScrollWithOrientation = () => {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    document.documentElement.style.overflowY = isLandscape ? "auto" : "hidden";
    document.body.style.overflowY = isLandscape ? "auto" : "hidden";
  };

  useEffect(() => {
    // Na starcie zawsze blokujemy
    document.documentElement.style.overflowY = "hidden";
    document.body.style.overflowY = "hidden";

    // Kiedy użytkownik zmieni orientację w trakcie korzystania
    window.addEventListener("orientationchange", syncScrollWithOrientation);
    return () => {
      window.removeEventListener(
        "orientationchange",
        syncScrollWithOrientation
      );
    };
  }, []);

  return (
    <>
      {/* Kontener z główną zawartością wyświetlaną w orientacji poziomej */}
      <div className="landscape-content">
        <motion.main
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Kiedy animacja się skończy, zsynchronizuj scroll (włączy go, jeśli wciąż jest landscape)
          onAnimationComplete={syncScrollWithOrientation}
          className="bg-cover bg-center min-h-screen overflow-hidden min-h-[100dvh]"
          style={{ backgroundImage: "url('/images/background-image.jpg')" }}
        >
          <Header
            imageUrl="/images/skulfancy.jpg"
            title="The way to code!"
            subtitle="Tomek Skulski"
          />
          <Timeline
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
          <Gallery
            galleryImageUrl="/images/gallery-button.svg"
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        </motion.main>
      </div>

      {/* 
        Kontener wyświetlany wyłącznie w orientacji pionowej (zgodnie z media queries w globals.css)
        Poniższy overlay informuje użytkownika, aby obrócił ekran dla lepszych wrażeń.
      */}
      <div className="portrait-warning">
        <Image
          src="/images/rotate-screen.png"
          className="mb-4"
          alt="Obróć ekran"
          width={120}
          height={120}
        />
        <p className="text-base font-bold">
          Obróć ekran, aby uzyskać lepsze wrażenia!
        </p>
      </div>
    </>
  );
}
