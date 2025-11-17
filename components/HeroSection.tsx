'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CountdownTimer from './CountdownTimer'
import aashishImage from '../AASHISH.jpeg'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{left: string, top: string, duration: string, delay: string}>>([])

  useEffect(() => {
    setIsVisible(true)
    // Generate particles only on client side to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${3 + Math.random() * 2}s`,
      delay: `${Math.random() * 2}s`,
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-10"></div>
      
      {/* Animated Particles Background - Only render on client */}
      {particles.length > 0 && (
        <div className="absolute inset-0 z-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-secondary rounded-full opacity-30"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `float ${particle.duration} ease-in-out infinite`,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 sm:pt-24 md:pt-28">
        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Event Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-glow-primary leading-tight">
            THREAT EVASION &<br />
            <span className="gradient-text">OFFENSIVE TOOLING</span>
          </h1>

          {/* Subheadline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary text-glow-secondary mt-6">
            Live Masterclass: Hands-On Threat Evasion & Custom Tooling
          </h2>

          {/* Urgency One-liner */}
          <div className="inline-block bg-primary/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-primary/50 mt-6">
            <p className="text-base sm:text-lg md:text-xl text-white font-medium">
              🔥 LIMITED SEATS | Learn Real-World Attack Techniques | 100% Live Session
            </p>
          </div>

          {/* Speaker Image with Modern Design - Moved Down */}
          <div className="flex justify-center mt-12 mb-6">
            <div className="relative group pb-6">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary via-secondary to-primary p-1.5 pulse-glow animate-pulse-slow">
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center border-4 border-secondary/50 overflow-hidden relative">
                  <Image
                    src={aashishImage}
                    alt="Aashish Kumar - Co-Founder of MCyber Academy"
                    fill
                    className="object-cover object-center object-top rounded-full group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                    priority
                    quality={95}
                    style={{ objectPosition: 'center top' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent rounded-full"></div>
                </div>
              </div>
              {/* Floating Badge - Better Alignment with Separate Lines */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary/95 to-secondary/95 backdrop-blur-md px-5 py-3 rounded-xl border-2 border-secondary/50 shadow-xl shadow-primary/50 animate-float min-w-[200px] sm:min-w-[240px]">
                <p className="text-sm sm:text-base font-bold text-white text-center leading-tight block">Aashish Kumar</p>
                <p className="text-xs sm:text-sm text-secondary font-medium text-center leading-tight mt-1 block">Co-Founder of MCyber Academy</p>
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl -z-10 group-hover:bg-secondary/30 transition-all duration-500"></div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link href="#registration">
              <button className="btn-primary w-full sm:w-auto min-w-[280px]">
                REGISTER NOW - FREE
              </button>
            </Link>
          </div>

          {/* Event Details with Countdown */}
          <div className="mt-12 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-darkSecondary/50 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <div className="text-2xl mb-2">📅</div>
                <p className="text-sm text-gray-300">Date</p>
                <p className="text-lg font-semibold text-white">25th November 2025</p>
              </div>
              <div className="bg-darkSecondary/50 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <div className="text-2xl mb-2">⏰</div>
                <p className="text-sm text-gray-300">Time</p>
                <p className="text-lg font-semibold text-white">6:00 PM (IST)</p>
              </div>
              <div className="bg-darkSecondary/50 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <div className="text-2xl mb-2">⏱️</div>
                <p className="text-sm text-gray-300">Duration</p>
                <p className="text-lg font-semibold text-white">90 Minutes</p>
              </div>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm p-6 rounded-lg border border-primary/30 max-w-2xl mx-auto">
              <p className="text-sm text-gray-300 mb-3 text-center">Event Starts In</p>
              <div className="flex justify-center">
                <CountdownTimer targetDate={new Date('2025-11-25T18:00:00+05:30')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


