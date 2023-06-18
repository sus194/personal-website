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
       
        <ReactCardFlip containerClassName='card' flipDirection="horizontal" isFlipped={isFlipped}>
          <Image src="/imgs/jokercard-front.png" alt="Joker Card front" width={200} height= {300} onClick={handleCardClick}/>
          <div onClick={handleCardClick}>
              <h3>About Me</h3>
              <p>Your description goes here...</p>
          </div>
        </ReactCardFlip>
        {/* <div className={`joker-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
          <div className="card-front">
          <Image src="/imgs/jokercard-front.png" alt="Joker Card front" width={200} height= {300}/>
          </div>
          <div className="card-back">
          <Image src="/imgs/jokercard-back.png" alt="Joker Card Back" width={200} height= {300}/>
          {/*
          </div>
      
        </div>*/}


      </div>
  );
}
