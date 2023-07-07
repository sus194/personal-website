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
            
            const waveOffsety = Math.sin(elapsedTime + (x * 0.09)) * 0.1;
            const waveOffset = Math.sin(elapsedTime + (y * 0.09)) * 0.1; // Adjust the amplitude and frequency as desired
            const newX = (x + waveOffset); // Adjust the range as desired
            const newY = (y + waveOffsety);
            particlePositions.setXYZ(i, newX, y, z);
        }

        // Mark the particle positions as needing an update
        particlePositions.needsUpdate = true;
      }
    }
  });

  const generateParticles = () => {
    const particleCount = 200000;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = Math.random() * 10 - 8;
    }

    particles.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(0xffffff),
      size: 0.01,
      transparent: true,
      opacity: 0.8,
    });

    return <points name="particle" geometry={particles} material={particleMaterial} />;
  };

  return <group ref={groupRef}>{generateParticles()}</group>;
};
