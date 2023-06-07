import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introElement = introRef.current;
      if (introElement) {
        const introPosition = introElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (introPosition < windowHeight * 0.75) {
          setFadeIn(true);
          setSlideIn(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className={`intro ${fadeIn ? 'fade-in' : ''}`}>
      <div className={`intro-content ${slideIn ? 'slide-in' : ''}`}>
        <h1>About Me</h1>
        <div ref={introRef} >
          <Image src="/imgs/photo-2.png" alt="My Image" width={300} height={300} />
          <p>Your description goes here...</p>
        </div>
      </div>
    </div>
  );
}

