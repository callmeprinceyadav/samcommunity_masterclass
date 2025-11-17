'use client'

import { useEffect, useRef, useState } from 'react'

const benefits = [
  { icon: '🔴', title: '100% Live Session' },
  { icon: '👥', title: 'Beginner Friendly' },
  { icon: '🌍', title: 'Real-World Examples' },
  { icon: '🧠', title: 'Offensive Mindset Training' },
  { icon: '🎓', title: 'Free Participation Certificate' },
  { icon: '👨‍🏫', title: 'Learn from Industry Expert' },
  { icon: '⚡', title: 'Practical, Not Theoretical' },
  { icon: '✅', title: 'Trusted by 2500+ Learners' },
]

export default function WhyAttend() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          benefits.forEach((_, index) => {
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
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkSecondary to-dark"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why You Should <span className="gradient-text">Attend</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-primary to-secondary p-6 rounded-xl text-center min-h-[150px] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                boxShadow: '0 8px 32px rgba(123, 47, 247, 0.3)',
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


