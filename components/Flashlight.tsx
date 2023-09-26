import React, { useEffect, useState, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

const Flashlight: React.FC = () => {
  const [flashlightSize, setFlashlightSize] = useState(75); // initial size
  const [clickCount, setClickCount] = useState(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveFlashlight = (event: MouseEvent) => {
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.setProperty("--x", `${event.pageX}px`);
        overlay.style.setProperty("--y", `${event.pageY}px`);
        overlay.style.setProperty("--size", `${flashlightSize}px`);
      }
    };

    const handleFlashlightClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("a, button")) {
        // Not a clickable item
        if (clickCount === 3) {
          setFlashlightSize(75); // Reset size after 4th click
          setClickCount(0); // Reset click count
        } else {
          setFlashlightSize((prevSize) => prevSize * 1.5); // Increase size by 50%
          setClickCount((prevCount) => prevCount + 1); // Increase click count
        }
      }
    };

    const updateMaskPosition = (event: DeviceOrientationEvent) => {
      const beta = event.beta;  // [-180, 180] Tilt front-to-back in degrees
      const gamma = event.gamma;  // [-90, 90] Tilt left-to-right in degrees
      const overlay = overlayRef.current;

      if (overlay) {
        // Convert tilt values to pixel values
        const xPosition = window.innerWidth * (gamma + 90) / 180;
        const yPosition = window.innerHeight * (beta + 90) / 180;

        overlay.style.setProperty("--x", `${xPosition}px`);
        overlay.style.setProperty("--y", `${yPosition}px`);
        overlay.style.setProperty("--size", `${flashlightSize}px`);
      }
    };

    window.addEventListener("mousemove", moveFlashlight);
    window.addEventListener("click", handleFlashlightClick);

    if (typeof window.DeviceOrientationEvent !== "undefined" && typeof window.DeviceOrientationEvent.requestPermission === "function") {
      // iOS 13+ devices
      window.DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', updateMaskPosition);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS 13+ devices
      window.addEventListener('deviceorientation', updateMaskPosition);
    }

    return () => {
      window.removeEventListener("mousemove", moveFlashlight);
      window.removeEventListener("click", handleFlashlightClick);
      window.removeEventListener('deviceorientation', updateMaskPosition);
    };
  }, [flashlightSize, clickCount]);

  return (
    <div>
      <div className="background-image">
        <ConnectButton />
      </div>

      <div className="overlay" ref={overlayRef}></div>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={500}
        height={200}
        className="logo"
      />
      <Link href="/Trick">
        <Image
          src="/trick.svg"
          alt="Trick"
          width={250}
          height={100}
          className="menu-items"
        />
      </Link>
      <Link href="/Treat">
        <Image
          src="/treat.svg"
          alt="Treat"
          width={250}
          height={100}
          className="menu"
        />
      </Link>
    </div>
  );
};

export default Flashlight;
