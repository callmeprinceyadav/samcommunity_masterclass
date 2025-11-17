'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import aashish1Image from '../AASHISH1.jpeg'

export default function AboutSpeaker() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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

  const expertiseAreas = [
    'Advanced Malware Analysis & Reverse Engineering',
    'Security Bypass Techniques & Evasion Strategies',
    'Custom Security Tooling Development',
    'Offensive Security Research & Red Team Operations',
    'Endpoint Detection & Response (EDR) Analysis',
  ]

  const achievements = [

    'Trained over Thousands of cybersecurity professionals',
    'Speaker at multiple security conferences and workshops',
    'Published research on advanced evasion techniques',
    'Consultant for enterprise security assessments',
  ]

  return (
    <section 
      id="about-speaker"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkTertiary to-darkSecondary"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About The <span className="gradient-text">Speaker</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className={`bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-primary/20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            {/* Speaker Image with Advanced Design - Better Visibility */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
              <div className="relative group">
                <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary p-2 pulse-glow shadow-2xl shadow-primary/40">
                  <div className="w-full h-full rounded-2xl bg-dark flex items-center justify-center border-4 border-secondary/60 overflow-hidden relative">
                    <Image
                      src={aashish1Image}
                      alt="Aashish Kumar - Co-Founder of MCyber Academy"
                      fill
                      className="object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 288px, 320px"
                      priority
                      quality={95}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl"></div>
                  </div>
                </div>
                {/* Decorative Corner Elements */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary rounded-full opacity-70 blur-sm animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-primary rounded-full opacity-70 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-secondary/25 blur-2xl -z-10 group-hover:bg-secondary/35 transition-all duration-700"></div>
              </div>
            </div>

            {/* Speaker Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Aashish Kumar</h3>
                <p className="text-xl text-secondary font-semibold mb-4">
                  Co-Founder of MCyber Academy
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3">Expertise Areas:</h4>
                <ul className="space-y-2">
                  {expertiseAreas.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary mr-2">▸</span>
                      <span className="text-gray-300">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-3">Professional Experience:</h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-primary/20">
                <p className="text-gray-300 italic">
                  <span className="text-secondary font-semibold">Teaching Philosophy:</span> Practical, 
                  hands-on learning with real-world applications and ethical considerations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

