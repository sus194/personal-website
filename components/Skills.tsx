import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tween,Easing } from '@tweenjs/tween.js';

function Sphere({ position, radius, texture, onClick }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/sun.jpeg')} />
    </mesh>
  );
}



function OrbitControl() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    // Optionally, customize the controls' behavior
    controls.enableDamping = true; // Add smooth damping effect to camera movement
    controls.enablePan = true; // Enable panning across the scene

    return () => {
      controls.dispose(); // Clean up the controls when the component unmounts
    };
  }, [camera, gl.domElement]);

  return null;
}


function RevolveGroup({ children }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1; // Adjust the revolving speed as needed
    }
  });

  return <group ref={groupRef}>{children}</group>;
}



export default function Skills() {
  const spheres = [
    {
      position: [2, 0, 1],
      radius: 0.1,
      texture: new THREE.TextureLoader().load('imgs/earth.jpeg'),
    },
    {
      position: [2, 0, 0],
      radius: 0.3,
      texture: new THREE.TextureLoader().load('imgs/mars.jpeg'),
    },
  ];

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 3]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControl />
      <Sun/>
      <RevolveGroup>
        {spheres.map((sphere, index) => (
          <Sphere
            key={index}
            position={sphere.position}
            radius={sphere.radius}
            texture={sphere.texture} 
            onClick/>
        ))}
      </RevolveGroup>
    </Canvas>
  );
}