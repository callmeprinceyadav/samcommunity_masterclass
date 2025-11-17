'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  FaCheckCircle, 
  FaWhatsapp, 
  FaEnvelope, 
  FaQuestionCircle, 
  FaCopy,
  FaExclamationTriangle,
  FaArrowLeft,
  FaTimes
} from 'react-icons/fa'

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/CuZA0W8mdcYFsXPMXbyreN?mode=wwt'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(5)
  const [uniqueId, setUniqueId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastCopied, setToastCopied] = useState(false)

  useEffect(() => {
    // Get unique ID from multiple sources
    const getUniqueId = () => {
      if (typeof window !== 'undefined') {
        // Method 1: Try URL params (from Next.js router)
        const urlUniqueId = searchParams.get('uniqueId')
        
        // Method 2: Try URL search params directly
        const urlParams = new URLSearchParams(window.location.search)
        const directUrlId = urlParams.get('uniqueId')
        
        // Method 3: Try localStorage
        const storedUniqueId = localStorage.getItem('registrationUniqueId')
        
        // Use the first available ID
        const id = urlUniqueId || directUrlId || storedUniqueId
        
        if (id) {
          console.log('✅ Unique ID found:', id)
          setUniqueId(id)
          setIsLoading(false)
          // Show toast when unique ID is found
          setShowToast(true)
          // Auto-dismiss toast after 5 seconds
          setTimeout(() => {
            setShowToast(false)
          }, 5000)
        } else {
          console.log('⚠️ No unique ID found, checking again...')
          // Retry after a short delay
          setTimeout(() => {
            const retryId = searchParams.get('uniqueId') || 
                           new URLSearchParams(window.location.search).get('uniqueId') ||
                           localStorage.getItem('registrationUniqueId')
            if (retryId) {
              setUniqueId(retryId)
              setShowToast(true)
              // Auto-dismiss toast after 5 seconds
              setTimeout(() => {
                setShowToast(false)
              }, 5000)
            }
            setIsLoading(false)
          }, 500)
        }
      }
    }

    getUniqueId()
  }, [searchParams])

  useEffect(() => {
    // Track conversion if needed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'USD'
      })
    }

    // Auto-redirect to WhatsApp after 5 seconds - Show content for full 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect after full 5 seconds
          setTimeout(() => {
            window.location.href = WHATSAPP_GROUP_LINK
          }, 100)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  // Show black screen only after countdown ends (shouldn't happen, but safety check)
  if (countdown === 0 && !showContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-white text-xl">Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleCopyToast = () => {
    if (uniqueId) {
      navigator.clipboard.writeText(uniqueId)
      setToastCopied(true)
      setTimeout(() => setToastCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center p-4 relative pt-24">
      {/* Advanced Toast Notification at Top */}
      {showToast && uniqueId && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-slide-down">
          <div className="bg-gradient-to-r from-primary/95 via-secondary/95 to-primary/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border-2 border-secondary/50 relative overflow-hidden">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse"></div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close toast"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Toast Content */}
            <div className="relative z-10">
              <div className="flex items-start gap-4">
                {/* Success Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500/50">
                    <FaCheckCircle className="text-green-400 text-2xl" />
                  </div>
                </div>

                {/* Toast Text and ID */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                    <span>Registration ID Generated</span>
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Your unique registration ID is ready
                  </p>
                  
                  {/* Unique ID Display */}
                  <div className="bg-dark/60 rounded-lg p-3 border border-primary/30 flex items-center justify-between gap-3">
                    <code className="text-primary font-mono font-bold text-lg tracking-wider flex-1 text-left truncate">
                      {uniqueId}
                    </code>
                    <button
                      onClick={handleCopyToast}
                      className="flex-shrink-0 bg-primary/30 hover:bg-primary/50 border border-primary/50 rounded-lg p-2 transition-all hover:scale-110"
                      title="Copy ID"
                    >
                      {toastCopied ? (
                        <FaCheckCircle className="text-green-400 text-lg" />
                      ) : (
                        <FaCopy className="text-secondary text-lg" />
                      )}
                    </button>
                  </div>

                  {toastCopied && (
                    <p className="text-green-400 text-xs mt-2 animate-fade-in">
                      ✓ Copied to clipboard!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark/30">
              <div className="h-full bg-gradient-to-r from-primary to-secondary animate-progress-bar"></div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl w-full text-center space-y-8 fade-in-up relative z-10">
        <div className="space-y-4">
          {/* Real Check Icon */}
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-7xl md:text-8xl text-green-500 animate-bounce drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white text-glow-primary">
            Registration Confirmed!
          </h1>
          <p className="text-xl text-secondary">
            Your seat is secured.
          </p>
          
          {/* Unique ID Display - Always show, even if null initially */}
          <div className="mt-6 bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm rounded-lg p-6 border-2 border-primary/50">
            <p className="text-sm text-gray-300 mb-2">Your Unique Registration ID</p>
            <div className="flex items-center justify-center gap-3">
              {uniqueId ? (
                <>
                  <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-wider animate-pulse">
                    {uniqueId}
                  </span>
                  <button
                    onClick={() => {
                      if (uniqueId) {
                        navigator.clipboard.writeText(uniqueId)
                        alert('Registration ID copied to clipboard!')
                      }
                    }}
                    className="text-secondary hover:text-primary transition-colors text-xl p-2 hover:scale-110"
                    title="Copy ID"
                  >
                    <FaCopy />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
                  <span className="text-lg text-gray-400">Loading ID...</span>
                </div>
              )}
            </div>
            {uniqueId && (
              <p className="text-xs text-gray-400 mt-3">
                Save this ID for your records. You&apos;ll need it for the session.
              </p>
            )}
          </div>
        </div>

        <div className="bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 space-y-6 border border-primary/30">
          <div className="space-y-4">
            {/* Real WhatsApp Icon */}
            <div className="flex justify-center">
              <FaWhatsapp className="text-5xl text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Join our official WhatsApp group for this Event Links and update.
            </h2>
            <p className="text-secondary text-sm">
              Redirecting to WhatsApp group in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
            <a 
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="btn-primary w-full md:w-auto flex items-center gap-2 mx-auto">
                <FaWhatsapp className="text-xl" />
                JOIN WHATSAPP GROUP NOW
              </button>
            </a>
            <p className="text-sm text-gray-300 mt-4 bg-primary/10 p-3 rounded-lg border border-primary/30 flex items-start gap-2">
              <FaExclamationTriangle className="text-yellow-500 text-lg mt-0.5 flex-shrink-0" />
              <span><strong>Important:</strong> To Receive Season Link You must have to join WhatsApp Group From Upon Link</span>
            </p>
          </div>

          <div className="pt-6 border-t border-primary/20">
            {/* Real Email Icon */}
            <div className="flex justify-center mb-3">
              <FaEnvelope className="text-4xl text-secondary" />
            </div>
            <p className="text-lg text-gray-300">
              Check your email for session details and meeting link.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              We&apos;ll also send you a reminder 30 minutes before the session starts.
            </p>
          </div>

          <div className="pt-6 border-t border-primary/20">
            {/* Real Question Icon */}
            <div className="flex justify-center mb-2">
              <FaQuestionCircle className="text-3xl text-primary" />
            </div>
            <p className="text-sm text-gray-300">
              For any queries please contact: <a href="mailto:events@samcommunity.in" className="text-secondary hover:text-primary transition-colors font-semibold">events@samcommunity.in</a>
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Link href="/" className="text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2">
            <FaArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}


