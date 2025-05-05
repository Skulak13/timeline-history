import { useState, useEffect } from "react";

/**
 * Hook wykrywający, czy urządzenie ma ekran mobilny w orientacji landscape.
 * Uznajemy, że urządzenie mobilne to takie, którego szerokość jest mniejsza niż 768px,
 * a orientacja landscape to sytuacja, gdy window.innerWidth > window.innerHeight.
 */
const useIsMobileLandscape = () => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth < 768;
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