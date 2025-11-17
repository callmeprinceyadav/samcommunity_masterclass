'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading for 1 second
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark">
      <div className="relative">
        {/* Animated Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>
        
        {/* Main Loading Animation */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          {/* Spinning Circle with Gradient */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-secondary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-r-primary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>

          {/* Pulsing Text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white animate-pulse">
              THREAT EVASION
            </h2>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <h1 className="text-2xl font-bold text-white animate-pulse">
              A MasterClass By Samcommunity Events Team
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-darkSecondary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

    </div>
  )
}

