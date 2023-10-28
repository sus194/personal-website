import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';
import ReactCardFlip from 'react-card-flip';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaCode, FaFile} from 'react-icons/fa';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);


  useEffect(() => {
    const container:any = document.getElementById('starry-background');
    const stars:HTMLDivElement[] = [];

    const createStar = () => {
      const star:HTMLDivElement = document.createElement('div');
      star.classList.add('star');
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(star);
      stars.push(star);
    };

    const removeStar = () => {
      const star = stars.pop();
      star?.remove();
    };

    const handleMouseMove = (event:any) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (mouseX - centerX) * 0.04;
      const offsetY = (mouseY - centerY) * 0.04;

      container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    

    window.addEventListener('mousemove', handleMouseMove);
    

    // Create initial stars
    for (let i = 0; i < 200; i++) {
      createStar();
    }

    // Remove stars periodically
    setInterval(() => {
      removeStar();
      createStar();
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
    };
  }, []);
  
  ///

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
          id= "intro-container"
          className={`intro-container ${fadeIn ? 'fade-in' : ''}`}
          >
            <div id="starry-background"></div>

          <h1 className="intro-title">About</h1>
          
          <div className='intro-description'>
              <div
                className={`intro-image ${slideIn ? 'slide-in' : ''}`}
              >
                <Image className='rounded-xl' src="/imgs/profile-pic.jpeg" alt="My Image" width={300} height={300} />
              </div>

              <div className='intro' >
                
                <h1 style={{ marginBottom: '20px' }}>Hi, here is a <span className="highlight underline">bit</span> about 
                myself</h1>
                <div style={{ marginBottom: '20px' }} className='intro-aboutme'>
                  <p>I have gained hands-on experience in various programming languages such as Python, C++/C,
                  C#, Java,and JavaScript through personal projects and software development courses.
                  As a <span className='highlight'>Software Developer</span>, I utilize industry-standard tools and possess practical
                  knowledge of the field. My expertise as a <span className='highlight'>full-stack developer</span> includes React and
                  Express.js for developing web applications, as well as Django and ASP.NET. I am also
                  passionate about exploring <span className='highlight'>machine learning</span> applications in diverse domains and have
                  worked on projects involving data analysis, predictive modelling, and implementing 
                  machine learning algorithms. With my diverse skill set, I can work on multiple platfo
                  and technologies to deliver comprehensive solutions.</p>
                </div>

                <Link href="https://github.com/sus194?tab=repositories" title="GitHub" className='text-6xl mt-3 flex flex-row'>
                
                  <FaCode />
                
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
