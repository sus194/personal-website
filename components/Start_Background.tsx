import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Group, Points } from 'three';
import { useFrame } from 'react-three-fiber';
import { Clock } from 'three';

export const Start_Background = () => {
  const groupRef = useRef<Group>(null);
  const clockRef = useRef<Clock>(new Clock());
  

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
            
            const waveOffset = Math.sin(elapsedTime* 0.2 + (x )) * 0.01;
            const waveOffsetz = Math.sin(elapsedTime* 0.5 + (y )) * 0.01; // Adjust the amplitude and frequency as desired
            const direction = new THREE.Vector2(1, 1);
            let newZ = (z + waveOffsetz); // Adjust the range as desired

            
            
            let newY = (y +  direction.y *waveOffset);
            
            if (Math.abs(newZ) > 1) {
                // Adjust the position to stay within the visible area
                newZ = Math.sign(newZ) * 1; // Adjust maxDistance as needed
            }
            particlePositions.setXYZ(i, x, newY, newZ);
        }

        // Mark the particle positions as needing an update
        particlePositions.needsUpdate = true;
      }
    }
  });

  const calculateConcentration = (x: number, y: number) => {
    // Calculate the concentration based on the ovule shape
    const a = 2.0; // Adjust the major axis of the ovule
    const b = 1.0; // Adjust the minor axis of the ovule

    // Calculate the equation of the ovule shape
    const equation = (x ** 2) / (a ** 2) + (y ** 2) / (b ** 2);

    // Define the concentration based on the ovule shape
    const maxConcentration = 1.0; // Adjust the maximum concentration as desired
    const concentration = 1.0 - equation / maxConcentration;

    return concentration > 0 ? concentration : 0; // Ensure the concentration is non-negative
  };

  const generateParticles = () => {
    const particleCount = 50000;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const horizontalDistance = 0.05; // Adjust the value as desired
  
    for (let i = 0; i < particleCount; i+=3) {
      const index = i * 3;
      let x, y, z;

      const check = Math.random()

        // Define the concentration areas
        if (check < 0.2) {
            // Concentrated area (ovule shape)
            const radius = Math.random() * 0.5 + 0.5; // Adjust the radius of the ovule area
            const angle = Math.random() * Math.PI * 2;
      
            x = Math.cos(angle) * radius;
            y = Math.sin(angle) * radius;
      
            z = Math.random() * 0.1 - 0.05; // Adjust the range as desired
          } else {
            // Sparse area (outside the ovule shape)
            x = Math.random() * 10 - 5; // Adjust the range as desired
            y = Math.random() * 5 - 2.5; // Adjust the range as desired
            z = Math.random() * 0.1 - 0.05; // Adjust the range as desired
          }
      
        // Calculate the concentration at the particle's position
        const concentration = calculateConcentration(x, y);
        
      particlePositions[index] = x*concentration//Math.random() * 16 -8;
      particlePositions[index + 1] = y*concentration//Math.random() * 10 - 5;
      particlePositions[index + 2] = z*concentration//Math.random() * 0.1 - 0.05; // Adjust the range as desired
    }
  
    particles.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
  
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(0xffffff),
      size: 0.01,
      transparent: true,
      opacity: 1,
    });
  
    return <points name="particle" geometry={particles} material={particleMaterial} />;
  };
  

  return <group ref={groupRef}>{generateParticles()}</group>;
};
