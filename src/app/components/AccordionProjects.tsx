'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AccordionProjects.module.css';
import { SiReact, SiNextdotjs, SiThreedotjs, SiOpenai, SiTailwindcss, SiTypescript, SiPrisma, SiMongodb, SiPostgresql, SiPython, SiDjango, SiFirebase, SiAmazon } from 'react-icons/si';
import { TbBrandThreejs, TbBrandFramerMotion, TbSeo } from 'react-icons/tb';
import { BiLogoBlender, BiLogoUnity } from 'react-icons/bi';
import { DiNodejs } from 'react-icons/di';
import { BsRobot, BsGlobe2, BsFillDatabaseFill } from 'react-icons/bs';
import { FaFigma, FaDocker, FaMobileAlt } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';
import { GiArtificialIntelligence, GiVirtualMarker } from 'react-icons/gi';
import { MdAnimation, MdDesignServices } from 'react-icons/md';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

interface AccordionProjectsProps {
  projects: Project[];
}

const getProjectIcon = (project: Project) => {
  const title = project.title.toLowerCase();
  const techs = project.technologies.map(t => t.toLowerCase());

  // Stock Market Platform
  if (title.includes('stock market')) {
    return <SiPython size={32} />;  // Primary tech is Python with TensorFlow
  }

  // AWS Helper Extension
  if (title.includes('aws')) {
    return <SiAmazon size={32} />;  // AWS-focused project
  }

  // Lectura
  if (title.includes('lectura')) {
    return <SiReact size={32} />;  // React-based learning platform
  }

  // OfferFlow
  if (title.includes('offerflow')) {
    return <SiMongodb size={32} />;  // MongoDB-based tracking system
  }

  // Fallback based on primary technology
  if (techs.includes('python')) {
    return <SiPython size={32} />;
  }
  if (techs.includes('typescript')) {
    return <SiTypescript size={32} />;
  }
  if (techs.includes('react')) {
    return <SiReact size={32} />;
  }
  if (techs.includes('mongodb')) {
    return <SiMongodb size={32} />;
  }
  if (techs.includes('node.js') || techs.includes('nodejs')) {
    return <DiNodejs size={32} />;
  }

  // Default icon if no specific match
  return <MdDesignServices size={32} />;
};

export default function AccordionProjects({ projects }: AccordionProjectsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Preload images
    projects.forEach(project => {
      const img = new Image();
      img.src = project.image;
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, project.image]));
      };
    });
  }, [projects]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // Set initial grid columns based on projects length
    const initialCols = new Array(projects.length).fill('150px').join(' ');
    list.style.setProperty('grid-template-columns', initialCols);

    const items = list.querySelectorAll('li');

    const handleMouseEnter = (event: Event) => {
      const target = event.target as HTMLElement;
      const closest = target.closest('li');
      
      if (closest) {
        const index = [...items].indexOf(closest as HTMLLIElement);
        setActiveIndex(index);
        const cols = new Array(projects.length)
          .fill(null)
          .map((_, i) => {
            items[i].setAttribute('data-active', (index === i).toString());
            return index === i ? '800px' : '150px';
          })
          .join(' ');
        list.style.setProperty('grid-template-columns', cols);
      }
    };

    const handleMouseLeave = () => {
      setActiveIndex(null);
      items.forEach(item => item.setAttribute('data-active', 'false'));
      const cols = new Array(projects.length).fill('150px').join(' ');
      list.style.setProperty('grid-template-columns', cols);
    };

    // Event listeners for each item
    items.forEach(item => {
      item.addEventListener('mouseenter', handleMouseEnter);
    });

    // Event listener for the list container
    list.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      items.forEach(item => {
        item.removeEventListener('mouseenter', handleMouseEnter);
      });
      list.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [projects.length]);

  return (
    <div className={styles.container}>
      <ul ref={listRef} className={styles.gridContainer}>
        {projects.map((project, index) => (
          <motion.li
            key={project.title}
            className={styles.gridItem}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            data-active="false"
          >
            <div className={styles.card}>
              <div className={`${styles.imageContainer} ${loadedImages.has(project.image) ? styles.loaded : ''}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.technologies}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Project
                  </a>
                </div>
              </div>
              <div className={styles.sidewaysTitle}>{project.title}</div>
              <div className={styles.icon}>
                {getProjectIcon(project)}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
} 