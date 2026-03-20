"use client";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

export default function About() {
  // Animation variants for staggered text
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  return (
    <div className={`${spaceGrotesk.variable} relative flex min-h-screen w-full items-center justify-center bg-[#000000] overflow-hidden text-white font-sans`}>
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_#8b5cf6_10%,_transparent_10%)] opacity-15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_#8b5cf6_10%,_transparent_10%)] opacity-15 blur-3xl" />
      

        <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex absolute top-6 mx-auto text-4xl font-bold tracking-tighter"
            >
              About
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "160px" }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                className="h-1 top-9 absolute bg-gradient-to-r from-white to-transparent rounded-3xl"
              ></motion.div>
            </motion.h1>
        
      <div className="flex flex-col md:flex-row items-center gap-20 px-10 z-10">

      
        {/* Left Section: Image with Hover Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="group relative w-[450px] h-[450px] rounded-2xl p-2 border border-white/10 shadow-2xl overflow-hidden transition-all duration-500 hover:border-[#8b5cf6]/50 hover:shadow-[#8b5cf6]/20"
        >
          {/* Animated Gradient Border Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src="/my_photo.png"
              alt="My Photo"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Right Section: Text with Staggered Animation */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            
            {/* The White Line you asked for */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-white to-transparent"
            />
          </div>

          <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
            <p>
              I am a <span className="text-white">Full-Stack Engineer</span> who specializes in building resilient, real-time systems.
            </p>
            
            <p>
              I don&apos;t just build web apps; I architect solutions for complex problems—from 
              <span className="text-[#8b5cf6]"> offline-first data caching</span> in zero-signal environments to 
              <span className="text-[#8b5cf6]"> low-latency WebSocket bridges</span>.
            </p>

            <p>
              My core stack runs on <span className="text-white">Next.js and Node.js</span>, but my real focus is on scalable system design and writing C++ algorithms that execute with optimal efficiency.
            </p>

            <motion.div 
              variants={fadeInUp}
              className="pt-4"
            >
              <div className="inline-block px-4 py-2 border border-white/10 rounded-full bg-white/5 text-sm text-white hover:bg-white/10 transition-colors cursor-default">
                Available for high-performing teams
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


