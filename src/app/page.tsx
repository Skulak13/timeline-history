"use client";

import Header from "@/components/Header";
import Timeline from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/images/background-image.jpg')" }}
    >
      <Header
        imageUrl="/images/skulfancy.jpg"
        title="The way to code!"
        subtitle="Tomek Skulski"
      />
      <Timeline />

      <Gallery
        galleryImageUrl="/images/gallery-button.svg"
        caption="Moje zainteresowania"
      />
    </motion.main>
  );
}
