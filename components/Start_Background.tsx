import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Group, Points } from 'three';
import { useFrame } from 'react-three-fiber';

export const Start_Background = () => {
  const groupRef = useRef<Group>(null);
  

  useFrame(({clock}) => {
    
    const elapsedTime = clock.getElapsedTime();
    
    
    if (groupRef.current) {
      const group = groupRef.current;

      // Find the child object with the desired geometry
      const particle = group.getObjectByName('particle');

      if (particle && particle instanceof Points) {
        const particlePositions = particle.geometry.attributes.position;

        for (let i = 0; i < particlePositions.count; i++) {
            const x = particlePositions.getX(i);
            const y = particlePositions.getY(i);
            const z = particlePositions.getZ(i);
            
            const waveOffsetz = Math.sin(elapsedTime + (y* 0.8 )+(x* 0.6)) * 0.03; // Adjust the amplitude and frequency as desired
            const direction = new THREE.Vector2(1, 1);
            let newZ = (z + direction.x *waveOffsetz); // Adjust the range as desired

            particlePositions.setXYZ(i, x, y, newZ);
            
        }

        // Mark the particle positions as needing an update
        particlePositions.needsUpdate = true;
        
      }
    }
    
  });

  

  
  const generateParticles = () => {
    const particleCount = 90000;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
   

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      let x: number, y: number, z: number;
      
      const check = Math.random()

    if(check<0.3){

        x = Math.random() * 5-2.5; // Adjust the range as desired
        y = Math.random()*1 -2; // Adjust the range as desired
        z = Math.random() * 0.1 - 0.05; // Adjust the range as desired

    }

    else if(check>=0.3 && check<0.6){
        x = Math.random() * 5  - 2.5; // Adjust the range as desired
        y = Math.random() * 1; // Adjust the range as desired
        z = Math.random() * 0.1 - 0.05; // Adjust the range as desired
    }

    else if(check>=0.6 && check<0.7){
        x = Math.random() * 5  - 2.5; // Adjust the range as desired
        y = Math.random() * 3 -1; // Adjust the range as desired
        z = Math.random() * 0.1 - 0.05; // Adjust the range as desired
    }
    else{

        x = Math.random() * 5 -2.5; // Adjust the range as desired
        y = Math.random() * 1 + 2; // Adjust the range as desired
        z = Math.random() * 0.1 - 0.05; // Adjust the range as desired

        

    }

      
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
      size: 0.001,
      transparent: true,
      opacity: 1,
      color:0xffffff
    });
  
    return <points name="particle" geometry={particles} material={particleMaterial} />;
  };
  

  return <group ref={groupRef}>{generateParticles()}</group>;
};
