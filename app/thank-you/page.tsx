import { Suspense } from 'react'
import ThankYouContent from './ThankYouContent'

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-dark via-darkSecondary to-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}


