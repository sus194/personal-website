import React, { useRef} from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';



export function RevolveGroup({ children }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
      if (groupRef.current) {
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.1; // Adjust the revolving speed as needed
      }
    });
  
    return <group ref={groupRef}>{children}</group>;
  }