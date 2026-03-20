"use client";

import { useEffect, useRef, useState } from "react";

interface WaveLoaderProps {
  size?: number;
  duration?: number;
  progress?: number;
}

const WAVES = [
  { amp: 14, freq: 0.038, speed: 0.055, color: "rgba(2,7,30,0.95)",    yOff: 0  },
  { amp: 12, freq: 0.052, speed: 0.085, color: "rgba(7,24,82,0.90)",   yOff: 10 },
  { amp: 10, freq: 0.048, speed: 0.048, color: "rgba(13,58,158,0.88)", yOff: 20 },
  { amp: 9,  freq: 0.062, speed: 0.10,  color: "rgba(26,109,212,0.82)",yOff: 30 },
  { amp: 8,  freq: 0.055, speed: 0.07,  color: "rgba(74,174,224,0.70)",yOff: 40 },
];

function easeInOut(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export function WaveLoader({ size = 300, duration = 2000, progress }: WaveLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef   = useRef(0);
  const tRef      = useRef(0);
  const phaseRef  = useRef<"filling" | "hold" | "draining" | "pause">("filling");
  const startRef  = useRef<number | null>(null);
  const rafRef    = useRef<number>(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = size, H = size, Rc = size / 2;
    const DRAIN = duration / 2;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.beginPath();
      ctx.arc(Rc, Rc, Rc, 0, Math.PI * 2);
      ctx.clip();

      // black background when unfilled
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      const baseY = H * (1 - fillRef.current / 100);
      WAVES.forEach((w, i) => {
        ctx.beginPath();
        const waveY = baseY + w.yOff;
        ctx.moveTo(0, waveY);
        for (let x = 0; x <= W; x += 2) {
          const y =
            waveY +
            Math.sin(x * w.freq + tRef.current * w.speed * 60) * w.amp +
            Math.cos(x * w.freq * 0.65 + tRef.current * w.speed * 38 + i) * (w.amp * 0.55) +
            Math.sin(x * w.freq * 1.4 + tRef.current * w.speed * 22 + i * 2) * (w.amp * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.fill();
      });

      ctx.restore();
    }

    function tick(now: number) {
      tRef.current += 0.016;

      if (progress !== undefined) {
        fillRef.current = Math.max(0, Math.min(100, progress));
      } else {
        if (startRef.current === null) startRef.current = now;
        const elapsed = now - startRef.current;

        if (phaseRef.current === "filling") {
          const p = Math.min(elapsed / duration, 1);
          fillRef.current = easeInOut(p) * 100;
          if (p >= 1) { phaseRef.current = "hold"; startRef.current = null; }
        } else if (phaseRef.current === "hold") {
          fillRef.current = 100;
          if (elapsed > 600) { phaseRef.current = "draining"; startRef.current = null; }
        } else if (phaseRef.current === "draining") {
          const p = Math.min(elapsed / DRAIN, 1);
          fillRef.current = (1 - easeInOut(p)) * 100;
          if (p >= 1) { phaseRef.current = "pause"; startRef.current = null; }
        } else {
          fillRef.current = 0;
          if (elapsed > 400) { phaseRef.current = "filling"; startRef.current = null; }
        }
      }

      draw();
      setDisplay(Math.round(fillRef.current));
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, duration, progress]);

  return (
    <div style={{ position: "relative", width: size, height: size, display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: "50%", display: "block" }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Syne Mono', 'Courier New', monospace",
          fontSize: size * 0.11,
          fontWeight: 700,
          color: "white",
          letterSpacing: "0.04em",
          textShadow: "0 1px 8px rgba(0,0,60,0.5)",
          pointerEvents: "none",
        }}
      >
        {display}%
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#000000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 28,
        fontFamily: "'Syne Mono', 'Courier New', monospace",
      }}
    >
      <WaveLoader size={300} duration={2000} />
      <span
        style={{
          fontSize: 11, letterSpacing: "0.28em",
          color: "rgba(100,180,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        Loading
      </span>
    </div>
  );
}