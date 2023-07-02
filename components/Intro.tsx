import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';
import ReactCardFlip from 'react-card-flip';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  

  const [isFlipped, setIsFlipped] = useState(false);
  
  const [hoverEffect, setHoverEffect] = useState(false);


  const handleCardHover = () => {
    setHoverEffect(true);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    setFadeIn(true)
    setSlideIn(true);
   
  };

  

  return (
    <div
      
    >
      
        <div >
        <ReactCardFlip containerClassName = {`card-container ${fadeIn?'fade-out':''}`} flipDirection="horizontal" isFlipped={isFlipped}>
          <div className={`card-content ${hoverEffect ? `hover-effect ${isFlipped?'flipped':''}` : 'not-hover-effect'}`} onClick={handleCardClick} onMouseEnter={handleCardHover}
              onMouseLeave={() => setHoverEffect(false)}
            >
            <img src="/imgs/jokercard-front.png" alt="Joker Card front" className="card-front" />
          </div>
          <div className="card-content" onClick={handleCardClick}>
            <img src="/imgs/jokercard-back.png" alt="Joker Card Back" className="card-back" />
          </div>
        </ReactCardFlip>
      </div>
        
       

          
          <div
          ref={introRef}
          className={`intro-container ${fadeIn ? 'fade-in' : ''}`}
          >
          
          <h1 className="intro-title">About</h1>
          
          <div className='intro-description'>

              <div
                className={`intro-image ${slideIn ? 'slide-in' : ''}`}
              >
                <Image src="/imgs/photo-2.png" alt="My Image" width={300} height={300} />
                
              </div>

              <div className='intro'>
                <div className='intro-content'>
                  <p>hellofrvtgvtgbvrfvrvrascdscdscs</p>
                </div>
              </div>

          </div>
        </div>
           
         
      
      
      


    </div>
  );
}
