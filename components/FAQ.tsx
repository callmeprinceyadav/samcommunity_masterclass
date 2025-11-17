'use client'

import { useState, useEffect, useRef } from 'react'

const faqs = [
  {
    question: 'Is this session completely free?',
    answer: 'Yes, this masterclass is completely free. We believe in making quality cybersecurity education accessible to everyone. You\'ll also receive a participation certificate at no cost.',
  },
  {
    question: 'Will the session be recorded for later viewing?',
    answer: 'No, this is an exclusive live session that will not be recorded to maintain the exclusivity and encourage active participation. We recommend attending the live session to get maximum value.',
  },
  {
    question: 'Will I receive a certificate of participation?',
    answer: 'Yes, all registered attendees who join the live session will receive a digital certificate of participation from Samcommunity, which you can add to your LinkedIn profile or resume.',
  },
  {
    question: 'Do I need prior cybersecurity knowledge or skills?',
    answer: 'No prior advanced skills required! This session is designed to be beginner-friendly while also providing value to experienced professionals. Basic computer knowledge is sufficient.',
  },
  {
    question: 'How will I receive the meeting link and session details?',
    answer: 'After registration, you\'ll receive an email confirmation with all session details. You\'ll also be added to our WhatsApp group where we\'ll share the meeting link 30 minutes before the session starts.',
  },
  {
    question: 'Can I ask questions and interact during the session?',
    answer: 'Absolutely! This is an interactive session with a dedicated Q&A segment. You can ask questions through chat, and the instructor will address them during the session.',
  },
  {
    question: 'What if I miss the live session due to an emergency?',
    answer: 'Since this is a live-only event, we recommend keeping your schedule clear. However, we regularly conduct similar sessions, so stay connected with our community for future opportunities.',
  },
  {
    question: 'How can I contact support if I have technical issues?',
    answer: 'You can reach our support team at events@samcommunity.in or through our WhatsApp group. We\'ll also have technical support available 30 minutes before the session starts.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      id="faq"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-darkSecondary to-dark"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className={`space-y-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-darkSecondary/50 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-secondary/50' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-darkSecondary/70 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <span className="text-2xl text-secondary flex-shrink-0 transition-transform duration-300">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

