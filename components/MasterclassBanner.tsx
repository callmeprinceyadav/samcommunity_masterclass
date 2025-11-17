'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function MasterclassBanner() {
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
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkSecondary via-darkTertiary to-darkSecondary overflow-visible"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Masterclass <span className="gradient-text">Poster</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>

          {/* Banner Container with Advanced Design */}
          <div className="relative group max-w-6xl mx-auto">
            {/* Outer Glow Container */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
            
            {/* Main Banner Card */}
            <div className="relative bg-gradient-to-br from-darkSecondary/95 to-darkTertiary/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-primary/40 shadow-2xl overflow-visible">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-br-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-tl-full blur-2xl"></div>
              
              {/* Banner Image Container */}
              <div className="relative rounded-2xl overflow-visible bg-gradient-to-br from-primary/25 to-secondary/25 p-3 shadow-inner">
                <div className="relative w-full rounded-xl overflow-visible group-hover:scale-[1.01] transition-transform duration-700 shadow-lg">
                  <Image
                    src="../public/images/banner.jpeg"
                    alt="Threat Evasion & Offensive Tooling Masterclass Poster"
                    width={1200}
                    height={675}
                    className="w-full h-auto object-contain object-center rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority
                    quality={90}
                  />
                  {/* Overlay Gradient for Better Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent rounded-xl pointer-events-none"></div>
                  
                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md px-4 py-2 rounded-lg border-2 border-secondary/50 shadow-lg">
                <p className="text-sm font-bold text-white">🎓 Live Masterclass</p>
              </div>

              {/* Bottom Info Strip */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-primary">📅</span>
                  <span>25th November 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">⏰</span>
                  <span>6:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">⏱️</span>
                  <span>90 Minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">💻</span>
                  <span>Google Meet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

