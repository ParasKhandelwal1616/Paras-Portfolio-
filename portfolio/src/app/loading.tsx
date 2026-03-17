"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const controls = {
      progress: 0,
    };

    // Fast counter simulation
    const interval = setInterval(() => {
      if (controls.progress < 100) {
        controls.progress += Math.floor(Math.random() * 5) + 1;
        setCount(Math.min(controls.progress, 100));
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Define how many "shutters" or columns you want (4-5 is standard for this look)
  const shutters = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Shutters */}
      <div className="absolute inset-0 flex">
        {shutters.map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={isComplete ? { scaleY: 0 } : { scaleY: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.83, 0, 0.17, 1], // Custom "Expo" easing for that snap look
              delay: i * 0.1, // Staggered exit
            }}
            className="flex-1 bg-neutral-950 origin-top border-x border-white/5"
          />
        ))}
      </div>

      {/* Content Layer */}
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-start w-full max-w-7xl px-10"
          >
            {/* Minimalist Counter */}
            <div className="overflow-hidden">
              <motion.span 
                className="block text-[15vw] font-light leading-none text-white tracking-tighter"
              >
                {count.toString().padStart(2, '0')}
              </motion.span>
            </div>
            
            <div className="flex justify-between w-full items-end">
               <span className="text-white/40 uppercase text-xs tracking-[0.3em]">
                System_Loading...
               </span>
               <span className="text-white/20 text-xs">
                © 2026 ARCHIVE
               </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}