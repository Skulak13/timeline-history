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

interface GalleryImage {
  url: string;
  caption?: string;
  captionPosition?: "top" | "bottom";
}

interface TimelineEventProps {
  text: string;
  description: string;
  position: "top" | "bottom";
  imageUrl?: string;
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: GalleryImage[];
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

  const displayedImageUrl = timelineGalleryImages
    ? timelineGalleryImages[currentImageIndex].url
    : imageUrl;

  const displayedImageCaption = timelineGalleryImages
    ? timelineGalleryImages[currentImageIndex].caption
    : null;

  const captionPosition = timelineGalleryImages
    ? timelineGalleryImages[currentImageIndex].captionPosition || "bottom"
    : "bottom";

  // Definiujemy właściwość textShadow, która pasuje do tła bloku tekstowego.
  const textShadowStyle = { textShadow: "2px 2px 4px rgba(76,224,210,0.5)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center xl:mx-3.5 3xl:mx-7"
      style={{ zIndex: isHovered ? 1000 : 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center">
        {/* Kółko z ikoną – gradient */}
        <motion.div
          className="absolute w-[3.84vw] h-[3.84vw] 
                     bg-gradient-to-r from-[#FF5F6D] to-[#FFC371]
                     rounded-full inset-y-0 my-auto 
                     flex items-center justify-center 
                     shadow-lg cursor-pointer"
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered ? "0px 0px 15px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {renderIcon()}
        </motion.div>

        {/* Blok tekstowy */}
        <motion.div
          layout
          className={`
            p-4 border border-[#4CE0D2]/40 
            rounded-lg shadow-lg flex flex-col items-center
            ${position === "top" ? "mb-64" : "mt-64"} 
            bg-[rgba(76,224,210,0.5)]
            backdrop-blur-sm
            transition-colors duration-300 
            text-[#1A1A1A]
          `}
          animate={{
            width: isHovered ? "34.2vw" : "12vw",
            height: "auto",
            y: isHovered ? (position === "top" ? -90 : 90) : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? (
            <div className="flex flex-row items-stretch">
              <div className="relative" style={{ width: "35.1%" }}>
                <motion.img
                  src={displayedImageUrl}
                  alt="Galeria obrazów"
                  className="object-cover"
                  animate={{
                    width: "100%", //to może być zbędne
                    height: "100%",
                    borderRadius: "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
                {/* Overlay z napisem */}
                {displayedImageCaption && (
                  <div
                    className="absolute left-0 w-full text-center text-sm text-white px-2 py-1 bg-[#4CE0D2] opacity-70"
                    style={
                      captionPosition === "top" ? { top: 0 } : { bottom: 0 }
                    }
                  >
                    {displayedImageCaption}
                  </div>
                )}

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
              <div className="flex flex-col flex-1 pl-4 style={{ width: '56.6%' }}">
                <span
                  className="text-center mb-2 font-bold text-lg drop-shadow-strong"
                  style={textShadowStyle}
                >
                  {text}
                </span>
                <div className="flex-1">
                  <span
                    className="text-sm text-center leading-relaxed drop-shadow-strong"
                    style={textShadowStyle}
                  >
                    {description}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse items-center w-full">
              {timelineGalleryImages ? (
                <motion.img
                  src={displayedImageUrl}
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
                initial={{ fontSize: 14 }}
                animate={{ fontSize: 16 }}
                transition={{ duration: 0.3 }}
                className="mb-2 text-center font-bold drop-shadow-strong"
                style={textShadowStyle}
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
