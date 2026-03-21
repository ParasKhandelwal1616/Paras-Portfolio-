'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import { ExternalLink, FileText } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});

const EXPERIENCES = [
  {
    role: "Full Stack Engineering Intern",
    company: "CRITSO",
    location: "Mumbai, India (Remote)",
    date: "July 2025 — Oct 2025",
    description: [
      "Engineered core modules for 'Accountify,' a scalable Semi-ERP billing platform, directly enhancing enterprise application functionality.",
      "Architected and implemented production-grade automation scripts for high-frequency data extraction and reporting, improving workflow efficiency by 30%.",
      "Architected secure REST APIs and optimized database schemas to handle complex enterprise accounting data and automated reporting.",
      "Delivered end-to-end full-stack features in an agile, remote environment, maintaining strict production-level coding standards."
    ],
    tech: ["React.js","Next.js","Typescript", "Postgress", "FastApi", "Rust", "REST APIs", "Automation"],
    certificate: "https://drive.google.com/file/d/1LjfUPiEcWiYSLKnHXZbZed2gBUFGQ6P6/view?usp=sharing"
  },
  {
    role: "Development Lead",
    company: "Heritage and Tourism Club | MITS-DU",
    location: "Gwalior, India",
    date: "Jan 2025 — Present",
    description: [
      "Directed a team of 5+ developers to architect and deploy the official university club platform, driving a 40% increase in event registrations.",
      "Engineered a concurrent, real-time MERN-stack quiz application capable of handling 200+ simultaneous users without latency drops or database lockups.",
      "Implemented strict version control and component-driven architecture for seamless team deployments."
    ],
    tech: ["Next.js", "Node.js", "Tailwind CSS", "Vercel", "Git"]
  }
];

const Experience = () => {
  return (
    <section className={`${spaceGrotesk.variable} font-sans min-h-screen w-full bg-black py-32 px-6 md:px-12 relative overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-black text-white/5 uppercase tracking-tighter absolute -top-10 md:-top-20 left-0 select-none whitespace-nowrap">
              EXPERIENCE
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white relative z-10">
              Professional <span className="text-purple-500">Journey</span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot with Glow */}
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-purple-500 ring-4 ring-black transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_20px_#a855f7]" />

              {/* Glassmorphism Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl transition-all duration-500 hover:border-purple-500/30 hover:shadow-purple-500/5 hover:-translate-y-1">
                
                {/* Header: Role, Company & Date */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-purple-500 font-bold mt-1 tracking-wide">{exp.company}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">{exp.location}</p>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-bold text-gray-400 tracking-wider whitespace-nowrap self-start">
                    {exp.date}
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-4 mb-8">
                  {exp.description.map((bullet, i) => (
                    <li key={i} className="text-gray-400 text-sm md:text-base font-medium leading-relaxed flex items-start group/bullet">
                      <span className="text-purple-500 mr-4 mt-1.5 text-xs transition-transform duration-300 group-hover/bullet:translate-x-1">▹</span>
                      <span className="transition-colors duration-300 group-hover:text-gray-200">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer: Tech Stack & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 max-w-md">
                    {exp.tech.map((t) => (
                      <span 
                        key={t} 
                        className="px-3 py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-purple-900/20 border border-purple-500/30 text-purple-300 rounded-full backdrop-blur-md transition-all duration-300 group-hover:border-purple-500/60 group-hover:bg-purple-900/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  {exp.certificate && (
                    <a 
                      href={exp.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white text-xs md:text-sm font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20 whitespace-nowrap group/btn"
                    >
                      <FileText size={18} className="transition-transform group-hover/btn:scale-110" />
                      View Certificate
                      <ExternalLink size={14} className="opacity-50" />
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
