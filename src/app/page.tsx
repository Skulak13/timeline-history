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

  // Ustawienie overflow i przewinięcie 1px na mobilkach (Chrome fix)
  useEffect(() => {
    const isMobileLandscape =
      window.innerWidth <= 940 && window.innerHeight <= 520;

    if (isMobileLandscape) {
      document.body.style.overflowY = "auto";

      // Wymuszenie schowania paska adresu w Chrome mobilnym
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 100);
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, []);

  return (
    <>
      {/* Kontener z główną zawartością wyświetlaną w orientacji poziomej */}
      <div className="landscape-content">
        <motion.main
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-cover bg-center min-h-screen overflow-hidden"
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
