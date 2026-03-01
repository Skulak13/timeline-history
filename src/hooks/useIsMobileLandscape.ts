import { useState, useEffect } from "react";
import { MOBILE_LANDSCAPE_BREAKPOINT } from "@/constants/viewport";

/**
 * Hook wykrywający, czy urządzenie ma ekran mobilny w orientacji landscape.
 *
 * Wartości progowe są zdefiniowane w src/constants/viewport.ts i zsynchronizowane
 * z odpowiadającym media query w globals.css.
 */
const useIsMobileLandscape = () => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const isTouchCapable = navigator.maxTouchPoints > 0;

    const checkOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isWithinSizeThreshold =
        window.innerWidth <= MOBILE_LANDSCAPE_BREAKPOINT.MAX_WIDTH &&
        window.innerHeight <= MOBILE_LANDSCAPE_BREAKPOINT.MAX_HEIGHT;

      setIsMobileLandscape(
        isLandscape && isWithinSizeThreshold && isTouchCapable,
      );
    };

    // Pierwsze sprawdzenie przy montowaniu
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isMobileLandscape;
};

export default useIsMobileLandscape;
