import React, { useRef, useState } from 'react';

import '@styles/video.css';

const VideoPlayer = (props: any) => {
  const videoRef = useRef<any>();
  const [isPaused, setIsPaused] = useState(false);
  const [isvideoplain, setisvideoplain] = useState(true);
  const [show, isshow] = useState(false);
  const handleVideoClick = () => {
    if (videoRef.current) {
      setIsPaused(true);
      isshow(false)
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 3.18) {
      videoRef.current.currentTime = 3.17;
     
    }
    if(videoRef.current && videoRef.current.currentTime >= 2){
        isshow(true)
    }
  };

  const handleideoTimeUpdate = () => {
    if((videoRef.current && videoRef.current.currentTime >= 8.9)){
        setisvideoplain(false)
    }
  };
  return (
    <div className='ooverlay'>
        {props.handleCallback(isvideoplain)}
    {isvideoplain?(
    <><video onClick={handleVideoClick} ref={videoRef} onTimeUpdate={isPaused ? handleideoTimeUpdate : handleVideoTimeUpdate} autoPlay muted loop className="video">
                  <source src="/video/bleach.mp4" type="video/mp4" />
              </video>
    {show?(
    <div className={`contet-overlay ${show ? 'fade-in' : ''}`}>
        
        <h1>Click To Continue</h1>
    </div>):(null)
    }   
    </>
    
    ):(null)
    }
    </div>
  )
};

export default VideoPlayer;