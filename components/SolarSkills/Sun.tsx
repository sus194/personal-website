import React, { useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Sun() {
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.02;
      }
    });
    
    return (
      <group >
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/sun.jpeg')} />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[2.2, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[3.2, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[4.1, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>

       { /*<mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
            <ringGeometry args={[3.9, 4.25, 60, 8, 6.283185307179586, 6.283185307179586]} />
            <meshStandardMaterial map={new THREE.TextureLoader().load('imgs/astroid-belt.webp')} side={THREE.DoubleSide} />
    </mesh>*/}
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[6, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[8.8, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[11, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
  
        <mesh position={[0, 0, 0]} rotation={[300, 0, 0]}>
        <torusGeometry args={[12.5, 0.01, 64, 64]} />
        <meshStandardMaterial color="red" />
        </mesh>
  
      </group>
  
      
    );
  }
  