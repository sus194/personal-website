import React, { useEffect, useRef, useState } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedVideo} from '@cloudinary/react';

import '@styles/video.css';

const VideoPlayer = (props:any) => {
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

  useEffect(() => {
    // Fetch the video file when the component mounts
    fetch('/video/bleach.mp4') // Adjust the URL to your video location
      .then((response) => response.blob())
      .then((videoBlob) => {
        const videoURL = URL.createObjectURL(videoBlob);
        videoRef.current.src = videoURL;
      });
  }, []);

  return (
    <div className='ooverlay'>
        {props.handleCallback(isvideoplain)}
    {isvideoplain?(
    <>
    
   <video onClick={handleVideoClick} ref={videoRef} onTimeUpdate={isPaused ? handleideoTimeUpdate : handleVideoTimeUpdate} autoPlay muted loop className="video">      
    </video>
    {show?(
    <div onClick={handleVideoClick} className={`contet-overlay ${show ? 'fade-in' : ''}`}>
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