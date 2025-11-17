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
  FaArrowLeft
} from 'react-icons/fa'

const WHATSAPP_GROUP_LINK =
  'https://chat.whatsapp.com/CuZA0W8mdcYFsXPMXbyreN?mode=wwt'

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(5)
  const [uniqueId, setUniqueId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(true)

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
        } else {
          console.log('⚠️ No unique ID found, checking again...')

          // Retry after a short delay
          setTimeout(() => {
            const retryId =
              searchParams.get('uniqueId') ||
              new URLSearchParams(window.location.search).get('uniqueId') ||
              localStorage.getItem('registrationUniqueId')

            if (retryId) {
              setUniqueId(retryId)
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
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: 1.0,
        currency: 'USD'
      })
    }

    // Auto-redirect to WhatsApp after 5 seconds - Show content for full 5 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 fade-in-up">
        <div className="space-y-4">
          {/* Real Check Icon */}
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-7xl md:text-8xl text-green-500 animate-bounce drop-shadow-lg" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white text-glow-primary">
            Registration Confirmed!
          </h1>

          <p className="text-xl text-secondary">Your seat is secured.</p>

          {/* Unique ID */}
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
                Save this ID for your records. You'll need it for the session.
              </p>
            )}
          </div>
        </div>

        <div className="bg-darkSecondary/50 backdrop-blur-sm rounded-lg p-8 space-y-6 border border-primary/30">
          <div className="space-y-4">
            <div className="flex justify-center">
              <FaWhatsapp className="text-5xl text-green-500" />
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Join our official WhatsApp group for this Event Links and update.
            </h2>

            <p className="text-secondary text-sm">
              Redirecting to WhatsApp group in {countdown} second
              {countdown !== 1 ? 's' : ''}...
            </p>

            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="btn-primary w-full md:w-auto flex items-center gap-2 mx-auto">
                <FaWhatsapp className="text-xl" /> JOIN WHATSAPP GROUP NOW
              </button>
            </a>

            <p className="text-sm text-gray-300 mt-4 bg-primary/10 p-3 rounded-lg border border-primary/30 flex items-start gap-2">
              <FaExclamationTriangle className="text-yellow-500 text-lg mt-0.5 flex-shrink-0" />
              <span>
                <strong>Important:</strong> To Receive Season Link You must have
                to join WhatsApp Group From Above Link
              </span>
            </p>
          </div>

          <div className="pt-6 border-t border-primary/20">
            <div className="flex justify-center mb-3">
              <FaEnvelope className="text-4xl text-secondary" />
            </div>

            <p className="text-lg text-gray-300">
              Check your email for session details and meeting link.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              We'll also send you a reminder 30 minutes before the session
              starts.
            </p>
          </div>

          <div className="pt-6 border-t border-primary/20">
            <div className="flex justify-center mb-2">
              <FaQuestionCircle className="text-3xl text-primary" />
            </div>

            <p className="text-sm text-gray-300">
              For any queries please contact:{' '}
              <a
                href="mailto:events@samcommunity.in"
                className="text-secondary hover:text-primary transition-colors font-semibold"
              >
                events@samcommunity.in
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
