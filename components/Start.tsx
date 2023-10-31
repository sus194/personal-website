import React, { useState, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import '@styles/start.css';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Canvas} from '@react-three/fiber';
import { Start_Background } from './Start_Background';

function Start(props: any) {
  const [fadeIn, setFadeIn] = useState(true);
  
  const videoContainerRef = useRef(null);

  
  const AboutClick = () => props.ref1.current?.scrollIntoView({ behavior: 'smooth' });
  const SkillsClick = () => props.ref2.current?.scrollIntoView({ behavior: 'smooth' });
  const ProjectClick = () => props.ref3.current?.scrollIntoView({ behavior: 'smooth' });
  const GetInTouchClick = () => props.ref4.current?.scrollIntoView({ behavior: 'smooth' });
  
  return (
    <>
      <div className={`video-container ${fadeIn ? 'fade-in' : ''}`} ref={videoContainerRef} >
        
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Start_Background/>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
          </Canvas>

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
            {/* <Link onClick={GetInTouchClick} title="Get In Touch" href={''}>
              <IconContext.Provider value={{ className: 'left-icon' }}>
                <FaEnvelope />
              </IconContext.Provider>
            </Link>*/}
          </div>
        </div>

        <div className={`content-overlay ${fadeIn ? 'fade-in' : ''}` } >
          <div>
            <div
              className="symbol"
            ></div>
            
          </div>

          <h1 className="sd">Sukhraj Purewal</h1>
          <h1 className="tp">
            <Typewriter
              words={['Hi, Welcome to my Website', 'I am a Software Developer', 'I like to play Chess, Hike and Run', 'Take a look at my Skills and Projects']}
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

