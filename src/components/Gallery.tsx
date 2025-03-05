"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  galleryImageUrl: string;
  caption: string;
}

interface ImageGalleryItem {
  type: "image";
  src: string;
  description: string;
}

interface TextGalleryItem {
  type: "text";
  content: string;
}

type GalleryItem = ImageGalleryItem | TextGalleryItem;

const Gallery: React.FC<GalleryProps> = ({ galleryImageUrl, caption }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      type: "image",
      src: "/images/gallery/image1.jpg",
      description:
        "Bardzo prawdopodobne, że byłem na koncercie Twojego ulubionego zespołu. Uwielbiam muzykę na żywo, a słucham bardzo różnej muzyki. Od metalu, po elektro, po muzykę symfoniczną.",
    },
    {
      type: "image",
      src: "/images/gallery/image2.jpg",
      description:
        "Nigdy więcej! Mówię za każdym razem, gdy wrócę z rejsu. Nie cierpię morza, ale przygoda powstaje najczęściej, gdy odważymy się przełamać jakieś nasze słabości...",
    },
    {
      type: "image",
      src: "/images/gallery/image3.jpg",
      description:
        "Kiedyś mówiło się 'wiadomości międzynarodowe', dzisiaj nazywa się to geopolityką. Niech będzie. Lubię wiedzieć, co się dzieje poza moim podwórkiem...",
    },
    {
      type: "image",
      src: "/images/gallery/image4.jpg",
      description:
        "Na rowerze można zobaczyć więcej niż z samochodu. I to dosłownie. Lubię długie wycieczki, zwłaszcza te poza miasto. Wtedy można poczuć prawdziwą wolność.",
    },
    {
      type: "image",
      src: "/images/gallery/image5.jpg",
      description:
        "Lubię słuchać o nauce. Zwłaszcza o odkryciach w świecie fizyki i astronomii. Z każdym nowym odkryciem świat wydaje się tylko dziwniejszy...",
    },
    {
      type: "image",
      src: "/images/gallery/image6.jpg",
      description:
        "Jeden z dziwaków, którzy zarywają noc, żeby obejrzeć nudną galę rozdania Oscarów. Wiem, co jest grane i na co iść do kina.",
    },
    {
      type: "text",
      content:
        "Lubię być w ruchu i być aktywnym, szukam przygód, lubię wiedzieć i lubię tworzyć a skoro czas pędzi staram się wykorzystać każdą chwilę jak najlepiej...",
    },
  ];

  const handleToggleGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (custom: { index: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: custom.index * 0.1,
      },
    }),
    exit: (custom: { index: number }) => ({
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.5,
        delay: (galleryItems.length - custom.index - 1) * 0.1,
      },
    }),
  };

  const hoverVariants = {
    rest: {
      width: "9rem",
      height: "9rem",
      marginTop: "0",
    },
    hover: {
      width: "18rem",
      height: "18rem",
      marginTop: "-9rem",
      transition: { duration: 0.3 },
    },
  };

  const hoverTextVariants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.3 },
    },
  };

  return (
    <div className="fixed bottom-0 left-0 mb-10 ml-24" style={{ zIndex: 10 }}>
      <div className="flex items-end">
        <button
          onClick={handleToggleGallery}
          className="flex flex-col items-center group cursor-pointer bg-transparent border-none"
        >
          <Image
            src={galleryImageUrl}
            alt="Opis obrazu"
            width={170}
            height={170}
            className="object-cover group-hover:opacity-80"
          />
          <span className="text-gray-300 text-xl mt-2 group-hover:underline">
            {caption}
          </span>
        </button>

        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              exit={{ width: 0 }}
              transition={{
                duration: galleryItems.length * 0.1 + 0.5,
              }}
              className="flex overflow-visible ml-2"
              layout
            >
              {galleryItems.map((item, index) => {
                const customProps = { index };

                if (item.type === "image") {
                  return (
                    <motion.div
                      key={index}
                      className="flex-shrink-0 mr-2"
                      custom={customProps}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <motion.div
                        className="group relative"
                        style={{ transformOrigin: "left bottom" }}
                        variants={hoverVariants}
                        initial="rest"
                        whileHover="hover"
                        layout
                      >
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ filter: "brightness(0.7)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={item.src}
                            alt={`Galeria obraz ${index + 1}`}
                            width={288}
                            height={288}
                            className="object-cover"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold pointer-events-none text-justify p-4"
                          variants={hoverTextVariants}
                        >
                          {item.description}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                } else if (item.type === "text") {
                  return (
                    <motion.div
                      key={index}
                      className="w-[18.5rem] h-36 bg-gray-800 flex items-center justify-center text-white text-center mr-2 flex-shrink-0 text-justify p-4"
                      custom={customProps}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <span>{item.content}</span>
                    </motion.div>
                  );
                }
                return null;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
