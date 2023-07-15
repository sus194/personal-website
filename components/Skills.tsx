import React from 'react';
import { Canvas} from 'react-three-fiber';
import * as THREE from 'three';
import { RevolveGroup} from './SolarSkills/RevolveGroup';
import { Planet } from './SolarSkills/Planet';
import { Sun } from './SolarSkills/Sun';

import { OrbitControl } from './SolarSkills/OrbitControl';

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
            <Planet
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