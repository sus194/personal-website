import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import '@styles/intro.css';
import ReactCardFlip from 'react-card-flip';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaCode, FaFile, FaGitlab } from 'react-icons/fa';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [slideIn, setSlideIn] = useState(false);


  useEffect(() => {
    const container: any = document.getElementById('starry-background');
    const stars: HTMLDivElement[] = [];

    const createStar = () => {
      const star: HTMLDivElement = document.createElement('div');
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

    const handleMouseMove = (event: any) => {
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
    // Start fading at 500ms: visible rotation then quick vanish
    setTimeout(() => {
      setFadeIn(true);
      setSlideIn(true);
    }, 500);
  };



  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Card Section - Absolutely Centered */}
      {!fadeIn && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <ReactCardFlip
              containerClassName={`card-container ${fadeIn ? 'fade-out' : ''}`}
              flipDirection="horizontal"
              isFlipped={isFlipped}
              flipSpeedBackToFront={2.0}
              flipSpeedFrontToBack={2.0}
            >
              <div
                className={`card-content ${hoverEffect ? `hover-effect ${isFlipped ? 'flipped' : ''}` : 'not-hover-effect'}`}
                onClick={handleCardClick}
                onMouseEnter={handleCardHover}
                onMouseLeave={() => setHoverEffect(false)}
              >
                <img src="/imgs/jokercard-front.png" alt="Joker Card front" className="card-front" />
              </div>
              <div className="card-content" onClick={handleCardClick}>
                <img src="/imgs/jokercard-back.png" alt="Joker Card Back" className="card-back" />
              </div>
            </ReactCardFlip>
          </div>
        </div>
      )}

      {/* Intro Overlay Section */}
      <div
        ref={introRef}
        id="intro-container"
        className={`intro-container absolute inset-0 w-full h-full ${fadeIn ? 'fade-in' : ''} ${!fadeIn ? 'opacity-0 z-[-1]' : 'z-20'}`}
      >
        <div id="starry-background"></div>

        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="intro-title text-red-600 mb-8">ABOUT</h1>

          <div className='intro-description flex justify-center items-start w-full max-w-6xl px-4 gap-8'>
            <div
              className={`intro-image ${slideIn ? 'slide-in' : ''} flex-shrink-0`}
            >
              <Image className='rounded-xl' src="/imgs/profile-pic.jpeg" alt="My Image" width={300} height={300} />
            </div>

            <div className={`intro ${fadeIn ? 'Extend' : ''}`} >

              <h1 style={{ marginBottom: '20px' }}>Hi, here is a <span className="highlight underline">bit</span> about
                myself</h1>
              <div style={{ marginBottom: '20px' }} className='intro-aboutme'>
                <p>I’m a Computer Science student at Simon Fraser University with hands-on experience building systems-level software across infrastructure, robotics, and data-driven applications. I’ve completed internships at Astera Labs and MineSense, where I worked on C++ and Python systems including networking SDKs, CI/CD automation, containerized benchmarking, and large-scale telemetry and debugging tooling.</p>
                <br />
                <p>Outside of work, I lead the software team for SFU’s Robotics Soccer Club, where I design and implement multi-agent path planning algorithms such as D* Lite and CBS, along with real-time simulation and control systems in C++. I enjoy building reliable, high-performance systems that connect algorithms with real-world performance and turn complex problems into clean, maintainable solutions.</p>
              </div>

              <div className="flex flex-row gap-8">
                <Link href="https://github.com/sus194?tab=repositories" title="GitHub" className='text-6xl mt-3 flex flex-row items-center hover:text-gray-300 transition-colors'>
                  <FaCode />
                  <span className='text-2xl ml-5'>GitHub repos</span>
                </Link>

                <Link href="https://gitlab.com/sus194" title="GitLab" className='text-6xl mt-3 flex flex-row items-center hover:text-gray-300 transition-colors'>
                  <FaGitlab />
                  <span className='text-2xl ml-5'>GitLab</span>
                </Link>

                <a href="Sukhraj_Resume.pdf" download="Sukhraj_Purewal_Resume.pdf" title="Resume" className='text-6xl mt-3 flex flex-row items-center hover:text-gray-300 transition-colors'>
                  <FaFile />
                  <span className='text-2xl ml-5'>Resume</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
