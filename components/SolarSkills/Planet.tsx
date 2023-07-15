import React, { useEffect, useRef} from 'react';
import {useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export function Planet({ position, radius, texture, onClick, name }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<THREE.Mesh>(null);
    const { camera} = useThree();
  
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
      
    });
    
    useEffect(() => {
      const fontLoader = new FontLoader();
      fontLoader.load('/fonts/droid_serif_regular.typeface.json', (font) => {
        const textGeometry = new TextGeometry(name, {
          font: font,
          size: 0.2,
          height: 0.05,
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(position[0], position[1] + radius + 0.3, position[2]);
        textMesh.rotation.copy(camera.rotation);
        textRef.current?.add(textMesh);
      });
    }, []);
  
    return (
      <group>
        <mesh ref={meshRef} position={position}>
          <sphereGeometry args={[radius]} />
          <meshStandardMaterial map={texture} />
        </mesh>
  
        <mesh ref={textRef} />
  
        
        {name == 'saturn' && (
          <mesh position={position} rotation={[181, 0, 0]}>
            <ringGeometry args={[0.6, 0.9, 30, 0, 0, 6.283185307179586]} />
            <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/satrun-ring.jpeg')} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
  
      
    );
  }