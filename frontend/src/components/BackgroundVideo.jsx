import React, { useRef, useEffect } from 'react';

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down the video
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        minWidth: '100vw',
        minHeight: '100vh',
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 0,
        opacity: 0.8,
        filter: 'blur(18px) brightness(0.7)',
        pointerEvents: 'none',
      }}
    >
      <source src="/videos/gradient.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
