'use client'

import { useEffect, useRef, useState } from 'react'

export default function EventIntroduction() {
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

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-darkSecondary"
    >
      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About This <span className="gradient-text">Masterclass</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="space-y-6 text-lg sm:text-xl text-gray-300 leading-relaxed">
          <p>
            This live <span className="text-secondary font-semibold">Hinglish masterclass</span> delivers a clear and practical breakdown of how modern cyber threats evolve, how attackers bypass systems, and how security professionals analyze behavior, detect gaps, and defend against real-world techniques. Led by <span className="text-primary font-semibold">Aashish Kumar (Co-Founder, MyCyberAcademy)</span>, the session focuses entirely on hands-on workflows, tooling demonstrations, and simplified explanations of complex topics like malware behavior, security bypass methods, and custom analysis techniques. The session is designed for students, beginners, and working professionals who want actionable knowledge — not dry theory.
          </p>

          <p>
            Over <span className="text-secondary">90 minutes</span>, participants will learn how analysts study threats, evaluate system weaknesses, build defensive strategies, and use practical tools to understand attacker methodologies. This event is part of <span className="text-secondary">Samcommunity&apos;s</span> commitment to delivering high-quality cyber learning experiences without marketing noise — just pure, skill-focused education. Whether you are exploring cybersecurity for the first time or upgrading your current skillset, this masterclass will give you clarity, confidence, and a stronger understanding of today&apos;s security landscape.
          </p>
        </div>
      </div>
    </section>
  )
}


