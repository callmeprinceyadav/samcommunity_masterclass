'use client'

import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    name: 'GLINT GEORGE',
    role: 'Community Student',
    image: '👩‍💼',
    rating: 5,
    text: "Just wrapped up the Sam Community 6-day online cybersecurity workshop and it's been a game-changer! The instructor's expertise and hands-on approach made learning engaging and fun. Highly recommend for anyone looking to boost their cybersecurity skills!",
  },
  {
    name: 'Sunita Deora',
    role: 'Community Student',
    image: '👨‍🎓',
    rating: 5,
    text: "A big salute to this amazing committee for offering free online cybersecurity education! In a time where digital safety is more important than ever, your efforts to spread awareness and knowledge without any cost truly empower individuals and communities. Keep up the great work—you're making a real difference!",
  },
  {
    name: 'Anita Patel',
    role: 'Community Student',
    image: '👩‍💻',
    rating: 5,
    text: "✨ This bootcamp is really amazing 🙌 The content is very informative and helpful for learners like us. I truly appreciate the effort SAM Community is putting into providing free knowledge and opportunities like this. 🚀",
  },
  {
    name: 'Akhil Kumar',
    role: 'Community Student',
    image: '👨‍💼',
    rating: 5,
    text: "One of the best community I saw for learning enthusiastics...! Much recommended if anyone wanna learn  sincerely🫡 …",
  },
]

export default function Testimonials() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          testimonials.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, index * 150)
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-darkSecondary"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="gradient-text">Learners Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-6 border border-primary/20 hover:border-secondary/50 transition-all duration-500 ${
                visibleItems.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl flex-shrink-0">
                  {testimonial.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


