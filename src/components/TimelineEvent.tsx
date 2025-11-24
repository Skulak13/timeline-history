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
import useIsMobileLandscape from "@/hooks/useIsMobileLandscape";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import useViewportHeight from "@/hooks/useViewportHeight";

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
  activeElement: { source: "timeline" | "gallery"; index: number } | null;
  setActiveElement: (
    element: { source: "timeline" | "gallery"; index: number } | null
  ) => void;
  index: number;
}

const getOffsetByHeight = (height: number, position: "top" | "bottom") => {
  const breakpoints = [
    { max: 200, offset: 60 },
    { max: 570, offset: 50 },
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
  activeElement,
  setActiveElement,
  index,
}) => {
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const viewportHeight = useViewportHeight();
  const isTouchDevice = useIsTouchDevice();
  const isMobileLandscape = useIsMobileLandscape();

  const effectiveY = isMobileLandscape
    ? 0
    : getOffsetByHeight(viewportHeight, position);

  const isActive =
    activeElement?.source === "timeline" && activeElement.index === index;

  // Anuluje timer zamknięcia
  const cancelTimer = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  // Ustawia timer zamknięcia
  const scheduleClose = () => {
    cancelTimer();
    hoverTimeout.current = setTimeout(() => {
      setActiveElement(null);
    }, 150);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      cancelTimer();
      setActiveElement({ source: "timeline", index });
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") {
      scheduleClose();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      e.stopPropagation();
      if (isActive) {
        setActiveElement(null);
      } else {
        setActiveElement({ source: "timeline", index });
      }
    }
  };

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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeCaption, setFadeCaption] = useState(false);
  const captionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetCaptionTimer = () => {
    if (captionTimerRef.current) clearTimeout(captionTimerRef.current);
    setFadeCaption(false);
    captionTimerRef.current = setTimeout(() => {
      setFadeCaption(true);
    }, 3000);
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (timelineGalleryImages) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? timelineGalleryImages.length - 1 : prevIndex - 1
      );
      if (isTouchDevice) resetCaptionTimer();
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (timelineGalleryImages) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % timelineGalleryImages.length
      );
      if (isTouchDevice) resetCaptionTimer();
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

  useEffect(() => {
    if (isActive && isTouchDevice) {
      resetCaptionTimer();
    }
    return () => {
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current);
      }
    };
  }, [isActive, currentImageIndex, isTouchDevice]);

  const textShadowStyle = { textShadow: "2px 2px 4px rgba(76,224,210,0.5)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative flex flex-col items-center mx-1.5 2sm:mx-3.5 3xl:mx-7"
      style={{ zIndex: isActive ? 1000 : 1 }}
    >
      {/* NIEWIDZIALNA STREFA ŁĄCZĄCA KÓŁKO I BLOK - anuluje timer zamknięcia */}
      {isActive && !isMobileLandscape && (
        <div
          className="absolute pointer-events-auto"
          onPointerEnter={cancelTimer}
          onPointerLeave={scheduleClose}
          style={{
            // Pozycjonowanie strefy między kółkiem a blokiem
            left: 0,
            right: 0,
            width: "100%",
            ...(position === "top"
              ? {
                  // Dla top: strefa od bloku (który jest u góry) do kółka (które jest pośrodku)
                  bottom: "50%",
                  height: `${Math.abs(effectiveY)}px`,
                }
              : {
                  // Dla bottom: strefa od kółka (które jest pośrodku) do bloku (który jest u dołu)
                  top: "50%",
                  height: `${Math.abs(effectiveY)}px`,
                }),
            zIndex: 999,
          }}
        />
      )}

      <div className="flex flex-col items-center">
        <motion.div
          className="absolute w-[3.84vw] h-[3.84vw] bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full inset-y-0 my-auto flex items-center justify-center shadow-lg cursor-pointer"
          animate={{
            scale: isActive ? 1.2 : 1,
            boxShadow: isActive ? "0px 0px 15px rgba(0,0,0,0.5)" : "none",
          }}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          style={{ zIndex: 1001 }}
        >
          {renderIcon()}
        </motion.div>

        <div
          className={
            isMobileLandscape && isActive
              ? ""
              : position === "top"
              ? "mb-64"
              : "mt-64"
          }
        >
          <motion.div
            layout
            style={{
              transformOrigin: isMobileLandscape
                ? "center"
                : position === "top"
                ? "bottom center"
                : "top center",
              zIndex: 1001,
              position: "relative",
            }}
            className="responsive-padding border-2 border-[#4CE0D2]/40 rounded-lg shadow-lg flex flex-col items-center bg-[rgba(76,224,210,0.5)] backdrop-blur-sm transition-colors duration-300 text-[#1A1A1A]"
            animate={{
              width: isActive
                ? isMobileLandscape
                  ? "41.4vw"
                  : "34.2vw"
                : "12vw",
              height: "auto",
              y: isActive ? effectiveY : 0,
            }}
            transition={{ duration: 0.3 }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerUp}
          >
            {isActive ? (
              <div className="flex flex-row items-stretch">
                <div
                  className="relative"
                  style={{ width: isMobileLandscape ? "52.1%" : "35.1%" }}
                >
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
                    {displayedImageCaption &&
                      (isTouchDevice ? (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: fadeCaption ? 0 : 1 }}
                          transition={{ duration: fadeCaption ? 2 : 0 }}
                          className="absolute left-0 w-full text-center caption-big-font-650 text-sm text-white px-1 py-1 bg-[#4CE0D2]"
                          style={
                            captionPosition === "top"
                              ? { top: 0 }
                              : { bottom: 0 }
                          }
                        >
                          {displayedImageCaption}
                        </motion.div>
                      ) : (
                        <div
                          className="absolute left-0 w-full text-center caption-big-font-650 text-sm text-white px-1 py-1 bg-[#4CE0D2] opacity-0 group-hover:opacity-88 transition-opacity duration-300"
                          style={
                            captionPosition === "top"
                              ? { top: 0 }
                              : { bottom: 0 }
                          }
                        >
                          {displayedImageCaption}
                        </div>
                      ))}
                    {timelineGalleryImages && (
                      <>
                        <button
                          onPointerUp={(e) => e.stopPropagation()}
                          onClick={handlePrev}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#4CE0D2] p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <FaArrowLeft className="text-white w-2 h-2" />
                        </button>
                        <button
                          onPointerUp={(e) => e.stopPropagation()}
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
                  className="flex flex-col flex-1 pl-0.5 2sm:pl-4"
                  style={{ width: "56.6%" }}
                >
                  <motion.span
                    className="text-center text-big-margin font-bold text-big-font 2lg:text-lg drop-shadow-strong"
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
                      className="leading-relaxed drop-shadow-strong description-font 2lg:text-sm 3lg:text-[15px]"
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
                    animate={{
                      width: "var(--small-img-size)",
                      height: "var(--small-img-size)",
                      borderRadius: "50%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.img
                    src={imageUrl}
                    alt="Opis obrazu"
                    className="rounded-full object-cover mt-2"
                    animate={{
                      width: "var(--small-img-size)",
                      height: "var(--small-img-size)",
                      borderRadius: "50%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <motion.span className="text-small-margin mb-2 text-center font-bold drop-shadow-strong text-[10px] xs:text-[11px] 4sm:text-[15px] 2lg:text-base">
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
