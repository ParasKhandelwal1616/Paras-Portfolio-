"use client";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // match your delay in page.tsx

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculated = Math.min(Math.floor((elapsed / duration) * 100), 99);
      setProgress(calculated);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-black gap-8">
      <div className="relative flex items-center justify-center h-48 w-48">
        <div className="absolute h-full w-full animate-spin rounded-full border-[6px] border-transparent border-t-white border-l-white/20"></div>
        <div className="h-full w-full rounded-full border-[6px] border-gray-900"></div>
        <div className="absolute flex flex-col items-center">
          <span className="text-white text-5xl font-mono font-black tracking-tighter">
            {progress}%
          </span>
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mt-2 animate-pulse">
            Loading
          </span>
        </div>
      </div>

      <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}