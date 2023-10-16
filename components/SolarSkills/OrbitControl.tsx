import { useEffect} from 'react';
import { useThree} from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export function OrbitControl() {
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