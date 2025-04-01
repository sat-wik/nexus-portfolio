'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  const [isHovering, setIsHovering] = useState(false);
  
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useSpring(isHovering ? 1.2 : 1, {
    stiffness: 400,
    damping: 30
  });

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50"
      style={{ opacity }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <motion.div
        className="w-1.5 h-32 rounded-full bg-white/20 backdrop-blur-sm"
        style={{ scale }}
      >
        <motion.div
          className="w-full rounded-full bg-gradient-to-b from-blue-500 to-purple-500"
          style={{ height }}
        />
      </motion.div>
    </motion.div>
  );
} 