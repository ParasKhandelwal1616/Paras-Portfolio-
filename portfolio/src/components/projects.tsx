'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: "NexusIDE",
    description: "A real-time collaborative cloud code editor engineered with low-latency WebSocket bridges for seamless multi-user typing and synchronized execution environments.",
    image: "/NexusIDE.png", 
    tech: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com/ParasKhandelwal1616", 
    link: "https://example.com" 
  },
  {
    title: "Sentinel EWS",
    description: "A production-grade Disaster Early Warning System featuring real-time WebSocket broadcasting, an offline-first IndexedDB vault for zero-signal environments, and multimodal AI for autonomous threat verification.",
    image: "/sentenalews.png", 
    tech: ["Next.js", "Node.js", "IndexedDB", "WebSockets", "Gemini AI"],
    github: "https://github.com/ParasKhandelwal1616", 
    link: "https://your-sentinel-live-link.vercel.app" 
  },
  {
    title: "RestForge API Workspace",
    description: "A real-time collaborative API testing and documentation platform. Engineered to allow multiple developers to concurrently build, test, and debug REST endpoints with synchronized request states.",
    image: "/api testing.png", 
    tech: ["React", "Node.js", "Socket.io", "Express", "Tailwind CSS"],
    github: "https://github.com/ParasKhandelwal1616", 
    link: "https://example.com" 
  },
  {
    title: "MITS Freshers Portal",
    description: "An end-to-end event management and registration platform engineered for the incoming freshman class. Designed to handle concurrent user registrations, featuring dynamic ticketing and a live event dashboard.",
    image: "/Mits fressers.png", 
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    github: "https://github.com/ParasKhandelwal1616", 
    link: "https://example.com" 
  },
  {
    title: "College Tech Platform",
    description: "A collaborative team development project built for the university club. Engineered with strict version control, component-driven architecture, and deployed to a production edge network.",
    image: "/club.png", 
    tech: ["Next.js", "Tailwind CSS", "GitHub Actions", "Vercel"],
    github: "https://github.com/ParasKhandelwal1616", 
    link: "https://example.com" 
  },
  {
    title: "Interactive 3D Portfolio",
    description: "A highly interactive, performance-optimized developer portfolio utilizing advanced frontend rendering, glassmorphism UI, and modern typography to showcase full-stack architecture.",
    image: "/portfalio.png", 
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Space Grotesk"],
    github: "https://github.com/ParasKhandelwal1616/my-portfolio", 
    link: "https://your-portfolio-link.vercel.app" 
  }
];

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        perspective: '1000px',
      }}
      className="group relative w-full h-[480px] rounded-3xl cursor-pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl"
      >
        {/* Background Image - Zoom corrected */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-opacity duration-700 opacity-90 group-hover:opacity-40"
          />
        </div>

        {/* Static Bottom Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Layer */}
        <div className="relative z-10 h-full p-8 flex flex-col justify-end" style={{ transform: 'translateZ(40px)' }}>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-purple-900/80 border border-purple-400/50 text-white rounded-full backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-3xl font-black text-white mb-2 tracking-tight transition-all duration-500 translate-y-16 group-hover:translate-y-0">
            {project.title}
          </h3>
          
          {/* Description & Buttons */}
          <div className="opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-200">
            <p className="text-gray-200 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex gap-4">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/20 transition-all"
              >
                <Github size={18} />
                Code
              </a>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="min-h-screen w-full bg-black py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter absolute -top-10 md:-top-20 left-0 select-none">
              PROJECTS
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white relative z-10">
              Featured <span className="text-purple-500">Projects</span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
