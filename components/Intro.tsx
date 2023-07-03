import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';
import ReactCardFlip from 'react-card-flip';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaGithub, FaFile} from 'react-icons/fa';

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

              <div className='intro' >
                
                <h1 style={{ marginBottom: '20px' }}>Hi, here is a <span className="highlight underline">bit</span> about myself</h1>
                <div style={{ marginBottom: '20px' }} className='intro-aboutme'>
                  <p>I have gained hands-on experience in various programming languages such as Python, C++/C, C#,</p>
                  <p>Java,and JavaScript through personal projects and software development courses. As a <span className='highlight'>Software</span></p>
                  <p><span className='highlight'>Developer</span>, I utilize industry-standard tools and possess practical knowledge of the field. My expertise </p>
                  <p>as a <span className='highlight'>full-stack developer</span> includes React and Express.js for developing web applications, as well as </p>
                  <p>Django and ASP.NET. I am also passionate about exploring <span className='highlight'>machine learning</span> applications in diverse </p>
                  <p>domains and have worked on projects involving data analysis, predictive modelling, and implementing </p>
                  <p>machine learning algorithms. With my diverse skill set, I can work on multiple platforms and technologies</p>
                  <p>to deliver comprehensive solutions.</p>
                </div>

                <Link href="https://github.com/sus194?tab=repositories" title="GitHub" className='text-6xl mt-3 flex flex-row'>
                
                  <FaGithub />
                
                  <span className='text-2xl mt-4 ml-5'>GitHub repos</span>
                  
                </Link>

                <a href="Sukhraj_Resume.pdf" download="Resume.pdf" title="Resume" className='text-6xl mt-3 flex flex-row'>
                    <FaFile />
                    <span className='text-2xl mt-4 ml-5'>Resume</span>
                </a>
                
              </div>

          </div>
        </div>
           
         
      
      
      


    </div>
  );
}
