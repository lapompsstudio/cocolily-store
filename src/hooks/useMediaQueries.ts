import { useState, useEffect } from "react";

function useMediaQueries() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const updateMediaQueries = () => {
      const mobileQuery = window.matchMedia(
        "(max-width: 767px) and (orientation: portrait)"
      ).matches;
      const tabletQuery = window.matchMedia(
        "(min-width: 768px) and (orientation: portrait)"
      ).matches;
      const desktopQuery = window.matchMedia(
        "(min-width: 768px) and (orientation: landscape)"
      ).matches;

      setIsMobile(mobileQuery);
      setIsTablet(tabletQuery);
      setIsDesktop(desktopQuery);
    };

    updateMediaQueries();

    window.addEventListener("resize", updateMediaQueries);

    return () => window.removeEventListener("resize", updateMediaQueries);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export default useMediaQueries;
