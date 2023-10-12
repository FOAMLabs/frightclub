// components/VideoComponent.tsx
import * as React from 'react';
import Container from '@mui/material/Container';
import styles from './VideoComponent.module.css';

interface VideoFrameProps {
  videoSrc: string;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoSrc }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
  
    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };
  
    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  
    return (
      <div
      className={styles.frame}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video ref={videoRef} autoPlay muted loop className={styles.video}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  const VideoComponent: React.FC = () => {
    const videoSources = [1, 2, 3, 4, 5].map(num => `/VIDEO_${num}.mp4`);
  
    return (
      <Container maxWidth="md" className={styles.container}>
        <div className={styles.hallway}>
          {videoSources.map((src, index) => (
            <VideoFrame key={index} videoSrc={src} />
          ))}
        </div>
      </Container>
    );
  };
  
  export default VideoComponent;