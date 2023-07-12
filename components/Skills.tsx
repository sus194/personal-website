import React from 'react'
import '@styles/skills.css';
import { SiPython, SiDotnet, SiHtml5, SiGit, SiDocker, SiTensorflow } from 'react-icons/si';
import {IoMdInfinite} from 'react-icons/io'
import{FaDatabase} from 'react-icons/fa'
export default function Skills() {
  const skillsData = [
    { name: 'Python', description: 'Description for Skill 1 jhbj jbibjhbhhjbuhjbbuj', icon: <SiPython /> },
    { name: 'ASP.Net Core', description: 'Description for Skill 2', icon: <SiDotnet /> },
    { name: 'Web Development', description: 'Description for Skill 3', icon: <SiHtml5 /> },
    { name: 'DevOps', description: 'Description for Skill 3', icon: <IoMdInfinite /> },
    { name: 'Databases', description: 'Description for Skill 3', icon: <FaDatabase /> },
    { name: 'Git', description: 'Description for Skill 3', icon: <SiGit /> },
    { name: 'Docker', description: 'Description for Skill 3', icon: <SiDocker /> },
    { name: 'TensorFlow', description: 'Description for Skill 3', icon: <SiTensorflow /> },
    // Add more skills as needed
    // Add more skills as needed
  ];

  return (
    <div className='skills'>
      <h1 className='skills-title'>Skills</h1>
    <div className="skills-container">
      {skillsData.map((skill, index) => (
            <div className="skill-tile" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-content">
                <h3 className="skill-title">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            </div>
          ))}
    </div>
    </div>
  );
}
