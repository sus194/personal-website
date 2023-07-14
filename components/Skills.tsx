import React, { useEffect, useRef } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer(
    {
      canvas: canvasRef.current!,
      antialias: true,
    }
  );
  renderer.setSize( window.innerWidth, window.innerHeight );
  const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
  const sphere = new THREE.Mesh( geometry, material ); 
  scene.add( sphere );
  return (
    <canvas ref={canvasRef}/>
  );
}
