'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './TransitionSection.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiAmazon,
  SiRust,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiMongodb,
  SiReact,
  SiDocker,
  SiPytorch,
  SiPostgresql
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'

gsap.registerPlugin(ScrollTrigger)

const Tooltip = ({ label, experience, description }: { label: string; experience: string; description: string }) => (
  <div className={styles.tooltipContent}>
    <span className={styles.tooltipLabel}>{label}</span>
    <span className={styles.tooltipExperience}>{experience}</span>
    <span className={styles.tooltipDescription}>{description}</span>
  </div>
);

const techIcons = [
  { 
    icon: <SiJavascript />, 
    label: 'JavaScript',
    experience: 'Advanced',
    description: '4+ years building web applications and full-stack solutions'
  },
  { 
    icon: <SiTypescript />, 
    label: 'TypeScript',
    experience: 'Advanced',
    description: '3+ years with type-safe development and complex applications'
  },
  { 
    icon: <DiJava />, 
    label: 'Java',
    experience: 'Intermediate',
    description: '2+ years with enterprise applications and backend development'
  },
  { 
    icon: <SiPython />, 
    label: 'Python',
    experience: 'Advanced',
    description: '5+ years with data science, ML, and backend development'
  },
  { 
    icon: <SiC />, 
    label: 'C',
    experience: 'Intermediate',
    description: '2+ years with systems programming and embedded systems'
  },
  { 
    icon: <SiCplusplus />, 
    label: 'C++',
    experience: 'Intermediate',
    description: '1+ years with performance-critical applications'
  },
  { 
    icon: <SiAmazon />, 
    label: 'AWS',
    experience: 'Advanced',
    description: '2+ years with cloud architecture and deployment'
  },
  { 
    icon: <SiRust />, 
    label: 'Rust',
    experience: 'Intermediate',
    description: '1+ years with systems programming and web assembly'
  },
  { 
    icon: <SiHtml5 />, 
    label: 'HTML5',
    experience: 'Advanced',
    description: '5+ years with semantic markup and accessibility'
  },
  { 
    icon: <SiCss3 />, 
    label: 'CSS3',
    experience: 'Advanced',
    description: '5+ years with responsive design and animations'
  },
  { 
    icon: <SiNextdotjs />, 
    label: 'Next.js',
    experience: 'Advanced',
    description: '2+ years with server-side rendering and modern web apps'
  },
  { 
    icon: <SiMongodb />, 
    label: 'MongoDB',
    experience: 'Advanced',
    description: '3+ years with NoSQL databases and data modeling'
  },
  { 
    icon: <SiReact />, 
    label: 'React',
    experience: 'Advanced',
    description: '4+ years with component architecture and state management'
  },
  { 
    icon: <SiDocker />, 
    label: 'Docker',
    experience: 'Intermediate',
    description: '2+ years with containerization and microservices'
  },
  { 
    icon: <SiPytorch />, 
    label: 'PyTorch',
    experience: 'Intermediate',
    description: '2+ years with deep learning and neural networks'
  },
  { 
    icon: <SiPostgresql />, 
    label: 'PostgreSQL',
    experience: 'Advanced',
    description: '3+ years with relational databases and SQL optimization'
  }
]

export default function TransitionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInBlackSection, setIsInBlackSection] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [visibleIcons, setVisibleIcons] = useState<number[]>([])
  const [spotlightSize, setSpotlightSize] = useState(200)
  const [isLightMode, setIsLightMode] = useState(false)
  const [showLightSwitch, setShowLightSwitch] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Create timeline for the transition
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          section.style.setProperty('--transition-progress', self.progress.toString())
          // Show tech grid when in black section (40-60%)
          setIsInBlackSection(self.progress >= 0.4 && self.progress <= 0.6)
          // Show light switch after the black section (60%)
          setShowLightSwitch(self.progress >= 0.6)
        }
      },
    })

    // Handle cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      if (isInBlackSection && !isLightMode) {
        setCursorPosition({ x: e.clientX, y: e.clientY })
        section.style.setProperty('--cursor-x', `${e.clientX}px`)
        section.style.setProperty('--cursor-y', `${e.clientY}px`)

        // Check for icons under cursor
        const icons = document.querySelectorAll(`.${styles.techIcon}`)
        const newVisibleIcons: number[] = []
        let isOverIcon = false
        
        icons.forEach((icon, index) => {
          const rect = icon.getBoundingClientRect()
          const isUnderCursor = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          )
          if (isUnderCursor) {
            newVisibleIcons.push(index)
            isOverIcon = true
          }
        })

        // Adjust spotlight size based on whether it's over an icon
        setSpotlightSize(isOverIcon ? 250 : 200)
        section.style.setProperty('--spotlight-size', `${spotlightSize}px`)
        setVisibleIcons(newVisibleIcons)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      transitionTl.kill()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isInBlackSection, spotlightSize, isLightMode])

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode)
    // Show all icons when light mode is enabled
    if (!isLightMode) {
      setVisibleIcons(Array.from({ length: techIcons.length }, (_, i) => i))
    } else {
      setVisibleIcons([])
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.section} ${isLightMode ? styles.lightMode : ''}`}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>What have I been experimenting with?</h2>
      </div>

      <div className={`${styles.techGrid} ${isInBlackSection ? styles.visible : ''}`}>
        {techIcons.map((tech, index) => (
          <div
            key={index}
            className={`${styles.techIcon} ${visibleIcons.includes(index) ? styles.visible : ''} ${index < 4 ? styles.topRow : ''}`}
          >
            {tech.icon}
            <div className={styles.tooltip}>
              <Tooltip 
                label={tech.label}
                experience={tech.experience}
                description={tech.description}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.spotlight} ${isInBlackSection && !isLightMode ? styles.visible : ''}`} />

      <div className={`${styles.lightSwitchContainer} ${showLightSwitch ? styles.visible : ''}`}>
        <span className={styles.lightSwitchText}>Can't see?</span>
        <button 
          className={`${styles.lightSwitch} ${isLightMode ? styles.lightMode : ''}`}
          onClick={toggleLightMode}
          aria-label="Toggle light mode"
        >
          <div className={styles.lightSwitchToggle} />
        </button>
      </div>
    </section>
  )
} 