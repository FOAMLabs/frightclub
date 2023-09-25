import React, { useEffect, useState, useRef } from 'react';

const Flashlight: React.FC = () => {
  const [flashlightSize, setFlashlightSize] = useState(75); // initial size
  const [clickCount, setClickCount] = useState(0);
  const overlayRef = useRef<HTMLElement | null>(null);



  useEffect(() => {
    const moveFlashlight = (event: MouseEvent) => {
      const overlay = overlayRef.current as HTMLElement;
      if (overlay) {
        overlay.style.setProperty('--x', `${event.pageX}px`);
        overlay.style.setProperty('--y', `${event.pageY}px`);
        overlay.style.setProperty('--size', `${flashlightSize}px`);
      }
    };

    const handleFlashlightClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('a, button')) {
        // Not a clickable item
        if (clickCount === 3) {
          setFlashlightSize(75); // Reset size after 4th click
          setClickCount(0);     // Reset click count
        } else {
          setFlashlightSize((prevSize) => prevSize * 1.50); // Increase size by 15%
          setClickCount((prevCount) => prevCount + 1);      // Increase click count
        }
      }
    };

    window.addEventListener('mousemove', moveFlashlight);
    window.addEventListener('click', handleFlashlightClick);

    return () => {
      window.removeEventListener('mousemove', moveFlashlight);
      window.removeEventListener('click', handleFlashlightClick);
    };
  }, [flashlightSize, clickCount]);

  return (
    <div>
      <div className="background-image"></div>
      <div className="overlay" ref={overlayRef}></div>
    </div>
  );
};

export default Flashlight;