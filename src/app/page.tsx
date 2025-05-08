"use client";

import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [activeElement, setActiveElement] = useState<{
    source: "timeline" | "gallery";
    index: number;
  } | null>(null);

  return (
    <>
      {/* Kontener z główną zawartością wyświetlaną w orientacji poziomej */}
      <div className="landscape-content">
        <motion.main
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-cover bg-center overflow-hidden"
          style={{
            height: "100dvh",
            backgroundImage: "url('/images/background-image.jpg')",
          }}
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
