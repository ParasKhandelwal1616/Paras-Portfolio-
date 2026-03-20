'use client';

import * as THREE from "three";
import React, { useRef, useMemo, Suspense, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from "framer-motion";
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

// --- PHYSICS COMPONENTS WITH INTERACTION ---

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

function PhysicsBall({ scale, material, isActive, index }: { scale: number; material: THREE.Material; isActive: boolean; index: number }) {
  const api = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);
  
  const initialPosition = useMemo(() => {
    const angle = (index / TECH_ASSETS.length) * Math.PI * 2;
    const radius = 10 + (index % 3) * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      (index % 5) - 2
    ] as [number, number, number];
  }, [index]);

  const handlePointerDown = () => {
    if (api.current) {
      // Strong impulse on click to cause a "bounce" and collisions
      api.current.applyImpulse({
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 60
      }, true);
      api.current.applyTorqueImpulse({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10
      }, true);
    }
  };

  const handlePointerEnter = () => {
    setHovered(true);
    if (api.current) {
      // Gentler push on hover
      api.current.applyImpulse({
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 15
      }, true);
    }
  };

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    const pos = api.current.translation();
    
    // Centering force
    api.current.applyImpulse({ 
      x: -pos.x * 20 * delta, 
      y: -pos.y * 20 * delta, 
      z: -pos.z * 20 * delta 
    }, true);

    // Natural "alive" movement
    const strength = 2 * delta;
    api.current.applyImpulse({
      x: Math.sin(_state.clock.elapsedTime + index) * strength,
      y: Math.cos(_state.clock.elapsedTime * 0.5 + index) * strength,
      z: Math.sin(_state.clock.elapsedTime * 0.7 + index) * strength,
    }, true);
  });

  return (
    <RigidBody
      colliders={false}
      linearDamping={0.6}
      angularDamping={0.6}
      restitution={0.9} // Higher restitution for better bouncing
      position={initialPosition}
      ref={api}
    >
      <BallCollider args={[scale]} />
      <mesh 
        scale={hovered ? scale * 1.1 : scale} 
        geometry={sphereGeometry} 
        material={material} 
        castShadow 
        receiveShadow
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={() => setHovered(false)}
      >
        {hovered && <meshStandardMaterial attach="material" color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />}
      </mesh>
    </RigidBody>
  );
}

const OriginalPhysicsScene = ({ inView }: { inView: boolean }) => {
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
        opacity: 0.5,
      });
    });
  }, [textures]);

  return (
    <Physics gravity={[0, 0, 0]}>
      {materials.map((mat, i) => (
        <PhysicsBall key={i} index={i} material={mat} scale={1.2} isActive={inView} />
      ))}
    </Physics>
  );
};

// --- FOREGROUND CARDS ---

const CarouselCard = ({ tech, index, total, rotation, sectionInView }: { tech: typeof TECH_ASSETS[0], index: number, total: number, rotation: any, sectionInView: boolean }) => {
  const [radius, setRadius] = useState(680);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setRadius(width * 0.85); // Dynamic radius for mobile
        setIsMobile(true);
      } else {
        setRadius(680);
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const angle = (index / total) * Math.PI * 2;

  const currentAngle = useTransform(rotation, (r: number) => angle + (r * Math.PI) / 180);
  const z = useTransform(currentAngle, (a) => Math.cos(a) * radius);
  const x = useTransform(currentAngle, (a) => Math.sin(a) * radius);
  
  const opacity = useTransform(z, [-radius, -radius * 0.6, 0, radius], [0, 0.4, 0.8, 1]);
  const scale = useTransform(z, [-radius, radius], [isMobile ? 0.3 : 0.4, isMobile ? 0.8 : 1.1]);
  const zIndex = useTransform(z, [-radius, radius], [0, 100]);
  const blur = useTransform(z, [-radius, -radius * 0.5, 0], [10, 5, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.04, duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        x: x,
        z: z,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        translateX: '-50%',
        translateY: '-50%',
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        pointerEvents: 'auto' // Ensure cards are still clickable
      }}
      className="w-32 h-44 md:w-48 md:h-68 cursor-pointer group"
    >
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-6 transition-all duration-500 group-hover:border-purple-500/50 group-hover:bg-white/20 group-hover:shadow-[0_0_50px_rgba(139,92,246,0.25)]">
        <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-[radial-gradient(circle_at_50%_0%,_#ffffff15_0%,_transparent_60%)]" />
        <div className="relative w-12 h-12 md:w-24 md:h-24 mb-4 md:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <Image src={tech.url} alt={tech.name} fill className="object-contain filter drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
        </div>
        <h4 className="text-white font-mono text-[10px] md:text-sm font-black tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-50 group-hover:opacity-100 transition-opacity">
          {tech.name}
        </h4>
        <div className="absolute top-[105%] left-0 w-full h-1/3 opacity-20 scale-y-[-1] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)' }}>
          <div className="w-full h-full rounded-b-2xl md:rounded-b-3xl border-t border-white/5 bg-white/5 flex flex-col items-center justify-start p-2">
             <div className="relative w-8 h-8 md:w-12 md:h-12"><Image src={tech.url} alt={tech.name} fill className="object-contain" /></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const { ref: containerRef, inView } = useInView({ threshold: 0.1 });
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { damping: 40, stiffness: 80 });

  useAnimationFrame((_time, delta) => {
    if (inView) {
      rotation.set(rotation.get() + delta * 0.015); 
    }
  });

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* INTERACTIVE PHYSICS BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-40">
        {inView && (
          <Canvas 
            shadows 
            camera={{ position: [0, 0, 25], fov: 35 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <OriginalPhysicsScene inView={inView} />

              <Environment preset="city" />
              <ambientLight intensity={0.5} />
              <spotLight position={[20, 20, 25]} intensity={1.5} angle={0.2} penumbra={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
              
              <EffectComposer>
                <N8AO aoRadius={1} intensity={2} />
                <Bloom mipmapBlur intensity={0.5} luminanceThreshold={1} />
                <Noise opacity={0.02} />
              </EffectComposer>
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* Decorative Lights */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_#8b5cf615_0%,_transparent_70%)] rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="absolute top-16 left-0 w-full px-10 z-20 pointer-events-none">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter absolute -top-10 md:-top-20 left-10 select-none">Technical</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white relative z-10">Technical <span className="text-purple-500">Stack</span></h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
        </motion.div>
      </div>

      {/* 3D Ring Container (Foreground) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none" 
           style={{ perspective: '2000px', transformStyle: 'preserve-3d', transform: 'rotateX(8deg)' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {TECH_ASSETS.map((tech, i) => (
            <CarouselCard key={tech.name} tech={tech} index={i} total={TECH_ASSETS.length} rotation={springRotation} sectionInView={inView} />
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default TechStack;
