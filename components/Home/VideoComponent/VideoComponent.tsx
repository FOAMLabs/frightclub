// components/VideoComponent.tsx
import * as React from 'react';
import Container from '@mui/material/Container';
import styles from './VideoComponent.module.css';  // Import the CSS module

interface VideoFrameProps {
  videoSrc: string;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoSrc }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);  // Create a ref to access the video element
  
    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.pause();  // Pause video on mouse enter
      }
    };
  
    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.play();  // Play video on mouse leave
      }
    };
  
    return (
      <div
        className={styles.frame}
        onMouseEnter={handleMouseEnter}  // Pause video on mouse enter
        onMouseLeave={handleMouseLeave}  // Play video on mouse leave
      >
        <video ref={videoRef} autoPlay muted loop className={styles.video}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };


const VideoComponent: React.FC = () => {
  // Assuming all videos are named VIDEO_1.mp4, VIDEO_2.mp4, etc., and are located in the public folder
  const videoSources = [1, 2, 3, 4, 5].map(num => `/VIDEO_${num}.mp4`);

  return (
    <Container maxWidth="md" className={styles.hallway}>
      {videoSources.map((src, index) => (
        <VideoFrame key={index} videoSrc={src} />
      ))}
    </Container>
  );
};

export default VideoComponent;