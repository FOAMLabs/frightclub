import React, { useState, useRef, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useGesture } from "react-use-gesture";
import VideoComponent from "./VideoComponent/VideoComponent";

const FrightClubMain: React.FC = () => {
  const [flashlightSize, setFlashlightSize] = useState<number>(75);
  const [clickCount, setClickCount] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const bind = useGesture({
    onMove: ({ xy: [x, y] }) => {
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.setProperty("--x", `${x}px`);
        overlay.style.setProperty("--y", `${y}px`);
        overlay.style.setProperty("--size", `${flashlightSize}px`);
      }
    },
    onClick: (event) => {
      if (event.event.target instanceof HTMLElement) {
        const targetElement = event.event.target as HTMLElement;
        if (!targetElement.closest("a, button")) {
          if (clickCount === 3) {
            setFlashlightSize(75);
            setClickCount(0);
          } else {
            setFlashlightSize((prevSize) => prevSize * 1.5);
            setClickCount((prevCount) => prevCount + 1);
          }
        }
      }
    },
  });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const overlay = overlayRef.current;
      if (overlay) {
        const gamma = event.gamma; // [-90, 90]
        const beta = event.beta; // [-180, 180]

        if (gamma !== null && beta !== null) {
          const x = (gamma + 90) * (window.innerWidth / 180);
          const y = (beta + 180) * (window.innerHeight / 360);

          overlay.style.setProperty("--x", `${x}px`);
          overlay.style.setProperty("--y", `${y}px`);
        }
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <div {...bind()}>
      <div className="background-image">
      <div>
      <VideoComponent />
    </div>
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

export default FrightClubMain;
