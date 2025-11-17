'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
  className?: string
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <span className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-sm md:text-base text-gray-400">d</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex items-center space-x-1">
        <span className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-sm md:text-base text-gray-400">hr</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex items-center space-x-1">
        <span className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-sm md:text-base text-gray-400">m</span>
      </div>
      <span className="text-white">:</span>
      <div className="flex items-center space-x-1">
        <span className="text-2xl md:text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-sm md:text-base text-gray-400">s</span>
      </div>
    </div>
  )
}


