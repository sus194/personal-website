import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const introElement = introRef.current;
      if (introElement) {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setFadeIn(true);
          setSlideIn(true);
        }
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      rootMargin: '0px',
      threshold: 0.25,
    });

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        observer.unobserve(introRef.current);
      }
    };
  }, []);

  

  return (
    
    <div
      ref={introRef}
      className={`intro-container ${fadeIn ? 'fade-in' : ''}`}
    >
    

        <h1 className="intro-title">About</h1>
        <div
          className={`intro-image ${slideIn ? 'slide-in' : ''}`}
        >
          <Image src="/imgs/photo-2.png" alt="My Image" width={300} height={300} />

        </div>
        <div className="intro-description">
          <h3>Description</h3>
        </div>


      </div>
  );
}
