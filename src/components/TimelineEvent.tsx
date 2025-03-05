import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaPlane,
  FaBrain,
  FaCode,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

interface TimelineEventProps {
  text: string;
  description: string;
  position: "top" | "bottom";
  imageUrl?: string;
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: string[];
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  text,
  description,
  position,
  imageUrl,
  iconType,
  timelineGalleryImages,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderIcon = () => {
    switch (iconType) {
      case "education":
        return <FaGraduationCap className="text-white text-xl" />;
      case "usa":
        return <FaPlane className="text-white text-xl" />;
      case "work":
        return <FaBrain className="text-white text-xl" />;
      case "project":
        return <FaCode className="text-white text-xl" />;
      default:
        return <FaGraduationCap className="text-white text-xl" />;
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (timelineGalleryImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? timelineGalleryImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (timelineGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % timelineGalleryImages.length
      );
    }
  };

  const displayedImage = timelineGalleryImages
    ? timelineGalleryImages[currentImageIndex]
    : imageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center mx-7"
      style={{ zIndex: isHovered ? 1000 : 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        {/* KÓŁKO z ikoną – gradient jak w poprzedniej propozycji */}
        <motion.div
          className="absolute w-16 h-16 
                     bg-gradient-to-r from-[#FF5F6D] to-[#FFC371]
                     rounded-full inset-y-0 my-auto 
                     flex items-center justify-center 
                     shadow-lg"
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered ? "0px 0px 15px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {renderIcon()}
        </motion.div>

        {/* BLOK TEKSTOWY z pastelowym turkusem (unikamy szarego) */}
        <motion.div
          layout
          className={`
            p-4 border border-[#4CE0D2]/40 
            rounded-lg shadow-lg flex flex-col items-center
            ${position === "top" ? "mb-64" : "mt-64"} 
            bg-[rgba(76,224,210,0.5)]  /* Turkus z przezroczystością */
            backdrop-blur-sm          /* Delikatne rozmycie tła */
            transition-colors duration-300 
            text-black                /* Czarny tekst dla kontrastu */
          `}
          animate={{
            width: isHovered ? 570 : 200,
            height: "auto",
            y: isHovered ? (position === "top" ? -90 : 90) : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? (
            <div
              className="flex flex-row items-stretch"
              style={{ minHeight: 300 }}
            >
              <div className="relative" style={{ width: 200 }}>
                <motion.img
                  src={displayedImage}
                  alt="Galeria obrazów"
                  className="object-cover"
                  animate={{ width: 200, height: "100%", borderRadius: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                {timelineGalleryImages && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 
                                 bg-[#4CE0D2] p-2 rounded-full 
                                 opacity-70 hover:opacity-100 
                                 transition-opacity"
                    >
                      <FaArrowLeft className="text-white" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 
                                 bg-[#4CE0D2] p-2 rounded-full 
                                 opacity-70 hover:opacity-100 
                                 transition-opacity"
                    >
                      <FaArrowRight className="text-white" />
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-col flex-1 pl-4">
                <span className="text-center mb-2 font-bold text-lg">
                  {text}
                </span>
                <div className="flex-1">
                  <span className="text-sm text-center leading-relaxed">
                    {description}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse items-center w-full">
              {timelineGalleryImages ? (
                <motion.img
                  src={displayedImage}
                  alt="Galeria obrazów"
                  className="w-16 h-16 rounded-full object-cover"
                  animate={{ width: 64, height: 64, borderRadius: "50%" }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.img
                  src={imageUrl}
                  alt="Opis obrazu"
                  className="w-16 h-16 rounded-full object-cover mt-2"
                  animate={{ width: 64, height: 64, borderRadius: "50%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <motion.span
                animate={{ fontSize: 16 }}
                transition={{ duration: 0.3 }}
                className="mb-2 text-center font-bold"
              >
                {text}
              </motion.span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;
