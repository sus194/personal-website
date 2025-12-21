import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

interface ProjectSceneProps {
    imagePath: string;
    type?: 'screen' | 'car' | 'map' | 'server' | 'maze' | 'calculator' | 'bot' | 'backpack' | 'hoop';
}

// 1. New component for handling texture loading (Hooks must be unconditional)
const ScreenModel = ({ imagePath }: { imagePath: string }) => {
    // Only try to load if there is a path, otherwise use a safe fallback (or error boundary will catch it)
    // However, for 'screen' type projects, we generally expect an image.
    // We used to have a fallback 'placeholder.png' which doesn't exist.
    // If imagePath is empty, useLoader might fail or return null. 
    // Let's assume imagePath is valid for screen projects.
    const texture = useLoader(TextureLoader, imagePath);

    return (
        <group>
            {/* The "Screen" Box using standard geometry */}
            <mesh>
                <boxGeometry args={[3.2, 2, 0.2]} />
                <meshStandardMaterial map={texture} />
            </mesh>
        </group>
    );
};

// 2. Main ProjectDisplay now conditionally renders ScreenModel
const ProjectDisplay = ({ imagePath, type = 'screen' }: ProjectSceneProps) => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Gentle rotation matching the object type
            const rotationSpeed = type === 'car' ? 0.3 : 0.2;
            // Map rotates slowly to show layout
            if (type === 'map') {
                meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            } else {
                meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * rotationSpeed;
            }

            if (type === 'screen') {
                meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
            }
        }
    });

    // Procedural types return immediately (no useLoader calls)
    if (type === 'map') {
        return (
            <group ref={meshRef} rotation={[0.4, 0, 0]}>
                {/* 1. Base Grid (Green/Tron style) */}
                <gridHelper args={[6, 20, 0x00ff00, 0x111111]} />
                <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[6, 6]} />
                    <meshBasicMaterial color="black" transparent opacity={0.8} />
                </mesh>

                {/* 2. Obstacles (Red Cubes) */}
                <mesh position={[-1.5, 0.25, -1.5]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#ff3333" />
                </mesh>
                <mesh position={[0.5, 0.25, 0.5]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#ff3333" />
                </mesh>
                <mesh position={[1.5, 0.25, -0.5]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#ff3333" />
                </mesh>
                <mesh position={[-0.5, 0.25, 1.5]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#ff3333" />
                </mesh>

                {/* 3. Agents (Spheres) & Paths */}
                {/* Agent 1 (Blue) */}
                <mesh position={[-2, 0.2, 2]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#3399ff" emissive="#3399ff" emissiveIntensity={0.5} />
                </mesh>
                {/* Path 1 */}
                <mesh position={[-1.2, 0.05, 1.2]} rotation={[0, -Math.PI / 4, 0]}>
                    <boxGeometry args={[0.1, 0.02, 1.5]} />
                    <meshStandardMaterial color="#3399ff" transparent opacity={0.5} />
                </mesh>

                {/* Agent 2 (Orange) */}
                <mesh position={[2, 0.2, -2]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#ff9933" emissive="#ff9933" emissiveIntensity={0.5} />
                </mesh>
                {/* Path 2 */}
                <mesh position={[1.2, 0.05, -1.2]} rotation={[0, -Math.PI / 4, 0]}>
                    <boxGeometry args={[0.1, 0.02, 1.5]} />
                    <meshStandardMaterial color="#ff9933" transparent opacity={0.5} />
                </mesh>
                {/* Agent 3 (Purple) */}
                <mesh position={[0, 0.2, 0]}>
                    <sphereGeometry args={[0.2, 32, 32]} />
                    <meshStandardMaterial color="#cc33ff" emissive="#cc33ff" emissiveIntensity={0.5} />
                </mesh>
            </group>
        );
    }

    if (type === 'maze') {
        return (
            <group ref={meshRef} rotation={[0.4, 0, 0]}>
                {/* 1. Ground (Green Grass) */}
                <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[6, 6]} />
                    <meshStandardMaterial color="#4a7a38" />
                </mesh>

                {/* 2. Trees (Green spheres on brown trunks) - scattered */}
                {/* Tree 1 */}
                <mesh position={[-2, 0.4, -2]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="#2d5a27" />
                </mesh>
                <mesh position={[-2, 0.1, -2]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>

                {/* Tree 2 */}
                <mesh position={[1.5, 0.4, 1.5]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="#2d5a27" />
                </mesh>
                <mesh position={[1.5, 0.1, 1.5]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>
                {/* Tree 3 */}
                <mesh position={[2, 0.4, -1]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color="#2d5a27" />
                </mesh>
                <mesh position={[2, 0.1, -1]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>
                {/* Tree 4 */}
                <mesh position={[-1, 0.4, 2.2]}>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial color="#2d5a27" />
                </mesh>
                <mesh position={[-1, 0.1, 2.2]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.5]} />
                    <meshStandardMaterial color="#5c4033" />
                </mesh>

                {/* 3. Mountains (Brown Cones) */}
                <mesh position={[-2.5, 0.3, 0]}>
                    <coneGeometry args={[0.4, 0.6, 4]} />
                    <meshStandardMaterial color="#8b5a2b" />
                </mesh>
                <mesh position={[0.5, 0.3, -2.5]}>
                    <coneGeometry args={[0.4, 0.6, 4]} />
                    <meshStandardMaterial color="#8b5a2b" />
                </mesh>
                <mesh position={[2.5, 0.3, 2.5]}>
                    <coneGeometry args={[0.3, 0.5, 4]} />
                    <meshStandardMaterial color="#8b5a2b" />
                </mesh>

                {/* 4. The Knight (Silver Capsule/Character) */}
                <group position={[0, 0.3, 0]}>
                    <mesh>
                        <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
                        <meshStandardMaterial color="#silver" metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Helmet Visor */}
                    <mesh position={[0, 0.1, 0.12]}>
                        <boxGeometry args={[0.2, 0.05, 0.1]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>

                {/* 5. Saw Blade Traps (Silver flattened cylinders) */}
                <mesh position={[-1, 0.1, -1]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
                    <meshStandardMaterial color="#aaa" metalness={0.8} />
                </mesh>
                <mesh position={[1, 0.1, 1]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
                    <meshStandardMaterial color="#aaa" metalness={0.8} />
                </mesh>

                {/* 6. Herbs (Blue small items) */}
                <mesh position={[-1.5, 0.1, 0.5]}>
                    <dodecahedronGeometry args={[0.1]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.5, 0.1, 1.8]}>
                    <dodecahedronGeometry args={[0.1]} />
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>

            </group>
        );
    }

    if (type === 'calculator') {
        return (
            <group ref={meshRef}>
                {/* 1. Calculator Body (Dark Grey Plastic) - thicker to be substantial */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.8, 2.8, 0.2]} />
                    <meshStandardMaterial color="#333" roughness={0.6} />
                </mesh>

                {/* 2. Screen Area (Light Grey Panel) - Raised clearly above body */}
                <mesh position={[0, 0.8, 0.12]}>
                    <boxGeometry args={[1.4, 0.6, 0.05]} />
                    <meshStandardMaterial color="#889" />
                </mesh>
                {/* Screen Text/Glass (Dark greenish box) - Raised above screen panel */}
                <mesh position={[0, 0.8, 0.15]}>
                    <boxGeometry args={[1.2, 0.4, 0.02]} />
                    <meshStandardMaterial color="#2d3a2d" roughness={0.2} metalness={0.1} />
                </mesh>

                {/* 3. Solar Panel (Dark blue/black shiny) - Raised clearly */}
                <mesh position={[0.5, 1.15, 0.12]}>
                    <boxGeometry args={[0.5, 0.2, 0.05]} />
                    <meshStandardMaterial color="#112" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* 4. Buttons (Grid of small boxes) - Raised clearly above body */}
                <group position={[0, -0.4, 0.15]}>
                    {/* Row 1 */}
                    <mesh position={[-0.5, 0.7, 0]}> <boxGeometry args={[0.25, 0.15, 0.1]} /> <meshStandardMaterial color="#666" /> </mesh>
                    <mesh position={[0, 0.7, 0]}> <boxGeometry args={[0.25, 0.15, 0.1]} /> <meshStandardMaterial color="#666" /> </mesh>
                    <mesh position={[0.5, 0.7, 0]}> <boxGeometry args={[0.25, 0.15, 0.1]} /> <meshStandardMaterial color="#d64" /> {/* ON/C */} </mesh>

                    {/* Row 2 (7 8 9 X) */}
                    <mesh position={[-0.5, 0.4, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[-0.15, 0.4, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.2, 0.4, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.55, 0.4, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#444" /> </mesh>

                    {/* Row 3 (4 5 6 -) */}
                    <mesh position={[-0.5, 0.1, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[-0.15, 0.1, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.2, 0.1, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.55, 0.1, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#444" /> </mesh>

                    {/* Row 4 (1 2 3 +) */}
                    <mesh position={[-0.5, -0.2, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[-0.15, -0.2, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.2, -0.2, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.55, -0.2, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#444" /> </mesh>

                    {/* Row 5 (0 . =) */}
                    <mesh position={[-0.35, -0.5, 0]}> <boxGeometry args={[0.6, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.2, -0.5, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#eee" /> </mesh>
                    <mesh position={[0.55, -0.5, 0]}> <boxGeometry args={[0.25, 0.2, 0.1]} /> <meshStandardMaterial color="#f90" /> {/* = */} </mesh>
                </group>
            </group>
        );
    }

    if (type === 'bot') {
        return (
            <group ref={meshRef}>
                {/* 1. Head (Discord Blurple Box/Clyde Shape) */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1.4, 1.0, 1.0]} />
                    <meshStandardMaterial color="#5865F2" roughness={0.4} />
                </mesh>

                {/* 2. Face/Logo Area (Darker inset not strictly necessary if we use white eyes on blurple) */}
                {/* We will just put the eyes directly on the blurple head to mimic the logo */}

                {/* 3. Eyes (The Discord Logo "Clyde" Eyes - White) */}
                {/* Left Eye - uniquely shaped using scaled cylinders/spheres or just simple spheres for the robot look */}
                <mesh position={[-0.35, 0.5, 0.51]} scale={[1, 0.8, 0.2]}>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} />
                </mesh>
                {/* Right Eye */}
                <mesh position={[0.35, 0.5, 0.51]} scale={[1, 0.8, 0.2]}>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} />
                </mesh>

                {/* 4. Antenna (Robot Feature) */}
                <mesh position={[0, 1.0, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                    <meshStandardMaterial color="#ccc" metalness={0.8} />
                </mesh>
                <mesh position={[0, 1.3, 0]}>
                    <sphereGeometry args={[0.15]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
                </mesh>

                {/* 5. Body (Generic Robot Body - White/Silver) */}
                <mesh position={[0, -0.6, 0]}>
                    <cylinderGeometry args={[0.6, 0.8, 1.2, 32]} />
                    <meshStandardMaterial color="#eee" metalness={0.5} roughness={0.4} />
                </mesh>

                {/* 6. Arms (Cylinders) */}
                <mesh position={[-0.9, -0.4, 0]} rotation={[0, 0, 0.5]}>
                    <capsuleGeometry args={[0.15, 1, 4, 8]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>
                <mesh position={[0.9, -0.4, 0]} rotation={[0, 0, -0.5]}>
                    <capsuleGeometry args={[0.15, 1, 4, 8]} />
                    <meshStandardMaterial color="#ddd" />
                </mesh>

            </group>
        );
    }

    if (type === 'backpack') {
        return (
            <group ref={meshRef}>
                {/* 1. Main Bag Body (Blue) */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1.5, 2.0, 0.8]} />
                    <meshStandardMaterial color="#3b82f6" roughness={0.9} /> {/* Metric Blue */}
                </mesh>
                {/* Rounded Top (Cylinder segment) - Fixed size to match depth */}
                <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} /> {/* Radius 0.4 matches depth 0.8 */}
                    <meshStandardMaterial color="#3b82f6" roughness={0.9} />
                </mesh>

                {/* 2. Front Pocket (Orange) */}
                <mesh position={[0, -0.4, 0.5]}>
                    <boxGeometry args={[1.2, 0.8, 0.4]} />
                    <meshStandardMaterial color="#fb923c" roughness={0.9} /> {/* Orange */}
                </mesh>

                {/* 3. Top Handle (Orange) */}
                <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.15, 0.05, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#fb923c" />
                </mesh>

                {/* 4. Straps (Back) - Orange */}
                <mesh position={[-0.4, 0, -0.45]}>
                    <boxGeometry args={[0.2, 1.8, 0.1]} />
                    <meshStandardMaterial color="#fb923c" />
                </mesh>
                <mesh position={[0.4, 0, -0.45]}>
                    <boxGeometry args={[0.2, 1.8, 0.1]} />
                    <meshStandardMaterial color="#fb923c" />
                </mesh>

                {/* 5. Zippers (White/Silver Lines) */}
                {/* Pocket Zipper */}
                <mesh position={[0, -0.1, 0.71]}>
                    <boxGeometry args={[1.1, 0.05, 0.02]} />
                    <meshStandardMaterial color="#eee" metalness={0.8} />
                </mesh>

            </group>
        );
    }

    if (type === 'hoop') {
        return (
            <group ref={meshRef}>
                {/* 1. Backboard (Blue Glass with White Border) */}
                <group position={[0, 1.0, -0.5]}>
                    {/* Glass */}
                    <mesh>
                        <boxGeometry args={[2.5, 1.5, 0.1]} />
                        <meshStandardMaterial color="#3b82f6" transparent opacity={0.5} roughness={0.1} metalness={0.8} />
                    </mesh>

                    {/* Inner Square (White Lines) */}
                    {/* Top Line */}
                    <mesh position={[0, 0, 0.06]}>
                        <boxGeometry args={[0.6, 0.03, 0.01]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                    {/* Bottom Line */}
                    <mesh position={[0, -0.4, 0.06]}>
                        <boxGeometry args={[0.6, 0.03, 0.01]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                    {/* Left Line */}
                    <mesh position={[-0.3, -0.2, 0.06]}>
                        <boxGeometry args={[0.03, 0.43, 0.01]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                    {/* Right Line */}
                    <mesh position={[0.3, -0.2, 0.06]}>
                        <boxGeometry args={[0.03, 0.43, 0.01]} />
                        <meshBasicMaterial color="white" />
                    </mesh>
                </group>

                {/* 2. The Rim (Orange Torus) */}
                <mesh position={[0, 0.6, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.45, 0.04, 16, 32]} />
                    <meshStandardMaterial color="#ff4500" />
                </mesh>

                {/* 3. The Net (White Cylinder/Cone Mesh) */}
                <mesh position={[0, 0.2, 0.2]} rotation={[0, 0, 0]}>
                    {/* Tapered cylinder for net shape */}
                    <cylinderGeometry args={[0.45, 0.3, 0.8, 16, 1, true]} />
                    <meshStandardMaterial color="white" wireframe={true} transparent opacity={0.6} />
                </mesh>

                {/* 4. The Basketball (Orange Sphere with Black Lines) */}
                {/* Positioned as if just swished or floating above */}
                <group position={[0, 0.8, 0.2]} rotation={[0.5, 0.5, 0]}>
                    <mesh>
                        <sphereGeometry args={[0.32, 32, 32]} />
                        <meshStandardMaterial color="#ea580c" roughness={0.4} /> {/* Basketball Orange */}
                    </mesh>
                    {/* Black Stripes */}
                    {/* Ring 1 - Vertical */}
                    <mesh>
                        <torusGeometry args={[0.32, 0.015, 16, 32]} />
                        <meshBasicMaterial color="#111" />
                    </mesh>
                    {/* Ring 2 - Horizontal */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.32, 0.015, 16, 32]} />
                        <meshBasicMaterial color="#111" />
                    </mesh>
                    {/* Ring 3 - Cross Curve */}
                    <mesh rotation={[0, Math.PI / 2, 0]}>
                        <torusGeometry args={[0.32, 0.015, 16, 32]} />
                        <meshBasicMaterial color="#111" />
                    </mesh>
                </group>

                {/* 5. Pole/Support (Dark Grey) */}
                <mesh position={[0, 0.5, -0.6]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.2, 1.5, 0.2]} />
                    <meshStandardMaterial color="#333" />
                </mesh>

            </group>
        );
    }

    if (type === 'server') {
        return (
            <group ref={meshRef}>
                {/* 1. Server Chassis (Rack Unit - Dark Grey) */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 0.4, 2]} />
                    <meshStandardMaterial color="#222" roughness={0.4} metalness={0.8} />
                </mesh>

                {/* 2. Front Face Plate (Cyan for Go) */}
                <mesh position={[0, 0, 1.01]}>
                    <planeGeometry args={[2.9, 0.35]} />
                    <meshStandardMaterial color="#00add8" /> {/* Golang Cyan */}
                </mesh>

                {/* 3. Server Vents/Grill (Black lines) */}
                <mesh position={[-0.8, 0, 1.02]}>
                    <planeGeometry args={[1, 0.2]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* 4. Status LEDs (Blinking) */}
                {/* Power LED (Green) */}
                <mesh position={[1.2, 0.05, 1.02]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#00ff00" />
                </mesh>
                {/* Activity LED (Blue - Blinking approx) */}
                <mesh position={[1.3, 0.05, 1.02]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="#0000ff" />
                </mesh>

                {/* 5. Gopher Eye/Logo approximation (Simple circles) */}
                {/* Left Eye */}
                <mesh position={[0.4, 0.05, 1.02]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="white" />
                </mesh>
                <mesh position={[0.42, 0.05, 1.03]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="black" />
                </mesh>
                {/* Right Eye */}
                <mesh position={[0.6, 0.05, 1.02]}>
                    <circleGeometry args={[0.08, 16]} />
                    <meshBasicMaterial color="white" />
                </mesh>
                <mesh position={[0.58, 0.05, 1.03]}>
                    <circleGeometry args={[0.03, 16]} />
                    <meshBasicMaterial color="black" />
                </mesh>
            </group>
        );
    }

    if (type === 'car') {
        return (
            <group ref={meshRef}>
                {/* 1. Main Chassis Plate (Black) */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2.2, 0.1, 1.4]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.5} />
                </mesh>

                {/* 2. Wheels (Mecanum style - Black/Grey) */}
                <mesh position={[-0.8, -0.3, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-0.8, -0.3, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.8, -0.3, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[0.8, -0.3, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.4, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* 3. Motor Driver (Red) */}
                <mesh position={[-0.5, 0.2, 0.3]}>
                    <boxGeometry args={[0.6, 0.3, 0.6]} />
                    <meshStandardMaterial color="#cc0000" />
                </mesh>

                {/* 4. Battery Pack (Black with Yellow bands) */}
                <group position={[0.6, 0.25, 0]}>
                    <mesh>
                        <boxGeometry args={[0.8, 0.4, 1.2]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    {/* Yellow Bands */}
                    <mesh position={[0.2, 0.01, 0]}>
                        <boxGeometry args={[0.1, 0.41, 1.22]} />
                        <meshStandardMaterial color="#ffee00" />
                    </mesh>
                    <mesh position={[-0.2, 0.01, 0]}>
                        <boxGeometry args={[0.1, 0.41, 1.22]} />
                        <meshStandardMaterial color="#ffee00" />
                    </mesh>
                </group>

                {/* 5. Raspberry Pi (Green Board + Silver Ports) */}
                <group position={[-0.6, 0.3, -0.4]}>
                    <mesh>
                        <boxGeometry args={[0.8, 0.1, 0.5]} />
                        <meshStandardMaterial color="#2d5a27" />
                    </mesh>
                    {/* USB Ports (Silver) */}
                    <mesh position={[-0.35, 0.1, 0]}>
                        <boxGeometry args={[0.15, 0.15, 0.4]} />
                        <meshStandardMaterial color="#ccc" metalness={0.8} />
                    </mesh>
                </group>

                {/* Wires (Abstract thin tubes) - Optional aesthetic touch */}
                <mesh position={[-0.2, 0.2, 0]} rotation={[0, 0, 0.5]}>
                    <cylinderGeometry args={[0.02, 0.02, 1.0, 8]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
                <mesh position={[-0.3, 0.2, 0.1]} rotation={[0, 0, -0.5]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
                    <meshStandardMaterial color="orange" />
                </mesh>

            </group>
        );
    }

    // Default or Screen type returns the new component
    return (
        <group ref={meshRef}>
            <ScreenModel imagePath={imagePath} />
        </group>
    );
};

export default ProjectDisplay;
