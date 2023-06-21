import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';
import ReactCardFlip from 'react-card-flip';

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

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  

  return (
    <>
    
    <div
      ref={introRef}
      className={`intro-container ${fadeIn ? 'fade-in' : ''}`}
    >

      <div className="background-image"></div>
      <h1 className="intro-title">About</h1>
      
      <div className='intro-description'>
     
        <div
          className={`intro-image ${slideIn ? 'slide-in' : ''}`}
        >
          <Image src="/imgs/photo-2.png" alt="My Image" width={300} height={300} />

        </div>
        <div className="card-container">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            <div className="card-content" onClick={handleCardClick}>
              <img src="/imgs/jokercard-front.png" alt="Joker Card front" className="card-front" />
            </div>
            <div className="card-content" onClick={handleCardClick}>
              <img src="/imgs/jokercard-back.png" alt="Joker Card Back" className="card-back" />
            </div>
          </ReactCardFlip>
        </div>
      </div>


    </div></>
  );
}
