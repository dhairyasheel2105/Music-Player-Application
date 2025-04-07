import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';

export const useColorExtractor = (imageUrl) => {
  const [dominantColor, setDominantColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const color = colorThief.getColor(img);
        setDominantColor(color);
      } catch (error) {
        console.error('Error extracting color:', error);
        setDominantColor([33, 33, 33]); // Default dark color
      }
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error('Error loading image for color extraction');
      setDominantColor([33, 33, 33]); // Default dark color
      setIsLoading(false);
    };
  }, [imageUrl]);

  return { dominantColor, isLoading };
};

export const createGradient = (color) => {
  if (!color) return 'linear-gradient(to bottom, #121212, #121212)';
  
  const [r, g, b] = color;
  const darkerColor = `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`;
  const darkestColor = `rgb(${Math.max(0, r - 100)}, ${Math.max(0, g - 100)}, ${Math.max(0, b - 100)})`;
  
  return `linear-gradient(to bottom, rgb(${r}, ${g}, ${b}), ${darkerColor} 50%, ${darkestColor} 75%, #121212)`;
};