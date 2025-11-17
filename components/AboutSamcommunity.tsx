'use client'

import { useEffect, useRef, useState } from 'react'

export default function AboutSamcommunity() {
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

  const achievements = [
    { number: '2500+', label: 'Professionals Trained' },
    { number: '50+', label: 'Expert-Led Workshops' },
    { number: 'Active', label: 'Community Engagement' },
    { number: 'Industry', label: 'Partnerships' },
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkSecondary to-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">Samcommunity</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Company Logo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-32 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center border-2 border-secondary/50">
              <p className="text-2xl font-bold text-white">SAMCOMMUNITY</p>
            </div>
          </div>

          {/* Company Description */}
          <div className="bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-primary/20 space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              <span className="text-white font-semibold">Samcommunity (XYLYN SAMCOMMUNITY PRIVATE LIMITED)</span> is a 
              registered cybersecurity education company delivering high-quality live training, community-driven sessions, 
              hands-on workshops, and cyber awareness programs. With thousands of participants across India and 
              internationally, we collaborate with industry experts to bring real-world learning experiences to students, 
              professionals, and cybersecurity aspirants.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission is to bridge the gap between theoretical knowledge and practical cybersecurity skills through 
              interactive sessions, expert-led workshops, and continuous community engagement. We focus on delivering 
              value-driven content that empowers individuals to build successful careers in cybersecurity.
            </p>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-lg p-6 text-center border border-primary/30 hover:border-secondary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-darkSecondary/30 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-semibold text-white mb-3">Our Achievements</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>2500+ professionals trained across various domains</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>50+ expert-led workshops and masterclasses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Active community of cybersecurity enthusiasts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Partnerships with industry leaders and security researchers</span>
                </li>
              </ul>
            </div>

            <div className="bg-darkSecondary/30 rounded-lg p-6 border border-primary/20">
              <h3 className="text-xl font-semibold text-white mb-3">What We Offer</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">▸</span>
                  <span>High-quality live training sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">▸</span>
                  <span>Community-driven learning experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">▸</span>
                  <span>Hands-on workshops with real-world scenarios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">▸</span>
                  <span>Cyber awareness programs for all levels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


