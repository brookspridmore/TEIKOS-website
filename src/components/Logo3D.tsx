import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// Logo mesh using the actual logo image as texture
function LogoMesh({ isPaused }: { isPaused: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const logoTexture = useLoader(THREE.TextureLoader, '/images/logo-cube.png');
  
  useFrame((_, delta) => {
    if (meshRef.current && !isPaused) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  // Create materials with the logo texture
  const logoMaterial = new THREE.MeshStandardMaterial({
    map: logoTexture,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 0.3,
    metalness: 0.1,
  });

  const yellowMaterial = new THREE.MeshStandardMaterial({
    color: '#FFF59D',
    roughness: 0.3,
    metalness: 0.1,
  });

  return (
    <group ref={meshRef} rotation={[0.2, 0, 0]}>
      {/* Main logo plane - front */}
      <mesh position={[0, 0, 1.5]} material={logoMaterial}>
        <planeGeometry args={[4, 4]} />
      </mesh>

      {/* Main logo plane - back (mirrored) */}
      <mesh position={[0, 0, -1.5]} rotation={[0, Math.PI, 0]} material={logoMaterial}>
        <planeGeometry args={[4, 4]} />
      </mesh>

      {/* Side panels to give it depth */}
      {/* Top */}
      <mesh position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={yellowMaterial}>
        <planeGeometry args={[4, 3]} />
      </mesh>
      
      {/* Bottom */}
      <mesh position={[0, -2, 0]} rotation={[Math.PI / 2, 0, 0]} material={yellowMaterial}>
        <planeGeometry args={[4, 3]} />
      </mesh>
      
      {/* Left */}
      <mesh position={[-2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} material={yellowMaterial}>
        <planeGeometry args={[3, 4]} />
      </mesh>
      
      {/* Right */}
      <mesh position={[2, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={yellowMaterial}>
        <planeGeometry args={[3, 4]} />
      </mesh>

      {/* Edge lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4, 4, 3)]} />
        <lineBasicMaterial color="#1A1A1A" linewidth={4} />
      </lineSegments>

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 8]} intensity={0.9} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} />
    </group>
  );
}

// Main Component
interface Logo3DProps {
  size?: number;
  className?: string;
}

export function Logo3D({ size = 400, className = '' }: Logo3DProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <LogoMesh isPaused={isPaused} />
      </Canvas>
      
      {/* Shadow underneath */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bg-dark/15 rounded-full blur-xl pointer-events-none"
        style={{
          width: size * 0.5,
          height: size * 0.1,
          bottom: size * 0.08,
        }}
      />
    </div>
  );
}

export default Logo3D;
