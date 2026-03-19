'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const titles = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Specialist",
  "MERN Stack Developer",
  "Creative Developer & Designer",
  "Software Engineer",
  "Open Source Contributor",
  "Systems & Tools Developer",
  "Cloud & DevOps Engineer",
  "Real-Time Systems Developer",
];

export default function Landing() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "erasing">("typing");

  useEffect(() => {
    const current = titles[titleIndex];

    if (phase === "typing") {
      if (displayedText.length < current.length) {
        const t = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        }, 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("erasing"), 1800);
        return () => clearTimeout(t);
      }
    }

    if (phase === "erasing") {
      if (displayedText.length > 0) {
        const t = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 35);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setTitleIndex((i) => (i + 1) % titles.length);
          setPhase("typing");
        }, 400);
        return () => clearTimeout(t);
      }
    }
  }, [displayedText, phase, titleIndex]);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#000000] overflow-hidden text-white">
<p className="text-xs absolute top-5 uppercase tracking-[0.3em] text-purple-400 font-mono z-30">
  &lt; Welcome to my portfolio /&gt;
</p>

<a 
  href="https://drive.google.com/file/d/11LhUBdsIoAU_OSChcArDIMsIWgHk-1BL/view?usp=drive_link"  
  target="_blank" 
  rel="noopener noreferrer"
  className="absolute top-16 z-30"
>
  <button className="px-5 py-2 rounded-lg border border-purple-700/60 hover:border-purple-500 hover:bg-purple-900/30 transition-colors text-sm font-semibold cursor-pointer">
    Resume
  </button>
</a>
      

      {/* 🔥 Purple Glow Background */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,_#8b5cf6_0%,_transparent_1%)] 
        opacity-15 blur-2xl">
      </div>

      {/* ── DESKTOP (md+): your original layout, completely untouched ── */}
      <div className="relative z-10 hidden md:flex w-full max-w-8xl items-center justify-between px-20">

        {/* LEFT */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-4 max-w-md"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono">
            Hello I&apos;m
          </p>
          <h1 className="text-7xl font-black leading-none tracking-tight">
            <span className="block text-white">Paras</span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Khandelwal
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-2 rounded-xl border border-purple-900/60 bg-[#0d1117]/80 backdrop-blur-sm p-4 font-mono text-sm shadow-lg shadow-purple-900/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-slate-500 text-xs">portfolio.ts</span>
            </div>
            <p>
              <span className="text-blue-400">const</span>{" "}
              <span className="text-green-400">developer</span>{" "}
              <span className="text-white">=</span>{" "}
              <span className="text-yellow-400">&#123;</span>
            </p>
            <p className="pl-4 text-slate-300">
              <span className="text-blue-300">name</span>:{" "}
              <span className="text-orange-300">&quot;Paras Khandelwal&quot;</span>,
            </p>
            <p className="pl-4 text-slate-300">
              <span className="text-blue-300">location</span>:{" "}
              <span className="text-orange-300">&quot;India 🇮🇳&quot;</span>,
            </p>
            <p className="pl-4 text-slate-300">
              <span className="text-blue-300">passion</span>:{" "}
              <span className="text-orange-300">&quot;Building cool stuff&quot;</span>,
            </p>
            <p className="pl-4 text-slate-300">
              <span className="text-blue-300">openToWork</span>:{" "}
              <span className="text-green-400">true</span>
            </p>
            <p className="text-yellow-400">&#125;</p>
          </motion.div>
        </motion.div>

        {/* CENTER IMAGE — ORIGINAL UNTOUCHED */}
        <div className="relative w-[900] h-[500]">
          <Image
            src="/my_photo.png"
            alt="My Photo"
            width={1100}
            height={1100}
            className="z-20"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 
            bg-[radial-gradient(circle,_#8b5cf6,_transparent_60%)] 
            blur-xl opacity-30">
          </div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-right flex flex-col items-end gap-4 max-w-sm"
        >
          <p className="text-sm uppercase tracking-widest text-purple-400 font-mono">
            Open Source Enthusiast
          </p>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">
              I am a
            </span>
            <h1 className="text-4xl font-bold leading-tight min-h-[3rem] flex items-center justify-end">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                {displayedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 inline-block w-[3px] h-[2.5rem] bg-purple-400 rounded-full align-middle"
              />
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-end gap-2"
          >
            {["Next.js", "TypeScript", "Node.js", "MongoDB", "Docker", "Redis"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="px-3 py-1 rounded-full border border-purple-700/50 bg-purple-900/20 text-purple-300 text-xs font-mono backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex gap-3 mt-1"
          >
            <a href="https://github.com/ParasKhandelwal1616" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-semibold shadow-lg shadow-purple-900/40">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/paras-khandelwal/" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-purple-700/60 hover:border-purple-500 hover:bg-purple-900/30 transition-colors text-sm font-semibold">
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── MOBILE (<md): stacked layout ── */}
      <div className="relative z-10 flex md:hidden w-full flex-col items-center gap-6 px-6 pt-16 pb-10">

        {/* Photo — circle, no border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-44 h-44 rounded-full overflow-hidden flex-shrink-0"
        >
          <Image
            src="/my_photo.png"
            alt="My Photo"
            fill
            className="object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_#8b5cf6,_transparent_60%)] blur-xl opacity-30" />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-2">
            Hello I&apos;m
          </p>
          <h1 className="text-5xl font-black leading-none tracking-tight">
            <span className="block text-white">Paras</span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Khandelwal
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center flex flex-col items-center gap-1"
        >
          <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">I am a</span>
          <h2 className="text-2xl font-bold min-h-[2.5rem] flex items-center justify-center">
            <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              {displayedText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1 inline-block w-[2px] h-[2rem] bg-purple-400 rounded-full align-middle"
            />
          </h2>
        </motion.div>

        {/* Code block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full rounded-xl border border-purple-900/60 bg-[#0d1117]/80 backdrop-blur-sm p-4 font-mono text-xs shadow-lg shadow-purple-900/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-500 text-xs">portfolio.ts</span>
          </div>
          <p><span className="text-blue-400">const</span> <span className="text-green-400">developer</span> <span className="text-white">=</span> <span className="text-yellow-400">&#123;</span></p>
          <p className="pl-4 text-slate-300"><span className="text-blue-300">name</span>: <span className="text-orange-300">&quot;Paras Khandelwal&quot;</span>,</p>
          <p className="pl-4 text-slate-300"><span className="text-blue-300">location</span>: <span className="text-orange-300">&quot;India 🇮🇳&quot;</span>,</p>
          <p className="pl-4 text-slate-300"><span className="text-blue-300">passion</span>: <span className="text-orange-300">&quot;Building cool stuff&quot;</span>,</p>
          <p className="pl-4 text-slate-300"><span className="text-blue-300">openToWork</span>: <span className="text-green-400">true</span></p>
          <p className="text-yellow-400">&#125;</p>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {["Next.js", "TypeScript", "Node.js", "MongoDB", "Docker", "Redis"].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full border border-purple-700/50 bg-purple-900/20 text-purple-300 text-xs font-mono">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex gap-3"
        >
          <a href="https://github.com/ParasKhandelwal1616" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-semibold shadow-lg shadow-purple-900/40">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/paras-khandelwal/" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg border border-purple-700/60 hover:border-purple-500 hover:bg-purple-900/30 transition-colors text-sm font-semibold">
            LinkedIn
          </a>
        </motion.div>
      </div>

    </main>
  );
}