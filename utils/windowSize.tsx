import { useState, useEffect } from 'react';

interface WindowSize {
  height: number;
  width: number;
}

function getWindowDimensions(): WindowSize {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export const useWindowDimensions = (): WindowSize => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
