import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tween,Easing } from '@tweenjs/tween.js';

function Sphere({ position, radius, texture, onClick, name }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[radius]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {name == 'satrun' && (
        <mesh position={position} rotation={[181, 0, 0]}>
          <ringGeometry args={[0.6, 0.9, 30, 0, 0, 6.283185307179586]} />
          <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/satrun-ring.jpeg')} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>

    
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  
  
  return (
    <group >
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/sun.jpeg')} />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[1.5, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[2.2, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[2.6, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[3.6, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[5.1, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[7.6, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[11, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>


      <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
      <torusGeometry args={[12.5, 0.02, 64, 64]} />
      <meshStandardMaterial color="gray" />
      </mesh>

    </group>

    
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
      x:1.5,
      z:0,
      name:"mercury",
      radius: 0.1,
      texture: new THREE.TextureLoader().load('imgs/mercury.png'),
    },
    {
      x:2.3,
      z:2,
      name:"venus",
      radius: 0.18,
      texture: new THREE.TextureLoader().load('imgs/venus.jpeg'),
    },

    {
      x:0,
      z:-2.6,
      name:"earth",
      radius: 0.2,
      texture: new THREE.TextureLoader().load('imgs/earth.jpeg'),
    },
    {
      x:1,
      z:-5,
      name:"mars",
      radius: 0.2,
      texture: new THREE.TextureLoader().load('imgs/mars.jpeg'),
    },

    {
      x:5,
      z:0,
      name:"jupiter",
      radius: 0.7,
      texture: new THREE.TextureLoader().load('imgs/jupiter.jpeg'),
    },
    {
      x:10,
      z:3.5,
      name:"satrun",
      radius: 0.46,
      texture: new THREE.TextureLoader().load('imgs/satrun.webp'),
    },

    {
      x:0,
      z:-11,
      name:"uranus",
      radius: 0.5,
      texture: new THREE.TextureLoader().load('imgs/uranus.jpeg'),
    },
    {
      x:-5,
      z:-17,
      name:"neptune",
      radius: 0.5,
      texture: new THREE.TextureLoader().load('imgs/neptune.jpeg'),
    },
  ];


  const numSpheres = spheres.length;
  
  const angleIncrement = (2 * Math.PI) / numSpheres;

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[5, 5, 3]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControl />
      <Sun/>
      <RevolveGroup>
      {spheres.map((sphere, index) => {
          const angle = index * angleIncrement;
          const x = sphere.x * Math.cos(angle);
          const z = sphere.z * Math.sin(angle);
          const position = [x, 0, z];
          return (
            <Sphere
              key={index}
              position={position}
              radius={sphere.radius}
              texture={sphere.texture}
              name = {sphere.name}
              onClick
            />
          );
        })}
      </RevolveGroup>
    </Canvas>
  );
}