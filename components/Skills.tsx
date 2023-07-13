import { useEffect } from "react";
import * as THREE from "three";
import SceneInit from "./SolarSkills/SceneInit";
import Planet from "./SolarSkills/Planet";
import Rotation from "./SolarSkills/Rotation";

export default function Skills() {
  // let gui: { addFolder: (arg0: string) => any; };
  // const initGui = async () => {
  //   const dat = await import("dat.gui");
  //   gui = new dat.GUI();
  // };

  useEffect(() => {
    // TODO: Understand this code later.
    let test = new SceneInit();
    test.initScene();
    test.animate();

    // const sunGeometry = new THREE.BoxGeometry(8,8,8);
    // const sunMaterial = new THREE.MeshNormalMaterial();
    // const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    // const solarSystem = new THREE.Group();
    // solarSystem.add(sunMesh);
    // test.scene.add(solarSystem);

    // const sunGeometry = new THREE.SphereGeometry(8);
    // const sunTexture = new THREE.TextureLoader().load("imgs/sun.jpeg");
    // const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    // const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    // const solarSystem = new THREE.Group();
    // solarSystem.add(sunMesh);
    // test.scene.add(solarSystem);

    // const mercury = new Planet(2, 16, "imgs/mercury.png");
    // const mercuryMesh = mercury.getMesh();
    // let mercurySystem = new THREE.Group();
    // mercurySystem.add(mercuryMesh);

    // const venus = new Planet(3, 32, "imgs/venus.jpeg");
    // const venusMesh = venus.getMesh();
    // let venusSystem = new THREE.Group();
    // venusSystem.add(venusMesh);

    // const earth = new Planet(4, 48, "imgs/earth.jpeg");
    // const earthMesh = earth.getMesh();
    // let earthSystem = new THREE.Group();
    // earthSystem.add(earthMesh);

    // const mars = new Planet(3, 64, "imgs/mars.jpeg");
    // const marsMesh = mars.getMesh();
    // let marsSystem = new THREE.Group();
    // marsSystem.add(marsMesh);

    // solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem);

    // const mercuryRotation = new Rotation(mercuryMesh);
    // const mercuryRotationMesh = mercuryRotation.getMesh();
    // mercurySystem.add(mercuryRotationMesh);
    // const venusRotation = new Rotation(venusMesh);
    // const venusRotationMesh = venusRotation.getMesh();
    // venusSystem.add(venusRotationMesh);
    // const earthRotation = new Rotation(earthMesh);
    // const earthRotationMesh = earthRotation.getMesh();
    // earthSystem.add(earthRotationMesh);
    // const marsRotation = new Rotation(marsMesh);
    // const marsRotationMesh = marsRotation.getMesh();
    // marsSystem.add(marsRotationMesh);

    // // NOTE: Add solar system mesh GUI.
    // await initGui();
    // const solarSystemGui = gui.addFolder("solar system");
    // solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
    // solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
    // solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
    // solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

    //NOTE: Animate solar system at 60fps.
    // const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    // const animate = () => {
    //   sunMesh.rotation.y += 0.001;
    //   mercurySystem.rotation.y += EARTH_YEAR * 4;
    //   venusSystem.rotation.y += EARTH_YEAR * 2;
    //   earthSystem.rotation.y += EARTH_YEAR;
    //   marsSystem.rotation.y += EARTH_YEAR * 0.5;
    //   requestAnimationFrame(animate);
    // };
    // animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
