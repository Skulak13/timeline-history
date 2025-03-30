import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaPlane,
  FaBrain,
  FaCode,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import HyphenatedText from "./common/HyphenatedText";

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

// ====== NOWY HOOK: useViewportHeight ======
// Hook, który nasłuchuje zmian rozmiaru okna i zwraca aktualną wysokość viewportu.
const useViewportHeight = () => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // Ustawienie wysokości po zamontowaniu komponentu
    setHeight(window.innerHeight);
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
};

// ====== NOWA FUNKCJA: getOffsetByHeight ======
// Funkcja mapująca wysokość viewportu na wartość offsetu (y) dla animacji.
// Wykorzystujemy tablicę obiektów (breakpoints) do określenia wartości offsetu.
const getOffsetByHeight = (height: number, position: "top" | "bottom") => {
  const breakpoints = [
    { max: 570, offset: 50 },
    { max: 200, offset: 60 },
    { max: 710, offset: 70 },
    { max: Infinity, offset: 90 },
  ];

  const { offset } = breakpoints.find(({ max }) => height < max) || {
    offset: 90,
  };
  return position === "top" ? -offset : offset;
};

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
  // Referencja do przechowywania timeouta dla opóźnionego efektu hovera.
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ====== UŻYCIE NOWEGO HOOKA: pobranie aktualnej wysokości viewportu ======
  const viewportHeight = useViewportHeight();
  // ====== UŻYCIE MAPY WARTOŚCI: obliczenie offsetu na podstawie wysokości i pozycji ======
  const offset = getOffsetByHeight(viewportHeight, position);

  // Funkcje obsługujące efekt hover z opóźnieniem
  const handleHoverStart = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  // Funkcja renderująca ikonę w zależności od typu
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

  // Funkcje obsługujące przyciski galerii
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

  // Styl textShadow dopasowany do tła bloku tekstowego.
  const textShadowStyle = { textShadow: "2px 2px 4px rgba(76,224,210,0.5)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center sm:mx-3.5 3lg:mx-3.5 3xl:mx-7"
      style={{ zIndex: isHovered ? 1000 : 1 }}
    >
      <div className="flex flex-col items-center">
        {/* Kółko z ikoną – efekt hover z opóźnieniem */}
        <motion.div
          className="absolute w-[3.84vw] h-[3.84vw] bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full inset-y-0 my-auto flex items-center justify-center shadow-lg cursor-pointer"
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered ? "0px 0px 15px rgba(0,0,0,0.5)" : "none",
          }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {renderIcon()}
        </motion.div>

        {/* Kontener odstępów między eventami */}
        <div className={position === "top" ? "mb-64" : "mt-64"}>
          {/* Interaktywny blok tekstowy – zmienia się przy hover */}
          <motion.div
            layout
            style={{
              transformOrigin:
                position === "top" ? "bottom center" : "top center",
            }}
            className="p-4 responsive-padding-650 responsive-padding-770 border-2 border-[#4CE0D2]/40 rounded-lg shadow-lg flex flex-col items-center bg-[rgba(76,224,210,0.5)] backdrop-blur-sm transition-colors duration-300 text-[#1A1A1A]"
            animate={{
              width: isHovered ? "34.2vw" : "12vw",
              height: "auto",
              // ====== UŻYCIE DYNAMICZNEGO OFFSETU ======
              // Jeśli blok jest hoverowany, animacja y przyjmuje wartość obliczoną na podstawie wysokości viewportu
              y: isHovered ? offset : 0,
            }}
            transition={{ duration: 0.3 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          >
            {isHovered ? (
              <div className="flex flex-row items-stretch">
                <div className="relative" style={{ width: "35.1%" }}>
                  <div className="relative group h-full">
                    <motion.img
                      src={displayedImageUrl}
                      alt="Galeria obrazów"
                      className="w-full h-full object-cover"
                      animate={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    {displayedImageCaption && (
                      <div
                        className="absolute left-0 w-full text-center caption-big-font-650 text-sm text-white px-1 py-1 bg-[#4CE0D2] opacity-0 group-hover:opacity-88 transition-opacity duration-300"
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
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#4CE0D2] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <FaArrowLeft className="text-white w-2 h-2" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#4CE0D2] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <FaArrowRight className="text-white w-2 h-2" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div
                  className="flex flex-col flex-1 pl-4"
                  style={{ width: "56.6%" }}
                >
                  <motion.span
                    className="text-center text-big-margin-650 text-big-margin-770 mb-2 font-bold text-big-font-650 text-big-font-770 text-[17px] 2lg:text-lg drop-shadow-strong"
                    style={textShadowStyle}
                  >
                    {iconType === "usa" ? (
                      <>
                        <span className="hidden xl:inline">
                          Wyjazd do Stanów Zjednoczonych
                        </span>
                        <span className="xl:hidden">Wyjazd do USA</span>
                      </>
                    ) : text === "Studia Magisterskie Psychologia" ? (
                      <>
                        <span className="hidden 3lg:inline">
                          Studia magisterskie psychologia
                        </span>
                        <span className="3lg:hidden">Studia psychologia</span>
                      </>
                    ) : text === "Studia Licencjackie Socjologia" ? (
                      <>
                        <span className="hidden 3lg:inline">
                          Studia licencjackie socjologia
                        </span>
                        <span className="3lg:hidden">Studia socjologia</span>
                      </>
                    ) : (
                      text
                    )}
                  </motion.span>
                  <div className="flex-1">
                    <HyphenatedText
                      text={description}
                      className="leading-relaxed drop-shadow-strong description-font-w-1024 description-font-570  description-font-626 description-font-650 description-font-770 text-[13px] 2lg:text-sm 3lg:text-[15px]"
                      style={{
                        ...textShadowStyle,
                        textAlign: "justify",
                        hyphens: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col-reverse items-center w-full">
                {timelineGalleryImages ? (
                  <motion.img
                    src={displayedImageUrl}
                    alt="Galeria obrazów"
                    className="rounded-full object-cover mt-2"
                    animate={{ width: 64, height: 64, borderRadius: "50%" }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    src={imageUrl}
                    alt="Opis obrazu"
                    className="rounded-full object-cover mt-2"
                    animate={{ width: 64, height: 64, borderRadius: "50%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <motion.span className="text-small-margin-650 mb-2 text-center font-bold drop-shadow-strong text-[13px] 4sm:text-[15px] 2lg:text-base">
                  {text === "Studia Licencjackie Socjologia" ? (
                    <>
                      <span className="hidden 2xl:inline">
                        Studia licencjackie socjologia
                      </span>
                      <span className="2xl:hidden">
                        Studia <br /> socjologia
                      </span>
                    </>
                  ) : text === "Studia Magisterskie Psychologia" ? (
                    <>
                      <span className="hidden 2xl:inline">
                        Studia magisterskie psychologia
                      </span>
                      <span className="2xl:hidden">
                        Studia <br /> psychologia
                      </span>
                    </>
                  ) : text === "Wyjazd do Stanów Zjednoczonych" ? (
                    <>
                      <span className="hidden 4lg:inline">
                        Wyjazd do Stanów Zjednoczonych
                      </span>
                      <span className="4lg:hidden">
                        Wyjazd <br /> do U.S.A.
                      </span>
                    </>
                  ) : (
                    text
                  )}
                </motion.span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;
