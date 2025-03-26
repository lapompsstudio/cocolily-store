import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const useScrollAndLenis = (delay: number = 2500): boolean => {
  const [directionContainer, setDirectionContainer] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirectionContainer(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const lenis = useLenis(() => {
    if (lenis) {
      if (directionContainer) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [directionContainer]);

  return directionContainer;
};

export default useScrollAndLenis;
