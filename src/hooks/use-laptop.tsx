import { useState, useEffect } from "react";

const LAPTOP_BREAKPOINT = 1000;

export function useIsLaptop() {
  const [isLaptop, setIsLaptop] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LAPTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsLaptop(window.innerWidth > LAPTOP_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsLaptop(window.innerWidth > LAPTOP_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLaptop;
}
