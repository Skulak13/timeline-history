import { useState, useEffect } from "react";

const useViewportHeight = (): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return height;
};

export default useViewportHeight;
