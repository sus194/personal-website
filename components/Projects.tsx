import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControl } from './SolarSkills/OrbitControl';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectDisplay from './ProjectScene';
import '@styles/projects.css';

interface Project {
  title: string;
  skills: string[];
  description: string[];
  image?: string;
  github?: string;
  demo?: string;
  link?: string;
  type?: 'screen' | 'car' | 'map' | 'server' | 'maze' | 'calculator' | 'bot' | 'backpack' | 'hoop';
  date?: string;
  color: string;
}

const projectData: Project[] = [
  {
    title: 'Auto Car (RC Self-Driving)',
    skills: ['Raspberry Pi', 'Python', 'OpenCV', 'SLAM', 'Flask'],
    description: [
      'Built a self-driving vehicle on a Raspberry Pi 4 handling perception, control, and telemetry.',
      'Integrated vision-based SLAM and A* navigation with PID motion control (less than 10% deviation).',
      'Created a Flask dashboard for live streaming and OTA updates, cutting debug time by 30%.'
    ],
    image: 'imgs/projects/auto-car/rc-car.jpg',
    github: 'https://github.com/sus194/Auto-Car',
    color: 'bg-yellow-600',
    type: 'car'
  },
  {
    title: 'PathWars (Multi-Agent Strategy)',
    skills: ['C++', 'Qt', 'D Star Lite', 'Physics Engine', 'WebSockets'],
    description: [
      'Designed a real-time strategy game where players control autonomous robots on a dynamic grid.',
      'Implemented D* Lite and CBS algorithms for multi-agent path planning/obstacle avoidance.',
      'Developed a custom physics engine and WebSocket server for multiplayer spectator modes.'
    ],
    image: '', // No image needed for map type
    github: 'https://github.com/sus194/PathWars',
    color: 'bg-purple-600',
    type: 'map'
  },
  {
    title: 'NBA Championship Prediction',
    date: 'June 2025',
    description: [
      'Developed a machine learning model using two decades of NBA data including team records, injuries, and performance metrics to predict playoff outcomes.',
      'Automated data collection and nightly updates using Python and pandas pipelines that scrape league statistics.'
    ],
    link: 'https://github.com/sus194/NBA_Championship_Predictor-',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Data Scraping'],
    color: 'bg-orange-600',
    type: 'hoop'
  },
  {
    title: 'Knight Run',
    skills: ['Unity', 'C#', 'Game Dev', 'Physics'],
    description: [
      'A 2D endless runner game with custom physics interactions and pixel art aesthetics.',
      'Features procedural level generation, combat mechanics, and global high-score tracking.',
      'Optimized for mobile and collision performance.'
    ],
    image: '', // Maze type
    github: 'https://github.com/sus194/KnightRun',
    color: 'bg-red-600',
    type: 'maze'
  },
  {
    title: 'go_go_server',
    skills: ['Go', 'Backend', 'Orchestration', 'Scheduling'],
    description: [
      'Lightweight backend server in Go with clean separation of concerns for orchestration and scheduling.',
      'Features strongly typed request/response models and interchangeable scheduler components.',
      'Designed for readability and maintainability, serving as a foundation for complex task-based systems.'
    ],
    image: '', // Procedural 3D model
    github: 'https://github.com/sus194/go_go_server',
    color: 'bg-cyan-600',
    type: 'server'
  },
  {
    title: 'Expense Manager',
    skills: ['Azure', 'ASP.NET MVC', 'C#', 'SQL', 'Chart.js'],
    description: [
      'A comprehensive web application for tracking and analyzing personal expenses.',
      'Features include data visualization with interactive charts, budget limit setting, and secure cloud deployment on Microsoft Azure.',
      'Built with ASP.NET Core and Entity Framework for robust backend performance.'
    ],
    image: 'imgs/projects/expense-manager/home.png',
    github: 'https://github.com/sus194/Expense-Manager',
    color: 'bg-indigo-600',
    type: 'calculator'
  },
  {
    title: 'AI Discord Bot',
    skills: ['Python', 'Discord.py', 'OpenAI API', 'Pandas'],
    description: [
      'An intelligent Discord bot integrating OpenAI for chat, stock analysis, and weather updates.',
      'Includes mini-games like Chess and Tic-Tac-Toe, and administration tools for server management.',
      'Leverages multiple APIs to provide real-time information and entertainment.'
    ],
    image: 'imgs/projects/aidiscord-bot/aibot-ai.png',
    github: 'https://github.com/sus194/AI-Discord-Bot',
    color: 'bg-green-600',
    type: 'bot'
  },
  {
    title: 'Study Buddy',
    skills: ['React', 'Firebase', 'Node.js', 'WebSockets'], // Assuming these skills based on description
    description: [
      'A real-time collaboration platform for students to form study groups and chat.',
      'Features user authentication, live messaging, and profile customization.',
      'Built with a responsive frontend and serverless backend architecture.'
    ],
    image: 'imgs/projects/study-buddy/studdybuddy-home.png',
    github: 'https://github.com/sus194/Study-Buddy',
    color: 'bg-blue-600',
    type: 'backpack'
  }
];

export default function Projects(props: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projectData.length - 1 : prev - 1));
  };

  const currentProject = projectData[currentIndex];

  return (
    <div className="projects-container" id="projects-section">
      <h1 className="projects-title">Projects</h1>

      <div className="carousel-content">
        {/* Left Side: 3D Scene */}
        <div className="project-3d-stage">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <ProjectDisplay imagePath={currentProject.image} type={currentProject.type || 'screen'} />
            </Suspense>
            <OrbitControl />
          </Canvas>
        </div>

        {/* Right Side: Details */}
        <div className="project-details">
          <h2 className="project-name">{currentProject.title}</h2>

          <div className="project-tags">
            {currentProject.skills.map((skill, idx) => (
              <span key={idx} className="skill-tag">{skill}</span>
            ))}
          </div>

          <div className="project-description">
            {currentProject.description.map((desc, idx) => (
              <p key={idx}>{desc}</p>
            ))}
          </div>

          <div className="project-links">
            {currentProject.github && (
              <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="btn-link">
                <FaGithub /> GitHub
              </a>
            )}
            {currentProject.demo && (
              <a href={currentProject.demo} target="_blank" rel="noopener noreferrer" className="btn-link">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button className="nav-btn prev" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <button className="nav-btn next" onClick={handleNext}>
        <FaChevronRight />
      </button>

      {/* Index Indicator */}
      <div className="index-indicator">
        {currentIndex + 1} / {projectData.length}
      </div>
    </div>
  );
}
