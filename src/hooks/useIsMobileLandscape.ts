import { useState, useEffect } from "react";

/**
 * Hook wykrywający, czy urządzenie ma ekran mobilny w orientacji landscape.
 * Uznajemy, że urządzenie mobilne to takie, które ma szerokość do 940px oraz wysokość do 520px,
 * a orientacja landscape występuje wtedy, gdy window.innerWidth > window.innerHeight.
 */
const useIsMobileLandscape = () => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth <= 940 && window.innerHeight <= 520;
      setIsMobileLandscape(isLandscape && isMobile);
    };

    // Pierwsze sprawdzenie przy montowaniu
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isMobileLandscape;
};

export default useIsMobileLandscape;