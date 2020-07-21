import { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

export const useWindowSize = () => {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export const useAvailHeight = () => {
  const size = useWindowSize();
  const theme = useTheme();
  const availHeight = {
    height: size.height - 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      height: size.height - 48,
    },
    [theme.breakpoints.up("sm")]: {
      height: size.height - 64,
    },
  };
  return availHeight;
};
