'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [-100, 0]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#accordion-projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (!element) return;
    
    const offset = targetId === 'skills' ? -400 : 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          opacity,
          y,
          display: isVisible ? 'block' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-black/80 backdrop-blur-lg rounded-full border border-white/10 px-6 py-3 flex items-center justify-between">
            <MagneticButton href="#home" onClick={handleNavClick}>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                SP
              </span>
            </MagneticButton>
            
            <div className="flex items-center gap-4">
              <MagneticButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="text-xl">
                  {!isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        <motion.div
          className="h-full flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-4xl font-bold text-white hover:text-blue-500 transition-colors"
              onClick={handleNavClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

interface MagneticButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

function MagneticButton({ href, onClick, children }: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) + 
      Math.pow(event.clientY - centerY, 2)
    );

    const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
    const strength = Math.max(0, 1 - distance / maxDistance);

    x.set((event.clientX - centerX) * strength * 0.3);
    y.set((event.clientY - centerY) * strength * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const commonProps = {
    className: "relative inline-block cursor-pointer",
    style: {
      x: useSpring(x, { stiffness: 400, damping: 30 }),
      y: useSpring(y, { stiffness: 400, damping: 30 }),
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  if (href) {
    return (
      <motion.a href={href} {...commonProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...commonProps}>
      {children}
    </motion.button>
  );
} 