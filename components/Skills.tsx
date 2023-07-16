import React, { useEffect, useRef, useState } from 'react';
import { Canvas} from 'react-three-fiber';
import * as THREE from 'three';
import { RevolveGroup} from './SolarSkills/RevolveGroup';
import { Planet } from './SolarSkills/Planet';
import { Sun } from './SolarSkills/Sun';
import { OrbitControl } from './SolarSkills/OrbitControl';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import Link from 'next/link';
import { Stars } from './SolarSkills/Stars';


export default function Skills(props:any) {
  const spheres = [
    {
      x:1.5,
      z:0,
      name:"ASP.Net Core",
      description:"I have utilized ASP.NET Core to develop web applications using the C# programming language. I have leveraged its features such as MVC pattern and built-in support for dependency injection to create scalable and maintainable web solutions.",
      radius: 0.1,
      texture: new THREE.TextureLoader().load('imgs/mercury.png'),
    },
    {
      x:2.3,
      z:2,
      name:"DevOps",
      description:" In my projects, I have implemented DevOps practices to streamline the software delivery process. I have automated build and deployment pipelines, integrated continuous integration and continuous deployment (CI/CD) tools, and collaborated with cross-functional teams to ensure efficient collaboration and faster time-to-market.",
      radius: 0.18,
      texture: new THREE.TextureLoader().load('imgs/venus.avif'),
    },

    {
      x:0,
      z:-3.2,
      name:"Python",
      description:"I have employed Python for various purposes, including web development, data analysis, and scripting. I have utilized Python's extensive libraries and frameworks such as Flask and Django for building web applications, performed data analysis using pandas and NumPy, and written automation scripts to simplify repetitive tasks.",
      radius: 0.2,
      texture: new THREE.TextureLoader().load('imgs/earth.jpeg'),
    },
    {
      x:2,
      z:-5.5,
      name:"Web Development",
      description:"As a web developer, I have worked on creating visually appealing and functional websites. I have used HTML, CSS, and JavaScript to build responsive user interfaces, implemented front-end frameworks like React or Angular, and integrated back-end technologies like ASP.NET Core, Express.js or Django to handle server-side logic and database interactions.",
      radius: 0.2,
      texture: new THREE.TextureLoader().load('imgs/mars.jpeg'),
    },

    {
      x:6,
      z:0,
      name:"Docker",
      description:"I have utilized Docker to containerize applications and create reproducible development and deployment environments. By defining Dockerfiles and using Docker Compose, I have packaged applications and their dependencies into lightweight containers, enabling easier deployment, scaling, and portability across different platforms.",
      radius: 0.7,
      texture: new THREE.TextureLoader().load('imgs/jupiter.jpeg'),
    },
    {
      x:12,
      z:3.5,
      name:"TensorFlow",
      description:" I have employed TensorFlow for machine learning and deep learning projects. I have used its extensive API and pre-trained models to build and train neural networks for tasks such as image recognition, natural language processing, and sentiment analysis. TensorFlow has enabled me to leverage the power of machine learning algorithms and implement complex models efficiently.",
      radius: 0.46,
      texture: new THREE.TextureLoader().load('imgs/satrun.webp'),
    },

    {
      x:0,
      z:-11,
      name:"Databases",
      description:"In my projects, I have worked with various databases to store and manage data effectively. I have utilized relational databases like MySQL or PostgreSQL to design and optimize database schemas, write SQL queries, and ensure data integrity. Additionally, I have also worked with NoSQL databases like MongoDB or Redis for handling unstructured or real-time data requirements.",
      radius: 0.5,
      texture: new THREE.TextureLoader().load('imgs/uranus.jpeg'),
    },
    {
      x:-5,
      z:-17,
      name:"Git",
      description:"I have used Git as a version control system to manage source code and collaborate with other developers. I have created repositories, utilized branching and merging strategies to work on different features or bug fixes concurrently, and used Git workflows to ensure smooth collaboration and efficient code management.",
      radius: 0.5,
      texture: new THREE.TextureLoader().load('imgs/neptune.jpeg'),
    },
  ];

  const AboutClick2 = () => {
    props.about.current?.scrollIntoView({ behavior: 'smooth' })};
  const ProjectClick2 = () => props.project.current?.scrollIntoView({ behavior: 'smooth' });

  const [clickedPlanet, setClickedPlanet] = useState<String>('');
  const [clickedDes, setClickedDes] = useState<String>('');

  const handlePlanetClick = (name: String, description:String) => {
    setClickedPlanet(name);
    setClickedDes(description);
  };
  
  const numSpheres = spheres.length;
  const angleIncrement = (2 * Math.PI) / numSpheres;

  const planetColors = {
    ASP_Net_Core: '#ffcc00',
    DevOps: '#ff6600',
    Python: '#0099ff',
    Web_Development: '#ff3300',
    Docker: '#ff9933',
    TensorFlow: '#ffcc99',
    Databases: '#66ccff',
    Git: '#003399',
  };
  
  
      
  return (
    <div className="flex items-center justify-center w-screen h-screen relative overflow-auto">
    <div className="absolute mt-10 inset-0 bg-black bg-opacity-50 flex flex-col items-center ">
      <h1 className="text-3xl text-white mb-6">Skills</h1>
      <section className="text-xl text-white border border-white h-fit p-4" style={{ maxWidth: '900px', wordWrap: 'break-word', backgroundColor:clickedPlanet ? planetColors[String(clickedPlanet.replace('.','_').replace(" ",'_'))] : '#000'}}>
        {clickedPlanet ? (
          <div>
            <p>You clicked on: {clickedPlanet}</p>
            <p>{clickedDes}</p>
          </div>
        ) : (
          <p>Click on the planets</p>
        )}
      </section>

      {!props.baropen&&(<><div className="absolute top-5 right-20 text-white bg-gray-800 z-10">
          <Link onClick={AboutClick2} title="Go up" href={''}>
            <FaArrowCircleUp />
          </Link>
        </div><div className="absolute top-10 right-20 text-white bg-gray-800 z-10">
            <Link onClick={ProjectClick2} title="Go down" href={''}>
              <FaArrowCircleDown />
            </Link>
          </div></>)}
    </div>
      
      <Canvas className="w-full h-full" camera={{ position: [0, 8, 17] }}>
      <ambientLight />
      <pointLight position={[5, 5, 3]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      
      <OrbitControl/>
      <Sun />
      <RevolveGroup>
        {spheres.map((sphere, index) => {
          const angle = index * angleIncrement;
          const x = sphere.x * Math.cos(angle);
          const z = sphere.z * Math.sin(angle);
          const position = [x, 0, z];
          return (
            <Planet
              key={index}
              position={position}
              radius={sphere.radius}
              texture={sphere.texture}
              name={sphere.name}
              onClick={() => handlePlanetClick(sphere.name, sphere.description)}
              
              />
          );
        })}
      </RevolveGroup>
    </Canvas>

    </div>
  );
}