import React, { useRef } from "react";

import * as THREE from 'three';

export function Stars() {
    const groupRef = useRef<THREE.Group>(null);
    const generateParticles = () => {
        const particleCount = 90000;
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
          const index = i * 3;
          let x: number, y: number, z: number;
    
          x = Math.random() * 16 -9; // Adjust the range as desired
          y = Math.random()*10-5; // Adjust the range as desired
          z = Math.random() * 0.1 - 0.05; // Adjust the range as desired
          
         // Calculate the concentration at the particle's position
          particlePositions[index] = x//Math.random() * 16 -8;
          particlePositions[index + 1] = y//Math.random() * 10 - 5;
          particlePositions[index + 2] = z//Math.random() * 0.1 - 0.05; // Adjust the range as desired
        }
      
        particles.setAttribute(
            'position',
            new THREE.BufferAttribute(particlePositions, 3)
        );
      
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.005,
          transparent: true,
          opacity: 1,
          color:0xffffff
        });
      
        return <points name="particle" geometry={particles} material={particleMaterial} />;
      };
  
    return <group ref={groupRef}>{generateParticles()}</group>;
  }
  