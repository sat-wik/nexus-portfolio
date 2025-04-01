'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import FloatingNav from './components/FloatingNav';
import DarkBackground from './components/DarkBackground';
import InteractiveCursor from './components/InteractiveCursor';
import CustomScrollbar from './components/CustomScrollbar';
import AccordionProjects from './components/AccordionProjects';
import ParticleText from './components/ParticleText';
import TransitionSection from './components/TransitionSection';

const projects = [
  {
    title: 'Stock Market Platform',
    description: 'A comprehensive real-time stock market monitoring and prediction platform featuring ML-based price predictions, interactive dashboards, and WebSocket-powered live updates.',
    image: '/projects/stock-market.avif',
    technologies: ['Node.js', 'React', 'Python', 'TensorFlow', 'PostgreSQL'],
    link: 'https://github.com/sat-wik/stock-market-platform'
  },
  {
    title: 'AWS Helper Extension',
    description: 'A browser extension built with React and TypeScript that simplifies AWS resource management and monitoring, featuring a Python backend for AWS service integration.',
    image: '/projects/aws-helper.webp',
    technologies: ['TypeScript', 'React', 'Python', 'AWS SDK', 'Vite'],
    link: 'https://github.com/sat-wik/aws-helper-extension'
  },
  {
    title: 'Lectura',
    description: 'An innovative web application that enhances online learning by generating unlimited testing resources and promoting better study habits through interactive features.',
    image: '/projects/lectura.avif',
    technologies: ['JavaScript', 'React', 'Node.js', 'CSS'],
    link: 'https://github.com/sat-wik/Lectura'
  },
  {
    title: 'OfferFlow',
    description: 'A comprehensive job application tracking system with a dashboard for managing applications, interviews, and offers, featuring real-time updates.',
    image: '/projects/offerflow.avif',
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/sat-wik/OfferFlow'
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [1, 0]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <main className="relative min-h-screen">
      <InteractiveCursor />
      <CustomScrollbar />
      <FloatingNav />
      <DarkBackground />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
        <Parallax translateY={[-20, 20]} className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="text-6xl md:text-8xl font-bold">Hello, I'm</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <ParticleText text="SATWIK" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300"
              >
                Full Stack Developer
              </motion.p>
            </motion.div>
          </div>
        </Parallax>
      </section>

      {/* Skills Portal */}
      <section id="skills">
        <TransitionSection />
      </section>

      {/* Projects Section */}
      <section id="accordion-projects" className="py-20 w-full">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Featured Projects
          </motion.h2>
          <div className="w-full flex justify-center">
            <AccordionProjects projects={projects} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4 relative flex items-center">
        <Parallax translateY={[-20, 20]} className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Let's Work Together
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              Have a project in mind? Let's bring it to life.
            </motion.p>
            <motion.a
              href="mailto:your.email@example.com"
              className="interactive inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </Parallax>
      </section>
    </main>
  );
}
