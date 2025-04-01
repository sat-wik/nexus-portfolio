'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      cursorScale.set(1.5);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      cursorScale.set(1);
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, cursorScale]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: cursorScaleSpring,
      }}
    >
      <div className={`h-8 w-8 rounded-full transition-colors duration-200 ${
        isHovering ? 'bg-white' : 'bg-white/80'
      }`} />
    </motion.div>
  );
} 