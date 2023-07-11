import React from 'react'
import '@styles/skills.css';
export default function Skills() {
  const skillsData = [
    { name: 'Python', description: 'Description for Skill 1 jhbj jbibjhbhhjbuhjbbuj' },
    { name: 'ASP.Net Core', description: 'Description for Skill 2' },
    { name: 'Web Development', description: 'Description for Skill 3' },
    { name: 'DevOps', description: 'Description for Skill 3' },
    { name: 'Databases', description: 'Description for Skill 3' },
    { name: 'Git', description: 'Description for Skill 3' },
    { name: 'Docker', description: 'Description for Skill 3' },
    { name: 'TensorFlow', description: 'Description for Skill 3' },
    // Add more skills as needed
  ];

  return (
    <div className='skills'>
      <h1 className='skills-title'>Skills</h1>
    <div className="skills-container">
      {skillsData.map((skill, index) => (
        <div className="skill-tile" key={index}>
          <h3 className="skill-title">{skill.name}</h3>
          <p className="skill-description">{skill.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
