'use client';

import * as THREE from "three";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom, Noise } from "@react-three/postprocessing";
import { useInView } from "react-intersection-observer";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

// Corrected Tech Stack paths from public/Images/
const TECH_ASSETS = [
  { name: "React", url: "/Images/react.png" },
  { name: "Next.js", url: "/Images/next.png" },
  { name: "TypeScript", url: "/Images/ts.png" },
  { name: "Node.js", url: "/Images/node.png" },
  { name: "Express", url: "/Images/express.png" },
  { name: "MongoDB", url: "/Images/mdb.png" },
  { name: "Docker", url: "/Images/docker.png" },
  { name: "Redis", url: "/Images/radis.png" },
  { name: "FastAPI", url: "/Images/fastapi.png" },
  { name: "MySQL", url: "/Images/mysql.png" },
  { name: "C++", url: "/Images/cpp.png" },
  { name: "Socket.io", url: "/Images/io.png" },
  { name: "Tailwind", url: "/Images/tailwind.png" },
  { name: "Python", url: "/Images/py.jpeg" },
  { name: "Redux", url: "/Images/redux.png" },
  { name: "JS", url: "/Images/js.png" },
  { name: "SQL", url: "/Images/sql.png" },
];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

interface TechBallProps {
  scale: number;
  material: THREE.Material;
  isActive: boolean;
  index: number;
}

function TechBall({ scale, material, isActive, index }: TechBallProps) {
  const api = useRef<RapierRigidBody>(null);
  
  // Use deterministic positions to satisfy strict purity rules
  const initialPosition = useMemo(() => {
    const angle = (index / TECH_ASSETS.length) * Math.PI * 2;
    const radius = 10 + (index % 3) * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (index % 5) - 2
    ] as [number, number, number];
  }, [index]);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    
    // Get current position
    const pos = api.current.translation();
    
    // Gentle centering force to keep balls in view
    api.current.applyImpulse(
      { 
        x: -pos.x * 20 * delta, 
        y: -pos.y * 20 * delta, 
        z: -pos.z * 20 * delta 
      },
      true
    );

    // Add a bit of movement to keep it "alive"
    // Using sine waves instead of Math.random to stay pure in spirit
    const strength = 2 * delta;
    api.current.applyImpulse(
      {
        x: Math.sin(_state.clock.elapsedTime + index) * strength,
        y: Math.cos(_state.clock.elapsedTime * 0.5 + index) * strength,
        z: Math.sin(_state.clock.elapsedTime * 0.7 + index) * strength,
      },
      true
    );
  });

  return (
    <RigidBody
      colliders={false}
      linearDamping={0.6}
      angularDamping={0.6}
      restitution={0.8}
      position={initialPosition}
      ref={api}
    >
      <BallCollider args={[scale]} />
      <mesh 
        scale={scale} 
        geometry={sphereGeometry} 
        material={material} 
        castShadow 
        receiveShadow
      />
    </RigidBody>
  );
}

const Scene = ({ inView }: { inView: boolean }) => {
  const textures = useTexture(TECH_ASSETS.map(t => t.url));

  const materials = useMemo(() => {
    return textures.map((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        roughness: 0.1,
        metalness: 0.2,
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 0.1,
        transparent: true,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      });
    });
  }, [textures]);

  return (
    <Physics gravity={[0, 0, 0]}>
      {materials.map((mat, i) => (
        <TechBall 
          key={i} 
          index={i}
          material={mat} 
          scale={1.2} 
          isActive={inView} 
        />
      ))}
    </Physics>
  );
};

const TechStack = () => {
  const { ref: containerRef, inView } = useInView({ threshold: 0.1 });
  
  return (
    <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h2 className="text-8xl font-black text-white opacity-5 uppercase tracking-tighter select-none">
          Tech Stack
        </h2>
      </div>

      <Canvas 
        shadows 
        camera={{ position: [0, 0, 25], fov: 35 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene inView={inView} />

          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <spotLight position={[20, 20, 25]} intensity={1.5} angle={0.2} penumbra={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
          
          <EffectComposer disableNormalPass>
            <N8AO aoRadius={1} intensity={2} />
            <Bloom mipmapBlur intensity={0.5} luminanceThreshold={1} />
            <Noise opacity={0.02} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default TechStack;
