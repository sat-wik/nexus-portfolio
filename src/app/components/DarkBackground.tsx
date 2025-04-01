'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="h-8 w-8 rounded-full bg-white" />
    </motion.div>
  );
}

function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />
      
      {/* Animated lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
              style={{
                top: `${i * 15}%`,
                transform: 'translateY(-50%)',
                animation: `lineFloat ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        <div 
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]"
          style={{ animation: 'float 10s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]"
          style={{ animation: 'float 12s ease-in-out infinite reverse' }}
        />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

export default function DarkBackground() {
  return (
    <>
      <Cursor />
      <div className="fixed inset-0 -z-10 bg-black">
        <AnimatedGradient />
      </div>
      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(5%, 5%);
          }
          50% {
            transform: translate(-5%, 2%);
          }
          75% {
            transform: translate(2%, -5%);
          }
        }

        @keyframes lineFloat {
          0%, 100% {
            transform: translateX(0) translateY(-50%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-10%) translateY(-50%);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
} 