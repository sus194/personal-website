import React, { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '@styles/start.css';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

interface Line {
  x: number;
  y: number;
  id: number;
}
function Start(props: any) {
  const [fadeIn, setFadeIn] = useState(true);
  
  const [miniBats, setMiniBats] = useState<{ id: number; rotation: number; posX: number; posY: number; }[]>([]);

  const AboutClick = () => props.ref1.current?.scrollIntoView({ behavior: 'smooth' });
  const SkillsClick = () => props.ref2.current?.scrollIntoView({ behavior: 'smooth' });
  const ProjectClick = () => props.ref3.current?.scrollIntoView({ behavior: 'smooth' });
  const GetInTouchClick = () => props.ref4.current?.scrollIntoView({ behavior: 'smooth' });

  const [lines, setLines] = useState<Line[]>([]);

  const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
    const { clientX, clientY } = event;
    const rotation = Math.random() * 360;
    const line = {
      x: clientX,
      y: clientY,
      id: Date.now(),
      rotation: rotation,
    };
    setLines((prevLines) => [...prevLines, line]);
    setTimeout(() => {
      setLines((prevLines) => prevLines.filter((l) => l.id !== line.id));
    }, 7000);
  };

 
  
  const releaseBats = () => {
    const newMiniBat = {
      id: Date.now(),
      rotation: Math.random() * 360,
      posX: 0,
      posY: 0,
    };

    setMiniBats((prevMiniBats) => [...prevMiniBats, newMiniBat]);
  };

  

  return (
    <>
      <div className={`video-container ${fadeIn ? 'fade-in' : ''}`} onMouseMove={handleMouseMove}>
      {lines.map((line: {
        [x: string]: any; id: React.Key | null | undefined; x: any; y: any; 
}) => (
        <div
          key={line.id}
          className="line"
          style={{ left: line.x, top: line.y,transform: `rotate(${line.rotation}deg)` }}
        ></div>
      ))}
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
                  style={{ transform: `rotate(${miniBat.rotation}deg)` }}
                ></div>
              ))}
            </div>
            
          </div>

          <h1 className="sd">Software Developer</h1>
          <h1 className="tp">
            <Typewriter
              words={['Hi there, Welcome to my Website', 'Name is Sukhraj', 'Developer, Chess Player, Hiker', 'Take a look at my Skills and Projects']}
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
