'use client'

import { useEffect, useRef, useState } from 'react'

const learningPoints = [
  {
    icon: '🦠',
    title: 'Malware Execution Flows',
    description: 'Understanding how modern malware operates and executes in target environments',
  },
  {
    icon: '🔓',
    title: 'Security Bypass Fundamentals',
    description: 'Core techniques used to circumvent security controls and detection mechanisms',
  },
  {
    icon: '🛠️',
    title: 'Custom Tooling Workflows',
    description: 'Building and deploying specialized tools for security testing and research',
  },
  {
    icon: '👻',
    title: 'Attacker Evasion Strategies',
    description: 'Methods used by threat actors to avoid detection by security systems',
  },
  // {
  //   icon: '🎯',
  //   title: 'Real Threat Actor Techniques',
  //   description: 'Analysis of actual tactics, techniques, and procedures (TTPs) used in the wild',
  // },
  {
    icon: '🖥️',
    title: 'Endpoint Bypass Strategies',
    description: 'Techniques for evading endpoint detection and response (EDR) solutions',
  },
  {
    icon: '🛡️',
    title: 'EDR/AV Evasion Basics',
    description: 'Fundamental approaches to bypass antivirus and endpoint protection',
  },
  {
    icon: '🎬',
    title: 'Practical Live Demonstrations',
    description: 'Hands-on showcase of techniques in controlled environments',
  },
  {
    icon: '🧠',
    title: 'Offensive Engineering Mindset',
    description: 'Developing the analytical thinking required for security research',
  },
  {
    icon: '💬',
    title: 'Interactive Q&A Session',
    description: 'Direct engagement with the expert for clarifications and advanced topics',
  },
]

export default function WhatYouWillLearn() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          learningPoints.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, index * 100)
          })
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section 
      id="what-you-learn"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkSecondary to-darkTertiary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What You Will <span className="gradient-text">Learn</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive learning outcomes designed to enhance your offensive security skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPoints.map((point, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-darkSecondary to-darkTertiary p-6 rounded-lg border border-primary/20 hover:border-secondary/50 transition-all duration-300 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl flex-shrink-0">{point.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

