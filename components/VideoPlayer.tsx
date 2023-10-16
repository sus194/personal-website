import React, { useRef, useState } from 'react';
import '@styles/video.css';

const VideoPlayer = (props: any) => {
  const videoRef = useRef<any>();
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlain, setIsVideoPlain] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play(); // Resume the video
      } else {
        videoRef.current.pause();
        setShowPrompt(false);
      }
      setIsPaused(!isPaused);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime >= 3.18) {
        videoRef.current.currentTime = 3.17;
      }
      if (videoRef.current.currentTime >= 2) {
        setShowPrompt(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setShowPrompt(false);
    setIsVideoPlain(false);
  };

  return (
    <div className='ooverlay'>
      {props.handleCallback(isVideoPlain)}
      {isVideoPlain && (
        <>
          <video
            onClick={handleVideoClick}
            ref={videoRef}
            onTimeUpdate={isPaused ? handleVideoTimeUpdate : handleVideoTimeUpdate}
            onEnded={handleVideoEnd}
            autoPlay
            muted
            loop
            className="video"
          >
            <source src="/video/bleach.mp4" type="video/mp4" />
          </video>
          {showPrompt && (
            <div className={`contet-overlay ${showPrompt ? 'fade-in' : ''}`}>
              <h1>Click To Continue</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
