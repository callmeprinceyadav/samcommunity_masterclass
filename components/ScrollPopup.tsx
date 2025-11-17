'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

// Event date: 25th November 2025, 6:00 PM IST
const EVENT_DATE = new Date('2025-11-25T18:00:00+05:30')

export default function ScrollPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return

      // Show popup when user scrolls to 80% of the page
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      if (scrollPercentage > 80) {
        setIsVisible(true)
      } else if (scrollPercentage < 70) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // Store dismissal in sessionStorage to prevent showing again in this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPopupDismissed', 'true')
    }
  }

  useEffect(() => {
    // Check if popup was dismissed in this session
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('scrollPopupDismissed')
      if (dismissed === 'true') {
        setIsDismissed(true)
      }
    }
  }, [])

  if (isDismissed || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-lg shadow-2xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Hurry Up! Mark your Calendar
            </h3>
            <p className="text-sm md:text-base text-white/90">
              This Application takes less than 2 mins.
            </p>
          </div>

          {/* Middle Section - Countdown */}
          <div className="flex items-center">
            <CountdownTimer targetDate={EVENT_DATE} />
          </div>

          {/* Right Section - Register Button */}
          <div className="flex items-center gap-3">
            <Link href="#registration" onClick={handleClose}>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg">
                <span>✨</span>
                <span>Register For Free!</span>
              </button>
            </Link>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

