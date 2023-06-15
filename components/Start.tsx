import React, { useState, useEffect, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '@styles/start.css';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

interface MiniBat {
  id: number;
  rotation: number;
  posX: number;
  posY: number;
}
function Start(props: any) {
  const [fadeIn, setFadeIn] = useState(true);
  const [popupVisible, setPopupVisible] = useState(true);
  const [miniBats, setMiniBats] = useState<MiniBat[]>([]);
  const [batCounter, setBatCounter] = useState(0);
  const [removalInProgress, setRemovalInProgress] = useState(false);
  const [popupPosition, setPopupPosition] = useState({left:0, top: 0});
  const videoContainerRef = useRef(null);

  
  const AboutClick = () => props.ref1.current?.scrollIntoView({ behavior: 'smooth' });
  const SkillsClick = () => props.ref2.current?.scrollIntoView({ behavior: 'smooth' });
  const ProjectClick = () => props.ref3.current?.scrollIntoView({ behavior: 'smooth' });
  const GetInTouchClick = () => props.ref4.current?.scrollIntoView({ behavior: 'smooth' });

  
  const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
    const container:any = videoContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      setPopupPosition({ left: mouseX+10, top: mouseY +20});
    }
  };
  
    
  
  const handlePopupClick = () => {
    setPopupVisible(false);
  };

  const releaseBats = () => {
    if (miniBats.length > 0) {
      // Start the removal process
      setRemovalInProgress(true);
    } else {
      // Release new mini bats with a 1-second delay between each release
      setBatCounter(10);
    }
  };
  
  useEffect(() => {
    const deleteOriginBats = () => {
      const originBatIndex = miniBats.findIndex((miniBat) => miniBat.posX === 0 && miniBat.posY === 0);
      if (originBatIndex !== -1&&removalInProgress) {
        
          setMiniBats((prevMiniBats) => prevMiniBats.filter((_, index) => index !== originBatIndex));
       
      } else {
        setRemovalInProgress(false); // All origin bats have been deleted
      }
    };
  
    if (removalInProgress) {
      deleteOriginBats(); // Start the removal process
    }
  }, [miniBats, removalInProgress]);
  
  
  

  useEffect(() => {
    if (batCounter > 0) {
      const timer = setTimeout(() => {
        const newMiniBat = {
          id: Date.now(),
          rotation: Math.random() * 360,
          posX: 0,
          posY: 0,
        };
        setMiniBats((prevMiniBats) => [...prevMiniBats, newMiniBat]);
        setBatCounter((prevCounter) => prevCounter - 1);
      }, 500); // Delay each bat release by 1 second

      return () => {
        clearTimeout(timer);
      };
    }
  }, [batCounter]);



  

  return (
    <>
      <div className={`video-container ${fadeIn ? 'fade-in' : ''}`} ref={videoContainerRef} onMouseMove={handleMouseMove} onClick={handlePopupClick}>
        {popupVisible && (
          <div
            className="popup"
            
            style={{ left: popupPosition.left, top: popupPosition.top, zIndex:3}}
          >
            
            <p>Click on screen near the symbol</p>
          </div>
        )}
        <div className={`nav ${fadeIn ? 'fade-in' : ''}`}>
          <div className="left-nav">
            <Link href="https://github.com/sus194" title="GitHub">
              <IconContext.Provider value={{ className: 'left-icon' }}>
                <FaGithub />
              </IconContext.Provider>
            </Link>
            <Link href="https://www.linkedin.com/in/sukhraj-purewal-78b6b1222/" title="Linkeden">
              <IconContext.Provider value={{ className: 'left-icon' }}>
                <FaLinkedin />
              </IconContext.Provider>
            </Link>
            <Link onClick={GetInTouchClick} title="Get In Touch" href={''}>
              <IconContext.Provider value={{ className: 'left-icon' }}>
                <FaEnvelope />
              </IconContext.Provider>
            </Link>
          </div>
        </div>

        <div className={`content-overlay ${fadeIn ? 'fade-in' : ''}` } >
          <div>
            <div
              className="symbol"
              onClick={releaseBats}
              
            ></div>
            <div className="mini-bats">
              {miniBats.map((miniBat) => (
                <div
                  className="mini-bat"
                  key={miniBat.id}
                  style={{ transform: `rotate(${miniBat.rotation}deg) translate(${miniBat.posX}px, ${miniBat.posY}px)` }}
                ></div>
              ))}
            </div>
            
          </div>

          <h1 className="sd">Sukhraj Purewal</h1>
          <h1 className="tp">
            <Typewriter
              words={['Hi there, Welcome to my Website', 'I am a Software Developer', 'I like to play Chess, Hike and Run', 'Take a look at my Skills and Projects']}
              loop={Infinity}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h1>

          <div className="navbar">
            <button onClick={AboutClick}>About</button>
            <button onClick={SkillsClick}>Skills</button>
            <button onClick={ProjectClick}>Project</button>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Start;

