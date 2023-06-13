"use client"





import Intro from "@/components/Intro"
import GetInTouch from "@components/GetInTouch"
import Projects from "@components/Projects"
import Skills from "@components/Skills"
import Start from "@components/Start"
import "@styles/globals.css"
import { useEffect, useRef, useState } from "react"
import Link from 'next/link';
import {FiMenu } from "react-icons/fi";
import {IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { text } from "node:stream/consumers"
import VideoPlayer from "@components/VideoPlayer"

export default function page() {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);
  const page5Ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("section1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarOpenf, setIsSidebarOpenf] = useState(false);
  const [isvideoplain, setisvideoplain] = useState(true);

  const isplaying=(props: boolean)=>{
    if(!props){
      setisvideoplain(props)
    }
   
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSidebarOpenf(true)
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      const scrollOffset = scrollContainer?.scrollTop;
      const section2Offset = page2Ref.current?.offsetTop;
      const section3Offset = page3Ref.current?.offsetTop;
      const section4Offset = page4Ref.current?.offsetTop;
      const section5Offset = page5Ref.current?.offsetTop;

      if (section5Offset&&scrollOffset&&scrollOffset >= section5Offset && activeSection !== "section5") {
        setActiveSection("section5");
      } else if (section4Offset&&scrollOffset&&scrollOffset >= section4Offset && activeSection !== "section4") {
        setActiveSection("section4");
      } else if (section3Offset&&scrollOffset&&scrollOffset >= section3Offset && activeSection !== "section3") {
        setActiveSection("section3");
      } else if (section2Offset&&scrollOffset&&scrollOffset >= section2Offset && activeSection !== "section2") {
        setActiveSection("section2");
      } else if (section2Offset&&scrollOffset&&scrollOffset < section2Offset && activeSection !== "section1") {
        setActiveSection("section1");
        setIsSidebarOpenf(false)
        setIsSidebarOpen(false)
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);




  const AboutClick = () => page2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  const SkillsClick = () => page3Ref.current?.scrollIntoView({ behavior: 'smooth' });
  const ProjectClick = () => page4Ref.current?.scrollIntoView({ behavior: 'smooth' });
  const GetInTouchClick = () => page5Ref.current?.scrollIntoView({ behavior: 'smooth' });

  const HomeClick = () => page1Ref.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div>
      <div className={`nav ${["section2", "section3", "section4", "section5"].includes(activeSection) ? 'menu-open' : ''}`}>
        <div className="right-nav">
          <span  className={`menu ${["section2", "section3", "section4", "section5"].includes(activeSection) ? 'visible' : ''}`} onClick={toggleSidebar}>
          {isSidebarOpen ? <IoClose /> : <FiMenu />}
          
          </span>
        </div>
      </div>
      
      <div className="underlay" ref={scrollContainerRef}>
        {isvideoplain?(
        <section><VideoPlayer handleCallback={isplaying}/></section>
        ):(
          <>
        <section id="section1"  ref={page1Ref}  ><Start ref1 = {page2Ref} ref2 = {page3Ref} ref3 = {page4Ref} ref4 = {page5Ref}/></section>
        
        <section id="section2"  ref={page2Ref} ><Intro /></section>
        <section id="section3" ref={page3Ref} ><Skills/></section>
        <section id="section4"  ref={page4Ref} ><Projects/></section>
        <section id="section5" ref={page5Ref}><GetInTouch/></section>
        </>
      )}
      </div>

      {isSidebarOpenf&&["section2", "section3", "section4", "section5"].includes(activeSection)&&(
      <div className={`sidebar ${!isSidebarOpen ? "slide-out" : ""}`}>
        <span className="navigation-title">Navigation</span>
        <ul className="bar">
          
          <li>
          <Link onClick={HomeClick}  href={""}>Home</Link>
            
            </li>
          <li>
            <Link onClick={AboutClick}  href={""}>About</Link>
            
            </li>
          <li>
          <Link onClick={SkillsClick}  href={""}>Skills</Link>
            
            </li>
          <li>
          <Link onClick={ProjectClick}  href={""}>Projects</Link>
            </li>
          <li>
          <Link onClick={GetInTouchClick}  href={""}>Get in Touch</Link>
            </li>
          
        </ul>
        <div className="bottom-links">
          <Link className="bottom-link" href="https://github.com/sus194">GitHub</Link>
          <Link className="bottom-link" href="https://linkedin.com">LinkedIn</Link>
        </div>
      </div>
    )}
      
    </div>
  )
}
